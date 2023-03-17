import Title from "components/title";
import { AppState } from "state";
import { Dispatch } from "redux";
import * as actions from "state/action/analyticsAction";
import { connect, ConnectedProps } from "react-redux";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Loader from "@/components/loader";
import { Line } from "react-chartjs-2";
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';
import router from "next/router";

const mapStateToProps = (state: AppState) => ({
  analytics: state.analytics,
  user: state.user
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUserAnalytics: (startDate: string, endDate: string) =>
    dispatch(actions.fetchUserAnalytics(startDate, endDate)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;
const AUTHORIZED_EMAILS = [
    "prashant.joshi056@gmail.com",
    "wondor4creators@gmail.com",
    "rahulgupta6007@gmail.com"
];

const AnalyticsPage = ({ analytics, user, fetchUserAnalytics }: Props) => {
  Chart.register(CategoryScale);
  const startDate = new Date();
  const currentDate = format(new Date(), "yyyy-MM-dd");
  if (!AUTHORIZED_EMAILS.includes(user.user.email)) {
    router.push("/");
  }

  startDate.setDate(new Date().getDate() - 30);
  const startDateStr = format(startDate, "yyyy-MM-dd");
  const [beginDate, setBeginDate] = useState(startDateStr);
  const [peeklastDays, setPeekLastDays] = useState(15);

  useEffect(() => {
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

  return (
      
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
      /></div>  
    </div>
  );
};

export default connector(AnalyticsPage);
