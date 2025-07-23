"use client"

import React, { useState } from "react"
import {
    Plus,
    Fuel,
    BarChart3,
    Settings,
    Zap,
    Car,
    Droplets,
    Leaf,
    FlaskConical,
    Search,
    Filter,
    MoreHorizontal,
    Edit,
    Trash2,
    LayoutGrid,
    TableIcon,
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
    ChevronDown,
} from "lucide-react"

interface FuelType {
    id: string
    name: string
    category: "gasoline" | "diesel" | "electric" | "hybrid" | "hydrogen" | "biofuel"
    description: string
    efficiency: number
    co2Emission: number
    cost: number
    availability: "high" | "medium" | "low"
    created: string
}

const initialFuelTypes: FuelType[] = [
    {
        id: "1",
        name: "Regular Gasoline",
        category: "gasoline",
        description: "Standard octane gasoline for most passenger vehicles",
        efficiency: 25,
        co2Emission: 404,
        cost: 3.45,
        availability: "high",
        created: "2024-01-15",
    },
    {
        id: "2",
        name: "Premium Gasoline",
        category: "gasoline",
        description: "High octane gasoline for performance vehicles",
        efficiency: 27,
        co2Emission: 404,
        cost: 3.85,
        availability: "high",
        created: "2024-01-15",
    },
    {
        id: "3",
        name: "Diesel",
        category: "diesel",
        description: "Standard diesel fuel for trucks and heavy vehicles",
        efficiency: 35,
        co2Emission: 456,
        cost: 3.12,
        availability: "high",
        created: "2024-01-16",
    },
    {
        id: "4",
        name: "Electric",
        category: "electric",
        description: "Battery electric power for EVs",
        efficiency: 120,
        co2Emission: 0,
        cost: 0.12,
        availability: "medium",
        created: "2024-01-17",
    },
    {
        id: "5",
        name: "Hybrid",
        category: "hybrid",
        description: "Combined gasoline and electric power",
        efficiency: 45,
        co2Emission: 250,
        cost: 2.8,
        availability: "medium",
        created: "2024-01-18",
    },
    {
        id: "6",
        name: "Hydrogen",
        category: "hydrogen",
        description: "Hydrogen fuel cell technology",
        efficiency: 65,
        co2Emission: 0,
        cost: 8.5,
        availability: "low",
        created: "2024-01-19",
    },
]

const categoryIcons = {
    gasoline: Fuel,
    diesel: Droplets,
    electric: Zap,
    hybrid: Car,
    hydrogen: FlaskConical,
    biofuel: Leaf,
}

const categoryColors = {
    gasoline: "bg-orange-500",
    diesel: "bg-blue-600",
    electric: "bg-yellow-500",
    hybrid: "bg-green-500",
    hydrogen: "bg-purple-500",
    biofuel: "bg-emerald-500",
}

const availabilityColors = {
    high: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-red-100 text-red-800",
}

// Custom Components
type ButtonVariant = 'default' | 'outline' | 'ghost';
type ButtonSize = 'default' | 'sm';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
    disabled?: boolean;
}

const Button = ({
    children,
    variant = "default",
    size = "default",
    className = "",
    onClick,
    disabled,
    ...props
}: ButtonProps) => {
    const baseClasses =
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

    const variants = {
        default: "bg-slate-900 text-slate-50 hover:bg-slate-900/90",
        outline: "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900",
        ghost: "hover:bg-slate-100 hover:text-slate-900",
    }

    const sizes = {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 text-sm",
    }

    return (
        <button
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    )
}

const Card = ({ children, className = "", ...props }: any) => (
    <div className={`rounded-lg border bg-white text-slate-950 shadow-sm ${className}`} {...props}>
        {children}
    </div>
)

const CardHeader = ({ children, className = "", ...props }: any) => (
    <div className={`flex flex-col space-y-1.5 p-3 ${className}`} {...props}>
        {children}
    </div>
)

const CardTitle = ({ children, className = "", ...props }: any) => (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>
        {children}
    </h3>
)

const CardDescription = ({ children, className = "", ...props }: any) => (
    <p className={`text-sm text-slate-500 ${className}`} {...props}>
        {children}
    </p>
)

const CardContent = ({ children, className = "", ...props }: any) => (
    <div className={`p-3  ${className}`} {...props}>
        {children}
    </div>
)

