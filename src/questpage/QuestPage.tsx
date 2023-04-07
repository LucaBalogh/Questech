import { CommandBar, DetailsList, IColumn, IContextualMenuItem, Stack, StackItem, ThemeProvider } from "@fluentui/react";
import { DetailsListLayoutMode, IObjectWithKey, Selection, SelectionMode } from '@fluentui/react/lib/DetailsList';
import React, {useCallback, useEffect, useState} from "react";
import { useNavigate} from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { QuestDetailsListItem } from "../model/IQuestDetailsListItem";
import {LoginService, QuestService} from "../utils/service";
import {
    getByRequestUrl,
    getViewportAsPixels,
    loggedUser,
    setSelectedQuest,
    selectedQuest,
    setLoggedUser, getDefaultUser
} from "../utils/utilsMethods";
import {commandBarStyles, defaultMenuItemStyle, detailsListColumnStyle, enabledMenuItemStyle, itemStyle, itemStyleForLastColumn, setGapBetweenHeaders, setGapBetweenHeadersAndDetailsList, setGapBetweenHeadersAndUserInfo, setStyleForUserName, transparentTheme} from "./QuestPage.styles";
import {IQuestProps} from "../model/IQuestProps";
import {Quest} from "../model/IQuest";
import {ADD, EDIT, VIEW_BADGES, VIEW_RANKING, LOGOUT} from "../utils/generalConstants";
import SaveQuestModal from "./questAll/SaveQuestModal";
import EditQuestModal from "./questAll/EditQuestModal";

const TASK_COLUMN: string = "Task";
const ANSWER_COLUMN: string = "Answer";
const TOKENS_COLUMN: string = "Tokens";
const CREATED_BY_COLUMN: string = "User";

const getColumnName = (task: string, answer: string, tokens: string, user: string, name: string): string => {
    return name === task
        ? task
            : name === answer
                ? answer
                : name === tokens
                    ? tokens
                    : name === user
                        ? user
                    : name;
};

const getFieldName = (columnName: string): string => {
    return columnName === TASK_COLUMN
        ? "task"
            : columnName === ANSWER_COLUMN
                ? "answer"
                : columnName === TOKENS_COLUMN
                    ? "tokens"
                    : columnName === CREATED_BY_COLUMN
                        ? "user"
                        : "";
};

const getColumn = (pageWidth: number, name: string): IColumn => {
    return {
        key: name,
        name: getColumnName(TASK_COLUMN,ANSWER_COLUMN,TOKENS_COLUMN, CREATED_BY_COLUMN, name),
        fieldName: getFieldName(name),
        minWidth: getViewportAsPixels(pageWidth, 10),
        maxWidth: getViewportAsPixels(pageWidth, 20),
        isResizable: true,
        isMultiline: true,
        styles: detailsListColumnStyle,
    };
};

const getColumns = (pageWidth: number, names: string[]): IColumn[] => {
    return names.map((name: string) => getColumn(pageWidth, name));
};

export const getListItemFromQuest = (quest : Quest): QuestDetailsListItem => {
    return {
        id: quest.id,
        task: quest.task,
        answer: quest.answer,
        tokens: quest.tokens,
        user: `${quest.user.firstName}${" "}${quest.user.lastName}`,
    };
};

const renderItemColumn = (item: any, index?: number, column?: IColumn): React.ReactFragment => {
    const fieldContent = item[column!.fieldName as keyof QuestDetailsListItem] as string;
    
    return (
        <React.Fragment>
      {column!.fieldName !== "created"
        ? <span className={itemStyle}>{fieldContent}</span>
        : <span className={itemStyleForLastColumn}>{fieldContent}</span>
      }
    </React.Fragment>
    );
};

const getQuestForCurrentUser = (allQuests: Quest[]): QuestDetailsListItem[] => {
    return allQuests.map((item) => getListItemFromQuest(item) );
};

const getMenuItem = (name: string): IContextualMenuItem => {
    return {
        key: name,
        text: name,
        iconProps: { iconName: name }
    }
  };
  
  const getMenuItems = (names: string[]): IContextualMenuItem[] => {
    return names.map((name: string) => getMenuItem(name));
  };

