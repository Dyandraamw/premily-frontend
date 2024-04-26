import React from "react";
import Sidebar from "../../components/sidebar";
import Textfield from "../../components/textfield";

export default function creditNote() {
  return (
    <div className="flex flex-grow flex-col px-10 py-5">
      <div className="mb-5">
        <h1 className="text-4xl text-blue-600 font-bold">Credit Note</h1>
        <p className="ml-1 font-medium text-gray-500">
          Create a new Credit Note
        </p>
      </div>
      <div className="bg-white rounded-lg w-[1500px] mt-5 p-2 h-[1000px]">
        <form className="p-5" action="">
          {/* company details */}
          <div className="flex justify-between">
            <div className="w-[300px] border-2 border-black h-[300px]">
              {" "}
              image sementara
            </div>
            <div className="flex flex-col w-96 mt-5">
              <Textfield
                label={"Company Name"}
                id={"company_name"}
                placeholder={"insert your company name..."}
              />
              <Textfield
                label={"Company Address"}
                id={"company_address"}
                placeholder={"insert your company address..."}
              />
              <Textfield
                label={"Company Number"}
                id={"company_number"}
                placeholder={"insert your company nuber..."}
              />
            </div>
          </div>

          {/* invoice main details */}
          <div className="flex justify-between ">
            <Textfield
              label={"Invoice Recipient"}
              id={"recipient"}
              placeholder={"insert recipient..."}
            />
            <Textfield
              label={"Recipient Address"}
              id={"recipient_address"}
              placeholder={"insert address..."}
            />
            <Textfield
              label={"Invoice Number"}
              id={"invoice_id"}
              placeholder={"DN-001"}
            />
            <Textfield
              label={"Currency"}
              id={"invoice_currency"}
              placeholder={"Select currency..."}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
