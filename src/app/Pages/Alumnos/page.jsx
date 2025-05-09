"use client"

import React, { useEffect, useState} from 'react';
import { UserCookies } from '@api/auth/login/cookie_verification/route';
import Header from '@snippets/Home/Home';
import { FcInfo } from "react-icons/fc";
import { getCookie } from 'cookies-next';
import Link from 'next/link'



function Alumnos() {
  UserCookies();
  const [usuario, setUsuario] = useState(null); // Iniciamos como null
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);




  useEffect(() => {

    const user = getCookie('usuario');
    setUsuario(user);
  }, []);


  useEffect(() => {
    fetch("/api/Alumno_data", {
      method: 'POST',
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);

        setAlumnos(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error:", error);
        setLoading(false);


      });
    console.log(alumnos)
  }, []);
  console.log(alumnos)


  return (
    <div>
      <Header moredata={usuario}></Header>
      <h2 className="text-xl font-bold mt-4 mb-2">Alumnos asignados:</h2>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
  {loading ? (
    <tbody>
      <tr>
        <td colSpan="5" className="px-6 py-4 text-center">
          <p className="text-gray-700 dark:text-white">Cargando alumnos...</p>
        </td>
      </tr>
    </tbody>
  ) : alumnos.length === 0 ? (
    <tbody>
      <tr>
        <td colSpan="5" className="px-6 py-4 text-center">
          <p className="text-gray-700 dark:text-white">No hay alumnos asignados.</p>
        </td>
      </tr>
    </tbody>
  ) : (
    <>
      <thead className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
        <tr>
          <th className="px-6 py-4 font-medium text-gray-900 dark:text-white">Nombre</th>
          <th className="px-6 py-4 font-medium text-gray-900 dark:text-white">Apellido</th>
          <th className="px-6 py-4 font-medium text-gray-900 dark:text-white">Clase</th>
          <th className="px-6 py-4 font-medium text-gray-900 dark:text-white">Curso</th>
          <th className="px-6 py-4 font-medium text-gray-900 dark:text-white">Acción</th>
        </tr>
      </thead>
      <tbody>
        {alumnos.map((alumno) => (
          <tr key={alumno.Id_Alumno}>
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{alumno.Nombre}</td>
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{alumno.Apellido}</td>
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{alumno.Nombre_Clase}</td>
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{alumno.Nombre_Curso}</td>
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"> <Link href={`/Pages/components/stadistics/alumno/${alumno.Id_Alumno}`}>aaaaaa</Link></td>

          </tr>
        ))}
      </tbody>
    </>
  )}
</table>

    </div>
  )

}

export default Alumnos