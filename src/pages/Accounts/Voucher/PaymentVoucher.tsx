import React, { useEffect, useState } from "react";
import "./PaymentVoucher.css";
import Select from "react-select";
import { FiPlus, FiSave } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toastifyError, toastifySuccess } from "@/common/AlertMsg";
import DataTable from "react-data-table-component";
import { compactHeaderStyles, selectCompactStyles } from "@/common/Utility";
import { fetchPostData, AddDeleteUpadate } from "@/components/hooks/Api";
import useResizableColumns from "@/components/customHooks/UseResizableColumns";
import { useNavigate, useLocation } from "react-router-dom";

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

interface PaymentVoucherProps {
    editId?: number | null;
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

const PaymentVoucher: React.FC<PaymentVoucherProps> = () => {
    const [date, setDate] = useState(new Date());
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [singleRow, setSingleRow] = useState({ name: "", amount: "" });
    const [particulars, setParticulars] = useState([]);
    const [editParticularId, setEditParticularId] = useState<number | null>(null);
    const [ledgerAccounts, setLedgerAccounts] = useState<ledAccount[]>([]);
    const [particular, setParticular] = useState<ledAccount[]>([]);
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
    const navigate = useNavigate();
    const { state } = useLocation();
    const editId = state?.editId ?? null;

    const removeParticular = (id: any) => {
        setParticulars(particulars.filter((p) => p.id !== id));

        setForm((prev) => ({
            ...prev,
            AccountObj: prev.AccountObj.filter((item: any) => item.SrNo !== id)
        }));
    };

    const handleEditParticular = (row: any) => {
        setSingleRow({
            name: row.ledgerName,
            amount: row.amount.toString(),
            AccountingLedgerID: row.AccountingLedgerID
        });
        setEditParticularId(row.id);
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
    const fetchInsertData = async () => {
        if (!form.LedgerID) return toastifyError("Please select Account");
        if (!form.AccountObj.length) return toastifyError("Please add at least one Particular");

        try {
            setIsSubmitting(true);

            const formattedDate = date.toLocaleDateString("en-GB");
            const totalAmount = form.AccountObj.reduce((sum, obj) => sum + obj.amount, 0);

            const payload = {
                ...form,
                VchDate: formattedDate,
                // VoucherNo: "Auto Generated",
                // VoucherType: "Payment",
                TotalAmt: totalAmount,
                CompanyId: Number(localStorage.getItem("companyID")),
            };

            const response = await fetchPostData("Accountingvoucher/Insert_Accountingvoucher", payload);

            if (response) {
                toastifySuccess("Voucher saved successfully");
                handleReset();
                setForm(prev => ({ ...prev, AccountObj: [] }));
                setParticulars([]);
                navigate("/data-list");
            } else {
                toastifyError("Failed to save voucher");
            }
        } catch {
            toastifyError("Error while inserting voucher.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const fetchUpdateData = async (form: Voucher, id: number) => {
        try {
            const payload = {
                ...form,
                ID: id,
                CompanyId: Number(localStorage.getItem("companyID")),
            };
            const response = await fetchPostData('Accountingvoucher/Insert_Accountingvoucher', payload);
            // console.log(response);

            if (response) {
                toastifySuccess("Item Updated Successfully");
                // await fetchGetData();
                navigate("/data-list");
                return true;
            } else {
                toastifyError("Item is not Updated");
                return false;
            }
        } catch {
            toastifyError("Error in Updating a Data.");
            return false;
        }
    }

    const fetchSingleData = async (Id: number) => {
        try {
            const response = await AddDeleteUpadate('Accountingvoucher/GetSingleData_Accountingvoucher', {
                ID: Id
            });
            console.log(response);
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
                    VoucherType: header.VoucherType ?? "Payment",
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
        if (editId && ledgerAccounts.length > 0) {
            fetchSingleData(editId);
        }
    }, [editId, ledgerAccounts]);

    useEffect(() => {
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
        })
    }

    const handleInsertAndUpdate = async () => {
        if (editId) {
            const success = await fetchUpdateData(form, editId);

            if (success) {
                handleReset();
            }
        }
        if (!editId) {
            const success = await fetchInsertData(form);
            if (success) setShowDetailForm(false);
        }
    }

    return (
        <div className="voucher-container">
            <div className="voucher-card">
                <div className="row align-items-center">
                    {/* Voucher-No */}
                    <div className="col-lg-1 text-end voucher-col px-0">
                        <label className="text-nowrap text-end">Voucher No.</label>
                    </div>
                    <div className="col-lg-3">
                        <input type="text"
                            className="voucher-col-input challan"
                            value="Auto Generated"
                            // onChange={(e) => setVoucherNo(e.target.value)}
                            readOnly={true}
                            placeholder="Enter No."
                        />
                    </div>
                    {/* Date */}
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
                        <textarea rows="1" className="narration-text"
                            value={form.Narration}
                            onChange={(e) => setForm({ ...form, Narration: e.target.value })}
                            placeholder="Narration..."
                        />
                        <button className="save-btn" onClick={handleInsertAndUpdate} disabled={isSubmitting}>
                            <FiSave size={16} /> {isSubmitting ? (editId ? "Updating..." : "Saving...") : (editId ? "Update Voucher" : "Save Voucher")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentVoucher;