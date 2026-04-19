import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { dateTime: 'desc' },
      include: { agent: true, therapyType: true },
    });
    return NextResponse.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { agentId, therapyTypeId, dateTime, duration, notes, status } = await request.json();

    if (!agentId || !therapyTypeId || !dateTime) {
      return NextResponse.json(
        { error: 'Agent, therapy type, and date/time are required' },
        { status: 400 }
      );
    }

    const therapyType = await prisma.therapyType.findUnique({
      where: { id: therapyTypeId },
      select: { duration: true },
    });

    if (!therapyType) {
      return NextResponse.json({ error: 'Therapy type not found' }, { status: 404 });
    }

    const existing = await prisma.appointment.findFirst({
      where: {
        agentId,
        therapyTypeId,
        dateTime: new Date(dateTime),
      },
    });
    if (existing) {
      return NextResponse.json(
        { error: 'An appointment already exists for this agent, therapy type, and time' },
        { status: 409 }
      );
    }

    const appointment = await prisma.appointment.create({
      data: {
        agentId,
        therapyTypeId,
        dateTime: new Date(dateTime),
        duration: duration ?? therapyType.duration,
        notes: notes || '',
        status: status || 'scheduled',
      },
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 });
  }
}
