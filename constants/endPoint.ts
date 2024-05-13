export const API_ENDPOINTS = {
  FOLDERS: "/folders",
  FOLDER_DETAIL: (folderId: number) => `/folders/${folderId}`,

  LINKS: "/links",
  FOLDER_LINKS_DETAIL: (folderId: number) => `/folders/${folderId}/links`,
  LINK_DETAIL: (linkId: number) => `/links/${linkId}`,

  USERS: "/users",
  CHECK_EMAIL: "/users/check-email",

  SIGN_IN: "/auth/sign-in",
  SIGN_UP: "/auth/sign-up",
} as const;
