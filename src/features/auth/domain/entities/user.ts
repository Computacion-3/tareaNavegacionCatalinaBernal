export interface UserProps {
    readonly id: number;
    readonly name: string;
    readonly email: string;
    readonly createdAt: Date;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class User {
    readonly id: number;
    readonly name: string;
    readonly email: string;
    readonly createdAt: Date;

    constructor(props: UserProps) {
        this.validate(props);
        this.id = props.id;
        this.name = props.name.trim();
        this.email = props.email.trim().toLowerCase();
        this.createdAt = props.createdAt;
    }

    private validate(props: UserProps): void {
        if (!props.name || props.name.trim().length < 3) {
            throw new Error('El nombre debe tener al menos 3 caracteres.');
        }

        if (!props.email || !EMAIL_REGEX.test(props.email.trim())) {
            throw new Error('El correo no tiene un formato válido.');
        }
    }

    get firstName(): string {
        return this.name.split(' ')[0];
    }
}
