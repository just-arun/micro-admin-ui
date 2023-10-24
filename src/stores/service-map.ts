import { ServiceMapService } from "@/service/service-map"
import { createContainer } from "@/util/context"
import { useState } from "react"

const ServiceMap = () => {


  const [tableHeader, setTableHeader] = useState([
    {
      label: "ID",
      key: "id",
    },
    {
      label: "Keys",
      key: "key"
    },
    {
      label: "Value",
      key: "value",
    },
    {
      label: "Requires Auth",
      key: "auth",
    },
    {
      label: "Default",
      key: "default"
    },
    {
      label: "Action",
      key: "action"
    }
  ]);
  const [selected, setSelected] = useState<any>(null)
  const [selectedType, setSelectedType] = useState<"create" | "update" | "">("");
  const [data, setData] = useState<any[]>([])
  const [dataClone, setDataClone] = useState<any[]>([])

  const seedSelected = () => {
    setSelected({
      key: "",
      value: "",
      auth: false,
    })
  }

  const initData = async () => {
    try {
      setData([])
      setDataClone([])
      const { data } = await ServiceMapService.getServiceMap()
      const result = data.data.serviceMap.map((e: any) => ({ ...e, action: "" }))
      setData(JSON.parse(JSON.stringify(result)))
      setDataClone(JSON.parse(JSON.stringify(result)))
    } catch (err) {
      console.error(err);
    }
  }

  const updateSiteMap = (id: any, ele: any) => {
    return ServiceMapService.updateOneServiceMap(id, ele).then(_res => {
      initData()
      setSelected(null)
    }).catch(err => {
      console.error(err);
    })
  }

  const createSiteMap = (ele: any) => {
    return ServiceMapService.createOne(ele).catch((e) => {
      console.error(e);
    }).finally(() => {
      initData()
      setSelected(null)
    })
  }

  const deleteSiteMap = (id: any) => {
    return ServiceMapService.deleteOne(id).catch((e) => {
      console.error(e);
    }).finally(() => {
      initData();
    })
  }

  return {
    data, initData, setData, updateSiteMap, dataClone,
    tableHeader, setTableHeader, selected, setSelected,
    selectedType, setSelectedType, seedSelected, createSiteMap,
    deleteSiteMap,
  }
}


export const ServiceMapStore = createContainer(ServiceMap)
