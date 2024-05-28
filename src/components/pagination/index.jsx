import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ page = 1, pageCount = 10, setPage = () => {} }) => {
  return (
    <div className={"laptop:text-base tablet:text-sm text-xs"}>
      <ReactPaginate
        forcePage={page - 1}
        onPageChange={({ selected }) => setPage(selected + 1)}
        pageCount={pageCount}
        nextLabel={
          <span className={"laptop:text-base tablet:text-sm text-xs"}>
            Keyingi
          </span>
        }
        previousLabel={
          <span className={"laptop:text-base tablet:text-sm text-xs"}>
            Oldingi
          </span>
        }
        className={"flex justify-center my-2 items-center"}
        pageClassName={"laptop:ml-2.5 tablet:ml-2 ml-1.5"}
        pageLinkClassName={
          "inline-flex min-w-[32px] h-8 rounded-[5px] justify-center items-center bg-[#E0E0E0] text-black text-sm p-1"
        }
        nextClassName={"ml-2.5  text-sm text-[#313B3D]"}
        pageRangeDisplayed={2}
        previousClassName={"text-sm text-[#313B3D]"}
        breakLinkClassName={"ml-4 mr-1.5"}
        activeLinkClassName={"!bg-[#1890FF] !text-white"}
      />
    </div>
  );
};

export default Pagination;
