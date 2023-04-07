import React, { FormEvent, useContext, useState } from "react";
import { User } from "../../model/IUser";
import { Quest } from "../../model/IQuest";
import { QuestDetailsListItem } from "../../model/IQuestDetailsListItem";
import { QuestContext } from "./QuestProvider";
import {getListItemFromQuest} from "../QuestPage";

export interface EditQuestModalProps {
  switchMode: () => void;
  quest: Quest;
  items: QuestDetailsListItem[];
  setItems: (items: QuestDetailsListItem[]) => void;
  quests: Quest[];
  setQuests: (items: Quest[]) => void;
  user: User;
}

interface EditQuestModalState {
  id: number;
  task: string;
  correct_answer?: string;
  answer?: string;
  tokens: number;
  user: User;
}

const CreateQuestModal: React.FC<EditQuestModalProps> = ({
  switchMode,
  quest,
  items,
  setItems,
  quests,
  setQuests,
  user,
}) => {
  const { saving, savingError, saveQuest } = useContext(QuestContext);
  const initialState = {...quest};
  const [state, setState] = useState<EditQuestModalState>(initialState);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedQuest: Quest = {
      ...state,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        tokens: user.tokens,
      },
    };
    saveQuest?.(updatedQuest).then( (q: Quest) => {
      console.log(q);
      if (q) {
        const index = items.findIndex((it) => it.id === quest.id);
        if (index !== -1) {
          items[index] = getListItemFromQuest(q);
          quests[index] = q;
        }
        setItems(items);
        setQuests(quests);
        switchMode();
      }
    });
  };

  return (
    <div className="modal is-active">
      <div
        className="modal-background"
        onClick={() => {
          switchMode();
        }}
      />
      <div className="modal-card">
        <section className="modal-card-body has-background-light p-6">
          <div className="content">
            <p className="modal-card-title">Edit Quest</p>
            <form onSubmit={handleSubmit} className="form">
              <div className="field mt-4">
                <div className="label has-text-weight-light">Task</div>
                <input
                  value={state.task}
                  type="text"
                  className="input"
                  readOnly
                />
              </div>
              <div className="field mt-4">
                <div className="label has-text-weight-light">Answer</div>
                <input
                    value={state.answer}
                    type="text"
                    className="input"
                    id = "answer"
                    onChange={(e) =>
                        setState({ ...state, answer: e.currentTarget.value || "" })
                    }
                    required
                />
              </div>
              <div className="field mt-4">
                <div className="label has-text-weight-light">Tokens</div>
                <input
                    value={state.tokens}
                    type="text"
                    className="input"
                    readOnly
                />
              </div>
              <div className="field mt-4">
                <div className="label has-text-weight-light">User</div>
                <input
                    value={`${user.firstName} ${user.lastName}`}
                    type="text"
                    className="input"
                    readOnly
                />
              </div>
              <div className="py-2">
                {savingError && (
                  <div className="info has-text-error is-size-7 mt-2">
                    {savingError.message} <br />
                    Please use correct values
                  </div>
                )}
              </div>
              {!saving && (
                <button className="button is-dark is-fullwidth" id = "update">Edit</button>
              )}
              {saving && (
                <div className="is-dark is-fullwidth mt-6">
                  <div className="columns is-fullwidth is-centered">
                    <div className="column is-one-third" />
                    <div className="column is-one-fifth mt-2">
                      <div className="control is-loading"></div>
                    </div>
                    <div className="column is-one-third" />
                  </div>
                </div>
              )}
              <button
                className="button is-fullwidth mt-5"
                onClick={() => {
                  switchMode();
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CreateQuestModal;
