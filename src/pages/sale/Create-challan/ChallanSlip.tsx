import React from "react";

interface ChallanSlipProps {
    challanNo: string;
    dateTime: string;
    vehicleNo: string;
    material: string;
    consignee: string;
    tareWeight: number | string;
    amount: string;
}

const printStyles = `
  @media print {
    @page {
      size: A4;
      margin: 5mm 5mm 5mm 5mm;
    }
    body {
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      background: #ffffff !important;
    }
  }
`;

const ChallanSlip: React.FC<ChallanSlipProps> = ({
    challanNo,
    dateTime,
    vehicleNo,
    material,
    consignee,
    tareWeight,
    amount,
}) => {
    const copies = [
        { title: "एल एन टी प्रति" },   // LNT copy
        { title: "ऑफिस प्रति" },       // Office copy
        { title: "कस्टमर प्रति" },     // Customer copy
    ];

    return (
        <div className="print-container bg-white">
            <style>{printStyles}</style>

            <div className="flex flex-col items-center px-4 py-4">
                {copies.map((copy, i) => (
                    <div
                        key={i}
                        className="w-full max-w-3xl mb-6 border-0 print:mb-4"
                        style={{ breakInside: "avoid" }}
                    >
                        {/* ===== Header (same as screenshot) ===== */}
                        <div className="border-b border-black/40 pb-1 mb-1">
                            <div className="flex items-center">
                                {/* left empty space */}
                                <div className="w-32" />
                                {/* center title */}
                                <h2 className="flex-1 text-center text-[18px] font-semibold text-amber-700">
                                    || श्री गणेशाय नमः ||
                                </h2>
                                {/* copy label on right */}
                                <div className="w-32 text-right text-xs text-gray-700">
                                    {copy.title}
                                </div>
                            </div>
                        </div>

                        {/* ===== Body (two-column layout) ===== */}
                        <div className="px-2 pt-1 text-[13px] leading-relaxed font-medium text-gray-900">
                            {/* first row: challan no + date/time */}
                            <div className="flex justify-between border-b border-black/30 pb-1 mb-1">
                                <div>
                                    <span className="mr-1">Challan No.</span>
                                    <span className="font-semibold">{challanNo}</span>
                                </div>
                                <div>
                                    <span className="mr-1">Date/Time</span>
                                    <span className="font-semibold">{dateTime}</span>
                                </div>
                            </div>

                            {/* rest rows: left labels vs right labels (same as screenshot) */}
                            <div className="grid grid-cols-2 gap-x-16 pt-1">
                                {/* left column */}
                                <div className="space-y-1">
                                    <div className="flex">
                                        <span className="w-28">Vehicle No</span>
                                        <span className="font-semibold ml-1">
                                            {vehicleNo}
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <span className="w-28">Consignee</span>
                                        <span className="font-semibold ml-1">
                                            ,{consignee}
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <span className="w-28">Amount</span>
                                        <span className="font-semibold ml-1">
                                            {amount}
                                        </span>
                                    </div>
                                </div>

                                {/* right column */}
                                <div className="space-y-1">
                                    <div className="flex">
                                        <span className="w-24">Material</span>
                                        <span className="font-semibold ml-1">
                                            {material}
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <span className="w-24">Tare Weight</span>
                                        <span className="font-semibold ml-1">
                                            {tareWeight}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChallanSlip;