const Input = ({ className = "", ...props }: any) => (
    <input
        className={`flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
    />
)

const Badge = ({ children, className = "", variant = "default", ...props }: any) => {
    const variants = {
        default: "bg-slate-900 text-slate-50 hover:bg-slate-900/80",
        outline: "text-slate-950 border border-slate-200",
    }

    return (
        <div
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </div>
    )
}

const Label = ({ children, className = "", ...props }: any) => (
    <label
        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
        {...props}
    >
        {children}
    </label>
)

const Textarea = ({ className = "", ...props }: any) => (
    <textarea
        className={`flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
    />
)

const Dialog = ({ children, open, onOpenChange }: any) => {
    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
            <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
                {children}
            </div>
        </div>
    )
}

const DialogContent = ({ children, className = "", ...props }: any) => (
    <div className={`${className}`} {...props}>
        {children}
    </div>
)

const DialogHeader = ({ children, className = "", ...props }: any) => (
    <div className={`flex flex-col space-y-1.5 text-center sm:text-left p-6 pb-4 ${className}`} {...props}>
        {children}
    </div>
)

const DialogTitle = ({ children, className = "", ...props }: any) => (
    <h2 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props}>
        {children}
    </h2>
)

const DialogDescription = ({ children, className = "", ...props }: any) => (
    <p className={`text-sm text-slate-500 ${className}`} {...props}>
        {children}
    </p>
)

const DialogFooter = ({ children, className = "", ...props }: any) => (
    <div className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6 pt-4 ${className}`} {...props}>
        {children}
    </div>
)

const Select = ({ children, value, onValueChange, ...props }: any) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="relative">
            {React.Children.map(children, (child) => {
                if (child.type === SelectTrigger) {
                    return React.cloneElement(child, {
                        onClick: () => setIsOpen(!isOpen),
                        isOpen,
                        value,
                    })
                }
                if (child.type === SelectContent && isOpen) {
                    return React.cloneElement(child, {
                        onSelect: (val: string) => {
                            onValueChange(val)
                            setIsOpen(false)
                        },
                        onClose: () => setIsOpen(false),
                    })
                }
                return null
            })}
        </div>
    )
}

const SelectTrigger = ({ children, className = "", onClick, isOpen, value, ...props }: any) => (
    <button
        className={`flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        onClick={onClick}
        {...props}
    >
        {children}
        <ChevronDown className={`h-4 w-4 opacity-50 transition-transform ${isOpen ? "rotate-180" : ""}`} />
    </button>
)

const SelectValue = ({ placeholder, ...props }: any) => {
    const parent = React.useContext(React.createContext(null))
    return <span>{props.value || placeholder}</span>
}

const SelectContent = ({ children, onSelect, onClose, className = "", ...props }: any) => (
    <div
        className={`absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border bg-white py-1 shadow-md ${className}`}
        {...props}
    >
        {React.Children.map(children, (child) => React.cloneElement(child, { onSelect }))}
    </div>
)

const SelectItem = ({ children, value, onSelect, className = "", ...props }: any) => (
    <div
        className={`relative flex cursor-pointer select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-slate-100 focus:bg-slate-100 ${className}`}
        onClick={() => onSelect(value)}
        {...props}
    >
        {children}
    </div>
)

const DropdownMenu = ({ children }: any) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="relative">
            {React.Children.map(children, (child) => {
                if (child.type === DropdownMenuTrigger) {
                    return React.cloneElement(child, {
                        onClick: () => setIsOpen(!isOpen),
                    })
                }
                if (child.type === DropdownMenuContent && isOpen) {
                    return React.cloneElement(child, {
                        onClose: () => setIsOpen(false),
                    })
                }
                return null
            })}
        </div>
    )
}

const DropdownMenuTrigger = ({ children, onClick, ...props }: any) => (
    <div onClick={onClick} {...props}>
        {children}
    </div>
)

const DropdownMenuContent = ({ children, align = "start", onClose, className = "", ...props }: any) => {
    React.useEffect(() => {
        const handleClickOutside = () => onClose()
        document.addEventListener("click", handleClickOutside)
        return () => document.removeEventListener("click", handleClickOutside)
    }, [onClose])

    const alignClasses = {
        start: "left-0",
        end: "right-0",
    }

    return (
        <div
            className={`absolute top-full z-50 mt-1 min-w-[8rem] overflow-hidden rounded-md border bg-white py-1 shadow-md ${alignClasses[align]} ${className}`}
            {...props}
        >
            {children}
        </div>
        
    )
}  


