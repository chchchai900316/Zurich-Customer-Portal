"use client";

import Loading from "@/components/loading";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <Loading />
    }

    if (!session) {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <button onClick={() => signIn("google", { callbackUrl: '/members' })} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Login With Google
                </button>
            </div>
        )
    }

    return redirect("/members")
}