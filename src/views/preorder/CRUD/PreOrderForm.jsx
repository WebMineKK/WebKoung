import React, { useEffect, useState, Fragment } from 'react';
import { Button, Input, Select, Space, Table, Tag } from 'antd';
import classes from '../../../components/style/LayoutStyle.module.css'
import classesbtn from '../../../components/style/ButtonStyle.module.css'
import classestable from '../../../components/style/Table.module.css'
import { loadDataCustomer, loadDataProduct } from '../../../middleware/LoadData'
import { USER_KEY } from '../../../middleware/userKey';
import { Trash } from 'lucide-react';
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import '../../../components/style/CustomAntd.css'

const userToken = JSON.parse(localStorage.getItem(USER_KEY))

function PreOrderForm() {
    const history = useHistory()

    const [listDataCustomer, setListDataCustomer] = useState([])
    const [listDataProduct, setListDataProduct] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchDataCustomer = async () => {
            setLoading(true)
            try {
                const { data } = await loadDataCustomer(userToken?.token);
                let update = data?.data?.map((x) => ({
                    value: x.cus_id,
                    label: x.cus_name,
                    status: false
                }))
                setListDataCustomer(update)
                setLoading(false)
            } catch (error) {
                console.error(error)
            }
        }
        fetchDataCustomer()
    }, [])

    const [checkStatus, setCheckStatus] = useState(0);

    const handleSelectCustomer = (e) => {
        let update = listDataCustomer.map((x) => {
            if (x.value === e) {
                x.status = true
                return x
            } else {
                x.status = false
                return x
            }
        })
        setCheckStatus(update.filter((y) => y.status === true))
    }

    return (
        <>
            <div className=''>
                <h3 className={`${classes.header}`}>ສະແດງລາຍການເບີກສິນຄ້າ</h3>
                <div className='p-[1.5rem] flex items-center'>
                    <Input size='middle' value={'ເລືອກລູກຄ້າ:'} className='w-24 myinput bg-teal-400 border-teal-400 font-medium' />
                    <Select
                        // defaultValue={selectDefult}
                        className='w-60 myseclect'
                        placeholder='ກະລຸນາເລືອກ'
                        onChange={handleSelectCustomer}
                        options={listDataCustomer}
                    />
                </div>
                {
                    checkStatus.length > 0
                        ? <PreOrderList />
                        : ''
                }
            </div>
        </>
    )


}

function PreOrderList() {
    const [listDataProduct, setListDataProduct] = useState([])

    useEffect(() => {
        const fetchDataProduct = async () => {
            try {
                const { data } = await loadDataProduct(userToken?.token);
                let update = data?.map((x) => ({
                    value: x.pro_id,
                    label: x.pro_name,
                    barcode: x.pro_barcode,
                    price: x.pro_price,
                    qty: x.pro_unit,
                    my_qty: 0,
                    select: false
                }))
                console.log(update);
                setListDataProduct(update)

            } catch (error) {
                console.error(error)
            }
        }

        fetchDataProduct()
    }, [])

    const [CountProduct, setCountProduct] = useState(0)

    const handleSelectProduct = (e) => {
        let update = listDataProduct.map((x) => {
            if (x.value === e) {
                x.value = x.value
                x.price = x.price
                x.qty = x.qty
                x.my_qty = 1
                x.select = true
            }
            return x
        })
        setListDataProduct(update)
        setCountProduct(update.filter((x) => x.select === true).length)
    }

    return <>
        <div className={`${classes.content} mb-5 h-[37rem]`}>
            <div>
                <p className='mb-1.5 font-medium'>ລະບຸລາຍການສິນຄ້າ</p>
                <Select
                    placeholder='ເລືອກລາຍການ ຫລື ຄົ້ນຫາ ຊື່, ເລກບາໂຄ໊ດ'
                    className='w-[30rem]'
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    onChange={(value) => handleSelectProduct(value)}
                    optionLabelProp="label"
                >
                    {listDataProduct.map((x) => (
                        <Option
                            key={x.value}
                            value={x.value}
                            label={x.barcode + '' + x.label}
                        >
                            <span>
                                {x.label} <br /> <span className='font-bold text-xs'>{x.barcode}</span>
                            </span>
                        </Option>
                    ))}
                </Select>
            </div>
            <div className='flex items-center justify-between'>
                <div></div>
                <Button size='middle' className={`${classesbtn.base} w-[135px]`} onClick>ບັນທຶກຂໍ້ມູນ</Button>
            </div>

            <div className='mt-4'>
                <table className={`${classestable.preordertable} `}>
                    <thead class="text-xs text-gray-700 bg-gray-50 ">
                        <tr>
                            <th className=' w-[6.25rem]'>
                                ລະຫັດສິນຄ້າ
                            </th>
                            <th width={500}>
                                ຊື່ສິນຄ້າ (ລວມ {CountProduct} ລາຍການ)
                            </th>
                            <th width={150} align='right'>
                                ລາຄາຂາຍ
                            </th>
                            <th width={150}>
                                ຈຳນວນ
                            </th>
                            <th width={150}>
                                ສ່ວນຫລຸດ
                            </th>
                            <th width={100}>
                                ລວມ
                            </th>
                            <th width={60}>
                                ຈັດການ
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listDataProduct?.map((row, idx) => {
                                if (row.select === true) {
                                    // console.log(row);
                                    return (
                                        <tr key={idx} class="bg-white border-b ">
                                            <td class="text-xs py-3">
                                                {row.barcode}
                                            </td>
                                            <td>
                                                {row.label}
                                            </td>
                                            <td class="">
                                                <Input autoComplete={false} size='small' className='py-0.5 text-right'
                                                    value={row.price} onChange />
                                            </td>
                                            <td class="">
                                                <div className='flex items-center'>
                                                    <span className='w-20 pr-1 text-[#777]'>{row.qty}</span>
                                                    <Input
                                                        autoComplete={false} size='small' className='py-0.5 '
                                                        onChange />
                                                    <Input
                                                        autoComplete={false} size='small' className='py-0.5 w-20 text-center'
                                                        value={'ກະຕຸກ'} />
                                                </div>
                                            </td>
                                            <td class="">
                                                <Input autoComplete={false} size='small' className='py-0.5'
                                                    onChange />
                                            </td>
                                            <td class="">
                                                <Input

                                                    autoComplete={false} size='small' className='py-0.5'
                                                />
                                            </td>
                                            <td class=" text-center">
                                                <button
                                                    onClick
                                                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                    <Trash size={16} color='#e11d48' />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>

        <div className={`${classes.content}`}>

        </div>
    </>
}



export default PreOrderForm