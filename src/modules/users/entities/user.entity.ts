export interface SystemUser {
    id: string;
    username: string;
    email: string;
    name: string;
    role: 'ADMIN' | 'CASHIER' | 'AUDIT';
    isActive: boolean;
    createdAt: string;
}

export interface UserDto {
    username: string;
    email: string;
    app_key: string;
    name: string;
    role: 'ADMIN' | 'CASHIER' | 'AUDIT';
}