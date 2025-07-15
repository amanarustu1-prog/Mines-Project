import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { 
  User, 
  Edit3, 
  MapPin, 
  Phone, 
  Users, 
  GraduationCap,
  CreditCard,
  FileText,
  Calendar,
  Heart,
  Briefcase,
  Shield,
  History,
  UserCheck,
  Save,
  Plus,
  Trash2,
  Camera,
  Upload,
  Download,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

export default function FormThree() {
  const [activeTab, setActiveTab] = useState('leave-overview');
  const [isEditing, setIsEditing] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<any>(null);
  const [approvalNote, setApprovalNote] = useState('');

  // Sample leave data
  const [leaveData, setLeaveData] = useState([
    {
      id: 1,
      empNo: 'SSC001',
      name: 'SHUBHAM',
      fatherName: 'ASHOK',
      mobile: '9057241344',
      email: 'SHUBHAM@TIWARIMININGGROUP.COM',
      leaveType: 'EL',
      fromDate: '2025-07-20',
      toDate: '2025-07-22',
      days: 3,
      reason: 'Family function attendance',
      status: 'Pending',
      appliedDate: '2025-07-14',
      approverNote: ''
    },
    {
      id: 2,
      empNo: 'SSC002',
      name: 'RAHUL KUMAR',
      fatherName: 'RAM KUMAR',
      mobile: '9057241345',
      email: 'RAHUL@TIWARIMININGGROUP.COM',
      leaveType: 'SL',
      fromDate: '2025-07-15',
      toDate: '2025-07-16',
      days: 2,
      reason: 'Medical checkup',
      status: 'Approved',
      appliedDate: '2025-07-13',
      approverNote: 'Medical leave approved'
    },
    {
      id: 3,
      empNo: 'SSC003',
      name: 'PRIYA SHARMA',
      fatherName: 'SURESH SHARMA',
      mobile: '9057241346',
      email: 'PRIYA@TIWARIMININGGROUP.COM',
      leaveType: 'CL',
      fromDate: '2025-07-25',
      toDate: '2025-07-25',
      days: 1,
      reason: 'Personal work',
      status: 'Rejected',
      appliedDate: '2025-07-12',
      approverNote: 'Peak project period, cannot approve casual leave'
    },
    {
      id: 4,
      empNo: 'SSC004',
      name: 'AMIT SINGH',
      fatherName: 'RAJESH SINGH',
      mobile: '9057241347',
      email: 'AMIT@TIWARIMININGGROUP.COM',
      leaveType: 'ML',
      fromDate: '2025-08-01',
      toDate: '2025-08-30',
      days: 30,
      reason: 'Maternity leave',
      status: 'Pending',
      appliedDate: '2025-07-10',
      approverNote: ''
    }
  ]);

  // New leave form data
  const [newLeave, setNewLeave] = useState({
    empNo: 'SSC001',
    name: 'SHUBHAM',
    fatherName: 'ASHOK',
    mobile: '9057241344',
    email: 'SHUBHAM@TIWARIMININGGROUP.COM',
    leaveType: 'EL',
    fromDate: '',
    toDate: '',
    days: 0,
    reason: '',
    status: 'Pending',
    appliedDate: new Date().toISOString().split('T')[0],
    approverNote: ''
  });

  const tabs = [
    { id: 'leave-overview', label: 'Leave Overview', icon: Calendar },
    { id: 'add-leave', label: 'Add Leave Request', icon: Plus },
    { id: 'leave-reports', label: 'Reports', icon: FileText }
  ];

  const employees = [
    { empNo: 'SSC001', name: 'SHUBHAM', fatherName: 'ASHOK', mobile: '9057241344', email: 'SHUBHAM@TIWARIMININGGROUP.COM' },
    { empNo: 'SSC002', name: 'RAHUL KUMAR', fatherName: 'RAM KUMAR', mobile: '9057241345', email: 'RAHUL@TIWARIMININGGROUP.COM' },
    { empNo: 'SSC003', name: 'PRIYA SHARMA', fatherName: 'SURESH SHARMA', mobile: '9057241346', email: 'PRIYA@TIWARIMININGGROUP.COM' },
    { empNo: 'SSC004', name: 'AMIT SINGH', fatherName: 'RAJESH SINGH', mobile: '9057241347', email: 'AMIT@TIWARIMININGGROUP.COM' }
  ];

  const leaveTypes = [
    { code: 'EL', name: 'Earned Leave', color: 'bg-blue-100 text-blue-800' },
    { code: 'SL', name: 'Sick Leave', color: 'bg-red-100 text-red-800' },
    { code: 'CL', name: 'Casual Leave', color: 'bg-green-100 text-green-800' },
    { code: 'ML', name: 'Maternity Leave', color: 'bg-purple-100 text-purple-800' },
    { code: 'PL', name: 'Paternity Leave', color: 'bg-indigo-100 text-indigo-800' },
    { code: 'LWP', name: 'Leave Without Pay', color: 'bg-gray-100 text-gray-800' }
  ];

  const handleEmployeeSelect = (empNo: string) => {
    const employee = employees.find(emp => emp.empNo === empNo);
    if (employee) {
      setNewLeave(prev => ({
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
    setNewLeave(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateLeaveDays = () => {
    if (newLeave.fromDate && newLeave.toDate) {
      const fromDate = new Date(newLeave.fromDate);
      const toDate = new Date(newLeave.toDate);
      const diffTime = toDate.getTime() - fromDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return Math.max(0, diffDays);
    }
    return 0;
  };

  const handleSaveLeave = () => {
    const days = calculateLeaveDays();
    const newEntry = {
      id: leaveData.length + 1,
      ...newLeave,
      days,
      appliedDate: new Date().toISOString().split('T')[0]
    };

    setLeaveData(prev => [...prev, newEntry]);
    setNewLeave({
      empNo: 'SSC001',
      name: 'SHUBHAM',
      fatherName: 'ASHOK',
      mobile: '9057241344',
      email: 'SHUBHAM@TIWARIMININGGROUP.COM',
      leaveType: 'EL',
      fromDate: '',
      toDate: '',
      days: 0,
      reason: '',
      status: 'Pending',
      appliedDate: new Date().toISOString().split('T')[0],
      approverNote: ''
    });
    alert('Leave request saved successfully!');
  };

  const handleApproveReject = (leave: any, action: 'approve' | 'reject') => {
    setSelectedLeave({ ...leave, action });
    setShowApprovalModal(true);
  };

  const submitApproval = () => {
    if (selectedLeave) {
      const updatedStatus = selectedLeave.action === 'approve' ? 'Approved' : 'Rejected';
      setLeaveData(prev => 
        prev.map(leave => 
          leave.id === selectedLeave.id 
            ? { ...leave, status: updatedStatus, approverNote: approvalNote }
            : leave
        )
      );
      setShowApprovalModal(false);
      setApprovalNote('');
      setSelectedLeave(null);
      alert(`Leave request ${updatedStatus.toLowerCase()} successfully!`);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Pending': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
      'Approved': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
      'Rejected': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['Pending'];
    return (
      <Badge className={`${config.bg} ${config.text} ${config.border} border`}>
        {status}
      </Badge>
    );
  };

  const getLeaveTypeBadge = (leaveType: string) => {
    const type = leaveTypes.find(lt => lt.code === leaveType);
    return (
      <Badge className={`${type?.color || 'bg-gray-100 text-gray-800'} border`}>
        {leaveType}
      </Badge>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'leave-overview':
        return (
          <div className="space-y-4">
            {/* Leave Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Pending Requests</p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {leaveData.filter(leave => leave.status === 'Pending').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Approved</p>
                      <p className="text-2xl font-bold text-green-600">
                        {leaveData.filter(leave => leave.status === 'Approved').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <XCircle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Rejected</p>
                      <p className="text-2xl font-bold text-red-600">
                        {leaveData.filter(leave => leave.status === 'Rejected').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Total Requests</p>
                      <p className="text-2xl font-bold text-blue-600">{leaveData.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Leave Requests Table */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-800 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  Leave Requests - {new Date().getFullYear()}
                </CardTitle>
                <Button 
                  size="sm" 
                  onClick={() => setActiveTab('add-leave')}
                  className="h-8 bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Leave Request
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-3 font-medium text-gray-700">Emp No</th>
                        <th className="text-left p-3 font-medium text-gray-700">Employee Name</th>
                        <th className="text-left p-3 font-medium text-gray-700">Leave Type</th>
                        <th className="text-left p-3 font-medium text-gray-700">From Date</th>
                        <th className="text-left p-3 font-medium text-gray-700">To Date</th>
                        <th className="text-left p-3 font-medium text-gray-700">Days</th>
                        <th className="text-left p-3 font-medium text-gray-700">Reason</th>
                        <th className="text-left p-3 font-medium text-gray-700">Status</th>
                        <th className="text-left p-3 font-medium text-gray-700">Applied Date</th>
                        <th className="text-left p-3 font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaveData.map((leave, index) => (
                        <tr key={leave.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="p-3 font-medium text-blue-600">{leave.empNo}</td>
                          <td className="p-3 font-medium">{leave.name}</td>
                          <td className="p-3">{getLeaveTypeBadge(leave.leaveType)}</td>
                          <td className="p-3 font-mono">{new Date(leave.fromDate).toLocaleDateString('en-GB')}</td>
                          <td className="p-3 font-mono">{new Date(leave.toDate).toLocaleDateString('en-GB')}</td>
                          <td className="p-3 font-medium text-center">{leave.days}</td>
                          <td className="p-3 text-gray-600 max-w-32 truncate" title={leave.reason}>
                            {leave.reason}
                          </td>
                          <td className="p-3">{getStatusBadge(leave.status)}</td>
                          <td className="p-3 font-mono text-xs">{new Date(leave.appliedDate).toLocaleDateString('en-GB')}</td>
                          <td className="p-3">
                            <div className="flex gap-1">
                              {leave.status === 'Pending' && (
                                <>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="h-6 w-6 p-0 text-green-600 hover:bg-green-50"
                                    onClick={() => handleApproveReject(leave, 'approve')}
                                  >
                                    <CheckCircle className="h-3 w-3" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="h-6 w-6 p-0 text-red-600 hover:bg-red-50"
                                    onClick={() => handleApproveReject(leave, 'reject')}
                                  >
                                    <XCircle className="h-3 w-3" />
                                  </Button>
                                </>
                              )}
                              <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                <Edit3 className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'add-leave':
        return (
          <div className="space-y-4">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-800 flex items-center gap-2">
                  <Plus className="h-4 w-4 text-green-600" />
                  HR Module: Leave Entry Form
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Employee Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Select Employee Name ***</Label>
                      <select 
                        value={newLeave.empNo}
                        onChange={(e) => handleEmployeeSelect(e.target.value)}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {employees.map(emp => (
                          <option key={emp.empNo} value={emp.empNo}>
                            {emp.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Leave Type:-</Label>
                      <select 
                        value={newLeave.leaveType}
                        onChange={(e) => handleInputChange('leaveType', e.target.value)}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {leaveTypes.map(type => (
                          <option key={type.code} value={type.code}>
                            {type.code} - {type.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Leave Req From:-</Label>
                      <Input 
                        type="date"
                        value={newLeave.fromDate}
                        onChange={(e) => handleInputChange('fromDate', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Leave Req To:-</Label>
                      <Input 
                        type="date"
                        value={newLeave.toDate}
                        onChange={(e) => handleInputChange('toDate', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Total Days:-</Label>
                      <Input 
                        value={`${calculateLeaveDays()} days`}
                        readOnly
                        className="mt-1 bg-gray-50 font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Employee Name</Label>
                      <Input 
                        value={newLeave.name}
                        readOnly
                        className="mt-1 bg-gray-50 font-medium"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Father Name</Label>
                      <Input 
                        value={newLeave.fatherName}
                        readOnly
                        className="mt-1 bg-gray-50"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Mobile</Label>
                      <Input 
                        value={newLeave.mobile}
                        readOnly
                        className="mt-1 bg-gray-50"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Email</Label>
                      <Input 
                        value={newLeave.email}
                        readOnly
                        className="mt-1 bg-gray-50 text-xs"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Applied Date</Label>
                      <Input 
                        value={new Date(newLeave.appliedDate).toLocaleDateString('en-GB')}
                        readOnly
                        className="mt-1 bg-gray-50"
                      />
                    </div>
                  </div>
                </div>

                {/* Reason Section */}
                <div className="border-t pt-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Reason For Leave ***</Label>
                    <Textarea 
                      value={newLeave.reason}
                      onChange={(e) => handleInputChange('reason', e.target.value)}
                      className="mt-1"
                      rows={4}
                      placeholder="Please provide detailed reason for leave request..."
                    />
                  </div>

                  <div className="flex gap-3 mt-6 pt-4 border-t">
                    <Button 
                      onClick={handleSaveLeave}
                      className="bg-green-600 hover:bg-green-700"
                      disabled={!newLeave.fromDate || !newLeave.toDate || !newLeave.reason.trim()}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Leave Request Details
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setActiveTab('leave-overview')}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'leave-reports':
        return (
          <div className="space-y-4">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-800 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-purple-600" />
                  Leave Reports & Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border border-gray-200">
                    <CardContent className="p-4 text-center">
                      <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-gray-900">Monthly Leave Report</h3>
                      <p className="text-sm text-gray-600 mb-3">Generate monthly leave summary</p>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200">
                    <CardContent className="p-4 text-center">
                      <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-gray-900">Employee Wise Leave</h3>
                      <p className="text-sm text-gray-600 mb-3">Individual employee leave balance</p>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200">
                    <CardContent className="p-4 text-center">
                      <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-gray-900">Leave Type Analysis</h3>
                      <p className="text-sm text-gray-600 mb-3">Leave type wise breakdown</p>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Leave Statistics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">
                        {leaveData.reduce((sum, leave) => sum + leave.days, 0)}
                      </p>
                      <p className="text-sm text-blue-700">Total Leave Days</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        {leaveData.filter(leave => leave.status === 'Approved').reduce((sum, leave) => sum + leave.days, 0)}
                      </p>
                      <p className="text-sm text-green-700">Approved Days</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-yellow-600">
                        {leaveData.filter(leave => leave.status === 'Pending').reduce((sum, leave) => sum + leave.days, 0)}
                      </p>
                      <p className="text-sm text-yellow-700">Pending Days</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-600">
                        {Math.round((leaveData.filter(leave => leave.status === 'Approved').length / leaveData.length) * 100)}%
                      </p>
                      <p className="text-sm text-purple-700">Approval Rate</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Leave Management</h1>
                <p className="text-xs text-gray-500">Employee leave requests and approval system</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="h-8">
                <Download className="h-3 w-3 mr-1" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        
        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <nav className="p-4">
              <div className="flex space-x-1 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
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

      {/* Approval/Rejection Modal */}
      {showApprovalModal && selectedLeave && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {selectedLeave.action === 'approve' ? 'Approve' : 'Reject'} Leave Request
            </h3>
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Employee: <span className="font-medium">{selectedLeave.name}</span></p>
              <p className="text-sm text-gray-600">Leave Type: <span className="font-medium">{selectedLeave.leaveType}</span></p>
              <p className="text-sm text-gray-600">Duration: <span className="font-medium">{selectedLeave.days} days</span></p>
              <p className="text-sm text-gray-600">Reason: <span className="font-medium">{selectedLeave.reason}</span></p>
            </div>
            <div className="mb-4">
              <Label className="text-sm font-medium text-gray-700">Approver Note</Label>
              <Textarea
                value={approvalNote}
                onChange={(e) => setApprovalNote(e.target.value)}
                className="mt-1"
                rows={3}
                placeholder={`Add a note for ${selectedLeave.action === 'approve' ? 'approval' : 'rejection'}...`}
              />
            </div>
            <div className="flex gap-3">
              <Button
                onClick={submitApproval}
                className={selectedLeave.action === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
              >
                {selectedLeave.action === 'approve' ? 'Approve' : 'Reject'}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowApprovalModal(false);
                  setApprovalNote('');
                  setSelectedLeave(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
