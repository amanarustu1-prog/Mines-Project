import React, { useState, useEffect } from 'react';
import './Ledger.css';
import DataTable from "react-data-table-component";
import Select from 'react-select';
import { customStyles, requiredColorStyles } from '@/common/Utility';
import { fetchPostData } from '@/components/hooks/Api';
import { toastifyError, toastifySuccess } from '@/common/AlertMsg';
import useResizableColumns from '@/components/customHooks/UseResizableColumns';
import ConfirmModal from '@/common/ConfirmModal';
import { getShowingDateText } from '@/common/DateFormat';
import * as XLSX from 'xlsx';
import { FaFileExcel } from 'react-icons/fa';

//==================== Icon Components ====================
const BookOpen = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);

const Plus = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
);

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

const Save = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
);

// ==================== Interfaces ====================
interface LedgerAccount {
    //Top-Fields
    LedgerID: number
    Name: string;
    AccountGroup: string;
    AccountGroupId: number;

    // Mailing-Details
    MailingName: string;
    Address: string;
    StateID: number;
    State: string;
    District: string;
    DistrictID: number;
    pincode: number;
    MobileNo: number;
    email: string;

    // Tax-Registration-Details
    gstregistrationtype: string;
    gstno: string;
    panNo: string;

    // Bank-Account-Details
    bankaccountholder: string;
    bankAcNo: number;
    bankifsc: string;
    bankname: string;
    bankbranch: string;
    isActive: boolean;
    CreatedDate: string;
    UpdatedDate: string;
}

interface LedgerData {
    //Top-Fields
    LedgerID: number;
    Name: string;
    AccountGroup: string;
    AccountGroupId: number;

    // Mailing-Details
    MailingName: string;
    Address: string;
    StateID: number;
    State: string;
    District: string;
    DistrictID: number;
    pincode: number;
    MobileNo: number;
    email: string;

    // Tax-Registration-Details
    gstregistrationtype: string;
    gstno: string;
    panNo: string;

    // Bank-Account-Details
    bankaccountholder: string;
    bankAcNo: number;
    bankifsc: string;
    bankname: string;
    bankbranch: string;
}

interface Groups {
    GroupID: number;
    Description: string;
}

interface State {
    ID: number;
    Description: string;
}

interface District {
    DistrictID: number;
    DistrictName: string;
}

interface ZIPCode {
    ZipCodeID: number,
    ZipCodeName: string
}

interface Bank {
    ID: number;
    BankName: string;
}

