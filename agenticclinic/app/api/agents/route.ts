import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const agents = await prisma.agent.findMany({
      include: { ailments: true, appointments: { include: { therapyType: true } } },
    });
    return NextResponse.json(agents);
  } catch (error) {
    console.error('Error fetching agents:', error);
    return NextResponse.json({ error: 'Failed to fetch agents' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, status } = await request.json();

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const agent = await prisma.agent.create({
      data: { name, status: status || 'active' },
    });

    return NextResponse.json(agent, { status: 201 });
  } catch (error) {
    console.error('Error creating agent:', error);
    return NextResponse.json({ error: 'Failed to create agent' }, { status: 500 });
  }
}
