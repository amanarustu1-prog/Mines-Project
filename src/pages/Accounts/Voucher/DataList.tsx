import React, { useState, useMemo, useEffect } from "react";
import "./PaymentVoucher.css";
import DataTable from "react-data-table-component";
import { customStyles } from "@/common/Utility";
import PaymentVoucher from "./PaymentVoucher";
import { fetchPostData } from "@/components/hooks/Api";
import { toastifyError, toastifySuccess } from "@/common/AlertMsg";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "@/common/ConfirmModal";

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

    const filteredData = useMemo(() => {
        if (!searchText.trim()) return rows;
        const term = searchText.toLowerCase();

        return rows.filter((row) => {
            return (
                row.PartyName?.toLowerCase().includes(term) ||
                row.TotalAmt.toString().includes(term)
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
            // console.log(response);

            if (response && Array.isArray(response)) {
                const modifiedData = response.map((item) => ({
                    ...item,
                    AccountingObj: item.AccountingObj ? JSON.parse(item.AccountingObj) : []
                }));
                setVoucher(modifiedData);
                setRows(modifiedData);
            } else {
                setVoucher([]);
                setRows([]);
            }
        } catch {
            toastifyError("Error fetching the Data");
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
        // setShowVoucher(true);
        navigate('/payment-voucher')
    };

    const columns = [
        {
            name: "Actions",
            cell: (row: Voucher) => (
                <div className="ledger-management-flex ledger-management-gap-2">
                    <button className="ledger-management-btn-icon mr-0" title="Edit"
                        onClick={() => { navigate('/payment-voucher', { state: { editId: row.vchId } }); }}>
                        <Edit className="ledger-management-icon-sm" />
                    </button>
                    <button className="ledger-management-btn-icon" title="Delete"
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
}

export default DataList;
