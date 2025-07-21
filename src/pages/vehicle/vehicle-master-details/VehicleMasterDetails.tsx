import React, { useState } from 'react';
import './VehicleMasterDetails.css';

// Icon components
const Car = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
);

const Wrench = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const Shield = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);

const FileText = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const List = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
);

const Plus = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
);

const Save = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
);

const Download = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const Edit3 = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);

const Trash2 = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 7-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const Printer = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
    </svg>
);

// Types
interface VehicleMasterDetail {
    id: string;
    registrationNumber: string;
    vehicleIdentificationNo: string;
    vehicleMake: string;
    model: string;
    emptyVehicleWeight: number;
    changeFrequency: number;
    lastChangeDate: string;
    lastChangeHours: number;
    testValue: string;
    engineChasisNo: string;
    insuranceDetails: {
        policyNo: string;
        company: string;
        expiresOn: string;
        idv: number;
        hpa: string;
        insuranceAmount: number;
    };
    rtoDetails: {
        roadTaxAmount: number;
        fitnessDueDate: string;
        pucExpiryDate: string;
        roadTaxDueDate: string;
        permitExpiryDate: string;
    };
    remarks: string;
    status: 'active' | 'maintenance' | 'inactive';
}

export default function VehicleMasterDetails() {
    const [activeTab, setActiveTab] = useState('entry');
    const [vehicleForm, setVehicleForm] = useState<Partial<VehicleMasterDetail>>({
        registrationNumber: '',
        vehicleIdentificationNo: '',
        vehicleMake: '',
        model: '',
        emptyVehicleWeight: 0,
        changeFrequency: 50,
        lastChangeDate: '',
        lastChangeHours: 0,
        testValue: 'TEST-1',
        engineChasisNo: '',
        insuranceDetails: {
            policyNo: '',
            company: '',
            expiresOn: '',
            idv: 0,
            hpa: '',
            insuranceAmount: 0,
        },
        rtoDetails: {
            roadTaxAmount: 0,
            fitnessDueDate: '',
            pucExpiryDate: '',
            roadTaxDueDate: '',
            permitExpiryDate: '',
        },
        remarks: '',
        status: 'active',
    });

    // Sample vehicle data
    const [vehicles, setVehicles] = useState<VehicleMasterDetail[]>([
        {
            id: '1',
            registrationNumber: '2D SCREEN',
            vehicleIdentificationNo: '1860',
            vehicleMake: 'PUZZOLANA MACHINARY FABRICATORS',
            model: '2 DECK SCREEN OF SANDER A',
            emptyVehicleWeight: 500,
            changeFrequency: 50,
            lastChangeDate: '18/May/22',
            lastChangeHours: 0,
            testValue: 'TEST-1',
            engineChasisNo: '',
            insuranceDetails: {
                policyNo: '',
                company: '',
                expiresOn: '31/May/22',
                idv: 0,
                hpa: '',
                insuranceAmount: 0,
            },
            rtoDetails: {
                roadTaxAmount: 0,
                fitnessDueDate: '01/May/22',
                pucExpiryDate: '12/May/22',
                roadTaxDueDate: '31/May/22',
                permitExpiryDate: '01/May/22',
            },
            remarks: '',
            status: 'active',
        }
    ]);

    const handleInputChange = (field: string, value: any) => {
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            setVehicleForm(prev => ({
                ...prev,
                [parent]: {
                    ...(prev[parent as keyof VehicleMasterDetail] as any),
                    [child]: value
                }
            }));
        } else {
            setVehicleForm(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };

    const handleSaveVehicle = () => {
        if (vehicleForm.registrationNumber && vehicleForm.vehicleMake) {
            const newVehicle: VehicleMasterDetail = {
                id: Date.now().toString(),
                registrationNumber: vehicleForm.registrationNumber || '',
                vehicleIdentificationNo: vehicleForm.vehicleIdentificationNo || '',
                vehicleMake: vehicleForm.vehicleMake || '',
                model: vehicleForm.model || '',
                emptyVehicleWeight: vehicleForm.emptyVehicleWeight || 0,
                changeFrequency: vehicleForm.changeFrequency || 50,
                lastChangeDate: vehicleForm.lastChangeDate || '',
                lastChangeHours: vehicleForm.lastChangeHours || 0,
                testValue: vehicleForm.testValue || '',
                engineChasisNo: vehicleForm.engineChasisNo || '',
                insuranceDetails: vehicleForm.insuranceDetails || {
                    policyNo: '',
                    company: '',
                    expiresOn: '',
                    idv: 0,
                    hpa: '',
                    insuranceAmount: 0,
                },
                rtoDetails: vehicleForm.rtoDetails || {
                    roadTaxAmount: 0,
                    fitnessDueDate: '',
                    pucExpiryDate: '',
                    roadTaxDueDate: '',
                    permitExpiryDate: '',
                },
                remarks: vehicleForm.remarks || '',
                status: vehicleForm.status || 'active',
            };

            setVehicles(prev => [...prev, newVehicle]);

            // Reset form
            setVehicleForm({
                registrationNumber: '',
                vehicleIdentificationNo: '',
                vehicleMake: '',
                model: '',
                emptyVehicleWeight: 0,
                changeFrequency: 50,
                lastChangeDate: '',
                lastChangeHours: 0,
                testValue: 'TEST-1',
                engineChasisNo: '',
                insuranceDetails: {
                    policyNo: '',
                    company: '',
                    expiresOn: '',
                    idv: 0,
                    hpa: '',
                    insuranceAmount: 0,
                },
                rtoDetails: {
                    roadTaxAmount: 0,
                    fitnessDueDate: '',
                    pucExpiryDate: '',
                    roadTaxDueDate: '',
                    permitExpiryDate: '',
                },
                remarks: '',
                status: 'active',
            });
        }
    };

    const handlePrintRenewalReport = () => {
        window.print();
    };

    return (
        <div className="vehicle-master-details">
            {/* Header */}
            <div className="vehicle-master-details-header">
                <div className="vehicle-master-details-header-content">
                    <div className="vehicle-master-details-title-section">
                        <Car className="vehicle-master-details-header-icon" />
                        <div>
                            <h1 className="vehicle-master-details-title">Vehicle Master Details</h1>
                            <p className="vehicle-master-details-subtitle">Comprehensive vehicle information and maintenance management</p>
                        </div>
                    </div>
                    <div className="vehicle-master-details-header-actions">
                        <button
                            className="vehicle-master-details-btn vehicle-master-details-btn-secondary"
                            onClick={handlePrintRenewalReport}
                        >
                            <Printer className="vehicle-master-details-icon" />
                            Print Renewal Report
                        </button>
                        <button className="vehicle-master-details-btn vehicle-master-details-btn-primary">
                            <Download className="vehicle-master-details-icon" />
                            Export Data
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="vehicle-master-details-main">
                {/* Tabs */}
                <div className="vehicle-master-details-tabs">
                    <div className="vehicle-master-details-tabs-container">
                        <div className="vehicle-master-details-tabs-nav">
                            <div className="vehicle-master-details-tabs-list">
                                <button
                                    className={`vehicle-master-details-tab ${activeTab === 'entry' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('entry')}
                                >
                                    <Plus className="vehicle-master-details-tab-icon" />
                                    Vehicle Entry
                                </button>
                                <button
                                    className={`vehicle-master-details-tab ${activeTab === 'maintenance' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('maintenance')}
                                >
                                    <Wrench className="vehicle-master-details-tab-icon" />
                                    Maintenance Details
                                </button>
                                <button
                                    className={`vehicle-master-details-tab ${activeTab === 'insurance' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('insurance')}
                                >
                                    <Shield className="vehicle-master-details-tab-icon" />
                                    Insurance & RTO
                                </button>
                                <button
                                    className={`vehicle-master-details-tab ${activeTab === 'list' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('list')}
                                >
                                    <List className="vehicle-master-details-tab-icon" />
                                    Vehicle List
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="vehicle-master-details-content">
                    {activeTab === 'entry' && (
                        <div className="vehicle-master-details-tab-content">
                            <div className="vehicle-master-details-section-header">
                                <div>
                                    <h2 className="vehicle-master-details-section-title">Vehicle Master Details Entry</h2>
                                    <p className="vehicle-master-details-section-subtitle">Enter comprehensive vehicle information and specifications</p>
                                </div>
                                <button
                                    className="vehicle-master-details-btn vehicle-master-details-btn-primary"
                                    onClick={handleSaveVehicle}
                                >
                                    <Save className="vehicle-master-details-icon" />
                                    Save Details
                                </button>
                            </div>

                            <div className="vehicle-master-details-form">
                                {/* Basic Vehicle Information */}
                                <div className="vehicle-master-details-card">
                                    <div className="vehicle-master-details-card-header">
                                        <h3 className="vehicle-master-details-card-title">Basic Information</h3>
                                    </div>
                                    <div className="vehicle-master-details-card-content">
                                        <div className="vehicle-master-details-form-grid">
                                            <div className="vehicle-master-details-form-group">
                                                <label className="vehicle-master-details-label">Registration Number</label>
                                                <input
                                                    type="text"
                                                    className="vehicle-master-details-input"
                                                    value={vehicleForm.registrationNumber}
                                                    onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                                                    placeholder="Enter registration number"
                                                />
                                            </div>
                                            <div className="vehicle-master-details-form-group">
                                                <label className="vehicle-master-details-label">Vehicle Identification No.</label>
                                                <input
                                                    type="text"
                                                    className="vehicle-master-details-input"
                                                    value={vehicleForm.vehicleIdentificationNo}
                                                    onChange={(e) => handleInputChange('vehicleIdentificationNo', e.target.value)}
                                                    placeholder="Enter VIN"
                                                />
                                            </div>
                                            <div className="vehicle-master-details-form-group">
                                                <label className="vehicle-master-details-label">Vehicle Make</label>
                                                <input
                                                    type="text"
                                                    className="vehicle-master-details-input"
                                                    value={vehicleForm.vehicleMake}
                                                    onChange={(e) => handleInputChange('vehicleMake', e.target.value)}
                                                    placeholder="Enter vehicle make"
                                                />
                                            </div>
                                            <div className="vehicle-master-details-form-group">
                                                <label className="vehicle-master-details-label">Model</label>
                                                <input
                                                    type="text"
                                                    className="vehicle-master-details-input"
                                                    value={vehicleForm.model}
                                                    onChange={(e) => handleInputChange('model', e.target.value)}
                                                    placeholder="Enter model"
                                                />
                                            </div>
                                            <div className="vehicle-master-details-form-group">
                                                <label className="vehicle-master-details-label">Empty Vehicle Weight (Kgs)</label>
                                                <input
                                                    type="number"
                                                    className="vehicle-master-details-input"
                                                    value={vehicleForm.emptyVehicleWeight}
                                                    onChange={(e) => handleInputChange('emptyVehicleWeight', parseInt(e.target.value) || 0)}
                                                    placeholder="Enter weight in kg"
                                                />
                                            </div>
                                            <div className="vehicle-master-details-form-group">
                                                <label className="vehicle-master-details-label">Engine-Chasis No.</label>
                                                <input
                                                    type="text"
                                                    className="vehicle-master-details-input"
                                                    value={vehicleForm.engineChasisNo}
                                                    onChange={(e) => handleInputChange('engineChasisNo', e.target.value)}
                                                    placeholder="Enter engine-chasis number"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'maintenance' && (
                        <div className="vehicle-master-details-tab-content">
                            <div className="vehicle-master-details-section-header">
                                <div>
                                    <h2 className="vehicle-master-details-section-title">Maintenance Master Details</h2>
                                    <p className="vehicle-master-details-section-subtitle">Manage vehicle maintenance schedules and records</p>
                                </div>
                            </div>

                            <div className="vehicle-master-details-maintenance-section">
                                <h3 className="vehicle-master-details-maintenance-title">Maintenance Schedule</h3>
                                <div className="vehicle-master-details-form-grid">
                                    <div className="vehicle-master-details-form-group">
                                        <label className="vehicle-master-details-label">Change Frequency (in Hrs)</label>
                                        <input
                                            type="number"
                                            className="vehicle-master-details-input"
                                            value={vehicleForm.changeFrequency}
                                            onChange={(e) => handleInputChange('changeFrequency', parseInt(e.target.value) || 0)}
                                            placeholder="Enter frequency in hours"
                                        />
                                    </div>
                                    <div className="vehicle-master-details-form-group">
                                        <label className="vehicle-master-details-label">Last Change Date</label>
                                        <input
                                            type="date"
                                            className="vehicle-master-details-input"
                                            value={vehicleForm.lastChangeDate}
                                            onChange={(e) => handleInputChange('lastChangeDate', e.target.value)}
                                        />
                                    </div>
                                    <div className="vehicle-master-details-form-group">
                                        <label className="vehicle-master-details-label">Last Change (Hrs.)</label>
                                        <input
                                            type="number"
                                            className="vehicle-master-details-input"
                                            value={vehicleForm.lastChangeHours}
                                            onChange={(e) => handleInputChange('lastChangeHours', parseInt(e.target.value) || 0)}
                                            placeholder="Enter hours"
                                        />
                                    </div>
                                    <div className="vehicle-master-details-form-group">
                                        <label className="vehicle-master-details-label">Test Value</label>
                                        <input
                                            type="text"
                                            className="vehicle-master-details-input"
                                            value={vehicleForm.testValue}
                                            onChange={(e) => handleInputChange('testValue', e.target.value)}
                                            placeholder="Enter test value"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'insurance' && (
                        <div className="vehicle-master-details-tab-content">
                            <div className="vehicle-master-details-section-header">
                                <div>
                                    <h2 className="vehicle-master-details-section-title">Insurance & RTO Details</h2>
                                    <p className="vehicle-master-details-section-subtitle">Manage insurance policies and RTO compliance</p>
                                </div>
                            </div>

                            <div className="vehicle-master-details-form">
                                {/* Insurance Details */}
                                <div className="vehicle-master-details-card">
                                    <div className="vehicle-master-details-card-header">
                                        <h3 className="vehicle-master-details-card-title">Insurance Details</h3>
                                    </div>
                                    <div className="vehicle-master-details-card-content">
                                        <div className="vehicle-master-details-form-grid">
                                            <div className="vehicle-master-details-form-group">
                                                <label className="vehicle-master-details-label">Policy No.</label>
                                                <input
                                                    type="text"
                                                    className="vehicle-master-details-input"
                                                    value={vehicleForm.insuranceDetails?.policyNo}
                                                    onChange={(e) => handleInputChange('insuranceDetails.policyNo', e.target.value)}
                                                    placeholder="Enter policy number"
                                                />
                                            </div>
                                            <div className="vehicle-master-details-form-group">
                                                <label className="vehicle-master-details-label">Company</label>
                                                <input
                                                    type="text"
                                                    className="vehicle-master-details-input"
                                                    value={vehicleForm.insuranceDetails?.company}
                                                    onChange={(e) => handleInputChange('insuranceDetails.company', e.target.value)}
                                                    placeholder="Enter insurance company"
                                                />
                                            </div>
                                            <div className="vehicle-master-details-form-group">
                                                <label className="vehicle-master-details-label">Expires On</label>
                                                <input
                                                    type="date"
                                                    className="vehicle-master-details-input"
                                                    value={vehicleForm.insuranceDetails?.expiresOn}
                                                    onChange={(e) => handleInputChange('insuranceDetails.expiresOn', e.target.value)}
                                                />
                                            </div>
                                            <div className="vehicle-master-details-form-group">
                                                <label className="vehicle-master-details-label">IDV</label>
                                                <input
                                                    type="number"
                                                    className="vehicle-master-details-input"
                                                    value={vehicleForm.insuranceDetails?.idv}
                                                    onChange={(e) => handleInputChange('insuranceDetails.idv', parseInt(e.target.value) || 0)}
                                                    placeholder="Enter IDV amount"
                                                />
                                            </div>
                                            <div className="vehicle-master-details-form-group">
                                                <label className="vehicle-master-details-label">HPA</label>
                                                <input
                                                    type="text"
                                                    className="vehicle-master-details-input"
                                                    value={vehicleForm.insuranceDetails?.hpa}
                                                    onChange={(e) => handleInputChange('insuranceDetails.hpa', e.target.value)}
                                                    placeholder="Enter HPA details"
                                                />
                                            </div>
                                            <div className="vehicle-master-details-form-group">
                                                <label className="vehicle-master-details-label">Insurance Amount</label>
                                                <input
                                                    type="number"
                                                    className="vehicle-master-details-input"
                                                    value={vehicleForm.insuranceDetails?.insuranceAmount}
                                                    onChange={(e) => handleInputChange('insuranceDetails.insuranceAmount', parseInt(e.target.value) || 0)}
                                                    placeholder="Enter insurance amount"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* RTO Details */}
                                <div className="vehicle-master-details-card">
                                    <div className="vehicle-master-details-card-header">
                                        <h3 className="vehicle-master-details-card-title">RTO Details</h3>
                                    </div>
                                    <div className="vehicle-master-details-card-content">
                                        <div className="vehicle-master-details-form-grid">
                                            <div className="vehicle-master-details-form-group">
                                                <label className="vehicle-master-details-label">Road Tax Amount</label>
                                                <input
                                                    type="number"
                                                    className="vehicle-master-details-input"
                                                    value={vehicleForm.rtoDetails?.roadTaxAmount}
                                                    onChange={(e) => handleInputChange('rtoDetails.roadTaxAmount', parseInt(e.target.value) || 0)}
                                                    placeholder="Enter road tax amount"
                                                />
                                            </div>
                                            <div className="vehicle-master-details-form-group">
                                                <label className="vehicle-master-details-label">Fitness Due Date</label>
                                                <input
                                                    type="date"
                                                    className="vehicle-master-details-input"
                                                    value={vehicleForm.rtoDetails?.fitnessDueDate}
                                                    onChange={(e) => handleInputChange('rtoDetails.fitnessDueDate', e.target.value)}
                                                />
                                            </div>
                                            <div className="vehicle-master-details-form-group">
                                                <label className="vehicle-master-details-label">PUC Expiry Date</label>
                                                <input
                                                    type="date"
                                                    className="vehicle-master-details-input"
                                                    value={vehicleForm.rtoDetails?.pucExpiryDate}
                                                    onChange={(e) => handleInputChange('rtoDetails.pucExpiryDate', e.target.value)}
                                                />
                                            </div>
                                            <div className="vehicle-master-details-form-group">
                                                <label className="vehicle-master-details-label">Road Tax Due Date (Quarterly)</label>
                                                <input
                                                    type="date"
                                                    className="vehicle-master-details-input"
                                                    value={vehicleForm.rtoDetails?.roadTaxDueDate}
                                                    onChange={(e) => handleInputChange('rtoDetails.roadTaxDueDate', e.target.value)}
                                                />
                                            </div>
                                            <div className="vehicle-master-details-form-group">
                                                <label className="vehicle-master-details-label">Permit Expiry Date</label>
                                                <input
                                                    type="date"
                                                    className="vehicle-master-details-input"
                                                    value={vehicleForm.rtoDetails?.permitExpiryDate}
                                                    onChange={(e) => handleInputChange('rtoDetails.permitExpiryDate', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Remarks */}
                                <div className="vehicle-master-details-card">
                                    <div className="vehicle-master-details-card-header">
                                        <h3 className="vehicle-master-details-card-title">Additional Information</h3>
                                    </div>
                                    <div className="vehicle-master-details-card-content">
                                        <div className="vehicle-master-details-form-group">
                                            <label className="vehicle-master-details-label">Remarks</label>
                                            <textarea
                                                className="vehicle-master-details-textarea"
                                                value={vehicleForm.remarks}
                                                onChange={(e) => handleInputChange('remarks', e.target.value)}
                                                placeholder="Enter any additional remarks or notes"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'list' && (
                        <div className="vehicle-master-details-tab-content">
                            <div className="vehicle-master-details-section-header">
                                <div>
                                    <h2 className="vehicle-master-details-section-title">Vehicle List</h2>
                                    <p className="vehicle-master-details-section-subtitle">View and manage all registered vehicles</p>
                                </div>
                            </div>

                            <div className="vehicle-master-details-table-container">
                                <table className="vehicle-master-details-table">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Reg No</th>
                                            <th>Make</th>
                                            <th>Model</th>
                                            <th>Id No.</th>
                                            <th>Chasis</th>
                                            <th>Pol No</th>
                                            <th>Pol Ren Dt</th>
                                            <th>Pol Exp Dt</th>
                                            <th>Rem Dt</th>
                                            <th>PUC D</th>
                                            <th>PUC Ren Dt</th>
                                            <th>PUC Rem Dt</th>
                                            <th>Road Tax</th>
                                            <th>Empty Wt</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vehicles.map((vehicle, index) => (
                                            <tr key={vehicle.id}>
                                                <td>{index + 1}</td>
                                                <td>{vehicle.registrationNumber}</td>
                                                <td>{vehicle.vehicleMake}</td>
                                                <td>{vehicle.model}</td>
                                                <td>{vehicle.vehicleIdentificationNo}</td>
                                                <td>{vehicle.engineChasisNo}</td>
                                                <td>{vehicle.insuranceDetails.policyNo}</td>
                                                <td>{vehicle.lastChangeDate}</td>
                                                <td>{vehicle.insuranceDetails.expiresOn}</td>
                                                <td>{vehicle.rtoDetails.fitnessDueDate}</td>
                                                <td>{vehicle.rtoDetails.pucExpiryDate}</td>
                                                <td>{vehicle.lastChangeDate}</td>
                                                <td>{vehicle.rtoDetails.pucExpiryDate}</td>
                                                <td>{vehicle.rtoDetails.roadTaxAmount}</td>
                                                <td>{vehicle.emptyVehicleWeight}</td>
                                                <td>
                                                    <div className="vehicle-master-details-flex vehicle-master-details-gap-2">
                                                        <button className="vehicle-master-details-btn-icon">
                                                            <Edit3 className="vehicle-master-details-icon-sm" />
                                                        </button>
                                                        <button className="vehicle-master-details-btn-icon vehicle-master-details-btn-icon-danger">
                                                            <Trash2 className="vehicle-master-details-icon-sm" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
