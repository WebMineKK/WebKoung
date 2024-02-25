import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function MyStackedChart() {

    const data = [
        {
            name: 'Mon',
            uv: 4000,
            pv: 2400,
            av: 4824,
            bv: 4244,
            cv: 6879,
        },
        {
            name: 'Tue',
            uv: 3000,
            pv: 1398,
            av: 3734,
            bv: 4775,
            cv: 3080,
        },
        {
            name: 'Wed',
            uv: 2000,
            pv: 9800,
            av: 2016,
            bv: 4761,
            cv: 5977,
        },
        {
            name: 'Thu',
            uv: 2780,
            pv: 3908,
            av: 4205,
            bv: 4240,
            cv: 4468,
        },
        {
            name: 'Fri',
            uv: 1890,
            pv: 4800,
            av: 2513,
            bv: 5948,
            cv: 5971,
        },
        {
            name: 'Sat',
            uv: 2390,
            pv: 3800,
            av: 2588,
            bv: 4093,
            cv: 3460,
        },
        {
            name: 'Sun',
            uv: 3490,
            pv: 4300,
            av: 2491,
            bv: 5702,
            cv: 3807,
        },
    ];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                // width={230} height={250}
                barSize={13}
                data={data}>
                <CartesianGrid strokeDasharray="6 5" />
                <XAxis dataKey="name" />
                <Tooltip />
                {/* <YAxis /> */}
                <Legend align='right' layout='vertical' verticalAlign='top' />
                <Bar dataKey="pv" stackId="a" fill="#8884d8" />
                <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
                <Bar dataKey="av" stackId="a" fill="#966a69" />
                <Bar dataKey="bv" stackId="a" fill="#9d1be6" />
                <Bar dataKey="cv" stackId="a" fill="#54dbc0" radius={[10, 10, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default MyStackedChart