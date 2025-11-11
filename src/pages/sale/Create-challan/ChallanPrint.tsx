import React from "react";
import "./ChallanPrint.css";

const ChallanPrint: React.FC = () => {
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

  return (
    <div className="card my-3 challan-print-card py-4">
      <div className="card-body p-2 d-flex justify-content-center">
        <div className="challan-main">

          {/* ========= TOP HEADER ========= */}
          <div className="challan-header">
            <div className="challan-header-left">
              <label className="challan-info-label" htmlFor="">Challa No :</label> {data.challaNo}
            </div>
            <div className="challan-header-center ">
              ॥ श्री गणेशाय नमः ॥
            </div>

            <div className="challan-header-right">
              <div className="challan-cash">CASH</div>
              <div className="challan-date">
                <label className="challan-info-label" htmlFor="">Date :</label> {data.date}
              </div>
            </div>
          </div>

          {/* ========= CHALLAN INFO ========= */}
          <div className="challan-info">
            <table className="challan-info-table_print">
              <tbody>
                {[
                  // ["Challa", data.challaNo],
                  ["Cons. Nam", data.consName],
                  ["Adress", data.address],
                  ["Contact", data.contact || ""],
                  ["Vehicle", data.vehicle],
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
              <tr>
                <td className="text-center">1</td>
                <td>{data.product}</td>
                <td className="text-center">{data.rate}</td>
                <td className="text-center">{data.netWeight}</td>
                <td className="text-center">{data.amount}</td>
              </tr>
            </tbody>
          </table>

          {/* ========= LOWER PART ========= */}
          <div className="challan-lower">
            {/* LEFT – charges */}
            <div className="challan-charges">
              <table className="challan-info-table_print">
                <tbody>
                  {[
                    ["Loading", data.loading.toFixed(2)],
                    ["Commosion", data.commision.toFixed(2)],
                    ["Total", data.total.toFixed(2)],
                    ["GST Amt.", "0.00"],
                    ["Royality A", "0.00"],
                    ["TP Amt", "0.00"],
                    ["F Amt.", "0.00"],
                    ["Round Amt", "0.00"],
                    ["Total Amt.", data.totalAmt],
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

            {/* RIGHT – Driver / Weights / कुल राशि box */}
            <div className="challan-driver">
              <table className="challan-info-table_print">
                <tbody>
                  {[
                    ["Driver Nam", data.driverName],
                    ["Driver#", data.driverNo],
                    ["Gross Weig", data.grossWeight],
                    ["Tare Weigh", data.tareWeight],
                    ["Net Weight", data.netWeightKg],
                    ["Less Weigh", "0"],
                    ["GT Weight", data.netWeightKg],
                    ["Total Amt.", ""],
                  ].map(([label, value], idx) => {
                    if (idx === 7) {
                      return (
                        <tr key={idx}>
                          <td className="challan-info-label">
                            <label className="challan-info-label" htmlFor="">{label} :</label>
                          </td>
                          <td className="challan-info-value">
                            <div className="challan-total-box">
                              <span className="challan-total-box-label">
                                कुल राशि
                              </span>
                              <span className="challan-total-box-amount">
                                {data.totalAmt}
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    }

                    return (
                      <tr key={idx}>
                        <td className="challan-info-label">
                          <label className="challan-info-label" htmlFor="">{label} :</label>
                        </td>
                        <td className="challan-info-value">{value}</td>
                      </tr>
                    );
                  })}

                  <tr>
                    <td className="challan-info-label">
                      <label className="challan-info-label" htmlFor="">Vehicle Rema</label> :
                    </td>
                    <td className="challan-info-value">{data.remarks}</td>
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
