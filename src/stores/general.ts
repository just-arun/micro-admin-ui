import { GeneralService } from "@/service/general"
import { createContainer } from "@/util/context"
import { useMemo, useState } from "react"

type SettingsType = {
  ID: number
  CreatedAt: string
  UpdatedAt: string
  DeletedAt: any
  id: number
  name: string
  canLogin: boolean
  canRegister: boolean
  httpOnlyCookie: boolean
  accessTokenExpireTime: number
  refreshTokenExpireTime: number
  organizationEmailDomain: string
  tokenPlacement: string
}


const General = () => {
  const [data, setData] = useState<SettingsType | null>(null);
  const [dataCopy, setDataCopy] = useState<SettingsType | null>(null);
  const [edit, setEdit] = useState(false);

  const initData = async () => {
    try {
      setData(null)
      setDataCopy(null)
      const { data } = await GeneralService.getData()
      setData(data.data.general)
      setDataCopy(JSON.parse(JSON.stringify(data.data.general)))
    } catch (err) {
      console.error(err);
    }
  }

  const isChanged = useMemo(() => {
    return JSON.stringify(data) != JSON.stringify(dataCopy)
  }, [data])

  const update = async () => {
    try {
      await GeneralService.updateData(data?.id, data)
      setEdit(false);
      return initData()
    } catch (err) {
      console.error(err);
    }
  }

  return {
    data, setData, initData, dataCopy,
    edit, setEdit, isChanged, update
  }
}

export const GeneralStore = createContainer(General)


