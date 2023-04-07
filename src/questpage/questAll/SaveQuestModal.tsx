import React, { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import { Quest } from "../../model/IQuest";
import { QuestDetailsListItem } from "../../model/IQuestDetailsListItem";
import { QuestContext } from "./QuestProvider";
import {getListItemFromQuest} from "../QuestPage";
import {User} from "../../model/IUser";
import {loggedUser} from "../../utils/utilsMethods";

export interface SaveQuestModalProps {
  switchMode: () => void;
  items: QuestDetailsListItem[];
  setItems: (items: QuestDetailsListItem[]) => void;
  quests: Quest[];
  setQuests: (items: Quest[]) => void;
}

interface SaveQuestModalState {
  task?: string;
  correct_answer?: string;
  answer?: string;
  tokens?: number;
  user?: User;
}

const SaveQuestModal: React.FC<SaveQuestModalProps> = ({
  switchMode,
  items,
  setItems,
  quests,
  setQuests,
}) => {
  const { saving, savingError, saveQuest } = useContext(QuestContext);
  const { user } = useContext(AuthContext);
  const initialState = {
    user: user,
  };
  const [state, setState] = useState<SaveQuestModalState>(initialState);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveQuest?.(state).then((q: Quest) => {
      console.log(q);
      if (q) {
        const newItems: QuestDetailsListItem[] = items;
        newItems.splice(items.length, 0, getListItemFromQuest(q));
        quests.splice(quests.length, 0, q);
        setItems(newItems);
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
            <p className="modal-card-title">Add Quest</p>
            <form onSubmit={handleSubmit} className="form">
              <div className="field mt-4">
                <div className="label has-text-weight-light">Task</div>
                <input
                  type="text"
                  id = "task"
                  className="input"
                  onChange={(e) =>
                    setState({ ...state, task: e.currentTarget.value || "" })
                  }
                  required
                />
              </div>
              <div className="field mt-4">
                <div className="label has-text-weight-light">Correct Answer</div>
                <input
                    type="text"
                    id = "correct_answer"
                    className="input"
                    onChange={(e) =>
                        setState({ ...state, correct_answer: e.currentTarget.value || "" })
                    }
                    required
                />
              </div>
              <div className="field mt-4">
                <div className="label has-text-weight-light">Answer</div>
                <input
                    type="text"
                    id = "answer"
                    className="input"
                    onChange={(e) =>
                        setState({ ...state, answer: e.currentTarget.value || "" })
                    }
                    required
                />
              </div>
              <div className="field mt-4">
                <div className="label has-text-weight-light">Tokens</div>
                <input
                    type="text"
                    id = "tokens"
                    className="input"
                    onChange={(e) => {
                      const value = parseInt(e.currentTarget.value) || 0;
                      if (loggedUser.tokens && value > loggedUser.tokens) {
                        setState({ ...state, tokens: value });
                      } else {
                        setState({ ...state, tokens: 0 });
                      }
                    }}
                    required
                />
              </div>
              <div className="field mt-4">
                <div className="label has-text-weight-light">User</div>
                <input
                    type="text"
                    className="input"
                    value={`${state.user?.firstName} ${state.user?.lastName}`}
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
                <button className="button is-dark is-fullwidth" id = "save">Save</button>
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

export default SaveQuestModal;
