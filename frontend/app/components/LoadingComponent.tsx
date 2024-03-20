import { ReloadIcon } from "@radix-ui/react-icons";
import React from "react";

const LoadingComponent = () => {
  return (
    <div className="h-[90vh] flex flex-col items-center justify-center">
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      Loading....
    </div>
  );
};

export default LoadingComponent;
