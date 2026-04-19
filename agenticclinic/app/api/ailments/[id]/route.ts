import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ailment = await prisma.ailment.findUnique({
      where: { id: params.id },
      include: { agent: true, treatments: true },
    });

    if (!ailment) {
      return NextResponse.json({ error: 'Ailment not found' }, { status: 404 });
    }

    return NextResponse.json(ailment);
  } catch (error) {
    console.error('Error fetching ailment:', error);
    return NextResponse.json({ error: 'Failed to fetch ailment' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { name, severity, description } = await request.json();

    const ailment = await prisma.ailment.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(severity && { severity }),
        ...(description !== undefined && { description }),
      },
    });

    return NextResponse.json(ailment);
  } catch (error) {
    console.error('Error updating ailment:', error);
    return NextResponse.json({ error: 'Failed to update ailment' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.ailment.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Ailment deleted' });
  } catch (error) {
    console.error('Error deleting ailment:', error);
    return NextResponse.json({ error: 'Failed to delete ailment' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
