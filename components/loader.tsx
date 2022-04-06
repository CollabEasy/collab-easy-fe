import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { LOADER_QUOTES } from "config/constants";

const antIcon = <LoadingOutlined style={{ fontSize: 54 }} spin />;

export const Loader = () => {
  return (
    <div className="loader__parent">
      <div className="loader__container">
        <Spin className="loader__spinner" indicator={antIcon} />
        <div>
          <h2 className="f-20 mt4 common-h2-style">{LOADER_QUOTES[Math.floor(Math.random()*LOADER_QUOTES.length)]}</h2>
        </div>
      </div>
    </div>
  );
};

export default Loader;
