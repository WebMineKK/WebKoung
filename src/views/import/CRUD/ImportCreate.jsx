import React, { useEffect, useState } from 'react';
import { Button, Input, InputNumber, Radio, Select, Space, Table, Tag, Upload, theme } from 'antd';
import classes from '../../../components/style/LayoutStyle.module.css'
import classesbtn from '../../../components/style/ButtonStyle.module.css'
import { myAPI } from '../../../middleware/api';
import { USER_KEY } from '../../../middleware/userKey';
import { useHistory } from 'react-router-dom';
import { loadDataProduct } from '../../product/LoadData';
import classestable from '../../../components/style/Table.module.css'
import { NumericFormat } from 'react-number-format';
import ImportModel from '../models/ImportModel';
import { UploadOutlined } from '@ant-design/icons';
import ModalComplete from './ModalComplete';

function ImportCreate() {
    const { TextArea } = Input;
    let history = useHistory()

    const userAuth = JSON.parse(localStorage.getItem(USER_KEY))
    const userToken = userAuth.token

    const [modelImport, setModelImport] = useState(new ImportModel())
    const [isOpen, setIsOpen] = useState({ complete: false })

    const [loading, setLoading] = useState(false)
    const [dataProduct, setDataProduct] = useState([])
    const [totalAmount, setTotalAmount] = useState(0)
    const [discountAll, setDiscountAll] = useState(0)
    const [totalAll, setTotalAll] = useState(0)

    const [fileList, setFileList] = useState([])
    const [giveImage, setGiveImage] = useState()
    const [importData, setimportData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await loadDataProduct(userToken)
                let update = data?.map((x) => ({
                    value: x.pro_id,
                    label: x.pro_name + ' ' + x.pro_barcode,
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
                setLoading(false)
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
                row.my_qty = 0
                row.my_price = 0
                row.my_discount = 0
                row.my_total = 0
            }
            return row
        })

        setDataProduct(update)
    }

    const [inputTax, setInputTax] = useState(0)

    const hanldeRemoveProduct = (val) => {
        let update = dataProduct.map((row) => {
            if (row.value === val) {
                row.status = false
                row.total = 0
                row.qty = 0
                row.price = 0
                row.discount = 0
            }
            return row
        })

        setDataProduct(update)
    }


    const handleGetAllInput = ({ val, type, row }) => {
        let update = dataProduct.map(r => {
            if (r !== undefined) {
                if (r.value === row.value) {
                    if (type === 'qty') {
                        r.my_qty = parseInt(val)
                    }
                    if (type === 'price') {
                        r.my_price = parseInt(val)
                    }
                    if (type === 'discount') {
                        r.my_discount = parseInt(val)
                    }
                    return r
                }
            }
        })
        setDataProduct(update)
        // console.log(update);
        // let oldData = dataProduct
        // let update = oldData.filter(r => r.value === row.value)
        // console.log(update);
        // if (update.length > 0) {
        //     let updated
        //     if (type === 'qty') {
        //         updated = oldData.map((r) => {
        //             if (r.value === row.value) {
        //                 r.my_qty = parseInt(val)
        //             }
        //         })
        //     }
        //     else if (type === 'price') {
        //         updated = oldData.map((r) => {
        //             if (r.value === row.value) {
        //                 r.my_price = parseInt(val)
        //             }
        //         })
        //     }
        //     else if (type === 'discount') {
        //         updated = oldData.map((r) => {
        //             if (r.value === row.value) {
        //                 r.my_discount = parseInt(val)
        //             }
        //         })
        //     }
        //     // if (update[0].my_qty !== undefined && update[0].my_price !== undefined) {
        //     //     update = oldData.map((r) => {
        //     //         if (r.value === row.value) {
        //     //             r.my_total = parseInt(r.my_qty) * parseInt(r.my_price)
        //     //         }
        //     //     })
        //     // }
        //     // setDataProduct([...dataProduct, updated])
        //     console.log(updated);
        // }




        // else {
        //     console.log('br mi');
        //     if (type === 'qty') {
        //         row.my_qty = parseInt(val)
        //     } else if (type === 'price') {
        //         row.my_price = parseInt(val)
        //     } else if (type === 'discount') {
        //         row.my_discount = parseInt(val)
        //     }
        //     let arr = importData
        //     arr.push(row)
        //     setimportData(arr)
        //     console.log(arr);
        // }
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

    function totalPriceAll() {
        let summary = totalAmountPrice() - totalDiscountPrice()
        return summary
    }


    const handleInputTax = (e) => {
        setInputTax(e.target.value)
    }

    function totalWithTax() {

        if (inputTax !== 0) {
            let sum = totalPriceAll() + parseInt(inputTax)
            // console.log(sum);
            return sum
        } else {
            // console.log(totalPriceAll());
            return totalPriceAll()
        }
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
            const response = myAPI.post('upload-image', formData)
                .then(response => {
                    let images = giveImage ? giveImage + "," + response?.data?.image_url : response?.data?.image_url
                    // console.log(images);
                    setGiveImage(images)
                })
                .catch(error => {
                    // Handle errors if any
                    console.error(error);
                });

            setFileList([...fileList, file]);
            return false;
        },
        fileList,
    }

    const handleSubmitImport = async () => {
        let detailed = dataProduct.filter((x) => x.status === true).map((x) => {
            return {
                pro_id: x.value,
                pro_unit: x.qty,
                pro_price: x.price,
                total: x.total
            }
        })

        let sendData = {
            u_id: userAuth.detail.u_id,
            image: giveImage,
            regis: modelImport.regis,
            total_price: totalWithTax(),
            company_name: modelImport.company_name,
            bill_no: modelImport.bill_no,
            note: modelImport.note,
            import_detail: detailed
        }
        // console.log(sendData);

        myAPI.post('create_import', sendData, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        }).then((res) => {
            if (res?.status === 200) {
                setIsOpen({ complete: true })
            } else {
                console.log('Failed')
            }
        }).catch(e => console.error(e))

    }

    return (
        <>
            <h5 className={`${classes.header}`}>ສະແດງລາຍການນຳເຂົ້າ</h5>
            <div className={`mx-[1.5rem 1rem] p-[1rem]`}>
                <div className='grid grid-cols-3 gap-5'>
                    <div className='col-span-2 bg-white border border-[#ddd] border-solid rounded-lg p-5'>
                        <h5 className='font-bold'>ຂໍ້ມູນບໍລິສັດ</h5>
                        {/* <div className='mt-2'>
                            <p className="text-md mb-1"> ວັນທີ: </p>
                            <Input className='w-[250px]' autoComplete={false} size='middle' />
                        </div> */}
                        <div className='mt-2'>
                            <p className="text-md mb-1"> ເລກທີໃບບີນ: </p>
                            <Input className='w-[15.625rem]' autoComplete={false} size='middle' onChange={(e) => setModelImport({ ...modelImport, bill_no: e.target.value })} />
                        </div>
                        <div className='mt-2'>
                            <p className="text-md mb-1"> ໝາຍເລກລົດຂົນສົ່ງ: </p>
                            <Input className='w-[15.625rem]' autoComplete={false} size='middle' onChange={(e) => setModelImport({ ...modelImport, regis: e.target.value })} />
                        </div>
                        <div className='mt-2'>
                            <p className="text-md mb-1"> ບໍລິສັດຂົ່ນສົ່ງ: </p>
                            <Input className='w-[25rem]' autoComplete={false} size='middle' onChange={(e) => setModelImport({ ...modelImport, company_name: e.target.value })} />
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
                                onChange={(value, option) => handleSelectProduct(value, option?.label)}
                                options={dataProduct}

                            />
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
                                            <th width={350}>
                                                ຊື່ສິນຄ້າ
                                            </th>
                                            <th width={50}>
                                                ຫົວໜ່ວຍ
                                            </th>
                                            <th width={80}>
                                                ຈຳນວນ
                                            </th>
                                            <th width={80}>
                                                ລາຄານຳເຂົ້າ
                                            </th>
                                            <th width={120}>
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
                                            dataProduct?.map((row, idx) => {
                                                if (row.status === true) {
                                                    // console.log(row)
                                                    let i = 1
                                                    return (
                                                        <tr key={idx} class="bg-white border-b ">
                                                            <td class=" text-center ">
                                                                {i++}
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
                                                                    // onChange={handleChange}
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
                                                                <Input autoComplete={false} size='middle'
                                                                    onChange={(e) => handleInputQty(idx, e.target.value, row.value)} />
                                                            </td>
                                                            <td class="">
                                                                <Input
                                                                    autoComplete={false} size='middle'
                                                                    onChange={(e) => handleInputPrice(idx, e.target.value, row.value)}
                                                                // onChange={(e) => console.log(e.target.value, row.value)}
                                                                />
                                                            </td>
                                                            <td class="">
                                                                <Input autoComplete={false} size='middle'
                                                                    onChange={(e) => handleInputDis(idx, e.target.value, row.value)} />
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
                                <div className='grid grid-cols-4 gap-5'>
                                    <div className='mt-4 flex justify-end items-center'>
                                        <h5 className=''>ລວມມູນຄ່າ:</h5>
                                        <div className='ml-4'>
                                            <NumericFormat
                                                value={totalAmountPrice()}
                                                className='text-right font-medium'
                                                autoComplete={false} size='middle'
                                                customInput={Input} allowLeadingZeros thousandSeparator="," />
                                        </div>
                                    </div>
                                    <div className='mt-2 flex justify-end items-center'>
                                        <h5 className=''>ສ່ວນຫລຸດລາຄາ:</h5>
                                        <div className='ml-4'>
                                            <NumericFormat
                                                value={totalDiscountPrice()}
                                                className='text-right font-medium'
                                                autoComplete={false} size='middle'
                                                customInput={Input} allowLeadingZeros thousandSeparator="," />
                                        </div>
                                    </div>
                                    <div className='mt-2 flex justify-end items-center'>
                                        <h5 className=''>ລວມ ອ.ມ.ພ:</h5>
                                        <div className='ml-4'>
                                            <Input
                                                onChange={(e) => handleInputTax(e)}
                                                className='text-right font-medium'
                                                autoComplete={false} size='middle' />
                                        </div>
                                    </div>
                                    <div className='mt-2 flex justify-end items-center'>
                                        <h5 className='text-base font-bold'>ລວມມູນຄ່າທັງໝົດ:</h5>
                                        <div className='ml-4'>
                                            <NumericFormat
                                                value={totalWithTax()}
                                                className='text-right text-[#2563eb] font-medium'
                                                autoComplete={false} size='middle' readOnly={true}
                                                customInput={Input} allowLeadingZeros thousandSeparator="," suffix={' ກີບ'} />
                                        </div>
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