export interface QuestDetailsListItem {
    id: number;
    task: string;
    correct_answer?: string;
    answer?: string;
    tokens: number;
    user: string;
}