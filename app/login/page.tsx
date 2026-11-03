'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/features/auth/presentation/hooks/use-auth';
import { LoginForm } from '@/src/features/auth/presentation/components/LoginForm';
import { LoginParams } from '@/src/features/auth/domain/repositories/auth.repository';

export default function LoginPage() {
    const router = useRouter();
    const { login, isLoading, errorMessage, clearError } = useAuth();

    // El error vive en el store global de auth: se limpia al entrar a esta pantalla
    // para que no se arrastre el mensaje de la otra (login <-> registro)
    useEffect(() => {
        clearError();
    }, [clearError]);

    const handleLogin = async (params: LoginParams): Promise<boolean> => {
        const ok = await login(params);
        // Redirección por evento: replace para que "atrás" no regrese al login
        if (ok) router.replace('/routines');
        return ok;
    };

    return (
        <section data-screen="login" className="min-h-screen bg-base-200 grid place-items-center px-4 py-10">
            <LoginForm onSubmit={handleLogin} isLoading={isLoading} errorMessage={errorMessage} />
        </section>
    );
}
