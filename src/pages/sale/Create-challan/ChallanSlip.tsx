import React, { useEffect, useState } from "react";
import { fetchPostData } from "@/components/hooks/Api";
import { getShowingDateText } from "@/common/DateFormat";

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

 const ChallanSlip: React.FC<{ itemId: number | null }> = ({ itemId }) => {
  const [datas, setDatas] = useState<any>([]);
  const [partyName, setPartyName] = useState("");

  useEffect(() => {
    if (itemId) getSingleChallan();
  }, [itemId]);

  const getSingleChallan = async () => {
    const response = await fetchPostData("Challan/GetSingleData_Challan", {
      ChallanID: itemId,
    });

    if (response && Array.isArray(response)) {
      setDatas(response);
      const partyId = response[0]?.PartyID;
      if (partyId) fetchPartyName(partyId);
    } else {
      setDatas([]);
    }
  };

  const fetchPartyName = async (partyId: number) => {
    try {
      const response = await fetchPostData("Party/GetDataDropDown_Party", {
        CompanyId: 1,
      });

      if (response && Array.isArray(response)) {
        const match = response.find((p) => p.PartyID === partyId);
        if (match) setPartyName(match.Name);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const copies = [
    { title: "एल एन टी प्रति" },
    { title: "ऑफिस प्रति" },
    { title: "कस्टमर प्रति" },
  ];

  return (
    <div className="print-container bg-white">
      <style>{printStyles}</style>

      <div className="flex flex-col items-center px-4 py-4">
        {copies.map((copy, i) => (
          <div key={i} className="w-full max-w-3xl mb-6 border-0 print:mb-4" style={{ breakInside: "avoid" }}>
            {/* ===== Header ===== */}
            <div className="border-b border-black/40 pb-1 mb-1">
              <div className="flex items-center">
                <div className="w-32" />
                <h2 className="flex-1 text-center text-[18px] font-semibold text-amber-700">
                  || श्री गणेशाय नमः ||
                </h2>
                <div className="w-32 text-right text-xs text-gray-700">{copy.title}</div>
              </div>
            </div>

            {/* ===== Body ===== */}
            <div className="px-2 pt-1 text-[13px] leading-relaxed font-medium text-gray-900">
              <div className="flex justify-between border-b border-black/30 pb-1 mb-1">
                <div>
                  <span className="mr-1">Challan No.</span>
                  <span className="font-semibold">{datas[0]?.ChallanNo || 0}</span>
                </div>
                <div>
                  <span className="mr-1">Date/Time</span>
                  <span className="font-semibold">{getShowingDateText(datas[0]?.ChallanDate) || ""}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-16 pt-1">
                <div className="space-y-1">
                  <div className="flex">
                    <span className="w-28">Vehicle No</span>
                    <span className="font-semibold ml-1">{datas[0]?.VehicleNoID || ""}</span>
                  </div>
                  <div className="flex">
                    <span className="w-28">Party</span>
                    <span className="font-semibold ml-1">{partyName || ""}</span>
                  </div>
                  <div className="flex">
                    <span className="w-28">Amount</span>
                    <span className="font-semibold ml-1">{datas[0]?.GTotal || 0}</span>
                  </div>
                </div>

                {/* right column */}
                <div className="space-y-1">
                  <div className="flex">
                    <span className="w-24">Material</span>
                    <span className="font-semibold ml-1">{datas[0]?.ProductName1 || ""}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24">Tare Weight</span>
                    <span className="font-semibold ml-1">{datas[0]?.TareWeight || 0}</span>
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