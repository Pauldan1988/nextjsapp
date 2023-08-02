import { prisma } from "@/db"
import { NextResponse } from "next/server"
import axios from "axios"
//@ts-ignore
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    //@ts-ignore
    const id = params.id
    console.log("params", params)
    try {
    const deletedTodo = await prisma.todo.delete({
        where: {
            id: id
        }
    })
    console.log(deletedTodo)

        return NextResponse.json(deletedTodo)
    } catch (error) {
        return NextResponse.json({ "error": error })
    }
}


// export async function GET(
//     request: Request,
//     { params }: { params: { slug: string } }
//   ) {
//     const slug = params.slug // 'a', 'b', or 'c'
//   }



    // const { id } = req.query
    // try {
    // const todoId = await prisma.todo.delete({
    //     where: {
    //         id: String(query.id)
    //     }
    // })
    //     const deleteTodo = async (todoId: string) => {
    //         const response = await axios.delete(`/api/delete/${todoId}`)
    //         return response
    //     }
    //     return NextResponse.json(deleteTodo)
    // } catch (error) {
    // }







// return NextResponse.json(`/api/get`)
// try {
//     const todoId = await prisma.todo.delete({
//         where: {
//             id: String(query.id)
//         }
//     })
//     const deleteTodo = async (id: string) => {
//         const response = await axios.delete(`/api/delete/${id}`)
//         return response
//     }
//     // return NextResponse.json(deleteTodo)
// } catch (error) {
//     return NextResponse.json({ "error": error })
// }