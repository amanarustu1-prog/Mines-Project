# Mining Plant ERP System

A comprehensive Enterprise Resource Planning (ERP) system designed specifically for government mining plant operations. Built with React.js, Vite, TypeScript, and Tailwind CSS, this dashboard provides real-time monitoring and management capabilities for mining operations.

## 🏗️ Project Overview

This ERP system is designed to meet the specific needs of government mining plants, providing:

- **Real-time Production Monitoring** - Track daily ore mining progress against targets
- **Inventory Management** - Monitor critical stock levels and supply chain
- **Equipment Status Tracking** - Manage fleet efficiency and maintenance schedules
- **Workforce Management** - Monitor attendance, shifts, and personnel allocation
- **Safety Compliance** - Track safety alerts, incidents, and PPE compliance
- **Government Compliance** - Designed to meet government UI/UX and accessibility standards

## 🚀 Technology Stack

- **Framework**: React.js with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS with CSS Variables
- **Icons**: Lucide React
- **UI Components**: Custom components with shadcn/ui patterns
- **Development**: ESLint, Prettier

## 📊 Dashboard Features

### Key Metrics
- Production targets vs actual output
- Active workforce and attendance rates
- Equipment operational status
- Safety alerts and compliance rates

### Main Sections
1. **Production Overview** - Daily/monthly mining targets and progress
2. **Inventory Snapshot** - Stock levels with critical item alerts
3. **Equipment Status** - Fleet management with maintenance schedules
4. **Safety Alerts** - Real-time safety monitoring and compliance
5. **Workforce Management** - Shift tracking and attendance

## 🏛️ Government Compliance Features

- Professional blue/grey color scheme suitable for government use
- WCAG accessibility guidelines compliance
- Semantic HTML structure
- Government of India branding placeholders
- Ministry of Mining department integration
- Secure and professional design standards

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   cd Mining-Plant-ERP
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
Mining-Plant-ERP/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Basic UI components (Card, Badge, etc.)
│   │   ├── Header.tsx      # Main navigation header
│   │   ├── MetricCard.tsx  # KPI display cards
│   │   ├── ProductionOverview.tsx
│   │   ├── InventorySnapshot.tsx
│   │   ├── EquipmentStatus.tsx
│   │   └── SafetyAlerts.tsx
│   ├── globals.css         # Global styles and CSS variables
│   ├── layout.tsx          # Root layout component
│   └── page.tsx           # Main dashboard page
├── lib/
│   ├── data.ts            # Mock data for development
│   └── utils.ts           # Utility functions
├── types/
│   └── index.ts           # TypeScript interface definitions
├── public/                # Static assets
└── config files           # Next.js, TypeScript, Tailwind configs
```

## 🎨 Design System

### Color Scheme
- **Primary**: Professional blue (`hsl(221.2 83.2% 53.3%)`)
- **Secondary**: Neutral grey (`hsl(210 40% 96%)`)
- **Success**: Green for positive indicators
- **Warning**: Yellow for attention-needed items
- **Error**: Red for critical alerts

### Typography
- **Font**: Inter (Google Fonts)
- **Hierarchy**: Clear heading structure with semantic HTML
- **Accessibility**: High contrast ratios for government compliance

### Components
- **Cards**: Professional bordered containers
- **Badges**: Status indicators with semantic colors
- **Metrics**: Large numbers with trend indicators
- **Responsive**: Mobile-first design approach

## 🔧 Customization

### Adding New Data Sources
1. Update interfaces in `types/index.ts`
2. Modify mock data in `lib/data.ts`
3. Update components to display new data fields

### Styling Changes
- Modify CSS variables in `app/globals.css`
- Update Tailwind config in `tailwind.config.ts`
- Customize component styles in individual component files

### Adding New Pages
1. Create new page files in the `app/` directory
2. Add navigation using the header and routing
3. Follow existing component patterns

## 📱 Responsive Design

The dashboard is fully responsive and optimized for:
- **Desktop**: Full-width layout with header navigation
- **Tablet**: Responsive grid layout with touch-friendly interactions
- **Mobile**: Stacked layout optimized for mobile screens

## 🔒 Security & Compliance

- Government-grade security considerations
- Data privacy compliance
- Accessibility standards (WCAG 2.1)
- Professional government UI standards

## 🚧 Development Status

**Current Version**: 2.1.0

### Completed Features
- ✅ Main dashboard layout
- ✅ Production monitoring
- ✅ Inventory management
- ✅ Equipment tracking
- ✅ Safety alerts system
- ✅ Responsive design
- ✅ Government compliance styling

### Upcoming Features
- 🔄 Real-time data integration
- 🔄 Advanced reporting
- 🔄 User authentication
- 🔄 Data export capabilities
- 🔄 Mobile app version

## 📞 Support

This project is designed for government mining operations. For technical support or customization requests, please refer to the development team or system administrators.

## 📄 License

This project is developed for government use and follows applicable government software licensing guidelines.

---

**Built with ❤️ for Government Mining Operations**
