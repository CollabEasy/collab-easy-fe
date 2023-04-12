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
import { Button } from "antd";
import { ContestEntry } from "types/model/contest";
import ContestModal from "@/components/modal/contestModal";

const mapStateToProps = (state: AppState) => ({
  analytics: state.analytics,
  user: state.user,
  showContestModal: state.contest?.showContestModal,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUserAnalytics: (startDate: string, endDate: string) =>
    dispatch(actions.fetchUserAnalytics(startDate, endDate)),

  setShowContestModal: (show: boolean) =>
    dispatch(actions.setShowContestModal(show)),

});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;
const AUTHORIZED_EMAILS = [
  "prashant.joshi056@gmail.com",
  "wondor4creators@gmail.com",
  "rahulgupta6007@gmail.com"
];

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
  showContestModal,
  fetchUserAnalytics,
  setShowContestModal
}: Props) => {

  Chart.register(CategoryScale);
  const startDate = new Date();
  const currentDate = format(new Date(), "yyyy-MM-dd");
  if (!AUTHORIZED_EMAILS.includes(user.user.email)) {
    router.push("/");
  }

  startDate.setDate(new Date().getDate() - 30);
  const startDateStr = format(startDate, "yyyy-MM-dd");
  const [beginDate, setBeginDate] = useState(startDateStr);
  const [peeklastDays, setPeekLastDays] = useState(30);
  const [contestEntryRequestDetails, setContestEntryDetails] = useState(
    emptyContestEntryDetails
  );

  useEffect(() => {
    if (!AUTHORIZED_EMAILS.includes(user.user.email)) {
      return;
    }
    fetchUserAnalytics(startDateStr, currentDate);
  }, [beginDate]);

  if (analytics.users.isFetchingUserAnalytics) {
    return <Loader />;
  }

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

  return (
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
        <h1 className="common-h1-style text-center">Total contest : {analytics.users.totalUsers}</h1>
        <Button type="primary" onClick={ShowContestEntryModal}>
          Add
        </Button>
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
  );
};

export default connector(AnalyticsPage);
