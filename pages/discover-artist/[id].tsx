import Image from 'next/image';
import Title from '../../components/title';
import { useRouter } from 'next/router'
import landingPageImg from '../../public/images/listing.png';
import dancersImg from '../../public/images/dancers.png';
import { Card } from 'antd';

const { Meta } = Card;

const DiscoverArtist = () => {

  const router = useRouter()
  const { id } = router.query;
  console.log(router, id, '<=== ')

  const array = Array(7).fill(Math.random())

  return (
    <>
      <Title title="Discover Artist" />
      <div className="container fluid">
        <div className="row" style={{paddingTop: '3rem'}}>
              <Image src={landingPageImg} alt="Landing page" />
        </div>
        {/* <h1>Artist Page Dynamic <strong>{id.toUpperCase()}</strong></h1> */}

          <div className="row" style={{paddingTop:'2rem'}}>
          {array.map(_ => (
            <div key="" className="col-6 col-sm-6 col-md-6 col-lg-4 col-xl-3" style={{padding: '1rem'}}>
              <Card hoverable style={{ height: '100%' }} cover={<Image src={dancersImg} alt="cards" />}>
                <Meta title="Dancers" />
              </Card>
            </div>
          ))}
            
        </div> 
        </div>
    </>
  )
}

export default DiscoverArtist;