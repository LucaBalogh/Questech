import { CommandBar, DetailsList, IColumn, IContextualMenuItem, Stack, StackItem, ThemeProvider } from "@fluentui/react";
import { DetailsListLayoutMode, IObjectWithKey, Selection, SelectionMode } from "@fluentui/react/lib/DetailsList";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { IMainPageProps } from "../model/IMainPageProps";
import { UserDetailsListItem } from "../model/IUserDetailsListItem";
import {VIEW_QUESTPAGE, VIEW_BADGES, LOGOUT} from "../utils/generalConstants";
import {LoginService} from "../utils/service";
import {
  getViewportAsPixels,
  getByRequestUrl,
  loggedUser, setSelectedBadge, setLoggedUser, getDefaultUser, setSelectedUser
} from "../utils/utilsMethods";
import {
  commandBarStyles,
  defaultMenuItemStyle,
  detailsListColumnStyle,
  itemStyle,
  enabledMenuItemStyle,
  setGapBetweenHeaders,
  setGapBetweenHeadersAndDetailsList,
  transparentTheme,
  itemStyleForLastColumn,
  setGapBetweenHeadersAndUserInfo, setStyleForUserName
} from "./RankingPage.styles";
import {User} from "../model/IUser";

const FIRST_NAME_COLUMN: string = "First Name";
const LAST_NAME_COLUMN: string = "Second Name";
const TOKENS_COLUMN: string = "Tokens";

const getColumnName = (firstName: string, lastName: string, tokens: string, name: string): string => {
  return name === firstName
    ? firstName
    : name === lastName
    ? lastName
    : name === tokens
    ? tokens: name;
};

const getFieldName = (columnName: string): string => {
  return columnName === FIRST_NAME_COLUMN
    ? "firstName"
    : columnName === LAST_NAME_COLUMN
    ? "lastName"
    : columnName === TOKENS_COLUMN
    ? "tokens"
    : "";
};

const getColumn = (pageWidth: number, name: string): IColumn => {
  return {
    key: name,
    name: getColumnName(FIRST_NAME_COLUMN,LAST_NAME_COLUMN,TOKENS_COLUMN,name),
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

export const getListItemFromMainPage = (user : User): UserDetailsListItem => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    tokens: user.tokens,
  };
};

const renderItemColumn = (item: any, index?: number, column?: IColumn): React.ReactFragment => {
  const fieldContent = item[column!.fieldName as keyof UserDetailsListItem] as string;

  return (
    <React.Fragment>
      {column!.fieldName !== "created"
        ? <span className={itemStyle}>{fieldContent}</span>
        : <span className={itemStyleForLastColumn}>{fieldContent}</span>
      }
    </React.Fragment>
  );
};

const getUserMain = (allUsers: User[]): UserDetailsListItem[] => {
  return allUsers.map((item) => getListItemFromMainPage(item));
};

const getMenuItem = (name: string): IContextualMenuItem => {
  return {
    key: name,
    text: name,
    iconProps: { iconName: name },
  };
};

const getMenuItems = (names: string[]): IContextualMenuItem[] => {
  return names.map((name: string) => getMenuItem(name));
};

const RankingPage = (props: IMainPageProps): JSX.Element => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState<UserDetailsListItem[]>([]);
  const [user, setUserMain] = useState<User[]>([]);
  const [selectedItems, setSelectedItems] = useState<IObjectWithKey[] | undefined>(undefined);
  const [selection] = useState<Selection>(
    () =>
      new Selection({
        onSelectionChanged: () => {
          const selectedItems: IObjectWithKey[] = selection.getSelection();
          const selected: UserDetailsListItem = selectedItems[0] as UserDetailsListItem;
          setSelectedUser(selected);
          setSelectedItems(selectedItems);
        }
      })
  );

  const columns: IColumn[] = getColumns(props.pageWidth, [FIRST_NAME_COLUMN, LAST_NAME_COLUMN, TOKENS_COLUMN]);
  const menuItems: IContextualMenuItem[] = getMenuItems([VIEW_QUESTPAGE, VIEW_BADGES, LOGOUT]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    getAllUsers();
  }, []);


    const getAllUsers= async () => {
      const allUsers: User[] = await getByRequestUrl(LoginService.GET_RANKING);
      setItems(getUserMain(allUsers));
      setUserMain(allUsers);
    };

  const getSelectedItem = (): IObjectWithKey => {
    return selectedItems![0];
  };

  const getTitle = (): string => {
    return "Ranking page";
  };


  const onQuestViewClicked = (): void => {
    if (isAuthenticated) {
      navigate("/quests");
    }
  };

  const onBadgeViewClicked = (): void => {
    if (isAuthenticated) {
      navigate("/badges");
    }
  };

  const onLogOutClicked = (): void => {
      setLoggedUser(getDefaultUser());
      navigate("/");
  };


  const updateMenuItems = (): IContextualMenuItem[] => {
    return menuItems.map((item: IContextualMenuItem) => {
      switch (item.key) {
        case VIEW_QUESTPAGE:
          item.onClick = () => onQuestViewClicked();
          item.style = enabledMenuItemStyle
          break;
        case VIEW_BADGES:
          item.onClick = () => onBadgeViewClicked();
          item.style = enabledMenuItemStyle
          break;
        case LOGOUT:
          item.onClick = () => onLogOutClicked();
          item.style = enabledMenuItemStyle
          break;
        default:
          return item;
      }
      return item;
    });
  };

  return (
      <div>
        <Stack className="hero is-fullheight has-background-dark" tokens={setGapBetweenHeadersAndDetailsList}>
          <Stack horizontal tokens={setGapBetweenHeadersAndUserInfo}>
            <StackItem tokens={setGapBetweenHeaders}>
              <p className="title has-text-white is-size-3 marginFH2"> {getTitle()} </p>
            </StackItem>
          </Stack>
          <StackItem>
            <ThemeProvider theme={transparentTheme}>
              <CommandBar id = "view" items={updateMenuItems()} styles={commandBarStyles} />
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

export default RankingPage;
