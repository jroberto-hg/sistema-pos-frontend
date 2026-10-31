import { httpClient } from "../../shared/axios-client";
import type { SystemUser, UserDto } from "./entities/user.entity";

export const userRepository = { 
    async getAllUsers(): Promise<SystemUser[]> {
        const response = await httpClient.get<SystemUser[]>('/users');
        return response.data;
    },

    async create(data: UserDto): Promise<SystemUser> {
        const response = await httpClient.post<SystemUser>('/users', data);
        return response.data;
    },

    async toggleUserStatus(id: string): Promise<void> {
        await httpClient.patch(`/users/${id}/toggle-status`);
    }
}