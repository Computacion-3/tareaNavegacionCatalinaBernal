'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
    { href: '/routines', label: 'Rutinas' },
    { href: '/exercises', label: 'Ejercicios' },
    { href: '/progress', label: 'Progreso' },
] as const;

const ACTIVE_CLASS = 'bg-neutral text-neutral-content';
const INACTIVE_CLASS = 'hover:bg-base-300';

/**
 * Navbar de secciones. El enlace activo se resalta leyendo la ruta con usePathname().
 * Móvil: botón hamburguesa con dropdown. Escritorio (md+): menu menu-horizontal.
 */
export function AppNavbar() {
    const pathname = usePathname();
    const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

    const links = NAV_LINKS.map((link) => (
        <li key={link.href}>
            <Link
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={isActive(link.href) ? ACTIVE_CLASS : INACTIVE_CLASS}
            >
                {link.label}
            </Link>
        </li>
    ));

    const currentLabel = NAV_LINKS.find((link) => isActive(link.href))?.label ?? 'Menú';

    return (
        <nav className="navbar min-h-0 bg-base-100 px-4 md:px-6 py-2" aria-label="Secciones">
            {/* Móvil: hamburguesa */}
            <div className="dropdown md:hidden">
                <div tabIndex={0} role="button" className="btn btn-ghost gap-2" aria-label="Abrir menú">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <span>{currentLabel}</span>
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box shadow-md border border-base-200 z-20 mt-2 w-52 p-2 gap-1">
                    {links}
                </ul>
            </div>

            {/* Escritorio: menú horizontal */}
            <ul className="menu menu-horizontal hidden md:flex gap-2 p-0">
                {links}
            </ul>
        </nav>
    );
}
