import { NextResponse } from "next/server";
import { prisma } from "@/db";
import axios from "axios"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id
        console.log("params", params)

        const editedTask = await prisma.todo.update({
            where: {
                id: id
            },
            data: {
                id: id,
            }
        })
        return NextResponse.json(editedTask)
    } catch (error) {
        return NextResponse.json({ "error": error })
    }
}