import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');

    if (!address) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    // 获取当前钱包地址的最新一条未发布数据
    const latestUnpublishedData = await prisma.mindMapHTML.findFirst({
      where: {
        address: address,
        published: false, // 只获取未发布的数据
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        createdAt: true,
        published: true,
        transactionHash: true,
      },
    });

    // 获取当前钱包地址的所有已发布数据
    const publishedData = await prisma.mindMapHTML.findMany({
      where: {
        address: address,
        published: true, // 只获取已发布的数据
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        address: true,
        createdAt: true,
        transactionHash: true,
      },
      take: 20, // 限制返回最近20条
    });

    return NextResponse.json({
      success: true,
      data: {
        latestUnpublishedData,
        publishedData,
      },
    });

  } catch (error) {
    console.error('Error fetching history:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
