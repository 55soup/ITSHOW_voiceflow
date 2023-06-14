import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const getSeconds = (time) => {
    const seconds = Number(time % 60);
    if(seconds < 10) {
        return "0" + String(seconds);
    } else {
        return String(seconds);
    }
}

const Timer = (props) => {
    const navigate = useNavigate();
    const [time, setTime] = useState(props.second); // (단위 : 초)
    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [time]);

    useEffect(() => {
        if (time < 0) {
            alert("Time OVER!");
            navigate("/infoinput", { score: props.count});
        }
    }, [time]);

    return (
        <div style={{color: 'white'}}>
            <h1 style={{fontSize: "3.5rem"}}>남은 시간</h1>
            <div>
                <span style={{fontSize: '5rem'}}>{parseInt(time / 60)}</span>
                <span style={{fontSize: '5rem'}}> : </span>
                <span style={{fontSize: '5rem'}}>{getSeconds(time)}</span>
            </div>
        </div>
    );
}

export default Timer