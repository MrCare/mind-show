import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  context: RouteParams
) {
  try {
    const { id } = await context.params;

    // 将字符串ID转换为数字
    const numericId = parseInt(id, 10);
    
    if (isNaN(numericId)) {
      return new NextResponse('Invalid ID format', { status: 400 });
    }

    // 从数据库获取HTML内容
    const record = await prisma.mindMapHTML.findUnique({
      where: {
        id: numericId,
      },
    });

    if (!record) {
      return new NextResponse('HTML not found', { status: 404 });
    }

    // 检查是否已发布，如果未发布则不允许访问
    if (!record.published) {
      return new NextResponse('This mind map has not been published yet', { status: 403 });
    }

    // 将Buffer转换回字符串
    const htmlContent = Buffer.from(record.htmlBlob).toString('utf-8');

    // 返回HTML内容
    return new NextResponse(htmlContent, {
      headers: {
        'Content-Type': 'text/html',
      },
    });

  } catch (error) {
    console.error('Error retrieving HTML:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
