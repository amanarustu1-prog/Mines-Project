import React, { useState } from 'react';
import './VehicleServiceType.css';

// Icon components
const Settings = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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

const Download = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const List = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
);

const Wrench = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
    </svg>
);

// Types
interface ServiceType {
    id: string;
    name: string;
    description: string;
    status: 'active' | 'inactive';
}

interface ServiceGroup {
    id: string;
    name: string;
    code: string;
    description: string;
}

interface ServiceProcess {
    id: string;
    sno: number;
    serviceType: string;
    groupName: string;
    processName: string;
    description?: string;
    status: 'active' | 'inactive';
    createdDate: string;
}

export default function VehicleServiceType() {
    const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([
        {
            id: 'service-1',
            name: 'Engine Service',
            description: 'Complete engine maintenance and servicing',
            status: 'active'
        },
        {
            id: 'service-2',
            name: 'Brake Service',
            description: 'Brake system inspection and maintenance',
            status: 'active'
        },
        {
            id: 'service-3',
            name: 'Transmission Service',
            description: 'Transmission system servicing',
            status: 'active'
        }
    ]);

    const [serviceGroups] = useState<ServiceGroup[]>([
        {
            id: 'group-1',
            name: 'Preventive Maintenance',
            code: 'PM',
            description: 'Regular preventive maintenance services'
        },
        {
            id: 'group-2',
            name: 'Diagnostic',
            code: 'DG',
            description: 'Diagnostic and troubleshooting services'
        },
        {
            id: 'group-3',
            name: 'Repair',
            code: 'RP',
            description: 'Repair and replacement services'
        }
    ]);

    const [serviceProcesses, setServiceProcesses] = useState<ServiceProcess[]>([
        {
            id: 'process-1',
            sno: 2243,
            serviceType: 'Engine Service',
            groupName: 'DG',
            processName: 'TEST-1',
            description: 'Engine diagnostic test process',
            status: 'active',
            createdDate: '2025-07-18'
        }
    ]);

    const [newServiceType, setNewServiceType] = useState({
        name: '',
        description: '',
        status: 'active' as 'active' | 'inactive'
    });

    const [newServiceProcess, setNewServiceProcess] = useState({
        serviceType: '',
        groupName: '',
        processName: '',
        description: ''
    });

    const handleAddServiceType = () => {
        if (newServiceType.name.trim()) {
            const serviceType: ServiceType = {
                id: `service-${Date.now()}`,
                name: newServiceType.name,
                description: newServiceType.description,
                status: newServiceType.status
            };
            setServiceTypes([...serviceTypes, serviceType]);
            setNewServiceType({ name: '', description: '', status: 'active' });
        }
    };

    const handleSaveProcess = () => {
        if (newServiceProcess.serviceType && newServiceProcess.groupName && newServiceProcess.processName) {
            const process: ServiceProcess = {
                id: `process-${Date.now()}`,
                sno: Math.floor(Math.random() * 9000) + 1000,
                serviceType: newServiceProcess.serviceType,
                groupName: newServiceProcess.groupName,
                processName: newServiceProcess.processName,
                description: newServiceProcess.description,
                status: 'active',
                createdDate: new Date().toISOString().split('T')[0]
            };
            setServiceProcesses([...serviceProcesses, process]);
            setNewServiceProcess({ serviceType: '', groupName: '', processName: '', description: '' });
        }
    };

    const handleDeleteProcess = (id: string) => {
        setServiceProcesses(serviceProcesses.filter(process => process.id !== id));
    };

    return (
        <div className="vehicle-service-type">
            {/* Header */}
            <div className="vehicle-service-type-header">
                <div className="vehicle-service-type-header-content">
                    <div className="vehicle-service-type-title-section">
                        <Settings className="vehicle-service-type-header-icon" />
                        <div>
                            <h1 className="vehicle-service-type-title">Vehicle Service Type</h1>
                            <p className="vehicle-service-type-subtitle">
                                Manage vehicle service types and service process master details
                            </p>
                        </div>
                    </div>
                    <div className="vehicle-service-type-header-actions">
                        <button className="vehicle-service-type-btn vehicle-service-type-btn-secondary">
                            <Download className="vehicle-service-type-icon" />
                            Export
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="vehicle-service-type-main">
                <div className="vehicle-service-type-content">
                    <div className="vehicle-service-type-tab-content">
                        {/* Service Type Entry Section */}
                        <div className="vehicle-service-type-section-header">
                            <div>
                                <h2 className="vehicle-service-type-section-title">
                                    Vehicle Service Type and Service Process Master Details Entry Section
                                </h2>
                                <p className="vehicle-service-type-section-subtitle">
                                    Enter service type and configure service processes
                                </p>
                            </div>
                        </div>

                        {/* Service Type Form */}
                        <div className="vehicle-service-type-card">
                            <div className="vehicle-service-type-card-header">
                                <h3 className="vehicle-service-type-card-title">Enter Service Type</h3>
                            </div>
                            <div className="vehicle-service-type-card-content">
                                <div className="vehicle-service-type-form-grid">
                                    <div className="vehicle-service-type-form-group">
                                        <label className="vehicle-service-type-form-label">Service Type Name</label>
                                        <input
                                            type="text"
                                            className="vehicle-service-type-form-input"
                                            value={newServiceType.name}
                                            onChange={(e) => setNewServiceType({ ...newServiceType, name: e.target.value })}
                                            placeholder="Enter service type name"
                                        />
                                    </div>
                                    <div className="vehicle-service-type-form-group">
                                        <label className="vehicle-service-type-form-label">Status</label>
                                        <select
                                            className="vehicle-service-type-form-select"
                                            value={newServiceType.status}
                                            onChange={(e) => setNewServiceType({ ...newServiceType, status: e.target.value as 'active' | 'inactive' })}
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                    <div className="vehicle-service-type-form-group vehicle-service-type-form-group-full">
                                        <label className="vehicle-service-type-form-label">Description</label>
                                        <textarea
                                            className="vehicle-service-type-form-textarea"
                                            value={newServiceType.description}
                                            onChange={(e) => setNewServiceType({ ...newServiceType, description: e.target.value })}
                                            placeholder="Enter service type description"
                                            rows={3}
                                        />
                                    </div>
                                </div>
                                <div className="vehicle-service-type-form-actions">
                                    <button
                                        className="vehicle-service-type-btn vehicle-service-type-btn-primary"
                                        onClick={handleAddServiceType}
                                    >
                                        <Plus className="vehicle-service-type-icon" />
                                        Add Service Type
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Service Process Form */}
                        <div className="vehicle-service-type-card vehicle-service-type-mt-4">
                            <div className="vehicle-service-type-card-header">
                                <h3 className="vehicle-service-type-card-title">Service Process Configuration</h3>
                            </div>
                            <div className="vehicle-service-type-card-content">
                                <div className="vehicle-service-type-form-grid">
                                    <div className="vehicle-service-type-form-group">
                                        <label className="vehicle-service-type-form-label">Select Service Type</label>
                                        <select
                                            className="vehicle-service-type-form-select"
                                            value={newServiceProcess.serviceType}
                                            onChange={(e) => setNewServiceProcess({ ...newServiceProcess, serviceType: e.target.value })}
                                        >
                                            <option value="">Select Service Type</option>
                                            {serviceTypes.map(type => (
                                                <option key={type.id} value={type.name}>
                                                    {type.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="vehicle-service-type-form-group">
                                        <label className="vehicle-service-type-form-label">Select Group</label>
                                        <select
                                            className="vehicle-service-type-form-select"
                                            value={newServiceProcess.groupName}
                                            onChange={(e) => setNewServiceProcess({ ...newServiceProcess, groupName: e.target.value })}
                                        >
                                            <option value="">Select Group</option>
                                            {serviceGroups.map(group => (
                                                <option key={group.id} value={group.code}>
                                                    {group.code} - {group.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="vehicle-service-type-form-group">
                                        <label className="vehicle-service-type-form-label">Enter Process Name</label>
                                        <input
                                            type="text"
                                            className="vehicle-service-type-form-input"
                                            value={newServiceProcess.processName}
                                            onChange={(e) => setNewServiceProcess({ ...newServiceProcess, processName: e.target.value })}
                                            placeholder="Enter process name"
                                        />
                                    </div>
                                    <div className="vehicle-service-type-form-group vehicle-service-type-form-group-full">
                                        <label className="vehicle-service-type-form-label">Description</label>
                                        <textarea
                                            className="vehicle-service-type-form-textarea"
                                            value={newServiceProcess.description}
                                            onChange={(e) => setNewServiceProcess({ ...newServiceProcess, description: e.target.value })}
                                            placeholder="Enter process description"
                                            rows={3}
                                        />
                                    </div>
                                </div>
                                <div className="vehicle-service-type-form-actions">
                                    <button
                                        className="vehicle-service-type-btn vehicle-service-type-btn-primary"
                                        onClick={handleSaveProcess}
                                    >
                                        <Save className="vehicle-service-type-icon" />
                                        Save Process & Service
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Service Process List */}
                        <div className="vehicle-service-type-card vehicle-service-type-mt-4">
                            <div className="vehicle-service-type-card-header">
                                <h3 className="vehicle-service-type-card-title">Service Process List</h3>
                            </div>
                            <div className="vehicle-service-type-card-content">
                                <div className="vehicle-service-type-table-container">
                                    <table className="vehicle-service-type-table">
                                        <thead>
                                            <tr>
                                                <th>S.No</th>
                                                <th>Service Type</th>
                                                <th>Group Name</th>
                                                <th>Process Name</th>
                                                <th>Description</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {serviceProcesses.map((process) => (
                                                <tr key={process.id}>
                                                    <td>{process.sno}</td>
                                                    <td>{process.serviceType}</td>
                                                    <td>{process.groupName}</td>
                                                    <td>{process.processName}</td>
                                                    <td>{process.description || '-'}</td>
                                                    <td>
                                                        <span className={`vehicle-service-type-badge ${process.status === 'active'
                                                            ? 'vehicle-service-type-badge-success'
                                                            : 'vehicle-service-type-badge-error'
                                                            }`}>
                                                            {process.status}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="vehicle-service-type-flex vehicle-service-type-gap-2">
                                                            <button
                                                                className="vehicle-service-type-btn vehicle-service-type-btn-secondary"
                                                                style={{ padding: '0.5rem' }}
                                                            >
                                                                <Edit3 className="vehicle-service-type-icon-sm" />
                                                            </button>
                                                            <button
                                                                className="vehicle-service-type-btn vehicle-service-type-btn-secondary"
                                                                style={{ padding: '0.5rem', color: '#dc2626' }}
                                                                onClick={() => handleDeleteProcess(process.id)}
                                                            >
                                                                <Trash2 className="vehicle-service-type-icon-sm" />
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
                </div>
            </div>
        </div>
    );
}
