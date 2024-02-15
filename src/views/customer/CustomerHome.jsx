import React, { useEffect, useState, Fragment } from 'react';
import { Button, Input, Space, Table, Tag } from 'antd';
import classes from '../../components/style/LayoutStyle.module.css'
import classesbtn from '../../components/style/ButtonStyle.module.css'
import { loadDataCustomer } from '../../middleware/LoadData'
import { USER_KEY } from '../../middleware/userKey';
import { SketchOutlined } from '@ant-design/icons';
import { FilePen, Trash, Loader, Gem } from 'lucide-react';
import CustomerCreate from './CRUD/CustomerCreate';
import CustomerUpdate from './CRUD/CustomerUpdate';

function CustomerHome() {
    const userToken = JSON.parse(localStorage.getItem(USER_KEY))
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
                const { data } = await loadDataCustomer(userToken?.token);
                setTimeout(() => {
                    // console.log(data?.data);
                    setListData(data?.data);
                    setLoading(false);
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
            dataIndex: 'cus_id',
            key: 'cus_id',
            width: 90,
            render: (text) => <p className='text-xs'>{text}</p>,
        },
        {
            fixed: true,
            title: 'ຊື່ລູກຄ້າ',
            dataIndex: 'cus_name',
            key: 'cus_name',
            render: (text) => (
                <p>{text}</p>
            ),
            width: 200,
        },
        {
            title: 'ປະເພດລູກຄ້າ',
            dataIndex: 'cus_type',
            key: 'cus_type',
            render: (text) => (
                <>
                    {
                        <Tag icon={text == "VIP" ? <SketchOutlined /> : ''}
                            color={text == "VIP" ? `geekblue` : text == "MEMBER" ? `gold` : `magenta`}>
                            {text == "VIP" ? `VIP` : text == "MEMBER" ? `ລູກຄ້າປະຈຳ` : `ທົ່ວໄປ`}
                        </Tag>
                    }
                </>
            ),
            width: 100,
        },
        {
            title: 'ເບີໂທ',
            dataIndex: 'cus_tel',
            key: 'cus_tel',
            render: (text) => (
                <p>{text}</p>
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
                    <Button onClick={() => {
                        setFindDataUpdate(record)
                        setOpenStatus({ delete: true })
                    }}
                        className='px-1 shadow-none border-none'><Trash size={16} color='#dc2626' /></Button>
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
                    <h3 className={`${classes.header}`}>ສະແດງລາຍການລູກຄ້າ</h3>
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
                <div className={openStatus.create ? `block` : `hidden`}>
                    <CustomerCreate
                        use={openStatus.create}
                        cbuse={(x) => { setOpenStatus({ ...openStatus, create: x }) }}
                        result={checkResult.create}
                        cbresult={(y) => { setCheckResult({ ...checkResult, create: y }) }}
                    />
                </div>
                <div className={openStatus.update ? `block` : `hidden`}>
                    <CustomerUpdate
                        use={openStatus.update}
                        cbuse={(x) => { setOpenStatus({ ...openStatus, update: x }) }}
                        dataValue={findDataUpdate}
                        result={checkResult.update}
                        cbresult={(y) => { setCheckResult({ ...checkResult, update: y }) }}
                    />
                </div>
            </div>
            {/* <CategoryDelete
                use={openStatus.delete}
                close={(x) => { setOpenStatus({ ...openStatus, delete: x }) }}
                dataValue={findDataUpdate}
                result={checkResult.delete}
                cbresult={(y) => { setCheckResult({ ...checkResult, delete: y }) }}
            /> */}
        </>
    )
}

export default CustomerHome