import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generatePresentationHTML, validateMindMapData } from '@/lib/html-templates/presentation-generator';

export async function POST(request: NextRequest) {
  try {
    const { mindData, address, previewMode = false, updateId } = await request.json();

    // 验证思维导图数据
    if (!validateMindMapData(mindData)) {
      return NextResponse.json(
        { error: 'Invalid mind map data' },
        { status: 400 }
      );
    }

    console.log('Received request to generate HTML');
    console.log('Mind data:', JSON.stringify(mindData, null, 2));
    console.log('Preview mode:', previewMode);
    console.log('Update ID:', updateId);

    // 生成HTML内容 - 传入预览模式参数
    const htmlContent = generatePresentationHTML(mindData, previewMode);
    
    // 将HTML内容转换为Buffer（blob）
    const htmlBuffer = Buffer.from(htmlContent, 'utf-8');
    console.log('HTML buffer size:', htmlBuffer.length);

    // 保存到数据库
    try {
      console.log('Attempting to save to database...');
      let savedRecord;
      
      if (updateId && !previewMode) {
        // 如果是更新模式且不是预览模式，更新现有记录为完整版本
        savedRecord = await prisma.mindMapHTML.update({
          where: { id: parseInt(updateId.toString()) },
          data: {
            htmlBlob: htmlBuffer,
            // 不更新其他字段，保持原有的address和mindMapData
          },
        });
        console.log('Successfully updated record with ID:', savedRecord.id);
      } else {
        // 创建新记录
        savedRecord = await prisma.mindMapHTML.create({
          data: {
            address: address || null, // 可选的钱包地址
            mindMapData: mindData as any, // 存储原始思维导图数据
            htmlBlob: htmlBuffer,
            published: false, // 明确设置published字段
          },
        });
        console.log('Successfully created new record with ID:', savedRecord.id);
      }

      return NextResponse.json({
        html: htmlContent,
        id: savedRecord.id,
        success: true
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      throw dbError;
    }

  } catch (error) {
    console.error('Detailed error generating HTML:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
