import Title from '../components/title'
import { useSelector } from 'react-redux'

const Login = () => {
  const myState = useSelector((state) => state.homeReducer);

  console.log(myState, '<==== ');
  return (
    <div className='container'>
      <Title title="Login" />
      <h1>Collab Login</h1>
    </div>
  )
}

export default Login