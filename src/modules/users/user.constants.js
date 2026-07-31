export const USER_COLUMNS = ["id", "name", "email"];

export const USER_SEARCH_FIELDS = ["name", "email"];

export const USER_SORT_FIELDS = USER_COLUMNS;

export const USER_DEFAULT_PAGE_SIZE = 10;

export const USER_MAX_PAGE_SIZE = 100;

export const USER_SORT_ENUM = [
  ...USER_COLUMNS,
  ...USER_COLUMNS.map((field) => `-${field}`),
];

export const DEAFULT_USERS_SORT_COLUMN = USER_COLUMNS[0];
