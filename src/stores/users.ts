import { AccessService } from "@/service/access";
import { RolesService } from "@/service/roles";
import { UserService } from "@/service/user";
import { createContainer } from "@/util/context"
import { useState } from "react";

type DataType = {
  id: number
  email: string
  userName: string
  type: string
  createdAt: string
}

const Users = () => {
  const [data, setData] = useState<DataType[]>([]);

  const headers = [
    { label: "ID", key: "id" },
    { label: "Email", key: "email" },
    { label: "UserName", key: "userName" },
    { label: "Type", key: "type" },
    { label: "CreatedAt", key: "createdAt" },
    { label: "Action", key: "action" },
  ];

  const initData = async () => {
    try {
      const { data } = await UserService.getMany({})
      setData(data.data.users)
    } catch (err) {
      console.error(err);
    }
  }


  return {
    initData, data, headers,
  }
}

export const UsersStore = createContainer(Users);


