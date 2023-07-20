import Title from 'components/title'
import { useSelector } from 'react-redux'
import { AppState } from 'types/states';

const Login = () => {
  const myState = useSelector((state: AppState) => {
    return state.home
  });

  return (
    <div className='container'>
      <h1>Collab Discover</h1>
    </div>
  )
}

export default Login