
'use client';
import React, { useState,useEffect } from 'react';
import Link from 'next/link';

//HEADER

const Header = ({moredata}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [pasado,setPasado]= useState();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  useEffect(() => {
    if (!moredata) {  // Si moredata es null, undefined o vacío
      console.warn("moredata no está definido o está vacío");
      setLoading(true);
      return;
    }
  
    try {
      const data = JSON.parse(moredata);
      setPasado(data);
      console.log("moredata recibido en Header:", data);
      setLoading(false);
    } catch (error) {
      console.error("Error al parsear moredata:", error);
      setPasado(null);  // Asegúrate de resetear pasado si hay un error
      setLoading(true);
    }
  }, [moredata]);


if (Loading){


}
  
    
if(!Loading){
  return (
    <header className="backdrop-blur bg-white/80 border-b border-gray-200 shadow-sm sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <span className="text-3xl font-extrabold text-shadow-lg/30  text-blue-900  tracking-tight cursor-pointer">
            Eskolatik
          </span>
        </Link>

        {/* Botón hamburguesa */}
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className="flex flex-col justify-center items-center w-8 h-8 group"
          >
            <span
              className={`h-0.5 w-6 bg-gray-800 rounded transition-all ${
                menuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-gray-800 rounded mt-1.5 transition-all ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-gray-800 rounded mt-1.5 transition-all ${
                menuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            />
          </button>
        </div>

        {/* Menú de escritorio */}
        <nav className="hidden sm:flex space-x-8 text-base font-medium">
          <Link href="/Pages/Panel_Principal">
            <span className="text-gray-700 hover:text-blue-600 transition duration-200 cursor-pointer">
              Home
            </span>
          </Link>
          <Link href="/Clases">
            <span className="text-gray-700 hover:text-blue-600 transition duration-200 cursor-pointer">
              Clases
            </span>
          </Link>
          <Link href="/Pages/Alumnos">
            <span className="text-gray-700 hover:text-blue-600 transition duration-200 cursor-pointer">
              Alumnos
            </span>
          </Link>
          <Link href="/Opciones">
            <span className="text-gray-700 hover:text-blue-600 transition duration-200 cursor-pointer">
            {pasado.Usuario}
            </span>
          </Link>
        </nav>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200 px-4 pb-4 shadow-inner animate-fade-in-down">
          <div className="pt-4 space-y-3 text-base font-medium">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              <span className="block text-gray-700 hover:text-blue-600 transition cursor-pointer">
                Home
              </span>
            </Link>
            <Link href="/Clases" onClick={() => setMenuOpen(false)}>
              <span className="block text-gray-700 hover:text-blue-600 transition cursor-pointer">
                Clases
              </span>
            </Link>
            <Link href="/Alumnos" onClick={() => setMenuOpen(false)}>
              <span className="block text-gray-700 hover:text-blue-600 transition cursor-pointer">
                Alumnos
              </span>
            </Link>
             <Link href="/" onClick={() => setMenuOpen(false)}>
              <span className="block text-gray-700 hover:text-blue-600 transition cursor-pointer">
              {pasado.Usuario}
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
}
export default Header;

