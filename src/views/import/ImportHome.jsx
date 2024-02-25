
import React, { useEffect, useState } from 'react';
import { Button, Input, Radio, Space, Table, Tag, theme } from 'antd';
import classes from '../../components/style/LayoutStyle.module.css'
import classesbtn from '../../components/style/ButtonStyle.module.css'
import { useHistory } from 'react-router-dom';
import moment from 'moment/moment';
import { queryDataImport } from '../../middleware/ImportAPI';
import { Loader, Truck, Copy, FileText, FileX } from 'lucide-react';

function ImportHome() {

    let history = useHistory()
    const { Search } = Input

    const [top, setTop] = useState('topRight');
    const [loading, setLoading] = useState(false)

    const [pageSize, setPageSize] = useState(10)
    const [totalItems, setTotalItems] = useState(1)
    const [isOpen, setIsOpen] = useState({ cancel: false })

    const [listData, setListData] = useState([])
    const [findDataUpdate, setFindDataUpdate] = useState([])

    const fetchData = async (page) => {
        try {
            const { data, total } = await queryDataImport(page, pageSize)
            setListData(data)
            setTotalItems(total)
            setLoading(false)
        } catch (error) {
            console.error(error)
        }
    };
    useEffect(() => {
        fetchData(1)
    }, [])

    const columns = [
        {
            title: 'ວັນທີ',
            dataIndex: 'im_date',
            key: 'im_date',
            render: (text) => <p>{moment(text).format('DD-MM-YYYY HH:mm')}</p>,
            width: 160
        },
        {
            title: 'ເລກໃບບິນ',
            dataIndex: 'im_bill_no',
            key: 'im_bill_no',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'ທະບຽນລົດຂົ່ນສົ່ງ',
            dataIndex: 'im_regis',
            key: 'im_regis',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'ຈຳນວນສິນຄ້າ',
            dataIndex: 'total_unit',
            key: 'total_unit',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'ມູນຄ່າລວມ',
            dataIndex: 'im_total',
            key: 'im_total',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'ຈັດການ',
            key: 'action',
            render: (_, record) => (
                <Space size='small' align="center">
                    <Button onClick={() => history.push({ pathname: '/home/import/view', state: { data: record } })}
                        className='px-1 shadow-none border-none text-sm'>ເບິ່ງຂໍ້ມູນ</Button>
                    <Button onClick={() => {
                        // setFindDataUpdate(record)
                        // setOpenStatus({ delete: true })
                    }}
                        className='px-1 shadow-none border-none text-sm'>ກ໋ອບປີ</Button>
                    <Button
                        onClick={() => {
                            setFindDataUpdate(record)
                            // setIsOpen({ packing: true })
                        }}
                        className={`px-1 shadow-none border-none text-sm`}>
                        ຍົກເລີກ
                    </Button>
                </Space>
            ),
            width: 100,
            align: 'center'
        },
    ]


    return (
        <>
            <h3 className={`${classes.header}`}>ສະແດງລາຍການນຳເຂົ້າ</h3>
            <div className={`${classes.content} mb-5 flex items-center justify-between`}>
                <div>
                    <Search
                        className={`${classes.inputsearch} w-[300px]`}
                        size='middle'
                        placeholder="ຄົ້ນຫາ..."
                        allowClear
                        // enterButton="Search"
                        onSearch
                        style={{
                            fontFamily: 'Noto Sans Lao'
                        }}
                    />
                </div>
                <Button size='middle' className={`${classesbtn.base} w-[135px]`}
                    onClick={() => history.push('/home/import/create')}>ເພີ່ມຂໍ້ມູນໃໝ່</Button>
            </div>
            <div className={`${classes.content}`}>
                <Table
                    className='custable'
                    columns={columns}
                    pagination={{
                        position: [top],
                        pageSize: pageSize,
                        total: totalItems,
                        showSizeChanger: true,
                        onChange: (page) => {
                            fetchData(page)
                        }
                    }}
                    dataSource={listData?.data}
                />
            </div>
        </>
    )
}

export default ImportHome