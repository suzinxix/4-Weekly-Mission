import useFetch from "utils/hooks/useFetch"

export const useGetFolders = (userId: number) => {
    return useFetch(`${process.env.NEXT_PUBLIC_API}/users/${userId}/folders`)
}