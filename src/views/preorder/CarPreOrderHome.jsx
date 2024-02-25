import React, { useEffect, useState, Fragment } from 'react';
import { Button, Input, InputNumber, Pagination, Select, Space, Table, Tag, Typography } from 'antd';
import classes from '../../components/style/LayoutStyle.module.css'
import classesbtn from '../../components/style/ButtonStyle.module.css'
import { quertPreOrderByCar } from '../../middleware/PreOrderAPI.jsx'
import { Loader, Truck, Copy, FileText } from 'lucide-react';
import { useHistory, useLocation } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import moment from 'moment/moment';
import PackingPreOrder from './CRUD/component/PackingPreOrder.jsx';
import caricon from '../../assets/icon/cargo-truck.svg'
import classescard from './CarPreOrderHome.module.css'
import emptyicon from '../../assets/icon/empty.svg'

function CarPreOrderHome() {
    const { Search } = Input
    const history = useHistory()
    const location = useLocation()

    const [top, setTop] = useState('topRight')
    const [loading, setLoading] = useState(false)
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalItems, setTotalItems] = useState(1)

    const [listData, setListData] = useState([])
    const [findDataUpdate, setFindDataUpdate] = useState([])
    const [selectDefult, setSelectDefult] = useState('packing');

    const [isOpen, setIsOpen] = useState({ packing: false })
    const [checkIsOpen, setCheckIsOpen] = useState({ package: false })

    const fetchData = async ({ status, page }) => {
        setLoading(true);
        try {
            const { data, total } = await quertPreOrderByCar({ filter: status, page: page, limit: pageSize })
            setTimeout(() => {
                setListData(data)
                setTotalItems(total)
                setLoading(false)
            }, 300);
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        let _filter
        if (selectDefult === 'all') {
            _filter = ''
        } else {
            _filter = selectDefult
        }
        fetchData({ status: _filter, page: current })
    }, [selectDefult])

    const handleSelectFilter = (e) => setSelectDefult(e)

    const columns = [
        {
            fixed: true,
            title: 'ວັນທີ',
            dataIndex: 'o_date',
            key: 'o_date',
            width: 110,
            render: (text) => <p>{moment(text.split(".")[0]).format('DD-MM-YYYY HH:mm')}</p>,
        },
        {
            fixed: true,
            title: 'ເລກໃບບິນ',
            dataIndex: 'o_id',
            key: 'o_id',
            render: (text) => <p className='text-xs'>{text}</p>,
            width: 100,
        },
        {
            title: 'ລວມລາຍການ',
            dataIndex: 'total_unit',
            key: 'total_unit',
            render: (text) => <p>{text}</p>,
            width: 90,
        },
        {
            title: 'ລວມສ່ວນຫລຸດ',
            dataIndex: 'o_discount',
            key: 'o_discount',
            render: (text) => <p>{text}</p>,
            width: 90,
        },
        {
            title: 'ລວມມູນຄ່າ',
            dataIndex: 'total_price',
            key: 'total_price',
            render: (text) => <NumericFormat value={text} allowLeadingZeros thousandSeparator="," suffix={' ກີບ'} />,
            width: 100,
        },
        {
            align: 'center',
            title: 'ສະຖານະ',
            dataIndex: 'o_status',
            key: 'o_status',
            render: (text) => (
                <>
                    {
                        <Tag color={text === 'packing' ? 'volcano' : text === 'success' ? 'orange' : text === 'canceled' ? 'cyan' : 'geekblue'}>
                            {text === 'packing' ? 'ກຳລັງຂົ່ນສົ່ງ' : text === 'success' ? 'ກວດສອບສຳເລັດ' : text === 'canceled' ? 'ໃບບິນຍົກເລີກ' : 'ລໍຖ້າດຳເນີນການ'}
                        </Tag>
                    }
                </>
            ),
            width: 100,
        },
        {
            align: 'center',
            title: 'ຈັດການ',
            key: 'action',
            render: (_, record) => (
                <Space size='small' align="center">
                    <Button onClick={() => history.push({ pathname: '/home/preorder/check', state: { data: record } })}
                        className='px-1 shadow-none border-none'><FileText size={16} /></Button>
                    <Button onClick={() => {
                        // setFindDataUpdate(record)
                        // setOpenStatus({ delete: true })
                    }}
                        className='px-1 shadow-none border-none'><Copy size={16} /></Button>
                    <Button
                        onClick={() => {
                            setFindDataUpdate(record)
                            setIsOpen({ packing: true })
                        }}
                        className={`px-1 shadow-none border-none`}>
                        <Truck size={16} />
                    </Button>
                </Space>
            ),
            width: 100,
        },
    ]

    const onChangePage = (page) => {
        console.log(page);
        setCurrent(page);
    }

    return (
        <>
            <div className='grid grid-cols-3 gap-5'>
                <div className={`col-span-3`}>
                    <div className={`${classes.contentnopad} mb-5 flex items-center justify-between`}>
                        <div className='flex p-3'>
                            <Select
                                defaultValue={selectDefult}
                                className='w-32 mr-3'
                                placeholder='ກະລຸນາເລືອກ'
                                onChange={handleSelectFilter}
                                options={[
                                    { value: 'all', label: 'ທັງໝົດ' },
                                    { value: 'pending', label: 'ລໍຖ້າດຳເນີນການ' },
                                    { value: 'packing', label: 'ກຳລັງຂົ່ນສົ່ງ' },
                                    { value: 'success', label: 'ກວດສອບສຳເລັດ' },
                                    { value: 'canceled', label: 'ຍົກເລີກໃບບິນ' },
                                ]}
                            />
                            <Search
                                className={`${classes.inputsearch} w-[300px]`}
                                size='middle'
                                placeholder="ຄົ້ນຫາ..."
                                allowClear
                                onSearch
                                style={{
                                    fontFamily: 'Noto Sans Lao'
                                }}
                            />
                        </div>
                        <Button size='middle' className={`${classesbtn.base} w-[135px]`}
                            onClick={() => history.push('/home/preorder/create')}>ເບີກສິນຄ້າໃໝ່</Button>
                    </div>
                    <div className='grid grid-cols-4 gap-5'>
                        <div className='col-span-4 flex justify-center'>
                            <Pagination current={current} total={totalItems} onChange={onChangePage} showTotal={(total, range) => `${range[0]}-${range[1]} ຈາກ ${total} ລາຍການ`} />
                        </div>
                        {
                            loading ? <div className='col-span-4 flex justify-center mt-14'><Loader type="loading" /></div>
                                : listData.length > 0 ?
                                    listData?.map((x, idx) => {
                                        return <>
                                            <div className={`${classes.contentnopad} ${classescard.card} cursor-pointer`} key={idx} onClick={() => history.push({ pathname: '/home/preorder/check', state: { data: x } })}>
                                                <div className='flex justify-between'>
                                                    <div>
                                                        <p className='font-medium'>{x?.car_detail[0]?.c_regis}</p>
                                                        <p className='font-medium'>{x?.cus_name}</p>
                                                    </div>
                                                    <img src={caricon} width={44} />
                                                </div>
                                                <hr className='mt-1.5' />
                                                <div className='flex justify-between items-end'>
                                                    <InputNumber
                                                        variant='borderless'
                                                        value={x?.total_price}
                                                        autoComplete={false} size='small' className={`${classescard.myInputNumBlack} pt-2 tracking-wide w-fit`}
                                                        readOnly={true}
                                                        formatter={(value) => `${value} ກີບ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
                                                    <div>
                                                        <Tag color={x?.o_status === 'packing' ? 'volcano' : x?.o_status === 'success' ? 'orange' : x?.o_status === 'canceled' ? 'cyan' : 'geekblue'}>
                                                            {x?.o_status === 'packing' ? 'ກຳລັງຂົ່ນສົ່ງ' : x?.o_status === 'success' ? 'ກວດສອບສຳເລັດ' : x?.o_status === 'canceled' ? 'ໃບບິນຍົກເລີກ' : 'ລໍຖ້າດຳເນີນການ'}
                                                        </Tag>
                                                    </div>

                                                </div>
                                            </div>
                                        </>
                                    })
                                    : <div className='col-span-4 w-full text-center'>
                                        <div className='flex justify-center mb-4'>
                                            <img src={emptyicon} width={74} />
                                        </div>
                                        <p className='text-[#a8a8a8]'>ບໍ່ພົບຂໍ້ມູນທີ່ຄົ້ນຫາ...</p>
                                    </div>
                        }
                    </div >

                </div>
            </div>

            <PackingPreOrder
                getdata={findDataUpdate}
                use={isOpen.packing}
                cbuse={(x) => { setIsOpen({ ...isOpen, packing: x }) }}
                result={checkIsOpen.package}
                cbresult={(y) => { setCheckIsOpen({ ...checkIsOpen, package: y }) }}
            />

        </>
    )
}

export default CarPreOrderHome