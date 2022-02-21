import Image from "next/image";
import Title from "components/title";
import { useRouter } from "next/router";
import landingPageImg from "public/images/listing.png";
import dancersImg from "public/images/dancers.png";
import { Card, Button } from "antd";
import Link from "next/link";
import { useRoutesContext } from "../../components/routeContext";
import { routeToHref } from "config/routes";
import { AppState } from "state";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { useEffect } from "react";
import * as action from "../../state/action/categoryAction";
import { CloseOutlined, PictureOutlined } from '@ant-design/icons';

const { Meta } = Card;

const mapStateToProps = (state: AppState) => {
  const selectedId = state.category.selectedId;
  const artists = state.category.artists;
  return { selectedId, artists };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchArtistsByCategory: (id: number) =>
    dispatch(action.fetchArtistsByCategory(id)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const DiscoverArtist = ({
  artists,
  selectedId,
  fetchArtistsByCategory,
}: Props) => {
  const { toArtistProfile } = useRoutesContext();
  const router = useRouter();
  const { id: typeOfArtist } = router.query;

  useEffect(() => {
    console.log("calling api: ", selectedId);
    fetchArtistsByCategory(selectedId);
  }, [fetchArtistsByCategory, selectedId]);

  const getArtists = () => {
    const resultArtists: JSX.Element[] = [];
    console.log("artists : ", artists);
    artists.forEach((artist, index) => {
      console.log(artist);
      if (artist !== null) {
        console.log("pp url : ", artist.profile_pic_url);
        resultArtists.push(
          //https://bbbootstrap.com/snippets/bootstrap-ecommerce-category-product-list-page-93685579
          <div className="row p-2 bg-white border rounded artits-card">
            <div className="col-md-3 mt-1 artist-profile-picture">
              <Image
                src={artist?.profile_pic_url}
                alt="cards"
                //className="mx-auto img-fluid company-logo img-thumbnail rounded"
                className="img-fluid img-responsive rounded"
                height={150}
                width={150}
              />
            </div>

            <div className="col-md-6 mt-1">
              <h5>{artist.first_name} {artist?.last_name}</h5>
              <div className="mt-1 mb-1 spec-1">
                <span>Painter</span>
                <span className="dot"></span>
                <span>Poet</span>
                <span className="dot"></span>
                <span>Dance<br></br></span>
              </div>
              <p className="text-justify para mb-0  break-word">{artist.bio}<br></br><br></br></p>
              {/* <div className="mt-1 mb-1 spec-1">
                <span><CloseOutlined /> Available to collab </span>
                <span><PictureOutlined /> Sample work uploaded</span>
              </div> */}
            </div>

            <div className="align-items-center align-content-center col-md-3 border-left mt-1">
              <div className="d-flex flex-column mt-4">
                <Button block type="primary" ghost style={{ whiteSpace: "normal", height: 'auto', marginBottom: '10px' }}>
                  <Link
                    key={index}
                    href={routeToHref(toArtistProfile(artist.slug))}
                    passHref
                  > Profile </Link>

                </Button>

                <Button block type="primary" style={{ whiteSpace: "normal", height: 'auto', marginBottom: '10px' }}>
                  <Link
                    key={index}
                    href={routeToHref(toArtistProfile(artist.slug))}
                    passHref
                  >Send collab request</Link>
                </Button>
              </div>
            </div>
          </div>
        );
      }
    });

    return resultArtists;
  };

  return (
    <>
      <Title title="Discover Artist" />
      <div className="fluid discoverArtists__listingPageContainer" style={{ marginTop: "10%", marginBottom: "15%" }}>
        <div className="discoverArtists__desktopCoverContainer">
          <Image
            layout="responsive"
            objectFit="contain"
            src={landingPageImg}
            alt="Landing page" />
          
        </div>
        <div className="discoverArtists__mobileCoverContainer">
          <h1>
            Singers to work with on your next big hit.
          </h1>
          <p>
            send them a request to see if they are available.
          </p>
        </div>
        <div className="col-md-12 listingContainer">
          {getArtists()}
        </div>
      </div>
    </>
  );
};

export default connector(DiscoverArtist);
