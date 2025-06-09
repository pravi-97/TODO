import { useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';

function App() {
  const [todos, setTodos] = useState([]);

  const [newText, setNewText] = useState('');
  const [newTargetDate, setNewTargetDate] = useState('');
  const [newPriority, setNewPriority] = useState(100);

  const [editingId, setEditingId] = useState(null);
  const [editPriority, setEditPriority] = useState(null);
  const [editTargetDate, setEditTargetDate] = useState('');

  // New: current active tab - 'active' | 'paused' | 'completed'
  const [currentTab, setCurrentTab] = useState('active');

  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('bg-dark', 'text-light');
      document.body.classList.remove('bg-light', 'text-dark');
    } else {
      document.body.classList.add('bg-light', 'text-dark');
      document.body.classList.remove('bg-dark', 'text-light');
    }
  }, [darkMode]);

  // useEffect(() => {
  //   const saved = localStorage.getItem('darkMode');
  //   if (saved === 'true' || saved === 'false') {
  //     setDarkMode(saved === 'true');
  //   } else {
  //     setDarkMode(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('darkMode', darkMode);
  // }, [darkMode]);



  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) {
          setTodos(parsed);
        }
      } catch {
        setTodos([]);
      }
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);


  const addTodo = () => {
    if (!newText.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: newText.trim(),
      priority: Number(newPriority),
      targetDate: newTargetDate || '',
      createdDate: new Date().toISOString(),
      status: 'active',
    };

    setTodos(prev => sortTodos([...prev, newTodo]));
    setNewText('');
    setNewPriority(100);
    setNewTargetDate('');
  };

  const sortTodos = (list) =>
    list.slice().sort((a, b) => a.priority - b.priority);

  const updateStatus = (id, status) => {
    setTodos(prev =>
      sortTodos(
        prev.map(todo => (todo.id === id ? { ...todo, status } : todo))
      )
    );
    if (editingId === id) setEditingId(null);
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditPriority(todo.priority);
    setEditTargetDate(todo.targetDate);
  };

  const saveEdit = (id) => {
    setTodos(prev =>
      sortTodos(
        prev.map(todo =>
          todo.id === id
            ? { ...todo, priority: Number(editPriority), targetDate: editTargetDate }
            : todo
        )
      )
    );
    setEditingId(null);
  };

  const cancelEdit = () => setEditingId(null);

  // Filter todos by currentTab status
  const filteredTodos = todos.filter(todo => todo.status === currentTab);

  return (
    <>
      <div className="container py-3">
        {/* <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-outline-secondary"
            onClick={() => setDarkMode(!darkMode)}
          >
            Switch to {darkMode ? 'Light' : 'Dark'} Mode
          </button>
        </div> */}
        <div className="container py-4">
          <h2 className="mb-4">TODO</h2>

          <div className="row mb-4">
            {['active', 'paused', 'completed'].map(tab => (
              <div
                key={tab}
                className={`col text-center p-2 border ${currentTab === tab
                  ? 'bg-danger text-white'
                  : darkMode
                    ? 'bg-dark text-light'
                    : 'bg-light text-dark'
                  }`}
                style={{ cursor: 'pointer' }}
                onClick={() => setCurrentTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} ({todos.filter(t => t.status === tab).length})
              </div>
            ))}
          </div>



          {/* Add Todo Form - only show on Active tab for simplicity */}
          {currentTab === 'active' && (
            <div className="row mb-4 g-2 align-items-center">
              <div className="col-5">
                <input
                  className="form-control"
                  placeholder="Task description"
                  value={newText}
                  onChange={e => setNewText(e.target.value)}
                />
              </div>
              <div className="col-2">
                <input
                  type="number"
                  className="form-control"
                  min={1}
                  max={2000}
                  value={newPriority}
                  onChange={e => setNewPriority(e.target.value)}
                />
              </div>
              <div className="col-3">
                <input
                  type="date"
                  className="form-control"
                  value={newTargetDate}
                  onChange={e => setNewTargetDate(e.target.value)}
                />
              </div>
              <div className="col-2">
                <button className="btn btn-danger w-100" onClick={addTodo}>
                  Add Todo
                </button>
              </div>
            </div>
          )}

          {/* Table Header */}
          <div className="row fw-bold border-bottom pb-2 mb-2">
            <div className="col-4">Name</div>
            <div className="col-2">Priority</div>
            <div className="col-3">Target Date</div>
            <div className="col-3">Actions</div>
          </div>

          {/* Todos List for current tab */}
          {filteredTodos.length === 0 && (
            <div className="text-center text-muted">No {currentTab} tasks</div>
          )}

          {filteredTodos.map(todo => {
            const isEditing = editingId === todo.id;

            return (
              <div
                key={todo.id}
                className="row align-items-center mb-2"
              >
                <div className="col-4">{todo.text}</div>

                <div className="col-2">
                  {isEditing ? (
                    <input
                      type="number"
                      min={1}
                      max={2000}
                      className="form-control"
                      value={editPriority}
                      onChange={e => setEditPriority(e.target.value)}
                    />
                  ) : (
                    todo.priority
                  )}
                </div>

                <div className="col-3">
                  {isEditing ? (
                    <input
                      type="date"
                      className="form-control"
                      value={editTargetDate}
                      onChange={e => setEditTargetDate(e.target.value)}
                    />
                  ) : (
                    todo.targetDate
                  )}
                </div>

                <div className="col-3">
                  {isEditing ? (
                    <>
                      <button
                        className="btn btn-success btn-sm me-2 rounded-pill"
                        onClick={() => saveEdit(todo.id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary btn-sm rounded-pill"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>
                    </>
                  ) : todo.status === 'completed' ? (
                    <span className="text-muted fst-italic">No actions available</span>
                  ) : (
                    <>
                      <button
                        className="btn btn-success btn-sm me-2 rounded-pill"
                        onClick={() => updateStatus(todo.id, 'completed')}
                      >
                        Complete
                      </button>
                      {todo.status === 'active' && (
                        <button
                          className="btn btn-warning btn-sm me-2 rounded-pill"
                          onClick={() => updateStatus(todo.id, 'paused')}
                        >
                          Pause
                        </button>
                      )}
                      {todo.status === 'paused' && (
                        <button
                          className="btn btn-primary btn-sm me-2 rounded-pill"
                          onClick={() => updateStatus(todo.id, 'active')}
                        >
                          Resume
                        </button>
                      )}
                      <button
                        className="btn btn-info btn-sm rounded-pill"
                        onClick={() => startEditing(todo)}
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tooltip */}

        <div
          data-tooltip-id="app-info"
          data-tooltip-html={`Version:\t <strong>v1.0.0</strong>`}
          style={{
            position: 'fixed',
            bottom: 10,
            right: 10,
            width: 30,
            height: 30,
            borderRadius: '50%',
            backgroundColor: '#6c757d',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            fontWeight: 'bold',
            userSelect: 'none',
          }}
        >
          i
        </div>
        <Tooltip id="app-info" place="top" multiline={true} />
      </div>
      {/* <button onClick={() => localStorage.removeItem('todos')}>
        Clear Todos
      </button> */}
    </>
  );
}

export default App;