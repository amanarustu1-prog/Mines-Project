import React, { useState } from 'react';
import './DailyCheckListMaster1.css';

// Icon components
const CheckSquare = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Settings = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ChevronLeft = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const Search = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const Calendar = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const Eye = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const FileText = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5l-5-5 4-4 5 5v6a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h7l5 5v11z" />
  </svg>
);

const Plus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

// Types
interface EquipmentGroup {
  id: string;
  name: string;
  equipment: Equipment[];
}

interface Equipment {
  id: string;
  name: string;
  tasks: CheckListTask[];
}

interface CheckListTask {
  id: string;
  mainTask: string;
  taskName: string;
  frequency: number;
  isCompleted?: boolean;
  actionTaken?: string;
  remarks?: string;
}

interface InspectionRecord {
  id: string;
  date: string;
  shiftForemanName: string;
  groupId: string;
  equipmentId: string;
  tasks: TaskInspection[];
}

interface TaskInspection {
  taskId: string;
  status: 'yes' | 'no' | '';
  actionTaken: string;
  remarks: string;
}

export default function DailyCheckListMaster1() {
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [shiftForemanName, setShiftForemanName] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [taskFrequency, setTaskFrequency] = useState(120);
  const [showInspectionSheet, setShowInspectionSheet] = useState(false);

  // Sample data
  const [equipmentGroups] = useState<EquipmentGroup[]>([
    {
      id: 'group-1',
      name: 'MACHINERY',
      equipment: [
        {
          id: 'eq-1',
          name: 'Excavator-001',
          tasks: [
            {
              id: 'task-1',
              mainTask: 'Engine Check',
              taskName: 'Oil Level Inspection',
              frequency: 120
            },
            {
              id: 'task-2',
              mainTask: 'Hydraulic System',
              taskName: 'Pressure Test',
              frequency: 240
            },
            {
              id: 'task-3',
              mainTask: 'Safety Equipment',
              taskName: 'Warning Lights Check',
              frequency: 360
            },
            {
              id: 'task-4',
              mainTask: 'Brake System',
              taskName: 'Brake Fluid Check',
              frequency: 120
            }
          ]
        },
        {
          id: 'eq-2',
          name: 'Dump Truck-001',
          tasks: [
            {
              id: 'task-5',
              mainTask: 'Tire Inspection',
              taskName: 'Tire Pressure & Condition',
              frequency: 240
            },
            {
              id: 'task-6',
              mainTask: 'Engine Check',
              taskName: 'Oil & Coolant Level',
              frequency: 120
            }
          ]
        }
      ]
    },
    {
      id: 'group-2',
      name: 'VEHICLES',
      equipment: [
        {
          id: 'eq-3',
          name: 'Service Vehicle-001',
          tasks: [
            {
              id: 'task-7',
              mainTask: 'Battery Check',
              taskName: 'Battery Voltage Test',
              frequency: 120
            }
          ]
        }
      ]
    }
  ]);

  const [inspectionRecords, setInspectionRecords] = useState<InspectionRecord[]>([]);
  const [currentInspection, setCurrentInspection] = useState<Partial<InspectionRecord>>({
    date: selectedDate,
    shiftForemanName: '',
    groupId: '',
    equipmentId: '',
    tasks: []
  });

  // Helper functions
  const getSelectedGroupData = () => equipmentGroups.find(g => g.id === selectedGroup);
  const getSelectedEquipmentData = () => {
    const group = getSelectedGroupData();
    return group?.equipment.find(eq => eq.id === selectedEquipment);
  };

  const getCurrentEquipmentIndex = () => {
    const group = getSelectedGroupData();
    return group?.equipment.findIndex(eq => eq.id === selectedEquipment) ?? -1;
  };

  const getTotalEquipmentCount = () => {
    const group = getSelectedGroupData();
    return group?.equipment.length ?? 0;
  };

  // Navigation functions
  const goToPreviousEquipment = () => {
    const group = getSelectedGroupData();
    if (group && group.equipment.length > 0) {
      const currentIndex = getCurrentEquipmentIndex();
      const previousIndex = currentIndex > 0 ? currentIndex - 1 : group.equipment.length - 1;
      setSelectedEquipment(group.equipment[previousIndex].id);
    }
  };

  const goToNextEquipment = () => {
    const group = getSelectedGroupData();
    if (group && group.equipment.length > 0) {
      const currentIndex = getCurrentEquipmentIndex();
      const nextIndex = currentIndex < group.equipment.length - 1 ? currentIndex + 1 : 0;
      setSelectedEquipment(group.equipment[nextIndex].id);
    }
  };

  // Handle inspection sheet
  const handleShowInspectionSheet = () => {
    if (selectedGroup && selectedEquipment && shiftForemanName) {
      const equipment = getSelectedEquipmentData();
      if (equipment) {
        setCurrentInspection({
          id: `inspection-${Date.now()}`,
          date: selectedDate,
          shiftForemanName,
          groupId: selectedGroup,
          equipmentId: selectedEquipment,
          tasks: equipment.tasks.map(task => ({
            taskId: task.id,
            status: '',
            actionTaken: '',
            remarks: ''
          }))
        });
        setShowInspectionSheet(true);
      }
    } else {
      alert('Please select group, equipment and enter shift foreman name');
    }
  };

  // Handle task inspection update
  const updateTaskInspection = (taskId: string, field: keyof TaskInspection, value: string) => {
    setCurrentInspection(prev => ({
      ...prev,
      tasks: prev.tasks?.map(task => 
        task.taskId === taskId 
          ? { ...task, [field]: value }
          : task
      ) || []
    }));
  };

  // Save inspection record
  const saveInspectionRecord = () => {
    if (currentInspection.id) {
      setInspectionRecords(prev => [...prev, currentInspection as InspectionRecord]);
      setShowInspectionSheet(false);
      setCurrentInspection({
        date: selectedDate,
        shiftForemanName: '',
        groupId: '',
        equipmentId: '',
        tasks: []
      });
      alert('Inspection record saved successfully!');
    }
  };

  // Filter tasks based on search
  const filteredTasks = () => {
    const equipment = getSelectedEquipmentData();
    if (!equipment) return [];
    
    return equipment.tasks.filter(task =>
      task.mainTask.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.taskName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="daily-check-list-master-1">
      {/* Header */}
      <div className="daily-check-list-master-1-header">
        <div className="daily-check-list-master-1-header-content">
          <div className="daily-check-list-master-1-title-section">
            <CheckSquare className="daily-check-list-master-1-header-icon" />
            <div>
              <h1 className="daily-check-list-master-1-title">Daily Check List Master</h1>
              <p className="daily-check-list-master-1-subtitle">
                Manage equipment inspection tasks and schedules
              </p>
            </div>
          </div>
          <div className="daily-check-list-master-1-header-actions">
            <button 
              className="daily-check-list-master-1-btn daily-check-list-master-1-btn-primary"
              onClick={handleShowInspectionSheet}
            >
              <FileText className="daily-check-list-master-1-icon" />
              Inspection Sheet
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="daily-check-list-master-1-main">
        <div className="daily-check-list-master-1-content">
          <div className="daily-check-list-master-1-tab-content">
            
            {/* Equipment Selection Form */}
            <div className="daily-check-list-master-1-form-section">
              <h3 className="daily-check-list-master-1-form-title">
                <Settings className="daily-check-list-master-1-icon" />
                Equipment Selection
              </h3>
              
              <div className="daily-check-list-master-1-form-grid">
                <div className="daily-check-list-master-1-form-group">
                  <label className="daily-check-list-master-1-label">Group:</label>
                  <select 
                    className="daily-check-list-master-1-select"
                    value={selectedGroup}
                    onChange={(e) => {
                      setSelectedGroup(e.target.value);
                      setSelectedEquipment('');
                    }}
                  >
                    <option value="">Select Group</option>
                    {equipmentGroups.map(group => (
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="daily-check-list-master-1-form-group">
                  <label className="daily-check-list-master-1-label">Date:</label>
                  <input
                    type="date"
                    className="daily-check-list-master-1-input"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>

                <div className="daily-check-list-master-1-form-group">
                  <label className="daily-check-list-master-1-label">Shift Foreman Name:</label>
                  <input
                    type="text"
                    className="daily-check-list-master-1-input"
                    value={shiftForemanName}
                    onChange={(e) => setShiftForemanName(e.target.value)}
                    placeholder="Enter shift foreman name"
                  />
                </div>
              </div>
            </div>

            {/* Equipment Navigation */}
            {selectedGroup && (
              <div className="daily-check-list-master-1-form-section">
                <h3 className="daily-check-list-master-1-form-title">
                  Equipment Navigation
                </h3>
                
                <div className="daily-check-list-master-1-equipment-selector">
                  <button
                    className="daily-check-list-master-1-btn-icon"
                    onClick={goToPreviousEquipment}
                    disabled={!selectedEquipment}
                  >
                    <ChevronLeft className="daily-check-list-master-1-icon" />
                  </button>
                  
                  <select
                    className="daily-check-list-master-1-select"
                    value={selectedEquipment}
                    onChange={(e) => setSelectedEquipment(e.target.value)}
                  >
                    <option value="">Select Equipment</option>
                    {getSelectedGroupData()?.equipment.map(equipment => (
                      <option key={equipment.id} value={equipment.id}>
                        {equipment.name}
                      </option>
                    ))}
                  </select>
                  
                  <button
                    className="daily-check-list-master-1-btn-icon"
                    onClick={goToNextEquipment}
                    disabled={!selectedEquipment}
                  >
                    <ChevronRight className="daily-check-list-master-1-icon" />
                  </button>
                  
                  {selectedEquipment && (
                    <span className="daily-check-list-master-1-pagination-info">
                      {getCurrentEquipmentIndex() + 1} of {getTotalEquipmentCount()}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Task Management */}
            {selectedEquipment && (
              <div className="daily-check-list-master-1-form-section">
                <h3 className="daily-check-list-master-1-form-title">
                  Task Management
                </h3>
                
                <div className="daily-check-list-master-1-task-controls">
                  <div className="daily-check-list-master-1-search-container">
                    <Search className="daily-check-list-master-1-search-icon" />
                    <input
                      type="text"
                      className="daily-check-list-master-1-search-input"
                      placeholder="Find tasks..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="daily-check-list-master-1-form-group">
                    <label className="daily-check-list-master-1-label">Select Task/Frequency:</label>
                    <select
                      className="daily-check-list-master-1-select daily-check-list-master-1-select-sm"
                      value={taskFrequency}
                      onChange={(e) => setTaskFrequency(Number(e.target.value))}
                    >
                      <option value={120}>120 hours</option>
                      <option value={240}>240 hours</option>
                      <option value={360}>360 hours</option>
                    </select>
                  </div>
                  
                  <button className="daily-check-list-master-1-btn daily-check-list-master-1-btn-secondary">
                    Next
                  </button>
                </div>

                {/* Tasks Table */}
                <div className="daily-check-list-master-1-table-container">
                  <table className="daily-check-list-master-1-table">
                    <thead>
                      <tr>
                        <th>SNo</th>
                        <th>Main Task</th>
                        <th>Task Name</th>
                        <th>Yes/No</th>
                        <th>Action Taken</th>
                        <th>Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTasks().map((task, index) => (
                        <tr key={task.id}>
                          <td>{index + 1}</td>
                          <td>{task.mainTask}</td>
                          <td>{task.taskName}</td>
                          <td>
                            <select className="daily-check-list-master-1-select daily-check-list-master-1-select-sm">
                              <option value="">Select</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                          </td>
                          <td>
                            <input
                              type="text"
                              className="daily-check-list-master-1-input daily-check-list-master-1-input-sm"
                              placeholder="Action taken"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="daily-check-list-master-1-input daily-check-list-master-1-input-sm"
                              placeholder="Remarks"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Inspection Sheet Modal */}
      {showInspectionSheet && (
        <div className="daily-check-list-master-1-modal-overlay" onClick={() => setShowInspectionSheet(false)}>
          <div className="daily-check-list-master-1-modal daily-check-list-master-1-modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="daily-check-list-master-1-modal-header">
              <h3 className="daily-check-list-master-1-modal-title">
                Daily Inspection Sheet
              </h3>
              <button 
                className="daily-check-list-master-1-modal-close"
                onClick={() => setShowInspectionSheet(false)}
              >
                ×
              </button>
            </div>
            
            <div className="daily-check-list-master-1-modal-content">
              <div className="daily-check-list-master-1-inspection-header">
                <div className="daily-check-list-master-1-inspection-info">
                  <p><strong>Date:</strong> {selectedDate}</p>
                  <p><strong>Shift Foreman:</strong> {shiftForemanName}</p>
                  <p><strong>Group:</strong> {getSelectedGroupData()?.name}</p>
                  <p><strong>Equipment:</strong> {getSelectedEquipmentData()?.name}</p>
                </div>
              </div>
              
              <div className="daily-check-list-master-1-inspection-tasks">
                <h4>Inspection Tasks</h4>
                {currentInspection.tasks?.map((taskInspection, index) => {
                  const task = getSelectedEquipmentData()?.tasks.find(t => t.id === taskInspection.taskId);
                  return (
                    <div key={taskInspection.taskId} className="daily-check-list-master-1-form-group">
                      <h5>{task?.mainTask} - {task?.taskName}</h5>
                      <div className="daily-check-list-master-1-form-grid">
                        <div className="daily-check-list-master-1-form-group">
                          <label className="daily-check-list-master-1-label">Status:</label>
                          <select
                            className="daily-check-list-master-1-select"
                            value={taskInspection.status}
                            onChange={(e) => updateTaskInspection(taskInspection.taskId, 'status', e.target.value)}
                          >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </div>
                        <div className="daily-check-list-master-1-form-group">
                          <label className="daily-check-list-master-1-label">Action Taken:</label>
                          <input
                            type="text"
                            className="daily-check-list-master-1-input"
                            value={taskInspection.actionTaken}
                            onChange={(e) => updateTaskInspection(taskInspection.taskId, 'actionTaken', e.target.value)}
                            placeholder="Action taken"
                          />
                        </div>
                        <div className="daily-check-list-master-1-form-group">
                          <label className="daily-check-list-master-1-label">Remarks:</label>
                          <input
                            type="text"
                            className="daily-check-list-master-1-input"
                            value={taskInspection.remarks}
                            onChange={(e) => updateTaskInspection(taskInspection.taskId, 'remarks', e.target.value)}
                            placeholder="Remarks"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="daily-check-list-master-1-modal-footer">
              <button 
                className="daily-check-list-master-1-btn daily-check-list-master-1-btn-secondary"
                onClick={() => setShowInspectionSheet(false)}
              >
                Cancel
              </button>
              <button 
                className="daily-check-list-master-1-btn daily-check-list-master-1-btn-primary"
                onClick={saveInspectionRecord}
              >
                Save Inspection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
