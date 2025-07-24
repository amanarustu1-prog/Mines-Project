import React, { useState } from 'react';
import './VehicleMasterEntry.css';

// Icon components
const Car = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6M2 8h20l-2 8H4L2 8z" />
    </svg>
);

const Plus = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
);

const Edit3 = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);

const Save = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
);

const FileText = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const Settings = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const Printer = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
    </svg>
);

const Search = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const Users = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m9 5.197v1M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);



const List = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
);

const BarChart3 = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13l4-4L11 13l4-4 4 4M3 21h18" />
    </svg>
);

const CreditCard = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
);




// Types
interface VehicleMasterEntry {
    id: string;
    regNo: string;
    make: string;
    idNo: string;
    model: string;
    equipmentType: string;
    engineChasisNo: string;
    costHead: 'Main' | 'Aux' | 'Cont' | '';
    emptyWeight: number;

    // Insurance Details
    policyNo: string;
    company: string;
    renewsOn: string;
    insuranceAmount: number;
    idv: string;
    hpa: string;
    expiresOn: string;

    // RTO Details
    roadTaxAmount: number;
    roadTaxRenewalDate: string;
    roadTaxExpDate: string;

    // Other Renewals
    fitnessRenewDate: string;
    fitnessExpDate: string;
    permitRenewDate: string;
    permitExpiryDate: string;
    pucRenewDate: string;
    pucExpiryDate: string;

    remarks: string;
    createdDate: string;
    modifiedDate: string;
}

const mockVehicleData: VehicleMasterEntry[] = [
    {
        id: '1',
        regNo: '2D',
        make: 'PUZZOLANA MACHINARY FABRICATORS',
        idNo: '1860',
        model: '2 DECK',
        equipmentType: 'SCREEN',
        engineChasisNo: 'SCREEN OF SANDER A',
        costHead: 'Main',
        emptyWeight: 500,
        policyNo: '',
        company: '',
        renewsOn: '18/May/22',
        insuranceAmount: 0,
        idv: '',
        hpa: '',
        expiresOn: '31/May/22',
        roadTaxAmount: 0,
        roadTaxRenewalDate: '01/May/22',
        roadTaxExpDate: '12/May/22',
        fitnessRenewDate: '31/May/22',
        fitnessExpDate: '01/May/22',
        permitRenewDate: '',
        permitExpiryDate: '',
        pucRenewDate: '',
        pucExpiryDate: '',
        remarks: '',
        createdDate: '2022-05-01',
        modifiedDate: '2022-05-01'
    },
    {
        id: '2',
        regNo: '3D',
        make: 'PUZZOLANA MACHINARY FABRICATORS',
        idNo: '1860',
        model: 'CONE 3',
        equipmentType: 'SCREEN',
        engineChasisNo: 'DECK SCREEN',
        costHead: 'Main',
        emptyWeight: 0,
        policyNo: '',
        company: '',
        renewsOn: '',
        insuranceAmount: 0,
        idv: '',
        hpa: '',
        expiresOn: '',
        roadTaxAmount: 0,
        roadTaxRenewalDate: '',
        roadTaxExpDate: '',
        fitnessRenewDate: '',
        fitnessExpDate: '',
        permitRenewDate: '',
        permitExpiryDate: '',
        pucRenewDate: '',
        pucExpiryDate: '',
        remarks: '',
        createdDate: '2022-05-01',
        modifiedDate: '2022-05-01'
    }
];

