import {Link, useNavigate} from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import useAuth from '../hooks/useAuth';
import Busqueda from './Busqueda';

export const Header = () => {

  const {handleBuscador, cerrarSesionProyectos} = useProyectos();
  const {cerrarSesionAuth} = useAuth();

  const navigate = useNavigate();
  //cerrar sesion
  const cerrarSesion = () => {
    cerrarSesionAuth();
    cerrarSesionProyectos();
    localStorage.removeItem('token');
  
  }

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
      <div className='flex items-center gap-4 justify-between md:justify-start' >
        <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:m-0">Uptask</h2>
        <button className='block md:hidden text-white text-sm bg-sky-600 rounded-md uppercase font-bold p-2 hover:bg-sky-700 transition-colors' type="button" onClick={cerrarSesion}>Cerrar sesión</button>
        </div>

        <div className='flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start' >
          <button className='font-bold uppercase text-gray-700 hover:text-black' type="button"><div className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 pr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
</svg><span className='hover:underline hover:underline-offset-4' onClick={handleBuscador}>Buscar Proyecto</span></div></button>
          <Link className="font-bold uppercase text-gray-700 hover:text-black hover:underline hover:underline-offset-4" to="/proyectos">Proyectos</Link>
          <button className='hidden md:block text-white text-sm bg-sky-600 rounded-md uppercase font-bold p-3 hover:bg-sky-700 transition-colors' type="button" onClick={cerrarSesion}>Cerrar sesión</button>

          <Busqueda />
        </div>
      </div>
    </header>
  )
}
