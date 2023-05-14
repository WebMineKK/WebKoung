import * as React from 'react';
import { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import arrow from '../../src/assets/arrow-left.svg'
import navbarList from '../components/ListnavBar';
import Router from '../Router';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
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

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function HomePage2() {

  const [open, setOpen] = useState(true);

  const _handleLogout = () => {
    localStorage.removeItem(USER_KEY)
    history.push('/home/')
  }

  const history = useHistory();
  // console.log(navbarList.map((x) => x.desc))

  return (
    <>
      <div class="flex">
        <div className='bg-white shadow-md h-16 absolute top-0  w-full '>
          <div className='flex justify-between px-8 py-3'>
            <div></div>
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open user menu</span>
                  <p className='pr-3 pt-2 font-normal'>Anouluck@gmail.com</p>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
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
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        onClick={_handleLogout}>
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        <aside class="h-screen sticky top-0">
          {/* // Fixed Sidebar */}
          <NavBar />
        </aside>

        <main className='w-full mt-16 p-5 bg-white'>
          {/* // Content */}
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

        </main>
      </div>

    </>
  )
}
