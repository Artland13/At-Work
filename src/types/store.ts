import { IUser, IUserUpdatePayload } from "./user";

export interface IUserStore {
  users: IUser[];

  setUsers: (users: IUser[]) => void;
  archiveUser: (id: number) => void;
  unarchiveUser: (id: number) => void;
  updateUser: (id: number, updatedUser: IUserUpdatePayload) => void;
  hideUser: (id: number) => void;
}
