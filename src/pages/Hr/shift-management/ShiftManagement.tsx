import React, { useState, useEffect } from 'react';
import './ShiftManagement.css';

// Icon components (you can replace these with your preferred icon library or SVGs)
const Clock = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const Calendar = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v12a2 2 0 002 2z" />
    </svg>
);

const Users = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
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

const Download = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
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

const List = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
);

const Grid = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
    </svg>
);

const ChevronLeft = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const ChevronRight = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

const BarChart3 = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13l4-4L11 13l4-4 4 4M3 21h18" />
    </svg>
);

// Types
interface Employee {
    id: string;
    empNo: string;
    name: string;
    department: string;
    designation: string;
    mobile: string;
    email: string;
    currentShift?: string;
}

interface Shift {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    color: string;
    description: string;
    isActive: boolean;
}

interface ShiftAssignment {
    id: string;
    employeeId: string;
    shiftId: string;
    startDate: string;
    endDate: string;
    status: 'active' | 'completed' | 'upcoming';
    assignedBy: string;
    assignedOn: string;
    notes?: string;
}

export default function ShiftManagement() {
    const [activeTab, setActiveTab] = useState('overview');
    const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [showShiftModal, setShowShiftModal] = useState(false);
    const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterShift, setFilterShift] = useState('all');

    // Sample shifts data
    const [shifts, setShifts] = useState<Shift[]>([
        {
            id: 'shift-1',
            name: 'Morning Shift',
            startTime: '06:00',
            endTime: '14:00',
            color: '#10b981',
            description: 'Early morning shift for mining operations',
            isActive: true
        },
        {
            id: 'shift-2',
            name: 'Afternoon Shift',
            startTime: '14:00',
            endTime: '22:00',
            color: '#f59e0b',
            description: 'Afternoon shift for continuous operations',
            isActive: true
        },
        {
            id: 'shift-3',
            name: 'Night Shift',
            startTime: '22:00',
            endTime: '06:00',
            color: '#6366f1',
            description: 'Night shift for 24/7 operations',
            isActive: true
        }
    ]);

    // Sample employees data
    const [employees, setEmployees] = useState<Employee[]>([
        {
            id: 'emp-1',
            empNo: 'EMP001',
            name: 'Rajesh Kumar',
            department: 'Mining Operations',
            designation: 'Senior Operator',
            mobile: '9876543210',
            email: 'rajesh@mining.com',
            currentShift: 'shift-1'
        },
        {
            id: 'emp-2',
            empNo: 'EMP002',
            name: 'Priya Sharma',
            department: 'Equipment Maintenance',
            designation: 'Maintenance Engineer',
            mobile: '9876543211',
            email: 'priya@mining.com',
            currentShift: 'shift-2'
        },
        {
            id: 'emp-3',
            empNo: 'EMP003',
            name: 'Amit Singh',
            department: 'Safety & Security',
            designation: 'Safety Officer',
            mobile: '9876543212',
            email: 'amit@mining.com',
            currentShift: 'shift-3'
        },
        {
            id: 'emp-4',
            empNo: 'EMP004',
            name: 'Sunita Devi',
            department: 'Quality Control',
            designation: 'Quality Inspector',
            mobile: '9876543213',
            email: 'sunita@mining.com'
        },
        {
            id: 'emp-5',
            empNo: 'EMP005',
            name: 'Manoj Gupta',
            department: 'Transport',
            designation: 'Truck Driver',
            mobile: '9876543214',
            email: 'manoj@mining.com',
            currentShift: 'shift-1'
        },
        {
            id: 'emp-6',
            empNo: 'EMP006',
            name: 'Kavita Rani',
            department: 'Administration',
            designation: 'HR Assistant',
            mobile: '9876543215',
            email: 'kavita@mining.com',
            currentShift: 'shift-1'
        },
        {
            id: 'emp-7',
            empNo: 'EMP007',
            name: 'Deepak Kumar',
            department: 'Mining Operations',
            designation: 'Junior Operator',
            mobile: '9876543216',
            email: 'deepak@mining.com',
            currentShift: 'shift-2'
        },
        {
            id: 'emp-8',
            empNo: 'EMP008',
            name: 'Ritu Kumari',
            department: 'Safety & Security',
            designation: 'Security Guard',
            mobile: '9876543217',
            email: 'ritu@mining.com',
            currentShift: 'shift-3'
        }
    ]);

    // Sample shift assignments
    const [assignments, setAssignments] = useState<ShiftAssignment[]>([
        {
            id: 'assign-1',
            employeeId: 'emp-1',
            shiftId: 'shift-1',
            startDate: '2025-07-15',
            endDate: '2025-07-29',
            status: 'active',
            assignedBy: 'HR Manager',
            assignedOn: '2025-07-14',
            notes: 'Regular assignment for 15 days'
        },
        {
            id: 'assign-2',
            employeeId: 'emp-2',
            shiftId: 'shift-2',
            startDate: '2025-07-15',
            endDate: '2025-07-21',
            status: 'active',
            assignedBy: 'HR Manager',
            assignedOn: '2025-07-14',
            notes: 'Weekly assignment'
        },
        {
            id: 'assign-3',
            employeeId: 'emp-3',
            shiftId: 'shift-3',
            startDate: '2025-07-15',
            endDate: '2025-07-21',
            status: 'active',
            assignedBy: 'HR Manager',
            assignedOn: '2025-07-14',
            notes: 'Night shift coverage'
        },
        {
            id: 'assign-4',
            employeeId: 'emp-5',
            shiftId: 'shift-1',
            startDate: '2025-07-15',
            endDate: '2025-07-21',
            status: 'active',
            assignedBy: 'HR Manager',
            assignedOn: '2025-07-14',
            notes: 'Transport duty'
        },
        {
            id: 'assign-5',
            employeeId: 'emp-6',
            shiftId: 'shift-1',
            startDate: '2025-07-15',
            endDate: '2025-07-29',
            status: 'active',
            assignedBy: 'HR Manager',
            assignedOn: '2025-07-14',
            notes: 'Admin support'
        },
        {
            id: 'assign-6',
            employeeId: 'emp-7',
            shiftId: 'shift-2',
            startDate: '2025-07-15',
            endDate: '2025-07-21',
            status: 'active',
            assignedBy: 'HR Manager',
            assignedOn: '2025-07-14',
            notes: 'Training period'
        },
        {
            id: 'assign-7',
            employeeId: 'emp-8',
            shiftId: 'shift-3',
            startDate: '2025-07-15',
            endDate: '2025-07-29',
            status: 'active',
            assignedBy: 'HR Manager',
            assignedOn: '2025-07-14',
            notes: 'Security coverage'
        }
    ]);

    const [newShift, setNewShift] = useState<Partial<Shift>>({
        name: '',
        startTime: '',
        endTime: '',
        color: '#10b981',
        description: '',
        isActive: true
    });

    const [assignmentForm, setAssignmentForm] = useState({
        shiftId: '',
        startDate: '',
        duration: '7',
        notes: ''
    });

    // Filter employees based on search term
    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.empNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get shift by ID
    const getShiftById = (shiftId: string) => shifts.find(s => s.id === shiftId);

    // Get employee by ID
    const getEmployeeById = (empId: string) => employees.find(e => e.id === empId);

    // Generate calendar days
    const generateCalendarDays = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        // Previous month days
        for (let i = 0; i < startingDayOfWeek; i++) {
            const date = new Date(year, month, -startingDayOfWeek + i + 1);
            days.push({ date, isCurrentMonth: false });
        }

        // Current month days
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            days.push({ date, isCurrentMonth: true });
        }

        // Next month days to complete the grid
        const remainingDays = 42 - days.length;
        for (let day = 1; day <= remainingDays; day++) {
            const date = new Date(year, month + 1, day);
            days.push({ date, isCurrentMonth: false });
        }

        return days;
    };

    // Get assignments for a specific date
    const getAssignmentsForDate = (date: Date) => {
        const dateStr = date.toISOString().split('T')[0];
        return assignments.filter(assignment => {
            const startDate = new Date(assignment.startDate);
            const endDate = new Date(assignment.endDate);
            return date >= startDate && date <= endDate;
        });
    };

    // Handle shift creation/update
    const handleSaveShift = () => {
        if (newShift.name && newShift.startTime && newShift.endTime) {
            const shiftData: Shift = {
                id: `shift-${Date.now()}`,
                name: newShift.name,
                startTime: newShift.startTime,
                endTime: newShift.endTime,
                color: newShift.color || '#10b981',
                description: newShift.description || '',
                isActive: newShift.isActive ?? true
            };

            setShifts([...shifts, shiftData]);
            setNewShift({ name: '', startTime: '', endTime: '', color: '#10b981', description: '', isActive: true });
            setShowShiftModal(false);
        }
    };

    // Handle employee assignment
    const handleAssignEmployees = () => {
        if (selectedEmployees.length > 0 && assignmentForm.shiftId && assignmentForm.startDate) {
            const startDate = new Date(assignmentForm.startDate);
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + parseInt(assignmentForm.duration));

            const newAssignments = selectedEmployees.map(empId => ({
                id: `assign-${Date.now()}-${empId}`,
                employeeId: empId,
                shiftId: assignmentForm.shiftId,
                startDate: assignmentForm.startDate,
                endDate: endDate.toISOString().split('T')[0],
                status: 'active' as const,
                assignedBy: 'HR Manager',
                assignedOn: new Date().toISOString().split('T')[0],
                notes: assignmentForm.notes
            }));

            setAssignments([...assignments, ...newAssignments]);
            setSelectedEmployees([]);
            setAssignmentForm({ shiftId: '', startDate: '', duration: '7', notes: '' });
            setShowAssignModal(false);
        }
    };

    // Calculate shift statistics
    const getShiftStats = () => {
        return shifts.map(shift => {
            const activeAssignments = assignments.filter(a => a.shiftId === shift.id && a.status === 'active');
            return {
                ...shift,
                employeeCount: activeAssignments.length
            };
        });
    };

    const calendarDays = generateCalendarDays();
    const shiftStats = getShiftStats();

    return (
        <div className="shift-management">
            <div className='container'>
                {/* Header */}
                <div className="shift-management-header">
                    <div className="shift-management-header-content">
                        <div className="shift-management-title-section">
                            <Clock className="shift-management-header-icon" />
                            <div>
                                <h1 className="shift-management-title">Shift Management</h1>
                                <p className="shift-management-subtitle">
                                    Manage employee shift assignments and schedules for mining operations
                                </p>
                            </div>
                        </div>
                        <div className="shift-management-header-actions">
                            <button
                                onClick={() => setShowShiftModal(true)}
                                className="shift-management-btn shift-management-btn-primary"
                            >
                                <Plus className="shift-management-icon" />
                                Create Shift
                            </button>
                            <button
                                onClick={() => setShowAssignModal(true)}
                                className="shift-management-btn shift-management-btn-secondary"
                            >
                                <Users className="shift-management-icon" />
                                Assign Employees
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="shift-management-main" style={{marginTop: "1rem"}}>
                    {/* Tab Navigation */}
                    <div className="shift-management-tabs">
                        <div className="shift-management-tabs-container">
                            <nav className="shift-management-tabs-nav">
                                <div className="shift-management-tabs-list">
                                    <button
                                        onClick={() => setActiveTab('overview')}
                                        className={`shift-management-tab ${activeTab === 'overview' ? 'active' : ''}`}
                                    >
                                        <BarChart3 className="shift-management-tab-icon" />
                                        Overview
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('shifts')}
                                        className={`shift-management-tab ${activeTab === 'shifts' ? 'active' : ''}`}
                                    >
                                        <Clock className="shift-management-tab-icon" />
                                        Shifts
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('assignments')}
                                        className={`shift-management-tab ${activeTab === 'assignments' ? 'active' : ''}`}
                                    >
                                        <Calendar className="shift-management-tab-icon" />
                                        Assignments
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('employees')}
                                        className={`shift-management-tab ${activeTab === 'employees' ? 'active' : ''}`}
                                    >
                                        <Users className="shift-management-tab-icon" />
                                        Employees
                                    </button>
                                </div>
                            </nav>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="shift-management-content">
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="shift-management-tab-content">
                                {/* <div className="shift-management-section-header">
                                    <h2 className="shift-management-section-title">Shift Overview</h2>
                                    <p className="shift-management-section-subtitle">
                                        Current shift statistics and employee distribution
                                    </p>
                                </div> */}

                                {/* Statistics Cards */}
                                <div className="shift-management-grid shift-management-grid-cols-1 shift-management-md-grid-cols-4 shift-management-gap-6 shift-management-mb-6">
                                    <div className="shift-management-card">
                                        <div className="shift-management-card-content">
                                            <div className="shift-management-flex shift-management-items-center shift-management-gap-3">
                                                <div className="shift-management-stat-icon shift-management-stat-icon-blue">
                                                    <Clock className="shift-management-icon" />
                                                </div>
                                                <div>
                                                    <p className="shift-management-text-sm shift-management-text-gray-600">Total Shifts</p>
                                                    <p className="shift-management-text-2xl shift-management-font-bold">{shifts.length}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="shift-management-card">
                                        <div className="shift-management-card-content">
                                            <div className="shift-management-flex shift-management-items-center shift-management-gap-3">
                                                <div className="shift-management-stat-icon shift-management-stat-icon-green">
                                                    <Users className="shift-management-icon" />
                                                </div>
                                                <div>
                                                    <p className="shift-management-text-sm shift-management-text-gray-600">Total Employees</p>
                                                    <p className="shift-management-text-2xl shift-management-font-bold">{employees.length}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="shift-management-card">
                                        <div className="shift-management-card-content">
                                            <div className="shift-management-flex shift-management-items-center shift-management-gap-3">
                                                <div className="shift-management-stat-icon shift-management-stat-icon-yellow">
                                                    <Calendar className="shift-management-icon" />
                                                </div>
                                                <div>
                                                    <p className="shift-management-text-sm shift-management-text-gray-600">Active Assignments</p>
                                                    <p className="shift-management-text-2xl shift-management-font-bold">
                                                        {assignments.filter(a => a.status === 'active').length}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="shift-management-card">
                                        <div className="shift-management-card-content">
                                            <div className="shift-management-flex shift-management-items-center shift-management-gap-3">
                                                <div className="shift-management-stat-icon shift-management-stat-icon-purple">
                                                    <Users className="shift-management-icon" />
                                                </div>
                                                <div>
                                                    <p className="shift-management-text-sm shift-management-text-gray-600">Unassigned</p>
                                                    <p className="shift-management-text-2xl shift-management-font-bold">
                                                        {employees.filter(emp => !assignments.some(a => a.employeeId === emp.id && a.status === 'active')).length}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Shift Distribution */}
                                <div className="shift-management-grid shift-management-grid-cols-1 shift-management-md-grid-cols-3 shift-management-gap-6">
                                    {shiftStats.map((shift) => (
                                        <div key={shift.id} className="shift-management-card">
                                            <div className="shift-management-card-header">
                                                <div className="shift-management-flex shift-management-items-center shift-management-gap-3">
                                                    <div
                                                        className="shift-management-shift-indicator"
                                                        style={{ backgroundColor: shift.color }}
                                                    />
                                                    <div>
                                                        <h3 className="shift-management-card-title">{shift.name}</h3>
                                                        <p className="shift-management-text-sm shift-management-text-gray-600">
                                                            {shift.startTime} - {shift.endTime}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="shift-management-card-content">
                                                <div className="shift-management-space-y-4">
                                                    <div className="shift-management-flex shift-management-justify-between shift-management-items-center">
                                                        <span className="shift-management-text-sm shift-management-text-gray-600">Assigned Employees</span>
                                                        <span className="shift-management-text-lg shift-management-font-semibold">{shift.employeeCount}</span>
                                                    </div>

                                                    <div className="shift-management-progress-bar">
                                                        <div
                                                            className="shift-management-progress-fill"
                                                            style={{
                                                                width: `${(shift.employeeCount / employees.length) * 100}%`,
                                                                backgroundColor: shift.color
                                                            }}
                                                        />
                                                    </div>

                                                    <div className="shift-management-flex shift-management-justify-between">
                                                        <span className={`shift-management-badge ${shift.isActive ? 'shift-management-badge-success' : 'shift-management-badge-error'}`}>
                                                            {shift.isActive ? 'Active' : 'Inactive'}
                                                        </span>
                                                        <span className="shift-management-text-xs shift-management-text-gray-500">
                                                            {Math.round((shift.employeeCount / employees.length) * 100)}% of workforce
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Shifts Tab */}
                        {activeTab === 'shifts' && (
                            <div className="shift-management-tab-content">
                                <div className="shift-management-section-header">
                                    <h2 className="shift-management-section-title">Shift Configuration</h2>
                                    <p className="shift-management-section-subtitle">
                                        Configure and manage company shifts
                                    </p>
                                </div>

                                <div className="shift-management-grid shift-management-grid-cols-1 shift-management-md-grid-cols-3 shift-management-gap-6">
                                    {shifts.map((shift) => (
                                        <div key={shift.id} className="shift-management-card">
                                            <div className="shift-management-card-header">
                                                <div className="shift-management-flex shift-management-items-center shift-management-gap-3">
                                                    <div
                                                        className="shift-management-shift-indicator"
                                                        style={{ backgroundColor: shift.color }}
                                                    />
                                                    <div>
                                                        <h3 className="shift-management-card-title">{shift.name}</h3>
                                                        <p className="shift-management-text-sm shift-management-text-gray-600">
                                                            {shift.startTime} - {shift.endTime}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button className="shift-management-btn-icon">
                                                    <Edit3 className="shift-management-icon-sm" />
                                                </button>
                                            </div>
                                            <div className="shift-management-card-content">
                                                <p className="shift-management-text-sm shift-management-text-gray-700">
                                                    {shift.description}
                                                </p>
                                                <div className="shift-management-flex shift-management-items-center shift-management-justify-between shift-management-mt-4">
                                                    <span className={`shift-management-badge ${shift.isActive ? 'shift-management-badge-success' : 'shift-management-badge-error'}`}>
                                                        {shift.isActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                    <span className="shift-management-text-sm shift-management-text-gray-600">
                                                        {assignments.filter(a => a.shiftId === shift.id && a.status === 'active').length} employees
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Assignments Tab */}
                        {activeTab === 'assignments' && (
                            <div className="shift-management-tab-content">
                                <div className="shift-management-section-header">
                                    <div>
                                        <h2 className="shift-management-section-title">Shift Assignments</h2>
                                        <p className="shift-management-section-subtitle">
                                            View and manage employee shift assignments
                                        </p>
                                    </div>
                                    <div className="shift-management-flex shift-management-gap-2">
                                        <button
                                            onClick={() => setViewMode('calendar')}
                                            className={`shift-management-btn ${viewMode === 'calendar' ? 'shift-management-btn-primary' : 'shift-management-btn-secondary'}`}
                                        >
                                            <Grid className="shift-management-icon" />
                                            Calendar View
                                        </button>
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`shift-management-btn ${viewMode === 'list' ? 'shift-management-btn-primary' : 'shift-management-btn-secondary'}`}
                                        >
                                            <List className="shift-management-icon" />
                                            List View
                                        </button>
                                    </div>
                                </div>

                                {/* Calendar View */}
                                {viewMode === 'calendar' && (
                                    <div className="shift-management-calendar">
                                        <div className="shift-management-calendar-header">
                                            <button
                                                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                                                className="shift-management-btn-icon"
                                            >
                                                <ChevronLeft className="shift-management-icon" />
                                            </button>
                                            <h3 className="shift-management-calendar-title">
                                                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                            </h3>
                                            <button
                                                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                                                className="shift-management-btn-icon"
                                            >
                                                <ChevronRight className="shift-management-icon" />
                                            </button>
                                        </div>

                                        <div className="shift-management-calendar-grid">
                                            <div className="shift-management-calendar-weekdays">
                                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                                    <div key={day} className="shift-management-calendar-weekday">
                                                        {day}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="shift-management-calendar-days">
                                                {calendarDays.map((day, index) => {
                                                    const dayAssignments = getAssignmentsForDate(day.date);
                                                    const isToday = day.date.toDateString() === new Date().toDateString();

                                                    return (
                                                        <div
                                                            key={index}
                                                            className={`shift-management-calendar-day ${!day.isCurrentMonth ? 'shift-management-calendar-day-inactive' : ''
                                                                } ${isToday ? 'shift-management-calendar-day-today' : ''}`}
                                                        >
                                                            <div className="shift-management-calendar-day-number">
                                                                {day.date.getDate()}
                                                            </div>
                                                            <div className="shift-management-calendar-day-assignments">
                                                                {dayAssignments.slice(0, 3).map((assignment, i) => {
                                                                    const employee = getEmployeeById(assignment.employeeId);
                                                                    const shift = getShiftById(assignment.shiftId);
                                                                    return (
                                                                        <div
                                                                            key={assignment.id}
                                                                            className="shift-management-calendar-assignment"
                                                                            style={{ backgroundColor: shift?.color }}
                                                                            title={`${employee?.name} - ${shift?.name}`}
                                                                        >
                                                                            {employee?.name.split(' ')[0]}
                                                                        </div>
                                                                    );
                                                                })}
                                                                {dayAssignments.length > 3 && (
                                                                    <div className="shift-management-calendar-assignment-more">
                                                                        +{dayAssignments.length - 3}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* List View */}
                                {viewMode === 'list' && (
                                    <div className="shift-management-list">
                                        <div className="shift-management-table-container">
                                            <table className="shift-management-table">
                                                <thead>
                                                    <tr>
                                                        <th>Employee</th>
                                                        <th>Shift</th>
                                                        <th>Duration</th>
                                                        <th>Status</th>
                                                        <th>Assigned By</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {assignments.map((assignment) => {
                                                        const employee = getEmployeeById(assignment.employeeId);
                                                        const shift = getShiftById(assignment.shiftId);
                                                        const durationDays = Math.ceil((new Date(assignment.endDate).getTime() - new Date(assignment.startDate).getTime()) / (1000 * 60 * 60 * 24));

                                                        return (
                                                            <tr key={assignment.id}>
                                                                <td>
                                                                    <div>
                                                                        <div className="shift-management-font-medium">{employee?.name}</div>
                                                                        <div className="shift-management-text-sm shift-management-text-gray-600">
                                                                            {employee?.empNo} • {employee?.department}
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="shift-management-flex shift-management-items-center shift-management-gap-2">
                                                                        <div
                                                                            className="shift-management-shift-indicator-sm"
                                                                            style={{ backgroundColor: shift?.color }}
                                                                        />
                                                                        <div>
                                                                            <div className="shift-management-font-medium">{shift?.name}</div>
                                                                            <div className="shift-management-text-sm shift-management-text-gray-600">
                                                                                {shift?.startTime} - {shift?.endTime}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div>
                                                                        <div className="shift-management-text-sm">
                                                                            {assignment.startDate} to {assignment.endDate}
                                                                        </div>
                                                                        <div className="shift-management-text-xs shift-management-text-gray-600">
                                                                            {durationDays} days
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <span className={`shift-management-badge shift-management-badge-${assignment.status === 'active' ? 'success' : assignment.status === 'completed' ? 'secondary' : 'warning'}`}>
                                                                        {assignment.status}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <div>
                                                                        <div className="shift-management-text-sm">{assignment.assignedBy}</div>
                                                                        <div className="shift-management-text-xs shift-management-text-gray-600">
                                                                            {assignment.assignedOn}
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="shift-management-flex shift-management-gap-2">
                                                                        <button className="shift-management-btn-icon">
                                                                            <Edit3 className="shift-management-icon-sm" />
                                                                        </button>
                                                                        <button className="shift-management-btn-icon shift-management-btn-icon-danger">
                                                                            <Trash2 className="shift-management-icon-sm" />
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
                                )}
                            </div>
                        )}

                        {/* Employees Tab */}
                        {activeTab === 'employees' && (
                            <div className="shift-management-tab-content">
                                {/* <div className="shift-management-section-header">
                                    <h2 className="shift-management-section-title">Employee Management</h2>
                                    <p className="shift-management-section-subtitle">
                                        View employee details and current shift assignments
                                    </p>
                                </div> */}

                                {/* Search and Filter */}
                                <div className="shift-management-filters">
                                    <div className="shift-management-search-container">
                                        <Search className="shift-management-search-icon" />
                                        <input
                                            type="text"
                                            placeholder="Search employees..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="shift-management-search-input"
                                        />
                                    </div>
                                    <select
                                        value={filterShift}
                                        onChange={(e) => setFilterShift(e.target.value)}
                                        className="shift-management-select"
                                    >
                                        <option value="all">All Shifts</option>
                                        {shifts.map(shift => (
                                            <option key={shift.id} value={shift.id}>{shift.name}</option>
                                        ))}
                                        <option value="unassigned">Unassigned</option>
                                    </select>
                                </div>

                                {/* Employee Grid */}
                                <div className="shift-management-grid shift-management-grid-cols-1 shift-management-md-grid-cols-2 shift-management-gap-6">
                                    {filteredEmployees.map((employee) => {
                                        const currentAssignment = assignments.find(
                                            a => a.employeeId === employee.id && a.status === 'active'
                                        );
                                        const currentShift = currentAssignment ? getShiftById(currentAssignment.shiftId) : null;

                                        return (
                                            <div key={employee.id} className="shift-management-card">
                                                <div className="shift-management-card-header">
                                                    <div className="shift-management-flex shift-management-items-center shift-management-gap-3">
                                                        <div className="shift-management-avatar">
                                                            {employee.name.split(' ').map(n => n[0]).join('')}
                                                        </div>
                                                        <div>
                                                            <h3 className="shift-management-card-title">{employee.name}</h3>
                                                            <p className="shift-management-text-sm shift-management-text-gray-600">
                                                                {employee.empNo} • {employee.designation}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="shift-management-card-content">
                                                    <div className="shift-management-space-y-2">
                                                        <div className="shift-management-flex shift-management-justify-between">
                                                            <span className="shift-management-text-sm shift-management-text-gray-600">Department:</span>
                                                            <span className="shift-management-text-sm">{employee.department}</span>
                                                        </div>
                                                        <div className="shift-management-flex shift-management-justify-between">
                                                            <span className="shift-management-text-sm shift-management-text-gray-600">Mobile:</span>
                                                            <span className="shift-management-text-sm">{employee.mobile}</span>
                                                        </div>
                                                        <div className="shift-management-flex shift-management-justify-between">
                                                            <span className="shift-management-text-sm shift-management-text-gray-600">Current Shift:</span>
                                                            {currentShift ? (
                                                                <div className="shift-management-flex shift-management-items-center shift-management-gap-2">
                                                                    <div
                                                                        className="shift-management-shift-indicator-sm"
                                                                        style={{ backgroundColor: currentShift.color }}
                                                                    />
                                                                    <span className="shift-management-text-sm">{currentShift.name}</span>
                                                                </div>
                                                            ) : (
                                                                <span className="shift-management-text-sm shift-management-text-gray-500">Not assigned</span>
                                                            )}
                                                        </div>
                                                        {currentAssignment && (
                                                            <div className="shift-management-flex shift-management-justify-between">
                                                                <span className="shift-management-text-sm shift-management-text-gray-600">Assignment:</span>
                                                                <span className="shift-management-text-xs shift-management-text-gray-500">
                                                                    Until {currentAssignment.endDate}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Create Shift Modal */}
                {showShiftModal && (
                    <div className="shift-management-modal-overlay">
                        <div className="shift-management-modal">
                            <div className="shift-management-modal-header">
                                <h3 className="shift-management-modal-title">Create New Shift</h3>
                                <button
                                    onClick={() => setShowShiftModal(false)}
                                    className="shift-management-modal-close"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="shift-management-modal-content">
                                <div className="shift-management-space-y-4">
                                    <div>
                                        <label className="shift-management-label">Shift Name</label>
                                        <input
                                            type="text"
                                            value={newShift.name}
                                            onChange={(e) => setNewShift({ ...newShift, name: e.target.value })}
                                            className="shift-management-input"
                                            placeholder="e.g., Morning Shift"
                                        />
                                    </div>
                                    <div className="shift-management-grid shift-management-grid-cols-2 shift-management-gap-4">
                                        <div>
                                            <label className="shift-management-label">Start Time</label>
                                            <input
                                                type="time"
                                                value={newShift.startTime}
                                                onChange={(e) => setNewShift({ ...newShift, startTime: e.target.value })}
                                                className="shift-management-input"
                                            />
                                        </div>
                                        <div>
                                            <label className="shift-management-label">End Time</label>
                                            <input
                                                type="time"
                                                value={newShift.endTime}
                                                onChange={(e) => setNewShift({ ...newShift, endTime: e.target.value })}
                                                className="shift-management-input"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="shift-management-label">Color</label>
                                        <input
                                            type="color"
                                            value={newShift.color}
                                            onChange={(e) => setNewShift({ ...newShift, color: e.target.value })}
                                            className="shift-management-color-input"
                                        />
                                    </div>
                                    <div>
                                        <label className="shift-management-label">Description</label>
                                        <textarea
                                            value={newShift.description}
                                            onChange={(e) => setNewShift({ ...newShift, description: e.target.value })}
                                            className="shift-management-textarea"
                                            rows={3}
                                            placeholder="Brief description of the shift"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="shift-management-modal-footer">
                                <button
                                    onClick={() => setShowShiftModal(false)}
                                    className="shift-management-btn shift-management-btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveShift}
                                    className="shift-management-btn shift-management-btn-primary"
                                >
                                    <Save className="shift-management-icon" />
                                    Create Shift
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Assign Employees Modal */}
                {showAssignModal && (
                    <div className="shift-management-modal-overlay">
                        <div className="shift-management-modal shift-management-modal-lg">
                            <div className="shift-management-modal-header">
                                <h3 className="shift-management-modal-title">Assign Employees to Shift</h3>
                                <button
                                    onClick={() => setShowAssignModal(false)}
                                    className="shift-management-modal-close"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="shift-management-modal-content">
                                <div className="shift-management-space-y-4">
                                    <div className="shift-management-grid shift-management-grid-cols-2 shift-management-gap-4">
                                        <div>
                                            <label className="shift-management-label">Select Shift</label>
                                            <select
                                                value={assignmentForm.shiftId}
                                                onChange={(e) => setAssignmentForm({ ...assignmentForm, shiftId: e.target.value })}
                                                className="shift-management-select"
                                            >
                                                <option value="">Choose a shift</option>
                                                {shifts.filter(s => s.isActive).map(shift => (
                                                    <option key={shift.id} value={shift.id}>
                                                        {shift.name} ({shift.startTime} - {shift.endTime})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="shift-management-label">Start Date</label>
                                            <input
                                                type="date"
                                                value={assignmentForm.startDate}
                                                onChange={(e) => setAssignmentForm({ ...assignmentForm, startDate: e.target.value })}
                                                className="shift-management-input"
                                                min={new Date().toISOString().split('T')[0]}
                                            />
                                        </div>
                                    </div>
                                    <div className="shift-management-grid shift-management-grid-cols-2 shift-management-gap-4">
                                        <div>
                                            <label className="shift-management-label">Duration (Days)</label>
                                            <select
                                                value={assignmentForm.duration}
                                                onChange={(e) => setAssignmentForm({ ...assignmentForm, duration: e.target.value })}
                                                className="shift-management-select"
                                            >
                                                <option value="7">7 Days (1 Week)</option>
                                                <option value="14">14 Days (2 Weeks)</option>
                                                <option value="15">15 Days</option>
                                                <option value="30">30 Days (1 Month)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="shift-management-label">Notes</label>
                                            <input
                                                type="text"
                                                value={assignmentForm.notes}
                                                onChange={(e) => setAssignmentForm({ ...assignmentForm, notes: e.target.value })}
                                                className="shift-management-input"
                                                placeholder="Optional notes"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="shift-management-label">
                                            Select Employees ({selectedEmployees.length} selected)
                                        </label>
                                        <div className="shift-management-employee-list">
                                            {employees.map((employee) => (
                                                <label key={employee.id} className="shift-management-checkbox-item">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedEmployees.includes(employee.id)}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setSelectedEmployees([...selectedEmployees, employee.id]);
                                                            } else {
                                                                setSelectedEmployees(selectedEmployees.filter(id => id !== employee.id));
                                                            }
                                                        }}
                                                        className="shift-management-checkbox"
                                                    />
                                                    <div className="shift-management-flex shift-management-items-center shift-management-gap-3">
                                                        <div className="shift-management-avatar-sm">
                                                            {employee.name.split(' ').map(n => n[0]).join('')}
                                                        </div>
                                                        <div>
                                                            <div className="shift-management-font-medium">{employee.name}</div>
                                                            <div className="shift-management-text-sm shift-management-text-gray-600">
                                                                {employee.empNo} • {employee.department}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="shift-management-modal-footer">
                                <button
                                    onClick={() => setShowAssignModal(false)}
                                    className="shift-management-btn shift-management-btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAssignEmployees}
                                    className="shift-management-btn shift-management-btn-primary"
                                    disabled={selectedEmployees.length === 0 || !assignmentForm.shiftId || !assignmentForm.startDate}
                                >
                                    <Save className="shift-management-icon" />
                                    Assign ({selectedEmployees.length}) Employees
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
