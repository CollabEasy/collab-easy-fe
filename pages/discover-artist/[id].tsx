import Image from "next/image";
import Title from "components/title";
import { useRouter } from "next/router";
import { LISTING_BANNERS } from "../../config/constants";
import { SIMILAR_CATEGORIES } from "../../config/constants";
import { Card, Button } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRoutesContext } from "../../components/routeContext";
import { routeToHref } from "config/routes";
import { AppState } from "state";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import React, { useEffect, useState } from 'react';
import * as action from '../../state/action';
import LoginModal from '../../components/loginModal';
import { updateLoginData } from 'state/action';
import { LoginModalDetails, CollabRequestData } from 'types/model';
import NewUserModal from '../../components/modal/newUserModal';
import Loader from "@/components/loader";
import NotAuthorised from "@/components/error/notAuthorised";
import SendCollabRequestModal from "../../components/modal/sendCollabRequestModal";

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
  const showCollabModal = state.collab.showCollabModal;
  return { showCollabModal, errorInFetchingArtists, selectedCategorySlug, artists, isFetchingArtists, loggedInUserSlug, loginModalDetails, user, artistListData, isLoggedIn };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchArtistsByCategorySlug: (slug: string) =>
    dispatch(action.fetchArtistsByCategorySlug(slug)),
  updateLoggedInData: (loginDetails: any) => dispatch(updateLoginData(loginDetails)),
  setShowCollabModalState: (show: boolean) => dispatch(action.setShowCollabModalState(show)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  loginModalDetails: LoginModalDetails,
  user: any,
  artistListData: any
} & ConnectedProps<typeof connector>;

