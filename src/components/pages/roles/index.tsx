import { RoleStore } from "@/stores/roles"
import { EyeIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/router"
import { Suspense, lazy, useEffect } from "react"
const Table = lazy(() => import("@/components/ui/table"))

export const RolesWrapper = () => {
  const router = useRouter()
  const roleStore = RoleStore.useContainer()

  useEffect(() => {
    roleStore.initData()
  }, [])

  return (
    <div>
      <h1>Roles</h1>
      <div>
        <button onClick={() => router.push({ pathname: "/roles/new/" })} className="flex items-center p-2 px-4 bg-gray-700"><PlusIcon className="h-6" /> <span className="pl-2">New</span></button>
      </div>
      <div>
        <Suspense fallback="loading...">
          <Table
            border
            header={roleStore.tableHeader}
            onHeaderChange={() => { }}
            data={roleStore.tableData}
            tdElement={{
              id: (el) => {
                return <div className="text-center">{el.id}</div>
              },
              action: (el) => {
                return <div
                  className="text-center flex justify-center"
                >
                  <button
                    onClick={() => {
                      router.push({
                        pathname: "/roles/[id]/", query: {
                          id: el.id
                        }
                      })
                    }}
                    className="rounded-md outline-orange-500 focus:outline-1 p-2 bg-gray-600 text-white">
                    <EyeIcon
                      className="h-4 cursor-pointer"
                    />
                  </button>
                  <div className="p-1"></div>
                  <button
                    onClick={() => {
                      if (confirm(`are you sure you really want to delete this site map;\n ${el.key} "${el.value}"`)) {
                        roleStore.deleteOne(el.id)
                      }
                    }}
                    className="rounded-md outline-orange-500 focus:outline-1 p-2 bg-red-600 text-white">
                    <TrashIcon className="h-4" />
                  </button>
                </div>
              }
            }}
          />
        </Suspense>
      </div>
    </div>
  )
}