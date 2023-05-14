import React from 'react'
import OtherSelect from 'react-select'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function AddPreorder() {

     const history = useHistory()

     const [modelItem, setmodelItem] = useState({
          itemid: '',
          itemname: '',
          qty: '',
          price_in: '',
          discount: '',
     })

     const options = [
          { value: 'KOU0001', label: 'ເບຍຄາວສະເບີກ 330ml ລັງຢາງ' },
          { value: 'KOU0002', label: 'ເບຍຄາວສະເບີກ 330ml ແກັດເຈ້ຍ' },
     ]

     const options_cus = [
          { value: '1', label: 'ສົມສັກ' },
          { value: '2', label: 'ສົມຊາຍ' },
          { value: '3', label: 'ສົມປອງ' },
     ]

     const [getID, setgetID] = useState([])
     function getvalueDrugs(e) {
          setgetID(e)
          // console.log(e);
     }

     const [getcus, setgetcus] = useState([])
     function getvaluecus(e) {
          setgetcus(e)
          // console.log(e);
     }

     const [index, setindex] = useState([])
     const addItem = () => {
          let inserItem = {
               itemid: getID.value,
               itemname: getID.label,
               qty: modelItem.qty,
          }

          setindex([...index, inserItem])

          setmodelItem({
               itemid: '',
               itemname: '',
               qty: '',
               price_in: '',
               discount: '',
          })
     }
     console.log(index)

     return (
          <>
               <div className='bg-white  h-auto pb-10 shadow sm:rounded-lg'>
                    <div className="px-4 py-5 sm:px-6">
                         <div className='flex'>
                              <h3 className="text-lg leading-6 font-bold text-gray-900">ການສັ່ງຂາຍໃໝ່</h3>
                              <button type="button" class="w-24 justify-center text-gray-400 border bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                   onClick={() => history.push('/home/preorder')}>
                                   <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                   <span class="pl-2 text-base">ຍົກເລີກ</span>
                              </button>
                         </div>
                    </div>

                    <div className='px-4 py-5 sm:px-6 bg-gray-100 border-b'>
                         <div class="flex">
                              <label for="small-input" class="w-36 block pt-1.5 mb-2 text-sx font-medium text-gray-900 dark:text-gray-300">ເລືອກລູກຄ້າ</label>
                              <div className='w-5/12'>
                                   <OtherSelect
                                        onChange={(e) => getvaluecus(e)}
                                        options={options_cus} isClearable />
                              </div>
                         </div>
                    </div>

                    <div className='px-4 py-5 sm:px-6'>
                         <div class="flex">
                              <label for="small-input" class="w-36 block pt-1.5 mb-2 text-sx font-medium text-gray-900 dark:text-gray-300">ເລກລະຫັດສັ່ງ</label>
                              <div className='w-48'>
                                   <input type="text" placeholder='SO-00001' id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                              </div>
                         </div>
                         <div class="flex mt-3">
                              <label for="small-input" class="w-36 block pt-1.5 mb-2 text-sx font-medium text-gray-900 dark:text-gray-300">ວັນທີສັ່ງ</label>
                              <div className='w-48'>
                                   <input type="date" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                              </div>
                         </div>
                    </div>


                    <div className='py-5 sm:px-6 '>
                         <div className='border-t border-gray-200 pt-4 px-5 w-full'></div>
                         <div className='w-full flex justify-between'>
                              <div className='flex w-full'>
                                   <div className='w-3/4'>
                                        <div class="pr-5 pt-1.5 pb-1">ລາຍການສິນຄ້າ:</div>
                                        <OtherSelect
                                             onChange={(e) => getvalueDrugs(e)}
                                             options={options} isClearable />
                                   </div>
                                   <div className='w-1/6 ml-5'>
                                        <div class="pr-5 pt-1.5 pb-1">ຈຳນວນ</div>
                                        <input
                                             className=" p-1.6 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-900"
                                             id="inline-full-name" type="number" value={modelItem.qty}
                                             onChange={(e) => setmodelItem({ ...modelItem, qty: e.target.value })} />
                                   </div>
                              </div>

                              <div className='w-1/3  block pt-8'>
                                   <div className='block text-right'>
                                        <button type="button"
                                             onClick={addItem}
                                             class="w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">ເພີ່ມຂໍ້ມູນ</button>
                                        {/* <button type="button" class="w-32 py-2.5 px-5 mr-2 mb-2 text-sm font-bold text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-400 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">ຍົກເລີກ</button> */}
                                   </div>

                              </div>
                         </div>
                    </div>

                    <div class="relative sm:rounded-lg px-4 py-5 sm:px-6">
                         <table class="w-full text-base text-left text-gray-700">
                              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                   <tr className='my-table '>
                                        <th scope="col" class="w-12 text-center border ">
                                             #
                                        </th>
                                        <th scope="col" class="px-3 w-5/12 border ">
                                             <span className='text-base'>ຊື່ສິນຄ້າ</span>
                                        </th>
                                        <th scope="col" class="px-3 w-24 border">
                                             <span className='text-base'>ຈຳນວນ</span>
                                        </th>
                                        <th scope="col" class="px-3 w-28 border">
                                             <span className='text-base'>ລາຄາ</span>
                                        </th>
                                        <th scope="col" class="px-3 w-24 border">
                                             <span className='text-base'>ສ່ວນຫລຸດ</span>
                                        </th>
                                        <th scope="col" class="px-3 py-3 border">
                                             <span className='text-base'>ລວມ</span>
                                        </th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {
                                        index?.map((row, idx) => {
                                             return (
                                                  <tr
                                                       key={idx}
                                                       class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                       <td width={50} class="px-3 text-base py-4 text-center text-gray-900">
                                                            {idx + 1}
                                                       </td>
                                                       <th scope="row" class="px-3 text-base py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                                            {row.itemname}
                                                       </th>
                                                       <td width={130} class="px-3 py-4">
                                                            <label for="small-input" class="block pt-1.5 mb-2 text-base font-medium text-gray-900 dark:text-gray-300">0.00</label>
                                                       </td>
                                                       <td width={160} class="px-3 py-4">
                                                            <label for="small-input" class="block pt-1.5 mb-2 text-base font-medium text-gray-900 dark:text-gray-300">0.00</label>
                                                       </td>
                                                       <td width={130} class="px-3 py-4">
                                                            <input
                                                                 className="border p-1.5 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md text-gray-900"
                                                                 id="inline-full-name" type="number" value='0.00' />
                                                       </td>
                                                       <td width={130} class="px-3 py-4">
                                                            <label for="small-input" class="w-36 text-right block pt-1.5 mb-2 text-base font-medium text-gray-900 dark:text-gray-300">0.00</label>
                                                       </td>

                                                       <td width={80} class="px-3 py-4 text-center">
                                                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">ລົບ</a>
                                                       </td>
                                                  </tr>
                                             )
                                        })
                                   }

                              </tbody>
                         </table>
                    </div>

                    <div class="grid grid-cols-2 gap-4 px-5 mt-10">
                         <div className='w-full relative '>
                              <div className='w-full absolute bottom-0'>
                                   <label for="small-input" class="w-36 pt-1.5 block mb-2 text-sx font-medium text-gray-900 dark:text-gray-300">ໂນ໊ດຂໍ້ຄວາມ</label>
                                   <textarea id="message" rows="3" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                              </div>
                         </div>
                         <div className='w-full bg-gray-100 h-36 rounded-lg'>
                              <div className='py-3 px-5'>
                                   <div className='flex'>
                                        <label for="small-input" class="w-64 block pt-1.5 mb-2 text-sx text-gray-500 dark:text-gray-300">ລວມເປັນເງີນ</label>
                                        <label for="small-input" class="w-full text-right block pt-1.5 mb-2 text-base text-gray-500 dark:text-gray-300">0</label>
                                   </div>
                                   <div className='flex'>
                                        <label for="small-input" class="w-64 block pt-1.5 mb-2 text-sx text-gray-500 dark:text-gray-300">ສ່ວນຫລຸດ</label>
                                        <label for="small-input" class="w-full text-right block pt-1.5 mb-2 text-base text-gray-500 dark:text-gray-300">0</label>
                                   </div>
                                   <div className='flex'>
                                        <label for="small-input" class="w-64 block pt-1.5 mb-2 text-xl font-bold text-gray-900 dark:text-gray-300">ລວມທັງໝົດ <span>(ກີບ)</span> </label>
                                        <label for="small-input" class="w-full text-right block pt-1.5 mb-2 text-xl font-bold text-gray-900 dark:text-gray-300">0</label>
                                   </div>
                              </div>
                         </div>
                    </div>

               </div>
          </>

     )
}
