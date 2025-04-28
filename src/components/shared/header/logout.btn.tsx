"use client";

import { exitLogin } from "@/actions/login.actions";
import { LogOutIcon } from "lucide-react";
import { useTransition } from "react";

export function LogoutButton() {
    const [isPending, startTransition] = useTransition();

    function handleLogout() {
        const closeButton = window.document.getElementById("close-btn")
        if (closeButton) {
            closeButton.click()
        }
        startTransition(() => exitLogin());
    }

    return (
        <button
            type="button"
            onClick={handleLogout}
            disabled={isPending}
            className="flex flex-nowrap items-center gap-5 my-2 py-2 w-full"
        >
            <LogOutIcon />
            {isPending ? "Saindo..." : "Logout"}
        </button>
    );
}
