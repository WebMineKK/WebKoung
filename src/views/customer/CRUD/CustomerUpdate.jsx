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

function CustomerUpdate({ dataValue, use, cbuse, result, cbresult }) {
    const { TextArea } = Input
    const userToken = JSON.parse(localStorage.getItem(USER_KEY))
    // console.log(dataValue)
    const [dataOld, setDataOld] = useState(dataValue)
    const { cus_id, cus_name, cus_type, cus_address, cus_tel } = dataOld

    useEffect(() => {
        setDataOld(dataValue)
    }, [dataValue])

    const [typeStatus, setTypeStatus] = useState(cus_type);
    const handleChangeStatus = (e) => {
        setTypeStatus(e)
    }

    useEffect(() => {
        setTypeStatus(cus_type)
    }, [cus_type])

    const handleUpdateCustomer = () => {
        let sendData = {
            id: cus_id,
            name: cus_name,
            type: typeStatus,
            address: cus_address,
            tel: cus_tel,
        }
        // console.log(sendData);
        myAPI.put('customer', sendData, {
            headers: {
                'Authorization': `Bearer ${userToken?.token}`
            }
        }).then((res) => {
            if (res?.status === 200) {
                alertSuccess({ title: 'ແກ້ໄຂສຳເລັດ', label: 'ແກ້ໄຂຂໍ້ມູນໝວດໝູ່ໃໝ່ໃນລະບົບສຳເລັດແລ້ວ.' })
                cbresult(!result)
            } else {
                console.log('Failed')
            }
        }).catch(e => console.error(e))
    }
    return (
        <>
            <div>
                <div className='mt-8 flex justify-end mr-4'>
                    <Button size='middle' className={`bg-slate-200 mr-4`} onClick={() => cbuse(!use)}><X /></Button>
                    <Button size='middle' className={`${classesbtn.base} w-[135px]`} onClick={handleUpdateCustomer}>ບັນທຶກຂໍ້ມູນ</Button>
                </div>
                <div className={`${classes.silde}`}>
                    <div className='text-center bg-blue-950 text-white py-3 rounded-tl-md rounded-tr-md'>
                        <p className='font-bold text-base'>ແກ້ໄຂຂໍ້ມູນລູກຄ້າ</p>
                    </div>
                    <div className={`${classes.sildecontect} grid grid-cols-1 gap-5`}>
                        <div>
                            <p className="text-md mb-1.5 font-medium">
                                ຊື່ລູກຄ້າ
                            </p>
                            <Input size='middle'
                                value={cus_name}
                                onChange={(e) => setDataOld({ ...dataOld, cus_name: e.target.value })} />
                        </div>
                        <div>
                            <p className="text-md mb-1.5 font-medium">
                                ປະເພດລູກຄ້າ
                            </p>
                            <Select
                                className='w-full'
                                placeholder='ເລືອກ'
                                onChange={handleChangeStatus}
                                value={typeStatus}
                                options={[
                                    {
                                        value: "GENERAL",
                                        label: 'ທົ່ວໄປ',
                                    },
                                    {
                                        value: "MEMBER",
                                        label: 'ລູກຄ້າປະຈຳ (ຮ້ານຄ້າ)',
                                    },
                                    {
                                        value: "VIP",
                                        label: 'VIP',
                                    },
                                ]}
                            />
                        </div>
                        <div>
                            <p className="text-md mb-1.5 font-medium">
                                ທີ່ຢູ່
                            </p>
                            <TextArea size='middle'
                                rows={2}
                                value={cus_address}
                                onChange={(e) => setDataOld({ ...dataOld, cus_address: e.target.value })} />
                        </div>
                        <div>
                            <p className="text-md mb-1.5 font-medium">
                                ເບີໂທ
                            </p>
                            <Input size='middle'
                                value={cus_tel}
                                onChange={(e) => setDataOld({ ...dataOld, cus_tel: e.target.value })} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomerUpdate