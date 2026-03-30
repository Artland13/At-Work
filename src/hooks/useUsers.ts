import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUserById, fetchUsers, updateUserApi } from "@api/users";
import { useUserStore } from "../store/useUserStore";
import { IUser } from "../types/user";
import { useEffect } from "react";
import { QUERY_KEYS } from "@api/api";

export const useUsers = () => {
  const { setUsers, users: storedUsers } = useUserStore();

  const query = useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (query.data && storedUsers.length === 0) {
      setUsers(query.data);
    }
  }, [query.data, setUsers, storedUsers.length]);

  return query;
};

export const useUser = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.USER(id),
    queryFn: () => fetchUserById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { updateUser: updateUserInStore } = useUserStore();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<IUser> }) =>
      updateUserApi(id, data),
    onSuccess: (updatedUser, variables) => {
      queryClient.setQueryData([QUERY_KEYS.USER(variables.id)], updatedUser);

      queryClient.setQueryData(
        [QUERY_KEYS.USERS],
        (old: IUser[] | undefined) => {
          if (!old) return [updatedUser];
          return old.map((user) =>
            user.id === variables.id ? { ...user, ...updatedUser } : user,
          );
        },
      );

      updateUserInStore(variables.id, updatedUser);
    },
  });
};
