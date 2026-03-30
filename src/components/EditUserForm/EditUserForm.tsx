import { useUserStore } from "@store/useUserStore";
import styles from "./EditUserForm.module.scss";
import { IUser } from "../../types/index";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { FormField } from "@components/ui/FormField/FormField";
import Button from "@components/ui/Button/Button";
import { UserFormData, userFormSchema } from "../../types";
import checkedBox from "@img/Checked-box.svg";
import cross from "@img/cross.svg";
import { useClickOutside } from "@hooks/useClickOutside";
import { useUpdateUser } from "@hooks/useUsers";

export default function EditUserForm({ user }: { user: IUser }) {
  const { updateUser: updateUserInStore } = useUserStore();
  const updateUserMutation = useUpdateUser();
  const [isSaved, setIsSaved] = useState(false);
  const toastRef = useRef<HTMLDivElement>(null);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useClickOutside(toastRef, () => {
    if (isSaved) {
      handleCloseToast();
    }
  });

  const formFields: {
    name: keyof UserFormData;
    label: string;
    type: "text" | "email" | "tel" | "password" | "number" | "textarea";
    placeholder: string;
  }[] = [
    { name: "name", label: "Имя", type: "text", placeholder: "Имя" },
    {
      name: "username",
      label: "Никнейм",
      type: "text",
      placeholder: "Никнейм",
    },
    {
      name: "email",
      label: "Почта",
      type: "email",
      placeholder: "Почта@mail.ru",
    },
    { name: "city", label: "Город", type: "text", placeholder: "Город" },
    {
      name: "phone",
      label: "Телефон",
      type: "tel",
      placeholder: "8 (999) 111-23-23",
    },
    {
      name: "companyName",
      label: "Название компании",
      type: "text",
      placeholder: "Название компании",
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
    trigger,
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      city: "",
      phone: "",
      companyName: "",
    },
    mode: "onChange",
  });

  const watchedValues = watch();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        username: user.username,
        email: user.email,
        city: user.address.city,
        phone: user.phone.replace(/\D/g, ""),
        companyName: user.company.name,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: UserFormData) => {
    if (user) {
      const updatedUser = {
        name: data.name,
        username: data.username,
        email: data.email,
        phone: data.phone,
        address: { ...user.address, city: data.city },
        company: { ...user.company, name: data.companyName },
      };

      updateUserMutation.mutate(
        { id: user.id, data: updatedUser },
        {
          onSuccess: () => {
            updateUserInStore(user.id, { ...user, ...updatedUser });
            setIsSaved(true);
          },
          onError: (error) => {
            console.error("Ошибка обновления:", error);
          },
        },
      );
    }
  };

  const handleClearField = (fieldName: keyof UserFormData) => {
    setValue(fieldName, "", { shouldValidate: true });
  };

  useEffect(() => {
    if (isSaved) {
      timeoutIdRef.current = setTimeout(() => {
        setIsSaved(false);
      }, 4000);
    }

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
    };
  }, [isSaved]);

  const handleCloseToast = () => {
    setIsSaved(false);
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.editUserForm}>
        {formFields.map((field) => (
          <FormField
            key={field.name}
            label={field.label}
            name={field.name}
            register={register}
            error={errors[field.name as keyof UserFormData]}
            type={field.type}
            placeholder={field.placeholder}
            value={watchedValues[field.name as keyof UserFormData] ?? ""}
            onClear={() => handleClearField(field.name as keyof UserFormData)}
            trigger={trigger}
          />
        ))}

        <Button type="submit" title="Сохранить" disabled={isSubmitting} />
      </form>
      {isSaved && (
        <div className={styles.toast}>
          <div className={styles.toastContent} ref={toastRef}>
            <button
              type="button"
              className={styles.crossButton}
              onClick={handleCloseToast}
            >
              <img src={cross} alt="cross" />
            </button>
            <img
              src={checkedBox}
              alt="checkedBox"
              className={styles.checkedBox}
            />
            <span>Изменения сохранены!</span>
          </div>
        </div>
      )}
    </>
  );
}
