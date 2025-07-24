import React, { useState, useEffect } from 'react';
import './Ledger.css';

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

const List = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
);

const Search = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
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

const Filter = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
);

const X = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const Save = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
);

const RotateCcw = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 4v6h6" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
);

const ArrowLeft = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m7-7l-7 7 7 7" />
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
    const [activeTab, setActiveTab] = useState<'create' | 'list'>('create');
    const [ledgerAccounts, setLedgerAccounts] = useState<LedgerAccount[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterGroup, setFilterGroup] = useState('all');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [editingAccount, setEditingAccount] = useState<LedgerAccount | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

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
        setActiveTab('list');
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
        setActiveTab('create');
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

    // ==================== Render Functions ====================
    const renderCreateForm = () => (
        <div className="ledger-management-tab-content">
            <div className="ledger-management-section-header">
                <div>
                    <h2 className="ledger-management-section-title">
                        {editingAccount ? 'Edit Ledger Account' : 'Create New Ledger Account'}
                    </h2>
                    <p className="ledger-management-section-subtitle">
                        {editingAccount ? 'Update the ledger account details' : 'Add a new ledger account to your chart of accounts'}
                    </p>
                </div>
                {editingAccount && (
                    <button
                        onClick={handleReset}
                        className="ledger-management-btn ledger-management-btn-secondary"
                    >
                        <ArrowLeft className="ledger-management-icon" />
                        Back to Create
                    </button>
                )}
            </div>

            <div className="ledger-entry-form">
                {/* Basic Information */}
                <div className="ledger-management-form-group">
                    <h3>Basic Information</h3>
                    <div className="ledger-management-form-row">
                        <div>
                            <label className="ledger-management-label">
                                Ledger Name <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                type="text"
                                className="ledger-management-input"
                                value={formData.ledgerName || ''}
                                onChange={(e) => handleInputChange('ledgerName', e.target.value)}
                                placeholder="Enter ledger name"
                            />
                            {errors.ledgerName && (
                                <div style={{ color: 'red', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                    {errors.ledgerName}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="ledger-management-label">
                                Ledger Group <span style={{ color: 'red' }}>*</span>
                            </label>
                            <select
                                className="ledger-management-select"
                                value={formData.ledgerGroup || ''}
                                onChange={(e) => handleInputChange('ledgerGroup', e.target.value)}
                            >
                                <option value="">Select Ledger Group</option>
                                {ledgerGroups.map(group => (
                                    <option key={group} value={group}>{group}</option>
                                ))}
                            </select>
                            {errors.ledgerGroup && (
                                <div style={{ color: 'red', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                    {errors.ledgerGroup}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="ledger-management-label">Alias Name</label>
                            <input
                                type="text"
                                className="ledger-management-input"
                                value={formData.aliasName || ''}
                                onChange={(e) => handleInputChange('aliasName', e.target.value)}
                                placeholder="Enter alias name (optional)"
                            />
                        </div>
                    </div>
                </div>

                {/* Opening Balance */}
                <div className="ledger-management-form-group">
                    <h3>Opening Balance</h3>
                    <div className="ledger-management-form-row">
                        <div>
                            <label className="ledger-management-label">Opening Balance</label>
                            <input
                                type="number"
                                className="ledger-management-input"
                                value={formData.openingBalance || 0}
                                onChange={(e) => handleInputChange('openingBalance', parseFloat(e.target.value) || 0)}
                                placeholder="0.00"
                            />
                        </div>

                        <div>
                            <label className="ledger-management-label">Balance Type</label>
                            <select
                                className="ledger-management-select"
                                value={formData.balanceType || 'Dr'}
                                onChange={(e) => handleInputChange('balanceType', e.target.value)}
                            >
                                <option value="Dr">Debit (Dr)</option>
                                <option value="Cr">Credit (Cr)</option>
                            </select>
                        </div>

                        <div>
                            <label className="ledger-management-label">As On Date</label>
                            <input
                                type="date"
                                className="ledger-management-input"
                                value={formData.asOnDate || ''}
                                onChange={(e) => handleInputChange('asOnDate', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* GST Information */}
                <div className="ledger-management-form-group">
                    <h3>GST Information</h3>
                    <div className="ledger-management-form-row">
                        <div>
                            <label className="ledger-management-label">GST Registration Type</label>
                            <select
                                className="ledger-management-select"
                                value={formData.gstRegistrationType || 'Unregistered'}
                                onChange={(e) => handleInputChange('gstRegistrationType', e.target.value)}
                            >
                                {gstRegistrationTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="ledger-management-label">
                                GSTIN
                                {formData.gstRegistrationType !== 'Unregistered' && <span style={{ color: 'red' }}>*</span>}
                            </label>
                            <input
                                type="text"
                                className="ledger-management-input"
                                value={formData.gstin || ''}
                                onChange={(e) => handleInputChange('gstin', e.target.value.toUpperCase())}
                                placeholder="Enter GSTIN"
                                maxLength={15}
                                disabled={formData.gstRegistrationType === 'Unregistered'}
                            />
                            {errors.gstin && (
                                <div style={{ color: 'red', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                    {errors.gstin}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="ledger-management-label">PAN Number</label>
                            <input
                                type="text"
                                className="ledger-management-input"
                                value={formData.panNo || ''}
                                onChange={(e) => handleInputChange('panNo', e.target.value.toUpperCase())}
                                placeholder="Enter PAN"
                                maxLength={10}
                            />
                            {errors.panNo && (
                                <div style={{ color: 'red', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                    {errors.panNo}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="ledger-management-label">HSN/SAC Code</label>
                            <input
                                type="text"
                                className="ledger-management-input"
                                value={formData.hsnSacCode || ''}
                                onChange={(e) => handleInputChange('hsnSacCode', e.target.value)}
                                placeholder="Enter HSN/SAC code"
                            />
                        </div>
                    </div>
                </div>

                {/* TDS Information */}
                <div className="ledger-management-form-group">
                    <h3>TDS Information</h3>
                    <div className="ledger-management-form-row">
                        <div>
                            <label className="ledger-management-label">
                                <input
                                    type="checkbox"
                                    checked={formData.tdsApplicable || false}
                                    onChange={(e) => handleInputChange('tdsApplicable', e.target.checked)}
                                    style={{ marginRight: '0.5rem' }}
                                />
                                TDS Applicable
                            </label>
                        </div>

                        {formData.tdsApplicable && (
                            <>
                                <div>
                                    <label className="ledger-management-label">TDS Section</label>
                                    <select
                                        className="ledger-management-select"
                                        value={formData.tdsSection || ''}
                                        onChange={(e) => handleTdsChange(e.target.value)}
                                    >
                                        <option value="">Select TDS Section</option>
                                        {tdsSettings.map(tds => (
                                            <option key={tds.section} value={tds.section}>
                                                {tds.section} - {tds.description}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="ledger-management-label">TDS Rate (%)</label>
                                    <input
                                        type="number"
                                        className="ledger-management-input"
                                        value={formData.tdsRate || 0}
                                        onChange={(e) => handleInputChange('tdsRate', parseFloat(e.target.value) || 0)}
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                        max="100"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Contact Information */}
                <div className="ledger-management-form-group">
                    <h3>Contact Information</h3>
                    <div className="ledger-management-form-row">
                        <div>
                            <label className="ledger-management-label">Address</label>
                            <textarea
                                className="ledger-management-textarea"
                                value={formData.address || ''}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                                placeholder="Enter address"
                                rows={3}
                            />
                        </div>

                        <div>
                            <label className="ledger-management-label">State</label>
                            <select
                                className="ledger-management-select"
                                value={formData.state || ''}
                                onChange={(e) => handleInputChange('state', e.target.value)}
                            >
                                <option value="">Select State</option>
                                {indianStates.map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="ledger-management-label">City</label>
                            <input
                                type="text"
                                className="ledger-management-input"
                                value={formData.city || ''}
                                onChange={(e) => handleInputChange('city', e.target.value)}
                                placeholder="Enter city"
                            />
                        </div>

                        <div>
                            <label className="ledger-management-label">Pincode</label>
                            <input
                                type="text"
                                className="ledger-management-input"
                                value={formData.pincode || ''}
                                onChange={(e) => handleInputChange('pincode', e.target.value)}
                                placeholder="Enter pincode"
                                maxLength={6}
                            />
                            {errors.pincode && (
                                <div style={{ color: 'red', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                    {errors.pincode}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="ledger-management-label">Mobile</label>
                            <input
                                type="text"
                                className="ledger-management-input"
                                value={formData.mobile || ''}
                                onChange={(e) => handleInputChange('mobile', e.target.value)}
                                placeholder="Enter mobile number"
                                maxLength={10}
                            />
                            {errors.mobile && (
                                <div style={{ color: 'red', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                    {errors.mobile}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="ledger-management-label">Email</label>
                            <input
                                type="email"
                                className="ledger-management-input"
                                value={formData.email || ''}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                placeholder="Enter email address"
                            />
                            {errors.email && (
                                <div style={{ color: 'red', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                    {errors.email}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bank Information */}
                {formData.ledgerGroup === 'Bank A/c' && (
                    <div className="ledger-management-form-group">
                        <h3>Bank Information</h3>
                        <div className="ledger-management-form-row">
                            <div>
                                <label className="ledger-management-label">Bank Name</label>
                                <input
                                    type="text"
                                    className="ledger-management-input"
                                    value={formData.bankName || ''}
                                    onChange={(e) => handleInputChange('bankName', e.target.value)}
                                    placeholder="Enter bank name"
                                />
                            </div>

                            <div>
                                <label className="ledger-management-label">Account Number</label>
                                <input
                                    type="text"
                                    className="ledger-management-input"
                                    value={formData.accountNo || ''}
                                    onChange={(e) => handleInputChange('accountNo', e.target.value)}
                                    placeholder="Enter account number"
                                />
                            </div>

                            <div>
                                <label className="ledger-management-label">IFSC Code</label>
                                <input
                                    type="text"
                                    className="ledger-management-input"
                                    value={formData.ifscCode || ''}
                                    onChange={(e) => handleInputChange('ifscCode', e.target.value.toUpperCase())}
                                    placeholder="Enter IFSC code"
                                />
                            </div>

                            <div>
                                <label className="ledger-management-label">Branch</label>
                                <input
                                    type="text"
                                    className="ledger-management-input"
                                    value={formData.branch || ''}
                                    onChange={(e) => handleInputChange('branch', e.target.value)}
                                    placeholder="Enter branch name"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Status */}
                <div className="ledger-management-form-group">
                    <label className="ledger-management-label">
                        <input
                            type="checkbox"
                            checked={formData.isActive || false}
                            onChange={(e) => handleInputChange('isActive', e.target.checked)}
                            style={{ marginRight: '0.5rem' }}
                        />
                        Active
                    </label>
                </div>

                {/* Form Actions */}
                <div className="ledger-management-flex ledger-management-justify-between ledger-management-gap-3 ledger-management-mt-4">
                    <button
                        onClick={handleReset}
                        className="ledger-management-btn ledger-management-btn-secondary"
                    >
                        <RotateCcw className="ledger-management-icon" />
                        Reset
                    </button>

                    <button
                        onClick={handleSave}
                        className="ledger-management-btn ledger-management-btn-primary"
                    >
                        <Save className="ledger-management-icon" />
                        {editingAccount ? 'Update Account' : 'Save Account'}
                    </button>
                </div>
            </div>
        </div>
    );

    const renderAccountsList = () => (
        <div className="ledger-management-tab-content">
            <div className="ledger-management-section-header">
                <div>
                    <h2 className="ledger-management-section-title">Ledger Accounts</h2>
                    <p className="ledger-management-section-subtitle">
                        Manage all your ledger accounts ({filteredAccounts.length} accounts)
                    </p>
                </div>
                <button
                    onClick={() => setActiveTab('create')}
                    className="ledger-management-btn ledger-management-btn-primary"
                >
                    <Plus className="ledger-management-icon" />
                    Add New Account
                </button>
            </div>

            {/* Filters */}
            <div className="ledger-management-filters">
                <div className="ledger-management-search-container">
                    <Search className="ledger-management-search-icon" />
                    <input
                        type="text"
                        placeholder="Search accounts..."
                        className="ledger-management-search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <select
                    className="ledger-management-select"
                    value={filterGroup}
                    onChange={(e) => setFilterGroup(e.target.value)}
                >
                    <option value="all">All Groups</option>
                    {ledgerGroups.map(group => (
                        <option key={group} value={group}>{group}</option>
                    ))}
                </select>

                <button className="ledger-management-btn-icon">
                    <Filter className="ledger-management-icon" />
                </button>

                <button className="ledger-management-btn-icon">
                    <Download className="ledger-management-icon" />
                </button>
            </div>

            {/* Accounts Table */}
            <div className="ledger-management-table-container">
                <table className="ledger-management-table">
                    <thead>
                        <tr>
                            <th>Ledger Name</th>
                            <th>Group</th>
                            <th>Opening Balance</th>
                            <th>Current Balance</th>
                            <th>GST Type</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAccounts.map(account => (
                            <tr key={account.id}>
                                <td>
                                    <div>
                                        <div className="ledger-management-font-medium">{account.ledgerName}</div>
                                        {account.aliasName && (
                                            <div className="ledger-management-text-sm ledger-management-text-gray-500">
                                                {account.aliasName}
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td>{account.ledgerGroup}</td>
                                <td>
                                    <span className={account.balanceType === 'Dr' ? 'debit' : 'credit'}>
                                        {formatCurrency(account.openingBalance)} {account.balanceType}
                                    </span>
                                </td>
                                <td>
                                    <span className={account.balanceType === 'Dr' ? 'debit' : 'credit'}>
                                        {formatCurrency(account.currentBalance)} {account.balanceType}
                                    </span>
                                </td>
                                <td>
                                    <span className="ledger-management-badge ledger-management-badge-secondary">
                                        {account.gstRegistrationType}
                                    </span>
                                </td>
                                <td>
                                    <span className={`ledger-management-badge ${account.isActive ? 'ledger-management-badge-success' : 'ledger-management-badge-error'
                                        }`}>
                                        {account.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td>
                                    <div className="ledger-management-flex ledger-management-gap-2">
                                        <button
                                            onClick={() => handleEdit(account)}
                                            className="ledger-management-btn-icon"
                                            title="Edit"
                                        >
                                            <Edit className="ledger-management-icon-sm" />
                                        </button>

                                        <button
                                            className="ledger-management-btn-icon"
                                            title="View Details"
                                        >
                                            <Eye className="ledger-management-icon-sm" />
                                        </button>

                                        <button
                                            onClick={() => setShowDeleteModal(account.id)}
                                            className="ledger-management-btn-icon ledger-management-btn-icon-danger"
                                            title="Delete"
                                        >
                                            <Trash2 className="ledger-management-icon-sm" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredAccounts.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                        No accounts found matching your criteria.
                    </div>
                )}
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
                        <button
                            onClick={() => setActiveTab('create')}
                            className="ledger-management-btn ledger-management-btn-primary"
                        >
                            <Plus className="ledger-management-icon" />
                            New Account
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="ledger-management-main">
                {/* Tabs */}
                <div className="ledger-management-tabs">
                    <div className="ledger-management-tabs-container">
                        <div className="ledger-management-tabs-nav">
                            <div className="ledger-management-tabs-list">
                                <button
                                    onClick={() => setActiveTab('create')}
                                    className={`ledger-management-tab ${activeTab === 'create' ? 'active' : ''}`}
                                >
                                    <Plus className="ledger-management-tab-icon" />
                                    {editingAccount ? 'Edit Account' : 'Create Account'}
                                </button>

                                <button
                                    onClick={() => setActiveTab('list')}
                                    className={`ledger-management-tab ${activeTab === 'list' ? 'active' : ''}`}
                                >
                                    <List className="ledger-management-tab-icon" />
                                    Accounts List
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="ledger-management-content">
                    {activeTab === 'create' && renderCreateForm()}
                    {activeTab === 'list' && renderAccountsList()}
                </div>
            </main>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="ledger-management-modal-overlay">
                    <div className="ledger-management-modal">
                        <div className="ledger-management-modal-header">
                            <h3 className="ledger-management-modal-title">Confirm Delete</h3>
                            <button
                                onClick={() => setShowDeleteModal(null)}
                                className="ledger-management-modal-close"
                            >
                                <X className="ledger-management-icon" />
                            </button>
                        </div>

                        <div className="ledger-management-modal-content">
                            <p>Are you sure you want to delete this ledger account? This action cannot be undone.</p>
                        </div>

                        <div className="ledger-management-modal-footer">
                            <button
                                onClick={() => setShowDeleteModal(null)}
                                className="ledger-management-btn ledger-management-btn-secondary"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(showDeleteModal)}
                                className="ledger-management-btn ledger-management-btn-primary"
                                style={{ backgroundColor: '#dc2626' }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Ledger;