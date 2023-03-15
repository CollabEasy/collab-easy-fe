import { Skeleton, Result } from "antd";


export const NotAuthorised = () => {
  return (
    <div className="fluid discoverArtists__listingPageContainer" style={{ marginTop: "10%", marginBottom: "15%" }}>
        <div className="discoverArtists__listingPageCoverContainer common-text-style">
            <Result
            title="Create a new account or log in to your existing account to get the most from wondor!"
            // extra={
            //     <Skeleton active />
            // }
            />
        </div>
    </div>
  );
};

export default NotAuthorised;
