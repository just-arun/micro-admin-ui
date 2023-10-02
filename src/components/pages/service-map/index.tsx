import { Table } from "@/components/ui/table"
import { ServiceMapStore } from "@/stores/service-map"
import { useEffect } from "react"

export const ServiceMapWrapper = () => {
  const serviceMapStore = ServiceMapStore.useContainer()
  useEffect(() => {
    serviceMapStore.initData();
  }, [])
  return (
    <div>
      <Table
        header={serviceMapStore.tableHeader}
        onHeaderChange={(e: any) => serviceMapStore.setTableHeader(e)}
        data={serviceMapStore.data}
        border
        tdElement={{
          auth: (el, i) => {
            return <span key={i} className="text-center block w-full h-full items-center">
              <input id={`auth-${el.id}`} className="cursor-pointer p-5" value={el.auth} type="checkbox" onChange={(e) => {
                let items: any = [...serviceMapStore.data].map((ele: any) => {
                  if (ele.id == el.id) {
                    ele.auth = e.target.checked
                  }
                  return ele
                })
                serviceMapStore.setData(items)
              }} />
            </span>
          },
          default: (el, i) => {
            return <span key={i} className="text-center block w-full h-full items-center">
              {el.default 
              ? <span className="inline-block w-6 h-6 bg-blue-700 rounded-full"></span>
              : <input id={`auth-${el.id}`} value={el.default} type="checkbox" className="cursor-pointer" onChange={(e) => {
                let items: any = [...serviceMapStore.data].map((ele: any) => {
                  if (ele.id == el.id) {
                    ele.default = e.target.checked
                  }
                  return ele
                })
                serviceMapStore.setData(items)
              }} />}
            </span>
          }
        }}
      />
    </div>
  )
}