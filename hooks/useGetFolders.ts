import useFetch from "hooks/useFetch"

export type GetFolderResponse = {
    id: number;
    created_at: Date;
    name: string;
    user_id: number;
    favorite: boolean;
    link: {
      count: number;
    };
  };

export const useGetFolders = (userId: number) => {
    return useFetch(`${process.env.NEXT_PUBLIC_API}/users/${userId}/folders`)
}