import Title from '../components/title'
import { useSelector } from 'react-redux'
import { AppState } from '../types/core';

const Home = () => {
  const myState = useSelector((state: AppState) => state.home);

  console.log(myState, '<==== ');
  return (
    <div className='container'>
      <Title title="Collab Easy" />
      <h1>Collab Web App</h1>
    </div>
  )
}

export default Home