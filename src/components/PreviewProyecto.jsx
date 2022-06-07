import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const PreviewProyecto = ({proyecto}) => {
  const { auth } = useAuth();
  const { nombre, _id, cliente, creador} = proyecto;
  return (
    <div className='border-b p-5 flex flex-col md:flex-row justify-between hover:bg-slate-200 transition-color duration-300'>
      <div className='flex items-center gap-2'>
      <p className='flex-1'>{nombre} <span className='bg-gray-400 text-white rounded-xl p-2 text-xs uppercase'>{cliente}</span></p>
      {auth._id !== creador && <p className='px-2 py-1 text-xs rounded-xl text-white bg-green-500 font-bold uppercase'>Colaborador</p>}
      
      </div>
      
      <Link to={`${_id}`} className='text-gray-600 hover:text-gray-800 font-bold text-sm'>Ver proyecto</Link>
      
    </div>
  )
}
