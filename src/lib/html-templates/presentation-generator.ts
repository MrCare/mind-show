import { presentationStyles } from './presentation-styles';
import { presentationScripts } from './presentation-scripts';

// 节点类型定义
interface MindMapNode {
  topic: string;
  children?: MindMapNode[];
}

interface MindMapData {
  nodeData: MindMapNode;
}

/**
 * 生成演示文稿的HTML结构
 */
function generatePresentationHTML(data: MindMapData, previewMode: boolean = false): string {
  const rootNode = data.nodeData;
  const title = escapeHtml(rootNode.topic || 'Mind Map Presentation');
  
  // 生成目录页
  const tableOfContents = generateTableOfContents(rootNode.children || []);
  
  // 生成内容页面 - 在预览模式下只生成前两张内容片
  const allContentSlides = generateContentSlides(rootNode.children || []);
  const contentSlides = previewMode ? getPreviewSlides(allContentSlides) : allContentSlides;
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="theme-color" content="#667eea">
    <title>${title}</title>
    <style>
        ${presentationStyles}
    </style>
</head>
<body>
    <div class="presentation-wrapper">
        <!-- 标题页 -->
        <section class="slide title-slide">
            <div class="slide-container">
                <div class="title-content">
                    <h1 class="main-title">${title}</h1>
                    <p class="subtitle">${previewMode ? 'Preview Mode - First 2 Slides Only' : 'Interactive Knowledge Journey'}</p>
                    <div class="title-decoration"></div>
                    ${previewMode ? '<div class="preview-notice" style="margin-top: 2rem; padding: 1rem; background: rgba(102, 126, 234, 0.1); border-radius: 0.5rem; color: #667eea; font-size: 0.875rem;">🔍 This is a preview showing only the first 2 content slides. Click "Publish" to generate the complete presentation.</div>' : ''}
                </div>
            </div>
        </section>

        ${!previewMode ? `
        <!-- 目录页 -->
        <section class="slide toc-slide">
            <div class="slide-container">
                <h2 class="section-title">Table of Contents</h2>
                <div class="toc-content">
                    ${tableOfContents}
                </div>
            </div>
        </section>
        ` : '<!-- Preview mode: Table of contents hidden -->'}

        <!-- 内容页面 -->
        ${contentSlides}
        
        ${!previewMode ? `
        <!-- 结束页 -->
        <section class="slide end-slide">
            <div class="slide-container">
                <div class="end-content">
                    <h2 class="end-title">Thank You</h2>
                    <p class="end-subtitle">Questions & Discussion</p>
                    <div class="end-decoration"></div>
                </div>
            </div>
        </section>
        ` : '<!-- Preview mode: End slide hidden -->'}
    </div>
    
    <!-- 导航控制 -->
    <div class="navigation-controls">
        <button class="nav-btn prev-btn" onclick="previousSlide()" aria-label="Previous slide">‹</button>
        <span class="slide-counter">
            <span id="current-slide">1</span> / <span id="total-slides"></span>
        </span>
        <button class="nav-btn next-btn" onclick="nextSlide()" aria-label="Next slide">›</button>
    </div>
    
    <!-- 进度条 -->
    <div class="progress-bar">
        <div class="progress-fill" id="progress-fill"></div>
    </div>
    
    <script>
        ${presentationScripts}
    </script>
</body>
</html>`;
}

/**
 * 生成目录
 */
function generateTableOfContents(firstLevelNodes: MindMapNode[]): string {
  if (firstLevelNodes.length === 0) return '<p class="empty-toc">No content available</p>';
  
  return firstLevelNodes.map((node, index) => `
    <div class="toc-item" onclick="goToSlide(${index + 3})">
        <div class="toc-number">${index + 1}</div>
        <div class="toc-title">${escapeHtml(node.topic)}</div>
        <div class="toc-arrow">→</div>
    </div>
  `).join('');
}

/**
 * 获取预览模式的幻灯片（只返回前两张内容片）
 */
function getPreviewSlides(allContentSlides: string): string {
  // 将所有内容片分割成单独的片段
  const slideRegex = /<section class="slide content-slide"[\s\S]*?<\/section>/g;
  const slides = allContentSlides.match(slideRegex) || [];
  
  // 只返回前两张片，如果不足两张则返回所有
  const previewSlides = slides.slice(0, 2);
  return previewSlides.join('\n');
}

/**
 * 生成内容幻灯片
 */
function generateContentSlides(firstLevelNodes: MindMapNode[]): string {
  return firstLevelNodes.map((node, index) => {
    const slideNumber = index + 3; // 标题页(1) + 目录页(2) + 内容页
    
    return `
        <section class="slide content-slide" data-slide="${slideNumber}">
            <div class="slide-container">
                <header class="slide-header">
                    <h2 class="content-title">${escapeHtml(node.topic)}</h2>
                    <div class="slide-number">${index + 1}</div>
                </header>
                
                <main class="slide-main">
                    ${generateSlideContent(node.children || [])}
                </main>
            </div>
        </section>
    `;
  }).join('');
}

/**
 * 生成幻灯片主要内容
 */
function generateSlideContent(secondLevelNodes: MindMapNode[]): string {
  if (secondLevelNodes.length === 0) {
    return '<div class="empty-content">No additional content</div>';
  }
  
  return `
    <div class="content-grid">
        ${secondLevelNodes.map((node, index) => `
            <div class="content-section" style="--delay: ${index * 0.2}s">
                <div class="section-header">
                    <div class="section-icon">${getSectionIcon(index)}</div>
                    <h3 class="section-title">${escapeHtml(node.topic)}</h3>
                </div>
                
                ${node.children && node.children.length > 0 ? `
                    <div class="section-content">
                        ${generateSectionItems(node.children)}
                    </div>
                ` : ''}
            </div>
        `).join('')}
    </div>
  `;
}

/**
 * 生成章节内容项目
 */
function generateSectionItems(thirdLevelNodes: MindMapNode[]): string {
  return `
    <ul class="content-list">
        ${thirdLevelNodes.map((node, index) => `
            <li class="content-item" style="--item-delay: ${index * 0.1}s">
                <span class="item-bullet">•</span>
                <span class="item-text">${escapeHtml(node.topic)}</span>
                ${node.children && node.children.length > 0 ? `
                    <ul class="sub-list">
                        ${node.children.map(subNode => `
                            <li class="sub-item">
                                <span class="sub-bullet">-</span>
                                <span class="sub-text">${escapeHtml(subNode.topic)}</span>
                            </li>
                        `).join('')}
                    </ul>
                ` : ''}
            </li>
        `).join('')}
    </ul>
  `;
}

/**
 * 获取章节图标
 */
function getSectionIcon(index: number): string {
  const icons = ['🎯', '💡', '📊', '🔧', '🚀', '⭐', '📈', '🎨', '🔍', '💎'];
  return icons[index % icons.length];
}

/**
 * 转义HTML特殊字符
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * 验证思维导图数据
 */
export function validateMindMapData(data: any): data is MindMapData {
  return data && 
         typeof data === 'object' && 
         data.nodeData && 
         typeof data.nodeData === 'object' &&
         typeof data.nodeData.topic === 'string';
}

export { generatePresentationHTML };
