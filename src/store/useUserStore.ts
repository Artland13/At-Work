import { create } from "zustand";
import { IUserStore } from "../types/index";

export const useUserStore = create<IUserStore>((set) => ({
  users: [],

  setUsers: (users) => set({ users }),

  archiveUser: (id) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, isArchived: true } : user,
      ),
    })),

  unarchiveUser: (id) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, isArchived: false } : user,
      ),
    })),
  hideUser: (id) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, isHidden: true } : user,
      ),
    })),
  updateUser: (id, updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...updatedUser } : user,
      ),
    })),
}));
