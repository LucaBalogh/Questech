import { projectBaseUrl } from "./generalConstants";

export const questBaseUrl: string = `${projectBaseUrl}${"quests/"}`;
export const badgeBaseUrl: string = `${projectBaseUrl}${"badges/"}`;

export namespace BadgeService {
  export const GET_ALL_BADGES_BY_USER: string = `${badgeBaseUrl}${"get-all-by-user/"}`;
}

export namespace QuestService {
  export const GET_ALL_QUESTS: string = `${questBaseUrl}${"get-all"}`;
  export const CREATE: string = `${questBaseUrl}${"create/"}`;
  export const UPDATE: string = `${questBaseUrl}${"update/"}`;
}

export namespace LoginService{
  export const GET_LOGGED_USER: string = `${projectBaseUrl}${"get-user/"}`;
  export const GET_RANKING: string = `${projectBaseUrl}${"get-all"}`;
}
