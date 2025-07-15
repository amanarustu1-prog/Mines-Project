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
  Package,
  Monitor,
  Smartphone,
  Laptop,
  AlertCircle,
  Archive
} from 'lucide-react';

export default function FormFour() {
  const [activeTab, setActiveTab] = useState('belongings-overview');
  const [isEditing, setIsEditing] = useState(false);

  // Sample belongings data
  const [belongingsData, setBelongingsData] = useState([
    {
      id: 1,
      empNo: 'SSC001',
      name: 'SHUBHAM',
      fatherName: 'ASHOK',
      mobile: '9057241344',
      doj: '01/Mar/20',
      curSal: '10000.00',
      itemIssued: 'Laptop Dell Inspiron 15',
      itemValue: '45000.00',
      issuedOn: '2025-07-01',
      itemStatus: 'Issued',
      remarks: 'Assigned for development work'
    },
    {
      id: 2,
      empNo: 'SSC002',
      name: 'RAHUL KUMAR',
      fatherName: 'RAM KUMAR',
      mobile: '9057241345',
      doj: '15/Jun/21',
      curSal: '12000.00',
      itemIssued: 'Mobile Phone iPhone 13',
      itemValue: '65000.00',
      issuedOn: '2025-06-15',
      itemStatus: 'Issued',
      remarks: 'Official mobile for field work'
    },
    {
      id: 3,
      empNo: 'SSC003',
      name: 'PRIYA SHARMA',
      fatherName: 'SURESH SHARMA',
      mobile: '9057241346',
      doj: '10/Jan/22',
      curSal: '8000.00',
      itemIssued: 'Monitor Samsung 24 inch',
      itemValue: '15000.00',
      issuedOn: '2025-05-20',
      itemStatus: 'Returned',
      remarks: 'Returned after project completion'
    },
    {
      id: 4,
      empNo: 'SSC004',
      name: 'AMIT SINGH',
      fatherName: 'RAJESH SINGH',
      mobile: '9057241347',
      doj: '05/Aug/21',
      curSal: '11000.00',
      itemIssued: 'Headset Logitech H390',
      itemValue: '3500.00',
      issuedOn: '2025-07-10',
      itemStatus: 'Issued',
      remarks: 'For customer support role'
    }
  ]);

  // New belonging form data
  const [newBelonging, setNewBelonging] = useState({
    empNo: 'SSC001',
    name: 'SHUBHAM',
    fatherName: 'ASHOK',
    mobile: '9057241344',
    doj: '01/Mar/20',
    curSal: '10000.00',
    itemIssued: '',
    itemValue: '',
    issuedOn: new Date().toISOString().split('T')[0],
    itemStatus: 'Issued',
    remarks: ''
  });

  const tabs = [
    { id: 'belongings-overview', label: 'Belongings Overview', icon: Package },
    { id: 'add-belonging', label: 'Issue Item', icon: Plus },
    { id: 'belongings-reports', label: 'Reports', icon: FileText }
  ];

  const employees = [
    { empNo: 'SSC001', name: 'SHUBHAM', fatherName: 'ASHOK', mobile: '9057241344', doj: '01/Mar/20', curSal: '10000.00' },
    { empNo: 'SSC002', name: 'RAHUL KUMAR', fatherName: 'RAM KUMAR', mobile: '9057241345', doj: '15/Jun/21', curSal: '12000.00' },
    { empNo: 'SSC003', name: 'PRIYA SHARMA', fatherName: 'SURESH SHARMA', mobile: '9057241346', doj: '10/Jan/22', curSal: '8000.00' },
    { empNo: 'SSC004', name: 'AMIT SINGH', fatherName: 'RAJESH SINGH', mobile: '9057241347', doj: '05/Aug/21', curSal: '11000.00' }
  ];

  const itemCategories = [
    { name: 'Laptop', icon: Laptop, color: 'bg-blue-100 text-blue-800' },
    { name: 'Mobile Phone', icon: Smartphone, color: 'bg-green-100 text-green-800' },
    { name: 'Monitor', icon: Monitor, color: 'bg-purple-100 text-purple-800' },
    { name: 'Headset', icon: Package, color: 'bg-orange-100 text-orange-800' },
    { name: 'Other', icon: Package, color: 'bg-gray-100 text-gray-800' }
  ];

  const handleEmployeeSelect = (empNo: string) => {
    const employee = employees.find(emp => emp.empNo === empNo);
    if (employee) {
      setNewBelonging(prev => ({
        ...prev,
        empNo: employee.empNo,
        name: employee.name,
        fatherName: employee.fatherName,
        mobile: employee.mobile,
        doj: employee.doj,
        curSal: employee.curSal
      }));
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setNewBelonging(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveBelonging = () => {
    const newEntry = {
      id: belongingsData.length + 1,
      ...newBelonging,
      issuedOn: newBelonging.issuedOn || new Date().toISOString().split('T')[0]
    };

    setBelongingsData(prev => [...prev, newEntry]);
    setNewBelonging({
      empNo: 'SSC001',
      name: 'SHUBHAM',
      fatherName: 'ASHOK',
      mobile: '9057241344',
      doj: '01/Mar/20',
      curSal: '10000.00',
      itemIssued: '',
      itemValue: '',
      issuedOn: new Date().toISOString().split('T')[0],
      itemStatus: 'Issued',
      remarks: ''
    });
    alert('Item issue details saved successfully!');
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Issued': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
      'Returned': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
      'Damaged': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
      'Lost': { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['Issued'];
    return (
      <Badge className={`${config.bg} ${config.text} ${config.border} border`}>
        {status}
      </Badge>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'belongings-overview':
        return (
          <div className="space-y-4">
            {/* Belongings Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Package className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Items Issued</p>
                      <p className="text-2xl font-bold text-green-600">
                        {belongingsData.filter(item => item.itemStatus === 'Issued').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Download className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Items Returned</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {belongingsData.filter(item => item.itemStatus === 'Returned').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <Trash2 className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Damaged/Lost</p>
                      <p className="text-2xl font-bold text-red-600">
                        {belongingsData.filter(item => item.itemStatus === 'Damaged' || item.itemStatus === 'Lost').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Total Value</p>
                      <p className="text-2xl font-bold text-purple-600">
                        ₹{belongingsData.reduce((sum, item) => sum + parseFloat(item.itemValue || '0'), 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Belongings Table */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-800 flex items-center gap-2">
                  <Package className="h-4 w-4 text-blue-600" />
                  Employee Belongings - Current Records
                </CardTitle>
                <Button 
                  size="sm" 
                  onClick={() => setActiveTab('add-belonging')}
                  className="h-8 bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Issue Item
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-3 font-medium text-gray-700">Emp No</th>
                        <th className="text-left p-3 font-medium text-gray-700">Employee Name</th>
                        <th className="text-left p-3 font-medium text-gray-700">Item Issued</th>
                        <th className="text-left p-3 font-medium text-gray-700">Item Value</th>
                        <th className="text-left p-3 font-medium text-gray-700">Issued On</th>
                        <th className="text-left p-3 font-medium text-gray-700">Status</th>
                        <th className="text-left p-3 font-medium text-gray-700">Remarks</th>
                        <th className="text-left p-3 font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {belongingsData.map((belonging, index) => (
                        <tr key={belonging.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="p-3 font-medium text-blue-600">{belonging.empNo}</td>
                          <td className="p-3 font-medium">{belonging.name}</td>
                          <td className="p-3 text-gray-700">{belonging.itemIssued}</td>
                          <td className="p-3 font-mono text-green-600">₹{parseFloat(belonging.itemValue || '0').toLocaleString()}</td>
                          <td className="p-3 font-mono text-xs">{new Date(belonging.issuedOn).toLocaleDateString('en-GB')}</td>
                          <td className="p-3">{getStatusBadge(belonging.itemStatus)}</td>
                          <td className="p-3 text-gray-600 max-w-32 truncate" title={belonging.remarks}>
                            {belonging.remarks}
                          </td>
                          <td className="p-3">
                            <div className="flex gap-1">
                              <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                <Edit3 className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-red-600 hover:bg-red-50">
                                <Trash2 className="h-3 w-3" />
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

      case 'add-belonging':
        return (
          <div className="space-y-4">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-800 flex items-center gap-2">
                  <Plus className="h-4 w-4 text-green-600" />
                  HR Module:- Belongings of Employee
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Employee Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Employee Code:-</Label>
                      <select 
                        value={newBelonging.empNo}
                        onChange={(e) => handleEmployeeSelect(e.target.value)}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {employees.map(emp => (
                          <option key={emp.empNo} value={emp.empNo}>
                            {emp.empNo}
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-gray-500 mt-1">{newBelonging.empNo}</p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Item Issued</Label>
                      <Input 
                        value={newBelonging.itemIssued}
                        onChange={(e) => handleInputChange('itemIssued', e.target.value)}
                        className="mt-1"
                        placeholder="Enter item description..."
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Item Value</Label>
                      <Input 
                        type="number"
                        value={newBelonging.itemValue}
                        onChange={(e) => handleInputChange('itemValue', e.target.value)}
                        className="mt-1"
                        placeholder="Enter item value in ₹"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Remarks</Label>
                      <Textarea 
                        value={newBelonging.remarks}
                        onChange={(e) => handleInputChange('remarks', e.target.value)}
                        className="mt-1"
                        rows={2}
                        placeholder="Enter remarks..."
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Employee Name</Label>
                      <Input 
                        value={newBelonging.name}
                        readOnly
                        className="mt-1 bg-gray-50 font-medium"
                      />
                      <p className="text-xs text-gray-500 mt-1">、名茶を</p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Issued On:-</Label>
                      <Input 
                        type="date"
                        value={newBelonging.issuedOn}
                        onChange={(e) => handleInputChange('issuedOn', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Item Status</Label>
                      <select 
                        value={newBelonging.itemStatus}
                        onChange={(e) => handleInputChange('itemStatus', e.target.value)}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Issued">Issued</option>
                        <option value="Returned">Returned</option>
                        <option value="Damaged">Damaged</option>
                        <option value="Lost">Lost</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Employee Details Card */}
                <div className="border-t pt-6">
                  <Card className="bg-gray-50 border-gray-200">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
                        <div>
                          <Label className="text-xs text-gray-500">EmpNo</Label>
                          <p className="font-medium text-blue-600">{newBelonging.empNo}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">Name</Label>
                          <p className="font-medium">{newBelonging.name}</p>
                          <p className="text-xs text-gray-600">Select {newBelonging.empNo} {newBelonging.name} {newBelonging.fatherName}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">Father Name</Label>
                          <p className="text-gray-700">{newBelonging.fatherName}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">Mobile</Label>
                          <p className="text-gray-700">{newBelonging.mobile}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">DoJ / Cur Sal</Label>
                          <p className="text-gray-700">{newBelonging.doj}</p>
                          <p className="text-green-600 font-medium">₹{parseFloat(newBelonging.curSal || '0').toLocaleString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t">
                  <Button 
                    onClick={handleSaveBelonging}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={!newBelonging.itemIssued.trim() || !newBelonging.itemValue}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Issue Details
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setActiveTab('belongings-overview')}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'belongings-reports':
        return (
          <div className="space-y-4">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-800 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-purple-600" />
                  Belongings Reports & Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border border-gray-200">
                    <CardContent className="p-4 text-center">
                      <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-gray-900">Asset Register</h3>
                      <p className="text-sm text-gray-600 mb-3">Complete asset inventory report</p>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200">
                    <CardContent className="p-4 text-center">
                      <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-gray-900">Employee-wise Assets</h3>
                      <p className="text-sm text-gray-600 mb-3">Assets allocated to each employee</p>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200">
                    <CardContent className="p-4 text-center">
                      <DollarSign className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                      <h3 className="font-semibold text-gray-900">Value Analysis</h3>
                      <p className="text-sm text-gray-600 mb-3">Asset value breakdown report</p>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Asset Statistics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">
                        ₹{belongingsData.reduce((sum, item) => sum + parseFloat(item.itemValue || '0'), 0).toLocaleString()}
                      </p>
                      <p className="text-sm text-blue-700">Total Asset Value</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        ₹{belongingsData.filter(item => item.itemStatus === 'Issued').reduce((sum, item) => sum + parseFloat(item.itemValue || '0'), 0).toLocaleString()}
                      </p>
                      <p className="text-sm text-green-700">Active Assets</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-orange-600">
                        {Math.round((belongingsData.filter(item => item.itemStatus === 'Issued').length / belongingsData.length) * 100)}%
                      </p>
                      <p className="text-sm text-orange-700">Utilization Rate</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-600">
                        ₹{Math.round(belongingsData.reduce((sum, item) => sum + parseFloat(item.itemValue || '0'), 0) / employees.length).toLocaleString()}
                      </p>
                      <p className="text-sm text-purple-700">Avg per Employee</p>
                    </div>
                  </div>
                </div>

                {/* Asset Categories */}
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Asset Categories</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {itemCategories.map((category, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <category.icon className="h-6 w-6 text-gray-600" />
                        <div>
                          <p className="font-medium text-sm">{category.name}</p>
                          <p className="text-xs text-gray-500">
                            {belongingsData.filter(item => item.itemIssued.toLowerCase().includes(category.name.toLowerCase())).length} items
                          </p>
                        </div>
                      </div>
                    ))}
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
                <Package className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Employee Belongings Management</h1>
                <p className="text-xs text-gray-500">Asset allocation and tracking system</p>
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
    </div>
  );
}
