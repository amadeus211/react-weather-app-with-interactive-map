import React from "react";
import { ProgressBar } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <ProgressBar
        visible={true}
        height="120"
        width="120"
        color="#4fa94d"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
