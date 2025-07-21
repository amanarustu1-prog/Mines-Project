import React, { useState } from 'react';
import './DailyCheckList.css';

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

const Trash2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 7-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const ChevronDown = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const X = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Types
interface EquipmentGroup {
  id: string;
  name: string;
  description: string;
}

interface Equipment {
  id: string;
  name: string;
  groupId: string;
  description: string;
  status: 'active' | 'inactive';
}

interface Task {
  id: string;
  name: string;
  action: string;
  frequency: number;
  equipmentId: string;
}

export default function DailyCheckList() {
  // State for forms
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [newEquipmentName, setNewEquipmentName] = useState('');
  const [taskName, setTaskName] = useState('');
  const [taskAction, setTaskAction] = useState('');
  const [taskFrequency, setTaskFrequency] = useState(120);
  const [showEquipmentModal, setShowEquipmentModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Sample data
  const [equipmentGroups] = useState<EquipmentGroup[]>([
    {
      id: 'group-1',
      name: 'MACHINERY',
      description: 'Heavy machinery and equipment'
    },
    {
      id: 'group-2',
      name: 'VEHICLES',
      description: 'Transport and utility vehicles'
    },
    {
      id: 'group-3',
      name: 'TOOLS',
      description: 'Hand tools and small equipment'
    }
  ]);

  const [equipment, setEquipment] = useState<Equipment[]>([
    {
      id: 'eq-1',
      name: 'DDDDDA',
      groupId: 'group-1',
      description: 'Primary excavator for mining operations',
      status: 'active'
    },
    {
      id: 'eq-2',
      name: 'Dump Truck 001',
      groupId: 'group-2',
      description: 'Heavy duty dump truck',
      status: 'active'
    },
    {
      id: 'eq-3',
      name: 'Hydraulic Drill',
      groupId: 'group-1',
      description: 'High-power drilling equipment',
      status: 'active'
    }
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 'task-1',
      name: 'Engine Oil Check',
      action: 'Check oil level and quality',
      frequency: 120,
      equipmentId: 'eq-1'
    },
    {
      id: 'task-2',
      name: 'Hydraulic Pressure Test',
      action: 'Test and verify hydraulic pressure',
      frequency: 240,
      equipmentId: 'eq-1'
    },
    {
      id: 'task-3',
      name: 'Brake System Inspection',
      action: 'Inspect brake pads and fluid',
      frequency: 360,
      equipmentId: 'eq-2'
    }
  ]);

  // Helper functions
  const getGroupById = (groupId: string) => equipmentGroups.find(g => g.id === groupId);
  const getEquipmentByGroup = (groupId: string) => equipment.filter(eq => eq.groupId === groupId);
  const getTasksByEquipment = (equipmentId: string) => tasks.filter(t => t.equipmentId === equipmentId);

  // Handle adding new equipment
  const handleAddEquipment = () => {
    if (newEquipmentName && selectedGroup) {
      const newEquipment: Equipment = {
        id: `eq-${Date.now()}`,
        name: newEquipmentName,
        groupId: selectedGroup,
        description: `${newEquipmentName} equipment`,
        status: 'active'
      };
      
      setEquipment([...equipment, newEquipment]);
      setNewEquipmentName('');
      setSelectedEquipment(newEquipment.id);
    }
  };

  // Handle saving task
  const handleSaveTask = () => {
    if (taskName && taskAction && selectedEquipment) {
      if (editingTask) {
        // Update existing task
        setTasks(tasks.map(t => 
          t.id === editingTask.id 
            ? { ...t, name: taskName, action: taskAction, frequency: taskFrequency }
            : t
        ));
        setEditingTask(null);
      } else {
        // Add new task
        const newTask: Task = {
          id: `task-${Date.now()}`,
          name: taskName,
          action: taskAction,
          frequency: taskFrequency,
          equipmentId: selectedEquipment
        };
        setTasks([...tasks, newTask]);
      }
      
      // Reset form
      setTaskName('');
      setTaskAction('');
      setTaskFrequency(120);
      setShowTaskModal(false);
    }
  };

  // Handle equipment modification
  const handleModifyEquipment = (equipment: Equipment) => {
    setEditingEquipment(equipment);
    setShowEquipmentModal(true);
  };

  // Handle task editing
  const handleEditTask = (task: Task) => {
    setTaskName(task.name);
    setTaskAction(task.action);
    setTaskFrequency(task.frequency);
    setEditingTask(task);
    setShowTaskModal(true);
  };

  // Handle task deletion
  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  return (
    <div className="daily-check-list">
      {/* Header */}
      <div className="daily-check-list-header">
        <div className="daily-check-list-header-content">
          <div className="daily-check-list-title-section">
            <CheckSquare className="daily-check-list-header-icon" />
            <div>
              <h1 className="daily-check-list-title">Daily Check List Master</h1>
              <p className="daily-check-list-subtitle">Manage equipment check lists and tasks</p>
            </div>
          </div>
          <div className="daily-check-list-header-actions">
            <button 
              className="daily-check-list-btn daily-check-list-btn-primary"
              onClick={() => setShowEquipmentModal(true)}
            >
              <Plus className="daily-check-list-icon" />
              Add New Equipment
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="daily-check-list-main">
        <div className="daily-check-list-content">
          <div className="daily-check-list-tab-content">
            
            {/* Equipment Selection Section */}
            <div className="daily-check-list-form-section">
              <div className="daily-check-list-form-title">
                <Settings className="daily-check-list-icon" />
                Equipment Selection
              </div>
              
              <div className="daily-check-list-form-grid">
                <div className="daily-check-list-form-group">
                  <label className="daily-check-list-label">Select Group:</label>
                  <select
                    className="daily-check-list-select"
                    value={selectedGroup}
                    onChange={(e) => {
                      setSelectedGroup(e.target.value);
                      setSelectedEquipment(''); // Reset equipment selection
                    }}
                  >
                    <option value="">Select Group</option>
                    {equipmentGroups.map(group => (
                      <option key={group.id} value={group.id}>{group.name}</option>
                    ))}
                  </select>
                </div>

                <div className="daily-check-list-form-group">
                  <label className="daily-check-list-label">Select Equipment:</label>
                  <select
                    className="daily-check-list-select"
                    value={selectedEquipment}
                    onChange={(e) => setSelectedEquipment(e.target.value)}
                    disabled={!selectedGroup}
                  >
                    <option value="">Select Equipment</option>
                    {selectedGroup && getEquipmentByGroup(selectedGroup).map(eq => (
                      <option key={eq.id} value={eq.id}>{eq.name}</option>
                    ))}
                  </select>
                </div>

                <div className="daily-check-list-form-group">
                  <label className="daily-check-list-label">New Equipment Name:</label>
                  <div className="daily-check-list-form-row">
                    <input
                      type="text"
                      className="daily-check-list-input"
                      value={newEquipmentName}
                      onChange={(e) => setNewEquipmentName(e.target.value)}
                      placeholder="Enter new equipment name"
                    />
                    <button 
                      className="daily-check-list-btn daily-check-list-btn-success"
                      onClick={handleAddEquipment}
                      disabled={!newEquipmentName || !selectedGroup}
                    >
                      <Plus className="daily-check-list-icon" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Task Entry Section */}
            <div className="daily-check-list-form-section">
              <div className="daily-check-list-form-title">
                Task Management
              </div>
              
              <div className="daily-check-list-form-grid">
                <div className="daily-check-list-form-group">
                  <label className="daily-check-list-label">Enter Task Name:</label>
                  <input
                    type="text"
                    className="daily-check-list-input"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="Enter task name"
                  />
                </div>

                <div className="daily-check-list-form-group">
                  <label className="daily-check-list-label">Enter Action:</label>
                  <textarea
                    className="daily-check-list-textarea"
                    value={taskAction}
                    onChange={(e) => setTaskAction(e.target.value)}
                    placeholder="Describe the action to be performed"
                  />
                </div>

                <div className="daily-check-list-form-group">
                  <label className="daily-check-list-label">Select Task/Frequency:</label>
                  <input
                    type="number"
                    className="daily-check-list-input"
                    value={taskFrequency}
                    onChange={(e) => setTaskFrequency(parseInt(e.target.value) || 0)}
                    placeholder="120"
                    min="1"
                  />
                </div>

                <div className="daily-check-list-form-group daily-check-list-form-group-full">
                  <div className="daily-check-list-flex daily-check-list-gap-3">
                    <button 
                      className="daily-check-list-btn daily-check-list-btn-primary"
                      onClick={handleSaveTask}
                      disabled={!taskName || !taskAction || !selectedEquipment}
                    >
                      <Save className="daily-check-list-icon" />
                      Save Task
                    </button>
                    <button 
                      className="daily-check-list-btn daily-check-list-btn-secondary"
                      onClick={() => setShowTaskModal(true)}
                    >
                      <Plus className="daily-check-list-icon" />
                      Add new Task/Frequency
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Equipment and Tasks Display */}
            {selectedGroup && (
              <div className="daily-check-list-form-section">
                <div className="daily-check-list-form-title">
                  Equipment & Tasks - {getGroupById(selectedGroup)?.name}
                </div>
                
                <div className="daily-check-list-equipment-list">
                  {getEquipmentByGroup(selectedGroup).map(eq => (
                    <div key={eq.id} className="daily-check-list-equipment-item">
                      <div className="daily-check-list-equipment-header">
                        <div>
                          <div className="daily-check-list-equipment-name">{eq.name}</div>
                          <div className="daily-check-list-equipment-group">{eq.description}</div>
                        </div>
                        <div className="daily-check-list-equipment-actions">
                          <button 
                            className="daily-check-list-btn-icon"
                            onClick={() => handleModifyEquipment(eq)}
                            title="Modify Details"
                          >
                            <Edit3 className="daily-check-list-icon" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Tasks for this equipment */}
                      <div className="daily-check-list-task-list">
                        {getTasksByEquipment(eq.id).map(task => (
                          <div key={task.id} className="daily-check-list-task-item">
                            <div className="daily-check-list-task-details">
                              <div className="daily-check-list-task-name">{task.name}</div>
                              <div className="daily-check-list-task-action">{task.action}</div>
                            </div>
                            <div className="daily-check-list-flex daily-check-list-items-center daily-check-list-gap-2">
                              <span className="daily-check-list-task-frequency">
                                {task.frequency} hrs
                              </span>
                              <button 
                                className="daily-check-list-btn-icon"
                                onClick={() => handleEditTask(task)}
                                title="Edit Task"
                              >
                                <Edit3 className="daily-check-list-icon-sm" />
                              </button>
                              <button 
                                className="daily-check-list-btn-icon"
                                onClick={() => handleDeleteTask(task.id)}
                                title="Delete Task"
                              >
                                <Trash2 className="daily-check-list-icon-sm" />
                              </button>
                            </div>
                          </div>
                        ))}
                        
                        {getTasksByEquipment(eq.id).length === 0 && (
                          <div className="daily-check-list-text-gray-500 daily-check-list-text-sm">
                            No tasks assigned to this equipment
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Save Section */}
            <div className="daily-check-list-form-section">
              <div className="daily-check-list-flex daily-check-list-justify-between daily-check-list-items-center">
                <button className="daily-check-list-btn daily-check-list-btn-success">
                  <Save className="daily-check-list-icon" />
                  Save
                </button>
                <div className="daily-check-list-text-sm daily-check-list-text-gray-600">
                  All changes will be saved automatically
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Equipment Modal */}
      {showEquipmentModal && (
        <div className="daily-check-list-modal-overlay" onClick={() => setShowEquipmentModal(false)}>
          <div className="daily-check-list-modal" onClick={(e) => e.stopPropagation()}>
            <div className="daily-check-list-modal-header">
              <h3 className="daily-check-list-modal-title">
                {editingEquipment ? 'Modify Equipment' : 'Add New Equipment'}
              </h3>
              <button 
                className="daily-check-list-modal-close"
                onClick={() => {
                  setShowEquipmentModal(false);
                  setEditingEquipment(null);
                }}
              >
                <X className="daily-check-list-icon" />
              </button>
            </div>
            
            <div className="daily-check-list-modal-content">
              <div className="daily-check-list-space-y-4">
                <div className="daily-check-list-form-group">
                  <label className="daily-check-list-label">Equipment Group:</label>
                  <select className="daily-check-list-select" defaultValue={editingEquipment?.groupId || selectedGroup}>
                    <option value="">Select Group</option>
                    {equipmentGroups.map(group => (
                      <option key={group.id} value={group.id}>{group.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="daily-check-list-form-group">
                  <label className="daily-check-list-label">Equipment Name:</label>
                  <input
                    type="text"
                    className="daily-check-list-input"
                    defaultValue={editingEquipment?.name || newEquipmentName}
                    placeholder="Enter equipment name"
                  />
                </div>
                
                <div className="daily-check-list-form-group">
                  <label className="daily-check-list-label">Description:</label>
                  <textarea
                    className="daily-check-list-textarea"
                    defaultValue={editingEquipment?.description || ''}
                    placeholder="Enter equipment description"
                  />
                </div>
              </div>
            </div>
            
            <div className="daily-check-list-modal-footer">
              <button 
                className="daily-check-list-btn daily-check-list-btn-secondary"
                onClick={() => {
                  setShowEquipmentModal(false);
                  setEditingEquipment(null);
                }}
              >
                Cancel
              </button>
              <button className="daily-check-list-btn daily-check-list-btn-primary">
                <Save className="daily-check-list-icon" />
                Save Equipment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Task Modal */}
      {showTaskModal && (
        <div className="daily-check-list-modal-overlay" onClick={() => setShowTaskModal(false)}>
          <div className="daily-check-list-modal daily-check-list-modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="daily-check-list-modal-header">
              <h3 className="daily-check-list-modal-title">
                {editingTask ? 'Edit Task' : 'Add New Task'}
              </h3>
              <button 
                className="daily-check-list-modal-close"
                onClick={() => {
                  setShowTaskModal(false);
                  setEditingTask(null);
                  setTaskName('');
                  setTaskAction('');
                  setTaskFrequency(120);
                }}
              >
                <X className="daily-check-list-icon" />
              </button>
            </div>
            
            <div className="daily-check-list-modal-content">
              <div className="daily-check-list-space-y-4">
                <div className="daily-check-list-form-group">
                  <label className="daily-check-list-label">Task Name:</label>
                  <input
                    type="text"
                    className="daily-check-list-input"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="Enter task name"
                  />
                </div>
                
                <div className="daily-check-list-form-group">
                  <label className="daily-check-list-label">Action Description:</label>
                  <textarea
                    className="daily-check-list-textarea"
                    value={taskAction}
                    onChange={(e) => setTaskAction(e.target.value)}
                    placeholder="Describe the action to be performed"
                  />
                </div>
                
                <div className="daily-check-list-form-group">
                  <label className="daily-check-list-label">Frequency (hours):</label>
                  <input
                    type="number"
                    className="daily-check-list-input"
                    value={taskFrequency}
                    onChange={(e) => setTaskFrequency(parseInt(e.target.value) || 0)}
                    placeholder="120"
                    min="1"
                  />
                </div>
              </div>
            </div>
            
            <div className="daily-check-list-modal-footer">
              <button 
                className="daily-check-list-btn daily-check-list-btn-secondary"
                onClick={() => {
                  setShowTaskModal(false);
                  setEditingTask(null);
                  setTaskName('');
                  setTaskAction('');
                  setTaskFrequency(120);
                }}
              >
                Cancel
              </button>
              <button 
                className="daily-check-list-btn daily-check-list-btn-primary"
                onClick={handleSaveTask}
              >
                <Save className="daily-check-list-icon" />
                Save Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
