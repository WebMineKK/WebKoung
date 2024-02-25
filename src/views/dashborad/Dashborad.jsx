import React, { useEffect, useState } from 'react';
import classes from '../../components/style/LayoutStyle.module.css'
import Header from './Header';
import CardBarChart from './CardBarChart';
import CardProduct from './CardProduct';

function Dashborad() {
    return (
        <div className='mb-14'>
            <h3 className={`${classes.header}`}>ພາບລວມການເຄື່ອນໄຫວ</h3>
            <Header />
            <CardBarChart />
            <CardProduct />
        </div>
    )
}

export default Dashborad