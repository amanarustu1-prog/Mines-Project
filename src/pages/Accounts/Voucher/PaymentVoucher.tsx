import React, { useEffect, useState } from "react";
import "./PaymentVoucher.css";
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
import ConfirmModal from "@/common/ConfirmModal";

//==================== Icon Components ====================
const Edit = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);

const Trash2 = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

interface Voucher {
    ID: Number;
    VchDate: Number;
    PartyName: String;
    LedgerID: Number;
    VoucherType: String;
    Narration: String;
    VoucherNo: Number;
    PartyLadgerName: String;
    TotalAmt: Number;
    AccountingLedgerID: number;
    ledgerName: string;
    amount: number;
}

interface ledAccount {
    LedgerID: Number;
    name: String;
}

const PaymentVoucher = () => {
    const [voucherNo, setVoucherNo] = useState("");
    const [date, setDate] = useState(new Date());
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [narration, setNarration] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [singleRow, setSingleRow] = useState({ name: "", amount: "" });
    const [particulars, setParticulars] = useState([]);
    const [ledgerAccounts, setLedgerAccounts] = useState<ledAccount[]>([]);
    const [editItemId, setEditItemId] = useState<number | null>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [particular, setParticular] = useState<ledAccount[]>([]);
    const [voucher, setVoucher] = useState<Voucher[]>([]);
    const [form, setForm] = useState({
        ID: 0,
        VchDate: 0,
        PartyName: '',
        LedgerID: 0,
        VoucherType: "Payment",
        Narration: '',
        VoucherNo: "Auto Generated",
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
    // const fetchGetData = async () => {
    //     try {
    //         const payload = {
    //             VoucherNo: "",
    //             Narration: "",
    //             VoucherType: "Payment",
    //             FromDate: "",
    //             ToDate: "",
    //             CompanyId: localStorage.getItem('companyID')
    //         };

    //         const response = await fetchPostData('Accountingvoucher/GetData_Accountingvoucher', payload);

    //         if (response && Array.isArray(response)) {
    //             const modifiedData = response.map((item) => ({
    //                 ...item,
    //                 AccountingObj: item.AccountingObj ? JSON.parse(item.AccountingObj) : []
    //             }));
    //             setVoucher(modifiedData);
    //         } else {
    //             setVoucher([]);
    //         }
    //     } catch {
    //         toastifyError("Error fetching the Data");
    //     }
    // };

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
                // await fetchGetData();
                handleReset();

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

    const fetchUpdateData = async (form: AccountGroups, Id: number) => {
    }

    const fetchDeleteData = async (Id: number) => {

    }

    useEffect(() => {
        // fetchGetData();
        ledgerAccount();
    }, []);

    const handleInsertAndUpdate = async () => {
        // if (!checkValidationError()) return;
        // if (editItemId) {
        //     const success = await fetchUpdateData(form, editItemId);

        //     if (success) {

        //         // resetData();
        //         handleReset();
        //     }
        // }
        // if (!editItemId) {
        //     const success = await fetchInsertData(form);
        //     if (success) {
        //         // resetData();
        //         handleReset();
        //     }
        // }
    }

    const addParticular = () => {
        if (!singleRow.name || !singleRow.amount) {
            toastifyError("Enter Particular Name & Amount");
            return;
        }

        const data = {
            ledgerName: singleRow.name,
            AccountingLedgerID: Number(singleRow.AccountingLedgerID),
            amount: Number(singleRow.amount),
            // id: Date.now()
        };

        setParticulars(prev => [...prev, data]);

        setForm(prev => ({
            ...prev,
            AccountObj: [...prev.AccountObj, data]
        }));

        setSingleRow({ name: "", amount: "" });
    };

    const Columns = [
        {
            name: "Sr No.",
            selector: (row, index) => index + 1,
            center: true,
            width: "100px"
        },
        {
            name: "Name",
            selector: (row: Voucher) => row.ledgerName,
            sortable: true,
            center: true
        },
        {
            name: "Amount",
            selector: (row: Voucher) => row.amount,
            sortable: true,
            center: true
        },
        {
            name: 'Actions',
            cell: (row: Voucher) => (
                <div className="d-flex gap-2">
                    <button onClick={() => { setEditItemId(row.ID); }} className="material-name-btn-icon" title="Edit">
                        <Edit className="material-name-icon-sm" />
                    </button>
                    <button onClick={() => { setSelectedId(row.ID); setShowModal(true); }} className="text-red-600 hover:text-red-800 material-name-btn-icon" title="Delete">
                        <Trash2 className="material-name-icon-sm" />
                    </button>
                </div>
            )
        }
    ];

    const resizeableColumns = useResizableColumns(Columns).map(col => ({
        ...col, minWidth: typeof col.minWidth === "number" ? `${col.minWidth}px` : col.minWidth
    }));

    const handleReset = () => {
        setForm({
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
    }

    return (
        <div className="voucher-container">
            <div className="voucher-card">
                <div className="row align-items-center">
                    <div className="col-lg-1 text-end voucher-col px-0">
                        <label className="text-nowrap text-end">Voucher No.</label>
                    </div>
                    <div className="col-lg-3">
                        <input type="text" className="voucher-col-input challan"
                            value="Auto Generated"
                            onChange={(e) => setVoucherNo(e.target.value)}
                            placeholder="Enter No."
                            readOnly={true}
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
                                    data={particulars}
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
                            <FiSave size={16} /> {isSubmitting ? "Saving..." : "Save Voucher"}
                        </button>
                    </div>
                </div>
            </div>

            <ConfirmModal show={showModal}
                handleClose={() => setShowModal(false)}
                handleConfirm={() => {
                    if (selectedId !== null) {
                        fetchDeleteData(selectedId);
                    }
                    setShowModal(false);
            }} />
        </div>
    );
};

export default PaymentVoucher;