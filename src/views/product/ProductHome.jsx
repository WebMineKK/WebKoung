import React, { useEffect, useState, Fragment } from 'react';
import { Button, Input, Space, Table, Tag } from 'antd';
import classes from '../../components/style/LayoutStyle.module.css'
import classesbtn from '../../components/style/ButtonStyle.module.css'
import { loadDataProduct } from '../../middleware/ProductAPI.jsx'
import { FilePen, Trash, Loader } from 'lucide-react';
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import ProductCreate from './CRUD/ProductCreate.jsx';
import ProductUpdate from './CRUD/ProductUpdate.jsx';
import ProductDelete from './CRUD/ProductDelete.jsx';

function ProductHome() {
    const [openStatus, setOpenStatus] = useState({ create: false, update: false, delete: false });
    const [checkResult, setCheckResult] = useState({ create: false, update: false, delete: false });

    const { Search } = Input

    const top = 'topRight'
    const [loading, setLoading] = useState(false)

    const pageSize = 10
    const [totalItems, setTotalItems] = useState(1)

    const [listData, setListData] = useState([])
    const [findDataUpdate, setFindDataUpdate] = useState([])

    const fetchData = async ({ page }) => {
        setLoading(true)
        try {
            const { data, total } = await loadDataProduct({ page: page, limit: pageSize })
            // console.log(data);
            setListData(data);
            setTotalItems(total);
            setLoading(false);
        } catch (error) {
            // Handle errors
            console.error(error);
        }
    }

    useEffect(() => {
        if (checkResult.create || checkResult.update || checkResult.delete) {
            fetchData({ page: 1 })
        } else {
            fetchData({ page: 1 })
        }
    }, [checkResult.create, checkResult.update, checkResult.delete])


    const columns = [
        {
            fixed: true,
            title: 'ລະຫັດ',
            dataIndex: 'pro_barcode',
            key: 'pro_barcode',
            width: 180,
            render: (text) => <p className='text-xs'>{text}</p>,
        },
        {
            fixed: true,
            title: 'ຊື່ສິນຄ້າ',
            dataIndex: ['pro_name', 'pro_img'],
            key: 'pro_name',
            render: (_, row) => (
                <div className='flex'>
                    <img src={row['pro_img']} className='w-10 pr-1' />
                    <p>{row['pro_name']}</p>
                </div>
            ),
            width: 350,
        },
        {
            title: 'ລາຄາຂາຍ',
            dataIndex: 'pro_price_sell',
            key: 'pro_price_sell',
            render: (text) => <p>{text}</p>,
            width: 100,
        },
        {
            title: 'ລາຄານຳເຂົ້າ',
            dataIndex: 'pro_price',
            key: 'pro_price',
            render: (text) => <p>{text}</p>,
            width: 100,
        },
        {
            title: 'ຈ/ນ (ອັນ)',
            dataIndex: 'pro_unit',
            key: 'pro_unit',
            render: (text) => <p>{text}</p>,
            width: 90,
        },
        {
            title: 'ໝວດໝູ່',
            dataIndex: 'cate_name',
            key: 'cate_name',
            render: (text) => <p>{text}</p>,
            width: 90,
        },
        {
            title: 'ສະຖານະ',
            dataIndex: 'pro_status',
            key: 'pro_status',
            render: (text) => (
                <>
                    {
                        <Tag icon={text === "DEACTIVE" ? <ExclamationCircleOutlined /> : <CheckCircleOutlined />}
                            color={text === "DEACTIVE" ? `processing` : `success`}>
                            {text === "DEACTIVE" ? 'ຢຸດຈຳໜ່າຍ' : 'ພ້ອມຈຳໜ່າຍ'}
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
                    <h3 className={`${classes.header}`}>ສະແດງລາຍການສິນຄ້າ</h3>
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
                                pageSize: pageSize,
                                total: totalItems,
                                showSizeChanger: true,
                                onChange: (page) => {
                                    fetchData({ page: page })
                                }
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
                    openStatus.create ?
                        <ProductCreate
                            use={openStatus.create}
                            cbuse={(x) => { setOpenStatus({ ...openStatus, create: x }) }}
                            result={checkResult.create}
                            cbresult={(y) => { setCheckResult({ ...checkResult, create: y }) }}
                        />
                        : <></>
                }
                {
                    openStatus.update ? <ProductUpdate
                        use={openStatus.update}
                        cbuse={(x) => { setOpenStatus({ ...openStatus, update: x }) }}
                        dataValue={findDataUpdate}
                        result={checkResult.update}
                        cbresult={(y) => { setCheckResult({ ...checkResult, update: y }) }}
                    />
                        : <></>
                }

            </div>
            {
                openStatus.delete ? <ProductDelete
                    use={openStatus.delete}
                    close={(x) => { setOpenStatus({ ...openStatus, delete: x }) }}
                    dataValue={findDataUpdate}
                    result={checkResult.delete}
                    cbresult={(y) => { setCheckResult({ ...checkResult, delete: y }) }}
                /> : <></>
            }

        </>
    )
}

export default ProductHome