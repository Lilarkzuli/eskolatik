import connection from '../../connect_mysql';
import Cookies from 'js-cookie';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const cookie = request.cookies.get('usuario')?.value;

    if (!cookie) {
      return new Response(JSON.stringify({ error: 'Cookie no encontrada' }), { status: 401 });
    }

    const data = JSON.parse(cookie);
    const idprofe = data.Id_Profesor;

    const conn = await connection;

    const query = `
      SELECT 
        a.Id_Alumno,
        CONCAT(a.Nombre, ' ', a.Apellido) AS Alumno,
        c.Nombre_Clase
      FROM Profesores p
      JOIN Clase_Profesor cp ON p.Id_Profesor = cp.Id_Profesor
      JOIN Clase_Alumno ca   ON cp.Id_Clase = ca.Id_Clase
      JOIN Alumnos a         ON ca.Id_Alumno = a.Id_Alumno
      JOIN Clases c          ON cp.Id_Clase = c.Id_Clase
      WHERE p.Id_Profesor = ?
      ORDER BY a.Id_Alumno;
    `;

    const [rows] = await conn.execute(query, [idprofe]);

    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Se ha producido un error:", error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), { status: 500 });
  }
}