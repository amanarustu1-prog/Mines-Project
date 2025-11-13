import React, { useEffect, useState } from "react";
import "./ChallanPrint.css";
import { fetchPostData } from "@/components/hooks/Api";
import { getShowingDateText } from "@/common/DateFormat";

const ChallanPrint: React.FC<{ itemId: number | null }> = ({ itemId }) => {
  const [datas, setDatas] = useState<any>({});
  const [party, setParty] = useState([]);

  useEffect(() => {
    // console.log(itemId);
    if (itemId) {
      getSingleChallan();
    }
  }, [itemId]);

  const getSingleChallan = async () => {
    const response = await fetchPostData('Challan/GetSingleData_Challan', { ChallanID: itemId });
    // console.log(response);

    if (response && Array.isArray(response)) {
      setDatas(response);
      const partyId = response[0]?.PartyID;
      if (partyId) {
      fetchParty(partyId);
    }
    } else {
      setDatas({});
    }
  }

  const productRows: any[] = [];
  const challan = datas[0] || {};
  for (let i = 1; i <= 3; i++) {
    const productName = challan[`ProductName${i}`];
    if (productName && productName.trim() !== "") {
      productRows.push({
        id: i,
        product: productName,
        rate: challan[`Rate${i}`] || 0,
        netWeight: challan[`Netweight${i}`] || 0,
        amount: challan[`Amount${i}`] || 0,
      });
    }
  }

  // ------------dropdown---------------
  const fetchParty = async (partyId: number) => {
    try {
      const response = await fetchPostData('Party/GetDataDropDown_Party', { "CompanyId": 1 });
      console.log(response);

      if (response && Array.isArray(response)) {
        const matchedParty = response.find((p) => p.PartyID === partyId);
        if (matchedParty) {
          setParty(matchedParty.Name);
        }
      }
    }
    catch(err){
      console.log(err);
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
                <label className="challan-info-label">Date :</label> {getShowingDateText(datas[0]?.ChallanDate) || ''}
              </div>
            </div>
          </div>

          {/* ========= CHALLAN INFO ========= */}
          <div className="challan-info">
            <table className="challan-info-table_print">
              <tbody>
                {[
                  ["Cons. Nam", party || ""],
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
              {productRows.length > 0 ? (
                productRows.map((row, index) => (
                  <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td>{row.product}</td>
                    <td className="text-center">{row.rate}</td>
                    <td className="text-center">{row.netWeight}</td>
                    <td className="text-center">{row.amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">No product data available</td>
                </tr>
              )}
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
                    <td className="challan-info-value">{datas[0]?.VehicleRemarks || ''}</td>
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