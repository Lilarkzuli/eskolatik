"use client";

// This is a React component that displays statistics for a specific student based on their ID.q
import React from 'react';
import { useParams } from 'react-router-dom';
import { UserCookies } from '@api/auth/login/cookie_verification/route';
const AlumnoStadistics = () => {
  UserCookies();
  const { id } = useParams();

  return (
    <div>
      <h1>Estadísticas del alumno {id}</h1>
    </div>
  );
}
  
export default AlumnoStadistics;

