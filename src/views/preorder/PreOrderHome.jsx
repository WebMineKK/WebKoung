import React, { useEffect, useState, Fragment } from 'react';
import { Button, Input, Space, Table, Tag } from 'antd';
import classes from '../../components/style/LayoutStyle.module.css'
import classesbtn from '../../components/style/ButtonStyle.module.css'
import { } from '../../middleware/LoadData'
import { USER_KEY } from '../../middleware/userKey';
import { FilePen, Trash, Loader } from 'lucide-react';
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

function PreOrderHome() {
    const { Search } = Input
    const userToken = JSON.parse(localStorage.getItem(USER_KEY))
    const history = useHistory()



    return (
        <>
            <div className='grid grid-cols-3 gap-5'>
                <div className={`col-span-3`}>
                    <h3 className={`${classes.header}`}>ສະແດງລາຍການເບີກສິນຄ້າ</h3>
                    <div className={`${classes.content} mb-5 flex items-center justify-between`}>
                        <div>
                            <Search
                                className={`${classes.inputsearch} w-[300px]`}
                                size='middle'
                                placeholder="ຄົ້ນຫາ..."
                                allowClear
                                onSearch
                                style={{
                                    fontFamily: 'Noto Sans Lao'
                                }}
                            />
                        </div>
                        <Button size='middle' className={`${classesbtn.base} w-[135px]`}
                            onClick={() => history.push('/home/preorder/create')}>ເບີກສິນຄ້າໃໝ່</Button>
                    </div>
                    <div className={`${classes.content}`}>
                        {/* <Table
                            loading={loading ? tableLoading : false}
                            className='custablepro'
                            columns={columns}
                            pagination={{
                                position: [top],
                            }}
                            dataSource={listData}
                            scroll={{
                                x: 500,
                                y: 1000,
                            }}
                        /> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default PreOrderHome