import React, { useState } from 'react'
import MyBarChart from './component/MyBarChart'
import classes from '../../components/style/LayoutStyle.module.css'
import MyPieChart from './component/MyPieChart'

function CardBarChart() {

    return (
        <div className='grid grid-cols-3 gap-5 mx-4 mt-5'>
            <div className={`${classes.contentnopad} col-span-2 h-[350px]`}>
                <h5 className='font-bold mb-3 p-2'>ການເຕີບໂຕຂອງລາຍຮັບ</h5>
                <div className='h-[270px]'><MyBarChart /></div>
            </div>
            <div className={`${classes.contentnopad}`}>
                <h5 className='font-bold p-2'>ສິນຄ້າຂາຍດີ</h5>
                <MyPieChart />
            </div>
        </div>
    )
}

export default CardBarChart