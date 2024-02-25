import React, { useEffect, useState, Fragment } from 'react';
import { Button, Input, Select, InputNumber } from 'antd';
import classes from '../../../components/style/LayoutStyle.module.css'
import classesbtn from '../../../components/style/ButtonStyle.module.css'
import './PreOrder.css'
import { loadDataCustomer } from '../../../middleware/CustomerAPI.jsx'
import { loadDataProduct } from '../../../middleware/ProductAPI.jsx'
import { postCreatePreOrder } from '../../../middleware/PreOrderAPI.jsx';
import { USER_KEY } from '../../../middleware/userKey.jsx';
import { Trash } from 'lucide-react';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import '../../../components/style/CustomAntd.css'
import { NumericFormat } from 'react-number-format';
import CardSummaryPrice from './component/CardSummaryPrice.jsx';
import ModalComplete from '../../../components/notification/ModalAlter.jsx';



const userToken = JSON.parse(localStorage.getItem(USER_KEY))
let customerID = ''

function PreOrderForm() {
    const history = useHistory()

    const [listDataCustomer, setListDataCustomer] = useState([])
    const [listDataProduct, setListDataProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const [checkStatus, setCheckStatus] = useState(0);

    useEffect(() => {
        const fetchDataCustomer = async () => {
            setLoading(true)
            try {
                const { data } = await loadDataCustomer();
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
        customerID = e
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
    const [CountProduct, setCountProduct] = useState(0)
    const [listDataProduct, setListDataProduct] = useState([])
    const [isOpen, setIsOpen] = useState({ complete: false, back: false })

    useEffect(() => {
        const fetchDataProduct = async () => {
            try {
                const { data } = await loadDataProduct({ page: 1, limit: 200 });
                let update = data?.map((x) => ({
                    value: x.pro_id,
                    label: x.pro_name,
                    barcode: x.pro_barcode,
                    price: x.pro_price_sell,
                    unit: x.pro_unit,
                    my_qty: 0,
                    total: 0,
                    discount: 0,
                    select: false
                }))
                // console.log(update);
                setListDataProduct(update)

            } catch (error) {
                console.error(error)
            }
        }

        fetchDataProduct()
    }, [])


    const handleSelectProduct = (e) => {
        let update = listDataProduct.map((x) => {
            if (x.value === e) {
                x.value = x.value
                x.price = x.price
                x.qty = x.qty
                x.my_qty = 1
                x.select = true
                x.total = 0
                x.discount = 0
            }
            return x
        })
        setListDataProduct(update)
        setCountProduct(update.filter((x) => x.select === true).length)
    }

    const handleRemoveList = (val) => {
        let update = listDataProduct.map((x) => {
            if (x.value === val) {
                x.my_qty = 1
                x.select = false
                x.total = 0
                x.discount = 0
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

    const handleInputDis = (idx, discount, id) => {
        let newData = [...listDataProduct]
        newData[idx]['discount'] = parseInt(discount)
        setListDataProduct(newData)
    }

    function totalAmountPrice() {
        let data = listDataProduct.filter((y) => y.select === true).map((x) => {
            x.total = x.my_qty * x.price
            return x
        })
        let sum = data.reduce((total, currentValue) => total = total + currentValue.total, 0);
        return sum
    }

    function totalDiscountPrice() {
        let data = listDataProduct.filter((x) => x.select === true)
        let dis = data.reduce((discount, currentValue) => discount = discount + currentValue.discount, 0)
        return dis
    }

    function totalPrice() {
        let summary = totalAmountPrice() - totalDiscountPrice()
        return summary
    }

    const [valueTax, setValueTax] = useState(0)
    const [valueMoneyAll, setValueMoneyAll] = useState(0);

    const handleSavePreOrder = async () => {

        let detailedList = listDataProduct.filter((y) => y.select === true).map((x) => {
            return {
                pro_id: x.value,
                pro_unit: x.my_qty,
                pro_price: x.price,
                pro_discount: x.discount
            }
        })

        let sendData = {
            cus_id: customerID,
            u_id: userToken?.detail?.u_id,
            total_discount: totalDiscountPrice(),
            total_price: valueMoneyAll,
            tax: valueTax,
            order_detail: detailedList
        }

        try {
            const { data } = await postCreatePreOrder({ senddata: sendData })
            // console.log(data)
            if (data?.status === 200) {
                setTimeout(() => {
                    setIsOpen({ complete: true })
                }, 200);
            }
        } catch (error) {
            throw new Error('Failed to post API request:', error);
        }
    }

    return <>
        <CardSummaryPrice
            totalAmountPrice={totalAmountPrice()}
            totalDiscountPrice={totalDiscountPrice()}
            totalPrice={totalPrice()}
            cbTax={(e) => setValueTax(e)}
            cbTotalMoneyAll={(e) => setValueMoneyAll(e)}
        />
        <div className={`${classes.content} h-[37rem]`}>
            <div className='flex items-center justify-between'>
                <div></div>
                <Button icon={<VerticalAlignBottomOutlined />} size='middle' className={`${classesbtn.base} w-[135px]`} onClick={handleSavePreOrder}>ບັນທຶກຂໍ້ມູນ</Button>
            </div>
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
                        <Select.Option
                            key={x.value}
                            value={x.value}
                            label={x.barcode + '' + x.label}
                        >
                            <span>
                                {x.label} <br /> <span className='font-bold text-xs'>{x.barcode}</span>
                            </span>
                        </Select.Option>
                    ))}
                </Select>
            </div>
            <div className='mt-4'>
                <table className={`preordertable`}>
                    <thead class="text-xs text-gray-700 bg-gray-50 thead">
                        <tr>
                            <th className=' w-[6.25rem] th'>
                                ລະຫັດສິນຄ້າ
                            </th>
                            <th className='th'>
                                ຊື່ສິນຄ້າ (ລວມ {CountProduct} ລາຍການ)
                            </th>
                            <th className='th' align='right'>
                                ລາຄາຂາຍ
                            </th>
                            <th className='th'>
                                ຈຳນວນ
                            </th>
                            <th className='th'>
                                ສ່ວນຫລຸດ
                            </th>
                            <th className='th'>
                                ລວມ
                            </th>
                            <th className='th'>
                                ຈັດການ
                            </th>
                        </tr>
                    </thead>
                    <tbody className='tbody'>
                        {
                            listDataProduct?.map((row, idx) => {
                                if (row.select === true) {
                                    // console.log(row);
                                    return (
                                        <tr key={idx} class="bg-white border-b tr">
                                            <td class="text-xs py-3 td">
                                                {row.barcode}
                                            </td>
                                            <td className='td'>
                                                {row.label}
                                            </td>
                                            <td className='td'>
                                                <Input autoComplete={false} size='small' className='py-0.5 text-right'
                                                    value={row.price} readOnly={true} />
                                            </td>
                                            <td className='td'>
                                                <div className='flex items-center'>
                                                    <span className='w-20 pr-1 text-[#777]'>{row.unit}</span>
                                                    <InputNumber
                                                        min={1}
                                                        value={row.my_qty}
                                                        autoComplete={false} size='small' className='py-0.5 '
                                                        onChange={(e) => handleInputQty(idx, e, row.value)} />
                                                    <Input
                                                        readOnly={true}
                                                        size='small' className='py-0.5 w-20 text-center'
                                                        value={'ກະຕຸກ'} />
                                                </div>
                                            </td>
                                            <td className='td'>
                                                <InputNumber
                                                    min={1}
                                                    value={row.discount}
                                                    autoComplete={false} size='small' className='py-0.5 '
                                                    onChange={(e) => handleInputDis(idx, e, row.value)} />
                                            </td>
                                            <td className='td'>
                                                <NumericFormat
                                                    value={row.my_qty * row.price}
                                                    className='text-right'
                                                    readOnly={true}
                                                    autoComplete={false} size='middle'
                                                    customInput={Input} allowLeadingZeros thousandSeparator="," />
                                            </td>
                                            <td className='td text-center'>
                                                <button
                                                    onClick={() => handleRemoveList(row.value)}
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
        <div className='mb-14'></div>

        <ModalComplete
            header='ເບີກສິນຄ້າສຳເລັດ'
            label={`ທ່ານຕ້ອງການກວດສອບລາຍການຂໍ້ມູນ ຫລື ບໍ?`}
            labelok='ພິມໃບບິນ'
            labelcheck='ກວດສິນຄ້າ'
            labelnew='ກັບຄືນ'
            labelcancel='ສ້າງລາຍການໃໝ່'
            back={'back'}
            open={isOpen.complete}
            close={(x) => {
                setIsOpen({ complete: x })
            }}
        />
    </>
}



export default PreOrderForm