import React, { useCallback, useEffect, useState, useRef } from "react";
import { useHistory, useLocation } from 'react-router-dom'
import { NewAxios } from "../../components/MyAxios";
import { USER_KEY } from '../../components/userKey'
import { data } from "autoprefixer";
import moment from "moment";
import ReactToPrint from 'react-to-print';

export default function BillNo() {

    let pin = useRef();

    const date = new Date();
    const futureDate = date.getDate();
    date.setDate(futureDate);
    const defaultValue = date.toLocaleDateString('en-CA');

    const userToken = JSON.parse(localStorage.getItem(USER_KEY));
    const location = useLocation()
    const [getOrderID, setGetOrderID] = useState(location.state.dataPre)
    console.log(getOrderID)

    const [loading, setloading] = useState(false);

    const [dataDetails, setdataDetails] = useState([])
    const [sumTotal, setSumTotal] = useState(0)
    const [totalAll, setTotalAll] = useState(0)

    const [dataCustomer, setDataCustomer] = useState([])

    const [dataUser, setDataUser] = useState([])

    const [loading2, setLoading2] = useState(false)

    const LoadData = () => {
        setloading(true)
        setLoading2(true)

        NewAxios.get('customer', {
            headers: {
                'Authorization': `Bearer ${userToken?.token} `
            },
        }).then((res) => {
            if (res.status === 200) {
                // console.log(res.data.data)
                let data = res.data?.data?.filter(x => x.cus_id == getOrderID?.['c_id'])
                let newData = data.map((x) => {
                    let arr = {
                        cus_name: x.cus_name,
                        address: x.cus_address,
                        tel: x.cus_tel
                    }
                    return arr
                })
                setDataCustomer(newData)
                setLoading2(false)
            }
        })

        NewAxios.get('user', {
            headers: {
                'Authorization': `Bearer ${userToken?.token} `
            },
        }).then((res) => {
            if (res.status === 200) {
                let data = res.data?.data?.filter(x => x.u_id == getOrderID?.['u_id'])
                // console.log(res.data.data)
                let newData = data.map((x) => {
                    let arr = {
                        username: x.u_username
                    }
                    return arr
                })
                setDataUser(newData)
                // console.log(newData)
            }
        })


        NewAxios.post('select_one_order', {
            page: 1,
            limit: 100,
            o_id: getOrderID?.['o_id']
        }, {
            headers: {
                'Authorization': `Bearer ${userToken?.token}`
            },
        }).then((res) => {
            if (res.status === 200) {
                let data = res.data?.data
                setdataDetails(data)

                setloading(false)
            }
        })

    }

    useEffect(() => {
        LoadData()
    }, [])

    return (
        <>
            <div className="mx-auto max-w-7xl flex justify-end my-6">
                <button
                    class="w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 mr-4 ">
                    ສ້າງໃບບິນໃໝ່
                </button>
                <ReactToPrint
                    trigger={() =>
                        <button
                            class="w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5">
                            ພິມໃບບິນ
                        </button>
                    }
                    content={() => pin}
                />

            </div>
            {
                <div className='mx-auto max-w-7xl py-5 px-8 bg-white'
                    ref={el => (pin = el)}>

                    <h2 className="font-bold text-xl">ໃບບີນ</h2>
                    <div className="border-b border-solid border-[#ddd]"></div>

                    <div className="mt-3 leading-5 text-[15px] flex justify-between">
                        <div>
                            <h3 className="font-bold">ທ. ຄຳພັນ ພົມມະວົງ</h3>
                            <p>ຕົວແທນຂຳໜ່າຍ ຜະລິດຕະພັນເບຍລາວ ແລະ ນ້ຳຫວານ ປະຈຳເມືອງວັງວຽງ ເຂດ II</p>
                            <p>ບ້ານວັງວຽງ, ເມືອງວັງວຽງ, ແຂວງວຽງຈັນ</p>

                            <p>ເບີໂທຕິດຕໍ່</p>
                            <p>ສາງ: 023 511-4222</p>
                            <p>ມືຖື: 020 2225-4132, 020 5515-5153</p>
                        </div>
                        <div>
                            <div className="text-[15px] leading-6">
                                <div className="grid grid-cols-3">
                                    <p className="text-left pr-5 text-indigo-600">ເລກທີໃບບິນ</p>
                                    <p className="col-span-2 pl-1 ">INV-{dataDetails[0]?.['o_id']}</p>
                                </div>
                                <div className="grid grid-cols-3">
                                    <p className="text-left pr-5 text-indigo-600">ວັນທີສັ່ງ</p>
                                    <p className="col-span-2 pl-1 ">{moment(dataDetails[0]?.['o_date']).format('DD-MM-YYYY')}</p>
                                </div>
                                <div className="grid grid-cols-3">
                                    <p className="text-left pr-5 text-indigo-600">ວັນທີອອກໃບບິນ</p>
                                    <p className="pl-1 col-span-2">{moment(defaultValue).format('DD-MM-YYYY')}</p>
                                </div>
                                <div className="grid grid-cols-3">
                                    <p className="text-left pr-5 text-indigo-600">ຜູ້ຂາຍ</p>
                                    <p className="pl-1 col-span-2">{dataUser[0]?.username}</p>
                                </div>

                                <div className="border-b border-solid border-[#ddd] my-2">
                                </div>

                                <div className="grid grid-cols-3">
                                    <p className="text-left pr-5 text-indigo-600">ລູກຄ້າ</p>
                                    <div className="col-span-2 pl-1">
                                        {
                                            loading2 ? <></>
                                                :
                                                dataCustomer?.map((x) => {
                                                    // console.log(x)
                                                    return (
                                                        <>
                                                            <div className="">
                                                                <p className="">{x?.cus_name}</p>
                                                                <p className="">{x?.tel}</p>
                                                                <p className="">{x?.address}</p>
                                                            </div>
                                                        </>
                                                    )
                                                })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="relative mt-5 overflow-y-auto">
                        <table class="w-full text-base text-left text-gray-700">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                                <tr className='my-table '>
                                    <th scope="col" class="w-12 text-center border ">
                                        #
                                    </th>
                                    <th scope="col" class="px-3 w-5/12 border ">
                                        <span className='text-base'>ຊື່ຜະລິດຕະພັນເບຍລາວ</span>
                                    </th>
                                    <th scope="col" class="px-3 w-24 border text-right">
                                        <span className='text-base'>ຈຳນວນ</span>
                                    </th>
                                    <th scope="col" class="px-3 w-28 border text-right">
                                        <span className='text-base'>ລາຄາ</span>
                                    </th>
                                    <th scope="col" class="px-3 py-2 border text-right">
                                        ລວມ
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dataDetails[0]?.order_detail?.map((x, idx) => {
                                        return (
                                            <tr key={idx}
                                                class="bg-white border-solid border-b border-[#ddd] hover:bg-gray-50">
                                                <td width={50} class="px-3 py-2 text-base text-center text-gray-900">
                                                    {idx + 1}
                                                </td>
                                                <td scope="row" class="px-3 text-base font-medium text-gray-900  whitespace-nowrap">
                                                    {x?.pro_name}
                                                </td>
                                                <td scope="row" class="px-3 text-base font-medium text-gray-900  whitespace-nowrap text-right">
                                                    {x?.od_unit?.toLocaleString()}
                                                </td>
                                                <td scope="row" class="px-3 text-base font-medium text-gray-900  whitespace-nowrap text-right">
                                                    {x?.od_price?.toLocaleString()}
                                                </td>
                                                <td className="text-right px-3">
                                                    {(x?.od_unit * x.od_price)?.toLocaleString()}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-between">
                        <div className="leading-6 mt-5">
                            <p>
                                ທ່ານສາມາດຊຳລະເງີນຜ່ານບິນຊີທະນາຄານ
                            </p>
                            <p>ເລກບັນຊີ: 140120000435342001</p>
                            <p>ຊື່ບັນຊີ: Khamphan Phommavong</p>
                        </div>
                        <div className="grid grid-cols-2">
                            <p className="text-right text-[#777] border border-solid border-[#ddd] py-3 px-5">ລວມ:</p>
                            <p className="text-right border border-solid border-[#ddd] py-3 pr-3">{dataDetails[0]?.['all_total']?.toLocaleString()}  ກີບ</p>
                            <p className="text-right text-[#777] border border-solid border-[#ddd] py-3 px-5">ສ່ວນຫລຸດ
                                <span> ({dataDetails[0]?.['o_discount']}%)</span> :
                            </p>
                            <p className="text-right border border-solid border-[#ddd] py-3 pr-3">{dataDetails[0]?.['total_discount']?.toLocaleString()} ກີບ</p>
                            <p className="bg-indigo-50 text-right text-indigo-600 font-bold border border-solid border-[#ddd] py-3 px-5">ລວມເປັນເງີນ:</p>
                            <p className="bg-indigo-50 font-bold text-right text-indigo-600 border border-solid border-[#ddd] py-3 pr-3">{dataDetails[0]?.['total_price']?.toLocaleString()} ກີບ</p>
                        </div>
                    </div>
                    <div className="flex justify-between mt-16 px-14">
                        <p className="border-b border-solid border-[#777]">ຜູ້ຮິບເຄື່ອງ</p>
                        <p className="border-b border-solid border-[#777]">ຜູ້ຈ່າຍເງີນ</p>
                        <p className="border-b border-solid border-[#777]">ຜູ້ຮັບເງີນ</p>
                    </div>
                </div>
            }
        </>
    )
}