const DropdownMenuItem = ({ children, onClick, className = "", ...props }: any) => (
    <div
        className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-slate-100 focus:bg-slate-100 ${className}`}
        onClick={onClick}
        {...props}
    >
        {children}
    </div>
)

const Table = ({ children, className = "", ...props }: any) => (
    <div className="w-full overflow-auto">
        <table className={`w-full caption-bottom text-sm ${className}`} {...props}>
            {children}
        </table>
    </div>
)

const TableHeader = ({ children, className = "", ...props }: any) => (
    <thead className={`[&_tr]:border-b ${className}`} {...props}>
        {children}
    </thead>
)

const TableBody = ({ children, className = "", ...props }: any) => (
    <tbody className={`[&_tr:last-child]:border-0 ${className}`} {...props}>
        {children}
    </tbody>
)

const TableRow = ({ children, className = "", ...props }: any) => (
    <tr
        className={`border-b transition-colors hover:bg-slate-50/50 data-[state=selected]:bg-slate-100 ${className}`}
        {...props}
    >
        {children}
    </tr>
)

const TableHead = ({ children, className = "", ...props }: any) => (
    <th
        className={`h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0 ${className}`}
        {...props}
    >
        {children}
    </th>
)

const TableCell = ({ children, className = "", ...props }: any) => (
    <td className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`} {...props}>
        {children}
    </td>
)

const ToggleGroup = ({ children, type, value, onValueChange }: any) => (
    <div className="flex items-center justify-center rounded-md border border-slate-200 bg-white">
        {React.Children.map(children, (child) =>
            React.cloneElement(child, {
                isSelected: value === child.props.value,
                onClick: () => onValueChange(child.props.value),
            }),
        )}
    </div>
)

const ToggleGroupItem = ({ children, value, isSelected, onClick, className = "", ...props }: any) => (
    <button
        className={`inline-flex items-center justify-center px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${isSelected ? "bg-slate-100 text-slate-900" : "text-slate-500"} ${className}`}
        onClick={onClick}
        {...props}
    >
        {children}
    </button>
)

