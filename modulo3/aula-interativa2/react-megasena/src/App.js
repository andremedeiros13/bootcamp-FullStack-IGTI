import React, { useState, useEffect } from 'react';

import Form from './components/Form';
import Numbers from './components/Numbers';
import PickedNumbers from './components/PickedNumbers';
import { useRef } from 'react';

function getEmptyArray() {
  const array = Array.from({ length: 60 }).map((_, index) => {
    const id = index + 1;
    const description = id.toString().padStart(2, '0');

    return {
      id,
      description,
      value: id,
      count: 0,
    };
  });

  return array;
}

function generateNumber(from = 1, to = 60) {
  return Math.max(from, Math.ceil(Math.random() * to));
}

export default function App() {
  const [numbers, setNumbers] = useState(getEmptyArray());
  const [pickedNumbers, setPickedNumbers] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [limit, setLimit] = useState(1);

  const canRun = useRef(false);

  useEffect(() => {
    if (!canRun.current) {
      return;
    }

    const interval = setInterval(() => {
      if (pickedNumbers.length === 6) {
        setIsCalculating(false);

        /**
         * Retorno simples. O clearInterval
         * é feito ao final do useEffect
         */
        return;
      }

      const newNumber = generateNumber();
      const newNumbers = Object.assign([], numbers);
      const newPickedNumbers = Object.assign([], pickedNumbers);

      const item = newNumbers.find((item) => item.value === newNumber);
      item.count++;

      if (item.count === limit) {
        newPickedNumbers.push(item.value);
      }

      setNumbers(newNumbers);
      setPickedNumbers(newPickedNumbers);
    }, 4);

    /**
     * Retorno obrigatório de um setInterval
     * em useEffect. Perceba que o retorno é,
     * na verdade, uma arrow function. Isso
     * faz parte da sintaxe do useEffect
     */
    return () => clearInterval(interval);
  }, [limit, numbers, pickedNumbers]);

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
  };

  const handleButtonClick = () => {
    setNumbers(getEmptyArray());
    setPickedNumbers([]);
    canRun.current = true;
    setIsCalculating(true);
  };

  return (
    <div className='container'>
      <h1 className='center'>React Megasena</h1>

      <Form
        onButtonClick={handleButtonClick}
        onLimitChange={handleLimitChange}
        data={{ isCalculating, limit }}
      />

      <Numbers numbers={numbers} pickedNumbers={pickedNumbers} />

      <PickedNumbers numbers={pickedNumbers} />
    </div>
  );
}
