// Presentation HTML 脚本定义
export const presentationScripts = `
    let currentSlide = 0;
    let totalSlides = 0;

    // 初始化演示文稿
    document.addEventListener('DOMContentLoaded', function() {
        try {
            initPresentation();
            setupKeyboardNavigation();
            optimizeForMobile();
            updateProgress();
        } catch (error) {
            console.warn('Presentation initialization error:', error);
            // 基本初始化，确保至少第一张幻灯片可见
            const slides = document.querySelectorAll('.slide');
            if (slides.length > 0) {
                slides[0].classList.add('active');
            }
        }
    });

    function initPresentation() {
        const slides = document.querySelectorAll('.slide');
        totalSlides = slides.length;
        
        // 调试信息
        console.log('Presentation initialized with', totalSlides, 'slides');
        console.log('Running in iframe:', window !== window.top);
        
        // 设置总页数
        const totalSlidesElement = document.getElementById('total-slides');
        if (totalSlidesElement) {
            totalSlidesElement.textContent = totalSlides;
        }
        
        // 显示第一张幻灯片
        if (slides.length > 0) {
            slides[0].classList.add('active');
        }
        
        // 更新导航按钮状态
        updateNavigationButtons();
    }

    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            changeSlide(currentSlide + 1);
        }
    }

    function previousSlide() {
        if (currentSlide > 0) {
            changeSlide(currentSlide - 1);
        }
    }

    function goToSlide(slideIndex) {
        if (slideIndex >= 0 && slideIndex < totalSlides) {
            changeSlide(slideIndex);
        }
    }

    function changeSlide(newSlideIndex) {
        const slides = document.querySelectorAll('.slide');
        
        // 移除当前幻灯片的活动状态
        slides[currentSlide].classList.remove('active');
        slides[currentSlide].classList.add('prev');
        
        // 激活新幻灯片
        setTimeout(() => {
            slides[currentSlide].classList.remove('prev');
            currentSlide = newSlideIndex;
            slides[currentSlide].classList.add('active');
            
            // 更新导航
            updateNavigationButtons();
            updateSlideCounter();
            updateProgress();
            
            // 重新触发内容动画
            resetSlideAnimations();
        }, 100);
    }

    function updateNavigationButtons() {
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        if (prevBtn) {
            prevBtn.disabled = currentSlide === 0;
        }
        
        if (nextBtn) {
            nextBtn.disabled = currentSlide === totalSlides - 1;
        }
    }

    function updateSlideCounter() {
        const currentSlideElement = document.getElementById('current-slide');
        if (currentSlideElement) {
            currentSlideElement.textContent = currentSlide + 1;
        }
    }

    function updateProgress() {
        const progressFill = document.getElementById('progress-fill');
        if (progressFill && totalSlides > 0) {
            const progress = ((currentSlide + 1) / totalSlides) * 100;
            progressFill.style.width = progress + '%';
        }
    }

    function resetSlideAnimations() {
        const currentSlideElement = document.querySelectorAll('.slide')[currentSlide];
        if (!currentSlideElement) return;
        
        // 重置动画元素
        const animatedElements = currentSlideElement.querySelectorAll('.toc-item, .content-section, .content-item');
        
        animatedElements.forEach((element, index) => {
            element.style.animation = 'none';
            element.offsetHeight; // 触发重流
            element.style.animation = null;
        });
    }

    function setupKeyboardNavigation() {
        // 检查是否在iframe中
        const isInIframe = window !== window.top;
        
        document.addEventListener('keydown', function(event) {
            // 在iframe中时，只响应特定的键盘事件
            if (isInIframe && !['ArrowRight', 'ArrowLeft', ' '].includes(event.key)) {
                return;
            }
            
            switch(event.key) {
                case 'ArrowRight':
                case ' ': // 空格键
                    event.preventDefault();
                    nextSlide();
                    break;
                case 'ArrowLeft':
                    event.preventDefault();
                    previousSlide();
                    break;
                case 'Home':
                    if (!isInIframe) {
                        event.preventDefault();
                        goToSlide(0);
                    }
                    break;
                case 'End':
                    if (!isInIframe) {
                        event.preventDefault();
                        goToSlide(totalSlides - 1);
                    }
                    break;
                case 'Escape':
                    if (!isInIframe) {
                        event.preventDefault();
                        toggleFullscreen();
                    }
                    break;
            }
        });
    }

    function toggleFullscreen() {
        // 检查是否在iframe中
        const isInIframe = window !== window.top;
        
        if (isInIframe) {
            // 在iframe中，我们无法真正全屏，但可以优化显示
            document.body.classList.toggle('iframe-fullscreen');
            return;
        }
        
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log('Error attempting to enable fullscreen:', err.message);
            });
        } else {
            document.exitFullscreen();
        }
    }

    // 触摸滑动支持
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', function(event) {
        touchStartX = event.changedTouches[0].screenX;
        touchStartY = event.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', function(event) {
        touchEndX = event.changedTouches[0].screenX;
        touchEndY = event.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diffX = touchStartX - touchEndX;
        const diffY = Math.abs(touchStartY - touchEndY);
        
        // 只有在水平滑动距离大于垂直滑动距离时才处理
        if (Math.abs(diffX) > swipeThreshold && Math.abs(diffX) > diffY) {
            if (diffX > 0) {
                // 向左滑动，下一张
                nextSlide();
            } else {
                // 向右滑动，上一张
                previousSlide();
            }
        }
    }

    // 防止移动端双击缩放
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // 优化移动端性能
    function optimizeForMobile() {
        // 检测是否为移动设备
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            // 减少动画复杂度
            document.body.classList.add('mobile-optimized');
            
            // 禁用某些不必要的动画
            const style = document.createElement('style');
            style.textContent = \`
                .mobile-optimized .slide-container::before {
                    animation: none;
                }
                .mobile-optimized .title-decoration {
                    animation: none;
                }
                .mobile-optimized .end-decoration {
                    animation: none;
                }
            \`;
            document.head.appendChild(style);
        }
    }

    // 自动播放功能（可选）
    let autoPlayInterval = null;
    let isAutoPlaying = false;

    function startAutoPlay(intervalMs = 10000) {
        if (isAutoPlaying) return;
        
        isAutoPlaying = true;
        autoPlayInterval = setInterval(() => {
            if (currentSlide < totalSlides - 1) {
                nextSlide();
            } else {
                stopAutoPlay();
            }
        }, intervalMs);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
            isAutoPlaying = false;
        }
    }

    // 暴露全局函数
    window.nextSlide = nextSlide;
    window.previousSlide = previousSlide;
    window.goToSlide = goToSlide;
    window.startAutoPlay = startAutoPlay;
    window.stopAutoPlay = stopAutoPlay;
`;
