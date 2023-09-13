// import { sql } from '@vercel/postgres';
// import { NextResponse } from 'next/server';
 
// export async function GET(req: Request) {
//   try {
//     const result =
//       await sql`SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'todo')`;
//     return NextResponse.json({ result }, { status: 200 });
//   } catch (error) {
//     console.log(error)
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }