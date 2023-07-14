import React, { useEffect, useState } from 'react';

function SettingsComponent() {
  const [instancesList, setInstancesList] = useState([]);
  const [newMastodonInstance, setNewMastodonInstance] = useState('');
  const [preferredInstance, setPreferredInstance] = useState('');

  useEffect(() => {
    const savedInstances = JSON.parse(localStorage.getItem('instancesList'));
    if (savedInstances) {
      setInstancesList(savedInstances);
    }

    const savedPreferredInstance = localStorage.getItem('preferredInstance');
    if (savedPreferredInstance) {
      setPreferredInstance(savedPreferredInstance);
    }
  }, []);

  const handleAddInstance = () => {
    const updatedInstances = [...instancesList, newMastodonInstance];
    setInstancesList(updatedInstances);
    localStorage.setItem('instancesList', JSON.stringify(updatedInstances));
    setNewMastodonInstance('');
  }

  const handleRemoveInstance = (instanceToRemove) => {
    const updatedInstances = instancesList.filter(instance => instance !== instanceToRemove);
    setInstancesList(updatedInstances);
    localStorage.setItem('instancesList', JSON.stringify(updatedInstances));
  }

  const handleSetPreferredInstance = (instance) => {
    setPreferredInstance(instance);
    localStorage.setItem('preferredInstance', instance);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-4 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>

        <h2 className="text-xl mb-2">Instances</h2>
        {instancesList.map((instance, index) => (
          <div key={index} className="flex items-center mb-2">
            <span className="mr-4">{instance}</span>
            <button className="mr-2 bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleRemoveInstance(instance)}>Remove</button>
            <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleSetPreferredInstance(instance)}>Set as preferred</button>
          </div>
        ))}

        <div className="flex items-center mt-4">
          <input
            type="text"
            className="flex-grow mr-2 p-2 border rounded-md"
            placeholder="Add new instance"
            value={newMastodonInstance}
            onChange={(e) => setNewMastodonInstance(e.target.value)}
          />
          <button className="p-2 bg-blue-500 text-white rounded-md" onClick={handleAddInstance}>Add</button>
        </div>

        <h2 className="text-xl my-2">Preferred Instance</h2>
        <p className="text-blue-500">{preferredInstance}</p>
      </div>
    </div>
  );
}

export default SettingsComponent;
