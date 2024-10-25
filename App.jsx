
import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Conversor from './Conversor';

function App() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [logueado, setLogueado] = useState(false);
  const [usuarioRegistro, setUsuarioRegistro] = useState('');
  const [claveRegistro, setClaveRegistro] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  function cambiarUsuario(evento) {
    setUsuario(evento.target.value);
  }

  function cambiarClave(evento) {
    setClave(evento.target.value);
  }

  function cambiarUsuarioRegistro(evento) {
    setUsuarioRegistro(evento.target.value);
  }

  function cambiarClaveRegistro(evento) {
    setClaveRegistro(evento.target.value);
  }
  

  async function ingresar() {
    try {
      const peticion = await fetch('http://localhost:3000/login?usuario=' + usuario + '&clave=' + clave,  { credentials: 'include' });
      if (peticion.ok) {
        setLogueado(true);
      } else {
        alert('Usuario o clave incorrectos');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Ocurrió un error al procesar la solicitud.');
    }
  }

  async function registrar() {
      const peticion = await fetch('http://localhost:3000/registro' + usuarioRegistro + '&clave' + clave, { credentials: 'include'})
        
        
      if (peticion.ok) {
        alert('usuario registrado')
        setLogueado(true)

      } else {
        alert('Error en el registro');
      }
    
  }





  async function validar () {
      const peticion = await fetch('http://localhost:3000/validar', { credentials: 'include' })
      if (peticion.ok){
        setLogueado(true)
      }
      }
    

   async function obtenerUsuarios() {
    const peticion = await fetch ( ' http://localhost:3000/usuario', { 
      credentials:'include'})
      if (peticion.ok) {
        const respuesta = await peticion.json()
        setUsuarios(respuesta)
      }
    }
    
   }



  useEffect(() => {

    validar();
    obtenerUsuarios()
  }, []);

  if (logueado) {
    return <Conversor />;
  }

  return (
    <>
      <h1>Inicio de sesión</h1>
      <input type="text" placeholder="Usuario" value={usuario} onChange={cambiarUsuario} />
      <input type="password" placeholder="Clave" value={clave} onChange={cambiarClave} />
      <button onClick={ingresar}>Ingresar</button>

      <h1>Registro</h1>
      <input type="text" placeholder="Usuario" value={usuarioRegistro} onChange={cambiarUsuarioRegistro} />
      <input type="password" placeholder="Clave" value={claveRegistro} onChange={cambiarClaveRegistro} />
      <button onClick={registrar}>Registrar</button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Clave</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.usuario}</td>
              <td>{usuario.clave}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App;
