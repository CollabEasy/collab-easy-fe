import Title from './components/title'
import { useSelector, useDispatch } from 'react-redux'
export default function Home() {
  const myState = useSelector((state) => state.homeReducer);

  console.log(myState, '<==== ');
  return (
    <div className='container'>
      <Title title="Collab Easy" />
      <h1>Collab Web App</h1>
    </div>
  )
}