export default function VehicleMasterEntry() {
    const [activeTab, setActiveTab] = useState<'entry' | 'list'>('entry');
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [vehicles, setVehicles] = useState<VehicleMasterEntry[]>(mockVehicleData);
    const [selectedVehicle, setSelectedVehicle] = useState<VehicleMasterEntry | null>(null);

    const [formData, setFormData] = useState<Partial<VehicleMasterEntry>>({
        regNo: '',
        make: '',
        idNo: '',
        model: '',
        equipmentType: '',
        engineChasisNo: '',
        costHead: '',
        emptyWeight: 0,
        policyNo: '',
        company: '',
        renewsOn: '',
        insuranceAmount: 0,
        idv: '',
        hpa: '',
        expiresOn: '',
        roadTaxAmount: 0,
        roadTaxRenewalDate: '',
        roadTaxExpDate: '',
        fitnessRenewDate: '',
        fitnessExpDate: '',
        permitRenewDate: '',
        permitExpiryDate: '',
        pucRenewDate: '',
        pucExpiryDate: '',
        remarks: ''
    });

    const handleInputChange = (field: keyof VehicleMasterEntry, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        if (isEditing && selectedVehicle) {
            // Update existing vehicle
            const updatedVehicles = vehicles.map(v =>
                v.id === selectedVehicle.id
                    ? { ...v, ...formData, modifiedDate: new Date().toISOString().split('T')[0] }
                    : v
            );
            setVehicles(updatedVehicles);
            setIsEditing(false);
            setSelectedVehicle(null);
        } else {
            // Add new vehicle
            const newVehicle: VehicleMasterEntry = {
                id: Date.now().toString(),
                ...formData,
                createdDate: new Date().toISOString().split('T')[0],
                modifiedDate: new Date().toISOString().split('T')[0]
            } as VehicleMasterEntry;
            setVehicles([...vehicles, newVehicle]);
        }

        // Reset form
        setFormData({
            regNo: '',
            make: '',
            idNo: '',
            model: '',
            equipmentType: '',
            engineChasisNo: '',
            costHead: '',
            emptyWeight: 0,
            policyNo: '',
            company: '',
            renewsOn: '',
            insuranceAmount: 0,
            idv: '',
            hpa: '',
            expiresOn: '',
            roadTaxAmount: 0,
            roadTaxRenewalDate: '',
            roadTaxExpDate: '',
            fitnessRenewDate: '',
            fitnessExpDate: '',
            permitRenewDate: '',
            permitExpiryDate: '',
            pucRenewDate: '',
            pucExpiryDate: '',
            remarks: ''
        });
    };

    const handleEdit = (vehicle: VehicleMasterEntry) => {
        setSelectedVehicle(vehicle);
        setFormData(vehicle);
        setIsEditing(true);
        setActiveTab('entry');
    };

    const handleModify = () => {
        if (selectedVehicle) {
            handleSave();
        }
    };

    const filteredVehicles = vehicles.filter(vehicle =>
        vehicle.regNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.idNo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="vehicle-master-entry">
            {/* Header */}
            <div className="vehicle-master-entry-header">
                <div className="vehicle-master-entry-header-content">
                    <div className="vehicle-master-entry-title-section">
                        <Car className="vehicle-master-entry-header-icon" />
                        <div>
                            <h1 className="vehicle-master-entry-title">Vehicle Master Entry</h1>
                            <p className="vehicle-master-entry-subtitle">Equipment/Vehicle Master Details Management</p>
                        </div>
                    </div>
                    <div className="vehicle-master-entry-header-actions">
                        <button
                            className="vehicle-master-entry-btn vehicle-master-entry-btn-secondary"
                            onClick={() => window.print()}
                        >
                            <Printer className="vehicle-master-entry-icon-sm" />
                            Print Report
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="vehicle-master-entry-main">
                <div className="vehicle-master-entry-content">
                    {/* Tabs */}
                    <div className="vehicle-master-entry-tabs">
                        <div className="vehicle-master-entry-tabs-container">
                            <div className="vehicle-master-entry-tabs-nav">
                                <div className="vehicle-master-entry-tabs-list">
                                    <button
                                        className={`vehicle-master-entry-tab ${activeTab === 'entry' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('entry')}
                                    >
                                        <Plus className="vehicle-master-entry-tab-icon" />
                                        Vehicle Entry
                                    </button>
                                    <button
                                        className={`vehicle-master-entry-tab ${activeTab === 'list' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('list')}
                                    >
                                        <List className="vehicle-master-entry-tab-icon" />
                                        Vehicle List
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="vehicle-master-entry-tab-content">
                        {activeTab === 'entry' && (
                            <div className="vehicle-master-entry-form-section">
                                <div className="vehicle-master-entry-section-header">
                                    <h2 className="vehicle-master-entry-section-title">
                                        {isEditing ? 'Modify Vehicle Details' : 'Equipment/Vehicle Master Details Entry'}
                                    </h2>
                                    <p className="vehicle-master-entry-section-subtitle">
                                        Fill in the vehicle information below
                                    </p>
                                </div>

                                <div className="vehicle-master-entry-form-grid">
                                    {/* Basic Details */}
                                    <div className="vehicle-master-entry-form-group">
                                        <label className="vehicle-master-entry-form-label">Registration Number *</label>
                                        <input
                                            type="text"
                                            value={formData.regNo || ''}
                                            onChange={(e) => handleInputChange('regNo', e.target.value)}
                                            className="vehicle-master-entry-form-input"
                                            placeholder="Enter registration number"
                                        />
                                    </div>

                                    <div className="vehicle-master-entry-form-group">
                                        <label className="vehicle-master-entry-form-label">Identification No. *</label>
                                        <input
                                            type="text"
                                            value={formData.idNo || ''}
                                            onChange={(e) => handleInputChange('idNo', e.target.value)}
                                            className="vehicle-master-entry-form-input"
                                            placeholder="Enter identification number"
                                        />
                                    </div>

                                    <div className="vehicle-master-entry-form-group">
                                        <label className="vehicle-master-entry-form-label">Make *</label>
                                        <input
                                            type="text"
                                            value={formData.make || ''}
                                            onChange={(e) => handleInputChange('make', e.target.value)}
                                            className="vehicle-master-entry-form-input"
                                            placeholder="Enter make"
                                        />
                                    </div>

                                    <div className="vehicle-master-entry-form-group">
                                        <label className="vehicle-master-entry-form-label">Model *</label>
                                        <input
                                            type="text"
                                            value={formData.model || ''}
                                            onChange={(e) => handleInputChange('model', e.target.value)}
                                            className="vehicle-master-entry-form-input"
                                            placeholder="Enter model"
                                        />
                                    </div>

                                    <div className="vehicle-master-entry-form-group">
                                        <label className="vehicle-master-entry-form-label">Equipment/Vehicle Type</label>

                                        <select
                                            value={formData.costHead || ''}
                                            onChange={(e) => handleInputChange('equipmentType', e.target.value)}
                                            className="vehicle-master-entry-form-select"
                                        >
                                            <option value="">Equipmeny/vehicle type</option>
                                            <option value="Main">Main</option>
                                            <option value="Aux">Aux</option>
                                            <option value="Cont">Cont</option>
                                        </select>
                                    </div>

                                    <div className="vehicle-master-entry-form-group">
                                        <label className="vehicle-master-entry-form-label">Engine-Chasis No. *</label>
                                        <input
                                            type="text"
                                            value={formData.engineChasisNo || ''}
                                            onChange={(e) => handleInputChange('engineChasisNo', e.target.value)}
                                            className="vehicle-master-entry-form-input"
                                            placeholder="Enter engine-chasis number"
                                        />
                                    </div>

                                    <div className="vehicle-master-entry-form-group">
                                        <label className="vehicle-master-entry-form-label">Select CostHead</label>
                                        <select
                                            value={formData.costHead || ''}
                                            onChange={(e) => handleInputChange('costHead', e.target.value)}
                                            className="vehicle-master-entry-form-select"
                                        >
                                            <option value="">--Select CostHead--</option>
                                            <option value="Main">Main</option>
                                            <option value="Aux">Aux</option>
                                            <option value="Cont">Cont</option>
                                        </select>
                                    </div>

                                    <div className="vehicle-master-entry-form-group">
                                        <label className="vehicle-master-entry-form-label">Empty Weight (Kgs) *</label>
                                        <input
                                            type="number"
                                            value={formData.emptyWeight || 0}
                                            onChange={(e) => handleInputChange('emptyWeight', parseInt(e.target.value) || 0)}
                                            className="vehicle-master-entry-form-input"
                                            placeholder="Enter empty weight"
                                        />
                                    </div>
                                </div>

                                {/* Insurance Details */}
                                <div className="vehicle-master-entry-section-divider">
                                    <h3 className="vehicle-master-entry-section-subtitle">Insurance Details</h3>
                                </div>

                                <div className="vehicle-master-entry-form-grid">
                                    <div className="vehicle-master-entry-form-group">
                                        <label className="vehicle-master-entry-form-label">Policy No. *</label>
                                        <input
                                            type="text"
                                            value={formData.policyNo || ''}
                                            onChange={(e) => handleInputChange('policyNo', e.target.value)}
                                            className="vehicle-master-entry-form-input"
                                            placeholder="Enter policy number"
                                        />
                                    </div>

                                    <div className="vehicle-master-entry-form-group">
                                        <label className="vehicle-master-entry-form-label">Company</label>
                                        <input
                                            type="text"
                                            value={formData.company || ''}
                                            onChange={(e) => handleInputChange('company', e.target.value)}
                                            className="vehicle-master-entry-form-input"
                                            placeholder="Enter company name"
                                        />
                                    </div>

                                    <div className="vehicle-master-entry-form-group">
                                        <label className="vehicle-master-entry-form-label">Renews On *</label>
                                        <input
                                            type="date"
                                            value={formData.renewsOn || ''}
                                            onChange={(e) => handleInputChange('renewsOn', e.target.value)}
                                            className="vehicle-master-entry-form-input"
                                        />
                                    </div>

                                    <div className="vehicle-master-entry-form-group">
                                        <label className="vehicle-master-entry-form-label">Insurance Amount</label>
                                        <input
                                            type="number"
                                            value={formData.insuranceAmount || 0}
                                            onChange={(e) => handleInputChange('insuranceAmount', parseInt(e.target.value) || 0)}
                                            className="vehicle-master-entry-form-input"
                                            placeholder="Enter insurance amount"
                                        />
                                    </div>

                                    <div className="vehicle-master-entry-form-group">
                                        <label className="vehicle-master-entry-form-label">IDV</label>
                                        <input
                                            type="text"
                                            value={formData.idv || ''}
                                            onChange={(e) => handleInputChange('idv', e.target.value)}
                                            className="vehicle-master-entry-form-input"
                                            placeholder="Enter IDV"
                                        />
                                    </div>

                                    <div className="vehicle-master-entry-form-group">
                                        <label className="vehicle-master-entry-form-label">HPA</label>
                                        <input
                                            type="text"
                                            value={formData.hpa || ''}
                                            onChange={(e) => handleInputChange('hpa', e.target.value)}
                                            className="vehicle-master-entry-form-input"
                                            placeholder="Enter HPA"
                                        />
                                    </div>

                                    <div className="vehicle-master-entry-form-group">
                                        <label className="vehicle-master-entry-form-label">Expires On *</label>
                                        <input
                                            type="date"
                                            value={formData.expiresOn || ''}
                                            onChange={(e) => handleInputChange('expiresOn', e.target.value)}
                                            className="vehicle-master-entry-form-input"
                                        />
                                    </div>
                                </div>

                                {/* RTO Details */}
                                <div className="vehicle-master-entry-section-divider">
                                    <h3 className="vehicle-master-entry-section-subtitle">RTO Details</h3>
                                </div>

                                <div className="vehicle-master-entry-form-grid">
                                    <div className="vehicle-master-entry-form-group">
                                        <label className="vehicle-master-entry-form-label">Road Tax Amount *</label>
                                        <input
                                            type="number"
                                            value={formData.roadTaxAmount || 0}
                                            onChange={(e) => handleInputChange('roadTaxAmount', parseInt(e.target.value) || 0)}
                                            className="vehicle-master-entry-form-input"
                                            placeholder="Enter road tax amount"
                                        />
                                    </div>

                                    <div className="vehicle-master-entry-form-group">
                                        <label className="vehicle-master-entry-form-label">Road Tax Renewal Date</label>
                                        <input
                                            type="date"
                                            value={formData.roadTaxRenewalDate || ''}
                                            onChange={(e) => handleInputChange('roadTaxRenewalDate', e.target.value)}
                                            className="vehicle-master-entry-form-input"
                                        />
                                    </div>

                                    <div className="vehicle-master-entry-form-group">
                                        <label className="vehicle-master-entry-form-label">Road Tax Exp Date *</label>
                                        <input
                                            type="date"
                                            value={formData.roadTaxExpDate || ''}
                                            onChange={(e) => handleInputChange('roadTaxExpDate', e.target.value)}
                                            className="vehicle-master-entry-form-input"
                                        />
                                    </div>
                                </div>

                                {/* Other Renewals */}
                                <div className="vehicle-master-entry-section-divider">
                                    <h3 className="vehicle-master-entry-section-subtitle">Other Renewals</h3>
                                </div>

                                <div className="vehicle-master-entry-form-grid">
                                    <div className="vehicle-master-entry-form-group">
                                        <label className="vehicle-master-entry-form-label">Fitness Renew Date *</label>
                                        <input
                                            type="date"
                                            value={formData.fitnessRenewDate || ''}
                                            onChange={(e) => handleInputChange('fitnessRenewDate', e.target.value)}
                                            className="vehicle-master-entry-form-input"
                                        />
                                    </div>

                                    <div className="vehicle-master-entry-form-group">
                                        <label className="vehicle-master-entry-form-label">Fitness Exp Date *</label>
                                        <input
                                            type="date"
                                            value={formData.fitnessExpDate || ''}
                                            onChange={(e) => handleInputChange('fitnessExpDate', e.target.value)}
                                            className="vehicle-master-entry-form-input"
                                        />
                                    </div>

                                    <div className="vehicle-master-entry-form-group">
                                        <label className="vehicle-master-entry-form-label">Permit Renew Date *</label>
                                        <input
                                            type="date"
                                            value={formData.permitRenewDate || ''}
                                            onChange={(e) => handleInputChange('permitRenewDate', e.target.value)}
                                            className="vehicle-master-entry-form-input"
                                        />
                                    </div>

                                    <div className="vehicle-master-entry-form-group">
                                        <label className="vehicle-master-entry-form-label">Permit Expiry Date *</label>
                                        <input
                                            type="date"
                                            value={formData.permitExpiryDate || ''}
                                            onChange={(e) => handleInputChange('permitExpiryDate', e.target.value)}
                                            className="vehicle-master-entry-form-input"
                                        />
                                    </div>

                                    <div className="vehicle-master-entry-form-group">
                                        <label className="vehicle-master-entry-form-label">PUC Renew Date *</label>
                                        <input
                                            type="date"
                                            value={formData.pucRenewDate || ''}
                                            onChange={(e) => handleInputChange('pucRenewDate', e.target.value)}
                                            className="vehicle-master-entry-form-input"
                                        />
                                    </div>

                                    <div className="vehicle-master-entry-form-group">
                                        <label className="vehicle-master-entry-form-label">PUC Expiry Date *</label>
                                        <input
                                            type="date"
                                            value={formData.pucExpiryDate || ''}
                                            onChange={(e) => handleInputChange('pucExpiryDate', e.target.value)}
                                            className="vehicle-master-entry-form-input"
                                        />
                                    </div>
                                </div>

                                {/* Remarks */}
                                <div className="vehicle-master-entry-form-group vehicle-master-entry-form-group-full">
                                    <label className="vehicle-master-entry-form-label">Remarks</label>
                                    <textarea
                                        value={formData.remarks || ''}
                                        onChange={(e) => handleInputChange('remarks', e.target.value)}
                                        className="vehicle-master-entry-form-textarea"
                                        placeholder="Enter remarks"
                                        rows={3}
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className="vehicle-master-entry-form-actions">
                                    <button
                                        className="vehicle-master-entry-btn vehicle-master-entry-btn-primary"
                                        onClick={handleSave}
                                    >
                                        <Save className="vehicle-master-entry-icon-sm" />
                                        Save Details
                                    </button>
                                    {isEditing && (
                                        <button
                                            className="vehicle-master-entry-btn vehicle-master-entry-btn-secondary"
                                            onClick={handleModify}
                                        >
                                            <Edit3 className="vehicle-master-entry-icon-sm" />
                                            Modify Details
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'list' && (
                            <div className="vehicle-master-entry-list-section">
                                <div className="vehicle-master-entry-section-header">
                                    <h2 className="vehicle-master-entry-section-title">Vehicle Master List</h2>
                                    <p className="vehicle-master-entry-section-subtitle">
                                        View and manage all registered vehicles
                                    </p>
                                </div>

                                {/* Statistics */}
                                <div className="vehicle-master-entry-stats-grid">
                                    <div className="vehicle-master-entry-stat-card">
                                        <div className="vehicle-master-entry-stat-header">
                                            <div className="vehicle-master-entry-stat-icon vehicle-master-entry-stat-icon-blue">
                                                <Car className="vehicle-master-entry-icon" />
                                            </div>
                                        </div>
                                        <div className="vehicle-master-entry-stat-value">{vehicles.length}</div>
                                        <div className="vehicle-master-entry-stat-label">Total Vehicles</div>
                                    </div>
                                    <div className="vehicle-master-entry-stat-card">
                                        <div className="vehicle-master-entry-stat-header">
                                            <div className="vehicle-master-entry-stat-icon vehicle-master-entry-stat-icon-green">
                                                <BarChart3 className="vehicle-master-entry-icon" />
                                            </div>
                                        </div>
                                        <div className="vehicle-master-entry-stat-value">
                                            {vehicles.filter(v => v.costHead === 'Main').length}
                                        </div>
                                        <div className="vehicle-master-entry-stat-label">Main Fleet</div>
                                    </div>
                                    <div className="vehicle-master-entry-stat-card">
                                        <div className="vehicle-master-entry-stat-header">
                                            <div className="vehicle-master-entry-stat-icon vehicle-master-entry-stat-icon-yellow">
                                                <Settings className="vehicle-master-entry-icon" />
                                            </div>
                                        </div>
                                        <div className="vehicle-master-entry-stat-value">
                                            {vehicles.filter(v => v.costHead === 'Aux').length}
                                        </div>
                                        <div className="vehicle-master-entry-stat-label">Auxiliary Vehicles</div>
                                    </div>
                                    <div className="vehicle-master-entry-stat-card">
                                        <div className="vehicle-master-entry-stat-header">
                                            <div className="vehicle-master-entry-stat-icon vehicle-master-entry-stat-icon-purple">
                                                <FileText className="vehicle-master-entry-icon" />
                                            </div>
                                        </div>
                                        <div className="vehicle-master-entry-stat-value">
                                            {vehicles.filter(v => v.costHead === 'Cont').length}
                                        </div>
                                        <div className="vehicle-master-entry-stat-label">Contract Vehicles</div>
                                    </div>
                                </div>

                                {/* Search */}
                                <div className="vehicle-master-entry-search-section">
                                    <div className="vehicle-master-entry-search-container">
                                        <Search className="vehicle-master-entry-search-icon" />
                                        <input
                                            type="text"
                                            placeholder="Search by registration number, make, model, or ID..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="vehicle-master-entry-search-input"
                                        />
                                    </div>
                                </div>

                                {/* Vehicle List Table */}
                                <div className="vehicle-master-entry-table-container">
                                    <table className="vehicle-master-entry-table">
                                        <thead>
                                            <tr>
                                                <th>SNO</th>
                                                <th>Reg No</th>
                                                <th>Make</th>
                                                <th>Model</th>
                                                <th>Type</th>
                                                <th>Chasis No</th>
                                                <th>Policy No</th>
                                                <th>Insurance Exp</th>
                                                <th>Fitness Exp</th>
                                                <th>PUC Exp</th>
                                                <th>Tax Exp</th>
                                                <th>Permit Exp</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredVehicles.map((vehicle, index) => (
                                                <tr key={vehicle.id}>
                                                    <td>{index + 1}</td>
                                                    <td className="text-nowrap">{vehicle.regNo}</td>
                                                    <td className="text-nowrap">{vehicle.make}</td>
                                                    <td className="text-nowrap">{vehicle.model}</td>
                                                    <td className="text-nowrap">{vehicle.costHead || '-'}</td>
                                                    <td className="text-nowrap" title={vehicle.engineChasisNo}>
                                                        {vehicle.engineChasisNo.substring(0, 10)}{vehicle.engineChasisNo.length > 10 ? '...' : ''}
                                                    </td>
                                                    <td className="text-nowrap">{vehicle.policyNo || '-'}</td>
                                                    <td className="text-nowrap">{vehicle.expiresOn || '-'}</td>
                                                    <td className="text-nowrap">{vehicle.fitnessExpDate || '-'}</td>
                                                    <td className="text-nowrap">{vehicle.pucExpiryDate || '-'}</td>
                                                    <td className="text-nowrap">{vehicle.roadTaxExpDate || '-'}</td>
                                                    <td className="text-nowrap">{vehicle.permitExpiryDate || '-'}</td>
                                                    <td>
                                                        <div className="vehicle-master-entry-table-actions">
                                                            <button
                                                                className="vehicle-master-entry-btn-icon"
                                                                onClick={() => handleEdit(vehicle)}
                                                                title="Edit Vehicle"
                                                            >
                                                                <Edit3 className="vehicle-master-entry-icon-sm" />
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
        </div>
    );
}
