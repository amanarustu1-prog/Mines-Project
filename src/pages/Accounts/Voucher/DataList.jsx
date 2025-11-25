import React, { useState, useMemo } from "react";
import "./PaymentVoucher.css";
import DataTable from "react-data-table-component";
import { customStyles } from "@/common/Utility";
import PaymentVoucher from "./PaymentVoucher";

function Edit({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
        </svg>
    );
}

const initialData = [
    {
        id: 1,
        particular: "Cash",
        vchType: "Payment",
        vchNo: "PV-001",
        debitAmt: 1000,
        creditAmt: 0,
    },
    {
        id: 2,
        particular: "Bank",
        vchType: "Receipt",
        vchNo: "RV-002",
        debitAmt: 0,
        creditAmt: 2500,
    },
    {
        id: 3,
        particular: "Sales A/C",
        vchType: "Journal",
        vchNo: "JV-003",
        debitAmt: 5000,
        creditAmt: 0,
    },
];



function DataList() {
    const [searchText, setSearchText] = useState("");
    const [rows, setRows] = useState(initialData);
    const [showVoucher, setShowVoucher] = useState(false);

    const filteredData = useMemo(() => {
        if (!searchText.trim()) return rows;

        const term = searchText.toLowerCase();

        return rows.filter((row) => {
            return (
                row.particular.toLowerCase().includes(term) ||
                row.vchType.toLowerCase().includes(term) ||
                row.vchNo.toLowerCase().includes(term) ||
                String(row.debitAmt).includes(term) ||
                String(row.creditAmt).includes(term)
            );
        });
    }, [searchText, rows]);

    const handleVoucherSaved = (rowFromChild) => {
        setRows((prev) => [...prev, rowFromChild]);
        setShowVoucher(false);
    };

    const handleAddVoucher = () => {
        setShowVoucher(true);
    };
    const columns = [
        {
            name: "Actions",
            cell: (row) => (
                <div className="ledger-management-flex ledger-management-gap-2">
                    <button
                        className="ledger-management-btn-icon"
                        title="Edit"
                        onClick={() => {
                            console.log("Edit row:", row);
                            setShowVoucher(true);    // 👈 yahi se PaymentVoucher open hoga
                        }}
                    >
                        <Edit className="ledger-management-icon-sm" />
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: "Particular",
            selector: (row) => row.particular,
            sortable: true,
        },
        {
            name: "Vch Type",
            selector: (row) => row.vchType,
            sortable: true,
        },
        {
            name: "Vch No",
            selector: (row) => row.vchNo,
            sortable: true,
        },
        {
            name: "DebitAmt",
            selector: (row) => row.debitAmt,
            sortable: true,
        },
        {
            name: "CreditAmt",
            selector: (row) => row.creditAmt,
            sortable: true,
        },
    ];

    if (showVoucher) {
        return (
            <PaymentVoucher onSaved={handleVoucherSaved} />
        );
    }
    return (
        <div className="voucher-container">
            <div className="voucher-card">
                <div className="voucher-header">
                    <div className="voucher-header-left">
                        <input
                            type="text"
                            className="voucher-search-input challan"
                            placeholder="Search..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>

                    <div className="voucher-header-right">
                        <button
                            type="button"
                            className="save-btn"
                            onClick={handleAddVoucher}
                        >
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
                    fixedHeaderScrollHeight="200px"
                />
            </div>
        </div>
    );
}

export default DataList;
