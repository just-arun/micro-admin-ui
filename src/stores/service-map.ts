import { ServiceMapService } from "@/service/service-map"
import { createContainer } from "@/util/context"
import { useState } from "react"

const ServiceMap = () => {
  const [selected, setSelected] = useState<any[]>([])
  const [data, setData] = useState([])
  const initData = async () => {
    try {
      const { data } = await ServiceMapService.getServiceMap()
      setData(data.data.serviceMap)
    } catch (err) {
      console.error(err);
    }
  }

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
      label: "Auth",
      key: "auth",
    },
    {
      label: "Default",
      key: "default"
    }
  ]);




  return {
    data, initData, setData,
    tableHeader, setTableHeader, selected, setSelected,
  }
}


export const ServiceMapStore = createContainer(ServiceMap)
