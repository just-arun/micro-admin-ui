import { createContainer } from "@/util/context"
import { useState } from "react";

const Access = () => {
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
      label: "Keys",
      key: "key"
    }
  ]);
  const [tableData, setTableData] = useState([
    {
      "id": 1,
      "name": "create role",
      "key": "auth.role.create"
    },
    {
      "id": 2,
      "name": "create access",
      "key": "auth.access.create"
    }
  ]);

  const [selected, setSelected] = useState<any[]>([])



  return {
    tableHeader, tableData, setTableHeader, selected, setSelected,
  }
}

export const AccessStore = createContainer(Access);


