'use client';

import { useRouter } from 'next/navigation';
import { useRoutines } from '@/src/features/routines/presentation/hooks/use-routines';
import { RoutineCard } from '@/src/features/routines/presentation/components/RoutineCard';

const TABS = [
    { id: 'rutinas', label: 'Rutinas', enabled: true },
    { id: 'ejercicios', label: 'Ejercicios', enabled: false },
    { id: 'progreso', label: 'Progreso', enabled: false },
] as const;

const USER_INITIALS = 'AP';

export default function RoutinesCleanPage() {
    const router = useRouter();
    const { routines, isLoading, errorMessage } = useRoutines();

    const handleLogout = () => {
        // Cuando exista el caso de uso de logout, se invoca aquí antes de redirigir
        router.push('/login');
    };

    return (
        <section data-screen="app" className="min-h-screen bg-base-200">
            {/* Barra superior */}
            <header className="navbar bg-base-100 border-b border-base-300 px-5">
                <div className="flex-1">
                    <h1 className="text-2xl font-bold">GymRoutines</h1>
                </div>

                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        aria-label="Acciones de usuario"
                        className="w-11 h-11 rounded-full bg-indigo-700 text-white font-semibold flex items-center justify-center cursor-pointer"
                    >
                        {USER_INITIALS}
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box shadow-md border border-base-200 z-10 mt-3 w-52 p-2"
                    >
                        <li>
                            {/* "Mi perfil" aún no existe: se deja visible pero sin navegación */}
                            <button type="button" onClick={(e) => e.preventDefault()}>
                                Mi perfil
                            </button>
                        </li>
                        <li>
                            <button type="button" onClick={handleLogout}>
                                Cerrar sesión
                            </button>
                        </li>
                    </ul>
                </div>
            </header>

            {/* Pestañas */}
            <nav className="bg-base-100 px-5 py-3 flex gap-2" role="tablist">
                {TABS.map((tab) => {
                    const isActive = tab.id === 'rutinas';
                    return (
                        <button
                            key={tab.id}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            aria-disabled={!tab.enabled}
                            onClick={(e) => {
                                if (!tab.enabled) e.preventDefault();
                            }}
                            className={`px-4 py-2 rounded-md text-sm transition-colors ${
                                isActive
                                    ? 'bg-neutral text-neutral-content'
                                    : 'cursor-pointer hover:bg-base-300'
                            }`}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </nav>

            {/* Contenido: Rutinas */}
            <main className="p-5">
                {errorMessage && (
                    <div className="alert alert-error mb-4">
                        <span>{errorMessage}</span>
                    </div>
                )}

                {isLoading && routines.length === 0 ? (
                    <div className="flex justify-center items-center py-12 gap-3 text-sm opacity-60">
                        <span className="loading loading-spinner loading-md"></span>
                        <span>Cargando rutinas...</span>
                    </div>
                ) : routines.length === 0 ? (
                    <div className="alert alert-info">
                        <span>No hay rutinas registradas aún.</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {routines.map((routine) => (
                            <RoutineCard key={routine.id} routine={routine} />
                        ))}
                    </div>
                )}
            </main>
        </section>
    );
}
