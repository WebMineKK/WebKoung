import * as React from 'react';
import { useState } from 'react';
import { Link, NavLink, Route, Switch, useHistory, useLocation } from 'react-router-dom';

import arrow from '../../src/assets/arrow-left.svg'
import navbarList from '../components/ListnavBar';
import Router from '../Router';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Dialog as TwDialog } from '@headlessui/react'
import ImportPage from './Import/ImportPage';
import ImportProduct from './Import/ImportProduct';
import HomeCustomer from './customer/HomeCustomer';
import AddPreorder from './order/AddPreorder';
import HomePreorder from './order/HomePreorder';
import HomeCategory from './category/HomeCategory';
import HomeProduct from './product/HomeProduct';
import NavBar from '../components/NavBar';
import HomePackaging from './packaging/HomePackaging';
import Dashborad from './Dashborad';
import AddPackaging from './packaging/AddPackaging';
import { USER_KEY } from '../components/userKey';
import { Sidebar, Menu as MenuPro, MenuItem, SubMenu, useProSidebar, menuClasses } from 'react-pro-sidebar';
import iccar from './../components/iconMenu/car.svg'
import icpro from './../components/iconMenu/product.svg'
import icds from './../components/iconMenu/dashborad.svg'
import icdeli from './../components/iconMenu/delivery.svg'
import iccus from './../components/iconMenu/customer.svg'
import icretrun from './../components/iconMenu/return.svg'
import HomeCar from './car/HomeCar';
import BillNo from './order/BillNo';
import AgainPreorder from './order/AgainPreorder';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function HomePage() {

  const [open, setOpen] = useState({ logout: false })

  const dialogLogout = () => {
    setOpen({ ...open, logout: true })
  }

  const _handleLogout = () => {
    localStorage.removeItem(USER_KEY)
    history.push('/')
  }

  const history = useHistory();
  // console.log(navbarList.map((x) => x.desc))



  return (
    <>

      <div class="flex flex-row bg-[#F5F5F5] h-screen">
        <div style={{ display: 'flex', height: '100%', minWidth: '250px' }}>
          <Sidebar
            backgroundColor='#2D3436'
            width='250px'
            rootStyles={{
              position: 'fixed',
              height: '100%',
              left: '0',
              overflowY: 'auto',
              zIndex: '50',
              [`.${menuClasses.label}`]: {
                color: '#f2f2f2',
                fontSize: '16px',
                padding: '5px'
              },
            }}
          >
            <div style={{ marginBottom: '24px', marginTop: '16px' }} />

            <MenuPro
              menuItemStyles={{
                button: {
                  // backgroundColor: 'red',
                  '&:hover': {
                    backgroundColor: '#5E5E5E',
                  },
                },
              }}>
              <div className=" mb-5">
                <div className='flex justify-center'>
                  {/* <img src={logo} width={64} /> */}

                </div>
                <p className='text-[#f9f9f9] font-bold text-base text-center mt-3'>
                  Web Koung Koung
                </p>
              </div>

              <div style={{ padding: '0 20px', marginBottom: '5px' }}>
                <p className='text-[#B2B2B2] font-bold text-sm'>
                  General
                </p>
              </div>

              <MenuItem
                icon={<img src={icds} width={14} />}
                component={<Link to="/home/" />}
                className='text-[#f2f2f2] text-xs'> ພາບລວມຂໍ້ມູນ
              </MenuItem>

              <div style={{ padding: '0 20px', marginBottom: '5px', marginTop: '20px' }}>
                <p className='text-[#B2B2B2] font-bold text-sm'>
                  Manage
                </p>
              </div>

              <SubMenu
                rootStyles={{
                  ['& > .' + menuClasses.button]: {
                    backgroundColor: '#2D3436',
                    color: '#f2f2f2',
                    '&:hover': {
                      backgroundColor: '#1F2426',
                    },
                  },
                  ['.' + menuClasses.subMenuContent]: {
                    backgroundColor: '#1F2426',
                  },
                }}
                className='text-[#f2f2f2]'
                label="ສິນຄ້າ"
                icon={<img src={icpro} width={16} />}
              >
                <MenuItem component={<Link to="/home/import" />}> ນຳເຂົ້າ </MenuItem>
                <MenuItem component={<Link to="/home/preorder" />}> ເບີກສິນຄ້າ </MenuItem>
                <MenuItem component={<Link to="/home/product" />}> ຄັງສິນຄ້າ </MenuItem>
                <MenuItem component={<Link to="/home/category" />}> ໝວດໝູ່ສິນຄ້າ </MenuItem>
              </SubMenu>

              <MenuItem
                icon={<img src={icdeli} width={18} />}
                component={<Link to="/home/packaging" />}>
                ແພັກ ແລະ ສົ່ງ
              </MenuItem>

              <SubMenu
                rootStyles={{
                  ['& > .' + menuClasses.button]: {
                    backgroundColor: '#2D3436',
                    color: '#f2f2f2',
                    '&:hover': {
                      backgroundColor: '#1F2426',
                    },
                  },
                  ['.' + menuClasses.subMenuContent]: {
                    backgroundColor: '#1F2426',
                  },
                }}
                className='text-[#f2f2f2]'

                label="Return"
                icon={<img src={icretrun} width={16} />}
              >
                <MenuItem > ນຳສິນຄ້າກັບ </MenuItem>
                <MenuItem > ສິນຄ້າເສຍຫາຍ </MenuItem>
              </SubMenu>

              <MenuItem
                icon={<img src={iccus} width={16} />}
                component={<Link to="/home/customer" />}>
                ລູກຄ້າ
              </MenuItem>

              <MenuItem
                icon={<img src={iccar} width={18} />}
                component={<Link to="/home/car" />}>
                ລົດ
              </MenuItem>

            </MenuPro>
          </Sidebar>
        </div>
        <div class="basis-full bg-slate-200">
          <div className='fixed top-0 left-0 z-10 w-full'>
            <Disclosure as="nav" className="bg-[#fff] z-10 shadow-sm relatives border-b border-solid border-[#ddd] w-full">
              {({ open }) => (
                <>
                  <div className="mx-auto max-w-8xl  px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-[60px] items-center justify-between">
                      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}

                      </div>
                      <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-start">

                        <div className="hidden sm:ml-6 sm:block w-full border-0 ">
                          <div className="flex space-x-4 justify-end">
                            <div>
                              <Menu as="div" className="relative ml-3 pt-1">
                                <div>
                                  <Menu.Button className="flex rounded-full items-center text-base text-[#374151] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                      className="h-8 w-8 rounded-full"
                                      src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                      alt=""
                                    />
                                    {/* <p className='pl-4'>{userAuth?.username}</p> */}
                                  </Menu.Button>
                                </div>
                                <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-100"
                                  enterFrom="transform opacity-0 scale-95"
                                  enterTo="transform opacity-100 scale-100"
                                  leave="transition ease-in duration-75"
                                  leaveFrom="transform opacity-100 scale-100"
                                  leaveTo="transform opacity-0 scale-95"
                                >
                                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <Menu.Item>
                                      {({ active }) => (
                                        // eslint-disable-next-line jsx-a11y/anchor-is-valid
                                        <a
                                          href="#"
                                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                        >
                                          Your Profile
                                        </a>
                                      )}
                                    </Menu.Item>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a
                                          href="#"
                                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                        >
                                          Settings
                                        </a>
                                      )}
                                    </Menu.Item>
                                  </Menu.Items>
                                </Transition>
                              </Menu>
                            </div>

                            <button class=" group relative flex items-center w-48 h-9 justify-center py-1.5 px-4 text-base text-[#374151]"
                              onClick={dialogLogout}>
                              ອອກຈາກລະບົບ
                              <span className='pl-2 pt-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" fill="none" viewBox="0 0 16 17">
                                  <g clip-path="url(#a)">
                                    <path fill="#374151" d="M14.452 8.655h-.201c-3.385.002-6.77.006-10.154.003a.96.96 0 0 1-.459-.104c-.272-.156-.368-.456-.285-.744a.71.71 0 0 1 .662-.472c2.354 0 4.708-.013 7.061-.02 1.063-.003 2.125-.002 3.188-.003h.219c-.105-.123-.179-.225-.268-.313-.819-.823-1.64-1.644-2.462-2.465-.196-.196-.305-.42-.223-.704a.66.66 0 0 1 1.097-.305c.202.188.393.388.587.584.701.705 1.413 1.4 2.099 2.12.767.805.905 2.09.341 3.059a3.26 3.26 0 0 1-.489.642c-.824.84-1.66 1.669-2.493 2.5-.291.29-.653.322-.94.089a.66.66 0 0 1-.093-.934c.057-.067.122-.129.184-.191.791-.792 1.584-1.583 2.374-2.377.1-.101.186-.217.28-.327l-.025-.038Z" />
                                    <path fill="#374151" d="M.001 8c0-1.536-.003-3.072.002-4.609.004-1.168.48-2.104 1.43-2.785A3.173 3.173 0 0 1 3.288.002c.442-.004.885-.002 1.328 0 .419.002.717.275.722.66.006.374-.298.67-.713.677-.453.008-.906-.002-1.359.005a1.97 1.97 0 0 0-1.922 1.932c-.002 3.156-.005 6.312 0 9.468.003.915.708 1.747 1.615 1.875.45.063.913.031 1.37.044.151.004.304-.001.451.023a.664.664 0 0 1 .558.656c-.007.328-.25.64-.584.644-.767.01-1.54.094-2.3-.104-1.267-.33-2.288-1.506-2.422-2.805a5.47 5.47 0 0 1-.03-.545c-.002-1.51 0-3.02 0-4.531Z" />
                                  </g>
                                  <defs>
                                    <clipPath id="a">
                                      <path fill="#fff" d="M0 0h16v16.014H0z" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                </>
              )}
            </Disclosure>
          </div>
          <main className='mt-14 w-full bg-[#F5F5F5] h-screen'>
            <div className='py-[16px] px-[24px]'>
              <Switch>
                <Route path={'/home/'} exact component={Dashborad} />
                <Route path={'/home/import'} exact component={ImportPage} />
                <Route path={'/home/import/manage'} exact component={ImportProduct} />
                <Route path={'/home/product'} exact component={HomeProduct} />
                <Route path={'/home/category'} exact component={HomeCategory} />
                <Route path={'/home/preorder'} exact component={HomePreorder} />
                <Route path={'/home/preorder/add'} exact component={AddPreorder} />
                <Route path={'/home/customer'} exact component={HomeCustomer} />
                <Route path={'/home/packaging'} exact component={HomePackaging} />
                <Route path={'/home/packaging/add'} exact component={AddPackaging} />

                <Route path={'/home/car'} exact component={HomeCar} />

                <Route path={'/home/preorder/bill'} exact component={BillNo} />
                <Route path={'/home/preorder/copy'} exact component={AgainPreorder} />

              </Switch>
            </div>
          </main>
        </div>
      </div>

      <Transition appear show={open.logout} as={Fragment}>
        <TwDialog as="div" className="relative z-10" onClose={() => setOpen({ ...open, logout: false })}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <TwDialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <TwDialog.Title
                    as="h3"
                    className="flex justify-between items-center text-lg font-medium leading-6 text-gray-900 pt-6 px-6"
                  >
                    <h3 className='font-bold text-[#777]'>ຢືນຢັນການອອກຈາກລະບົບ</h3>
                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                      onClick={() => setOpen({ ...open, logout: false })}>
                      <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                      <span class="sr-only">Close modal</span>
                    </button>
                  </TwDialog.Title>
                  <div className='p-6'>
                    <p className='flex justify-center'>Oh no! ທ່ານກຳລັງຈະອອກຈາກໜ້າຕ່າງນີ້...</p>
                    <p className='flex justify-center mt-2'>ທ່ານແນ່ໃຈ ຫລື ບໍ?</p>
                  </div>
                  <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      className="btn-base w-36 flex items-center"
                      onClick={_handleLogout}
                    >
                      ຕົກລົງ
                    </button>
                    <button
                      className="mr-3 w-32 justify-center rounded-mdpx-4 py-2 text-base text-indigo-500 shadow-sm hover:bg-gray-50"
                      onClick={() => setOpen({ ...open, logout: false })}
                    >
                      ບໍ່, ຢູ່ໜ້ານີ້ຕໍ່
                    </button>
                  </div>
                </TwDialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </TwDialog>
      </Transition>

    </>
  )
}
