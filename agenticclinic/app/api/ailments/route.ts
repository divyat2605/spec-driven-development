import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const ailments = await prisma.ailment.findMany({
      include: { agent: true, treatments: true },
    });
    return NextResponse.json(ailments);
  } catch (error) {
    console.error('Error fetching ailments:', error);
    return NextResponse.json({ error: 'Failed to fetch ailments' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, severity, description, agentId } = await request.json();

    if (!name || !agentId) {
      return NextResponse.json(
        { error: 'Name and agentId are required' },
        { status: 400 }
      );
    }

    const ailment = await prisma.ailment.create({
      data: {
        name,
        severity: severity || 'moderate',
        description: description || '',
        agentId,
      },
    });

    return NextResponse.json(ailment, { status: 201 });
  } catch (error) {
    console.error('Error creating ailment:', error);
    return NextResponse.json({ error: 'Failed to create ailment' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
