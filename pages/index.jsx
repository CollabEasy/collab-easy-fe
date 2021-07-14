import Title from '../components/title'
import { useSelector } from 'react-redux'

const Home = () => {
  const myState = useSelector((state) => state.homeReducer);

  console.log(myState, '<==== ');
  return (
    <div className='container'>
      <Title title="Collab Easy" />
      <h1>Collab Web App</h1>
    </div>
  )
}

export default Home