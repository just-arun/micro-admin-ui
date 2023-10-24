import { Input } from "@/components/ui/input"
import { Paginated } from "@/components/ui/pagination"
import { AccessStore } from "@/stores/access"
import { PencilIcon } from "@heroicons/react/20/solid"
import { PlusIcon } from "@heroicons/react/24/solid"
import { Suspense, lazy, useCallback, useLayoutEffect } from "react"
import { AccessForm } from "./access-form"
import { Model } from "@/components/ui/model"
const Table = lazy(() => import("@/components/ui/table"))


export const AccessWrapper = () => {

  const accessStore = AccessStore.useContainer()

  useLayoutEffect(() => {
    accessStore.initData();
  }, [accessStore.search, accessStore.perPage, accessStore.page])

  const showingData = () => {
    const m = accessStore.metaData
    let s = m.limit * m.page
    return `showing ${m.skip + 1}-${s > m.total ? m.total : s} of ${m.total}`
  }

  const paginationElement = useCallback((id: any) => {
    return <div className="flex items-center ">
      <div className="w-52">
        {showingData()}
      </div>

      <div className="min-w-[300px]">
        {!accessStore.loading ? <Paginated
          onPaginationChange={(e) => {
            accessStore.setPage(e.page);
          }}
          pagination={accessStore.metaData}
        /> : ""}
      </div>

      <label className="w-52 flex py-4 items-center" htmlFor={id}>
        <span className="pr-2">Per Page</span>
        <select
          id={id}
          className=" bg-gray-700"
          value={accessStore.perPage}
          onChange={(e) => {
            accessStore.setPerPage(Number(e.target.value))
            accessStore.setPage(1);
          }}
        >
          {[10, 30, 50, 100, 200, 300, 400, 500].map((e, i) => <option key={i}>{e}</option>)}
        </select>
      </label>

    </div>
  }, [accessStore.page, accessStore.perPage, accessStore.metaData])


  return (
    <div>
      <div>
        <button className="p-2 flex bg-gray-700 active:bg-gray-600" onClick={() => {
          accessStore.setFormType("create");
          accessStore.setAccessData({ id: 0, name: "", key: "" })
        }}>
          <PlusIcon height={"24px"} />
          <span className="pl-1">new</span>
        </button>
        <div className="flex items-center pt-10">
          <form className="flex-1" onSubmit={(e) => {
            e.preventDefault();
          }}>
            <Input
              id="search"
              label="Search"
              onChange={(e) => {
                accessStore.setSearch(e)
                accessStore.setPage(1)
              }}
              placeholder="Search..."
              type={"search"}
              value={accessStore.search}
            />
          </form>
        </div>
        {paginationElement("pagination0")}
        <Suspense fallback="loading..." >
          <Table
            header={accessStore.tableHeader}
            onHeaderChange={(e: any) => accessStore.setTableHeader(e)}
            data={accessStore.tableData}
            border
            tdElement={{
              id: (el) => <div className="text-center">{el.id}</div>,
              action: (el) => <div
                className="text-center flex justify-center"
              >
                <button
                  onClick={() => {
                    accessStore.setFormType("update");
                    accessStore.setAccessData(el)
                  }}
                  className="rounded-md outline-orange-500 focus:outline-1 p-2 bg-gray-600 text-white">
                  <PencilIcon
                    className="h-4 cursor-pointer"
                  />
                </button>
              </div>
            }}
          />
        </Suspense>
        {paginationElement("pagination1")}


        <Model model={!!accessStore.accessData} onClose={() => accessStore.setAccessData(null)} title="">
          <div className="p-6 bg-gray-900 w-[600px]">
            <AccessForm
              data={accessStore.accessData}
              onDataChange={(e) => {
                accessStore.setAccessData(e)
              }}
              onSubmit={() => {
                accessStore.onSubmit().finally(() => {
                  accessStore.setAccessData(null)
                  accessStore.initData();
                })
              }}
              type={accessStore.formType}
            />
          </div>
        </Model>


      </div>
    </div>
  )
}

export default AccessWrapper;