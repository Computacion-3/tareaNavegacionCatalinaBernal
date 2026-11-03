export interface UserResponseDto {
    id: number;
    name: string;
    email: string;
    created_at: string; 
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    name: string;
    email: string;
    password: string;
}
