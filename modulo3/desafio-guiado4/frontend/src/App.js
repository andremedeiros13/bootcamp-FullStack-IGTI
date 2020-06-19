import React, { useState, useEffect } from 'react';
import * as api from './api/apiService';
import Spinner from './components/Spinner';
import GradesControl from './components/GradesControl';

export default function App() {
  const [allGrades, setAllGrades] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    //async - await
    const getGrades = async () => {
      const grades = await api.getAllGrades();
      setTimeout(() => {
        setAllGrades(grades);
      }, 2000);
    }

    //promises

    // api.getAllGrades().then((grades) => {
    //   setTimeout(() => {
    //     setAllGrades(grades);
    //   }, 2000);
    // });

    getGrades();
  }, []);

  const handleDelete = () => {
    console.log('handledelete')
  }

  const handlePersist = () => {
    console.log('handlePersist');
  }


  return (
    <div>
      <h1 className='center'>Controle de notas</h1>
      {allGrades.length == 0 && <Spinner />}

      {allGrades.length > 0 && (
        <GradesControl
          grades={allGrades}
          onDelete={handleDelete}
          onPersist={handlePersist}
        />)}
    </div>
  )

}
