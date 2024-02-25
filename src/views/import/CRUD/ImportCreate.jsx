import React, { useEffect, useState } from 'react';
import { Button, Input, Select, Upload } from 'antd';
import classes from '../../../components/style/LayoutStyle.module.css'
import classesbtn from '../../../components/style/ButtonStyle.module.css'
import { myAPI } from '../../../middleware/api.jsx';
import { loadDataProduct } from '../../../middleware/ProductAPI.jsx';
import classestable from '../../../components/style/Table.module.css'
import { NumericFormat } from 'react-number-format';
import ImportModel from '../models/ImportModel';
import { UploadOutlined } from '@ant-design/icons';
import ModalComplete from './ModalComplete.jsx';
import { alertError, alertWarning } from '../../../components/notification/Notification.jsx';
import { postCreateImport } from '../../../middleware/ImportAPI.jsx';
import { postUploadImage } from '../../../middleware/UploadImageAPI.jsx';
import { MyToken } from '../../../middleware/LoginAPI.jsx';


function ImportCreate() {
    const userToken = MyToken()
    const { TextArea } = Input


    const [modelImport, setModelImport] = useState(new ImportModel())
    const { company_name, bill_no, bill_sell, delivery_by, note, regis } = modelImport

    const [isOpen, setIsOpen] = useState({ complete: false })

    const [dataProduct, setDataProduct] = useState([])

    const [fileList, setFileList] = useState([])
    const [giveImage, setGiveImage] = useState('')
    const [btn, setbtn] = useState(false)

    const [validation, setValidation] = useState({
        companyname: false,
        billno: false,
        billsell: false,
        deliveryby: false
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await loadDataProduct({ page: 1, limit: 200 })
                let update = data?.map((x) => ({
                    value: x.pro_id,
                    label: x.pro_name,
                    unit: x.pro_unit,
                    barcode: x.pro_barcode,
                    status: false,
                    price: 0,
                    discount: 0,
                    qty: 0,
                    total: 0,
                    tax: 0
                }))
                setDataProduct(update)
                // console.log(update)
            } catch (error) {
                // Handle errors
                console.error(error)
            }
        }

        fetchData()
    }, [])

    const handleSelectProduct = (val, label) => {
        let update = dataProduct.map((row) => {
            if (row.value === val) {
                row.status = true
                row.qty = 1
                row.price = 0
                row.tax = 0
                row.type = 'CASE/CRATE'
            }
            return row
        })

        setDataProduct(update)
    }

    const hanldeRemoveProduct = (val) => {
        let update = dataProduct.map((row) => {
            if (row.value === val) {
                row.status = false
                row.total = 0
                row.qty = 0
                row.price = 0
                row.discount = 0
                row.tax = 0
                row.type = 'CASE/CRATE'
            }
            return row
        })

        setDataProduct(update)
    }

    const handleInputQty = (idx, qty, id) => {
        let newData = [...dataProduct]
        newData[idx]['qty'] = parseInt(qty)
        setDataProduct(newData)
    }

    const handleInputPrice = (idx, price, id) => {
        let newData = [...dataProduct]
        newData[idx]['price'] = parseInt(price)
        setDataProduct(newData)
    }

    const handleInputDis = (idx, discount, id) => {
        let newData = [...dataProduct]
        newData[idx]['discount'] = parseInt(discount)
        setDataProduct(newData)
    }

    const handleInputTax = (idx, tax, id) => {
        let newData = [...dataProduct]
        newData[idx]['tax'] = parseInt(tax)
        setDataProduct(newData)
    }

    const handleChangeType = (idx, e) => {
        let newData = [...dataProduct]
        newData[idx]['type'] = e
        setDataProduct(newData)
    }

    function totalAmountPrice() {
        let data = dataProduct.filter((x) => x.status === true).map((x) => {
            x.total = x.qty * x.price
            return x
        })
        let sum = data.reduce((total, currentValue) => total = total + currentValue.total, 0);
        return sum
    }

    function totalDiscountPrice() {
        let data = dataProduct.filter((x) => x.status === true)
        let dis = data.reduce((discount, currentValue) => discount = discount + currentValue.discount, 0)
        return dis
    }

    function totalTax() {
        let data = dataProduct.filter((x) => x.status === true)
        let tax = data.reduce((tax, currentValue) => tax = tax + currentValue.tax, 0)
        return tax
    }

    function totalPriceAll() {
        let summary = totalDiscountPrice() + totalTax() + totalAmountPrice()
        return summary
    }

    const props = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            const formData = new FormData();
            formData.append('image', file);

            postUploadImage(formData).then(response => {
                // console.log(response?.data?.data);
                let images = giveImage ? giveImage + "," + response?.data?.data?.image_url : response?.data?.image_url
                // console.log(images);
                setGiveImage(images)
            }).catch(error => {
                console.error(error);
            });

            setFileList([...fileList, file]);
            return false;
        },
        fileList,
    }

    const handleSubmitImport = async () => {
        setbtn(true)

        let detailed = dataProduct.filter((x) => x.status === true).map((x) => {
            return {
                pro_id: x.value,
                pro_unit: x.qty,
                pro_price: x.price,
                pro_discount: x.discount,
                pro_tax: x.tax,
                pro_type: x.type
            }
        })

        let listProduct = detailed.length > 0 ? '1' : ''
        let checkData = { a: bill_no, b: bill_sell, c: company_name, d: listProduct }
        let count = 0

        Object.keys(checkData).forEach(key => { if (checkData[key] === "" || checkData[key] === null) return count++ })

        if (count === 0) {
            let sendData = {
                company_name: company_name,
                bill_no: bill_no,
                bill_sell: bill_sell,
                delivery_by: delivery_by,
                u_id: userToken?.detail?.u_id,
                image: giveImage === "" ? "" : giveImage,
                regis: regis,
                total_price: totalPriceAll(),
                total_discount: totalDiscountPrice(),
                tax: totalTax(),
                note: note,
                import_detail: detailed
            }

            try {
                const { data } = await postCreateImport({ senddata: sendData })
                if (data.status === 200) return setIsOpen({ complete: true })
                if (data.status === 299) return alertError({ title: 'ເກີດຂໍ້ຂັດຂ້ອງ!', label: 'ບໍ່ສາມາດນຳສິນຄ້າເຂົ້າສາງ, ກະລຸນາກວດສອບອີກຄັ້ງ.' })
            } catch (error) {
                throw new Error('Failed to post API request:', error)
            }
        } else alertWarning({ title: 'ບໍ່ສຳເລັດ!', label: 'ມີບາງຂໍ້ມູນບໍ່ຄົບຖ້ວນ, ກະລຸນາກວດສອບອີກຄັ້ງ.' })
    }

    return (
        <>
            <h5 className={`${classes.header}`}>ສະແດງລາຍການນຳເຂົ້າ</h5>
            <div className={`mx-[1.5rem 1rem] p-[1rem]`}>
                <div className='grid grid-cols-3 gap-5'>
                    <div className='col-span-2 bg-white border border-[#ddd] border-solid rounded-lg p-5'>
                        <h5 className='font-bold'>ຂໍ້ມູນບໍລິສັດ</h5>
                        <div className='grid grid-cols-2 gap-x-10'>
                            <div className='mt-2'>
                                <p className="text-md mb-1">ໃບສັ່ງຊື້ເລກທີ:* </p>
                                <Input
                                    className='w-full'
                                    value={bill_no}
                                    size='middle'
                                    onChange={(e) => {
                                        setModelImport({ ...modelImport, bill_no: e.target.value })
                                        setValidation({ ...validation, billno: e.target.value.length > 0 ? false : true })
                                    }}
                                    status={validation.billno || (bill_no === "" && btn) ? 'error' : null}
                                />

                            </div>
                            <div className='mt-2'>
                                <p className="text-md mb-1">ໃບສັ່ງຂາຍເລກທີ:* </p>
                                <Input
                                    className='w-full'
                                    size='middle'
                                    value={bill_sell}
                                    onChange={(e) => {
                                        setModelImport({ ...modelImport, bill_sell: e.target.value })
                                        setValidation({ ...validation, billsell: e.target.value.length > 0 ? false : true })
                                    }}
                                    status={validation.billsell || (bill_sell === "" && btn) ? 'error' : null}
                                />
                            </div>
                            <div className='mt-2'>
                                <p className="text-md mb-1"> ຂົ່ນສົ່ງໂດຍບໍລິສັດ:* </p>
                                <Input
                                    className='w-full'
                                    size='middle'
                                    value={delivery_by}
                                    onChange={(e) => setModelImport({ ...modelImport, delivery_by: e.target.value })}
                                    status={validation.deliveryby || (delivery_by === "" && btn) ? 'error' : null}
                                />
                            </div>
                            <div className='mt-2'>
                                <p className="text-md mb-1"> ໝາຍເລກລົດຂົນສົ່ງ: </p>
                                <Input className='w-full' size='middle' onChange={(e) => setModelImport({ ...modelImport, regis: e.target.value })} />
                            </div>
                            <div className='col-span-2 mt-2'>
                                <p className="text-md mb-1"> ບໍລິສັດ: </p>
                                <Input
                                    className='w-full'
                                    size='middle'
                                    value={company_name}
                                    onChange={(e) => {
                                        setModelImport({ ...modelImport, company_name: e.target.value })
                                        setValidation({ ...validation, companyname: e.target.value.length > 0 ? false : true })
                                    }}
                                    status={validation.companyname || (company_name === "" && btn) ? 'error' : null}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='bg-white border border-[#ddd] border-solid rounded-lg p-5'>
                        <h5 className='font-bold'>ເອກະສານ</h5>
                        <div className='mt-5 border-2 border-gray-300 border-dashed rounded-lg text-center'>
                            <div className="space-y-1 text-center py-4">
                                <Upload
                                    maxCount={3}
                                    {...props}
                                    showUploadList={true}
                                // listType="picture-card"
                                // defaultFileList={fileList.map((y, i) => ({
                                //     name: y,
                                //     status: 'done',
                                //     uid: `${i}`,
                                //     response: '{"status": "success"}',
                                //     url: y,
                                // }))}
                                >
                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                </Upload>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-3 bg-white border border-[#ddd] border-solid rounded-lg p-5'>
                        <div className='flex justify-between items-center'>
                            <h5 className='font-bold'>ລາຍການນຳເຂົ້າ</h5>
                            <Button className={`${classesbtn.base} w-[7.5rem]`} onClick={handleSubmitImport}>ບັນທຶກຂໍ້ມູນ</Button>
                        </div>
                        <div className='mt-2'>
                            <p className='mb-1'>ເລືອກລາຍການສິນຄ້າ</p>
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
                                {dataProduct.map((x) => (
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
                            <div className='mt-4'>
                                <table className={classestable.importtable}>
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th width={30} class="text-center">
                                                #
                                            </th>
                                            <th className=' w-[6.25rem]'>
                                                ລະຫັດສິນຄ້າ
                                            </th>
                                            <th width={300}>
                                                ຊື່ສິນຄ້າ
                                            </th>
                                            <th width={50}>
                                                ຫົວໜ່ວຍ
                                            </th>
                                            <th width={80}>
                                                ຈຳນວນ
                                            </th>
                                            <th width={110}>
                                                ລາຄານຳເຂົ້າ
                                            </th>
                                            <th width={110}>
                                                ສ່ວນຫລຸດ
                                            </th>
                                            <th width={110}>
                                                ອ.ມ.ພ
                                            </th>
                                            <th width={110}>
                                                ລວມ
                                            </th>
                                            <th width={60}>
                                                ຈັດການ
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            dataProduct?.map((row, idx) => {
                                                if (row.status === true) {
                                                    // console.log(row)
                                                    let i = 1
                                                    return (
                                                        <tr key={idx} class="bg-white border-b ">
                                                            <td class=" text-center ">
                                                                {i + 1}
                                                            </td>
                                                            <td class="text-xs">
                                                                {row.barcode}
                                                            </td>
                                                            <td>
                                                                {row.label}
                                                            </td>
                                                            <td>
                                                                <Select
                                                                    defaultValue="CASE/CRATE"
                                                                    style={{
                                                                        width: 120,
                                                                    }}
                                                                    onChange={(e) => handleChangeType(idx, e)}
                                                                    options={[
                                                                        {
                                                                            value: 'CASE/CRATE',
                                                                            label: 'Case/Crate',
                                                                        },
                                                                        {
                                                                            value: 'PLACE',
                                                                            label: 'Place',
                                                                        }
                                                                    ]}
                                                                />
                                                            </td>
                                                            <td class="">
                                                                <Input
                                                                    value={row.qty}
                                                                    autoComplete={false} size='middle'
                                                                    onChange={(e) => handleInputQty(idx, e.target.value, row.value)} />
                                                            </td>
                                                            <td class="">
                                                                <Input
                                                                    value={row.price}
                                                                    autoComplete={false} size='middle'
                                                                    onChange={(e) => handleInputPrice(idx, e.target.value, row.value)}
                                                                // onChange={(e) => console.log(e.target.value, row.value)}
                                                                />
                                                            </td>
                                                            <td class="">
                                                                <Input
                                                                    value={row.discount}
                                                                    autoComplete={false} size='middle'
                                                                    onChange={(e) => handleInputDis(idx, e.target.value, row.value)} />
                                                            </td>
                                                            <td class="">
                                                                <Input
                                                                    value={row.tax}
                                                                    autoComplete={false} size='middle'
                                                                    onChange={(e) => handleInputTax(idx, e.target.value, row.value)} />
                                                            </td>
                                                            <td class="">
                                                                <Input
                                                                    value={row.price * row.qty}
                                                                    autoComplete={false} size='middle'
                                                                />
                                                            </td>
                                                            <td class=" text-center">
                                                                <button
                                                                    onClick={() => hanldeRemoveProduct(row.value)}
                                                                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                                    ລືບ
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
                            <div className='col-span-3 gap-5 mt-10'>
                                <hr />
                                <div className='grid grid-cols-4 gap-10'>
                                    <div className='mt-4'>
                                        <h5 className='mb-1 font-bold'>ລວມມູນຄ່າ:</h5>
                                        <NumericFormat
                                            value={totalAmountPrice()}
                                            className='text-right font-medium'
                                            autoComplete={false} size='middle'
                                            customInput={Input} allowLeadingZeros thousandSeparator="," />
                                    </div>
                                    <div className='mt-4'>
                                        <h5 className='mb-1 font-bold'>ສ່ວນຫລຸດລາຄາ:</h5>
                                        <NumericFormat
                                            value={totalDiscountPrice()}
                                            className='text-right font-medium'
                                            autoComplete={false} size='middle'
                                            customInput={Input} allowLeadingZeros thousandSeparator="," />
                                    </div>
                                    <div className='mt-4'>
                                        <h5 className='mb-1 font-bold'>ລວມ ອ.ມ.ພ:</h5>
                                        <NumericFormat
                                            value={totalTax()}
                                            className='text-right font-medium'
                                            autoComplete={false} size='middle'
                                            customInput={Input} allowLeadingZeros thousandSeparator="," />
                                    </div>
                                    <div className='mt-4'>
                                        <h5 className='mb-1 font-bold'>ລວມມູນຄ່າທັງໝົດ:</h5>
                                        <NumericFormat
                                            value={totalPriceAll()}
                                            className='text-right text-[#2563eb] font-medium'
                                            autoComplete={false} size='middle' readOnly={true}
                                            customInput={Input} allowLeadingZeros thousandSeparator="," suffix={' ກີບ'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-3 bg-white border border-[#ddd] border-solid rounded-lg p-5'>
                        <p className='text-md mb-1'>ໝາຍເຫດອື່ນໆ</p>
                        <TextArea
                            onChange={(e) => setModelImport({ ...modelImport, note: e.target.value })}
                            rows={3} />
                    </div>
                </div>
            </div>

            <ModalComplete
                header='ນຳເຂົ້າສຳເລັດ'
                label={`ເລກໃບບິນທີ ${modelImport.bill_no} ນຳສິນຄ້າເຂົ້າສາງສຳເລັດ, ທ່ານຕ້ອງການກວດສອບລາຍການຂໍ້ມູນ ຫລື ບໍ?`}
                icon='complete'
                open={isOpen.complete}
                close={(x) => {
                    setIsOpen({ complete: x })
                }}
            />
        </>
    )
}

export default ImportCreate