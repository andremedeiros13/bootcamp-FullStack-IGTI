import React from 'react';
import Number from './Number';

export default function Numbers({ numbers, pickedNumbers }) {
  return (
    <div style={styles.flexRow}>
      {numbers.map((number) => {
        const isPicked = pickedNumbers.some((item) => item === number.value);

        return (
          <div key={number.id}>
            <Number key={number.id} number={number} picked={isPicked} />
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
};
