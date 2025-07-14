import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select } from '../components/ui/select';
import { CheckCircle2, Users, MapPin, Building, Shield, User } from 'lucide-react';

interface FormData {
  // Step 1: Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  
  // Step 2: Employment Details
  department: string;
  position: string;
  employeeType: string;
  joiningDate: string;
  reportingManager: string;
  workLocation: string;
  
  // Step 3: Compensation & Benefits
  baseSalary: string;
  healthInsurance: string;
  bonusEligible: boolean;
  stockOptions: boolean;
  vacationDays: string;
  
  // Step 4: Emergency Contact
  emergencyContactName: string;
  emergencyContactRelation: string;
  emergencyContactPhone: string;
  emergencyContactAddress: string;
  
  // Step 5: Additional Information
  specialRequirements: string;
  skills: string;
  certifications: string;
  notes: string;
}

const steps = [
  {
    id: 1,
    title: 'Personal Info',
    description: 'Basic personal information',
    icon: User,
  },
  {
    id: 2,
    title: 'Employment',
    description: 'Job role and department details',
    icon: Building,
  },
  {
    id: 3,
    title: 'Compensation',
    description: 'Salary and benefits information',
    icon: Shield,
  },
  {
    id: 4,
    title: 'Emergency Contact',
    description: 'Emergency contact details',
    icon: Users,
  },
  {
    id: 5,
    title: 'Additional Info',
    description: 'Skills and additional notes',
    icon: MapPin,
  },
];

export default function Form3() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    department: '',
    position: '',
    employeeType: '',
    joiningDate: '',
    reportingManager: '',
    workLocation: '',
    baseSalary: '',
    healthInsurance: '',
    bonusEligible: false,
    stockOptions: false,
    vacationDays: '',
    emergencyContactName: '',
    emergencyContactRelation: '',
    emergencyContactPhone: '',
    emergencyContactAddress: '',
    specialRequirements: '',
    skills: '',
    certifications: '',
    notes: '',
  });

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
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
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      department: '',
      position: '',
      employeeType: '',
      joiningDate: '',
      reportingManager: '',
      workLocation: '',
      baseSalary: '',
      healthInsurance: '',
      bonusEligible: false,
      stockOptions: false,
      vacationDays: '',
      emergencyContactName: '',
      emergencyContactRelation: '',
      emergencyContactPhone: '',
      emergencyContactAddress: '',
      specialRequirements: '',
      skills: '',
      certifications: '',
      notes: '',
    });
    setCurrentStep(1);
  };

  const handlePreview = () => {
    alert('Preview functionality - Form data would be displayed here');
  };

  const handleSave = () => {
    alert('Save functionality - Form data would be saved here');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter last name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Employment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Select
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                  >
                    <option value="">Select department</option>
                    <option value="hr">Human Resources</option>
                    <option value="finance">Finance</option>
                    <option value="operations">Operations</option>
                    <option value="mining">Mining</option>
                    <option value="safety">Safety</option>
                    <option value="maintenance">Maintenance</option>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position *</Label>
                  <Input
                    id="position"
                    type="text"
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    placeholder="Enter job position"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employeeType">Employment Type *</Label>
                  <Select
                    value={formData.employeeType}
                    onChange={(e) => handleInputChange('employeeType', e.target.value)}
                  >
                    <option value="">Select type</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="temporary">Temporary</option>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="joiningDate">Joining Date *</Label>
                  <Input
                    id="joiningDate"
                    type="date"
                    value={formData.joiningDate}
                    onChange={(e) => handleInputChange('joiningDate', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reportingManager">Reporting Manager</Label>
                  <Input
                    id="reportingManager"
                    type="text"
                    value={formData.reportingManager}
                    onChange={(e) => handleInputChange('reportingManager', e.target.value)}
                    placeholder="Enter manager name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workLocation">Work Location *</Label>
                  <Select
                    value={formData.workLocation}
                    onChange={(e) => handleInputChange('workLocation', e.target.value)}
                  >
                    <option value="">Select location</option>
                    <option value="main-office">Main Office</option>
                    <option value="mine-site-a">Mine Site A</option>
                    <option value="mine-site-b">Mine Site B</option>
                    <option value="processing-plant">Processing Plant</option>
                    <option value="remote">Remote</option>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Compensation & Benefits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="baseSalary">Base Salary *</Label>
                  <Input
                    id="baseSalary"
                    type="number"
                    value={formData.baseSalary}
                    onChange={(e) => handleInputChange('baseSalary', e.target.value)}
                    placeholder="Enter annual salary"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="healthInsurance">Health Insurance Plan</Label>
                  <Select
                    value={formData.healthInsurance}
                    onChange={(e) => handleInputChange('healthInsurance', e.target.value)}
                  >
                    <option value="">Select plan</option>
                    <option value="basic">Basic Plan</option>
                    <option value="standard">Standard Plan</option>
                    <option value="premium">Premium Plan</option>
                    <option value="family">Family Plan</option>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vacationDays">Annual Vacation Days</Label>
                  <Input
                    id="vacationDays"
                    type="number"
                    value={formData.vacationDays}
                    onChange={(e) => handleInputChange('vacationDays', e.target.value)}
                    placeholder="Enter number of days"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="bonusEligible"
                      checked={formData.bonusEligible}
                      onChange={(e) => handleInputChange('bonusEligible', e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="bonusEligible">Bonus Eligible</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="stockOptions"
                      checked={formData.stockOptions}
                      onChange={(e) => handleInputChange('stockOptions', e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="stockOptions">Stock Options</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactName">Contact Name *</Label>
                  <Input
                    id="emergencyContactName"
                    type="text"
                    value={formData.emergencyContactName}
                    onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                    placeholder="Enter contact name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactRelation">Relationship *</Label>
                  <Select
                    value={formData.emergencyContactRelation}
                    onChange={(e) => handleInputChange('emergencyContactRelation', e.target.value)}
                  >
                    <option value="">Select relationship</option>
                    <option value="spouse">Spouse</option>
                    <option value="parent">Parent</option>
                    <option value="sibling">Sibling</option>
                    <option value="child">Child</option>
                    <option value="friend">Friend</option>
                    <option value="other">Other</option>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactPhone">Contact Phone *</Label>
                  <Input
                    id="emergencyContactPhone"
                    type="tel"
                    value={formData.emergencyContactPhone}
                    onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="emergencyContactAddress">Contact Address</Label>
                  <Textarea
                    id="emergencyContactAddress"
                    value={formData.emergencyContactAddress}
                    onChange={(e) => handleInputChange('emergencyContactAddress', e.target.value)}
                    placeholder="Enter complete address"
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills & Expertise</Label>
                  <Textarea
                    id="skills"
                    value={formData.skills}
                    onChange={(e) => handleInputChange('skills', e.target.value)}
                    placeholder="List relevant skills and expertise"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certifications">Certifications</Label>
                  <Textarea
                    id="certifications"
                    value={formData.certifications}
                    onChange={(e) => handleInputChange('certifications', e.target.value)}
                    placeholder="List professional certifications"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialRequirements">Special Requirements</Label>
                  <Textarea
                    id="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                    placeholder="Any special accommodations or requirements"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Any additional information"
                    rows={4}
                  />
                </div>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">HR Employee Registration Form</h1>
          <p className="text-gray-600">Complete all steps to register a new employee</p>
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
              Save Employee Details
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
