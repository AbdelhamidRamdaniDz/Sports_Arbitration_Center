import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const rangeParam = parseInt(searchParams.get('range') || '7', 10)
    const windowDays = [7, 30, 90].includes(rangeParam) ? rangeParam : 7

    const now = new Date();
    const days: Date[] = [];
    for (let i = windowDays - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      days.push(startOfDay(d));
    }
    const nextDays = days.map((d) => new Date(d.getTime() + 24 * 60 * 60 * 1000));

    const [
      arbitrationCount,
      mediationCount,
      newMessagesCount,
      newsCount,
      photoCount,
      videoCount,
    ] = await Promise.all([
      prisma.arbitration.count(),
      prisma.mediation.count(),
      prisma.contactMessage.count({ where: { read: false } }),
      prisma.news.count(),
      prisma.photo.count(),
      prisma.video.count(),
    ]);

    // Trends last 7 days
    const arbitrationByDay = await Promise.all(
      days.map((d, i) =>
        prisma.arbitration.count({
          where: { createdAt: { gte: d, lt: nextDays[i] } },
        })
      )
    );
    const mediationByDay = await Promise.all(
      days.map((d, i) =>
        prisma.mediation.count({
          where: { createdAt: { gte: d, lt: nextDays[i] } },
        })
      )
    );

    const trend = days.map((d, i) => ({
      date: d.toISOString().slice(0, 10),
      arbitration: arbitrationByDay[i],
      mediation: mediationByDay[i],
    }));

    // Recent requests
    const recentArbitrations = await prisma.arbitration.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, clientName: true, type: true, status: true, createdAt: true },
    });
    const recentMediations = await prisma.mediation.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, clientName: true, email: true, status: true, createdAt: true },
    });

    // Notifications: mix of contact messages and news
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 3,
      select: { id: true, subject: true, createdAt: true },
    });
    const news = await prisma.news.findMany({
      orderBy: { createdAt: "desc" },
      take: 2,
      select: { id: true, title: true, createdAt: true },
    });

    const notifications = [
      ...messages.map((m) => ({ id: `msg_${m.id}`, type: "message" as const, title: m.subject ?? "رسالة جديدة", createdAt: m.createdAt })),
      ...news.map((n) => ({ id: `news_${n.id}`, type: "news" as const, title: n.title, createdAt: n.createdAt })),
    ]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5)
      .map((n) => ({ ...n, createdAt: n.createdAt.toISOString() }));

    const mediaCount = newsCount + photoCount + videoCount;

    return NextResponse.json({
      counts: {
        arbitration: arbitrationCount,
        mediation: mediationCount,
        newMessages: newMessagesCount,
        media: mediaCount,
      },
      trend,
      recent: {
        arbitration: recentArbitrations,
        mediation: recentMediations,
      },
      notifications,
    });
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
