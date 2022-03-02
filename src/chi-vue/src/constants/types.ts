//#region GENERAL
export const GENERAL_POSITIONS = ['left', 'top', 'right', 'bottom'] as const;
//#endregion

//#region Checkbox
export type CheckboxState = boolean | 'indeterminate';
//#endregion

//#region Data Table
export const DATA_TABLE_SIZE = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export type DataTableSizes = typeof DATA_TABLE_SIZE[number];
export const DATA_TABLE_EXPANSION_ICON_STYLES = ['portal', 'base'] as const;
export type DataTableRowLevels = 'parent' | 'child' | 'grandChild';
export type PrintModes = 'full' | 'printonly' | 'screenonly';
export interface DataTableExpansionIcons {
  portal: {
    expanded: string;
    collapsed: string;
  };
  base: {
    expanded: string;
    collapsed: string;
  };
}
export type DataTableExpansionIconStyles = typeof DATA_TABLE_EXPANSION_ICON_STYLES[number];
export const DATA_TABLE_SCREEN_BREAKPOINTS = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export type DataTableScreenBreakpoints = typeof DATA_TABLE_SCREEN_BREAKPOINTS[number];
export interface DataTableStyleConfig {
  portal?: boolean;
  compact?: boolean;
  bordered?: boolean;
  noBorder?: boolean;
  hover?: boolean;
  striped?: boolean;
  size?: DataTableSizes;
}
export interface DataTableRowNestedContent {
  table: {
    data: DataTableRow[];
  };
  template: string;
  value: string;
  payload: any;
}
export interface DataTableRow {
  active: boolean;
  expanded: boolean;
  data: Record<string, any>;
  level: number;
  nestedContent: DataTableRowNestedContent;
  id: string;
  parentRow?: DataTableRow | undefined;
  rowId: string;
  rowNumber: string;
  selected?: boolean | 'indeterminate';
  selectionDisabled?: boolean;
}
export interface DataTableData {
  head: {
    [code: string]: {
      label: string;
      sortable?: boolean;
      sortBy?: string;
      sortDataType?: 'string' | 'number' | 'date' | 'boolean';
      align?: 'left' | 'center' | 'right';
      allowOverflow?: 'visible' | 'hidden';
      key?: boolean;
      bold?: boolean;
      description?: string | DataTableColumnDescription;
      isPrintDisabled?: boolean;
    };
  };
  body: DataTableRow[];
}

export interface DataTableColumnDescription {
  title?: string;
  text?: string;
  template?: string;
  payload?: any;
}

export interface DataTableSortConfig {
  key: string;
  sortBy?: string;
  direction: 'ascending' | 'descending';
}
export enum DataTableModes {
  CLIENT = 'clientside',
  SERVER = 'serverside',
}
export interface DataTableConfig {
  activePage?: number;
  columnResize?: boolean;
  columnSizes?: {
    xs: number[];
    sm: number[];
    md: number[];
    lg: number[];
    xl: number[];
  };
  defaultSort?: DataTableSortConfig;
  unsorted?: boolean;
  mode?: 'clientside' | 'serverside';
  noResultsMessage?: string;
  pagination: {
    activePage?: number;
    compact?: boolean;
    firstLast?: boolean;
    hideOnSinglePage?: boolean;
    pages?: number;
    pageJumper?: boolean;
    results?: number;
  };
  resultsPerPage?: number;
  style: DataTableStyleConfig;
  selectable?: boolean | 'radio';
  reserveExpansionSlot?: boolean;
  truncation?: boolean;
  printMode?: PrintModes;
}
export interface DataTableFilter {
  name: string;
  label: string;
  type: 'select' | 'input' | 'checkbox' | 'textarea' | 'template';
  id: string;
  options?: [
    {
      value: string;
      label: string;
      selected: true;
    }
  ];
  value?: string;
  checked?: boolean;
  defaultValue?: string;
  placeholder: string;
  advanced?: true;
  template?: string;
}
export interface DataTableCustomItem {
  template: string;
  label: string;
}
export interface DataTableColumn {
  name: string;
  label: string;
  selected: boolean;
  locked: true;
}
export interface DataTableColumnsData {
  columns: DataTableColumn[];
}
export interface DataTableFiltersData {
  filters: DataTableFilter[];
}
export interface DataTableColumnsData {
  columns: DataTableColumn[];
}
export type DataTableFormElementFilters = 'select' | 'input' | 'textarea' | 'checkbox';
export interface DataTableView {
  id: string;
  label: string;
  searchString?: string;
  filters?: DataTableFilter[];
  columns?: DataTableColumn[];
}

export type DataTableCellAlignment = 'left' | 'center' | 'right';
//#endregion

//#region Drawer
export type DrawerPositions = typeof GENERAL_POSITIONS[number];
export type Backdrop = 'inverse' | '';
//#endregion

//#region Pagination
export const PAGINATION_SIZES = ['sm', 'md', 'lg', 'xl'] as const;
export type PaginationSizes = typeof PAGINATION_SIZES[number];
//#endregion

//#region Search Input
export const SEARCH_INPUT_SIZES = ['sm', 'md', 'lg', 'xl'] as const;
export type SearchInputSizes = typeof SEARCH_INPUT_SIZES[number];
//#endregion

//#region Tooltip
export type TooltipPositions = typeof GENERAL_POSITIONS[number];
export const TOOLTIP_COLORS = ['light', 'base'] as const;
export type TooltipColors = typeof TOOLTIP_COLORS[number];
//#endregion
