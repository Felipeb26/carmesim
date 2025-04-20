"use client"

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { cloneElement, ReactElement, ReactNode } from "react";

interface ActiveLinkProps extends LinkProps {
    children: ReactNode;
    activeClassName?: string;
    className?: string;
}

interface ActiveListLinkProps extends LinkProps {
    children: ReactNode;
    activeClassName?: string;
    className?: string;
    listClassName?: string;
    icon: ReactElement<SVGAElement>
}

export function ActiveLink({
    href,
    children,
    className,
    activeClassName = "text-red-500",
    ...props
}: ActiveLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`${className} ${isActive ? activeClassName : ""}`}
            {...props}
        >
            {children}
        </Link>
    );
}

export function ActiveListLink({
    href,
    children,
    className,
    activeClassName = "text-red-500",
    listClassName = "link flex flex-nowrap items-center gap-5 my-2 py-2 w-full",
    icon: Icon,
    ...props
}: ActiveListLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === href;

    const iconColor = isActive ? activeClassName.substring(5, activeClassName.length - 4) : "white";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const element = cloneElement(Icon, { color: iconColor } as any)
    return (
        <li className={listClassName}>
            {element}
            <Link
                href={href}
                className={`${className} ${isActive ? activeClassName : ""}`}
                {...props}
            >
                {children}
            </Link>
        </li>
    );
}
