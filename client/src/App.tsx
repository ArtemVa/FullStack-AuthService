import { useContext, useEffect, useState } from "react";
import LoginForm from "./components/loginForm";
import { Context } from ".";
import {observer} from 'mobx-react-lite';
import { IUser } from "./models/response/IUser";
import UserService from "./services/UserService";

function App() {
  const {store} = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(()=>{
    if(localStorage.getItem('token')){
      store.checkAuth()
    }
  }, [])

  async function getUsers(){
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (error:any) {
      console.log(error);
    }
  }
  if(store.isLoading){
    return <div>Загрузка...</div>
  }
  if(!store.isAuth){
    return (
      <div>
      <LoginForm/>
      <button onClick={getUsers}>Получить пользователей</button>
      </div>
    )
  }
  return (
    <div>
    <h1>{store.isAuth ? "Пользователь авторизован": "Авторизуйтесь"}</h1>
    <h1>{store.user.isActivated ? 'Аккаунт подвтержден': 'Подтвердите аккаунт'}</h1>
    <button onClick={() => store.logout()}>Выйти</button>
    <div>
       <button onClick={getUsers}>Получить пользователей</button>
     </div>
     {users.map(user=>(
      <div key={user.email}>{user.email}</div>
    ))}
    </div>
  );
}

export default observer(App);
