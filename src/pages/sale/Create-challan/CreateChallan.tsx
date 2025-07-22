import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateChallan.css';

// Icons
const ArrowLeft = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const Calendar = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const User = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const Truck = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
);

const Plus = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
);

const Trash2 = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 22H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

// Types
interface Customer {
    id: string;
    name: string;
    phone: string;
    address: string;
}

interface Vehicle {
    id: string;
    number: string;
    type: string;
}

interface ProductItem {
    id: string;
    productName: string;
    rate: number;
    quantity: number;
    billRate: number;
    amount: number;
}

interface ChallanFormData {
    customerId: string;
    challanDate: string;
    challanNumber: string;
    billingType: 'per_ton' | 'per_vehicle' | 'lumpsum';
    vehicleNumber: string;
    driverName: string;
    transporterName: string;
    loadingPoint: string;
    destination: string;
    grossWeight: number;
    tareWeight: number;
    netWeight: number;
    products: ProductItem[];
    remarks: string;
}

// Sample data
const CUSTOMERS: Customer[] = [
    { id: '1', name: 'ABC Construction', phone: '9876543210', address: '123 Main St, City' },
    { id: '2', name: 'XYZ Builders', phone: '9876543211', address: '456 Park Ave, Town' },
    { id: '3', name: 'PQR Infra', phone: '9876543212', address: '789 Market Rd, Village' },
];

const VEHICLES: Vehicle[] = [
    { id: 'v1', number: 'RJ14 AB 1234', type: 'Truck' },
    { id: 'v2', number: 'RJ14 CD 5678', type: 'Truck' },
    { id: 'v3', number: 'RJ14 EF 9012', type: 'Truck' },
];

const PRODUCTS = [
    { id: 'p1', name: 'Sand', rate: 1200 },
    { id: 'p2', name: 'Grit', rate: 1000 },
    { id: 'p3', name: 'Stone Dust', rate: 800 },
    { id: 'p4', name: 'Boulder', rate: 2000 },
    { id: 'p5', name: 'Aggregate 10mm', rate: 1500 },
    { id: 'p6', name: 'Aggregate 20mm', rate: 1400 },
];

const LOADING_POINTS = [
    'Crusher Plant 1',
    'Crusher Plant 2',
    'Stockyard',
    'Quarry Site 1',
    'Quarry Site 2',
];

const DESTINATIONS = [
    'ABC Construction Site',
    'XYZ Builders Project',
    'PQR Infra Site',
    'Customer Site',
    'Other',
];

