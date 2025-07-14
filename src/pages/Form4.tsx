import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select } from '../components/ui/select';
import { CheckCircle2, UserCheck, Settings, FileText, Activity, User2 } from 'lucide-react';

interface FormData {
  // Step 1: Employee Details
  employeeCode: string;
  employeeName: string;
  department: string;
  currentDesignation: string;
  
  // Step 2: Status Update
  newStatus: string;
  effectiveDate: string;
  reason: string;
  
  // Step 3: Approval Details
  approverName: string;
  approverDesignation: string;
  comments: string;
}

const steps = [
  {
    id: 1,
    title: 'Employee Details',
    description: 'Current employee information',
    icon: User2,
  },
  {
    id: 2,
    title: 'Status Update',
    description: 'New status and effective date',
    icon: Settings,
  },
  {
    id: 3,
    title: 'Approval Details',
    description: 'Approval process and comments',
    icon: FileText,
  },
];

const statusOptions = [
  'Active',
  'Inactive',
  'On Leave',
  'Terminated',
  'Resigned',
  'Suspended',
  'Retired',
  'On Training',
  'Medical Leave',
  'Maternity Leave',
  'Probation',
  'Contract Ended',
  'Transfer',
  'Promotion'
];

const departments = [
  'Mining Operations',
  'Processing',
  'Equipment Maintenance',
  'Safety & Compliance',
  'Quality Control',
  'Transport & Logistics',
  'Human Resources',
  'Finance & Accounts',
  'Administration',
  'Engineering'
];

export default function Form4() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    employeeCode: '',
    employeeName: '',
    department: '',
    currentDesignation: '',
    newStatus: '',
    effectiveDate: '',
    reason: '',
    approverName: '',
    approverDesignation: '',
    comments: '',
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClearForm = () => {
    setFormData({
      employeeCode: '',
      employeeName: '',
      department: '',
      currentDesignation: '',
      newStatus: '',
      effectiveDate: '',
      reason: '',
      approverName: '',
      approverDesignation: '',
      comments: '',
    });
    setCurrentStep(1);
  };

  const handlePreview = () => {
    alert('Preview functionality - Employee status update would be displayed here');
  };

  const handleSave = () => {
    alert('Save functionality - Employee status updated successfully!');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Employee Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="employeeCode">Employee Code *</Label>
                  <Input
                    id="employeeCode"
                    type="text"
                    value={formData.employeeCode}
                    onChange={(e) => handleInputChange('employeeCode', e.target.value)}
                    placeholder="Enter employee code"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employeeName">Employee Name *</Label>
                  <Input
                    id="employeeName"
                    type="text"
                    value={formData.employeeName}
                    onChange={(e) => handleInputChange('employeeName', e.target.value)}
                    placeholder="Enter employee name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Select
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentDesignation">Current Designation *</Label>
                  <Input
                    id="currentDesignation"
                    type="text"
                    value={formData.currentDesignation}
                    onChange={(e) => handleInputChange('currentDesignation', e.target.value)}
                    placeholder="Enter current designation"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Status Update</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="newStatus">New Status *</Label>
                  <Select
                    value={formData.newStatus}
                    onChange={(e) => handleInputChange('newStatus', e.target.value)}
                    required
                  >
                    <option value="">Select New Status</option>
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="effectiveDate">Effective Date *</Label>
                  <Input
                    id="effectiveDate"
                    type="date"
                    value={formData.effectiveDate}
                    onChange={(e) => handleInputChange('effectiveDate', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Status Change *</Label>
                <Textarea
                  id="reason"
                  value={formData.reason}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                  placeholder="Enter detailed reason for status change"
                  rows={4}
                  required
                />
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Approval Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="approverName">Approver Name *</Label>
                  <Input
                    id="approverName"
                    type="text"
                    value={formData.approverName}
                    onChange={(e) => handleInputChange('approverName', e.target.value)}
                    placeholder="Enter approver name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="approverDesignation">Approver Designation *</Label>
                  <Input
                    id="approverDesignation"
                    type="text"
                    value={formData.approverDesignation}
                    onChange={(e) => handleInputChange('approverDesignation', e.target.value)}
                    placeholder="Enter approver designation"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="comments">Additional Comments *</Label>
                <Textarea
                  id="comments"
                  value={formData.comments}
                  onChange={(e) => handleInputChange('comments', e.target.value)}
                  placeholder="Enter any additional comments or notes"
                  rows={4}
                  required
                />
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Employee Status Update Form</h1>
          <p className="text-gray-600">Update and manage employee work status</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex flex-col items-center flex-1">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                    isCompleted 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : isActive 
                        ? 'bg-blue-500 border-blue-500 text-white' 
                        : 'bg-white border-gray-300 text-gray-500'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <div className={`text-sm font-medium ${
                      isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-400 mt-1 hidden sm:block">
                      {step.description}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`hidden md:block absolute top-6 w-full h-0.5 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`} style={{ left: '50%', width: 'calc(100% - 48px)' }} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="mb-8">
          {renderStepContent()}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 bg-white rounded-lg shadow-sm border p-6">
          <div className="flex space-x-3">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              variant="outline"
              className="px-6"
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentStep === steps.length}
              className="px-6 bg-blue-600 hover:bg-blue-700"
            >
              {currentStep === steps.length ? 'Complete' : 'Next'}
            </Button>
          </div>
          
          <div className="flex space-x-3">
            <Button
              onClick={handleClearForm}
              variant="outline"
              className="px-4 text-red-600 border-red-300 hover:bg-red-50"
            >
              Clear Form
            </Button>
            <Button
              onClick={handlePreview}
              variant="outline"
              className="px-4"
            >
              Preview
            </Button>
            <Button
              onClick={handleSave}
              className="px-4 bg-green-600 hover:bg-green-700"
            >
              Update Employee Status
            </Button>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="text-center text-sm text-gray-500">
          Step {currentStep} of {steps.length}
        </div>
      </div>
    </div>
  );
}
