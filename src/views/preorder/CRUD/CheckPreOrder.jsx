import React, { useEffect, useState } from 'react';
import { Button, Input, Select, InputNumber, Table, Tag } from 'antd';
import classes from '../../../components/style/LayoutStyle.module.css'
import classesbtn from '../../../components/style/ButtonStyle.module.css'
import { useHistory, useLocation } from 'react-router-dom'
import { loadDataPreOrderByID, postCheckOrderSuccess, postCloseOrder } from '../../../middleware/PreOrderAPI.jsx';
import { Loader, ReceiptText, Truck, CircleUserRound } from 'lucide-react';
import { NumericFormat } from 'react-number-format';
import moment from 'moment/moment';
import PackingPreOrder from './component/PackingPreOrder.jsx';
import CancelOrderDialog from './component/CancelOrderDialog.jsx';
import FooterRemark from './component/FooterRemark.jsx';

function CheckPreOrder() {
    const [isOpen, setIsOpen] = useState({ packing: false, cancelorder: false })
    const [checkIsOpen, setCheckIsOpen] = useState({ package: false, cancelorder: false })

    const location = useLocation()
    const [dataOld, setDataOld] = useState(location?.state?.data)

    useEffect(() => {
        setDataOld(location?.state?.data)
    }, [location?.state?.data])

    const [listData, setListData] = useState([])
    const { o_id, cus_name, cus_tel, o_date, o_status, total_discount, total_price, total_unit } = listData.length > 0 ? listData[0] : {}

    const [listProduct, setListProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [checkList, setCheckList] = useState(false);

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    useEffect(() => {
        const fetchDataProduct = async () => {
            setLoading(true)
            try {
                const { data } = await loadDataPreOrderByID({ id: dataOld?.o_id })
                // console.log(data);
                let update = data?.data?.map((x) => {
                    return {
                        order_detail: x.order_detail.map((y) => {
                            let data = {
                                key: y.pro_id,
                                od_id: y.od_id,
                                od_price: y.od_price,
                                od_unit: y.od_unit,
                                pro_barcode: y.pro_barcode,
                                pro_name: y.pro_name,
                                o_status: x.o_status
                            }
                            return data
                        })
                    }
                })
                // console.log(data?.data);
                setTimeout(() => {
                    setListData(data?.data)
                    setListProduct(update[0]?.order_detail)
                    setLoading(false)
                }, 500);
                // console.log(update[0].order_detail);
            } catch (error) {
                console.error(error)
            }
        }

        if (checkIsOpen.cancelorder || checkIsOpen.package) {
            fetchDataProduct()
        } else {
            fetchDataProduct()
        }
    }, [checkIsOpen.cancelorder, checkIsOpen.package])



    const columns = [
        {
            title: 'ລະຫັດບາໂຄ໊ດ',
            dataIndex: 'pro_barcode',
            key: 'pro_barcode',
            width: 120,
            render: (text) => <p >{text}</p>,
        },
        {
            title: `ສິນຄ້າທັງໝົດ ${total_unit} ລາຍການ`,
            dataIndex: 'pro_name',
            key: 'pro_name',
            render: (text) => <p>{text}</p>,
            width: 250,
        },
        {
            title: 'ຈຳນວນ',
            dataIndex: 'od_unit',
            key: 'od_unit',
            render: (text) => <p>{text}</p>,
            width: 70,
        },
        {
            title: 'ລາຄາ (ກີບ)',
            dataIndex: 'od_price',
            key: 'od_price',
            render: (text) => <NumericFormat value={text} allowLeadingZeros thousandSeparator="," className='w-full bg-transparent' />,
            width: 80,
        },
        {
            title: 'ສ່ວນຫລຸດ (ກີບ)',
            dataIndex: 'od_price',
            key: 'od_price',
            render: (text) => <NumericFormat value={text} allowLeadingZeros thousandSeparator="," className='w-full bg-transparent' />,
            width: 90,
        },
        {
            title: 'ລວມ (ກີບ)',
            dataIndex: ['od_unit', 'od_price'],
            render: (_, row) => <NumericFormat value={row['od_unit'] * row['od_price']} allowLeadingZeros thousandSeparator="," className='w-full bg-transparent' />,
            width: 90,
        },
    ]

    const tableLoading = {
        spinning: loading,
        indicator: <Loader type="loading" />,
    }

    const hasSelected = selectedRowKeys.length > 0

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            // console.log(selectedRows);
            let update = listProduct.map((x) => {
                let select = selectedRows.find(select => select.key === x.key)
                if (select) {
                    return {
                        pro_id: select.key,
                        od_unit: select.od_unit,
                        status: "success"
                    }
                } else {
                    return {
                        pro_id: x.key,
                        od_unit: x.od_unit,
                        status: "cancel"
                    };
                }
            })
            // console.log(update);
            setSelectedRowKeys(update);
        },
        getCheckboxProps: (record) => ({
            disabled: record.o_status === 'success' || record.o_status === 'canceled',
            // Column configuration not to be checked
            // name: record.name,
        }),
    };

    const handleCheckComplete = async () => {
        setCheckList(true);
        let sendData = {
            o_id: o_id,
            order_detail: selectedRowKeys
        }
        try {
            const { data } = await postCheckOrderSuccess({ senddata: sendData })
            // console.log(data)
            if (data?.status === 200) {
                setTimeout(() => {
                    setSelectedRowKeys([])
                    setCheckList(false)
                    window.location.reload()
                }, 200);
            }
        } catch (error) {
            throw new Error('Failed to post API request:', error);
        }
    }

    const handleCloseOrder = async () => {
        let sendData = {
            o_id: o_id,
        }
        try {
            const { data } = await postCloseOrder({ senddata: sendData })
            if (data?.status === 200) {
                setTimeout(() => {
                    window.location.reload()
                }, 200);
            }
        } catch (error) {
            throw new Error('Failed to post API request:', error);
        }
    }

    function totalAmountPrice() {
        let data = listProduct.map((x) => {
            x.total = x.od_unit * x.od_price
            return x
        })
        let sum = data.reduce((total, currentValue) => total = total + currentValue.total, 0);
        return sum
    }

    return (
        <>
            <div className={`${classes.content}`}>
                <div className='flex justify-between items-center'>
                    <h3 className={`text-lg font-bold`}>ລາຍລະອຽດໃບບິນເລກທີ {o_id}</h3>
                    {
                        o_status === 'packing'
                            ? <div>
                                <Button className={`${classesbtn.close} w-fit mr-4`} onClick={() => setIsOpen({ cancelorder: true })}>
                                    ຍົກເລີກບິນ
                                </Button>
                                <Button className={`${classesbtn.base} w-[6rem]`} onClick={handleCloseOrder}>
                                    ປິດບິນ
                                </Button>
                            </div>
                            : o_status === 'success' || o_status === 'canceled'
                                ? <p className='text-red-500'>*ໃບບິນຖືກກວດສອບສຳເລັດ</p>
                                : <Button className={`${classesbtn.base} w-fit`} onClick={() => setIsOpen({ packing: true })}>
                                    ຈັດສົ່ງສິນຄ້າ
                                </Button>
                    }
                </div>
                <hr className='my-1.5' />
                <div className='grid grid-cols-3 gap-5'>
                    <div>
                        <h5 className='font-bold mb-1 flex items-center'><ReceiptText size={16} className='mr-2' />ໃບບິນ</h5>
                        <div className='flex'><p className='w-16 te'>ເລກທີ:</p><p>{o_id}</p></div>
                        <div className='flex'><p className='w-16 te'>ອອກວັນທີ:</p><p>{moment(o_date?.split(".")[0]).format('DD-MM-YYYY HH:mm')}</p></div>
                    </div>
                    <div>
                        <h5 className='font-bold mb-1 flex items-center'><CircleUserRound size={16} className='mr-2' />ລູກຄ້າ</h5>
                        <div className='flex'><p className='w-16 te'>ຊື່ລູກຄ້າ:</p><p>{cus_name}</p></div>
                        <div className='flex'><p className='w-16 te'>ເບີໂທ:</p><p>{cus_tel}</p></div>
                    </div>
                    <div>
                        <h5 className='font-bold mb-1 flex items-center'><Truck size={16} className='mr-2' />ສະຖານະຈັດສົ່ງ</h5>
                        <Tag color={o_status === 'packing' ? 'volcano' : o_status === 'success' ? 'orange' : o_status === 'canceled' ? 'cyan' : 'geekblue'}>
                            {o_status === 'packing' ? 'ກຳລັງຂົ່ນສົ່ງ' : o_status === 'success' ? 'ກວດສອບສຳເລັດ' : o_status === 'canceled' ? 'ໃບບິນຖືກຍົກເລີກ' : 'ລໍຖ້າດຳເນີນການ'}
                        </Tag>
                    </div>
                </div>
            </div>
            <div className='py-[0.5px] px-0.5 bg-white m-4 rounded-lg border border-[#ddd]'>
                <div className={`${classes.contentnocolor}`}>
                    <div className='grid grid-cols-4 gap-5 text-[#fff]'>
                        <div>
                            <p className='font-bold'>ລວມຍອດ (ບໍ່ຫັກ)</p>
                            <NumericFormat value={totalAmountPrice()} allowLeadingZeros thousandSeparator="," suffix={' ກີບ'}
                                className='text-xl w-full bg-transparent tracking-wide' />
                        </div>
                        <div><p className='font-bold'>ສ່ວນຫລຸດ</p>
                            <NumericFormat value={total_discount} allowLeadingZeros thousandSeparator="," suffix={' ກີບ'}
                                className='text-xl w-full bg-transparent tracking-wide' /></div>
                        <div><p className='font-bold'>ພາສີ</p>
                            <NumericFormat value={0} allowLeadingZeros thousandSeparator="," suffix={' ກີບ'}
                                className='text-xl w-full bg-transparent tracking-wide' /></div>
                        <div><p className='font-bold'>ລວມມູນຄ່າທັງໝົດ</p>
                            <NumericFormat value={total_price} allowLeadingZeros thousandSeparator="," suffix={' ກີບ'}
                                className='text-xl w-full bg-transparent tracking-wide' /></div>
                    </div>
                </div>
            </div>
            <div className={`${classes.content}`}>
                <div className='flex mb-5 items-center'>
                    <Button onClick={handleCheckComplete} disabled={!hasSelected} loading={checkList} className={`${!hasSelected ? '' : 'transaction'} w-fit`}>
                        ກວດແລ້ວ
                    </Button>
                    <span className='ml-4'>
                        {hasSelected ? `ເລືອກຈຳນວນ ${selectedRowKeys.length} ລາຍການ` : ''}
                    </span>
                </div>
                <Table
                    loading={loading ? tableLoading : false}
                    className='custablepro'
                    columns={columns}
                    pagination={false}
                    dataSource={listProduct}
                    rowSelection={rowSelection}
                />
            </div>

            <PackingPreOrder
                getdata={listData[0]}
                use={isOpen.packing}
                cbuse={(x) => { setIsOpen({ ...isOpen, packing: x }) }}
                result={checkIsOpen.package}
                cbresult={(y) => { setCheckIsOpen({ ...checkIsOpen, package: y }) }}
            />

            <CancelOrderDialog
                use={isOpen.cancelorder}
                close={(x) => { setIsOpen({ ...isOpen, cancelorder: x }) }}
                dataValue={listData}
                result={checkIsOpen.cancelorder}
                cbresult={(y) => { setCheckIsOpen({ ...checkIsOpen, cancelorder: y }) }}
            />

            <FooterRemark />
        </>
    )
}

export default CheckPreOrder