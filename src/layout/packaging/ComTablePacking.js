import React, { useEffect, useState } from 'react'
import { NewAxios } from '../../components/MyAxios'
import { USER_KEY } from '../../components/userKey'
import moment from 'moment';

export default function ComTablePacking(data) {
    console.log(data.data)
    const userToken = JSON.parse(localStorage.getItem(USER_KEY));

    const [loading, setLoading] = useState(false)
    const [dataCustomer, setDataCustomer] = useState([])

    const LoadData = () => {
        setLoading(true)

        NewAxios.get('customer', {
            headers: {
                'Authorization': `Bearer ${userToken?.token} `
            },
        }).then((res) => {
            if (res.status === 200) {
                let arrData = res.data.data.filter(x => x.cus_id === data?.data?.c_id)

                let newData = arrData.map((x) => {
                    let arr = {
                        cus_name: x.cus_name,
                        address: x.cus_address,
                        tel: x.cus_tel
                    }
                    return arr
                })

                setDataCustomer(newData)

                setLoading(false)
            }
        })
    }

    useEffect(() => {
        LoadData()
    }, [])

    return (
        <>
            <div>
                <h5 className='font-bold mb-2 text-[#2D3436]'>ຜູ້ຮັບ</h5>
                <div className='flex mb-8'>
                    {
                        dataCustomer.map((x) => {
                            return <>
                                <div className='w-[200px]'>
                                    <div className='flex mb-2'>
                                        <p className='text-[#777]'>ລູກຄ້າ: </p>
                                        <p className='pl-1'>{x.cus_name}</p>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-[#777]'>ເບີໂທ: </p>
                                        <p className='pl-1'>{x.tel}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex mb-2'>
                                        <p className='text-[#777]'>ທີ່ຢູ່:</p>
                                        <p className='pl-1'>{x.address}</p>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-[#777]'>ວັນທີສັ່ງ:</p>
                                        <p className='pl-1'>{moment(data?.data?.o_date).format('DD-MM-YYYY')}</p>
                                    </div>
                                </div>
                            </>
                        })
                    }
                </div>
            </div>
            <h5 className='font-bold mb-2 text-[#2D3436]'>ລາຍການ</h5>
            <table class="my-table-order w-full text-sm text-left text-gray-700">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th>ລາຍການສິນຄ້າ</th>
                        <th class="border text-right">
                            ຈຳນວນ
                        </th>
                        <th class="border text-right">
                            ລາຄາ
                        </th>
                        <th class="border text-right">
                            ລວມ
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.data?.detail_order?.map((x, idx) => {
                            return (
                                <tr key={idx} class="bg-white border-b border-solid  border-[#ddd]">
                                    <td width={300}>
                                        {x.pro_name}
                                    </td>
                                    <td className='text-center'>{x.od_unit?.toLocaleString()}</td>
                                    <td width={90} className='text-right'>{x.od_price?.toLocaleString()}</td>
                                    <td width={130} className='text-right'>{(x.od_unit * x.od_price)?.toLocaleString()}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>

            </table>
            <div className='mt-5'>
                <div className='flex justify-end '>
                    <div className='flex border-b border-solid border-[#ddd] py-1'>
                        <p className='text-[#2D3436] w-[150px]'>ລວມເປັນເງີນ:</p>
                        <p className='w-[150px] text-right text-[#2D3436]'>{data?.data?.total_price?.toLocaleString()} ກີບ</p>
                    </div>
                </div>
                <div className='flex justify-end my-2'>
                    <div className='flex border-b border-solid border-[#ddd] py-1'>
                        <p className='text-[#2D3436] w-[150px]'>ສ່ວນຫລຸດ:</p>
                        <p className='w-[150px] text-right text-[#2D3436]'>{data?.data?.total_discount?.toLocaleString()} ກີບ</p>
                    </div>
                </div>
                <div className='flex justify-end'>
                    <div className='flex border-b border-solid border-[#ddd] py-1'>
                        <p className='text-[#2D3436] w-[150px]'>ລວມມູນຄ່າທັງໝົດ:</p>
                        <p className='w-[150px] text-right text-indigo-500 font-bold'>{data?.data?.all_total?.toLocaleString()} ກີບ</p>
                    </div>
                </div>
            </div>
        </>
    )
}
