import axios from "axios";
import { config } from "../../core";
import { Quest } from "../../model/IQuest";
import { QuestService } from "../../utils/service";

export const createQuest: (quest: Quest) => Promise<Quest> = (
    quest
) => {
  return axios
    .post(QuestService.CREATE, quest)
    .then((res) => {
      return Promise.resolve(res.data);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const updateQuest: (quest: Quest) => Promise<Quest> = (
    quest
) => {
  return axios
    .put(`${QuestService.UPDATE}${quest.id}`, quest, config)
    .then((res) => {
      return Promise.resolve(res.data);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
