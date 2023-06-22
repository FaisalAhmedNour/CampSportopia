import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProviders';

const Timer = () => {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const deadline = "August, 31, 2023";

    const getTime = () => {
        const time = Date.parse(deadline) - Date.now();

        setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
    };

    useEffect(() => {
        const interval = setInterval(() => getTime(deadline), 1000);
        return () => clearInterval(interval);
    }, []);

    const { isDark } = useContext(AuthContext);

    const timerTemp = (time, title) => <div>
        <div className={`w-12 h-12 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full ${isDark ? 'bg-[#263238]' : 'bg-white'} flex justify-center items-center`}>
            <span className='text-[#7a7a7a] font-semibold text-sm md:text-lg lg:text-2xl'>{time.toString().length === 1 ? `0${time}` : time}</span>
        </div>
        <p className={`text-center text-xs md:text-sm lg:text-lg font-medium uppercase ${isDark ? 'text-[#b6b6be]' : 'text-white'}`}>{title}</p>
    </div>

    return (
        <div className="timer flex justify-around gap-10">
            {
                timerTemp(days, 'days')
            }
            {
                timerTemp(hours, 'hours')
            }
            {
                timerTemp(minutes, 'minutes')
            }
            {
                timerTemp(seconds, 'seconds')
            }
        </div>
    );
};

export default Timer;