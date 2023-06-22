import { Link, useLocation, useNavigate } from 'react-router-dom';
import googleLogo from '../../assets/icon-google.png'
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';
export default function Login() {

    const navigate = useNavigate();
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";

    const [pass, setPass] = useState(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { signInUserWithPass, googleLogin } = useContext(AuthContext);

    const handleGoogleLogIn = () => {
        googleLogin()
            .then((data) => {
                console.log(data);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Successfully loged in...',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate(from, { replace: true });
            })
            .catch(error => {
                const errorMessage = error.message;
                console.log(errorMessage)
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: errorMessage,
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    }

    const onSubmit = data => {
        console.log(data);
        console.log(data.email, data.password)
        signInUserWithPass(data.email, data.password)
            .then(() => {
                reset()
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Successfully loged in...',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate(from, { replace: true });
            })
            .catch(error => {
                const errorMessage = error.message;
                console.log(errorMessage)
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: errorMessage,
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    };

    const visiblePass = () => {
        setPass(!pass)
    }

    return (
        <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
            <div
                className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md"
            >
                {/* side img */}
                <div
                    className="text-white bg-[url('https://www.imgacademy.com/sites/default/files/img-academy-soccer-camp-1.jpg')] bg-cover md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly"
                >
                    <div className="w-full h-full p-4 py-6 text-white bg-black/75 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
                        <div className="my-3 text-3xl font-bold tracking-wider text-center">
                            <Link to="/" className="">CampSportopia</Link>
                        </div>
                        <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
                            Summer sports camps are a great way for kids to get active, learn new skills, and make new friends.
                        </p>
                        <p className="flex flex-col items-center justify-center mt-10 text-center">
                            <span>Don&apos;t have an account?</span>
                            <Link to='/signup' className="underline">Let&apos;s Sign up!</Link>
                        </p>
                        <p className="mt-6 text-sm text-center text-gray-300">
                            Read our <a href="#" className="underline">terms</a> and <a href="#" className="underline">conditions</a>
                        </p>
                    </div>
                </div>
                {/* main form */}
                <div className="p-5 bg-white md:flex-1">
                    <h3 className="my-4 text-2xl font-semibold text-gray-700">Account Login</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="email" className="text-sm font-semibold text-gray-500">Email address</label>
                            <input
                                {...register("email", { required: true })}
                                type="email"
                                placeholder='Your email'
                                id="email"
                                autoFocus
                                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                            />
                            {errors.email && <span className='text-[red] text-xs'>This field is required</span>}
                        </div>
                        <div className="flex flex-col space-y-1 relative">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-sm font-semibold text-gray-500">Password</label>
                                <a href="#" className="text-sm text-blue-600 hover:underline focus:text-blue-800">Forgot Password?</a>
                            </div>
                            <input
                                {...register("password", { required: true })}
                                type={pass ? 'text' : "password"}
                                placeholder='***********'
                                id="password"
                                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                            />
                            {errors.email && <span className='text-[red] text-xs'>This field is required</span>}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 absolute top-8 right-1 text-gray-600" onClick={visiblePass}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
                            />
                            <label htmlFor="remember" className="text-sm font-semibold text-gray-500">Remember me</label>
                        </div>
                        <div>
                            <input
                                type="submit"
                                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4" value='Log in'
                            />
                        </div>
                        <div className="flex flex-col space-y-5">
                            <span className="flex items-center justify-center space-x-2">
                                <span className="h-px bg-gray-400 w-14"></span>
                                <span className="font-normal text-gray-500">or login with</span>
                                <span className="h-px bg-gray-400 w-14"></span>
                            </span>
                            <div className="flex flex-col space-y-4">
                                <a
                                    onClick={handleGoogleLogIn}
                                    href="#"
                                    className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-gray-800 rounded-md group hover:bg-gray-800 focus:outline-none"
                                >
                                    <span>
                                        <img className="w-[22px]" src={googleLogo} alt="google logo" />
                                    </span>
                                    <span className="text-sm font-medium text-red-800 group-hover:text-white">Google</span>
                                </a>
                                <a
                                    href="#"
                                    className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-blue-500 rounded-md group hover:bg-blue-500 focus:outline-none"
                                >
                                    <span>
                                        <svg
                                            className="w-5 h-5 text-gray-800 fill-current group-hover:text-white"
                                            viewBox="0 0 16 16"
                                            version="1.1"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                                            ></path>
                                        </svg>
                                    </span>
                                    <span className="text-sm font-medium text-gray-800 group-hover:text-white">Github</span>
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
