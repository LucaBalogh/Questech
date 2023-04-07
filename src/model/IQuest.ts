import {User} from "./IUser";

export interface Quest {
    id: number;
    task: string;
    correct_answer?: string;
    answer?: string;
    tokens: number;
    user: User;
}