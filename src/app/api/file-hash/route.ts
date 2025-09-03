import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { keccak256 } from 'viem';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Missing required parameter: id' },
        { status: 400 }
      );
    }

    // 将字符串ID转换为数字
    const numericId = parseInt(id, 10);
    
    if (isNaN(numericId)) {
      return NextResponse.json(
        { error: 'Invalid ID format' },
        { status: 400 }
      );
    }

    // 从数据库获取HTML blob
    const mindMap = await prisma.mindMapHTML.findUnique({
      where: { id: numericId },
      select: { htmlBlob: true },
    });

    if (!mindMap) {
      return NextResponse.json(
        { error: 'MindMap not found' },
        { status: 404 }
      );
    }

    // 计算文件哈希
    const htmlBuffer = mindMap.htmlBlob;
    const fileHash = keccak256(htmlBuffer);

    return NextResponse.json({
      fileHash,
      success: true,
    });
  } catch (error) {
    console.error('Error getting file hash:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
