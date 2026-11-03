import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authContainer } from '../../di/auth.container';
import { LoginParams, RegisterParams } from '../../domain/repositories/auth.repository';
import { UserViewModel, UserViewModelMapper } from '../viewmodels/user.viewmodel';

interface AuthState {
    user: UserViewModel | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    errorMessage: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    errorMessage: null,
};

export const loginMutation = createAsyncThunk(
    'auth/login',
    async (params: LoginParams, { rejectWithValue }) => {
        try {
            const user = await authContainer.login.execute(params);
            return UserViewModelMapper.toViewModel(user);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'No se pudo iniciar sesión';
            return rejectWithValue(message);
        }
    }
);


export const registerMutation = createAsyncThunk(
    'auth/register',
    async (params: RegisterParams, { rejectWithValue }) => {
        try {
            const user = await authContainer.register.execute(params);
            return UserViewModelMapper.toViewModel(user);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'No se pudo crear la cuenta';
            return rejectWithValue(message);
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.errorMessage = null;
        },
        clearError: (state) => {
            state.errorMessage = null;
        },
    },
    extraReducers: (builder) => {
        // --- Ciclo de vida de Login ---
        builder
            .addCase(loginMutation.pending, (state) => {
                state.isLoading = true;
                state.errorMessage = null;
            })
            .addCase(loginMutation.fulfilled, (state, action: PayloadAction<UserViewModel>) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(loginMutation.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = (action.payload as string) ?? 'Error al iniciar sesión';
            });

        // --- Ciclo de vida de Registro ---
        builder
            .addCase(registerMutation.pending, (state) => {
                state.isLoading = true;
                state.errorMessage = null;
            })
            .addCase(registerMutation.fulfilled, (state, action: PayloadAction<UserViewModel>) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(registerMutation.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = (action.payload as string) ?? 'Error al crear la cuenta';
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export const authReducer = authSlice.reducer;
