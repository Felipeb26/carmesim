"use client"
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

interface ThemeProps {
    className?: string;
}

export function ChangeTheme({ className }: ThemeProps) {
    const [lightTheme, setLightTheme] = useState(true);

    useEffect(() => {
        const theme = sessionStorage.getItem("theme");
        if (theme === "dark") {
            setLightTheme(false);
        } else {
            setLightTheme(true);
        }
    }, [])


    async function changeTheme() {
        const body = document.body;
        const theme = sessionStorage.getItem("theme");

        if (theme === "dark") {
            sessionStorage.setItem("theme", "light");
            body.classList.remove("dark");
            body.classList.add("light");
            setLightTheme(true);
        } else {
            sessionStorage.setItem("theme", "dark");
            body.classList.remove("light");
            body.classList.add("dark");
            setLightTheme(false);
        }
    }

    return (
        <button type="button" onClick={changeTheme} className={className} aria-label="mudar tema">
            {lightTheme ? <Moon /> : <Sun />}
            Mudar tema
        </button>
    );
}

export function changeTheme() {
    const body = document.body;
    const theme = sessionStorage.getItem("theme");

    if (theme === "dark") {
        sessionStorage.setItem("theme", "light");
        body.classList.remove("dark");
        body.classList.add("light");
    } else {
        sessionStorage.setItem("theme", "dark");
        body.classList.remove("light");
        body.classList.add("dark");
    }
}