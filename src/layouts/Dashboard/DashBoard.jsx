
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';
import { Link, Outlet } from 'react-router-dom';
import DashboardNavbar from '../../Pages/Shared/DashboardNavbar/DashboardNavbar';

const DashBoard = () => {

    const [currentUser, setCurrentUser] = useState(null)
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const { user, isDark } = useContext(AuthContext);
    const { photoURL, displayName, email } = user;

    useEffect(() => {
        fetch(`https://camp-sportopia-server-faisalahmednour.vercel.app/users/${email}`)
            .then(res => res.json())
            .then(data => setCurrentUser(data))
    }, [email])
    //    console.log(email, currentUser)

    return (
        <div className={`${isDark ? 'bg-[#515b60]' : 'bg-[#EFEEEA]'}`}>
            <div className={`flex relative overflow-hidden pt-4 mb-0 h-screen max-w-screen-2xl mx-auto `}>
                <div
                    className={`${isOpen ? 'block' : 'hidden'
                        } lg:block w-3/5 md:w-2/5 lg:w-3/12 h-screen text-[#2b385a] z-10`}
                >
                    {/* Drawer content goes here */}
                    <div className='bg-[white] sticky h-60 mb-5 lg:pt-12 rounded-3xl'>
                        <p className='text-right'>
                            <button
                                onClick={toggleDrawer}
                                className='lg:hidden bg-[white] mb-6 mr-1 p-2 rounded-full'
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </p>
                        <img
                            className='w-[100px] h-[100px] rounded-full mx-auto border-4 border-[#1b2174d2] '
                            src={photoURL}
                            alt="Profile image"
                        />
                        <p className='text-center text-xl'>{displayName}</p>
                    </div>
                    <div className='bg-white rounded-3xl rounded-br-3xl pt-8 pb-36'>
                        {
                            currentUser?.role === 'admin' ?
                                <ul className='mx-6'>
                                    <Link to='/dashboard'>
                                        <li className='mb-4 text-lg'>
                                            <i className="fa-solid fa-user mr-2 ml-1"></i>
                                            Admin Dashboard
                                        </li>
                                    </Link>
                                    <Link to='/dashboard/manage-classes'>
                                        <li className='mb-4 text-lg'>
                                            <i className="fa-solid fa-cart-shopping mt-1 mr-2"></i>
                                            Manage Classes
                                        </li>
                                    </Link>
                                    <Link to='/dashboard/manage-users'>
                                        <li className='mb-4 text-lg'>
                                            <i className="fa-solid fa-clipboard-check mt-1 mr-2 ml-1"></i>
                                            Manage Users
                                        </li>
                                    </Link>
                                </ul> :
                                currentUser?.role === 'instructor' ?
                                    <ul className='mx-6'>
                                        <Link to='/dashboard'>
                                            <li className='mb-4 text-lg'>
                                                <i className="fa-solid fa-user mr-2 ml-1"></i>
                                                Instructor Dashboard
                                            </li>
                                        </Link>
                                        <Link to='/dashboard/add-class'>
                                            <li className='mb-4 text-lg'>
                                                <i className="fa-solid fa-cart-shopping mt-1 mr-2"></i>
                                                Add a Class
                                            </li>
                                        </Link>
                                        <Link to='/dashboard/my-classes'>
                                            <li className='mb-4 text-lg'>
                                                <i className="fa-solid fa-clipboard-check mt-1 mr-2 ml-1"></i>
                                                My Classes
                                            </li>
                                        </Link>
                                    </ul> :
                                    <ul className='mx-6'>
                                        <Link to='/dashboard'>
                                            <li className='mb-4 text-lg'>
                                                <i className="fa-solid fa-user mr-2 ml-1"></i>
                                                User Dashboard
                                            </li>
                                        </Link>
                                        <Link to='/dashboard/selected-classes'>
                                            <li className='mb-4 text-lg'>
                                                <i className="fa-solid fa-cart-shopping mt-1 mr-2"></i>
                                                Selected Classes
                                            </li>
                                        </Link>
                                        <Link to='/dashboard/enrolled-classes'>
                                            <li className='mb-4 text-lg'>
                                                <i className="fa-solid fa-clipboard-check mt-1 mr-2 ml-1"></i>
                                                Enrolled Classes
                                            </li>
                                        </Link>
                                        <Link to='/dashboard/payment'>
                                            <li className='mb-4 text-lg'>
                                                <i className="mr-2 fa-solid fa-clock-rotate-left"></i>
                                                Payment History
                                            </li>
                                        </Link>
                                    </ul>
                        }
                        <hr className="border-t border-gray-300 my-4 mx-3" />
                        <ul className='mx-6'>
                            <Link to='/'>
                                <li className='mb-4 text-lg'>
                                    <i className="fa-solid fa-house mr-2"></i>
                                    Home
                                </li>
                            </Link>
                            <Link to='/all-classes'>
                                <li className='mb-4 text-lg'>
                                    <i className="fa-solid fa-users-viewfinder mr-1"></i>
                                    Classes
                                </li>
                            </Link>
                            <Link to='/instructors'>
                                <li className='mb-4 text-lg'>
                                    <i className="fa-solid fa-person-chalkboard mr-1"></i>
                                    Instructors
                                </li>
                            </Link>
                            <li className='text-lg'>
                                <i className="fa-solid fa-phone mr-2"></i>
                                About Us
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={`w-full overflow-x-hidden lg:pl-8 ${isOpen ? 'absolute' : ''} lg:relative`}>
                    <div>
                        <div className='sticky'>
                            <DashboardNavbar
                                isOpen={isOpen}
                                toggleDrawer={toggleDrawer}
                            ></DashboardNavbar>
                        </div>
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
