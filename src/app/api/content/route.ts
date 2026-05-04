import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { translations } from '@/constants/translations';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'id';

  try {
    const content = await prisma.content.findUnique({
      where: { language: lang },
    });

    if (!content) {
      // Fallback to static translations if DB is empty
      return NextResponse.json(translations[lang as keyof typeof translations]);
    }

    return NextResponse.json(content.data);
  } catch (error) {
    console.error('Fetch content error:', error);
    return NextResponse.json(translations[lang as keyof typeof translations]);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { lang, data } = body;

    if (!lang || !data) {
      return NextResponse.json({ error: 'Missing language or data' }, { status: 400 });
    }

    const updatedContent = await prisma.content.upsert({
      where: { language: lang },
      update: { data },
      create: { 
        language: lang, 
        data: data 
      },
    });

    return NextResponse.json(updatedContent);
  } catch (error) {
    console.error('Save content error:', error);
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}
