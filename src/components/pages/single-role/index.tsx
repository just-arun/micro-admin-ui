import Table from "@/components/ui/table"
import { SingleRoleStore } from "@/stores/single-role"
import { useRouter } from "next/router"
import { useEffect } from "react"

export const SingleRole = () => {
  const router = useRouter()
  const singleRoleStore = SingleRoleStore.useContainer()
  useEffect(() => {
    if (!!router.query.id) {
      singleRoleStore.initData(router.query.id);
    }
  }, [router])
  return (
    <div>
      <h1 className="font-bold py-3">Name: {singleRoleStore.data?.name}</h1>
      <div>
        
        {!!singleRoleStore.data ? 
        <Table
          header={[
            {label: "ID", key: "id"},
            {label: "Name", key: "name"},
            {label: "Key", key: "key"},
          ]}
          data={singleRoleStore.data.accesses}
          onHeaderChange={(e) => {}}
          border
        /> : ""}

      </div>
    </div>
  )
}