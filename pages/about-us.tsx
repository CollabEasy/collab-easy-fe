import { NextPage } from 'next'
import Title from '../components/title'

const GetInspired: NextPage<{}> = () => {
  return (
    <div className='container'>
      <Title title="About Us" />
      <h1>About Us</h1>
    </div>
  )
}

export default GetInspired