import Title from "components/title";
import { AppState } from "state";
import { Dispatch } from "redux";
import * as actions from "state/action";
import { connect, ConnectedProps } from "react-redux";
import { useEffect, useState } from "react";
import moment from "moment";
import { format } from "date-fns";
import Loader from "@/components/loader";
import { Line } from "react-chartjs-2";
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import router from "next/router";
import { Button, Card, Tag } from "antd";
import { ContestEntry } from "types/model/contest";
import ContestModal from "@/components/modal/contestModal";
import { IsAdmin } from "helpers/helper";
import { routeToHref } from "config/routes";
import { GetContestStatus } from "helpers/contest";
import { useRoutesContext } from "components/routeContext";

const mapStateToProps = (state: AppState) => ({
  analytics: state.analytics,
  user: state.user,
  contests: state.contest,
  showContestModal: state.contest?.showContestModal,
  isFetchingContest: state.contest.isFetchingContest,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUserAnalytics: (startDate: string, endDate: string) =>
    dispatch(actions.fetchUserAnalytics(startDate, endDate)),

  fetchAllContests: () =>
    dispatch(actions.fetchAllContests()),

  setShowContestModal: (show: boolean) =>
    dispatch(actions.setShowContestModal(show)),

});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const currentDate = moment(new Date());
const tomorrow = currentDate.clone().add(1, "days");
const weekLater = currentDate.clone().add(7, "days");

const emptyContestEntryDetails: ContestEntry = {
  slug: "",
  title: "",
  description: "",
  startDate: tomorrow.toDate(),
  endDate: weekLater.toDate(),
};

const AnalyticsPage = ({
  analytics,
  user,
  contests,
  showContestModal,
  isFetchingContest,
  fetchUserAnalytics,
  fetchAllContests,
  setShowContestModal
}: Props) => {

  Chart.register(CategoryScale);
  const startDate = new Date();
  const currentDate = format(new Date(), "yyyy-MM-dd");

  if (!IsAdmin(user.user.email)) {
    router.push("/");
  }

  startDate.setDate(new Date().getDate() - 30);
  const startDateStr = format(startDate, "yyyy-MM-dd");
  const [beginDate, setBeginDate] = useState(startDateStr);
  const [peeklastDays, setPeekLastDays] = useState(30);
  const [contestEntryRequestDetails, setContestEntryDetails] = useState(
    emptyContestEntryDetails
  );
  const [allContests, setAllContests] = useState([]);
  const { toContestPage } = useRoutesContext();

  useEffect(() => {
    if (!IsAdmin(user.user.email)) {
      return;
    }
    fetchUserAnalytics(startDateStr, currentDate);
    fetchAllContests();
  }, [beginDate]);

  useEffect(() => {
    setAllContests(contests.contest);
  }, [contests])

  let datasets = [];
  let counts = [];
  analytics.users.datewiseUsers.forEach((datewiseCount) => {
    datasets.push(datewiseCount.date);
    counts.push(datewiseCount.count);
  });

  const chartData = {
    labels: datasets,
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
      {
        label: "# of users",
        data: counts,
        borderWidth: 1,
      },
    ],
  };

  const ShowContestEntryModal = () => {
    setContestEntryDetails(emptyContestEntryDetails);
    setShowContestModal(true);
  };

  const HideContestEntryModal = () => {
    setShowContestModal(false);
  };

  const getAllContests = (allContests) => {
    const resultArtists: JSX.Element[] = [];
    const now = new Date();
    let data = allContests.length != 0 ? allContests[0].data : [];
    data.sort((a,b) => b.startDate - a.startDate);
    data.forEach(contest => {
      let status = GetContestStatus(now.getTime(), contest.startDate, contest.endDate);
      resultArtists.push(
        <div className="row p-2 bg-white rounded contest-card">
          <Card
            title={contest.title}
            style={{ height: '100%' }}
            extra={
              <>
                {status === "Ongoing" && (
                  <Tag color="green">{status}</Tag>
                )}
                {status === "Upcoming" && (
                  <Tag color="yellow">{status}</Tag>
                )}
                {status === "Past" && (
                  <Tag color="grey">{status}</Tag>
                )}
                {status === "Ongoing" ? (
                  <a href={routeToHref(toContestPage(contest.contestSlug, "details"))}>Enter</a>
                ) : (
                  <a href={routeToHref(toContestPage(contest.contestSlug, "details"))}>Check details</a>
                )}
              </>
            }
          >
            <div>
              {contest.description}
            </div>
          </Card>
        </div>
      )
    });
    return resultArtists;
  };

  return (
    <>
      {analytics.users.isFetchingUserAnalytics || isFetchingContest ? (
        <Loader />
      ) : (
        <>
          <div className="analytics__pageContainer">
            <h1 className="common-h1-style text-center">Total Users : {analytics.users.totalUsers}</h1>
            <div className="analytics__pageContainer">
              <Line
                data={chartData}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "Users gained in last " + peeklastDays + " days",
                    },
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      title: {
                        display: true,
                        text: '# of Users'
                      },
                      min: 0,
                      ticks: {
                        stepSize: 1
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
          <div className="analytics__pageContainer">
            <h1 className="common-h1-style text-center">Total contest : {contests.contestCount}</h1>
            <div className="col-md-12 listingContainer" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
              {getAllContests(contests.contest)}
            </div>
            <div className="analytics__contestButtonContainer">
              <Button
                type="primary"
                htmlType="submit"
                className="common-medium-btn"
                style={{ height: 'auto', margin: '20px' }}
                onClick={ShowContestEntryModal}
              >
                Add contest
              </Button>
            </div>
          </div>

          <div>
            {showContestModal && (
              <ContestModal
                onCancel={() => {
                  HideContestEntryModal();
                }}
                isViewMode={true}
                contestEntry={contestEntryRequestDetails}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default connector(AnalyticsPage);
