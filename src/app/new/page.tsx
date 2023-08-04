"use client"

import Link from "next/link";
import { prisma } from "@/db";
import { useRouter } from "next/navigation";
import { TasksDispatchContext } from "@/components/TasksContext";
import { useContext } from "react";



//* Form that generates the textbox and buttons for creating a new todo item
export default function Home() {
    const dispatch = useContext(TasksDispatchContext);
    const router = useRouter();

    function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        //@ts-ignore
        const title = e.target.title.value;
        // console.log(e.target.title.value)
        //@ts-ignore
        dispatch({
            type: 'added',
            text: title,
        })
        router.push("/");
    }
    return (
        <>
            <header className="flex justify-between items-center mb-4">
                <h1 className="text-2xl">New</h1>
            </header>
            <form onSubmit={handleCreate} className="flex gap-2 flex-col">
                <input
                    type="text"
                    name="title"
                    className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
                />
                <div className="flex gap-1 justify-end">
                    <Link
                        href=".."
                        className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
                    >Create</button>
                </div>
            </form>
        </>
    )
}