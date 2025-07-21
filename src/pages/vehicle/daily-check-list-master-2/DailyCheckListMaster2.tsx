import React, { useState } from 'react';
import './DailyCheckListMaster2.css';

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

const Calendar = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const Save = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
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

const Printer = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
  </svg>
);

const Wrench = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
  </svg>
);

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Types
interface Equipment {
  id: string;
  name: string;
  status: 'active' | 'inactive';
}

interface Task {
  id: string;
  name: string;
  frequency: string;
  status: 'active' | 'inactive';
}

interface CheckListMaster {
  id?: string;
  group: string;
  foremanName: string;
  equipmentName: string;
  entryDate: string;
  selectedTasks: string[];
  notes?: string;
}

export default function DailyCheckListMaster2() {
  const [formData, setFormData] = useState<CheckListMaster>({
    group: '',
    foremanName: '',
    equipmentName: '',
    entryDate: new Date().toISOString().split('T')[0],
    selectedTasks: [],
    notes: ''
  });

  const [equipmentList, setEquipmentList] = useState<Equipment[]>([
    { id: 'eq-1', name: 'DDDDDA', status: 'active' },
    { id: 'eq-2', name: 'Excavator CAT 320D', status: 'active' },
    { id: 'eq-3', name: 'Dump Truck Tata 3118', status: 'active' },
    { id: 'eq-4', name: 'Loader CAT 950M', status: 'active' },
    { id: 'eq-5', name: 'Drill Rig Atlas Copco', status: 'active' }
  ]);

  const [taskList, setTaskList] = useState<Task[]>([
    { id: 'task-1', name: 'Pre-operational Safety Check', frequency: '120', status: 'active' },
    { id: 'task-2', name: 'Engine Oil Level Check', frequency: '240', status: 'active' },
    { id: 'task-3', name: 'Hydraulic Fluid Check', frequency: '120', status: 'active' },
    { id: 'task-4', name: 'Tire Pressure Check', frequency: '480', status: 'active' },
    { id: 'task-5', name: 'Brake System Check', frequency: '240', status: 'active' },
    { id: 'task-6', name: 'Lights and Signals Check', frequency: '120', status: 'active' }
  ]);

  const [showAddEquipment, setShowAddEquipment] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newEquipment, setNewEquipment] = useState({ name: '' });
  const [newTask, setNewTask] = useState({ name: '', frequency: '' });

  const handleInputChange = (field: keyof CheckListMaster, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTaskSelection = (taskId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedTasks: prev.selectedTasks.includes(taskId)
        ? prev.selectedTasks.filter(id => id !== taskId)
        : [...prev.selectedTasks, taskId]
    }));
  };

  const handleAddEquipment = () => {
    if (newEquipment.name.trim()) {
      const newEq: Equipment = {
        id: `eq-${Date.now()}`,
        name: newEquipment.name.trim(),
        status: 'active'
      };
      setEquipmentList(prev => [...prev, newEq]);
      setNewEquipment({ name: '' });
      setShowAddEquipment(false);
    }
  };

  const handleAddTask = () => {
    if (newTask.name.trim() && newTask.frequency.trim()) {
      const newTaskItem: Task = {
        id: `task-${Date.now()}`,
        name: newTask.name.trim(),
        frequency: newTask.frequency.trim(),
        status: 'active'
      };
      setTaskList(prev => [...prev, newTaskItem]);
      setNewTask({ name: '', frequency: '' });
      setShowAddTask(false);
    }
  };

  const handleRemoveEquipment = (equipmentId: string) => {
    setEquipmentList(prev => prev.filter(eq => eq.id !== equipmentId));
  };

  const handleRemoveTask = (taskId: string) => {
    setTaskList(prev => prev.filter(task => task.id !== taskId));
    setFormData(prev => ({
      ...prev,
      selectedTasks: prev.selectedTasks.filter(id => id !== taskId)
    }));
  };

  const handleSaveCheckList = () => {
    if (!formData.group || !formData.foremanName || !formData.equipmentName) {
      alert('Please fill in all required fields');
      return;
    }

    console.log('Saving check list:', formData);
    alert('Check list saved successfully!');
  };

  const handleShowDetails = () => {
    console.log('Current form data:', formData);
    console.log('Selected tasks:', formData.selectedTasks.map(id => 
      taskList.find(task => task.id === id)?.name
    ));
    alert('Check list details displayed in console');
  };

  const handlePrintJobCard = () => {
    window.print();
  };

  return (
    <div className="daily-check-list-master-2">
      {/* Header */}
      <div className="daily-check-list-master-2-header">
        <div className="daily-check-list-master-2-header-content">
          <div className="daily-check-list-master-2-title-section">
            <CheckSquare className="daily-check-list-master-2-header-icon" />
            <div>
              <h1 className="daily-check-list-master-2-title">Daily Check List Master</h1>
              <p className="daily-check-list-master-2-subtitle">
                Manage and configure daily check lists for equipment and machinery
              </p>
            </div>
          </div>
          <div className="daily-check-list-master-2-header-actions">
            <button
              className="daily-check-list-master-2-btn daily-check-list-master-2-btn-secondary"
              onClick={handleShowDetails}
            >
              <Eye className="daily-check-list-master-2-icon" />
              Show Details
            </button>
            <button
              className="daily-check-list-master-2-btn daily-check-list-master-2-btn-primary"
              onClick={handlePrintJobCard}
            >
              <Printer className="daily-check-list-master-2-icon" />
              Print Job Card
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="daily-check-list-master-2-main">
        <div className="daily-check-list-master-2-content">
          <div className="daily-check-list-master-2-tab-content">
            
            {/* Form Section */}
            <div className="daily-check-list-master-2-form-section">
              <h3 className="daily-check-list-master-2-form-title">
                <Settings className="daily-check-list-master-2-icon" />
                Daily Check List Master
              </h3>
              
              <div className="daily-check-list-master-2-form-grid">
                <div className="daily-check-list-master-2-form-group">
                  <label className="daily-check-list-master-2-label">Group:</label>
                  <select
                    className="daily-check-list-master-2-select"
                    value={formData.group}
                    onChange={(e) => handleInputChange('group', e.target.value)}
                  >
                    <option value="">Select Group</option>
                    <option value="MACHINERY">MACHINERY</option>
                    <option value="VEHICLES">VEHICLES</option>
                    <option value="EQUIPMENT">EQUIPMENT</option>
                    <option value="TOOLS">TOOLS</option>
                  </select>
                </div>

                <div className="daily-check-list-master-2-form-group">
                  <label className="daily-check-list-master-2-label">Foreman Name:</label>
                  <input
                    type="text"
                    className="daily-check-list-master-2-input"
                    value={formData.foremanName}
                    onChange={(e) => handleInputChange('foremanName', e.target.value)}
                    placeholder="Enter foreman name"
                  />
                </div>

                <div className="daily-check-list-master-2-form-group">
                  <label className="daily-check-list-master-2-label">Equipment Name:</label>
                  <select
                    className="daily-check-list-master-2-select"
                    value={formData.equipmentName}
                    onChange={(e) => handleInputChange('equipmentName', e.target.value)}
                  >
                    <option value="">Select Equipment</option>
                    {equipmentList.map(equipment => (
                      <option key={equipment.id} value={equipment.name}>
                        {equipment.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="daily-check-list-master-2-form-group">
                  <label className="daily-check-list-master-2-label">Entry Date:</label>
                  <input
                    type="date"
                    className="daily-check-list-master-2-input"
                    value={formData.entryDate}
                    onChange={(e) => handleInputChange('entryDate', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Equipment Section */}
            <div className="daily-check-list-master-2-equipment-section">
              <div className="daily-check-list-master-2-equipment-header">
                <h4 className="daily-check-list-master-2-equipment-title">
                  <Wrench className="daily-check-list-master-2-icon" />
                  Equipment List
                </h4>
                <button
                  className="daily-check-list-master-2-btn daily-check-list-master-2-btn-secondary"
                  onClick={() => setShowAddEquipment(!showAddEquipment)}
                >
                  <Plus className="daily-check-list-master-2-icon" />
                  Add Equipment
                </button>
              </div>

              {showAddEquipment && (
                <div className="daily-check-list-master-2-form-grid" style={{ marginBottom: '1rem' }}>
                  <div className="daily-check-list-master-2-form-group">
                    <label className="daily-check-list-master-2-label">Equipment Name:</label>
                    <input
                      type="text"
                      className="daily-check-list-master-2-input"
                      value={newEquipment.name}
                      onChange={(e) => setNewEquipment({ name: e.target.value })}
                      placeholder="Enter equipment name"
                    />
                  </div>
                  <div className="daily-check-list-master-2-form-group">
                    <label className="daily-check-list-master-2-label">&nbsp;</label>
                    <div className="daily-check-list-master-2-flex daily-check-list-master-2-gap-2">
                      <button
                        className="daily-check-list-master-2-btn daily-check-list-master-2-btn-primary"
                        onClick={handleAddEquipment}
                      >
                        <Save className="daily-check-list-master-2-icon" />
                        Add
                      </button>
                      <button
                        className="daily-check-list-master-2-btn daily-check-list-master-2-btn-secondary"
                        onClick={() => setShowAddEquipment(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="daily-check-list-master-2-equipment-list">
                {equipmentList.map(equipment => (
                  <div key={equipment.id} className="daily-check-list-master-2-equipment-item">
                    <div className="daily-check-list-master-2-equipment-bullet"></div>
                    <span className="daily-check-list-master-2-equipment-name">{equipment.name}</span>
                    <div className="daily-check-list-master-2-equipment-actions">
                      <button
                        className="daily-check-list-master-2-btn-icon"
                        onClick={() => handleRemoveEquipment(equipment.id)}
                        title="Remove equipment"
                      >
                        <Trash2 className="daily-check-list-master-2-icon-sm" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Task/Frequency Section */}
            <div className="daily-check-list-master-2-task-section">
              <div className="daily-check-list-master-2-task-header">
                <h4 className="daily-check-list-master-2-task-title">
                  <Clock className="daily-check-list-master-2-icon" />
                  Select Task/Frequency
                </h4>
                <button
                  className="daily-check-list-master-2-btn daily-check-list-master-2-btn-secondary"
                  onClick={() => setShowAddTask(!showAddTask)}
                >
                  <Plus className="daily-check-list-master-2-icon" />
                  Add Task
                </button>
              </div>

              {showAddTask && (
                <div className="daily-check-list-master-2-form-grid" style={{ marginBottom: '1rem' }}>
                  <div className="daily-check-list-master-2-form-group">
                    <label className="daily-check-list-master-2-label">Task Name:</label>
                    <input
                      type="text"
                      className="daily-check-list-master-2-input"
                      value={newTask.name}
                      onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                      placeholder="Enter task name"
                    />
                  </div>
                  <div className="daily-check-list-master-2-form-group">
                    <label className="daily-check-list-master-2-label">Frequency (minutes):</label>
                    <input
                      type="text"
                      className="daily-check-list-master-2-input"
                      value={newTask.frequency}
                      onChange={(e) => setNewTask({ ...newTask, frequency: e.target.value })}
                      placeholder="Enter frequency"
                    />
                  </div>
                  <div className="daily-check-list-master-2-form-group">
                    <label className="daily-check-list-master-2-label">&nbsp;</label>
                    <div className="daily-check-list-master-2-flex daily-check-list-master-2-gap-2">
                      <button
                        className="daily-check-list-master-2-btn daily-check-list-master-2-btn-primary"
                        onClick={handleAddTask}
                      >
                        <Save className="daily-check-list-master-2-icon" />
                        Add
                      </button>
                      <button
                        className="daily-check-list-master-2-btn daily-check-list-master-2-btn-secondary"
                        onClick={() => setShowAddTask(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="daily-check-list-master-2-task-list">
                {taskList.map(task => (
                  <div key={task.id} className="daily-check-list-master-2-task-item">
                    <div className="daily-check-list-master-2-task-bullet"></div>
                    <span className="daily-check-list-master-2-task-name">{task.name}</span>
                    <span className="daily-check-list-master-2-task-frequency">{task.frequency}</span>
                    <div className="daily-check-list-master-2-task-actions">
                      <label className="daily-check-list-master-2-flex daily-check-list-master-2-items-center daily-check-list-master-2-gap-2">
                        <input
                          type="checkbox"
                          checked={formData.selectedTasks.includes(task.id)}
                          onChange={() => handleTaskSelection(task.id)}
                        />
                        <span className="daily-check-list-master-2-text-sm">Select</span>
                      </label>
                      <button
                        className="daily-check-list-master-2-btn-icon"
                        onClick={() => handleRemoveTask(task.id)}
                        title="Remove task"
                      >
                        <Trash2 className="daily-check-list-master-2-icon-sm" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes Section */}
            <div className="daily-check-list-master-2-form-section">
              <div className="daily-check-list-master-2-form-group">
                <label className="daily-check-list-master-2-label">Notes:</label>
                <textarea
                  className="daily-check-list-master-2-textarea"
                  value={formData.notes || ''}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Add any additional notes or comments..."
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="daily-check-list-master-2-form-actions">
              <button
                className="daily-check-list-master-2-btn daily-check-list-master-2-btn-primary"
                onClick={handleSaveCheckList}
              >
                <Save className="daily-check-list-master-2-icon" />
                Save Check List Details
              </button>
              
              <button
                className="daily-check-list-master-2-btn daily-check-list-master-2-btn-secondary"
                onClick={handleShowDetails}
              >
                <Eye className="daily-check-list-master-2-icon" />
                Show to Add Details
              </button>
              
              <button
                className="daily-check-list-master-2-btn daily-check-list-master-2-btn-secondary"
                onClick={handlePrintJobCard}
              >
                <Printer className="daily-check-list-master-2-icon" />
                Print CheckList Job Card
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
