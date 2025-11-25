import React, { useState, useMemo, useEffect } from "react";
import "./PaymentVoucher.css";
import DataTable from "react-data-table-component";
import { customStyles } from "@/common/Utility";
import PaymentVoucher from "./PaymentVoucher";
import { fetchPostData } from "@/components/hooks/Api";
import { toastifyError } from "@/common/AlertMsg";
import { useNavigate } from "react-router-dom";

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

interface Voucher {
    ID: Number;
    VchrNo: number;
    VchrType: string;
    Name: number;
    DebitAmt: number;
    CreditAmt: number;
    vchId: number;
    Date: string;
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

    const navigate = useNavigate()


    const [searchText, setSearchText] = useState("");
    const [rows, setRows] = useState(initialData);
    // const [showVoucher, setShowVoucher] = useState(false);
    const [voucher, setVoucher] = useState<Voucher[]>([]);
    const [editItemId, setEditItemId] = useState<number | null>(null);

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

    //Get-data
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
            console.log(response);

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

    useEffect(() => {
        fetchGetData();
    }, []);

    const handleVoucherSaved = (rowFromChild) => {
        setRows((prev) => [...prev, rowFromChild]);
        setShowVoucher(false);
    };

    const handleAddVoucher = () => {
        // setShowVoucher(true);
        navigate('/payment-voucher')
    };

    const columns = [
        {
            name: "Actions",
            cell: (row: Voucher) => (
                <div className="ledger-management-flex ledger-management-gap-2">
                    <button
                        className="ledger-management-btn-icon"
                        title="Edit"
                        onClick={() => {
                            setEditItemId(row.ID);
                            navigate('/payment-voucher');
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
            name: "Date",
            selector: (row: Voucher) => row.Date,
            sortable: true,
        },
        {
            name: "Particular",
            selector: (row: Voucher) => row.Name,
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
            selector: (row: Voucher) => row.DebitAmt,
            sortable: true,
        },
        {
            name: "CreditAmt",
            selector: (row: Voucher) => row.CreditAmt,
            sortable: true,
        },
    ];

    // if (showVoucher) {
    //     return (
    //         <PaymentVoucher editId={editItemId} />
    //     );
    // }

    return (
        <div className="voucher-container">
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
                    data={voucher}
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
    );
}

export default DataList;
