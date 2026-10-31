export interface AuthUser {
    id: string;
    username?: string;
    email?: string;
    name: string;
    role: 'ADMIN' | 'CASHIER' | 'AUDIT';
}

export interface LoginCredentials {
    username?: string;
    email?: string;
    app_key: string;
}