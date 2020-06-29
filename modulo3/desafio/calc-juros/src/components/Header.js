import React, { useState, useEffect } from 'react';

export default function Header() {
    const [montante, setMontante] = useState(1000);
    const [juros, setJuros] = useState(0.5);
    const [periodo, setPeriodo] = useState(1);

    const handleGradeChange = (event) => {
        // setGradeValue(+event.target.value);

        console.log(event.target);
    }
    return (
        <div>

            <div>
                <input id='inputValue' type='number' value={montante} />
            </div>


            {/* <div className='input-field'>
                <input id='inputJuros' type='number' value={jurosValue} min='-12' max='12' />
                <label className='active' htmlFor='inputJuros'>
                    Montante Inicial:
                </label>
            </div>


            <div className='input-field'>
                <input id='inputPeriod' type='number' value={period} min='1' max='12' />
                <label className='active' htmlFor='inputPeriod'>
                    Montante Inicial:
                </label>
            </div> */}



        </div>
    )
}
