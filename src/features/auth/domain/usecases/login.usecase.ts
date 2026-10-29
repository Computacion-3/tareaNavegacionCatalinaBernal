import { User } from '../entities/user';
import { AuthRepository, LoginParams } from '../repositories/auth.repository';

export class LoginUseCase {
    constructor(private readonly repository: AuthRepository) { }

    async execute(params: LoginParams): Promise<User> {
        if (!params.email.trim() || !params.password) {
            throw new Error('Completa el correo y la contraseña.');
        }

        return await this.repository.login({
            email: params.email.trim().toLowerCase(),
            password: params.password,
        });
    }
}