const CreateChallan: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<ChallanFormData>({
        customerId: '',
        challanDate: new Date().toISOString().split('T')[0],
        challanNumber: `CH-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`,
        billingType: 'per_ton',
        vehicleNumber: '',
        driverName: '',
        transporterName: '',
        loadingPoint: LOADING_POINTS[0],
        destination: DESTINATIONS[0],
        grossWeight: 0,
        tareWeight: 0,
        netWeight: 0,
        products: [{
            id: '1',
            productName: '',
            rate: 0,
            quantity: 0,
            billRate: 0,
            amount: 0
        }],
        remarks: ''
    });

    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'grossWeight' || name === 'tareWeight' || name === 'netWeight'
                ? parseFloat(value) || 0
                : value
        }));

        // Auto-calculate net weight when gross or tare weight changes
        if (name === 'grossWeight' || name === 'tareWeight') {
            const gross = name === 'grossWeight' ? (parseFloat(value) || 0) : formData.grossWeight;
            const tare = name === 'tareWeight' ? (parseFloat(value) || 0) : formData.tareWeight;
            const net = Math.max(0, gross - tare);

            setFormData(prev => ({
                ...prev,
                netWeight: net,
                products: prev.products.map(p => ({
                    ...p,
                    quantity: net,
                    amount: net * p.rate
                }))
            }));
        }
    };

    // Handle customer selection
    const handleCustomerSelect = (customer: Customer) => {
        setSelectedCustomer(customer);
        setFormData(prev => ({
            ...prev,
            customerId: customer.id
        }));
    };

    // Handle vehicle selection
    const handleVehicleSelect = (vehicle: Vehicle) => {
        setSelectedVehicle(vehicle);
        setFormData(prev => ({
            ...prev,
            vehicleNumber: vehicle.number
        }));
    };

    // Handle product changes
    const handleProductChange = (index: number, field: string, value: string | number) => {
        setFormData(prev => {
            const updatedProducts = [...prev.products];
            const product = { ...updatedProducts[index] };

            // @ts-ignore - Dynamic property access
            product[field] = typeof value === 'string' && !isNaN(Number(value)) ? parseFloat(value) : value;

            // Calculate amount if rate or quantity changes
            if (field === 'rate' || field === 'quantity') {
                product.amount = (product.rate || 0) * (product.quantity || 0);
            }

            updatedProducts[index] = product;

            return {
                ...prev,
                products: updatedProducts
            };
        });
    };

    // Add new product row
    const addProductRow = () => {
        setFormData(prev => ({
            ...prev,
            products: [
                ...prev.products,
                {
                    id: Date.now().toString(),
                    productName: '',
                    rate: 0,
                    quantity: prev.netWeight || 0,
                    billRate: 0,
                    amount: 0
                }
            ]
        }));
    };

    // Remove product row
    const removeProductRow = (index: number) => {
        if (formData.products.length > 1) {
            setFormData(prev => ({
                ...prev,
                products: prev.products.filter((_, i) => i !== index)
            }));
        }
    };

    // Calculate totals
    const calculateTotals = () => {
        return formData.products.reduce((acc, product) => ({
            quantity: acc.quantity + (product.quantity || 0),
            amount: acc.amount + (product.amount || 0)
        }), { quantity: 0, amount: 0 });
    };

    const { quantity: totalQuantity, amount: totalAmount } = calculateTotals();

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Form submitted:', formData);
            setIsSubmitting(false);
            // Show success message or redirect
            alert('Challan created successfully!');
            // navigate('/challans');
        }, 1000);
    };

    // Handle reset form
    const handleReset = () => {
        if (window.confirm('Are you sure you want to reset the form? All entered data will be lost.')) {
            setFormData({
                customerId: '',
                challanDate: new Date().toISOString().split('T')[0],
                challanNumber: `CH-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`,
                billingType: 'per_ton',
                vehicleNumber: '',
                driverName: '',
                transporterName: '',
                loadingPoint: LOADING_POINTS[0],
                destination: DESTINATIONS[0],
                grossWeight: 0,
                tareWeight: 0,
                netWeight: 0,
                products: [{
                    id: '1',
                    productName: '',
                    rate: 0,
                    quantity: 0,
                    billRate: 0,
                    amount: 0
                }],
                remarks: ''
            });
            setSelectedCustomer(null);
            setSelectedVehicle(null);
        }
    };

    return (
        <div className="create-challan-container px-0 container">
            {/* Header Section */}
            <div className="challan-header">
                <button
                    onClick={() => navigate(-1)}
                    className="btn-back"
                >
                    <ArrowLeft className="icon" />
                    Back
                </button>
                <h1>Create Challan</h1>
                <div className="challan-number">
                    <span>Challan #: {formData.challanNumber}</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="challan-form px-0">
                {/* Customer & Challan Info Section */}
                <div className="challan-section">
                    <div className="section-header">
                        <h2>Customer & Challan Information</h2>
                    </div>
                    <div className="form-grid p-3">
                        <div className="form-group">
                            <label>Customer <span className="required">*</span></label>
                            <div className="dropdown">
                                <button
                                    type="button"
                                    className="dropdown-toggle"
                                    onClick={() => document.getElementById('customerDropdown')?.classList.toggle('show')}
                                >
                                    {selectedCustomer ? selectedCustomer.name : 'Select Customer'}
                                </button>
                                <div id="customerDropdown" className="dropdown-content">
                                    <input
                                        type="text"
                                        placeholder="Search customer..."
                                        className="dropdown-search"
                                        onChange={(e) => {
                                            const search = e.target.value.toLowerCase();
                                            const items = document.querySelectorAll('.customer-item');
                                            items.forEach(item => {
                                                const text = item.textContent?.toLowerCase() || '';
                                                (item as HTMLElement).style.display = text.includes(search) ? 'block' : 'none';
                                            });
                                        }}
                                    />
                                    {CUSTOMERS.map(customer => (
                                        <div
                                            key={customer.id}
                                            className="dropdown-item customer-item"
                                            onClick={() => {
                                                handleCustomerSelect(customer);
                                                document.getElementById('customerDropdown')?.classList.remove('show');
                                            }}
                                        >
                                            <div className="customer-name">{customer.name}</div>
                                            <div className="customer-phone">{customer.phone}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {selectedCustomer && (
                                <div className="customer-details">
                                    <div className="customer-address">
                                        <User className="icon-sm" />
                                        <span>{selectedCustomer.address}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Challan Date <span className="required">*</span></label>
                            <div className="input-with-icon">
                                <Calendar className="input-icon" />
                                <input
                                    type="date"
                                    name="challanDate"
                                    value={formData.challanDate}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Billing Type <span className="required">*</span></label>
                            <div className="radio-group">
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="billingType"
                                        value="per_ton"
                                        checked={formData.billingType === 'per_ton'}
                                        onChange={handleInputChange}
                                    />
                                    <span className="radio-custom"></span>
                                    Per Ton
                                </label>
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="billingType"
                                        value="per_vehicle"
                                        checked={formData.billingType === 'per_vehicle'}
                                        onChange={handleInputChange}
                                    />
                                    <span className="radio-custom"></span>
                                    Per Vehicle
                                </label>
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="billingType"
                                        value="lumpsum"
                                        checked={formData.billingType === 'lumpsum'}
                                        onChange={handleInputChange}
                                    />
                                    <span className="radio-custom"></span>
                                    Lumpsum
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vehicle & Transport Section */}
                <div className="challan-section">
                    <div className="section-header">
                        <h2>Vehicle & Transport Details</h2>
                    </div>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Vehicle Number <span className="required">*</span></label>
                            <div className="dropdown">
                                <button
                                    type="button"
                                    className="dropdown-toggle"
                                    onClick={() => document.getElementById('vehicleDropdown')?.classList.toggle('show')}
                                >
                                    {selectedVehicle ? selectedVehicle.number : 'Select Vehicle'}
                                </button>
                                <div id="vehicleDropdown" className="dropdown-content">
                                    <input
                                        type="text"
                                        placeholder="Search vehicle..."
                                        className="dropdown-search"
                                        onChange={(e) => {
                                            const search = e.target.value.toLowerCase();
                                            const items = document.querySelectorAll('.vehicle-item');
                                            items.forEach(item => {
                                                const text = item.textContent?.toLowerCase() || '';
                                                (item as HTMLElement).style.display = text.includes(search) ? 'block' : 'none';
                                            });
                                        }}
                                    />
                                    {VEHICLES.map(vehicle => (
                                        <div
                                            key={vehicle.id}
                                            className="dropdown-item vehicle-item"
                                            onClick={() => {
                                                handleVehicleSelect(vehicle);
                                                document.getElementById('vehicleDropdown')?.classList.remove('show');
                                            }}
                                        >
                                            <div className="vehicle-number">{vehicle.number}</div>
                                            <div className="vehicle-type">{vehicle.type}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Driver Name</label>
                            <input
                                type="text"
                                name="driverName"
                                value={formData.driverName}
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="Enter driver name"
                            />
                        </div>

                        <div className="form-group">
                            <label>Transporter Name</label>
                            <input
                                type="text"
                                name="transporterName"
                                value={formData.transporterName}
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="Enter transporter name"
                            />
                        </div>

                        <div className="form-group">
                            <label>Loading Point <span className="required">*</span></label>
                            <select
                                name="loadingPoint"
                                value={formData.loadingPoint}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            >
                                {LOADING_POINTS.map(point => (
                                    <option key={point} value={point}>{point}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Destination <span className="required">*</span></label>
                            <select
                                name="destination"
                                value={formData.destination}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            >
                                {DESTINATIONS.map(dest => (
                                    <option key={dest} value={dest}>{dest}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Product Details Section */}
                <div className="challan-section">
                    <div className="section-header">
                        <h2>Product Details</h2>
                        <button
                            type="button"
                            className="btn-add"
                            onClick={addProductRow}
                        >
                            <Plus className="icon" />
                            Add Product
                        </button>
                    </div>

                    <div className="table-responsive">
                        <table className="product-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product Name <span className="required">*</span></th>
                                    <th>Rate (₹) <span className="required">*</span></th>
                                    <th>Quantity (MT) <span className="required">*</span></th>
                                    <th>Bill Rate (₹) <span className="required">*</span></th>
                                    <th>Amount (₹)</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formData.products.map((product, index) => (
                                    <tr key={product.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <select
                                                value={product.productName}
                                                onChange={(e) => {
                                                    const selectedProduct = PRODUCTS.find(p => p.name === e.target.value);
                                                    if (selectedProduct) {
                                                        handleProductChange(index, 'productName', selectedProduct.name);
                                                        handleProductChange(index, 'rate', selectedProduct.rate);
                                                        handleProductChange(index, 'billRate', selectedProduct.rate);
                                                    }
                                                }}
                                                className="form-control"
                                                required
                                            >
                                                <option value="">Select Product</option>
                                                {PRODUCTS.map(p => (
                                                    <option key={p.id} value={p.name}>
                                                        {p.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={product.rate || ''}
                                                onChange={(e) => handleProductChange(index, 'rate', e.target.value)}
                                                className="form-control"
                                                min="0"
                                                step="0.01"
                                                required
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={product.quantity || ''}
                                                onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                                                className="form-control"
                                                min="0"
                                                step="0.01"
                                                required
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={product.billRate || ''}
                                                onChange={(e) => handleProductChange(index, 'billRate', e.target.value)}
                                                className="form-control"
                                                min="0"
                                                step="0.01"
                                                required
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={product.amount.toFixed(2)}
                                                className="form-control"
                                                readOnly
                                            />
                                        </td>
                                        <td>
                                            {formData.products.length > 1 && (
                                                <button
                                                    type="button"
                                                    className="btn-icon btn-danger"
                                                    onClick={() => removeProductRow(index)}
                                                    title="Remove product"
                                                >
                                                    <Trash2 className="icon" />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={3} className="text-right">
                                        <strong>Total:</strong>
                                    </td>
                                    <td>
                                        <strong>{totalQuantity.toFixed(2)} MT</strong>
                                    </td>
                                    <td></td>
                                    <td>
                                        <strong>₹{totalAmount.toFixed(2)}</strong>
                                    </td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                {/* Weight Information Section */}
                <div className="challan-section">
                    <div className="section-header">
                        <h2>Weight Information (in MT)</h2>
                    </div>
                    <div className="form-grid form-grid-3">
                        <div className="form-group">
                            <label>Gross Weight <span className="required">*</span></label>
                            <input
                                type="number"
                                name="grossWeight"
                                value={formData.grossWeight || ''}
                                onChange={handleInputChange}
                                className="form-control"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Tare Weight <span className="required">*</span></label>
                            <input
                                type="number"
                                name="tareWeight"
                                value={formData.tareWeight || ''}
                                onChange={handleInputChange}
                                className="form-control"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Net Weight</label>
                            <input
                                type="number"
                                name="netWeight"
                                value={formData.netWeight || ''}
                                readOnly
                                className="form-control"
                            />
                        </div>
                    </div>
                </div>

                {/* Summary Section */}
                <div className="challan-section">
                    <div className="section-header">
                        <h2>Summary</h2>
                    </div>
                    <div className="summary-grid">
                        <div className="summary-item">
                            <span>Total Quantity:</span>
                            <span>{totalQuantity.toFixed(2)} MT</span>
                        </div>
                        <div className="summary-item">
                            <span>Total Amount:</span>
                            <span>₹{totalAmount.toFixed(2)}</span>
                        </div>
                        <div className="summary-item">
                            <span>CGST (9%):</span>
                            <span>₹{(totalAmount * 0.09).toFixed(2)}</span>
                        </div>
                        <div className="summary-item">
                            <span>SGST (9%):</span>
                            <span>₹{(totalAmount * 0.09).toFixed(2)}</span>
                        </div>
                        <div className="summary-item total">
                            <span>Grand Total:</span>
                            <span>₹{(totalAmount * 1.18).toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Remarks Section */}
                <div className="challan-section">
                    <div className="section-header">
                        <h2>Remarks</h2>
                    </div>
                    <div className="form-group">
                        <textarea
                            name="remarks"
                            value={formData.remarks}
                            onChange={handleInputChange}
                            className="form-control"
                            rows={3}
                            placeholder="Enter any additional remarks or notes..."
                        ></textarea>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="form-actions">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                    <div className="action-buttons">
                        <button
                            type="button"
                            className="btn btn-outline"
                            onClick={() => {
                                // Save as draft logic
                                console.log('Saving as draft:', formData);
                                alert('Challan saved as draft successfully!');
                            }}
                        >
                            Save as Draft
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Generating...' : 'Generate Challan'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateChallan;

