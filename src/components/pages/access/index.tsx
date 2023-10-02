import { Table } from "@/components/ui/table"
import { AccessStore } from "@/stores/access"
import { useEffect, useLayoutEffect } from "react"

export const AccessWrapper = () => {

  const accessStore = AccessStore.useContainer()

  useLayoutEffect(() => {}, [])

  return (
    <div>
      <Table
        header={accessStore.tableHeader}
        onHeaderChange={(e: any) => accessStore.setTableHeader(e)}
        data={accessStore.tableData}
        withSelect selected={accessStore.selected} 
        onSelectChange={accessStore.setSelected}
        border
      />
    </div>
  )
}