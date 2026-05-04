import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event, label, category, pathname } = body;
    
    const headersList = headers();
    const userAgent = headersList.get('user-agent') || '';
    
    // Simple device detection
    const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
    const device = isMobile ? 'Mobile' : 'Desktop';

    await prisma.analytics.create({
      data: {
        event,
        label: label || null,
        category: category || null,
        pathname: pathname || null,
        device,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics save error:', error);
    return NextResponse.json({ error: 'Failed to save analytics' }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Basic aggregation for the dashboard
    const totalVisits = await prisma.analytics.count();
    
    const deviceStats = await prisma.analytics.groupBy({
      by: ['device'],
      _count: {
        device: true,
      },
    });

    const eventStats = await prisma.analytics.groupBy({
      by: ['event'],
      _count: {
        event: true,
      },
      orderBy: {
        _count: {
          event: 'desc',
        },
      },
      take: 5,
    });

    // Get visits in the last 24h vs previous 24h for "change" calculation
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const dayBeforeYesterday = new Date(now.getTime() - 48 * 60 * 60 * 1000);

    const visitsLast24h = await prisma.analytics.count({
      where: { timestamp: { gte: yesterday } },
    });

    const visitsPrev24h = await prisma.analytics.count({
      where: { 
        timestamp: { 
          gte: dayBeforeYesterday,
          lt: yesterday,
        } 
      },
    });

    return NextResponse.json({
      totalVisits: totalVisits || 0,
      deviceStats: deviceStats || [],
      eventStats: eventStats || [],
      visitsLast24h: visitsLast24h || 0,
      visitsPrev24h: visitsPrev24h || 0,
    });
  } catch (error) {
    console.error('Analytics fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
