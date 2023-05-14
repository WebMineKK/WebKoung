import React, { useEffect, useRef } from 'react'
import OtherSelect from 'react-select'
import { useState } from 'react'
import Myaxios from '../../components/chart/Myaxios';
import moment from 'moment';
import { toast } from "react-toastify";
import Iconwarning from '../../assets/warning.svg'
import { useHistory } from 'react-router-dom';

export default function ImportProduct() {

     const [dataProduct, setDataProduct] = useState();

     const [loading, setloading] = useState(true);

     const history = useHistory();

     const [Amount, setAmount] = useState(0)
     const [disText, setdisText] = useState(0)
     const [ResultTotal, setResultTotal] = useState(0)

     const [countPro, setCountPro] = useState(0)

     const LoadData = () => {
          setloading(true)
          Myaxios.options('Product')
               .then((res) => {
                    if (res.status === 200) {
                         setDataProduct(res.data)
                         // console.log(res.data)
                    }
               })
     }

     useEffect(() => {
          LoadData()
     }, [])

     const optionProduct = dataProduct?.map((x) => ({
          value: x.pro_id,
          label: x.pro_name,
     }));

     const [modelItem, setmodelItem] = useState({
          id: '',
          pro_name: '',
          qty_total: '',
          price_income: '',
          discount: '',
          note: '',
          date: new Date()
     })

     const [modelImport, setModelImport] = useState({
          income_id: "",
          income_date: new Date(),
          vehicle_regis: "",
          image_refer: "",
          total_product: "",
          amount: "",
          discount: "",
          total: ""
     })

     const TestSave = () => {
          let sendImport = modelImport
          modelImport.income_id = parseInt(modelImport.income_id)
          modelImport.income_date = moment(modelImport.income_date).format("YYYY-MM-DDTHH:mm:ss.000Z")
          modelImport.image_refer = modelImport.image_refer
          modelImport.vehicle_regis = modelImport.vehicle_regis
          modelImport.total_product = parseInt(countPro)
          modelImport.amount = parseInt(Amount)
          modelImport.discount = parseInt(modelItem.discount)
          modelImport.total = parseInt(ResultTotal)

          console.log(sendImport)
     }

     const [getID, setgetID] = useState([])
     function getvalueProduct(e) {
          setgetID(e)
          // console.log(e);
     }

     const [index, setindex] = useState({
          id: '',
          pro_name: '',
          qty_total: '',
          price_income: '',
          discount: '',
          note: '',
          date: new Date()
     })

     const addItem = (e) => {

          let inserItem = dataProduct?.map((row) => {
               if (row.pro_id === e.value) {
                    row.status = true
               }
               return row
          })
          // id: getID.value,
          //      pro_name: getID.label,
          //           qty_total: modelItem.qty_total,
          //                price_income: modelItem.price_income,
          //                     discount: 0,
          //                          note: modelItem.note,
          //                               date: moment(modelItem.date).format("YYYY-MM-DDTHH:mm:ss.000Z")


          setmodelItem(inserItem)
     }

     const clearSelect = () => {
          optionProduct(null)
     }

     const removeItem = (e) => {
          const findID = index.filter((item) => item.id != e)
          setindex(findID)
     }



     const handleInputPrice = (price, id) => {
          let update = index.map((row) => {
               if (row.id === id) {
                    row.price_income = parseInt(price)
               }
               return row
          })
          setindex(update)

          let sum = update.reduce(function (prev, current) {
               return prev + +current.price_income
          }, 0)
          setAmount(sum)

          let count = update.length
          setCountPro(count)
     }

     function Total() {
          let totalAll = disText + Amount
          setResultTotal(totalAll)

     }

     const discountTotal = (e) => {
          let sumDis = (e * Amount) / 100
          setdisText(sumDis)
     }

     const handleInputQty = (qty, id) => {
          let update = index.map((row) => {
               if (row.id === id) {
                    row.qty_total = parseInt(qty)
               }
               return row
          })
          setindex(update)
     }

     const handleInputDis = (dis, id) => {
          let update = index.map((row) => {
               if (row.id === id) {
                    row.discount = parseInt(dis)
               }
               return row
          })
          setindex(update)
     }

     const handleInputNote = (note, id) => {
          let update = index.map((row) => {
               if (row.id === id) {
                    row.note = note
               }
               return row
          })
          setindex(update)
          // console.log(update)
     }

     const SaveIncome = () => {
          console.log(index)

          Myaxios.post('IncomeDetails/Insert', index).then(res => {
               if (res.status === 201) {
                    toast.success("ເພີ່ມຂໍ້ມູນໃຫມ່ສຳເລັດ", {
                         position: toast.POSITION.BOTTOM_RIGHT,
                    });

               } else {
                    toast.error("ບໍ່ສຳເລັດປ້ອນຂໍ້ມູນບໍ່ຖືກຕ້ອງ!", {
                         position: toast.POSITION.BOTTOM_RIGHT,
                    });
               }
          })

     }

     const selectInputRef = useRef();
     const onClear = () => {
          selectInputRef.current.select.clearValue();
     };

     return (
          <>
               <div className='bg-white border-solid border border-[#ddd] overflow-hidden sm:rounded-md'>
                    <div className='flex justify-between'>
                         <div className="px-4 py-5 sm:px-6">
                              <h3 className="text-lg leading-6 font-bold text-gray-900">ຂໍ້ມູນເບື້ອງຕົ້ນ</h3>
                              <p className="mt-1 max-w-2xl text-sm text-gray-500">ປ້ອນຂໍ້ມູນໃນຊ່ອງວ່າງ</p>
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
                              <button onClick={TestSave}>
                                   TestSave
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
                                                  value={modelImport.income_date}
                                                  onChange={(e) => setModelImport({ ...modelImport, income_date: e.target.value })}
                                             />
                                        </div>
                                   </div>
                                   <div className='flex mt-3'>
                                        <div class="w-1/3 text-right pr-5 pt-1.5">ເລກທີໃບບີນ:</div>
                                        <div class="w-1/2">
                                             <input
                                                  className="border p-2.5 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                  type="text"
                                                  value={modelImport.income_id}
                                                  onChange={(e) => setModelImport({ ...modelImport, income_id: e.target.value })}
                                             />
                                        </div>
                                   </div>
                                   <div className='flex mt-3'>
                                        <div class="w-1/3 text-right pr-5 pt-1.5">ໝາຍເລກລົດຂົນສົ່ງ: </div>
                                        <div class="w-1/2">
                                             <input
                                                  className="border p-2.5 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                  type="text"
                                                  value={modelImport.vehicle_regis}
                                                  onChange={(e) => setModelImport({ ...modelImport, vehicle_regis: e.target.value })}
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
                                   <div class="w-2/5">
                                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                             <div className="space-y-1 text-center">
                                                  <svg
                                                       className="mx-auto h-10 w-12 text-gray-400"
                                                       stroke="currentColor"
                                                       fill="none"
                                                       viewBox="0 0 48 48"
                                                       aria-hidden="true"
                                                  >
                                                       <path
                                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                            strokeWidth={2}
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       />
                                                  </svg>
                                                  <div className="flex text-sm text-gray-600">
                                                       <label
                                                            htmlFor="file-upload"
                                                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                       >
                                                            <span className='pl-6'>Upload a file</span>
                                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                       </label>
                                                  </div>
                                                  <p className="pl-1 text-gray-500">or drag and drop</p>
                                                  <p className="text-xs text-gray-500">PNG, JPG up to 1 MB</p>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
               <div className="bg-white sm:rounded-md mt-5">
                    <div className='flex py-5 sm:px-6'>
                         <div className='w-3/4 flex'>
                              <div className='w-3/4'>
                                   <div class="pr-5 pt-1.5 pb-2">ເລືອກລາຍການສິນຄ້າ:</div>
                                   <OtherSelect
                                        styles={{
                                             control: (base, state) => ({
                                                  ...base,
                                                  "*": {
                                                       boxShadow: "none !important",
                                                  },
                                             }),
                                        }}
                                        closeMenuOnSelect={true}
                                        onChange={(e) => addItem(e) || onClear(e)}
                                        options={optionProduct}
                                   />
                              </div>
                              <div className='w-1/6 ml-5'>
                                   {/*                                    
                                   <div class="pr-5 pt-1.5 pb-2">ຈຳນວນ / ລັງ</div>
                                   <input
                                        className=" p-1.6 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-900"
                                        id="inline-full-name" type="number" value={modelItem.qty_total}
                                        onChange={(e) => setmodelItem({ ...modelItem, qty_total: e.target.value })} /> */}
                                   <button type="button"
                                        onClick={(e) => addItem(e) || onClear(e)}
                                        class="w-32 text-white mt-7 bg-[#2E4262] hover:bg-[#4F71A8] focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
                                        ເພີ່ມຂໍ້ມູນ
                                   </button>
                              </div>
                         </div>
                         <div className='w-1/3  block pt-7'>
                              <div className='block text-right'>



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
                                             ຈຳນວນ / ລັງ
                                        </th>
                                        <th width={80} class="py-3 pl-2 border">
                                             ລາຄານຳເຂົ້າ
                                        </th>
                                        <th width={70} class="py-3 pl-2 border">
                                             ສ່ວນຫລຸດ
                                        </th>
                                        <th width={100} class="py-3 pl-2 border">
                                             ລວມ
                                        </th>
                                        <th width={60} class="py-3 pl-2">
                                             ຈັດການ
                                        </th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {
                                        dataProduct?.map((row, idx) => {
                                             if (row.status) {
                                                  return (
                                                       <>
                                                            <tr key={idx} class="bg-white border-b ">
                                                                 <td class="px-3 py-4 text-gray-900">
                                                                      {row.pro_id}
                                                                 </td>
                                                                 <td scope="row" class="px-3 py-4 font-medium text-gray-900">
                                                                      {row.pro_name}
                                                                 </td>
                                                            </tr>
                                                       </>
                                                  )
                                             }
                                        })
                                   }
                              </tbody>
                         </table>
                    </div>

               </div>
               <div className='border-dashed border-t-[1px] border-[#c4c4c4] my-10 mx-5'></div>
               <div className='bg-white grid grid-cols-3 gap-5 sm:rounded-md mt-5'>
                    <div className='col-span-2'>
                         <div className='w-full pl-5'>
                              <textarea rows="3" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="ໝາຍເຫດ..."></textarea>
                         </div>
                    </div>
                    <div className='px-5'>
                         <div className='grid grid-cols-2 gap-2'>
                              <label for="small-input" class="w-64 block text-sx text-gray-800">ລວມເປັນເງີນ:</label>
                              <label for="small-input" class="w-full text-right block text-base text-gray-800 ">{(Amount).toLocaleString(undefined, { maximumFractionDigits: 2 })}</label>
                              <label for="small-input" class="w-64 block text-sx text-gray-800 pt-2">ສ່ວນຫລຸດ (%):</label>
                              <input
                                   className="border p-1.5 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-900"
                                   id="inline-full-name" type="number"
                                   min="0"
                                   value={disText}
                                   on={(e) => discountTotal(e.target.value)}
                              />
                              <div className='col-span-2 pt-2'>
                                   <div className='flex bg-blue-700 py-2 px-3 rounded-md'>
                                        <label class="w-64 block text-lg text-white">ທັງໝົດ:</label>
                                        <label class="w-full text-right block text-lg  text-white ">{(Total).toLocaleString(undefined, { maximumFractionDigits: 2 })} ກີບ</label>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
               <div className='border-dashed border-t-[1px] border-[#c4c4c4] my-10'></div>
               <div className='flex justify-end'>
                    <button type="button"
                         onClick={SaveIncome}
                         class="w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
                         ບັນທືກ
                    </button>
               </div>
          </>

     )
}
