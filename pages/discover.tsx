import Title from 'components/title'
import { useSelector } from 'react-redux'
import { AppState } from 'types/core';

const Login = () => {
  const myState = useSelector((state: AppState) => {
    return state.home
  });

  console.log(myState, '<==== ');
  return (
    <div className='container'>
      <Title title="Discover" />
      <h1>Collab Discover</h1>
    </div>
  )
}

export default Login