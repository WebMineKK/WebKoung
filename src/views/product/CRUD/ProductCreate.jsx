import React, { useEffect, useState } from 'react';
import { Button, Input, InputNumber, Modal, Radio, Select, notification, Upload } from 'antd';
import classes from '../../../components/style/LayoutStyle.module.css'
import classesbtn from '../../../components/style/ButtonStyle.module.css'
import { myAPI } from '../../../middleware/api.jsx';
import { USER_KEY } from '../../../middleware/userKey.jsx';
import { X, ImagePlus } from 'lucide-react';
import { postCreateProduct } from '../../../middleware/ProductAPI.jsx'
import ProductModel from '../model/ProductModel.jsx';
import { alertSuccess } from '../../../components/notification/Notification.jsx'
import { loadDataCategory } from '../../../middleware/CategoryAPI.jsx';


function ProductCreate({ use, cbuse, result, cbresult }) {
    const [modelProduct, setModelProduct] = useState(new ProductModel())
    const { name, price, barcode, unit, price_sell } = modelProduct

    const [listDataCategory, setListDataCategory] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await loadDataCategory();
                let update = data?.data?.map((x) => ({
                    value: x.cate_id,
                    label: x.cate_name
                }))
                // console.log(update);
                setListDataCategory(update)
                setLoading(false)
            } catch (error) {
                console.error(error)
            }
        };

        fetchData()
    }, []);

    const [imageProduct, setImageProduct] = useState('');

    const handleUploadImage = async (info) => {
        try {
            let file = info.file;
            const formData = new FormData();
            formData.append('image', file);
            const response = myAPI.post('upload-image', formData)
                .then(response => {
                    let images = response?.data?.image_url
                    setImageProduct(images)
                })
                .catch(error => {
                    console.error(error);
                });
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }

    const [selectDefult, setSelectDefult] = useState(1);

    const handleSelectCatetory = (val) => {
        setSelectDefult(val)
    }

    const [selectProtype, setSelectProtype] = useState('GLASS');
    const handleSelectProtype = (e) => {
        setSelectProtype(e)
    }

    const handleCreateProduct = async () => {
        let sendData = {
            name: name,
            img: imageProduct,
            price: price,
            unit: unit,
            cate_id: selectDefult,
            barcode: barcode,
            pro_type: selectProtype,
            price_sell: price_sell
        }

        try {
            const { data } = await postCreateProduct({ senddata: sendData })
            console.log(data)
            setTimeout(() => {
                alertSuccess({ title: 'ສຳເລັດ', label: 'ບັນທຶກຂໍ້ມູນສິນຄ້າໃໝ່ເຂົ້າລະບົບສຳເລັດແລ້ວ.' })
                setModelProduct({ price: 0, unit: 0, price_sell: 0 })
                cbuse(!use)
                cbresult(!result)
            }, 200);
        } catch (error) {
            throw new Error('Failed to post API request:', error);
        }
    }


    return (
        <div>
            <div className='mt-8 flex justify-end mr-4'>
                <Button size='middle' className={`bg-slate-200 mr-4`} onClick={() => cbuse(!use)}><X /></Button>
                <Button size='middle' className={`${classesbtn.base} w-[135px]`} onClick={handleCreateProduct}>ບັນທຶກຂໍ້ມູນ</Button>
            </div>
            <div className={`${classes.silde}`}>
                <div className='text-center bg-blue-950 text-white py-3 rounded-tl-md rounded-tr-md'>
                    <p className='font-bold text-base'>ເພີ່ມຂໍ້ມູນສິນຄ້າ</p>
                </div>
                <div className={`${classes.sildecontect} grid grid-cols-1 gap-5`}>
                    <div>
                        <p className="text-md mb-1.5 font-medium">
                            ລະຫັດບາໂຄ໊ດ
                        </p>
                        <Input size='middle'
                            value={barcode}
                            onChange={(e) => setModelProduct({ ...modelProduct, barcode: e.target.value })} />
                    </div>
                    <div>
                        <p className="text-md mb-1.5 font-medium">
                            ຊື່ສິນຄ້າ
                        </p>
                        <Input autoComplete={false} size='middle'
                            value={name}
                            onChange={(e) => setModelProduct({ ...modelProduct, name: e.target.value })} />
                    </div>
                    <div>
                        <p className="text-md mb-1.5 font-medium">
                            ຮູບສິນຄ້າ
                        </p>
                        <div className='border border-solid rounded-md px-3 py-3'>
                            <div className='flex justify-center mb-3'>
                                <span className='flex items-center mr-3 text-[#777]'><ImagePlus size={18} className='mr-1' />ເລືອກ 1 ຮູບປະກອບ</span>
                                <Upload
                                    onChange={handleUploadImage}
                                    beforeUpload={() => false}
                                    showUploadList={false}
                                >
                                    <Button>{imageProduct.length > 1 ? 'ເລືອກຮູບໃໝ່' : 'ເລືອກຮູບ'}</Button>
                                </Upload>
                            </div>
                            {
                                loading ? '' : <img src={imageProduct} className='rounded-md' />
                            }
                        </div>
                    </div>
                    <div>
                        <p className="text-md mb-1.5 font-medium">
                            ລາຄາຂາຍ
                        </p>
                        <InputNumber
                            value={price_sell}
                            min={1} defaultValue={0} autoComplete={false} size='middle' className='w-full'
                            onChange={(e) => setModelProduct({ ...modelProduct, price_sell: e })} />
                    </div>
                    <div>
                        <p className="text-md mb-1.5 font-medium">
                            ລາຄານຳເຂົ້າ
                        </p>
                        <InputNumber
                            value={price}
                            min={1} defaultValue={0} autoComplete={false} size='middle' className='w-full'
                            onChange={(e) => setModelProduct({ ...modelProduct, price: e })} />
                    </div>
                    <div>
                        <p className="text-md mb-1.5 font-medium">
                            ຈຳນວນ
                        </p>
                        <InputNumber
                            value={unit}
                            min={1} defaultValue={0} autoComplete={false} size='middle' className='w-full'
                            onChange={(e) => setModelProduct({ ...modelProduct, unit: e })} />
                    </div>
                    <div>
                        <p className="text-md mb-1.5 font-medium">
                            ຫົວໜ່ວຍ
                        </p>
                        <Select
                            className='w-full'
                            // placeholder='ເລືອກ'
                            onChange={handleSelectProtype}
                            defaultValue={selectProtype}
                            options={[
                                {
                                    value: 'GLASS',
                                    label: 'ແກ້ວ',
                                },
                                {
                                    value: 'CAN',
                                    label: 'ກະປ໋ອງ',
                                },
                                {
                                    value: 'BOTH',
                                    label: 'ກະຕຸກ',
                                },
                            ]}
                        />
                    </div>
                    <div>
                        <p className="text-md mb-1.5 font-medium">
                            ໝວດໝູ່
                        </p>

                        <Select
                            defaultValue={selectDefult}
                            className='w-full'
                            placeholder='ເລືອກ'
                            onChange={handleSelectCatetory}
                            options={listDataCategory}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCreate