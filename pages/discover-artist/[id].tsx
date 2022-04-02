import Image from "next/image";
import Title from "components/title";
import { useRouter } from "next/router";
import { LISTING_BANNERS } from "../../config/constants";
import landingdanceImg from "public/images/listing-dance.png";
import { Card, Button, Skeleton, Result } from "antd";
import {
  CloseOutlined,
  CheckOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRoutesContext } from "../../components/routeContext";
import { routeToHref } from "config/routes";
import { AppState } from "state";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import React, { useEffect, useState } from 'react';
import * as action from "../../state/action/categoryAction";

import LoginModal from '../../components/loginModal';
import { updateLoginData } from 'state/action';
import { LoginModalDetails } from 'types/model';
import NewUserModal from '../../components/newUserModal';
import Loader from "@/components/loader";

const { Meta } = Card;

const mapStateToProps = (state: AppState) => {
  const loggedInUserSlug = state.user.user?.slug;
  const selectedCategorySlug = state.category.selectedCategorySlug;
  const artists = state.category.artists;
  const isFetchingArtists = state.category.isFetchingArtists;
  const errorInFetchingArtists = state.category.errorInFetchingArtists;
  const loginModalDetails = state.home.loginModalDetails;
  const user = state.user.user;
  const artistListData = state.home.artistListDetails;
  const isLoggedIn = state.user.isLoggedIn;
  return { errorInFetchingArtists, selectedCategorySlug, artists, isFetchingArtists, loggedInUserSlug, loginModalDetails, user, artistListData, isLoggedIn };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchArtistsByCategorySlug: (slug: string) =>
    dispatch(action.fetchArtistsByCategorySlug(slug)),
  updateLoggedInData: (loginDetails: any) => dispatch(updateLoginData(loginDetails)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  loginModalDetails: LoginModalDetails,
  user: any,
  artistListData: any
} & ConnectedProps<typeof connector>;

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
  isLoggedIn,
  artistListData,
  isFetchingArtists,
  user,
  loginModalDetails,
  selectedCategorySlug,
  errorInFetchingArtists,
  loggedInUserSlug,
  fetchArtistsByCategorySlug,
  updateLoggedInData,
}: Props) => {

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const { toArtistProfile } = useRoutesContext();
  const router = useRouter();
  const { id: artSlug } = router.query;

  useEffect(() => {
    // we are not using selectedcategorySlug here because if a user is coming directly from a URL, 
    // the value of selectedCatgeorySlug is empty.
    fetchArtistsByCategorySlug(artSlug.toString());
    if (user) {
      if (user.new_user) {
        setShowProfileModal(true);
      }
    }
  }, [fetchArtistsByCategorySlug, artSlug, user]);

  useEffect(() => {
    if (artistListData.status === "success") {
      setShowProfileModal(false);
    }
  }, [artistListData]);

  const getUserSkills = (skills: []) => {
    const skillsHtml: JSX.Element[] = [];
    if (skills.length > 0) {
      skills.forEach((skill: string, index: number) => {
        skillsHtml.push(
          <>
            <span>{skill}</span>
            {index == skills.length - 1 ? (<></>) : (<span className="dot"></span>)}
          </>
        )
      })
    }
    return skillsHtml;
  }

  const getArtists = (color, category) => {
    const resultArtists: JSX.Element[] = [];
    if (artists.length == 0) {
      return <>
        <div style={{ textAlign: "center", paddingTop: "20px" }}>
          <h2 style={{ color: "grey" }}>Sorry, no artists found for <b>{category}!</b></h2>
        </div>
      </>
    }
    artists.forEach((artist, index) => {
      if (artist !== null) {
        resultArtists.push(
          //https://bbbootstrap.com/snippets/bootstrap-ecommerce-category-product-list-page-93685579
          <div className="row p-2 bg-white border rounded artits-card">
            <div className="col-md-3 mt-1 artist-profile-picture">
              <Image
                src={artist?.profile_pic_url}
                alt="cards"
                className="img-fluid img-responsive rounded"
                height={150}
                width={150}
              />
            </div>

            <div className="col-md-6 mt-1">
              <h5>{artist.first_name} {artist?.last_name}</h5>
              <div className="mt-1 mb-1 spec-1">
                {getUserSkills(artist.skills)}
              </div>
              <p className="text-justify para mb-0  break-word">{artist.bio}<br></br><br></br></p>
              <div className="mt-1 mb-1 spec-1">
                {artist.up_for_collab == "false" ? (
                  <span><CloseOutlined style={{ color: 'red', margin: '5px' }} />artist not available to collab </span>
                ) : (
                  <span><CheckOutlined style={{ color: 'green', margin: '5px' }} />artist available to collab </span>
                )}
                {/* <span><PictureOutlined /> Sample work uploaded</span> */}
              </div>
            </div>
            <div className="align-items-center align-content-center col-md-3 border-left mt-1">
              <div className="d-flex flex-column mt-4">
                <Button
                  block
                  type="primary"
                  ghost
                  style={{ whiteSpace: "normal", height: 'auto', marginBottom: '10px' }}>
                  <Link
                    key={index}
                    href={routeToHref(toArtistProfile(artist.slug))}
                    passHref
                  > Profile </Link>

                </Button>

                <Button
                  block
                  type="primary"
                  disabled={loggedInUserSlug == artist.slug || artist.up_for_collab == "false"}
                  style={{ whiteSpace: "normal", height: 'auto', marginBottom: '10px' }}>
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
      {loginModalDetails.openModal && !user.new_user && (
        <LoginModal />
      )
      }
      {showProfileModal && (
        <NewUserModal />
      )
      }
      {isFetchingArtists ? (
        <Loader />
      ) : (
        <div>
          {!isLoggedIn ? (
            <>
              <div className="fluid discoverArtists__listingPageContainer" style={{ marginTop: "10%", marginBottom: "15%" }}>
                <div className="discoverArtists__listingPageCoverContainer">
                  <Result
                    title="Login to your account so see the artists you can collaborate with!"
                    extra={
                      <Skeleton active />
                    }
                  />
                </div>
              </div>
            </>
          ) : (
            <div>
              <Title title="Discover Artist" />
              <div className="fluid discoverArtists__listingPageContainer" style={{ marginTop: "10%", marginBottom: "15%" }}>
                <div className="discoverArtists__listingPageCoverContainer">
                  <div className="row ">
                    <div className="col-sm-6" style={{ backgroundColor: getListingHeaderData(artSlug)["background_color"] }}>
                      <div className="discoverArtists_desktopCoverTextContainer">
                        {Object.keys(getListingHeaderData(artSlug)).length !== 0 ? (
                          <div>
                            <h1>
                              {artists.length} {getListingHeaderData(artSlug)["heading"]}<br></br>
                            </h1>
                            <h3>
                              {getListingHeaderData(artSlug)["sub_heading"]}
                            </h3>
                          </div>
                        ) : (
                          <div>
                            <h1>
                              {artists.length} artists to work with on your next big hit.<br></br>
                            </h1>
                            <h3>
                              send them a collab request to see if they are available.
                            </h3>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-6" style={{ backgroundColor: getListingHeaderData(artSlug)["background_color"] }}>
                      <Image
                        layout="responsive"
                        objectFit="contain"
                        src={getListingHeaderData(artSlug)["image"]}
                        alt="Landing page" />
                    </div>
                  </div>
                </div>
                <div className="col-md-12 listingContainer">
                  {getArtists(getListingHeaderData(artSlug)["background_color"], getListingHeaderData(artSlug)["category"])}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default connector(DiscoverArtist);