import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { QuestProps } from "./QuestProps";
import { createQuest, updateQuest } from "./questApi";

type SaveQuestFn = (quest: QuestProps) => Promise<any>;

export interface QuestState {
  saving: boolean;
  savingError?: Error | null;
  saveQuest?: SaveQuestFn;
}

const initialState: QuestState = {
  saving: false,
};

export const QuestContext = React.createContext<QuestState>(
  initialState
);

interface QuestProviderProps {
  children: PropTypes.ReactNodeLike;
}

export const QuestProvider: React.FC<QuestProviderProps> = ({
  children,
}) => {
  const [state, setState] = useState<QuestState>(initialState);
  const { saving, savingError } = state;
  const saveQuest = useCallback<SaveQuestFn>(saveQuestCallback, []);
  const value = {
    saving,
    savingError,
    saveQuest,
  };

  return (
    <QuestContext.Provider value={value}>
      {children}
    </QuestContext.Provider>
  );

  async function saveQuestCallback(quest: QuestProps) {
    try {
      setState({...state, savingError: null, saving: true});
      const q = {
        id: quest.id!,
        task: quest.task!,
        correct_answer: quest.correct_answer!,
        tokens: quest.tokens!,
        user: quest.user!,
      };
      const qU = {
        id: quest.id!,
        task: quest.task!,
        correct_answer: quest.correct_answer!,
        answer: quest.answer!,
        tokens: quest.tokens!,
        user: quest.user!,
      };
      const savedQuest = await (quest.id
          ? updateQuest(qU)
          : createQuest(q));
      setState({...state, savingError: null, saving: false});
      return savedQuest;
    } catch (error: any) {
      setState({...state, savingError: error, saving: false});
    }
  }
};
