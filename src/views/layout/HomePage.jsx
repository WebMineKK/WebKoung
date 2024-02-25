import React, { useEffect, useState } from 'react';
import classes from './Home.module.css'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Button, Layout, Menu } from 'antd';
import { Avatar } from 'antd';
import { CircleUserRound, LogOut, ChevronLeftSquare, ChevronRightSquare } from 'lucide-react';
import LogoutModal from './LogoutModal.jsx';
import Dashborad from '../dashborad/Dashborad.jsx';
import ImportHome from '../import/ImportHome.jsx';
import ImportCreate from '../import/CRUD/ImportCreate.jsx';
import ProductHome from '../product/ProductHome.jsx';
import CategoryHome from '../category/CategoryHome.jsx';
import CarHome from '../car/CarHome.jsx';
import CustomerHome from '../customer/CustomerHome.jsx';
import PreOrderHome from '../preorder/PreOrderHome.jsx';
import PreOrderForm from '../preorder/CRUD/PreOrderForm.jsx';
import ReceiptPreOrder from '../preorder/CRUD/component/ReceiptPreOrder.jsx';
import CheckPreOrder from '../preorder/CRUD/CheckPreOrder.jsx';
import { Truck, BarChartHorizontal, LayoutDashboard, Shapes, PackagePlus, Gem, Users, ClipboardX, CarFront } from 'lucide-react';
import ImportDetailed from '../import/CRUD/ImportDetailed.jsx';
import ReportHome from '../report/ReportHome.jsx';
import DisposalHome from '../disposal/DisposalHome.jsx';

const { Header, Content, Sider } = Layout;

function HomePage() {
    const [collapsed, setCollapsed] = useState(false);
    const [dialogOpen, setDialogOpen] = useState({ logout: false });



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
                        <Menu theme="dark" mode="inline">
                            <Menu.Item key={'1'} icon={<LayoutDashboard size={20} />} className="custom-active-menu">
                                <Link to={`/home/dashborad`} ><p>ພາບລວມ</p></Link>
                            </Menu.Item>
                            <Menu.Item key={'2'} icon={<PackagePlus size={20} />} className="custom-active-menu">
                                <Link to={`/home/import`} ><p>ນຳເຂົ້າ</p></Link>
                            </Menu.Item>
                            <Menu.Item key={'3'} icon={<Truck size={20} />} className="custom-active-menu">
                                <Link to={`/home/preorder`} ><p>ເບີກ ແລະ ຈັດສົ່ງ</p></Link>
                            </Menu.Item>
                            <Menu.Item key={'4'} icon={<Gem size={20} />} className="custom-active-menu">
                                <Link to={`/home/product`} ><p>ຄັງສິນຄ້າ</p></Link>
                            </Menu.Item>
                            <Menu.Item key={'5'} icon={<ClipboardX size={20} />} className="custom-active-menu">
                                <Link to={`/home/disposal`} ><p>ສິນຄ້າເສຍ</p></Link>
                            </Menu.Item>
                            <Menu.Item key={'6'} icon={<Users size={20} />} className="custom-active-menu">
                                <Link to={`/home/customer`} ><p>ລູກຄ້າ</p></Link>
                            </Menu.Item>
                            <Menu.Item key={'7'} icon={<Shapes size={20} />} className="custom-active-menu">
                                <Link to={`/home/typeproduct`} ><p>ປະເພດສິນຄ້າ</p></Link>
                            </Menu.Item>
                            <Menu.Item key={'8'} icon={<CarFront size={20} />} className="custom-active-menu">
                                <Link to={`/home/car`} ><p>ລົດ</p></Link>
                            </Menu.Item>
                            <Menu.Item key={'9'} icon={<BarChartHorizontal size={20} />} className="custom-active-menu">
                                <Link to={`/home/report`} ><p>ການລາຍງານ</p></Link>
                            </Menu.Item>

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
                                    <Route exact path={`/home/import/view`} component={ImportDetailed} />

                                    <Route exact path={`/home/preorder`} component={PreOrderHome} />
                                    <Route exact path={`/home/preorder/create`} component={PreOrderForm} />
                                    <Route exact path={`/home/preorder/receipt`} component={ReceiptPreOrder} />
                                    <Route exact path={`/home/preorder/check`} component={CheckPreOrder} />

                                    <Route exact path={`/home/product`} component={ProductHome} />
                                    <Route exact path={`/home/customer`} component={CustomerHome} />
                                    <Route exact path={`/home/typeproduct`} component={CategoryHome} />
                                    <Route exact path={`/home/car`} component={CarHome} />

                                    <Route exact path={`/home/disposal`} component={DisposalHome} />
                                    <Route exact path={`/home/report`} component={ReportHome} />


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