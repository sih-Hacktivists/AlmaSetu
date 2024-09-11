import React from "react";
import { Communities } from "../Communities";

const PanelDiscussion = () => {
  return (
    <div className=" w-full flex h-5/6">
      <div className="w-1/6">
        <Communities admin={true} />
      </div>
      <div className="w-4/6">hellow</div>
      <div className="w-1/4">sss</div>
    </div>
  );
};

export default PanelDiscussion;
