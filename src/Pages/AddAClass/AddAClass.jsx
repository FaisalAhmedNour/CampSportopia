import {
    Card,
    Input,
    Typography,
} from "@material-tailwind/react";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

export default function AddAClass() {

    const { user } = useContext(AuthContext)
    // console.log(user);
    const { displayName, email } = user;
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        // console.log(data.password, data.cpassword)
        const addedClass = {
            imglink: data.image,
            name: data.name,
            totalSeat: data.seats,
            enrolled: 0,
            instructor: data.instructor,
            email: data.email,
            price: data.price,
            status: 'pending'
        }
        // console.log(addedClass);
        fetch('https://camp-sportopia-server-faisalahmednour.vercel.app/classes', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(addedClass)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    reset()
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Successfully Added class...',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    };

    return (
        <Card
            color="transparent"
            shadow={false}
            className="w-full text-center bg-white py-6 px-10"
        >
            <Helmet>
                <title>CampSportopia | Add a Class</title>
            </Helmet>
            <Typography variant="h4" color="blue-gray">
                Add A Class
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Enter your details to add a class.
            </Typography>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 mb-2 max-w-screen-lg text-left"
            >
                <div className="flex flex-col gap-5 mb-5">
                    <div>
                        <Input
                            {...register("name", { required: true })}
                            size="lg"
                            label="Class Name"
                        />
                        {errors.name && <span className='text-[red] text-xs ms-1'>This field is required</span>}
                    </div>
                    <div>
                        <Input
                            {...register("image", { required: true })}
                            size="lg"
                            label="Image"
                        />
                        {errors.image && <span className='text-[red] text-xs ms-1'>This field is required</span>}
                    </div>
                </div>
                <div className="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <Input
                            {...register("instructor", { required: true })}
                            size="lg"
                            label="Instructor's Name"
                            value={displayName}
                        />
                        {errors.instructor && <span className='text-[red] text-xs ms-1'>This field is required</span>}
                    </div>
                    <div>
                        <Input
                            {...register("email", { required: true })}
                            type="email"
                            size="lg"
                            label="Instructor's Email"
                            value={email}
                        />
                        {errors.email && <span className='text-[red] text-xs ms-1'>This field is required</span>}
                    </div>
                    <div>
                        <Input
                            {...register("seats", { required: true })}
                            type="number"
                            size="lg"
                            label="Available Seats"
                        />
                        {errors.seats && <span className='text-[red] text-xs ms-1'>This field is required</span>}
                    </div>
                    <div>
                        <Input
                            {...register("price", { required: true })}
                            type="number"
                            size="lg"
                            label="Price"
                        />
                        {errors.price && <span className='text-[red] text-xs ms-1'>This field is required</span>}
                    </div>
                </div>
                <input
                    type="submit"
                    className="mt-6 bg-[#2196f3] w-full py-2 text-white rounded-md"
                />
            </form>
        </Card>
    );
}