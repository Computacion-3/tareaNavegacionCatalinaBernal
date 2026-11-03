import { User } from '../../domain/entities/user';
import { LoginParams, RegisterParams } from '../../domain/repositories/auth.repository';
import { UserResponseDto, LoginDto, RegisterDto } from '../dtos/user.dto';

export class UserMapper {
    static toDomain(dto: UserResponseDto): User {
        return new User({
            id: dto.id,
            name: dto.name,
            email: dto.email,
            createdAt: new Date(dto.created_at),
        });
    }

    static toLoginDto(params: LoginParams): LoginDto {
        return {
            email: params.email,
            password: params.password,
        };
    }

    static toRegisterDto(params: RegisterParams): RegisterDto {
        return {
            name: params.name,
            email: params.email,
            password: params.password,
        };
    }
}
