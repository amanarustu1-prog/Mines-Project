import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { 
  User, 
  Save, 
  Trash2, 
  Edit3,
  FileText,
  Phone,
  Mail,
  MapPin,
  Calendar,
  GraduationCap,
  Briefcase,
  Users,
  Camera,
  Building2,
  CreditCard,
  CheckCircle2,
  Upload,
  Eye,
  ArrowLeft,
  ArrowRight,
  Clock,
  Shield,
  Check,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export default function EmployeeMasterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Details
    employeeCode: '',
    employeeName: '',
    fatherName: '',
    designation: '',
    unit: '',
    department: '',
    mobileNo: '',
    emailPersonal: '',
    permanentAddress: '',
    localAddress: '',
    state: '',
    religion: '',
    nationality: '',
    sex: '',
    panNo: '',
    bloodGroup: '',
    dob: '',
    maritialStatus: '',
    age: '',
    companyMobileAllotted: false,
    groupEmailId: '',
    doj: '',
    pfNo: '',
    esiNo: '',
    joiningaSalary: '',
    lastDrawnSalary: '',
    lastIncrementDate: '',
    lastIncrementAmount: '',
    idProof: '',
    remarks: '',
    
    // Educational Qualifications
    educationQualifications: [
      { qualification: 'Class Xth', degreeBoard: '', schoolCollege: '', passingYear: '', percentage: '' },
      { qualification: 'Class XIIth', degreeBoard: '', schoolCollege: '', passingYear: '', percentage: '' },
      { qualification: 'Diploma/Degree', degreeBoard: '', schoolCollege: '', passingYear: '', percentage: '' },
      { qualification: 'Post Graduate', degreeBoard: '', schoolCollege: '', passingYear: '', percentage: '' },
      { qualification: 'Others', degreeBoard: '', schoolCollege: '', passingYear: '', percentage: '' }
    ],
    
    // Previous Employments
    previousEmployments: [
      { organization: '', joiningDate: '', leavingDate: '', salaryDrawn: '', reasonLeaving: '' },
      { organization: '', joiningDate: '', leavingDate: '', salaryDrawn: '', reasonLeaving: '' },
      { organization: '', joiningDate: '', leavingDate: '', salaryDrawn: '', reasonLeaving: '' },
      { organization: '', joiningDate: '', leavingDate: '', salaryDrawn: '', reasonLeaving: '' }
    ],
    
    // Family Details
    familyDetails: [
      { name: '', relation: '', age: '' },
      { name: '', relation: '', age: '' },
      { name: '', relation: '', age: '' },
      { name: '', relation: '', age: '' }
    ]
  });

  const steps = [
    { id: 1, title: 'Basic Information', icon: User, description: 'Personal & contact details' },
    { id: 2, title: 'Employment Details', icon: Briefcase, description: 'Job & salary information' },
    { id: 3, title: 'Education & Experience', icon: GraduationCap, description: 'Qualifications & work history' },
    { id: 4, title: 'Family & Documents', icon: Users, description: 'Family details & documentation' }
  ];

  const states = [
    'ANDAMAN AND NICOBAR ISLANDS', 'ANDHRA PRADESH', 'ARUNACHAL PRADESH', 'ASSAM', 'BIHAR',
    'CHANDIGARH', 'CHHATTISGARH', 'DADRA AND NAGAR HAVELI', 'DAMAN AND DIU', 'DELHI',
    'GOA', 'GUJARAT', 'HARYANA', 'HIMACHAL PRADESH', 'JAMMU AND KASHMIR', 'JHARKHAND',
    'KARNATAKA', 'KERALA', 'LAKSHADWEEP', 'MADHYA PRADESH', 'MAHARASHTRA', 'MANIPUR',
    'MEGHALAYA', 'MIZORAM', 'NAGALAND', 'ODISHA', 'PUDUCHERRY', 'PUNJAB', 'RAJASTHAN',
    'SIKKIM', 'TAMIL NADU', 'TELANGANA', 'TRIPURA', 'UTTAR PRADESH', 'UTTARAKHAND', 'WEST BENGAL'
  ];

  const religions = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain', 'Others'];
  const relations = ['Father', 'Mother', 'Spouse', 'Son', 'Daughter', 'Brother', 'Sister', 'Others'];
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const maritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed'];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEducationChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      educationQualifications: prev.educationQualifications.map((edu, idx) => 
        idx === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const handleEmploymentChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      previousEmployments: prev.previousEmployments.map((emp, idx) => 
        idx === index ? { ...emp, [field]: value } : emp
      )
    }));
  };

  const handleFamilyChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      familyDetails: prev.familyDetails.map((family, idx) => 
        idx === index ? { ...family, [field]: value } : family
      )
    }));
  };

  const handleSave = () => {
    console.log('Saving form data:', formData);
    alert('Employee Master Details saved successfully!');
  };

  const handleClear = () => {
    setFormData({
      employeeCode: '', employeeName: '', fatherName: '', designation: '', unit: '',
      department: '', mobileNo: '', emailPersonal: '', permanentAddress: '', localAddress: '',
      state: '', religion: '', nationality: '', sex: '', panNo: '', bloodGroup: '', dob: '',
      maritialStatus: '', age: '', companyMobileAllotted: false, groupEmailId: '', doj: '',
      pfNo: '', esiNo: '', joiningaSalary: '', lastDrawnSalary: '', lastIncrementDate: '',
      lastIncrementAmount: '', idProof: '', remarks: '',
      educationQualifications: [
        { qualification: 'Class Xth', degreeBoard: '', schoolCollege: '', passingYear: '', percentage: '' },
        { qualification: 'Class XIIth', degreeBoard: '', schoolCollege: '', passingYear: '', percentage: '' },
        { qualification: 'Diploma/Degree', degreeBoard: '', schoolCollege: '', passingYear: '', percentage: '' },
        { qualification: 'Post Graduate', degreeBoard: '', schoolCollege: '', passingYear: '', percentage: '' },
        { qualification: 'Others', degreeBoard: '', schoolCollege: '', passingYear: '', percentage: '' }
      ],
      previousEmployments: [
        { organization: '', joiningDate: '', leavingDate: '', salaryDrawn: '', reasonLeaving: '' },
        { organization: '', joiningDate: '', leavingDate: '', salaryDrawn: '', reasonLeaving: '' },
        { organization: '', joiningDate: '', leavingDate: '', salaryDrawn: '', reasonLeaving: '' },
        { organization: '', joiningDate: '', leavingDate: '', salaryDrawn: '', reasonLeaving: '' }
      ],
      familyDetails: [
        { name: '', relation: '', age: '' },
        { name: '', relation: '', age: '' },
        { name: '', relation: '', age: '' },
        { name: '', relation: '', age: '' }
      ]
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

  const renderBasicInformation = () => (
    <div className="space-y-8">
      {/* Personal Information */}
      <Card className="border-l-4 border-l-blue-500 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="employeeCode" className="text-sm font-semibold text-gray-700">
                Employee Code <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="employeeCode"
                value={formData.employeeCode}
                onChange={(e) => handleInputChange('employeeCode', e.target.value)}
                placeholder="Enter employee code"
                className="h-11 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employeeName" className="text-sm font-semibold text-gray-700">
                Employee Name <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="employeeName"
                value={formData.employeeName}
                onChange={(e) => handleInputChange('employeeName', e.target.value)}
                placeholder="Enter full name"
                className="h-11 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fatherName" className="text-sm font-semibold text-gray-700">
                Father's Name <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="fatherName"
                value={formData.fatherName}
                onChange={(e) => handleInputChange('fatherName', e.target.value)}
                placeholder="Enter father's name"
                className="h-11 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="dob" className="text-sm font-semibold text-gray-700">
                Date of Birth <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="dob"
                type="date"
                value={formData.dob}
                onChange={(e) => handleInputChange('dob', e.target.value)}
                className="h-11 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age" className="text-sm font-semibold text-gray-700">
                Age <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                placeholder="Enter age"
                className="h-11 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="sex" className="text-sm font-semibold text-gray-700">
                Gender <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.sex}
                onChange={(e) => handleInputChange('sex', e.target.value)}
                className="h-11 focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="maritialStatus" className="text-sm font-semibold text-gray-700">
                Marital Status <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.maritialStatus}
                onChange={(e) => handleInputChange('maritialStatus', e.target.value)}
                className="h-11 focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Status</option>
                {maritalStatuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bloodGroup" className="text-sm font-semibold text-gray-700">
                Blood Group <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.bloodGroup}
                onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                className="h-11 focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Blood Group</option>
                {bloodGroups.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="religion" className="text-sm font-semibold text-gray-700">
                Religion <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.religion}
                onChange={(e) => handleInputChange('religion', e.target.value)}
                className="h-11 focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Religion</option>
                {religions.map(religion => (
                  <option key={religion} value={religion}>{religion}</option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationality" className="text-sm font-semibold text-gray-700">
                Nationality <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="nationality"
                value={formData.nationality}
                onChange={(e) => handleInputChange('nationality', e.target.value)}
                placeholder="Enter nationality"
                className="h-11 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="panNo" className="text-sm font-semibold text-gray-700">
              PAN Number <span className="text-red-500">*</span>
            </Label>
            <Input 
              id="panNo"
              value={formData.panNo}
              onChange={(e) => handleInputChange('panNo', e.target.value)}
              placeholder="Enter PAN number"
              className="h-11 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="border-l-4 border-l-green-500 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Phone className="h-5 w-5 text-green-600" />
            </div>
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="mobileNo" className="text-sm font-semibold text-gray-700">
                Mobile Number <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="mobileNo"
                value={formData.mobileNo}
                onChange={(e) => handleInputChange('mobileNo', e.target.value)}
                placeholder="Enter mobile number"
                className="h-11 focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emailPersonal" className="text-sm font-semibold text-gray-700">
                Personal Email <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="emailPersonal"
                type="email"
                value={formData.emailPersonal}
                onChange={(e) => handleInputChange('emailPersonal', e.target.value)}
                placeholder="Enter personal email"
                className="h-11 focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="permanentAddress" className="text-sm font-semibold text-gray-700">
              Permanent Address <span className="text-red-500">*</span>
            </Label>
            <Textarea 
              id="permanentAddress"
              value={formData.permanentAddress}
              onChange={(e) => handleInputChange('permanentAddress', e.target.value)}
              placeholder="Enter permanent address"
              rows={3}
              className="focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="localAddress" className="text-sm font-semibold text-gray-700">
              Local Address <span className="text-red-500">*</span>
            </Label>
            <Textarea 
              id="localAddress"
              value={formData.localAddress}
              onChange={(e) => handleInputChange('localAddress', e.target.value)}
              placeholder="Enter local address"
              rows={3}
              className="focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state" className="text-sm font-semibold text-gray-700">
              State <span className="text-red-500">*</span>
            </Label>
            <Select 
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className="h-11 focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select State</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </Select>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <input 
              type="checkbox" 
              id="companyMobileAllotted"
              checked={formData.companyMobileAllotted}
              onChange={(e) => handleInputChange('companyMobileAllotted', e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <Label htmlFor="companyMobileAllotted" className="text-sm font-medium text-gray-700">
              Company Mobile Allotted
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderEmploymentDetails = () => (
    <div className="space-y-8">
      {/* Job Information */}
      <Card className="border-l-4 border-l-purple-500 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Briefcase className="h-5 w-5 text-purple-600" />
            </div>
            Job Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="designation" className="text-sm font-semibold text-gray-700">
                Designation <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="designation"
                value={formData.designation}
                onChange={(e) => handleInputChange('designation', e.target.value)}
                placeholder="Enter designation"
                className="h-11 focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department" className="text-sm font-semibold text-gray-700">
                Department <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="department"
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                placeholder="Enter department"
                className="h-11 focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="unit" className="text-sm font-semibold text-gray-700">
                Unit <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="unit"
                value={formData.unit}
                onChange={(e) => handleInputChange('unit', e.target.value)}
                placeholder="Enter unit"
                className="h-11 focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doj" className="text-sm font-semibold text-gray-700">
                Date of Joining <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="doj"
                type="date"
                value={formData.doj}
                onChange={(e) => handleInputChange('doj', e.target.value)}
                className="h-11 focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="groupEmailId" className="text-sm font-semibold text-gray-700">
              Group Email ID <span className="text-red-500">*</span>
            </Label>
            <Input 
              id="groupEmailId"
              type="email"
              value={formData.groupEmailId}
              onChange={(e) => handleInputChange('groupEmailId', e.target.value)}
              placeholder="Enter group email ID"
              className="h-11 focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Statutory Information */}
      <Card className="border-l-4 border-l-indigo-500 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Shield className="h-5 w-5 text-indigo-600" />
            </div>
            Statutory Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="pfNo" className="text-sm font-semibold text-gray-700">
                PF Number <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="pfNo"
                value={formData.pfNo}
                onChange={(e) => handleInputChange('pfNo', e.target.value)}
                placeholder="Enter PF number"
                className="h-11 focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="esiNo" className="text-sm font-semibold text-gray-700">
                ESI Number <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="esiNo"
                value={formData.esiNo}
                onChange={(e) => handleInputChange('esiNo', e.target.value)}
                placeholder="Enter ESI number"
                className="h-11 focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="idProof" className="text-sm font-semibold text-gray-700">
              ID Proof <span className="text-red-500">*</span>
            </Label>
            <Input 
              id="idProof"
              value={formData.idProof}
              onChange={(e) => handleInputChange('idProof', e.target.value)}
              placeholder="Enter ID proof details"
              className="h-11 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Salary Information */}
      <Card className="border-l-4 border-l-emerald-500 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <CreditCard className="h-5 w-5 text-emerald-600" />
            </div>
            Salary Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="joiningaSalary" className="text-sm font-semibold text-gray-700">
                Joining Salary <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="joiningaSalary"
                type="number"
                value={formData.joiningaSalary}
                onChange={(e) => handleInputChange('joiningaSalary', e.target.value)}
                placeholder="Enter joining salary"
                className="h-11 focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastDrawnSalary" className="text-sm font-semibold text-gray-700">
                Last Drawn Salary <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="lastDrawnSalary"
                type="number"
                value={formData.lastDrawnSalary}
                onChange={(e) => handleInputChange('lastDrawnSalary', e.target.value)}
                placeholder="Enter last drawn salary"
                className="h-11 focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="lastIncrementDate" className="text-sm font-semibold text-gray-700">
                Last Increment Date <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="lastIncrementDate"
                type="date"
                value={formData.lastIncrementDate}
                onChange={(e) => handleInputChange('lastIncrementDate', e.target.value)}
                className="h-11 focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastIncrementAmount" className="text-sm font-semibold text-gray-700">
                Last Increment Amount <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="lastIncrementAmount"
                type="number"
                value={formData.lastIncrementAmount}
                onChange={(e) => handleInputChange('lastIncrementAmount', e.target.value)}
                placeholder="Enter last increment amount"
                className="h-11 focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderEducationExperience = () => (
    <div className="space-y-8">
      {/* Educational Qualifications */}
      <Card className="border-l-4 border-l-amber-500 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <GraduationCap className="h-5 w-5 text-amber-600" />
            </div>
            Educational Qualifications
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {formData.educationQualifications.map((edu, index) => (
              <div key={index} className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary" className="bg-amber-100 text-amber-800 px-3 py-1">
                    {edu.qualification}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Degree/Board
                    </Label>
                    <Input 
                      value={edu.degreeBoard}
                      onChange={(e) => handleEducationChange(index, 'degreeBoard', e.target.value)}
                      placeholder="Enter degree/board"
                      className="h-10 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      School/College
                    </Label>
                    <Input 
                      value={edu.schoolCollege}
                      onChange={(e) => handleEducationChange(index, 'schoolCollege', e.target.value)}
                      placeholder="Enter school/college"
                      className="h-10 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Passing Year
                    </Label>
                    <Input 
                      type="number"
                      value={edu.passingYear}
                      onChange={(e) => handleEducationChange(index, 'passingYear', e.target.value)}
                      placeholder="Year"
                      className="h-10 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Percentage/Grade
                    </Label>
                    <Input 
                      value={edu.percentage}
                      onChange={(e) => handleEducationChange(index, 'percentage', e.target.value)}
                      placeholder="Grade/Percentage"
                      className="h-10 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Previous Employment */}
      <Card className="border-l-4 border-l-cyan-500 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-cyan-100 rounded-lg">
              <Building2 className="h-5 w-5 text-cyan-600" />
            </div>
            Previous Employment History
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {formData.previousEmployments.map((emp, index) => (
              <div key={index} className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="outline" className="bg-cyan-100 text-cyan-800 px-3 py-1">
                    Employment {index + 1}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Organization Name
                    </Label>
                    <Input 
                      value={emp.organization}
                      onChange={(e) => handleEmploymentChange(index, 'organization', e.target.value)}
                      placeholder="Enter organization name"
                      className="h-10 focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Salary Details
                    </Label>
                    <Input 
                      value={emp.salaryDrawn}
                      onChange={(e) => handleEmploymentChange(index, 'salaryDrawn', e.target.value)}
                      placeholder="Enter salary details"
                      className="h-10 focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Joining Date
                    </Label>
                    <Input 
                      type="date"
                      value={emp.joiningDate}
                      onChange={(e) => handleEmploymentChange(index, 'joiningDate', e.target.value)}
                      className="h-10 focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Leaving Date
                    </Label>
                    <Input 
                      type="date"
                      value={emp.leavingDate}
                      onChange={(e) => handleEmploymentChange(index, 'leavingDate', e.target.value)}
                      className="h-10 focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Reason for Leaving
                  </Label>
                  <Input 
                    value={emp.reasonLeaving}
                    onChange={(e) => handleEmploymentChange(index, 'reasonLeaving', e.target.value)}
                    placeholder="Enter reason for leaving"
                    className="h-10 focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderFamilyDocuments = () => (
    <div className="space-y-8">
      {/* Family Details */}
      <Card className="border-l-4 border-l-pink-500 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-pink-100 rounded-lg">
              <Users className="h-5 w-5 text-pink-600" />
            </div>
            Family Details - Dependents
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {formData.familyDetails.map((family, index) => (
              <div key={index} className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="outline" className="bg-pink-100 text-pink-800 px-3 py-1">
                    Family Member {index + 1}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Name
                    </Label>
                    <Input 
                      value={family.name}
                      onChange={(e) => handleFamilyChange(index, 'name', e.target.value)}
                      placeholder="Enter name"
                      className="h-10 focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Relation
                    </Label>
                    <Select 
                      value={family.relation}
                      onChange={(e) => handleFamilyChange(index, 'relation', e.target.value)}
                      className="h-10 focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="">Select Relation</option>
                      {relations.map(relation => (
                        <option key={relation} value={relation}>{relation}</option>
                      ))}
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Age
                    </Label>
                    <Input 
                      type="number"
                      value={family.age}
                      onChange={(e) => handleFamilyChange(index, 'age', e.target.value)}
                      placeholder="Age"
                      className="h-10 focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Document Upload */}
      <Card className="border-l-4 border-l-teal-500 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-teal-100 rounded-lg">
              <Camera className="h-5 w-5 text-teal-600" />
            </div>
            Document Upload
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center bg-gradient-to-r from-gray-50 to-gray-100 hover:from-teal-50 hover:to-cyan-50 transition-all duration-300">
              <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Upload Employee Photo</h3>
              <p className="text-sm text-gray-500 mb-4">
                Drag and drop your files here, or click to select files
              </p>
              <Input 
                type="file"
                accept="image/*"
                multiple
                className="max-w-xs mx-auto h-10"
              />
              <p className="text-xs text-gray-400 mt-2">
                Supported formats: JPG, PNG, GIF (Max 5MB)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Remarks */}
      <Card className="border-l-4 border-l-orange-500 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <FileText className="h-5 w-5 text-orange-600" />
            </div>
            Additional Information
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <Label htmlFor="remarks" className="text-sm font-semibold text-gray-700">
              Remarks
            </Label>
            <Textarea 
              id="remarks"
              value={formData.remarks}
              onChange={(e) => handleInputChange('remarks', e.target.value)}
              placeholder="Enter any additional remarks or notes..."
              rows={4}
              className="resize-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderBasicInformation();
      case 2:
        return renderEmploymentDetails();
      case 3:
        return renderEducationExperience();
      case 4:
        return renderFamilyDocuments();
      default:
        return renderBasicInformation();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="main-content">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    HR Module: Employee Master Details
                  </h1>
                  <p className="text-gray-600">
                    Complete employee information management system
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1">
                    Step {currentStep} of {steps.length}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">Auto-save enabled</span>
                  </div>
                </div>
              </div>
            </div>
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
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
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
                  Save Employee Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
