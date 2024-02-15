import { Modal } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom';
import iccomplete from '../../../assets/icon/tick-mark.svg'
import '../../../components/style/ButtonStyle.css'

function ModalComplete({ open, close, label, icon, header }) {
    let history = useHistory()

    return (
        <Modal
            centered
            width={500}
            title={false}
            open={open}
            okButtonProps={{ className: 'base w-[6.25rem]' }}
            cancelButtonProps={{ className: 'w-[6.25rem]' }}
            onOk={() => history.push(`/home/import`)}
            onCancel={() => {
                close(!open)
            }}
            okText={<p >ຕົກລົງ</p>}
            cancelText={<p >ປິດ</p>}
            footer={(_, { OkBtn, CancelBtn }) => (
                <div className='flex justify-center'>
                    <CancelBtn />
                    <span className='mx-2'></span>
                    <OkBtn />
                </div>
            )}
        >
            <div className='mt-2 pb-6'>

                <div className='flex items-center'>
                    <img src={iccomplete} width={44} alt='' className='mr-2' />
                    <h4 className='font-bold text-lg'>{header}</h4>
                </div>
                <p className='text-left ml-[3.3rem]'>
                    {label}
                </p>

            </div>
        </Modal >
    )
}

export default ModalComplete