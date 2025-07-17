import React, { useState, useEffect } from 'react';
import './BlastEntry.css';

// Icon components
const Zap = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const Target = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const Mountain = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857M18 10a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const Calendar = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v12a2 2 0 002 2z" />
  </svg>
);

const TrendingUp = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const Plus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const Edit3 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const Save = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

const Download = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
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

const List = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

const Grid = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
  </svg>
);

const BarChart3 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13l4-4L11 13l4-4 4 4M3 21h18" />
  </svg>
);

const Activity = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const Compass = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="l-3-3 1.5-1.5 3 3-1.5 1.5z" />
  </svg>
);

// Types
interface BlastingEntry {
  id: string;
  blastNo: string;
  pitNo: string;
  benchNo: string;
  siteDirection: 'NORTH' | 'SOUTH' | 'EAST' | 'WEST' | 'NORTHEAST' | 'NORTHWEST' | 'SOUTHEAST' | 'SOUTHWEST';
  blastingDate: string;
  holeDiameter: number; // in MM
  holeDepth: number; // in Mtrs
  benchHeight: number; // in Mtrs
  burden: number; // in Mtrs
  spacing: number; // in Mtrs
  numberOfRows: number;
  numberOfHolesPerRow: number;
  gravity: number;
  totalNumberOfHoles: number;
  expectedProduction: number; // in MT
  actualProduction: number; // in MT
  remarks: string;
  status: 'planned' | 'executed' | 'completed' | 'cancelled';
  createdDate: string;
  modifiedDate: string;
  createdBy: string;
}

interface Bench {
  id: string;
  benchNo: string;
  pitNo: string;
  elevation: number;
  area: number;
  status: 'active' | 'completed' | 'inactive';
}

interface Pit {
  id: string;
  pitNo: string;
  name: string;
  location: string;
  status: 'active' | 'inactive' | 'closed';
}

export default function BlastEntry() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showBlastModal, setShowBlastModal] = useState(false);
  const [editingBlast, setEditingBlast] = useState<BlastingEntry | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPit, setFilterPit] = useState('all');

  // Sample pits data
  const [pits] = useState<Pit[]>([
    { id: 'pit-1', pitNo: 'PIT-001', name: 'Main Pit', location: 'North Zone', status: 'active' },
    { id: 'pit-2', pitNo: 'PIT-002', name: 'Secondary Pit', location: 'South Zone', status: 'active' },
    { id: 'pit-3', pitNo: 'PIT-003', name: 'Extension Pit', location: 'East Zone', status: 'inactive' }
  ]);

  // Sample benches data
  const [benches] = useState<Bench[]>([
    { id: 'bench-1', benchNo: '1', pitNo: 'PIT-001', elevation: 250, area: 1200, status: 'active' },
    { id: 'bench-2', benchNo: '2', pitNo: 'PIT-001', elevation: 235, area: 1500, status: 'active' },
    { id: 'bench-3', benchNo: '3', pitNo: 'PIT-001', elevation: 220, area: 1800, status: 'completed' },
    { id: 'bench-4', benchNo: '1', pitNo: 'PIT-002', elevation: 240, area: 1000, status: 'active' },
    { id: 'bench-5', benchNo: '2', pitNo: 'PIT-002', elevation: 225, area: 1300, status: 'active' },
    { id: 'bench-6', benchNo: '1', pitNo: 'PIT-003', elevation: 260, area: 800, status: 'inactive' }
  ]);

  // Sample blasting entries data
  const [blastingEntries, setBlastingEntries] = useState<BlastingEntry[]>([
    {
      id: 'blast-1',
      blastNo: '5',
      pitNo: 'PIT-001',
      benchNo: '1',
      siteDirection: 'EAST',
      blastingDate: '2023-09-12',
      holeDiameter: 0,
      holeDepth: 0,
      benchHeight: 0,
      burden: 0,
      spacing: 0,
      numberOfRows: 0,
      numberOfHolesPerRow: 0,
      gravity: 0,
      totalNumberOfHoles: 0,
      expectedProduction: 0,
      actualProduction: 0,
      remarks: '',
      status: 'planned',
      createdDate: '2023-09-10',
      modifiedDate: '2023-09-10',
      createdBy: 'Admin'
    },
    {
      id: 'blast-2',
      blastNo: '4',
      pitNo: 'PIT-001',
      benchNo: '1',
      siteDirection: 'EAST',
      blastingDate: '2022-05-16',
      holeDiameter: 0,
      holeDepth: 0,
      benchHeight: 0,
      burden: 0,
      spacing: 0,
      numberOfRows: 0,
      numberOfHolesPerRow: 0,
      gravity: 0,
      totalNumberOfHoles: 0,
      expectedProduction: 0,
      actualProduction: 0,
      remarks: '',
      status: 'executed',
      createdDate: '2022-05-14',
      modifiedDate: '2022-05-16',
      createdBy: 'Admin'
    },
    {
      id: 'blast-3',
      blastNo: '3',
      pitNo: 'PIT-002',
      benchNo: '1',
      siteDirection: 'NORTH',
      blastingDate: '2022-05-16',
      holeDiameter: 20,
      holeDepth: 25,
      benchHeight: 25,
      burden: 25,
      spacing: 25,
      numberOfRows: 5,
      numberOfHolesPerRow: 40,
      gravity: 2.5,
      totalNumberOfHoles: 200,
      expectedProduction: 7812500,
      actualProduction: 7500000,
      remarks: 'Standard blast operation',
      status: 'completed',
      createdDate: '2022-05-14',
      modifiedDate: '2022-05-17',
      createdBy: 'Admin'
    },
    {
      id: 'blast-4',
      blastNo: '2',
      pitNo: 'PIT-002',
      benchNo: '1',
      siteDirection: 'EAST',
      blastingDate: '2022-05-16',
      holeDiameter: 20,
      holeDepth: 25,
      benchHeight: 25,
      burden: 25,
      spacing: 25,
      numberOfRows: 5,
      numberOfHolesPerRow: 40,
      gravity: 2.5,
      totalNumberOfHoles: 200,
      expectedProduction: 6500000,
      actualProduction: 6200000,
      remarks: 'Reduced production due to weather',
      status: 'completed',
      createdDate: '2022-05-12',
      modifiedDate: '2022-05-17',
      createdBy: 'Admin'
    }
  ]);

  const [blastForm, setBlastForm] = useState({
    blastNo: '',
    pitNo: '',
    benchNo: '',
    siteDirection: 'EAST' as BlastingEntry['siteDirection'],
    blastingDate: '',
    holeDiameter: 0,
    holeDepth: 0,
    benchHeight: 0,
    burden: 0,
    spacing: 0,
    numberOfRows: 0,
    numberOfHolesPerRow: 0,
    gravity: 0,
    expectedProduction: 0,
    actualProduction: 0,
    remarks: ''
  });

  // Filter functions
  const filteredBlastingEntries = blastingEntries.filter(entry => {
    const matchesSearch = searchTerm === '' || 
      entry.blastNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.pitNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.benchNo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || entry.status === filterStatus;
    const matchesPit = filterPit === 'all' || entry.pitNo === filterPit;
    
    return matchesSearch && matchesStatus && matchesPit;
  });

  // Helper functions
  const getPitById = (pitNo: string) => pits.find(p => p.pitNo === pitNo);
  const getBenchById = (benchNo: string, pitNo: string) => benches.find(b => b.benchNo === benchNo && b.pitNo === pitNo);

  // Calculate total holes automatically
  useEffect(() => {
    const totalHoles = blastForm.numberOfRows * blastForm.numberOfHolesPerRow;
    setBlastForm(prev => ({ ...prev, totalNumberOfHoles: totalHoles }));
  }, [blastForm.numberOfRows, blastForm.numberOfHolesPerRow]);

  // Handle blast creation/modification
  const handleSaveBlast = () => {
    if (blastForm.blastNo && blastForm.pitNo && blastForm.benchNo) {
      const blastData: BlastingEntry = {
        id: editingBlast?.id || `blast-${Date.now()}`,
        blastNo: blastForm.blastNo,
        pitNo: blastForm.pitNo,
        benchNo: blastForm.benchNo,
        siteDirection: blastForm.siteDirection,
        blastingDate: blastForm.blastingDate,
        holeDiameter: blastForm.holeDiameter,
        holeDepth: blastForm.holeDepth,
        benchHeight: blastForm.benchHeight,
        burden: blastForm.burden,
        spacing: blastForm.spacing,
        numberOfRows: blastForm.numberOfRows,
        numberOfHolesPerRow: blastForm.numberOfHolesPerRow,
        gravity: blastForm.gravity,
        totalNumberOfHoles: blastForm.numberOfRows * blastForm.numberOfHolesPerRow,
        expectedProduction: blastForm.expectedProduction,
        actualProduction: blastForm.actualProduction,
        remarks: blastForm.remarks,
        status: 'planned',
        createdDate: editingBlast?.createdDate || new Date().toISOString().split('T')[0],
        modifiedDate: new Date().toISOString().split('T')[0],
        createdBy: 'Current User'
      };

      if (editingBlast) {
        setBlastingEntries(entries => entries.map(entry => 
          entry.id === editingBlast.id ? blastData : entry
        ));
      } else {
        setBlastingEntries([...blastingEntries, blastData]);
      }

      // Reset form
      setBlastForm({
        blastNo: '',
        pitNo: '',
        benchNo: '',
        siteDirection: 'EAST',
        blastingDate: '',
        holeDiameter: 0,
        holeDepth: 0,
        benchHeight: 0,
        burden: 0,
        spacing: 0,
        numberOfRows: 0,
        numberOfHolesPerRow: 0,
        gravity: 0,
        expectedProduction: 0,
        actualProduction: 0,
        remarks: ''
      });
      setEditingBlast(null);
      setShowBlastModal(false);
    }
  };

  // Handle edit blast
  const handleEditBlast = (blast: BlastingEntry) => {
    setEditingBlast(blast);
    setBlastForm({
      blastNo: blast.blastNo,
      pitNo: blast.pitNo,
      benchNo: blast.benchNo,
      siteDirection: blast.siteDirection,
      blastingDate: blast.blastingDate,
      holeDiameter: blast.holeDiameter,
      holeDepth: blast.holeDepth,
      benchHeight: blast.benchHeight,
      burden: blast.burden,
      spacing: blast.spacing,
      numberOfRows: blast.numberOfRows,
      numberOfHolesPerRow: blast.numberOfHolesPerRow,
      gravity: blast.gravity,
      expectedProduction: blast.expectedProduction,
      actualProduction: blast.actualProduction,
      remarks: blast.remarks
    });
    setShowBlastModal(true);
  };

  // Calculate statistics
  const getTotalBlasts = () => blastingEntries.length;
  const getCompletedBlasts = () => blastingEntries.filter(b => b.status === 'completed').length;
  const getTotalProduction = () => blastingEntries.reduce((total, blast) => total + blast.actualProduction, 0);
  const getAverageProduction = () => {
    const completedBlasts = blastingEntries.filter(b => b.status === 'completed');
    return completedBlasts.length > 0 ? getTotalProduction() / completedBlasts.length : 0;
  };

  return (
    <div className="blast-entry">
      {/* Header */}
      <div className="blast-entry-header">
        <div className="blast-entry-header-content">
          <div className="blast-entry-title-section">
            <Zap className="blast-entry-header-icon" />
            <div>
              <h1 className="blast-entry-title">Blast Entry Management</h1>
              <p className="blast-entry-subtitle">
                Plan and track blasting operations across mining sites
              </p>
            </div>
          </div>
          <div className="blast-entry-header-actions">
            <button
              onClick={() => {
                setEditingBlast(null);
                setBlastForm({
                  blastNo: '',
                  pitNo: '',
                  benchNo: '',
                  siteDirection: 'EAST',
                  blastingDate: '',
                  holeDiameter: 0,
                  holeDepth: 0,
                  benchHeight: 0,
                  burden: 0,
                  spacing: 0,
                  numberOfRows: 0,
                  numberOfHolesPerRow: 0,
                  gravity: 0,
                  expectedProduction: 0,
                  actualProduction: 0,
                  remarks: ''
                });
                setShowBlastModal(true);
              }}
              className="blast-entry-btn blast-entry-btn-primary"
            >
              <Plus className="blast-entry-icon" />
              Enter Blasting Details
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="blast-entry-main">
        {/* Tab Navigation */}
        <div className="blast-entry-tabs">
          <div className="blast-entry-tabs-container">
            <nav className="blast-entry-tabs-nav">
              <div className="blast-entry-tabs-list">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`blast-entry-tab ${activeTab === 'overview' ? 'active' : ''}`}
                >
                  <BarChart3 className="blast-entry-tab-icon" />
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('blasting')}
                  className={`blast-entry-tab ${activeTab === 'blasting' ? 'active' : ''}`}
                >
                  <Target className="blast-entry-tab-icon" />
                  Blasting Records
                </button>
                <button
                  onClick={() => setActiveTab('pits')}
                  className={`blast-entry-tab ${activeTab === 'pits' ? 'active' : ''}`}
                >
                  <Mountain className="blast-entry-tab-icon" />
                  Pits & Benches
                </button>
                <button
                  onClick={() => setActiveTab('reports')}
                  className={`blast-entry-tab ${activeTab === 'reports' ? 'active' : ''}`}
                >
                  <Activity className="blast-entry-tab-icon" />
                  Reports
                </button>
              </div>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="blast-entry-content">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="blast-entry-tab-content">
              <div className="blast-entry-section-header">
                <h2 className="blast-entry-section-title">Blasting Overview</h2>
                <p className="blast-entry-section-subtitle">
                  Current blasting statistics and operational summary
                </p>
              </div>

              {/* Statistics Cards */}
              <div className="blast-entry-grid blast-entry-grid-cols-1 blast-entry-md-grid-cols-4 blast-entry-gap-6 blast-entry-mb-6">
                <div className="blast-entry-card">
                  <div className="blast-entry-card-content">
                    <div className="blast-entry-flex blast-entry-items-center blast-entry-gap-3">
                      <div className="blast-entry-stat-icon blast-entry-stat-icon-blue">
                        <Target className="blast-entry-icon" />
                      </div>
                      <div>
                        <p className="blast-entry-text-sm blast-entry-text-gray-600">Total Blasts</p>
                        <p className="blast-entry-text-2xl blast-entry-font-bold">{getTotalBlasts()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="blast-entry-card">
                  <div className="blast-entry-card-content">
                    <div className="blast-entry-flex blast-entry-items-center blast-entry-gap-3">
                      <div className="blast-entry-stat-icon blast-entry-stat-icon-green">
                        <TrendingUp className="blast-entry-icon" />
                      </div>
                      <div>
                        <p className="blast-entry-text-sm blast-entry-text-gray-600">Completed</p>
                        <p className="blast-entry-text-2xl blast-entry-font-bold">{getCompletedBlasts()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="blast-entry-card">
                  <div className="blast-entry-card-content">
                    <div className="blast-entry-flex blast-entry-items-center blast-entry-gap-3">
                      <div className="blast-entry-stat-icon blast-entry-stat-icon-yellow">
                        <Mountain className="blast-entry-icon" />
                      </div>
                      <div>
                        <p className="blast-entry-text-sm blast-entry-text-gray-600">Total Production</p>
                        <p className="blast-entry-text-2xl blast-entry-font-bold">{(getTotalProduction() / 1000000).toFixed(1)}M MT</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="blast-entry-card">
                  <div className="blast-entry-card-content">
                    <div className="blast-entry-flex blast-entry-items-center blast-entry-gap-3">
                      <div className="blast-entry-stat-icon blast-entry-stat-icon-purple">
                        <Activity className="blast-entry-icon" />
                      </div>
                      <div>
                        <p className="blast-entry-text-sm blast-entry-text-gray-600">Avg Production</p>
                        <p className="blast-entry-text-2xl blast-entry-font-bold">{(getAverageProduction() / 1000000).toFixed(1)}M MT</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Blasts */}
              <div className="blast-entry-card">
                <div className="blast-entry-card-header">
                  <h3 className="blast-entry-card-title">Recent Blasting Operations</h3>
                </div>
                <div className="blast-entry-card-content">
                  <div className="blast-entry-table-container">
                    <table className="blast-entry-table">
                      <thead>
                        <tr>
                          <th>Blast No</th>
                          <th>Pit/Bench</th>
                          <th>Date</th>
                          <th>Direction</th>
                          <th>Production (MT)</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {blastingEntries.slice(0, 5).map((blast) => (
                          <tr key={blast.id}>
                            <td className="blast-entry-font-medium">{blast.blastNo}</td>
                            <td>{blast.pitNo} / Bench {blast.benchNo}</td>
                            <td>{new Date(blast.blastingDate).toLocaleDateString()}</td>
                            <td>
                              <div className="blast-entry-flex blast-entry-items-center blast-entry-gap-2">
                                <Compass className="blast-entry-icon-sm" />
                                {blast.siteDirection}
                              </div>
                            </td>
                            <td>{blast.actualProduction.toLocaleString()}</td>
                            <td>
                              <span className={`blast-entry-badge ${
                                blast.status === 'completed' ? 'blast-entry-badge-success' :
                                blast.status === 'executed' ? 'blast-entry-badge-warning' :
                                blast.status === 'planned' ? 'blast-entry-badge-secondary' :
                                'blast-entry-badge-error'
                              }`}>
                                {blast.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Blasting Records Tab */}
          {activeTab === 'blasting' && (
            <div className="blast-entry-tab-content">
              <div className="blast-entry-section-header">
                <h2 className="blast-entry-section-title">Blasting Records</h2>
                <p className="blast-entry-section-subtitle">
                  View and manage all blasting operations
                </p>
              </div>

              {/* Filters */}
              <div className="blast-entry-filters">
                <div className="blast-entry-search-container">
                  <Search className="blast-entry-search-icon" />
                  <input
                    type="text"
                    placeholder="Search by blast no, pit, bench..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="blast-entry-search-input"
                  />
                </div>
                <select
                  value={filterPit}
                  onChange={(e) => setFilterPit(e.target.value)}
                  className="blast-entry-select"
                >
                  <option value="all">All Pits</option>
                  {pits.map(pit => (
                    <option key={pit.id} value={pit.pitNo}>{pit.pitNo}</option>
                  ))}
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="blast-entry-select"
                >
                  <option value="all">All Status</option>
                  <option value="planned">Planned</option>
                  <option value="executed">Executed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Blasting Table */}
              <div className="blast-entry-table-container">
                <table className="blast-entry-table">
                  <thead>
                    <tr>
                      <th>Blast No</th>
                      <th>Pit No</th>
                      <th>Bench No</th>
                      <th>Site Dir</th>
                      <th>Blast Date</th>
                      <th>Hole Dia (mm)</th>
                      <th>Hole Depth (m)</th>
                      <th>Bench Ht (m)</th>
                      <th>Burden (m)</th>
                      <th>Spacing (m)</th>
                      <th>No of Rows</th>
                      <th>Holes/Row</th>
                      <th>Gravity</th>
                      <th>Total Holes</th>
                      <th>Exp Prod (MT)</th>
                      <th>Act Prod (MT)</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBlastingEntries.map((blast) => (
                      <tr key={blast.id}>
                        <td className="blast-entry-font-medium">{blast.blastNo}</td>
                        <td>{blast.pitNo}</td>
                        <td>{blast.benchNo}</td>
                        <td>
                          <div className="blast-entry-flex blast-entry-items-center blast-entry-gap-1">
                            <Compass className="blast-entry-icon-sm" />
                            {blast.siteDirection}
                          </div>
                        </td>
                        <td>{blast.blastingDate ? new Date(blast.blastingDate).toLocaleDateString() : '-'}</td>
                        <td>{blast.holeDiameter || '-'}</td>
                        <td>{blast.holeDepth || '-'}</td>
                        <td>{blast.benchHeight || '-'}</td>
                        <td>{blast.burden || '-'}</td>
                        <td>{blast.spacing || '-'}</td>
                        <td>{blast.numberOfRows || '-'}</td>
                        <td>{blast.numberOfHolesPerRow || '-'}</td>
                        <td>{blast.gravity || '-'}</td>
                        <td>{blast.totalNumberOfHoles || '-'}</td>
                        <td>{blast.expectedProduction ? blast.expectedProduction.toLocaleString() : '-'}</td>
                        <td>{blast.actualProduction ? blast.actualProduction.toLocaleString() : '-'}</td>
                        <td>
                          <span className={`blast-entry-badge ${
                            blast.status === 'completed' ? 'blast-entry-badge-success' :
                            blast.status === 'executed' ? 'blast-entry-badge-warning' :
                            blast.status === 'planned' ? 'blast-entry-badge-secondary' :
                            'blast-entry-badge-error'
                          }`}>
                            {blast.status}
                          </span>
                        </td>
                        <td>
                          <div className="blast-entry-flex blast-entry-gap-2">
                            <button 
                              className="blast-entry-btn-icon"
                              onClick={() => handleEditBlast(blast)}
                            >
                              <Edit3 className="blast-entry-icon-sm" />
                            </button>
                            <button className="blast-entry-btn-icon blast-entry-btn-icon-danger">
                              <Trash2 className="blast-entry-icon-sm" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pits & Benches Tab */}
          {activeTab === 'pits' && (
            <div className="blast-entry-tab-content">
              <div className="blast-entry-section-header">
                <h2 className="blast-entry-section-title">Pits & Benches</h2>
                <p className="blast-entry-section-subtitle">
                  Manage mining pits and bench information
                </p>
              </div>

              <div className="blast-entry-grid blast-entry-grid-cols-1 blast-entry-md-grid-cols-2 blast-entry-gap-6">
                {/* Pits Section */}
                <div className="blast-entry-card">
                  <div className="blast-entry-card-header">
                    <h3 className="blast-entry-card-title">Active Pits</h3>
                  </div>
                  <div className="blast-entry-card-content">
                    <div className="blast-entry-space-y-4">
                      {pits.map((pit) => (
                        <div key={pit.id} className="blast-entry-flex blast-entry-justify-between blast-entry-items-center blast-entry-p-3 blast-entry-border blast-entry-rounded">
                          <div>
                            <div className="blast-entry-font-medium">{pit.pitNo}</div>
                            <div className="blast-entry-text-sm blast-entry-text-gray-600">{pit.name}</div>
                            <div className="blast-entry-text-xs blast-entry-text-gray-500">{pit.location}</div>
                          </div>
                          <span className={`blast-entry-badge ${
                            pit.status === 'active' ? 'blast-entry-badge-success' :
                            pit.status === 'inactive' ? 'blast-entry-badge-warning' :
                            'blast-entry-badge-error'
                          }`}>
                            {pit.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Benches Section */}
                <div className="blast-entry-card">
                  <div className="blast-entry-card-header">
                    <h3 className="blast-entry-card-title">Bench Information</h3>
                  </div>
                  <div className="blast-entry-card-content">
                    <div className="blast-entry-space-y-4">
                      {benches.map((bench) => (
                        <div key={bench.id} className="blast-entry-flex blast-entry-justify-between blast-entry-items-center blast-entry-p-3 blast-entry-border blast-entry-rounded">
                          <div>
                            <div className="blast-entry-font-medium">Bench {bench.benchNo}</div>
                            <div className="blast-entry-text-sm blast-entry-text-gray-600">{bench.pitNo}</div>
                            <div className="blast-entry-text-xs blast-entry-text-gray-500">
                              Elevation: {bench.elevation}m | Area: {bench.area}m²
                            </div>
                          </div>
                          <span className={`blast-entry-badge ${
                            bench.status === 'active' ? 'blast-entry-badge-success' :
                            bench.status === 'completed' ? 'blast-entry-badge-secondary' :
                            'blast-entry-badge-warning'
                          }`}>
                            {bench.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="blast-entry-tab-content">
              <div className="blast-entry-section-header">
                <h2 className="blast-entry-section-title">Blasting Reports</h2>
                <p className="blast-entry-section-subtitle">
                  Detailed reports and analysis of blasting operations
                </p>
              </div>

              {/* Report Cards */}
              <div className="blast-entry-grid blast-entry-grid-cols-1 blast-entry-md-grid-cols-3 blast-entry-gap-6">
                <div className="blast-entry-card">
                  <div className="blast-entry-card-header">
                    <h3 className="blast-entry-card-title">Production Summary</h3>
                  </div>
                  <div className="blast-entry-card-content">
                    <div className="blast-entry-space-y-3">
                      <div className="blast-entry-flex blast-entry-justify-between">
                        <span className="blast-entry-text-sm blast-entry-text-gray-600">Total Expected</span>
                        <span className="blast-entry-font-medium">
                          {blastingEntries.reduce((sum, b) => sum + b.expectedProduction, 0).toLocaleString()} MT
                        </span>
                      </div>
                      <div className="blast-entry-flex blast-entry-justify-between">
                        <span className="blast-entry-text-sm blast-entry-text-gray-600">Total Actual</span>
                        <span className="blast-entry-font-medium">
                          {blastingEntries.reduce((sum, b) => sum + b.actualProduction, 0).toLocaleString()} MT
                        </span>
                      </div>
                      <div className="blast-entry-flex blast-entry-justify-between">
                        <span className="blast-entry-text-sm blast-entry-text-gray-600">Efficiency</span>
                        <span className="blast-entry-font-medium blast-entry-text-green-600">
                          {(
                            (blastingEntries.reduce((sum, b) => sum + b.actualProduction, 0) / 
                             blastingEntries.reduce((sum, b) => sum + b.expectedProduction, 0)) * 100
                          ).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="blast-entry-card">
                  <div className="blast-entry-card-header">
                    <h3 className="blast-entry-card-title">Blast Distribution</h3>
                  </div>
                  <div className="blast-entry-card-content">
                    <div className="blast-entry-space-y-3">
                      {['planned', 'executed', 'completed', 'cancelled'].map(status => {
                        const count = blastingEntries.filter(b => b.status === status).length;
                        return (
                          <div key={status} className="blast-entry-flex blast-entry-justify-between">
                            <span className="blast-entry-text-sm blast-entry-text-gray-600 blast-entry-capitalize">{status}</span>
                            <span className="blast-entry-font-medium">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="blast-entry-card">
                  <div className="blast-entry-card-header">
                    <h3 className="blast-entry-card-title">Pit-wise Summary</h3>
                  </div>
                  <div className="blast-entry-card-content">
                    <div className="blast-entry-space-y-3">
                      {pits.map(pit => {
                        const pitBlasts = blastingEntries.filter(b => b.pitNo === pit.pitNo);
                        const pitProduction = pitBlasts.reduce((sum, b) => sum + b.actualProduction, 0);
                        return (
                          <div key={pit.id} className="blast-entry-flex blast-entry-justify-between">
                            <span className="blast-entry-text-sm blast-entry-text-gray-600">{pit.pitNo}</span>
                            <span className="blast-entry-font-medium">{pitProduction.toLocaleString()} MT</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Blast Entry Modal */}
      {showBlastModal && (
        <div className="blast-entry-modal-overlay" onClick={() => setShowBlastModal(false)}>
          <div className="blast-entry-modal blast-entry-modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="blast-entry-modal-header">
              <h3 className="blast-entry-modal-title">
                {editingBlast ? 'Modify Blasting Details' : 'Enter Blasting Details'}
              </h3>
              <button
                onClick={() => setShowBlastModal(false)}
                className="blast-entry-modal-close"
              >
                ×
              </button>
            </div>
            <div className="blast-entry-modal-content">
              <div className="blast-entry-form-grid">
                {/* Row 1 */}
                <div>
                  <label className="blast-entry-label">Blast No</label>
                  <input
                    type="text"
                    value={blastForm.blastNo}
                    onChange={(e) => setBlastForm({ ...blastForm, blastNo: e.target.value })}
                    className="blast-entry-input"
                    placeholder="Enter blast number"
                  />
                </div>
                <div>
                  <label className="blast-entry-label">Select Bench No</label>
                  <select
                    value={blastForm.benchNo}
                    onChange={(e) => setBlastForm({ ...blastForm, benchNo: e.target.value })}
                    className="blast-entry-select"
                  >
                    <option value="">Select Bench</option>
                    {benches.filter(b => !blastForm.pitNo || b.pitNo === blastForm.pitNo).map(bench => (
                      <option key={bench.id} value={bench.benchNo}>
                        Bench {bench.benchNo} ({bench.pitNo})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="blast-entry-label">PIT No</label>
                  <select
                    value={blastForm.pitNo}
                    onChange={(e) => setBlastForm({ ...blastForm, pitNo: e.target.value, benchNo: '' })}
                    className="blast-entry-select"
                  >
                    <option value="">Select Pit</option>
                    {pits.map(pit => (
                      <option key={pit.id} value={pit.pitNo}>
                        {pit.pitNo} - {pit.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="blast-entry-label">Site Direction</label>
                  <select
                    value={blastForm.siteDirection}
                    onChange={(e) => setBlastForm({ ...blastForm, siteDirection: e.target.value as BlastingEntry['siteDirection'] })}
                    className="blast-entry-select"
                  >
                    <option value="NORTH">NORTH</option>
                    <option value="SOUTH">SOUTH</option>
                    <option value="EAST">EAST</option>
                    <option value="WEST">WEST</option>
                    <option value="NORTHEAST">NORTHEAST</option>
                    <option value="NORTHWEST">NORTHWEST</option>
                    <option value="SOUTHEAST">SOUTHEAST</option>
                    <option value="SOUTHWEST">SOUTHWEST</option>
                  </select>
                </div>

                {/* Row 2 */}
                <div>
                  <label className="blast-entry-label">Blasting Date</label>
                  <input
                    type="date"
                    value={blastForm.blastingDate}
                    onChange={(e) => setBlastForm({ ...blastForm, blastingDate: e.target.value })}
                    className="blast-entry-input"
                  />
                </div>
                <div>
                  <label className="blast-entry-label">Hole Diameter in MM</label>
                  <input
                    type="number"
                    value={blastForm.holeDiameter}
                    onChange={(e) => setBlastForm({ ...blastForm, holeDiameter: parseFloat(e.target.value) || 0 })}
                    className="blast-entry-input"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="blast-entry-label">Hole Depth in Mtrs</label>
                  <input
                    type="number"
                    value={blastForm.holeDepth}
                    onChange={(e) => setBlastForm({ ...blastForm, holeDepth: parseFloat(e.target.value) || 0 })}
                    className="blast-entry-input"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="blast-entry-label">Bench Height in Mtrs</label>
                  <input
                    type="number"
                    value={blastForm.benchHeight}
                    onChange={(e) => setBlastForm({ ...blastForm, benchHeight: parseFloat(e.target.value) || 0 })}
                    className="blast-entry-input"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>

                {/* Row 3 */}
                <div>
                  <label className="blast-entry-label">Burden in Mtrs</label>
                  <input
                    type="number"
                    value={blastForm.burden}
                    onChange={(e) => setBlastForm({ ...blastForm, burden: parseFloat(e.target.value) || 0 })}
                    className="blast-entry-input"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="blast-entry-label">Spacing in Mtrs</label>
                  <input
                    type="number"
                    value={blastForm.spacing}
                    onChange={(e) => setBlastForm({ ...blastForm, spacing: parseFloat(e.target.value) || 0 })}
                    className="blast-entry-input"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="blast-entry-label">Number of Rows</label>
                  <input
                    type="number"
                    value={blastForm.numberOfRows}
                    onChange={(e) => setBlastForm({ ...blastForm, numberOfRows: parseInt(e.target.value) || 0 })}
                    className="blast-entry-input"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="blast-entry-label">Number of Holes/Row</label>
                  <input
                    type="number"
                    value={blastForm.numberOfHolesPerRow}
                    onChange={(e) => setBlastForm({ ...blastForm, numberOfHolesPerRow: parseInt(e.target.value) || 0 })}
                    className="blast-entry-input"
                    placeholder="0"
                  />
                </div>

                {/* Row 4 */}
                <div>
                  <label className="blast-entry-label">Gravity</label>
                  <input
                    type="number"
                    value={blastForm.gravity}
                    onChange={(e) => setBlastForm({ ...blastForm, gravity: parseFloat(e.target.value) || 0 })}
                    className="blast-entry-input"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="blast-entry-label">Total No of Holes</label>
                  <input
                    type="number"
                    value={blastForm.numberOfRows * blastForm.numberOfHolesPerRow}
                    readOnly
                    className="blast-entry-input blast-entry-input-readonly"
                  />
                </div>
                <div>
                  <label className="blast-entry-label">Exp Prod (MT)</label>
                  <input
                    type="number"
                    value={blastForm.expectedProduction}
                    onChange={(e) => setBlastForm({ ...blastForm, expectedProduction: parseFloat(e.target.value) || 0 })}
                    className="blast-entry-input"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="blast-entry-label">Act Prod (MT)</label>
                  <input
                    type="number"
                    value={blastForm.actualProduction}
                    onChange={(e) => setBlastForm({ ...blastForm, actualProduction: parseFloat(e.target.value) || 0 })}
                    className="blast-entry-input"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>

                {/* Full width remarks */}
                <div className="blast-entry-form-group-full">
                  <label className="blast-entry-label">Remarks</label>
                  <textarea
                    value={blastForm.remarks}
                    onChange={(e) => setBlastForm({ ...blastForm, remarks: e.target.value })}
                    className="blast-entry-textarea"
                    placeholder="Enter any remarks..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
            <div className="blast-entry-modal-footer">
              <button
                onClick={() => setShowBlastModal(false)}
                className="blast-entry-btn blast-entry-btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBlast}
                className="blast-entry-btn blast-entry-btn-primary"
                disabled={!blastForm.blastNo || !blastForm.pitNo || !blastForm.benchNo}
              >
                <Save className="blast-entry-icon" />
                {editingBlast ? 'Modify Blasting Details' : 'Save Blasting Details'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
