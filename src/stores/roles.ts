import { AccessService } from "@/service/access";
import { RolesService } from "@/service/roles";
import { createContainer } from "@/util/context"
import { useState } from "react";

const Role = () => {
  const [tableHeader, setTableHeader] = useState([
    {
      label: "ID",
      key: "id",
    },
    {
      label: "Name",
      key: "name",
    },
    {
      label: "Action",
      key: "action"
    },
  ]);
  const [tableData, setTableData] = useState([]);


  const initData = async () => {
    try {
      const { data } = await RolesService.getAll()
      setTableData(data.data.roles)
    } catch (err) {
      console.error(err);
    }
  }

  const deleteOne = async (id: any) => {
    try {
      await RolesService.deleteOne(id)
      await initData()
    } catch (err) {
      console.error(err);
    }
  }

  return {
    tableHeader, tableData, setTableHeader, initData,
    deleteOne,
  }
}

export const RoleStore = createContainer(Role);


