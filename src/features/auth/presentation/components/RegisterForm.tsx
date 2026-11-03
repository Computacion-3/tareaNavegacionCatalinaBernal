'use client';

import { useState } from 'react';
import Link from 'next/link';
import { RegisterParams } from '../../domain/repositories/auth.repository';

interface RegisterFormProps {
    onSubmit: (params: RegisterParams) => Promise<boolean>;
    isLoading: boolean;
    errorMessage: string | null;
}

export function RegisterForm({ onSubmit, isLoading, errorMessage }: RegisterFormProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formError, setFormError] = useState<string | null>(null);

    const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);

        if (!name.trim() || !email.trim() || !password || !confirmPassword) {
            setFormError('Todos los campos son obligatorios.');
            return;
        }

        if (password !== confirmPassword) {
            setFormError('Las contraseñas no coinciden.');
            return;
        }

        await onSubmit({ name: name.trim(), email: email.trim(), password });
    };

    const error = passwordsMismatch ? 'Las contraseñas no coinciden.' : formError ?? errorMessage;

    return (
        <div className="card bg-base-100 w-full max-w-sm shadow-md">
            <form onSubmit={handleSubmit} className="card-body" data-form="register" noValidate>
                <h2 className="card-title text-2xl justify-center">Crea tu cuenta</h2>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Nombre</legend>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isLoading}
                        className="input w-full"
                        placeholder="Ana Pérez"
                    />

                    <legend className="fieldset-legend">Correo</legend>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        className="input w-full"
                        placeholder="tu@correo.com"
                    />

                    <legend className="fieldset-legend">Contraseña</legend>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        className="input w-full"
                        placeholder="********"
                    />

                    <legend className="fieldset-legend">Confirmar contraseña</legend>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={isLoading}
                        className={`input w-full ${passwordsMismatch ? 'input-error' : ''}`}
                        data-confirm
                        placeholder="********"
                    />

                    {error && <p className="label text-error" data-error>{error}</p>}
                </fieldset>

                <button type="submit" disabled={isLoading} className="btn btn-primary w-full mt-2">
                    {isLoading ? <span className="loading loading-spinner loading-sm"></span> : null}
                    Crear cuenta
                </button>

                <p className="text-center text-sm mt-2">
                    ¿Ya tienes cuenta?{' '}
                    <Link href="/login" className="link link-primary" data-go="login">Inicia sesión</Link>
                </p>
            </form>
        </div>
    );
}
