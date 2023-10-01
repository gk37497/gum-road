import { useEffect, useState } from 'react';

type UseCountdownProps = {
   initialTime: number; // initial time in seconds
   onCompleted?: () => void;
};

export function useCountdown({ initialTime, onCompleted }: UseCountdownProps) {
   const [timeLeft, setTimeLeft] = useState<number>(initialTime);

   const start = (time: number) => {
      setTimeLeft(time);
   };

   useEffect(() => {
      if (timeLeft <= 0) {
         onCompleted?.();
         return;
      }

      const timerId = setInterval(() => {
         setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      // eslint-disable-next-line consistent-return
      return () => clearInterval(timerId);
   }, [timeLeft, onCompleted]);

   return { timeLeft, start };
}
