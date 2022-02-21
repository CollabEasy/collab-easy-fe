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
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-12 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                  <Image
                    src={artist?.profile_pic_url}
                    alt="cards"
                    className="mx-auto img-fluid company-logo img-thumbnail rounded"
                    height={150}
                    width={150}
                  />
                </div>
                <div className="col-12 col-lg-9 col-md-9 col-sm-12 col-xs-12">
                  <h2 className="mb-0 font-weight-bold">{artist.first_name} {artist?.last_name}</h2>
                  <h6 className="font-weight-normal">Dance, Singing, Poetry</h6>
                  <p className="font-weight-normal">{artist.bio}</p>
                </div>
                <div className="col-12 col-lg-2 col-md-2 col-sm-12 detail">
                  <Button>
                    <Link
                      key={index}
                      href={routeToHref(toArtistProfile(artist.slug))}
                      passHref
                    > Profile </Link>
                  </Button>
                </div>
                <div className="col-12 col-lg-2 col-md-2 text-center text-wrap detail">
                    {/* <img *ngIf="item.payload.doc.data().price == 4" class="detail-icon" src="../../assets/images/extra/40.svg"> */}
                    <p>Number of Collabs</p>
                </div>

                <div className="col-12 col-lg-2 col-md-2 col-sm-12 text-center text-wrap detail">
                    {/* <img class="detail-icon" src="../../assets/images/extra/delivery.svg"> */}
                    {/* <p *ngIf="item.payload.doc.data()['med delivery']">Delivery Available</p>
                    <p *ngIf="!item.payload.doc.data()['med delivery']">Delivery Not Available</p> */}
                     <p>Up for collab</p>
                </div>

                <div className="col-12 col-lg-2 col-md-2 col-sm-12 text-center text-wrap detail">
                    {/* <img class="detail-icon" src="../../assets/images/extra/medical-insurance.svg"> */}
                    {/* <p *ngIf="item.payload.doc.data().insurance">Insurance Accepted</p>
                    <p *ngIf="!item.payload.doc.data().insurance">Insurance Not Accepted</p> */}
                     <p>Price Range</p>
                </div>
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
        <div className="discoverArtists__coverContainer">
          <Image
            layout="responsive"
            objectFit="contain"
            src={landingPageImg}
            alt="Landing page" />
        </div>
        <div className="col-12 listingContainer">
          {getArtists()}
        </div>
      </div>
    </>
  );
};

export default connector(DiscoverArtist);
