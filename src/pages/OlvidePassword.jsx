import {Link} from 'react-router-dom';
import {useState} from 'react';
import Alerta from '../components/Alerta';
import clientAxios from '../config/clientAxios';

export const OlvidePassword = () => {

  const [email, setEmail] = useState('');
  const [alerta,setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(email === '' || email.length < 5){
      setAlerta({
        msg:'El email es obligatorio',
        error:true
      });

      return;

    }
    try {
      
      const {data} = await clientAxios.post(`/usuarios/recuperar-password`, {email});
      console.log(data);

      setAlerta({
        msg:data.msg,
        error:false
      });

    } catch (error) {

      setAlerta({
        msg:error.response.data.msg,
        error:true
      });

    }
  }
  const {msg} = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Recupera tu {''} <span className="text-slate-700">password</span></h1>

      {msg && <Alerta alerta={alerta} />}

      <form onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg p-10">
      
        <div className="my-5">
          <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
          <input id="email" type="email" placeholder="email" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" value={email} onChange={e=> setEmail(e.target.value) } />
        </div>
       

        <input type="submit" value="Recuperar password" className="bg-sky-700 mb-5 text-white py-3 w-full uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" />
      </form>
      <nav className="lg:flex lg:justify-between">
      <Link to="/registrar" className="block text-center my-5 text-slate-500 uppercase text-sm">¿No tienes cuenta? Registrate.</Link>
        <Link to="/" className="block text-center text-slate-500 my-5 uppercase text-sm">¿Tienes cuenta? Inicia sesión.</Link>
      
      </nav>
    </>
  )
}
