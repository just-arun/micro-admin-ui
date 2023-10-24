import { CreateRoleStore } from "@/stores/create-role"
import { FC, useEffect } from "react"
import { Input } from "@/components/ui/input"
import Table from "@/components/ui/table"
import { TrashIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/router"


export const NewRolePage = () => {
  const router = useRouter()
  const createRoleStore = CreateRoleStore.useContainer()

  useEffect(() => {
    createRoleStore.fetchAccess()
  }, [createRoleStore.limit, createRoleStore.search])

  useEffect(() => {
    if (!!router.query.id) {
      createRoleStore.fetchOne(router.query.id)
    }
  }, [router])

  const perPage = (id: string) => {
    return <label className="flex py-4 items-center" htmlFor={id}>
      <span className="pr-2">Per Page</span>

      <select
        id={id}
        className=" bg-gray-700"
        value={createRoleStore.limit}
        onChange={(e) => createRoleStore.setLimit(Number(e.target.value))}
      >
        {[10, 30, 50, 100, 200, 300, 400, 500].map((e, i) => <option key={i}>{e}</option>)}
      </select>
    </label>
  }

  // @ts-ignore
  const removeDuplicate = (val: any[]) => [...new Set(val)]

  return (
    <div className="pb-96">
      <div >
        <div className="py-5">
          <button className="p-2 px-6 bg-gray-700 active:bg-red-700" onClick={() => createRoleStore.saveRole()} >
            {createRoleStore.type}
          </button>
        </div>
        <div>
          <Input
            disabled={createRoleStore.type == "UPDATE"}
            id="name"
            label="Role Name"
            onChange={createRoleStore.setName}
            placeholder="Role Name"
            type={"text"}
            value={createRoleStore.name}
          />
        </div>



        {createRoleStore.selectedAccessForRole.length ? <div>
          <h1>Selected Access</h1>
          <Table
            header={[
              {
                label: "ID",
                key: "id",
              },
              {
                label: "Name",
                key: "name",
              },
              {
                label: "Keys",
                key: "key"
              },
              {
                label: "Action",
                key: "action"
              }
            ]}
            data={createRoleStore.selectedAccessForRole}
            border
            tdElement={{
              action: (_e, i) => {
                return <span>
                  <button onClick={() => {
                    createRoleStore.removeOneFromSelectedAccessForRole(i)
                  }}>
                    <TrashIcon height={25} />
                  </button>
                </span>
              }
            }}
          />
        </div> : ""}

        <div className="pt-10">

          <Input
            id="search"
            label="Local Search"
            onChange={(e) => createRoleStore.setSearch(e)}
            placeholder="local search access..."
            type={"search"}
            value={createRoleStore.search}
          />
        </div>
        <h1 className="pt-7 font-extrabold text-2xl">Available Access List</h1>

        <Table
          search={createRoleStore.search}
          header={[
            {
              label: "ID",
              key: "id",
            },
            {
              label: "Name",
              key: "name",
            },
            {
              label: "Keys",
              key: "key"
            },
          ]}
          data={createRoleStore.accesses}
          withSelect
          border
          sortWithSelected
          selected={createRoleStore.selectedAccess}
          onSelectChange={(e) => createRoleStore.setSelectedAccess(e)}
        />


      </div>

      <div className="fixed bg-gray-950 bottom-8 right-5 p-3 z-50 items-center">
        <div className="flex">
          {createRoleStore.selectedAccess.length
            ? <button className="p-2 px-5 mx-2 bg-green-600 active:bg-slate-600"
              onClick={() => {
                let val = [
                  ...createRoleStore.selectedAccessForRole,
                  ...JSON.parse(JSON.stringify(createRoleStore.selectedAccess))
                ].sort((x, y) => x.id > y.id ? 1 : -1)
                let arr: any[] = []
                val.forEach((e) => {
                  if (!!!arr.find((el) => el.id == e.id)) {
                    arr.push(e)
                  }
                })
                createRoleStore.setSelectedAccessForRole(
                  removeDuplicate(arr)
                )
                createRoleStore.setSelectedAccess([]);
                createRoleStore.fetchAccess();
              }}
            >add selected</button>
            : ""}
          {perPage("perPage2")}
        </div>
      </div>
    </div>
  )
}