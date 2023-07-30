import { NextResponse } from "next/server";
import { prisma } from "@/db";

export async function GET(req: Request) {
    const allTasks = await prisma.todo.findMany() 

    return NextResponse.json(allTasks)
}