import React, { useState, useEffect } from 'react';
import './DrillingEntry.css';

// Icon components
const Drill = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
);

const Target = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const Mountain = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857M18 10a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const Calendar = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v12a2 2 0 002 2z" />
    </svg>
);

const TrendingUp = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
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

const Trash2 = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 7-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const Search = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const Fuel = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
);

const Clock = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const Settings = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const BarChart3 = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13l4-4L11 13l4-4 4 4M3 21h18" />
    </svg>
);

const Activity = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

const Truck = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

// Types
interface DrillingEntry {
    id: string;
    drillingId: string;
    blastNo: string;
    pitNo: string;
    benchNo: string;
    siteDirection: 'NORTH' | 'SOUTH' | 'EAST' | 'WEST' | 'NORTHEAST' | 'NORTHWEST' | 'SOUTHEAST' | 'SOUTHWEST';
    blastingDate: string;
    drillingDate: string;
    machineName: string;
    machineType: string;
    numberOfHoles: number;
    numberOfBits: number;
    totalDrillingMeters: number;
    dieselUsed: number; // in liters
    runningHours: number;
    continuousDrillRate: number; // in meters per hour
    depthPerHole: number; // in meters
    efficiency: number; // percentage
    status: 'planned' | 'in-progress' | 'completed' | 'suspended';
    remarks: string;
    createdDate: string;
    modifiedDate: string;
    createdBy: string;
}

interface BlastReference {
    id: string;
    blastNo: string;
    pitNo: string;
    benchNo: string;
    siteDirection: string;
    blastingDate: string;
    status: string;
}

interface Machine {
    id: string;
    name: string;
    type: 'drill-rig' | 'rotary-drill' | 'crawler-drill';
    model: string;
    registrationNo: string;
    status: 'active' | 'maintenance' | 'inactive';
}

export default function DrillingEntry() {
    const [activeTab, setActiveTab] = useState('overview');
    const [showDrillingModal, setShowDrillingModal] = useState(false);
    const [editingDrilling, setEditingDrilling] = useState<DrillingEntry | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterMachine, setFilterMachine] = useState('all');
    const [filterBlast, setFilterBlast] = useState('all');

    // Sample machines data
    const [machines] = useState<Machine[]>([
        { id: 'machine-1', name: 'DUMPER(RJ05GA7754)', type: 'drill-rig', model: 'CAT 349D', registrationNo: 'RJ05GA7754', status: 'active' },
        { id: 'machine-2', name: 'DRILL-001', type: 'rotary-drill', model: 'Atlas Copco ROC L8', registrationNo: 'RJ06GA8855', status: 'active' },
        { id: 'machine-3', name: 'CRAWLER-002', type: 'crawler-drill', model: 'Komatsu PC400', registrationNo: 'RJ07GA9966', status: 'maintenance' }
    ]);

    // Sample blast references data
    const [blastReferences] = useState<BlastReference[]>([
        { id: 'blast-1', blastNo: 'TEST-5', pitNo: 'PIT-001', benchNo: '1', siteDirection: 'EAST', blastingDate: '2023-09-12', status: 'planned' },
        { id: 'blast-2', blastNo: 'TEST-4', pitNo: 'PIT-001', benchNo: '1', siteDirection: 'EAST', blastingDate: '2022-05-16', status: 'executed' },
        { id: 'blast-3', blastNo: 'TEST-3', pitNo: 'PIT-002', benchNo: '1', siteDirection: 'NORTH', blastingDate: '2022-05-16', status: 'completed' },
        { id: 'blast-4', blastNo: 'TEST-2', pitNo: 'PIT-002', benchNo: '1', siteDirection: 'WEST', blastingDate: '2022-05-16', status: 'completed' }
    ]);

    // Sample drilling entries data
    const [drillingEntries, setDrillingEntries] = useState<DrillingEntry[]>([
        {
            id: 'drill-1',
            drillingId: '9',
            blastNo: 'TEST-5',
            pitNo: 'PIT-001',
            benchNo: '1',
            siteDirection: 'WEST',
            blastingDate: '2022-05-09',
            drillingDate: '2000-01-01',
            machineName: 'DUMPER(RJ05GA7754)',
            machineType: 'drill-rig',
            numberOfHoles: 0,
            numberOfBits: 0,
            totalDrillingMeters: 0.00,
            dieselUsed: 0.00,
            runningHours: 0.00,
            continuousDrillRate: 0.00,
            depthPerHole: 0.00,
            efficiency: 0,
            status: 'planned',
            remarks: '',
            createdDate: '2022-05-08',
            modifiedDate: '2022-05-09',
            createdBy: 'Admin'
        },
        {
            id: 'drill-2',
            drillingId: '8',
            blastNo: 'TEST-4',
            pitNo: 'PIT-001',
            benchNo: '1',
            siteDirection: 'EAST',
            blastingDate: '2022-05-16',
            drillingDate: '2000-01-01',
            machineName: 'DUMPER(RJ05GA7754)',
            machineType: 'drill-rig',
            numberOfHoles: 0,
            numberOfBits: 0,
            totalDrillingMeters: 0.00,
            dieselUsed: 0.00,
            runningHours: 0.00,
            continuousDrillRate: 0.00,
            depthPerHole: 0.00,
            efficiency: 0,
            status: 'completed',
            remarks: 'TET',
            createdDate: '2022-05-15',
            modifiedDate: '2022-05-16',
            createdBy: 'Admin'
        },
        {
            id: 'drill-3',
            drillingId: '7',
            blastNo: 'TEST-3',
            pitNo: 'PIT-002',
            benchNo: '1',
            siteDirection: 'NORTH',
            blastingDate: '2022-05-16',
            drillingDate: '2000-01-01',
            machineName: 'DUMPER(RJ05GA7754)',
            machineType: 'drill-rig',
            numberOfHoles: 0,
            numberOfBits: 0,
            totalDrillingMeters: 0.00,
            dieselUsed: 0.00,
            runningHours: 0.00,
            continuousDrillRate: 0.00,
            depthPerHole: 0.00,
            efficiency: 0,
            status: 'completed',
            remarks: 'ERTY',
            createdDate: '2022-05-15',
            modifiedDate: '2022-05-16',
            createdBy: 'Admin'
        },
        {
            id: 'drill-4',
            drillingId: '6',
            blastNo: 'TEST-2',
            pitNo: 'PIT-002',
            benchNo: '1',
            siteDirection: 'WEST',
            blastingDate: '2022-05-16',
            drillingDate: '2022-05-18',
            machineName: 'DUMPER(RJ05GA7754)',
            machineType: 'drill-rig',
            numberOfHoles: 2,
            numberOfBits: 0,
            totalDrillingMeters: 0.00,
            dieselUsed: 0.00,
            runningHours: 0.00,
            continuousDrillRate: 0.00,
            depthPerHole: 0.00,
            efficiency: 0,
            status: 'in-progress',
            remarks: 'FEWF',
            createdDate: '2022-05-16',
            modifiedDate: '2022-05-18',
            createdBy: 'Admin'
        },
        {
            id: 'drill-5',
            drillingId: '5',
            blastNo: 'TEST-1',
            pitNo: 'PIT-001',
            benchNo: '1',
            siteDirection: 'WEST',
            blastingDate: '2022-05-09',
            drillingDate: '2000-01-01',
            machineName: 'DUMPER(RJ05GA7754)',
            machineType: 'drill-rig',
            numberOfHoles: 0,
            numberOfBits: 0,
            totalDrillingMeters: 0.00,
            dieselUsed: 0.00,
            runningHours: 0.00,
            continuousDrillRate: 0.00,
            depthPerHole: 0.00,
            efficiency: 0,
            status: 'planned',
            remarks: 'EFGE',
            createdDate: '2022-05-08',
            modifiedDate: '2022-05-09',
            createdBy: 'Admin'
        }
    ]);

    const [drillingForm, setDrillingForm] = useState({
        blastNo: '',
        pitNo: '',
        benchNo: '',
        drillingDate: '',
        numberOfHoles: 0,
        numberOfBits: 0,
        machineName: '',
        totalDrillingMeters: 0,
        dieselUsed: 0,
        runningHours: 0,
        continuousDrillRate: 0,
        depthPerHole: 0,
        remarks: ''
    });

    // Filter functions
    const filteredDrillingEntries = drillingEntries.filter(entry => {
        const matchesSearch = searchTerm === '' ||
            entry.drillingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.blastNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.pitNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.machineName.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === 'all' || entry.status === filterStatus;
        const matchesMachine = filterMachine === 'all' || entry.machineName === filterMachine;
        const matchesBlast = filterBlast === 'all' || entry.blastNo === filterBlast;

        return matchesSearch && matchesStatus && matchesMachine && matchesBlast;
    });

    // Calculate efficiency automatically
    useEffect(() => {
        if (drillingForm.runningHours > 0 && drillingForm.totalDrillingMeters > 0) {
            const efficiency = (drillingForm.totalDrillingMeters / drillingForm.runningHours) * 100 / 100; // Sample calculation
            setDrillingForm(prev => ({ ...prev, continuousDrillRate: efficiency }));
        }
    }, [drillingForm.runningHours, drillingForm.totalDrillingMeters]);

    // Calculate depth per hole automatically
    useEffect(() => {
        if (drillingForm.numberOfHoles > 0 && drillingForm.totalDrillingMeters > 0) {
            const depthPerHole = drillingForm.totalDrillingMeters / drillingForm.numberOfHoles;
            setDrillingForm(prev => ({ ...prev, depthPerHole: depthPerHole }));
        }
    }, [drillingForm.numberOfHoles, drillingForm.totalDrillingMeters]);

    // Handle drilling creation/modification
    const handleSaveDrilling = () => {
        if (drillingForm.blastNo && drillingForm.machineName && drillingForm.drillingDate) {
            const selectedBlast = blastReferences.find(b => b.blastNo === drillingForm.blastNo);

            const drillingData: DrillingEntry = {
                id: editingDrilling?.id || `drill-${Date.now()}`,
                drillingId: editingDrilling?.drillingId || `${drillingEntries.length + 1}`,
                blastNo: drillingForm.blastNo,
                pitNo: selectedBlast?.pitNo || drillingForm.pitNo,
                benchNo: selectedBlast?.benchNo || drillingForm.benchNo,
                siteDirection: selectedBlast?.siteDirection as any || 'EAST',
                blastingDate: selectedBlast?.blastingDate || '',
                drillingDate: drillingForm.drillingDate,
                machineName: drillingForm.machineName,
                machineType: 'drill-rig',
                numberOfHoles: drillingForm.numberOfHoles,
                numberOfBits: drillingForm.numberOfBits,
                totalDrillingMeters: drillingForm.totalDrillingMeters,
                dieselUsed: drillingForm.dieselUsed,
                runningHours: drillingForm.runningHours,
                continuousDrillRate: drillingForm.continuousDrillRate,
                depthPerHole: drillingForm.depthPerHole,
                efficiency: drillingForm.runningHours > 0 ? (drillingForm.totalDrillingMeters / drillingForm.runningHours * 10) : 0,
                status: 'planned',
                remarks: drillingForm.remarks,
                createdDate: editingDrilling?.createdDate || new Date().toISOString().split('T')[0],
                modifiedDate: new Date().toISOString().split('T')[0],
                createdBy: 'Current User'
            };

            if (editingDrilling) {
                setDrillingEntries(entries => entries.map(entry =>
                    entry.id === editingDrilling.id ? drillingData : entry
                ));
            } else {
                setDrillingEntries([...drillingEntries, drillingData]);
            }

            // Reset form
            setDrillingForm({
                blastNo: '',
                pitNo: '',
                benchNo: '',
                drillingDate: '',
                numberOfHoles: 0,
                numberOfBits: 0,
                machineName: '',
                totalDrillingMeters: 0,
                dieselUsed: 0,
                runningHours: 0,
                continuousDrillRate: 0,
                depthPerHole: 0,
                remarks: ''
            });
            setEditingDrilling(null);
            setShowDrillingModal(false);
        }
    };

    // Handle edit drilling
    const handleEditDrilling = (drilling: DrillingEntry) => {
        setEditingDrilling(drilling);
        setDrillingForm({
            blastNo: drilling.blastNo,
            pitNo: drilling.pitNo,
            benchNo: drilling.benchNo,
            drillingDate: drilling.drillingDate,
            numberOfHoles: drilling.numberOfHoles,
            numberOfBits: drilling.numberOfBits,
            machineName: drilling.machineName,
            totalDrillingMeters: drilling.totalDrillingMeters,
            dieselUsed: drilling.dieselUsed,
            runningHours: drilling.runningHours,
            continuousDrillRate: drilling.continuousDrillRate,
            depthPerHole: drilling.depthPerHole,
            remarks: drilling.remarks
        });
        setShowDrillingModal(true);
    };

    // Handle delete drilling
    const handleDeleteDrilling = (id: string) => {
        setDrillingEntries(entries => entries.filter(entry => entry.id !== id));
    };

    // Calculate statistics
    const getTotalDrillings = () => drillingEntries.length;
    const getCompletedDrillings = () => drillingEntries.filter(d => d.status === 'completed').length;
    const getTotalDrillingMeters = () => drillingEntries.reduce((total, drilling) => total + drilling.totalDrillingMeters, 0);
    const getTotalDieselUsed = () => drillingEntries.reduce((total, drilling) => total + drilling.dieselUsed, 0);
    const getAverageRunningHours = () => {
        const completedDrillings = drillingEntries.filter(d => d.status === 'completed');
        const totalHours = completedDrillings.reduce((total, drilling) => total + drilling.runningHours, 0);
        return completedDrillings.length > 0 ? totalHours / completedDrillings.length : 0;
    };

    // Handle blast selection
    const handleBlastSelection = (blastNo: string) => {
        const selectedBlast = blastReferences.find(b => b.blastNo === blastNo);
        if (selectedBlast) {
            setDrillingForm(prev => ({
                ...prev,
                blastNo: selectedBlast.blastNo,
                pitNo: selectedBlast.pitNo,
                benchNo: selectedBlast.benchNo
            }));
        }
    };

    return (
        <div className="drilling-entry">
            {/* Header */}
            <div className="drilling-entry-header">
                <div className="drilling-entry-header-content">
                    <div className="drilling-entry-title-section">
                        <Drill className="drilling-entry-header-icon" />
                        <div>
                            <h1 className="drilling-entry-title">Drilling Entry Management</h1>
                            <p className="drilling-entry-subtitle">
                                Track and manage drilling operations across mining sites
                            </p>
                        </div>
                    </div>
                    <div className="drilling-entry-header-actions">
                        <button
                            onClick={() => {
                                setEditingDrilling(null);
                                setDrillingForm({
                                    blastNo: '',
                                    pitNo: '',
                                    benchNo: '',
                                    drillingDate: '',
                                    numberOfHoles: 0,
                                    numberOfBits: 0,
                                    machineName: '',
                                    totalDrillingMeters: 0,
                                    dieselUsed: 0,
                                    runningHours: 0,
                                    continuousDrillRate: 0,
                                    depthPerHole: 0,
                                    remarks: ''
                                });
                                setShowDrillingModal(true);
                            }}
                            className="drilling-entry-btn drilling-entry-btn-primary"
                        >
                            <Plus className="drilling-entry-icon" />
                            Enter Drilling Details
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="drilling-entry-main">
                {/* Tab Navigation */}
                <div className="drilling-entry-tabs">
                    <div className="drilling-entry-tabs-container">
                        <nav className="drilling-entry-tabs-nav">
                            <div className="drilling-entry-tabs-list">
                                <button
                                    onClick={() => setActiveTab('overview')}
                                    className={`drilling-entry-tab ${activeTab === 'overview' ? 'active' : ''}`}
                                >
                                    <BarChart3 className="drilling-entry-tab-icon" />
                                    Overview
                                </button>
                                <button
                                    onClick={() => setActiveTab('drilling')}
                                    className={`drilling-entry-tab ${activeTab === 'drilling' ? 'active' : ''}`}
                                >
                                    <Drill className="drilling-entry-tab-icon" />
                                    Drilling Records
                                </button>
                                <button
                                    onClick={() => setActiveTab('machines')}
                                    className={`drilling-entry-tab ${activeTab === 'machines' ? 'active' : ''}`}
                                >
                                    <Settings className="drilling-entry-tab-icon" />
                                    Machines
                                </button>
                                <button
                                    onClick={() => setActiveTab('reports')}
                                    className={`drilling-entry-tab ${activeTab === 'reports' ? 'active' : ''}`}
                                >
                                    <Activity className="drilling-entry-tab-icon" />
                                    Reports
                                </button>
                            </div>
                        </nav>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="drilling-entry-content">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="drilling-entry-tab-content">
                            <div className="drilling-entry-section-header">
                                <h2 className="drilling-entry-section-title">Drilling Overview</h2>
                                <p className="drilling-entry-section-subtitle">
                                    Current drilling statistics and operational summary
                                </p>
                            </div>

                            {/* Statistics Cards */}
                            <div className="drilling-entry-grid drilling-entry-grid-cols-1 drilling-entry-md-grid-cols-4 drilling-entry-gap-6 drilling-entry-mb-6">
                                <div className="drilling-entry-card">
                                    <div className="drilling-entry-card-content">
                                        <div className="drilling-entry-flex drilling-entry-items-center drilling-entry-gap-3">
                                            <div className="drilling-entry-stat-icon drilling-entry-stat-icon-blue">
                                                <Drill className="drilling-entry-icon" />
                                            </div>
                                            <div>
                                                <p className="drilling-entry-text-sm drilling-entry-text-gray-600">Total Operations</p>
                                                <p className="drilling-entry-text-2xl drilling-entry-font-bold">{getTotalDrillings()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="drilling-entry-card">
                                    <div className="drilling-entry-card-content">
                                        <div className="drilling-entry-flex drilling-entry-items-center drilling-entry-gap-3">
                                            <div className="drilling-entry-stat-icon drilling-entry-stat-icon-green">
                                                <TrendingUp className="drilling-entry-icon" />
                                            </div>
                                            <div>
                                                <p className="drilling-entry-text-sm drilling-entry-text-gray-600">Completed</p>
                                                <p className="drilling-entry-text-2xl drilling-entry-font-bold">{getCompletedDrillings()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="drilling-entry-card">
                                    <div className="drilling-entry-card-content">
                                        <div className="drilling-entry-flex drilling-entry-items-center drilling-entry-gap-3">
                                            <div className="drilling-entry-stat-icon drilling-entry-stat-icon-yellow">
                                                <Target className="drilling-entry-icon" />
                                            </div>
                                            <div>
                                                <p className="drilling-entry-text-sm drilling-entry-text-gray-600">Total Meters</p>
                                                <p className="drilling-entry-text-2xl drilling-entry-font-bold">{getTotalDrillingMeters().toFixed(1)}m</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="drilling-entry-card">
                                    <div className="drilling-entry-card-content">
                                        <div className="drilling-entry-flex drilling-entry-items-center drilling-entry-gap-3">
                                            <div className="drilling-entry-stat-icon drilling-entry-stat-icon-purple">
                                                <Fuel className="drilling-entry-icon" />
                                            </div>
                                            <div>
                                                <p className="drilling-entry-text-sm drilling-entry-text-gray-600">Diesel Used</p>
                                                <p className="drilling-entry-text-2xl drilling-entry-font-bold">{getTotalDieselUsed().toFixed(1)}L</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Drilling Operations */}
                            <div className="drilling-entry-card">
                                <div className="drilling-entry-card-header">
                                    <h3 className="drilling-entry-card-title">Recent Drilling Operations</h3>
                                </div>
                                <div className="drilling-entry-card-content">
                                    <div className="drilling-entry-table-container">
                                        <table className="drilling-entry-table">
                                            <thead>
                                                <tr>
                                                    <th>Drilling ID</th>
                                                    <th>Blast No</th>
                                                    <th>Machine</th>
                                                    <th>Date</th>
                                                    <th>Holes</th>
                                                    <th>Meters</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {drillingEntries.slice(0, 5).map((drilling) => (
                                                    <tr key={drilling.id}>
                                                        <td className="drilling-entry-font-medium">{drilling.drillingId}</td>
                                                        <td>{drilling.blastNo}</td>
                                                        <td>{drilling.machineName}</td>
                                                        <td>{drilling.drillingDate}</td>
                                                        <td>{drilling.numberOfHoles}</td>
                                                        <td>{drilling.totalDrillingMeters.toFixed(2)}m</td>
                                                        <td>
                                                            <span className={`drilling-entry-badge ${drilling.status === 'completed' ? 'drilling-entry-badge-success' :
                                                                drilling.status === 'in-progress' ? 'drilling-entry-badge-warning' :
                                                                    drilling.status === 'suspended' ? 'drilling-entry-badge-error' :
                                                                        'drilling-entry-badge-secondary'
                                                                }`}>
                                                                {drilling.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Drilling Records Tab */}
                    {activeTab === 'drilling' && (
                        <div className="drilling-entry-tab-content">
                            <div className="drilling-entry-section-header">
                                <h2 className="drilling-entry-section-title">Drilling Records</h2>
                                <p className="drilling-entry-section-subtitle">
                                    View and manage all drilling operations
                                </p>
                            </div>

                            {/* Filters */}
                            <div className="drilling-entry-filters">
                                <div className="drilling-entry-search-container">
                                    <Search className="drilling-entry-search-icon" />
                                    <input
                                        type="text"
                                        placeholder="Search by drilling ID, blast no, machine..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="drilling-entry-search-input"
                                    />
                                </div>
                                <select
                                    value={filterBlast}
                                    onChange={(e) => setFilterBlast(e.target.value)}
                                    className="drilling-entry-select"
                                >
                                    <option value="all">All Blasts</option>
                                    {blastReferences.map(blast => (
                                        <option key={blast.id} value={blast.blastNo}>{blast.blastNo}</option>
                                    ))}
                                </select>
                                <select
                                    value={filterMachine}
                                    onChange={(e) => setFilterMachine(e.target.value)}
                                    className="drilling-entry-select"
                                >
                                    <option value="all">All Machines</option>
                                    {machines.map(machine => (
                                        <option key={machine.id} value={machine.name}>{machine.name}</option>
                                    ))}
                                </select>
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="drilling-entry-select"
                                >
                                    <option value="all">All Status</option>
                                    <option value="planned">Planned</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                    <option value="suspended">Suspended</option>
                                </select>
                            </div>

                            {/* Drilling Table */}
                            <div className="drilling-entry-table-container">
                                <table className="drilling-entry-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Blast No</th>
                                            <th>Pit No</th>
                                            <th>Bench No</th>
                                            <th>Site Dir</th>
                                            <th>Blast Date</th>
                                            <th>Drill Date</th>
                                            <th>Machine Name</th>
                                            <th>Run Hrs</th>
                                            <th>No of Holes</th>
                                            <th>Tot Drill Met</th>
                                            <th>No of Bits</th>
                                            <th>Diesel Used</th>
                                            <th>Cont Drill Rt</th>
                                            <th>Remarks</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredDrillingEntries.map((drilling) => (
                                            <tr key={drilling.id}>
                                                <td className="drilling-entry-font-medium">{drilling.drillingId}</td>
                                                <td>{drilling.blastNo}</td>
                                                <td>{drilling.pitNo}</td>
                                                <td>{drilling.benchNo}</td>
                                                <td>{drilling.siteDirection}</td>
                                                <td>{drilling.blastingDate}</td>
                                                <td>{drilling.drillingDate}</td>
                                                <td>{drilling.machineName}</td>
                                                <td>{drilling.runningHours.toFixed(2)}</td>
                                                <td>{drilling.numberOfHoles}</td>
                                                <td>{drilling.totalDrillingMeters.toFixed(2)}</td>
                                                <td>{drilling.numberOfBits}</td>
                                                <td>{drilling.dieselUsed.toFixed(2)}</td>
                                                <td>{drilling.continuousDrillRate.toFixed(2)}</td>
                                                <td>{drilling.remarks}</td>
                                                <td>
                                                    <div className="drilling-entry-flex drilling-entry-gap-2">
                                                        <button
                                                            onClick={() => handleEditDrilling(drilling)}
                                                            className="drilling-entry-btn-icon"
                                                            title="Edit"
                                                        >
                                                            <Edit3 className="drilling-entry-icon-sm" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteDrilling(drilling.id)}
                                                            className="drilling-entry-btn-icon drilling-entry-btn-icon-danger"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="drilling-entry-icon-sm" />
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

                    {/* Machines Tab */}
                    {activeTab === 'machines' && (
                        <div className="drilling-entry-tab-content">
                            <div className="drilling-entry-section-header">
                                <h2 className="drilling-entry-section-title">Drilling Machines</h2>
                                <p className="drilling-entry-section-subtitle">
                                    Manage drilling equipment and machinery
                                </p>
                            </div>

                            <div className="drilling-entry-grid drilling-entry-grid-cols-1 drilling-entry-md-grid-cols-3 drilling-entry-gap-6">
                                {machines.map((machine) => (
                                    <div key={machine.id} className="drilling-entry-card">
                                        <div className="drilling-entry-card-content">
                                            <div className="drilling-entry-flex drilling-entry-items-center drilling-entry-gap-3 drilling-entry-mb-4">
                                                <div className="drilling-entry-stat-icon drilling-entry-stat-icon-blue">
                                                    <Settings className="drilling-entry-icon" />
                                                </div>
                                                <div>
                                                    <h3 className="drilling-entry-font-semibold">{machine.name}</h3>
                                                    <p className="drilling-entry-text-sm drilling-entry-text-gray-600">{machine.model}</p>
                                                </div>
                                            </div>
                                            <div className="drilling-entry-space-y-2">
                                                <div className="drilling-entry-flex drilling-entry-justify-between">
                                                    <span className="drilling-entry-text-sm">Registration:</span>
                                                    <span className="drilling-entry-text-sm drilling-entry-font-medium">{machine.registrationNo}</span>
                                                </div>
                                                <div className="drilling-entry-flex drilling-entry-justify-between">
                                                    <span className="drilling-entry-text-sm">Type:</span>
                                                    <span className="drilling-entry-text-sm drilling-entry-font-medium drilling-entry-capitalize">{machine.type.replace('-', ' ')}</span>
                                                </div>
                                                <div className="drilling-entry-flex drilling-entry-justify-between">
                                                    <span className="drilling-entry-text-sm">Status:</span>
                                                    <span className={`drilling-entry-badge ${machine.status === 'active' ? 'drilling-entry-badge-success' :
                                                        machine.status === 'maintenance' ? 'drilling-entry-badge-warning' :
                                                            'drilling-entry-badge-secondary'
                                                        }`}>
                                                        {machine.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Reports Tab */}
                    {activeTab === 'reports' && (
                        <div className="drilling-entry-tab-content">
                            <div className="drilling-entry-section-header">
                                <h2 className="drilling-entry-section-title">Drilling Reports</h2>
                                <p className="drilling-entry-section-subtitle">
                                    Performance analytics and operational reports
                                </p>
                            </div>

                            <div className="drilling-entry-grid drilling-entry-grid-cols-1 drilling-entry-md-grid-cols-2 drilling-entry-gap-6">
                                {/* Efficiency Report */}
                                <div className="drilling-entry-card">
                                    <div className="drilling-entry-card-header">
                                        <h3 className="drilling-entry-card-title">Machine Efficiency</h3>
                                    </div>
                                    <div className="drilling-entry-card-content">
                                        <div className="drilling-entry-space-y-4">
                                            {machines.filter(m => m.status === 'active').map((machine) => {
                                                const machineEntries = drillingEntries.filter(d => d.machineName === machine.name);
                                                const totalHours = machineEntries.reduce((sum, d) => sum + d.runningHours, 0);
                                                const totalMeters = machineEntries.reduce((sum, d) => sum + d.totalDrillingMeters, 0);
                                                const efficiency = totalHours > 0 ? (totalMeters / totalHours) : 0;

                                                return (
                                                    <div key={machine.id} className="drilling-entry-flex drilling-entry-justify-between drilling-entry-items-center">
                                                        <span className="drilling-entry-text-sm">{machine.name}</span>
                                                        <span className="drilling-entry-font-medium">{efficiency.toFixed(2)} m/hr</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Fuel Consumption Report */}
                                <div className="drilling-entry-card">
                                    <div className="drilling-entry-card-header">
                                        <h3 className="drilling-entry-card-title">Fuel Consumption</h3>
                                    </div>
                                    <div className="drilling-entry-card-content">
                                        <div className="drilling-entry-space-y-4">
                                            {machines.filter(m => m.status === 'active').map((machine) => {
                                                const machineEntries = drillingEntries.filter(d => d.machineName === machine.name);
                                                const totalFuel = machineEntries.reduce((sum, d) => sum + d.dieselUsed, 0);

                                                return (
                                                    <div key={machine.id} className="drilling-entry-flex drilling-entry-justify-between drilling-entry-items-center">
                                                        <span className="drilling-entry-text-sm">{machine.name}</span>
                                                        <span className="drilling-entry-font-medium">{totalFuel.toFixed(2)} L</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Drilling Entry Modal */}
            {showDrillingModal && (
                <div className="drilling-entry-modal-overlay" onClick={() => setShowDrillingModal(false)}>
                    <div className="drilling-entry-modal drilling-entry-modal-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="drilling-entry-modal-header">
                            <h2 className="drilling-entry-modal-title">
                                {editingDrilling ? 'Modify Drilling Details' : 'Enter Drilling Details'}
                            </h2>
                            <button
                                onClick={() => setShowDrillingModal(false)}
                                className="drilling-entry-modal-close"
                            >
                                ×
                            </button>
                        </div>

                        <div className="drilling-entry-modal-content">
                            <div className="drilling-entry-form-grid">
                                {/* Blast Selection */}
                                <div>
                                    <label className="drilling-entry-label">Select Blast / Bench Pit</label>
                                    <select
                                        value={drillingForm.blastNo}
                                        onChange={(e) => handleBlastSelection(e.target.value)}
                                        className="drilling-entry-select"
                                        required
                                    >
                                        <option value="">Select Blast</option>
                                        {blastReferences.map(blast => (
                                            <option key={blast.id} value={blast.blastNo}>
                                                {blast.blastNo} - {blast.pitNo}/{blast.benchNo} - {blast.siteDirection}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Details Display */}
                                {drillingForm.blastNo && (
                                    <div>
                                        <label className="drilling-entry-label">Details</label>
                                        <input
                                            type="text"
                                            value={`${drillingForm.pitNo}/${drillingForm.benchNo}`}
                                            className="drilling-entry-input drilling-entry-input-readonly"
                                            readOnly
                                        />
                                    </div>
                                )}

                                {/* Drilling Date */}
                                <div>
                                    <label className="drilling-entry-label">Drilling Date</label>
                                    <input
                                        type="date"
                                        value={drillingForm.drillingDate}
                                        onChange={(e) => setDrillingForm(prev => ({ ...prev, drillingDate: e.target.value }))}
                                        className="drilling-entry-input"
                                        required
                                    />
                                </div>

                                {/* Number of Holes */}
                                <div>
                                    <label className="drilling-entry-label">No. Of Holes</label>
                                    <input
                                        type="number"
                                        value={drillingForm.numberOfHoles}
                                        onChange={(e) => setDrillingForm(prev => ({ ...prev, numberOfHoles: parseInt(e.target.value) || 0 }))}
                                        className="drilling-entry-input"
                                        min="0"
                                    />
                                </div>

                                {/* Number of Bits */}
                                <div>
                                    <label className="drilling-entry-label">No. Of Bits</label>
                                    <input
                                        type="number"
                                        value={drillingForm.numberOfBits}
                                        onChange={(e) => setDrillingForm(prev => ({ ...prev, numberOfBits: parseInt(e.target.value) || 0 }))}
                                        className="drilling-entry-input"
                                        min="0"
                                    />
                                </div>

                                {/* Continuous Drill Rate */}
                                <div>
                                    <label className="drilling-entry-label">Cont Drill Rt@PM</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={drillingForm.continuousDrillRate}
                                        onChange={(e) => setDrillingForm(prev => ({ ...prev, continuousDrillRate: parseFloat(e.target.value) || 0 }))}
                                        className="drilling-entry-input"
                                        min="0"
                                    />
                                </div>

                                {/* Machine Name */}
                                <div>
                                    <label className="drilling-entry-label">Machine Name</label>
                                    <select
                                        value={drillingForm.machineName}
                                        onChange={(e) => setDrillingForm(prev => ({ ...prev, machineName: e.target.value }))}
                                        className="drilling-entry-select"
                                        required
                                    >
                                        <option value="">Select Machine</option>
                                        {machines.filter(m => m.status === 'active').map(machine => (
                                            <option key={machine.id} value={machine.name}>{machine.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Total Drilling Meters */}
                                <div>
                                    <label className="drilling-entry-label">Total Drilling Mtrs</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={drillingForm.totalDrillingMeters}
                                        onChange={(e) => setDrillingForm(prev => ({ ...prev, totalDrillingMeters: parseFloat(e.target.value) || 0 }))}
                                        className="drilling-entry-input"
                                        min="0"
                                    />
                                </div>

                                {/* Diesel Used */}
                                <div>
                                    <label className="drilling-entry-label">Diesel Used (L)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={drillingForm.dieselUsed}
                                        onChange={(e) => setDrillingForm(prev => ({ ...prev, dieselUsed: parseFloat(e.target.value) || 0 }))}
                                        className="drilling-entry-input"
                                        min="0"
                                    />
                                </div>

                                {/* Running Hours */}
                                <div>
                                    <label className="drilling-entry-label">Running Hours</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={drillingForm.runningHours}
                                        onChange={(e) => setDrillingForm(prev => ({ ...prev, runningHours: parseFloat(e.target.value) || 0 }))}
                                        className="drilling-entry-input"
                                        min="0"
                                    />
                                </div>

                                {/* Depth Per Hole (Calculated) */}
                                <div>
                                    <label className="drilling-entry-label">Depth Per Hole (m)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={drillingForm.depthPerHole.toFixed(2)}
                                        className="drilling-entry-input drilling-entry-input-readonly"
                                        readOnly
                                    />
                                </div>

                                {/* Remarks */}
                                <div className="drilling-entry-form-group-full">
                                    <label className="drilling-entry-label">Remarks</label>
                                    <textarea
                                        value={drillingForm.remarks}
                                        onChange={(e) => setDrillingForm(prev => ({ ...prev, remarks: e.target.value }))}
                                        className="drilling-entry-textarea"
                                        rows={3}
                                        placeholder="Enter any additional remarks..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="drilling-entry-modal-footer">
                            <button
                                onClick={() => setShowDrillingModal(false)}
                                className="drilling-entry-btn drilling-entry-btn-secondary"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveDrilling}
                                className="drilling-entry-btn drilling-entry-btn-primary"
                            >
                                <Save className="drilling-entry-icon" />
                                {editingDrilling ? 'Update' : 'Save'} Drilling Details
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
