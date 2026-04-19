import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const therapyType = await prisma.therapyType.findUnique({
      where: { id },
      include: { appointments: true },
    });

    if (!therapyType) {
      return NextResponse.json({ error: 'Therapy type not found' }, { status: 404 });
    }

    return NextResponse.json(therapyType);
  } catch (error) {
    console.error('Error fetching therapy type:', error);
    return NextResponse.json({ error: 'Failed to fetch therapy type' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { name, description, duration } = await request.json();

    const therapyType = await prisma.therapyType.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(duration !== undefined && { duration }),
      },
    });

    return NextResponse.json(therapyType);
  } catch (error) {
    console.error('Error updating therapy type:', error);
    return NextResponse.json({ error: 'Failed to update therapy type' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.therapyType.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Therapy type deleted' });
  } catch (error) {
    console.error('Error deleting therapy type:', error);
    return NextResponse.json({ error: 'Failed to delete therapy type' }, { status: 500 });
  }
}
