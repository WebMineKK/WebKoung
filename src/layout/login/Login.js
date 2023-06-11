import { useHistory } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useState } from 'react';
import { USER_KEY } from '../../components/userKey'
import { NewAxios } from '../../components/MyAxios';


export default function Example() {
     const history = useHistory();
     const [usernameState, setUsernameState] = useState("");
     const [passwordState, setPasswordState] = useState("");
     const [validateUser, setValidateUser] = useState(false);
     const [validatePwd, setValidatePwd] = useState(false);
     const [loading, setLoading] = useState(false)

     const _handleUserName = (e) => {
          setUsernameState(e.target.value);
     }
     const _handlePwd = (e) => {
          setPasswordState(e.target.value);
     }

     const _handleLogin = () => {


          if (usernameState === '') {
               setValidateUser(true)
          } else {
               setValidateUser(false)
          }
          if (passwordState === '') {
               setValidatePwd(true)
          } else {
               setValidatePwd(false)
          }

          setLoading(true)
          NewAxios.post('login', {
               "username": usernameState,
               "password": passwordState
          }).then((res) => {
               if (res?.status === 200) {

                    setTimeout(() => {

                         localStorage.setItem(USER_KEY, JSON.stringify(res?.data));
                         history.push('/home');

                         setLoading(false)
                    }, 300)


               } else {
                    // history.push('/login')
               }
          }).catch(e => console.error(e))
     }

     return (
          <>

               <div className="isolate bg-white flex h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 login-bg">
                    <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
                         <svg
                              className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
                              viewBox="0 0 1155 678"
                              xmlns="http://www.w3.org/2000/svg"
                         >
                              <path
                                   fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
                                   fillOpacity=".3"
                                   d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                              />
                              <defs>
                                   <linearGradient
                                        id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                                        x1="1155.49"
                                        x2="-78.208"
                                        y1=".177"
                                        y2="474.645"
                                        gradientUnits="userSpaceOnUse"
                                   >
                                        <stop stopColor="#9089FC" />
                                        <stop offset={1} stopColor="#FF80B5" />
                                   </linearGradient>
                              </defs>
                         </svg>
                    </div>
                    <div className="bg-white px-12 py-12 rounded-2xl w-full max-w-md space-y-8 shadow-md">
                         <div>
                              <img
                                   className="mx-auto h-12 w-auto"
                                   src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                   alt="Your Company"
                              />
                              <h3 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
                                   ຍິນດີຕ້ອນຮັບ
                              </h3>
                         </div>
                         <div className="mt-8 space-y-6">
                              <input type="hidden" name="remember" defaultValue="true" />
                              <div className="-space-y-px rounded-md shadow-sm">
                                   <div>
                                        <label htmlFor="first-name" className="block text-md font-normal text-gray-700">
                                             ອີເມວຜູ້ໃຊ້
                                        </label>
                                        <input
                                             type="text"
                                             name="first-name"
                                             id="first-name"
                                             autoComplete="off"
                                             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                             onChange={_handleUserName}
                                        />
                                        {
                                             !validateUser ? '' : <p className='text-[#ef4444] mt-1'>Enter your username, Please!!</p>
                                        }
                                   </div>
                                   <div className='pt-3'>
                                        <label htmlFor="first-name" className="block text-md font-normal text-gray-700">
                                             ລະຫັດຜ່ານ
                                        </label>
                                        <input
                                             id="password"
                                             name="password"
                                             type="password"
                                             autoComplete="off"
                                             required
                                             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                             onChange={_handlePwd}
                                        />
                                        {
                                             !validatePwd ? '' : <p className='text-[#ef4444] mt-1'>Enter your password, Please!!</p>
                                        }
                                   </div>
                              </div>
                              <div>
                                   <button
                                        type="submit"
                                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        onClick={() => _handleLogin()}>
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                             <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                        </span>

                                        {
                                             loading ? <span>Loading...</span>
                                                  : <span>ເຂົ້າສູ່ລະບົບ</span>
                                        }
                                   </button>
                              </div>
                         </div>
                    </div>
               </div>
          </>
     )
}
