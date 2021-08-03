
import Title from './../../components/title';
import { useRouter } from 'next/router'

const DiscoverArtist = () => {

  const router = useRouter()
  const { id } = router.query;
  console.log(router, id, '<=== ')

  return (
    <div className='container'>
      <Title title="Discover Artist" />
      <h1>Artist Page Dynamic <strong>{id.toUpperCase()}</strong></h1>
    </div>
  )
}

export default DiscoverArtist;