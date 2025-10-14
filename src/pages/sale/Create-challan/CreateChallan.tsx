import React, { useEffect, useState } from 'react';
import './CreateChallan.css';
import { CheckCircleIcon, ClockIcon, Edit3Icon, PlusIcon, TrendingUpIcon } from 'lucide-react';
import { FiPrinter, FiSave, FiSearch } from 'react-icons/fi';
import { FiX } from "react-icons/fi";
import { FaEdit } from 'react-icons/fa';
import DataTable from 'react-data-table-component';
import Select from 'react-select';

// React DatePicker
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { customStyles } from '@/common/Utility';
import { fetch_Post_Data, fetchPostData } from '@/components/hooks/Api';
import { toastifyError } from '@/common/AlertMsg';

// Icon components
const Receipt = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5l-5-5 4-4 5 5v6a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h7l5 5v11z" />
    </svg>
);

const Plus = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
);

const Save = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v11a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
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

const Calendar = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v12a2 2 0 002 2z" />
    </svg>
);

const Search = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const Trash2 = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 7-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const Edit3 = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
);

const BarChart3 = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13l4-4L11 13l4-4 4 4M3 21h18" />
    </svg>
);

const UsersIcon = ({ style }: { style?: React.CSSProperties }) => (
    <svg className="employee-master-icon" style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const FileTextIcon = () => (
    <svg className="employee-master-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5l-5-5 4-4 5 5v6a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h7l5 5v11z" />
    </svg>
);

const DownloadIcon = () => (
    <svg className="employee-master-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
)

const ListIcon = () => (
    <svg className="employee-master-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v12a2 2 0 002 2z" />
    </svg>
);

const SearchIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

// Base interface for common product fields
interface BaseProductFields {
    id: string;
    rate: number;
    grossWeight: number;
    netWeight: number;
    lessWeight: number;
    gtWeight: number;
    amount: number;
    dateTime: string;
}

// ChallanItem is used in the form state
interface ChallanItem extends BaseProductFields {
    productName: string;
}

// ProductDetail is used in the form data
interface ProductDetail extends BaseProductFields {
    name: string;
}

interface WeightDetail {
    tareWeight: number;
    dateTime: string;
    netWeight: number;
    lessWeight: number;
    totalGTWeight: number;
    vehicleCommission: number;
}

interface ChallanFormData {
    challanNo: string;
    financialYear: string;
    autoGenerated: boolean;
    dateTime: string;
    paymentType: 'cash' | 'credit';

    // Consignee details
    consignee: string;
    address: string;
    state: string;
    district: string;
    pin: string;
    contact: string;
    emailId: string;

    // Vehicle details
    advAmount: number;
    vehicleType: string;
    vehicleNo: string;
    vehicleRemarks: string;
    driverName: string;
    driverNumber: string;

    // GST details
    gstBill: boolean;
    gstNumber: string;
    gstName: string;
    gstAddress: string;
    gstState: string;
    gstDistrict: string;
    gstPin: string;

    // Additional fields
    endUser: boolean;
    dealer: boolean;
    balance: number;
    limit: number;

    // Product and weight details
    productDetails: ProductDetail[];
    weightDetails: WeightDetail;

    // Amount details
    amount: number;
    loading: number;
    commission: number;
    total: number;
    gstAmount: number;
    royalty: number;
    tpAmount: number;
    freightAmt: number;
    extraAmt: number;
    grandTotal: number;

    // Status field
    status?: 'Active' | 'Inactive' | 'Pending' | 'Approved' | 'Rejected';

    // Additional optional fields for UI logic
    department?: string;
    joiningDate?: string;
}

interface ChallanTableItem {
    id: string;
    challanNo: string;
    challanDate: string;
    consignee: string;
    partyAddress: string;
    vehicleNo: string;
    productName: string;
    grossWeight: number;
    netWeight: number;
    lessWeight: number;
    gtWeight: number;
    amount: number;
    rate: number;
    status: 'Pending' | 'Approved' | 'Rejected';
}

export default function CreateChallan() {
    const [activeTab, setActiveTab] = useState('challanOverview');
    const [showInput, setShowInput] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // ----------- Custom ------------
    const [loading, setLoading] = useState(false);
    const [ filter, setFilter ] = useState<"active" | "inactive" | "all">("active");
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [activeCounts, setActiveCounts] = useState(0);
    const [inactiveCounts, setInactiveCounts] = useState(0);
    const [challanData, setChallanData] = useState<ChallanFormData>({
        challanNo: 'S',
        financialYear: '2025-2026',
        autoGenerated: true,
        dateTime: '23/07/2025 19:57:00',
        paymentType: 'cash',

        consignee: '',
        address: '',
        state: '',
        district: '',
        pin: '',
        contact: '',
        emailId: '',

        advAmount: 0,
        vehicleType: '',
        vehicleNo: '',
        vehicleRemarks: '',
        driverName: '',
        driverNumber: '',

        gstBill: false,
        gstNumber: '',
        gstName: '',
        gstAddress: '',
        gstState: '',
        gstDistrict: '',
        gstPin: '',

        endUser: true,
        dealer: false,
        balance: 0,
        limit: 0,

        productDetails: [],
        weightDetails: {
            tareWeight: 0,
            dateTime: '',
            netWeight: 0,
            lessWeight: 0,
            totalGTWeight: 0,
            vehicleCommission: 0,
        },

        amount: 0,
        loading: 0,
        commission: 0,
        total: 0,
        gstAmount: 0,
        royalty: 0,
        tpAmount: 0,
        freightAmt: 0,
        extraAmt: 0,
        grandTotal: 0,
    });

    const [productDetails, setProductDetails] = useState<ProductDetail[]>([
        {
            id: '1',
            name: '',
            rate: 0,
            grossWeight: 0,
            dateTime: '',
            netWeight: 0,
            lessWeight: 0,
            gtWeight: 0,
            amount: 0,
        },
    ]);

    const [challanItems, setChallanItems] = useState<ChallanItem[]>([]);
    const [currentItem, setCurrentItem] = useState<Partial<ChallanItem>>({
        productName: '',
        rate: 0,
        grossWeight: 0,
        netWeight: 0,
        lessWeight: 0,
        gtWeight: 0,
        amount: 0,
        dateTime: new Date().toISOString(),
    });

    const [challanTableData, setChallanTableData] = useState<ChallanTableItem[]>([{
        id: '1',
        challanNo: 'CH-2025-001',
        challanDate: '25/07/2025',
        consignee: 'ABC Traders',
        partyAddress: '123 Industrial Area, Mumbai',
        vehicleNo: 'MH01AB1234',
        productName: 'Iron Ore',
        grossWeight: 5000,
        netWeight: 4950,
        lessWeight: 50,
        gtWeight: 4900,
        amount: 122500,
        rate: 25.00,
        status: 'Pending'
    }, {
        id: '2',
        challanNo: 'CH-2025-002',
        challanDate: '26/07/2025',
        consignee: 'XYZ Minerals',
        partyAddress: '456 Mining Zone, Pune',
        vehicleNo: 'MH12CD5678',
        productName: 'Bauxite',
        grossWeight: 3500,
        netWeight: 3470,
        lessWeight: 30,
        gtWeight: 3440,
        amount: 86000,
        rate: 25.00,
        status: 'Approved'
    }, {
        id: '3',
        challanNo: 'CH-2025-003',
        challanDate: '27/07/2025',
        consignee: 'PQR Exports',
        partyAddress: '789 Port Road, Goa',
        vehicleNo: 'GA07EF9012',
        productName: 'Coal',
        grossWeight: 7000,
        netWeight: 6950,
        lessWeight: 50,
        gtWeight: 6900,
        amount: 172500,
        rate: 25.00,
        status: 'Rejected'
    }]);

    const handleInputChange = (field: keyof ChallanFormData, value: any) => {
        setChallanData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChangeItem = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newValue = name === 'productName' ? value : parseFloat(value) || 0;

        updateCalculations({
            ...currentItem,
            [name]: newValue
        });
    };

    const handleChallanInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        let newValue: any = value;

        if (type === 'number') {
            newValue = parseFloat(value) || 0;
        } else if (type === 'checkbox') {
            newValue = (e.target as HTMLInputElement).checked;
        }

        handleInputChange(name as keyof ChallanFormData, newValue);
    };

    // Calculate GT Weight (Gross Weight - Tare Weight - Less Weight)
    const calculateGTWeight = (netWeight: number, lessWeight: number): number => {
        return Math.max(0, netWeight - lessWeight);
    };

    // Calculate total amount (Rate * GT Weight)
    const calculateAmount = (rate: number, gtWeight: number): number => {
        return parseFloat((rate * gtWeight).toFixed(2));
    };

    // Update calculations when item values change
    const updateCalculations = (item: Partial<ChallanItem>) => {
        if (item.netWeight !== undefined || item.lessWeight !== undefined) {
            const gtWeight = calculateGTWeight(
                item.netWeight || currentItem.netWeight || 0,
                item.lessWeight || currentItem.lessWeight || 0
            );
            const amount = calculateAmount(
                item.rate !== undefined ? item.rate : (currentItem.rate || 0),
                gtWeight
            );

            setCurrentItem(prev => ({
                ...prev,
                ...item,
                gtWeight,
                amount
            }));
        } else if (item.rate !== undefined) {
            const amount = calculateAmount(
                item.rate,
                currentItem.gtWeight || 0
            );
            setCurrentItem(prev => ({
                ...prev,
                ...item,
                amount
            }));
        } else {
            setCurrentItem(prev => ({
                ...prev,
                ...item
            }));
        }
    };

    // Remove item from challan
    const handleRemoveItem = (id: string) => {
        setChallanItems(challanItems.filter(item => item.id !== id));
    };

    // Edit existing item
    const handleEditItem = (id: string) => {
        const itemToEdit = challanItems.find(item => item.id === id);
        if (itemToEdit) {
            setCurrentItem(itemToEdit);
            handleRemoveItem(id);
        }
    };

    // Print challan
    const handlePrint = () => {
        window.print();
    };

    // Update challan data when items or related fields change
    React.useEffect(() => {
        // Recalculate totals when challan items or related fields change
        const { totalGTWeight, totalAmount, gstAmount, grandTotal } = calculateTotals();

        // Update state with new calculations
        setChallanData(prev => ({
            ...prev,
            amount: totalAmount,
            gstAmount,
            grandTotal,
            weightDetails: {
                ...prev.weightDetails,
                totalGTWeight,
                netWeight: challanItems.reduce((sum, item) => sum + (item.netWeight || 0), 0)
            }
        }));
    }, [challanItems, challanData.loading, challanData.commission, challanData.royalty, challanData.tpAmount, challanData.freightAmt, challanData.extraAmt, challanData.gstBill]);

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        // Calculate totals
        const totalGTWeight = challanItems.reduce((sum, item) => sum + item.gtWeight, 0);
        const totalAmount = challanItems.reduce((sum, item) => sum + item.amount, 0);
        const gstAmount = challanData.gstBill ? totalAmount * 0.18 : 0; // 18% GST
        const grandTotal = totalAmount + gstAmount + (challanData.freightAmt || 0) + (challanData.extraAmt || 0);

        // Update challan data with calculated values
        const updatedChallan: any = {
            ...challanData,
            productDetails: [...challanItems],
            amount: totalAmount,
            gstAmount,
            grandTotal,
            weightDetails: {
                ...challanData.weightDetails,
                totalGTWeight,
                netWeight: challanItems.reduce((sum, item) => sum + item.netWeight, 0)
            }
        };

        setChallanData(updatedChallan ?? {});


        // Here you would typically send the data to an API
        console.log('Submitting challan:', updatedChallan);
        alert('Challan saved successfully!');
    };

    // Validate form before submission
    const validateForm = (): boolean => {
        if (!challanData.consignee) {
            alert('Please enter consignee name');
            return false;
        }
        if (!challanData.vehicleNo) {
            alert('Please enter vehicle number');
            return false;
        }
        if (challanItems.length === 0) {
            alert('Please add at least one product');
            return false;
        }
        return true;
    };

    // Add new challan item
    const handleAddItem = () => {
        if (!currentItem.productName || !currentItem.rate || !currentItem.grossWeight) {
            alert('Please fill all required fields');
            return;
        }

        const gtWeight = calculateGTWeight(currentItem.netWeight || 0, currentItem.lessWeight || 0);
        const amount = calculateAmount(currentItem.rate || 0, gtWeight);

        const newItem: ChallanItem = {
            id: Date.now().toString(),
            productName: currentItem.productName || '',
            rate: currentItem.rate || 0,
            grossWeight: currentItem.grossWeight || 0,
            netWeight: currentItem.netWeight || 0,
            lessWeight: currentItem.lessWeight || 0,
            gtWeight,
            amount,
            dateTime: new Date().toISOString(),
        };

        setChallanItems([...challanItems, newItem]);

        // Reset form
        setCurrentItem({
            productName: '',
            rate: 0,
            grossWeight: 0,
            netWeight: 0,
            lessWeight: 0,
            gtWeight: 0,
            amount: 0,
            dateTime: new Date().toISOString(),
        });
    };

    const handleDeleteItem = (id: string) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            setChallanItems(challanItems.filter(item => item.id !== id));
        }
    };

    const challanHistoryColumns = [
        {
            name: 'Actions',
            cell: (row: ChallanTableItem) => (
                <FaEdit className="text-blue-600 cursor-pointer" size={20} />
            ),

        },
        {
            name: 'Challan No',
            selector: (row: ChallanTableItem) => row.challanNo,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="font-medium">{row.challanNo}</span>
            ),
        },
        {
            name: 'Challan Date',
            selector: (row: ChallanTableItem) => row.challanDate,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span>{row.challanDate}</span>
            ),
        },
        {
            name: 'Consignee',
            selector: (row: ChallanTableItem) => row.consignee,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="font-medium">{row.consignee}</span>
            ),
        },
        {
            name: 'Address',
            selector: (row: ChallanTableItem) => row.partyAddress,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="text-sm text-gray-600">{row.partyAddress}</span>
            ),
        },
        {
            name: 'Vehicle No',
            selector: (row: ChallanTableItem) => row.vehicleNo,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="font-mono text-sm">{row.vehicleNo}</span>
            ),
        },
        {
            name: 'Product Name',
            selector: (row: ChallanTableItem) => row.productName,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="font-medium">{row.productName}</span>
            ),
        },
        {
            name: 'Gross Weight',
            selector: (row: ChallanTableItem) => row.grossWeight,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="text-right">{row.grossWeight?.toLocaleString() || 'N/A'}</span>
            ),

        },
        {
            name: 'Net Weight',
            selector: (row: ChallanTableItem) => row.netWeight,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="text-right">{row.netWeight?.toLocaleString() || 'N/A'}</span>
            ),

        },
        {
            name: 'Less Weight',
            selector: (row: ChallanTableItem) => row.lessWeight,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="text-right">{row.lessWeight?.toLocaleString() || 'N/A'}</span>
            ),

        },
        {
            name: 'GT Weight',
            selector: (row: ChallanTableItem) => row.gtWeight,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="text-right font-semibold">{row.gtWeight?.toLocaleString() || 'N/A'}</span>
            ),

        },
        {
            name: 'Amount',
            selector: (row: ChallanTableItem) => row.amount,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="text-right font-semibold text-green-600">
                    ₹{row.amount?.toLocaleString() || 'N/A'}
                </span>
            ),

        },
        {
            name: 'Rate',
            selector: (row: ChallanTableItem) => row.rate,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="text-right font-mono">
                    ₹{row.rate?.toFixed(2) || 'N/A'}
                </span>
            ),

        },
    ];

    const getChallanItem = async () => {
        try {
            setLoading(true);  
    
            const payload = {
                CompanyId: Number(localStorage.getItem("companyID")),
                // IsActive: filter === "active" ? 1 : filter === "inactive" ? 0 : ""
                IsForApproval: '',
                CreatedDatefrom: '',
                CreatedDateTo: '',
                IsRejetc: ''
            }
            const response = await fetchPostData('Challan/GetData_Challan', payload);
                setChallanItems(response);           
            } catch (error: any) {
                // console.error('Error fetching material names:', error);
                // toastifyError(`Error fetching material names: ${error.message}`);
                setChallanItems([]);
            } finally {
                setLoading(false);
            }
    };

    const fetchCounts = async () => {
        try {
            const payload = {
                CompanyId: Number(localStorage.getItem("companyID")),
                // IsActive: filter === "active" ? 1 : filter === "inactive" ? 0 : ""
                IsForApproval: '',
                CreatedDatefrom: '',
                CreatedDateTo: '',
                IsRejetc: ''
            }
            const [activeResp, inactiveResp] = await Promise.all([
                fetch_Post_Data('Challan/GetData_Challan', { IsActive: 1, CompanyId: Number(localStorage.getItem("companyID")) }),
                fetch_Post_Data('Challan/GetData_Challan', { IsActive: 0, CompanyId: Number(localStorage.getItem("companyID")) }),
            ]);
        
            setActiveCounts(Array.isArray(activeResp?.Data) ? activeResp.Data.length : 0);
            setInactiveCounts(Array.isArray(inactiveResp?.Data) ? inactiveResp.Data.length : 0)
        } catch (err) {
            toastifyError("Error fetching counts");
        }
    };
        
    useEffect(() => {
        getChallanItem();
        fetchCounts();
    }, [filter]);

    const addProductDetail = () => {
        const newProduct: ProductDetail = {
            id: Date.now().toString(),
            name: '',
            rate: 0,
            grossWeight: 0,
            dateTime: '',
            netWeight: 0,
            lessWeight: 0,
            gtWeight: 0,
            amount: 0,
        };
        setProductDetails([...productDetails, newProduct]);
    };

    const removeProductDetail = (id: string) => {
        setProductDetails(productDetails.filter(product => product.id !== id));
    };

    const updateProductDetail = (id: string, field: keyof ProductDetail, value: any) => {
        setProductDetails(productDetails.map(product =>
            product.id === id ? { ...product, [field]: value } : product
        ));
    };

    // Calculate totals including all challan items and additional charges
    const calculateTotals = () => {
        // Calculate item-based totals with proper type safety
        const totals = {
            totalGTWeight: 0,
            totalAmount: 0,
            totalNetWeight: 0
        };

        // Calculate totals from challan items
        challanItems.forEach(item => {
            totals.totalGTWeight += item.gtWeight || 0;
            totals.totalAmount += item.amount || 0;
            totals.totalNetWeight += item.netWeight || 0;
        });

        const { totalGTWeight, totalAmount, totalNetWeight } = totals;
        const gstAmount = challanData.gstBill ? totalAmount * 0.18 : 0;

        // Calculate subtotal and grand total including all charges
        const subtotal = totalAmount + (challanData.loading || 0) + (challanData.commission || 0);
        const grandTotal = subtotal + gstAmount + (challanData.royalty || 0) +
            (challanData.tpAmount || 0) + (challanData.freightAmt || 0) + (challanData.extraAmt || 0);

        // Convert ChallanItem[] to ProductDetail[] with proper type safety
        const productDetails: ProductDetail[] = challanItems.map(item => ({
            id: item.id,
            name: item.productName,
            rate: item.rate || 0,
            grossWeight: item.grossWeight || 0,
            netWeight: item.netWeight || 0,
            lessWeight: item.lessWeight || 0,
            gtWeight: item.gtWeight || 0,
            amount: item.amount || 0,
            dateTime: item.dateTime || new Date().toISOString()
        }));

        // Update the state with the new data
        setChallanData(prev => {
            const updated = {
                ...prev,
                amount: totalAmount,
                gstAmount,
                total: subtotal,
                grandTotal,
                productDetails,
                weightDetails: {
                    ...prev.weightDetails,
                    totalGTWeight,
                    netWeight: totalNetWeight
                }
            };
            return updated as ChallanFormData;
        });

        return { totalGTWeight, totalAmount, gstAmount, grandTotal };
    };

    const saveChallan = async () => {
        try {
            // Validate required fields
            if (!challanData.consignee || !challanData.vehicleNo || challanItems.length === 0) {
                alert('Please fill all required fields and add at least one product');
                return;
            }

            // Ensure all calculations are up to date
            await calculateTotals();

            console.log('Saving challan:', challanData);

            // Here you would typically make an API call to save the data
            // await api.saveChallan(challanData);

            alert('Challan saved successfully!');
        } catch (error) {
            console.error('Error saving challan:', error);
            alert('Failed to save challan. Please try again.');
        }
    };

    const printChallan = () => {
        // Ensure all calculations are up to date before printing
        calculateTotals();

        // Add a small delay to ensure state is updated
        setTimeout(() => {
            window.print();
        }, 100);
    };

    // Demo challan history data
    const [challanHistory] = useState([
        {
            id: 'CHN001',
            challanNo: 'S/2025-2026/001',
            date: '2025-07-24',
            time: '09:30:00',
            consignee: 'ABC Construction Ltd.',
            vehicleNo: 'MH12AB1234',
            driverName: 'Rajesh Kumar',
            productName: 'Crushed Stone',
            quantity: 15.5,
            amount: 125000,
            status: 'Completed',
            paymentType: 'Cash'
        },
        {
            id: 'CHN002',
            challanNo: 'S/2025-2026/002',
            date: '2025-07-24',
            time: '11:15:00',
            consignee: 'XYZ Builders Pvt Ltd',
            vehicleNo: 'MH14CD5678',
            driverName: 'Suresh Patil',
            productName: 'River Sand',
            quantity: 12.0,
            amount: 85000,
            status: 'In Transit',
            paymentType: 'Credit'
        },
        {
            id: 'CHN003',
            challanNo: 'S/2025-2026/003',
            date: '2025-07-23',
            time: '14:45:00',
            consignee: 'Metro Infrastructure',
            vehicleNo: 'MH16EF9012',
            driverName: 'Amit Sharma',
            productName: 'Gravel',
            quantity: 18.2,
            amount: 95000,
            status: 'Completed',
            paymentType: 'Cash'
        },
        {
            id: 'CHN004',
            challanNo: 'S/2025-2026/004',
            date: '2025-07-23',
            time: '16:20:00',
            consignee: 'Sai Construction',
            vehicleNo: 'MH18GH3456',
            driverName: 'Vikram Singh',
            productName: 'M-Sand',
            quantity: 20.0,
            amount: 110000,
            status: 'Pending',
            paymentType: 'Credit'
        },
        {
            id: 'CHN005',
            challanNo: 'S/2025-2026/005',
            date: '2025-07-22',
            time: '10:30:00',
            consignee: 'Royal Developers',
            vehicleNo: 'MH20IJ7890',
            driverName: 'Mahesh Yadav',
            productName: 'Crushed Stone',
            quantity: 16.8,
            amount: 135000,
            status: 'Completed',
            paymentType: 'Cash'
        },
        {
            id: 'CHN006',
            challanNo: 'S/2025-2026/006',
            date: '2025-07-22',
            time: '13:15:00',
            consignee: 'Green Build Solutions',
            vehicleNo: 'MH22KL2345',
            driverName: 'Ravi Desai',
            productName: 'River Sand',
            quantity: 14.5,
            amount: 98000,
            status: 'In Transit',
            paymentType: 'Credit'
        },
        {
            id: 'CHN007',
            challanNo: 'S/2025-2026/007',
            date: '2025-07-21',
            time: '08:45:00',
            consignee: 'Prime Infrastructure',
            vehicleNo: 'MH24MN6789',
            driverName: 'Deepak Joshi',
            productName: 'Aggregate',
            quantity: 22.1,
            amount: 155000,
            status: 'Completed',
            paymentType: 'Cash'
        },
        {
            id: 'CHN008',
            challanNo: 'S/2025-2026/008',
            date: '2025-07-21',
            time: '15:30:00',
            consignee: 'Skyline Constructions',
            vehicleNo: 'MH26OP0123',
            driverName: 'Santosh Pawar',
            productName: 'Stone Chips',
            quantity: 19.3,
            amount: 142000,
            status: 'Completed',
            paymentType: 'Credit'
        },
        {
            id: 'CHN009',
            challanNo: 'S/2025-2026/009',
            date: '2025-07-20',
            time: '11:00:00',
            consignee: 'Unity Builders',
            vehicleNo: 'MH28QR4567',
            driverName: 'Ganesh Kulkarni',
            productName: 'Crushed Stone',
            quantity: 17.6,
            amount: 128000,
            status: 'Cancelled',
            paymentType: 'Cash'
        },
        {
            id: 'CHN010',
            challanNo: 'S/2025-2026/010',
            date: '2025-07-20',
            time: '17:15:00',
            consignee: 'Modern Contractors',
            vehicleNo: 'MH30ST8901',
            driverName: 'Pravin Jadhav',
            productName: 'M-Sand',
            quantity: 21.4,
            amount: 118000,
            status: 'Completed',
            paymentType: 'Credit'
        }
    ]);

    // Filter states for history
    const [historyFilters, setHistoryFilters] = useState({
        searchTerm: '',
        dateFrom: '',
        dateTo: '',
        status: '',
        paymentType: '',
        consignee: ''
    });

    // Filtered history data
    const filteredHistory: any = challanHistory.filter(challan => {
        const matchesSearch = challan.challanNo.toLowerCase().includes(historyFilters.searchTerm.toLowerCase()) ||
            challan.consignee.toLowerCase().includes(historyFilters.searchTerm.toLowerCase()) ||
            challan.vehicleNo.toLowerCase().includes(historyFilters.searchTerm.toLowerCase()) ||
            challan.driverName.toLowerCase().includes(historyFilters.searchTerm.toLowerCase());

        const matchesDateFrom = !historyFilters.dateFrom || challan.date >= historyFilters.dateFrom;
        const matchesDateTo = !historyFilters.dateTo || challan.date <= historyFilters.dateTo;
        const matchesStatus = !historyFilters.status || challan.status === historyFilters.status;
        const matchesPaymentType = !historyFilters.paymentType || challan.paymentType === historyFilters.paymentType;
        const matchesConsignee = !historyFilters.consignee || challan.consignee.toLowerCase().includes(historyFilters.consignee.toLowerCase());

        return matchesSearch && matchesDateFrom && matchesDateTo && matchesStatus && matchesPaymentType && matchesConsignee;
    });

    const selectCompactStyles: any = {
        control: (provided: any) => ({
            ...provided,
            minHeight: "33px",
            height: "33px",
            fontSize: "14px",
            padding: "0 2px",
        }),
        valueContainer: (provided: any) => ({
            ...provided,
            padding: "0 6px",
        }),
        indicatorsContainer: (provided: any) => ({
            ...provided,
            padding: "0 6px",
        }),
        dropdownIndicator: (provided: any) => ({
            ...provided,
            padding: "0 6px",
        }),
        clearIndicator: (provided: any) => ({
            ...provided,
            padding: "0 6px",
        }),
    };

    return (
        <>
            <main className="dashboard-main ">
                <div className="main-content-area ">
                    <div className="main-content-wrapper mt-5 ">
                        <div className="relative lg:mt-8 mb-3">
                            <div className="py-3 employee-create-challan-card flex flex-wrap items-end gap-4 w-full" >
                                <div className="flex items-center gap-2">
                                    <label className=" whitespace-nowrap employee-master-metric-label">From :</label>
                                    <DatePicker
                                        selected={new Date('2025-07-23')}
                                        onChange={(date: Date | null) => console.log(date)}
                                        className="border rounded px-2 py-1 w-[60px]"
                                        dateFormat="yyyy-MM-dd"
                                    />
                                    <DatePicker
                                        selected={new Date('2025-07-23T00:00:00')}
                                        onChange={(date: Date | null) => console.log(date)}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        timeCaption="Time"
                                        dateFormat="HH:mm"
                                        className="border rounded px-2 py-1 w-[60px]"
                                    />

                                    <label className=" whitespace-nowrap ml-4 employee-master-metric-label">To :</label>
                                    <DatePicker
                                        selected={new Date('2025-07-23')}
                                        onChange={(date: Date | null) => console.log(date)}
                                        className="border rounded px-2 py-1 w-[60px]"
                                        dateFormat="yyyy-MM-dd"
                                    />
                                    <DatePicker
                                        selected={new Date('2025-07-23T19:35:00')}
                                        onChange={(date: Date | null) => console.log(date)}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        timeCaption="Time"
                                        dateFormat="HH:mm"
                                        className="border rounded px-2 py-1 w-[60px]"
                                    />
                                </div>

                                <div className="flex items-center gap-2 ml-6">
                                    <label className=" whitespace-nowrap employee-master-metric-label">Consignee :</label>
                                    <Select
                                        className="w-[200px]"
                                        placeholder="Select Consignee"
                                        options={[
                                            { value: 'ABC', label: 'ABC' },
                                            { value: 'XYZ', label: 'XYZ' },
                                            { value: 'ABC Construction Ltd.', label: 'ABC Construction Ltd.' },
                                            { value: 'XYZ Builders Pvt Ltd', label: 'XYZ Builders Pvt Ltd' }
                                        ]}
                                        isClearable
                                        isSearchable
                                        styles={{
                                            control: (provided) => ({
                                                ...provided,
                                                minHeight: '32px',
                                                fontSize: '14px',
                                            }),
                                        }}
                                    />
                                </div>

                                <div className="flex flex-row-reverse items-center gap-2" >
                                    <button
                                        onClick={() => setShowInput(!showInput)}
                                        className="text-gray-600 border rounded p-2 hover:bg-gray-100 transition flex items-center gap-2"
                                    >
                                        <FiSearch size={18} />
                                        Search
                                    </button>
                                    {showInput && (
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Search challans..."
                                                className="border rounded px-3 py-2 pr-8 w-[400px] transition-all focus:border-blue-500 focus:outline-none"
                                                autoFocus
                                            />
                                            <FiSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="employee-master-space-y-2">
                            {/* Employee Summary Cards */}
                            <div className="employee-master-summary-grid ">
                                <div className="employee-master-summary-card">
                                    <div className="employee-master-summary-content">
                                        <div className="employee-master-summary-item">
                                            <div className="employee-master-icon-container employee-master-icon-blue">
                                                <UsersIcon />
                                            </div>
                                            <div>
                                                <p className="employee-master-metric-label">Pending Challan</p>
                                                <p className="employee-master-metric-value employee-master-metric-blue">1</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="employee-master-summary-card">
                                    <div className="employee-master-summary-content">
                                        <div className="employee-master-summary-item">
                                            <div className="employee-master-icon-container employee-master-icon-green">
                                                <CheckCircleIcon />
                                            </div>
                                            <div>
                                                <p className="employee-master-metric-label">Approved Challan</p>
                                                <p className="employee-master-metric-value employee-master-metric-green">
                                                    {challanData?.status === 'Active' ? 1 : 0}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="employee-master-summary-card">
                                    <div className="employee-master-summary-content">
                                        <div className="employee-master-summary-item">
                                            <div className="employee-master-icon-container employee-master-icon-purple">
                                                <TrendingUpIcon />
                                            </div>
                                            <div>
                                                <p className="employee-master-metric-label">Rejected Challan</p>
                                                <p className="employee-master-metric-value employee-master-metric-purple">
                                                    {new Set([challanData?.department]).size}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="employee-master-summary-card">
                                    <div className="employee-master-summary-content">
                                        <div className="employee-master-summary-item">
                                            <div className="employee-master-icon-container employee-master-icon-yellow">
                                                <ClockIcon />
                                            </div>
                                            <div>
                                                <p className="employee-master-metric-label">Total Challan</p>
                                                <p className="employee-master-metric-value employee-master-metric-yellow">
                                                    {new Date(challanData?.joiningDate || '').getMonth() === new Date().getMonth() &&
                                                        new Date(challanData?.joiningDate || '').getFullYear() === new Date().getFullYear() ? 1 : 0}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Employee List Table */}
                            <div className="employee-master-card">
                                <div className="employee-master-card-header mt-2 flex justify-end">

                                    <button
                                        className="employee-master-button employee-master-button-primary employee-master-button-sm"
                                        onClick={handleOpenModal}
                                    >
                                        <PlusIcon /> Add Challan
                                    </button>

                                </div>
                                <div className="employee-master-card-content" style={{ padding: '0' }}>
                                    <DataTable
                                        columns={challanHistoryColumns}
                                        data={filteredHistory}
                                        pagination
                                        paginationPerPage={10}
                                        paginationRowsPerPageOptions={[5, 10, 20, 50]}
                                        highlightOnHover
                                        customStyles={customStyles}
                                        striped
                                        responsive
                                        noDataComponent={
                                            <div className="text-center py-8 text-gray-500">
                                                No challan records found
                                            </div>
                                        }

                                    />
                                </div>
                            </div>
                        </div>

                        {isModalOpen && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    {/* Modal Header */}
                                    <div className="modal-header">
                                        <div className="content-top-nav  ">
                                            <ul>
                                                <li>
                                                    <a className="active" href="#">
                                                        Challan{" "}
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">TP</a>
                                                </li>
                                                <li>
                                                    <a href="#">BILL</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <button onClick={handleCloseModal} className="text-gray-600 hover:text-red-500 p-2">
                                            <FiX size={20} />
                                        </button>
                                    </div>

                                    {/* Modal Body */}
                                    <div className="modal-body p-2">
                                        <div className="row align-items-center">

                                            <div className="col-xl-5">
                                                <div className="d-flex align-items-center gap-2">
                                                    <label
                                                        htmlFor="product-desc"
                                                        className="mb-0"
                                                        style={{ minWidth: 70 }}
                                                    >
                                                        Challan#
                                                    </label>
                                                    <div className="product-des-input d-flex gap-2 flex-grow-1">
                                                        <input
                                                            type="text"
                                                            id="product-desc-1"
                                                            defaultValue="$"
                                                            style={{ flex: 1 }}
                                                        />
                                                        <input
                                                            type="text"
                                                            id="date-pick-bano"
                                                            style={{ flex: 1 }}
                                                            readOnly={true}
                                                        />
                                                        <input
                                                            type="text"
                                                            id="product-desc-bano-<?=uniqid()?>"
                                                            defaultValue="Auto Generated"
                                                            style={{ flex: 1 }}
                                                            disabled={true}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 mt-3 mt-xl-0">
                                                <div className="d-flex align-items-center gap-2">
                                                    <label
                                                        htmlFor="generic-desc"
                                                        className="mb-0"
                                                        style={{ minWidth: 70 }}
                                                    >
                                                        Date/Time
                                                    </label>
                                                    <div className="product-des-input flex-grow-1">
                                                        <DatePicker
                                                            selected={new Date()}
                                                            onChange={(date: Date | null) => console.log(date)}
                                                            showTimeSelect
                                                            showTimeSelectOnly
                                                            timeIntervals={15}
                                                            timeCaption="Time"
                                                            dateFormat="HH:mm"
                                                            className="border rounded px-2 py-1 w-full"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-2 mt-3 mt-xl-0">
                                                <div className="d-flex align-items-center gap-2">
                                                    <label className="d-flex align-items-center" style={{ gap: 6 }}>
                                                        <input type="radio" name="paymentType" defaultValue="cash" />
                                                        Cash
                                                    </label>
                                                    <label className="d-flex align-items-center" style={{ gap: 6, marginLeft: 20 }}>
                                                        <input type="radio" name="paymentType" defaultValue="credit" />{" "}
                                                        Credit
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='col-xl-2 mt-3 mt-xl-0  d-flex justify-content-end '>
                                                <div className="flex gap-2 ">
                                                    {/* Save Button */}
                                                    <button
                                                        type="button"
                                                        className="flex items-center gap-2 px-2 py-1 rounded-md text-white"
                                                        style={{ backgroundColor: "#34C759" }}
                                                    >
                                                        <FiSave size={18} />
                                                        Save
                                                    </button>

                                                    {/* Print Button */}
                                                    <button
                                                        type="button"
                                                        className="flex items-center gap-2 px-2 py-1 rounded-md text-white"
                                                        style={{ backgroundColor: "#212529" }}
                                                        onClick={() => window.print()}
                                                    >
                                                        <FiPrinter size={18} />
                                                        Print
                                                    </button>
                                                </div>
                                            </div>


                                            <div className="col-xxl-9 col-12 mt-2">
                                                <div className="row">
                                                    <div className="col-xl-4 col-sm-6">
                                                        <div className="form-block ">
                                                            <div className="row align-items-center" style={{ rowGap: 6 }}>
                                                                <div className="single-info-block col-xl-3">
                                                                    <label htmlFor="ritcNo">
                                                                        Consignee<span>*</span>
                                                                    </label>
                                                                </div>
                                                                <div className="col-xl-9 col-12">
                                                                    <Select
                                                                        className="w-full"
                                                                        placeholder="Select Consignee"
                                                                        options={[
                                                                            { value: '54075290', label: '54075290' },
                                                                            { value: '54075291', label: '54075291' }
                                                                        ]}
                                                                        isClearable
                                                                        isSearchable
                                                                        styles={selectCompactStyles}
                                                                    />
                                                                </div>
                                                                <div className="single-info-block col-xl-3">
                                                                    <label htmlFor="prType">
                                                                        Address <span>*</span>
                                                                    </label>
                                                                </div>
                                                                <div className="col-xl-9 col-12">
                                                                    <textarea
                                                                        name=""
                                                                        id="prType"
                                                                        className="py-0"
                                                                        style={{ width: "100%" }}
                                                                        defaultValue={""}
                                                                    />
                                                                </div>
                                                                <div className="single-info-block col-xl-3">
                                                                    <label htmlFor="ritcNo">
                                                                        State<span>*</span>
                                                                    </label>
                                                                </div>
                                                                <div className="col-xl-9 col-12">
                                                                    <Select
                                                                        className="w-full"
                                                                        placeholder="Select State"
                                                                        options={[
                                                                            { value: 'Maharashtra', label: 'Maharashtra' },
                                                                            { value: 'Gujarat', label: 'Gujarat' }
                                                                        ]}
                                                                        isClearable
                                                                        isSearchable
                                                                        styles={selectCompactStyles}
                                                                    />
                                                                </div>
                                                                <div className="single-info-block col-xl-3">
                                                                    <label htmlFor="prUnit">
                                                                        District
                                                                        <span>*</span>
                                                                    </label>
                                                                </div>
                                                                <div className="col-xl-9 col-12">
                                                                    <Select
                                                                        className="w-full"
                                                                        placeholder="Select District"
                                                                        options={[
                                                                            { value: 'BANO', label: 'BANO' }
                                                                        ]}
                                                                        isClearable
                                                                        isSearchable
                                                                        styles={selectCompactStyles}
                                                                    />
                                                                </div>
                                                                <div className="single-info-block col-xl-3">
                                                                    <label htmlFor="prUnitPrice">
                                                                        PIN <span>*</span>
                                                                    </label>
                                                                </div>
                                                                <div className="col-xl-9 col-12">
                                                                    <Select
                                                                        className="w-full"
                                                                        placeholder="Select PIN"
                                                                        options={[
                                                                            { value: '100.0', label: '100.000000' }
                                                                        ]}
                                                                        isClearable
                                                                        isSearchable
                                                                        styles={selectCompactStyles}
                                                                    />
                                                                </div>
                                                                <div className="single-info-block col-xl-3">
                                                                    <label htmlFor="prAmountUSD">Contact#</label>
                                                                </div>
                                                                <div className="col-xl-9 col-12">
                                                                    <input type="text" id="prAmountUSD" defaultValue={100.0} />
                                                                </div>
                                                                <div className="single-info-block col-xl-3">
                                                                    <label htmlFor="prAmountINR">EmailID</label>
                                                                </div>
                                                                <div className="col-xl-9 col-12">
                                                                    <input
                                                                        type="text"
                                                                        id="prAmountINR"
                                                                        readOnly={true}
                                                                        defaultValue={100.0}
                                                                    />
                                                                </div>
                                                                {/* ROW */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-3 col-sm-6  ">
                                                        <div className="form-block ">
                                                            <div className="row align-items-center" style={{ rowGap: 6 }}>
                                                                <div className="single-info-block col-xl-5">
                                                                    <label htmlFor="endUse">
                                                                        Adv. Amount <span>*</span>
                                                                    </label>
                                                                </div>
                                                                <div className="col-xl-7 col-12">
                                                                    <input
                                                                        type="text"
                                                                        id="endUse"
                                                                        defaultValue={0.0}
                                                                        style={{ width: "100%" }}
                                                                    />
                                                                </div>
                                                                <div className="single-info-block col-xl-5">
                                                                    <label htmlFor="prCTH">Vehicle Type</label>
                                                                </div>
                                                                <div className="col-xl-7 col-12">
                                                                    <Select
                                                                        className="w-full"
                                                                        placeholder="Select "
                                                                        options={[
                                                                            { value: 'BANO', label: 'BANO' }
                                                                        ]}
                                                                        isClearable
                                                                        isSearchable
                                                                        styles={selectCompactStyles}
                                                                    />
                                                                </div>
                                                                <div className="single-info-block col-xl-5">
                                                                    <label htmlFor="prCET">Vehicle No.</label>
                                                                </div>
                                                                <div className="col-xl-7 col-12">
                                                                    <Select
                                                                        className="w-full"
                                                                        placeholder="Select "
                                                                        options={[
                                                                            { value: 'NOEXCISE', label: 'NOEXCISE' },
                                                                            { value: 'DEPB', label: 'DEPB' }
                                                                        ]}
                                                                        isClearable
                                                                        isSearchable
                                                                        styles={selectCompactStyles}
                                                                    />
                                                                </div>
                                                                <div className="single-info-block col-xl-5">
                                                                    <label htmlFor="prCode">Driver Name</label>
                                                                </div>
                                                                <div className="col-xl-7 col-12">
                                                                    <input
                                                                        type="text"
                                                                        id="prCode"
                                                                        placeholder="Product Code "
                                                                        style={{ width: "100%" }}
                                                                    />
                                                                </div>
                                                                <div className="single-info-block col-xl-5">
                                                                    <label htmlFor="prUnitPrice">Driver#</label>
                                                                </div>
                                                                <div className="col-xl-7 col-12">
                                                                    <input
                                                                        type="text"
                                                                        id="prUnitPrice"
                                                                        defaultValue={0}
                                                                        style={{ width: "100%" }}
                                                                    />
                                                                </div>
                                                                <div className="single-info-block col-xl-5">
                                                                    <label htmlFor="dutyRate">Vehicle Remarks</label>
                                                                </div>
                                                                <div className="col-xl-7 col-12">
                                                                    <textarea
                                                                        name=""
                                                                        id="dutyRate"
                                                                        className="py-0"
                                                                        style={{ width: "100%" }}
                                                                        defaultValue={""}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-5 mt-3 mt-xl-0">
                                                        <div className="form-block bigger-form-block">
                                                            <div className="row align-items-center" style={{ rowGap: 6 }}>
                                                                <div className="single-info-block col-xl-2">
                                                                    <label htmlFor="CountryOrigin">GST#</label>
                                                                </div>
                                                                <div className="col-xl-10">
                                                                    <input
                                                                        type="text"
                                                                        id="CountryOrigin"
                                                                        style={{ width: "100%" }}
                                                                    />
                                                                </div>
                                                                <div className="single-info-block col-xl-2">
                                                                    <label htmlFor="SchemeCode">Name</label>
                                                                </div>
                                                                <div className="col-xl-10">
                                                                    <Select
                                                                        className="w-full"
                                                                        placeholder="Select Name"
                                                                        options={[
                                                                            { value: 'Raw Material', label: 'Raw Material' },
                                                                            { value: 'Finished Goods', label: 'Finished Goods' }
                                                                        ]}
                                                                        isClearable
                                                                        isSearchable
                                                                        styles={selectCompactStyles}
                                                                    />
                                                                </div>
                                                                <div className="single-info-block col-xl-2">
                                                                    <label htmlFor="EximDesc">Address</label>
                                                                </div>
                                                                <div className="col-xl-10">
                                                                    <textarea
                                                                        name=""
                                                                        id="EximDesc"
                                                                        value="DEPB Post Export"
                                                                        defaultValue={"DEPB Post Export"}
                                                                    />
                                                                </div>
                                                                <div className="single-info-block col-xl-2">
                                                                    <label htmlFor="noten">State</label>
                                                                </div>
                                                                <div className="col-xl-10">
                                                                    <Select
                                                                        className="w-full"
                                                                        placeholder="Select State"
                                                                        options={[
                                                                            { value: 'Raw Material', label: 'Raw Material' },
                                                                            { value: 'Finished Goods', label: 'Finished Goods' }
                                                                        ]}
                                                                        isClearable
                                                                        isSearchable
                                                                        styles={selectCompactStyles}
                                                                    />
                                                                </div>
                                                                <div className="single-info-block col-xl-2">
                                                                    <label htmlFor="Sno2">District</label>
                                                                </div>
                                                                <div className="col-xl-10">
                                                                    <Select
                                                                        className="w-full"
                                                                        placeholder="Select District"
                                                                        options={[
                                                                            { value: 'BANO1', label: 'BANO1' },
                                                                            { value: 'BANO2', label: 'BANO2' }
                                                                        ]}
                                                                        isClearable
                                                                        isSearchable
                                                                        styles={selectCompactStyles}
                                                                    />
                                                                </div>
                                                                <div className="single-info-block col-xl-2">
                                                                    <label htmlFor="SchemDes">PIN</label>
                                                                </div>
                                                                <div className="col-xl-10">
                                                                    <Select
                                                                        className="w-full"
                                                                        placeholder="Select PIN"
                                                                        options={[
                                                                            { value: 'BANO', label: 'BANO' }
                                                                        ]}
                                                                        isClearable
                                                                        isSearchable
                                                                        styles={selectCompactStyles}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 mt-2">
                                                    <div className="product-details-table mb-2">
                                                        <div className="product-des-box product-details-form ">
                                                            <div className="product-form-container ">
                                                                <div className="row g-3 align-items-center">
                                                                    <div className="col-md-2 mt-0">
                                                                        <label className="MAINTABLE_LABEL">Product Name</label>
                                                                        <Select
                                                                            className="w-full"
                                                                            placeholder="Select Product"
                                                                            options={[
                                                                                { value: 'Korea Rebublic of', label: 'Korea Rebublic of' },
                                                                                { value: 'US Rebublic of', label: 'US Rebublic of' }
                                                                            ]}
                                                                            isClearable
                                                                            isSearchable
                                                                            styles={selectCompactStyles}
                                                                        />
                                                                    </div>
                                                                    <div className="col mt-0" style={{ minWidth: 130 }}>
                                                                        <label className="MAINTABLE_LABEL" htmlFor="SchemDes">
                                                                            Rate
                                                                        </label>
                                                                        <input type="number" id="SchemDes" />
                                                                    </div>
                                                                    <div className="col  mt-0" style={{ minWidth: 130 }}>
                                                                        <label className="MAINTABLE_LABEL">Gross Weight</label>
                                                                        <input type="number" id="SchemDes" />
                                                                    </div>
                                                                    <div className="col mt-0" style={{ minWidth: 130 }}>
                                                                        <label className="MAINTABLE_LABEL">Net Weight</label>
                                                                        <input type="number" id="SchemDes" />
                                                                    </div>
                                                                    <div className="col mt-0" style={{ minWidth: 150 }}>
                                                                        <label className="MAINTABLE_LABEL">Less Weight</label>
                                                                        <input type="number" id="SchemDes" />
                                                                    </div>
                                                                    <div className="col mt-0" style={{ minWidth: 130 }}>
                                                                        <label className="MAINTABLE_LABEL">GT Weight</label>
                                                                        <input type="number" id="SchemDes" readOnly={true} />
                                                                    </div>
                                                                    <div className="col mt-0" style={{ minWidth: 130 }}>
                                                                        <label className="MAINTABLE_LABEL">Amount</label>
                                                                        <input type="number" id="SchemDes" readOnly={true} />
                                                                    </div>
                                                                    <div className="col-md-2 mt-0">
                                                                        <label className="MAINTABLE_LABEL">Date/Time</label>
                                                                        <DatePicker
                                                                            selected={new Date()}
                                                                            onChange={(date: Date | null) => console.log(date)}
                                                                            showTimeSelect
                                                                            showTimeSelectOnly
                                                                            timeIntervals={15}
                                                                            timeCaption="Time"
                                                                            dateFormat="HH:mm"
                                                                            className="border rounded px-2 py-1 w-full"
                                                                        />
                                                                    </div>
                                                                    <div className="col">
                                                                        <button className="btn btn-warning p-1 py-0">
                                                                            <svg
                                                                                className="text-white"
                                                                                style={{ width: 20, height: 25 }}
                                                                                fill="none"
                                                                                stroke="currentColor"
                                                                                viewBox="0 0 24 24"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                            >
                                                                                <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeWidth={2}
                                                                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                                                />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-details-table mb-2">
                                                        <div className="product-des-box product-details-form ">
                                                            <div className="product-form-container ">
                                                                <div className="row g-3">
                                                                    <div className="col-2 mt-0" style={{ minWidth: 130 }}>
                                                                        <label className="MAINTABLE_LABEL">Tare Weight</label>
                                                                        <input type="number" id="SchemDes" />
                                                                    </div>
                                                                    <div className="col-1 mt-0" style={{ minWidth: 130 }}>
                                                                        <label className="MAINTABLE_LABEL">Net Weight</label>
                                                                        <input type="number" id="SchemDes" />
                                                                    </div>
                                                                    <div className="col-1 mt-0" style={{ minWidth: 130 }}>
                                                                        <label className="MAINTABLE_LABEL">Less Weight</label>
                                                                        <input type="number" id="SchemDes" />
                                                                    </div>
                                                                    <div className="col-1 mt-0" style={{ minWidth: 130 }}>
                                                                        <label className="MAINTABLE_LABEL">Total GT Weight</label>
                                                                        <input type="number" id="SchemDes" />
                                                                    </div>
                                                                    <div className="col-1 mt-0" style={{ minWidth: 150 }}>
                                                                        <label className="MAINTABLE_LABEL">
                                                                            Vehicle Commision
                                                                        </label>
                                                                        <input type="number" id="SchemDes" />
                                                                    </div>
                                                                    <div className="col-md-2 mt-0">
                                                                        <label className="MAINTABLE_LABEL">Date/Time</label>
                                                                        <input type="text" id="SchemDes" readOnly={true} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-details-table mb-2">
                                                        <div className="product-des-box product-details-form">
                                                            <div className="product-form-container ">
                                                                <div className="row g-3">
                                                                    <div className="col-md-2 mt-0" style={{ minWidth: 130 }}>
                                                                        <label className="MAINTABLE_LABEL">Amount</label>
                                                                        <input type="number" id="SchemDes" />
                                                                    </div>
                                                                    <div className="col-md-1 mt-0" style={{ minWidth: 130 }}>
                                                                        <label className="MAINTABLE_LABEL">Loading</label>
                                                                        <Select
                                                                            placeholder="Select"
                                                                            options={[
                                                                                { value: 'Korea Republic of', label: 'Korea Republic of' },
                                                                                { value: 'US Republic of', label: 'US Republic of' },
                                                                            ]}
                                                                            isClearable
                                                                            isSearchable
                                                                            menuPlacement='top'
                                                                            styles={selectCompactStyles}
                                                                        />

                                                                    </div>
                                                                    <div className="col-md-1 mt-0" style={{ minWidth: 130 }}>
                                                                        <label className="MAINTABLE_LABEL">Commission</label>
                                                                        <input type="number" id="SchemDes" />
                                                                    </div>
                                                                    <div
                                                                        className="col-md-1 col-sm-6 mt-0"
                                                                        style={{ minWidth: 130 }}
                                                                    >
                                                                        <label className="MAINTABLE_LABEL">GT Amount</label>
                                                                        <input type="number" id="SchemDes" />
                                                                    </div>
                                                                    <div className="col-md-1 mt-0" style={{ minWidth: 150 }}>
                                                                        <label className="MAINTABLE_LABEL">Royalty</label>
                                                                        <input type="number" id="SchemDes" />
                                                                    </div>
                                                                    <div className="col-md-2 mt-0">
                                                                        <label className="MAINTABLE_LABEL">Tp Amount</label>
                                                                        <Select
                                                                            className="w-full"
                                                                            placeholder="Select Product"
                                                                            options={[
                                                                                { value: 'Korea Rebublic of', label: 'Korea Rebublic of' },
                                                                                { value: 'US Rebublic of', label: 'US Rebublic of' }
                                                                            ]}
                                                                            isClearable
                                                                            isSearchable
                                                                            menuPlacement='top'
                                                                            styles={selectCompactStyles}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-1 mt-0" style={{ minWidth: 130 }}>
                                                                        <label className="MAINTABLE_LABEL">Freight Amount</label>
                                                                        <input type="number" id="SchemDes" />
                                                                    </div>
                                                                    <div className="col-md-1 mt-0" style={{ minWidth: 130 }}>
                                                                        <label className="MAINTABLE_LABEL">Total</label>
                                                                        <input type="number" id="SchemDes" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* {renderItemsTable()} */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}
