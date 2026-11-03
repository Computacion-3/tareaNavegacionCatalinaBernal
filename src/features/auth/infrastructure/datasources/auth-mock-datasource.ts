import { AuthDatasource } from './auth-datasource.interface';
import { UserResponseDto, LoginDto, RegisterDto } from '../dtos/user.dto';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface MockUserRecord extends UserResponseDto {
    password: string;
}

export class AuthMockDatasource implements AuthDatasource {
    private users: MockUserRecord[] = [
        {
            id: 1,
            name: 'Ana Pérez',
            email: 'ana@correo.com',
            password: '123456',
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), // Hace 30 días
        },
    ];

    async login(dto: LoginDto): Promise<UserResponseDto> {
        await delay(600); 

        const found = this.users.find(
            (u) => u.email === dto.email && u.password === dto.password
        );

        if (!found) {
            throw new Error('Correo o contraseña incorrectos.');
        }

        return this.toResponse(found);
    }

    async register(dto: RegisterDto): Promise<UserResponseDto> {
        await delay(800); 

        if (this.users.some((u) => u.email === dto.email)) {
            throw new Error('Ya existe una cuenta registrada con ese correo.');
        }

        const nextId = this.users.length > 0
            ? Math.max(...this.users.map((u) => u.id)) + 1
            : 1;

        const newUser: MockUserRecord = {
            id: nextId,
            name: dto.name,
            email: dto.email,
            password: dto.password,
            created_at: new Date().toISOString(),
        };

        this.users.push(newUser);
        return this.toResponse(newUser);
    }

    private toResponse(record: MockUserRecord): UserResponseDto {
        return {
            id: record.id,
            name: record.name,
            email: record.email,
            created_at: record.created_at,
        };
    }
}
