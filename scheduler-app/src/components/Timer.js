import '../styles/Timer.css';
import { useEffect, useState } from "react";
import Navbar from './Navbar';

const useTime = (time) => {
    const [total, setTotal] = useState(time);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;

        // if time finished, don't do anything
        if (total <= 0) return;

        if (isRunning)
            interval = setInterval(() => {
               if (total > 0) setTotal(total => total - 1000); 
            }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, total]);

    return {
        total,
        hours: `${parseInt(total/(1000*60*60) % 60)}`, 
        minutes: `${parseInt(total/(1000*60) % 60)}`, 
        seconds: `${parseInt(total/1000 % 60)}`,
        isRunning,
        setIsRunning,
        setTotal
    }
}

const Timer = () => {
    const { total, hours, minutes, seconds, isRunning, setIsRunning, setTotal } = useTime(0);

    const handleInput = (type, sign = 1) => {
        // if decreasing time then sign is -1

        // if paused, don't change time
        if (isRunning) return;

        switch(type) {
        case 0:
            if ((hours === "0" && sign === -1) || (hours === "99" && sign === 1)) break;
            setTotal(total + sign*60*60*1000);
            break;
        case 1:
            if ((minutes === "0" && sign === -1) || (minutes === "59" && sign === 1)) break;
            setTotal(total + sign*60*1000);
            break;
        case 2:
            if ((seconds === "0" && sign === -1) || (seconds === "59" && sign === 1)) break;
            setTotal(total + sign*1000);
            break;
        default:
            break;
        }
    }

    return (
        <>
        <Navbar />
        <div className="timer-container">
            <div className="timer">
                <h1>{ isRunning ? "" : "Paused" }</h1>
                <div className={ total <= 0 ? "display over" : "display" }>
                    <div className="display-item">
                        <label>hh</label>
                        <span>{ hours.padStart(2, '0') }</span>
                    </div>
                    <div className="display-item">
                        <label>mm</label>
                        <span>{ minutes.padStart(2, '0') }</span>
                    </div>
                    <div className="display-item">
                        <label>ss</label>
                        <span>{ seconds.padStart(2, '0') }</span>
                    </div>
                </div>
                <div className="controls">
                    <div className="timer-values">
                        <div className="control">
                            <button onClick={ () => handleInput(0) }>+</button>
                            <button onClick={ () => handleInput(0, -1) }>-</button>
                        </div>
                        <div className="control">
                            <button onClick={ () => handleInput(1) }>+</button>
                            <button onClick={ () => handleInput(1, -1) }>-</button>
                        </div>
                        <div className="control">
                            <button onClick={ () => handleInput(2) }>+</button>
                            <button onClick={ () => handleInput(2, -1) }>-</button>
                        </div>
                    </div>
                    <div className="timer-control">
                        <button onClick={ () => {
                            if (!isRunning) return setIsRunning(true);
                            return setIsRunning(false);
                        } }>{ isRunning ? "Pause" : "Start" }</button>
                        <button onClick={ () => setTotal(0) }>Reset</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
 
export default Timer;