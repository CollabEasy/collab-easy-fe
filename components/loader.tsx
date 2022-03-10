import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 54 }} spin />;

export const Loader = () => {
  return (
    <div className="loader__parent">
      <div className="loader__container">
        <Spin className="loader__spinner" indicator={antIcon} />
        <div>
          <h2 className="f-20 mt4">Loading</h2>
          <h2 className="f-20">Please Wait..!!</h2>
        </div>
      </div>
    </div>
  );
};

export default Loader;
