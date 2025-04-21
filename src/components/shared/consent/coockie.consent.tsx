'use client';

import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {  X } from "lucide-react";
import Link from "next/link";

export default function CookieConsent() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookieConsent");
        if (!consent) {
            setOpen(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookieConsent", "true");
        setOpen(false);
    };

    const declineCookies = () => {
        localStorage.setItem("cookieConsent", "false");
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Usamos Cookies</DialogTitle>
                    <DialogDescription className="tracking-wider">
                        Este site utiliza cookies para melhorar sua experiência.<br/>
                        <Link href={"/politicas/cookies"} className="text-blue-500 font-bold">
                            para mais informações!
                        </Link>{"\t"}
                        Você aceita o uso de cookies?
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                    <Button variant="outline" onClick={declineCookies}>
                        Recusar
                    </Button>
                    <Button onClick={acceptCookies}>
                        Aceitar
                    </Button>
                </DialogFooter>

                {/* Botão de Fechar no canto */}
                <button
                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none"
                    onClick={() => setOpen(false)}
                >
                    <X className="h-4 w-4" />
                </button>
            </DialogContent>
        </Dialog>
    );
};