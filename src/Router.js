import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomePage from './layout/HomePage'
import Test from './layout/Dashborad'
import ImportPage from './layout/Import/ImportPage'
import ImportProduct from './layout/Import/ImportProduct'
import HomeProduct from './layout/product/HomeProduct'
import HomeCategory from './layout/category/HomeCategory'
import HomePreorder from './layout/order/HomePreorder'
import HomeCustomer from './layout/customer/HomeCustomer'
import AddPreorder from './layout/order/AddPreorder'
import Login from './layout/login/Login'
import Dashborad from './layout/Dashborad'

export default function Router() {
     return (
          <Switch>
               <Route path={'/home'} exact component={HomePage} />
          </Switch>
     )
}
