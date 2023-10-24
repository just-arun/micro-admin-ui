import Table from "@/components/ui/table"
import { UsersStore } from "@/stores/users"
import { EyeIcon } from "@heroicons/react/24/solid"
import { format } from "date-fns"
import moment from "moment"
import Link from "next/link"
import { useEffect } from "react"

export const UserWrapper = () => {
  const userStore = UsersStore.useContainer()

  useEffect(() => {
    userStore.initData()
  }, [])

  return (
    <div>
      <Table
        border
        header={userStore.headers}
        data={userStore.data}
        tdElement={{
          createdAt: (e) => {
            return <span>
              {moment(new Date(e.createdAt)).format('dd MMM, yyyy HH:mm')}
            </span>
          },
          action: (e) => {
            return <div>
              <Link href={{
                pathname: "/users/[id]",
                query: {
                  id: e.id,
                }
              }} >
                <EyeIcon className="h-6" />
              </Link>
            </div>
          }
        }}
      />
    </div>
  )
}