import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { PdfTemplate } from "../pdfTemplate";

export default function pdfButton({ invoice_data }) {
  const pdfRef = useRef();
  const handleGeneratePdf = useReactToPrint({
    content: () => pdfRef.current,
    documentTitle: invoice_data.invoice_id,
    bodyClass: 'p-0',
    pageStyle: `
      @media print {
        @page { margin: 0; 
        background-color: white;
        }
      }
      body {
        -webkit-print-color-adjust: exact;
      }
    `,
  });
  return (
    <div className="w-full">
      <button
        onClick={() => {
          handleGeneratePdf();
        }}
        className="p-2 border-[3px] drop-shadow-lg font-bold text-white hover:bg-white hover:text-black rounded-lg bg-green-700 border-green-700 "
      >
        {invoice_data.invoice_id == "" ? "Loading..." : "Generate PDF"}
      </button>
      <PdfTemplate ref={pdfRef} invoice_data={invoice_data}></PdfTemplate>
    </div>
  );
}
