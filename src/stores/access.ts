import { AccessService } from "@/service/access";
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
    },
    {
      label: "Action",
      key: "action"
    },
  ]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [metaData, setMetaData] = useState({
    limit: 10,
    skip: 0,
    page: 1,
    total: 20
  });

  const initData = async () => {
    try {
      setLoading(true)
      return AccessService.getAccess({
        limit: perPage,
        search: search,
        page: page,
      }).then(res => {
        let data = res.data
        setTableData(data.data.accesses)
        let metaData = { ...data.metaData }
        metaData.page = metaData.page;
        setMetaData(metaData);
      }).catch(err => {
        console.error(err);
      }).finally(() => {
        setLoading(false)
      });
    } catch (err) {
      setLoading(false)
      console.error(err);
    }
  }

  const [accessData, setAccessData] = useState<{ id: any, name: string, key: string } | null>(null)
  const [formType, setFormType] = useState<"create" | "update">("create");


  const onSubmit = () => {
    if (formType == "create") {
      return createAccess()
    }
    return updateAccess()
  }

  const updateAccess = async () => {
    try {
      await AccessService.updateOneName(accessData?.id, {
        name: accessData?.name,
      })
    } catch (err) {
      console.error(err);
    }
  }

  const createAccess = async () => {
    try {
      await AccessService.create(accessData)
    } catch (err) {
      console.error(err);
    }
  }

  return {
    tableHeader, tableData, setTableHeader, initData,
    search, setSearch, perPage, setPerPage, metaData,
    page, setPage, accessData, setAccessData, formType,
    setFormType, onSubmit, loading,
  }
}

export const AccessStore = createContainer(Access);


