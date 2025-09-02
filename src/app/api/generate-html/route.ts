import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { mindData, address } = await request.json();

    if (!mindData || !mindData.nodeData) {
      return NextResponse.json(
        { error: 'Invalid mind map data' },
        { status: 400 }
      );
    }

    // 将思维导图数据转换为HTML的函数
    const convertMindDataToHTML = (data: any): string => {
      const generateNodeHTML = (node: any, level: number = 0): string => {
        const indent = '  '.repeat(level);
        const tag = level === 0 ? 'h1' : level === 1 ? 'h2' : level === 2 ? 'h3' : 'h4';
        
        let html = `${indent}<${tag}>${node.topic}</${tag}>\n`;
        
        if (node.children && node.children.length > 0) {
          html += `${indent}<ul>\n`;
          node.children.forEach((child: any) => {
            html += `${indent}  <li>\n`;
            html += generateNodeHTML(child, level + 1);
            html += `${indent}  </li>\n`;
          });
          html += `${indent}</ul>\n`;
        }
        
        return html;
      };

      const bodyContent = generateNodeHTML(data.nodeData);
      
      return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.nodeData.topic || 'Mind Map'}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #f9f9f9;
        }
        h1 { 
            color: #2c3e50; 
            border-bottom: 3px solid #3498db; 
            padding-bottom: 10px; 
            margin-bottom: 20px;
        }
        h2 { 
            color: #34495e; 
            border-left: 4px solid #3498db; 
            padding-left: 10px; 
            margin: 20px 0 10px 0;
        }
        h3 { 
            color: #34495e; 
            margin: 15px 0 8px 0;
        }
        h4 { 
            color: #7f8c8d; 
            margin: 10px 0 5px 0;
        }
        ul { 
            margin: 10px 0; 
            padding-left: 20px; 
        }
        li { 
            margin: 5px 0; 
            line-height: 1.4;
        }
        .container {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            padding: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
${bodyContent}
    </div>
</body>
</html>`;
    };

    const htmlContent = convertMindDataToHTML(mindData);

    // 将HTML内容转换为Buffer（blob）
    const htmlBuffer = Buffer.from(htmlContent, 'utf-8');

    // 保存到数据库
    const savedRecord = await prisma.mindMapHTML.create({
      data: {
        address: address || null, // 可选的钱包地址
        htmlBlob: htmlBuffer,
      },
    });

    return NextResponse.json({
      html: htmlContent,
      id: savedRecord.id,
      success: true
    });

  } catch (error) {
    console.error('Error generating HTML:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
