'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LoginParams } from '../../domain/repositories/auth.repository';

interface LoginFormProps {
    onSubmit: (params: LoginParams) => Promise<boolean>;
    isLoading: boolean;
    errorMessage: string | null;
}

export function LoginForm({ onSubmit, isLoading, errorMessage }: LoginFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);

        if (!email.trim() || !password) {
            setFormError('Completa el correo y la contraseña.');
            return;
        }

        await onSubmit({ email: email.trim(), password });
    };

    const error = formError ?? errorMessage;
    const hasFieldError = Boolean(formError);

    return (
        <div className="card bg-base-100 w-full max-w-sm shadow-sm">
            <form onSubmit={handleSubmit} className="card-body" data-form="login" noValidate>
                <h2 className="card-title text-2xl justify-center">GymRoutines</h2>
                <p className="text-center text-base-content/70 text-sm">Inicia sesión para ver tus rutinas</p>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Correo</legend>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        className={`input w-full ${hasFieldError && !email.trim() ? 'input-error' : ''}`}
                        placeholder="tu@correo.com"
                        required
                    />

                    <legend className="fieldset-legend">Contraseña</legend>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        className={`input w-full ${hasFieldError && !password ? 'input-error' : ''}`}
                        placeholder="********"
                        required
                    />

                    {error && <p className="label text-error" data-error>{error}</p>}
                </fieldset>

                <div className="card-actions justify-end">
                    <button type="submit" disabled={isLoading} className="btn btn-primary w-full mt-2">
                        {isLoading ? <span className="loading loading-spinner loading-sm"></span> : null}
                        Iniciar Sesión
                    </button>
                </div>

                <p className="text-center text-sm mt-2">
                    ¿No tienes cuenta?{' '}
                    <Link href="/register" className="link link-primary" data-go="register">Regístrate</Link>
                </p>
            </form>
        </div>
    );
}
