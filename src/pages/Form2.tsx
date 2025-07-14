import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { 
  Package, 
  Save, 
  Trash2, 
  Plus,
  Calendar,
  FileText,
  DollarSign,
  User,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  Edit3,
  Clock,
  MapPin,
  Building2,
  CreditCard,
  Shield,
  AlertTriangle,
  History,
  Truck,
  Settings,
  Check,
  ChevronRight,
  RotateCcw,
  Download,
  Upload,
  Camera,
  Archive
} from 'lucide-react';

export default function EmployeeBelongingsPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Employee Information
    employeeCode: '',
    employeeName: '',
    department: '',
    designation: '',
    unit: '',
    mobileNo: '',
    joiningDate: '',
    
    // Item Details
    itemCategory: '',
    itemName: '',
    itemModel: '',
    itemSerialNumber: '',
    itemValue: '',
    itemDescription: '',
    purchaseDate: '',
    warrantyExpiry: '',
    vendor: '',
    
    // Issue Details
    issuedOn: '',
    issuedBy: '',
    issueReason: '',
    itemCondition: '',
    itemStatus: '',
    expectedReturnDate: '',
    
    // Additional Information
    insuranceCovered: '',
    trackingEnabled: '',
    maintenanceSchedule: '',
    usageInstructions: '',
    returnConditions: '',
    remarks: '',
    
    // Documents & Attachments
    documentType: '',
    documentNumber: '',
    attachments: []
  });

  const steps = [
    { 
      id: 1, 
      title: 'Employee Details', 
      icon: User, 
      description: 'Basic employee information' 
    },
    { 
      id: 2, 
      title: 'Item Information', 
      icon: Package, 
      description: 'Item specifications and details' 
    },
    { 
      id: 3, 
      title: 'Issue Details', 
      icon: Calendar, 
      description: 'Issue and tracking information' 
    },
    { 
      id: 4, 
      title: 'Additional Info', 
      icon: Settings, 
      description: 'Insurance, maintenance & conditions' 
    },
    { 
      id: 5, 
      title: 'Review & Submit', 
      icon: CheckCircle2, 
      description: 'Review and finalize submission' 
    }
  ];

  const itemCategories = [
    'IT Equipment',
    'Safety Equipment',
    'Office Supplies',
    'Vehicles',
    'Tools & Machinery',
    'Uniforms & Clothing',
    'Access Cards & IDs',
    'Communication Devices',
    'Furniture',
    'Books & Materials',
    'Others'
  ];

  const itemStatusOptions = [
    'Issued',
    'In Use',
    'Returned',
    'Lost',
    'Damaged',
    'Under Maintenance',
    'Pending Return',
    'Replaced',
    'Disposed'
  ];

  const itemConditionOptions = [
    'New',
    'Good',
    'Fair',
    'Poor',
    'Refurbished',
    'Used'
  ];

  const commonItems = {
    'IT Equipment': ['Laptop', 'Desktop', 'Monitor', 'Keyboard', 'Mouse', 'Headphones', 'Webcam', 'Printer'],
    'Safety Equipment': ['Hard Hat', 'Safety Boots', 'Gloves', 'Safety Vest', 'Goggles', 'Respirator'],
    'Office Supplies': ['Stationery Set', 'Calculator', 'Folder', 'Notebook', 'Pen Set'],
    'Vehicles': ['Company Car', 'Motorcycle', 'Bicycle', 'Van', 'Truck'],
    'Communication Devices': ['Mobile Phone', 'Tablet', 'Radio', 'Walkie-Talkie'],
    'Access Cards & IDs': ['ID Card', 'Access Card', 'Parking Pass', 'Security Badge']
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving employee belongings data:', formData);
    alert('Employee belongings details saved successfully!');
  };

  const handleClear = () => {
    setFormData({
      employeeCode: '',
      employeeName: '',
      department: '',
      designation: '',
      unit: '',
      mobileNo: '',
      joiningDate: '',
      itemCategory: '',
      itemName: '',
      itemModel: '',
      itemSerialNumber: '',
      itemValue: '',
      itemDescription: '',
      purchaseDate: '',
      warrantyExpiry: '',
      vendor: '',
      issuedOn: '',
      issuedBy: '',
      issueReason: '',
      itemCondition: '',
      itemStatus: '',
      expectedReturnDate: '',
      insuranceCovered: '',
      trackingEnabled: '',
      maintenanceSchedule: '',
      usageInstructions: '',
      returnConditions: '',
      remarks: '',
      documentType: '',
      documentNumber: '',
      attachments: []
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <Card className="border-2 border-blue-100 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <User className="h-5 w-5" />
                  Employee Search & Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="employeeCode" className="text-sm font-medium flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Employee Code 
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="employeeCode"
                      value={formData.employeeCode}
                      onChange={(e) => handleInputChange('employeeCode', e.target.value)}
                      placeholder="Enter employee code"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="employeeName" className="text-sm font-medium flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Employee Name 
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="employeeName"
                      value={formData.employeeName}
                      onChange={(e) => handleInputChange('employeeName', e.target.value)}
                      placeholder="Enter employee name"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="department" className="text-sm font-medium flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      Department
                    </Label>
                    <Input 
                      id="department"
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      placeholder="Enter department"
                    />
                  </div>
                  <div>
                    <Label htmlFor="designation" className="text-sm font-medium flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Designation
                    </Label>
                    <Input 
                      id="designation"
                      value={formData.designation}
                      onChange={(e) => handleInputChange('designation', e.target.value)}
                      placeholder="Enter designation"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit" className="text-sm font-medium flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Unit
                    </Label>
                    <Input 
                      id="unit"
                      value={formData.unit}
                      onChange={(e) => handleInputChange('unit', e.target.value)}
                      placeholder="Enter unit"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="mobileNo" className="text-sm font-medium flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Mobile Number
                    </Label>
                    <Input 
                      id="mobileNo"
                      value={formData.mobileNo}
                      onChange={(e) => handleInputChange('mobileNo', e.target.value)}
                      placeholder="Enter mobile number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="joiningDate" className="text-sm font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Joining Date
                    </Label>
                    <Input 
                      id="joiningDate"
                      type="date"
                      value={formData.joiningDate}
                      onChange={(e) => handleInputChange('joiningDate', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <Card className="border-2 border-green-100 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Package className="h-5 w-5" />
                  Item Information & Specifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="itemCategory" className="text-sm font-medium flex items-center gap-2">
                      <Archive className="h-4 w-4" />
                      Item Category 
                      <span className="text-red-500">*</span>
                    </Label>
                    <Select 
                      value={formData.itemCategory}
                      onChange={(e) => handleInputChange('itemCategory', e.target.value)}
                      required
                    >
                      <option value="">Select Category</option>
                      {itemCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="itemName" className="text-sm font-medium flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Item Name 
                      <span className="text-red-500">*</span>
                    </Label>
                    <Select 
                      value={formData.itemName}
                      onChange={(e) => handleInputChange('itemName', e.target.value)}
                      required
                      disabled={!formData.itemCategory}
                    >
                      <option value="">Select Item</option>
                      {formData.itemCategory && commonItems[formData.itemCategory as keyof typeof commonItems]?.map(item => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="itemModel" className="text-sm font-medium flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Model/Brand
                    </Label>
                    <Input 
                      id="itemModel"
                      value={formData.itemModel}
                      onChange={(e) => handleInputChange('itemModel', e.target.value)}
                      placeholder="Enter model/brand"
                    />
                  </div>
                  <div>
                    <Label htmlFor="itemSerialNumber" className="text-sm font-medium flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Serial Number
                    </Label>
                    <Input 
                      id="itemSerialNumber"
                      value={formData.itemSerialNumber}
                      onChange={(e) => handleInputChange('itemSerialNumber', e.target.value)}
                      placeholder="Enter serial number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="itemValue" className="text-sm font-medium flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Item Value 
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="itemValue"
                      type="number"
                      value={formData.itemValue}
                      onChange={(e) => handleInputChange('itemValue', e.target.value)}
                      placeholder="Enter item value"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="purchaseDate" className="text-sm font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Purchase Date
                    </Label>
                    <Input 
                      id="purchaseDate"
                      type="date"
                      value={formData.purchaseDate}
                      onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="warrantyExpiry" className="text-sm font-medium flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Warranty Expiry
                    </Label>
                    <Input 
                      id="warrantyExpiry"
                      type="date"
                      value={formData.warrantyExpiry}
                      onChange={(e) => handleInputChange('warrantyExpiry', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="vendor" className="text-sm font-medium flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      Vendor/Supplier
                    </Label>
                    <Input 
                      id="vendor"
                      value={formData.vendor}
                      onChange={(e) => handleInputChange('vendor', e.target.value)}
                      placeholder="Enter vendor name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="itemDescription" className="text-sm font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Description
                    </Label>
                    <Textarea 
                      id="itemDescription"
                      value={formData.itemDescription}
                      onChange={(e) => handleInputChange('itemDescription', e.target.value)}
                      placeholder="Enter item description"
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <Card className="border-2 border-purple-100 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
                <CardTitle className="flex items-center gap-2 text-purple-800">
                  <Calendar className="h-5 w-5" />
                  Issue Details & Tracking
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="issuedOn" className="text-sm font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Issued On 
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="issuedOn"
                      type="date"
                      value={formData.issuedOn}
                      onChange={(e) => handleInputChange('issuedOn', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="issuedBy" className="text-sm font-medium flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Issued By 
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="issuedBy"
                      value={formData.issuedBy}
                      onChange={(e) => handleInputChange('issuedBy', e.target.value)}
                      placeholder="Enter issuer name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="expectedReturnDate" className="text-sm font-medium flex items-center gap-2">
                      <RotateCcw className="h-4 w-4" />
                      Expected Return Date
                    </Label>
                    <Input 
                      id="expectedReturnDate"
                      type="date"
                      value={formData.expectedReturnDate}
                      onChange={(e) => handleInputChange('expectedReturnDate', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="itemCondition" className="text-sm font-medium flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Item Condition 
                      <span className="text-red-500">*</span>
                    </Label>
                    <Select 
                      value={formData.itemCondition}
                      onChange={(e) => handleInputChange('itemCondition', e.target.value)}
                      required
                    >
                      <option value="">Select Condition</option>
                      {itemConditionOptions.map(condition => (
                        <option key={condition} value={condition}>{condition}</option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="itemStatus" className="text-sm font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Item Status 
                      <span className="text-red-500">*</span>
                    </Label>
                    <Select 
                      value={formData.itemStatus}
                      onChange={(e) => handleInputChange('itemStatus', e.target.value)}
                      required
                    >
                      <option value="">Select Status</option>
                      {itemStatusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="issueReason" className="text-sm font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Issue Reason/Purpose
                  </Label>
                  <Textarea 
                    id="issueReason"
                    value={formData.issueReason}
                    onChange={(e) => handleInputChange('issueReason', e.target.value)}
                    placeholder="Enter reason for item issue"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <Card className="border-2 border-orange-100 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50">
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <Settings className="h-5 w-5" />
                  Additional Information & Conditions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="insuranceCovered" className="text-sm font-medium flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Insurance Coverage
                    </Label>
                    <Select 
                      value={formData.insuranceCovered}
                      onChange={(e) => handleInputChange('insuranceCovered', e.target.value)}
                    >
                      <option value="">Select Coverage</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Partial">Partial</option>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="trackingEnabled" className="text-sm font-medium flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Tracking Enabled
                    </Label>
                    <Select 
                      value={formData.trackingEnabled}
                      onChange={(e) => handleInputChange('trackingEnabled', e.target.value)}
                    >
                      <option value="">Select Option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="maintenanceSchedule" className="text-sm font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Maintenance Schedule
                    </Label>
                    <Select 
                      value={formData.maintenanceSchedule}
                      onChange={(e) => handleInputChange('maintenanceSchedule', e.target.value)}
                    >
                      <option value="">Select Schedule</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Annual">Annual</option>
                      <option value="As Required">As Required</option>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="usageInstructions" className="text-sm font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Usage Instructions
                    </Label>
                    <Textarea 
                      id="usageInstructions"
                      value={formData.usageInstructions}
                      onChange={(e) => handleInputChange('usageInstructions', e.target.value)}
                      placeholder="Enter usage instructions"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="returnConditions" className="text-sm font-medium flex items-center gap-2">
                      <RotateCcw className="h-4 w-4" />
                      Return Conditions
                    </Label>
                    <Textarea 
                      id="returnConditions"
                      value={formData.returnConditions}
                      onChange={(e) => handleInputChange('returnConditions', e.target.value)}
                      placeholder="Enter return conditions"
                      rows={3}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="documentType" className="text-sm font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Document Type
                    </Label>
                    <Select 
                      value={formData.documentType}
                      onChange={(e) => handleInputChange('documentType', e.target.value)}
                    >
                      <option value="">Select Document</option>
                      <option value="Receipt">Receipt</option>
                      <option value="Invoice">Invoice</option>
                      <option value="Agreement">Agreement</option>
                      <option value="Manual">Manual</option>
                      <option value="Warranty">Warranty</option>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="documentNumber" className="text-sm font-medium flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Document Number
                    </Label>
                    <Input 
                      id="documentNumber"
                      value={formData.documentNumber}
                      onChange={(e) => handleInputChange('documentNumber', e.target.value)}
                      placeholder="Enter document number"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="remarks" className="text-sm font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Remarks
                  </Label>
                  <Textarea 
                    id="remarks"
                    value={formData.remarks}
                    onChange={(e) => handleInputChange('remarks', e.target.value)}
                    placeholder="Enter additional remarks"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-6">
            <Card className="border-2 border-green-100 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50">
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <CheckCircle2 className="h-5 w-5" />
                  Review & Submit
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Employee Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Code:</strong> {formData.employeeCode || 'N/A'}</p>
                      <p><strong>Name:</strong> {formData.employeeName || 'N/A'}</p>
                      <p><strong>Department:</strong> {formData.department || 'N/A'}</p>
                      <p><strong>Designation:</strong> {formData.designation || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Item Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Category:</strong> {formData.itemCategory || 'N/A'}</p>
                      <p><strong>Name:</strong> {formData.itemName || 'N/A'}</p>
                      <p><strong>Value:</strong> {formData.itemValue ? `$${formData.itemValue}` : 'N/A'}</p>
                      <p><strong>Status:</strong> {formData.itemStatus || 'N/A'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Issue Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <p><strong>Issued On:</strong> {formData.issuedOn || 'N/A'}</p>
                    <p><strong>Issued By:</strong> {formData.issuedBy || 'N/A'}</p>
                    <p><strong>Condition:</strong> {formData.itemCondition || 'N/A'}</p>
                    <p><strong>Expected Return:</strong> {formData.expectedReturnDate || 'N/A'}</p>
                  </div>
                </div>
                
                {formData.remarks && (
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Remarks
                    </h4>
                    <p className="text-sm bg-gray-50 p-3 rounded-lg">{formData.remarks}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="main-content">
        <div className="p-4 lg:p-6">
          <div className="max-w-[95%] lg:max-w-[85%] mx-auto space-y-6">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                <Package className="h-8 w-8 text-primary" />
                HR Module - Employee Belongings Management
              </h1>
              <p className="text-muted-foreground">
                Comprehensive item issue and tracking system for employee belongings
              </p>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div className={`
                          w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                          ${currentStep === step.id 
                            ? 'bg-blue-500 border-blue-500 text-white shadow-lg' 
                            : currentStep > step.id 
                              ? 'bg-green-500 border-green-500 text-white shadow-lg' 
                              : 'bg-gray-100 border-gray-300 text-gray-400'
                          }
                        `}>
                          {currentStep > step.id ? (
                            <Check className="h-6 w-6" />
                          ) : (
                            <step.icon className="h-6 w-6" />
                          )}
                        </div>
                        <div className="mt-3 text-center">
                          <div className={`
                            text-sm font-medium
                            ${currentStep === step.id ? 'text-blue-600' : 'text-gray-600'}
                          `}>
                            {step.title}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {step.description}
                          </div>
                        </div>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`
                          w-24 h-0.5 mx-4 mt-[-32px] transition-all duration-300
                          ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'}
                        `} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="mb-8">
              {renderStepContent()}
            </div>

            {/* Navigation & Action Buttons */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mt-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                {/* Navigation Buttons */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2 h-11"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    onClick={nextStep}
                    disabled={currentStep === steps.length}
                    className="flex items-center gap-2 h-11 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  >
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    onClick={handleClear}
                    className="flex items-center gap-2 h-11"
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear Form
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 h-11"
                  >
                    <Eye className="h-4 w-4" />
                    Preview
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="flex items-center gap-2 h-11 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  >
                    <Save className="h-4 w-4" />
                    Save Employee Belongings
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
