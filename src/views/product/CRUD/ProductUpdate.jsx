import React, { useEffect, useState } from 'react';
import { Button, Input, InputNumber, Modal, Radio, Select, notification, Upload } from 'antd';
import classes from '../../../components/style/LayoutStyle.module.css'
import classesbtn from '../../../components/style/ButtonStyle.module.css'
import { myAPI } from '../../../middleware/api.jsx';
import { USER_KEY } from '../../../middleware/userKey.jsx';
import { useHistory } from 'react-router-dom';
import { X, ImagePlus } from 'lucide-react';
import { UploadOutlined } from '@ant-design/icons';
import { alertSuccess } from '../../../components/notification/Notification.jsx'
import { loadDataCategory } from '../../../middleware/CategoryAPI.jsx'
import { putUpdateProduct } from '../../../middleware/ProductAPI.jsx';


function ProductUpdate({ dataValue, use, cbuse, result, cbresult }) {
    const [listDataCategory, setListDataCategory] = useState([])

    const [dataOld, setDataOld] = useState(dataValue)
    const { pro_id, pro_barcode, pro_name, pro_price, pro_unit, pro_img, pro_status, pro_type, cate_id, price_sell } = dataOld

    useEffect(() => {
        setDataOld(dataValue)
    }, [dataValue]);

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
            } catch (error) {
                console.error(error)
            }
        };

        fetchData()
    }, []);

    const [imageProduct, setImageProduct] = useState(pro_img);

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

    const [proStatus, setProStatus] = useState(pro_status);
    const handleChangeStatus = (e) => {
        setProStatus(e)
    }

    const [catetoryType, setCatetoryType] = useState(cate_id);
    const handleChangeCatetory = (e) => {
        setCatetoryType(e)
    }

    const [proType, setProType] = useState(pro_type);
    const handleChangeProType = (e) => {
        setProType(e)
    }

    useEffect(() => {
        setProStatus(pro_status)
        setCatetoryType(cate_id)
        setImageProduct(pro_img)
        setProType(pro_type)
    }, [pro_status, cate_id, pro_img, pro_type])

    const handleUpdateProduct = async () => {
        let sendData = {
            id: pro_id,
            name: pro_name,
            img: imageProduct === '' ? pro_img : imageProduct,
            price: pro_price,
            unit: pro_unit,
            cate_id: catetoryType[0],
            barcode: pro_barcode,
            status: proStatus,
            pro_type: proType,
            price_sell: price_sell
        }

        try {
            const { data } = await putUpdateProduct({ senddata: sendData })
            console.log(data)
            setTimeout(() => {
                alertSuccess({ title: 'ແກ້ໄຂສຳເລັດ', label: 'ແກ້ໄຂຂໍ້ມູນສິນຄ້າໃໝ່ໃນລະບົບສຳເລັດແລ້ວ.' })
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
                <Button size='middle' className={`${classesbtn.base} w-[135px]`} onClick={handleUpdateProduct}>ບັນທຶກຂໍ້ມູນ</Button>
            </div>
            <div className={`${classes.silde}`}>
                <div className='text-center bg-blue-950 text-white py-3 rounded-tl-md rounded-tr-md'>
                    <p className='font-bold text-base'>ແກ້ໄຂຂໍ້ມູນສິນຄ້າໃໝ່</p>
                </div>
                <div className={`${classes.sildecontect} grid grid-cols-1 gap-5`}>
                    <div>
                        <p className="text-md mb-1.5 font-medium">
                            ລະຫັດບາໂຄ໊ດ
                        </p>
                        <Input size='middle'
                            value={pro_barcode}
                            onChange={(e) => setDataOld({ ...dataOld, pro_barcode: e.target.value })} />
                    </div>
                    <div>
                        <p className="text-md mb-1.5 font-medium">
                            ຊື່ສິນຄ້າ
                        </p>
                        <Input autoComplete={false} size='middle'
                            value={pro_name}
                            onChange={(e) => setDataOld({ ...dataOld, pro_name: e.target.value })} />
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
                                    <Button>ເລືອກຮູບໃໝ່</Button>
                                </Upload>
                            </div>
                            <img src={imageProduct} className='rounded-md' />
                        </div>
                    </div>
                    <div>
                        <p className="text-md mb-1.5 font-medium">
                            ລາຄາຂາຍ
                        </p>
                        <InputNumber
                            value={price_sell}
                            min={1} defaultValue={0} autoComplete={false} size='middle' className='w-full'
                            onChange={(e) => setDataOld({ ...dataOld, price_sell: e })} />
                    </div>
                    <div>
                        <p className="text-md mb-1.5 font-medium">
                            ລາຄາຂາຍ
                        </p>
                        <InputNumber
                            value={pro_price}
                            min={1} defaultValue={0} autoComplete={false} size='middle' className='w-full'
                            onChange={(e) => setDataOld({ ...dataOld, pro_price: e })} />
                    </div>
                    <div>
                        <p className="text-md mb-1.5 font-medium">
                            ຈຳນວນ
                        </p>
                        <InputNumber
                            value={pro_unit}
                            min={1} defaultValue={0} autoComplete={false} size='middle' className='w-full'
                            onChange={(e) => setDataOld({ ...dataOld, pro_unit: e })} />
                    </div>
                    <div>
                        <p className="text-md mb-1.5 font-medium">
                            ສະຖານະ
                        </p>
                        <Select
                            value={proStatus}
                            className='w-full'
                            onChange={handleChangeStatus}
                            options={[
                                { value: 'ACTIVE', label: 'ພ້ອມຈຳໜ່າຍ' },
                                { value: 'DEACTIVE', label: 'ຢຸດຈຳໜ່າຍ' },
                            ]}
                        />
                    </div>
                    <div>
                        <p className="text-md mb-1.5 font-medium">
                            ຫົວໜ່ວຍ
                        </p>
                        <Select
                            className='w-full'
                            onChange={handleChangeProType}
                            value={proType}
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
                            value={catetoryType}
                            className='w-full'
                            placeholder='ເລືອກ'
                            onChange={handleChangeCatetory}
                            options={listDataCategory}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductUpdate