"use client"
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Aquí deberías obtener los datos del usuario de una fuente segura
    // Por ejemplo, una cookie o localStorage
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        setUser(userData);
      } catch (error) {
        console.error('Error al parsear datos del usuario:', error);
        // Si hay un error, redirigir al login
        window.location.href = '/login';
      }
    } else {
      // Si no hay datos de usuario, redirigir al login
      window.location.href = '/login';
    }
  }, []);

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Eskolatik</h1>
          <div className="flex items-center">
            <span className="mr-4">Bienvenido, {user.Nombre || user.Usuario}</span>
            <button 
              className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded"
              onClick={() => {
                localStorage.removeItem('userData');
                window.location.href = '/login';
              }}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Panel de Control</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Estudiantes</h3>
            <p>Gestiona tus estudiantes y clases</p>
            <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded">
              Ver estudiantes
            </button>
          </div>
          
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Calificaciones</h3>
            <p>Gestiona las calificaciones de tus estudiantes</p>
            <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded">
              Ver calificaciones
            </button>
          </div>
          
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Reportes</h3>
            <p>Genera reportes y estadísticas</p>
            <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded">
              Ver reportes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 