const Ledger: React.FC = () => {
    const [ledgerAccounts, setLedgerAccounts] = useState<LedgerAccount[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterGroup, setFilterGroup] = useState('all');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [editingAccount, setEditingAccount] = useState<LedgerAccount | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
    const [showDetailForm, setShowDetailForm] = useState(false);
    // New-State
    const [ledgerData, setLedgerData] = useState<LedgerData[]>([]);
    const [editItemId, setEditItemId] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [accountGroup, setAccountGroup] = useState<Groups[]>([]);
    const [state, setState] = useState<State[]>([]);
    const [district, setDistrict] = useState<District[]>([]);
    const [zipCode, setZipCode] = useState<ZIPCode[]>([]);
    const [bank, setBank] = useState<Bank[]>([]);
    const [formData, setFormData] = useState<LedgerAccount>({
        //Top-Fields
        LedgerID: 0,
        Name: '',
        AccountGroup: '',
        AccountGroupId: 0,

        // Mailing-Details

        MailingName: '',
        Address: '',
        StateID: 0,
        State: '',
        DistrictID: 0,
        District: '',
        pincode: 0,
        MobileNo: 0,
        email: '',

        // Tax-Registration-Details
        gstregistrationtype: '',
        gstno: '',
        panNo: '',

        // Bank-Account-Details
        bankaccountholder: '',
        bankAcNo: 0,
        bankifsc: '',
        bankname: '',
        bankbranch: '',
        isActive: true,
        CreatedDate: '',
        UpdatedDate: ''
    });

    // ===================TODO-Func====================
    const fetchGetData = async () => {
        try {
            const payload = { CompanyId: 1, IsActive: 1 };
            const response = await fetchPostData('AccountingLedger/GetData_AccountingLedger', payload);
            // console.log(response);
            if (response && Array.isArray(response)) {
                setLedgerData(response);
            } else {
                setLedgerData([]);
            }
        } catch {
            toastifyError("Error fetching the Data");
        }
    }

    const fetchInsertData = async (formData: any) => {
        try {
            const response = await fetchPostData('AccountingLedger/Insert_AccountingLedger', {
                ...formData,
                CompanyId: localStorage.getItem('companyID')
            });
            // console.log(response);

            if (response) {
                toastifySuccess("Item Added successfully");
                await fetchGetData();
                return true;
            } else {
                toastifyError("Item is not Inserted");
                return false;
            }
        } catch {
            toastifyError("Error in inserting a Data.");
            return false;
        }
    }

    const fetchUpdateData = async (formData: LedgerData, id: number) => {
        try {
            const response = await fetchPostData('AccountingLedger/Update_AccountingLedger', {
                ...formData,
                LedgerID: id,
                CompanyId: localStorage.getItem('companyID')
            });
            // console.log(response);

            if (response) {
                toastifySuccess("Item Updated Successfully");
                await fetchGetData();
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

    const fetchDeleteData = async (Id: number) => {
        try {
            const response = await fetchPostData('AccountingLedger/Delete_AccountingLedger', {
                "LedgerID": Id,
                "IsActive": 1
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

    const fetchSingleData = async (Id: number) => {
        try {
            const response = await fetchPostData('AccountingLedger/GetSingleData_AccountingLedger', {
                "LedgerID": Id
            });
            // console.log(response);
            if (response) {
                const record = response[0];
                // console.log(record);
                setFormData({
                    //Top-Fields
                    LedgerID: record.LedgerID,
                    Name: record.Name,
                    AccountGroup: record.AccountGroup,
                    AccountGroupId: record.AccountGroupId,

                    // Mailing-Details
                    MailingName: record.MailingName,
                    Address: record.Address,
                    StateID: record.StateID,
                    State: record.State,
                    pincode: record.pincode,
                    MobileNo: record.MobileNo,
                    email: record.email,

                    // Tax-Registration-Details
                    gstregistrationtype: record.gstregistrationtype,
                    gstno: record.gstno,
                    panNo: record.panNo,

                    // Bank-Account-Details
                    bankaccountholder: record.bankaccountholder,
                    bankAcNo: record.bankAcNo,
                    bankifsc: record.bankifsc,
                    bankname: record.bankname,
                    bankbranch: record.bankbranch,
                    isActive: true,
                    CreatedDate: record.CreatedDate,
                    UpdatedDate: record.UpdatedDate
                })
            }
        } catch {
            toastifyError("Error in getting a Single Data");
        }
    }

    // =================== DropDown ====================
    const fetchAccountGroup = async () => {
        try {
            const response = await fetchPostData('AccountingGroups/GetDataDropDown_AccountingGroups', {
                CompanyId: 1
            })
            // console.log(response);
            if (response && Array.isArray(response)) {
                setAccountGroup(response);
            } else {
                setAccountGroup([]);
            }
        }
        catch {
            toastifyError("Error in getting a Account Group");
        }
    }

    const fetchState = async () => {
        try {
            const response = await fetchPostData('State/GetDataDropDown_State', {
                CompanyId: Number(localStorage.getItem('companyID')),
            });
            // console.log(response);

            if (response && Array.isArray(response)) {
                setState(response);
            }
        } catch {
            toastifyError('Error fetching States');
        }
    }

    const fetchDistrict = async (stateID: number | string) => {
        try {
            const response = await fetchPostData('District/GetDataDropDown_District', {
                StateId: stateID,
                CompanyId: Number(localStorage.getItem('companyID')),
            })
            // console.log(response);
            if (response && Array.isArray(response)) {
                setDistrict(response);
            } else {
                setDistrict([]);
            }
        } catch {
            toastifyError('Error fetching District');
        }
    }

    const fetchZipCode = async (districtId: number | string) => {
        try {
            const response = await fetchPostData('ZipCode/GetDataDropDown_ZipCode', {
                CompanyId: Number(localStorage.getItem('companyID')),
                DistrictId: districtId
            })
            // console.log(response);
            if (response && Array.isArray(response)) {
                setZipCode(response);
            }
            else {
                setZipCode([]);
            }
        } catch {
            toastifyError("Error fetching Zip Code");
        }
    }

    const fetchBankName = async () => {
        try {
            const response = await fetchPostData('Bank/GetDataDropDown_Bank', {
                CompanyId: 1
            });
            console.log(response);

            if (response && Array.isArray(response)) {
                setBank(response);
            } else {
                setBank([]);
            }
        }
        catch {
            toastifyError("Error fetching Bank name")
        }
    }



    useEffect(() => {
        if (editItemId) {
            fetchSingleData(editItemId);
        }
    }, [editItemId]);

    useEffect(() => {
        fetchGetData();
        fetchAccountGroup();
        fetchState();
        fetchBankName();
    }, []);

    const Columns = [
        {
            name: "Ledger Name",
            selector: (row: LedgerData) => row.Name,
            sortable: true,
            cell: (row: LedgerData) => (
                <div>
                    <div className="ledger-management-font-medium">{row.MailingName}</div>
                </div>
            )
        },
        {
            name: "Accounting Group",
            selector: (row: LedgerData) => row.AccountGroup,
            sortable: true,
            cell: (row: LedgerData) => (
                <span>{row.AccountGroup}</span>
            )
        },

        // Mailing-Details
        {
            name: "Name",
            selector: (row: LedgerData) => row.Name,
            sortable: true,
            cell: (row: LedgerData) => (
                <span>{row.Name}</span>
            )
        },
        {
            name: "Address",
            selector: (row: LedgerData) => row.Address,
            sortable: true,
            cell: (row: LedgerData) => (
                <span>{row.Address}</span>
            )
        },
        {
            name: "State",
            selector: (row: LedgerData) => row.State,
            sortable: true,
            cell: (row: LedgerData) => (
                <span>{row.State}</span>
            )
        },
        {
            name: "District",
            selector: (row: LedgerData) => row.District,
            sortable: true,
            cell: (row: LedgerData) => (
                <span>{row.District}</span>
            )
        },
        {
            name: "PinCode",
            selector: (row: LedgerData) => {
                const pincode = zipCode.find((p) => p.ZipCodeID === Number(row.pincode));
                return pincode?.ZipCodeName;
            },
            sortable: true,
            cell: (row: LedgerData) => {
                const pinCode = zipCode.find((p) => p.ZipCodeID === Number(row.pincode));
                return <span>{pinCode?.ZipCodeName}</span>
            }
        },
        {
            name: "Mobile-No",
            selector: (row: LedgerData) => row.MobileNo,
            sortable: true,
            cell: (row: LedgerData) => (
                <span>{row.MobileNo}</span>
            )
        },
        {
            name: "Email",
            selector: (row: LedgerData) => row.email,
            sortable: true,
            cell: (row: LedgerData) => (
                <span>{row.email}</span>
            )
        },

        // Tax-Registration-Details
        {
            name: "Registration-Type",
            selector: (row: LedgerData) => row.gstregistrationtype,
            sortable: true,
            cell: (row: LedgerData) => (
                <span>{row.gstregistrationtype}</span>
            )
        },
        {
            name: "GST No",
            selector: (row: LedgerData) => row.gstno,
            sortable: true,
            cell: (row: LedgerData) => (
                <span>{row.gstno}</span>
            )
        },
        {
            name: "PAN No",
            selector: (row: LedgerData) => row.panNo,
            sortable: true,
            cell: (row: LedgerData) => (
                <span>{row.panNo}</span>
            )
        },

        // Bank-Account-Details
        {
            name: "A/c Holder Name",
            selector: (row: LedgerData) => row.bankaccountholder,
            sortable: true,
            cell: (row: LedgerData) => (
                <span>{row.bankaccountholder}</span>
            )
        },
        {
            name: "Account No",
            selector: (row: LedgerData) => row.bankAcNo,
            sortable: true,
            cell: (row: LedgerData) => (
                <span>{row.bankAcNo}</span>
            )
        },
        {
            name: "IFSC Code",
            selector: (row: LedgerData) => row.bankifsc,
            sortable: true,
            cell: (row: LedgerData) => (
                <span>{row.bankifsc}</span>
            )
        },
        {
            name: "Bank Name",
            selector: (row: LedgerData) => row.bankname,
            sortable: true,
            cell: (row: LedgerData) => (
                <span>{row.bankname}</span>
            )
        },
        {
            name: "Branch",
            selector: (row: LedgerData) => row.bankbranch,
            sortable: true,
            cell: (row: LedgerData) => (
                <span>{row.bankbranch}</span>
            )
        },

        //Dates
        {
            name: 'CreatedDate',
            selector: (row: LedgerAccount) => getShowingDateText(row.CreatedDate),
            sortable: true
        },
        {
            name: 'UpdatedDate',
            selector: (row: LedgerAccount) => getShowingDateText(row.UpdatedDate),
            sortable: true
        },

        // Actions
        {
            name: "Actions",
            cell: (row: LedgerAccount) => (
                <div className="ledger-management-flex ledger-management-gap-2">
                    <button onClick={() => { setEditItemId(row.LedgerID); setShowDetailForm(true); }} className="ledger-management-btn-icon" title="Edit">
                        <Edit className="ledger-management-icon-sm" />
                    </button>

                    <button onClick={() => { setSelectedId(row.LedgerID); setShowModal(true) }} className="ledger-management-btn-icon ledger-management-btn-icon-danger" title="Delete">
                        <Trash2 className="ledger-management-icon-sm" />
                    </button>
                </div>
            )
        }
    ];

    const resizeableColumns = useResizableColumns(Columns).map(col => ({
        ...col, minWidth: typeof col.minWidth === "number" ? `${col.minWidth}px` : col.minWidth
    }));

    const handleInsertAndUpdate = async () => {
        if (editItemId) {
            const success = await fetchUpdateData(formData, editItemId);

            if (success) {
                // resetdata();
                setShowDetailForm(false);
                // return;
            }
        }
        if (!editItemId) {
            const success = await fetchInsertData(formData);
            if (success) setShowDetailForm(false);
        }
    }

    const filteredData = ledgerData.filter((item: LedgerData) => {
        const term = searchTerm.toLowerCase();

        return (
            item.Name?.toLowerCase().includes(term) ||
            item.Name?.toLowerCase().includes(term) ||
            item.Address?.toLowerCase().includes(term) ||
            item.State?.toLowerCase().includes(term) ||
            item.email?.toLowerCase().includes(term) ||
            item.gstno?.toLowerCase().includes(term) ||
            item.bankname?.toLowerCase().includes(term) ||
            item.bankbranch?.toLowerCase().includes(term)
        );
    });

    const handleReset = () => {
        setFormData({
            LedgerID: 0,
            Name: '',
            AccountGroup: '',
            AccountGroupId: 0,
            MailingName: '',
            Address: '',
            State: '',
            pincode: 0,
            MobileNo: 0,
            email: '',
            gstregistrationtype: '',
            gstno: '',
            panNo: '',
            bankaccountholder: '',
            bankAcNo: 0,
            bankifsc: '',
            bankname: '',
            bankbranch: '',
            CreatedDate: '',
            UpdatedDate: ''
        });
        setEditItemId(null);
    };

    const exportToExcel = () => {
        const rows = (filteredData.length ? filteredData : ledgerData).map((item: LedgerData) => ({
            "Ledger ID": item.LedgerID,
            "Ledger Name": item.Name,
            "Account Group": item.AccountGroup,
            "Account Group ID": item.AccountGroupId,
            "Name": item.Name,
            "Address": item.Address,
            "State": item.State,
            "Pincode": item.pincode,
            "Mobile No": item.MobileNo,
            "Email": item.email,
            "Registration Type": item.gstregistrationtype,
            "GST No": item.gstno,
            "PAN No": item.panNo,
            "A/c Holder Name": item.bankaccountholder,
            "Account No": item.bankAcNo,
            "IFSC Code": item.bankifsc,
            "Bank Name": item.bankname,
            "Branch": item.bankbranch,
        }));

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(rows);
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const blob = new Blob([wbout], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "ledger.xlsx";
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const renderCreateForm = () => (
        <div className="ledger-management-tab-content">
            <div className="ledger-entry-form">
                {/* ---------------- TOP SECTION ---------------- */}
                <div className="row">
                    {/* Ledger Name */}
                    <div className="col-md-6 mb-2 mt-1" style={{ paddingRight: "2rem" }}>
                        <label className="ledger-management-label">Ledger Name <span className="text-danger">*</span></label>
                        <input
                            type="text"
                            placeholder="Enter Ledger Name"
                            className="ledger-management-input w-100 challan requiredColor"
                            value={formData.LedgerName || ""}
                            onChange={(e) => setFormData({ ...formData, LedgerName: e.target.value })}
                        />
                    </div>

                    <div className='col-md-6 mb-2'></div>
                </div>

                <div className="row">
                    {/* -- BANK ACCOUNT DETAILS -- */}
                    <div className="col-md-6" style={{ borderRight: "1px solid #ccc", borderTop: "1px solid #ccc", paddingRight: "2rem" }}>
                        {/* Accounting Group */}
                        <div className='row'>
                            <div className="col-md-12  mb-1 mt-1">
                                <label className="ledger-management-label">Accounting Group  <span className="text-danger">*</span></label>
                                <Select
                                    className="w-100 requiredColor"
                                    placeholder="Select Ledger Group"
                                    value={
                                        formData.ledgerGroup
                                            ? { label: formData.ledgerGroup, value: formData.ledgerGroup }
                                            : null
                                    }
                                    onChange={(selected) =>
                                        handleInputChange("ledgerGroup", selected ? selected.value : "")
                                    }
                                    options={ledgerGroups.map((grp) => ({
                                        label: grp,
                                        value: grp,
                                    }))}
                                    isClearable
                                    styles={requiredColorStyles}
                                />

                            </div>
                        </div>
                        <h4 className="mb-1 section-heading  pt-2 ">Bank Account Details</h4>

                        <div className="row">
                            {/* Account Holder-Name */}
                            <div className="col-md-6 mb-1">
                                <label className="ledger-management-label">Account Holder's Name :</label>
                                <input type="text" className="ledger-management-input w-100 challan challan"
                                    placeholder="Enter Account Holder's Name"
                                    value={formData.bankaccountholder || ""}
                                    onChange={(e) => setFormData({ ...formData, bankaccountholder: e.target.value })}
                                />
                            </div>

                            {/* Account-No */}
                            <div className="col-md-6 mb-1">
                                <label className="ledger-management-label">Account No. :</label>
                                <input type="text" className="ledger-management-input w-100 challan"
                                    placeholder="Enter Account No."
                                    value={formData.bankAcNo || ""}
                                    onChange={(e) => setFormData({ ...formData, bankAcNo: Number(e.target.value) })}
                                />
                            </div>

                            {/* IFSC Code */}
                            <div className="col-md-6 mb-1">
                                <label className="ledger-management-label">IFSC Code :</label>
                                <input
                                    type="text"
                                    placeholder="Enter IFSC Code"
                                    className="ledger-management-input w-100 challan"
                                    value={formData.bankifsc || ""}
                                    onChange={(e) => setFormData({ ...formData, bankifsc: e.target.value })}
                                />
                            </div>

                            {/* Bank-Name */}
                            <div className="col-md-6 mb-1">
                                <label className="ledger-management-label">Bank Name :</label>
                                <input
                                    type="text"
                                    placeholder="Enter Bank Name"
                                    className="ledger-management-input w-100 challan"
                                    value={formData.bankname || ""}
                                    onChange={(e) => setFormData({ ...formData, bankname: e.target.value })}
                                />
                            </div>

                            {/* Bank-Branch */}
                            <div className="col-md-12 mb-1">
                                <label className="ledger-management-label">Branch :</label>
                                <input type="text"
                                    placeholder="Enter Branch"
                                    className="ledger-management-input w-100 challan"
                                    value={formData.bankbranch || ""}
                                    onChange={(e) => setFormData({ ...formData, bankbranch: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/*-- MAILING DETAILS + TAX REGISTRATION --*/}
                    <div className="col-md-6" style={{ borderTop: "1px solid #ccc", paddingLeft: "2rem" }}>
                        {/* MAILING DETAILS */}
                        <h4 className="section-heading mb-1 pt-2">Mailing Details</h4>

                        <div className="row">
                            {/* Name */}
                            <div className="col-md-12 mb-1">
                                <label className="ledger-management-label">Name :</label>
                                <input type="text" className="ledger-management-input w-100 challan"
                                    placeholder="Enter Name"
                                    value={formData.Name || ""}
                                    onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                                />
                            </div>

                            {/* Address */}
                            <div className="col-md-12 ">
                                <label className="ledger-management-label">Address :</label>
                                <textarea className="ledger-management-textarea w-100 challan" rows={2}
                                    placeholder="Enter Address"
                                    value={formData.Address || ""}
                                    onChange={(e) => setFormData({ ...formData, Address: e.target.value })}
                                />
                            </div>

                            {/* State */}
                            <div className="col-md-6 mb-1">
                                <label className="ledger-management-label">State :</label>
                                <input
                                    type="text"
                                    placeholder="Enter State"
                                    className="ledger-management-input w-100 challan"
                                    value={formData.State || ""}
                                    onChange={(e) => setFormData({ ...formData, State: e.target.value })}
                                />
                            </div>

                            {/* Pincode */}
                            <div className="col-md-6 mb-1">
                                <label className="ledger-management-label">Pincode :</label>
                                <input
                                    type="text"
                                    placeholder="Enter Pincode"
                                    className="ledger-management-input w-100 challan"
                                    value={formData.pincode || ""}
                                    onChange={(e) => setFormData({ ...formData, pincode: Number(e.target.value) })}
                                />
                            </div>

                            {/* Mobile-No */}
                            <div className="col-md-6 mb-1">
                                <label className="ledger-management-label">Mobile No :</label>
                                <input
                                    type="text"
                                    placeholder="Enter Mobile No"
                                    className="ledger-management-input w-100 challan"
                                    value={formData.MobileNo || ""}
                                    onChange={(e) => setFormData({ ...formData, MobileNo: Number(e.target.value) })}
                                />
                            </div>

                            {/* Email */}
                            <div className="col-md-6 mb-1">
                                <label className="ledger-management-label">Email :</label>
                                <input type="text" className="ledger-management-input w-100 challan"
                                    placeholder="Enter Email"
                                    value={formData.email || ""}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* TAX REGISTRATION */}
                        <h4 className="section-heading mt-2 mb-1">Tax Registration Details</h4>

                        <div className="row">
                            {/* Registration Type */}
                            <div className="col-md-12 mb-1 ">
                                <label className="ledger-management-label">Registration Type :</label>
                                <Select
                                    classNamePrefix="select"
                                    placeholder="Enter Registration Type"
                                    value={
                                        formData.gstregistrationtype
                                            ? { label: formData.gstregistrationtype, value: formData.gstregistrationtype }
                                            : null
                                    }
                                    onChange={(opt) =>
                                        setFormData({
                                            ...formData,
                                            gstregistrationtype: opt ? opt.value : ""
                                        })
                                    }
                                    options={[
                                        { label: "Registered", value: "Registered" },
                                        { label: "Unregistered", value: "Unregistered" },
                                        { label: "Composition", value: "Composition" },
                                        { label: "Consumer", value: "Consumer" },
                                        { label: "Input Service Distributor", value: "ISD" },
                                        { label: "E-commerce Operator", value: "ECO" },
                                    ]}
                                    isClearable={true}
                                    menuPlacement="top"
                                    styles={selectCompactStyles}
                                />


                            </div>

                            {/* GST-No */}
                            <div className="col-md-6 mb-1">
                                <label className="ledger-management-label">GST No :</label>
                                <input type="text" className="ledger-management-input w-100 challan"
                                    placeholder="Enter GST No"
                                    value={formData.gstno || ""}
                                    onChange={(e) => setFormData({ ...formData, gstno: e.target.value })}
                                />
                            </div>

                            {/* PAN No */}
                            <div className="col-md-6 mb-1">
                                <label className="ledger-management-label">PAN No :</label>
                                <input type="text" className="ledger-management-input w-100 challan"
                                    placeholder="Enter PAN No"
                                    value={formData.panNo || ""}
                                    onChange={(e) => setFormData({ ...formData, panNo: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ---------------- ACTION BUTTONS ---------------- */}
                <div className="d-flex justify-content-between mt-2">
                    <button className="btn btn-outline-secondary text-white" style={{ backgroundColor: "#6c757d", borderColor: "#6c757d" }} onClick={handleReset}>Reset</button>

                    <button onClick={handleInsertAndUpdate} className="ledger-management-btn ledger-management-btn-primary">
                        <Save className="ledger-management-icon" />
                        {editItemId ? "Update Account" : "Save Account"}
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="ledger-management">
            {/* Header */}
            <header className="ledger-management-header">
                <div className="ledger-management-header-content">
                    <div className="ledger-management-title-section">
                        <BookOpen className="ledger-management-header-icon" />
                        <div>
                            <h1 className="ledger-management-title">Ledger Management</h1>
                            <p className="ledger-management-subtitle">
                                Manage your chart of accounts and ledger entries
                            </p>
                        </div>
                    </div>

                    <div className="ledger-management-header-actions">
                        <button type="button" onClick={exportToExcel} className="btn btn-sm btn-primary py-1 d-flex align-items-center gap-2 ms-2">
                            <FaFileExcel size={14} /> Export
                        </button>
                        <button onClick={() => setShowDetailForm(true)} className="ledger-management-btn ledger-management-btn-primary">
                            <Plus className="ledger-management-icon" />
                            Add New Account
                        </button>
                    </div>
                </div>
            </header>

            {/* Create/Edit Modal */}
            {showDetailForm && (
                <>
                    <div className="modal fade show d-block" tabIndex={-1} role="dialog">
                        <div className="modal-dialog modal-xl modal-dialog-scrollable" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title">{editingAccount ? 'Edit Ledger Account' : 'Create New Ledger Account'}</h3>
                                    <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowDetailForm(false)}></button>
                                </div>
                                <div className="modal-body py-1">
                                    {renderCreateForm()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </>
            )}

            {/* Main Content */}
            <main className="ledger-management-main" style={{ padding: "0.85rem" }}>
                <div className="ledger-management-tab-content">
                    {/* Filters */}
                    <div className="row g-3 mb-2 align-items-center mt-1">
                        {/* Group Name */}
                        <div className="col-lg-1 text-right mt-0    ">
                            <label className="form-label mb-0 ">Group Name</label>
                        </div>
                        <div className='col-lg-3 mt-0'>
                            <input type="text" placeholder="Group Name"
                                className="form-control form-control-sm challan requiredColor"
                                style={{ borderRadius: "5px" }}
                            />
                        </div>

                        {/* Under */}
                        <div className="col-lg-1 text-right mt-0">
                            <label className="form-label mb-0 ">Under</label>
                        </div>
                        <div className='col-lg-3 mt-0'>
                            <Select
                                className="w-100 requiredColor"
                                placeholder="Select Ledger Group"
                                value={formData.AccountGroupId ? {
                                    value: formData.AccountGroupId,
                                    label: accountGroup.find((a) => a.GroupID === Number(formData.AccountGroupId))?.Description
                                } : null}
                                options={accountGroup.map((a) => ({
                                    value: a.GroupID,
                                    label: a.Description
                                }))}
                                onChange={(opt) => setFormData((prev) => ({
                                    ...prev,
                                    AccountGroup: opt?.label,
                                    AccountGroupId: opt?.value
                                }))}
                                isClearable
                                styles={requiredColorStyles}
                            />
                        </div>
                        <div className='col-lg-2 mt-0'></div>
                        <div className='col-lg-2 mt-0'>
                            <input type="text" placeholder="Search..."
                                className="form-control form-control-sm challan"
                                style={{ borderRadius: "5px" }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Accounts Table */}
                    <div className="ledger-management-table-container" >
                        <DataTable
                            columns={resizeableColumns}
                            data={filteredData}
                            pagination
                            highlightOnHover
                            striped
                            noDataComponent="No accounts found matching your criteria."
                            customStyles={customStyles}
                        />
                    </div>
                </div>
            </main>

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

export default Ledger;