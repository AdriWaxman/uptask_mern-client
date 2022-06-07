import {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import clientAxios from '../config/clientAxios';
import Alerta from '../components/Alerta';

export const NuevoPassword = () => {
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [password, setPassword] = useState('');
  const[passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams();
  const {token} = params;



  useEffect(() => {
    const comprobarToken = async () => {

      try {

     
         await clientAxios.get(`/usuarios/recuperar-password/${token}`);
          setTokenValido(true);
        
      } catch (error) {
        console.log(error.response.data.msg);
        setAlerta({
          msg:error.response.data.msg,
          error:true
        });
      }
    }

    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password === '' ){
      setAlerta({
        msg:'El password es obligatorio',
        error:true
      });
    } else if(password.length < 6){
      setAlerta({
        msg:'El password debe tener al menos 6 caracteres',
        error:true
      });
      return;
    }
    try {
        const url = `/usuarios/recuperar-password/${token}`;
        const {data} = await clientAxios.post(url, {password});
        setAlerta({
          msg:data.msg,
          error:false
        });
        setPasswordModificado(true);
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
    <h1 className="text-sky-600 font-black text-6xl capitalize">Restablece tu {''} <span className="text-slate-700">password</span></h1>

    {msg && <Alerta alerta={alerta} />}
    {tokenValido && (
      <form onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg p-10">
    
      <div className="my-5">
        <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Nuevo password</label>
        <input id="password" type="password" placeholder="nuevo password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" value={password} onChange={e =>setPassword(e.target.value)} />
      </div>
      

      <input type="submit" value="Reestablecer password" className="bg-orange-500 mb-5 text-white py-3 w-full uppercase font-bold rounded hover:cursor-pointer hover:bg-orange-600 transition-colors" />
    </form>
    )}

{passwordModificado && (<Link to="/" className="block text-center text-slate-500 uppercase text-sm"> Iniciar sesión</Link>)}
  
  </>
  )
}
