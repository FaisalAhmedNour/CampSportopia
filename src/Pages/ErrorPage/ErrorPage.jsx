import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='text-center'>
            <img
            className='mx-auto mt-20 mb-5' 
            src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?size=626&ext=jpg&ga=GA1.1.944769429.1680277572&semt=ais" alt="" />
            <Link to='/'>
                <Button
                    className='mx-auto'
                >Go Home</Button>
            </Link>
        </div>
    );
};

export default ErrorPage;