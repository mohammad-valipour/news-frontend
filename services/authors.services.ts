import {UserTypes} from "@/types/user.types";
import {apiClient} from "@/lib/api-client";

export async function getAllAuthors(): Promise<UserTypes[]> {
    return await apiClient<UserTypes[]>(`/users`);
}