export default function FuelType() {
    const [fuelTypes, setFuelTypes] = useState<FuelType[]>(initialFuelTypes)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterCategory, setFilterCategory] = useState<string>("all")
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [editingFuel, setEditingFuel] = useState<FuelType | null>(null)
    const [viewMode, setViewMode] = useState<"grid" | "table">("grid")
    const [sortField, setSortField] = useState<keyof FuelType>("name")
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const [formData, setFormData] = useState({
        name: "",
        category: "gasoline" as FuelType["category"],
        description: "",
        efficiency: "",
        co2Emission: "",
        cost: "",
        availability: "medium" as FuelType["availability"],
    })

    const filteredAndSortedFuelTypes = fuelTypes
        .filter((fuel) => {
            const matchesSearch =
                fuel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                fuel.description.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesCategory = filterCategory === "all" || fuel.category === filterCategory
            return matchesSearch && matchesCategory
        })
        .sort((a, b) => {
            let aValue = a[sortField]
            let bValue = b[sortField]
            if (typeof aValue === "string") {
                aValue = aValue.toLowerCase()
                bValue = (bValue as string).toLowerCase()
            }
            if (sortDirection === "asc") {
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
            } else {
                return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
            }
        })

    const totalTypes = fuelTypes.length
    const avgEfficiency = Math.round(fuelTypes.reduce((acc, fuel) => acc + fuel.efficiency, 0) / fuelTypes.length)
    const avgCO2 = Math.round(fuelTypes.reduce((acc, fuel) => acc + fuel.co2Emission, 0) / fuelTypes.length)
    const avgCost = (fuelTypes.reduce((acc, fuel) => acc + fuel.cost, 0) / fuelTypes.length).toFixed(2)

    const handleSubmit = () => {
        const newFuel: FuelType = {
            id: editingFuel?.id || Date.now().toString(),
            name: formData.name,
            category: formData.category,
            description: formData.description,
            efficiency: Number(formData.efficiency),
            co2Emission: Number(formData.co2Emission),
            cost: Number(formData.cost),
            availability: formData.availability,
            created: editingFuel?.created || new Date().toISOString().split("T")[0],
        }

        if (editingFuel) {
            setFuelTypes(fuelTypes.map((fuel) => (fuel.id === editingFuel.id ? newFuel : fuel)))
        } else {
            setFuelTypes([...fuelTypes, newFuel])
        }
        resetForm()
    }

    const resetForm = () => {
        setFormData({
            name: "",
            category: "gasoline",
            description: "",
            efficiency: "",
            co2Emission: "",
            cost: "",
            availability: "medium",
        })
        setIsAddDialogOpen(false)
        setEditingFuel(null)
    }

    const handleEdit = (fuel: FuelType) => {
        setEditingFuel(fuel)
        setFormData({
            name: fuel.name,
            category: fuel.category,
            description: fuel.description,
            efficiency: fuel.efficiency.toString(),
            co2Emission: fuel.co2Emission.toString(),
            cost: fuel.cost.toString(),
            availability: fuel.availability,
        })
        setIsAddDialogOpen(true)
    }

    const handleDelete = (id: string) => {
        setFuelTypes(fuelTypes.filter((fuel) => fuel.id !== id))
    }

    const handleSort = (field: keyof FuelType) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortDirection("asc")
        }
    }

    const getSortIcon = (field: keyof FuelType) => {
        if (sortField !== field) return <ArrowUpDown className="w-4 h-4" />
        return sortDirection === "asc" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
    }

    return (
        <>
            {/* Header */}
            <header className="border-y bg-white/80 backdrop-blur-sm mt-[80px] ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                                <Fuel className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Fuel Type Master</h1>
                                <p className="text-sm text-gray-600">Comprehensive fuel management system</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant="outline" size="sm">
                                <BarChart3 className="w-4 h-4 mr-2" />
                                Analytics
                            </Button>
                            <Button variant="outline" size="sm">
                                <Settings className="w-4 h-4 mr-2" />
                                Settings
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
                    {/* Total Fuel Types Card */}
                    <Card className="flex flex-row items-center  text-center py-2">
                        {/* Icon in center with margin-bottom */}
                        <CardHeader className="p-0 mb-2">
                            <Fuel className="w-8 h-8 text-slate-500 " />
                        </CardHeader>

                        {/* Title and value in center */}
                        <CardContent className="p-0">
                            <CardTitle className="text-sm font-medium text-slate-600 p-0">Total Fuel Types</CardTitle>
                            <div className="text-2xl font-bold mt-1 p-0">{totalTypes}</div>
                        </CardContent>
                    </Card>


                    {/* Avg Efficiency Card */}
                    <Card className="flex flex-row items-center  text-center py-2">
                        <CardHeader className="p-0 mb-2">
                            <BarChart3 className="w-8 h-8 text-slate-500" />
                        </CardHeader>
                        <CardContent className="p-0">
                            <CardTitle className="text-sm font-medium text-slate-600 p-0">Avg Efficiency</CardTitle>
                            <div className="text-2xl font-bold mt-1 p-0">{avgEfficiency} MPG</div>

                        </CardContent>
                    </Card>

                    {/* Avg CO₂ Emission Card */}
                    <Card className="flex flex-row items-center  text-center py-2">
                        <CardHeader className="p-0 mb-2">
                            <Leaf className="w-8 h-8 text-slate-500" />
                        </CardHeader>
                        <CardContent className="p-0">
                            <CardTitle className="text-sm font-medium text-slate-600 p-0">Avg CO₂ Emission</CardTitle>
                            <div className="text-2xl font-bold mt-1 p-0">{avgCO2} g</div>

                        </CardContent>
                    </Card>

                    {/* Avg Cost Card */}
                    <Card className="flex flex-row items-center  text-center py-2">
                        <CardHeader className="flex items-center justify-between pb-1 space-y-0">
                            <div className="w-8 h-8 text-slate-500">$</div>
                        </CardHeader>
                        <CardContent>
                            <CardTitle className="text-sm font-medium text-slate-600">Avg Cost</CardTitle>
                            <div className="text-2xl font-bold text-gray-900">${avgCost}</div>

                        </CardContent>
                    </Card>

                </div>


                {/* Controls */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Search fuel types..."
                            value={searchTerm}
                            onChange={(e: any) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <Filter className="w-4 h-4 mr-2" />
                            <SelectValue value={filterCategory === "all" ? "All Categories" : filterCategory} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="gasoline">Gasoline</SelectItem>
                            <SelectItem value="diesel">Diesel</SelectItem>
                            <SelectItem value="electric">Electric</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                            <SelectItem value="hydrogen">Hydrogen</SelectItem>
                            <SelectItem value="biofuel">Biofuel</SelectItem>
                        </SelectContent>
                    </Select>
                    <ToggleGroup
                        type="single"
                        value={viewMode}
                        onValueChange={(value: any) => value && setViewMode(value as "grid" | "table")}
                    >
                        <ToggleGroupItem value="grid" aria-label="Grid view">
                            <LayoutGrid className="w-4 h-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="table" aria-label="Table view">
                            <TableIcon className="w-4 h-4" />
                        </ToggleGroupItem>
                    </ToggleGroup>
                    <Button onClick={() => setIsAddDialogOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Fuel Type
                    </Button>
                </div>

                {/* Dialog */}
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingFuel ? "Edit Fuel Type" : "Add New Fuel Type"}</DialogTitle>
                            <DialogDescription>
                                {editingFuel ? "Update the fuel type details below." : "Enter the details for the new fuel type."}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4 px-6">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e: any) => setFormData({ ...formData, name: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="category" className="text-right">
                                    Category
                                </Label>
                                <Select
                                    value={formData.category}
                                    onValueChange={(value: any) => setFormData({ ...formData, category: value as FuelType["category"] })}
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue value={formData.category} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="gasoline">Gasoline</SelectItem>
                                        <SelectItem value="diesel">Diesel</SelectItem>
                                        <SelectItem value="electric">Electric</SelectItem>
                                        <SelectItem value="hybrid">Hybrid</SelectItem>
                                        <SelectItem value="hydrogen">Hydrogen</SelectItem>
                                        <SelectItem value="biofuel">Biofuel</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">
                                    Description
                                </Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e: any) => setFormData({ ...formData, description: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="efficiency" className="text-right col-span-2">
                                        Efficiency (MPG)
                                    </Label>
                                    <Input
                                        id="efficiency"
                                        type="number"
                                        value={formData.efficiency}
                                        onChange={(e: any) => setFormData({ ...formData, efficiency: e.target.value })}
                                        className="col-span-2"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="co2" className="text-right col-span-2">
                                        CO₂ (g/mile)
                                    </Label>
                                    <Input
                                        id="co2"
                                        type="number"
                                        value={formData.co2Emission}
                                        onChange={(e: any) => setFormData({ ...formData, co2Emission: e.target.value })}
                                        className="col-span-2"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="cost" className="text-right col-span-2">
                                        Cost ($)
                                    </Label>
                                    <Input
                                        id="cost"
                                        type="number"
                                        step="0.01"
                                        value={formData.cost}
                                        onChange={(e: any) => setFormData({ ...formData, cost: e.target.value })}
                                        className="col-span-2"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="availability" className="text-right col-span-2">
                                        Availability
                                    </Label>
                                    <Select
                                        value={formData.availability}
                                        onValueChange={(value: any) =>
                                            setFormData({ ...formData, availability: value as FuelType["availability"] })
                                        }
                                    >
                                        <SelectTrigger className="col-span-2">
                                            <SelectValue value={formData.availability} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="high">High</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="low">Low</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={resetForm}>
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit}>{editingFuel ? "Update" : "Add"} Fuel Type</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Fuel Types Display */}
                {viewMode === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAndSortedFuelTypes.map((fuel) => {
                            const IconComponent = categoryIcons[fuel.category]
                            return (
                                <Card key={fuel.id} className="hover:shadow-lg transition-shadow">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div
                                                    className={`w-10 h-10 ${categoryColors[fuel.category]} rounded-lg flex items-center justify-center`}
                                                >
                                                    <IconComponent className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <CardTitle className="text-lg">{fuel.name}</CardTitle>
                                                    <CardDescription className="capitalize">{fuel.category}</CardDescription>
                                                </div>
                                            </div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <Button variant="ghost" size="sm">
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => handleEdit(fuel)}>
                                                        <Edit className="w-4 h-4 mr-2" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDelete(fuel.id)} className="text-red-600">
                                                        <Trash2 className="w-4 h-4 mr-2" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p className="text-sm text-gray-600">{fuel.description}</p>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="font-medium">Efficiency:</span>
                                                <div className="text-lg font-bold text-slate-900">{fuel.efficiency} MPG</div>
                                            </div>
                                            <div>
                                                <span className="font-medium">CO₂ Emission:</span>
                                                <div className="text-lg font-bold text-gray-900">{fuel.co2Emission}g</div>
                                            </div>
                                            <div>
                                                <span className="font-medium">Cost:</span>
                                                <div className="text-lg font-bold text-green-600">${fuel.cost}</div>
                                            </div>
                                            <div>
                                                <span className="font-medium">Availability:</span>
                                                <Badge className={`mt-1 ${availabilityColors[fuel.availability]}`}>{fuel.availability}</Badge>
                                            </div>
                                        </div>
                                        <div className="pt-2 border-t">
                                            <span className="text-xs text-gray-500">Added: {fuel.created}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle>Fuel Types Data Table</CardTitle>
                            <CardDescription>Comprehensive view of all fuel types with sortable columns</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[200px]">
                                            <Button variant="ghost" onClick={() => handleSort("name")} className="h-auto p-0 font-medium">
                                                Name {getSortIcon("name")}
                                            </Button>
                                        </TableHead>
                                        <TableHead>
                                            <Button variant="ghost" onClick={() => handleSort("category")} className="h-auto p-0 font-medium">
                                                Category {getSortIcon("category")}
                                            </Button>
                                        </TableHead>
                                        <TableHead className="hidden md:table-cell">Description</TableHead>
                                        <TableHead className="text-right">
                                            <Button
                                                variant="ghost"
                                                onClick={() => handleSort("efficiency")}
                                                className="h-auto p-0 font-medium"
                                            >
                                                Efficiency {getSortIcon("efficiency")}
                                            </Button>
                                        </TableHead>
                                        <TableHead className="text-right">
                                            <Button
                                                variant="ghost"
                                                onClick={() => handleSort("co2Emission")}
                                                className="h-auto p-0 font-medium"
                                            >
                                                CO₂ {getSortIcon("co2Emission")}
                                            </Button>
                                        </TableHead>
                                        <TableHead className="text-right">
                                            <Button variant="ghost" onClick={() => handleSort("cost")} className="h-auto p-0 font-medium">
                                                Cost {getSortIcon("cost")}
                                            </Button>
                                        </TableHead>
                                        <TableHead>
                                            <Button
                                                variant="ghost"
                                                onClick={() => handleSort("availability")}
                                                className="h-auto p-0 font-medium"
                                            >
                                                Availability {getSortIcon("availability")}
                                            </Button>
                                        </TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredAndSortedFuelTypes.map((fuel) => {
                                        const IconComponent = categoryIcons[fuel.category]
                                        return (
                                            <TableRow key={fuel.id}>
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center space-x-3">
                                                        <div
                                                            className={`w-8 h-8 ${categoryColors[fuel.category]} rounded-md flex items-center justify-center`}
                                                        >
                                                            <IconComponent className="w-4 h-4 text-white" />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">{fuel.name}</div>
                                                            <div className="text-sm text-slate-500">Added: {fuel.created}</div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className="capitalize">
                                                        {fuel.category}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell max-w-[300px]">
                                                    <div className="truncate">{fuel.description}</div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="font-bold text-slate-900">{fuel.efficiency} MPG</div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="font-bold">{fuel.co2Emission}g</div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="font-bold text-green-600">${fuel.cost}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge className={availabilityColors[fuel.availability]}>{fuel.availability}</Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger>
                                                            <Button variant="ghost" size="sm">
                                                                <MoreHorizontal className="w-4 h-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem onClick={() => handleEdit(fuel)}>
                                                                <Edit className="w-4 h-4 mr-2" />
                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleDelete(fuel.id)} className="text-red-600">
                                                                <Trash2 className="w-4 h-4 mr-2" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}

                {filteredAndSortedFuelTypes.length === 0 && (
                    <Card className="p-8 text-center">
                        <Fuel className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No fuel types found</h3>
                        <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria.</p>
                        <Button onClick={() => setIsAddDialogOpen(true)}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add First Fuel Type
                        </Button>
                    </Card>
                )}
            </main>
        </>
    )
}
