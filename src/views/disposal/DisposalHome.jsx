import React, { useEffect, useState, Fragment } from 'react';
import { Button, Input, InputNumber, Select, Space, Table, Tabs, Tag, Typography } from 'antd';
import classes from '../../components/style/LayoutStyle.module.css'
import classesbtn from '../../components/style/ButtonStyle.module.css'
import { loadDataPreOrder } from '../../middleware/PreOrderAPI.jsx'
import { Trash, Loader } from 'lucide-react';
import { useHistory, useLocation } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import moment from 'moment/moment';
import { loadDataProduct } from '../../middleware/ProductAPI.jsx';
import { USER_KEY } from '../../middleware/userKey.jsx';
import { postCreateDisposal, qureyDataDisposal } from '../../middleware/DisposalAPI.jsx';
import CompleteDialog from './components/CompleteDialog.jsx';

const { Search } = Input
const userToken = JSON.parse(localStorage.getItem(USER_KEY))

function DisposalHome() {

    return (
        <div className=''>
            <h3 className={`${classes.header}`}>ການເບີກ ແລະ ຈັດສົ່ງສິນຄ້າ</h3>
            <Tabs
                className='mx-4 mt-4'
                type="card"
                items={[
                    {
                        key: '1',
                        label: 'ຈັດການສິນຄ້າເສຍ',
                        children: <><CardListProduct /></>,
                    },
                    {
                        key: '2',
                        label: 'ລາຍການສິນຄ້າເສຍ',
                        children: <><ListTableDisposal /></>,
                    },
                ]}
            />


        </div>
    )
}

function ListTableDisposal() {
    const top = 'topRight'

    const [listDisposal, setListDisposal] = useState([]);
    const [loading, setLoading] = useState(false);
    const [findDataUpdate, setFindDataUpdate] = useState([])

    const pageSize = 10
    const [totalItems, setTotalItems] = useState(1)

    const fetchDataDisposal = async (page) => {
        setLoading(true)
        try {
            const { data, total } = await qureyDataDisposal({ page: page, limit: pageSize, token: userToken });
            // console.log(data);
            setListDisposal(data)
            setTotalItems(total);
            setLoading(false);
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchDataDisposal(1)
    }, [])

    const columns = [
        {
            title: 'ລະຫັດ',
            dataIndex: 'd_date',
            key: 'd_date',
            width: 180,
            render: (text) => <p>{moment(text.split(".")[0]).format('DD-MM-YYYY HH:mm')}</p>,
        },
        {
            title: 'ຈຳນວນ',
            dataIndex: 'total_unit',
            key: 'total_unit',
            width: 180,
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'ສະຖານະ',
            dataIndex: 'd_status',
            key: 'd_status',
            render: (text) => (
                <>
                    {
                        <Tag color={text === "disposal" ? `success` : `processing`}>
                            {text === "disposal" ? 'ສຳເລັດ' : 'ຍົກເລີກ'}
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
                        // setOpenStatus({ update: true })
                    }}
                        className='px-1 shadow-none border-none'>ແກ້ໄຂ</Button>
                    <Button onClick={() => {
                        setFindDataUpdate(record)
                        // setOpenStatus({ delete: true })
                    }}
                        className='px-1 shadow-none border-none'>ຍົກເລີກ</Button>
                </Space>
            ),
            width: 150,
        },
    ]

    const tableLoading = {
        spinning: loading,
        indicator: <Loader type="loading" />,
    }

    return <>

        <div className={`${classes.contentnopad} mb-5 flex items-center justify-between`}>
            <div className='flex p-3'>
                <Search
                    className={`${classes.inputsearch} w-[300px]`}
                    size='middle'
                    placeholder="ຊື່, ລະຫັດບາໂຄ໊ດ..."
                    allowClear
                    onSearch
                    style={{
                        fontFamily: 'Noto Sans Lao'
                    }}
                />
            </div>
        </div>
        <div className={`${classes.contentnopad} px-3`}>
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
                        fetchDataDisposal(page)
                    }
                }}
                dataSource={listDisposal}
                scroll={{
                    x: 500,
                    y: 1000,
                }}
            />
        </div>
    </>
}


