import Image from "next/image";
import Title from "components/title";
import { useRouter } from "next/router";
import { LISTING_BANNERS } from "../../config/constants";
import landingdanceImg from "public/images/listing-dance.png";
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
  const loggedInUserSlug = state.user.user?.slug;
  const selectedCategoryId = state.category.selectedCategoryId;
  const selectedCategorySlug = state.category.selectedCategorySlug;
  const artists = state.category.artists;
  return { selectedCategoryId, selectedCategorySlug, artists, loggedInUserSlug };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchArtistsByCategorySlug: (slug: string) =>
    dispatch(action.fetchArtistsByCategorySlug(slug)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const getListingHeaderData = (selectedCategorySlug) => {
  for (var i = 0; i < LISTING_BANNERS.length; i++) {
    if (LISTING_BANNERS[i]["slug"] == selectedCategorySlug) {
      return LISTING_BANNERS[i];
    }
  }
  return {};
}


const DiscoverArtist = ({
  artists,
  selectedCategoryId,
  selectedCategorySlug,
  loggedInUserSlug,
  fetchArtistsByCategorySlug,
}: Props) => {
  const { toArtistProfile } = useRoutesContext();
  const router = useRouter();
  const { id: artSlug } = router.query;

  console.log("Rabbal lets print ", artSlug);
  useEffect(() => {
    console.log("calling api: ", selectedCategoryId, selectedCategorySlug);
    fetchArtistsByCategorySlug(selectedCategorySlug);
  }, [fetchArtistsByCategorySlug, selectedCategorySlug]);

  const getArtists = () => {
    const resultArtists: JSX.Element[] = [];
    console.log("artists : ", artists);
    artists.forEach((artist, index) => {
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
                <Button block type="primary" ghost style={{ color: 'rgb(82, 120, 99)', borderColor: 'rgb(82, 120, 99)', whiteSpace: "normal", height: 'auto', marginBottom: '10px' }}>
                  <Link
                    key={index}
                    href={routeToHref(toArtistProfile(artist.slug))}
                    passHref
                  > Profile </Link>

                </Button>

                <Button block type="primary" disabled={loggedInUserSlug == artist.slug} style={{ color: 'white', borderColor: 'rgb(172, 206, 180)', backgroundColor: 'rgb(172, 206, 180)', whiteSpace: "normal", height: 'auto', marginBottom: '10px' }}>
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
        <div className="discoverArtists__listingPageCoverContainer">
          <div className="row ">
            <div className="col-sm-6" style={{ backgroundColor: "#BBE7C5" }}>
              <div className="discoverArtists_desktopCoverTextContainer">
                {Object.keys(getListingHeaderData(selectedCategorySlug)).length !== 0 ? (
                  <div>
                    <h1>
                      {getListingHeaderData(selectedCategorySlug)["heading"]}<br></br>
                    </h1>
                    <h3>
                      {getListingHeaderData(selectedCategorySlug)["sub-heading"]}
                    </h3>
                  </div>
                ) : (
                  <div>
                    <h1>
                      Artists to work with on your next big hit.<br></br>
                    </h1>
                    <h3>
                      send them a collab request to see if they are available.
                    </h3>
                  </div>
                )}
              </div>
            </div>
            <div className="col-sm-6" style={{ backgroundColor: "#BBE7C5" }}>
              <Image
                layout="responsive"
                objectFit="contain"
                // we have to update the src to use dynamic image instead of fixed image.
                src={landingdanceImg}
                alt="Landing page" />
            </div>
          </div>
        </div>
        <div className="col-md-12 listingContainer">
          {getArtists()}
        </div>
      </div>
    </>
  );
};

export default connector(DiscoverArtist);