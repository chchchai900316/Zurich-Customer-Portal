"use client";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";

export default function Header() {
    return (
        <header className="w-full">
            <div className="container mx-auto p-4 flex justify-between items-center cursor-pointer">
                <h1 className="text-2xl my-2">Zurich Customer Portal</h1>
                <FontAwesomeIcon className="w-5 h-5" icon={faArrowRightFromBracket} onClick={() => signOut()} />
            </div>
        </header>
    );
}