import { prisma } from "@/db"
import { NextResponse } from "next/server"

//@ts-ignore
export async function DELETE(req: Request, context: any) {
    const 
    
    const delTask = await prisma.todo.delete()
 

    return NextResponse.json(`/api/get`)
}
//commit