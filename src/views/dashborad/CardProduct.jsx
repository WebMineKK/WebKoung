import React from 'react'
import classes from '../../components/style/LayoutStyle.module.css'
import MyStackedChart from './component/MyStackedChart'
import ProductInCome from './component/ProductInCome'
import ProductNearStock from './component/ProductNearStock'

function CardProduct() {
    return (
        <>
            <div className='grid grid-cols-2 gap-5 mt-5 mx-4 h-[350px]'>
                <div className={`${classes.contentnopad}`}>
                    <h5 className='font-bold p-2'>ລາຍຮັບລາຍອາທິດ</h5>
                    <div className="flex mt-6">
                        <div className='h-[250px] w-[350px]'><MyStackedChart /></div>

                    </div>
                </div>
                <div className={`${classes.contentnopad}`}>
                    <h5 className='font-bold p-2'>ສິນຄ້າໃກ້ໝົດ</h5>
                    <div className=''>
                        <ProductNearStock />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardProduct