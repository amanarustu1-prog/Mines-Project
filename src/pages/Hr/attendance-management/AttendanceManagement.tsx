import React, { useState } from 'react';
import './styles.css';

// Icons as simple SVG components
const ClockIcon = ({ style }: { style?: React.CSSProperties }) => (
    <svg className="attendance-management-icon" style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const PlusIcon = () => (
    <svg className="attendance-management-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
);

const FileTextIcon = () => (
    <svg className="attendance-management-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const UsersIcon = ({ style }: { style?: React.CSSProperties }) => (
    <svg className="attendance-management-icon" style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
    </svg>
);

const CalendarIcon = () => (
    <svg className="attendance-management-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const CheckCircleIcon = () => (
    <svg className="attendance-management-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const XCircleIcon = () => (
    <svg className="attendance-management-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const AlertCircleIcon = () => (
    <svg className="attendance-management-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const DownloadIcon = () => (
    <svg className="attendance-management-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const SaveIcon = () => (
    <svg className="attendance-management-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
);

const Edit3Icon = () => (
    <svg className="attendance-management-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);

const TrendingUpIcon = ({ style }: { style?: React.CSSProperties }) => (
    <svg className="attendance-management-icon" style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);

export default function AttendanceManagement() {
    const [activeTab, setActiveTab] = useState('attendance-overview');

    // Sample attendance data
    const [attendanceData, setAttendanceData] = useState([
        {
            id: 1,
            empNo: 'SSC001',
            name: 'SHUBHAM',
            fatherName: 'ASHOK',
            mobile: '9057241344',
            email: 'SHUBHAM@TIWARIMININGGROUP.COM',
            date: '2025-01-20',
            timeIn: '09:00',
            timeOut: '18:30',
            totalHours: '09:30',
            otHours: '01:30',
            status: 'Present',
            remarks: 'Regular attendance'
        },
        {
            id: 2,
            empNo: 'SSC002',
            name: 'RAHUL KUMAR',
            fatherName: 'RAM KUMAR',
            mobile: '9057241345',
            email: 'RAHUL@TIWARIMININGGROUP.COM',
            date: '2025-01-20',
            timeIn: '09:15',
            timeOut: '18:00',
            totalHours: '08:45',
            otHours: '00:00',
            status: 'Late',
            remarks: 'Late arrival'
        },
        {
            id: 3,
            empNo: 'SSC003',
            name: 'PRIYA SHARMA',
            fatherName: 'SURESH SHARMA',
            mobile: '9057241346',
            email: 'PRIYA@TIWARIMININGGROUP.COM',
            date: '2025-01-20',
            timeIn: '09:00',
            timeOut: '13:00',
            totalHours: '04:00',
            otHours: '00:00',
            status: 'Half Day',
            remarks: 'Medical appointment'
        }
    ]);

    // New attendance form data
    const [newAttendance, setNewAttendance] = useState({
        empNo: 'SSC001',
        name: 'SHUBHAM',
        fatherName: 'ASHOK',
        mobile: '9057241344',
        email: 'SHUBHAM@TIWARIMININGGROUP.COM',
        date: new Date().toISOString().split('T')[0],
        timeIn: '',
        timeOut: '',
        totalHours: '00:00',
        otHours: '00:00',
        status: 'Present',
        remarks: ''
    });

    const tabs = [
        { id: 'attendance-overview', label: 'Attendance Overview', icon: ClockIcon },
        { id: 'add-attendance', label: 'Add Attendance', icon: PlusIcon },
        { id: 'attendance-reports', label: 'Reports', icon: FileTextIcon }
    ];

    const employees = [
        { empNo: 'SSC001', name: 'SHUBHAM', fatherName: 'ASHOK', mobile: '9057241344', email: 'SHUBHAM@TIWARIMININGGROUP.COM' },
        { empNo: 'SSC002', name: 'RAHUL KUMAR', fatherName: 'RAM KUMAR', mobile: '9057241345', email: 'RAHUL@TIWARIMININGGROUP.COM' },
        { empNo: 'SSC003', name: 'PRIYA SHARMA', fatherName: 'SURESH SHARMA', mobile: '9057241346', email: 'PRIYA@TIWARIMININGGROUP.COM' }
    ];

    const handleEmployeeSelect = (empNo: string) => {
        const employee = employees.find(emp => emp.empNo === empNo);
        if (employee) {
            setNewAttendance(prev => ({
                ...prev,
                empNo: employee.empNo,
                name: employee.name,
                fatherName: employee.fatherName,
                mobile: employee.mobile,
                email: employee.email
            }));
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setNewAttendance(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const calculateTotalHours = () => {
        if (newAttendance.timeIn && newAttendance.timeOut) {
            const timeIn = new Date(`2000-01-01 ${newAttendance.timeIn}`);
            const timeOut = new Date(`2000-01-01 ${newAttendance.timeOut}`);

            if (timeOut > timeIn) {
                const diffMs = timeOut.getTime() - timeIn.getTime();
                const hours = Math.floor(diffMs / (1000 * 60 * 60));
                const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            }
        }
        return '00:00';
    };

    const calculateOTHours = () => {
        const totalHours = calculateTotalHours();
        if (totalHours !== '00:00') {
            const [hours, minutes] = totalHours.split(':').map(Number);
            const totalMinutes = hours * 60 + minutes;
            const regularMinutes = 8 * 60; // 8 hours regular work

            if (totalMinutes > regularMinutes) {
                const otMinutes = totalMinutes - regularMinutes;
                const otHours = Math.floor(otMinutes / 60);
                const otMins = otMinutes % 60;
                return `${otHours.toString().padStart(2, '0')}:${otMins.toString().padStart(2, '0')}`;
            }
        }
        return '00:00';
    };

    const handleSaveAttendance = () => {
        const totalHours = calculateTotalHours();
        const otHours = calculateOTHours();

        const newEntry = {
            id: attendanceData.length + 1,
            ...newAttendance,
            totalHours,
            otHours
        };

        setAttendanceData(prev => [...prev, newEntry]);
        setNewAttendance({
            empNo: 'SSC001',
            name: 'SHUBHAM',
            fatherName: 'ASHOK',
            mobile: '9057241344',
            email: 'SHUBHAM@TIWARIMININGGROUP.COM',
            date: new Date().toISOString().split('T')[0],
            timeIn: '',
            timeOut: '',
            totalHours: '00:00',
            otHours: '00:00',
            status: 'Present',
            remarks: ''
        });
        alert('Attendance saved successfully!');
    };

    const getStatusBadge = (status: string) => {
        const className = `attendance-management-badge attendance-management-badge-${status.toLowerCase().replace(' ', '-')}`;
        return <span className={className}>{status}</span>;
    };

    const getTimeBadge = (time: string, type: 'in' | 'out') => {
        const className = `attendance-management-time-badge attendance-management-time-badge-${type}`;
        return <span className={className}>{time}</span>;
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'attendance-overview':
                return (
                    <div className="attendance-management-space-y-4 container ">
                        {/* Attendance Summary Cards */}
                        <div className="attendance-management-summary-grid ">
                            <div className="attendance-management-summary-card">
                                <div className="attendance-management-summary-content">
                                    <div className="attendance-management-summary-item">
                                        <div className="attendance-management-icon-container attendance-management-icon-green">
                                            <CheckCircleIcon />
                                        </div>
                                        <div>
                                            <p className="attendance-management-metric-label">Present Today</p>
                                            <p className="attendance-management-metric-value attendance-management-metric-green">
                                                {attendanceData.filter(att => att.status === 'Present' && att.date === new Date().toISOString().split('T')[0]).length}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="attendance-management-summary-card">
                                <div className="attendance-management-summary-content">
                                    <div className="attendance-management-summary-item">
                                        <div className="attendance-management-icon-container attendance-management-icon-red">
                                            <XCircleIcon />
                                        </div>
                                        <div>
                                            <p className="attendance-management-metric-label">Absent Today</p>
                                            <p className="attendance-management-metric-value attendance-management-metric-red">
                                                {attendanceData.filter(att => att.status === 'Absent' && att.date === new Date().toISOString().split('T')[0]).length}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="attendance-management-summary-card">
                                <div className="attendance-management-summary-content">
                                    <div className="attendance-management-summary-item">
                                        <div className="attendance-management-icon-container attendance-management-icon-yellow">
                                            <AlertCircleIcon />
                                        </div>
                                        <div>
                                            <p className="attendance-management-metric-label">Late Arrivals</p>
                                            <p className="attendance-management-metric-value attendance-management-metric-yellow">
                                                {attendanceData.filter(att => att.status === 'Late' && att.date === new Date().toISOString().split('T')[0]).length}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="attendance-management-summary-card">
                                <div className="attendance-management-summary-content">
                                    <div className="attendance-management-summary-item">
                                        <div className="attendance-management-icon-container attendance-management-icon-blue">
                                            <ClockIcon />
                                        </div>
                                        <div>
                                            <p className="attendance-management-metric-label">Total Records</p>
                                            <p className="attendance-management-metric-value attendance-management-metric-blue">{attendanceData.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Attendance Records Table */}
                        <div className="attendance-management-card">
                            <div className="attendance-management-card-header">
                                <h3 className="attendance-management-card-title">
                                    <ClockIcon />
                                    Daily Attendance Records - {new Date().getFullYear()}
                                </h3>
                                <button
                                    className="attendance-management-button attendance-management-button-primary attendance-management-button-sm"
                                    onClick={() => setActiveTab('add-attendance')}
                                >
                                    <PlusIcon />
                                    Add Attendance
                                </button>
                            </div>
                            <div className="attendance-management-card-content" style={{ padding: 0 }}>
                                <div className="attendance-management-table-container">
                                    <table className="attendance-management-table">
                                        <thead>
                                            <tr>
                                                <th>Emp No</th>
                                                <th>Employee Name</th>
                                                <th>Date</th>
                                                <th>Time In</th>
                                                <th>Time Out</th>
                                                <th>Total Hours</th>
                                                <th>OT Hours</th>
                                                <th>Status</th>
                                                <th>Remarks</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {attendanceData.map((attendance) => (
                                                <tr key={attendance.id}>
                                                    <td className="attendance-management-font-medium attendance-management-text-blue-600">{attendance.empNo}</td>
                                                    <td className="attendance-management-font-medium">{attendance.name}</td>
                                                    <td className="attendance-management-font-mono">{new Date(attendance.date).toLocaleDateString('en-GB')}</td>
                                                    <td>{getTimeBadge(attendance.timeIn, 'in')}</td>
                                                    <td>{getTimeBadge(attendance.timeOut, 'out')}</td>
                                                    <td className="attendance-management-font-mono attendance-management-font-medium">{attendance.totalHours}</td>
                                                    <td className="attendance-management-font-mono attendance-management-text-green-600 attendance-management-font-medium">{attendance.otHours}</td>
                                                    <td>{getStatusBadge(attendance.status)}</td>
                                                    <td className="attendance-management-text-gray-600 attendance-management-max-w-32 attendance-management-truncate" title={attendance.remarks}>
                                                        {attendance.remarks}
                                                    </td>
                                                    <td>
                                                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                                                            <button className="attendance-management-button-ghost">
                                                                <Edit3Icon />
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
                );

            case 'add-attendance':
                return (
                    <div className="attendance-management-space-y-4 container">
                        <div className="attendance-management-card">
                            <div className="attendance-management-card-header">
                                <h3 className="attendance-management-card-title">
                                    <PlusIcon />
                                    HR Module: Attendance Entry Form
                                </h3>
                            </div>
                            <div className="attendance-management-card-content attendance-management-space-y-6">
                                {/* Employee Selection */}
                                <div className="attendance-management-grid attendance-management-grid-cols-1 attendance-management-md-grid-cols-2 attendance-management-gap-6">
                                    <div className="attendance-management-space-y-4">
                                        <div className="attendance-management-form-group">
                                            <label className="attendance-management-label">Select Employee Name ***</label>
                                            <select
                                                value={newAttendance.empNo}
                                                onChange={(e) => handleEmployeeSelect(e.target.value)}
                                                className="attendance-management-select"
                                            >
                                                {employees.map(emp => (
                                                    <option key={emp.empNo} value={emp.empNo}>
                                                        {emp.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="attendance-management-form-group">
                                            <label className="attendance-management-label">Attendance Date:-</label>
                                            <input
                                                type="date"
                                                value={newAttendance.date}
                                                onChange={(e) => handleInputChange('date', e.target.value)}
                                                className="attendance-management-input"
                                            />
                                        </div>

                                        <div className="attendance-management-form-group">
                                            <label className="attendance-management-label">Time In:-</label>
                                            <input
                                                type="time"
                                                value={newAttendance.timeIn}
                                                onChange={(e) => handleInputChange('timeIn', e.target.value)}
                                                className="attendance-management-input"
                                            />
                                        </div>

                                        <div className="attendance-management-form-group">
                                            <label className="attendance-management-label">Time Out:-</label>
                                            <input
                                                type="time"
                                                value={newAttendance.timeOut}
                                                onChange={(e) => handleInputChange('timeOut', e.target.value)}
                                                className="attendance-management-input"
                                            />
                                        </div>

                                        <div className="attendance-management-form-group">
                                            <label className="attendance-management-label">Status:-</label>
                                            <select
                                                value={newAttendance.status}
                                                onChange={(e) => handleInputChange('status', e.target.value)}
                                                className="attendance-management-select"
                                            >
                                                <option value="Present">Present</option>
                                                <option value="Absent">Absent</option>
                                                <option value="Late">Late</option>
                                                <option value="Half Day">Half Day</option>
                                                <option value="Holiday">Holiday</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="attendance-management-space-y-4">
                                        <div className="attendance-management-form-group">
                                            <label className="attendance-management-label">Employee Name</label>
                                            <input
                                                value={newAttendance.name}
                                                readOnly
                                                className="attendance-management-input attendance-management-font-medium"
                                            />
                                        </div>

                                        <div className="attendance-management-form-group">
                                            <label className="attendance-management-label">Father Name</label>
                                            <input
                                                value={newAttendance.fatherName}
                                                readOnly
                                                className="attendance-management-input"
                                            />
                                        </div>

                                        <div className="attendance-management-form-group">
                                            <label className="attendance-management-label">Mobile</label>
                                            <input
                                                value={newAttendance.mobile}
                                                readOnly
                                                className="attendance-management-input"
                                            />
                                        </div>

                                        <div className="attendance-management-form-group">
                                            <label className="attendance-management-label">Email</label>
                                            <input
                                                value={newAttendance.email}
                                                readOnly
                                                className="attendance-management-input attendance-management-text-xs"
                                            />
                                        </div>

                                        <div className="attendance-management-form-group">
                                            <label className="attendance-management-label">Total Hours</label>
                                            <input
                                                value={calculateTotalHours()}
                                                readOnly
                                                className="attendance-management-input attendance-management-font-medium attendance-management-font-mono"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Calculation Summary */}
                                <div className="attendance-management-stats-container">
                                    <h4 className="attendance-management-stats-title">Time Calculation Summary</h4>
                                    <div className="attendance-management-stats-grid">
                                        <div className="attendance-management-stat-item">
                                            <div className="attendance-management-stat-value attendance-management-text-blue-600">{calculateTotalHours()}</div>
                                            <div className="attendance-management-stat-label" style={{ color: '#1d4ed8' }}>Total Hours</div>
                                        </div>
                                        <div className="attendance-management-stat-item">
                                            <div className="attendance-management-stat-value" style={{ color: '#059669' }}>{calculateOTHours()}</div>
                                            <div className="attendance-management-stat-label" style={{ color: '#047857' }}>OT Hours</div>
                                        </div>
                                        <div className="attendance-management-stat-item">
                                            <div className="attendance-management-stat-value" style={{ color: '#d97706' }}>08:00</div>
                                            <div className="attendance-management-stat-label" style={{ color: '#b45309' }}>Regular Hours</div>
                                        </div>
                                        <div className="attendance-management-stat-item">
                                            <div className="attendance-management-stat-value" style={{ color: '#7c3aed' }}>{newAttendance.status}</div>
                                            <div className="attendance-management-stat-label" style={{ color: '#6d28d9' }}>Status</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Remarks Section */}
                                <div className="attendance-management-border-t attendance-management-pt-6">
                                    <div className="attendance-management-form-group">
                                        <label className="attendance-management-label">Remarks</label>
                                        <textarea
                                            value={newAttendance.remarks}
                                            onChange={(e) => handleInputChange('remarks', e.target.value)}
                                            className="attendance-management-input attendance-management-textarea"
                                            rows={3}
                                            placeholder="Add any remarks about attendance..."
                                        />
                                    </div>

                                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
                                        <button
                                            onClick={handleSaveAttendance}
                                            className="attendance-management-button attendance-management-button-success"
                                            disabled={!newAttendance.timeIn || !newAttendance.timeOut}
                                        >
                                            <SaveIcon />
                                            Save Attendance Details
                                        </button>
                                        <button
                                            className="attendance-management-button attendance-management-button-outline"
                                            onClick={() => setActiveTab('attendance-overview')}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'attendance-reports':
                return (
                    <div className="attendance-management-space-y-4 container">
                        <div className="attendance-management-card">
                            <div className="attendance-management-card-header">
                                <h3 className="attendance-management-card-title">
                                    <FileTextIcon />
                                    Attendance Reports & Analytics
                                </h3>
                            </div>
                            <div className="attendance-management-card-content attendance-management-space-y-4">
                                <div className="attendance-management-report-grid">
                                    <div className="attendance-management-report-card">
                                        <ClockIcon style={{ width: '2rem', height: '2rem', color: '#2563eb', margin: '0 auto 0.5rem' }} />
                                        <h3 className="attendance-management-font-semibold attendance-management-text-gray-900">Daily Attendance Report</h3>
                                        <p className="attendance-management-text-sm attendance-management-text-gray-600" style={{ marginBottom: '0.75rem' }}>Generate daily attendance summary</p>
                                        <button className="attendance-management-button attendance-management-button-outline attendance-management-button-sm">
                                            <DownloadIcon />
                                            Download
                                        </button>
                                    </div>

                                    <div className="attendance-management-report-card">
                                        <UsersIcon style={{ width: '2rem', height: '2rem', color: '#059669', margin: '0 auto 0.5rem' }} />
                                        <h3 className="attendance-management-font-semibold attendance-management-text-gray-900">Employee Wise Report</h3>
                                        <p className="attendance-management-text-sm attendance-management-text-gray-600" style={{ marginBottom: '0.75rem' }}>Individual employee attendance</p>
                                        <button className="attendance-management-button attendance-management-button-outline attendance-management-button-sm">
                                            <DownloadIcon />
                                            Download
                                        </button>
                                    </div>

                                    <div className="attendance-management-report-card">
                                        <TrendingUpIcon style={{ width: '2rem', height: '2rem', color: '#d97706', margin: '0 auto 0.5rem' }} />
                                        <h3 className="attendance-management-font-semibold attendance-management-text-gray-900">Overtime Analysis</h3>
                                        <p className="attendance-management-text-sm attendance-management-text-gray-600" style={{ marginBottom: '0.75rem' }}>OT hours and analysis</p>
                                        <button className="attendance-management-button attendance-management-button-outline attendance-management-button-sm">
                                            <DownloadIcon />
                                            Download
                                        </button>
                                    </div>
                                </div>

                                <div className="attendance-management-stats-container">
                                    <h4 className="attendance-management-stats-title">Attendance Statistics</h4>
                                    <div className="attendance-management-stats-grid">
                                        <div className="attendance-management-stat-item">
                                            <div className="attendance-management-stat-value attendance-management-text-blue-600">
                                                {attendanceData.reduce((sum, att) => {
                                                    const [hours, minutes] = att.totalHours.split(':').map(Number);
                                                    return sum + hours + minutes / 60;
                                                }, 0).toFixed(1)}h
                                            </div>
                                            <div className="attendance-management-stat-label" style={{ color: '#1d4ed8' }}>Total Work Hours</div>
                                        </div>
                                        <div className="attendance-management-stat-item">
                                            <div className="attendance-management-stat-value" style={{ color: '#059669' }}>
                                                {attendanceData.reduce((sum, att) => {
                                                    const [hours, minutes] = att.otHours.split(':').map(Number);
                                                    return sum + hours + minutes / 60;
                                                }, 0).toFixed(1)}h
                                            </div>
                                            <div className="attendance-management-stat-label" style={{ color: '#047857' }}>Total OT Hours</div>
                                        </div>
                                        <div className="attendance-management-stat-item">
                                            <div className="attendance-management-stat-value" style={{ color: '#d97706' }}>
                                                {Math.round((attendanceData.filter(att => att.status === 'Present').length / attendanceData.length) * 100)}%
                                            </div>
                                            <div className="attendance-management-stat-label" style={{ color: '#b45309' }}>Attendance Rate</div>
                                        </div>
                                        <div className="attendance-management-stat-item">
                                            <div className="attendance-management-stat-value" style={{ color: '#7c3aed' }}>
                                                {attendanceData.filter(att => att.status === 'Late').length}
                                            </div>
                                            <div className="attendance-management-stat-label" style={{ color: '#6d28d9' }}>Late Arrivals</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="attendance-management-container container">
            {/* Header */}
            <div className="attendance-management-header">
                <div className="attendance-management-header-content">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div className="attendance-management-logo">
                            <ClockIcon style={{ color: 'white' }} />
                        </div>
                        <div>
                            <h1 className="attendance-management-title">Attendance Management</h1>
                            <p className="attendance-management-subtitle">Employee attendance tracking and management system</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="attendance-management-button attendance-management-button-outline attendance-management-button-sm">
                            <DownloadIcon />
                            Export
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Container */}
            <div className="attendance-management-main">

                {/* Tab Navigation */}
                <div className="attendance-management-tabs">
                    <div className="attendance-management-tabs-container">
                        <nav className="attendance-management-nav">
                            <div className="attendance-management-tab-list">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`attendance-management-tab-button ${activeTab === tab.id ? 'active' : ''
                                            }`}
                                    >
                                        <tab.icon />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </nav>
                    </div>
                </div>

                {/* Content Area */}
                {renderTabContent()}
            </div>
        </div>
    );
}
