
import connection from "@api/auth/connect_mysql";
// import { setCookie, deleteCookie, getCookie, getCookies, hasCookie } from 'cookies-next/server';
import { cookies } from 'next/headers';
export async function POST(request) {
  try {
    
    const conn = await connection;
    //controla que exista la cookie de usuario y si no envia error, sino continua
    const cookieStore = cookies();
    const usuarioCookie = cookieStore.get('usuario');

    if (!usuarioCookie) {
      return new Response(JSON.stringify({ error: "No se encontró la cookie de usuario" }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    let usuario;
    //parsea la cookie para poder usarla
    try {
      usuario = JSON.parse(usuarioCookie.value);
    } catch (parseError) {
      return new Response(JSON.stringify({ error: "Formato de cookie inválido" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const idprofe = usuario.Id_Profesor;
    //hace la query
    console.log(idprofe)
    const [rows] = await conn.execute(
      "SELECT a.Id_Alumno, a.Nombre, a.Apellido, c.Id_Clase, c.Nombre_Clase, cu.Id_Curso, cu.Nombre_Curso, cu.Año_escolar FROM Profesores p JOIN Clase_Profesor cp ON p.Id_Profesor = cp.Id_Profesor JOIN Clases c ON cp.Id_Clase = c.Id_Clase JOIN Cursos cu ON c.Id_Curso = cu.Id_Curso JOIN Clase_Alumno ca ON c.Id_Clase = ca.Id_Clase JOIN Alumnos a ON ca.Id_Alumno = a.Id_Alumno WHERE p.Id_Profesor = ? ORDER BY a.Id_Alumno, c.Id_Clase",
      [idprofe]
    );
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error("Error del servidor:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
