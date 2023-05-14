import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Myaxios from '../../components/chart/Myaxios';
import { TableBody, TableContainer, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Card, InputAdornment, OutlinedInput, Typography, Grid, TablePagination, FormControl, RadioGroup, FormControlLabel, Radio, Divider } from '@mui/material'
import { toast } from "react-toastify";
import Iconwarning from '../../assets/warning.svg'
import { IconDel } from '../../components/icon';
import { Dialog as TwDialog } from '@headlessui/react'
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { USER_KEY } from '../../components/userKey'
import { NewAxios } from '../../components/MyAxios';



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

export default function HomeCustomer() {

     const history = useHistory();
     const userToken = JSON.parse(localStorage.getItem(USER_KEY));

     const [modalIsOpen, setIsOpen] = useState(false);

     const [dataTable, setDataTable] = useState()

     const [open, setOpen] = useState({ edit: false, delete: false, add: false, check: false, view: false })



     const LoadData = () => {
          NewAxios.get('customer', {
               headers: {
                    'Authorization': `Bearer ${userToken?.token} `
               },
          }).then((res) => {
               if (res.data?.resultCode === 200) {
                    // console.log(res.data)
                    setDataTable(res.data)
               }
          })
     }

     const [modelAPI, setModelAPI] = useState({
          name: '',
          type: '',
          address: '',
          tel: '',
     })

     useEffect(() => {
          LoadData()
     }, [])


     const [select, setSelect] = useState("General")
     const onSelectType = e => {
          setSelect(e.target.value)
          // console.log(e.target.value)
     }

     const onSelectTypeEdit = e => {
          setModelAPI({ ...modelAPI, cus_type: e.target.value })
     }

     const addDialog = () => {
          setModelAPI({
               name: '',
               type: '',
               address: '',
               tel: '',
          })
          setOpen({ ...open, add: true })
     }

     const saveData = () => {
          let sendModel = modelAPI
          modelAPI.name = modelAPI.name
          modelAPI.address = modelAPI.address
          modelAPI.tel = parseInt(modelAPI.tel)
          modelAPI.type = select

          // console.log(sendModel)
          NewAxios.post('Customer', sendModel, {
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

          setOpen({ ...open, add: false })

     }

     const [DelgetIDCus, setDelGetIDCus] = useState([])

     const findIDDel = (e) => {
          let id = dataTable.data.filter(id => id.cus_id === e)
          // setDelGetIDCus(id[0]['cus_id'] + " " + id[0]['cus_name'])
          setDelGetIDCus(id[0])
          setOpen({ ...open, delete: true })
     }

     // console.log(DelgetIDCus['cus_id'])

     const SubmitDelete = () => {
          let sendData = { id: DelgetIDCus['cus_id'] }

          NewAxios.post(`dl_Customer`, sendData, {
               headers: {
                    'Authorization': `Bearer ${userToken?.token} `
               }
          }).then(res => {
               if (res.status === 200) {
                    toast.success("ລືບຂໍ້ມູນສຳເລັດແລ້ວ!", {
                         position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    LoadData()
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
          let id = dataTable.data.filter(x => x.cus_id === e)
          // console.log(id)
          setModelAPI(id[0])
          setGetEdit(id[0])
          setOpen({ ...open, edit: true })
          // console.log(id[0])
     }

     const SaveEdit = () => {

          NewAxios.put(`customer`,
               {
                    id: getEdit['cus_id'],
                    name: modelAPI.cus_name,
                    type: modelAPI.cus_type,
                    tel: parseInt(modelAPI.cus_tel),
                    address: modelAPI.cus_address
               },
               {
                    headers: {
                         'Authorization': `Bearer ${userToken?.token}`
                    },
               }
          ).then(res => {
               if (res.status === 200) {
                    toast.success("ແກ້ໄຂຂໍ້ມູນສຳເລັດ", {
                         position: toast.POSITION.BOTTOM_RIGHT,
                    });

                    LoadData()

               } else {
                    toast.error("ບໍ່ສຳເລັດປ້ອນຂໍ້ມູນບໍ່ຖືກຕ້ອງ!", {
                         position: toast.POSITION.BOTTOM_RIGHT,
                    });
               }
          })

          setOpen({ ...open, edit: false })

     }

     const findIDView = (e) => {
          let id = dataTable.data.filter(id => id.cus_id === e)
          setModelAPI(id[0])
          setOpen({ ...open, view: true })
     }

     function closeModal() {
          setIsOpen(false);
     }

     return (
          <>
               <div>
                    <h3 className="text-lg leading-6 font-bold text-gray-900">ຂໍ້ມູນລູກຄ້າ</h3>
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
                                        <input type="text" id="table-search-users" class="block p-2 pl-10 w-80 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
                                   </div>
                              </div>
                         </div>
                         <div class="w-full flex justify-end">
                              <button type="submit" class="inline-flex w-36 justify-center rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-base text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-bold "
                                   data-bs-toggle="modal" data-bs-target="#exampleModalCenteredScrollable"
                                   onClick={addDialog}>
                                   ເພີ່ມລູກຄ້າໃໝ່
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
                                             ລະຫັດລູກຄ້າ
                                        </th>
                                        <th scope="col" class="px-6 py-2">
                                             ຊື່ລູກຄ້າ
                                        </th>
                                        <th scope="col" class="px-6 py-2">
                                             ປະເພດ
                                        </th>
                                        <th scope="col" class="px-6 py-2">
                                             ທີ່ຢູ່
                                        </th>
                                        <th scope="col" class="px-6 py-2">
                                             ເບີໂທຫລັກ
                                        </th>
                                        <th scope="col" class="px-6 py-2">
                                             ຈັດການ
                                        </th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {
                                        dataTable?.data?.sort((a, b) => (a.sequence > b.sequence ? 1 : -1))
                                             .map((x, idx) => {
                                                  return (
                                                       <tr key={idx} class="bg-white border-b border-[#EFF1F2] border-solid">
                                                            <th scope="row" class="px-6 py-3 font-medium text-[#2D3436] whitespace-nowrap ">
                                                                 {x.cus_id}
                                                            </th>
                                                            <td class="px-6 py-3">
                                                                 {x.cus_name}
                                                            </td>
                                                            <td class="px-6 py-3">
                                                                 {x.cus_type}
                                                            </td>
                                                            <td class="px-6 py-3">
                                                                 {x.cus_address}
                                                            </td>
                                                            <td class="px-6 py-3">
                                                                 {x.cus_tel}
                                                            </td>
                                                            <td class="px-6 py-3 ">
                                                                 <div className='flex'>
                                                                      <button
                                                                           onClick={() => findIDEdit(x.cus_id)}
                                                                           className="relative flex px-3 py-[4px] text-[#2D3436] rounded-md border-[#ddd] border border-solid"
                                                                      >
                                                                           <span className='text-[#777]'>ແກ້ໄຂ</span>
                                                                      </button>

                                                                      <button
                                                                           onClick={() => findIDDel(x.cus_id)}
                                                                           className="relative flex px-3 py-[4px] text-[#2D3436] rounded-md ml-3 border-[#ddd] border border-solid"
                                                                      >
                                                                           <span className='text-[#777]'>ລືບຂໍ້ມູນ</span>
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


               <div>
                    <Dialog
                         open={open.add}
                         onClose={() => setOpen({ ...open, add: false })}
                         aria-labelledby="alert-dialog-title"
                         aria-describedby="alert-dialog-description"
                         maxWidth="lg"
                         PaperProps={{
                              style: {
                                   borderRadius: "8px 8px 0px 0px"
                              }
                         }}
                    >
                         <div>
                              <DialogTitle id="alert-dialog-title" style={{ background: '#F9FAFC', height: '55px' }}>
                                   <div className='flex justify-between'>
                                        <h3 className='title-cus'>ລູກຄ້າໃໝ່</h3>
                                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                             onClick={() => setOpen({ ...open, add: false })}>
                                             <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                             <span class="sr-only">Close modal</span>
                                        </button>
                                   </div>
                              </DialogTitle>
                              <Divider />
                              <DialogContent style={{
                                   overflowY: "visible",
                                   padding: "1.5em",
                                   width: "600px",
                                   height: "auto",
                                   justifyItems: "center",
                                   overflowY: "visible",
                              }}>
                                   <div className='flex'>
                                        <label for="small-input" class="w-36 pt-1.5 block mb-2 text-sx font-medium text-gray-900 ">ຊື່ລູກຄ້າ</label>
                                        <input
                                             value={modelAPI.name}
                                             onChange={(e) => setModelAPI({ ...modelAPI, name: e.target.value })}
                                             type="text"
                                             id="default-input"
                                             autoComplete='off'
                                             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                   </div>
                                   <div className='flex mt-5'>


                                        <label for="small-input" class="w-36 pt-1.5 block mb-2 text-sx font-medium text-gray-900 ">ປະເພດ</label>
                                        <div className='flex w-full'>
                                             <div class="flex items-center">
                                                  <input
                                                       value="General"
                                                       checked={select === "General"}
                                                       onChange={onSelectType}
                                                       id="default-radio-2" type="radio" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
                                                  <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 ">ທົ່ວໄປ</label>
                                             </div>
                                             <div class="flex items-center ml-6">
                                                  <input
                                                       value="Store"
                                                       checked={select === "Store"}
                                                       onChange={onSelectType}
                                                       id="default-radio-2" type="radio" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
                                                  <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 ">ທຸລະກິດ</label>
                                             </div>
                                        </div>
                                   </div>
                                   <div className='flex mt-5'>
                                        <label for="small-input" class="w-36 pt-1.5 block mb-2 text-sx font-medium text-gray-900 ">ທີ່ຢູ່</label>
                                        <textarea
                                             value={modelAPI.address}
                                             onChange={(e) => setModelAPI({ ...modelAPI, address: e.target.value })}
                                             rows="2" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "></textarea>
                                   </div>
                                   <div className='flex mt-5'>
                                        <label for="small-input" class="w-36 pt-1.5 block mb-2 text-sx font-medium text-gray-900 ">ເບີໂທຫລັກ</label>
                                        <input
                                             value={modelAPI.tel}
                                             onChange={(e) => setModelAPI({ ...modelAPI, tel: e.target.value })}
                                             type="text" id="default-input" placeholder='025xxxxxxx' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                                   </div>
                              </DialogContent>
                              <Divider />
                              <DialogActions style={{ backgroundColor: '#f2f2f2', height: '60px', paddingRight: '2em', borderRadius: "0px 0px 8px 8px", }}>
                                   <Button className='btn-cancel' variant='outlined' onClick={() => setOpen({ ...open, add: false })}>ຍົກເລີກ</Button>
                                   <Button className='btn-base' style={{ marginLeft: '1em' }} variant='contained' color='primary' onClick={saveData}>
                                        ບັນທືກ
                                   </Button>
                              </DialogActions>
                         </div>
                    </Dialog>

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
                                                       <h3 className='title-cus'>ລືບຂໍ້ມູນລູກຄ້າ</h3>
                                                       <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                                            onClick={() => setOpen({ ...open, delete: false })}>
                                                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                            <span class="sr-only">Close modal</span>
                                                       </button>
                                                  </TwDialog.Title>
                                                  <div className='p-6'>
                                                       <p className='flex justify-center'>ທ່ານແນ່ໃຈແລ້ວຫລືບໍທີ່ຕ້ອງການລືບຂໍ້ມູນຂອງ <span className='px-2 text-[#4361F4] font-bold'> "{DelgetIDCus.cus_name}" </span>? </p>
                                                       <p className='flex justify-center'>ເມື່ອກົດ ຕົກລົງ ຈະມີຜົນປ່ຽນແປງທັນທີ.</p>
                                                       <div className='px-10 mt-3'>
                                                            <div className='bg-[#FFE9D9] h-30 w-full rounded-md'>
                                                                 <div className=''>
                                                                      <div className='flex '>

                                                                           <div className='bg-[#FA7240] w-1 rounded-tl-md rounded-bl-md'></div>
                                                                           <div className='py-2 px-2'>
                                                                                <div className='flex'>
                                                                                     <div><img className='w-7 mr-2' src={Iconwarning} /></div>
                                                                                     <div className='text-[#791207] font-bold text-base pt-1'>ເຕືອນ ຂໍ້ມູນລູກຄ້າ!</div>
                                                                                </div>
                                                                                <div className='pl-9'>
                                                                                     <div className='text-[#95200A] text-base'>
                                                                                          {DelgetIDCus.cus_id}
                                                                                     </div>
                                                                                     <div className='text-[#95200A] text-base'>
                                                                                          {DelgetIDCus.cus_name}
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
                                                       <h3 className='title-cus'>ແກ້ໄຂຂໍ້ມູນລູກຄ້າ</h3>
                                                       <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                                            onClick={() => setOpen({ ...open, edit: false })}>
                                                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                            <span class="sr-only">Close modal</span>
                                                       </button>
                                                  </TwDialog.Title>
                                                  <div className='p-6'>
                                                       <div className='flex'>
                                                            <label for="small-input" class="w-36 pt-1.5 block mb-2 text-sx font-medium text-gray-900 ">ຊື່ລູກຄ້າ</label>
                                                            <input
                                                                 value={modelAPI.cus_name}
                                                                 onChange={(e) => setModelAPI({ ...modelAPI, cus_name: e.target.value })}
                                                                 type="text"
                                                                 id="default-input"
                                                                 autoComplete='off'
                                                                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                       </div>
                                                       <div className='flex mt-5'>
                                                            <label for="small-input" class="w-36 pt-1.5 block mb-2 text-sx font-medium text-gray-900 ">ປະເພດ</label>
                                                            <div className='flex w-full'>
                                                                 <div class="flex items-center">
                                                                      <input
                                                                           value={"General"}
                                                                           checked={modelAPI.cus_type === 'General'}
                                                                           onClick={onSelectTypeEdit}
                                                                           id="default-radio-2" type="radio" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
                                                                      <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 ">ທົ່ວໄປ</label>
                                                                 </div>
                                                                 <div class="flex items-center ml-6">
                                                                      <input
                                                                           value={'Store'}
                                                                           checked={modelAPI.cus_type === 'Store'}
                                                                           onClick={onSelectTypeEdit}
                                                                           id="default-radio-2" type="radio" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
                                                                      <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 ">ທຸລະກິດ</label>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                       <div className='flex mt-5'>
                                                            <label for="small-input" class="w-36 pt-1.5 block mb-2 text-sx font-medium text-gray-900 ">ທີ່ຢູ່</label>
                                                            <textarea
                                                                 value={modelAPI.cus_address}
                                                                 onChange={(e) => setModelAPI({ ...modelAPI, cus_address: e.target.value })}
                                                                 id="message" rows="2" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "></textarea>
                                                       </div>
                                                       <div className='flex mt-5'>
                                                            <label for="small-input" class="w-36 pt-1.5 block mb-2 text-sx font-medium text-gray-900 ">ເບີໂທຫລັກ</label>
                                                            <input
                                                                 value={modelAPI.cus_tel}
                                                                 onChange={(e) => setModelAPI({ ...modelAPI, cus_tel: e.target.value })}
                                                                 type="text" id="default-input" placeholder='025xxxxxxx' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
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

                    <Transition appear show={open.view} as={Fragment}>
                         <TwDialog as="div" className="relative z-10" onClose={() => setOpen({ ...open, view: false })}>
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
                                                       <h3 className='title-cus'>ຂໍ້ມູນລູກຄ້າ</h3>
                                                       <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                                            onClick={() => setOpen({ ...open, view: false })}>
                                                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                            <span class="sr-only">Close modal</span>
                                                       </button>
                                                  </TwDialog.Title>
                                                  <div className='p-6'>
                                                       <div className='flex'>
                                                            <label for="small-input" class="w-36 pt-1.5 block mb-2 text-sx font-medium text-gray-900 ">ຊື່ລູກຄ້າ</label>
                                                            <input
                                                                 value={modelAPI.cus_name}
                                                                 onChange={(e) => setModelAPI({ ...modelAPI, cus_name: e.target.value })}
                                                                 type="text"
                                                                 id="default-input"
                                                                 autoComplete='off'
                                                                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                       </div>
                                                       <div className='flex mt-5'>
                                                            <label for="small-input" class="w-36 pt-1.5 block mb-2 text-sx font-medium text-gray-900 ">ປະເພດ</label>
                                                            <div className='flex w-full'>
                                                                 <div class="flex items-center">
                                                                      <input
                                                                           value={modelAPI.cus_type}
                                                                           checked={modelAPI.cus_type === 'general'}
                                                                           onClick={onSelectTypeEdit}
                                                                           id="default-radio-2" type="radio" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
                                                                      <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 ">ທົ່ວໄປ</label>
                                                                 </div>
                                                                 <div class="flex items-center ml-6">
                                                                      <input
                                                                           value={modelAPI.cus_type}
                                                                           checked={modelAPI.cus_type === 'store'}
                                                                           onClick={onSelectTypeEdit}
                                                                           id="default-radio-2" type="radio" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
                                                                      <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 ">ທຸລະກິດ</label>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                       <div className='flex mt-5'>
                                                            <label for="small-input" class="w-36 pt-1.5 block mb-2 text-sx font-medium text-gray-900 ">ທີ່ຢູ່</label>
                                                            <textarea
                                                                 value={modelAPI.address}
                                                                 onChange={(e) => setModelAPI({ ...modelAPI, address: e.target.value })}
                                                                 id="message" rows="2" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "></textarea>
                                                       </div>
                                                       <div className='flex mt-5'>
                                                            <label for="small-input" class="w-36 pt-1.5 block mb-2 text-sx font-medium text-gray-900 ">ເບີໂທຫລັກ</label>
                                                            <input
                                                                 value={modelAPI.tel_main}
                                                                 onChange={(e) => setModelAPI({ ...modelAPI, tel_main: e.target.value })}
                                                                 type="text" id="default-input" placeholder='025xxxxxxx' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                                                       </div>
                                                       <div className='flex mt-5'>
                                                            <label for="small-input" class="w-36 pt-1.5 block mb-2 text-sx font-medium text-gray-900 ">ເບີສຳຮອງ</label>
                                                            <input
                                                                 value={modelAPI.tel_sec}
                                                                 onChange={(e) => setModelAPI({ ...modelAPI, tel_sec: e.target.value })}
                                                                 type="text" id="default-input" placeholder='025xxxxxxx' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                                                       </div>
                                                  </div>
                                                  {/* <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
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
                                                  </div> */}
                                             </TwDialog.Panel>
                                        </Transition.Child>
                                   </div>
                              </div>
                         </TwDialog>
                    </Transition>
               </div>


          </>


     )
}



{/* <div className="mt-4">
     <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={closeModal}
     >
          Got it, thanks!
     </button>
</div> */}
