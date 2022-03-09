/* eslint-disable @next/next/no-img-element */
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { AppState } from "state";
import { CheckCircleOutlined, CheckOutlined, ClockCircleOutlined, CloseCircleOutlined } from "@ant-design/icons"
import { CollabRequestData } from "types/model";
import { Button } from "antd";

const mapStateToProps = (state: AppState) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  collabDetails: CollabRequestData;
} & ConnectedProps<typeof connector>;

const CollabDetailCard = ({ user, collabDetails }: Props) => {

    const collabStatusComponentForSender = () => {
        let icon: (JSX.Element) = <CheckCircleOutlined style={{ color: "#ADA7A7", fontSize: "48px" }} />
        let text: (JSX.Element) = <p className="mb0" style={{ color: "#ADA7A7", fontSize: "18px" }}>Completed</p>

        if (collabDetails.status === "ACTIVE") {
            icon = <CheckOutlined style={{ color: "#81B622", fontSize: "48px" }} />
            text = <p className="mb0" style={{ color: "#81B622", fontSize: "18px" }} >Active</p>
        } else if (collabDetails.status === "PENDING") {
            icon = <ClockCircleOutlined style={{ color: "#FF8300", fontSize: "48px" }} />
            text = <p className="mb0" style={{ color: "#FF8300", fontSize: "18px" }}>Pending</p>
        } else if (collabDetails.status === "REJECTED") {
            icon = <CloseCircleOutlined style={{ color: "#FF5C4D", fontSize: "48px" }} />
            text = <p className="mb0" style={{ color: "#FF5C4D", fontSize: "18px" }}>Pending</p>
        }

        return (
            <div className="collabDetailCard__statusContainer">
                {icon}
                {text}
            </div>
        )
    }

    const collabStatusComponentForReceiver = () => {
        if (collabDetails.status !== "pending") return collabStatusComponentForSender();

        return (
            <div className="collabDetailCard__buttonContainer">
                <Button className="collabDetailCard__acceptButton">Accept</Button>
                <Button className="collabDetailCard__rejectButton">Reject</Button>
            </div>
        )
    }

  return (
    <>
      <div className={collabDetails.status !== "COMPLETED" ? "collabDetailCard__container" : "collabDetailCard__containerDisabled"}>
        <img
          className="collabDetailCard__userImage"
          src="https://i.ibb.co/hBNrmt6/Screenshot-2022-03-09-at-3-01-15-PM.png"
          alt=""
        />
        <div className="collabDetailCard__collabRequestTextContainer">
            <h1 className="collabDetailCard__messageHeading">Message</h1>
            <p className="collabDetailCard__messageThemeText">{collabDetails.requestData.message}</p>
            <h1 className="collabDetailCard__messageHeading">Theme</h1>
            <p className="collabDetailCard__messageThemeText">{collabDetails.requestData.collabTheme}</p>
        </div>
        {user.artist_id === collabDetails.senderId ? (
            collabStatusComponentForSender()
        ) : (
            collabStatusComponentForReceiver()
        )}
      </div>
    </>
  );
};

export default connector(CollabDetailCard);
