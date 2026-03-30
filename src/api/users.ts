import { API_BASE_URL, API_ENDPOINTS } from "@api/api";
import { IUser } from "../types/user";

// Моковые данные на случай ошибки(у меня плейсхолдер без впн не работает)
const mockUsers: IUser[] = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: { lat: "-37.3159", lng: "81.1496" },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
    isArchived: false,
    isHidden: false,
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    address: {
      street: "Victor Plains",
      suite: "Suite 879",
      city: "Wisokyburgh",
      zipcode: "90566-7771",
      geo: { lat: "-43.9509", lng: "-34.4618" },
    },
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
    company: {
      name: "Deckow-Crist",
      catchPhrase: "Proactive didactic contingency",
      bs: "synergize scalable supply-chains",
    },
    isArchived: false,
    isHidden: false,
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "Nathan@yesenia.net",
    address: {
      street: "Douglas Extension",
      suite: "Suite 847",
      city: "McKenziehaven",
      zipcode: "59590-4157",
      geo: { lat: "-68.6102", lng: "-47.0653" },
    },
    phone: "1-463-123-4447",
    website: "ramiro.info",
    company: {
      name: "Romaguera-Jacobson",
      catchPhrase: "Face to face bifurcated interface",
      bs: "e-enable strategic applications",
    },
    isArchived: false,
    isHidden: false,
  },
  {
    id: 4,
    name: "Patricia Lebsack",
    username: "Karianne",
    email: "Julianne.OConner@kory.org",
    address: {
      street: "Hoeger Mall",
      suite: "Apt. 692",
      city: "South Elvis",
      zipcode: "53919-4257",
      geo: { lat: "29.4572", lng: "-164.2990" },
    },
    phone: "493-170-9623 x156",
    website: "kale.biz",
    company: {
      name: "Robel-Corkery",
      catchPhrase: "Multi-tiered zero tolerance productivity",
      bs: "transition cutting-edge web services",
    },
    isArchived: false,
    isHidden: false,
  },
  {
    id: 5,
    name: "Chelsey Dietrich",
    username: "Kamren",
    email: "Lucio_Hettinger@annie.ca",
    address: {
      street: "Skiles Walks",
      suite: "Suite 351",
      city: "Roscoeview",
      zipcode: "33263",
      geo: { lat: "-31.8129", lng: "62.5342" },
    },
    phone: "(254)954-1289",
    website: "demarco.info",
    company: {
      name: "Keebler LLC",
      catchPhrase: "User-centric fault-tolerant solution",
      bs: "revolutionize end-to-end systems",
    },
    isArchived: false,
    isHidden: false,
  },
  {
    id: 6,
    name: "Mrs. Dennis Schulist",
    username: "Leopoldo_Corkery",
    email: "Karley_Dach@jasper.info",
    address: {
      street: "Norberto Crossing",
      suite: "Apt. 950",
      city: "South Christy",
      zipcode: "23505-1337",
      geo: { lat: "-71.4197", lng: "71.7478" },
    },
    phone: "1-477-935-8478 x6430",
    website: "ola.org",
    company: {
      name: "Considine-Lockman",
      catchPhrase: "Synchronised bottom-line interface",
      bs: "e-enable innovative applications",
    },
    isArchived: false,
    isHidden: false,
  },
];

const mapApiUserToIUser = (apiUser: IApiUser): IUser => ({
  ...apiUser,
  isArchived: false,
  isHidden: false,
});

const fetchWithTimeout = async (
  url: string,
  timeout: number = 2000,
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Превышен таймаут запроса (2 секунды)");
    }
    throw error;
  }
};

export type IApiUser = Omit<IUser, "isArchived" | "isHidden">;

export const fetchUsers = async (): Promise<IUser[]> => {
  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}${API_ENDPOINTS.USERS}`,
      2000,
    );

    if (!response.ok) {
      console.warn("API вернул ошибку, используем моковые данные");
      return mockUsers;
    }

    const users: IApiUser[] = await response.json();
    return users.slice(0, 6).map(mapApiUserToIUser);
  } catch (error) {
    console.warn(
      "Ошибка загрузки или таймаут, используем моковые данные:",
      error,
    );
    return mockUsers;
  }
};

export const fetchUserById = async (id: number): Promise<IUser> => {
  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}${API_ENDPOINTS.USER(id)}`,
      2000,
    );

    if (!response.ok) {
      console.warn("API вернул ошибку, ищем в моковых данных");
      const mockUser = mockUsers.find((u) => u.id === id);
      if (mockUser) return mockUser;
      throw new Error("Пользователь не найден");
    }

    const user: IApiUser = await response.json();
    return mapApiUserToIUser(user);
  } catch (error) {
    console.warn("Ошибка загрузки или таймаут, ищем в моковых данных:", error);
    const mockUser = mockUsers.find((u) => u.id === id);
    if (mockUser) return mockUser;
    throw new Error("Пользователь не найден");
  }
};

export const updateUserApi = async (
  id: number,
  userData: Partial<IUser>,
): Promise<IUser> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    ...userData,
    id,
  } as IUser;
};
