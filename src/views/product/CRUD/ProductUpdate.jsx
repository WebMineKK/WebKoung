import React, { useEffect, useState } from 'react';
import { Button, Input, InputNumber, Modal, Radio, Select, notification, Upload } from 'antd';
import classes from '../../../components/style/LayoutStyle.module.css'
import classesbtn from '../../../components/style/ButtonStyle.module.css'
import { myAPI } from '../../../middleware/api';
import { USER_KEY } from '../../../middleware/userKey';
import { useHistory } from 'react-router-dom';
import { X, ImagePlus } from 'lucide-react';
import { UploadOutlined } from '@ant-design/icons';
import { alertSuccess } from '../../../components/notification/Notification'
import { loadDataCategory } from '../../../middleware/LoadData'


function ProductUpdate({ dataValue, use, cbuse, result, cbresult }) {
    const userToken = JSON.parse(localStorage.getItem(USER_KEY))

    const [listDataCategory, setListDataCategory] = useState([])

    const [dataOld, setDataOld] = useState(dataValue)
    const { pro_barcode, pro_name, pro_price, pro_unit, pro_img, pro_status, cate_id } = dataOld

    useEffect(() => {
        setDataOld(dataValue)
    }, [dataValue]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await loadDataCategory(userToken?.token);
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

    useEffect(() => {
        setProStatus(pro_status)
        setCatetoryType(cate_id)
        setImageProduct(pro_img)
    }, [pro_status, cate_id, pro_img])

    const handleUpdateProduct = () => {
        let sendData = {
            id: pro_id,
            name: pro_name,
            img: imageProduct === '' ? pro_img : imageProduct,
            price: pro_price,
            unit: pro_unit,
            cate_id: catetoryType[0],
            barcode: pro_barcode,
            status: proStatus
        }
        // console.log(sendData);
        myAPI.put('product', sendData, {
            headers: {
                'Authorization': `Bearer ${userToken?.token}`
            }
        }).then((res) => {
            if (res?.status === 200) {
                alertSuccess({ title: 'ແກ້ໄຂສຳເລັດ', label: 'ແກ້ໄຂຂໍ້ມູນສິນຄ້າໃໝ່ໃນລະບົບສຳເລັດແລ້ວ.' })
                cbresult(!result)
            } else {
                console.log('Failed')
            }
        }).catch(e => console.error(e))
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
                            placeholder='ເລືອກ'
                            onChange
                            defaultValue={'GLASS'}
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