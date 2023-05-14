import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import Myaxios from "../../components/chart/Myaxios";
import { Fragment } from "react";
import { Menu, Transition, Listbox } from "@headlessui/react";
import { Dialog as TwDialog } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid'
import Select from "./Select";
import { toast } from "react-toastify";
import Iconwarning from '../../assets/warning.svg'
import { NewAxios } from "../../components/MyAxios";
import { USER_KEY } from '../../components/userKey'


const customStyles = {
  content: {
    width: "50%",
    top: "50%",
    left: "50%",
    right: "30%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px",
    padding: "0px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function HomeProduct() {

  const userToken = JSON.parse(localStorage.getItem(USER_KEY));

  const history = useHistory();

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [dataTable, setDataTable] = useState()
  const [dataCate, setDataCate] = useState()
  const [dataType, setDataType] = useState()
  const [countPro, setCountPro] = useState([]);

  const [open, setOpen] = useState({ edit: false, delete: false, add: false, check: false, view: false })

  const [loading, setloading] = useState(true);

  const LoadData = () => {
    setloading(true)

    NewAxios.get('product', {
      headers: {
        'Authorization': `Bearer ${userToken?.token}`
      },
    }).then((res) => {
      if (res.status === 200) {
        setDataTable(res?.data?.data)

        // console.log(res.data?.data)
        setloading(false)
      }
    })

    NewAxios.get('category', {
      headers: {
        'Authorization': `Bearer ${userToken?.token}`
      },
    }).then((res) => {
      if (res.status === 200) {

        // let arr = [{ cate_id: 0, cate_name: "ທັງໝົດ", seq: 0, status: true }]

        // res.data?.data?.map(row => {
        //   arr.push({
        //     cate_id: row.cate_id,
        //     cate_name: row.cate_name,
        //     seq: row.seq,
        //     status: row.status
        //   })
        // })
        // console.log(arr)

        setDataType(res?.data?.data)

        // setextensions(arr)
        // setCurrentExtension(arr[0])

      }
    })
    // Myaxios.get('ReportProduct/GetTotalProduct')
    //   .then((res) => {
    //     if (res.status === 200) {
    //       setCountPro(res.data)
    //       console.log(res.data)
    //     }
    //   })
  }

  useEffect(() => {
    LoadData()
  }, [])

  const [modelAPI, setmodelAPI] = useState({
    name: "",
    img: "",
    price: "",
    unit: "",
    cate_id: "",
    barcode: "",
  })


  const ProStatus = [
    { label: 'ພ້ອມຂາຍ', value: 1 },
    { label: 'ສິນຄ້າໝົດ', value: 0 }
  ]

  const [getType, setGetType] = useState(0);
  const getTypePro = (e) => {
    setGetType(e.target.value)
    console.log(e.target.value)
  }

  const [getStatus, setgetStatus] = useState(1);
  const getStatusPro = (e) => {
    setgetStatus(e.target.value)
  }

  const addDialog = () => {
    setmodelAPI({
      name: "",
      img: "",
      price: "",
      unit: "",
      cate_id: "",
      barcode: "",
    })
    setOpen({ ...open, add: true })

  }

  const SaveProduct = () => {
    let sendModel = modelAPI
    modelAPI.name = modelAPI.pro_name
    modelAPI.unit = parseInt(modelAPI.unit)
    modelAPI.cate_id = parseInt(getType)
    modelAPI.price = parseInt(modelAPI.price)

    // console.log(sendModel)
    NewAxios.post('product', sendModel, {
      headers: {
        'Authorization': `Bearer ${userToken?.token}`
      },
    }).then(res => {
      if (res.status === 200) {

        toast.success("ເພີ່ມຂໍ້ມູນໃຫມ່ສຳເລັດ", {
          position: toast.POSITION.BOTTOM_LEFT,
        });

        LoadData()

      } else {
        toast.error("ບໍ່ສຳເລັດປ້ອນຂໍ້ມູນບໍ່ຖືກຕ້ອງ!", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    })

    setOpen({ ...open, add: false })
  }

  const [DelGetID, setDelGetID] = useState([])

  const findIDDel = (e) => {
    let id = dataTable?.filter(id => id.pro_id === e)
    setDelGetID(id[0])
    // console.log(id[0])
    setOpen({ ...open, delete: true })
  }

  const SubmitDelete = () => {
    let sendData = { id: DelGetID['pro_id'] }


    NewAxios.post(`dl_product`, sendData, {
      headers: {
        'Authorization': `Bearer ${userToken?.token} `
      }
    }).then(res => {
      if (res.status === 200) {
        toast.success("ລືບຂໍ້ມູນສຳເລັດແລ້ວ!", {
          position: toast.POSITION.BOTTOM_LEFT,
        });

        LoadData()

      } else {
        toast.error("ບໍ່ສຳເລັດປ້ອນຂໍ້ມູນບໍ່ຖືກຕ້ອງ!", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    })
    setOpen({ ...open, delete: false })
  }

  const [getEdit, setGetEdit] = useState([])

  const findIDEdit = (e) => {
    let id = dataTable.filter(id => id.pro_id === e)
    setmodelAPI(id[0])
    setGetEdit(id[0])
    // console.log(id[0])
    setOpen({ ...open, edit: true })
  }

  const SaveEdit = () => {

    NewAxios.put(`product`,
      {
        id: getEdit['pro_id'],
        name: modelAPI.pro_name,
        price: parseInt(modelAPI.pro_price),
        unit: parseInt(modelAPI.pro_unit),
        cate_id: parseInt(getType),
        barcode: "",
        img: "",
        status: parseInt(getStatus) ? true : false
      },
      {
        headers: {
          'Authorization': `Bearer ${userToken?.token}`
        },
      }
    ).then(res => {
      if (res.status === 200) {
        toast.success("ແກ້ໄຂຂໍ້ມູນສຳເລັດ", {
          position: toast.POSITION.BOTTOM_LEFT,
        });

        LoadData()

      } else {
        toast.error("ບໍ່ສຳເລັດປ້ອນຂໍ້ມູນບໍ່ຖືກຕ້ອງ!", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    })

    setOpen({ ...open, edit: false })
  }

  return (
    <>
      <div className="scroll">
        <div>
          <h3 className="text-lg leading-6 font-bold text-gray-900">
            ຂໍ້ມູນຄັງສິນຄ້າ
          </h3>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-5">
          <div className="p-5">
            <div class="grid grid-cols-4 gap-4">
              <div className="bg-emerald-100 sm:rounded-lg h-16">
                <div class="flex items-center justify-center py-3">
                  <div class="h-2.5 w-2.5 rounded-full bg-pink-300 mr-2 "></div>
                  <span>ທັງໝົດ:</span>
                  <span className="text-4xl pl-2">{countPro.total}</span>
                </div>
              </div>
              <div className="bg-cyan-200 sm:rounded-lg h-16">
                <div class="flex items-center justify-center py-3">
                  <div class="h-2.5 w-2.5 rounded-full bg-indigo-500 mr-2 "></div>
                  <span>ພ້ອມຂາຍ:</span>
                  <span className="text-4xl pl-2">{countPro.available}</span>
                </div>
              </div>
              <div className="bg-red-100 sm:rounded-lg h-16">
                <div class="flex items-center justify-center py-3">
                  <div class="h-2.5 w-2.5 rounded-full bg-lime-500 mr-2 "></div>
                  <span>ໃກ້ຈະໝົດ:</span>
                  <span className="text-4xl pl-2">{countPro.nearExpire}</span>
                </div>
              </div>
              <div className="bg-lime-100 sm:rounded-lg h-16">
                <div class="flex items-center justify-center py-3">
                  <div class="h-2.5 w-2.5 rounded-full bg-red-400 mr-2 "></div>
                  <span>ໝົດແລ້ວ:</span>
                  <span className="text-4xl pl-2">{countPro.expire}</span>
                </div>
              </div>
            </div>
            <p className="pt-2 text-gray-500">ຫົວໜ່ວຍເປັນອັນ*</p>
          </div>
        </div>

        <div className="bg-white shadow  sm:rounded-lg mt-5">
          <div className="grid grid-cols-2 gap-4 p-5">
            <div className="flex">
              <div className="mr-5">

              </div>
              <div className="w-64">
                <div class="relative">
                  <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      class="w-5 h-5 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="table-search-users"
                    class="block p-2 pl-10 w-80 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for users"
                  />
                </div>
              </div>
            </div>
            <div class="w-full flex justify-end">
              <button
                type="submit"
                class="inline-flex w-36 justify-center rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-base text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-bold "
                data-bs-toggle="modal"
                data-bs-target="#exampleModalCenteredScrollable"
                onClick={addDialog}
              >
                ເພີ່ມສິນຄ້າໃໝ່
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white mt-5 p-5 shadow sm:rounded-lg px-4 py-5 sm:px-6">
          <h4 class="text-lg font-bold leading-6 text-gray-900 mb-5">
            ລາຍການລ່າສຸດ
          </h4>
          <div class="relative overflow-x-auto mt-6">
            <table class="w-full text-sm text-left text-[#2D3436]">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="my-table ">

                  <th scope="col" class="px-3 py-3 border">
                    ລະຫັດສິນຄ້າ
                  </th>
                  <th scope="col" class="px-3 py-3 border">
                    ຊື່ສິນຄ້າ
                  </th>
                  <th scope="col" class="px-3 py-3 border">
                    ລາຄາ (ກີບ)
                  </th>
                  <th scope="col" class="px-3 py-3 border">
                    ຈຳນວນ/ອັນ
                  </th>
                  <th scope="col" class="px-3 py-3 border">
                    ໝວດໝູ່
                  </th>
                  <th scope="col" class="px-3 py-3 border">
                    ສະຖານະ
                  </th>
                  <th scope="col" class="px-3 py-3 border text-center">
                    ຈັດການ
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? <></>
                  : dataTable?.map((x, idx) => {
                    return (
                      <>
                        <tr key={idx} class="bg-white border-b border-[#EFF1F2] border-solid">
                          <td class="py-3 pl-3 w-24 text-center">{x.pro_id}</td>
                          <td class="py-3 pl-3 w-80">
                            <div className="flex">
                              <img src={x.pro_img} width="48px" />
                              {x.pro_name}
                            </div>

                          </td>
                          <td class="py-3 pl-3 w-24">
                            {x.pro_price}
                          </td>
                          <td class="py-3 pl-3 w-24">
                            {x.pro_unit}
                          </td>
                          <td class="py-3 pl-3 w-24">{x.cate_id}</td>
                          <td class="py-3 pl-3 w-24">{x.pro_status}</td>
                          <td class="py-3 pl-3 w-24">
                            <div className='flex'>
                              <button
                                onClick={() => findIDEdit(x.pro_id)}
                                className='relative flex px-3 py-[4px] text-[#2D3436] rounded-md border-[#ddd] border border-solid'>
                                ແກ້ໄຂ
                              </button>
                              <button
                                onClick={() => findIDDel(x.pro_id)}
                                className='relative flex px-3 py-[4px] text-[#2D3436] rounded-md ml-3 border-[#ddd] border border-solid'>
                                ລືບ
                              </button>
                            </div>
                          </td>
                        </tr>
                      </>
                    )
                  })
                }
              </tbody>
            </table>
          </div>

        </div>
      </div>

      <Transition appear show={open.add} as={Fragment}>
        <TwDialog as="div" className="relative z-10" onClose={() => setOpen({ ...open, add: false })}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <TwDialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <TwDialog.Title
                    as="h3"
                    className="flex justify-between items-center text-lg font-medium leading-6 text-gray-900 pt-6 px-6"
                  >
                    <h3 className='title-cus'>ເພີ່ມຂໍ້ມູນສິນຄ້າໃໝ່</h3>
                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                      onClick={() => setOpen({ ...open, add: false })}>
                      <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                      <span class="sr-only">Close modal</span>
                    </button>
                  </TwDialog.Title>
                  <div className='p-6'>
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                          ຊື່ສິນຄ້າ
                        </label>
                        <input
                          value={modelAPI.pro_name}
                          onChange={(e) => setmodelAPI({ ...modelAPI, pro_name: e.target.value })}
                          type="text"
                          name="first-name"
                          id="first-name"
                          autoComplete="given-name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                            ຈຳນວນອັນ
                          </label>
                          <input
                            value={modelAPI.unit}
                            onChange={(e) => setmodelAPI({ ...modelAPI, unit: e.target.value })}
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                            ລາຄາຂາຍ
                          </label>
                          <div class="relative">
                            <input
                              value={modelAPI.price}
                              onChange={(e) => setmodelAPI({ ...modelAPI, price: e.target.value })}
                              type="text"
                              class="block mt-1 p-2 pr-10 w-full text-sm text-gray-900 bg-white rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="0.00"
                            />
                            <div class="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
                              <p className="text-[#777]">ກີບ</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                            ປະເພດສິນຄ້າ
                          </label>
                          <select
                            onChange={getTypePro}
                            id="country"
                            name="country"
                            autoComplete="country-name"
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          >
                            <option selected>ເລືອກ</option>
                            {
                              // console.log(dataType)
                              dataType?.map((x, idx) => {
                                return (
                                  <>
                                    <option value={x.cate_id} key={idx}>{x.cate_name}</option>
                                  </>
                                )
                              })
                            }
                          </select>
                        </div>

                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-28 justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 sm:ml-3 sm:w-28 sm:text-sm"
                      onClick={SaveProduct}
                    >
                      ບັນທືກ
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-28 justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-28 sm:text-sm"
                      onClick={() => setOpen({ ...open, add: false })}
                    >
                      ຍົກເລີກ
                    </button>
                  </div>
                </TwDialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </TwDialog>
      </Transition>

      <Transition appear show={open.delete} as={Fragment}>
        <TwDialog as="div" className="relative z-10" onClose={() => setOpen({ ...open, delete: false })}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <TwDialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <TwDialog.Title
                    as="h3"
                    className="flex justify-between items-center text-lg font-medium leading-6 text-gray-900 pt-6 px-6"
                  >
                    <div className='flex'>
                      <div><img className='w-7 mr-2' src={Iconwarning} /></div>
                      <h3 className='title-cus'>ລືບຂໍ້ມູນສິນຄ້າ</h3>
                    </div>
                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                      onClick={() => setOpen({ ...open, delete: false })}>
                      <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                      <span class="sr-only">Close modal</span>
                    </button>
                  </TwDialog.Title>
                  <div className='p-6'>
                    <p className='flex justify-center'>ທ່ານແນ່ໃຈແລ້ວ ຫລື ບໍ ທີ່ຕ້ອງການລືບຂໍ້ມູນດ້ານລຸ່ມນີ້</p>
                    <p className='flex justify-center mt-2'>ເມື່ອກົດ ຕົກລົງ ຈະມີຜົນປ່ຽນແປງທັນທີ.</p>
                    <div className='px-10 mt-3'>
                      <div className='bg-[#FFE9D9] h-30 w-full rounded-md'>
                        <div className=''>
                          <div className='flex '>

                            <div className='bg-[#FA7240] w-1 rounded-tl-md rounded-bl-md'></div>
                            <div className='py-2 px-2 w-full'>
                              <div className='text-center'>
                                <div className='text-[#95200A] text-base'>
                                  {DelGetID.pro_name}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-28 justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 sm:ml-3 sm:w-28 sm:text-sm"
                      onClick={SubmitDelete}
                    >
                      ຕົກລົງ
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-28 justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-28 sm:text-sm"
                      onClick={() => setOpen({ ...open, delete: false })}
                    >
                      ຍົກເລີກ
                    </button>
                  </div>
                </TwDialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </TwDialog>
      </Transition>

      <Transition appear show={open.edit} as={Fragment}>
        <TwDialog as="div" className="relative z-10" onClose={() => setOpen({ ...open, edit: false })}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <TwDialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <TwDialog.Title
                    as="h3"
                    className="flex justify-between items-center text-lg font-medium leading-6 text-gray-900 pt-6 px-6"
                  >
                    <h3 className='title-cus'>ເພີ່ມຂໍ້ມູນສິນຄ້າໃໝ່</h3>
                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                      onClick={() => setOpen({ ...open, edit: false })}>
                      <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                      <span class="sr-only">Close modal</span>
                    </button>
                  </TwDialog.Title>
                  <div className='p-6'>
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                          ຊື່ສິນຄ້າ
                        </label>
                        <input
                          value={modelAPI.pro_name}
                          onChange={(e) => setmodelAPI({ ...modelAPI, pro_name: e.target.value })}
                          type="text"
                          name="first-name"
                          id="first-name"
                          autoComplete="given-name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                            ຈຳນວນອັນ
                          </label>
                          <input
                            value={modelAPI.pro_unit}
                            onChange={(e) => setmodelAPI({ ...modelAPI, pro_unit: e.target.value })}
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                            ລາຄາຂາຍ
                          </label>
                          <div class="relative">
                            <input
                              value={modelAPI.pro_price}
                              onChange={(e) => setmodelAPI({ ...modelAPI, pro_price: e.target.value })}
                              type="text"
                              class="block mt-1 p-2 pr-10 w-full text-sm text-gray-900 bg-white rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="0.00"
                            />
                            <div class="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
                              <p className="text-[#777]">ກີບ</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                            ປະເພດສິນຄ້າ
                          </label>
                          <select
                            onChange={getTypePro}
                            value={modelAPI.cate_id}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          >
                            <option selected>ເລືອກ</option>
                            {
                              // console.log(dataType)
                              dataType?.map((x, idx) => {
                                return (
                                  <>
                                    <option value={x.cate_id} key={idx}>{x.cate_name}</option>
                                  </>
                                )
                              })
                            }
                          </select>
                        </div>
                        <div>
                          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                            ປະເພດສິນຄ້າ
                          </label>
                          <select
                            onChange={getStatusPro}
                            value={modelAPI.status}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          >
                            <option selected>ເລືອກ</option>
                            {
                              // console.log(dataType)
                              ProStatus?.map((x, idx) => {
                                return (
                                  <>
                                    <option value={x.value} key={idx} >{x.label}</option>
                                  </>
                                )
                              })
                            }
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-28 justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 sm:ml-3 sm:w-28 sm:text-sm"
                      onClick={SaveEdit}
                    >
                      ບັນທືກ
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-28 justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-28 sm:text-sm"
                      onClick={() => setOpen({ ...open, edit: false })}
                    >
                      ຍົກເລີກ
                    </button>
                  </div>
                </TwDialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </TwDialog>
      </Transition>

    </>
  );
}


function EditInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#EDE9FE"
        stroke="#9ca3af"
        strokeWidth="2"
      />
    </svg>
  )
}

function DeleteInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#EDE9FE"
        stroke="#9ca3af"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#9ca3af" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#9ca3af" strokeWidth="2" />
    </svg>
  )
}
