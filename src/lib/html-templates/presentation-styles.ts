// Presentation HTML 样式定义
export const presentationStyles = `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        color: #333;
        overflow: hidden;
    }

    .presentation-wrapper {
        position: relative;
        width: 100%;
        height: 100vh;
    }

    .slide {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transform: translateX(100px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .slide.active {
        opacity: 1;
        transform: translateX(0);
        z-index: 10;
    }

    .slide.prev {
        transform: translateX(-100px);
    }

    .slide-container {
        max-width: 1200px;
        width: 90%;
        height: 80%;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border-radius: 24px;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
        padding: 60px;
        display: flex;
        flex-direction: column;
        position: relative;
        overflow: hidden;
    }

    .slide-container::before {
        content: '';
        position: absolute;
        top: -50%;
        right: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
        animation: float 15s ease-in-out infinite;
        pointer-events: none;
    }

    @keyframes float {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(180deg); }
    }

    /* 标题页样式 */
    .title-slide .slide-container {
        justify-content: center;
        text-align: center;
    }

    .title-content {
        position: relative;
        z-index: 2;
    }

    .main-title {
        font-size: 4rem;
        font-weight: 900;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 24px;
        line-height: 1.2;
    }

    .subtitle {
        font-size: 1.5rem;
        color: #64748b;
        font-weight: 400;
        margin-bottom: 40px;
    }

    .title-decoration {
        width: 200px;
        height: 4px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        margin: 0 auto;
        border-radius: 2px;
        animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
        0%, 100% { opacity: 1; transform: scaleX(1); }
        50% { opacity: 0.7; transform: scaleX(1.1); }
    }

    /* 目录页样式 */
    .toc-slide .section-title {
        font-size: 2.5rem;
        font-weight: 800;
        color: #334155;
        margin-bottom: 40px;
        text-align: center;
    }

    .toc-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 16px;
        justify-content: center;
    }

    .toc-item {
        display: flex;
        align-items: center;
        padding: 20px 24px;
        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        border-radius: 16px;
        border: 2px solid transparent;
        cursor: pointer;
        transition: all 0.3s ease;
        opacity: 0;
        animation: slideInUp 0.6s ease-out forwards;
    }

    .toc-item:nth-child(1) { animation-delay: 0.1s; }
    .toc-item:nth-child(2) { animation-delay: 0.2s; }
    .toc-item:nth-child(3) { animation-delay: 0.3s; }
    .toc-item:nth-child(4) { animation-delay: 0.4s; }
    .toc-item:nth-child(5) { animation-delay: 0.5s; }

    .toc-item:hover {
        transform: translateY(-4px);
        border-color: #667eea;
        box-shadow: 0 12px 32px rgba(102, 126, 234, 0.2);
    }

    .toc-number {
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 1.2rem;
        margin-right: 20px;
    }

    .toc-title {
        flex: 1;
        font-size: 1.25rem;
        font-weight: 600;
        color: #334155;
    }

    .toc-arrow {
        color: #667eea;
        font-size: 1.5rem;
        font-weight: bold;
        transition: transform 0.3s ease;
    }

    .toc-item:hover .toc-arrow {
        transform: translateX(8px);
    }

    /* 内容页样式 */
    .content-slide .slide-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 40px;
        padding-bottom: 20px;
        border-bottom: 3px solid #e2e8f0;
        position: relative;
        z-index: 2;
    }

    .content-title {
        font-size: 2.5rem;
        font-weight: 800;
        color: #334155;
        flex: 1;
    }

    .slide-number {
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 1.5rem;
    }

    .slide-main {
        flex: 1;
        position: relative;
        z-index: 2;
    }

    .content-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 32px;
        height: 100%;
        align-content: start;
    }

    .content-section {
        opacity: 0;
        animation: slideInUp 0.8s ease-out forwards;
        animation-delay: var(--delay, 0s);
    }

    .section-header {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        padding: 16px 20px;
        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        border-radius: 12px;
        border-left: 4px solid #667eea;
    }

    .section-icon {
        font-size: 1.5rem;
        margin-right: 12px;
    }

    .section-title {
        font-size: 1.3rem;
        font-weight: 700;
        color: #334155;
    }

    .section-content {
        padding-left: 8px;
    }

    .content-list {
        list-style: none;
        space-y: 12px;
    }

    .content-item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 16px;
        opacity: 0;
        animation: slideInLeft 0.6s ease-out forwards;
        animation-delay: var(--item-delay, 0s);
    }

    .item-bullet {
        color: #667eea;
        font-weight: bold;
        font-size: 1.2rem;
        margin-right: 12px;
        margin-top: 2px;
    }

    .item-text {
        flex: 1;
        font-size: 1rem;
        color: #475569;
        line-height: 1.6;
    }

    .sub-list {
        list-style: none;
        margin-top: 8px;
        margin-left: 20px;
    }

    .sub-item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 8px;
    }

    .sub-bullet {
        color: #94a3b8;
        margin-right: 8px;
        margin-top: 2px;
    }

    .sub-text {
        font-size: 0.9rem;
        color: #64748b;
        line-height: 1.5;
    }

    /* 结束页样式 */
    .end-slide .slide-container {
        justify-content: center;
        text-align: center;
    }

    .end-content {
        position: relative;
        z-index: 2;
    }

    .end-title {
        font-size: 3.5rem;
        font-weight: 800;
        color: #334155;
        margin-bottom: 20px;
    }

    .end-subtitle {
        font-size: 1.5rem;
        color: #64748b;
        margin-bottom: 40px;
    }

    .end-decoration {
        width: 150px;
        height: 150px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 50%;
        margin: 0 auto;
        animation: spin 10s linear infinite;
        opacity: 0.1;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    /* 导航控制 */
    .navigation-controls {
        position: fixed;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 20px;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        padding: 12px 24px;
        border-radius: 50px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        z-index: 1000;
    }

    .nav-btn {
        width: 40px;
        height: 40px;
        border: none;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }

    .nav-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
    }

    .nav-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
    }

    .slide-counter {
        color: #64748b;
        font-weight: 600;
        font-size: 0.9rem;
    }

    /* 进度条 */
    .progress-bar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: rgba(255, 255, 255, 0.3);
        z-index: 1000;
    }

    .progress-fill {
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        transition: width 0.6s ease;
        width: 0%;
    }

    /* 动画关键帧 */
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    /* 响应式设计 */
    @media (max-width: 1024px) {
        .slide-container {
            width: 92%;
            padding: 50px 40px;
        }
        
        .content-grid {
            grid-template-columns: 1fr;
            gap: 28px;
        }
        
        .main-title {
            font-size: 3.2rem;
        }
        
        .content-title {
            font-size: 2.2rem;
        }
    }

    @media (max-width: 768px) {
        .slide-container {
            width: 95%;
            padding: 40px 30px;
            height: 85%;
        }
        
        .main-title {
            font-size: 2.8rem;
            line-height: 1.1;
        }
        
        .subtitle {
            font-size: 1.2rem;
            margin-bottom: 30px;
        }
        
        .content-title {
            font-size: 1.8rem;
            margin-bottom: 0;
        }
        
        .slide-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            margin-bottom: 30px;
        }
        
        .slide-number {
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
            align-self: flex-end;
        }
        
        .content-grid {
            gap: 24px;
            height: auto;
        }
        
        .section-header {
            padding: 12px 16px;
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            text-align: left;
        }
        
        .section-icon {
            font-size: 1.2rem;
            margin-right: 0;
        }
        
        .section-title {
            font-size: 1.1rem;
        }
        
        .toc-item {
            padding: 16px 20px;
            flex-direction: column;
            text-align: center;
            gap: 12px;
        }
        
        .toc-number {
            width: 40px;
            height: 40px;
            font-size: 1rem;
            margin-right: 0;
            margin-bottom: 8px;
        }
        
        .toc-title {
            font-size: 1.1rem;
            margin-bottom: 8px;
        }
        
        .toc-arrow {
            font-size: 1.2rem;
        }
        
        .navigation-controls {
            bottom: 20px;
            padding: 10px 20px;
            gap: 16px;
        }
        
        .nav-btn {
            width: 44px;
            height: 44px;
            font-size: 1.1rem;
        }
        
        .slide-counter {
            font-size: 0.85rem;
        }
        
        .section-content {
            padding-left: 4px;
        }
        
        .content-item {
            margin-bottom: 14px;
        }
        
        .item-text {
            font-size: 0.95rem;
        }
    }

    @media (max-width: 480px) {
        body {
            font-size: 14px;
        }
        
        .slide-container {
            padding: 30px 20px;
            height: 88%;
            border-radius: 16px;
        }
        
        .main-title {
            font-size: 2.2rem;
            margin-bottom: 16px;
        }
        
        .subtitle {
            font-size: 1rem;
            margin-bottom: 20px;
        }
        
        .title-decoration {
            width: 120px;
            height: 3px;
        }
        
        .section-title {
            font-size: 1.8rem;
            margin-bottom: 30px;
        }
        
        .content-title {
            font-size: 1.5rem;
        }
        
        .slide-header {
            margin-bottom: 25px;
            padding-bottom: 15px;
        }
        
        .slide-number {
            width: 44px;
            height: 44px;
            font-size: 1.1rem;
        }
        
        .toc-item {
            padding: 14px 16px;
            border-radius: 12px;
        }
        
        .toc-number {
            width: 36px;
            height: 36px;
            font-size: 0.9rem;
            border-radius: 10px;
        }
        
        .toc-title {
            font-size: 1rem;
        }
        
        .section-header {
            padding: 10px 14px;
            border-radius: 10px;
            margin-bottom: 16px;
        }
        
        .section-title {
            font-size: 1rem;
        }
        
        .section-icon {
            font-size: 1.1rem;
        }
        
        .content-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
            margin-bottom: 12px;
        }
        
        .item-bullet {
            font-size: 1rem;
            margin-right: 0;
            margin-bottom: 4px;
        }
        
        .item-text {
            font-size: 0.9rem;
            line-height: 1.5;
        }
        
        .sub-list {
            margin-top: 6px;
            margin-left: 12px;
        }
        
        .sub-item {
            margin-bottom: 6px;
        }
        
        .sub-text {
            font-size: 0.85rem;
        }
        
        .navigation-controls {
            bottom: 15px;
            padding: 8px 16px;
            gap: 12px;
        }
        
        .nav-btn {
            width: 40px;
            height: 40px;
            font-size: 1rem;
        }
        
        .slide-counter {
            font-size: 0.8rem;
        }
        
        .end-title {
            font-size: 2.5rem;
        }
        
        .end-subtitle {
            font-size: 1.2rem;
            margin-bottom: 30px;
        }
        
        .end-decoration {
            width: 100px;
            height: 100px;
        }
    }

    @media (max-width: 320px) {
        .slide-container {
            padding: 25px 15px;
            height: 90%;
        }
        
        .main-title {
            font-size: 1.8rem;
        }
        
        .subtitle {
            font-size: 0.9rem;
        }
        
        .content-title {
            font-size: 1.3rem;
        }
        
        .section-title {
            font-size: 1.6rem;
        }
        
        .navigation-controls {
            bottom: 10px;
            padding: 6px 12px;
            gap: 10px;
        }
        
        .nav-btn {
            width: 36px;
            height: 36px;
            font-size: 0.9rem;
        }
        
        .slide-counter {
            font-size: 0.75rem;
        }
        
        .toc-item {
            padding: 12px 14px;
        }
        
        .toc-title {
            font-size: 0.9rem;
        }
        
        .section-header {
            padding: 8px 12px;
        }
        
        .section-title {
            font-size: 0.9rem;
        }
    }

    /* 横屏模式优化 */
    @media (max-height: 500px) and (orientation: landscape) {
        .slide-container {
            height: 92%;
            padding: 20px 30px;
        }
        
        .main-title {
            font-size: 2rem;
            margin-bottom: 10px;
        }
        
        .subtitle {
            font-size: 1rem;
            margin-bottom: 15px;
        }
        
        .slide-header {
            margin-bottom: 20px;
            padding-bottom: 10px;
        }
        
        .content-title {
            font-size: 1.4rem;
        }
        
        .slide-number {
            width: 40px;
            height: 40px;
            font-size: 1rem;
        }
        
        .section-header {
            padding: 8px 12px;
            margin-bottom: 12px;
        }
        
        .content-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 16px;
        }
        
        .navigation-controls {
            bottom: 10px;
            padding: 6px 16px;
        }
        
        .nav-btn {
            width: 32px;
            height: 32px;
            font-size: 0.9rem;
        }
    }

    /* 触摸设备优化 */
    @media (hover: none) and (pointer: coarse) {
        .toc-item:hover,
        .nav-btn:hover {
            transform: none;
        }
        
        .toc-item:active {
            transform: scale(0.98);
            background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
        }
        
        .nav-btn:active {
            transform: scale(0.95);
        }
        
        .toc-arrow {
            display: none;
        }
        
        /* 增加触摸目标大小 */
        .nav-btn {
            min-width: 44px;
            min-height: 44px;
        }
        
        .toc-item {
            min-height: 60px;
        }
    }

    /* iframe环境优化 */
    .iframe-fullscreen .navigation-controls {
        bottom: 10px;
        padding: 6px 12px;
    }
    
    .iframe-fullscreen .slide-container {
        height: 95%;
        width: 98%;
    }
    
    .iframe-fullscreen .progress-bar {
        height: 2px;
    }

    /* 打印样式 */
    @media print {
        body {
            background: white;
        }
        
        .slide {
            position: static;
            opacity: 1;
            transform: none;
            page-break-after: always;
            height: auto;
            min-height: 100vh;
        }
        
        .navigation-controls,
        .progress-bar {
            display: none;
        }
        
        .slide-container {
            box-shadow: none;
            background: white;
        }
    }
`;
