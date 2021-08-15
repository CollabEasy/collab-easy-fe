import { NextPage } from 'next'
import Title from 'components/title'

const Privacy: NextPage<{}> = () => {
  return (
    <div className='container'>
      <Title title="Privacy" />
      <h1>Privacy and concerns</h1>
    </div>
  )
}

export default Privacy