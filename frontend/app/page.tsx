import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div className="h-[100svh] bg-[#023020] flex justify-center items-center">
      <button>
        <Link className="px-6 py-2 border bg-white" href={"bills"}>
          Bills
        </Link>
      </button>
    </div>
  );
};

export default page;
