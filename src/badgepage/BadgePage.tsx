import { CommandBar, DetailsList, IColumn, IContextualMenuItem, Stack, StackItem, ThemeProvider } from "@fluentui/react";
import { DetailsListLayoutMode, IObjectWithKey, Selection, SelectionMode } from "@fluentui/react/lib/DetailsList";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { IMainPageProps } from "../model/IMainPageProps";
import { BadgeDetailsListItem } from "../model/IBadgeDetailsListItem";
import {VIEW_QUESTPAGE, VIEW_RANKING, LOGOUT} from "../utils/generalConstants";
import {BadgeService} from "../utils/service";
import {
  getViewportAsPixels,
  getByRequestUrl,
  loggedUser, setSelectedBadge, setLoggedUser, getDefaultUser
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
} from "./BadgePage.styles";
import {Badge} from "../model/IBadge";

const NAME_COLUMN: string = "Name";
const OBTAINED_AT_COLUMN: string = "Obtained At";

const getColumnName = (nameB: string, obtained_at: string, name: string): string => {
  return name === nameB
    ? nameB
    : name === obtained_at
    ? obtained_at : name;
};

const getFieldName = (columnName: string): string => {
  return columnName === NAME_COLUMN
    ? "name"
    : columnName === OBTAINED_AT_COLUMN
    ? "obtained_at"
    : "";
};

const getColumn = (pageWidth: number, name: string): IColumn => {
  return {
    key: name,
    name: getColumnName(NAME_COLUMN,OBTAINED_AT_COLUMN,name),
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

export const getListItemFromMainPage = (badge : Badge): BadgeDetailsListItem => {
  return {
    id: badge.id,
    name: badge.name,
    obtained_at: badge.obtained_at,
  };
};

const renderItemColumn = (item: any, index?: number, column?: IColumn): React.ReactFragment => {
  const fieldContent = item[column!.fieldName as keyof BadgeDetailsListItem] as string;

  return (
    <React.Fragment>
      {column!.fieldName !== "created"
        ? <span className={itemStyle}>{fieldContent}</span>
        : <span className={itemStyleForLastColumn}>{fieldContent}</span>
      }
    </React.Fragment>
  );
};

const getBadgeMain = (allBadges: Badge[]): BadgeDetailsListItem[] => {
  return allBadges.map((item) => getListItemFromMainPage(item));
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

const BadgePage = (props: IMainPageProps): JSX.Element => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState<BadgeDetailsListItem[]>([]);
  const [badge, setBadgeMain] = useState<Badge[]>([]);
  const [selectedItems, setSelectedItems] = useState<IObjectWithKey[] | undefined>(undefined);
  const [selection] = useState<Selection>(
    () =>
      new Selection({
        onSelectionChanged: () => {
          const selectedItems: IObjectWithKey[] = selection.getSelection();
          const selected: BadgeDetailsListItem = selectedItems[0] as BadgeDetailsListItem;
          setSelectedBadge(selected);
          setSelectedItems(selectedItems);
        }
      })
  );

  const columns: IColumn[] = getColumns(props.pageWidth, [NAME_COLUMN, OBTAINED_AT_COLUMN]);
  const menuItems: IContextualMenuItem[] = getMenuItems([VIEW_QUESTPAGE, VIEW_RANKING, LOGOUT]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    getAllBadges();
  }, []);


    const getAllBadges= async () => {
      const allBadges: Badge[] = await getByRequestUrl(`${BadgeService.GET_ALL_BADGES_BY_USER}${loggedUser.id}`);
      setItems(getBadgeMain(allBadges));
      setBadgeMain(allBadges);
    };

  const getSelectedItem = (): IObjectWithKey => {
    return selectedItems![0];
  };

  const getTitle = (): string => {
    return `${"Badge page for "}${loggedUser.firstName}${ " "}${loggedUser.lastName}${"!"}`;
  };


  const onViewQuestsClicked = (): void => {
    if (isAuthenticated) {
      navigate("/quests");
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


  const updateMenuItems = (): IContextualMenuItem[] => {
    return menuItems.map((item: IContextualMenuItem) => {
      switch (item.key) {
        case VIEW_QUESTPAGE:
          item.onClick = () => onViewQuestsClicked();
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

export default BadgePage;
