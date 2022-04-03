import { Skeleton, Result } from "antd";


export const NotAuthorised = () => {
  return (
    <div className="fluid discoverArtists__listingPageContainer" style={{ marginTop: "10%", marginBottom: "15%" }}>
        <div className="discoverArtists__listingPageCoverContainer">
            <Result
            title="Login to your account to see the artists you can collaborate with!"
            // extra={
            //     <Skeleton active />
            // }
            />
        </div>
    </div>
  );
};

export default NotAuthorised;
