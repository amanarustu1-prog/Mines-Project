import React, { useState } from 'react';
import './VehicleJobCompletion.css';

// Icon components
const Wrench = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const CheckCircle = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const Save = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
);

const Calendar = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const FileText = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const User = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const Package = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
);

const Gauge = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

// Types
interface JobCompletionEntry {
    id: string;
    jobNo: string;
    regNo: string;
    cdt: string;
    mechanic: string;
    complaint: string;
    supervisorName: string;
    serviceType: string;
    procedureDetails: string;
    completionDate: string;
    meterReading: number;
    actionTaken: string;
    itemsReturned: string;
    remarks: string;
    createdDate: string;
    modifiedDate: string;
}

// Sample data
const sampleJobData: JobCompletionEntry[] = [
    {
        id: '1',
        jobNo: '1',
        regNo: 'DG-18',
        cdt: '12/May/22 12:00',
        mechanic: 'PAIS',
        complaint: 'KVA',
        supervisorName: '',
        serviceType: '',
        procedureDetails: '',
        completionDate: '',
        meterReading: 0.00,
        actionTaken: '',
        itemsReturned: '',
        remarks: '',
        createdDate: '2022-05-12',
        modifiedDate: '2022-05-12'
    }
];

export default function VehicleJobCompletion() {
    const [selectedJobNo, setSelectedJobNo] = useState('');
    const [jobDetails, setJobDetails] = useState<JobCompletionEntry | null>(null);
    const [formData, setFormData] = useState<Partial<JobCompletionEntry>>({
        completionDate: '',
        meterReading: 0,
        actionTaken: '',
        itemsReturned: '',
        remarks: ''
    });

    const handleJobSelect = (jobNo: string) => {
        setSelectedJobNo(jobNo);
        const job = sampleJobData.find(j => j.jobNo === jobNo);
        if (job) {
            setJobDetails(job);
            setFormData({
                completionDate: job.completionDate,
                meterReading: job.meterReading,
                actionTaken: job.actionTaken,
                itemsReturned: job.itemsReturned,
                remarks: job.remarks
            });
        }
    };

    const handleInputChange = (field: keyof JobCompletionEntry, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        if (jobDetails && selectedJobNo) {
            // Update job completion details
            const updatedJob = {
                ...jobDetails,
                ...formData,
                modifiedDate: new Date().toISOString().split('T')[0]
            };

            // Here you would typically save to your backend
            console.log('Saving job completion:', updatedJob);

            // Reset form
            setFormData({
                completionDate: '',
                meterReading: 0,
                actionTaken: '',
                itemsReturned: '',
                remarks: ''
            });
            setSelectedJobNo('');
            setJobDetails(null);
        }
    };

    const getCurrentDateTime = () => {
        const now = new Date();
        return now.toISOString().slice(0, 16);
    };

    return (
        <div className="vehicle-job-completion">
            {/* Header */}
            <div className="vehicle-job-completion-header">
                <div className="vehicle-job-completion-header-content">
                    <div className="vehicle-job-completion-title-section">
                        <Wrench className="vehicle-job-completion-header-icon" />
                        <div>
                            <h1 className="vehicle-job-completion-title">Vehicle Job Completion</h1>
                            <p className="vehicle-job-completion-subtitle">Complete and track vehicle maintenance job details</p>
                        </div>
                    </div>
                    <div className="vehicle-job-completion-header-actions">
                        <button className="vehicle-job-completion-btn vehicle-job-completion-btn-secondary">
                            <FileText className="vehicle-job-completion-icon" />
                            Reports
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="vehicle-job-completion-main">
                <div className="vehicle-job-completion-content">
                    <div className="vehicle-job-completion-tab-content">

                        {/* Section Header */}
                        <div className="vehicle-job-completion-section-header">
                            <div>
                                <h2 className="vehicle-job-completion-section-title">Vehicle Job Completion Details Entry</h2>
                                <p className="vehicle-job-completion-section-subtitle">Complete vehicle maintenance and repair job details</p>
                            </div>
                        </div>

                        {/* Job Selection */}
                        <div className="vehicle-job-completion-form-section">
                            <div className="vehicle-job-completion-form-grid">
                                <div className="vehicle-job-completion-form-group">
                                    <label className="vehicle-job-completion-form-label">
                                        <CheckCircle className="vehicle-job-completion-icon-sm" />
                                        Select Job No.
                                    </label>
                                    <select
                                        className="vehicle-job-completion-form-select"
                                        value={selectedJobNo}
                                        onChange={(e) => handleJobSelect(e.target.value)}
                                    >
                                        <option value="">Select Job Number</option>
                                        {sampleJobData.map(job => (
                                            <option key={job.id} value={job.jobNo}>
                                                Job #{job.jobNo} - {job.regNo}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Job Details Display */}
                            {jobDetails && (
                                <>
                                    <div className="vehicle-job-completion-section-divider">
                                        <h3>Job Information</h3>
                                    </div>

                                    <div className="vehicle-job-completion-job-details">
                                        <div className="vehicle-job-completion-details-grid">
                                            <div className="vehicle-job-completion-detail-item">
                                                <span className="vehicle-job-completion-detail-label">Job No:</span>
                                                <span className="vehicle-job-completion-detail-value">{jobDetails.jobNo}</span>
                                            </div>
                                            <div className="vehicle-job-completion-detail-item">
                                                <span className="vehicle-job-completion-detail-label">Reg No:</span>
                                                <span className="vehicle-job-completion-detail-value">{jobDetails.regNo}</span>
                                            </div>
                                            <div className="vehicle-job-completion-detail-item">
                                                <span className="vehicle-job-completion-detail-label">CDt:</span>
                                                <span className="vehicle-job-completion-detail-value">{jobDetails.cdt}</span>
                                            </div>
                                            <div className="vehicle-job-completion-detail-item">
                                                <span className="vehicle-job-completion-detail-label">Mechanic:</span>
                                                <span className="vehicle-job-completion-detail-value">{jobDetails.mechanic}</span>
                                            </div>
                                            <div className="vehicle-job-completion-detail-item">
                                                <span className="vehicle-job-completion-detail-label">Complaint:</span>
                                                <span className="vehicle-job-completion-detail-value">{jobDetails.complaint}</span>
                                            </div>
                                            <div className="vehicle-job-completion-detail-item">
                                                <span className="vehicle-job-completion-detail-label">Supervisor:</span>
                                                <span className="vehicle-job-completion-detail-value">{jobDetails.supervisorName || 'N/A'}</span>
                                            </div>
                                            <div className="vehicle-job-completion-detail-item">
                                                <span className="vehicle-job-completion-detail-label">Service Type:</span>
                                                <span className="vehicle-job-completion-detail-value">{jobDetails.serviceType || 'N/A'}</span>
                                            </div>
                                            <div className="vehicle-job-completion-detail-item">
                                                <span className="vehicle-job-completion-detail-label">Procedure Details:</span>
                                                <span className="vehicle-job-completion-detail-value">{jobDetails.procedureDetails || 'N/A'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="vehicle-job-completion-section-divider">
                                        <h3>Completion Details</h3>
                                    </div>

                                    {/* Completion Form */}
                                    <div className="vehicle-job-completion-form-grid">
                                        <div className="vehicle-job-completion-form-group">
                                            <label className="vehicle-job-completion-form-label">
                                                <Calendar className="vehicle-job-completion-icon-sm" />
                                                Completion Date
                                            </label>
                                            <input
                                                type="datetime-local"
                                                className="vehicle-job-completion-form-input"
                                                value={formData.completionDate}
                                                onChange={(e) => handleInputChange('completionDate', e.target.value)}
                                            />
                                        </div>

                                        <div className="vehicle-job-completion-form-group">
                                            <label className="vehicle-job-completion-form-label">
                                                <Gauge className="vehicle-job-completion-icon-sm" />
                                                Meter Reading
                                            </label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                className="vehicle-job-completion-form-input"
                                                value={formData.meterReading}
                                                onChange={(e) => handleInputChange('meterReading', parseFloat(e.target.value) || 0)}
                                                placeholder="0.00"
                                            />
                                        </div>

                                        <div className="vehicle-job-completion-form-group vehicle-job-completion-form-group-full">
                                            <label className="vehicle-job-completion-form-label">
                                                <Wrench className="vehicle-job-completion-icon-sm" />
                                                Action Taken
                                            </label>
                                            <textarea
                                                className="vehicle-job-completion-form-textarea"
                                                value={formData.actionTaken}
                                                onChange={(e) => handleInputChange('actionTaken', e.target.value)}
                                                placeholder="Describe the action taken to complete the job..."
                                                rows={3}
                                            />
                                        </div>

                                        <div className="vehicle-job-completion-form-group vehicle-job-completion-form-group-full">
                                            <label className="vehicle-job-completion-form-label">
                                                <Package className="vehicle-job-completion-icon-sm" />
                                                Items Returned / Remarks
                                            </label>
                                            <textarea
                                                className="vehicle-job-completion-form-textarea"
                                                value={formData.itemsReturned}
                                                onChange={(e) => handleInputChange('itemsReturned', e.target.value)}
                                                placeholder="List items returned or additional remarks..."
                                                rows={3}
                                            />
                                        </div>

                                        <div className="vehicle-job-completion-form-group vehicle-job-completion-form-group-full">
                                            <label className="vehicle-job-completion-form-label">
                                                <FileText className="vehicle-job-completion-icon-sm" />
                                                Additional Remarks
                                            </label>
                                            <textarea
                                                className="vehicle-job-completion-form-textarea"
                                                value={formData.remarks}
                                                onChange={(e) => handleInputChange('remarks', e.target.value)}
                                                placeholder="Any additional remarks or observations..."
                                                rows={2}
                                            />
                                        </div>
                                    </div>

                                    {/* Form Actions */}
                                    <div className="vehicle-job-completion-form-actions">
                                        <button
                                            className="vehicle-job-completion-btn vehicle-job-completion-btn-primary"
                                            onClick={handleSave}
                                        >
                                            <Save className="vehicle-job-completion-icon" />
                                            Save Job Completion Details
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
