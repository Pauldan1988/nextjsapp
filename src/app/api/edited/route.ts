import { NextResponse } from "next/server";
import { prisma } from "@/db";

export async function PUT(req: Request, { params }: { params: { id: string }}) {
    const { id, title } = await req.json()

    const editedTask = await prisma.todo.update({
        where: {
            id: id,
        },
        data: {
            id: id,
            title: title,
        },
    })

    return NextResponse.json(editedTask)
}