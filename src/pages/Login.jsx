//rafc => crear estructura jsx
import {Link, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Alerta from '../components/Alerta';
import clientAxios from '../config/clientAxios';
import useAuth from '../hooks/useAuth';


const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [alerta,setAlerta] = useState({});

  const navigate = useNavigate();

  const {setAuth} = useAuth();

  //Detect login and redirect to projects
  useEffect(() => {
    if(localStorage.getItem('token')){
      navigate('/proyectos');
    }
  },[navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if([email,password].includes('')){
      setAlerta({
        msg:'Todos los campos son obligatorios',
        error:true
      });
      return;
    }

    try {
      const {data} = await clientAxios.post('/usuarios/login',{email,password});
     setAlerta({});
      localStorage.setItem('token',data.token);
      setAuth(data);
      navigate('/proyectos');
    }
    catch(error){
      console.log(error);
      setAlerta({
        msg:error.response.data.msg,
        error:true
      });
    }

  }

  const {msg} = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Inicia sesión y administra tus {''} <span className="text-slate-700">proyectos</span></h1>

        {msg && <Alerta alerta={alerta} />}
      <form onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg p-10">
        <div className="my-5">
          <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
          <input id="email" type="email" placeholder="email de registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" value={email} onChange={e =>setEmail(e.target.value)} />
        </div>
        <div className="my-5">
          <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">password</label>
          <input id="password" type="password" placeholder="password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" value={password} onChange={e =>setPassword(e.target.value)}  />
        </div>

        <input type="submit" value="Iniciar Sesión" className="bg-sky-700 mb-5 text-white py-3 w-full uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link to="/registrar" className="block text-center my-5 text-slate-500 uppercase text-sm">¿No tienes cuenta? Registrate.</Link>
        <Link to="/recuperar-password" className="block text-center my-5 text-slate-500 uppercase text-sm">¿Olvidaste el password? Recuperar.</Link>
      </nav>
    </>
  );
}

export default Login;