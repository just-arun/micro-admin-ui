import { AccessService } from "@/service/access";
import { RolesService } from "@/service/roles";
import { UserService } from "@/service/user";
import { createContainer } from "@/util/context"
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

type DataType = {
  id: number
  email: string
  userName: string
  type: string
  createdAt: string
}

const UserDetail = () => {
  const [data, setData] = useState<DataType | null>(null);
  const [userRoles, setUserRoles] = useState([]);
  const [userRolesCopy, setUserRolesCopy] = useState([]);
  const [roles, setRoles] = useState([]);

  const headers = [
    { label: "ID", key: "id" },
    { label: "Email", key: "email" },
    { label: "UserName", key: "userName" },
    { label: "Type", key: "type" },
    { label: "CreatedAt", key: "createdAt" },
    { label: "Action", key: "action" },
  ];

  const initData = async (id: any) => {
    try {
      await fetchUser(id)
      await fetchRoles()
    } catch (err) {
      console.error(err);
    }
  }

  const userRoleAltered = useMemo(() => JSON.stringify(userRoles) != JSON.stringify(userRolesCopy), [userRoles])

  const fetchUser = async (id: any) => {
    try {
      const { data } = await UserService.getOne(`${id}`);
      setData(data.data.user)

      setUserRoles(data.data.user.roles.map((e: any) => ({ id: e.id, name: e.name })))
      setUserRolesCopy(JSON.parse(JSON.stringify(data.data.user.roles.map((e: any) => ({ id: e.id, name: e.name })))))
    } catch (err) {
      console.error(err);
    }
  }

  const fetchRoles = async () => {
    try {
      const { data } = await RolesService.getAllNames()
      setRoles(data.data.roles);
    } catch (err) {
      console.error(err);
    }
  }

  const updateRole = (id: any) => {
    return UserService.updateUserRole(id, userRoles).then((res) => {
      console.log(res.data);
      return initData(id)
    }).catch(err => {
      console.error(err);
    })
  }

  return {
    initData, data, headers, userRolesCopy,
    roles, setRoles, userRoles, setUserRoles,
    userRoleAltered, updateRole, 
  }
}

export const UserDetailStore = createContainer(UserDetail);


