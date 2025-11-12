import React, { useEffect, useState } from "react";
import "./ChallanPrint.css";
import { fetchPostData } from "@/components/hooks/Api";
import { getShowingDateText } from "@/common/DateFormat";
 
const ChallanPrint: React.FC<{ itemId: number | null }> = ({ itemId }) => {
  const [datas, setDatas] = useState<any>({});
  const data = {
    challaNo: "B/2025-2026/6991",
    date: "11/08/2025 08:42:55",
    consName: "BABLA",
    address: "BHARATPUR",
    contact: "",
    vehicle: "RJ05GB4928",
    product: "SUPER CONE DUST ++",
    rate: 690,
    netWeight: 55190,
    amount: 38081.1,
    loading: 50.0,
    commision: 1.1,
    total: 38130.0,
    driverName: "",
    driverNo: "9024445381",
    grossWeight: "70540 KG  11/08/2025 8:42:55 AM",
    tareWeight: "15350 KG  11/08/2025 7:38:39 AM",
    netWeightKg: "55190",
    remarks: "dumpper",
    totalAmt: "38130.00",
  };
 
  const rows = [
    {
      id: 1,
      product: data.product,
      rate: data.rate,
      netWeight: data.netWeight,
      amount: data.amount,
    },
    {
      id: 2,
      product: data.product,
      rate: data.rate,
      netWeight: data.netWeight,
      amount: data.amount,
    },
    {
      id: 3,
      product: data.product,
      rate: data.rate,
      netWeight: data.netWeight,
      amount: data.amount,
    },
   
  ];
 
  useEffect(() => {
    // console.log(itemId);
    if(itemId){
      getSingleChallan();
    }
  }, [itemId]);
 
  const getSingleChallan = async () => {
    const response = await fetchPostData('Challan/GetSingleData_Challan',  { ChallanID: itemId });
    // console.log(response);
 
    if(response && Array.isArray(response)){
      setDatas(response);
    }else{
      setDatas({});
    }
  }
 
  return (
    <div className="card my-3 challan-print-card py-4">
      <div className="card-body p-2 d-flex justify-content-center">
        <div className="challan-main">
          {/* ========= TOP HEADER ========= */}
          <div className="challan-header">
            <div className="challan-header-left">
              <label className="challan-info-label">Challa No :</label>{" "}
              {datas[0]?.ChallanNo || ''}
            </div>
 
            <div className="challan-header-center">
              ॥ श्री गणेशाय नमः ॥
            </div>
 
            <div className="challan-header-right">
              <div className="challan-cash">CASH</div>
              <div className="challan-date">
                <label className="challan-info-label">Date :</label> {getShowingDateText(datas[0]?.ChallanDate)  || ''}
              </div>
            </div>
          </div>
 
          {/* ========= CHALLAN INFO ========= */}
          <div className="challan-info">
            <table className="challan-info-table_print">
              <tbody>
                {[
                  ["Cons. Nam", datas[0]?.PartyID || ""],
                  ["Address", datas[0]?.Address || ""],
                  ["Contact", datas[0]?.OwnerMobile || ""],
                  ["Vehicle", datas[0]?.VehicleNoID || ""],
                ].map(([label, value], idx) => (
                  <tr key={idx}>
                    <td className="challan-info-label">{label}</td>
                    <td className="challan-info-colon">:</td>
                    <td className="challan-info-value">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
 
          {/* ========= PRODUCT TABLE ========= */}
          <table className="challan-product-table challan-info-table_print">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>PARTICULARS</th>
                <th>RATE</th>
                <th>Net Weight(K.)</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.id || index}>
                  <td className="text-center">{index + 1}</td>
                  <td>{row.ProductName1}</td>
                  <td className="text-center">{row.Rate1}</td>
                  <td className="text-center">{row.Netweight1}</td>
                  <td className="text-center">{row.Amount1}</td>
                </tr>
              ))}
            </tbody>
          </table>
 
          {/* ========= LOWER PART ========= */}
          <div className="challan-lower">
            <div className="challan-charges">
              <table className="challan-info-table_print">
                <tbody>
                  {[
                    ["Loading", datas[0]?.LoadingAmt || 0],
                    ["Commosion", datas[0]?.CommisionAmt || 0],
                    ["Total", datas[0]?.TotalAmt || 0],
                    ["GST Amt.", datas[0]?.GSTAmt || 0],
                    ["Royality A", datas[0]?.RoyaltyAmt || 0],
                    ["TP Amt", datas[0]?.TPAmount || 0],
                    ["F Amt.", datas[0]?.FreightAmt || 0],
                    ["Round Amt", 0],
                    ["Total Amt.", datas[0]?.GTotal || 0],
                  ].map(([label, value], idx) => (
                    <tr key={idx}>
                      <td className="challan-info-label">{label}</td>
                      <td className="challan-info-colon">:</td>
                      <td
                        className={
                          "challan-charges-value" +
                          (idx === 8 ? " challan-charges-value-total" : "")
                        }
                      >
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
 
            <div className="challan-driver">
              <table className="challan-info-table_print">
                <tbody>
                  {[
                    ["Driver Name", datas[0]?.DriverName || 0],
                    ["Driver#", datas[0]?.DriverMobileNo || 0],
                    ["Gross Weight", datas[0]?.Grossweight || 0],
                    ["Tare Weight", datas[0]?.TareWeight || 0],
                    ["Net Weight", datas[0]?.Netweight || 0],
                    ["Less Weight", datas[0]?.Lessweight || 0],
                    ["GT Weight", datas[0]?.GTWeight || 0],
                    ["Total Amt.", datas[0]?.Amount || 0],
                  ].map(([label, value], idx) => {
                    if (idx === 7) {
                      return (
                        <tr key={idx}>
                          <td className="challan-info-label">
                            <label className="challan-info-label">
                              {label} :
                            </label>
                          </td>
                          <td className="challan-info-value">
                            <div className="challan-total-box">
                              <span className="challan-total-box-label">
                                कुल राशि
                              </span>
                              <span className="challan-total-box-amount">
                                {datas[0]?.Amount || 0}
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    }
 
                    return (
                      <tr key={idx}>
                        <td className="challan-info-label">
                          <label className="challan-info-label">
                            {label} :
                          </label>
                        </td>
                        <td className="challan-info-value">{value}</td>
                      </tr>
                    );
                  })}
 
                  <tr>
                    <td className="challan-info-label">
                      <label className="challan-info-label">
                        Vehicle Rema :
                      </label>
                    </td>
                    <td className="challan-info-value">{datas[0]?.VehicleRemarks}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
 
          {/* ========= FOOTER ========= */}
          <div className="challan-footer">
            <span>TP Challan Approved Si</span>
            <span>Driver Sign</span>
            <span>Gate Pass Sig</span>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default ChallanPrint;