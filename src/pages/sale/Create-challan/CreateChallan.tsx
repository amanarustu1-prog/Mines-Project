import React, { useState } from 'react';
import './CreateChallan.css';
import { CheckCircleIcon, ClockIcon, Edit3Icon, PlusIcon, TrendingUpIcon } from 'lucide-react';
import { FiPrinter, FiSave, FiSearch } from 'react-icons/fi';
import { FiX } from "react-icons/fi";

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
);


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

interface ChallanItem {
    id: string;
    productName: string;
    rate: number;
    grossWeight: number;
    netWeight: number;
    lessWeight: number;
    gtWeight: number;
    amount: number;
    dateTime: string;
}

interface ProductDetail {
    id: string;
    name: string;
    rate: number;
    grossWeight: number;
    dateTime: string;
    netWeight: number;
    lessWeight: number;
    gtWeight: number;
    amount: number;
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
        setCurrentItem(prev => ({
            ...prev,
            [name]: name === 'productName' ? value : Number(value)
        }));
    };

    const calculateGTWeight = (netWeight: number, lessWeight: number) => {
        return Math.max(0, netWeight - lessWeight);
    };

    const calculateAmount = (rate: number, gtWeight: number) => {
        return rate * gtWeight;
    };

    const handleAddItem = () => {
        if (!currentItem.productName) return;

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

    const renderItemsTable = () => (
        <div className="table-responsive mt-3">
            <table className="table table-bordered table-hover">
                <thead className="table-light">
                    <tr>
                        <th>Product Name</th>
                        <th>Rate</th>
                        <th>Gross Weight</th>
                        <th>Net Weight</th>
                        <th>Less Weight</th>
                        <th>GT Weight</th>
                        <th>Amount</th>
                        <th>Date/Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {challanItems.length > 0 ? (
                        challanItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.productName}</td>
                                <td>{item.rate.toFixed(2)}</td>
                                <td>{item.grossWeight.toFixed(2)}</td>
                                <td>{item.netWeight.toFixed(2)}</td>
                                <td>{item.lessWeight.toFixed(2)}</td>
                                <td>{item.gtWeight.toFixed(2)}</td>
                                <td>{item.amount.toFixed(2)}</td>
                                <td>{new Date(item.dateTime).toLocaleString()}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDeleteItem(item.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={9} className="text-center">No items added yet</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

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

    const calculateTotals = () => {
        const subtotal = challanData.amount + challanData.loading + challanData.commission;
        const grandTotal = subtotal + challanData.gstAmount + challanData.royalty +
            challanData.tpAmount + challanData.freightAmt + challanData.extraAmt;

        handleInputChange('total', subtotal);
        handleInputChange('grandTotal', grandTotal);
    };

    const saveChallan = () => {
        console.log('Saving challan:', challanData);
        // Implement save logic
        alert('Challan saved successfully!');
    };

    const printChallan = () => {
        window.print();
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
    const filteredHistory = challanHistory.filter(challan => {
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

    return (
        <>
            <main className="dashboard-main ">

                <div className="main-content-area ">
                    <div className="main-content-wrapper mt-5 ">
                        <div className="relative mt-4 mb-3">
                            <div className="py-3 employee-create-challan-card flex flex-wrap  items-end gap-4 w-full">
                                {/* Dates Section */}
                                <div className="flex items-center gap-2">
                                    <label className=" whitespace-nowrap employee-master-metric-label">From :</label>
                                    <input
                                        type="date"
                                        className="border rounded px-2 py-1 w-[130px]"
                                        defaultValue="2025-07-23"
                                    />
                                    <input
                                        type="time"
                                        className="border rounded px-2 py-1 w-[80px]"
                                        defaultValue="00:00"
                                    />

                                    <label className=" whitespace-nowrap ml-4 employee-master-metric-label">To :</label>
                                    <input
                                        type="date"
                                        className="border rounded px-2 py-1 w-[130px]"
                                        defaultValue="2025-07-23"
                                    />
                                    <input
                                        type="time"
                                        className="border rounded px-2 py-1 w-[80px]"
                                        defaultValue="19:35"
                                    />
                                </div>

                                {/* Consignee Section */}
                                <div className="flex items-center gap-2 ml-6">
                                    <label className=" whitespace-nowrap employee-master-metric-label">Consignee :</label>
                                    <select className="border rounded px-2 py-1 w-[400px]">
                                        <option value="">Select Consignee</option>
                                        <option value="ABC">ABC</option>
                                        <option value="XYZ">XYZ</option>
                                    </select>
                                </div>

                                <div className="flex flex-row-reverse items-center gap-2" >
                                    <button
                                        onClick={() => setShowInput(!showInput)}
                                        className="text-gray-600 border rounded p-2 hover:bg-gray-100 transition"
                                    >
                                        <FiSearch size={18} />
                                    </button>
                                    {showInput && (
                                        <input
                                            type="text"
                                            placeholder="Search "
                                            className="border rounded px-2 py-1 w-[400px] transition-all"
                                            autoFocus
                                        />
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
                                                    {new Date(challanData?.joiningDate).getMonth() === new Date().getMonth() &&
                                                        new Date(challanData?.joiningDate).getFullYear() === new Date().getFullYear() ? 1 : 0}
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
                                <div className="employee-master-card-content" style={{ padding: 0 }}>
                                    <div className="employee-master-table-container" style={{
                                        overflowX: 'auto',
                                        overflowY: 'auto',
                                        maxHeight: '400px',

                                    }}>
                                        <table className="employee-master-table">
                                            <thead>
                                                <tr>
                                                    <th>Check</th>
                                                    <th>Challan No</th>
                                                    <th>Challan Date</th>
                                                    <th>Consignee</th>
                                                    <th>PartyAddress</th>
                                                    <th>Vehicle No</th>
                                                    <th>Product Name</th>
                                                    <th>Gross Weight</th>
                                                    <th>Net Weight</th>
                                                    <th>Less Weight</th>
                                                    <th>GT Weight</th>
                                                    <th>Amount</th>
                                                    <th>Rate</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {challanTableData.map((item) => (
                                                    <tr key={item.id}>
                                                        <td><input type="checkbox" className="form-check-input" checked /></td>
                                                        <td>{item.challanNo}</td>
                                                        <td>{item.challanDate}</td>
                                                        <td>{item.consignee}</td>
                                                        <td>{item.partyAddress}</td>
                                                        <td>{item.vehicleNo}</td>
                                                        <td>{item.productName}</td>
                                                        <td>{item.grossWeight.toLocaleString()}</td>
                                                        <td>{item.netWeight.toLocaleString()}</td>
                                                        <td>{item.lessWeight.toLocaleString()}</td>
                                                        <td>{item.gtWeight.toLocaleString()}</td>
                                                        <td>₹{item.amount.toLocaleString()}</td>
                                                        <td>₹{item.rate.toFixed(2)}</td>
                                                        <td>
                                                            <div className="d-flex gap-1">
                                                                <button className="btn btn-sm btn-primary">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3.36l.894-1.838 6.316-6.316a4.5 4.5 0 01-1.255-3.97l1.06-.659 1.977 1.977m-2.036 5.036L6.5 3.36l.894 1.838 6.316 6.316a4.5 4.5 0 01-1.255 3.97l1.06-.659 1.977 1.977z" />
                                                                    </svg>
                                                                </button>
                                                                <button className="btn btn-sm btn-danger">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                    </svg>
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
                                                            readOnly=""
                                                        />
                                                        <input
                                                            type="text"
                                                            id="product-desc-bano-<?=uniqid()?>"
                                                            defaultValue="Auto Generated"
                                                            style={{ flex: 1 }}
                                                            disabled=""
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
                                                        <input type="text" id="generic-desc" />
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
                                                                    <select name="" id="ritcNo" style={{ width: "100%" }}>
                                                                        <option value={54075290}>54075290</option>
                                                                        <option value={54075291}>54075291</option>
                                                                    </select>
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
                                                                    <select name="" id="ritcNo" style={{ width: "100%" }}>
                                                                        <option value="Maharashtra">Maharashtra</option>
                                                                        <option value="Gujarat">Gujarat</option>
                                                                    </select>
                                                                </div>
                                                                <div className="single-info-block col-xl-3">
                                                                    <label htmlFor="prUnit">
                                                                        District
                                                                        <span>*</span>
                                                                    </label>
                                                                </div>
                                                                <div className="col-xl-9 col-12">
                                                                    <select name="" id="prUnit" style={{ width: "100%" }}>
                                                                        <option value="BANO">BANO</option>
                                                                        <option value="BANO">BANO</option>
                                                                    </select>
                                                                </div>
                                                                <div className="single-info-block col-xl-3">
                                                                    <label htmlFor="prUnitPrice">
                                                                        PIN <span>*</span>
                                                                    </label>
                                                                </div>
                                                                <div className="col-xl-9 col-12">
                                                                    <select name="" id="prUnitPrice" style={{ width: "100%" }}>
                                                                        <option value={100.0}>100.000000</option>
                                                                        <option value={100.0}>100.000000</option>
                                                                    </select>
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
                                                                        readOnly=""
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
                                                                    <select name="" id="prCTH" style={{ width: "100%" }}>
                                                                        <option value="BANO">BANO</option>
                                                                        <option value="BANO">BANO</option>
                                                                    </select>
                                                                </div>
                                                                <div className="single-info-block col-xl-5">
                                                                    <label htmlFor="prCET">Vehicle No.</label>
                                                                </div>
                                                                <div className="col-xl-7 col-12">
                                                                    <select name="" id="prCET" style={{ width: "100%" }}>
                                                                        <option value="NOEXCISE">NOEXCISE</option>
                                                                        <option value="DEPB">DEPB</option>
                                                                    </select>
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
                                                                    <select name="" id="SchemeCode" style={{ width: "100%" }}>
                                                                        <option value="Raw Material">Raw Material</option>
                                                                        <option value="Finished Goods">Finished Goods</option>
                                                                    </select>
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
                                                                    <select name="" id="noten" style={{ width: "100%" }}>
                                                                        <option value="Raw Material">Raw Material</option>
                                                                        <option value="Finished Goods">Finished Goods</option>
                                                                    </select>
                                                                </div>
                                                                <div className="single-info-block col-xl-2">
                                                                    <label htmlFor="Sno2">District</label>
                                                                </div>
                                                                <div className="col-xl-10">
                                                                    <select name="" id="Sno2" style={{ width: "100%" }}>
                                                                        <option value="BANO1">BANO1</option>
                                                                        <option value="BANO2">BANO2</option>
                                                                    </select>
                                                                </div>
                                                                <div className="single-info-block col-xl-2">
                                                                    <label htmlFor="SchemDes">PIN</label>
                                                                </div>
                                                                <div className="col-xl-10">
                                                                    <select name="" id="SchemDes" style={{ width: "100%" }}>
                                                                        <option value="BANO">BANO</option>
                                                                    </select>
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
                                                                        <select
                                                                            name=""
                                                                            id="CountryOrigin"
                                                                            style={{ width: "100%" }}
                                                                        >
                                                                            <option value="Korea Rebublic of">
                                                                                Korea Rebublic of
                                                                            </option>
                                                                            <option value="US Rebublic of">US Rebublic of</option>
                                                                        </select>
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
                                                                        <input type="number" id="SchemDes" readOnly="" />
                                                                    </div>
                                                                    <div className="col mt-0" style={{ minWidth: 130 }}>
                                                                        <label className="MAINTABLE_LABEL">Amount</label>
                                                                        <input type="number" id="SchemDes" readOnly="" />
                                                                    </div>
                                                                    <div className="col-md-2 mt-0">
                                                                        <label className="MAINTABLE_LABEL">Date/Time</label>
                                                                        <input type="text" id="SchemDes" readOnly="" />
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
                                                                        <input type="text" id="SchemDes" readOnly="" />
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
                                                                        <select
                                                                            name=""
                                                                            id="CountryOrigin"
                                                                            style={{ width: "100%" }}
                                                                        >
                                                                            <option value="Korea Rebublic of">
                                                                                Korea Rebublic of
                                                                            </option>
                                                                            <option value="US Rebublic of">US Rebublic of</option>
                                                                        </select>
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
                                                                        <select
                                                                            name=""
                                                                            id="CountryOrigin"
                                                                            style={{ width: "100%" }}
                                                                        >
                                                                            <option value="Korea Rebublic of">
                                                                                Korea Rebublic of
                                                                            </option>
                                                                            <option value="US Rebublic of">US Rebublic of</option>
                                                                        </select>
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
