const DiscoverArtist = ({
  artists,
  isLoggedIn,
  artistListData,
  isFetchingArtists,
  user,
  loginModalDetails,
  selectedCategorySlug,
  errorInFetchingArtists,
  showCollabModal,
  loggedInUserSlug,
  fetchArtistsByCategorySlug,
  setShowCollabModalState,
  updateLoggedInData,
}: Props) => {

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userIdForCollab, saveUserIdForCollab] = useState("");
  const [showLoader, setShowLoader] = useState(true);
  const { toArtistProfile, toArtist } = useRoutesContext();
  const router = useRouter();
  const { id: artSlug } = router.query;

  const emptyCollabDetails: CollabRequestData = {
    id: "",
    senderId: "",
    receiverId: "",
    collabDate: undefined,
    requestData: {
      message: "",
      collabTheme: ""
    },
    status: "",
    createdAt: undefined,
    updatedAt: undefined
  };
  const [collabRequestDetails, setCollabRequestDetails] = useState(emptyCollabDetails);

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

  const setUserIdForCollab = (userId) => {
    saveUserIdForCollab(userId);
  }

  const getCategoryFromSlug = (selectedCategorySlug) => {
    var selectedCategory = "Artists";
    for (var i = 0; i < SIMILAR_CATEGORIES.length; i++) {
      if (SIMILAR_CATEGORIES[i]["slugs"].indexOf(selectedCategorySlug) > -1) {
        SIMILAR_CATEGORIES[i]["similar_categories"].forEach((category) => {
          if (category["slug"] == selectedCategorySlug) {
            selectedCategory = category["name"];
          }
        })
      }
    }
    return selectedCategory;
  }
  const getListingHeaderData = (selectedCategorySlug) => {
    let general = {};
    for (var i = 0; i < LISTING_BANNERS.length; i++) {
      if (LISTING_BANNERS[i]["slugs"].indexOf(selectedCategorySlug) > -1) {
        LISTING_BANNERS[i]["category"] = getCategoryFromSlug(selectedCategorySlug);
        return LISTING_BANNERS[i];
      }
      else if (LISTING_BANNERS[i]["slugs"].indexOf("artist") > -1) {
        // This is a case where we do not have any data for header. Just return the generic one.
        general = LISTING_BANNERS[i];
      }
    }
    return general;
  }

  const getUserSkills = (skills: string[]) => {
    const skillsHtml: JSX.Element[] = [];
    if (skills.length > 0) {
      skills.forEach((skill: string, index: number) => {
        skillsHtml.push(
          <>
            <span className="common-text-style">{skill}</span>
            {index == skills.length - 1 ? (<></>) : (<span className="dot"></span>)}
          </>
        )
      })
    }
    return skillsHtml;
  }

  const getSimilarCategories = (selectedCategorySlug) => {
    const similarCategoriesHtml: JSX.Element[] = [];
    SIMILAR_CATEGORIES.forEach((element) => {
      if (element["slugs"].indexOf(selectedCategorySlug) > -1) {
        element.similar_categories.forEach((category) => {
          if (category["slug"] != selectedCategorySlug) {
            similarCategoriesHtml.push(
              <>
                <div style={{ paddingLeft: "15px", paddingTop: "15px" }}>
                  <Button >
                    <Link
                      href={toArtist().href + category["slug"]}
                      passHref
                    >
                      {category["name"]}</Link></Button>
                </div>
              </>
            )
          }
        })
      }
    })
    return similarCategoriesHtml;
  }

  // data from prismic.io returns the image src as an absolute url, so no need to set up the full url on loader....
  const prismicLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }

  const getArtists = (color, category) => {
    const resultArtists: JSX.Element[] = [];
    if (artists.length == 0) {
      return <>
        <div style={{ textAlign: "center", paddingTop: "20px" }}>
          <h2 className="common-h2-style">Sorry, no artists found for <b>{category}!</b></h2>
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
                loader={prismicLoader}
                src={artist?.profile_pic_url}
                alt="cards"
                className="img-fluid img-responsive rounded"
                height={150}
                width={150}
              />
            </div>

            <div className="col-md-6 mt-1 common-text-style">
              <h5 className="common-h5-style">{artist.first_name} {artist?.last_name}</h5>
              <div className="mt-1 mb-1 spec-1">
                {getUserSkills(artist.skills)}
              </div>
              <p className="text-justify break-word common-p-style">{artist.bio}<br></br><br></br></p>
              <div className="mt-1 mb-1 spec-1">
                {artist.up_for_collab == "false" ? (
                  <span className="common-text-style"><CloseOutlined style={{ color: 'red', margin: '5px' }} />{artist.first_name} is not available to collab! </span>
                ) : (
                  <span className="common-text-style"><CheckOutlined style={{ color: 'green', margin: '5px' }} />{artist.first_name} is available to collab! </span>
                )}
                {/* <span><PictureOutlined /> Sample work uploaded</span> */}
              </div>
            </div>
            <div className="align-items-center align-content-center col-md-3 border-left mt-1">
              <div className="d-flex flex-column mt-4">
                <Button
                  block
                  type="primary"
                  className="common-medium-btn"
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
                  className="common-medium-btn"
                  type="primary"
                  disabled={loggedInUserSlug == artist.slug || artist.up_for_collab == "false"}
                  style={{ whiteSpace: "normal", height: 'auto', marginBottom: '10px' }}
                  onClick={() => {
                    setShowCollabModalState(true);
                    setUserIdForCollab(artist.artist_id);
                  }}
                >
                  Send collab request
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
              <NotAuthorised />
            </>
          ) : (
            <div>
              <Title title="Discover Artist" />
              <div className="fluid discoverArtists__listingPageContainer" style={{ marginTop: "10%", marginBottom: "15%" }}>
                <div className="discoverArtists__listingPageCoverContainer">
                  <div className="row ">
                    <div className="col-sm-8" style={{ backgroundColor: getListingHeaderData(artSlug)["background_color"] }}>
                      <div className="discoverArtists_desktopCoverTextContainer">
                        {Object.keys(getListingHeaderData(artSlug)).length !== 0 ? (
                          <div>
                            <h1 className="common-h1-style">
                              {artists.length} {artists.length === 1 ? (<>artist</>) : (<>artists</>)} for {getListingHeaderData(artSlug)["category"].toLowerCase()} to work with on your next big hit!<br></br>
                            </h1>
                            {artists.length > 0 ? (
                              <h3 className="common-h3-style">
                                send them a collab request to see if they are available.
                              </h3>
                            ) : (
                              <h3 className="common-h3-style">
                                artists in similar categories might be interested to collab.
                              </h3>
                            )}

                          </div>
                        ) : (
                          <div>
                            <h1 className="common-h1-style">
                              {artists.length} artists to work with on your next big hit!<br></br>
                            </h1>
                            <h3 className="common-h3-style">
                              send them a collab request to see if they are available.
                            </h3>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-4" style={{ backgroundColor: getListingHeaderData(artSlug)["background_color"] }}>
                      <Image
                        alt="Image Alt"
                        className="discoverArtists_desktopCoverImageContainer"
                        src={getListingHeaderData(artSlug)["image"]}
                        layout="responsive"
                        objectFit="contain" // Scale your image down to fit into the container
                      />
                    </div>
                  </div>
                </div>
                <div className="flex-row flex-wrap d-flex align-items-center justify-content-center colors my-2 scrolling-wrapper">
                  <div className="btn-group">
                    <p className="common-text-style" style={{ paddingLeft: "15px", paddingTop: "20px" }}>Similar categories:</p> {getSimilarCategories(artSlug)}
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
      {showCollabModal && (
        <SendCollabRequestModal
          otherUser={userIdForCollab}
          onCancel={() => {
            setShowCollabModalState(false);
          }}
          collabDetails={collabRequestDetails}
        />
      )}
    </>
  );
};

export default connector(DiscoverArtist);