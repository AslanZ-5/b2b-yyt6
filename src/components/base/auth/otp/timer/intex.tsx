import { useRef, useState, useCallback, useEffect, FC } from "react";
import { useStyles } from "./styles";

interface ITimerProps {
  sendSms: () => Promise<void>;
  open: boolean;
}
export const Timer: FC<ITimerProps> = ({ sendSms, open }) => {
  const classes = useStyles();
  let timer = useRef<any>(null);
  const [timerSeconds, setTimerSeconds] = useState(60);

  const startTimer = useCallback(async () => {
    timer.current = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
  }, []);

  const clearTimer = useCallback(() => {
    clearInterval(timer.current);
  }, []);

  const resendOtp = async () => {
    clearTimer();
    await sendSms();
    setTimerSeconds(60);
    startTimer();
  };

  useEffect(() => {
    if (open) startTimer();
    return clearTimer;
  }, [clearTimer, open, startTimer]);

  return (
    <div className={classes.timerContainer}>
      {timerSeconds === 0 ? (
        <span className={classes.resendSms} onClick={resendOtp}>
          Отправить код еще раз
        </span>
      ) : (
        <span className={classes.timerSeconds}>
          Отправить код еще раз через {timerSeconds} сек
        </span>
      )}
    </div>
  );
};
