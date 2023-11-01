import { FC, useEffect, useMemo, useRef, } from "react"

type TableHeader = {
  label: string
  key: string
  sort?: boolean
  sortOrder?: number
}

type TdElement = {
  [key: string]: (ele: any, i: number) => JSX.Element;
}


type TableProps = {
  header: TableHeader[]
  onHeaderChange?: (header: TableHeader[]) => void
  data: any[]
  onSort?: (header: TableHeader, order: number) => void
  withSelect?: boolean
  selected?: any[]
  onSelectChange?: (data: any[]) => void
  border?: boolean
  tdElement?: TdElement
  sortWithSelected?: boolean
  search?: string
  clearSelected?: () => void
  hideHeader?: boolean
}

export const Table: FC<TableProps> = (_props) => {
  const selectAll = useRef<HTMLInputElement | null>(null)
  const list = useRef<HTMLInputElement[] | null[]>([])



  const _selectAll = (checked: boolean) => {
    list.current.forEach((e, k) => {
      if (selectAll.current) {
        selectAll.current.checked = checked
      }
      if (e) {
        e.checked = checked
      }
      if (_props.onSelectChange) {
        _props.onSelectChange(checked ? _props.data : [])
      }
    })
  }

  const _changeHandler = () => {
    const data: any = [];
    list.current.forEach((e, k) => {
      const da = list.current[k];
      console.log("LIST", list.current[k]?.getAttribute("data-value"));
      if (e?.checked) {
        data.push(JSON.parse(`${da?.getAttribute("data-value")}`))
      }
    })
    if (_props.onSelectChange) {
      _props.onSelectChange(data);
    }
    if (selectAll.current && _props.selected) {
      selectAll.current.checked = _props.data.length == data.length
    }
    console.log("++++++++");
  }


  const border = _props.border ? "border border-gray-500" : ""


  const tableData = (ele: any, key: string, i: number) => {
    if (!!_props.tdElement) {
      if (_props.tdElement[key]) {
        return _props.tdElement[key](ele, i)
      }
    }
    return ele[key]
  }

  const dataList = useMemo(() => {
    if (!!_props.search) {
      return _props.data.map((e, i) => {
        let el = { ...e, "x-search-match": false }
        if (!!_props.search) {
          el["x-search-match"] = JSON.stringify(e).toLowerCase().indexOf(_props.search) != -1
        }
        return el
      })
    }
    return _props.data
  }, [_props.data, _props.selected, _props.search])

  useEffect(() => {
    if (list.current) {
      list.current.forEach((e, i) => {
        if (_props.selected) {
          if (_props.selected.map(e => JSON.stringify(e)).includes(`${e?.getAttribute("data-value")}`)) {
            let val = list.current[i]
            if (!!val) {
              val.checked = true
            }
          } else {
            let val = list.current[i]
            if (!!val) {
              val.checked = false
            }
          }
        }
      })
    }
  }, [_props.data, _props.selected])

  const render = () => (
    <div>
      <table className="w-full overflow-hidden">
        {!_props.hideHeader ? <thead className={`${border} bg-black`}>
          <tr>
            {_props.withSelect ? <th className={`${border} py-1 `}>
              <input ref={selectAll} type="checkbox" name="all" id="all"
                onChange={(v) => {
                  _selectAll(v.target.checked)
                }}
              />
            </th> : ""}



            {_props.header.map((e, i) => (
              <th key={i} className={`${border}`}
                onClick={() => {
                  if (!!_props.onSort) {
                    let order = 0
                    if (e.sortOrder != null) {
                      order = e.sortOrder
                    }
                    if (order > 0) {
                      order = -1
                    } else if (order < 0) {
                      order = 0
                    } else {
                      order = 1
                    }
                    _props.onSort(e, order)
                    // _props?.onHeaderChange([..._props.header].map((e) => ({ ...e, sortOrder: order })))
                  }
                }}
              >{e.label}</th>
            ))}
          </tr>
        </thead>
        : ''}


        <tbody
          onChange={() => _changeHandler()}
        >



          {dataList.map((e, i) => (
            <tr key={i} className={`hover:bg-gray-900 `} >

              {_props.withSelect ? <td className={`${border} text-center py-3 border-collapse`}
                style={{}}>
                <input
                  data-value={JSON.stringify(e)}
                  ref={el => list.current[i] = el}
                  type="checkbox" name="all" id="all"
                />
              </td> : ""}


              {_props.header.map((k, j) => (
                <td className={`p-2 border-collapse ${border} ${e["x-search-match"] ? 'bg-green-600' : ''}`} key={j}>
                  {tableData(e, k.key, i)}
                </td>
              ))}
            </tr>
          ))}

        </tbody>

      </table>
    </div>
  )

  return render()
}


export default Table;



