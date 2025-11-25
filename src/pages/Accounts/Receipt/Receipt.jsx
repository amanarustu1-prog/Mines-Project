import React, { useEffect, useState } from "react";
import "../Voucher/PaymentVoucher.css";
import Select from "react-select";
import { FiPlus, FiTrash2, FiSave } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toastifyError, toastifySuccess } from "@/common/AlertMsg";
import DataTable from "react-data-table-component";
import { compactHeaderStyles, customStyles, selectCompactStyles } from "@/common/Utility";
import { fetchPostData } from "@/components/hooks/Api";
import { getValue, getOptions, getChange } from "@/common/commonFunc";
import useResizableColumns from "@/components/customHooks/UseResizableColumns";

const Receipt = () => {

    const [voucherNo, setVoucherNo] = useState("");
    const [date, setDate] = useState(new Date());
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [narration, setNarration] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [singleRow, setSingleRow] = useState({ name: "", amount: "" });
    const [particulars, setParticulars] = useState([]);
    const [ledgerAccounts, setLedgerAccounts] = useState([]);
    const [particular, setParticular] = useState([]);
    const [voucher, setVoucher] = useState([]);

    const [form, setForm] = useState({
        ID: 0,
        VchDate: 0,
        PartyName: '',
        LedgerID: 0,
        VoucherType: "Payment",
        Narration: '',
        VoucherNo: 0,
        PartyLadgerName: '',
        TotalAmt: 0,
        AccountObj: []
    });


    const removeParticular = (id) => {
        setParticulars(particulars.filter((p) => p.id !== id));
    };

    // =================== DropDown ===================
    const ledgerAccount = async () => {
        try {
            const response = await fetchPostData('AccountingLedger/GetDataDropDown_AccountingLedger', {
                CompanyId: 1
            })
            // console.log(response);
            if (response && Array.isArray(response)) {
                setLedgerAccounts(response);
                setParticular(response);
            } else {
                setLedgerAccounts([]);
                setParticular([]);
            }
        }
        catch {
            toastifyError("Error in getting a Account Group");
        }
    }

    // ===================TODO-Func====================
    const fetchGetData = async () => {
        try {
            const payload = {
                VoucherNo: "",
                Narration: "",
                VoucherType: "Payment",
                FromDate: "",
                ToDate: "",
                CompanyId: localStorage.getItem('companyID')
            };

            const response = await fetchPostData('Accountingvoucher/GetData_Accountingvoucher', payload);

            if (response && Array.isArray(response)) {
                const modifiedData = response.map((item) => ({
                    ...item,
                    AccountingObj: item.AccountingObj ? JSON.parse(item.AccountingObj) : []
                }));
                setVoucher(modifiedData);
            } else {
                setVoucher([]);
            }
        } catch {
            toastifyError("Error fetching the Data");
        }
    };

    const fetchInsertData = async () => {
        if (!form.LedgerID) {
            toastifyError("Please select Account");
            return;
        }
        if (!form.AccountObj.length) {
            toastifyError("Please add at least one Particular");
            return;
        }

        try {
            setIsSubmitting(true);

            const formattedDate = date.toLocaleDateString("en-GB");
            const totalAmount = form.AccountObj.reduce((sum, obj) => sum + obj.amount, 0);

            const payload = {
                ...form,
                VchDate: formattedDate,
                VoucherNo: "Auto Generated",
                VoucherType: "Payment",
                TotalAmt: totalAmount,
                CompanyId: Number(localStorage.getItem("companyID")),
            };

            const response = await fetchPostData("Accountingvoucher/Insert_Accountingvoucher", payload);

            if (response) {
                toastifySuccess("Voucher saved successfully");
                await fetchGetData();

                setForm(prev => ({ ...prev, AccountObj: [] }));
                setParticulars([]);
                setSingleRow({ name: "", amount: "" });
            } else {
                toastifyError("Failed to save voucher");
            }
        } catch {
            toastifyError("Error while inserting voucher.");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        fetchGetData();
        ledgerAccount();
    }, []);

    const addParticular = () => {
        if (!singleRow.name || !singleRow.amount) {
            toastifyError("Enter Particular Name & Amount");
            return;
        }

        setForm(prev => ({
            ...prev,
            AccountObj: [
                ...prev.AccountObj,
                {
                    ledgerName: singleRow.name,
                    AccountingLedgerID: Number(singleRow.AccountingLedgerID),
                    amount: Number(singleRow.amount)
                }
            ]
        }));

        setParticulars(prev => [
            ...prev,
            { id: Date.now(), name: singleRow.name, amount: singleRow.amount }
        ]);

        setSingleRow({ name: "", amount: "" });
    };

    const Columns = [
        {
            name: "Sr No.",
            selector: (row) => row.SrNo,
            center: true,
            width: "100px"
        },
        {
            name: "Name",
            selector: (row) => row.ledgerName,
            sortable: true,
            center: true
        },
        {
            name: "Amount",
            selector: (row) => row.amount,
            sortable: true,
            center: true
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

    const resizeableColumns = useResizableColumns(Columns).map(col => ({
        ...col, minWidth: typeof col.minWidth === "number" ? `${col.minWidth}px` : col.minWidth
    }));

    return (
        <div className="voucher-container">
            <div className="voucher-card">
                <div className="row align-items-center">
                    <div className="col-lg-1 text-end voucher-col px-0">
                        <label className="text-nowrap text-end">Receipt No.</label>
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
                            value={form.LedgerID ?
                                {
                                    value: form.LedgerID,
                                    label: ledgerAccounts.find((l) => l.LedgerID === Number(form.LedgerID))?.name
                                } : null
                            }
                            options={ledgerAccounts.map((l) => ({
                                value: l.LedgerID,
                                label: l.name
                            }))}
                            onChange={(opt) => (
                                setForm((prev) => ({
                                    ...prev,
                                    LedgerID: Number(opt?.value),
                                    PartyName: opt?.label
                                }))
                            )}
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
                                {/* Particular */}
                                <div className="narration-flex align-items-center" >
                                    <div className="text-end px-0">
                                        <h3 className="particular-label">Particulars</h3>
                                    </div>
                                    <div className="table-rows">
                                        <Select
                                            className="react-select w-100"
                                            value={singleRow.name ? {
                                                value: singleRow.name,
                                                label: singleRow.name,
                                            } : null}
                                            options={ledgerAccounts.map((l) => ({
                                                value: l.name,
                                                label: l.name,
                                                id: l.LedgerID
                                            }))}
                                            onChange={(opt) => {
                                                setSingleRow(prev => ({
                                                    ...prev,
                                                    name: opt.label,
                                                    AccountingLedgerID: opt.id
                                                }));
                                            }}
                                            placeholder="Select Account"
                                            styles={selectCompactStyles}
                                        />



                                        <input type="text" value={singleRow.amount}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                if (/^\d*$/.test(val)) {
                                                    setSingleRow({ ...singleRow, amount: val });
                                                }
                                            }}
                                            placeholder="Amount"
                                            className="amount-input challan "
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
                                    columns={resizeableColumns}
                                    data={voucher.flatMap(v => v.AccountingObj)}
                                    pagination
                                    highlightOnHover
                                    paginationRowsPerPageOptions={[5, 10, 15]}
                                    customStyles={compactHeaderStyles}
                                    striped
                                    persistTableHead
                                    noDataComponent="No particulars available"
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
                            value={form.Narration}
                            onChange={(e) => setForm({ ...form, Narration: e.target.value })}
                            placeholder="Narration..."
                        />

                        <button className="save-btn" onClick={fetchInsertData} disabled={isSubmitting}>
                            <FiSave size={16} /> {isSubmitting ? "Saving..." : "Save Receipt"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Receipt;