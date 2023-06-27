import { Badge, BadgeProps, Calendar } from "antd";
import { ConnectedProps, connect } from "react-redux";
import { Dispatch } from "redux";
import type { Dayjs } from "dayjs";
import { AppState } from "state";

const mapStateToProps = (state: AppState) => {
  const user = state.user.user;
  return { user };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  events: any;
  onSelectDate: (date: string) => void;
} & ConnectedProps<typeof connector>;

const CollabCalender = ({ user, events, onSelectDate }: Props) => {
  const getListData = (value: Dayjs) => {
    const listData = [];
    const dateKey = value.year() + "/" + (value.month() + 1) + "/" + value.date();
    const eventsOnDate = events[dateKey] ?? [];
    eventsOnDate.forEach((event) => {
        const collabColor = event.status === 'PENDING' ? 'orange' : (event.status === 'ACTIVE' ? 'green' : 'grey');
        const userName = event.senderId === user.artist_id ? event.receiverName : event.senderName;
        listData.push({type: collabColor, content: `Collab with ${userName}`})
    })
    return listData;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li style={{ color: `${item.type}` }} key={item.content}>
           <span style={{ color: 'black' }}>{item.content}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="collabCalender__container">
      <Calendar
        onSelect={(value: Dayjs) => {
            return onSelectDate(value.year() + "/" + (value.month() + 1) + "/" + value.date());
        }}
        dateCellRender={(value: Dayjs) => {
          return dateCellRender(value);
        }}
      ></Calendar>
    </div>
  );
};
export default connector(CollabCalender);
