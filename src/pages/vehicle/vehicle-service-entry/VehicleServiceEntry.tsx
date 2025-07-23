import React, { useState } from 'react';
import './VehicleServiceEntry.css';

// Icon components
const Settings = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const Download = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const Save = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
);

const Edit3 = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);

const Truck = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
    </svg>
);

// Types
interface ServiceEntry {
    id: string;
    equipmentIdNo: string;
    serviceDay: string;
    currentMeterReading: number;
    spareCost: number;
    spareDetails: string;
    tyreTubeCost: number;
    modeOfPayment: 'cash' | 'cheque' | 'online';
    equipmentOperator: string;
    serviceCentre: string;
    lubeCost: number;
    billNo: string;
    nextServiceDueDate: string;
    lubeChangeDate: string;
    remarks: string;
    status: 'draft' | 'submitted' | 'approved';
    createdDate: string;
    createdBy: string;
}

export default function VehicleServiceEntry() {
    const [formData, setFormData] = useState<Partial<ServiceEntry>>({
        equipmentIdNo: '',
        serviceDay: new Date().toISOString().split('T')[0],
        currentMeterReading: 0,
        spareCost: 0,
        spareDetails: '',
        tyreTubeCost: 0,
        modeOfPayment: 'cash',
        equipmentOperator: 'MAN SINGH',
        serviceCentre: '',
        lubeCost: 0,
        billNo: '',
        nextServiceDueDate: '',
        lubeChangeDate: '',
        remarks: '',
        status: 'draft'
    });

    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = (field: keyof ServiceEntry, value: any) => {
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

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.equipmentIdNo?.trim()) {
            newErrors.equipmentIdNo = 'Equipment Identification No. is required';
        }

        if (!formData.serviceDay) {
            newErrors.serviceDay = 'Service Day is required';
        }

        if (!formData.currentMeterReading || formData.currentMeterReading <= 0) {
            newErrors.currentMeterReading = 'Current Meter Reading is required';
        }

        if (!formData.equipmentOperator?.trim()) {
            newErrors.equipmentOperator = 'Equipment Operator/Driver is required';
        }

        if (!formData.serviceCentre?.trim()) {
            newErrors.serviceCentre = 'Service Centre is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validateForm()) {
            // Here you would typically save to your backend
            console.log('Saving service entry:', formData);
            alert('LCV Service Details saved successfully!');
            setIsEditing(false);
        }
    };

    const handleModify = () => {
        setIsEditing(true);
    };

    const handleExport = () => {
        // Here you would implement Excel export functionality
        console.log('Exporting to Excel...');
        alert('Exporting to Excel...');
    };

    const handleReset = () => {
        setFormData({
            equipmentIdNo: '',
            serviceDay: new Date().toISOString().split('T')[0],
            currentMeterReading: 0,
            spareCost: 0,
            spareDetails: '',
            tyreTubeCost: 0,
            modeOfPayment: 'cash',
            equipmentOperator: 'MAN SINGH',
            serviceCentre: '',
            lubeCost: 0,
            billNo: '',
            nextServiceDueDate: '',
            lubeChangeDate: '',
            remarks: '',
            status: 'draft'
        });
        setErrors({});
        setIsEditing(false);
    };

    return (
        <div className="vehicle-service-entry">
            {/* Header */}
            <div className="vehicle-service-entry-header">
                <div className="vehicle-service-entry-header-content">
                    <div className="vehicle-service-entry-title-section">
                        <Settings className="vehicle-service-entry-header-icon" />
                        <div>
                            <h1 className="vehicle-service-entry-title">Vehicle Service Entry</h1>
                            <p className="vehicle-service-entry-subtitle">
                                Vehicle Service Entry Section
                            </p>
                        </div>
                    </div>
                    <div className="vehicle-service-entry-header-actions">
                        <button
                            className="vehicle-service-entry-btn vehicle-service-entry-btn-secondary"
                            onClick={handleExport}
                        >
                            <Download className="vehicle-service-entry-icon" />
                            Export to Excel
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="vehicle-service-entry-main">
                <div className="vehicle-service-entry-content">

                    {/* Service Entry Form */}
                    <div className="vehicle-service-entry-card">
                        <div className="vehicle-service-entry-card-header">
                            <div className="vehicle-service-entry-flex vehicle-service-entry-items-center vehicle-service-entry-gap-2">
                                <Truck className="vehicle-service-entry-icon" />
                                <h3 className="vehicle-service-entry-card-title">Service Entry Details</h3>
                            </div>
                        </div>
                        <div className="vehicle-service-entry-card-content">
                            <div className="vehicle-service-entry-form-grid">
                                {/* Equipment Identification No. */}
                                <div className="vehicle-service-entry-form-group">
                                    <label className="vehicle-service-entry-label">
                                        Equipment Identification No. <span className="vehicle-service-entry-required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="vehicle-service-entry-input"
                                        value={formData.equipmentIdNo || ''}
                                        onChange={(e) => handleInputChange('equipmentIdNo', e.target.value)}
                                        placeholder="Enter equipment identification number"
                                        disabled={!isEditing}
                                    />
                                    {errors.equipmentIdNo && (
                                        <span className="vehicle-service-entry-text-xs" style={{ color: '#dc2626' }}>
                                            {errors.equipmentIdNo}
                                        </span>
                                    )}
                                </div>

                                {/* Service Day */}
                                <div className="vehicle-service-entry-form-group">
                                    <label className="vehicle-service-entry-label">
                                        Service Day <span className="vehicle-service-entry-required">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        className="vehicle-service-entry-date-input"
                                        value={formData.serviceDay || ''}
                                        onChange={(e) => handleInputChange('serviceDay', e.target.value)}
                                        disabled={!isEditing}
                                    />
                                    {errors.serviceDay && (
                                        <span className="vehicle-service-entry-text-xs" style={{ color: '#dc2626' }}>
                                            {errors.serviceDay}
                                        </span>
                                    )}
                                </div>

                                {/* Current Meter Reading */}
                                <div className="vehicle-service-entry-form-group">
                                    <label className="vehicle-service-entry-label">
                                        Current Meter Reading <span className="vehicle-service-entry-required">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="vehicle-service-entry-input"
                                        value={formData.currentMeterReading || ''}
                                        onChange={(e) => handleInputChange('currentMeterReading', parseInt(e.target.value) || 0)}
                                        placeholder="Enter current meter reading"
                                        disabled={!isEditing}
                                    />
                                    {errors.currentMeterReading && (
                                        <span className="vehicle-service-entry-text-xs" style={{ color: '#dc2626' }}>
                                            {errors.currentMeterReading}
                                        </span>
                                    )}
                                </div>

                                {/* Equipment Operator/Driver */}
                                <div className="vehicle-service-entry-form-group">
                                    <label className="vehicle-service-entry-label">
                                        Equipment Operator/Driver <span className="vehicle-service-entry-required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="vehicle-service-entry-input"
                                        value={formData.equipmentOperator || ''}
                                        onChange={(e) => handleInputChange('equipmentOperator', e.target.value)}
                                        placeholder="Enter operator/driver name"
                                        disabled={!isEditing}
                                    />
                                    {errors.equipmentOperator && (
                                        <span className="vehicle-service-entry-text-xs" style={{ color: '#dc2626' }}>
                                            {errors.equipmentOperator}
                                        </span>
                                    )}
                                </div>

                                {/* Service Centre */}
                                <div className="vehicle-service-entry-form-group">
                                    <label className="vehicle-service-entry-label">
                                        Service Centre <span className="vehicle-service-entry-required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="vehicle-service-entry-input"
                                        value={formData.serviceCentre || ''}
                                        onChange={(e) => handleInputChange('serviceCentre', e.target.value)}
                                        placeholder="Enter service centre name"
                                        disabled={!isEditing}
                                    />
                                    {errors.serviceCentre && (
                                        <span className="vehicle-service-entry-text-xs" style={{ color: '#dc2626' }}>
                                            {errors.serviceCentre}
                                        </span>
                                    )}
                                </div>

                                {/* Spare Cost */}
                                <div className="vehicle-service-entry-form-group">
                                    <label className="vehicle-service-entry-label">Spare Cost</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="vehicle-service-entry-input"
                                        value={formData.spareCost || ''}
                                        onChange={(e) => handleInputChange('spareCost', parseFloat(e.target.value) || 0)}
                                        placeholder="Enter spare cost"
                                        disabled={!isEditing}
                                    />
                                </div>

                                {/* Lube Cost */}
                                <div className="vehicle-service-entry-form-group">
                                    <label className="vehicle-service-entry-label">Lube Cost</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="vehicle-service-entry-input"
                                        value={formData.lubeCost || ''}
                                        onChange={(e) => handleInputChange('lubeCost', parseFloat(e.target.value) || 0)}
                                        placeholder="Enter lube cost"
                                        disabled={!isEditing}
                                    />
                                </div>

                                {/* Tyre/Tube Cost */}
                                <div className="vehicle-service-entry-form-group">
                                    <label className="vehicle-service-entry-label">Tyre/Tube Cost</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="vehicle-service-entry-input"
                                        value={formData.tyreTubeCost || ''}
                                        onChange={(e) => handleInputChange('tyreTubeCost', parseFloat(e.target.value) || 0)}
                                        placeholder="Enter tyre/tube cost"
                                        disabled={!isEditing}
                                    />
                                </div>

                                {/* Bill No */}
                                <div className="vehicle-service-entry-form-group">
                                    <label className="vehicle-service-entry-label">Bill No</label>
                                    <input
                                        type="text"
                                        className="vehicle-service-entry-input"
                                        value={formData.billNo || ''}
                                        onChange={(e) => handleInputChange('billNo', e.target.value)}
                                        placeholder="Enter bill number"
                                        disabled={!isEditing}
                                    />
                                </div>

                                {/* Next Service Due Date */}
                                <div className="vehicle-service-entry-form-group">
                                    <label className="vehicle-service-entry-label">Next Service Due Date</label>
                                    <input
                                        type="date"
                                        className="vehicle-service-entry-date-input"
                                        value={formData.nextServiceDueDate || ''}
                                        onChange={(e) => handleInputChange('nextServiceDueDate', e.target.value)}
                                        disabled={!isEditing}
                                    />
                                </div>

                                {/* Lube Change Date */}
                                <div className="vehicle-service-entry-form-group">
                                    <label className="vehicle-service-entry-label">Lube Change Date</label>
                                    <input
                                        type="date"
                                        className="vehicle-service-entry-date-input"
                                        value={formData.lubeChangeDate || ''}
                                        onChange={(e) => handleInputChange('lubeChangeDate', e.target.value)}
                                        disabled={!isEditing}
                                    />
                                </div>

                                {/* Mode of Payment */}
                                <div className="vehicle-service-entry-form-group">
                                    <label className="vehicle-service-entry-label">Mode of Payment</label>
                                    <div className="vehicle-service-entry-payment-mode">
                                        <div className="vehicle-service-entry-radio-group">
                                            <input
                                                type="radio"
                                                id="cash"
                                                name="modeOfPayment"
                                                value="cash"
                                                className="vehicle-service-entry-radio"
                                                checked={formData.modeOfPayment === 'cash'}
                                                onChange={(e) => handleInputChange('modeOfPayment', e.target.value)}
                                                disabled={!isEditing}
                                            />
                                            <label htmlFor="cash" className="vehicle-service-entry-radio-label">Cash</label>
                                        </div>
                                        <div className="vehicle-service-entry-radio-group">
                                            <input
                                                type="radio"
                                                id="cheque"
                                                name="modeOfPayment"
                                                value="cheque"
                                                className="vehicle-service-entry-radio"
                                                checked={formData.modeOfPayment === 'cheque'}
                                                onChange={(e) => handleInputChange('modeOfPayment', e.target.value)}
                                                disabled={!isEditing}
                                            />
                                            <label htmlFor="cheque" className="vehicle-service-entry-radio-label">Cheque</label>
                                        </div>
                                        <div className="vehicle-service-entry-radio-group">
                                            <input
                                                type="radio"
                                                id="online"
                                                name="modeOfPayment"
                                                value="online"
                                                className="vehicle-service-entry-radio"
                                                checked={formData.modeOfPayment === 'online'}
                                                onChange={(e) => handleInputChange('modeOfPayment', e.target.value)}
                                                disabled={!isEditing}
                                            />
                                            <label htmlFor="online" className="vehicle-service-entry-radio-label">Online</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Full-width fields */}
                            <div className="vehicle-service-entry-form-grid">
                                {/* Spare Details */}
                                <div className="vehicle-service-entry-form-group">
                                    <label className="vehicle-service-entry-label">Spare Details</label>
                                    <textarea
                                        className="vehicle-service-entry-textarea"
                                        value={formData.spareDetails || ''}
                                        onChange={(e) => handleInputChange('spareDetails', e.target.value)}
                                        placeholder="Enter spare details"
                                        disabled={!isEditing}
                                    />
                                </div>

                                {/* Remarks */}
                                <div className="vehicle-service-entry-form-group">
                                    <label className="vehicle-service-entry-label">Remarks</label>
                                    <textarea
                                        className="vehicle-service-entry-textarea"
                                        value={formData.remarks || ''}
                                        onChange={(e) => handleInputChange('remarks', e.target.value)}
                                        placeholder="Enter remarks"
                                        disabled={!isEditing}
                                    />
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="vehicle-service-entry-form-actions">
                                {!isEditing ? (
                                    <button
                                        className="vehicle-service-entry-btn vehicle-service-entry-btn-warning"
                                        onClick={handleModify}
                                    >
                                        <Edit3 className="vehicle-service-entry-icon" />
                                        Modify Details
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            className="vehicle-service-entry-btn vehicle-service-entry-btn-secondary"
                                            onClick={handleReset}
                                        >
                                            Reset
                                        </button>
                                        <button
                                            className="vehicle-service-entry-btn vehicle-service-entry-btn-success"
                                            onClick={handleSave}
                                        >
                                            <Save className="vehicle-service-entry-icon" />
                                            Save LCV Service Details
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
