import React, { useState, useMemo, useEffect } from "react";
import "./PaymentVoucher.css";
import DataTable from "react-data-table-component";
import { customStyles } from "@/common/Utility";
import PaymentVoucher from "./PaymentVoucher";
import { fetchPostData } from "@/components/hooks/Api";
import { toastifyError, toastifySuccess } from "@/common/AlertMsg";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "@/common/ConfirmModal";
import DatePicker from "react-datepicker";


const Edit3 = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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
    VchrNo: number;
    VchrType: string;
    Name: string;
    DebitAmt: number;
    CreditAmt: number;
    vchId: number;
    Date: string;
    PartyName: string;
    TotalAmt: number;
}

function DataList() {
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState("");
    const [showVoucher, setShowVoucher] = useState(false);
    const [voucher, setVoucher] = useState<Voucher[]>([]);
    const [editItemId, setEditItemId] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [rows, setRows] = useState<Voucher[]>([]);
    const [fromDate, setFromDate] = useState<Date | null>(null);
    const [toDate, setToDate] = useState<Date | null>(null);
    const [showVoucherModal, setShowVoucherModal] = useState(false);
    const [currentEditId, setCurrentEditId] = useState<number | null>(null);

    const formatDate = (date: Date | null) => {
        if (!date) return "";
        return date.toISOString().split("T")[0];
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
    const fetchGetData = async (from: Date | null = null, to: Date | null = null): Promise<Voucher[]> => {
        try {
            const payload = {
                VoucherNo: "",
                Narration: "",
                VoucherType: "Payment",
                FromDate: formatDate(from),
                ToDate: formatDate(to),
                CompanyId: localStorage.getItem('companyID')
            };

            const response = await fetchPostData('Accountingvoucher/GetData_Accountingvoucher', payload);
            // console.log(response);

            if (response && Array.isArray(response)) {
                console.log(response, "response")
                const modifiedData = response.map((item) => ({
                    ...item,
                    AccountingObj: item.AccountingObj ? JSON.parse(item.AccountingObj) : []
                }));
                console.log(modifiedData, "modifiedData")
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

    // const handleSearch = () => {
    //     fetchGetData(fromDate, toDate);
    // };

    const handleSearch = async () => {
        const data = await fetchGetData(fromDate, toDate);

        if (!data || data.length === 0) {
            toastifyError("No data found for selected dates");
        }
    };

    const handleFromDateChange = (date: Date | null) => {
        setFromDate(date);
        if (date) {
            setToDate(date); // auto-fill To Date
        }
    };




    const fetchDeleteData = async (Id: number) => {
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
        setCurrentEditId(null);
        setShowVoucherModal(true);
    };

    const columns = [
        {
            name: "Actions",
            cell: (row: Voucher) => (
                <div className="ledger-management-flex ledger-management-gap-2">
                    <button className="ledger-management-btn-icon mr-0  " title="Edit"
                        onClick={() => { setCurrentEditId(row.vchId); setShowVoucherModal(true); }}>
                        <Edit3 className="ledger-management-icon-sm" />
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
            selector: (row: Voucher) => row.Date,
            sortable: true,
        },
        {
            name: "Particular",
            selector: (row: Voucher) => row.PartyName,
            sortable: true,
        },
        {
            name: "Vch Type",
            selector: (row: Voucher) => row.VchrType,
            sortable: true,
        },
        {
            name: "Vch No",
            selector: (row: Voucher) => row.VchrNo,
            sortable: true,
        },
        {
            name: "DebitAmt",
            selector: (row: Voucher) => row.TotalAmt,
            sortable: true,
        },
        {
            name: "CreditAmt",
            selector: (row: Voucher) => row.CreditAmt,
            sortable: true,
        },
    ];

    // if (showVoucher) {
    //     alert(editItemId);
    //     return (
    //         <PaymentVoucher editId={editItemId} />
    //     );
    // }

    return (
        <div className="voucher-container list-container">

            <div className="voucher-card mb-2">

                {/* ===================== DATE FILTER ROW ===================== */}
                <div className="row align-items-center ">
                    {/* ===================== PAGE HEADER ===================== */}
                    <div className="page-header col-md-3">
                        <h5 className="voucher-page-title mb-0">Payment Voucher List</h5>
                        <div className="header-line"></div>
                    </div>
                    {/* From Date */}
                    <div className="col-md-1 text-right px-0">
                        <label className="voucher-date-label mb-0 text-nowrap">From Date</label>
                    </div>
                    <div className="col-md-3">
                        <DatePicker
                            selected={fromDate}
                            onChange={handleFromDateChange}
                            dateFormat="yyyy-MM-dd"
                            className="voucher-search-input challan"
                            placeholderText="From Date"
                            isClearable
                        />
                    </div>


                    {/* To Date */}
                    <div className="col-md-1 text-right px-0 ">
                        <label className="voucher-date-label mb-0 text-nowrap">To Date</label>
                    </div>
                    <div className="col-md-3">
                        <DatePicker
                            selected={toDate}
                            onChange={(date) => setToDate(date)}
                            dateFormat="yyyy-MM-dd"
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
                            + Add Voucher
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


            {showVoucherModal && (
                <>
                    <div className="modal fade show d-block" tabIndex={-1}>
                        <div className="modal-dialog modal-xl">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{currentEditId ? "Edit Payment Voucher" : "Add Payment Voucher"}</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowVoucherModal(false)}></button>
                                </div>
                                <div className="modal-body p-1">
                                    <PaymentVoucher
                                        editId={currentEditId}
                                        onClose={() => {
                                            setShowVoucherModal(false);
                                            fetchGetData(fromDate, toDate);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </>
            )}

            <ConfirmModal show={showModal} handleClose={() => setShowModal(false)} handleConfirm={() => { if (selectedId !== null) { fetchDeleteData(selectedId); } setShowModal(false); }} />


        </div>
    );
}

export default DataList;
