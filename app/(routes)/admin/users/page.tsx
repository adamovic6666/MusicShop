"use client";
import Select from "@/app/_components/UI/Select";
import {
  AdminUserListFormData,
  FormFieldName,
  OptionType,
} from "@/app/_types/Index";
import { useForm } from "react-hook-form";

const AdminPageWithAllUsers = () => {
  const { control, register } = useForm<AdminUserListFormData>({});

  const users = [
    {
      id: 1,
      email: "stan@gmail.com",
      role: "admin",
      status: "pending",
      created_date: "ASdasdasdasd",
    },
    {
      id: 2,
      email: "adam@gmail.com",
      role: "admin",
      status: "pending",
      created_date: "ASdasdasdasd",
    },
    {
      id: 3,
      email: "test@gmail.com",
      role: "user",
      status: "pending",
      created_date: "ASdasdasdasd",
    },
  ];

  const statusTypes: OptionType[] = [
    { label: "pending", value: "pending" },
    { label: "active", value: "active" },
    { label: "blocked", value: "blocked" },
  ];

  return (
    <div className="container table">
      <div>
        {Object.keys(users[0]).map((key) => (
          <span key={key}>{key}</span>
        ))}
      </div>

      {users.map(({ id, email, role, status, created_date }) => {
        return (
          <div key={id}>
            <span>{id}</span>
            <span>{email}</span>
            <span>{role}</span>
            <span>
              <Select
                options={statusTypes}
                control={control}
                {...register(FormFieldName.UserStatuses)}
              />
            </span>
            <span>{created_date}</span>
          </div>
        );
      })}
    </div>
  );
};

export default AdminPageWithAllUsers;
