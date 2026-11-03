'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/features/auth/presentation/hooks/use-auth';
import { RegisterForm } from '@/src/features/auth/presentation/components/RegisterForm';
import { RegisterParams } from '@/src/features/auth/domain/repositories/auth.repository';

export default function RegisterPage() {
    const router = useRouter();
    const { register, isLoading, errorMessage, clearError } = useAuth();

    // El error vive en el store global de auth: se limpia al entrar a esta pantalla
    // para que no se arrastre el mensaje de la otra (login <-> registro)
    useEffect(() => {
        clearError();
    }, [clearError]);

    const handleRegister = async (params: RegisterParams): Promise<boolean> => {
        const ok = await register(params);
        if (ok) router.push('/routines');
        return ok;
    };

    return (
        <section data-screen="register" className="min-h-screen bg-base-200 grid place-items-center px-4 py-10">
            <RegisterForm onSubmit={handleRegister} isLoading={isLoading} errorMessage={errorMessage} />
        </section>
    );
}
