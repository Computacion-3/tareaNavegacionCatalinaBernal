'use client';

import { useRoutines } from '@/src/features/routines/presentation/hooks/use-routines';
import { RoutineCard } from '@/src/features/routines/presentation/components/RoutineCard';

export default function RoutinesCleanPage() {
    const { routines, isLoading, errorMessage } = useRoutines();

    return (
        <section aria-label="Rutinas">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                    {routines.map((routine) => (
                        <RoutineCard key={routine.id} routine={routine} />
                    ))}
                </div>
            )}
        </section>
    );
}
