import { User } from "../model/IUser";
import {Badge} from "../model/IBadge";
import {Quest} from "../model/IQuest";
import axios from "axios";
import { config } from "../core";
import {BadgeDetailsListItem} from "../model/IBadgeDetailsListItem";
import {QuestDetailsListItem} from "../model/IQuestDetailsListItem";
import {UserDetailsListItem} from "../model/IUserDetailsListItem";

export const getByRequestUrl = (requestUrl: string) => {
  return axios
  .get(requestUrl, config)
  .then((res) => {
    return Promise.resolve(res.data);
  })
  .catch((err) => {
    console.log(err);
    return Promise.reject(err);
  });
};

export const getViewportAsPixels = (pageSizePx: number, viewportSize: number): number => {
    return (viewportSize * pageSizePx) / 100;
};

export const getDefaultBadge = (): Badge => {
  return {
    id: 0,
    name: "",
    obtained_at: "",
    user: getDefaultUser()
  };
};

export const getDefaultQuest = (): Quest => {
  return {
    id: 0,
    task: "",
    correct_answer: "",
    answer: "",
    tokens: 0,
    user: getDefaultUser()
  };
};

export const getDefaultUser = (): User => {
  return {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    tokens: 0,
  };
};

export const getDefaultBadgeDetailsListItem = (): BadgeDetailsListItem => {
  return {
    id: 0,
    name: "",
    obtained_at: "",
    user: ""
  };
};

export const getDefaultUserDetailsListItem = (): UserDetailsListItem => {
  return {
    id: 0,
    firstName: "",
    lastName: "",
    tokens: 0,
  };
};

export const getDefaultQuestDetailsListItem = (): QuestDetailsListItem => {
  return {
    id: 0,
    task: "",
    correct_answer: "",
    answer: "",
    tokens: 0,
    user: ""
  };
};

export let loggedUser: User = getDefaultUser();

export const setLoggedUser = (value: User) => {
  loggedUser = value;
};

export let selectedBadge: BadgeDetailsListItem = getDefaultBadgeDetailsListItem();

export const setSelectedBadge = (value: BadgeDetailsListItem) => {
  selectedBadge = value;
};

export let selectedUser: UserDetailsListItem = getDefaultUserDetailsListItem();

export const setSelectedUser = (value: UserDetailsListItem) => {
  selectedUser = value;
};

export let selectedQuest: QuestDetailsListItem = getDefaultQuestDetailsListItem();

export const setSelectedQuest = (value: QuestDetailsListItem) => {
  selectedQuest = value;
};