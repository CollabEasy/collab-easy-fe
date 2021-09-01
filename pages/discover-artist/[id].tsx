import Image from 'next/image';
import Title from 'components/title';
import { useRouter } from 'next/router'
import landingPageImg from 'public/images/listing.png';
import dancersImg from 'public/images/dancers.png';
import { Card } from 'antd';
import Link from "next/link";
import { useRoutesContext } from "../../components/routeContext";
import { routeToHref } from "config/routes";
const { Meta } = Card;

const DiscoverArtist = () => {
  const { toArtistProfile } = useRoutesContext();
  const router = useRouter()
  const { id: typeOfArtist } = router.query;
  const array = Array(7).fill(new Date().getDate())
  console.log(typeOfArtist, '<--- typeOfArtist');
  return (
    <>
      <Title title="Discover Artist" />
      <div className="container fluid dynamic-artist-page">
        <div className="row" style={{ paddingTop: '3rem' }}>
          <Image src={landingPageImg} alt="Landing page" />
        </div>
        {/* <h1>Artist Page Dynamic <strong>{id.toUpperCase()}</strong></h1> */}
        <div className="row" style={{ paddingTop: '2rem' }}>
          {array.map((item, index) => (
            <div key={index} className="col-6 col-sm-6 col-md-6 col-lg-4 col-xl-3" style={{ padding: '1rem' }}>
              <Link key={index} href={routeToHref(toArtistProfile(typeOfArtist, item))} passHref>
                <Card hoverable style={{ height: '100%' }} cover={<Image src={dancersImg} alt="cards" />}>
                  <Meta title="Dancers" />
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default DiscoverArtist;
