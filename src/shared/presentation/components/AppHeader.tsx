'use client';

import Link from 'next/link';
import { useAuth } from '@/src/features/auth/presentation/hooks/use-auth';

const APP_NAME = 'GymRoutines';
const FALLBACK_INITIALS = 'AP';

/**
 * Header de la aplicación: nombre de la app y acciones de usuario (avatar + dropdown).
 * Solo habla con el hook fachada useAuth, nunca con Redux directamente.
 */
export function AppHeader() {
    const { user, logout } = useAuth();
    const initials = user?.initials || FALLBACK_INITIALS;

    return (
        <header className="navbar bg-base-100 border-b border-base-300 px-4 md:px-6">
            <div className="flex-1">
                <Link href="/routines" className="text-xl md:text-2xl font-bold">
                    {APP_NAME}
                </Link>
            </div>

            <div className="dropdown dropdown-end">
                <div
                    tabIndex={0}
                    role="button"
                    aria-label="Acciones de usuario"
                    className="btn btn-circle border-0 bg-indigo-700 text-white hover:bg-indigo-800"
                >
                    {initials}
                </div>
                <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box shadow-md border border-base-200 z-20 mt-3 w-52 p-2"
                >
                    <li>
                        {/* "Mi perfil" aún no existe: visible pero sin navegación */}
                        <button type="button" aria-disabled="true">
                            Mi perfil
                        </button>
                    </li>
                    <li>
                        <Link href="/login" onClick={logout}>
                            Cerrar sesión
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}
