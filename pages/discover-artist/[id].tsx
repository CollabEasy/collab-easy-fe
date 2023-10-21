import Image from "next/image";
import { useRouter } from "next/router";
import { LISTING_METADATA, SIMILAR_CATEGORIES } from "../../constants/listing";
import { Card, Button, Breadcrumb } from "antd";
import { CloseOutlined, CheckOutlined, HomeOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRoutesContext } from "../../components/routeContext";
import { routeToHref } from "config/routes";
import { AppState } from "state";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import React, { useEffect, useState } from 'react';
import * as action from '../../state/action';
import LoginModal from '../../components/modal/loginModal';
import { updateLoginData } from 'state/action';
import { LoginModalDetails, CollabRequestData } from 'types/model';
import NewUserModal from '../../components/modal/newUserModal';
import Loader from "@/components/loader";
import SendCollabRequestModal from "../../components/modal/sendCollabRequestModal";
import { GetListingHeaderData } from "helpers/listingPageHelper";
import Layout from "@/components/layout";
import { GetUserSkills } from "helpers/artistHelper";

const { Meta } = Card;

const mapStateToProps = (state: AppState) => {
  const loggedInUserSlug = state.user.user?.slug;
  const artists = state.category.artists;
  const isFetchingArtists = state.category.isFetchingArtists;
  const errorInFetchingArtists = state.category.errorInFetchingArtists;
  const loginModalDetails = state.home.loginModalDetails;
  const user = state.user.user;
  const artistListData = state.home.artistListDetails;
  const isLoggedIn = state.user.isLoggedIn;
  const showCollabModal = state.collab.showCollabModal;
  return { showCollabModal, errorInFetchingArtists, artists, isFetchingArtists, loggedInUserSlug, loginModalDetails, user, artistListData, isLoggedIn };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchArtistsByCategorySlug: (slug: string) =>
    dispatch(action.fetchArtistsByCategorySlug(slug)),
  updateLoggedInData: (loginDetails: any) => dispatch(updateLoginData(loginDetails)),
  setShowCollabModalState: (show: boolean, id: string) => dispatch(action.setShowCollabModalState(show, id)),
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
  const [listingPageMetadata, setListingPageMetadata] = useState({});
  const [windowWidth, setWindowWidth] = useState(-1);
  const { toDiscover, toAllCategoryPage, toArtistProfile, toArtist } = useRoutesContext();
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
    setListingPageMetadata(getListingPageMetadata(artSlug));
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
    setWindowWidth(window.innerWidth);
  }, [artistListData]);

  const setUserIdForCollab = (userId) => {
    saveUserIdForCollab(userId);
  }

  // data from prismic.io returns the image src as an absolute url, so no need to set up the full url on loader....
  const prismicLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }

  const getSimilarCategories = (artSlug) => {
    const similarCategoriesHtml: JSX.Element[] = [];
    SIMILAR_CATEGORIES.forEach((element) => {
      if (element["slugs"].indexOf(artSlug) > -1) {
        element.similar_categories.forEach((category) => {
          if (category["slug"] != artSlug) {
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
              {artist.country && (
                <div className="d-flex flex-row artist-location">
                  <span>{artist.country}</span>
                  {artist.state && (
                    <span>, {artist.state}</span>
                  )}
                  {artist.city && (
                    <span>, {artist.city}</span>
                  )}
                </div>
              )}
              <div className="mt-1 mb-1 spec-1">
                {GetUserSkills(artist.skills)}
              </div>
              <p className="text-justify break-word common-p-style">{artist.bio}<br></br><br></br></p>
            </div>
            <div className="align-items-center align-content-center col-md-3 border-left mt-1">
              <div className="mt-1 mb-1 spec-1">
                {artist.up_for_collab == "false" ? (
                  <span className="common-text-style"><CloseOutlined style={{ color: 'red', margin: '5px' }} />Not available to collab! </span>
                ) : (
                  <span className="common-text-style"><CheckOutlined style={{ color: 'green', margin: '5px' }} />Available to collab! </span>
                )}
                {/* <span><PictureOutlined /> Sample work uploaded</span> */}
              </div>
              <div className="d-flex flex-column mt-4">
                {!isLoggedIn && (
                  <div className="login-message">
                    <p>Please, login to send a collab request</p>
                  </div>
                )}
                <Button
                  block
                  className="common-medium-btn"
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
                  className="common-medium-btn"
                  type="primary"
                  disabled={loggedInUserSlug == artist.slug || artist.up_for_collab == "false" || !isLoggedIn}
                  style={{ whiteSpace: "normal", height: 'auto', marginBottom: '10px' }}
                  onClick={() => {
                    setShowCollabModalState(true, '');
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

  const getListingPageMetadata = (artSlug) => {
    let genericMetadata = {
      "slug": "artist",
      "name": "Artist",
      "meta_title": "Artists available for collaboration",
      "meta_content": "Connect with like-minded artist and unleash your skills as an artist."
    };
    LISTING_METADATA.forEach((element) => {
      if (element["slug"] === artSlug) {
        genericMetadata = element;
      }
    })
    return genericMetadata;
  }

  const getBreadcrum = (category: string) => {
    return (
      <Breadcrumb>
        <Breadcrumb.Item>
          <a href={toDiscover().href}>Home</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href={toAllCategoryPage().href}>Categories</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {category}
        </Breadcrumb.Item>
      </Breadcrumb>
    );
  }

  return (
    <Layout
      title={listingPageMetadata["meta_title"]}
      name={"description"}
      content={listingPageMetadata["meta_content"]}
    >
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
        <>
        <div className="fluid discoverArtists__listingPageContainer">
          {windowWidth > 500 &&
            <>
              {getBreadcrum(listingPageMetadata["name"])}
            </>
          }
          <div className="discoverArtists__listingPageCoverContainer">
            <div className="row ">
              <div className="col-sm-8" style={{ backgroundColor: GetListingHeaderData(artSlug)["background_color"] }}>
                <div className="discoverArtists_desktopCoverTextContainer">
                  {Object.keys(GetListingHeaderData(artSlug)).length !== 0 ? (
                    <div>
                      <h1 className="common-h1-style">
                        {artists.length} {artists.length === 1 ? (<>artist</>) : (<>artists</>)} for {GetListingHeaderData(artSlug)["category"].toLowerCase()} to work with on your next big hit {artists.length >= 1 ? (<>🎉</>) : (<>😔</>)}<br></br>
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
              <div className="col-sm-4" style={{ backgroundColor: GetListingHeaderData(artSlug)["background_color"] }}>
                <div className="discoverArtists_desktopCoverImageContainer">
                  <Image
                    alt="Image Alt"
                    src={GetListingHeaderData(artSlug)["image"]}
                    height={250}
                    width={250}
                  />
                </div>
              </div>
            </div>
          </div>

          {getSimilarCategories(artSlug).length > 0 && (
            <div className="flex-row  d-flex align-items-center justify-content-center colors my-2 scrolling-wrapper">
              <div className="btn-group flex-wrap">
                {/* <p className="common-text-style" style={{ paddingLeft: "15px", paddingTop: "20px" }}>Similar categories:</p>  */}
                {getSimilarCategories(artSlug)}
              </div>
            </div>
          )}
          <div className="col-md-12 listingContainer">
            {getArtists(GetListingHeaderData(artSlug)["background_color"], GetListingHeaderData(artSlug)["category"])}
          </div>
        </div>
        </>
      )}
      {showCollabModal.show && (
        <SendCollabRequestModal
          otherUser={userIdForCollab}
          onCancel={() => {
            setShowCollabModalState(false, collabRequestDetails.id);
          }}
          collabDetails={collabRequestDetails}
        />
      )}
    </Layout >
  );
};

export default connector(DiscoverArtist);