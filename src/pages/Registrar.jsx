import {useState} from 'react';
import {Link} from 'react-router-dom';
import Alerta from '../components/Alerta';
import clientAxios from '../config/clientAxios';

const Registrar = () => {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(nombre, email, password, repetirPassword);

    //Validar que los campos esten llenos
    if([nombre, email, password, repetirPassword].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error:true
      });
      return;
    };

    //Validar que las contraseñas coincidan
    if(password !== repetirPassword){
      setAlerta({
        msg: 'Las contraseñas no coinciden',
        error:true
      });
      return;
    }

    if(password.length < 6){
      setAlerta({
        msg: 'La contraseña debe tener al menos 6 caracteres',
        error:true
      });
      return;
    }

    setAlerta({});

    //Enviar el request al backend
   
    try {
      const {data} = await clientAxios.post(`/usuarios`, {
        nombre,
        email,
        password
      })
  
      setAlerta({
        msg: data.msg,
        error:false
        });
        setNombre('');
        setEmail('');
        setPassword('');
        setRepetirPassword('');
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error:true
        });
     
    }
  }


  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Crea tu cuenta y administra tus {''} <span className="text-slate-700">proyectos</span></h1>

      {msg && <Alerta alerta={alerta} />}

      <form onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg p-10">
      <div className="my-5">
          <label htmlFor="name" className="uppercase text-gray-600 block text-xl font-bold">Nombre de Usuario</label>
          <input id="name" type="text" placeholder="nombre de usuario" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" value={nombre} onChange={e=> setNombre(e.target.value)} />
        </div>
        <div className="my-5">
          <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
          <input id="email" type="email" placeholder="email de registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" value={email} onChange={e=> setEmail(e.target.value)} />
        </div>
        <div className="my-5">
          <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">password</label>
          <input id="password" type="password" placeholder="password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" 
          value={password} onChange={e=> setPassword(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label htmlFor="repetirPassword" className="uppercase text-gray-600 block text-xl font-bold">Repetir password</label>
          <input id="repetirPassword" type="password" placeholder="password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" value={repetirPassword} onChange={e=> setRepetirPassword(e.target.value)} />
        </div>

        <input type="submit" value="Registrarse" className="bg-orange-500 mb-5 text-white py-3 w-full uppercase font-bold rounded hover:cursor-pointer hover:bg-orange-600 transition-colors" />
      </form>
      <nav className="lg:flex lg:justify-center">
        <Link to="/" className="block text-center text-slate-500 uppercase text-sm">¿Tienes cuenta? Inicia sesión.</Link>
        
      </nav>
    </>
  );
}

export default Registrar;