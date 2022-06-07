//import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import clientAxios from '../config/clientAxios';
import Alerta from '../components/Alerta';

export const ConfirmarCuenta = () => {
  
  const [alerta, setAlerta] = useState({});
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  
  const {id} = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`;
        const {data} = await clientAxios(url); //Metodo GET
        setAlerta({
          msg:data.msg,
          error:false
        })
        setCuentaConfirmada(true);
      } catch (error) {
        setAlerta({
          msg:error.response.data.msg,
          error:true
        })
      }
    }
    confirmarCuenta();
    setTimeout(()=>{
      navigate('/');
    },3000);
  }, []);

  const {msg} = alerta;

  return (
    <>
    <h1 className="text-sky-600 font-black text-6xl capitalize">Confirmar tu {''} <span className="text-slate-700">cuenta</span></h1>

   
    <div className='mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white'>
      {msg && <Alerta alerta={alerta} />}
      {cuentaConfirmada && (<Link to="/" className="block text-center text-slate-500 uppercase text-sm"> Iniciar sesión</Link>)}

    </div>
  </>
  )
}
