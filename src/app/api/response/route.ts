
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, question, answer, stageIndex } = body;

        if (!userId || !question || !answer || stageIndex === undefined) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const response = await prisma.response.create({
            data: {
                userId,
                question,
                answer,
                stageIndex,
            },
        });

        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        console.error('Error saving response:', error);
        return NextResponse.json({ error: 'Failed to save response' }, { status: 500 });
    }
}