function CardListProduct() {
    const [CountProduct, setCountProduct] = useState(0)
    const [listDataProduct, setListDataProduct] = useState([])
    const [openStatus, setOpenStatus] = useState({ create: false })
    const [checkResult, setCheckResult] = useState({ create: false })

    useEffect(() => {
        const fetchDataProduct = async () => {
            try {
                const { data } = await loadDataProduct({ page: 1, limit: 200, token: userToken });
                let update = data?.map((x) => ({
                    value: x.pro_id,
                    label: x.pro_name,
                    barcode: x.pro_barcode,
                    select: false
                }))
                // console.log(update);
                setListDataProduct(update)

            } catch (error) {
                console.error(error)
            }
        }
        if (checkResult.create) {
            window.location.reload()
        } else {
            fetchDataProduct()
        }
    }, [checkResult.create])

    const handleSelectProduct = (e, value) => {
        let update = listDataProduct.map((x) => {
            if (x.value === value) {
                x.select = true
                x.my_qty = 1
            }
            return x
        })
        setListDataProduct(update)
        setCountProduct(update.filter((x) => x.select === true).length)
        // console.log(update)
    }

    const handleRemoveProduct = (e, value) => {
        let update = listDataProduct.map((x) => {
            if (x.value === value) {
                x.select = false
                x.my_qty = 1
            }
            return x
        })
        setListDataProduct(update)
    }

    const handleInputQty = (idx, value, id) => {
        let newData = [...listDataProduct]
        newData[idx]['my_qty'] = parseInt(value)
        setListDataProduct(newData)
    }

    const handleSaveDisposal = async () => {
        let detailedList = listDataProduct.filter((y) => y.select === true).map((x) => {
            return {
                pro_id: x.value,
                pro_unit: x.my_qty,
            }
        })

        let sendData = {
            u_id: userToken?.detail?.u_id,
            disposal_detail: detailedList
        }

        try {
            const { data } = await postCreateDisposal({ senddata: sendData })
            // console.log(data)
            if (data.status === 200) {
                setTimeout(() => {
                    setOpenStatus({ create: true })
                }, 200);
            }
        } catch (error) {
            throw new Error('Failed to post API request:', error);
        }
    }

    function totalQty() {
        let data = listDataProduct.filter((y) => y.select === true)
        let sum = data.reduce((my_qty, currentValue) => my_qty = my_qty + currentValue.my_qty, 0);
        return sum
    }

    return <>
        <div className='grid grid-cols-3 gap-5 mb-14'>
            <div className='col-span-2'>
                <div className={`${classes.contentnopad} mb-5 flex items-center justify-between`}>
                    <div className='flex p-3'>
                        <Search
                            className={`${classes.inputsearch} w-[300px]`}
                            size='middle'
                            placeholder="ຊື່, ລະຫັດບາໂຄ໊ດ..."
                            allowClear
                            // onSearch
                            style={{
                                fontFamily: 'Noto Sans Lao'
                            }}
                        />
                    </div>

                </div>
                <div className='grid grid-cols-5 gap-2 overflow-scroll h-[40rem]'>
                    {
                        listDataProduct.map((x, idx) => {
                            return <>
                                <div key={idx} className={`${classes.carimg} cursor-pointer`} onClick={(e) => handleSelectProduct(e, x.value)}>
                                    <div className='rounded-tl-lg'>
                                        <div className='bg-slate-500 w-full h-[80px] rounded-tl-lg rounded-tr-lg'></div>
                                    </div>
                                    <p>{x?.label}</p>
                                </div>
                            </>
                        })
                    }
                </div>
            </div>
            <div className={`${classes.contentnopad}`}>
                <div className='flex justify-between text-xl font-bold'>
                    <h4 className=''>ລວມຈຳນວນ:</h4>
                    <span>{totalQty()}</span>
                </div>
                <Button size='middle' className={`${classesbtn.base} w-full my-3`} onClick={handleSaveDisposal}>ບັນທຶກຂໍ້ມູນ</Button>
                <p>ເລືອກ: {CountProduct} ລາຍການ</p>
                <div className='overflow-scroll h-[38rem]'>
                    <table className='w-full '>
                        <tbody>
                            {
                                listDataProduct?.map((x, idx) => {
                                    if (x.select === true) {
                                        return <tr key={idx} className='border-b'>
                                            <td className='pb-4 pt-2'>
                                                <p className='text-sm'>. {x.label}</p>
                                            </td>
                                            <td className='pb-4 pt-2'>
                                                <div className='flex'>
                                                    <button
                                                        className='border border-solid rounded-md px-1.5 py-1.5 mr-3'
                                                        onClick={(e) => handleRemoveProduct(e, x.value)}>
                                                        <Trash size={16} /></button>
                                                    <InputNumber
                                                        min={1}
                                                        value={x.my_qty}
                                                        autoComplete={false} size='small' className='py-0.5 w-16'
                                                        onChange={(e) => handleInputQty(idx, e, x.value)} />
                                                </div>
                                            </td>
                                        </tr>
                                    }
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <CompleteDialog
            label={'ບັນທຶກຂໍ້ມູນສິນຄ້າທີ່ສິນເຫຍເຂົ້າລະບົບສຳເລັດແລ້ວ. ທ່ານຕ້ອງການກວດສອບລາຍການຫລືບໍ ?'}
            header={'ສຳເລັດ'}
            labelcancel={'ປິດ, ສ້າງລາຍການໃໝ່'}
            labelok={'ກວດສອບທັນທີ'}
            link={''}
            use={openStatus.create}
            cbuse={(x) => { setOpenStatus({ ...openStatus, create: x }) }}
            result={checkResult.create}
            cbresult={(y) => { setCheckResult({ ...checkResult, create: y }) }}
        />

    </>
}

export default DisposalHome