import { User } from '../entities/user';
import { AuthRepository, RegisterParams } from '../repositories/auth.repository';

const MIN_PASSWORD_LENGTH = 6;

export class RegisterUseCase {
    constructor(private readonly repository: AuthRepository) { }

    async execute(params: RegisterParams): Promise<User> {
        if (!params.name.trim() || !params.email.trim() || !params.password) {
            throw new Error('Todos los campos son obligatorios.');
        }

        if (params.password.length < MIN_PASSWORD_LENGTH) {
            throw new Error(`La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`);
        }

        return await this.repository.register({
            name: params.name.trim(),
            email: params.email.trim().toLowerCase(),
            password: params.password,
        });
    }
}
