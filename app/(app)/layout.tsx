import type { ReactNode } from 'react';
import { AppHeader } from '@/src/shared/presentation/components/AppHeader';
import { AppNavbar } from '@/src/shared/presentation/components/AppNavbar';

/**
 * Layout compartido por las pantallas internas (rutinas, ejercicios, progreso).
 * El grupo (app) no cambia las URLs: /routines sigue siendo /routines.
 */
export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <div data-screen="app" className="min-h-screen bg-base-200 flex flex-col">
            <AppHeader />
            <AppNavbar />
            <main className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-6">{children}</main>
        </div>
    );
}
