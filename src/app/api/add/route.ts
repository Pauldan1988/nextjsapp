import { NextResponse } from "next/server";
import { prisma } from "@/db";

export async function POST(req: Request) {
    const { title } = await req.json()

    const newTask = await prisma.todo.create({
        data: {
            title: title,
        }
    })

    return NextResponse.json(newTask)
}