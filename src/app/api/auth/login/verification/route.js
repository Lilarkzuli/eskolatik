import connection from '../../connect_mysql';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        const data = await request.json();
        const { usuario, password } = data;
        console.log( "llegamos aqui",usuario,password)
        // Conectamos a la base de datos
        const conn = await connection;
        
        // Primero obtenemos el usuario sin verificar la contraseña
        const [rows] = await conn.execute(
            'SELECT * FROM Profesores WHERE Usuario = ?',
            [usuario]
        );
        
        // Si no encontramos el usuario
        if (rows.length === 0) {
            return new Response(JSON.stringify({
                success: false,
                message: 'Usuario o contraseña incorrectos'
            }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        var contrabbdd=rows[0].Contraseña_hash
        // Comparamos la contraseña usando bcrypt
        const match = await bcrypt.compare(password, contrabbdd);

        if (match) {
            // Si la contraseña coincide
            const user = rows[0];
            delete user.Contraseña_hash; // No enviamos la contraseña al frontend
            
            // Guardar el objeto como una cadena JSON
       


            return new Response(JSON.stringify({
                success: true,
                message: 'Login exitoso',
                user: user
            }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } else {
            // Si la contraseña no coincide
            return new Response(JSON.stringify({
                success: false,
                message: 'Usuario o contraseña incorrectos'
            }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    } catch (error) {
        console.error('Error en el login:', error);
        return new Response(JSON.stringify({
            success: false,
            message: 'Error en el servidor: ' + error.message
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}