import React, { useState, useEffect } from 'react';
import './Ledger.css';
import DataTable from "react-data-table-component";
import Select from 'react-select';
import { customStyles } from '@/common/Utility';

// ==================== Icon Components ====================
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

const Eye = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const Download = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const RotateCcw = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 4v6h6" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
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
    id: string;
    ledgerName: string;
    ledgerGroup: string;
    aliasName?: string;
    openingBalance: number;
    balanceType: 'Dr' | 'Cr';
    currentBalance: number;
    asOnDate: string;
    gstRegistrationType: 'Regular' | 'Composition' | 'Unregistered';
    gstin?: string;
    panNo?: string;
    hsnSacCode?: string;
    tdsApplicable: boolean;
    tdsSection?: string;
    tdsRate?: number;
    address?: string;
    state?: string;
    city?: string;
    pincode?: string;
    mobile?: string;
    email?: string;
    bankName?: string;
    accountNo?: string;
    ifscCode?: string;
    branch?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

// ==================== Main Component ====================
const Ledger: React.FC = () => {
    // ==================== State Variables ====================
    const [ledgerAccounts, setLedgerAccounts] = useState<LedgerAccount[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterGroup, setFilterGroup] = useState('all');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [editingAccount, setEditingAccount] = useState<LedgerAccount | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
    const [showDetailForm, setShowDetailForm] = useState(false);
    // const [isFocused, setIsFocused] = useState(false);

    // Form state
    const [formData, setFormData] = useState<Partial<LedgerAccount>>({
        ledgerName: '',
        ledgerGroup: '',
        aliasName: '',
        openingBalance: 0,
        balanceType: 'Dr',
        asOnDate: new Date().toISOString().split('T')[0],
        gstRegistrationType: 'Unregistered',
        gstin: '',
        panNo: '',
        hsnSacCode: '',
        tdsApplicable: false,
        tdsSection: '',
        tdsRate: 0,
        address: '',
        state: '',
        city: '',
        pincode: '',
        mobile: '',
        email: '',
        bankName: '',
        accountNo: '',
        ifscCode: '',
        branch: '',
        isActive: true
    });

    // ==================== Sample Data ====================
    useEffect(() => {
        const sampleData: LedgerAccount[] = [
            {
                id: '1',
                ledgerName: 'Cash in Hand',
                ledgerGroup: 'Cash A/c',
                openingBalance: 50000,
                balanceType: 'Dr',
                currentBalance: 75000,
                asOnDate: '2024-01-01',
                gstRegistrationType: 'Unregistered',
                tdsApplicable: false,
                isActive: true,
                createdAt: '2024-01-01T00:00:00Z',
                updatedAt: '2024-01-01T00:00:00Z'
            },
            {
                id: '2',
                ledgerName: 'State Bank of India',
                ledgerGroup: 'Bank A/c',
                openingBalance: 100000,
                balanceType: 'Dr',
                currentBalance: 125000,
                asOnDate: '2024-01-01',
                gstRegistrationType: 'Unregistered',
                tdsApplicable: false,
                bankName: 'State Bank of India',
                accountNo: '1234567890',
                ifscCode: 'SBIN0001234',
                branch: 'Main Branch',
                isActive: true,
                createdAt: '2024-01-01T00:00:00Z',
                updatedAt: '2024-01-01T00:00:00Z'
            },
            {
                id: '3',
                ledgerName: 'ABC Construction Co.',
                ledgerGroup: 'Sundry Debtors',
                openingBalance: 25000,
                balanceType: 'Dr',
                currentBalance: 30000,
                asOnDate: '2024-01-01',
                gstRegistrationType: 'Regular',
                gstin: '27ABCDE1234F1Z5',
                panNo: 'ABCDE1234F',
                mobile: '9876543210',
                email: 'info@abcconstruction.com',
                address: '123 Business Street',
                city: 'Mumbai',
                state: 'Maharashtra',
                pincode: '400001',
                tdsApplicable: true,
                tdsSection: '194C',
                tdsRate: 2,
                isActive: true,
                createdAt: '2024-01-01T00:00:00Z',
                updatedAt: '2024-01-01T00:00:00Z'
            },
            {
                id: '4',
                ledgerName: 'XYZ Suppliers Pvt Ltd',
                ledgerGroup: 'Sundry Creditors',
                openingBalance: 15000,
                balanceType: 'Cr',
                currentBalance: 20000,
                asOnDate: '2024-01-01',
                gstRegistrationType: 'Regular',
                gstin: '27XYZAB1234G1Z6',
                panNo: 'XYZAB1234G',
                mobile: '9876543211',
                email: 'sales@xyzsuppliers.com',
                address: '456 Industrial Area',
                city: 'Pune',
                state: 'Maharashtra',
                pincode: '411001',
                tdsApplicable: false,
                isActive: true,
                createdAt: '2024-01-01T00:00:00Z',
                updatedAt: '2024-01-01T00:00:00Z'
            }
        ];
        setLedgerAccounts(sampleData);
    }, []);

    // ==================== Constants ====================
    const ledgerGroups = [
        'Cash A/c',
        'Bank A/c',
        'Sundry Debtors',
        'Sundry Creditors',
        'Sales Account',
        'Purchase Account',
        'Direct Expenses',
        'Indirect Expenses',
        'Direct Income',
        'Indirect Income',
        'Fixed Assets',
        'Current Assets',
        'Current Liabilities',
        'Capital Account',
        'Loans & Advances'
    ];

    const gstRegistrationTypes = [
        'Regular',
        'Composition',
        'Unregistered'
    ];

    const indianStates = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
        'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
        'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
        'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
        'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
        'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
        'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
    ];

    const tdsSettings = [
        { section: '194C', description: 'Payment to Contractors', rate: 2 },
        { section: '194I', description: 'Payment of Rent', rate: 10 },
        { section: '194J', description: 'Professional Services', rate: 10 },
        { section: '194H', description: 'Commission or Brokerage', rate: 5 }
    ];

    // ==================== Helper Functions ====================
    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.ledgerName?.trim()) {
            newErrors.ledgerName = 'Ledger name is required';
        }

        if (!formData.ledgerGroup) {
            newErrors.ledgerGroup = 'Ledger group is required';
        }

        if (formData.gstRegistrationType !== 'Unregistered' && !formData.gstin?.trim()) {
            newErrors.gstin = 'GSTIN is required for registered taxpayers';
        }

        if (formData.gstin && formData.gstin.length !== 15) {
            newErrors.gstin = 'GSTIN must be 15 characters long';
        }

        if (formData.panNo && formData.panNo.length !== 10) {
            newErrors.panNo = 'PAN must be 10 characters long';
        }

        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (formData.mobile && !/^\d{10}$/.test(formData.mobile)) {
            newErrors.mobile = 'Mobile number must be 10 digits';
        }

        if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
            newErrors.pincode = 'Pincode must be 6 digits';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validateForm()) return;

        const newAccount: LedgerAccount = {
            id: editingAccount ? editingAccount.id : Date.now().toString(),
            ledgerName: formData.ledgerName!,
            ledgerGroup: formData.ledgerGroup!,
            aliasName: formData.aliasName,
            openingBalance: formData.openingBalance || 0,
            balanceType: formData.balanceType!,
            currentBalance: formData.openingBalance || 0,
            asOnDate: formData.asOnDate!,
            gstRegistrationType: formData.gstRegistrationType!,
            gstin: formData.gstin,
            panNo: formData.panNo,
            hsnSacCode: formData.hsnSacCode,
            tdsApplicable: formData.tdsApplicable!,
            tdsSection: formData.tdsSection,
            tdsRate: formData.tdsRate,
            address: formData.address,
            state: formData.state,
            city: formData.city,
            pincode: formData.pincode,
            mobile: formData.mobile,
            email: formData.email,
            bankName: formData.bankName,
            accountNo: formData.accountNo,
            ifscCode: formData.ifscCode,
            branch: formData.branch,
            isActive: formData.isActive!,
            createdAt: editingAccount ? editingAccount.createdAt : new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        if (editingAccount) {
            setLedgerAccounts(prev =>
                prev.map(account =>
                    account.id === editingAccount.id ? newAccount : account
                )
            );
            setEditingAccount(null);
        } else {
            setLedgerAccounts(prev => [...prev, newAccount]);
        }

        handleReset();
        setShowDetailForm(false);
    };

    const handleReset = () => {
        setFormData({
            ledgerName: '',
            ledgerGroup: '',
            aliasName: '',
            openingBalance: 0,
            balanceType: 'Dr',
            asOnDate: new Date().toISOString().split('T')[0],
            gstRegistrationType: 'Unregistered',
            gstin: '',
            panNo: '',
            hsnSacCode: '',
            tdsApplicable: false,
            tdsSection: '',
            tdsRate: 0,
            address: '',
            state: '',
            city: '',
            pincode: '',
            mobile: '',
            email: '',
            bankName: '',
            accountNo: '',
            ifscCode: '',
            branch: '',
            isActive: true
        });
        setErrors({});
        setEditingAccount(null);
    };

    const handleEdit = (account: LedgerAccount) => {
        setFormData(account);
        setEditingAccount(account);
        setShowDetailForm(true);
    };

    const handleDelete = (id: string) => {
        setLedgerAccounts(prev => prev.filter(account => account.id !== id));
        setShowDeleteModal(null);
    };

    const handleTdsChange = (sectionCode: string) => {
        const tdsData = tdsSettings.find(tds => tds.section === sectionCode);
        setFormData(prev => ({
            ...prev,
            tdsSection: sectionCode,
            tdsRate: tdsData?.rate || 0
        }));
    };

    // Filter ledger accounts based on search and group filter
    const filteredAccounts = ledgerAccounts.filter(account => {
        const matchesSearch = account.ledgerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            account.ledgerGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (account.aliasName && account.aliasName.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesGroup = filterGroup === 'all' || account.ledgerGroup === filterGroup;

        return matchesSearch && matchesGroup;
    });

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };

    const selectCompactStyles: any = {
        control: (provided: any, state: any) => ({
            ...provided,
            minHeight: "33px",
            height: "33px",
            fontSize: "14px",
            padding: "0 2px",
            borderColor: state.isFocused ? "#6ea8ff" : "#84b3f8", // ✅ Default light blue border
            boxShadow: state.isFocused ? "0 0 0 1px #84b3f8" : "none",
            "&:hover": {
                borderColor: "#6ea8ff",
            },
        }),
        valueContainer: (provided: any) => ({
            ...provided,
            padding: "0 6px",
        }),
        indicatorsContainer: (provided: any) => ({
            ...provided,
            padding: "0 6px",
        }),
        dropdownIndicator: (provided: any) => ({
            ...provided,
            padding: "0 6px",
        }),
        clearIndicator: (provided: any) => ({
            ...provided,
            padding: "0 6px",
        }),
    };

    const columns = [
        {
            name: "Ledger Name",
            selector: (row: LedgerAccount) => row.ledgerName,
            sortable: true,
            cell: (row: LedgerAccount) => (
                <div>
                    <div className="ledger-management-font-medium">{row.ledgerName}</div>
                    {row.aliasName && (
                        <div className="ledger-management-text-sm ledger-management-text-gray-500">
                            {row.aliasName}
                        </div>
                    )}
                </div>
            )
        },
        {
            name: "Group",
            selector: (row: LedgerAccount) => row.ledgerGroup,
            sortable: true,
        },
        {
            name: "Opening Balance",
            sortable: true,
            cell: (row: LedgerAccount) => (
                <span className={row.balanceType === "Dr" ? "debit" : "credit"}>
                    {formatCurrency(row.openingBalance)} {row.balanceType}
                </span>
            )
        },
        {
            name: "Current Balance",
            sortable: true,
            cell: (row: LedgerAccount) => (
                <span className={row.balanceType === "Dr" ? "debit" : "credit"}>
                    {formatCurrency(row.currentBalance)} {row.balanceType}
                </span>
            )
        },
        {
            name: "GST Type",
            sortable: true,
            cell: (row: LedgerAccount) => (
                <span className="ledger-management-badge ledger-management-badge-secondary">
                    {row.gstRegistrationType}
                </span>
            )
        },
        {
            name: "Status",
            sortable: true,
            cell: (row: LedgerAccount) => (
                <span
                    className={`ledger-management-badge ${row.isActive
                        ? "ledger-management-badge-success"
                        : "ledger-management-badge-error"
                        }`}
                >
                    {row.isActive ? "Active" : "Inactive"}
                </span>
            )
        },
        {
            name: "Actions",
            cell: (row: LedgerAccount) => (
                <div className="ledger-management-flex ledger-management-gap-2">
                    <button
                        onClick={() => handleEdit(row)}
                        className="ledger-management-btn-icon"
                        title="Edit"
                    >
                        <Edit className="ledger-management-icon-sm" />
                    </button>

                    <button className="ledger-management-btn-icon" title="View Details">
                        <Eye className="ledger-management-icon-sm" />
                    </button>

                    <button
                        onClick={() => setShowDeleteModal(row.id)}
                        className="ledger-management-btn-icon ledger-management-btn-icon-danger"
                        title="Delete"
                    >
                        <Trash2 className="ledger-management-icon-sm" />
                    </button>
                </div>
            )
        }
    ];

    const renderCreateForm = () => (
        <div className="ledger-management-tab-content">
            <div className="ledger-entry-form">
                {/* ---------------- TOP SECTION ---------------- */}
                <div className="row mb-2">
                    {/* Ledger Name */}
                    <div className="col-md-6 mb-3" style={{ paddingRight: "2rem" }}>
                        <label className="ledger-management-label">Ledger Name *</label>
                        <input
                            type="text"
                            className="ledger-management-input w-100 challan"
                            placeholder="Enter Ledger Name"
                            value={formData.ledgerName || ""}
                            onChange={(e) => handleInputChange("ledgerName", e.target.value)}

                        />
                    </div>

                    {/* Under */}
                    <div className="col-md-6 mb-3" style={{ paddingLeft: "2rem" }}>
                        <label className="ledger-management-label">Under *</label>
                        <Select
                            className="w-100"
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
                            styles={selectCompactStyles}
                        />
                    </div>
                </div>

                {/* ---------------- MIDDLE SECTION: TWO COLUMNS ---------------- */}
                <div className="row">
                    {/* -------- LEFT: BANK ACCOUNT DETAILS -------- */}
                    <div className="col-md-6" style={{ borderRight: "1px solid #ccc", paddingRight: "2rem", paddingTop: "1rem", borderTop: "1px solid #ccc" }}>

                        <h4 className="section-heading mb-3">Bank Account Details</h4>

                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <label className="ledger-management-label">A/c Holder's Name :</label>
                                <input
                                    type="text"
                                    className="ledger-management-input w-100 challan"
                                    placeholder="Enter A/c Holder's Name"
                                    value={formData.accountHolder || ""}
                                    onChange={(e) => handleInputChange("accountHolder", e.target.value)}
                                />
                            </div>

                            <div className="col-md-12 mb-3">
                                <label className="ledger-management-label">A/c No. :</label>
                                <input
                                    type="text"
                                    className="ledger-management-input w-100 challan"
                                    placeholder="Enter A/c No."
                                    value={formData.accountNo || ""}
                                    onChange={(e) => handleInputChange("accountNo", e.target.value)}
                                />
                            </div>

                            <div className="col-md-12 mb-3">
                                <label className="ledger-management-label">IFSC Code :</label>
                                <input
                                    type="text"
                                    className="ledger-management-input w-100 challan"
                                    placeholder="Enter IFSC Code"
                                    value={formData.ifscCode || ""}
                                    onChange={(e) => handleInputChange("ifscCode", e.target.value)}
                                />
                            </div>

                            <div className="col-md-12 mb-3">
                                <label className="ledger-management-label">Bank Name :</label>
                                <input
                                    type="text"
                                    className="ledger-management-input w-100 challan"
                                    placeholder="Enter Bank Name"
                                    value={formData.bankName || ""}
                                    onChange={(e) => handleInputChange("bankName", e.target.value)}
                                />
                            </div>

                            <div className="col-md-12 mb-3">
                                <label className="ledger-management-label">Branch :</label>
                                <input
                                    type="text"
                                    className="ledger-management-input w-100 challan"
                                    placeholder="Enter Branch"
                                    value={formData.branch || ""}
                                    onChange={(e) => handleInputChange("branch", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* -------- RIGHT: MAILING + TAX DETAILS -------- */}
                    <div className="col-md-6" style={{ paddingLeft: "2rem",borderTop: "1px solid #ccc", paddingTop: "1rem" }}>

                        {/* MAILING DETAILS */}
                        <h4 className="section-heading mb-3">Mailing Details</h4>

                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <label className="ledger-management-label">Name :</label>
                                <input
                                    type="text"
                                    className="ledger-management-input w-100 challan"
                                    placeholder="Enter Name"
                                    value={formData.name || ""}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                />
                            </div>

                            <div className="col-md-12 mb-3">
                                <label className="ledger-management-label">Address :</label>
                                <textarea
                                    className="ledger-management-textarea w-100 challan"
                                    placeholder="Enter Address"
                                    rows={2}
                                    value={formData.address || ""}
                                    onChange={(e) => handleInputChange("address", e.target.value)}
                                />
                            </div>

                            <div className="col-md-12 mb-3">
                                <label className="ledger-management-label">State :</label>
                                <input
                                    type="text"
                                    className="ledger-management-input w-100 challan"
                                    placeholder="Enter State"
                                    value={formData.state || ""}
                                    onChange={(e) => handleInputChange("state", e.target.value)}
                                />
                            </div>

                            <div className="col-md-12 mb-3">
                                <label className="ledger-management-label">Pincode :</label>
                                <input
                                    type="text"
                                    className="ledger-management-input w-100 challan"
                                    placeholder="Enter Pincode"
                                    value={formData.pincode || ""}
                                    onChange={(e) => handleInputChange("pincode", e.target.value)}
                                />
                            </div>

                            <div className="col-md-12 mb-3">
                                <label className="ledger-management-label">Mobile No :</label>
                                <input
                                    type="text"
                                    className="ledger-management-input w-100 challan"
                                    placeholder="Enter Mobile No"
                                    value={formData.mobile || ""}
                                    onChange={(e) => handleInputChange("mobile", e.target.value)}
                                />
                            </div>

                            <div className="col-md-12 mb-3">
                                <label className="ledger-management-label">Email :</label>
                                <input
                                    type="text"
                                    className="ledger-management-input w-100 challan"
                                    placeholder="Enter Email"
                                    value={formData.email || ""}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                />
                            </div>
                        </div>

                        {/* TAX REGISTRATION */}
                        <h4 className="section-heading mt-2 mb-2">Tax Registration Details</h4>

                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <label className="ledger-management-label">Registration Type :</label>
                                <Select
                                    className="w-100"
                                    placeholder="Select Registration Type"
                                    value={
                                        formData.gstRegistrationType
                                            ? { label: formData.gstRegistrationType, value: formData.gstRegistrationType }
                                            : null
                                    }
                                    onChange={(selected) =>
                                        handleInputChange("gstRegistrationType", selected ? selected.value : "")
                                    }
                                    options={gstRegistrationTypes.map((type) => ({
                                        label: type,
                                        value: type,
                                    }))}
                                    isClearable
                                    isSearchable
                                    styles={selectCompactStyles}
                                />

                            </div>

                            <div className="col-md-12 mb-3">
                                <label className="ledger-management-label">GSTIN :</label>
                                <input
                                    type="text"
                                    className="ledger-management-input w-100 challan"
                                    placeholder="Enter GSTIN"
                                    value={formData.gstin || ""}
                                    onChange={(e) => handleInputChange("gstin", e.target.value)}
                                />
                            </div>

                            <div className="col-md-12 mb-3">
                                <label className="ledger-management-label">PAN No :</label>
                                <input
                                    type="text"
                                    className="ledger-management-input w-100 challan"
                                    placeholder="Enter PAN No"
                                    value={formData.panNo || ""}
                                    onChange={(e) => handleInputChange("panNo", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ---------------- ACTION BUTTONS ---------------- */}
                <div className="d-flex justify-content-between mt-2">
                    <button onClick={handleReset} className="ledger-management-btn ledger-management-btn-secondary">
                        <RotateCcw className="ledger-management-icon" />
                        Reset
                    </button>

                    <button onClick={handleSave} className="ledger-management-btn ledger-management-btn-primary">
                        <Save className="ledger-management-icon" />
                        {editingAccount ? "Update Account" : "Save Account"}
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
                        <button className="ledger-management-btn ledger-management-btn-secondary">
                            <Download className="ledger-management-icon" />
                            Export
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
                                <div className="modal-body">
                                    {renderCreateForm()}
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </>
            )}

            {/* Main Content */}
            <main className="ledger-management-main">
                <div className="ledger-management-tab-content">
                    {/* Filters */}
                    <div className="row g-3 mb-2 align-items-center mt-1">
                        {/* Group Name */}
                        <div className="col-lg-1 text-right">
                            <label className="form-label mb-0 ">Group Name</label>
                        </div>
                        <div className='col-lg-4'>
                            <input
                                type="text"
                                placeholder="Group Name"
                                className="form-control form-control-sm challan"
                                style={{ borderRadius: "5px" }}
                            />
                        </div>

                        {/* Under */}
                        <div className="col-lg-1 text-right">
                            <label className="form-label mb-0 ">Under</label>
                        </div>
                        <div className='col-lg-4'>
                            <Select
                                placeholder="Select..."
                                isClearable
                                isSearchable
                                styles={selectCompactStyles}
                            />
                        </div>
                        {/* Add more filters here in col-md-4 / col-md-3 etc */}
                    </div>

                    {/* Accounts Table */}
                    <div className="ledger-management-table-container ">
                        <DataTable
                            columns={columns}
                            data={filteredAccounts}
                            pagination
                            highlightOnHover
                            striped
                            noDataComponent="No accounts found matching your criteria."
                            customStyles={customStyles}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Ledger;