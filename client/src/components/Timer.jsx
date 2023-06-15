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
            alert(`Time OVER! 당신의 점수는? ${props.score}`);
            localStorage.setItem("score", props.score);
            localStorage.setItem("game", "proverb");
            navigate("/infoinput");
        }
    }, [time]);

    return (
        <div style={{color: 'white'}}>
            <div>
                <span style={{fontSize: '10rem'}}>{parseInt(time / 60)}</span>
                <span style={{fontSize: '10rem'}}> : </span>
                <span style={{fontSize: '10rem'}}>{getSeconds(time)}</span>
            </div>
        </div>
    );
}

export default Timer