import dayjs from 'dayjs';
import { Clock } from 'phosphor-react';
import { useCallback, useEffect, useState } from 'react';

type Check = {
  type: 'out' | 'in';
  date: Date;
};

function App() {
  function load() {
    const oldCheckIn = window.localStorage.getItem('@academy:check-in');

    if (oldCheckIn) {
      setCheckIn(JSON.parse(oldCheckIn));
    }

    const oldCheckOut = window.localStorage.getItem('@academy:check-out');

    if (oldCheckOut) {
      setCheckOut(JSON.parse(oldCheckOut));
    }
  }

  const handleSubmitCheckIn = useCallback(() => {
    const oldCheckIn = window.localStorage.getItem('@academy:check-in');

    const newCheckIn: Check = {
      type: 'in',
      date: new Date(),
    };

    if (oldCheckIn) {
      const oldCheckInParsed = JSON.parse(oldCheckIn);

      window.localStorage.setItem(
        '@academy:check-in',
        JSON.stringify([...oldCheckInParsed, newCheckIn])
      );
    } else {
      window.localStorage.setItem(
        '@academy:check-in',
        JSON.stringify([newCheckIn])
      );
    }

    load();
  }, []);

  const handleSubmitCheckOut = useCallback(() => {
    const oldCheckOut = window.localStorage.getItem('@academy:check-out');

    const newCheckOut: Check = {
      type: 'out',
      date: new Date(),
    };

    if (oldCheckOut) {
      console.log(newCheckOut);

      const oldCheckOutParsed = JSON.parse(oldCheckOut);
      console.log(oldCheckOutParsed);

      window.localStorage.setItem(
        '@academy:check-out',
        JSON.stringify([...oldCheckOutParsed, newCheckOut])
      );
    } else {
      window.localStorage.setItem(
        '@academy:check-out',
        JSON.stringify([newCheckOut])
      );
    }

    load();
  }, []);

  const [checkIn, setCheckIn] = useState<Check[]>([]);
  const [checkOut, setCheckOut] = useState<Check[]>([]);

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="h-screen w-screen py-5 bg-zinc-800">
      <main className="flex flex-col items-center mx-auto max-w-4xl h-full px-4">
        <header className="mr-auto">
          <h1 className="text-white text-lg">Good night!</h1>
          <p className="text-white text-xs uppercase font-light">
            mr. andres dos santos
          </p>
        </header>

        <header className="flex items-center justify-between space-x-4 w-full mt-8">
          <button
            className="flex items-center justify-center space-x-2 border h-10 w-full rounded-full bg-green-500 border-green-500"
            onClick={handleSubmitCheckIn}
          >
            <p className="text-white text-xs uppercase">check in</p>
            <Clock weight="bold" className="text-white" />
          </button>

          <button
            className="flex items-center justify-center space-x-2 border h-10 w-full rounded-full bg-red-500 border-red-500"
            onClick={handleSubmitCheckOut}
          >
            <p className="text-white text-xs uppercase">check out</p>
            <Clock weight="bold" className="text-white" />
          </button>
        </header>

        <div className="mr-auto mt-11 w-full">
          <header className="flex items-center justify-between w-full mb-4">
            <h1 className="text-white text-xs uppercase">
              your checkin's and checkout's
            </h1>

            <p className="text-white text-xs font-light uppercase">
              total de {checkIn.length} no ano
            </p>
          </header>

          <section className="grid grid-cols-2">
            <ul className="flex flex-col items-center justify-between w-full">
              {checkIn.map((item) => (
                <li key={item.toString()} className="w-full my-2 text-start">
                  <p className="text-white text-xs font-light uppercase">
                    {dayjs(item.date).format('DD MMMM YYYY HH:mm')}
                  </p>
                </li>
              ))}
            </ul>

            <ul className="flex flex-col items-center w-full">
              {checkOut.map((item) => (
                <li className="w-full my-2 text-end">
                  <p
                    key={item.toString()}
                    className="text-white text-xs font-light uppercase"
                  >
                    {dayjs(item.date).format('DD MMMM YYYY HH:mm')}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </main>
  );
}

export default App;
