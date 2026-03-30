import { z } from "zod";

export interface UserFormData {
  name: string;
  username: string;
  email: string;
  city: string;
  phone: string;
  companyName: string;
  avatar?: string;
}

export const userFormSchema = z.object({
  name: z
    .string()
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(64, "Имя не должно превышать 64 символа"),
  username: z
    .string()
    .min(2, "Никнейм должен содержать минимум 2 символа")
    .max(64, "Никнейм не должен превышать 64 символа"),
  email: z.string().email("Некорректный email адрес"),
  city: z
    .string()
    .min(2, "Город должен содержать минимум 2 символа")
    .max(64, "Город не должен превышать 64 символа"),
  phone: z.string().regex(/^\d+$/, "Телефон должен содержать только цифры"),
  companyName: z
    .string()
    .min(2, "Название компании должно содержать минимум 2 символа")
    .max(64, "Название компании не должно превышать 64 символа"),
});

export type UserFormDataValidated = z.infer<typeof userFormSchema>;
