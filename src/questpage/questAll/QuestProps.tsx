import {User} from "../../model/IUser";

export interface QuestProps {
  id?: number;
  task?: string;
  correct_answer?: string;
  answer?: string;
  tokens?: number;
  user?: User;
}
