import React, { useState, useEffect } from 'react';
import './styles.css';

// Icons
const TruckIcon = ({ style }) => (
    <svg className="loading-charge-icon" style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
);

const PackageIcon = ({ style }) => (
    <svg className="loading-charge-icon" style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
);

const CalendarIcon = ({ style }) => (
    <svg className="leave-management-icon" style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const PlusIcon = () => (
    <svg className="leave-management-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
);

const FileTextIcon = () => (
    <svg className="leave-management-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const AlertCircleIcon = () => (
    <svg className="leave-management-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const CheckCircleIcon = () => (
    <svg className="leave-management-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const XCircleIcon = () => (
    <svg className="leave-management-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const DownloadIcon = () => (
    <svg className="leave-management-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const SaveIcon = () => (
    <svg className="leave-management-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
);

const Edit3Icon = () => (
    <svg className="leave-management-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);

const UsersIcon = ({ style = {} }) => (
    <svg className="leave-management-icon" style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
    </svg>
);

const ClockIcon = ({ style }) => (
    <svg className="loading-charge-icon" style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const WeightIcon = ({ style }) => (
    <svg className="loading-charge-icon" style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3.9 11.7c.2.6.8 1 1.4 1h7.4c.6 0 1.2-.4 1.4-1L21 7m-9-4h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V4a1 1 0 011-1z" />
    </svg>
);

const RupeeIcon = ({ style }) => (
    <svg className="loading-charge-icon" style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6M9 14h3m-3 4h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

// Sample data
const vehicleTypes = [
    { id: 'VT001', name: 'Truck 10 Wheeler', ratePerTon: 150, status: 'Active' },
    { id: 'VT002', name: 'Truck 12 Wheeler', ratePerTon: 180, status: 'Active' },
    { id: 'VT003', name: 'Truck 14 Wheeler', ratePerTon: 200, status: 'Inactive' },
    { id: 'VT004', name: 'Dumper 10 Cu.M', ratePerTon: 220, status: 'Active' },
];

const loadingPoints = [
    { id: 'LP001', name: 'Loading Point 1', location: 'Mine A' },
    { id: 'LP002', name: 'Loading Point 2', location: 'Mine B' },
    { id: 'LP003', name: 'Loading Point 3', location: 'Mine C' },
];

const materialTypes = [
    { id: 'MT001', name: 'Coal', unit: 'Ton' },
    { id: 'MT002', name: 'Iron Ore', unit: 'Ton' },
    { id: 'MT003', name: 'Bauxite', unit: 'Ton' },
    { id: 'MT004', name: 'Manganese', unit: 'Ton' },
];

export default function LoadingCharge() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showModal, setShowModal] = useState(false);
    const [currentMonthCharges, setCurrentMonthCharges] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [loadingCharges, setLoadingCharges] = useState([
        {
            id: 'LC001',
            vehicleType: 'Truck 10 Wheeler',
            vehicleNumber: 'JH05AB1234',
            driverName: 'Ramesh Kumar',
            loadingPoint: 'Loading Point 1',
            material: 'Coal',
            weight: 25.5,
            ratePerTon: 150,
            totalCharge: 3825,
            loadingDate: '2023-06-15',
            status: 'Completed'
        },
        {
            id: 'LC002',
            vehicleType: 'Truck 12 Wheeler',
            vehicleNumber: 'JH05CD5678',
            driverName: 'Suresh Yadav',
            loadingPoint: 'Loading Point 2',
            material: 'Iron Ore',
            weight: 30.0,
            ratePerTon: 200,
            totalCharge: 6000,
            loadingDate: '2023-06-16',
            status: 'Pending'
        }
    ]);

    const [formData, setFormData] = useState({
        id: '',
        vehicleType: '',
        vehicleNumber: '',
        driverName: '',
        loadingPoint: '',
        material: '',
        weight: '',
        ratePerTon: '',
        loadingDate: new Date().toISOString().split('T')[0],
        notes: ''
    });

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: CalendarIcon },
        { id: 'all', label: 'All Loadings', icon: FileTextIcon },
        { id: 'pending', label: 'Pending', icon: AlertCircleIcon },
        { id: 'completed', label: 'Completed', icon: CheckCircleIcon },
        { id: 'cancelled', label: 'Cancelled', icon: XCircleIcon },
        { id: 'reports', label: 'Reports', icon: DownloadIcon }
    ];

    // Calculate current month's total charges
    useEffect(() => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        const monthlyTotal = loadingCharges.reduce((total, charge) => {
            const chargeDate = new Date(charge.loadingDate);
            if (chargeDate.getMonth() === currentMonth && chargeDate.getFullYear() === currentYear) {
                return total + (parseFloat(charge.totalCharge) || 0);
            }
            return total;
        }, 0);

        setCurrentMonthCharges(monthlyTotal);
    }, [loadingCharges]);

    // Calculate pending charges
    const pendingCharges = loadingCharges
        .filter(charge => charge.status === 'Pending')
        .reduce((sum, charge) => sum + charge.totalCharge, 0);

    // Calculate completed charges
    const completedCharges = loadingCharges
        .filter(charge => charge.status === 'Completed')
        .reduce((sum, charge) => sum + charge.totalCharge, 0);

    // Filter loading charges based on search and date filter
    const filteredCharges = loadingCharges.filter(charge => {
        const matchesSearch =
            charge.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            charge.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            charge.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDate = dateFilter ? charge.loadingDate === dateFilter : true;

        return matchesSearch && matchesDate;
    });

    // Handle form input changes
    const handleInputChange = (field, value) => {
        const updatedForm = {
            ...formData,
            [field]: value
        };

        // Auto-calculate total charge when weight or rate changes
        if ((field === 'weight' || field === 'ratePerTon') &&
            updatedForm.weight && updatedForm.ratePerTon) {
            const weight = parseFloat(updatedForm.weight) || 0;
            const rate = parseFloat(updatedForm.ratePerTon) || 0;
            updatedForm.totalCharge = (weight * rate).toFixed(2);
        }

        setFormData(updatedForm);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic form validation
        const requiredFields = ['vehicleType', 'vehicleNumber', 'driverName', 'loadingPoint', 'material', 'weight', 'ratePerTon'];
        const missingFields = requiredFields.filter(field => !formData[field]);

        if (missingFields.length > 0) {
            alert(`Please fill in all required fields: ${missingFields.join(', ').replace(/([A-Z])/g, ' $1').toLowerCase()}`);
            return;
        }

        // Validate weight and rate
        const weight = parseFloat(formData.weight);
        const rate = parseFloat(formData.ratePerTon);

        if (isNaN(weight) || weight <= 0) {
            alert('Please enter a valid weight (must be greater than 0)');
            return;
        }

        if (isNaN(rate) || rate <= 0) {
            alert('Please enter a valid rate per ton (must be greater than 0)');
            return;
        }

        // Calculate total charge
        const totalCharge = calculateTotalCharge(weight, rate);

        // Create or update loading charge
        const updatedCharge = {
            ...formData,
            weight,
            ratePerTon: rate,
            totalCharge,
            loadingDate: formData.loadingDate || new Date().toISOString().split('T')[0],
            status: formData.status || 'Pending',
            timestamp: formData.timestamp || new Date().toISOString()
        };

        // Update or add to the list
        setLoadingCharges(prevCharges => {
            if (formData.id) {
                // Update existing charge
                return prevCharges.map(charge =>
                    charge.id === formData.id ? { ...updatedCharge } : charge
                );
            } else {
                // Add new charge with a new ID
                const newId = 'LC' + String(prevCharges.length + 1).padStart(4, '0');
                return [...prevCharges, { ...updatedCharge, id: newId }];
            }
        });

        // Reset form and show success message
        resetForm();
        setActiveTab('all');

        // Show success toast/message (you can replace this with a proper toast component)
        const successMessage = document.createElement('div');
        successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg';
        successMessage.textContent = `Loading charge ${formData.id ? 'updated' : 'added'} successfully!`;
        document.body.appendChild(successMessage);

        // Remove the message after 3 seconds
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 3000);
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            id: '',
            vehicleType: '',
            vehicleNumber: '',
            driverName: '',
            loadingPoint: '',
            material: '',
            weight: '',
            ratePerTon: '',
            loadingDate: new Date().toISOString().split('T')[0],
            notes: '',
            status: 'Pending',
            totalCharge: 0
        });
    };

    // Update charge status
    const updateChargeStatus = (id, status) => {
        setLoadingCharges(prev =>
            prev.map(charge =>
                charge.id === id ? { ...charge, status } : charge
            )
        );
    };

    // Get status badge
    const getStatusBadge = (status) => {
        const statusClasses = {
            'Completed': 'loading-charge-badge-completed',
            'In Progress': 'loading-charge-badge-inprogress',
            'Pending': 'loading-charge-badge-pending',
            'Cancelled': 'loading-charge-badge-cancelled'
        };

        return (
            <span className={`loading-charge-badge ${statusClasses[status] || ''}`}>
                {status}
            </span>
        );
    };

    // Calculate total charge
    const calculateTotalCharge = (weight, rate) => {
        return (parseFloat(weight) || 0) * (parseFloat(rate) || 0);
    };

    // Format date for display
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-IN', options);
    };

    // Format currency for display
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    };

    // Handle status update with confirmation
    const handleStatusUpdate = (id, newStatus) => {
        if (window.confirm(`Are you sure you want to mark this loading as ${newStatus}?`)) {
            updateChargeStatus(id, newStatus);
        }
    };

    // Handle vehicle type selection to auto-fill rate
    const handleVehicleTypeSelect = (vehicleTypeName) => {
        const selectedType = vehicleTypes.find(vt => vt.name === vehicleTypeName);
        if (selectedType) {
            setFormData(prev => ({
                ...prev,
                vehicleType: vehicleTypeName,
                ratePerTon: selectedType.ratePerTon,
                totalCharge: calculateTotalCharge(prev.weight || 0, selectedType.ratePerTon).toFixed(2)
            }));
        }
    };

    // Get status badge
    // Filter charges based on active tab, search term, and date filter
    const getFilteredCharges = () => {
        let filtered = [...loadingCharges];

        // Filter by tab
        if (activeTab === 'pending') {
            filtered = filtered.filter(charge => charge.status === 'Pending');
        } else if (activeTab === 'completed') {
            filtered = filtered.filter(charge => charge.status === 'Completed');
        } else if (activeTab === 'cancelled') {
            filtered = filtered.filter(charge => charge.status === 'Cancelled');
        }

        // Apply search filter
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(charge =>
                charge.vehicleNumber.toLowerCase().includes(searchLower) ||
                charge.driverName.toLowerCase().includes(searchLower) ||
                charge.id.toLowerCase().includes(searchLower) ||
                charge.vehicleType.toLowerCase().includes(searchLower) ||
                charge.loadingPoint.toLowerCase().includes(searchLower) ||
                charge.material.toLowerCase().includes(searchLower)
            );
        }

        // Apply date filter
        if (dateFilter) {
            filtered = filtered.filter(charge => charge.loadingDate === dateFilter);
        }

        return filtered;
    };

    const renderTabContent = () => {
        const filteredCharges = getFilteredCharges();

        switch (activeTab) {
            case 'dashboard':
                return (
                    <div className="loading-charge-dashboard">
                        {/* Summary Cards */}
                        <div className="summary-grid">
                            <div className="summary-card">
                                <div className="summary-icon bg-blue-100">
                                    <TruckIcon className="text-blue-600" />
                                </div>
                                <div className="summary-details">
                                    <h3>Total Loadings</h3>
                                    <p>{loadingCharges.length}</p>
                                </div>
                            </div>

                            <div className="summary-card">
                                <div className="summary-icon bg-green-100">
                                    <RupeeIcon className="text-green-600" />
                                </div>
                                <div className="summary-details">
                                    <h3>This Month's Revenue</h3>
                                    <p>{formatCurrency(currentMonthCharges)}</p>
                                </div>
                            </div>

                            <div className="summary-card">
                                <div className="summary-icon bg-yellow-100">
                                    <AlertCircleIcon className="text-yellow-600" />
                                </div>
                                <div className="summary-details">
                                    <h3>Pending Loadings</h3>
                                    <p>{loadingCharges.filter(lc => lc.status === 'Pending').length}</p>
                                </div>
                            </div>

                            <div className="summary-card">
                                <div className="summary-icon bg-green-100">
                                    <CheckCircleIcon className="text-green-600" />
                                </div>
                                <div className="summary-details">
                                    <h3>Completed Loadings</h3>
                                    <p>{loadingCharges.filter(lc => lc.status === 'Completed').length}</p>
                                </div>
                            </div>
                        </div>

                        {/* Recent Loadings Table */}
                        <div className="recent-loadings">
                            <div className="flex items-center justify-between table-header mb-2 w-full">
                                <div className="table-filters">
                                    <div className="search-box">
                                        <input
                                            type="text"
                                            placeholder="Search by vehicle, driver, or ID..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>

                                </div>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        resetForm();
                                        setActiveTab('new');
                                    }}
                                >
                                    <PlusIcon /> Add New Loading
                                </button>



                            </div>

                            <div className="table-responsive">
                                <table className="loading-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Date</th>
                                            <th>Vehicle</th>
                                            <th>Driver</th>
                                            <th>Material</th>
                                            <th>Weight (Tons)</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredCharges.length > 0 ? (
                                            filteredCharges.slice(0, 10).map(charge => (
                                                <tr key={charge.id}>
                                                    <td>{charge.id}</td>
                                                    <td>{formatDate(charge.loadingDate)}</td>
                                                    <td>{charge.vehicleNumber}</td>
                                                    <td>{charge.driverName}</td>
                                                    <td>{charge.material}</td>
                                                    <td>{charge.weight}</td>
                                                    <td>{formatCurrency(charge.totalCharge)}</td>
                                                    <td>{getStatusBadge(charge.status)}</td>
                                                    <td>
                                                        <div className="action-buttons" style={{ display: 'flex', gap: '0.5rem' }}>
                                                            {charge.status === 'Pending' && (
                                                                <>
                                                                    <div className="tooltip" data-tip="Edit Loading">
                                                                        <button
                                                                            className="btn btn-ghost btn-sm hover:bg-blue-50 text-blue-600"
                                                                            onClick={() => {
                                                                                setFormData({
                                                                                    ...charge,
                                                                                    ratePerTon: charge.ratePerTon.toString(),
                                                                                    weight: charge.weight.toString()
                                                                                });
                                                                                setActiveTab('new');
                                                                                // Scroll to top for better UX
                                                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                                                            }}
                                                                        >
                                                                            <Edit3Icon className="w-4 h-4" />
                                                                        </button>
                                                                    </div>
                                                                    <div className="tooltip" data-tip="Mark as Completed">
                                                                        <button
                                                                            className="btn btn-ghost btn-sm hover:bg-green-50 text-green-600"
                                                                            onClick={() => {
                                                                                if (window.confirm(`Are you sure you want to mark loading ${charge.id} as completed?`)) {
                                                                                    handleStatusUpdate(charge.id, 'Completed');
                                                                                }
                                                                            }}
                                                                        >
                                                                            <CheckCircleIcon className="w-4 h-4" />
                                                                        </button>
                                                                    </div>
                                                                    <div className="tooltip" data-tip="Cancel Loading">
                                                                        <button
                                                                            className="btn btn-ghost btn-sm hover:bg-red-50 text-red-600"
                                                                            onClick={() => {
                                                                                if (window.confirm(`Are you sure you want to cancel loading ${charge.id}? This action cannot be undone.`)) {
                                                                                    handleStatusUpdate(charge.id, 'Cancelled');
                                                                                }
                                                                            }}
                                                                        >
                                                                            <XCircleIcon className="w-4 h-4" />
                                                                        </button>
                                                                    </div>
                                                                </>
                                                            )}
                                                            {charge.status === 'Completed' && (
                                                                <>
                                                                    <div className="tooltip" data-tip="View Receipt">
                                                                        <button
                                                                            className="btn btn-ghost btn-sm hover:bg-blue-50 text-blue-600"
                                                                            onClick={() => {
                                                                                // View details or generate receipt
                                                                                alert(`Generating receipt for ${charge.id}...`);
                                                                                // In a real app, this would open a receipt modal or navigate to a receipt page
                                                                            }}
                                                                        >
                                                                            <FileTextIcon className="w-4 h-4" />
                                                                        </button>
                                                                    </div>
                                                                    <div className="tooltip" data-tip="Print Receipt">
                                                                        <button
                                                                            className="btn btn-ghost btn-sm hover:bg-gray-50 text-gray-600"
                                                                            onClick={() => {
                                                                                alert(`Printing receipt for ${charge.id}...`);
                                                                                // In a real app, this would trigger the browser's print dialog
                                                                                // window.print();
                                                                            }}
                                                                        >
                                                                            <DownloadIcon className="w-4 h-4" />
                                                                        </button>
                                                                    </div>
                                                                    <div className="tooltip" data-tip="Download PDF">
                                                                        <button
                                                                            className="btn btn-ghost btn-sm hover:bg-green-50 text-green-600"
                                                                            onClick={() => {
                                                                                alert(`Downloading PDF for ${charge.id}...`);
                                                                                // In a real app, this would trigger a PDF download
                                                                            }}
                                                                        >
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                </>
                                                            )}
                                                            {charge.status === 'Cancelled' && (
                                                                <div className="tooltip" data-tip="No actions available for cancelled loadings">
                                                                    <span className="text-gray-400 text-sm italic">No actions</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="9" className="text-center py-4">
                                                    No loading records found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    // Render the component
    return (
        <div className="loading-charge-container mt-20">
            <div className="loading-charge-header bg-white p-6 rounded-lg shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Loading Charge Management</h2>
                        <p className="text-gray-600 mt-1">Manage vehicle loading charges and generate reports</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <button
                            className="btn btn-primary flex items-center gap-2 px-4 py-2"
                            onClick={() => {
                                resetForm();
                                setActiveTab('new');
                            }}
                        >
                            <PlusIcon className="w-5 h-5" />
                            <span>New Loading</span>
                        </button>
                    </div>
                </div>

                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8 overflow-x-auto">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-blue-500' : 'text-gray-400'}`} />
                                <span>{tab.label}</span>
                                {tab.id === 'pending' && pendingCharges.length > 0 && (
                                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                        {pendingCharges.length}
                                    </span>
                                )}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            <div className="tab-content bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {loadingCharges.length === 0 && activeTab === 'history' ? (
                    <div className="empty-state">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3>No loading charges found</h3>
                        <p>Get started by creating a new loading entry</p>
                        <button
                            className="btn btn-primary mt-4"
                            onClick={() => setActiveTab('new')}
                        >
                            <PlusIcon />
                            <span>Create Loading Entry</span>
                        </button>
                    </div>
                ) : (
                    renderTabContent()
                )}
            </div>

            {/* Confirmation Modal */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Confirm Action</h3>
                        <p>Are you sure you want to perform this action?</p>
                        <div className="modal-actions">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    // Handle confirm action
                                    setShowModal(false);
                                }}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
