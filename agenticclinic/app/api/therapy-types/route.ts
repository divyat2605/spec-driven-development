import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const therapyTypes = await prisma.therapyType.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(therapyTypes);
  } catch (error) {
    console.error('Error fetching therapy types:', error);
    return NextResponse.json({ error: 'Failed to fetch therapy types' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, description, duration } = await request.json();

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const therapyType = await prisma.therapyType.create({
      data: {
        name,
        description: description || '',
        duration: duration ?? 60,
      },
    });

    return NextResponse.json(therapyType, { status: 201 });
  } catch (error) {
    console.error('Error creating therapy type:', error);
    return NextResponse.json({ error: 'Failed to create therapy type' }, { status: 500 });
  }
}