const QuestPage = (props: IQuestProps): JSX.Element => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>(`${"Quest page, you have "}${loggedUser.tokens}${ " tokens remaining!"}`);
    const [items, setItems] = useState<QuestDetailsListItem[]>([]);
    const [selectedItems, setSelectedItems] = useState<IObjectWithKey[] | undefined>(undefined);
    const [quests, setQuests] = useState<Quest[]>([]);
    const [selection] = useState<Selection>(() => new Selection({
        onSelectionChanged: () => {
            const selectedItems: IObjectWithKey[] = selection.getSelection();
            const selected: QuestDetailsListItem = selectedItems[0] as QuestDetailsListItem;
            setSelectedQuest(selected);
            setSelectedItems(selectedItems);
        }
    }));
    const columns: IColumn[] = getColumns(props.pageWidth, [TASK_COLUMN, ANSWER_COLUMN, TOKENS_COLUMN, CREATED_BY_COLUMN]);
    const menuItems: IContextualMenuItem[] = getMenuItems([ADD, EDIT, VIEW_BADGES, VIEW_RANKING, LOGOUT]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated]);

    useEffect(() => {
        getAllIncompleteQuests();
        getUser();
    }, []);

    useEffect(() => {
        setTitle(`Quest page, you have ${loggedUser.tokens} tokens remaining!`);
    }, [loggedUser.tokens]);

    const [isSaving, setIsSaving] = useState(false);
    const switchSavingMode = useCallback(
        () => setIsSaving((isSaving) => !isSaving),
        []
    );
    const [isEditing, setIsEditing] = useState(false);
    const switchEditingMode = useCallback(
        () => setIsEditing((isEditing) => !isEditing),
        []
    );

    const getUser = async () => {
        const user = await getByRequestUrl(`${LoginService.GET_LOGGED_USER}${loggedUser.email}`);
        setLoggedUser(user);
    };

    const getAllIncompleteQuests = async () => {
        const allQuests: Quest[] = await getByRequestUrl(QuestService.GET_ALL_QUESTS);
        setItems(getQuestForCurrentUser(allQuests));
        setQuests(allQuests)
    };

    const getSelectedQuest = (): Quest => {
        const index = quests.findIndex((it) => it.id === selectedQuest.id);
        return quests[index];
    };

    const getSelectedItem = (): IObjectWithKey => {
        return selectedItems![0];
    };

    const isEditOrDeleteDisabled = (checkEdit: boolean): boolean => {
        if (!selectedItems)
            return true;
    
        if (checkEdit) {
            if (selectedItems.length !== 1)
                return true;
        }
        else
            if (selectedItems.length < 1)
                return true;
        return false;
      };

    const onViewBadgesClicked = (): void => {
        if (isAuthenticated) {
            navigate("/badges");
        }
    };

    const onViewRankingClicked = (): void => {
        if (isAuthenticated) {
            navigate("/ranking");
        }
    };

    const onLogOutClicked = (): void => {
        setLoggedUser(getDefaultUser());
        navigate("/");
    };

    const onAddClicked = (): void => {
        switchSavingMode();
    };

    const onEditClicked = (): void => {
        if (quests.find((us) => us.id === selectedQuest.id) !== undefined) {
            switchEditingMode();
        }
    };

    const updateMenuItems = (): IContextualMenuItem[] => {
        return menuItems.map((item: IContextualMenuItem) => {
            switch (item.key) {
                case ADD:
                    item.onClick = () => onAddClicked();
                    item.style = enabledMenuItemStyle;
                    break;
                case VIEW_BADGES:
                    item.onClick = () => onViewBadgesClicked();
                    item.style = enabledMenuItemStyle
                    break;
                case VIEW_RANKING:
                    item.onClick = () => onViewRankingClicked();
                    item.style = enabledMenuItemStyle
                    break;
                case LOGOUT:
                    item.onClick = () => onLogOutClicked();
                    item.style = enabledMenuItemStyle
                    break;
                case EDIT:
                    item.disabled = isEditOrDeleteDisabled(true);
                    item.onClick = () => onEditClicked();
                    item.style =
                        selectedItems?.length === 1
                            ? enabledMenuItemStyle
                            : defaultMenuItemStyle;
                    break;
                default:
                    return item;
            }
            return item;
        });
    };

    return (
        <div>
        {isSaving && (
            <SaveQuestModal
                switchMode={switchSavingMode}
                items={items}
                setItems={setItems}
                quests = {quests}
                setQuests = {setQuests}
            />
        )}
        {isEditing && (
            <EditQuestModal
                switchMode={switchEditingMode}
                quest={getSelectedQuest()}
                items={items}
                setItems={setItems}
                quests={quests}
                setQuests={setQuests}
                user = {loggedUser}
            />
         )}
        <Stack className="hero is-fullheight has-background-dark" tokens={setGapBetweenHeadersAndDetailsList}>
            <Stack horizontal tokens={setGapBetweenHeadersAndUserInfo}>
                <StackItem tokens={setGapBetweenHeaders}>
                    <p className="title has-text-white is-size-3 marginFH2"> {title} </p>
                </StackItem>
            </Stack>
            <StackItem>
                <ThemeProvider theme={transparentTheme}>
                    <CommandBar items={updateMenuItems()} styles={commandBarStyles} />
                    <DetailsList className="hero is-fullheight has-background-dark"
                        items={items}
                        setKey="set"
                        columns={columns}
                        selectionMode={SelectionMode.single}
                        layoutMode={DetailsListLayoutMode.justified}
                        selection={selection}
                        selectionPreservedOnEmptyClick={true}
                        onRenderItemColumn={renderItemColumn}>
                    </DetailsList>
                </ThemeProvider>
            </StackItem>
        </Stack>
        </div>
    );
};

export default QuestPage;
