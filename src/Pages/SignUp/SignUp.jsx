import { useForm } from 'react-hook-form';
import googleLogo from '../../assets/icon-google.png'
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';
// TODO: use helmet 
const SignUp = () => {

    const [pass, setPass] = useState(false)
    const [cPass, setCPass] = useState(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUserWithPass, updateUser, googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGoogleLogIn = () => {
        googleLogin()
            .then((data) => {
                const savedUser = {
                    name: data.user.displayName, email: data.user.email, photo: data.user.photoURL, role: "student"
                }
                // console.log(savedUser)
                fetch('https://camp-sportopia-server-faisalahmednour.vercel.app/users', {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(savedUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Successfully Signed in...',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate('/');
                    })
            })
    }

    const onSubmit = data => {
        console.log(data.password, data.cpassword)
        if (data.password === data.cpassword) {
            createUserWithPass(data.email, data.password)
                .then(() => {
                    updateUser(data.name, data.photo)
                        .then(() => {
                            const savedUser = { name: data.name, email: data.email, photo: data.photo, role: "student" }
                            fetch('https://camp-sportopia-server-faisalahmednour.vercel.app/users', {
                                method: "POST",
                                headers: {
                                    "content-type": "application/json"
                                },
                                body: JSON.stringify(savedUser)
                            })
                                .then(res => res.json())
                                .then(data => {
                                    if (data.insertedId) {
                                        reset();
                                        Swal.fire({
                                            position: 'center',
                                            icon: 'success',
                                            title: 'Successfully Signed in...',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                        navigate('/');
                                    }
                                })
                        })
                        .catch((error) => {
                            console.log(error);
                        });
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
        else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Password did'nt match",
                showConfirmButton: false,
                timer: 1500
            })
        }

    };

    const visiblePass = () => {
        setPass(!pass)
    }

    const visibleCPass = () => {
        setCPass(!cPass)
    }

    return (
        <div className="font-mono bg-gray-400">
            {/* Container */}
            <div className="container mx-auto">
                <div className="flex justify-center items-center min-h-screen px-6">
                    {/* Row */}
                    <div className="w-full xl:w-3/4 lg:w-11/12 flex flex-col md:flex-row my-10 md:my-0">
                        {/* Col */}
                        <div
                            className="text-white bg-[url('https://www.imgacademy.com/sites/default/files/img-academy-soccer-camp-1.jpg')] bg-cover md:w-96 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly rounded-md md:rounded-none overflow-hidden"
                        >
                            <div className="w-full h-full p-4 py-6 text-white bg-black/75 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
                                <div className="my-3 text-3xl font-bold tracking-wider text-center">
                                    <Link to="/" className="">CampSportopia</Link>
                                </div>
                                <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
                                    Summer sports camps are a great way for kids to get active, learn new skills, and make new friends.
                                </p>
                                <p className="flex flex-col items-center justify-center mt-10 text-center">
                                    <span>Already have an account?</span>
                                    <Link to='/login' className="underline">Let&apos;s Log in!</Link>
                                </p>
                                <p className="mt-6 text-sm text-center text-gray-300">
                                    Read our <a href="#" className="underline">terms</a> and <a href="#" className="underline">conditions</a>
                                </p>
                            </div>
                        </div>
                        {/* Col */}
                        <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                            <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
                            <form onSubmit={handleSubmit(onSubmit)} className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                                <div className='space-y-3'>
                                    <div className="">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="name">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            {...register("name", { required: true })}
                                            placeholder="Your full name"
                                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="name"
                                        />
                                        {errors.name && <span className='text-[red] text-xs'>This field is required</span>}
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            {...register("email", { required: true })}
                                            placeholder="Your email"
                                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="email"
                                        />
                                        {errors.email && <span className='text-[red] text-xs'>This field is required</span>}
                                    </div>
                                    <div className="">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="image-url">
                                            Image URL
                                        </label>
                                        <input
                                            type="text"
                                            {...register("photo", { required: true })}
                                            placeholder="Paste image URL"
                                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="image-url"
                                        />
                                        {errors.photo && <span className='text-[red] text-xs'>This field is required</span>}
                                    </div>
                                </div>
                                <div className="my-4 grid grid-cols-1 md:grid-cols-2 md:justify-between">
                                    <div className="mb-4 md:mr-2 md:mb-0 relative">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            type={pass ? 'text' : "password"}
                                            {...register("password", {
                                                required: true,
                                                minLength: 6,
                                                maxLength: 16,
                                                pattern: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9.@!#*/()><$%&?]{6,16}$/
                                            })}
                                            placeholder="******************"
                                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="password"
                                        />
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 absolute top-9 right-1" onClick={visiblePass}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div className="md:ml-2 relative">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="c_password">
                                            Confirm Password
                                        </label>
                                        <input
                                            type={cPass ? 'text' : "password"}
                                            {...register("cpassword", { required: true })}
                                            placeholder="******************"
                                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="c_password"
                                        />
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 absolute top-9 right-1" onClick={visibleCPass}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div className='col-span-2 h-[10px]'>
                                        {errors.password?.type === 'minLength' && <span className='text-[red] text-xs'>Password length minimum 6 characters required</span>}
                                        {errors.password?.type === 'maxLength' && <span className='text-[red] text-xs'>Password length will be maximum 16 characters</span>}
                                        {errors.password?.type === 'pattern' && <span className='text-[red] text-xs'>Must have an uppercase, a lowercase, a digit and a special character </span>}
                                        {/* {errors.cpassword?.message && <span className='text-[red] text-xs'>they are not same bro</span>} */}
                                    </div>
                                </div>
                                <div className="mb-6 text-center">
                                    <input
                                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                        type="submit" value="Register Account"
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
                                            href="#"
                                            onClick={handleGoogleLogIn}
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
            </div>
        </div>
    );
};

export default SignUp;