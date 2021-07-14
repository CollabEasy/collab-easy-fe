import Title from '../components/title'
import { useSelector } from 'react-redux'

const SignUp = () => {
  const myState = useSelector((state) => state.homeReducer);

  console.log(myState, '<==== ');
  return (
    <div className='container'>
      <Title title="Sign Up" />
      <h1>Collab SignUp</h1>
    </div>
  )
}

export default SignUp