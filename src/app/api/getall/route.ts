import { NextResponse } from "next/server";
import { prisma } from "@/db";

export async function GET(req: Request) {
    const allTasks = await prisma.todo.findMany() 

    return NextResponse.json(allTasks)
}


// import { sql } from '@vercel/postgres';
// import { NextResponse } from 'next/server';
 
// export async function GET(req: Request) {

//     const todoId = await sql`SELECT 'id' FROM todo VALUE($1)`;
    

//   try {
//     const result =
//       await sql`SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'todo')`;
//     return NextResponse.json({ result }, { status: 200 });
//   } catch (error) {
//     console.log(error)
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }