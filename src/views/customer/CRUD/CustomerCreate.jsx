import React, { useEffect, useState } from 'react';
import { Button, Input, InputNumber, Modal, Radio, Select, notification, Upload } from 'antd';
import classes from '../../../components/style/LayoutStyle.module.css'
import classesbtn from '../../../components/style/ButtonStyle.module.css'
import { myAPI } from '../../../middleware/api';
import { USER_KEY } from '../../../middleware/userKey';
import { X, ImagePlus } from 'lucide-react';
import { alertSuccess } from '../../../components/notification/Notification'

function CustomerCreate({ use, cbuse, result, cbresult }) {
    const { TextArea } = Input
    const userToken = JSON.parse(localStorage.getItem(USER_KEY))
    const [modelCustomer, setModelCustomer] = useState({
        name: '',
        type: "GENERAL",
        address: '',
        tel: '',
    })

    const handleSelectStatus = (e) => {
        setModelCustomer({ ...modelCustomer, type: e })
    }

    const hanldeCreateCustomer = () => {
        let sendData = {
            name: modelCustomer.name,
            type: modelCustomer.type,
            address: modelCustomer.address,
            tel: modelCustomer.tel,
        }
        myAPI.post('customer', sendData, {
            headers: {
                'Authorization': `Bearer ${userToken?.token}`
            }
        }).then((res) => {
            if (res?.status === 200) {
                alertSuccess({ title: 'ສຳເລັດ', label: 'ບັນທຶກຂໍ້ມູນລູກຄ້າໃໝ່ເຂົ້າລະບົບສຳເລັດແລ້ວ.' })
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
                <Button size='middle' className={`${classesbtn.base} w-[135px]`} onClick={hanldeCreateCustomer}>ບັນທຶກຂໍ້ມູນ</Button>
            </div>
            <div className={`${classes.silde}`}>
                <div className='text-center bg-blue-950 text-white py-3 rounded-tl-md rounded-tr-md'>
                    <p className='font-bold text-base'>ເພີ່ມຂໍ້ມູນລູກຄ້າ</p>
                </div>
                <div className={`${classes.sildecontect} grid grid-cols-1 gap-5`}>
                    <div>
                        <p className="text-md mb-1.5 font-medium">
                            ຊື່ລູກຄ້າ
                        </p>
                        <Input size='middle'
                            value={modelCustomer?.name}
                            onChange={(e) => setModelCustomer({ ...modelCustomer, name: e.target.value })} />
                    </div>
                    <div>
                        <p className="text-md mb-1.5 font-medium">
                            ປະເພດລູກຄ້າ
                        </p>
                        <Select
                            className='w-full'
                            placeholder='ເລືອກ'
                            onChange={handleSelectStatus}
                            defaultValue={modelCustomer.type}
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
                            value={modelCustomer?.address}
                            onChange={(e) => setModelCustomer({ ...modelCustomer, address: e.target.value })} />
                    </div>
                    <div>
                        <p className="text-md mb-1.5 font-medium">
                            ເບີໂທ
                        </p>
                        <Input size='middle'
                            value={modelCustomer?.tel}
                            onChange={(e) => setModelCustomer({ ...modelCustomer, tel: e.target.value })} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerCreate