import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { id, published, transactionHash } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    // 将 id 转换为数字（因为我们使用的是 autoincrement ID）
    const mindMapId = parseInt(id.toString());
    
    if (isNaN(mindMapId)) {
      return NextResponse.json(
        { error: 'Invalid ID format' },
        { status: 400 }
      );
    }

    // 更新数据库中的发布状态
    const updatedMindMap = await prisma.mindMapHTML.update({
      where: { id: mindMapId },
      data: { 
        published: published ?? true,
        // 可以添加交易哈希字段用于追踪
        ...(transactionHash && { transactionHash })
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedMindMap,
      redirectUrl: `/api/view/${mindMapId}`,
    });

  } catch (error) {
    console.error('Error updating publish status:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to update publish status',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
