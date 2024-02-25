import { Button, Modal, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import '../../../../components/style/ButtonStyle.css'
import classes from '../../../../components/style/LayoutStyle.module.css'
import { postPackingPreOrder } from '../../../../middleware/PreOrderAPI.jsx'
import { queryDataCar } from '../../../../middleware/CarAPI.jsx'
import { NumericFormat } from 'react-number-format';
import { alertSuccess } from '../../../../components/notification/Notification.jsx'

function PackingPreOrder({ use, cbuse, result, cbresult, getdata }) {

    const [oldData, setOldData] = useState(getdata);

    useEffect(() => {
        setOldData(getdata)
    }, [getdata])

    const [listCar, setListCar] = useState([]);
    const [selectCar, setSelectCar] = useState('');

    useEffect(() => {
        const fetchDataCar = async () => {
            try {
                const { data } = await queryDataCar();
                let update = data?.data?.map((x) => ({
                    value: x.c_id,
                    label: x.c_regis,
                }))
                setListCar(update)
            } catch (error) {
                console.error(error)
            }
        }
        fetchDataCar()
    }, [])

    const columns = [
        {
            title: 'ລະຫັດບາໂຄ໊ດ',
            dataIndex: 'pro_barcode',
            key: 'pro_barcode',
            width: 120,
            render: (text) => <p >{text}</p>,
        },
        {
            title: `ສິນຄ້າທັງໝົດ ${oldData?.total_unit} ລາຍການ`,
            dataIndex: 'pro_name',
            key: 'pro_name',
            render: (text) => <p>{text}</p>,
            width: 250,
        },
    ]

    const handleChangeCar = (e) => {
        setSelectCar(e)
    }

    const handleSavePacking = async () => {
        let sendData = {
            o_id: oldData?.o_id,
            c_id: selectCar
        }
        try {
            const { data } = await postPackingPreOrder({ senddata: sendData })
            // console.log(data)
            if (data?.status === 200) {
                setTimeout(() => {
                    cbuse(!use)
                    cbresult(!result)
                    alertSuccess({ title: 'ຂົ່ນສົ່ງ', label: `ທ່ານນຳສິນຄ້າເລກທີ ${oldData?.o_id} ອອກຂົ່ນສົ່ງແລ້ວ, ກະລຸນາກວດສອບອີກຄັ້ງເມື່ອລົດກັບສາງ.` })
                }, 200);
            }
        } catch (error) {
            throw new Error('Failed to post API request:', error);
        }
    }

    return (
        <Modal
            // centered
            width={1200}
            title={false}
            open={use}
            okButtonProps={{ className: 'base w-fit' }}
            cancelButtonProps={{ className: 'w-fit' }}
            onOk={handleSavePacking}
            onCancel={() => {
                cbuse(!use)
            }}
            okText={<p >ຈັດສົ່ງສິນຄ້າ</p>}
            cancelText={<p >ຍົກເລີກ</p>}
            footer={(_, { OkBtn, CancelBtn }) => (
                <div className='flex justify-center'>
                    <CancelBtn />
                    <div className='mr-3' />
                    <OkBtn />
                </div>
            )}
        >
            <h2 className='font-bold text-lg mb-5'>ການຂົ່ນສົ່ງສິນຄ້າ</h2>
            <div className='grid grid-cols-3 gap-5'>
                <div className='col-span-2'>
                    <Table
                        // loading={loading ? tableLoading : false}
                        className='custablepro'
                        columns={columns}
                        pagination={false}
                        dataSource={oldData?.order_detail}
                        scroll={{
                            y: 260,
                        }}
                    />
                </div>
                <div>
                    <div className="mx-5">
                        <p className='mb-1 font-medium'>ເລືອກລົດຂົ່ນສົ່ງ</p>
                        <Select
                            className='w-full'
                            placeholder='ກະລຸນາເລືອກ'
                            onChange={handleChangeCar}
                            options={listCar}
                        />
                    </div>
                    <hr className='mt-4 mx-5' />
                    <div className='mt-2 pl-5'>
                        <p className='mb-1 font-medium'>ລູກຄ້າ</p>
                        <div>
                            <div className='flex'><p className='w-10'>ຊື່:</p><p>{oldData?.cus_name}</p></div>
                            <div className='flex'><p className='w-10'>ເບີໂທ:</p><p>{oldData?.cus_tel === '' ? '-' : oldData?.cus_tel}</p></div>
                        </div>
                    </div>
                    <hr className='mt-4 mx-5' />
                    <div className='mt-5'>
                        <div className={`${classes.contentnocolor} text-white text-base`}>
                            <div className='flex'><p className='w-20 text-right pr-3'>ສ່ວນຫລຸດ:</p><p><NumericFormat value={oldData?.total_discount} allowLeadingZeros thousandSeparator="," className='w-full bg-transparent tracking-wide' /></p></div>
                            <div className='flex'><p className='w-20 text-right pr-3'>ລວມ:</p><p><NumericFormat value={oldData?.total_price} allowLeadingZeros thousandSeparator="," className='w-full bg-transparent tracking-wide font-bold' suffix=' ກີບ' /></p></div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal >
    )
}

export default PackingPreOrder