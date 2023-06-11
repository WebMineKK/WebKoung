import React, { useEffect, useRef, useCallback } from 'react'
import OtherSelect from 'react-select'
import { useState } from 'react'
import Myaxios from '../../components/chart/Myaxios';
import moment from 'moment';
import { toast } from "react-toastify";
import Iconwarning from '../../assets/warning.svg'
import { useHistory } from 'react-router-dom';
import { USER_KEY } from '../../components/userKey'
import { NewAxios } from '../../components/MyAxios';
import { useDropzone } from 'react-dropzone'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

export default function ImportProduct() {
     const selectInputRef = useRef();

     const [dataProduct, setDataProduct] = useState([]);

     const [loading, setloading] = useState(false);
     const userToken = JSON.parse(localStorage.getItem(USER_KEY));
     const [userID, setUserID] = useState(userToken.detail['u_id'])

     const history = useHistory();

     const [Amount, setAmount] = useState(0)
     const [disText, setdisText] = useState(0)
     const [ResultTotal, setResultTotal] = useState(0)

     const [countPro, setCountPro] = useState(0)

     const date = new Date();
     const futureDate = date.getDate();
     date.setDate(futureDate);
     const defaultValue = date.toLocaleDateString('en-CA');

     const LoadData = () => {
          setloading(true)

          NewAxios.get('product', {
               headers: {
                    'Authorization': `Bearer ${userToken?.token}`
               },
          }).then((res) => {
               if (res.status === 200) {
                    // console.log(res.data)
                    let abc = res.data.data
                    let update = abc.map((x) => ({
                         value: x.pro_id,
                         label: x.pro_name,
                         status: false
                    }))
                    setDataProduct(update)

                    // console.log(update)

                    setloading()
               }
          })
     }

     useEffect(() => {
          LoadData()
     }, [])


     const onClear = () => {
          selectInputRef.current.select.clearValue();
     };

     const [modelImport, setModelImport] = useState({
          image: '',
          regis: '',
          total_price: '',
          company_name: '',
          bill_no: '',
          note: '',
     })


     const [img, setImg] = useState(null)

     const onDrop = useCallback(acceptedFiles => {
          let file = acceptedFiles[0]
          let form = new FormData
          form.append("image", file)
          NewAxios.post("upload-image", form).then(res => {
               if (res.status === 200) {
                    let img_url = res.data
                    setImg(img_url.image_url)
               }
          })

     }, [])
     const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })


     const [getID, setgetID] = useState([])
     function getvalueProduct(e) {
          setgetID(e)
     }

     const [index, setindex] = useState([])

     const addItem = (e) => {

          let inserItem = dataProduct?.map((x) => {
               if (x.value === e.value) {
                    // console.log(x)
                    x.label = x.label
                    x.value = x.value
                    x.status = true
                    x.qty = ''
                    x.price = ''
               }
               return x
          })

          setindex(inserItem)

          // console.log(index)

          let update = dataProduct?.filter((x) => x.value !== getID.value)

          setDataProduct(update)
     }

     const removeItem = (e) => {
          const findID = index.filter((item) => item.value != e)
          setindex(findID)
     }

     const Calculate = (qty, idx) => {
          let sl = qty

          let update = index.map((row, i) => {
               // console.log(row)
               if (idx === i) {
                    row.qty = parseInt(sl)
               }
               return row
          })
          setindex(update)
     }

     const handleInputPrice = (price, idx) => {
          let update = index.map((row, i) => {
               if (idx === i) {
                    row.price = parseInt(price)
               }
               return row
          })
          setindex(update)
     }


     const SaveProduct = () => {

          let dataIndex = []
          let select_data = index.filter(x => x.status === true)

          let Demo = select_data.map((x) => {
               let data = {
                    pro_id: x.value,
                    pro_unit: x.qty,
                    pro_price: x.price
               }

               dataIndex.push(data)
          })

          NewAxios.post('create_import', {
               u_id: userID,
               image: img,
               regis: modelImport.regis,
               total_price: modelImport.total_price,
               company_name: modelImport.company_name,
               bill_no: modelImport.bill_no,
               note: modelImport.note,
               import_detail: dataIndex
          }, {
               headers: {
                    'Authorization': `Bearer ${userToken?.token}`
               },
          }).then(res => {
               if (res.status === 200) {

                    toast.success("ເພີ່ມຂໍ້ມູນໃຫມ່ສຳເລັດ", {
                         position: toast.POSITION.BOTTOM_LEFT,
                    });

                    history.push('/home/import')

               } else {
                    toast.error("ບໍ່ສຳເລັດປ້ອນຂໍ້ມູນບໍ່ຖືກຕ້ອງ!", {
                         position: toast.POSITION.BOTTOM_LEFT,
                    });
               }
          })
     }



     return (
          <>
               <div className='bg-white border-solid border border-[#ddd] overflow-hidden sm:rounded-md'>
                    <div className='flex justify-between'>
                         <div className="px-4 py-5 sm:px-6">
                              <h3 className="text-lg leading-6 font-bold text-gray-900">ຂໍ້ມູນເບື້ອງຕົ້ນ</h3>
                         </div>
                         <div className='px-4 py-5 sm:px-6'>
                              <button
                                   type="button"
                                   class="w-28 justify-center text-red-600 border border-red-600 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                                   onClick={() => history.push("/home/import")}
                              >
                                   <svg
                                        aria-hidden="true"
                                        class="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                   >
                                        <path
                                             fill-rule="evenodd"
                                             d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                             clip-rule="evenodd"
                                        ></path>
                                   </svg>
                                   <span class="pl-2 text-base">ຍົກເລີກ</span>
                              </button>
                         </div>
                    </div>
                    <div className='w-100 px-4 py-5 sm:px-6'>
                         <div class="flex">
                              <div class="w-2/5 ">
                                   <div className='flex'>
                                        <div class="w-1/3  text-right pr-5 pt-1.5">ວັນທີ:</div>
                                        <div class="w-1/2 ">
                                             <input
                                                  className="bg-gray-50 border p-2.5 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                  type="date"
                                                  defaultValue={defaultValue}
                                             />
                                        </div>
                                   </div>
                                   <div className='flex mt-3'>
                                        <div class="w-1/3 text-right pr-5 pt-1.5">ເລກທີໃບບີນ:</div>
                                        <div class="w-1/2">
                                             <input
                                                  className="border p-2.5 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                  type="text"
                                                  value={modelImport.bill_no}
                                                  onChange={(e) => setModelImport({ ...modelImport, bill_no: e.target.value })}
                                             />
                                        </div>
                                   </div>
                                   <div className='flex mt-3'>
                                        <div class="w-1/3 text-right pr-5 pt-1.5">ໝາຍເລກລົດຂົນສົ່ງ: </div>
                                        <div class="w-1/2">
                                             <input
                                                  className="border p-2.5 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                  type="text"
                                                  value={modelImport.regis}
                                                  onChange={(e) => setModelImport({ ...modelImport, regis: e.target.value })}
                                             />
                                        </div>
                                   </div>
                                   <div className='flex mt-3'>
                                        <div class="w-1/3 text-right pr-5 pt-1.5">ບໍລິສັດຂົນສົ່ງ: </div>
                                        <div class="w-1/2">
                                             <input
                                                  className="border p-2.5 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                  type="text"
                                                  value={modelImport.company_name}
                                                  onChange={(e) => setModelImport({ ...modelImport, company_name: e.target.value })}
                                             />
                                        </div>
                                   </div>
                              </div>
                              <div class="w-1/2 flex">
                                   <div class="w-1/4 ml-4">
                                        <label className="block text-ms font-medium text-gray-700 pt-16">
                                             ເອກະສານ:
                                        </label>
                                   </div>
                                   <div class="w-3/5">
                                        <div {...getRootProps()}>
                                             <input {...getInputProps()} />
                                             {
                                                  isDragActive ?
                                                       <p>Drop the files  here ...</p> :
                                                       img === null
                                                            ? <div>
                                                                 <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-6">
                                                                      <div className="text-center">
                                                                           <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                                                           <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                                                <label
                                                                                     htmlFor="file-upload"
                                                                                     className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                                                >
                                                                                     <span>Upload a file</span>
                                                                                </label>
                                                                                <p className="pl-1">or drag and drop</p>
                                                                           </div>
                                                                           <p className="text-xs leading-5 text-gray-600">PNG, JPG up to 4MB</p>
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                            : <img src={img} alt="test" />
                                             }
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
               <div className="bg-white sm:rounded-md mt-5 border-solid border border-[#ddd]">
                    <div className='flex py-5 sm:px-6'>
                         <div className='flex w-full'>
                              <div className='w-3/4'>
                                   <div class="pr-5 pt-1.5 pb-1">ລາຍການສິນຄ້າ:</div>
                                   <OtherSelect
                                        styles={{
                                             control: (base, state) => ({
                                                  ...base,
                                                  "*": {
                                                       boxShadow: "none !important",
                                                  },
                                             }),
                                        }}
                                        onChange={(e) => addItem(e) || onClear(e)}
                                        options={dataProduct}
                                   />
                              </div>
                              <div>
                                   <div class="pr-5 pt-1.5 pb-1">ບາໂຄ໊ດ</div>
                                   <input
                                        className="border p-1.5 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-900"
                                   />
                              </div>
                         </div>
                         <div className='w-1/3  block pt-8'>
                              <div className='block text-right'>
                                   <button
                                        onClick={SaveProduct}
                                        class="w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">
                                        ບັນທືກຂໍ້ມູນ</button>
                              </div>
                         </div>
                    </div>
                    <div className="px-4 sm:px-6">
                         <h3 className="text-base text-gray-900">ລາຍການນຳເຂົ້າ</h3>
                    </div>


                    <div class="relative overflow-x-auto sm:rounded-lg px-4 py-3 sm:px-6">
                         <table class="w-full text-sm text-left text-gray-700">
                              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                   <tr className='my-table'>
                                        <th width={80} class="py-3 pl-2 border">
                                             ລະຫັດສິນຄ້າ
                                        </th>
                                        <th width={350} class="py-3 pl-2 border">
                                             ຊື່ສິນຄ້າ
                                        </th>
                                        <th width={80} class="py-3 pl-2 border">
                                             ຈຳນວນ
                                        </th>
                                        <th width={80} class="py-3 pl-2 border">
                                             ລາຄານຳເຂົ້າ
                                        </th>
                                        <th width={60} class="py-3 pl-2">
                                             ຈັດການ
                                        </th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {
                                        index?.map((row, idx) => {
                                             if (row.status === true) {
                                                  return (
                                                       <>
                                                            <tr key={idx}
                                                                 class="bg-white border-solid border-b border-[#ddd] hover:bg-gray-50">
                                                                 <td class="px-3 py-4 text-gray-900 text-center">
                                                                      {row.value}
                                                                 </td>
                                                                 <td scope="row" class="px-3 py-4 font-medium text-gray-900">
                                                                      {row.label}
                                                                 </td>
                                                                 <td width={150} class="px-3 flex">
                                                                      <input
                                                                           className="border p-1.5 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-900"
                                                                           id="inline-full-name" type="number"
                                                                           value={row.qty}
                                                                           onChange={(e) => {
                                                                                Calculate(e.target.value, idx)
                                                                           }}
                                                                      />
                                                                 </td>
                                                                 <td width={80} class="px-3 py-2">
                                                                      <input
                                                                           className="border p-1.5 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-900"
                                                                           id="inline-full-name" type="number"
                                                                           value={row.price}
                                                                           onChange={(e) => {
                                                                                handleInputPrice(e.target.value, idx)
                                                                           }}
                                                                      />
                                                                 </td>
                                                                 <td width={80} class="px-3 py-2 text-center">
                                                                      <button
                                                                           onClick={() => removeItem(row.value)}
                                                                           className='relative flex px-3 py-[4px] text-[#2D3436] rounded-md ml-3 border-[#ddd] border border-solid'>
                                                                           ລືບ
                                                                      </button>
                                                                 </td>
                                                            </tr>
                                                       </>
                                                  )
                                             }
                                        })
                                   }
                              </tbody>
                         </table>
                         <div className='flex justify-end pb-5 mt-5'>
                              <label className='pr-3 pt-1 font-bold text-lg'>
                                   ລວມມູນຄ່າທັງໝົດ:
                              </label>
                              <div>
                                   <input
                                        className="border p-1.5 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-900"
                                        id="inline-full-name" type="number"
                                        value={modelImport.total_price}
                                        onChange={(e) => setModelImport({ ...modelImport, total_price: e.target.value })}
                                   />
                              </div>
                         </div>
                    </div>

               </div>
               <div className='border-dashed border-t-[1px] border-[#c4c4c4] my-3 mx-5'></div>
               <div className='bg-white grid grid-cols-3 gap-5 sm:rounded-md py-4 border-solid border border-[#ddd]'>
                    <div className='col-span-2'>
                         <label className='pl-5'>ໝາຍເຫດ</label>
                         <div className='w-full pl-5 pt-2'>
                              <textarea rows="3"
                                   class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                                   placeholder="ເນື້ອໃນ..."
                                   value={modelImport.note}
                                   onChange={(e) => setModelImport({ ...modelImport, note: e.target.value })}></textarea>
                         </div>
                    </div>

               </div>
               <div className='mb-10'></div>
          </>

     )
}
