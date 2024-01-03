/* eslint-disable @next/next/no-img-element */
import { Tabs, Input, Button, Comment, Tag, message, Breadcrumb, List } from "antd";
import { AppState } from "state";
import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import { routeToHref } from "config/routes";
import LoginModal from "@/components/modal/loginModal";
import NewUserModal from "@/components/modal/newUserModal";
import { Card, notification } from "antd";
import { Collapse } from "antd";
import { FireOutlined, FireFilled, ReadOutlined } from "@ant-design/icons";
import * as action from "../../state/action";
import Loader from "@/components/loader";
import { Alert, Space } from 'antd';
import { GetContestEligibleCategoriesTags, GetContestMetadata, GetContestStatus, GetDateString, getContestCountdownHeading } from "helpers/contest";
import UploadContestArtworkPage from "@/components/contestArtworkPage";
import Link from "next/link";
import { useRoutesContext } from "components/routeContext";
import { Config } from "config/config";
import Layout from "@/components/layout";
import SampleTile from "@/components/sampleTile";
import GenericActionBanner from "@/components/genericActionBanner";
import CountdownTimer from "@/components/asset/countdownTimer";

const { TextArea } = Input;
const { TabPane } = Tabs;
const { Meta } = Card;
const { Panel } = Collapse;

const mapStateToProps = (state: AppState) => {
  const user = state.user.user;
  const isLoggedIn = state.user.isLoggedIn;
  const loginModalDetails = state.home.loginModalDetails;
  const artistListData = state.home.artistListDetails;
  const contest = state.contest;
  const allSubmissions = state.contestSubmission.allSubmissions;
  const allSubmissionsVotes = state.contestSubmissionVote.artistSubmissionVotes;
  const isFetchingContest = state.contest.isFetchingContest;
  const isFetchingSubmissions = state.contestSubmission.isFetchingSubmissions;
  const isFetchingSubmissionVotes =
    state.contestSubmissionVote.isFetchingSubmissionVotes;
  return {
    user,
    isLoggedIn,
    artistListData,
    loginModalDetails,
    contest,
    allSubmissions,
    allSubmissionsVotes,
    isFetchingContest,
    isFetchingSubmissions,
    isFetchingSubmissionVotes,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchContestAction: (slug: string) => dispatch(action.fetchContest(slug)),
  fetchContestSubmissions: (slug: string) =>
    dispatch(action.fetchContestSubmissions(slug)),
  fetchContestSubmissionArtistVotes: (slug: string) =>
    dispatch(action.fetchContestSubmissionArtistVotes(slug)),
  upvoteContestSubmission: (data: any) =>
    dispatch(action.upvoteContestSubmission(data)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const ContestPage = ({
  user,
  isLoggedIn,
  loginModalDetails,
  contest,
  allSubmissions,
  allSubmissionsVotes,
  isFetchingContest,
  isFetchingSubmissions,
  isFetchingSubmissionVotes,
  artistListData,
  fetchContestAction,
  fetchContestSubmissions,
  fetchContestSubmissionArtistVotes,
  upvoteContestSubmission,
}: Props) => {

  const router = useRouter();
  const { toContestPage } = useRoutesContext();

  const { id: slug, tab: tab } = router.query;

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [windowWidth, setWindowWidth] = useState(-1);
  const { toDiscover, toAllContestPage, toArtistProfile, toContestSubmissionPage } = useRoutesContext();

  useEffect(() => {
    fetchContestAction(slug as string);
    fetchContestSubmissions(slug as string);
    fetchContestSubmissionArtistVotes(slug as string);
  }, []);

  useEffect(() => {
    if (user) {
      if (user.new_user) {
        setShowProfileModal(true);
      }
    }
    if (artistListData.status === "success") {
      setShowProfileModal(false);
    }
    setWindowWidth(window.innerWidth);
  }, [user, artistListData]);

  const getActiveTab = () => {
    let active = "1";
    if (tab === "details") {
      active = "1";
    }
    if (tab === "submit") {
      active = "2";
    } else if (tab === "leaderboard") {
      active = "3";
    }
    return active;
  };

  const redirect = (tabIndex: string) => {
    let tab = "details";
    if (tabIndex == "1") {
      // do nothing
    }
    if (tabIndex === "2") {
      tab = "submit";
    } else if (tabIndex === "3") {
      tab = "leaderboard";
    }
    router.push("/contest/" + slug + "?tab=" + tab);
  };

  const now = new Date();
  let status = GetContestStatus(
    now.getTime(),
    contest.contest[0]?.data.startDate,
    contest.contest[0]?.data.endDate
  );

  const showNotification = (title, message) => {
    notification.open({
      message: title,
      description: message,
    });
  };
  const upvoteArtwork = (id, slug, status) => {
    let obj = {
      submissionId: id,
      contestSlug: slug,
      vote: true,
    };
    if (status === "Past") {
      showNotification(
        "Contest has finished!",
        "Sorry but this contest has finished. You can not make changes to the vote 😕"
      );
    } else {
      if (!isLoggedIn) {
        showNotification(
          "Please login to upvote!",
          "We really appreciate you for supporting the artists by your votes 🙏🏻"
        );
      } else {
        upvoteContestSubmission(obj);
      }
    }
  };

  const GetMetaText = (status, submissionId, votesCount) => {
    // if (status === "Past" || IsAdmin(user.email)) {
    //   if (submissionId in votesCount) {
    //     return <span> {votesCount[submissionId]} votes recieved</span>;
    //   }
    // }
    return <></>;
  };

  const getCurrentSubmissions = (status) => {
    const resultArtists: JSX.Element[] = [];
    let data = allSubmissions.length != 0 ? allSubmissions[0].data : [];
    let artistsVotesData =
      allSubmissionsVotes.length != 0 ? allSubmissionsVotes[0].data : [];

    let artistVotes = [];
    artistsVotesData.forEach((votes) => {
      if (votes.artistId === user.artist_id && votes.vote === true) {
        artistVotes.push(votes.submissionId);
      }
    });

    let votesCount = {};
    artistsVotesData.forEach((vote) => {
      if (vote.vote === true) {
        if (vote.submissionId in votesCount) {
          votesCount[vote.submissionId] += 1;
        } else {
          votesCount[vote.submissionId] = 1;
        }
      }
    });

    data.forEach((submissionData) => {
      const submission = submissionData.submission;
      const artistName =
        submissionData.firstName + " " + submissionData.lastName;
      const artistSlug = submissionData.slug;
      const profileLink = `${Config.baseUrl}/artist/${artistSlug}`;
      const disabledVote = submission.artistId === user.artist_id;
      const sample = {
        originalUrl: submission.artworkUrl,
        thumbnailUrl: submission.artworkUrl,
        caption: submission.description,
        fileType: "image",
        createdAt: submission.createdAt,
      };
      resultArtists.push(
        <div className="tileCard">
          <SampleTile
            user={user}
            isSelf={false}
            sample={sample}
            onClick={() =>
              toContestSubmissionPage(
                slug.toString(),
                artistSlug
              )
            }
            onClickDelete={() => { }}
          />
          <div className="tileContainer">
            <p style={{ textAlign: "center" }}>
              {GetMetaText(status, submission.id, votesCount)}
            </p>
            <p className="caption">{submission.description}</p>
            <div className="mt16 common-text-style" style={{ textAlign: 'center' }}>
              <a href={profileLink}>{artistName}</a>
            </div>
            <hr style={{ margin: "4px" }}></hr>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              {!disabledVote ? (
                <>
                  {artistVotes.includes(submission.id) ? (
                    <FireFilled
                      key="upvote"
                      style={{ color: "red", padding: "12px" }}
                      onClick={() => {
                        if (disabledVote) {
                          message.error(
                            "You cannot vote for your own submission"
                          );
                          return;
                        }
                        upvoteArtwork(submission.id, slug, status);
                      }}
                    />
                  ) : (
                    <FireOutlined
                      key="downvote"
                      style={{ padding: "12px" }}
                      onClick={() => {
                        if (disabledVote) {
                          message.error(
                            "You cannot vote for your own submission"
                          );
                          return;
                        }
                        upvoteArtwork(submission.id, slug, status);
                      }}
                    />
                  )}
                </>
              ) : (
                <FireFilled
                  key="upvote"
                  style={{ color: "grey", padding: "12px" }}
                  onClick={() =>
                    message.error("You cannot vote for your own submission")
                  }
                />
              )}
              <ReadOutlined
                key="details"
                style={{ padding: "12px" }}
                onClick={() =>
                  toContestSubmissionPage(
                    slug.toString(),
                    artistSlug
                  )
                }
              />
            </div>
          </div>
        </div>
      );
    });
    return resultArtists;
  };

  const getPastSubmissions = () => {
    const resultArtists: JSX.Element[] = [];
    let data = allSubmissions.length != 0 ? allSubmissions[0].data : [];
    let artistsVotesData =
      allSubmissionsVotes.length != 0 ? allSubmissionsVotes[0].data : [];

    let artistVotes = [];
    artistsVotesData.forEach((votes) => {
      if (votes.artistId === user.artist_id && votes.vote === true) {
        artistVotes.push(votes.submissionId);
      }
    });

    let votesCount = {};
    artistsVotesData.forEach((vote) => {
      if (vote.vote === true) {
        if (vote.submissionId in votesCount) {
          votesCount[vote.submissionId] += 1;
        } else {
          votesCount[vote.submissionId] = 1;
        }
      }
    });

    let updatedSubmissionList = [];
    data.forEach((submissionData) => {
      let updatedSubmissionData = {
        "artist_name": submissionData.firstName + " " + submissionData.lastName,
        "artist_slug": submissionData.slug,
        "profile_link": `${Config.baseUrl}/artist/${submissionData.slug}`,
        "submission_url": submissionData.submission.artworkUrl,
        "description": submissionData.submission.description,
        "meta_text": GetMetaText(status, submissionData.submission.id, votesCount),
      }
      updatedSubmissionList.push(updatedSubmissionData);
    });

    return (
      <List
        style={{ width: "100%" }}
        bordered
        itemLayout={windowWidth > 500 ? "horizontal" : "vertical"}
        dataSource={updatedSubmissionList}
        renderItem={(item) => (
          <List.Item
            actions={
              [
                /* eslint-disable react/jsx-key */
                <Link
                  href={routeToHref(toContestSubmissionPage(
                    slug.toString(),
                    item["artist_slug"]
                  ))}
                >
                  <Button
                    type="primary"
                  >
                    Artwork
                  </Button>
                </Link>
              ]
            }
          >
            <List.Item.Meta
              title={<a href={item["profile_link"]}>{item["artist_name"]}</a>}
              description={item["description"]}
            />
          </List.Item>
        )}
      />)
  };

  const getBreadcrum = (title: string) => {
    return (
      <Breadcrumb>
        <Breadcrumb.Item>
          <a href={toDiscover().href}>Home</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href={toAllContestPage().href}>Art Contests</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {title}
        </Breadcrumb.Item>
      </Breadcrumb>
    );
  }

  const getContestHeader = (contest: any) => {

    return (
      <Space direction="vertical" style={{ width: '100%' }}>
        <Alert
          message={
            <span>
              {getContestCountdownHeading(status)}
              <CountdownTimer
                targetDate={
                  (status === "Ongoing" || status === "Past") ?
                    contest.contest[0]?.data.endDate : contest.contest[0]?.data.startDate
                }
              />
            </span>
          }
          type="info"
        />

        {status === "Past" &&
          <Alert
            showIcon={false}
            banner
            message={
              <span>
                The winner is{" "}
                <Link
                  href={routeToHref(toArtistProfile(GetContestMetadata(slug.toString())["winner"]["slug"]))}>
                  {GetContestMetadata(slug.toString())["winner"]["name"]}
                </Link>.{" "} Checkout their amazing
                <Link
                  href={routeToHref(
                    toContestSubmissionPage(
                      slug.toString(),
                      GetContestMetadata(slug.toString())["winner"]["slug"]))}
                >
                  work
                </Link>
              </span>
            }
          />
        }
      </Space>
    );
  }

  const getContestHosts = (hosts) => {
    const contestHosts: JSX.Element[] = [];
    hosts.forEach((host: string) => {
      contestHosts.push(
        <p className="common-p-style">
          <a href={host["url"]}>{host["name"]}</a>
        </p>
      );
    });
    return contestHosts;
  };


  const getContestDetails = (contest: any) => {
    let contestMetadata = GetContestMetadata(slug.toString());
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <div className="project-info-box">
              <h5 className="common-h5-style">Theme</h5>
              <p className="common-p-style">{contest.contest[0]?.data.title}</p>
            </div>
            <div className="project-info-box">
              <h5 className="common-h5-style">Description</h5>
              <p className="common-p-style">{contest.contest[0]?.data.description}</p>
            </div>
            <div className="project-info-box">
              <h5 className="common-h5-style">Details</h5>
              <p className="common-p-style"><b>Duration:</b> {" "}
                {Math.floor(
                  (contest.contest[0]?.data.endDate -
                    contest.contest[0]?.data.startDate) /
                  (1000 * 86400) +
                  1
                )}{" "} days
              </p>
              <p className="common-p-style"><b>Start Date:</b> {GetDateString(contest.contest[0]?.data.startDate)}</p>
              <p className="common-p-style"><b>End Date:</b> {GetDateString(contest.contest[0]?.data.endDate)}</p>
            </div>

            <div className="project-info-box">
              <h5 className="common-h5-style">Hosts</h5>
              {getContestHosts(contestMetadata["hosts"])}
            </div>

            <div className="project-info-box">
              <h5 className="common-h5-style">Reward Prize</h5>
              <p className="common-p-style">
                We believe anyone who participates is a winner. However,
                we will give an amazon gift card to the artist whose work
                is most upvoted. Gift card will be sent to their
                registered email id.

              </p>
              <p className="common-p-style"><b>Winner:</b> ${contestMetadata["prize"]} </p>
              <p className="common-p-style"><b>Other Participants:</b>
                All finalists will receive recognition on the contest website and social media.
              </p>
            </div>
          </div>

          <div className="col-md-7">
            <div className="project-info-box">
              <h5 className="common-h5-style">Preffered Skills</h5>
              <p className="common-p-style">{
                contestMetadata["category"].length === 0 ? "All art forms are invited!" :
                  GetContestEligibleCategoriesTags(contestMetadata["category"])}
              </p>
            </div>
            <div className="project-info-box">
              <h5 className="common-h5-style">What&apos;s in it for you?</h5>
              <p className="common-p-style">
                Artists benefit significantly from contest participation as it amplifies exposure,
                hones skills, and fosters networking. Winning or entering contests enhances credibility,
                attracting industry attention and increasing chances of securing paid projects,
                contributing to artistic growth and recognition.
              </p>
            </div>
            <div className="project-info-box">
              <h5 className="common-h5-style">Submission Guideline:</h5>
              <ul className="common-text-style">
                <li>
                  - Submit a high-resolution image file PNG, JPEG.
                </li>
                <li>
                  - You can also submit your entry by email to us at admin@wondor.art
                </li>
                <li>
                  - Include a brief description of your story.
                </li>
              </ul>
            </div>
            <div className="project-info-box">
              <h5 className="common-h5-style">Judging Criteria:</h5>
              <ul className="common-text-style">
                <li>
                  - Creativity and originality of the story.
                </li>
                <li>
                  - Effectiveness in conveying the theme.
                </li>
                <li>
                  - Overall impact and emotional engagement.
                </li>
                <li>
                  - Final decision will include things like creativity,
                  technique, adherence to the theme, and overall impact.
                </li>
              </ul>
            </div>
            <div className="project-info-box">
              <h5 className="common-h5-style">Rules and Regulations</h5>
              <ul className="common-text-style">
                <li>
                  - Any artist with on Wondor with complete profile is
                  eligible to participate.
                </li>
                <li>
                  - Post about the contest on social media and tag Wondor.
                  Instagram: <a style={{ color: "blue" }} href="https://www.instagram.com/wondor.art/">@wondor.art</a>,
                  Twitter: <a style={{ color: "blue" }} href="https://twitter.com/Wondor4creators">@Wondor4creators</a>,
                  Reddit: <a style={{ color: "blue" }} href="https://www.reddit.com/r/wondor4creators/">@wondor4creators</a>
                </li>
                <li>
                  - You will be disqualified from the contest for
                  plagiarism, offensive content, or failure to adhere to
                  the rules and guidelines
                </li>
                <li>
                  - You can also send in your queries in an email to
                  <b> admin@wondor.com</b>, during the contest.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout
      title={"Enter now and win exclusize prizes on Wondor"}
      name={"description"}
      content={
        "Calling all artists to join our monthy contest. The theme is "
        + contest.contest[0]?.data.title
        + " Enter now, showcase your creativity and win exciting prizes."
      }
    >
      <>
        {loginModalDetails.openModal && !user.new_user && <LoginModal />}
        {showProfileModal && <NewUserModal />}

        {isFetchingContest &&
          isFetchingSubmissions &&
          isFetchingSubmissionVotes ? (
          <Loader />
        ) : (
          <>
            <div className="contestDetailPage_container">
              {windowWidth > 500 &&
                <div style={{ paddingBottom: "10px" }}>
                  {getBreadcrum(contest.contest[0]?.data.title)}
                </div>
              }

              <Tabs
                type="card"
                centered={windowWidth > 500 ? false : true}
                onChange={(key: string) => {
                  redirect(key);
                }}
                activeKey={getActiveTab()}
              >
                <TabPane tab="Contest details" key="1">
                  {getContestHeader(contest)}
                  {getContestDetails(contest)}
                  <GenericActionBanner />
                </TabPane>

                {GetContestStatus(
                  now.getTime(),
                  contest.contest[0]?.data.startDate,
                  contest.contest[0]?.data.endDate
                ) === "Ongoing" && (
                    <TabPane tab="Submit your work" key="2">
                      <div className="contestDetailPage_tabContainer">
                        <div style={{ alignItems: "center" }}>
                          <UploadContestArtworkPage />
                        </div>
                      </div>
                    </TabPane>
                  )}

                {GetContestStatus(
                  now.getTime(),
                  contest.contest[0]?.data.startDate,
                  contest.contest[0]?.data.endDate
                ) !== "Upcoming" && (
                    <TabPane tab="Leaderboard" key="3">
                      <div className="contestDetailPage_tabContainer">
                        {allSubmissions.length != 0 && (
                          <h2
                            className="common-h2-style"
                            style={{ textAlign: "center", marginBottom: "20px" }}
                          >
                            {GetContestStatus(
                              now.getTime(),
                              contest.contest[0]?.data.startDate,
                              contest.contest[0]?.data.endDate
                            ) === "Ongoing" ? (
                              <>
                                <b>{allSubmissions[0].data.length}</b> artists
                                have submitted their work! Dont miss out and
                                <Link
                                  href={routeToHref(
                                    toContestPage(slug as string, "submit")
                                  )}
                                  passHref
                                >
                                  {" submit "}
                                </Link>
                                your work if you have not already!
                              </>
                            ) : (
                              <>
                                <Alert
                                  showIcon={false}
                                  banner
                                  message={
                                    <span>
                                      Presenting our final <b>{allSubmissions[0].data.length}</b> artists who have been meticulously shortlisted for their outstanding work, demonstrating a steadfast commitment to the contest&apos;s rules and regulations. And the triumphant winner is none other than is{" "}
                                      <Link
                                        href={routeToHref(toArtistProfile(GetContestMetadata(slug.toString())["winner"]["slug"]))}>
                                        {GetContestMetadata(slug.toString())["winner"]["name"]}
                                      </Link>
                                    </span>
                                  }
                                />

                              </>
                            )}
                          </h2>
                        )}

                        {status === "Ongoing" ? (
                          <div className="grid">
                            {getCurrentSubmissions(
                              GetContestStatus(
                                now.getTime(),
                                contest.contest[0]?.data.startDate,
                                contest.contest[0]?.data.endDate
                              )
                            )}
                          </div>
                        ) : (
                          <div>
                            {getPastSubmissions()}
                          </div>
                        )}
                      </div>
                    </TabPane>
                  )}
              </Tabs>
            </div>
          </>
        )}
      </>
    </Layout>
  );
};

export default connector(ContestPage);
