import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { NewAxios } from '../../components/MyAxios';
import { USER_KEY } from '../../components/userKey'
import { Dialog as TwDialog } from '@headlessui/react'
import { toast } from "react-toastify";
import Iconwarning from '../../assets/warning.svg'

import './categoryStyle.scss'


const customStyles = {
     content: {
          width: '50%',
          top: '50%',
          left: '50%',
          right: '30%',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '8px',
          padding: '0px'
     },
     overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.6)'
     },
};

function classNames(...classes) {
     return classes.filter(Boolean).join(' ')
}

export default function HomeCategory() {

     const userToken = JSON.parse(localStorage.getItem(USER_KEY));

     const history = useHistory();
     const [loading, setLoading] = useState(false)
     const [data, setData] = useState([])

     const [open, setOpen] = useState({ edit: false, delete: false, add: false, check: false, view: false })


     const [modelAPI, setModelAPI] = useState({
          cate_name: '',
          seq: '',
          status: '',
     })

     const [select, setSelect] = useState("true")

     const onSelectType = e => {
          setSelect(e.target.value)
          // console.log(e.target.value)
     }

     const loadDataAsync = () => {
          setLoading(true)

          NewAxios.get('category', {
               headers: {
                    'Authorization': `Bearer ${userToken?.token}`
               },
          }).then((res) => {
               if (res.data?.resultCode === 200) {
                    // console.log(res.data.data)
                    setData(res?.data)
                    setLoading(false)
               }
          })
     }


     useEffect(() => {
          setTimeout(() => {
               loadDataAsync()
          }, 500);
     }, [])

     const addDialog = () => {
          setModelAPI({
               cate_name: '',
               seq: '',
               status: '',
          })
          setOpen({ ...open, add: true })
     }

     const _hanldeCreate = () => {

          let senddata = modelAPI
          modelAPI.name = modelAPI.cate_name
          modelAPI.seq = parseInt(modelAPI.seq)
          modelAPI.status = (select != "true" ? false : true)

          console.log(senddata)

          NewAxios.post(`category`, senddata, {
               headers: {
                    'Authorization': `Bearer ${userToken?.token}`
               }
          }).then((res) => {
               if (res?.status === 200) {
                    toast.success("ເພີ່ມຂໍ້ມູນໃຫມ່ສຳເລັດ", {
                         position: toast.POSITION.BOTTOM_RIGHT,
                    });

                    loadDataAsync()

               } else {
                    toast.error("ບໍ່ສຳເລັດປ້ອນຂໍ້ມູນບໍ່ຖືກຕ້ອງ!", {
                         position: toast.POSITION.BOTTOM_RIGHT,
                    });
               }

          }).catch(e => console.error(e))

          setOpen({ ...open, add: false })

     }

     const [DelgetIDCus, setDelGetIDCus] = useState([])

     const findIDDel = (e) => {
          let id = data.data.filter(id => id.cate_id === e)
          setDelGetIDCus(id[0])
          console.log(id)
          setOpen({ ...open, delete: true })
     }

     const SubmitDelete = () => {
          let sendData = { id: DelgetIDCus['cate_id'] }

          NewAxios.post(`dl_category`, sendData, {
               headers: {
                    'Authorization': `Bearer ${userToken?.token} `
               }
          }).then(res => {
               if (res.status === 200) {
                    toast.success("ລືບຂໍ້ມູນສຳເລັດແລ້ວ!", {
                         position: toast.POSITION.BOTTOM_RIGHT,
                    });

                    loadDataAsync()
               } else {
                    toast.error("ບໍ່ສຳເລັດປ້ອນຂໍ້ມູນບໍ່ຖືກຕ້ອງ!", {
                         position: toast.POSITION.BOTTOM_RIGHT,
                    });
               }
          })
          setOpen({ ...open, delete: false })
     }


     const [getEdit, setGetEdit] = useState([])

     const findIDEdit = (e) => {
          let id = data.data.filter(id => id.cate_id === e)
          setModelAPI(id[0])

          setGetEdit(id[0])
          // console.log(id)
          setOpen({ ...open, edit: true })
     }

     const _SubmitEdit = () => {

          NewAxios.put(`category`,
               {
                    id: getEdit['cate_id'],
                    name: modelAPI.cate_name,
                    seq: modelAPI.seq,
                    status: (select != "true" ? false : true),
               },
               {
                    headers: {
                         'Authorization': `Bearer ${userToken?.token}`
                    },
               }
          ).then(res => {
               if (res.status === 200) {
                    toast.success("ແກ້ໄຂຂໍ້ມູນສຳເລັດແລ້ວ!", {
                         position: toast.POSITION.BOTTOM_RIGHT,
                    });

                    loadDataAsync()
               } else {
                    toast.error("ບໍ່ສຳເລັດປ້ອນຂໍ້ມູນບໍ່ຖືກຕ້ອງ!", {
                         position: toast.POSITION.BOTTOM_RIGHT,
                    });
               }
          })
          setOpen({ ...open, edit: false })
     }

     return (
          <>
               <div className='mx-auto max-w-7xl'>

                    <div>
                         <h3 className="text-lg leading-6 font-bold text-gray-900">ປະເພດສິນຄ້າ</h3>
                    </div>

                    <div className='bg-white shadow mt-5 rounded-md border border-solid border-[#ddd]'>
                         <div className="grid grid-cols-2 gap-4 p-5">
                              <div className='flex'>
                                   <div className='mr-5'>
                                        <select
                                             id="country"
                                             name="country"
                                             autoComplete="country-name"
                                             className="block w-36 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                             <option>All</option>
                                             <option>Canada</option>
                                             <option>Mexico</option>
                                        </select>
                                   </div>

                              </div>
                              <div class="w-full flex justify-end">
                                   <button type="submit" class="inline-flex w-40 justify-center rounded-md border border-transparent bg-[#2178F9] py-2 px-4 text-base text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
                                        data-bs-toggle="modal" data-bs-target="#exampleModalCenteredScrollable"
                                        onClick={addDialog}>
                                        ເພີ່ມປະເພດສິນຄ້າໃໝ່
                                   </button>
                              </div>
                         </div>
                    </div>


                    <div className='px-6 py-4 bg-[#ffffff] shadow mt-5 rounded-md border border-solid border-[#ddd]'>

                         <div className='flex justify-between mt-2'>
                              <div class="relative">
                                   <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                   </div>
                                   <input type="text" class="block p-2 pl-10 w-80 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Search for users" />
                              </div>
                         </div>

                         <div class="relative overflow-x-auto mt-6">
                              <table class="w-full text-sm text-left text-[#2D3436] ">
                                   <thead class="text-sm text-[#777777] uppercase custom-th">
                                        <tr>
                                             <th scope="col" class="px-6 py-2">
                                                  #
                                             </th>
                                             <th scope="col" class="px-6 py-2">
                                                  ຊື່ປະເພດ
                                             </th>
                                             <th scope="col" class="px-6 py-2">
                                                  ລຳດັບ
                                             </th>
                                             <th scope="col" class="px-6 py-2">
                                                  ສະຖານະ
                                             </th>
                                             <th scope="col" class="px-6 py-2">
                                                  ຈັດການ
                                             </th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {
                                             data?.data?.sort((a, b) => (a.seq > b.seq ? 1 : -1))
                                                  .map((x, idx) => {
                                                       return (
                                                            <tr key={idx} class="bg-white border-b border-[#EFF1F2] border-solid">
                                                                 <th scope="row" class="px-6 py-3 font-medium text-[#2D3436] whitespace-nowrap ">
                                                                      {idx + 1}
                                                                 </th>
                                                                 <td class="px-6 py-3">
                                                                      {x.cate_name}
                                                                 </td>
                                                                 <td class="px-6 py-3">
                                                                      {x.seq}
                                                                 </td>
                                                                 <td class="px-6 py-3">
                                                                      {x.status === true ? "Active" : "Dective"}
                                                                 </td>
                                                                 <td class="px-6 py-3 ">
                                                                      <div className='flex'>
                                                                           <button
                                                                                onClick={() => findIDEdit(x.cate_id)}
                                                                                className='relative flex px-3 py-[4px] text-[#2D3436] rounded-md border-[#ddd] border border-solid'>
                                                                                ແກ້ໄຂ
                                                                           </button>
                                                                           <button
                                                                                onClick={() => findIDDel(x.cate_id)}
                                                                                className='relative flex px-3 py-[4px] text-[#2D3436] rounded-md ml-3 border-[#ddd] border border-solid'>
                                                                                ລືບ
                                                                           </button>
                                                                      </div>
                                                                 </td>
                                                            </tr>
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
                                                  <h3 className='title-cus'>ເພີ່ມປະເພດສິນຄ້າໃໝ່</h3>
                                                  <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                                       onClick={() => setOpen({ ...open, add: false })}>
                                                       <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                       <span class="sr-only">Close modal</span>
                                                  </button>
                                             </TwDialog.Title>
                                             <div className='p-6'>
                                                  <div className='flex'>
                                                       <label for="small-input" class="w-36 pt-1.5 block mb-2 text-sx font-medium text-[#2D3436] ">ຊື່ປະເພດ</label>
                                                       <input
                                                            value={modelAPI.cate_name}
                                                            onChange={(e) => setModelAPI({ ...modelAPI, cate_name: e.target.value })}
                                                            type="text"
                                                            autoComplete='off'
                                                            class="bg-gray-50 border border-gray-300 text-[#2D3436] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                  </div>
                                                  <div className='flex mt-5'>
                                                       <label for="small-input" class="w-36 pt-1.5 block mb-2 text-sx font-medium text-[#2D3436] ">ລຳດັບສະແດງ</label>
                                                       <input
                                                            value={modelAPI.seq}
                                                            onChange={(e) => setModelAPI({ ...modelAPI, seq: e.target.value })}
                                                            type='number'
                                                            min={0}
                                                            class="block p-2.5 w-full text-sm text-[#2D3436] bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " />
                                                  </div>
                                                  <div className='flex mt-5'>
                                                       <label for="small-input" class="w-36 pt-1.5 block mb-2 text-sx font-medium text-[#2D3436] ">ສະຖານະ</label>
                                                       <div className='flex w-full'>
                                                            <div class="flex items-center">
                                                                 <input
                                                                      value="true"
                                                                      checked={select === "true"}
                                                                      onChange={onSelectType}
                                                                      id="default-radio-2" type="radio" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
                                                                 <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 ">ສະແດງ</label>
                                                            </div>
                                                            <div class="flex items-center ml-6">
                                                                 <input
                                                                      value="false"
                                                                      checked={select === "false"}
                                                                      onChange={onSelectType}
                                                                      id="default-radio-2" type="radio" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
                                                                 <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 ">ບໍ່ສະແດງ</label>
                                                            </div>
                                                       </div>
                                                  </div>
                                             </div>
                                             <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                  <button
                                                       type="button"
                                                       className="inline-flex w-28 justify-center rounded-md border border-transparent bg-[#2178F9] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 sm:ml-3 sm:w-28 sm:text-sm"
                                                       onClick={_hanldeCreate}
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
                                                       <h3 className='title-cus'>ລືບຂໍ້ມູນລູກຄ້າ</h3>
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
                                                                                     {DelgetIDCus.cate_name}
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
                                                  <h3 className='title-cus'>ແກ້ໄຂປະເພດສິນຄ້າໃໝ່</h3>
                                                  <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                                       onClick={() => setOpen({ ...open, edit: false })}>
                                                       <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                       <span class="sr-only">Close modal</span>
                                                  </button>
                                             </TwDialog.Title>
                                             <div className='p-6'>
                                                  <div className='flex'>
                                                       <label for="small-input" class="w-36 pt-1.5 block mb-2 text-sx font-medium text-[#2D3436] ">ຊື່ປະເພດ</label>
                                                       <input
                                                            value={modelAPI.cate_name}
                                                            onChange={(e) => setModelAPI({ ...modelAPI, cate_name: e.target.value })}
                                                            type="text"
                                                            autoComplete='off'
                                                            class="bg-gray-50 border border-gray-300 text-[#2D3436] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                  </div>
                                                  <div className='flex mt-5'>
                                                       <label for="small-input" class="w-36 pt-1.5 block mb-2 text-sx font-medium text-[#2D3436] ">ລຳດັບສະແດງ</label>
                                                       <input
                                                            value={modelAPI.seq}
                                                            onChange={(e) => setModelAPI({ ...modelAPI, seq: e.target.value })}
                                                            min={0}
                                                            class="block p-2.5 w-full text-sm text-[#2D3436] bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " />
                                                  </div>
                                                  <div className='flex mt-5'>
                                                       <label for="small-input" class="w-36 pt-1.5 block mb-2 text-sx font-medium text-[#2D3436] ">ສະຖານະ</label>
                                                       <div className='flex w-full'>
                                                            <div class="flex items-center">
                                                                 <input
                                                                      value={"true"}
                                                                      checked={select === "true"}
                                                                      onChange={onSelectType}
                                                                      id="default-radio-2" type="radio" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
                                                                 <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 ">ສະແດງ</label>
                                                            </div>
                                                            <div class="flex items-center ml-6">
                                                                 <input
                                                                      value={"false"}
                                                                      checked={select === "false"}
                                                                      onChange={onSelectType}
                                                                      id="default-radio-2" type="radio" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
                                                                 <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 ">ບໍ່ສະແດງ</label>
                                                            </div>
                                                       </div>
                                                  </div>
                                             </div>
                                             <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                  <button
                                                       type="button"
                                                       className="inline-flex w-28 justify-center rounded-md border border-transparent bg-[#2178F9] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 sm:ml-3 sm:w-28 sm:text-sm"
                                                       onClick={_SubmitEdit}
                                                  >
                                                       ແກ້ໄຂຂໍ້ມູນ
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


     )
}
