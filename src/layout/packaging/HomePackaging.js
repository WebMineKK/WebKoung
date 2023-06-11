import React, { useEffect, useState, Fragment } from 'react'
import { useHistory } from 'react-router-dom';
import { NewAxios } from "../../components/MyAxios";
import { USER_KEY } from '../../components/userKey'
import moment from 'moment';
import { Dialog } from '@headlessui/react'
import { toast } from "react-toastify";
import { Menu, Transition } from '@headlessui/react'
import ComTablePacking from './ComTablePacking';

export default function HomePackaging() {

     const userToken = JSON.parse(localStorage.getItem(USER_KEY));

     const history = useHistory();
     const [loading, setloading] = useState(true);
     const [dataTable, setdataTable] = useState([])
     const [dataComTable, setDataComTable] = useState({})
     const [open, setOpen] = useState({ cancel: false })


     const LoadData = () => {
          setloading(true)

          NewAxios.post('order_car', {
               page: 1,
               limit: 100
          }, {
               headers: {
                    'Authorization': `Bearer ${userToken?.token}`
               },
          }).then((res) => {
               if (res.status === 200) {
                    let data = res.data.data
                    let update = data.filter((x) => x.o_status === "packing")

                    setdataTable(update)

                    // console.log(update)
                    setloading(false)
               }
          })

     }

     useEffect(() => {
          LoadData()
     }, [])

     const findID = (e) => {
          let id = dataTable.data.filter(id => id.o_id === e)
          // console.log(id)
          history.push({ pathname: '/home/preorder/bill', state: { o_id: id[0]['o_id'], cus_id: id[0]['c_id'] } })
     }

     const hanldeCancelOrder = (e) => {
          let id = dataTable.filter(id => id.o_id === e)
          // console.log(id[0])
          setDataComTable(id[0])
          // console.log(id[0])
          setOpen({ ...open, cancel: true })
     }


     const SaveCancelOrder = () => {

          let sendData = {
               o_id: dataComTable.o_id
          }

          // console.log(sendData)

          NewAxios.post('cancel_order', sendData, {
               headers: {
                    'Authorization': `Bearer ${userToken?.token} `
               },
          }).then(res => {
               if (res.status === 200) {
                    toast.success("ເພີ່ມຂໍ້ມູນໃຫມ່ສຳເລັດ", {
                         position: toast.POSITION.BOTTOM_RIGHT,
                    });

                    LoadData()

               } else {
                    toast.error("ບໍ່ສຳເລັດປ້ອນຂໍ້ມູນບໍ່ຖືກຕ້ອງ!", {
                         position: toast.POSITION.BOTTOM_RIGHT,
                    });
               }
          })

          setOpen({ ...open, cancel: false })
     }

     return (
          <>

               <div>
                    <h3 className="text-lg leading-6 font-bold text-gray-900">ການຈັດສົ່ງສິ້ນຄ້າ</h3>
               </div>

               <div className='bg-white shadow overflow-hidden sm:rounded-lg mt-5'>
                    <div className="grid grid-cols-2 gap-4 p-5">


                         <div className='flex'>
                              <div className='mr-5'>
                                   <select
                                        id="country"
                                        name="country"
                                        autoComplete="country-name"
                                        className="block w-36 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                   >
                                        <option>All</option>
                                        <option>Canada</option>
                                        <option>Mexico</option>
                                   </select>
                              </div>
                              <div className='w-64'>
                                   <div class="relative">
                                        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                             <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                        </div>
                                        <input type="text" id="table-search-users" class="block p-2 pl-10 w-80 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
                                   </div>
                              </div>
                         </div>
                         <div class="w-full flex justify-end">
                              {/* <button type="submit" class="inline-flex w-36 justify-center rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-base text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-bold "
                                   onClick={() => history.push('/home/packaging/add')}>
                                   ກວດສອບສິນຄ້າ
                              </button> */}
                         </div>
                    </div>
               </div>
               <div class="bg-white overflow-hidden mt-5 relative overflow-x-auto shadow sm:rounded-lg px-4 py-5 sm:px-6">
                    <h4 class="text-lg font-bold leading-6 text-gray-900 mb-5">ລາຍການຈັດສົ່ງລ່າສຸດ</h4>
                    <div class="overflow-x-auto relative ">
                         <table class="w-full text-sm text-left text-gray-700">
                              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                   <tr className='my-table'>
                                        <th class="px-3 py-3 border">
                                             ເລກທີໃບບິນ
                                        </th>
                                        <th class="px-3 py-3 border">
                                             ວັນທີ
                                        </th>
                                        <th class="px-3 py-3 border w-56">
                                             ລູກຄ້າ
                                        </th>
                                        <th class="px-3 py-3 border w-28">
                                             ລວມລາຍການ
                                        </th>
                                        <th class="px-3 py-3 border text-right">
                                             ເປັນເງີນ
                                        </th>
                                        <th class="px-3 py-3 border text-right">
                                             ສ່ວນຫລຸດ
                                        </th>
                                        <th class="px-3 py-3 border text-right">
                                             ລວມມູນຄ່າ
                                        </th>
                                        <th class="px-3 py-3 border text-center">
                                             ສະຖານະ
                                        </th>
                                        <th class="px-3 py-3 border text-center">
                                             ເລກລົດຈັດສົ່ງ
                                        </th>
                                        <th class="px-3 py-3 border text-center">
                                             ຈັດການ
                                        </th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {
                                        dataTable?.map((x, idx) => {
                                             return (
                                                  <tr key={idx} class="bg-white border-b border-solid  border-[#ddd]">

                                                       <td className='px-3 py-3'>
                                                            <span>
                                                                 INV-
                                                            </span>
                                                            {x.u_id}
                                                       </td>
                                                       <td className='px-3'>
                                                            {moment(x.o_date).format('DD-MM-YYYY')}
                                                       </td>
                                                       <td width={120} className='px-3'>
                                                            {x.cus_name}
                                                       </td>
                                                       <td className='text-right px-3'>
                                                            {x.total_unit}
                                                       </td>
                                                       <td className='text-right px-3'>
                                                            {x.all_total?.toLocaleString()}
                                                       </td>
                                                       <td className='text-right px-3'>
                                                            {x.total_discount?.toLocaleString()}
                                                       </td>
                                                       <td className='px-3 text-right'>
                                                            {x.total_price?.toLocaleString()}
                                                       </td>
                                                       <td className='px-3 text-center'>
                                                            {
                                                                 x.o_status === 'canceled'
                                                                      ? <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                                                           ຍົກເລີກ
                                                                      </span>
                                                                      : x.o_status === 'packing'
                                                                           ? <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                                                                                ກຳລັງສົ່ງ
                                                                           </span>
                                                                           : <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                                                ລໍຖ້າ
                                                                           </span>
                                                            }
                                                       </td>
                                                       <td className='px-3'>
                                                            {
                                                                 x.car_detail.map((subX, idx) => {
                                                                      return (
                                                                           <span key={idx}>
                                                                                {subX.c_regis}
                                                                           </span>
                                                                      )
                                                                 })
                                                            }
                                                       </td>
                                                       <td className='px-3'>
                                                            <button
                                                                 onClick={() => hanldeCancelOrder(x.o_id)}>
                                                                 <span className="border border-solid border-gray-300 inline-flex items-center rounded-md px-2 py-1 text-sm font-medium text-[#2D3436] ring-1 ring-inset ring-blue-700/10">
                                                                      ຍົກເລີກ
                                                                 </span>
                                                            </button>
                                                       </td>
                                                  </tr>
                                             )
                                        })
                                   }
                              </tbody>
                         </table>
                    </div>

               </div>


               <Transition appear show={open.cancel} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={() => setOpen({ ...open, cancel: false })}>
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
                                        <Dialog.Panel className="mx-auto max-w-3xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                                             <Dialog.Title
                                                  className="flex justify-between items-center text-lg font-medium leading-6 text-gray-900 pt-6 px-6"
                                             >
                                                  <h3 className='title-cus'>ຍົກເລີກໃບບິນ INV- {dataComTable.o_id}</h3>
                                                  <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                                       onClick={() => setOpen({ ...open, cancel: false })}>
                                                       <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                       <span class="sr-only">Close modal</span>
                                                  </button>
                                             </Dialog.Title>
                                             <div className='p-6'>

                                                  <ComTablePacking data={dataComTable} />

                                                  <p className='mt-5 text-[#777] text-center text-sm'>
                                                       *ເມື່ອ "ຍົກເລີກໃບບິນ" ສິນຄ້າທັງໝົດຈະເພີ່ມເຂົ້າລະບົບຕາມຈຳນວນຂອງໃບບີນທັນທີ, <br />ກະລຸນາກວດສອບເລກໃບບີນກ່ອນຍົກເລີກ
                                                  </p>
                                             </div>

                                             <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                  <button
                                                       className="inline-flex w-28 justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 sm:ml-3 sm:w-28 sm:text-sm"
                                                       onClick={SaveCancelOrder}
                                                  >
                                                       ຍົກເລີກໃບບິນ
                                                  </button>
                                             </div>
                                        </Dialog.Panel>
                                   </Transition.Child>
                              </div>
                         </div>
                    </Dialog>
               </Transition>
          </>


     )
}
