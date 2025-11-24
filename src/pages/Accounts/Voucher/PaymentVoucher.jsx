import React, { useState } from "react";
import "./PaymentVoucher.css";
import Select from "react-select";
import { FiPlus, FiTrash2, FiSave } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toastifyError, toastifySuccess } from "@/common/AlertMsg";
import DataTable from "react-data-table-component";
import { compactHeaderStyles, customStyles, selectCompactStyles } from "@/common/Utility";
import { fetchPostData } from "@/components/hooks/Api";

const PaymentVoucher = () => {
    const [voucherNo, setVoucherNo] = useState("");
    const [date, setDate] = useState(new Date());
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [narration, setNarration] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [singleRow, setSingleRow] = useState({ name: "", amount: "" });
    const [particulars, setParticulars] = useState([]);

    const accountOptions = [
        { value: 12, label: "Cash" },
        { value: 15, label: "HDFC Bank" },
        { value: 18, label: "ICICI Bank" },
        { value: 21, label: "AXIS Bank" }
    ];

    const addParticular = () => {
        if (!singleRow.name || !singleRow.amount) {
            toastifyError("Enter Particular Name & Amount");
            return;
        }

        setParticulars([
            ...particulars,
            { id: Date.now(), name: singleRow.name, amount: singleRow.amount }
        ]);

        setSingleRow({ name: "", amount: "" });
    };

    const removeParticular = (id) => {
        setParticulars(particulars.filter((p) => p.id !== id));
    };

    const buildPayload = () => {
        return {
            VchDate: date ? date.toLocaleDateString("en-GB") : "",
            PartyName: selectedAccount?.label || "",
            LedgerID: selectedAccount?.value || 0,
            Narration: narration,
            VoucherType: "Payment",
            VoucherNo: voucherNo || "Auto Generated",
            CompanyId: Number(localStorage.getItem("companyID")),
            ID: 0, 

            TotalAmt: particulars.reduce(
                (sum, item) => sum + Number(item.amount || 0),
                0
            ),

            AccountObj: particulars.map((item) => ({
                ledgerName: item.name,
                AccountingLedgerID: 101,
                amount: Number(item.amount),
            }))
        };
    };

    const handleSave = async () => {
        if (!selectedAccount) {
            toastifyError("Select Account");
            return;
        }
        if (particulars.length === 0) {
            toastifyError("Add at least 1 Particular");
            return;
        }

        setIsSubmitting(true);

        const payload = buildPayload();
        console.log("Final Payload:", payload);

        try {
            const response = await fetchPostData(
                "Accountingvoucher/Insert_Accountingvoucher",
                payload
            );

            if (response) {
                toastifySuccess("Voucher Saved Successfully");
                setVoucherNo("");
                setNarration("");
                setSelectedAccount(null);
                setParticulars([]);
            } else {
                toastifyError("Voucher Not Saved!");
            }
        } catch {
            toastifyError("Server Error!");
        }

        setIsSubmitting(false);
    };

    const columns = [
        {
            name: "No.",
            cell: (row, index) => index + 1,
            width: "70px",
            center: true,
        },
        {
            name: "Name",
            selector: (row) => row.name,
            center: true,
            sortable: true,
        },
        {
            name: "Amount",
            selector: (row) => row.amount,
            center: true,
            sortable: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <button onClick={() => removeParticular(row.id)}>
                    <FiTrash2 size={16} />
                </button>
            ),
            center: true,
        },
    ];

    return (
        <div className="voucher-container">
            <div className="voucher-card">
                <div className="row align-items-center">
                    <div className="col-lg-1 text-end voucher-col px-0">
                        <label className="text-nowrap text-end">Voucher No.</label>
                    </div>
                    <div className="col-lg-3">
                        <input type="text" className="voucher-col-input challan"
                            value={voucherNo}
                            onChange={(e) => setVoucherNo(e.target.value)}
                            placeholder="Enter No."
                        />
                    </div>

                    <div className="col-lg-1 text-end px-0 voucher-col">
                        <label className="text-nowrap">Date</label>
                    </div>
                    <div className="col-lg-3">
                        <DatePicker
                            selected={date}
                            onChange={(d) => setDate(d)}
                            dateFormat="dd/MM/yyyy"
                            className="date-input challan"
                        />
                    </div>
                </div>

                {/* Account Section */}
                <div className="section section-account row">
                    <div className="col-lg-1 text-end px-0">
                        <label className="text-nowrap">Account</label>
                    </div>
                    <div className="col-lg-7">
                        <Select
                            className="react-select"
                            value={selectedAccount}
                            onChange={setSelectedAccount}
                            options={accountOptions}
                            placeholder="Select Account"
                            styles={selectCompactStyles}
                        />
                    </div>
                </div>




                {/* Particulars Section */}
                <div className="card mt-3">
                    <div className="card-body">
                        <div className="section">
                            <div className="row align-items-center mb-2">

                                <div className="narration-flex align-items-center" >
                                    <div className="text-end px-0">
                                        <h3 className="particular-label">Particulars</h3>
                                    </div>

                                    <div className="table-rows">
                                        <input
                                            type="text"
                                            value={singleRow.name}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                if (/^[A-Za-z\s]*$/.test(val)) {
                                                    setSingleRow({ ...singleRow, name: val });
                                                }
                                            }}
                                            placeholder="Particulars name"
                                            className="desc-input challan w-100"
                                        />

                                        <input
                                            type="text"
                                            value={singleRow.amount}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                if (/^\d*$/.test(val)) {
                                                    setSingleRow({ ...singleRow, amount: val });
                                                }
                                            }}
                                            placeholder="Amount"
                                            className="amount-input challan w-100"
                                        />
                                    </div>
                                    <div className=" d-flex justify-content-end" >
                                        <button className="add-btn px-2 text-nowrap" onClick={addParticular}>
                                            <FiPlus size={14} /> Add Particular
                                        </button>
                                    </div>
                                </div>


                            </div>

                            <div className="particular-table">
                                <DataTable
                                    columns={columns}
                                    data={particulars}
                                    pagination
                                    highlightOnHover
                                    paginationRowsPerPageOptions={[5, 10, 15]}
                                    customStyles={compactHeaderStyles}
                                    striped
                                    persistTableHead
                                    noDataComponent="No particulars added yet"
                                    fixedHeader
                                    fixedHeaderScrollHeight="200px"
                                />
                            </div>
                        </div>
                    </div>
                </div>


                {/* Narration */}
                <div className="section narration-row">
                    <label>Narration</label>

                    <div className="narration-flex align-items-center">
                        <textarea rows="1" className="narration-text"
                            value={narration}
                            onChange={(e) => setNarration(e.target.value)}
                            placeholder="Narration..."
                        />

                        <button className="save-btn" onClick={handleSave} disabled={isSubmitting}>
                            <FiSave size={16} /> {isSubmitting ? "Saving..." : "Save Voucher"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentVoucher;