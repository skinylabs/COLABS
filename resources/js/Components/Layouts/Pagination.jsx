import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Pagination = ({ links, updateQueryParams }) => {
  const getButtonLabel = (label) => {
    switch (label) {
      case "&laquo; Previous":
        return <FaAngleLeft />;
      case "Next &raquo;":
        return <FaAngleRight />;
      default:
        return label;
    }
  };

  return (
    <div className="mt-4 flex gap-1">
      {links.map((link, index) => (
        <button
          key={index}
          onClick={() => {
            if (link.url) {
              const params = new URLSearchParams(link.url.split("?")[1]);
              const page = params.get("page");
              updateQueryParams({ page });
            }
          }}
          disabled={!link.url}
          className={`btn bg-blue-500 hover:bg-blue-700 text-white ${
            link.active ? "text-white bg-slate-400" : "bg-blue-200"
          }`}
        >
          {getButtonLabel(link.label)}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
