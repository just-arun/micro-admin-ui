import { Paginated } from "@/components/ui/pagination"
import { Table } from "@/components/ui/table"
import { FC, } from "react"

type RoleFormProps = {
  pagination: {
    "limit": number,
    "skip": number,
    "page": number,
    "total": number,
  }
  onPaginationChange: (par: {
    "limit": number,
    "skip": number,
    "page": number,
    "total": number,
  }) => void
  accesses: any[]
}

export const RoleForm: FC<RoleFormProps> = (_props) => {
  return <div>
    <form onSubmit={(e) => {
      e.preventDefault()
    }} >

      <div>
          <Table
            header={[
              {
                label: "Name",
                key: "name",
              },
              {
                label: "Keys",
                key: "key"
              },
            ]}
            onHeaderChange={(e: any) => { }}
            data={_props.accesses}
            border
          />
      </div>


    </form>
  </div>
}