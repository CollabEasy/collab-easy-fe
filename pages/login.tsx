import Title from 'components/title'
import { useSelector } from 'react-redux'
import { AppState } from 'types/core';

const Login = () => {
  const myState = useSelector((state: AppState) => state.home);

  console.log(myState, '<==== ');
  return (
    <div className='container'>
      <Title title="Login" />
      <h1>Collab Login</h1>
    </div>
  )
}

export default Login