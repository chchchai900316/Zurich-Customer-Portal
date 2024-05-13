"use client";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SProvider from "@/components/sProvider";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Loading from "@/components/loading";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/");
        }
    });

    if (status === "loading") {
        return (
            <Loading />
        );
    }

    if (session) {
        return (
            <SProvider>
                <Header />
                {children}
                <Footer />
            </SProvider >
        );
    }



    redirect("/");
}