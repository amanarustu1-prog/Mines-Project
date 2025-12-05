import React, { useEffect, useState, useMemo } from "react";
import "../Payment/PaymentVoucher.css";
import Select from "react-select";
import { FiPlus, FiTrash2, FiSave } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toastifyError, toastifySuccess } from "@/common/AlertMsg";
import DataTable from "react-data-table-component";
import { compactHeaderStyles, customStyles, selectCompactStyles } from "@/common/Utility";
import { AddDeleteUpadate, fetchPostData } from "@/components/hooks/Api";
import useResizableColumns from "@/components/customHooks/UseResizableColumns";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "@/common/ConfirmModal";
import { getShowingDateMonthYear } from "@/common/DateFormat";

interface Voucher {
    ID: number;
    VchDate: string;
    PartyName: string;
    LedgerID: number;
    VoucherType: string;
    Narration: string;
    VoucherNo: number | string;
    PartyLadgerName: string;
    TotalAmt: number;
    AccountingLedgerID: number;
    ledgerName: string;
    amount: number;
    id?: number;
}

interface ledAccount {
    LedgerID: number;
    name: string;
}

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

const Receipt = () => {
    const [date, setDate] = useState(new Date());
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [singleRow, setSingleRow] = useState({ name: "", amount: "" });
    const [particulars, setParticulars] = useState([]);
    const [ledgerAccounts, setLedgerAccounts] = useState<ledAccount[]>([]);
    const [particular, setParticular] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [voucher, setVoucher] = useState<Voucher[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [rows, setRows] = useState([]);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [showVoucherModal, setShowVoucherModal] = useState(false);
    const [currentEditId, setCurrentEditId] = useState(null);
    const navigate = useNavigate();
    const [editParticularId, setEditParticularId] = useState<number | null>(null);
    const [form, setForm] = useState({
        ID: 0,
        VchDate: 0,
        PartyName: '',
        LedgerID: 0,
        VoucherType: "Receipt",
        Narration: '',
        VoucherNo: "Auto Generated",
        PartyLadgerName: '',
        TotalAmt: 0,
        AccountObj: []
    });

    const formatDate = (date) => {
        if (!date) return "";
        return date.toISOString().split("T")[0];
    };

    const handleEditParticular = (row: any) => {
        setSingleRow({
            name: row.ledgerName,
            amount: row.amount.toString(),
            AccountingLedgerID: row.AccountingLedgerID
        });
        setEditParticularId(row.id);
    };

    const filteredData = useMemo(() => {
        if (!searchText.trim()) return rows;
        const term = searchText.toLowerCase();

        return rows.filter((row) => {
            const partyName = row.PartyName ? row.PartyName.toLowerCase() : "";
            const totalAmtStr = (row.TotalAmt ?? 0).toString();

            return partyName.includes(term) || totalAmtStr.includes(term);
        });
    }, [searchText, rows]);

    //Get-data
    const fetchGetData = async (from = null, to = null) => {
        try {
            const payload = {
                VoucherNo: "",
                Narration: "",
                VoucherType: "Receipt",
                FromDate: from === null ? " " : getShowingDateMonthYear(from),
                ToDate: to === null ? " " : getShowingDateMonthYear(to),
                CompanyId: localStorage.getItem('companyID')
            };

            const response = await fetchPostData('Accountingvoucher/GetData_Accountingvoucher', payload);

            if (response && Array.isArray(response)) {
                const modifiedData = response.map((item) => ({
                    ...item,
                    AccountingObj: item.AccountingObj ? JSON.parse(item.AccountingObj) : []
                }));
                setVoucher(modifiedData);
                setRows(modifiedData);
                return modifiedData;
            } else {
                setVoucher([]);
                setRows([]);
                return [];
            }
        } catch {
            toastifyError("Error fetching the Data");
            return [];
        }
    };

    const handleSearch = async () => {
        const data = await fetchGetData(fromDate, toDate);

        if (!data || data.length === 0) {
            toastifyError("No data found for selected dates");
        }
    };

    const fetchDeleteData = async (Id) => {
        try {
            const response = await fetchPostData('Accountingvoucher/Delete_Accountingvoucher', {
                "ID": Id,
            });
            // console.log(response);

            if (response) {
                toastifySuccess("Item is deleted successfully.");
                await fetchGetData();
                return true;
            } else {
                toastifyError("Item is not Deleted");
                return false;
            }
        }
        catch {
            toastifySuccess("Error in Deleting a Item");
        }
    }

    useEffect(() => {
        fetchGetData();
    }, []);

    const handleAddVoucher = () => {
        handleReset();
        setCurrentEditId(null);
        setShowVoucherModal(true);
    };

    const columns = [
        {
            name: "Actions",
            cell: (row) => (
                <div className="ledger-management-flex ledger-management-gap-2">
                    <button
                        className="ledger-management-btn-icon mr-0"
                        title="Edit Receipt"
                        onClick={() => {
                            setCurrentEditId(row.vchId);
                            setShowVoucherModal(true);
                        }}
                    >
                        <Edit className="ledger-management-icon-sm" />
                    </button>

                    <button className="ledger-management-btn-icon text-red-600 hover:text-red-800" title="Delete"
                        onClick={() => { setSelectedId(row.vchId); setShowModal(true) }}>
                        <Trash2 className="ledger-management-icon-sm" />
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: "Date",
            selector: (row) => row.Date,
            sortable: true,
        },
        {
            name: "Particular",
            selector: (row) => row.PartyName,
            sortable: true,
        },
        {
            name: "Vch Type",
            selector: (row) => row.VchrType,
            sortable: true,
        },
        {
            name: "Vch No",
            selector: (row) => row.VchrNo,
            sortable: true,
        },
        {
            name: "DebitAmt",
            selector: (row) => row.TotalAmt,
            sortable: true,
        },
        {
            name: "CreditAmt",
            selector: (row) => row.CreditAmt,
            sortable: true,
        },
    ];

    const removeParticular = (id: any) => {
        setParticulars(particulars.filter((p) => p.id !== id));

        setForm((prev) => ({
            ...prev,
            AccountObj: prev.AccountObj.filter((item: any) => item.SrNo !== id)
        }));
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
    const fetchReceiptData = async () => {
        try {
            const payload = {
                VoucherNo: "",
                Narration: "",
                VoucherType: "Receipt",
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
            // handleReset();
            const formattedDate = date.toLocaleDateString("en-GB");
            const totalAmount = form.AccountObj.reduce((sum, obj) => sum + obj.amount, 0);

            const payload = {
                ...form,
                VchDate: formattedDate,
                VoucherNo: "Auto Generated",
                VoucherType: "Receipt",
                TotalAmt: totalAmount,
                CompanyId: Number(localStorage.getItem("companyID")),
            };

            const response = await fetchPostData("Accountingvoucher/Insert_Accountingvoucher", payload);

            if (response) {
                toastifySuccess("Voucher saved successfully");
                setShowVoucherModal(false);
                setCurrentEditId(null);
                await fetchGetData();
                handleReset();
                return true;
            } else {
                toastifyError("Failed to save voucher");
            }
        } catch {
            toastifyError("Error while inserting voucher.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const fetchUpdateData = async (form: any, id: number) => {
        try {
            setIsSubmitting(true);
            // handleReset();
            const formattedDate = date.toLocaleDateString("en-GB");
            const totalAmount = form.AccountObj.reduce((sum, obj) => sum + obj.amount, 0);
            const payload = {
                ...form,
                VchDate: formattedDate,
                VoucherNo: form.VoucherNo,
                VoucherType: "Receipt",
                TotalAmt: totalAmount,
                ID: id,
                CompanyId: Number(localStorage.getItem("companyID")),
            };

            const response = await fetchPostData('Accountingvoucher/Insert_Accountingvoucher', payload);
            // console.log(response[0].message);
            if (response[0].message === "Update successfully") {
                toastifySuccess("Item Updated Successfully");
                setShowVoucherModal(false);
                setCurrentEditId(null);
                await fetchGetData();
                return true;
            }

            toastifyError("Item is not Updated");
            return false;

        } catch {
            toastifyError("Error in Updating a Data.");
            return false;
        }
        finally {
            setIsSubmitting(false);
        }
    };

    const fetchSingleData = async (Id: number) => {
        try {
            const response = await AddDeleteUpadate('Accountingvoucher/GetSingleData_Accountingvoucher', {
                ID: Id
            });
            // console.log(response);
            if (response?.success && response.data) {
                const parsedData = JSON.parse(response.data);
                // console.log(parsedData);

                const header = parsedData.Table?.[0];
                const details = parsedData.Table1 || [];

                setForm(prev => ({
                    ...prev,
                    ID: header.ID,
                    VchDate: header.VchDate,
                    PartyName: header.PartyName,
                    LedgerID: header.LedgerID,
                    VoucherType: header.VoucherType ?? "Receipt",
                    Narration: header.Narration,
                    VoucherNo: header.VoucherNo,
                    TotalAmt: header.TotalAmt ?? 0,
                    AccountObj: details.map((d: any) => ({
                        AccountingLedgerID: d.AccountingLedgerID,
                        ledgerName: d.ledgerName,
                        amount: Math.abs(d.amount),
                        SrNo: d.SrNo
                    }))
                }));

                if (header.VchDate) {
                    setDate(new Date(header.VchDate.split("/").reverse().join("-")));
                }

                setParticulars(
                    details.map((d: any) => {
                        const ledgerObj = ledgerAccounts.find(
                            acc => Number(acc.LedgerID) === Number(d.AccountingLedgerID)
                        );

                        return {
                            id: d.SrNo,
                            ledgerName: ledgerObj?.name || d.ledgerName || "Unknown",
                            amount: Math.abs(d.amount),
                            AccountingLedgerID: d.AccountingLedgerID
                        };
                    })
                );

                setSelectedAccount({
                    value: header.LedgerID,
                    label: header.PartyName
                });
            }
        } catch (error) {
            toastifyError("Error while fetching voucher details");
        }
    };

    useEffect(() => {
        if (currentEditId && ledgerAccounts.length > 0) {
            fetchSingleData(currentEditId);
        }
    }, [currentEditId, ledgerAccounts]);

    useEffect(() => {
        fetchReceiptData();
        ledgerAccount();
    }, []);

    const addParticular = () => {
        if (!singleRow.name || !singleRow.amount) {
            toastifyError("Enter Particular Name & Amount");
            return;
        }

        if (editParticularId !== null) {
            setParticulars(prev =>
                prev.map(p =>
                    p.id === editParticularId
                        ? { ...p, ledgerName: singleRow.name, amount: Number(singleRow.amount) }
                        : p
                )
            );

            setForm(prev => ({
                ...prev,
                AccountObj: prev.AccountObj.map((item: any) =>
                    item.SrNo === editParticularId
                        ? {
                            ...item,
                            ledgerName: singleRow.name,
                            AccountingLedgerID: Number(singleRow.AccountingLedgerID),
                            amount: Number(singleRow.amount)
                        }
                        : item
                )
            }));

            toastifySuccess("Particular updated!");
            setEditParticularId(null);
        } else {
            const newId = Date.now();

            setParticulars(prev => [
                ...prev,
                {
                    id: newId,
                    ledgerName: singleRow.name,
                    AccountingLedgerID: singleRow.AccountingLedgerID,
                    amount: Number(singleRow.amount)
                }
            ]);

            setForm(prev => ({
                ...prev,
                AccountObj: [
                    ...prev.AccountObj,
                    {
                        SrNo: newId,
                        ledgerName: singleRow.name,
                        AccountingLedgerID: Number(singleRow.AccountingLedgerID),
                        amount: Number(singleRow.amount)
                    }
                ]
            }));
        }

        // Reset input
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
            name: "Action",
            cell: (row: Voucher) => (
                <div>
                    <button className="ledger-management-btn-icon mr-1" title="Edit" onClick={() => handleEditParticular(row)}>
                        <Edit className="ledger-management-icon-sm" />
                    </button>
                    <button className="ledger-management-btn-icon" title="Delete" onClick={() => removeParticular(row.id)}>
                        <Trash2 className="ledger-management-icon-sm" />
                    </button>
                </div>
            ),
            center: true,
        },
    ];

    const handleReset = () => {
        setForm({
            ID: 0,
            VchDate: 0,
            PartyName: '',
            LedgerID: 0,
            VoucherType: "Payment",
            Narration: '',
            VoucherNo: "",
            PartyLadgerName: '',
            TotalAmt: 0,
            AccountObj: []
        })
        setParticulars([]);
        setSingleRow({ name: "", amount: "" });
    }

    const handleInsertAndUpdate = async () => {
        if (currentEditId) {
            const success = await fetchUpdateData(form, currentEditId);
            if (success) {
                handleReset();
                setCurrentEditId(null);
                return;
            }
        }

        if (!currentEditId) {
            const success = await fetchInsertData(form);
            if (success) {
                handleReset();
                setShowVoucherModal(false);
            }
        }
    };

    const resizeableColumns = useResizableColumns(Columns).map(col => ({
        ...col, minWidth: typeof col.minWidth === "number" ? `${col.minWidth}px` : col.minWidth
    }));

    return (
        <>
            {/* Recpit List */}
            <div className="voucher-container list-container">
                <div className="voucher-card mb-2">

                    {/* ===================== DATE FILTER ROW ===================== */}
                    <div className="row align-items-center ">
                        {/* ===================== PAGE HEADER ===================== */}
                        <div className="page-header col-md-3">
                            <h5 className="voucher-page-title mb-0">Receipt Voucher List</h5>
                            <div className="header-line"></div>
                        </div>
                        {/* From Date */}
                        <div className="col-md-1 text-right px-0">
                            <label className="receipt_lable mb-0 text-nowrap ">From Date</label>
                        </div>
                        <div className="col-md-3">
                            <DatePicker
                                selected={fromDate}
                                onChange={(date) => setFromDate(date)}
                                dateFormat="dd-MM-yyyy"
                                className="voucher-search-input challan"
                                placeholderText="From Date"
                                isClearable
                            />
                        </div>

                        {/* To Date */}
                        <div className="col-md-1 text-right px-0 ">
                            <label className="receipt_lable mb-0 text-nowrap ">To Date</label>
                        </div>
                        <div className="col-md-3">
                            <DatePicker
                                selected={toDate}
                                onChange={(date) => setToDate(date)}
                                dateFormat="dd-MM-yyyy"
                                className="voucher-search-input challan"
                                placeholderText="To Date"
                                isClearable
                            />
                        </div>

                        <div className="col-md-1 d-flex justify-content-end ">
                            <button className="save-btn" onClick={handleSearch}>Search</button>
                        </div>
                    </div>
                </div>

                <div className="voucher-card">
                    {/* Search + Button */}
                    <div className="voucher-header">
                        <div className="voucher-header-left">
                            <input type="text" className="voucher-search-input challan"
                                placeholder="Search..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>

                        <div className="voucher-header-right">
                            <button type="button" className="save-btn" onClick={handleAddVoucher}>
                                + Add Receipt
                            </button>
                        </div>
                    </div>

                    <DataTable
                        columns={columns}
                        data={filteredData}
                        pagination
                        highlightOnHover
                        paginationRowsPerPageOptions={[5, 10, 15]}
                        customStyles={customStyles}
                        striped
                        persistTableHead
                        noDataComponent="No particulars available"
                        fixedHeader
                        fixedHeaderScrollHeight="300px"
                    />
                </div>
            </div>

            {/* Receipt Data Modal */}
            {showVoucherModal && (
                <>
                    <div className="modal fade show d-block" tabIndex={-1}>
                        <div className="modal-dialog modal-xl">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{currentEditId !== null ? "Edit Receipt" : "Add Receipt"}</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => {
                                            setShowVoucherModal(false);
                                            setCurrentEditId(null);
                                        }}
                                    ></button>
                                </div>
                                <div className="modal-body p-1">
                                    <div className="voucher-container">
                                        <div className="voucher-card">
                                            <div className="row align-items-center">
                                                <div className="col-lg-1 text-end voucher-col px-0">
                                                    <label className="text-nowrap text-end">Receipt No.</label>
                                                </div>
                                                <div className="col-lg-3">
                                                    <input
                                                        type="text"
                                                        className="voucher-col-input challan"
                                                        // defaultValue="Auto Generated"
                                                        value={currentEditId === null ? "Auto Generated" : form.VoucherNo}
                                                        // onChange={(e) => setForm((prev) => ({ ...prev, VoucherNo: e.target.value }))}
                                                        placeholder="Enter No."
                                                    />
                                                </div>

                                                <div className="col-lg-1 text-end px-0 voucher-col">
                                                    <label className="text-nowrap">Date</label>
                                                </div>
                                                <div className="col-lg-3">
                                                    <DatePicker
                                                        selected={date}
                                                        onChange={(d: any) => setDate(d)}
                                                        dateFormat="dd/MM/yyyy"
                                                        className="date-input challan"
                                                        isClearable
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
                                                        value={form.LedgerID
                                                            ? {
                                                                value: form.LedgerID,
                                                                label: ledgerAccounts.find((l) => l.LedgerID === Number(form.LedgerID))?.name,
                                                            }
                                                            : null}
                                                        options={ledgerAccounts.map((l) => ({
                                                            value: l.LedgerID,
                                                            label: l.name,
                                                        }))}
                                                        onChange={(opt) =>
                                                            setForm((prev) => ({
                                                                ...prev,
                                                                LedgerID: Number(opt?.value),
                                                                PartyName: opt?.label,
                                                            }))
                                                        }
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
                                                            <div className="narration-flex align-items-center">
                                                                <div className="text-end px-0">
                                                                    <h3 className="particular-label">Particulars</h3>
                                                                </div>
                                                                <div className="table-rows">
                                                                    <Select
                                                                        className="react-select w-100"
                                                                        value={
                                                                            singleRow.name
                                                                                ? {
                                                                                    value: singleRow.name,
                                                                                    label: singleRow.name,
                                                                                }
                                                                                : null
                                                                        }
                                                                        options={ledgerAccounts.map((l) => ({
                                                                            value: l.name,
                                                                            label: l.name,
                                                                            id: l.LedgerID,
                                                                        }))}
                                                                        onChange={(opt) => {
                                                                            setSingleRow((prev) => ({
                                                                                ...prev,
                                                                                name: opt.label,
                                                                                AccountingLedgerID: opt.id,
                                                                            }));
                                                                        }}
                                                                        placeholder="Select Account"
                                                                        styles={selectCompactStyles}
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
                                                                        className="amount-input challan "
                                                                    />
                                                                </div>
                                                                <div className=" d-flex justify-content-end" >
                                                                    <button className="add-btn px-2 text-nowrap" onClick={addParticular}>
                                                                        <FiPlus size={14} /> {editParticularId ? "Update Particular" : "Add Particular"}
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
                                                    <textarea
                                                        rows="1"
                                                        className="narration-text"
                                                        value={form.Narration}
                                                        onChange={(e) =>
                                                            setForm({ ...form, Narration: e.target.value })
                                                        }
                                                        placeholder="Narration..."
                                                    />
                                                    <button className="save-btn" onClick={handleInsertAndUpdate} disabled={isSubmitting}>
                                                        <FiSave size={16} />{" "}
                                                        {isSubmitting
                                                            ? currentEditId !== null ? "Updating..." : "Saving..."
                                                            : currentEditId !== null ? "Update Receipt" : "Save Receipt"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </>
            )}

            <ConfirmModal show={showModal}
                handleClose={() => setShowModal(false)}
                handleConfirm={() => {
                    if (selectedId !== null) {
                        fetchDeleteData(selectedId);
                    }
                    setShowModal(false);
                }}
            />
        </>
    );
};

export default Receipt;
