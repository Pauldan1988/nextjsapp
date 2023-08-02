import { NextResponse } from "next/server";
import { prisma } from "@/db"; 

export async function PATCH(req: Request) {
    const { id, complete } = await req.json()

    const updatedTask = await prisma.todo.update({
        where: {
            id: id,
        },
        data: {
            complete: complete,
        }
    })

    return NextResponse.json(updatedTask)
}