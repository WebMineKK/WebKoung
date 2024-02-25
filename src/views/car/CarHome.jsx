import React, { useEffect, useState, Fragment } from 'react';
import { Button, Input, Space, Table, Tag } from 'antd';
import classes from '../../components/style/LayoutStyle.module.css'
import classesbtn from '../../components/style/ButtonStyle.module.css'
import { FilePen, Trash, Loader } from 'lucide-react';
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import CarCreate from './CRUD/CarCreate.jsx';
import { queryDataCar } from '../../middleware/CarAPI.jsx'
import CarUpdate from './CRUD/CarUpdate.jsx';

function CarHome() {
    const [openStatus, setOpenStatus] = useState({ create: false, update: false, delete: false });
    const [checkResult, setCheckResult] = useState({ create: false, update: false, delete: false });
    const { Search } = Input

    const [top, setTop] = useState('topRight')
    const [loading, setLoading] = useState(false)

    const [currentPage, setcurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalItems, setTotalItems] = useState(1)

    const [listData, setListData] = useState([])
    const [findDataUpdate, setFindDataUpdate] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const { data } = await queryDataCar()
                setTimeout(() => {
                    // console.log(data);
                    setListData(data?.data)
                    setLoading(false)
                }, 300);
            } catch (error) {
                // Handle errors
                console.error(error);
            }
        }
        if (checkResult.create || checkResult.update || checkResult.delete) {
            fetchData()
        } else {
            fetchData()
        }
    }, [checkResult.create, checkResult.update, checkResult.delete])

    const columns = [
        {
            fixed: true,
            title: 'ລະຫັດ',
            dataIndex: 'c_id',
            key: 'c_id',
            width: 90,
            render: (text) => <p className='text-xs'>{text}</p>,
        },
        {
            fixed: true,
            title: 'ລົດຍີ່ຫໍ',
            dataIndex: 'c_name',
            key: 'c_name',
            render: (text) => (
                <p>{text}</p>
            ),
            width: 100,
        },
        {
            title: 'ທະບຽນລົດ',
            dataIndex: 'c_regis',
            key: 'c_regis',
            render: (text) => (
                <p>{text}</p>
            ),
            width: 100,
        },
        {
            title: 'ສະຖານະ',
            dataIndex: 'c_status',
            key: 'c_status',
            render: (text) => (
                <>
                    {
                        <Tag icon={text == true ? <ExclamationCircleOutlined /> : <CheckCircleOutlined />}
                            color={text == "NORMAL" ? `success` : text == "FIX" ? `orange` : text == "STOP" ? `geekblue` : `cyan`}>
                            {text == "NORMAL" ? `ໃຊ້ງານ` : text == "FIX" ? `ສ້ອມແປງ` : text == "STOP" ? `ຢຸດໃຊ້ງານ` : `ອື່ນໆ`}
                        </Tag>
                    }
                </>
            ),
            width: 100,
        },
        {
            title: 'ຈັດການ',
            key: 'action',
            render: (_, record) => (
                <Space size='small' align="center">
                    <Button onClick={() => {
                        setFindDataUpdate(record)
                        setOpenStatus({ update: true })
                    }}
                        className='px-1 shadow-none border-none'><FilePen size={16} color='#4f46e5' /></Button>
                </Space>
            ),
            width: 150,
        },
    ]

    const tableLoading = {
        spinning: loading,
        indicator: <Loader type="loading" />,
    }

    return (
        <>
            <div className='grid grid-cols-3 gap-5'>
                <div className={openStatus.create || openStatus.update ? `col-span-2` : `col-span-3`}>
                    <h3 className={`${classes.header}`}>ສະແດງລາຍການລົດຂົ່ນສົ່ງ</h3>
                    <div className={`${classes.content} mb-5 flex items-center justify-between`}>
                        <div>
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
                        {openStatus.create || openStatus.update ? <></> : <Button size='middle' className={`${classesbtn.base} w-[135px]`}
                            onClick={() => setOpenStatus({ create: true })}>ເພີ່ມຂໍ້ມູນໃໝ່</Button>}
                    </div>
                    <div className={`${classes.content}`}>
                        <Table
                            loading={loading ? tableLoading : false}
                            className='custablepro'
                            columns={columns}
                            pagination={{
                                position: [top],
                            }}
                            dataSource={listData}
                            scroll={{
                                x: 500,
                                y: 1000,
                            }}
                        />
                    </div>
                </div>
                {
                    openStatus.create
                        ? <CarCreate
                            use={openStatus.create}
                            cbuse={(x) => { setOpenStatus({ ...openStatus, create: x }) }}
                            result={checkResult.create}
                            cbresult={(y) => { setCheckResult({ ...checkResult, create: y }) }}
                        />
                        : <></>
                }
                {
                    openStatus.update
                        ? <CarUpdate
                            use={openStatus.update}
                            cbuse={(x) => { setOpenStatus({ ...openStatus, update: x }) }}
                            dataValue={findDataUpdate}
                            result={checkResult.update}
                            cbresult={(y) => { setCheckResult({ ...checkResult, update: y }) }}
                        />
                        : <></>
                }
            </div>
        </>
    )
}

export default CarHome