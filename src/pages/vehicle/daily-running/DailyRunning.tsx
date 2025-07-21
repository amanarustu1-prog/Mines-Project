import React, { useState } from 'react';
import './DailyRunning.css';

// Icon components
const Truck = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

const Clock = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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

const Search = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const User = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const X = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const Settings = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const Activity = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

const Calendar = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v12a2 2 0 002 2z" />
    </svg>
);

const FileText = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

// Types
interface Equipment {
    id: string;
    identificationNo: string;
    name: string;
    type: string;
    operator: string;
    continuousOperator: string;
    status: 'running' | 'idle' | 'breakdown';
}

interface DailyRunningEntry {
    id: string;
    equipmentId: string;
    date: string;
    meterReadingStart: number;
    meterReadingEnd: number;
    aDimCssReading: number;
    tphReading: number;
    runningHours: number;
    idleHours: number;
    breakdownHours: number;
    operator: string;
    continuousOperator: string;
    remarks: string;
    status: 'running' | 'idle' | 'breakdown';
    tasks: Task[];
}

interface Task {
    id: string;
    name: string;
    description: string;
    completed: boolean;
    assignedTo: string;
}

interface Operator {
    id: string;
    name: string;
    employeeId: string;
    shift: string;
    contact: string;
    specialization: string;
}

export default function DailyRunning() {
    const [activeTab, setActiveTab] = useState('running-entry');
    const [showOperatorModal, setShowOperatorModal] = useState(false);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEquipment, setSelectedEquipment] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    // Sample equipment data
    const [equipments] = useState<Equipment[]>([
        {
            id: 'eq-1',
            identificationNo: 'EQ-001',
            name: 'Excavator CAT 320D',
            type: 'Excavator',
            operator: 'Rajesh Kumar',
            continuousOperator: 'Amit Singh',
            status: 'running'
        },
        {
            id: 'eq-2',
            identificationNo: 'EQ-002',
            name: 'Dump Truck Tata 3118',
            type: 'Dump Truck',
            operator: 'Priya Sharma',
            continuousOperator: 'Manoj Gupta',
            status: 'idle'
        },
        {
            id: 'eq-3',
            identificationNo: 'EQ-003',
            name: 'Loader CAT 950M',
            type: 'Loader',
            operator: 'Deepak Kumar',
            continuousOperator: 'Suresh Patel',
            status: 'breakdown'
        }
    ]);

    // Sample operators data
    const [operators, setOperators] = useState<Operator[]>([
        {
            id: 'op-1',
            name: 'Rajesh Kumar',
            employeeId: 'EMP001',
            shift: 'Day',
            contact: '9876543210',
            specialization: 'Excavator'
        },
        {
            id: 'op-2',
            name: 'Priya Sharma',
            employeeId: 'EMP002',
            shift: 'Night',
            contact: '9876543211',
            specialization: 'Dump Truck'
        },
        {
            id: 'op-3',
            name: 'Deepak Kumar',
            employeeId: 'EMP003',
            shift: 'Day',
            contact: '9876543212',
            specialization: 'Loader'
        }
    ]);

    // Sample tasks data
    const [commonTasks] = useState<Task[]>([
        {
            id: 'task-1',
            name: 'Pre-operation Check',
            description: 'Check all systems before starting operation',
            completed: false,
            assignedTo: ''
        },
        {
            id: 'task-2',
            name: 'Fuel Level Check',
            description: 'Verify fuel level and top up if needed',
            completed: false,
            assignedTo: ''
        },
        {
            id: 'task-3',
            name: 'Oil Level Check',
            description: 'Check engine oil and hydraulic oil levels',
            completed: false,
            assignedTo: ''
        }
    ]);

    // Sample daily running entries
    const [runningEntries, setRunningEntries] = useState<DailyRunningEntry[]>([
        {
            id: 'entry-1',
            equipmentId: 'eq-1',
            date: '2025-07-17',
            meterReadingStart: 1250,
            meterReadingEnd: 1268,
            aDimCssReading: 45.5,
            tphReading: 150,
            runningHours: 8,
            idleHours: 0.5,
            breakdownHours: 0,
            operator: 'Rajesh Kumar',
            continuousOperator: 'Amit Singh',
            remarks: 'Normal operation',
            status: 'running',
            tasks: []
        },
        {
            id: 'entry-2',
            equipmentId: 'eq-2',
            date: '2025-07-17',
            meterReadingStart: 2100,
            meterReadingEnd: 2115,
            aDimCssReading: 32.8,
            tphReading: 120,
            runningHours: 6,
            idleHours: 2,
            breakdownHours: 0,
            operator: 'Priya Sharma',
            continuousOperator: 'Manoj Gupta',
            remarks: 'Routine maintenance performed',
            status: 'idle',
            tasks: []
        }
    ]);

    const [runningForm, setRunningForm] = useState({
        equipmentId: '',
        date: new Date().toISOString().split('T')[0],
        meterReadingStart: 0,
        meterReadingEnd: 0,
        aDimCssReading: 0,
        tphReading: 0,
        runningHours: 0,
        idleHours: 0,
        breakdownHours: 0,
        operator: '',
        continuousOperator: '',
        remarks: '',
        status: 'running' as 'running' | 'idle' | 'breakdown'
    });

    const [newOperator, setNewOperator] = useState({
        name: '',
        employeeId: '',
        shift: 'Day',
        contact: '',
        specialization: ''
    });

    // Helper functions
    const getEquipmentById = (id: string) => equipments.find(eq => eq.id === id);

    const filteredEquipments = equipments.filter(equipment =>
        equipment.identificationNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipment.operator.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredEntries = runningEntries.filter(entry => {
        const equipment = getEquipmentById(entry.equipmentId);
        if (!equipment) return false;

        const matchesSearch = searchTerm === '' ||
            equipment.identificationNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.operator.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesEquipment = selectedEquipment === '' || entry.equipmentId === selectedEquipment;

        return matchesSearch && matchesEquipment;
    });

    // Handle form submission
    const handleSaveEntry = () => {
        if (runningForm.equipmentId && runningForm.date) {
            const entryData: DailyRunningEntry = {
                id: `entry-${Date.now()}`,
                equipmentId: runningForm.equipmentId,
                date: runningForm.date,
                meterReadingStart: runningForm.meterReadingStart,
                meterReadingEnd: runningForm.meterReadingEnd,
                aDimCssReading: runningForm.aDimCssReading,
                tphReading: runningForm.tphReading,
                runningHours: runningForm.runningHours,
                idleHours: runningForm.idleHours,
                breakdownHours: runningForm.breakdownHours,
                operator: runningForm.operator,
                continuousOperator: runningForm.continuousOperator,
                remarks: runningForm.remarks,
                status: runningForm.status,
                tasks: []
            };

            setRunningEntries([...runningEntries, entryData]);
            setRunningForm({
                equipmentId: '',
                date: new Date().toISOString().split('T')[0],
                meterReadingStart: 0,
                meterReadingEnd: 0,
                aDimCssReading: 0,
                tphReading: 0,
                runningHours: 0,
                idleHours: 0,
                breakdownHours: 0,
                operator: '',
                continuousOperator: '',
                remarks: '',
                status: 'running'
            });
        }
    };

    // Handle operator creation
    const handleAddOperator = () => {
        if (newOperator.name && newOperator.employeeId) {
            const operatorData: Operator = {
                id: `op-${Date.now()}`,
                name: newOperator.name,
                employeeId: newOperator.employeeId,
                shift: newOperator.shift,
                contact: newOperator.contact,
                specialization: newOperator.specialization
            };

            setOperators([...operators, operatorData]);
            setNewOperator({
                name: '',
                employeeId: '',
                shift: 'Day',
                contact: '',
                specialization: ''
            });
            setShowOperatorModal(false);
        }
    };

    // Handle set readings to zero
    const handleSetReadingsToZero = () => {
        setRunningForm({
            ...runningForm,
            meterReadingStart: 0,
            meterReadingEnd: 0,
            aDimCssReading: 0,
            tphReading: 0,
            runningHours: 0,
            idleHours: 0,
            breakdownHours: 0
        });
    };

    // Handle remove entries
    const handleRemoveEntries = () => {
        const filteredEntries = runningEntries.filter(entry =>
            new Date(entry.date) < new Date(selectedDate)
        );
        setRunningEntries(filteredEntries);
    };

    // Handle export to Excel
    const handleExportToExcel = () => {
        console.log('Exporting to Excel...');
        // Implementation for Excel export would go here
    };

    // Calculate statistics
    const getTotalRunningHours = () => {
        return runningEntries.reduce((total, entry) => total + entry.runningHours, 0);
    };

    const getTotalIdleHours = () => {
        return runningEntries.reduce((total, entry) => total + entry.idleHours, 0);
    };

    const getTotalBreakdownHours = () => {
        return runningEntries.reduce((total, entry) => total + entry.breakdownHours, 0);
    };

    const getRunningEquipmentCount = () => {
        return equipments.filter(eq => eq.status === 'running').length;
    };

    return (
        <div className="daily-running">
            {/* Header */}
            <div className="daily-running-header">
                <div className="daily-running-header-content">
                    <div className="daily-running-title-section">
                        <Clock className="daily-running-header-icon" />
                        <div>
                            <h1 className="daily-running-title">Vehicle Daily Running Entry</h1>
                            <p className="daily-running-subtitle">Track equipment performance and operator details</p>
                        </div>
                    </div>
                    <div className="daily-running-header-actions">
                        <button className="daily-running-btn daily-running-btn-primary" onClick={handleExportToExcel}>
                            <Download className="daily-running-icon" />
                            Export to Excel
                        </button>
                        <button className="daily-running-btn daily-running-btn-secondary" onClick={() => setShowOperatorModal(true)}>
                            <User className="daily-running-icon" />
                            Add Operator
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="daily-running-main">
                {/* Tabs */}
                <div className="daily-running-tabs">
                    <div className="daily-running-tabs-container">
                        <div className="daily-running-tabs-nav">
                            <div className="daily-running-tabs-list">
                                <button
                                    className={`daily-running-tab ${activeTab === 'running-entry' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('running-entry')}
                                >
                                    <Activity className="daily-running-tab-icon" />
                                    Running Entry
                                </button>
                                <button
                                    className={`daily-running-tab ${activeTab === 'entries-list' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('entries-list')}
                                >
                                    <FileText className="daily-running-tab-icon" />
                                    Entries List
                                </button>
                                <button
                                    className={`daily-running-tab ${activeTab === 'operators' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('operators')}
                                >
                                    <User className="daily-running-tab-icon" />
                                    Operators
                                </button>
                                <button
                                    className={`daily-running-tab ${activeTab === 'tasks' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('tasks')}
                                >
                                    <Settings className="daily-running-tab-icon" />
                                    Tasks Master
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="daily-running-content">
                    {activeTab === 'running-entry' && (
                        <div className="daily-running-tab-content">
                            <div className="daily-running-section-header">
                                <div>
                                    <h2 className="daily-running-section-title">Daily Running Entry</h2>
                                    <p className="daily-running-section-subtitle">Record equipment performance and readings</p>
                                </div>
                                <div className="daily-running-flex daily-running-gap-2">
                                    <button className="daily-running-btn daily-running-btn-warning" onClick={handleSetReadingsToZero}>
                                        Set Readings to Zero
                                    </button>
                                    <button className="daily-running-btn daily-running-btn-danger" onClick={handleRemoveEntries}>
                                        Remove Entries GTE {selectedDate}
                                    </button>
                                </div>
                            </div>

                            <div className="daily-running-card">
                                <div className="daily-running-card-content">
                                    <div className="daily-running-form">
                                        {/* Equipment Selection */}
                                        <div className="daily-running-form-grid-3">
                                            <div className="daily-running-form-group">
                                                <label className="daily-running-label">Equipment Identification No.</label>
                                                <select
                                                    className="daily-running-select"
                                                    value={runningForm.equipmentId}
                                                    onChange={(e) => setRunningForm({ ...runningForm, equipmentId: e.target.value })}
                                                >
                                                    <option value="">Select Equipment</option>
                                                    {equipments.map(equipment => (
                                                        <option key={equipment.id} value={equipment.id}>
                                                            {equipment.identificationNo} - {equipment.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="daily-running-form-group">
                                                <label className="daily-running-label">Date</label>
                                                <input
                                                    type="date"
                                                    className="daily-running-input"
                                                    value={runningForm.date}
                                                    onChange={(e) => setRunningForm({ ...runningForm, date: e.target.value })}
                                                />
                                            </div>
                                            <div className="daily-running-form-group">
                                                <label className="daily-running-label">Status</label>
                                                <div className="daily-running-radio-group">
                                                    <div className="daily-running-radio-item">
                                                        <input
                                                            type="radio"
                                                            className="daily-running-radio"
                                                            name="status"
                                                            value="running"
                                                            checked={runningForm.status === 'running'}
                                                            onChange={(e) => setRunningForm({ ...runningForm, status: e.target.value as 'running' | 'idle' | 'breakdown' })}
                                                        />
                                                        <span>Running</span>
                                                    </div>
                                                    <div className="daily-running-radio-item">
                                                        <input
                                                            type="radio"
                                                            className="daily-running-radio"
                                                            name="status"
                                                            value="idle"
                                                            checked={runningForm.status === 'idle'}
                                                            onChange={(e) => setRunningForm({ ...runningForm, status: e.target.value as 'running' | 'idle' | 'breakdown' })}
                                                        />
                                                        <span>Idle</span>
                                                    </div>
                                                    <div className="daily-running-radio-item">
                                                        <input
                                                            type="radio"
                                                            className="daily-running-radio"
                                                            name="status"
                                                            value="breakdown"
                                                            checked={runningForm.status === 'breakdown'}
                                                            onChange={(e) => setRunningForm({ ...runningForm, status: e.target.value as 'running' | 'idle' | 'breakdown' })}
                                                        />
                                                        <span>Break-Down</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Meter Readings */}
                                        <div className="daily-running-form-grid-4">
                                            <div className="daily-running-form-group">
                                                <label className="daily-running-label">Mtr Reading Start</label>
                                                <input
                                                    type="number"
                                                    className="daily-running-input"
                                                    value={runningForm.meterReadingStart}
                                                    onChange={(e) => setRunningForm({ ...runningForm, meterReadingStart: parseFloat(e.target.value) || 0 })}
                                                />
                                            </div>
                                            <div className="daily-running-form-group">
                                                <label className="daily-running-label">Mtr Reading End</label>
                                                <input
                                                    type="number"
                                                    className="daily-running-input"
                                                    value={runningForm.meterReadingEnd}
                                                    onChange={(e) => setRunningForm({ ...runningForm, meterReadingEnd: parseFloat(e.target.value) || 0 })}
                                                />
                                            </div>
                                            <div className="daily-running-form-group">
                                                <label className="daily-running-label">A-Dim /CSS Reading</label>
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    className="daily-running-input"
                                                    value={runningForm.aDimCssReading}
                                                    onChange={(e) => setRunningForm({ ...runningForm, aDimCssReading: parseFloat(e.target.value) || 0 })}
                                                />
                                            </div>
                                            <div className="daily-running-form-group">
                                                <label className="daily-running-label">TPH Reading</label>
                                                <input
                                                    type="number"
                                                    className="daily-running-input"
                                                    value={runningForm.tphReading}
                                                    onChange={(e) => setRunningForm({ ...runningForm, tphReading: parseFloat(e.target.value) || 0 })}
                                                />
                                            </div>
                                        </div>

                                        {/* Operators */}
                                        <div className="daily-running-form-grid-2">
                                            <div className="daily-running-form-group">
                                                <label className="daily-running-label">Operator/Driver</label>
                                                <select
                                                    className="daily-running-select"
                                                    value={runningForm.operator}
                                                    onChange={(e) => setRunningForm({ ...runningForm, operator: e.target.value })}
                                                >
                                                    <option value="">Select Operator</option>
                                                    {operators.map(operator => (
                                                        <option key={operator.id} value={operator.name}>
                                                            {operator.name} ({operator.employeeId})
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="daily-running-form-group">
                                                <label className="daily-running-label">Cont. Operator</label>
                                                <select
                                                    className="daily-running-select"
                                                    value={runningForm.continuousOperator}
                                                    onChange={(e) => setRunningForm({ ...runningForm, continuousOperator: e.target.value })}
                                                >
                                                    <option value="">Select Continuous Operator</option>
                                                    {operators.map(operator => (
                                                        <option key={operator.id} value={operator.name}>
                                                            {operator.name} ({operator.employeeId})
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        {/* Hours */}
                                        <div className="daily-running-form-grid-3">
                                            <div className="daily-running-form-group">
                                                <label className="daily-running-label">Running Hours</label>
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    className="daily-running-input"
                                                    value={runningForm.runningHours}
                                                    onChange={(e) => setRunningForm({ ...runningForm, runningHours: parseFloat(e.target.value) || 0 })}
                                                />
                                            </div>
                                            <div className="daily-running-form-group">
                                                <label className="daily-running-label">Idle Hours</label>
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    className="daily-running-input"
                                                    value={runningForm.idleHours}
                                                    onChange={(e) => setRunningForm({ ...runningForm, idleHours: parseFloat(e.target.value) || 0 })}
                                                />
                                            </div>
                                            <div className="daily-running-form-group">
                                                <label className="daily-running-label">Breakdown Hours</label>
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    className="daily-running-input"
                                                    value={runningForm.breakdownHours}
                                                    onChange={(e) => setRunningForm({ ...runningForm, breakdownHours: parseFloat(e.target.value) || 0 })}
                                                />
                                            </div>
                                        </div>

                                        {/* Remarks */}
                                        <div className="daily-running-form-group">
                                            <label className="daily-running-label">Remarks</label>
                                            <textarea
                                                className="daily-running-textarea"
                                                value={runningForm.remarks}
                                                onChange={(e) => setRunningForm({ ...runningForm, remarks: e.target.value })}
                                                placeholder="Enter any additional remarks..."
                                            />
                                        </div>

                                        {/* Actions */}
                                        <div className="daily-running-flex daily-running-gap-3">
                                            <button className="daily-running-btn daily-running-btn-primary" onClick={handleSaveEntry}>
                                                <Save className="daily-running-icon" />
                                                Save Reading
                                            </button>
                                            <button className="daily-running-btn daily-running-btn-secondary">
                                                <Plus className="daily-running-icon" />
                                                Update TPH and A-DIM for Selected Date
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Common Tasks Section */}
                            <div className="daily-running-card daily-running-mt-4">
                                <div className="daily-running-card-header">
                                    <h3 className="daily-running-card-title">Common Tasks</h3>
                                    <button className="daily-running-btn daily-running-btn-secondary" onClick={() => setShowTaskModal(true)}>
                                        <Plus className="daily-running-icon" />
                                        Add Task
                                    </button>
                                </div>
                                <div className="daily-running-card-content">
                                    <div className="daily-running-grid daily-running-grid-cols-2 daily-running-gap-4">
                                        {commonTasks.map(task => (
                                            <div key={task.id} className="daily-running-flex daily-running-items-center daily-running-gap-2">
                                                <input
                                                    type="checkbox"
                                                    className="daily-running-checkbox"
                                                    checked={task.completed}
                                                    onChange={() => { }}
                                                />
                                                <div>
                                                    <div className="daily-running-font-medium">{task.name}</div>
                                                    <div className="daily-running-text-sm daily-running-text-gray-600">{task.description}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'entries-list' && (
                        <div className="daily-running-tab-content">
                            <div className="daily-running-section-header">
                                <div>
                                    <h2 className="daily-running-section-title">Daily Running Entries</h2>
                                    <p className="daily-running-section-subtitle">View and manage all running entries</p>
                                </div>
                                <div className="daily-running-flex daily-running-gap-2">
                                    <button className="daily-running-btn daily-running-btn-secondary">
                                        <Edit3 className="daily-running-icon" />
                                        Modify Details
                                    </button>
                                    <button className="daily-running-btn daily-running-btn-danger">
                                        <Trash2 className="daily-running-icon" />
                                        Remove Below Selected Entry
                                    </button>
                                </div>
                            </div>

                            {/* Filters */}
                            <div className="daily-running-filters">
                                <div className="daily-running-search-container">
                                    <Search className="daily-running-search-icon" />
                                    <input
                                        type="text"
                                        className="daily-running-search-input"
                                        placeholder="Search by equipment or operator..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <select
                                    className="daily-running-select"
                                    value={selectedEquipment}
                                    onChange={(e) => setSelectedEquipment(e.target.value)}
                                >
                                    <option value="">All Equipment</option>
                                    {equipments.map(equipment => (
                                        <option key={equipment.id} value={equipment.id}>
                                            {equipment.identificationNo} - {equipment.name}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="date"
                                    className="daily-running-input"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                />
                            </div>

                            {/* Statistics Cards */}
                            <div className="daily-running-grid daily-running-grid-cols-4 daily-running-gap-4 daily-running-mb-6">
                                <div className="daily-running-card">
                                    <div className="daily-running-card-content">
                                        <div className="daily-running-flex daily-running-items-center daily-running-gap-3">
                                            <div className="daily-running-status-indicator daily-running-status-running">
                                                <Activity className="daily-running-icon" />
                                            </div>
                                            <div>
                                                <div className="daily-running-text-2xl daily-running-font-bold">{getTotalRunningHours()}</div>
                                                <div className="daily-running-text-sm daily-running-text-gray-600">Running Hours</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="daily-running-card">
                                    <div className="daily-running-card-content">
                                        <div className="daily-running-flex daily-running-items-center daily-running-gap-3">
                                            <div className="daily-running-status-indicator daily-running-status-idle">
                                                <Clock className="daily-running-icon" />
                                            </div>
                                            <div>
                                                <div className="daily-running-text-2xl daily-running-font-bold">{getTotalIdleHours()}</div>
                                                <div className="daily-running-text-sm daily-running-text-gray-600">Idle Hours</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="daily-running-card">
                                    <div className="daily-running-card-content">
                                        <div className="daily-running-flex daily-running-items-center daily-running-gap-3">
                                            <div className="daily-running-status-indicator daily-running-status-breakdown">
                                                <X className="daily-running-icon" />
                                            </div>
                                            <div>
                                                <div className="daily-running-text-2xl daily-running-font-bold">{getTotalBreakdownHours()}</div>
                                                <div className="daily-running-text-sm daily-running-text-gray-600">Breakdown Hours</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="daily-running-card">
                                    <div className="daily-running-card-content">
                                        <div className="daily-running-flex daily-running-items-center daily-running-gap-3">
                                            <div className="daily-running-status-indicator daily-running-status-running">
                                                <Truck className="daily-running-icon" />
                                            </div>
                                            <div>
                                                <div className="daily-running-text-2xl daily-running-font-bold">{getRunningEquipmentCount()}</div>
                                                <div className="daily-running-text-sm daily-running-text-gray-600">Active Equipment</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Entries Table */}
                            <div className="daily-running-card">
                                <div className="daily-running-card-content">
                                    <div className="daily-running-table-container">
                                        <table className="daily-running-table">
                                            <thead>
                                                <tr>
                                                    <th>Equipment</th>
                                                    <th>Date</th>
                                                    <th>Operator</th>
                                                    <th>Meter Reading</th>
                                                    <th>A-Dim/CSS</th>
                                                    <th>TPH</th>
                                                    <th>Run/Idle/BD Hours</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredEntries.map(entry => {
                                                    const equipment = getEquipmentById(entry.equipmentId);
                                                    return (
                                                        <tr key={entry.id}>
                                                            <td>
                                                                <div className="daily-running-font-medium">{equipment?.identificationNo}</div>
                                                                <div className="daily-running-text-sm daily-running-text-gray-600">{equipment?.name}</div>
                                                            </td>
                                                            <td>{entry.date}</td>
                                                            <td>
                                                                <div className="daily-running-font-medium">{entry.operator}</div>
                                                                <div className="daily-running-text-sm daily-running-text-gray-600">{entry.continuousOperator}</div>
                                                            </td>
                                                            <td>
                                                                <div>{entry.meterReadingStart} - {entry.meterReadingEnd}</div>
                                                            </td>
                                                            <td>{entry.aDimCssReading}</td>
                                                            <td>{entry.tphReading}</td>
                                                            <td>
                                                                <div className="daily-running-text-sm">
                                                                    <div>Run: {entry.runningHours}h</div>
                                                                    <div>Idle: {entry.idleHours}h</div>
                                                                    <div>BD: {entry.breakdownHours}h</div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span className={`daily-running-status-indicator daily-running-status-${entry.status}`}>
                                                                    {entry.status}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="daily-running-table-actions">
                                                                    <button className="daily-running-btn-icon">
                                                                        <Edit3 className="daily-running-icon-sm" />
                                                                    </button>
                                                                    <button className="daily-running-btn-icon">
                                                                        <Trash2 className="daily-running-icon-sm" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'operators' && (
                        <div className="daily-running-tab-content">
                            <div className="daily-running-section-header">
                                <div>
                                    <h2 className="daily-running-section-title">Operators Management</h2>
                                    <p className="daily-running-section-subtitle">Manage equipment operators and drivers</p>
                                </div>
                                <button className="daily-running-btn daily-running-btn-primary" onClick={() => setShowOperatorModal(true)}>
                                    <Plus className="daily-running-icon" />
                                    Add New Operator
                                </button>
                            </div>

                            <div className="daily-running-card">
                                <div className="daily-running-card-content">
                                    <div className="daily-running-table-container">
                                        <table className="daily-running-table">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Employee ID</th>
                                                    <th>Shift</th>
                                                    <th>Contact</th>
                                                    <th>Specialization</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {operators.map(operator => (
                                                    <tr key={operator.id}>
                                                        <td className="daily-running-font-medium">{operator.name}</td>
                                                        <td>{operator.employeeId}</td>
                                                        <td>{operator.shift}</td>
                                                        <td>{operator.contact}</td>
                                                        <td>{operator.specialization}</td>
                                                        <td>
                                                            <div className="daily-running-table-actions">
                                                                <button className="daily-running-btn-icon">
                                                                    <Edit3 className="daily-running-icon-sm" />
                                                                </button>
                                                                <button className="daily-running-btn-icon">
                                                                    <Trash2 className="daily-running-icon-sm" />
                                                                </button>
                                                            </div>
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

                    {activeTab === 'tasks' && (
                        <div className="daily-running-tab-content">
                            <div className="daily-running-section-header">
                                <div>
                                    <h2 className="daily-running-section-title">Tasks Master</h2>
                                    <p className="daily-running-section-subtitle">Manage common tasks and assignments</p>
                                </div>
                                <button className="daily-running-btn daily-running-btn-primary" onClick={() => setShowTaskModal(true)}>
                                    <Plus className="daily-running-icon" />
                                    Add New Task
                                </button>
                            </div>

                            <div className="daily-running-card">
                                <div className="daily-running-card-content">
                                    <div className="daily-running-table-container">
                                        <table className="daily-running-table">
                                            <thead>
                                                <tr>
                                                    <th>Task Name</th>
                                                    <th>Description</th>
                                                    <th>Assigned To</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {commonTasks.map(task => (
                                                    <tr key={task.id}>
                                                        <td className="daily-running-font-medium">{task.name}</td>
                                                        <td>{task.description}</td>
                                                        <td>{task.assignedTo || 'Unassigned'}</td>
                                                        <td>
                                                            <span className={`daily-running-status-indicator ${task.completed ? 'daily-running-status-running' : 'daily-running-status-idle'}`}>
                                                                {task.completed ? 'Completed' : 'Pending'}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <div className="daily-running-table-actions">
                                                                <button className="daily-running-btn-icon">
                                                                    <Edit3 className="daily-running-icon-sm" />
                                                                </button>
                                                                <button className="daily-running-btn-icon">
                                                                    <Trash2 className="daily-running-icon-sm" />
                                                                </button>
                                                            </div>
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
                </div>
            </div>

            {/* Operator Modal */}
            {showOperatorModal && (
                <div className="daily-running-modal-overlay" onClick={() => setShowOperatorModal(false)}>
                    <div className="daily-running-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="daily-running-modal-header">
                            <h3 className="daily-running-modal-title">Add New Operator</h3>
                            <button className="daily-running-modal-close" onClick={() => setShowOperatorModal(false)}>
                                <X className="daily-running-icon" />
                            </button>
                        </div>
                        <div className="daily-running-modal-content">
                            <div className="daily-running-form">
                                <div className="daily-running-form-group">
                                    <label className="daily-running-label">Name</label>
                                    <input
                                        type="text"
                                        className="daily-running-input"
                                        value={newOperator.name}
                                        onChange={(e) => setNewOperator({ ...newOperator, name: e.target.value })}
                                        placeholder="Enter operator name"
                                    />
                                </div>
                                <div className="daily-running-form-group">
                                    <label className="daily-running-label">Employee ID</label>
                                    <input
                                        type="text"
                                        className="daily-running-input"
                                        value={newOperator.employeeId}
                                        onChange={(e) => setNewOperator({ ...newOperator, employeeId: e.target.value })}
                                        placeholder="Enter employee ID"
                                    />
                                </div>
                                <div className="daily-running-form-group">
                                    <label className="daily-running-label">Shift</label>
                                    <select
                                        className="daily-running-select"
                                        value={newOperator.shift}
                                        onChange={(e) => setNewOperator({ ...newOperator, shift: e.target.value })}
                                    >
                                        <option value="Day">Day</option>
                                        <option value="Night">Night</option>
                                        <option value="Rotational">Rotational</option>
                                    </select>
                                </div>
                                <div className="daily-running-form-group">
                                    <label className="daily-running-label">Contact</label>
                                    <input
                                        type="text"
                                        className="daily-running-input"
                                        value={newOperator.contact}
                                        onChange={(e) => setNewOperator({ ...newOperator, contact: e.target.value })}
                                        placeholder="Enter contact number"
                                    />
                                </div>
                                <div className="daily-running-form-group">
                                    <label className="daily-running-label">Specialization</label>
                                    <input
                                        type="text"
                                        className="daily-running-input"
                                        value={newOperator.specialization}
                                        onChange={(e) => setNewOperator({ ...newOperator, specialization: e.target.value })}
                                        placeholder="Enter specialization"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="daily-running-modal-footer">
                            <button className="daily-running-btn daily-running-btn-secondary" onClick={() => setShowOperatorModal(false)}>
                                Cancel
                            </button>
                            <button className="daily-running-btn daily-running-btn-primary" onClick={handleAddOperator}>
                                <Save className="daily-running-icon" />
                                Save Operator
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Task Modal */}
            {showTaskModal && (
                <div className="daily-running-modal-overlay" onClick={() => setShowTaskModal(false)}>
                    <div className="daily-running-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="daily-running-modal-header">
                            <h3 className="daily-running-modal-title">Add New Task</h3>
                            <button className="daily-running-modal-close" onClick={() => setShowTaskModal(false)}>
                                <X className="daily-running-icon" />
                            </button>
                        </div>
                        <div className="daily-running-modal-content">
                            <div className="daily-running-form">
                                <div className="daily-running-form-group">
                                    <label className="daily-running-label">Task Name</label>
                                    <input
                                        type="text"
                                        className="daily-running-input"
                                        placeholder="Enter task name"
                                    />
                                </div>
                                <div className="daily-running-form-group">
                                    <label className="daily-running-label">Description</label>
                                    <textarea
                                        className="daily-running-textarea"
                                        placeholder="Enter task description"
                                    />
                                </div>
                                <div className="daily-running-form-group">
                                    <label className="daily-running-label">Assign To</label>
                                    <select className="daily-running-select">
                                        <option value="">Select Operator</option>
                                        {operators.map(operator => (
                                            <option key={operator.id} value={operator.name}>
                                                {operator.name} ({operator.employeeId})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="daily-running-modal-footer">
                            <button className="daily-running-btn daily-running-btn-secondary" onClick={() => setShowTaskModal(false)}>
                                Cancel
                            </button>
                            <button className="daily-running-btn daily-running-btn-primary">
                                <Save className="daily-running-icon" />
                                Save Task
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
