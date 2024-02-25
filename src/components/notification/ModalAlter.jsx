import { Button, Modal } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom';
import iccomplete from '../../assets/icon/tick-mark.svg'
import '../style/ButtonStyle.css'

function ModalComplete({ open, close, label, header, labelok, labelnew, labelcheck, labelcancel }) {
    let history = useHistory()

    return (
        <Modal
            centered
            width={500}
            title={false}
            open={open}
            okButtonProps={{ className: 'base w-fit' }}
            cancelButtonProps={{ className: 'transaction w-fit' }}
            onOk={() => history.push(`/home/preorder/receipt`)}
            onCancel={() => {
                close(!open)
                window.location.reload()
            }}
            okText={<p >{labelok}</p>}
            cancelText={<p >{labelcancel}</p>}
            footer={(_, { OkBtn, CancelBtn }) => (
                <div className='flex justify-center'>
                    <Button className=' mr-2' onClick={() => history.push('/home/preorder')}>{labelnew}</Button>
                    <CancelBtn />
                    <Button className='check mx-2' onClick={() => history.push('/home/preorder/check')}>{labelcheck}</Button>
                    <OkBtn />
                </div>
            )}
        >
            <div className='mt-2 pb-6'>

                <div className='flex items-center '>
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