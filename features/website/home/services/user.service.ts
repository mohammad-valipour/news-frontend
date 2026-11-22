import {UserTypes} from "@/types/user.types";
import {apiClient} from "@/lib/api-client";

export async function getUserByID(id: number): Promise<UserTypes> {
    const response = await apiClient<UserTypes>(`/users/${id}`);

    return response ?? [];
}