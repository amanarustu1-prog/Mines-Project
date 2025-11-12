import React, { useState, useEffect } from "react";
import "./PaymentVoucher.css";
import Select from 'react-select';
import { FiPlus, FiTrash2, FiPrinter, FiSave, FiX, FiDollarSign, FiInfo, FiChevronDown, FiAlertCircle } from "react-icons/fi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PaymentVoucher = () => {

    const getCurrentDate = () => {
        const date = new Date();
        const options = { year: 'numeric', month: 'short', day: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    };

    const getCurrentDay = () => {
        return new Date().toLocaleDateString('en-US', { weekday: 'long' });
    };

    const [voucherNo, setVoucherNo] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [day, setDay] = useState(getCurrentDay());
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const accountOptions = [
        { value: 'state-bank', label: 'State Bank of India', },
        { value: 'hdfc-bank', label: 'HDFC Bank', },
        { value: 'icici-bank', label: 'ICICI Bank', },
        { value: 'axis-bank', label: 'AXIS Bank', },
        { value: 'sbi-bank', label: 'SBI', },
    ];

    const customStyles = {
        control: (provided) => ({
            ...provided,
            minHeight: '40px',
            border: '1px solid #e2e8f0',
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#cbd5e0',
            },
            '&:focus-within': {
                borderColor: '#818cf8',
                boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)',
            },
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#f8fafc' : 'white',
            color: '#1e293b',
            padding: '8px 12px',
            display: 'flex',
            justifyContent: 'space-between',
            '&:hover': {
                backgroundColor: '#f1f5f9',
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#1e293b',
            fontWeight: '500',
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#94a3b8',
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: '#94a3b8',
            padding: '0 8px',
        }),
    };

    const formatOptionLabel = ({ label, balance }) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <span>{label}</span>
            <span style={{ color: '#64748b', fontSize: '0.875rem' }}>{balance}</span>
        </div>
    );
    const [currentBalance, setCurrentBalance] = useState("23,000.00 Dr");
    const [voucherClass, setVoucherClass] = useState("Bank Payment");
    const [narration, setNarration] = useState("");
    const [isPrintMode, setIsPrintMode] = useState(false);

    const [particulars, setParticulars] = useState([
        {
            id: 1,
            name: "Salaries",
            currentBalance: "5,000.00 Dr",
            narration: "Paid to Mr. Ram for November 2023",
            amount: "5,000.00",
        },
        {
            id: 2,
            name: "Rent Paid",
            currentBalance: "2,000.00 Dr",
            narration: "Store Rent for November 2023",
            amount: "2,000.00",
        },
    ]);

    const validateForm = () => {
        const newErrors = {};

        if (!voucherNo.trim()) {
            newErrors.voucherNo = ' required';
        }

        if (!selectedAccount) {
            newErrors.account = ' required';
        }

        particulars.forEach((p, index) => {
            if (!p.name.trim()) {
                newErrors[`particular-${p.id}-name`] = ' required';
            }
            const amount = parseFloat(p.amount.replace(/,/g, ''));
            if (isNaN(amount) || amount <= 0) {
                newErrors[`particular-${p.id}-amount`] = 'required';
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const addParticular = () => {
        const newParticular = {
            id: Date.now(),
            name: "",
            currentBalance: "0.00 Dr",
            narration: "",
            amount: "",
        };
        setParticulars([...particulars, newParticular]);
    };

    const removeParticular = (id) => {
        if (particulars.length > 1) {
            setParticulars(particulars.filter((p) => p.id !== id));
        }
    };

    const updateParticular = (id, field, value) => {
        if (errors[`particular-${id}-${field}`]) {
            const newErrors = { ...errors };
            delete newErrors[`particular-${id}-${field}`];
            setErrors(newErrors);
        }

        setParticulars(
            particulars.map((p) => (p.id === id ? { ...p, [field]: value } : p))
        );
    };

    const calculateTotal = () => {
        return particulars
            .reduce(
                (sum, p) => sum + (parseFloat(p.amount.replace(/,/g, "")) || 0),
                0
            )
            .toFixed(2);
    };


    const formatCurrency = (value) => {
        return parseFloat(value).toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };


    const handlePrint = () => {
        setIsPrintMode(true);
        setTimeout(() => {
            window.print();
            setTimeout(() => setIsPrintMode(false), 1000);
        }, 100);
    };
    const handleSave = async () => {
        if (!validateForm()) {
            toast.error('Please fix the form errors before saving');
            return;
        }

        setIsSubmitting(true);

        try {
            const voucherData = {
                voucherNo,
                date,
                account: selectedAccount,
                particulars: particulars.map(p => ({
                    name: p.name,
                    amount: parseFloat(p.amount.replace(/,/g, '')),
                    narration: p.narration
                })),
                total: calculateTotal(),
                status: 'draft',
                createdAt: new Date().toISOString()
            };

            console.log('Saving voucher:', voucherData);

            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success('Voucher saved successfully!');

        } catch (error) {
            console.error('Error saving voucher:', error);
            toast.error('Failed to save voucher. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };


    const handleAmountBlur = (id, value) => {
        if (value && !isNaN(value.replace(/,/g, ''))) {
            updateParticular(id, 'amount', formatCurrency(value));
        } else if (value) {
            setErrors(prev => ({
                ...prev,
                [`particular-${id}-amount`]: 'Please enter a valid amount'
            }));
        }
    };

    return (
        <div className={`payment-voucher-container ${isPrintMode ? 'print-mode' : ''}`}>
            <div className="payment-voucher-card">
                <div className="voucher-header">
                    <div className="header-left">
                        <h2>Accounting Voucher</h2>
                        <div className="website-link">www.tallyprimebook.com</div>
                    </div>
                    <div className="header-actions">
                        <button className="close-btn" title="Close">
                            <FiX size={24} />
                        </button>
                    </div>
                </div>

                <div className="voucher-info-row">
                    <div className="voucher-type-section">
                        <span className="voucher-type-badge">
                            <FiDollarSign size={14} />
                            <span>Payment</span>
                        </span>
                        <div className="voucher-number">
                            <label>Voucher No.</label>
                            <div className="voucher-no-input-container">
                                <input
                                    type="text"
                                    className={`voucher-no-input ${errors.voucherNo ? 'error' : ''}`}
                                    value={voucherNo}
                                    onChange={(e) => {
                                        setVoucherNo(e.target.value);
                                        if (errors.voucherNo) {
                                            const newErrors = { ...errors };
                                            delete newErrors.voucherNo;
                                            setErrors(newErrors);
                                        }
                                    }}
                                    placeholder="Enter voucher no."
                                />
                                {errors.voucherNo && (
                                    <div className="error-message">
                                        <FiAlertCircle size={12} /> {errors.voucherNo}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="date-section">
                        <div className="date-input-container">
                            <DatePicker
                                type="date"
                                className="date-input date-inputs"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <span className="day-label">{day}</span>
                    </div>
                </div>


                <div className="account-section">
                    <div className="account-row">
                        <label className="account-label">Account</label>
                        <div className="account-input-container" style={{ width: '100%' }}>
                            <div className="select-container">
                                <Select
                                    className={`account-select ${errors.account ? 'error-select' : ''}`}
                                    classNamePrefix="select"
                                    value={selectedAccount}
                                    onChange={(selected) => {
                                        setSelectedAccount(selected);
                                        if (errors.account) {
                                            const newErrors = { ...errors };
                                            delete newErrors.account;
                                            setErrors(newErrors);
                                        }
                                    }}
                                    options={accountOptions}
                                    placeholder="Select or search account..."
                                    formatOptionLabel={formatOptionLabel}
                                    isSearchable
                                />
                                {errors.account && (
                                    <div className="error-message">
                                        <FiAlertCircle size={12} /> {errors.account}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="current-balance-row">
                        <span className="balance-label">
                            <FiInfo size={14} />
                            Current Balance:
                        </span>
                        <div className="balance-amount">{currentBalance}</div>
                    </div>
                </div>

                <div className="particulars-section">
                    <div className="section-header">
                        <h3>Particulars</h3>
                        <button
                            className="add-particular-btn"
                            onClick={addParticular}
                            type="button"
                        >
                            <FiPlus size={16} />
                            <span>Add Particular</span>
                        </button>
                    </div>

                    <div className="particulars-table">
                        <div className="table-header">
                            <div className="header-cell description">Description</div>
                            <div className="header-cell amount">Amount (₹)</div>
                            <div className="header-cell actions"></div>
                        </div>

                        <div className="table-body">
                            {particulars.map((p, index) => (
                                <div key={p.id} className="table-rows">
                                    <div className="cell description">
                                        <div className="row-number">{index + 1}.</div>
                                        <div className="input-container">
                                            <input
                                                type="text"
                                                className={`description-input ${errors[`particular-${p.id}-name`] ? 'error' : ''}`}
                                                value={p.name}
                                                onChange={(e) => updateParticular(p.id, "name", e.target.value)}
                                                placeholder="Enter description"
                                            />
                                            {errors[`particular-${p.id}-name`] && (
                                                <div className="error-message">
                                                    <FiAlertCircle size={12} /> {errors[`particular-${p.id}-name`]}
                                                </div>
                                            )}
                                        </div>
                                        <div className="narration-input-container">
                                            <input
                                                type="text"
                                                className="narration-input"
                                                value={p.narration}
                                                onChange={(e) => updateParticular(p.id, "narration", e.target.value)}
                                                placeholder="Add narration (optional)"
                                            />
                                        </div>
                                    </div>

                                    <div className="cell amount">
                                        <div className="amount-input-container">
                                            <span className="currency-symbol">₹</span>
                                            <div className="input-wrapper">
                                                <input
                                                    type="text"
                                                    className={`amount-input ${errors[`particular-${p.id}-amount`] ? 'error' : ''}`}
                                                    value={p.amount}
                                                    onChange={(e) => updateParticular(p.id, "amount", e.target.value)}
                                                    onBlur={(e) => handleAmountBlur(p.id, e.target.value)}
                                                    placeholder="0.00"
                                                />
                                                {errors[`particular-${p.id}-amount`] && (
                                                    <div className="error-message">
                                                        <FiAlertCircle size={12} /> {errors[`particular-${p.id}-amount`]}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="cell actions">
                                        {particulars.length > 1 && (
                                            <button
                                                type="button"
                                                className="remove-btn"
                                                onClick={() => removeParticular(p.id)}
                                                title="Remove this row"
                                            >
                                                <FiTrash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="table-footer">
                            <div className="total-label">Total Amount</div>
                            <div className="total-amount">₹{calculateTotal()}</div>
                        </div>
                    </div>


                </div>

                <div className="narration-section">
                    <div className="section-header">
                        <h3>Additional Information</h3>
                    </div>
                    <div className="narration-container">
                        <label className="narration-label">Narration</label>
                        <textarea
                            className="narration-textarea"
                            rows="3"
                            value={narration}
                            onChange={(e) => setNarration(e.target.value)}
                            placeholder="Enter any additional notes or narration for this voucher..."
                        />
                        <div className="char-count">{narration.length}/500 characters</div>
                    </div>
                </div>

                <div className="voucher-footer">
                    <div className="footer-actions">
                        <button
                            type="button"
                            className="secondary-btn"
                            onClick={handlePrint}
                        >
                            <FiPrinter size={16} />
                            <span>Print Voucher</span>
                        </button>
                        <button
                            type="button"
                            className="primary-btn"
                            onClick={handleSave}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <span className="btn-loader"></span>
                            ) : (
                                <FiSave size={16} />
                            )}
                            <span>{isSubmitting ? 'Saving...' : 'Save Voucher'}</span>
                        </button>
                    </div>
                    <div className="voucher-status">
                        <span className="status-badge draft">Draft</span>
                        <div className="last-saved">
                            Last saved: {new Date().toLocaleString()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentVoucher;
