import React from "react";
import styleLoading from "./Loading.module.css";

const Loading: React.FC = () => {
  return (
    <div className={styleLoading.bgLoading}>
      <img src="./img/loading.gif" alt="loading" />
    </div>
  );
};

export default Loading;
