import {useState} from 'react';
import useProyectos from '../hooks/useProyectos';
import Alerta from './Alerta';


export const FormularioColaborador = () => {

  const [email,setEmail] = useState('');

  const {mostrarAlerta, alerta, submitColaborador} = useProyectos();

  const handleSubmit = e => {
    e.preventDefault();
    
    if(email === ''){
      mostrarAlerta({
        msg: 'El email es obligatorio',
        error:true
      });
      return;
    }

    submitColaborador(email);
  }

  const {msg} = alerta;


  return (
    <form onSubmit={handleSubmit} className='bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow'>
      {msg && <Alerta alerta={alerta} />}
      <div className="mb-5 flex-col">
        <label className='text-gray-700 uppercase font-bold text-sm' htmlFor="email">Email colaborador</label>
        <input className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" id="email" type="email"  placeholder="Email colaborador" value={email} onChange={e => setEmail(e.target.value)}/>
      </div>
      <input type="submit" className='bg-sky-600 hover:bg-sky-700 text-white uppercase w-full p-3 font-bold rounded transition-colors text-sm cursor-pointer' value='Buscar colaborador' />
    </form>
  )
}
