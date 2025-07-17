import React, { useState } from 'react';
import './EntryExplosive.css';

// Icon components
const Zap = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

const Mountain = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 20v-6a2 2 0 00-2-2H2v8h2zm6-6a2 2 0 00-2-2H6v8h6v-6zm6-6a2 2 0 00-2-2h-2v14h4v-12z" />
    </svg>
);

const Calendar = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const Save = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
);

const RefreshCw = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 4v6h6m16 10v-6h-6M7 5a9 9 0 109 9" />
    </svg>
);

const ChevronDown = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

const Eye = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

// Types
interface BlastDetails {
    benchNo: string;
    siteDir: string;
    blastNo: string;
    blastDate: string;
    year: string;
}

interface ExplosiveDetails {
    holeDia: number;
    holeDep: number;
    benchHt: number;
    burden: number;
    spacing: number;
    noOfRow: number;
    noOfHolePRow: number;
    gravity: number;
    totHoles: number;
    irId: string;
    supplierId: string;
}

interface Supplier {
    id: string;
    name: string;
    contactPerson: string;
    phone: string;
    email: string;
    status: 'active' | 'inactive';
}

export default function EntryExplosive() {
    const [selectedBlastId, setSelectedBlastId] = useState('');
    const [showDetails, setShowDetails] = useState(false);
    const [pitType, setPitType] = useState('blast');

    // Sample blast data
    const [blastDetails, setBlastDetails] = useState<BlastDetails>({
        benchNo: '2',
        siteDir: 'TEST',
        blastNo: '',
        blastDate: '16/May/22 20.00',
        year: '2023/2024'
    });

    // Explosive details form
    const [explosiveDetails, setExplosiveDetails] = useState<ExplosiveDetails>({
        holeDia: 25.00,
        holeDep: 25.00,
        benchHt: 25.00,
        burden: 25.00,
        spacing: 5.00,
        noOfRow: 2.00,
        noOfHolePRow: 0,
        gravity: 0,
        totHoles: 0,
        irId: '',
        supplierId: ''
    });

    // Sample suppliers data
    const [suppliers] = useState<Supplier[]>([
        {
            id: 'supplier-1',
            name: 'Mining Explosives India Pvt Ltd',
            contactPerson: 'Rajesh Kumar',
            phone: '9876543210',
            email: 'rajesh@meipl.com',
            status: 'active'
        },
        {
            id: 'supplier-2',
            name: 'Bharat Dynamics Limited',
            contactPerson: 'Suresh Patel',
            phone: '9876543211',
            email: 'suresh@bdl.in',
            status: 'active'
        },
        {
            id: 'supplier-3',
            name: 'Explosive Materials Corp',
            contactPerson: 'Anil Sharma',
            phone: '9876543212',
            email: 'anil@emc.com',
            status: 'active'
        }
    ]);

    // Sample blast IDs
    const blastIds = [
        'BLAST-001',
        'BLAST-002',
        'BLAST-003',
        'BLAST-004',
        'BLAST-005'
    ];

    const handleShowDetails = () => {
        if (selectedBlastId) {
            setShowDetails(true);
            // In real application, fetch blast details from API
        }
    };

    const handleReverseForReEntry = () => {
        // Logic to reverse blast entry for re-entry
        setExplosiveDetails({
            holeDia: 25.00,
            holeDep: 25.00,
            benchHt: 25.00,
            burden: 25.00,
            spacing: 5.00,
            noOfRow: 2.00,
            noOfHolePRow: 0,
            gravity: 0,
            totHoles: 0,
            irId: '',
            supplierId: ''
        });
    };

    const handleSaveExplosiveDetails = () => {
        // Validate form
        if (!explosiveDetails.supplierId) {
            alert('Please select a supplier');
            return;
        }

        // Save explosive details
        console.log('Saving explosive details:', {
            blastDetails,
            explosiveDetails
        });

        alert('Explosive details saved successfully!');
    };

    return (
        <div className="entry-explosive">
            {/* Header */}
            <div className="entry-explosive-header">
                <div className="entry-explosive-header-content">
                    <div className="entry-explosive-title-section">
                        <Zap className="entry-explosive-header-icon" />
                        <div>
                            <h1 className="entry-explosive-title">Explosive Details Entry</h1>
                            <p className="entry-explosive-subtitle">Enter explosive details for blast operations</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="entry-explosive-main">
                <div className="entry-explosive-content">
                    <div className="entry-explosive-tab-content">

                        {/* Pit/Blast Selection */}
                        <div className="entry-explosive-form-section">
                            <div className="entry-explosive-form-title">
                                <Mountain className="entry-explosive-icon" />
                                Select Blast / Bench Pit
                            </div>

                            <div className="entry-explosive-form-grid">
                                <div className="entry-explosive-form-group">
                                    <label className="entry-explosive-label">Select Type</label>
                                    <select
                                        className="entry-explosive-select"
                                        value={pitType}
                                        onChange={(e) => setPitType(e.target.value)}
                                    >
                                        <option value="blast">Blast</option>
                                        <option value="bench">Bench Pit</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Blast Details Section */}
                        <div className="entry-explosive-form-section">
                            <div className="entry-explosive-form-title">
                                Details
                            </div>

                            <div className="entry-explosive-form-grid">
                                <div className="entry-explosive-form-group">
                                    <label className="entry-explosive-label">Bench No</label>
                                    <input
                                        type="text"
                                        className="entry-explosive-input"
                                        value={blastDetails.benchNo}
                                        onChange={(e) => setBlastDetails(prev => ({ ...prev, benchNo: e.target.value }))}
                                    />
                                </div>

                                <div className="entry-explosive-form-group">
                                    <label className="entry-explosive-label">Site Dir</label>
                                    <input
                                        type="text"
                                        className="entry-explosive-input"
                                        value={blastDetails.siteDir}
                                        onChange={(e) => setBlastDetails(prev => ({ ...prev, siteDir: e.target.value }))}
                                    />
                                </div>

                                <div className="entry-explosive-form-group entry-explosive-form-group-full">
                                    <div className="entry-explosive-flex entry-explosive-items-center entry-explosive-gap-3">
                                        <button
                                            className="entry-explosive-btn entry-explosive-btn-primary"
                                            onClick={handleShowDetails}
                                            disabled={!selectedBlastId}
                                        >
                                            <Eye className="entry-explosive-icon" />
                                            Show Details
                                        </button>
                                        <span className="entry-explosive-text-sm entry-explosive-text-gray-600">
                                            Select Blast ID to view details
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Blast ID Selection */}
                        <div className="entry-explosive-form-section">
                            <div className="entry-explosive-form-title">
                                Select Blast Id to Reverse
                            </div>

                            <div className="entry-explosive-form-grid">
                                <div className="entry-explosive-form-group">
                                    <label className="entry-explosive-label">Blast ID</label>
                                    <select
                                        className="entry-explosive-select"
                                        value={selectedBlastId}
                                        onChange={(e) => setSelectedBlastId(e.target.value)}
                                    >
                                        <option value="">Select Blast ID</option>
                                        {blastIds.map(id => (
                                            <option key={id} value={id}>{id}</option>
                                        ))}
                                    </select>
                                </div>

                                {showDetails && (
                                    <>
                                        <div className="entry-explosive-form-group">
                                            <label className="entry-explosive-label">Blast No</label>
                                            <input
                                                type="text"
                                                className="entry-explosive-input"
                                                value={blastDetails.blastNo}
                                                onChange={(e) => setBlastDetails(prev => ({ ...prev, blastNo: e.target.value }))}
                                            />
                                        </div>

                                        <div className="entry-explosive-form-group">
                                            <label className="entry-explosive-label">Blast Date</label>
                                            <input
                                                type="text"
                                                className="entry-explosive-input"
                                                value={blastDetails.blastDate}
                                                onChange={(e) => setBlastDetails(prev => ({ ...prev, blastDate: e.target.value }))}
                                            />
                                        </div>

                                        <div className="entry-explosive-form-group">
                                            <label className="entry-explosive-label">Year</label>
                                            <select
                                                className="entry-explosive-select"
                                                value={blastDetails.year}
                                                onChange={(e) => setBlastDetails(prev => ({ ...prev, year: e.target.value }))}
                                            >
                                                <option value="2023/2024">2023/2024</option>
                                                <option value="2024/2025">2024/2025</option>
                                                <option value="2025/2026">2025/2026</option>
                                            </select>
                                        </div>

                                        <div className="entry-explosive-form-group entry-explosive-form-group-full">
                                            <button
                                                className="entry-explosive-btn entry-explosive-btn-warning"
                                                onClick={handleReverseForReEntry}
                                            >
                                                <RefreshCw className="entry-explosive-icon" />
                                                Reverse for ReEntry
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Explosive Details Form */}
                        <div className="entry-explosive-form-section">
                            <div className="entry-explosive-form-title">
                                Explosive Details
                            </div>

                            <div className="entry-explosive-form-grid">
                                <div className="entry-explosive-form-group">
                                    <label className="entry-explosive-label">Hole Dia</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="entry-explosive-input"
                                        value={explosiveDetails.holeDia}
                                        onChange={(e) => setExplosiveDetails(prev => ({ ...prev, holeDia: parseFloat(e.target.value) || 0 }))}
                                    />
                                </div>

                                <div className="entry-explosive-form-group">
                                    <label className="entry-explosive-label">Hole Dep</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="entry-explosive-input"
                                        value={explosiveDetails.holeDep}
                                        onChange={(e) => setExplosiveDetails(prev => ({ ...prev, holeDep: parseFloat(e.target.value) || 0 }))}
                                    />
                                </div>

                                <div className="entry-explosive-form-group">
                                    <label className="entry-explosive-label">Bench Ht</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="entry-explosive-input"
                                        value={explosiveDetails.benchHt}
                                        onChange={(e) => setExplosiveDetails(prev => ({ ...prev, benchHt: parseFloat(e.target.value) || 0 }))}
                                    />
                                </div>

                                <div className="entry-explosive-form-group">
                                    <label className="entry-explosive-label">Burden</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="entry-explosive-input"
                                        value={explosiveDetails.burden}
                                        onChange={(e) => setExplosiveDetails(prev => ({ ...prev, burden: parseFloat(e.target.value) || 0 }))}
                                    />
                                </div>

                                <div className="entry-explosive-form-group">
                                    <label className="entry-explosive-label">Spacing</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="entry-explosive-input"
                                        value={explosiveDetails.spacing}
                                        onChange={(e) => setExplosiveDetails(prev => ({ ...prev, spacing: parseFloat(e.target.value) || 0 }))}
                                    />
                                </div>

                                <div className="entry-explosive-form-group">
                                    <label className="entry-explosive-label">No Of Row</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="entry-explosive-input"
                                        value={explosiveDetails.noOfRow}
                                        onChange={(e) => setExplosiveDetails(prev => ({ ...prev, noOfRow: parseFloat(e.target.value) || 0 }))}
                                    />
                                </div>

                                <div className="entry-explosive-form-group">
                                    <label className="entry-explosive-label">No Of Hole P Row</label>
                                    <input
                                        type="number"
                                        className="entry-explosive-input"
                                        value={explosiveDetails.noOfHolePRow}
                                        onChange={(e) => setExplosiveDetails(prev => ({ ...prev, noOfHolePRow: parseInt(e.target.value) || 0 }))}
                                    />
                                </div>

                                <div className="entry-explosive-form-group">
                                    <label className="entry-explosive-label">Gravity</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="entry-explosive-input"
                                        value={explosiveDetails.gravity}
                                        onChange={(e) => setExplosiveDetails(prev => ({ ...prev, gravity: parseFloat(e.target.value) || 0 }))}
                                    />
                                </div>

                                <div className="entry-explosive-form-group">
                                    <label className="entry-explosive-label">Tot Holes</label>
                                    <input
                                        type="number"
                                        className="entry-explosive-input"
                                        value={explosiveDetails.totHoles}
                                        onChange={(e) => setExplosiveDetails(prev => ({ ...prev, totHoles: parseInt(e.target.value) || 0 }))}
                                    />
                                </div>

                                <div className="entry-explosive-form-group">
                                    <label className="entry-explosive-label">IR Id</label>
                                    <input
                                        type="text"
                                        className="entry-explosive-input"
                                        value={explosiveDetails.irId}
                                        onChange={(e) => setExplosiveDetails(prev => ({ ...prev, irId: e.target.value }))}
                                        placeholder="Enter IR ID"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Supplier Selection */}
                        <div className="entry-explosive-form-section">
                            <div className="entry-explosive-form-title">
                                Supplier Selection
                            </div>

                            <div className="entry-explosive-form-grid">
                                <div className="entry-explosive-form-group entry-explosive-form-group-full">
                                    <label className="entry-explosive-label">Select Supplier</label>
                                    <select
                                        className="entry-explosive-select"
                                        value={explosiveDetails.supplierId}
                                        onChange={(e) => setExplosiveDetails(prev => ({ ...prev, supplierId: e.target.value }))}
                                    >
                                        <option value="">Select Supplier</option>
                                        {suppliers.filter(s => s.status === 'active').map(supplier => (
                                            <option key={supplier.id} value={supplier.id}>
                                                {supplier.name} - {supplier.contactPerson}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="entry-explosive-form-section">
                            <div className="entry-explosive-flex entry-explosive-justify-end">
                                <button
                                    className="entry-explosive-btn entry-explosive-btn-primary entry-explosive-btn-lg"
                                    onClick={handleSaveExplosiveDetails}
                                >
                                    <Save className="entry-explosive-icon" />
                                    Save Explosive Details
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
