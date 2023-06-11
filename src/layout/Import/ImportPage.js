import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Myaxios from '../../components/chart/Myaxios';
import moment from 'moment';
import { NewAxios } from '../../components/MyAxios';
import { USER_KEY } from '../../components/userKey'

export default function ImportPage() {

  const [dataTable, setDataTable] = useState([])

  const [loading, setloading] = useState(false);
  const userToken = JSON.parse(localStorage.getItem(USER_KEY));

  const history = useHistory();

  const LoadData = () => {
    setloading(true)

    NewAxios.post('get_import', {
      page: 1,
      limit: 100
    }, {
      headers: {
        'Authorization': `Bearer ${userToken?.token}`
      },
    }).then((res) => {
      if (res.status === 200) {
        setDataTable(res?.data?.data)
        // console.log(res?.data?.data)
        setloading(false)
      }
    })
  }

  useEffect(() => {
    LoadData()
  }, [])

  return (
    <>

      <div>
        <h3 className="text-lg leading-6 font-bold text-gray-900">ນຳສິນຄ້າເຂົ້າໃຫມ່</h3>
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
            <button class="inline-flex w-36 justify-center rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-base text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
              onClick={() => history.push('/home/import/manage')}>
              ນຳສິນຄ້າເຂົ້າໃໝ່
            </button>
          </div>
        </div>
      </div>
      <div class="bg-white overflow-hidden mt-5 relative overflow-x-auto shadow sm:rounded-lg px-4 py-5 sm:px-6">

        <h4 class="text-lg font-bold leading-6 text-gray-900 mb-5">ລາຍການລ່າສຸດ</h4>
        <div class="overflow-x-auto relative ">
          <table class="my-table-im w-full text-sm text-left text-gray-700">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-3 py-3 border text-center">
                  #
                </th>
                <th scope="col" class="px-3 py-3 border">
                  ວັນທີ ແລະ ເວລາ
                </th>
                <th scope="col" class="px-3 py-3 border">
                  ເລກທີໃບບິນ
                </th>
                <th scope="col" class="px-3 py-3 border">
                  ຮູບໃບບີນ
                </th>
                <th scope="col" class="px-3 py-3 border">
                  ຂົນສົ່ງໂດຍບໍລິສັດ
                </th>
                <th scope="col" class="px-3 py-3 border">
                  ໝາຍເລກລົດຂົ່ນສົ່ງ
                </th>
                <th scope="col" class="px-3 py-3 border">
                  ລວມມູນຄ່າທັງໝົດ
                </th>
              </tr>
            </thead>
            <tbody>
              {
                dataTable?.map((x, idx) => {
                  return (
                    <tr key={idx} class="border-solid border-b border-[#ddd] hover:bg-gray-50">
                      <td width={50} align='center' class="px-2 font-medium  whitespace-nowrap ">
                        {idx + 1}
                      </td>
                      <td width={150} class="px-3">
                        {moment(x.im_date).format("DD-MM-YYYY")}
                      </td>
                      <td width={100} class="px-3">
                        {x.im_bill_no}
                      </td>
                      <td width={80} class="pl-3">
                        <div className='align-bottom'>
                          <img src={x.im_image} alt='' className='w-10 object-fill h-8 rounded-sm' />
                        </div>
                      </td>
                      <td width={220} class="px-3">
                        {x.im_company_name}
                      </td>
                      <td width={140} class="px-3">
                        {x.im_regis}
                      </td>
                      <td width={130} class="px-3 text-right">
                        {x.im_total?.toLocaleString()}
                        <span> ກີບ</span>
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
