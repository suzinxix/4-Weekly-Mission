export const QUERY_KEYS = {
  USER: ["user"] as const,
  FOLDERS: ["folders"] as const,
  LINKS: (folderId?: number | null) =>
    folderId ? (["links", folderId] as const) : (["links"] as const),
};
