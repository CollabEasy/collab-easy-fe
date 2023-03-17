import { NextPage } from 'next'
import Title from 'components/title'
import { AppState } from 'state';
import { Dispatch } from "redux";
import moment from "moment";
import * as actions from "state/action";
import { connect, ConnectedProps } from "react-redux";
import { useState } from 'react';

const mapStateToProps = (state: AppState) => ({
    analytics: state.analytics,
})
  
const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchUserAnalyticsData: (loginDetails: any) => dispatch(actions.fetchUserAnalyticsData()),
});
  
  const connector = connect(mapStateToProps, mapDispatchToProps);
  
type Props = {
} & ConnectedProps<typeof connector>;
  
const Analytics = ({
    analytics
}: Props) => {
    
  const startDate = new Date();
  startDate.setDate((new Date()).getDate() - 15);

  const [beginDate, setBeginDate] = useState(startDate.toString);
  return (
    <div className='container'>
      <Title title="FAQ" />
      <h1>FAQ</h1>
    </div>
  )
}

export default Analytics