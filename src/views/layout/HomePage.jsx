import React, { useEffect, useState } from 'react';
import classes from './Home.module.css'
import { BrowserRouter as Router, Route, Switch, useHistory, Link } from 'react-router-dom';
import { Button, Layout, Menu, theme } from 'antd';
import items from './NameMenu'
import { Avatar } from 'antd';
import { CircleUserRound, LogOut, ChevronLeftSquare, ChevronRightSquare } from 'lucide-react';
import LogoutModal from './LogoutModal';
import Dashborad from '../dashborad/Dashborad';
import ImportHome from '../import/ImportHome';
import ImportCreate from '../import/CRUD/ImportCreate';
import ProductHome from '../product/ProductHome';
import CategoryHome from '../category/CategoryHome';
import CarHome from '../car/CarHome';
import CustomerHome from '../customer/CustomerHome';
import PreOrderHome from '../preorder/PreOrderHome';
import PreOrderForm from '../preorder/CRUD/PreOrderForm';

const { Header, Content, Sider } = Layout;


function HomePage() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [collapsed, setCollapsed] = useState(false);

    const [dialogOpen, setDialogOpen] = useState({ logout: false });

    const [current, setCurrent] = useState('dashboard');

    const history = useHistory();

    const onClick = (e) => {
        setCurrent(e.key);
        history.push(`/home/${e.key}`);
    };


    return (
        <>
            <Router>
                <Layout hasSider>
                    <Sider
                        style={{
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            zIndex: 11,
                            left: 0,
                            top: 0,
                            bottom: 0,
                        }}
                        trigger={null} collapsible collapsed={collapsed}
                    >
                        <div className={`${classes.logo} my-10`}>
                            {
                                collapsed
                                    ? <p className={classes.title}>Koung </p>
                                    : <p className={classes.title}>Web Koung</p>
                            }
                        </div>
                        <Menu theme="dark" mode="inline"
                            onClick={onClick}
                        >
                            {items.map((x) => (
                                <Menu.Item key={x.key} icon={x.icon}>
                                    <p className={classes.label}>{x.label}</p>
                                    <Link to={x.key} />
                                </Menu.Item>
                            ))}
                            {
                                collapsed
                                    ? <></>
                                    : <button
                                        className={`${classes.logout} flex items-center pl-7 mt-10`}
                                        onClick={() => setDialogOpen({ logout: true })}>
                                        <LogOut size={20} />
                                        <span className='ml-2'>ອອກຈາກລະບົບ</span>
                                    </button>
                            }
                        </Menu>
                    </Sider>
                    <Layout
                    >
                        <Header
                            style={{
                                position: 'sticky',
                                top: 0,
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                zIndex: 10
                            }}
                            className={`${collapsed ? 'pl-20' : 'pl-[12.5rem]'} bg-white shadow-sm transition-all duration-75 ease-linear`}
                        >
                            <div className="flex justify-between items-center w-full">
                                <Button
                                    type="text"
                                    icon={collapsed ? <ChevronRightSquare size={24} /> : <ChevronLeftSquare size={24} />}
                                    onClick={() => setCollapsed(!collapsed)}
                                    className='flex items-center'
                                >
                                    {collapsed ? 'ສະແດງເຕັມ' : 'ຫຍໍ້ເມນູ'}
                                </Button>
                                <div className='flex items-center'>
                                    <Avatar
                                        className='bg-[#87d068] pt-[3px]'
                                    ><CircleUserRound /></Avatar>
                                    <div className='pl-3 flex'><p>VTE4525</p><span className='px-1'>-</span><p>ອານຸລັກ ຈັນເພັງໄຊ</p></div>
                                </div>
                            </div>

                        </Header>
                        <Content
                            className={`${collapsed ? 'pl-20' : 'pl-[12.5rem]'} transition-all duration-75 ease-linear`}
                        >
                            <div>
                                <Switch>
                                    <Route exact path={`/home/`} component={Dashborad} />
                                    <Route exact path={`/home/dashborad`} component={Dashborad} />

                                    <Route exact path={`/home/import`} component={ImportHome} />
                                    <Route exact path={`/home/import/create`} component={ImportCreate} />

                                    <Route exact path={`/home/preorder`} component={PreOrderHome} />
                                    <Route exact path={`/home/preorder/create`} component={PreOrderForm} />

                                    <Route exact path={`/home/product`} component={ProductHome} />
                                    <Route exact path={`/home/customer`} component={CustomerHome} />
                                    <Route exact path={`/home/typeproduct`} component={CategoryHome} />
                                    <Route exact path={`/home/car`} component={CarHome} />

                                </Switch>

                            </div>
                        </Content>
                    </Layout>
                </Layout>

            </Router>
            <LogoutModal
                isOpen={dialogOpen.logout}
                isCancel={(x) => {
                    setDialogOpen({ logout: x })
                }}
            />
        </>
    )
}

export default HomePage