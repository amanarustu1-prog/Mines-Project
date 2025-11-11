import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
// import ChallanSlip from "./ChallanSlip";
import './CreateChallan.css';
import { CheckCircleIcon, ClockIcon, Edit3Icon, PlusIcon, TrendingUpIcon } from 'lucide-react';
import { FiPrinter, FiSave, FiSearch } from 'react-icons/fi';
import { FiX } from "react-icons/fi";
import { FaEdit } from 'react-icons/fa';
import DataTable from 'react-data-table-component';
import Select, { SingleValue } from 'react-select';

// React DatePicker
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { customStyles, multiValue } from '@/common/Utility';
import { fetch_Post_Data, fetchPostData } from '@/components/hooks/Api';
import { toastifyError, toastifySuccess } from '@/common/AlertMsg';
import useResizableColumns from '@/components/customHooks/UseResizableColumns';
import { getShowingDateText, getShowingWithOutDate, getShowingWithOutTime } from '@/common/DateFormat';
import * as XLSX from 'xlsx';
import moment from 'moment';
import { previousDay } from 'date-fns';
import ConfirmModal from '@/common/ConfirmModal';
import ChallanSlip from './ChallanSlip';

// Icon components

const UsersIcon = ({ style }: { style?: React.CSSProperties }) => (
    <svg className="employee-master-icon" style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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

const Search = ({ className }: { className?: string }) => (
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
    ChallanDate: string;
    product: string;
}

// ChallanItem is used in the form State
interface ChallanItem extends BaseProductFields {
    ChallanNo: any;
    ProductName1: string;
    Companyid: string;
    GstDistrictID: any;
    GstState: any;
    GstPinID: any;
    partyTypeid: any;
    ChallanID: number;
    ChallanModule: string;
    id: string;
    ChallanDate: string;
    VoucherType: string;
    partyAddress: string;
    // VehicleNo: string;
    vehicleType: string;
    PinID: number;
    DistrictID: number;
    Name: string;
    grossWeight: number;
    netWeight: number;
    lessWeight: number;
    gtWeight: number;
    amount: number;
    rate: number;
    AdvAmt: string;
    Party: number;
    PartyID: number;
    OwnerMobile: string;
    DriverName: string;
    DriverMobileNo: string;
    VehicleNo: string;
    VehicleTypeid: number;
    PartyTypeid: number;
    VehicleRemarks: string;
    Address: string;
    Productid: string;
    IsGST: string;
    BillName: string;
    GstNo: string;
    State: string;
    StateID: number;
    GstAddress: string;
    //   : string;
    Amount: string;
    LoadingAmt: string;
    CommisionAmt: string;
    TotalAmt: string;
    GSTAmt: string;
    RoyaltyAmt: string;
    TPAmount: string;
    FreightAmt: string;
    GTotal: string;
    Grossweight: string;
    Netweight: string;
    Lessweight: string;
    GTWeight: string;
    financialYear: string;
    paytype: 'Cash' | 'Credit';
    Email: string;
    StatusReason: string;
    Taredate: string;
    Grossdate: string;
    ExtraAmt: string;
    ExtraAmtType: string;
    ProductId1: number;
    Status: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    CreatedDate: string;
    UpdatedDate: string;

    address: string;
    VehicleCommision: number;
    TareWeight: number;
    Rate: number;
    // Product and weight details
    productDetails: ProductDetail[];
    ProductName2: string,
    ProductName3: string,
    Rate1: number,
    Rate2: number,
    Rate3: number,
    Grossweight1: number,
    Grossweight2: number,
    Grossweight3: number,
    Netweight1: number,
    Netweight2: number,
    Netweight3: number,
    Lessweight1: number,
    Lessweight2: number,
    Lessweight3: number,
    GTWeight1: number,
    GTWeight2: number,
    GTWeight3: number,
    Amount1: number,
    Amount2: number,
    Amount3: number,
    Grossweightdate1: string,
    Grossweightdate2: string,
    Grossweightdate3: string,
}

// ProductDetail is used in the form data
interface ProductDetail extends BaseProductFields {
    name: string;
    ProductId: number;
}

interface ChallanFormData {
    ChallanID: number;
    ChallanNo: string;
    ChallanModule: string;
    financialYear: string;
    autoGenerated: boolean;
    ChallanDate: string;
    paytype: 'Cash' | 'Credit';

    // Consignee details
    Name: string;
    PartyID: number;
    address: string;
    State: string;
    StateID: number;
    DistrictID: number;
    PinID: string;
    OwnerMobile: string;
    Email: string;

    // Vehicle details
    AdvAmt: number;
    vehicleType: string;
    vehicleTypeid: number;
    partyTypeid: number;
    VehicleNo: string;
    VehicleRemarks: string;
    DriverName: string;
    DriverMobileNo: number;

    // GST details
    gstBill: boolean;
    GstNo: string;
    Party: number;
    gstName: string;
    gstAddress: string;
    GstState: number;
    GstDistrictID: number;
    GstPinID: string;

    // Additional fields
    endUser: boolean;
    dealer: boolean;
    balance: number;
    limit: number;

    // Product and weight details
    productDetails: ProductDetail[];
    ProductId1: number,
    ProductName1: string,
    ProductName2: string,
    ProductName3: string,
    Rate1: number,
    Rate2: number,
    Rate3: number,
    Grossweight1: number,
    Grossweight2: number,
    Grossweight3: number,
    Netweight1: number,
    Netweight2: number,
    Netweight3: number,
    Lessweight1: number,
    Lessweight2: number,
    Lessweight3: number,
    GTWeight1: number,
    GTWeight2: number,
    GTWeight3: number,
    Amount1: number,
    Amount2: number,
    Amount3: number,
    Grossweightdate1: string,
    Grossweightdate2: string,
    Grossweightdate3: string,

    // Amount details
    Amount: number;
    LoadingAmt: number;
    CommisionAmt: number;
    TotalAmt: number;
    GSTAmt: number;
    RoyaltyAmt: number;
    TPAmount: number;
    FreightAmt: number;
    extraAmt: number;
    grandTotal: number;
    TareWeight: number;
    Netweight: number;
    Lessweight: number;
    GTotal: number;
    VehicleCommision: number;

    // Status field
    status?: 'Active' | 'Inactive' | 'Pending' | 'Approved' | 'Rejected';

    // Additional optional fields for UI logic
    department?: string;
    joiningDate?: string;
}

interface ChallanTableItem {
    Companyid: string;
    GstDistrictID: any;
    GstState: any;
    GstPinID: any;
    partyTypeid: any;
    ChallanID: number;
    ChallanModule: string;
    id: string;
    ChallanNo: string;
    ChallanDate: string;
    VoucherType: string;
    partyAddress: string;
    // VehicleNo: string;
    vehicleType: string;
    PinID: number;
    DistrictID: number;
    Name: string;
    grossWeight: number;
    netWeight: number;
    lessWeight: number;
    gtWeight: number;
    amount: number;
    rate: number;
    AdvAmt: string;
    Party: number;
    PartyID: number;
    OwnerMobile: string;
    DriverName: string;
    DriverMobileNo: string;
    VehicleNo: string;
    VehicleTypeid: number;
    PartyTypeid: number;
    VehicleRemarks: string;
    Address: string;
    Productid: string;
    IsGST: string;
    BillName: string;
    GstNo: string;
    State: string;
    StateID: number;
    GstAddress: string;
    //   : string;
    Amount: string;
    LoadingAmt: string;
    CommisionAmt: string;
    TotalAmt: string;
    GSTAmt: string;
    RoyaltyAmt: string;
    TPAmount: string;
    FreightAmt: string;
    GTotal: string;
    Grossweight: string;
    Netweight: string;
    Lessweight: string;
    GTWeight: string;
    financialYear: string;
    paytype: 'Cash' | 'Credit';
    Email: string;
    StatusReason: string;
    Taredate: string;
    Grossdate: string;
    ExtraAmt: string;
    ExtraAmtType: string;
    ProductId1: number;
    Status: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    CreatedDate: string;
    UpdatedDate: string;

    address: string;
    VehicleCommision: number;
    TareWeight: number;
    Rate: number;
    // Product and weight details
    productDetails: ProductDetail[];
    ProductName1: string;
    ProductName2: string,
    ProductName3: string,
    Rate1: number,
    Rate2: number,
    Rate3: number,
    Grossweight1: number,
    Grossweight2: number,
    Grossweight3: number,
    Netweight1: number,
    Netweight2: number,
    Netweight3: number,
    Lessweight1: number,
    Lessweight2: number,
    Lessweight3: number,
    GTWeight1: number,
    GTWeight2: number,
    GTWeight3: number,
    Amount1: number,
    Amount2: number,
    Amount3: number,
    Grossweightdate1: string,
    Grossweightdate2: string,
    Grossweightdate3: string,
}

interface State {
    ID: number;
    Description: string;
    StateID: number;
}

interface District {
    ID: number;
    Discription: string;
}

interface Vehicle {
    VehicleTypeID: number,
    Description: string,
    vehicleType: string
}

interface Party {
    PartyID: number,
    Name: string
}

const CreateChallan: React.FC = () => {
    const [activeTab, setActiveTab] = useState('challanOverview');
    const [showInput, setShowInput] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // ------------Search-Items-------------
    const [fromDate, setFromDate] = useState<Date | null>(null);
    const [fromTime, setFromTime] = useState<Date | null>(null);
    const [toDate, setToDate] = useState<Date | null>(null);
    const [toTime, setToTime] = useState<Date | null>(null);
    const [selectedParty, setSelectedParty] = useState<number | string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState<ChallanTableItem[]>([]);

    // ----------- Custom ------------
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState<"pending" | "approved" | "rejected" | "all">("approved");
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [pendingChallan, setpendingChallan] = useState(0);
    const [approvedChallan, setapprovedChallan] = useState(0);
    const [rejectedChallan, setrejectedChallan] = useState(0);
    const [State, setState] = useState<State[]>([]);
    const [vehicleType, setVehicleType] = useState<Vehicle[]>([]);
    const [partyType, setPartyType] = useState<Party[]>([]);
    const [district, setDistrict] = useState<District[]>([]);
    const [gstPartyType, gstSetPartyType] = useState<Party[]>([]);
    const [gstState, setGSTState] = useState<State[]>([]);
    const [gstDistrict, setGSTDistrict] = useState<District[]>([]);
    const [productName, setProductName] = useState<ProductName[]>([]);
    const [loadingAmt, setLoadingAmt] = useState<LoadingAmt[]>([]);
    const [tpAmount, setTPAmount] = useState<TPAmount[]>([]);
    const [dropdownOptions, setDropdownOptions] = useState<any[]>([]);
    const [dropdown, setDropdown] = useState<any[]>([]);
    const [editItemId, setEditItemId] = useState<number | null>(null);
    const [challanData, setChallanData] = useState<ChallanFormData>({
        ChallanNo: '',
        ChallanModule: '',
        ChallanID: 0,
        autoGenerated: true,
        ChallanDate: moment().format('YYYY-MM-DD HH:mm'),
        paytype: "Cash",

        Name: '',
        partyTypeid: 0,
        PartyID: 0,
        address: '',
        State: '',
        StateID: 0,
        DistrictID: 0,
        PinID: '',
        OwnerMobile: '',
        Email: '',

        AdvAmt: 0,
        vehicleType: '',
        vehicleTypeid: 0,
        VehicleNo: '',
        VehicleRemarks: '',
        DriverName: '',
        DriverMobileNo: 0,

        gstBill: false,
        GstNo: '',
        Party: 0,
        gstName: '',
        gstAddress: '',
        GstState: 0,
        GstDistrictID: 0,
        GstPinID: '',

        endUser: true,
        dealer: false,
        balance: 0,
        limit: 0,

        productDetails: [
            {
                id: '',
                name: '',
                ProductId: 0,
                rate: 0,
                grossWeight: 0,
                netWeight: 0,
                lessWeight: 0,
                gtWeight: 0,
                amount: 0,
                ChallanDate: moment().format('YYYY-MM-DD HH:mm:ss'),
            }
        ],

        ProductId1: 0,
        ProductName1: '',
        ProductName2: '',
        ProductName3: '',
        Rate1: 0,
        Rate2: 0,
        Rate3: 0,
        Grossweight1: 0,
        Grossweight2: 0,
        Grossweight3: 0,
        Netweight1: 0,
        Netweight2: 0,
        Netweight3: 0,
        Lessweight1: 0,
        Lessweight2: 0,
        Lessweight3: 0,
        GTWeight1: 0,
        GTWeight2: 0,
        GTWeight3: 0,
        Amount1: 0,
        Amount2: 0,
        Amount3: 0,
        Grossweightdate1: '',
        Grossweightdate2: '',
        Grossweightdate3: '',

        TareWeight: 0,
        financialYear: '',
        Netweight: 0,
        Lessweight: 0,
        GTWeight: 0,
        VehicleCommision: 0,

        Amount: 0,
        LoadingAmt: 0,
        CommisionAmt: 0,
        TotalAmt: 0,
        GSTAmt: 0,
        RoyaltyAmt: 0,
        TPAmount: 0,
        FreightAmt: 0,
        extraAmt: 0,
        GTotal: 0,

        //Added-Fields
        IsCompleted: "",
        IsForApproval: 1
    });
    const [challanItems, setChallanItems] = useState<ChallanItem[]>([]);

    const printRef = useRef<HTMLDivElement>(null);

    // 🔹 Setup print handler
    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: `Challan_${challanData.ChallanNo || "Slip"}`,
        preserveAfterPrint: false,
    });



    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const blankProduct = {
        id: '',
        name: '',
        rate: 0,
        grossWeight: 0,
        netWeight: 0,
        lessWeight: 0,
        gtWeight: 0,
        amount: 0,
        ChallanDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const Columns = [
        {
            name: 'Actions',
            cell: (row: ChallanTableItem) => (
                <div className="material-name-flex material-name-gap-1">
                    <button onClick={() => { setSelectedId(row.ChallanID!); setShowModal(true); }} className="text-red-600 hover:text-red-800 material-name-btn-icon" title="Delete">
                        <Trash2 className="material-name-icon-sm" />
                    </button>

                    <button onClick={() => { setEditItemId(row.ChallanID!); handleOpenModal(); }} className="material-name-btn-icon" title="Edit">
                        <Edit3 className="material-name-icon-sm" />
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: 'Challan No',
            selector: (row: ChallanTableItem) => row.ChallanNo,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="font-medium">{row.ChallanNo}</span>
            ),
        },
        // {
        //     name: 'Challan Module',
        //     selector: (row: ChallanTableItem) => row.ChallanModule,
        //     sortable: true,
        //     cell: (row: ChallanTableItem) => (
        //         <span className="font-medium">{row.ChallanModule}</span>
        //     ),
        // },
        {
            name: 'Challan Date',
            selector: (row: ChallanTableItem) => row.ChallanDate,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span>{getShowingDateText(row.ChallanDate)}</span>
            ),
        },
        {
            name: 'Paytype',
            selector: (row: ChallanTableItem) => row.paytype,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="text-right">{row.paytype}</span>
            ),
        },

        {
            name: 'Party',
            selector: (row: ChallanTableItem) => row.PartyID,
            sortable: true,
            cell: (row: ChallanTableItem) => {
                const p = partyType.find((x) => x.PartyID === row.PartyID);
                return <span className="font-mono text-sm">{p?.Name}</span>;
            },
        },
        {
            name: 'Address',
            selector: (row: ChallanTableItem) => row.Address,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="text-right">{row.Address}</span>
            ),
        },
        {
            name: 'State',
            selector: (row: ChallanTableItem) => {
                const states = State.find(mg => mg.ID === row.StateID);
                return states?.Description ?? row.State;
            },
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="text-right">{State.find(s => s.ID === row.StateID)?.Description ?? row.State}</span>
            ),
        },
        {
            name: 'District',
            selector: (row: ChallanTableItem) => row.DistrictID,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="font-medium">{row.DistrictID}</span>
            ),
        },
        {
            name: 'PIN ID',
            selector: (row: ChallanTableItem) => row.PinID,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="font-medium">{row.PinID}</span>
            ),
        },
        {
            name: 'Contact No',
            selector: (row: ChallanTableItem) => row.OwnerMobile,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="text-right">{row.OwnerMobile}</span>
            ),
        },
        {
            name: 'Email ID',
            selector: (row: ChallanTableItem) => row.Email,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="text-right">{row.Email}</span>
            ),
        },

        {
            name: 'Advance Amt',
            selector: (row: ChallanTableItem) => row.AdvAmt,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="font-medium">{row.AdvAmt}</span>
            ),
        },
        {
            name: 'Vehicle Type',
            selector: (row: ChallanTableItem) => row.VehicleTypeid,
            cell: (row: ChallanTableItem) => {
                const v = vehicleType.find((x) => x.VehicleTypeID === row.VehicleTypeid);
                return <span className="font-mono text-sm">{v?.Description}</span>;
            },
        },
        {
            name: 'Vehicle No',
            selector: (row: ChallanTableItem) => row.VehicleNo,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="text-sm text-gray-600">{row.VehicleNo}</span>
            ),
        },
        {
            name: 'DriverName',
            selector: (row: ChallanTableItem) => row.DriverName,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="font-medium">{row.DriverName}</span>
            ),
        },
        {
            name: 'Driver Mobile No',
            selector: (row: ChallanTableItem) => row.DriverMobileNo,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="text-sm text-gray-600">{row.DriverMobileNo}</span>
            ),
        },
        {
            name: 'Vehicle Remarks',
            selector: (row: ChallanTableItem) => row.VehicleRemarks,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="font-medium">{row.VehicleRemarks}</span>
            ),
        },

        {
            name: 'GstNo',
            selector: (row: ChallanTableItem) => row.GstNo,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="text-right">{row.GstNo}</span>
            ),
        },
        {
            name: 'GST Party',
            selector: (row: ChallanTableItem) => row.Name,
            sortable: true,
            cell: (row: ChallanTableItem) => {
                return <span className="font-mono text-sm">{row.Name}</span>;
            },
        },
        {
            name: 'Gst Address',
            selector: (row: ChallanTableItem) => row.GstAddress,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="text-right">{row.GstAddress}</span>
            ),
        },
        {
            name: 'Gst State',
            selector: (row: ChallanTableItem) => row.GstState,
            sortable: true,
            cell: (row: ChallanTableItem) => {
                const s = gstState.find((st) => Number(st.ID) === Number(row.GstState));
                return <span className="text-right">{s?.Description}</span>
            },
        },
        {
            name: 'Gst District',
            selector: (row: ChallanTableItem) => row.GstDistrictID,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="text-right">{row.GstDistrictID}</span>
            ),
        },
        {
            name: 'Gst PinID',
            selector: (row: ChallanTableItem) => row.GstPinID,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="text-right">{row.GstPinID}</span>
            ),
        },
        //Prod-1
        {
            name: 'Product Name1',
            selector: (row: ChallanFormData) => row.ProductName1,
            sortable: true,
            cell: (row: ChallanFormData) => (
                <span className="text-right">{row.ProductName1}</span>
            ),
        },
        {
            name: 'Rate1',
            selector: (row: ChallanFormData) => row.Rate1,
            sortable: true,
            cell: (row: ChallanFormData) => (
                <span className="text-right">{row.Rate1}</span>
            ),
        },
        {
            name: 'Gross Weight1',
            selector: (row: ChallanFormData) => row.Grossweight1,
            sortable: true,
            cell: (row: ChallanFormData) => (
                <span className="text-right">{row.Grossweight1}</span>
            ),
        },
        {
            name: 'Net Weight1',
            selector: (row: ChallanFormData) => row.Netweight1,
            sortable: true,
            cell: (row: ChallanFormData) => (
                <span className="text-right">{row.Netweight1}</span>
            ),
        },
        {
            name: 'Less Weight1',
            selector: (row: ChallanFormData) => row.Lessweight1,
            sortable: true,
            cell: (row: ChallanFormData) => (
                <span className="text-right">{row.Lessweight1}</span>
            ),
        },
        {
            name: 'GT Weight1',
            selector: (row: ChallanFormData) => row.GTWeight1,
            sortable: true,
            cell: (row: ChallanFormData) => (
                <span className="text-right">{row.GTWeight1}</span>
            ),
        },
        {
            name: 'Amount1',
            selector: (row: ChallanFormData) => row.Amount1,
            sortable: true,
            cell: (row: ChallanFormData) => (
                <span className="text-right font-semibold">{row.Amount1}</span>
            ),
        },
        {
            name: 'Date/Time1',
            selector: (row: ChallanFormData) => row.ChallanDate,
            sortable: true,
            cell: (row: ChallanFormData) => (
                <span className="text-right">{getShowingDateText(row.ChallanDate)}</span>
            ),
        },

        //Prod-2
        {
            name: 'Product Name2',
            selector: (row: ChallanFormData) => row.ProductName2,
            sortable: true,
            cell: (row: ChallanFormData) => (
                <span className="text-right">{row.ProductName2}</span>
            ),
        },
        {
            name: 'Rate2',
            selector: (row: ChallanFormData) => row.Rate2,
            sortable: true,
            cell: (row: ChallanFormData) => (
                <span className="text-right">{row.Rate2}</span>
            ),
        },
        {
            name: 'Gross Weight2',
            selector: (row: ChallanFormData) => row.Grossweight2,
            sortable: true,
            cell: (row: ChallanFormData) => (
                <span className="text-right">{row.Grossweight2}</span>
            ),
        },
        {
            name: 'Net Weight2',
            selector: (row: ChallanFormData) => row.Netweight2,
            sortable: true,
            cell: (row: ChallanFormData) => (
                <span className="text-right">{row.Netweight2}</span>
            ),
        },
        {
            name: 'Less Weight2',
            selector: (row: ChallanFormData) => row.Lessweight2,
            sortable: true,
            cell: (row: ChallanFormData) => (
                <span className="text-right">{row.Lessweight2}</span>
            ),
        },
        {
            name: 'GT Weight2',
            selector: (row: ChallanFormData) => row.GTWeight2,
            sortable: true,
            cell: (row: ChallanFormData) => (
                <span className="text-right">{row.GTWeight2}</span>
            ),
        },
        {
            name: 'Amount2',
            selector: (row: ChallanFormData) => row.Amount2,
            sortable: true,
            cell: (row: ChallanFormData) => (
                <span className="text-right font-semibold">{row.Amount2}</span>
            ),
        },
        {
            name: 'Date/Time2',
            selector: (row: ChallanFormData) => row.ChallanDate,
            sortable: true,
            cell: (row: ChallanFormData) => (
                <span className="text-right">{getShowingDateText(row.ChallanDate)}</span>
            ),
        },
        //Prod-3
        {
            name: 'Product Name3',
            selector: (row: ChallanFormData) => row.ProductName3,
            sortable: true,
            cell: (row: ChallanFormData) => (
                <span className="text-right">{row.ProductName3}</span>
            ),
        },
        {
            name: 'Rate3',
            selector: (row: ChallanFormData) => row.Rate3,
            sortable: true,
            cell: (row: ChallanFormData) => (
                <span className="text-right">{row.Rate3}</span>
            ),
        },
        {
            name: 'Gross Weight3',
            selector: (row: ChallanFormData) => row.Grossweight3,
            sortable: true,
            cell: (row: ChallanFormData) => (
                <span className="text-right">{row.Grossweight3}</span>
            ),
        },
        {
            name: 'Net Weight3',
            selector: (row: ChallanFormData) => row.Netweight3,
            sortable: true,
            cell: (row: ChallanFormData) => (
                <span className="text-right">{row.Netweight3}</span>
            ),
        },
        {
            name: 'Less Weight3',
            selector: (row: ChallanFormData) => row.Lessweight3,
            sortable: true,
            cell: (row: ChallanFormData) => (
                <span className="text-right">{row.Lessweight3}</span>
            ),
        },
        {
            name: 'GT Weight3',
            selector: (row: ChallanFormData) => row.GTWeight3,
            sortable: true,
            cell: (row: ChallanFormData) => (
                <span className="text-right">{row.GTWeight3}</span>
            ),
        },
        {
            name: 'Amount3',
            selector: (row: ChallanFormData) => row.Amount3,
            sortable: true,
            cell: (row: ChallanFormData) => (
                <span className="text-right font-semibold">{row.Amount3}</span>
            ),
        },
        {
            name: 'Date/Time3',
            selector: (row: ChallanFormData) => row.ChallanDate,
            sortable: true,
            cell: (row: ChallanFormData) => (
                <span className="text-right">{getShowingDateText(row.ChallanDate)}</span>
            ),
        },

        {
            name: 'TareWeight',
            selector: (row: ChallanFormData) => row.TareWeight,
            sortable: true,
            cell: (row: ChallanFormData) => (
                <span className="text-right">{row.TareWeight}</span>
            ),
        },
        {
            name: 'Netweight',
            selector: (row: ChallanFormData) => row.Netweight,
            sortable: true,
            cell: (row: ChallanFormData) => (
                <span className="text-right">{row.Netweight}</span>
            ),
        },
        {
            name: 'Lessweight',
            selector: (row: ChallanFormData) => row.Lessweight,
            sortable: true,
            cell: (row: ChallanFormData) => (
                <span className="text-right">{row.Lessweight}</span>
            ),
        },
        {
            name: 'Total GT Weight',
            selector: (row: ChallanFormData) => row.GTWeight,
            sortable: true,
            cell: (row: ChallanFormData) => (
                <span className="text-right">{row.GTWeight}</span>
            ),
        },
        {
            name: 'Vehicle Commision',
            selector: (row: ChallanFormData) => row.VehicleCommision,
            sortable: true,
            cell: (row: ChallanFormData) => (
                <span className="text-right">{row.VehicleCommision}</span>
            ),
        },
        {
            name: 'Financial Year',
            selector: (row: ChallanFormData) => row.financialYear,
            sortable: true,
            cell: (row: ChallanFormData) => (
                <span className="text-right">{row.financialYear}</span>
            ),
        },


        {
            name: 'Amount',
            selector: (row: ChallanTableItem) => row.Amount,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="text-right">{row.Amount}</span>
            ),
        },
        {
            name: 'Loading Amount',
            selector: (row: ChallanTableItem) => row.LoadingAmt,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="text-right">{row.LoadingAmt}</span>
            ),
        },
        {
            name: 'Commision Amount',
            selector: (row: ChallanTableItem) => row.CommisionAmt,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="text-right">{row.CommisionAmt}</span>
            ),
        },
        {
            name: 'GST Amount',
            selector: (row: ChallanTableItem) => row.GSTAmt,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="text-right">{row.GSTAmt}</span>
            ),
        },
        {
            name: 'Royalty Amount',
            selector: (row: ChallanTableItem) => row.RoyaltyAmt,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="text-right">{row.RoyaltyAmt}</span>
            ),
        },
        {
            name: 'TP Amount',
            selector: (row: ChallanTableItem) => row.TPAmount,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="text-right">{row.TPAmount}</span>
            ),
        },
        {
            name: 'Freight Amount',
            selector: (row: ChallanTableItem) => row.FreightAmt,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="text-right">{row.FreightAmt}</span>
            ),
        },
        {
            name: 'Total Amount',
            selector: (row: ChallanTableItem) => row.GTotal,
            sortable: true,
            cell: (row: ChallanTableItem) => (
                <span className="text-right">{row.GTotal}</span>
            ),
        },

        // {
        //     name: 'Status',
        //     selector: (row: ChallanTableItem) => row.Status,
        //     sortable: true,
        //     cell: (row: ChallanTableItem) => (
        //         <span className={`maintenance-type-badge ${row.Status === 'Pending' ? 'maintenance-type-badge-success' : 'maintenance-type-badge-error'}`}>
        //             {row.Status === 'Pending' ? 'Pending' : 'Approved'}
        //         </span>
        //     )
        // },
        {
            name: 'Created Date',
            selector: (row: ChallanTableItem) => getShowingDateText(row.CreatedDate),
            sortable: true,
        },
        {
            name: 'Last Modified',
            selector: (row: ChallanTableItem) => getShowingDateText(row.UpdatedDate),
            sortable: true,
        },
    ];

    // ---------------Get-Data------------------
    const getChallanItem = async () => {
        try {
            setLoading(true);
            const payload = {
                CompanyId: Number(localStorage.getItem("companyID")),
                IsForApproval: '',
                CreatedDatefrom: '',
                CreatedDateTo: '',
                IsReject: ''
            }
            const response = await fetchPostData('Challan/GetData_Challan', payload);
            // console.log(response);

            if (response) {
                setChallanItems(response);
                setFilteredData(response);
            }
        } catch (error: any) {
            setChallanItems([]);
        } finally {
            setLoading(false);
        }
    };

    const insertChallan = async (formData: any) => {
        try {
            const flatProducts = challanData.productDetails.reduce<Record<string, any>>((acc, product, index) => {
                const i = index + 1;
                acc[`ProductName${i}`] = product.name || '';
                acc[`Rate${i}`] = product.rate || 0;
                acc[`Grossweight${i}`] = product.grossWeight || 0;
                acc[`Netweight${i}`] = product.netWeight || 0;
                acc[`Lessweight${i}`] = product.lessWeight || 0;
                acc[`GTWeight${i}`] = product.gtWeight || 0;
                acc[`Amount${i}`] = product.amount || 0;
                acc[`Grossweightdate${i}`] = product.ChallanDate || null;
                return acc;
            }, {});
            const payload = {
                ...challanData,
                ...flatProducts,
                CompanyId: dropdown.map(opt => opt.value).toString() || localStorage.getItem("companyID"),
            };
            //   console.log(payload);

            const response = await fetchPostData("Challan/Insert_Challan", payload);
            const message = response[0].Message;

            if (message === "Already Exists MaterialSubTypeCode") {
                toastifyError("Code is already Present");
                return;
            }

            if (message === "Already Exists Description") {
                toastifyError("Description is already Present");
                return;
            }

            if (response) {
                toastifySuccess("Challan is added successfully");
                await getChallanItem();
                await fetchCounts();
                return true;
            } else {
                throw new Error('Invalid response from server');
            }
            return true;
        } catch (error: any) {
            toastifyError(`Error adding material type: ${error.message}`);
            return false;
        }
    };

    const updateChallan = async (formData: any, id: number) => {
        try {
            setLoading(true);
            const flatProducts = challanData.productDetails.reduce<Record<string, any>>((acc, product, index) => {
                const i = index + 1;
                acc[`ProductName${i}`] = product.name || '';
                acc[`Rate${i}`] = product.rate || 0;
                acc[`Grossweight${i}`] = product.grossWeight || 0;
                acc[`Netweight${i}`] = product.netWeight || 0;
                acc[`Lessweight${i}`] = product.lessWeight || 0;
                acc[`GTWeight${i}`] = product.gtWeight || 0;
                acc[`Amount${i}`] = product.amount || 0;
                acc[`Grossweightdate${i}`] = product.ChallanDate || null;
                return acc;
            }, {});
            const payload = {
                ...formData,
                ...flatProducts,
                ChallanID: id,
                CompanyId: dropdown.map(opt => opt.value).toString() || localStorage.getItem("companyID"),
            };
            const response = await fetchPostData("Challan/Update_Challan", payload);
            const message = response[0].Message;
            // console.log(response);

            if (message === "Already Exists MaterialNameCode") {
                toastifyError("Code is already Present");
                return;
            }

            if (message === "Already Exists Description") {
                toastifyError("Description is already Present");
                return;
            }

            if (response) {
                toastifySuccess('Challan updated successfully');
                setEditItemId(null);
                setDropdown([]);
                await getChallanItem();
                return true;
            }
        }
        catch (error: any) {
            toastifyError(`Error updating Challan: ${error.message}`);
            return false;
        }
    };

    const deleteMaterialName = async (Id: number) => {
        try {
            setLoading(true);
            const item = challanItems.find(x => x.ChallanID === Id);
            if (!item) return;

            // const newStatus = item.IsActive ? 0 : 1;
            const payload = {
                ChallanID: Id,
                IsActive: 1
            }
            // console.log(payload);

            const response = await fetchPostData('Challan/Delete_Challan', payload);
            // console.log(response);
            if (response) {
                toastifySuccess('Material name deleted successfully');
                await getChallanItem();
                await fetchCounts();
                return true;
            }
            return false;
        } catch (error: any) {
            // console.error('Error deleting material name:', error);
            toastifyError(`Error deleting material name: ${error.message}`);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const fetchCounts = async () => {
        try {
            const payload = {
                CompanyId: Number(localStorage.getItem("companyID")),
                IsForApproval: '1',
                CreatedDatefrom: '',
                CreatedDateTo: '',
                IsRejetc: '1'
            }
            const [isPending, isApproved, isRejected] = await Promise.all([
                fetch_Post_Data('Challan/GetData_Challan', payload),
                fetch_Post_Data('Challan/GetData_Challan', payload),
                fetch_Post_Data('Challan/GetData_Challan', payload),
            ]);

            setpendingChallan(Array.isArray(isPending?.Data) ? isPending.Data.length : 0);
            setapprovedChallan(Array.isArray(isApproved?.Data) ? isApproved.Data.length : 0);
            setrejectedChallan(Array.isArray(isRejected?.Data) ? isRejected.Data.length : 0);
        } catch (err) {
            toastifyError("Error fetching counts");
        }
    };

    useEffect(() => {
        getChallanItem();
        fetchCounts();
    }, [filter]);

    useEffect(() => {
        if (challanData.productDetails.length === 0) {
            setChallanData((prev) => ({
                ...prev,
                productDetails: [blankProduct],
            }));
        }
    }, [challanData]);

    const handleAddProductRow = () => {
        if (challanData.productDetails.length >= 3) return;

        const newRow = {
            id: '',
            name: '',
            ProductName1: '',
            rate: 0,
            grossWeight: 0,
            netWeight: 0,
            lessWeight: 0,
            gtWeight: 0,
            amount: 0,
            ChallanDate: moment().format('YYYY-MM-DD HH:mm:ss'),
            ChallanID: 0
        }
        setChallanData((prev) => ({
            ...prev,
            productDetails: [...prev.productDetails, newRow]
        }))
    }

    const handleProductChange = (index: number, field: string, value: any) => {
        setChallanData((prev) => {
            const updatedProducts = [...prev.productDetails];
            updatedProducts[index] = {
                ...updatedProducts[index],
                [field]: value,
            };

            // Auto-calculate GT Weight and Amount
            if (['rate', 'netWeight', 'lessWeight'].includes(field)) {
                const rate = Number(updatedProducts[index].rate) || 0;
                const netWeight = Number(updatedProducts[index].netWeight) || 0;
                const lessWeight = Number(updatedProducts[index].lessWeight) || 0;

                const gtWeight = netWeight - lessWeight;
                const amount = gtWeight * rate;

                updatedProducts[index].gtWeight = gtWeight;
                updatedProducts[index].amount = amount;
            }

            return { ...prev, productDetails: updatedProducts };
        });
    };

    const handleSaveChallan = async () => {
        // if (!materialNameForm.MaterialNameCode || !materialNameForm.Description) {
        //     toastifyError('Please fill in all required fields');
        //     return;
        // }

        if (editItemId) {
            const success = await updateChallan(challanData, editItemId);
            if (success) {
                setEditItemId(null);
                handleCloseModal();
                resetForm();
            }
        } else {
            const success = await insertChallan(challanData);
            if (success) {
                handleCloseModal();
                resetForm();
            }
        }
    };

    useEffect(() => {
        if (editItemId && dropdownOptions.length > 0) {
            getSingleChallan();
        }
    }, [editItemId, dropdownOptions]);

    // Get Single Material 
    const getSingleChallan = async () => {
        try {
            const response = await fetchPostData('Challan/GetSingleData_Challan', { ChallanID: editItemId, });
            if (!response || response.length === 0) return;

            const record = response[0];

            setChallanData({
                // === Basic Info ===
                ChallanNo: record.ChallanNo || '',
                ChallanModule: record.ChallanModule || '',
                ChallanID: record.ChallanID || 0,
                financialYear: record.financialYear || '2025-2026',
                autoGenerated: true,
                ChallanDate: moment(record.CreatedDate || new Date()).format('YYYY-MM-DD HH:mm:ss'),
                paytype: (() => {
                    const p = String(record.paytype || '').toLowerCase();
                    return p === 'credit' ? 'Credit' : 'Cash';
                })(),

                // === Party Info ===
                Name: record.Name || '',
                PartyID: record.PartyID || 0,
                address: record.Address || '',
                State: record.Stateid || 0,
                StateID: record.Stateid || 0,
                district: record.DistrictID || 0,
                PinID: record.PinID || '',
                OwnerMobile: record.OwnerMobile || '',
                Email: record.Email || '',

                // === Vehicle Info ===
                AdvAmt: record.AdvAmt || 0,
                vehicleTypeid: record.VehicleTypeid || 0,
                VehicleNo: record.VehicleNo || '',
                VehicleRemarks: record.VehicleRemarks || '',
                DriverName: record.DriverName || '',
                DriverMobileNo: record.DriverMobileNo || '',

                // === GST Info ===
                gstBill: record.IsGST === 1,
                GstNo: record.GstNo || '',
                gstName: record.BillName || '',
                gstAddress: record.GstAddress || '',
                GstState: Number(record.GstState) || 0,
                GstDistrictID: record.GstDistrictID || 0,
                GstPinID: record.GstPinID || '',

                // === Product Details ===
                productDetails: [
                    ...(record.ProductName1 ? [{
                        id: record.ProductId1 || 0,
                        name: record.ProductName1 || '',
                        rate: Number(record.Rate1) || 0,
                        grossWeight: Number(record.Grossweight1) || 0,
                        netWeight: Number(record.Netweight1) || 0,
                        lessWeight: Number(record.Lessweight1) || 0,
                        gtWeight: Number(record.GTWeight1) || 0,
                        amount: Number(record.Amount1) || 0,
                        ChallanDate: record.Grossweightdate1 || moment().format('YYYY-MM-DD HH:mm:ss'),
                    }] : []),

                    ...(record.ProductName2 ? [{
                        id: record.ProductId2 || '',
                        name: record.ProductName2 || '',
                        rate: Number(record.Rate2) || 0,
                        grossWeight: Number(record.Grossweight2) || 0,
                        netWeight: Number(record.Netweight2) || 0,
                        lessWeight: Number(record.Lessweight2) || 0,
                        gtWeight: Number(record.GTWeight2) || 0,
                        amount: Number(record.Amount2) || 0,
                        ChallanDate: record.Grossweightdate2 || moment().format('YYYY-MM-DD HH:mm:ss'),
                    }] : []),

                    ...(record.ProductName3 ? [{
                        id: record.ProductId3 || '',
                        name: record.ProductName3 || '',
                        rate: Number(record.Rate3) || 0,
                        grossWeight: Number(record.Grossweight3) || 0,
                        netWeight: Number(record.Netweight3) || 0,
                        lessWeight: Number(record.Lessweight3) || 0,
                        gtWeight: Number(record.GTWeight3) || 0,
                        amount: Number(record.Amount3) || 0,
                        ChallanDate: record.Grossweightdate3 || moment().format('YYYY-MM-DD HH:mm:ss'),
                    }] : []),
                ],
                //   ProductName1: record.ProductName1,
                //   ProductName2: record.ProductName2,
                //   ProductName3: record.ProductName3,
                //   Rate1: record.Rate1,
                //   Rate2: record.Rate2,
                //   Rate3: record.Rate3,
                //   Grossweight1: record.Grossweight1,
                //   Grossweight2: record.Grossweight2,
                //   Grossweight3: record.Grossweight3,
                //   Netweight1: record.Netweight1,
                //   Netweight2: record.Netweight2,
                //   Netweight3: record.Netweight3,
                //   Lessweight1: record.Lessweight1,
                //   Lessweight2: record.Lessweight2,
                //   Lessweight3: record.Lessweight3,
                //   GTWeight1: record.GTWeight1,
                //   GTWeight2: record.GTWeight2,
                //   GTWeight3: record.GTWeight3,
                //   Amount1: record.Amount1,
                //   Amount2: record.Amount2,
                //   Amount3: record.Amount3,
                //   Grossweightdate1: record.Grossweightdate1,
                //   Grossweightdate2: record.Grossweightdate2,
                //   Grossweightdate3: record.Grossweightdate3,

                // === Weight Section (flattened) ===
                TareWeight: Number(record.TareWeight) || 0,
                Netweight: Number(record.Netweight) || 0,
                Lessweight: Number(record.Lessweight) || 0,
                GTWeight: Number(record.GTWeight) || 0,
                VehicleCommision: Number(record.CommisionAmt) || 0,

                // === Amount Section (flattened) ===
                Amount: Number(record.Amount) || 0,
                LoadingAmt: Number(record.LoadingAmt) || 0,
                CommisionAmt: Number(record.CommisionAmt) || 0,
                GSTAmt: Number(record.GSTAmt) || 0,
                RoyaltyAmt: Number(record.RoyaltyAmt) || 0,
                TPAmount: Number(record.TPAmount) || 0,
                FreightAmt: Number(record.FreightAmt) || 0,
                GTotal: Number(record.GTotal) || 0,
            });

            // Load dependent dropdowns
            if (record.Stateid) await fetchDistrict(record.Stateid);
            const companyIdField = record.Companyid ?? record.CompanyID ?? record.CompanyId ?? "";

            if (companyIdField && dropdownOptions.length > 0) {
                const companyIds = String(companyIdField).split(",").map(id => id.trim());
                const matchOptions = dropdownOptions.filter(opt => companyIds.includes(String(opt.CompanyID))).map(opt => ({
                    value: opt.CompanyID,
                    label: opt.CompanyName
                }));
                setDropdown(matchOptions);
            }
        } catch (error: any) {
            console.error("Error fetching challan:", error);
            toastifyError(`Error fetching challan: ${error.message}`);
        }
    };

    const resetForm = () => {
        setChallanData({
            ChallanNo: '',
            ChallanModule: '',
            ChallanID: 0,
            financialYear: '2025-2026',
            autoGenerated: true,
            ChallanDate: moment().format('YYYY-MM-DD HH:mm:ss'),
            paytype: "Cash",

            Name: '',
            partyTypeid: 0,
            address: '',
            State: '',
            StateID: 0,
            district: 0,
            PinID: '',
            OwnerMobile: '',
            Email: '',

            AdvAmt: 0,
            vehicleType: '',
            vehicleTypeid: 0,
            VehicleNo: '',
            VehicleRemarks: '',
            DriverName: '',
            DriverMobileNo: 0,

            gstBill: false,
            GstNo: '',
            Party: 0,
            gstName: '',
            gstAddress: '',
            GstState: 0,
            gstDistrict: 0,
            GstPinID: '',

            endUser: true,
            dealer: false,
            balance: 0,
            limit: 0,

            productDetails: [
                {
                    id: '',
                    name: '',
                    // ProductName1: '',
                    rate: 0,
                    grossWeight: 0,
                    netWeight: 0,
                    lessWeight: 0,
                    gtWeight: 0,
                    amount: 0,
                    ChallanDate: moment().format('YYYY-MM-DD HH:mm:'),
                    ChallanID: 0
                }
            ],
            weightDetails: {
                TareWeight: 0,
                ChallanDate: '',
                netWeight: 0,
                lessWeight: 0,
                GTWeight: 0,
                VehicleCommision: 0,
            },

            amount: 0,
            loading: 0,
            commission: 0,
            total: 0,
            gstAmount: 0,
            royalty: 0,
            TPAmount: 0,
            freightAmt: 0,
            extraAmt: 0,
            grandTotal: 0,
        });
    };

    //----------------------Dropdowns-----------------------
    const fetchState = async () => {
        try {
            const response = await fetchPostData('State/GetDataDropDown_State', {
                CompanyId: Number(localStorage.getItem('companyID')),
            });
            // console.log(State[0]);

            if (response && Array.isArray(response)) {
                setState(response);
                setGSTState(response);
            }
        } catch {
            toastifyError('Error fetching States');
        }
    }

    const fetchDistrict = async (stateID: number | string) => {
        try {
            const response = await fetchPostData('District/GetDataDropDown_District', {
                StateId: stateID,
                CompanyId: Number(localStorage.getItem('companyID')),
            })
            // console.log(response);
            if (response && Array.isArray(response)) {
                setDistrict(response);
                setGSTDistrict(response);
            } else {
                setDistrict([]);
            }
        } catch {
            toastifyError('Error fetching District');
        }
    }

    const fetchVehicleType = async () => {
        try {
            const response = await fetchPostData('VehicleType/GetDataDropDown_VehicleType', {
                CompanyId: Number(localStorage.getItem('companyID'))
            })
            // console.log(response);
            if (response && Array.isArray(response)) {
                setVehicleType(response);
            } else {
                setVehicleType([]);
            }
        } catch {
            toastifyError('Error fetching Vehicle Type.');
        }
    }

    const fetchParty = async () => {
        try {
            const response = await fetchPostData('Party/GetDataDropDown_Party', {
                CompanyId: Number(localStorage.getItem('companyID'))
            })
            // console.log(response);
            if (response && Array.isArray(response)) {
                setPartyType(response);
                gstSetPartyType(response);
            } else {
                setPartyType([]);
                gstSetPartyType([]);
            }
        } catch {
            toastifyError('Error fetching Party Type.');
        }
    }

    const fetchProductName = async () => {
        try {
            const response = await fetchPostData('Product/GetDataDropDown_Product', {
                CompanyId: Number(localStorage.getItem('companyID'))
            })
            // console.log(response);
            if (response && Array.isArray(response)) {
                setProductName(response);
            } else {
                setProductName([]);
            }
        } catch {
            toastifyError('Error fetching Product Name');
        }
    }

    const fetchLoading = async () => {
        try {
            const response = await fetchPostData('Loadingcharge/GetDataDropDown_Loadingcharge', {
                CompanyId: Number(localStorage.getItem('companyID'))
            });
            // console.log(response);
            if (response && Array.isArray(response)) {
                setLoadingAmt(response);
            } else {
                setLoadingAmt([]);
            }
        } catch {
            toastifyError("Error fetching the ")
        }
    }

    const fetchTPAmount = async () => {
        try {
            const response = await fetchPostData('TpAmount/GetDataDropDown_TpAmount', {
                CompanyId: Number(localStorage.getItem('companyID'))
            });
            // console.log(response);
            if (response && Array.isArray(response)) {
                setTPAmount(response);
            }
        } catch {
            setTPAmount([]);
        }
    }

    useEffect(() => {
        fetchState();
        //   fetchDistrict(State);
        fetchVehicleType();
        fetchParty();
        fetchProductName();
        fetchLoading();
        fetchTPAmount();
    }, []);

    // useEffect(() => {
    //     const fetchDropDown = async () => {
    //         try {
    //             const payload = { EmployeeID: localStorage.getItem("employeeID") };
    //             const response = await fetchPostData('Users/GetData_Company', payload);
    //             // console.log(response);
    //             if (response) {
    //                 const data = response;
    //                 setDropdownOptions(Array.isArray(data) ? data : []);
    //             } else {
    //                 toastifyError("Failed to load Dropdown.")
    //             }
    //         } catch (error: any) {
    //             toastifyError("Error fetching Dropdown");
    //         }
    //     }
    //     fetchDropDown();
    // }, []);

    const options = dropdownOptions.map(opt => ({
        value: opt.CompanyID,
        label: opt.CompanyName
    }));

    // Filter states for history
    const [historyFilters, setHistoryFilters] = useState({
        searchTerm: '',
        dateFrom: '',
        dateTo: '',
        status: '',
        paytype: '',
        Name: ''
    });

    // Filtered history data
    // const filteredHistory: any = challanHistory.filter(challan => {
    //     const matchesSearch = challan.challanNo.toLowerCase().includes(historyFilters.searchTerm.toLowerCase()) ||
    //         challan.Name.toLowerCase().includes(historyFilters.searchTerm.toLowerCase()) ||
    //         challan.VehicleNo.toLowerCase().includes(historyFilters.searchTerm.toLowerCase()) ||
    //         challan.DriverName.toLowerCase().includes(historyFilters.searchTerm.toLowerCase());

    //     const matchesDateFrom = !historyFilters.dateFrom || challan.date >= historyFilters.dateFrom;
    //     const matchesDateTo = !historyFilters.dateTo || challan.date <= historyFilters.dateTo;
    //     const matchesStatus = !historyFilters.status || challan.status === historyFilters.status;
    //     const matchesPaymentType = !historyFilters.paytype || challan.paytype === historyFilters.paytype;
    //     const matchesConsignee = !historyFilters.Name || challan.Name.toLowerCase().includes(historyFilters.Name.toLowerCase());

    //     return matchesSearch && matchesDateFrom && matchesDateTo && matchesStatus && matchesPaymentType && matchesConsignee;
    // });

    const handleSearch = () => {
        let result = challanItems;

        const fromDateTime = fromDate ? new Date(
            `${moment(fromDate).format('YYYY-MM-DD')} ${fromTime ? moment(fromTime).format('HH:mm:ss') : '00:00:00'
            }`) : null;

        const toDateTime = toDate
            ? new Date(
                `${moment(toDate).format('YYYY-MM-DD')} ${toTime ? moment(toTime).format('HH:mm:ss') : '23:59:59'
                }`
            ) : null;

        // Filter by date range
        if (fromDateTime && toDateTime) {
            result = result.filter((item) => {
                const challanDate = new Date(item.CreatedDate);
                return challanDate >= fromDateTime && challanDate <= toDateTime;
            });
        }
        else if (fromDateTime && !toDateTime) {
            result = result.filter((item) => {
                const challanDate = new Date(item.CreatedDate);
                return challanDate >= fromDateTime;
            });
        }

        // Filter by party
        if (selectedParty) {
            result = result.filter((item) => item.PartyID === challanData.Party);
            // console.log(result.length);
        }

        // Filter by challan number (search input)
        if (searchTerm.trim()) {
            const term = searchTerm.trim().toLowerCase();
            result = result.filter((item) =>
                item.ChallanNo?.toLowerCase().includes(term)
            );
        }

        setFilteredData(result);
    };

    // const selectCompactStyles: any = {
    //     control: (provided: any) => ({
    //         ...provided,
    //         minHeight: "33px",
    //         height: "33px",
    //         fontSize: "14px",
    //         padding: "0 2px",
    //     }),
    //     valueContainer: (provided: any) => ({
    //         ...provided,
    //         padding: "0 6px",
    //     }),
    //     indicatorsContainer: (provided: any) => ({
    //         ...provided,
    //         padding: "0 6px",
    //     }),
    //     dropdownIndicator: (provided: any) => ({
    //         ...provided,
    //         padding: "0 6px",
    //     }),
    //     clearIndicator: (provided: any) => ({
    //         ...provided,
    //         padding: "0 6px",
    //     }),
    // };

    const selectCompactStyles: any = {
        control: (provided: any, state: any) => ({
            ...provided,
            minHeight: "33px",
            height: "33px",
            fontSize: "14px",
            padding: "0 2px",
            borderColor: state.isFocused ? "#6ea8ff" : "#84b3f8", // ✅ Default light blue border
            boxShadow: state.isFocused ? "0 0 0 1px #84b3f8" : "none",
            "&:hover": {
                borderColor: "#6ea8ff", // Hover पर थोड़ा गहरा blue
            },
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

    const resizeableColumns = useResizableColumns(Columns).map(col => ({
        ...col, minWidth: typeof col.minWidth === "number" ? `${col.minWidth}px` : col.minWidth
    }));

    //Download-Excel_File
    const exportToExcel = () => {
        const filteredDataNew = challanItems.map((item) => ({
            "Challan ID": item.ChallanID,
            "Challan No": item.ChallanNo,
            "Challan Module": item.ChallanModule,
            "Challan Date": item.ChallanDate,
            "Financial Year": item.financialYear,
            "Voucher Type": item.VoucherType || "",
            "Pay Type": item.paytype || "",
            "Advance Amount": item.AdvAmt || 0,

            "Party Name": item.Name || "",
            "Party ID": item.PartyID || "",
            "Party Type ID": item.partyTypeid || "",
            "Address": item.Address || item.address || "",
            "State": item.State || "",
            "State ID": item.StateID || "",
            "District ID": item.DistrictID || "",
            "Pin ID": item.PinID || "",
            "Email": item.Email || "",
            "Owner Mobile": item.OwnerMobile || "",

            "Vehicle No": item.VehicleNo || "",
            "Vehicle Type ID": item.VehicleTypeid || "",
            "Vehicle Remarks": item.VehicleRemarks || "",
            "Vehicle Commission": item.VehicleCommision || "",
            "Driver Name": item.DriverName || "",
            "Driver Mobile No": item.DriverMobileNo || "",

            "GST Bill": item.IsGST ? "Yes" : "No",
            "GST No": item.GstNo || "",
            "GST Address": item.GstAddress || "",
            "GST State": item.GstState || "",
            "GST District ID": item.GstDistrictID || "",
            "GST Pin ID": item.GstPinID || "",
            "Bill Name": item.BillName || "",

            "Gross Weight": item.Grossweight || "",
            "Tare Weight": item.TareWeight || "",
            "Net Weight": item.Netweight || "",
            "Less Weight": item.Lessweight || "",
            "GT Weight": item.GTWeight || "",

            "Rate": item.Rate || "",
            "Amount": item.Amount || "",
            "Loading Amount": item.LoadingAmt || "",
            "Commission Amount": item.CommisionAmt || "",
            "Total Amount": item.TotalAmt || "",
            "GST Amount": item.GSTAmt || "",
            "Royalty Amount": item.RoyaltyAmt || "",
            "TP Amount": item.TPAmount || "",
            "Freight Amount": item.FreightAmt || "",
            "Extra Amount": item.ExtraAmt || "",
            "Grand Total": item.GTotal || "",

            // 🧾 Product 1
            "Product Name 1": item.ProductName1 || "",
            "Rate 1": item.Rate1 || "",
            "Gross Weight 1": item.Grossweight1 || "",
            "Gross Weight Date 1": item.Grossweightdate1 || "",
            "Net Weight 1": item.Netweight1 || "",
            "Less Weight 1": item.Lessweight1 || "",
            "GT Weight 1": item.GTWeight1 || "",
            "Amount 1": item.Amount1 || "",

            // 🧾 Product 2
            "Product Name 2": item.ProductName2 || "",
            "Rate 2": item.Rate2 || "",
            "Gross Weight 2": item.Grossweight2 || "",
            "Gross Weight Date 2": item.Grossweightdate2 || "",
            "Net Weight 2": item.Netweight2 || "",
            "Less Weight 2": item.Lessweight2 || "",
            "GT Weight 2": item.GTWeight2 || "",
            "Amount 2": item.Amount2 || "",

            // 🧾 Product 3
            "Product Name 3": item.ProductName3 || "",
            "Rate 3": item.Rate3 || "",
            "Gross Weight 3": item.Grossweight3 || "",
            "Gross Weight Date 3": item.Grossweightdate3 || "",
            "Net Weight 3": item.Netweight3 || "",
            "Less Weight 3": item.Lessweight3 || "",
            "GT Weight 3": item.GTWeight3 || "",
            "Amount 3": item.Amount3 || "",

            "Created Date": item.CreatedDate ? getShowingDateText(item.CreatedDate) : "",
            "Last Modified": item.UpdatedDate ? getShowingDateText(item.UpdatedDate) : "",
            "Company ID": item.Companyid || "",
        }));
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(filteredDataNew);
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
    }

    return (
        <>
            <main className="dashboard-main ">
                <div className="main-content-area ">
                    <div className="main-content-wrapper mt-5 ">
                        <div className="relative lg:mt-8 mb-3">
                            <div className="py-3 employee-create-challan-card flex flex-wrap items-end gap-4 w-full" >
                                {/* Filter-Date/Time */}
                                <div className="flex items-center gap-2">
                                    <label className=" name-label whitespace-nowrap employee-master-metric-label">From :</label>
                                    <DatePicker selected={fromDate}
                                        onChange={(date) => setFromDate(date)}
                                        className="border rounded px-2 py-1 w-[60px] challan"
                                        placeholderText="From Date"
                                        dateFormat="MM-dd-yyyy"
                                    />

                                    <DatePicker selected={fromTime}
                                        onChange={(date) => setFromTime(date)}
                                        showTimeSelect
                                        placeholderText='00:00'
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        timeCaption="Time"
                                        dateFormat="HH:mm"
                                        className="border rounded px-2 py-1 w-[60px] challan"
                                    />

                                    <label className=" name-label whitespace-nowrap ml-4 employee-master-metric-label">To :</label>
                                    <DatePicker selected={toDate}
                                        onChange={(date) => setToDate(date)}
                                        className="border rounded px-2 py-1 w-[60px] challan"
                                        placeholderText='To Date'
                                        dateFormat="MM-dd-yyyy"
                                    />
                                    <DatePicker selected={toTime}
                                        onChange={(date) => setToTime(date)}
                                        showTimeSelect
                                        placeholderText='00:00'
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        timeCaption="Time"
                                        dateFormat="HH:mm"
                                        className="border rounded px-2 py-1 w-[60px] challan"
                                    />
                                </div>

                                {/* Select-Party */}
                                <div className="flex items-center gap-2 ml-6">
                                    <label className=" name-label whitespace-nowrap employee-master-metric-label ">Party :</label>
                                    <Select
                                        className="w-full"
                                        placeholder="Select Party"
                                        value={challanData.Party ? {
                                            value: challanData.Party,
                                            label: partyType.find((d) => d.PartyID === challanData.Party)?.Name || '',
                                        } : null}
                                        options={partyType.map((d) => ({
                                            value: d.PartyID,
                                            label: d.Name
                                        }))}
                                        onChange={(selectedOption) => {
                                            const value = selectedOption?.value ?? null;
                                            const label = selectedOption?.label ?? null;
                                            setSelectedParty(label);
                                            setChallanData((prev) => ({
                                                ...prev,
                                                Party: value ?? 0,
                                                Name: selectedOption?.label ?? ""
                                            }))
                                        }}
                                        isClearable
                                        isSearchable
                                        styles={selectCompactStyles}
                                    />
                                </div>

                                <div className="flex justify-between items-center w-full">
                                    {/* Search */}
                                    <div className="flex flex-row-reverse items-center gap-2" >
                                        <button onClick={handleSearch} className="text-gray-600 border rounded p-1 hover:bg-gray-100 transition flex items-center gap-2">
                                            <FiSearch size={16} /> Search
                                        </button>
                                        <div className="relative">
                                            <input type="text" placeholder="Search challans..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border rounded px-3 py-2 pr-8 w-[400px] transition-all focus:border-blue-500 focus:outline-none challan" autoFocus />
                                            <FiSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                        </div>
                                    </div>
                                    {/* Export-Button */}
                                    <div className="flex">
                                        <button type="button" onClick={exportToExcel} className="btn btn-sm btn-primary bg-[#3b82f6]  py-1 h-9 px-2 mt-2 flex items-center gap-1">
                                            <i className="fa fa-file-excel-o" aria-hidden="true"></i> Export to Excel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="employee-master-space-y-2">
                            {/* Employee List Table */}
                            <div className="employee-master-card">
                                <div className="employee-master-card-header mt-2 flex justify-end">
                                    <button className="employee-master-button employee-master-button-primary employee-master-button-sm"
                                        onClick={() => {
                                            setEditItemId(null);
                                            resetForm();
                                            handleOpenModal()
                                        }}>
                                        <PlusIcon /> Add Challan
                                    </button>
                                </div>
                                <div className="employee-master-card-content" style={{ padding: '0' }}>
                                    <DataTable
                                        columns={resizeableColumns}
                                        data={filteredData}
                                        pagination
                                        paginationPerPage={10}
                                        paginationRowsPerPageOptions={[5, 10, 20, 50]}
                                        highlightOnHover
                                        customStyles={customStyles}
                                        striped
                                        responsive
                                        noDataComponent={
                                            <div className="text-center py-8 text-gray-500">
                                                <p>
                                                    {
                                                        searchTerm || selectedParty || fromDate || toDate === null ? 'No challan records found' : ''
                                                    }
                                                </p>
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
                                                <li><a className="active" href="#">Challan{" "}</a></li>
                                                <li><a href="#">TP</a></li>
                                                <li> <a href="#">BILL</a></li>
                                            </ul>
                                        </div>
                                        {/* Button */}
                                        <div className="col-xl-2 mt-3 mt-xl-0 d-flex justify-content-end">
                                            <div className="flex gap-2 no-print">
                                                {/* Save Button */}
                                                <button
                                                    type="button"
                                                    className="flex items-center gap-2 px-2 py-1 rounded-md text-white"
                                                    style={{ backgroundColor: "#34C759" }}
                                                    onClick={handleSaveChallan}
                                                >
                                                    <FiSave size={18} />
                                                    {editItemId ? "Update" : "Save"}
                                                </button>

                                                {/* Print Button */}
                                                <button
                                                    type="button"
                                                    className="flex items-center gap-2 px-2 py-1 mr-3 rounded-md text-white"
                                                    style={{ backgroundColor: "#212529" }}
                                                    onClick={() => {
                                                        console.log("Print button clicked");
                                                        handlePrint();
                                                    }}
                                                >
                                                    <FiPrinter size={18} />
                                                    Print
                                                </button>
                                            </div>
                                        </div>

                                        <button onClick={handleCloseModal} className="text-gray-600 hover:text-red-500 p-2">
                                            <FiX size={20} />
                                        </button>
                                    </div>

                                    {/* Modal Body */}
                                    <div className="modal-body p-2">
                                        <div className='col-12 col-lg-12'>
                                            <div className="row align-items-center">
                                                <div className="col-xl-5">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <label className="name-label" htmlFor="product-desc" className="mb-0" style={{ minWidth: 70 }} >
                                                            Challan#
                                                        </label>
                                                        <div className="product-des-input d-flex gap-2 flex-grow-1">
                                                            <input className='challan' type="text" id="product-desc-1" placeholder='Challan-No' style={{ flex: 1 }} value={challanData.ChallanNo} onChange={(e) => setChallanData({ ...challanData, ChallanNo: e.target.value })} />
                                                            {/* <input className='challan' type="text" id="date-pick-bano" placeholder='Challan-Module' style={{ flex: 1 }} value={challanData.ChallanModule} onChange={(e) => setChallanData({ ...challanData, ChallanModule: e.target.value })} /> */}
                                                            <input className='challan' type="text" id="date-pick-bano" style={{ flex: 1 }} readOnly={true} value={challanData.financialYear} onChange={(e) => setChallanData({ ...challanData, financialYear: e.target.value })} />
                                                            <input className='challan' type="text" id="product-desc-bano-auto" defaultValue="Auto Generated" style={{ flex: 1 }} disabled />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-xl-3 mt-3 mt-xl-0">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <label htmlFor="generic-desc" className="mb-0 name-label" style={{ minWidth: 70 }}> Date/Time </label>
                                                        <div className="product-des-input flex-grow-1">
                                                            <DatePicker selected={moment(challanData.ChallanDate, "YYYY-MM-DD HH:mm:ss").toDate()}
                                                                onChange={(date: Date | null) => {
                                                                    if (date) {
                                                                        const formatted = moment(date).format("YYYY-MM-DD HH:mm:ss");
                                                                        setChallanData({ ...challanData, ChallanDate: formatted });
                                                                    }
                                                                }}
                                                                showTimeSelect
                                                                timeIntervals={15}
                                                                timeCaption="Time"
                                                                dateFormat="dd/MM/yyyy HH:mm"
                                                                className="border rounded px-2 py-1 w-full challan"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-2 mt-3 mt-xl-0">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <label className="d-flex align-items-center" style={{ gap: 6 }}>
                                                            <input className='name-label' type="radio" name="paytype" value="Cash" checked={challanData.paytype === "Cash"} onChange={(e) => setChallanData({ ...challanData, paytype: e.target.value as 'Cash' | 'Credit' })} />
                                                            Cash
                                                        </label>
                                                        <label className="d-flex align-items-center" style={{ gap: 6, marginLeft: 20 }}>
                                                            <input className='name-label' type="radio" name="paytype" value="Credit" checked={challanData.paytype === "Credit"} onChange={(e) => setChallanData({ ...challanData, paytype: e.target.value as 'Cash' | 'Credit' })} />{" "}
                                                            Credit
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="col-xxl-9 col-12 mt-2">
                                                    {/* First-Section */}
                                                    <div className="row">
                                                        {/* First-Column */}
                                                        <div className="col-xl-4 col-sm-6">
                                                            <div className="form-block ">
                                                                <div className="row align-items-center" style={{ rowGap: 6 }}>
                                                                    {/* Party */}
                                                                    <div className="single-info-block col-xl-2">
                                                                        <label className="name-label" htmlFor="SchemeCode">Party</label>
                                                                    </div>
                                                                    <div className="col-xl-10">
                                                                        <Select className="w-full"
                                                                            placeholder="Select Party"
                                                                            value={challanData.PartyID ? {
                                                                                value: challanData.PartyID,
                                                                                label: partyType.find((d) => d.PartyID === challanData.PartyID)?.Name || '',
                                                                            } : null}
                                                                            options={partyType.map((d) => ({
                                                                                value: d.PartyID,
                                                                                label: d.Name
                                                                            }))}
                                                                            onChange={(selectedOption) =>
                                                                                setChallanData((prev) => ({
                                                                                    ...prev,
                                                                                    PartyID: Number(selectedOption?.value ?? 0),
                                                                                }))
                                                                            }
                                                                            isClearable
                                                                            isSearchable
                                                                            styles={selectCompactStyles}
                                                                        />
                                                                    </div>
                                                                    {/* Address */}
                                                                    <div className="single-info-block col-xl-2">
                                                                        <label className="name-label" htmlFor="prType">
                                                                            Address <span className="text-danger">*</span>
                                                                        </label>
                                                                    </div>
                                                                    <div className="col-xl-10 col-12">
                                                                        <textarea
                                                                            name=""
                                                                            id="prType"
                                                                            className="py-0 challan"
                                                                            style={{ width: "100%" }}
                                                                            placeholder='Address'
                                                                            value={challanData.address}
                                                                            onChange={(e) => setChallanData({ ...challanData, address: e.target.value })}
                                                                        />
                                                                    </div>

                                                                    {/* State */}
                                                                    <div className="single-info-block col-xl-2">
                                                                        <label className="name-label" htmlFor="ritcNo">State<span className="text-danger">*</span></label>
                                                                    </div>
                                                                    <div className="col-xl-10 col-12">
                                                                        <Select
                                                                            value={challanData.State ?
                                                                                {
                                                                                    value: challanData.State,
                                                                                    label: State.find((st) => st.ID === challanData.StateID)?.Description || 0,
                                                                                } : null
                                                                            }
                                                                            className="w-full"
                                                                            placeholder="Select State"
                                                                            options={State.map((st) => ({
                                                                                value: st.ID,
                                                                                label: st.Description,
                                                                            }))}
                                                                            onChange={(selectedOption: SingleValue<{ value: number; label: string }>) => {
                                                                                const stateID = selectedOption?.value ?? 0;
                                                                                const stateLabel = selectedOption?.label ?? 0;
                                                                                setChallanData((prev) => ({
                                                                                    ...prev,
                                                                                    State: stateLabel,
                                                                                    StateID: stateID,
                                                                                    district: 0,
                                                                                }));
                                                                                if (stateID) fetchDistrict(stateID);
                                                                            }}
                                                                            isClearable
                                                                            isSearchable
                                                                            styles={selectCompactStyles}
                                                                        />
                                                                    </div>
                                                                    {/* District */}
                                                                    <div className="single-info-block col-xl-2">
                                                                        <label className="name-label" htmlFor="prUnit">District<span className="text-danger">*</span></label>
                                                                    </div>
                                                                    <div className="col-xl-10 col-12">
                                                                        <Select
                                                                            className="w-full"
                                                                            placeholder="Select District"
                                                                            value={challanData.district
                                                                                ? {
                                                                                    value: challanData.district,
                                                                                    label: district.find((d) => d.ID === challanData.district)?.Description || '',
                                                                                } : null
                                                                            }
                                                                            options={district.map((d) => ({
                                                                                value: d.ID,
                                                                                label: d.Description,
                                                                            }))}
                                                                            onChange={(selectedOption: SingleValue<{ value: number; label: string }>) =>
                                                                                setChallanData((prev) => ({
                                                                                    ...prev,
                                                                                    district: Number(selectedOption?.value ?? 0),
                                                                                }))
                                                                            }
                                                                            isClearable
                                                                            isSearchable
                                                                            styles={selectCompactStyles}
                                                                        />
                                                                    </div>
                                                                    {/* PIN */}
                                                                    <div className="single-info-block col-xl-2">
                                                                        <label className="name-label" htmlFor="prUnitPrice">
                                                                            PIN <span className="text-danger">*</span>
                                                                        </label>
                                                                    </div>
                                                                    <div className="col-xl-10 col-12">
                                                                        <Select id="prAmountUSD" placeholder="Enter PIN" value={challanData.PinID} onChange={(selectedOption: SingleValue<{ value: number; label: string }>) =>
                                                                            setChallanData((prev) => ({
                                                                                ...prev,
                                                                                district: Number(selectedOption?.value ?? 0),
                                                                            }))
                                                                        }
                                                                            styles={selectCompactStyles}
                                                                        />
                                                                    </div>
                                                                    {/* Contact */}
                                                                    <div className="single-info-block col-xl-2">
                                                                        <label className="name-label" htmlFor="prAmountUSD">Contact</label>
                                                                    </div>
                                                                    <div className="col-xl-10 col-12">
                                                                        <input className="challan" type="text" id="prAmountUSD" placeholder='Contact No' value={challanData.OwnerMobile} onChange={(e) => setChallanData({ ...challanData, OwnerMobile: e.target.value })} />
                                                                    </div>
                                                                    {/* EmailID */}
                                                                    <div className="single-info-block col-xl-2">
                                                                        <label className="name-label" htmlFor="prAmountINR">EmailID</label>
                                                                    </div>
                                                                    <div className="col-xl-10 col-12">
                                                                        <input className="challan" type="email" id="prAmountINR" placeholder="Email ID" value={challanData.Email} onChange={(e) => setChallanData({ ...challanData, Email: e.target.value })} />
                                                                    </div>
                                                                    {/* ROW */}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Second-Column */}
                                                        <div className="col-xl-4 col-sm-6 ">
                                                            <div className="form-block ">
                                                                <div className="row align-items-center" style={{ rowGap: 6 }}>
                                                                    {/* Adv-Amount */}
                                                                    <div className="single-info-block col-xl-3">
                                                                        <label className="name-label" htmlFor="endUse">Adv. Amount <span className="text-danger">*</span></label>
                                                                    </div>
                                                                    <div className="col-xl-9 col-12">
                                                                        <input className="challan" type="text" id="endUse" defaultValue={0.0} style={{ width: "100%" }} value={challanData.AdvAmt} onChange={(e) => setChallanData({ ...challanData, AdvAmt: Number(e.target.value) })} />
                                                                    </div>
                                                                    {/* Vehicle-type */}
                                                                    <div className="single-info-block col-xl-3">
                                                                        <label className="name-label" htmlFor="prCTH">Vehicle Type</label>
                                                                    </div>
                                                                    <div className="col-xl-9 col-12">
                                                                        <Select
                                                                            className="w-full"
                                                                            placeholder="Select Vehicle"
                                                                            value={challanData.vehicleTypeid ?
                                                                                {
                                                                                    value: challanData.vehicleTypeid,
                                                                                    label: vehicleType.find((d) => d.VehicleTypeID === challanData.vehicleTypeid)?.Description || ''
                                                                                } : null
                                                                            }
                                                                            options={vehicleType.map((d) => ({
                                                                                value: d.VehicleTypeID,
                                                                                label: d.Description
                                                                            }))}
                                                                            onChange={(selectedOptions: SingleValue<{ value: number, label: string }>) =>
                                                                                setChallanData((prev) => ({
                                                                                    ...prev,
                                                                                    vehicleTypeid: Number(selectedOptions?.value ?? 0),
                                                                                    // vehicleTypeid: Number(selectedOptions?.value ?? 0)
                                                                                }))
                                                                            }
                                                                            isClearable
                                                                            isSearchable
                                                                            styles={selectCompactStyles}
                                                                        />
                                                                    </div>
                                                                    {/* Vehicle-No */}
                                                                    <div className="single-info-block col-xl-3">
                                                                        <label className="name-label" htmlFor="prCET">Vehicle No.</label>
                                                                    </div>
                                                                    <div className="col-xl-9 col-12">
                                                                        <Select
                                                                            placeholder="Vehicle No"
                                                                            value={
                                                                                challanData.VehicleNo
                                                                                    ? { value: challanData.VehicleNo, label: challanData.VehicleNo }
                                                                                    : null
                                                                            }
                                                                            onChange={(selectedOption) =>
                                                                                setChallanData({
                                                                                    ...challanData,
                                                                                    VehicleNo: selectedOption?.value || "",
                                                                                })
                                                                            }
                                                                            options={[]}
                                                                            isClearable
                                                                            isSearchable
                                                                            styles={selectCompactStyles}
                                                                        />
                                                                    </div>
                                                                    {/* Driver-Name */}
                                                                    <div className="single-info-block col-xl-3">
                                                                        <label className="name-label" htmlFor="prCode">Driver Name</label>
                                                                    </div>
                                                                    <div className="col-xl-9 col-12">
                                                                        <input className="challan" type="text" id="prCode" placeholder="Driver Name" style={{ width: "100%" }} value={challanData.DriverName} onChange={(e) => setChallanData({ ...challanData, DriverName: e.target.value })} />
                                                                    </div>
                                                                    {/* Driver-No */}
                                                                    <div className="single-info-block col-xl-3">
                                                                        <label className="name-label" htmlFor="driverNo">Driver Number</label>
                                                                    </div>
                                                                    <div className="col-xl-9 col-12">
                                                                        <input className="challan" type="text" id="driverNo" style={{ width: "100%" }} value={challanData.DriverMobileNo} onChange={(e) => setChallanData({ ...challanData, DriverMobileNo: Number(e.target.value) })} />
                                                                    </div>
                                                                    {/* Vehicle-Remark */}
                                                                    <div className="single-info-block col-xl-3">
                                                                        <label className="name-label" htmlFor="remark">Vehicle Remarks</label>
                                                                    </div>
                                                                    <div className="col-xl-9 col-12">
                                                                        <textarea name="" id="remark" className="py-0 challan" style={{ width: "100%", height: "60px" }} value={challanData.VehicleRemarks} onChange={(e) => setChallanData({ ...challanData, VehicleRemarks: e.target.value })} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Third-Column */}
                                                        <div className="col-xl-4 mt-3 mt-xl-0">
                                                            <div className="form-block bigger-form-block">
                                                                <div className="row align-items-center" style={{ rowGap: 6 }}>
                                                                    <div className="single-info-block col-xl-2"></div>
                                                                    <div className="col-xl-10">
                                                                        <div className="form-check d-flex align-items-center gap-2 pl-0">
                                                                            <input
                                                                                className="form-check-input_gst-bill name-label"
                                                                                type="checkbox"
                                                                                id="gstBill"
                                                                            />
                                                                            <label className="form-check-label fw-bold name-label" htmlFor="gstBill">
                                                                                GST Bill
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    {/* GST-No */}
                                                                    <div className="single-info-block col-xl-2">
                                                                        <label className="name-label" htmlFor="gst">GST No</label>
                                                                    </div>
                                                                    <div className="col-xl-10">
                                                                        <input className="challan" type="text" id="gst" style={{ width: "100%" }} placeholder='GST No' value={challanData.GstNo} onChange={(e) => setChallanData({ ...challanData, GstNo: e.target.value })} />
                                                                    </div>
                                                                    {/* GST Party-Drop */}
                                                                    <div className="single-info-block col-xl-2">
                                                                        <label className="name-label" htmlFor="SchemeCode">Party</label>
                                                                    </div>
                                                                    <div className="col-xl-10">
                                                                        <Select className="w-full "
                                                                            placeholder="Select Party"
                                                                            value={challanData.Name ? {
                                                                                value: challanData.Name,
                                                                                label: gstPartyType.find((d) => d.Name === challanData.Name)?.Name || '',
                                                                            } : null}
                                                                            options={gstPartyType.map((d) => ({
                                                                                value: d.Name,
                                                                                label: d.Name
                                                                            }))}
                                                                            onChange={(selectedOption) =>
                                                                                setChallanData((prev) => ({
                                                                                    ...prev,
                                                                                    Name: selectedOption?.label ?? '',
                                                                                }))
                                                                            }
                                                                            isClearable
                                                                            isSearchable
                                                                            styles={selectCompactStyles}
                                                                        />
                                                                    </div>
                                                                    {/* GST Address */}
                                                                    <div className="single-info-block col-xl-2">
                                                                        <label className="name-label" htmlFor="address">Address</label>
                                                                    </div>
                                                                    <div className="col-xl-10">
                                                                        <textarea className="challan" name="" id="address" placeholder='Address' value={challanData.gstAddress} onChange={(e) => setChallanData({ ...challanData, gstAddress: e.target.value })} />
                                                                    </div>
                                                                    {/* GST State */}
                                                                    <div className="single-info-block col-xl-2">
                                                                        <label className="name-label" htmlFor="ritcNo">State<span className="text-danger">*</span></label>
                                                                    </div>
                                                                    <div className="col-xl-10">
                                                                        <Select
                                                                            value={challanData.GstState ?
                                                                                {
                                                                                    value: challanData.GstState,
                                                                                    label: gstState.find((st) => st.ID === challanData.GstState)?.Description || "",
                                                                                } : null
                                                                            }
                                                                            className="w-full"
                                                                            placeholder="Select State"
                                                                            options={gstState.map((st) => ({
                                                                                value: st.ID,
                                                                                label: st.Description,
                                                                            }))}
                                                                            onChange={(selectedOption) => {
                                                                                const stateID = selectedOption?.value ?? 0;
                                                                                // console.log(stateID);
                                                                                setChallanData((prev) => ({
                                                                                    ...prev,
                                                                                    GstState: stateID,
                                                                                    district: 0,
                                                                                }));
                                                                                if (stateID) fetchDistrict(stateID);
                                                                            }}
                                                                            isClearable
                                                                            isSearchable
                                                                            styles={selectCompactStyles}
                                                                        />
                                                                    </div>
                                                                    {/* GST District */}
                                                                    <div className="single-info-block col-xl-2">
                                                                        <label className="name-label" htmlFor="prUnit">District<span className="text-danger">*</span></label>
                                                                    </div>
                                                                    <div className="col-xl-10">
                                                                        <Select
                                                                            className="w-full"
                                                                            placeholder="Select District"
                                                                            value={challanData.gstDistrict
                                                                                ? {
                                                                                    value: challanData.gstDistrict,
                                                                                    label: gstDistrict.find((d) => d.ID === challanData.gstDistrict)?.Discription || '',
                                                                                } : null
                                                                            }
                                                                            options={gstDistrict.map((d) => ({
                                                                                value: d.ID,
                                                                                label: d.Discription,
                                                                            }))}
                                                                            onChange={(selectedOption: SingleValue<{ value: number; label: string }>) =>
                                                                                setChallanData((prev) => ({
                                                                                    ...prev,
                                                                                    gstDistrict: Number(selectedOption?.value ?? 0),
                                                                                }))
                                                                            }
                                                                            isClearable
                                                                            isSearchable
                                                                            styles={selectCompactStyles}
                                                                        />
                                                                    </div>
                                                                    {/* GST PIN */}
                                                                    <div className="single-info-block col-xl-2">
                                                                        <label className="name-label" htmlFor="prUnitPrice">PIN <span className="text-danger">*</span></label>
                                                                    </div>
                                                                    <div className="col-xl-10">
                                                                        <Select
                                                                            placeholder="Select.."
                                                                            styles={selectCompactStyles}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Second-Second */}
                                                    <div className="col-12 mt-2">
                                                        {/* First-Row */}
                                                        <div className="product-details-table mb-2">
                                                            {(challanData.productDetails.length === 0 ? [blankProduct] : challanData.productDetails).map((product, index) => (
                                                                <div key={index} className="product-des-box product-details-form ">
                                                                    <div className="product-form-container ">
                                                                        <div className="row g-3 align-items-center">
                                                                            {/* Product Name */}
                                                                            <div className="col-md-2 mt-0">
                                                                                <label className="MAINTABLE_LABEL name-label">Product Name</label>
                                                                                <Select 
                                                                                   placeholder="Select Product"
                                                                                   value={ challanData.ProductId1 ? 
                                                                                    {
                                                                                        value: challanData.ProductId1,
                                                                                        label: productName.find((pn) => pn.ProductID === challanData.ProductId1)?.ProductName || ''
                                                                                    } : null
                                                                                   } 
                                                                                   options={productName.map((pn) => ({
                                                                                    value: pn.ProductID,
                                                                                    label: pn.ProductName
                                                                                   }))}
                                                                                   onChange={(selectedOption: SingleValue<{ value: number; label: string }>) =>
                                                                                     setChallanData((prev) => ({
                                                                                        ...prev,
                                                                                        district: Number(selectedOption?.value ?? 0),
                                                                                     }))
                                                                                   }
                                                                                   styles={selectCompactStyles}
                                                                                />
                                                                            </div>
                                                                            {/* Rate */}
                                                                            <div className="col mt-0" style={{ minWidth: 130 }}>
                                                                                <label className="MAINTABLE_LABEL name-label">Rate</label>
                                                                                <input className="challan" type="number" value={product.rate} onChange={(e) => handleProductChange(index, 'rate', Number(e.target.value))} />
                                                                            </div>
                                                                            {/* Gross Weight */}
                                                                            <div className="col mt-0" style={{ minWidth: 130 }}>
                                                                                <label className="MAINTABLE_LABEL name-label">Gross Weight</label>
                                                                                <input className="challan" type="number" value={product.grossWeight} onChange={(e) => handleProductChange(index, 'grossWeight', Number(e.target.value))} />
                                                                            </div>
                                                                            {/* Date/Time */}
                                                                            <div className="col-md-2 mt-0">
                                                                                <label className="MAINTABLE_LABEL name-label">Date/Time</label>
                                                                                <DatePicker selected={moment(product.ChallanDate, 'YYYY-MM-DD HH:mm:ss').toDate()} onChange={(date: Date | null) => {
                                                                                    if (date) {
                                                                                        const formatted = moment(date).format('YYYY-MM-DD HH:mm:ss'); handleProductChange(index, 'ChallanDate', formatted);
                                                                                    }
                                                                                }}
                                                                                    showTimeSelect
                                                                                    timeIntervals={15}
                                                                                    timeCaption="Time"
                                                                                    dateFormat="dd/MM/yyyy HH:mm"
                                                                                    className="border rounded px-2 py-1 w-full challan"
                                                                                />
                                                                            </div>
                                                                            {/* Net Weight */}
                                                                            <div className="col mt-0" style={{ minWidth: 130 }}>
                                                                                <label className="MAINTABLE_LABEL name-label">Net Weight</label>
                                                                                <input className="challan" type="number" value={product.netWeight} onChange={(e) => handleProductChange(index, 'netWeight', Number(e.target.value))} />
                                                                            </div>
                                                                            {/* Less Weight */}
                                                                            <div className="col mt-0" style={{ minWidth: 150 }}>
                                                                                <label className="MAINTABLE_LABEL name-label">Less Weight</label>
                                                                                <input className="challan" type="number" value={product.lessWeight} onChange={(e) => handleProductChange(index, 'lessWeight', Number(e.target.value))} />
                                                                            </div>
                                                                            {/* GT Weight */}
                                                                            <div className="col mt-0" style={{ minWidth: 130 }}>
                                                                                <label className="MAINTABLE_LABEL name-label">GT Weight</label>
                                                                                <input className="challan" type="number" value={product.gtWeight} readOnly />
                                                                            </div>
                                                                            {/* Amount */}
                                                                            <div className="col mt-0" style={{ minWidth: 130 }}>
                                                                                <label className="MAINTABLE_LABEL name-label">Amount</label>
                                                                                <input className="challan" type="number" value={product.amount} readOnly />
                                                                            </div>


                                                                            {/* Add Button (only on last row, max 3 rows) */}
                                                                            {index === challanData.productDetails.length - 1 && challanData.productDetails.length < 3 && (
                                                                                <div className="col">
                                                                                    <button type="button" className="btn btn-warning p-1 py-0" onClick={handleAddProductRow} >
                                                                                        <svg className="text-white" style={{ width: 20, height: 25 }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                                                        </svg>
                                                                                    </button>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        {/* Second-Row */}
                                                        <div className="product-details-table mb-2">
                                                            <div className="product-des-box product-details-form ">
                                                                <div className="product-form-container ">
                                                                    <div className="row g-3 ">
                                                                        {/* Tare-Weight */}
                                                                        <div className="col-2 mt-0" style={{ minWidth: 130 }}>
                                                                            <label className="MAINTABLE_LABEL name-label">Tare Weight</label>
                                                                            <input className="challan" type="number" id="SchemDes" value={challanData.TareWeight} onChange={(e) => setChallanData({ ...challanData, TareWeight: Number(e.target.value) })} />
                                                                        </div>

                                                                        {/* Date/Time */}
                                                                        <div className="col-md-2 mt-0">
                                                                            <label className="MAINTABLE_LABEL name-label">Date/Time</label>
                                                                            <DatePicker
                                                                                showTimeSelect
                                                                                timeIntervals={15}
                                                                                timeCaption="Time"
                                                                                dateFormat="dd/MM/yyyy HH:mm"
                                                                                className="border rounded px-2 py-1 w-full challan"
                                                                            />
                                                                        </div>
                                                                        {/* Net-Weight */}
                                                                        <div className="col-1 mt-0" style={{ minWidth: 130 }}>
                                                                            <label className="MAINTABLE_LABEL name-label">Net Weight</label>
                                                                            <input className="challan" type="number" id="SchemDes" value={challanData.Netweight} onChange={(e) => setChallanData({ ...challanData, Netweight: Number(e.target.value) })} />
                                                                        </div>
                                                                        {/* Less-Weight */}
                                                                        <div className="col-1 mt-0" style={{ minWidth: 130 }}>
                                                                            <label className="MAINTABLE_LABEL name-label">Less Weight</label>
                                                                            <input className="challan" type="number" id="SchemDes" value={challanData.Lessweight} onChange={(e) => setChallanData({ ...challanData, Lessweight: Number(e.target.value) })} />
                                                                        </div>
                                                                        {/* GT-Weight */}
                                                                        <div className="col-1 mt-0" style={{ minWidth: 130 }}>
                                                                            <label className="MAINTABLE_LABEL name-label">Total GT Weight</label>
                                                                            <input className="challan" type="number" id="SchemDes" value={challanData.GTWeight} onChange={(e) => setChallanData({ ...challanData, GTWeight: Number(e.target.value) })} />
                                                                        </div>
                                                                        {/* Vehicle-Commision */}
                                                                        <div className="col-1 mt-0" style={{ minWidth: 150 }}>
                                                                            <label className="MAINTABLE_LABEL name-label">Vehicle Commision</label>
                                                                            <input className="challan" type="number" id="SchemDes" value={challanData.VehicleCommision} onChange={(e) => setChallanData({ ...challanData, VehicleCommision: Number(e.target.value) })} />
                                                                        </div>
                                                                        {/* Date-Time */}
                                                                        {/* <div className="col-md-2 mt-0">
                                                                            <label className="MAINTABLE_LABEL name-label">Financial Year</label>
                                                                            <input type="text" id="SchemDes" readOnly={true} value={challanData.financialYear} onChange={(e) => setChallanData({ ...challanData, financialYear: e.target.value })} />
                                                                        </div> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Third-Row */}
                                                        <div className="product-details-table mb-2">
                                                            <div className="product-des-box product-details-form">
                                                                <div className="product-form-container ">
                                                                    <div className="row g-3 ">
                                                                        {/* Amount */}
                                                                        <div className="col-md-2 mt-0" style={{ minWidth: 130 }}>
                                                                            <label className="MAINTABLE_LABEL name-label">Amount</label>
                                                                            <input className="challan" type="number" id="SchemDes" value={challanData.Amount} onChange={(e) => setChallanData({ ...challanData, Amount: Number(e.target.value) })} />
                                                                        </div>
                                                                        {/* Loading-Amount */}
                                                                        <div className="col-md-1 mt-0" style={{ minWidth: 130 }}>
                                                                            <label className="MAINTABLE_LABEL name-label">Loading Amount</label>
                                                                            <Select 
                                                                                placeholder="Select..."
                                                                                value={challanData.LoadingAmt ?
                                                                                    {
                                                                                        value: challanData.LoadingAmt,
                                                                                        label: loadingAmt.find((lm) => lm.LoadingchargeID === challanData.LoadingAmt) ?.Description || ''
                                                                                    } : null
                                                                                } 
                                                                                options={ loadingAmt.map((lm) => ({
                                                                                    value: lm.LoadingchargeID,
                                                                                    label: lm.Description
                                                                                }))}
                                                                                menuPlacement='top' 
                                                                                onChange={(selectedOption) => 
                                                                                    setChallanData((prev) => ({
                                                                                        ...prev,
                                                                                        LoadingAmt: Number(selectedOption?.value ?? 0)
                                                                                    }))
                                                                                }
                                                                                styles={selectCompactStyles}
                                                                            />
                                                                        </div>
                                                                        {/* Commission-Amount */}
                                                                        <div className="col-md-1 mt-0" style={{ minWidth: 130 }}>
                                                                            <label className="MAINTABLE_LABEL name-label">Commission Amt</label>
                                                                            <input className="challan" type="number" id="SchemDes" value={challanData.CommisionAmt} onChange={(e) => setChallanData({ ...challanData, CommisionAmt: Number(e.target.value) })} />
                                                                        </div>
                                                                        {/* GT-Amount */}
                                                                        <div className="col-md-1 col-sm-6 mt-0" style={{ minWidth: 130 }}>
                                                                            <label className="MAINTABLE_LABEL name-label">GT Amount</label>
                                                                            <input className="challan" type="number" id="SchemDes" value={challanData.GSTAmt} onChange={(e) => setChallanData({ ...challanData, GSTAmt: Number(e.target.value) })} />
                                                                        </div>
                                                                        {/* Royality-Amount */}
                                                                        <div className="col-md-1 mt-0" style={{ minWidth: 150 }}>
                                                                            <label className="MAINTABLE_LABEL name-label">Royalty Amount</label>
                                                                            <input className="challan" type="number" id="SchemDes" value={challanData.RoyaltyAmt} onChange={(e) => setChallanData({ ...challanData, RoyaltyAmt: Number(e.target.value) })} />
                                                                        </div>
                                                                        {/* TP-Amount */}
                                                                        <div className="col-md-2 mt-0">
                                                                            <label className="MAINTABLE_LABEL name-label">TP Amount</label>
                                                                            <Select
                                                                                placeholder="Select TPAmount"
                                                                                id="SchemDes"
                                                                                value={
                                                                                    challanData.TPAmount ? 
                                                                                    { 
                                                                                        value: challanData.TPAmount,
                                                                                        label: tpAmount.find((tp) => tp.TpAmountID === challanData.TPAmount)?.Description || ''
                                                                                    } : null
                                                                                }
                                                                                menuPlacement="top"
                                                                                options={tpAmount.map((tp) => ({
                                                                                    value: tp.TpAmountID,
                                                                                    label: tp.Description
                                                                                }))}
                                                                                onChange={(selectedOption) =>
                                                                                    setChallanData({
                                                                                        ...challanData,
                                                                                        TPAmount: Number(selectedOption?.value || 0),
                                                                                    })
                                                                                }
                                                                                styles={selectCompactStyles}
                                                                            />
                                                                        </div>
                                                                        {/* Freight-Amount */}
                                                                        <div className="col-md-1 mt-0" style={{ minWidth: 130 }}>
                                                                            <label className="MAINTABLE_LABEL name-label">Freight Amount</label>
                                                                            <input className="challan" type="number" id="SchemDes" value={challanData.FreightAmt} onChange={(e) => setChallanData({ ...challanData, FreightAmt: Number(e.target.value) })} />
                                                                        </div>
                                                                        {/* Grand-Total */}
                                                                        <div className="col-md-1 mt-0" style={{ minWidth: 130 }}>
                                                                            <label className="MAINTABLE_LABEL name-label">Grand Total</label>
                                                                            <input className="challan" type="number" id="SchemDes" value={challanData.GTotal} onChange={(e) => setChallanData({ ...challanData, GTotal: Number(e.target.value) })} />
                                                                        </div>

                                                                        {/* <div className="col-md-3 mt-0">
                                                                            <label className="MAINTABLE_LABEL">Company Id</label>
                                                                            <Select
                                                                                value={dropdown}
                                                                                onChange={(selectedOptions: any) => setDropdown(selectedOptions || [])}
                                                                                options={options}
                                                                                isMulti
                                                                                isClearable
                                                                                closeMenuOnSelect={false}
                                                                                hideSelectedOptions={true}
                                                                                placeholder="Select Company"
                                                                                className="basic-multi-select"
                                                                                styles={{
                                                                                    ...multiValue,
                                                                                    valueContainer: (provided) => ({
                                                                                        ...provided,
                                                                                        maxHeight: "60px",
                                                                                        overflowY: "auto",
                                                                                        flexWrap: "wrap",
                                                                                    }),
                                                                                }}
                                                                            />
                                                                        </div> */}
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
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* ✅ Jo print karna hai – yaha rakho */}
            <div className="print-area">
                <div ref={printRef}>
                    <ChallanSlip
                        challanNo={challanData.ChallanNo || "N/A"}
                        dateTime={
                            challanData.ChallanDate
                                ? moment(challanData.ChallanDate).format("DD/MM/YYYY HH:mm")
                                : moment().format("DD/MM/YYYY HH:mm")
                        }
                        vehicleNo={challanData.VehicleNo || "N/A"}
                        material={challanData.productDetails?.[0]?.name || "N/A"}
                        consignee={challanData.Name || "N/A"}
                        tareWeight={challanData.TareWeight || 0}
                        amount={`${challanData.paytype || "Cash"} (${challanData.Amount || "0"
                            })`}
                    />
                </div>
            </div>


            <ConfirmModal show={showModal}
                handleClose={() => setShowModal(false)}
                handleConfirm={() => {
                    if (selectedId !== null) {
                        deleteMaterialName(selectedId);
                    }
                    setShowModal(false);
                }} />
        </>
    );
}

export default CreateChallan;