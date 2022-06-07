import {useState, useEffect, createContext} from 'react';
import { useNavigate } from 'react-router-dom';
import clientAxios from '../config/clientAxios';


const AuthContext = createContext();

const AuthProvider = ({children}) => {

  const [auth,setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const authUsuario = async (e) => {
      if(!token){
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
      }

      try {
        const {data} = await clientAxios('/usuarios/perfil',config);
        setAuth(data);
        
      }
      catch(error){
        setAuth({});
      } finally{
        setLoading(false);
      }
      
    }
    authUsuario();
  },[]);

  const cerrarSesionAuth = () => {
    setAuth({});
   
  }


  return(
    <AuthContext.Provider
    value={{
      auth,
      loading,
      setAuth,
      cerrarSesionAuth
    }}>
      {children}
    </AuthContext.Provider>
  )

}

export {AuthProvider};

export default  AuthContext;