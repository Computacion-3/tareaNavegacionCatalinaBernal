'use client'

import { useAppDispatch, useAppSelector } from "@/src/store/hooks";

export function useAuth() {
    const dispatch = useAppDispatch();

    const routines = useAppSelector((state) => state.routines.items);
    const isLoading = useAppSelector((state) => state.routines.isLoading);
    const isMutating = useAppSelector((state) => state.routines.isMutating);
    const errorMessage = useAppSelector((state) => state.routines.errorMessage);
    return();
}