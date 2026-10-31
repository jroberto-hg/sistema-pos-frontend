import { httpClient } from "../../../shared/axios-client";
import type { AuthUser, LoginCredentials } from "../entities/auth.entity";

export const authRepository = {
    /**
     * Inicia sesión enviando el username o email junto con la app_key.
     * El backend establecerá la cookie HttpOnly de sesión en la respuesta.
    */
    async login(credentials: LoginCredentials): Promise<AuthUser> {
        const response = await httpClient.post<AuthUser>('/auth/login', credentials);
        return response.data;
    },

    /**
     * Obtiene el perfil del usuario autenticado actualmente mediante la cookie HttpOnly.
    */
    async getProfile(): Promise<AuthUser> {
        const response = await httpClient.get<AuthUser>('/auth/profile');
        return response.data;
    },

    /**
     * Cierra la sesión destruyendo la cookie HttpOnly en el backend.
    */
    async logout(): Promise<void> {
        await httpClient.post('/auth/logout');
    }
}