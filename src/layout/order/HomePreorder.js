import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';

export default function HomePreorder() {

     const history = useHistory();


     const table = [
          { date: '30-08-2022 15:00', carNum: 'ຈຂ 8889', bill: '202212351', totalProduct: '1500', amount: 25000000, discount: '0.00', totalMoney: 25000000 },
          { date: '10-08-2022 17:00', carNum: 'ອອ 5566', bill: '202235112', totalProduct: '880', amount: 65000000, discount: '0.00', totalMoney: 65000000 },
          { date: '05-08-2022 19:52', carNum: 'ຈຂ 7770', bill: '202280765', totalProduct: '750', amount: 15000000, discount: '0.00', totalMoney: 15000000 },
     ]



     return (
          <>

               <div>
                    <h3 className="text-lg leading-6 font-bold text-gray-900">ເບີກສິນຄ້າ</h3>
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
                              <button type="submit" class="inline-flex w-36 justify-center rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-base text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-bold "
                                   onClick={() => history.push('/home/preorder/add')}>
                                   ເພີ່ມສັ່ງເຄື່ອງ
                              </button>
                         </div>
                    </div>
               </div>
               <div class="bg-white overflow-hidden mt-5 relative overflow-x-auto shadow sm:rounded-lg px-4 py-5 sm:px-6">

                    <h4 class="text-lg font-bold leading-6 text-gray-900 mb-5">ລາຍການລ່າສຸດ</h4>
                    <div class="overflow-x-auto relative ">
                         <table class="w-full text-sm text-left text-gray-700">
                              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                   <tr className='my-table'>
                                        <th scope="col" class="px-3 py-3 border text-center">
                                             #
                                        </th>
                                        <th scope="col" class="px-3 py-3 border">
                                             ວັນທີ ແລະ ເວລາ
                                        </th>
                                        <th scope="col" class="px-3 py-3 border">
                                             ໝາຍເລກລົດຂົ່ນສົ່ງ
                                        </th>
                                        <th scope="col" class="px-3 py-3 border">
                                             ເລກທີໃບບິນ
                                        </th>
                                        <th scope="col" class="px-3 py-3 border">
                                             ລວມລາຍການ
                                        </th>
                                        <th scope="col" class="px-3 py-3 border">
                                             ຈຳນວນເງີນ
                                        </th>
                                        <th scope="col" class="px-3 py-3 border">
                                             ສ່ວນຫລຸດ
                                        </th>
                                        <th scope="col" class="px-3 py-3 border">
                                             ລວມເປັນເງີນ
                                        </th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {
                                        table.map((x, idx) => {
                                             return (
                                                  <tr key={idx} class="bg-white border-b">
                                                       <td align='center' scope="row" class="py-4 px-2 font-medium  whitespace-nowrap dark:text-white">
                                                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                                 ເບິ່ງຂໍ້ມູນ
                                                            </a>
                                                       </td>
                                                       <td class="pl-3 w-38">
                                                            {x.date}
                                                       </td>
                                                       <td class="pl-3 w-36">
                                                            {x.carNum}
                                                       </td>
                                                       <td class="pl-3 w-28">
                                                            {x.bill}
                                                       </td>
                                                       <td class="pl-3 w-28">
                                                            {x.totalProduct}
                                                       </td>
                                                       <td class="pl-3 px-6">
                                                            {x.amount}
                                                       </td>
                                                       <td class="pl-3 px-6">
                                                            {x.discount}
                                                       </td>
                                                       <td class="py-4 px-6">
                                                            {(x.totalMoney).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                                       </td>
                                                  </tr>
                                             )
                                        })
                                   }
                              </tbody>
                         </table>
                    </div>

               </div>
          </>


     )
}
