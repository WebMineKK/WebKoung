import React, { useEffect, useState } from 'react';
import { InputNumber } from 'antd';
import classes from '../../../../components/style/LayoutStyle.module.css'
import classesInput from './CardSummaryPrice.module.css'


function CardSummaryPrice({ totalAmountPrice, totalDiscountPrice, totalPrice, cbTax, cbTotalMoneyAll }) {

    const [inputTax, setInputTax] = useState(0)
    const handleInputTax = (e) => {
        setInputTax(e)
    }

    function calculateTax() {
        if (inputTax !== 0) {
            let withtax = (totalPrice * parseInt(inputTax)) / 100
            return withtax
        } else {
            return 0
        }
    }

    function totalPriceAll() {
        let sum = totalPrice + calculateTax()
        return sum
    }

    useEffect(() => {
        let tax = 0
        if (inputTax >= 1) {
            tax++
        } else {
            tax = 0
        }

        function CallbackValue() {
            if (tax >= 1) {
                return {
                    'Tax': cbTax(calculateTax()),
                    'Total': cbTotalMoneyAll(totalPriceAll())
                }
            }
            if (tax === 0) {
                return {
                    'Tax': 0,
                    'Total': cbTotalMoneyAll(totalPriceAll())
                }
            }
        }
        CallbackValue()
        // console.log(CallbackValue());
    }, [totalAmountPrice, totalDiscountPrice, totalPrice, inputTax])

    return (
        <>
            <div className={`${classes.contentnocolor}`}>
                <div className='grid grid-cols-3 gap-5 '>
                    <div className='flex'>
                        <p className='border border-[#fff] text-[#fff] w-full px-1 py-1.5 text-base'>ຍອດລວມ (ບໍ່ລວມຫັກ)</p>
                        <span className='border border-[#fff] w-full px-1 py-1.5 text-right'>
                            <InputNumber
                                variant='borderless'
                                value={totalAmountPrice}
                                autoComplete={false} size='small' className={classesInput.myInputNum}
                                readOnly={true}
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
                        </span>
                    </div>
                    <div className='flex'>
                        <p className='border border-[#fff] text-[#fff] w-full px-1 py-1.5 text-base'>ເປັນຈຳນວນເງິນ</p>
                        <span className='border border-[#fff] w-full px-1 py-1.5 text-right'>
                            <InputNumber
                                variant='borderless'
                                value={totalPrice}
                                autoComplete={false} size='small' className={classesInput.myInputNum}
                                readOnly={true}
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
                        </span>
                    </div>
                    <div className='flex'>
                        <p className='border border-[#fff] text-[#fff] w-full px-1 py-1.5 text-base'>ລວມມູນຄ່າ (ທັງໝົດ)</p>
                        <span className='border border-[#fff] w-full px-1 py-1.5 text-right'>
                            <InputNumber
                                variant='borderless'
                                value={totalPriceAll()}
                                autoComplete={false} size='small' className={`${classesInput.myInputNumTotal} w-full`}
                                readOnly={true}
                                formatter={(value) => `K ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
                        </span>
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-5'>
                    <div className='flex'>
                        <p className='border border-[#fff] text-[#fff] w-full px-1 py-1.5 text-base'>ສ່ວນຫລຸດ</p>
                        <span className='border border-[#fff] w-full px-1 py-1.5 text-right '>
                            <InputNumber
                                variant='borderless'
                                value={totalDiscountPrice}
                                autoComplete={false} size='small' className={classesInput.myInputNum}
                                readOnly={true}
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
                        </span>
                    </div>
                    <div className='flex'>
                        <p className='border border-[#fff] text-[#fff] w-full px-1 py-1.5 text-base flex justify-between'>ພາສີ (%)
                            <span className=''>
                                <InputNumber
                                    min={0}
                                    value={inputTax}
                                    autoComplete={false} size='small' className='py-0.5 text-right'
                                    onChange={(e) => handleInputTax(e)} /></span>
                        </p>
                        <span className='border border-[#fff] w-full px-1 py-1.5 text-right '>
                            <InputNumber
                                variant='borderless'
                                value={calculateTax()}
                                autoComplete={false} size='small' className={classesInput.myInputNum}
                                readOnly={true}
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
                        </span>
                    </div>
                    <div></div>
                </div>
            </div>
        </>
    )
}

export default CardSummaryPrice