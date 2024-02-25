import React, { useEffect, useState, Fragment } from 'react';
import { Breadcrumb, Button, Input, Select, Space, Table, Tag, Typography } from 'antd';
import classes from '../../../components/style/LayoutStyle.module.css'
import classesbtn from '../../../components/style/ButtonStyle.module.css'
import { Loader, Truck, Copy, FileText } from 'lucide-react';
import { useHistory, useLocation } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import moment from 'moment/moment';
import { postQueryImportById } from '../../../middleware/ImportAPI.jsx';

function ImportDetailed() {
    const location = useLocation()
    const history = useHistory()

    const [dataOld, setDataOld] = useState(location?.state?.data)
    useEffect(() => {
        setDataOld(location?.state?.data)
    }, [location?.state?.data])

    const { im_id } = dataOld

    const [listData, setListData] = useState([])

    useEffect(() => {
        const fetchData = async () => {

            try {
                const { data } = await postQueryImportById(im_id)
                setTimeout(() => {
                    setListData(data.data)
                }, 200);
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()

    }, []);

    const { total_discount, total_price, total_unit, im_tax, im_regis, im_note, im_deliver_by, im_date, im_company_name, im_bill_sell, im_bill, order_detail } = listData.length > 0 ? listData[0] : {}

    const columns = [
        {
            title: 'ລະຫັດ',
            dataIndex: 'pro_barcode',
            key: 'pro_barcode',
            width: 100,
            render: (text) => <p className='text-xs'>{text}</p>,
        },
        {
            title: `ສິນຄ້າ ${order_detail.length} ລາຍການ`,
            dataIndex: 'pro_name',
            key: 'pro_name',
            render: (text) => (
                <p>{text}</p>
            ),
            width: 200,
        },
        {
            title: 'ລາຄາຂາຍ',
            dataIndex: 'imd_price',
            key: 'imd_price',
            render: (text) => <p>{text}</p>,
            width: 80,
        },
        {
            title: 'ຈ/ນ (ອັນ)',
            dataIndex: 'imd_unit',
            key: 'imd_unit',
            render: (text) => <p>{text}</p>,
            width: 80,
        },
        {
            title: 'ລວມ',
            dataIndex: ['imd_price', 'imd_unit'],
            render: (_, row) => <p>{row['imd_price'] * row['imd_unit']}</p>,
            width: 90,
        },
    ]

    return (
        <>
            <Breadcrumb
                items={[
                    { title: 'ລາຍການນຳເຂົ້າ', href: '/home/import/', },
                    { title: 'ລາຍລະອຽດ', },
                ]}
                className='mt-[1.5rem] ml-[1rem]'
            />
            <h3 className={`${classes.headernopad} pb-3 ml-4 mt-3`}>ສະແດງລາຍການນຳເຂົ້າ</h3>
            <div className='grid grid-cols-3 gap-5 mx-4'>
                <div className={`${classes.contentnopad} col-span-2`}>
                    <h5 className='font-bold'>ລາຍລະອຽດເລກທີ {im_id}</h5>
                    <div className='grid grid-cols-2 gap-3 mt-3'>
                        <div>
                            <p>ລວມມູນຄ່າ</p>
                            <p>{total_price}</p>
                        </div>
                        <div>
                            <p>ລວມ (ບໍ່ຫັກ)</p>
                            <p>{total_price}</p>
                        </div>
                        <div>
                            <p>ສ່ວນຫລຸດ</p>
                            <p>{total_discount}</p>
                        </div>
                        <div>
                            <p>ພາສີ</p>
                            <p>{im_tax}</p>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <h5 className='font-bold mb-3'>ລາຍລະອຽດສິນຄ້າ</h5>
                        <Table
                            className='custablepro'
                            columns={columns}
                            pagination={false}
                            dataSource={order_detail}
                            scroll={{
                                x: 0,
                                y: 1000,
                            }}
                        />
                    </div>
                </div>
                <div className={`${classes.contentnopad}`}>
                    <h4 className='font-bold'>ຂໍ້ມູນບໍລິສັດ</h4>
                    <div className='grid grid-cols-1 gap-3 mt-3'>
                        <div>
                            <p className={classes.pnopad}>ບໍລິສັດ</p>
                            <p>{im_company_name}</p>
                        </div>
                        <div>
                            <p className={classes.pnopad}>ໃບສັ່ງຊື້ເລກທີ</p>
                            <p>{im_bill}</p>
                        </div>
                        <div>
                            <p className={classes.pnopad}>ໃບສັ່ງຂາຍເລກທີ</p>
                            <p>{im_bill_sell}</p>
                        </div>
                        <div>
                            <p className={classes.pnopad}>ຂົ່ນສົ່ງໂດຍບໍລິສັດ</p>
                            <p>{im_deliver_by}</p>
                        </div>
                        <div>
                            <p className={classes.pnopad}>ໝາຍເລກລົດຂົນສົ່ງ</p>
                            <p>{im_regis}</p>
                        </div>
                        <div>
                            <p className={classes.pnopad}>ເອກະສານ</p>
                            <p>{ }</p>
                        </div>
                    </div>
                </div>
                <div className={`${classes.contentnopad} col-span-2`}>
                    <h4 className='font-bold mb-3'>ໝາຍເຫດ</h4>
                    <p>{im_note}</p>
                </div>
            </div>
        </>
    )
}

export default ImportDetailed