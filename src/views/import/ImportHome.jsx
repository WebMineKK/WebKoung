
import React, { useEffect, useState } from 'react';
import { Button, Input, Radio, Space, Table, Tag, theme } from 'antd';
import classes from '../../components/style/LayoutStyle.module.css'
import classesbtn from '../../components/style/ButtonStyle.module.css'
import { myAPI } from '../../middleware/api';
import { loadDataImport } from './LoadData'
import { USER_KEY } from '../../middleware/userKey';
import { useHistory } from 'react-router-dom';
import moment from 'moment/moment';

function ImportHome() {
    const userToken = JSON.parse(localStorage.getItem(USER_KEY));

    let history = useHistory()
    const { Search } = Input

    const [top, setTop] = useState('topRight');
    const [loading, setLoading] = useState(false);

    const [currentPage, setcurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10)
    const [totalItems, setTotalItems] = useState(1)

    const [listData, setListData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, total } = await loadDataImport(currentPage, pageSize, userToken?.token);
                // console.log(data);
                setListData(data);
                setTotalItems(total);
                setLoading(false);
            } catch (error) {
                // Handle errors
                console.error(error);
            }
        };

        fetchData()

    }, []);

    const columns = [
        {
            title: 'ວັນທີ',
            dataIndex: 'im_date',
            key: 'im_date',
            render: (text) => <p>{moment(text).format('DD-MM-YYYY')}</p>,
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
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];


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
                            loadData(page)
                        }
                    }}
                    dataSource={listData?.data}
                />
            </div>
        </>
    )
}

export default ImportHome