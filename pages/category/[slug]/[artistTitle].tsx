import Layout from "@/components/layout";
import Loader from "@/components/loader";
import { CheckOutlined, CloseOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Card } from "antd";
import { routeToHref } from "config/routes";
import { GetUserSkills } from "helpers/artistHelper";
import {
  GetCategoryArtistTitle,
  GetCategoryMetadata,
} from "helpers/categoryHelper";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { AppState } from "state";
import { updateLoginData } from "state/action";
import { CollabRequestData, LoginModalDetails } from "types/model";
import { useRoutesContext } from "../../../components/routeContext";
import * as action from "../../../state/action";

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
  return {
    showCollabModal,
    errorInFetchingArtists,
    artists,
    isFetchingArtists,
    loggedInUserSlug,
    loginModalDetails,
    user,
    artistListData,
    isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchArtistsByCategorySlug: (slug: string) =>
    dispatch(action.fetchArtistsByCategorySlug(slug)),
  updateLoggedInData: (loginDetails: any) =>
    dispatch(updateLoginData(loginDetails)),
  setShowCollabModalState: (show: boolean, id: string) =>
    dispatch(action.setShowCollabModalState(show, id)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  loginModalDetails: LoginModalDetails;
  user: any;
  artistListData: any;
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
}) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userIdForCollab, saveUserIdForCollab] = useState("");
  const [showLoader, setShowLoader] = useState(true);
  const [windowWidth, setWindowWidth] = useState(-1);

  const {
    toFAQ,
    toDiscover,
    toAllCategoryPage,
    toArtistProfile,
    toCategoryArtistList,
    toUserCollabPage,
  } = useRoutesContext();
  const router = useRouter();

  const { slug: artSlug, artistTitle: artistTitle } = router.query;

  const emptyCollabDetails: CollabRequestData = {
    id: "",
    senderId: "",
    receiverId: "",
    collabDate: undefined,
    requestData: {
      message: "",
      collabTheme: "",
    },
    status: "",
    createdAt: undefined,
    updatedAt: undefined,
    proposalId: undefined,
  };
  const [collabRequestDetails, setCollabRequestDetails] =
    useState(emptyCollabDetails);
  const [categoryMetadata, setCategoryMetadata] = useState({});

  useEffect(() => {
    // we are not using selectedcategorySlug here because if a user is coming directly from a URL,
    // the value of selectedCatgeorySlug is empty.
    fetchArtistsByCategorySlug(artSlug.toString());
    if (user) {
      if (user.new_user) {
        setShowProfileModal(true);
      }
    }
    let categoryMetadata = GetCategoryMetadata(artSlug);
    setCategoryMetadata(categoryMetadata)
  }, [artSlug]);

  useEffect(() => {
    if (artistListData.status === "success") {
      setShowProfileModal(false);
    }
    setWindowWidth(window.innerWidth);
  }, [artistListData]);

  const setUserIdForCollab = (userId) => {
    saveUserIdForCollab(userId);
  };

  // data from prismic.io returns the image src as an absolute url, so no need to set up the full url on loader....
  const prismicLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  const getArtists = (category) => {
    const resultArtists: JSX.Element[] = [];
    if (artists.length == 0) {
      return (
        <>
          <div style={{ textAlign: "center", paddingTop: "20px" }}>
            <h2 className="common-h2-style">
              Sorry, no artists found for <b>{category}!</b>
            </h2>
          </div>
        </>
      );
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
              <h5 className="common-h5-style">
                {artist.first_name} {artist?.last_name}
              </h5>
              {artist.country && (
                <div className="artist-location">
                  <span>{artist.country}</span>
                  {artist.state && <span>, {artist.state}</span>}
                  {artist.city && <span>, {artist.city}</span>}
                </div>
              )}
              <div className="mt-1 mb-1 spec-1">
                {GetUserSkills(artist.skills)}
              </div>
              <p className="text-justify break-word common-p-style">
                {artist.bio}
                <br></br>
                <br></br>
              </p>
            </div>
            <div className="align-items-center align-content-center col-md-3 border-left mt-1">
              <div className="mt-1 mb-1 spec-1">
                {artist.up_for_collab == "false" ? (
                  <span className="common-text-style">
                    <CloseOutlined style={{ color: "red", margin: "5px" }} />
                    Not available to collab!{" "}
                  </span>
                ) : (
                  <span className="common-text-style">
                    <CheckOutlined style={{ color: "green", margin: "5px" }} />
                    Available to collab!{" "}
                  </span>
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
                  style={{
                    whiteSpace: "normal",
                    height: "auto",
                    marginBottom: "10px",
                  }}
                >
                  <Link
                    key={index}
                    href={routeToHref(toArtistProfile(artist.slug))}
                    passHref
                  >
                    Profile
                  </Link>
                </Button>

                <Button
                  block
                  className="common-medium-btn"
                  type="primary"
                  disabled={
                    loggedInUserSlug == artist.slug ||
                    artist.up_for_collab == "false" ||
                    !isLoggedIn
                  }
                  style={{
                    whiteSpace: "normal",
                    height: "auto",
                    marginBottom: "10px",
                  }}
                >
                  <Link
                    key={index}
                    href={routeToHref(toUserCollabPage(artist.slug))}
                    passHref
                  >
                    Send collab request
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        );
      }
    });

    return resultArtists;
  };

  const getBreadcrum = (category: string) => {
    return (
      <Breadcrumb>
        <Breadcrumb.Item>
          <a href={toDiscover().href}>Home</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href={toAllCategoryPage().href}>Collab Categories</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{category}</Breadcrumb.Item>
      </Breadcrumb>
    );
  };

  const getHeaderImage = () => {
    const imageUrl = categoryMetadata["cdn-image"];

    if (!imageUrl) {
      return null; // or return a placeholder image or handle the case when the image URL is not available
    }

    return (
      <Image
        alt={categoryMetadata["artist-title"] + " available to collaborate."}
        src={imageUrl}
        height={300}
        width={400}
        objectFit="contain"
        priority
      />
    );
  }

  return (
    <Layout
      title={GetCategoryMetadata(artSlug)["listing-data"]["meta-title"]}
      name={"description"}
      content={GetCategoryMetadata(artSlug)["listing-data"]["meta-content"]}
    >
      {isFetchingArtists ? (
        <Loader />
      ) : (
        <>
          <div className="discoverArtists__listingPageContainer">
            {windowWidth > 500 &&
              <>
                {getBreadcrum(categoryMetadata["name"])}
              </>
            }
            
            <div className="discoverArtists__listingPageCoverContainer">
              <div className="row">
                <div className="contest-heading-cnt col-xl-8 col-lg-8 col-md-10 col-sm-12">
                  <h1 className="common-h1-style">
                    {artists.length > 1 ? artists.length : ""}{" "}
                    {categoryMetadata["artist-title"]} to collab
                    with on your next big hit 😎<br></br>
                  </h1>
                  <div className="heading-line"></div>
                  <div className="">
                    {artists.length > 0 ? (
                      <h3 className="common-h3-style">
                        Send them a collab request to achieve your creativity
                        goals now!
                      </h3>
                    ) : (
                      <h3 className="common-h3-style">
                        Artists in similar categories might be interested to
                        collab!
                      </h3>
                    )}
                  </div>
                  <div className="current-contest-btn-cnt">
                    <div className="how-it-works-cnt">
                      <Link
                        href={routeToHref(toFAQ())}
                        passHref
                      >
                        <div className="how-cnt">
                          <span>How it Works</span>
                          <ArrowRightOutlined />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 d-none d-lg-flex align-items-center justify-content-center">
                  {getHeaderImage()}
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12 categoryArtistsListingContainer">
            {getArtists(
              categoryMetadata["name"]
            )}
          </div>
        </>
      )}
    </Layout>
  );
};

export default connector(DiscoverArtist);
