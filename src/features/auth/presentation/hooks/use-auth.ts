'use client';

import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import {
    loginMutation,
    registerMutation,
    logout as logoutAction,
    clearError as clearErrorAction,
} from '../store/auth.slice';
import { LoginParams, RegisterParams } from '../../domain/repositories/auth.repository';


export function useAuth() {
    const dispatch = useAppDispatch();

    // 1. Lectura del estado global
    const user = useAppSelector((state) => state.auth.user);
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    const isLoading = useAppSelector((state) => state.auth.isLoading);
    const errorMessage = useAppSelector((state) => state.auth.errorMessage);

    // 2. Login: devuelve true si el thunk terminó en fulfilled
    const login = async (params: LoginParams): Promise<boolean> => {
        const resultAction = await dispatch(loginMutation(params));
        return loginMutation.fulfilled.match(resultAction);
    };

    // 3. Registro: misma idea que el login
    const register = async (params: RegisterParams): Promise<boolean> => {
        const resultAction = await dispatch(registerMutation(params));
        return registerMutation.fulfilled.match(resultAction);
    };

    // 4. Acciones síncronas
    const logout = useCallback(() => {
        dispatch(logoutAction());
    }, [dispatch]);

    const clearError = useCallback(() => {
        dispatch(clearErrorAction());
    }, [dispatch]);

    return {
        user,
        isAuthenticated,
        isLoading,
        errorMessage,
        login,
        register,
        logout,
        clearError,
    };
}
