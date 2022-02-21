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
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

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
          <div
            key={index}
            className="col-6 col-sm-6 col-md-6 col-lg-4 col-xl-3"
            style={{
              padding: "2rem"
            }}
          >
            <Link
              key={index}
              href={routeToHref(toArtistProfile(artist.slug))}
              passHref
            >
              <Card
                hoverable
                // className="discoverArtists__artistsContainer"
                style={{
                  height: "100%",
                  //borderRadius: "15px",
                  textAlign: "center",
                  alignItems: "center",
                  backgroundColor: "rgb(0 0 0 / 2%)",
                }}
                cover={
                  <Image
                    src={artist?.profile_pic_url}
                    alt="cards"
                    height={228}
                    width={242}
                  />
                }
              >
                <Meta
                  title={artist.first_name}
                  description={artist.bio}
                />
              </Card>
            </Link>
          </div>
        );
      }
    });

    return resultArtists;
  };

  return (
    <>
      <Title title="Discover Artist" />
      <div className="fluid discoverArtists__listingContainer" style={{ marginTop: "10%", marginBottom: "15%" }}>
        <div className="discoverArtists__coverContainer">
          <Image
            layout="responsive"
            objectFit="contain"
            src={landingPageImg}
            alt="Landing page" />
        </div>
        <div className="row">
          {getArtists()}
        </div>
      </div>
    </>
  );
};

export default connector(DiscoverArtist);