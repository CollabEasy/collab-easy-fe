import Title from 'components/title'
import { useSelector } from 'react-redux'
import { AppState } from 'types/states';

const SignUp = () => {
  const myState = useSelector((state: AppState) => state.home);

  console.log(myState, '<==== ');
  return (
    <div className='container'>
      <Title title="Sign Up" />
      <h1>Collab SignUp</h1>
    </div>
  )
}

export default SignUp