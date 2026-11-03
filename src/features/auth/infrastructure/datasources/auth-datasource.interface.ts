import { UserResponseDto, LoginDto, RegisterDto } from '../dtos/user.dto';

export interface AuthDatasource {
    login(dto: LoginDto): Promise<UserResponseDto>;
    register(dto: RegisterDto): Promise<UserResponseDto>;
}
