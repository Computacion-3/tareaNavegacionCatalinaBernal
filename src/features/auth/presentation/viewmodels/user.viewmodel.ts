import { User } from '../../domain/entities/user';

export interface UserViewModel {
    readonly id: number;
    readonly displayName: string;
    readonly email: string;
    readonly initials: string;
    readonly greeting: string;
    readonly memberSince: string;
}

export class UserViewModelMapper {
    static toViewModel(entity: User): UserViewModel {
        const initials = entity.name
            .split(' ')
            .filter(Boolean)
            .slice(0, 2)
            .map((word) => word[0].toUpperCase())
            .join('');

        return {
            id: entity.id,
            displayName: entity.name,
            email: entity.email,
            initials,
            greeting: `Hola, ${entity.firstName}`,
            memberSince: entity.createdAt.toLocaleDateString('es-CO', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            }),
        };
    }
}
