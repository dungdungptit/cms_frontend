declare module Login {
    export interface User {
        username: string;
        password: string;
        is_superuser: false,
        first_name: string,
        last_name: string,
        email: string,
        is_staff: true,
        is_active: true,
        date_joined: string,
        last_login: string,
    }

    export interface Auth {
        user: User;
        accessTokens: string;
    }
}
