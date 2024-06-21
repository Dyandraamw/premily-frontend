'use client'
import React, { forwardRef }from "react";
import InvoicePdfTemplate from "../invoicePdfTemplate";


export const PdfTemplate = forwardRef(( {invoice_data} , ref) => {
    return (
        <div className="overflow-hidden h-0">
        <div className="w-full h-[1944px] bg-white p-0" ref={ref}>
        <InvoicePdfTemplate invoice_data={invoice_data}/>
        
        </div>
      </div>
    )
  })