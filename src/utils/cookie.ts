"use server"
import { cookies } from "next/headers";

export async function saveCookie({ id, to_guard, time = 60 * 60 * 8 }: { id: string, to_guard: string, time?: number }) {
    const cookieStore = await cookies();
    cookieStore.set(id, to_guard, {
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      httpOnly: true,
      maxAge: time,
    });
}

export async function retrieveCookie(id: string): Promise<string | null> {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(id)
    if (cookie) {
        return cookie.value
    } else {
        return null;
    }
}

export async function deleteCookie(id: string) {
    const cookieStore = await cookies();
    console.log("deletando cookie: ", id)
    cookieStore.delete(id)
}