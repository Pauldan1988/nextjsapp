import { prisma } from "@/db"
import { NextResponse } from "next/server"
//@ts-ignore
export async function DELETE(req: Request, context: any) {
    
    const { id } = context.params
    console.log(req)
    try {

        await prisma.todo.delete({
            where: { id }
        })
        return NextResponse.json({ message: "Todo deleted successfully" })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Something went wrong" })
    }
}
