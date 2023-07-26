import { prisma } from "@/db"

export async function DELETE(req, context, res) {
    const { id } = context.params
    console.log({id})
    try {

        await prisma.todo.delete({
            where: { id }
        })
        return res.status(200).json({ message: "Todo deleted successfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong" })
    }
}
