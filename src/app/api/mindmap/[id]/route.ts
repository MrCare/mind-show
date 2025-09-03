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
      return NextResponse.json(
        { error: 'Invalid ID format' },
        { status: 400 }
      );
    }

    // 从数据库获取思维导图数据
    const record = await prisma.mindMapHTML.findUnique({
      where: {
        id: numericId,
      },
      select: {
        id: true,
        mindMapData: true,
        published: true,
        address: true,
        createdAt: true,
        transactionHash: true,
      },
    });

    if (!record) {
      return NextResponse.json(
        { error: 'Mind map not found' },
        { status: 404 }
      );
    }

    // 返回思维导图数据
    return NextResponse.json({
      success: true,
      data: {
        id: record.id,
        mindMapData: record.mindMapData,
        published: record.published,
        address: record.address,
        createdAt: record.createdAt,
        transactionHash: record.transactionHash,
      },
    });

  } catch (error) {
    console.error('Error retrieving mind map data:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
