let state = [];
function setTasks(updater) {
  state = updater(state);
}

function processNextTask() {
  setTasks(prev => {
    console.log("processNextTask prev:", prev.map(t=>t.id));
    return prev;
  });
}

function addFiles() {
  const newTasks = [{id: 'A'}, {id: 'B'}];
  setTasks(prev => {
    console.log("first setTasks prev:", prev);
    return [...prev, ...newTasks];
  });
  
  // Actually in React, the updater doesn't run immediately, it's queued.
}
addFiles();
