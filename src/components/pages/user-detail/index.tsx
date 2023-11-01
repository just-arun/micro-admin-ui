import { Input } from "@/components/ui/input";
import Table from "@/components/ui/table";
import { UserDetailStore } from "@/stores/user-detail"
import { EyeIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

export const UserDetailWrapper = () => {
  const router = useRouter()
  const userDetailStore = UserDetailStore.useContainer();
  const [da, setDa] = useState("");

  useEffect(() => {
    if (router.query.id) {
      userDetailStore.initData(router.query.id)
    }
  }, [router.query])

  const objToArr = useMemo(() => {
    let arr: any = [];
    for (const key in userDetailStore.data) {
      let da: any = userDetailStore.data
      if (typeof da[key] != "object") {
        arr.push({ key: key, value: da[key] })
      }
    }
    return arr;
  }, [userDetailStore.data])

  return (
    <div>

      {!!userDetailStore.data
        ? <div>
          <div>


            <Table
              hideHeader
              header={[
                { label: "Key", key: "key" },
                { label: "Value", key: "value" },
              ]}
              data={objToArr}
            />


            <div>



              <div className="h-11">
                {userDetailStore.userRoleAltered ?

                  <div className="flex">
                    <button
                      className="p-2 px-4 bg-gray-700 mr-2"
                      onClick={() => {
                        userDetailStore.setUserRoles(userDetailStore.userRolesCopy)
                      }}>
                      cancel
                    </button>
                    <button
                      className="p-2 px-4 bg-gray-700 mr-2"
                      onClick={() => {
                        userDetailStore.updateRole(router.query.id)
                      }}>update role</button>
                  </div>

                  : ""}
              </div>

              <Table
                border
                header={[
                  { label: "ID", key: "id" },
                  { label: "Name", key: "name" },
                  { label: "Action", key: "action" },
                ]}
                data={userDetailStore.roles}
                withSelect
                selected={userDetailStore.userRoles}
                onSelectChange={(e: any) => {
                  userDetailStore.setUserRoles(e)
                }}
                tdElement={{
                  action: (e) => {
                    return <div>
                      <EyeIcon className="h-6 cursor-pointer" onClick={() => router.push({
                        pathname: "/roles/[id]",
                        query: { id: e.id },
                      })} />
                    </div>
                  }
                }}
              />


            </div>
          </div>
        </div>
        : <div></div>
      }

    </div>
  )
}