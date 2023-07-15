import React, { useEffect, useState } from 'react';
import { useAddNewInstance } from './useAddNewInstance';
import {
    BsFillGearFill,
    BsMastodon,
    BsPlusLg,
    BsStarFill,
} from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

function SettingsComponent() {
    const { handleAddNewInstance } = useAddNewInstance();
    const { t } = useTranslation();
    const [instancesList, setInstancesList] = useState([]);
    const [newMastodonInstance, setNewMastodonInstance] = useState('');
    const [preferredInstance, setPreferredInstance] = useState('');
    const [addInstanceError, setAddInstanceError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        const savedInstances = JSON.parse(
            localStorage.getItem('instancesList'),
        );
        if (savedInstances) {
            setInstancesList(savedInstances);
        }

        const savedPreferredInstance =
            localStorage.getItem('preferredInstance');
        if (savedPreferredInstance) {
            setPreferredInstance(savedPreferredInstance);
        }
    }, []);

    const handleAddInstance = () => {
        handleAddNewInstance(
            newMastodonInstance,
            instancesList,
            setInstancesList,
            setAddInstanceError,
            setSuccessMessage,
        );
    };

    const handleRemoveInstance = (instanceToRemove) => {
        const updatedInstances = instancesList.filter(
            (instance) => instance !== instanceToRemove,
        );
        setInstancesList(updatedInstances);
        localStorage.setItem('instancesList', JSON.stringify(updatedInstances));

        if (instanceToRemove === preferredInstance) {
            setPreferredInstance('');
            localStorage.removeItem('preferredInstance');
        }
    };
    const handleSetPreferredInstance = (instance) => {
        setPreferredInstance(instance);
        localStorage.setItem('preferredInstance', instance);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full bg-white p-4 rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-4 flex items-center">
                    <BsFillGearFill className="mr-1" />
                    {t('settings.title')}
                </h1>

                <h2 className="text-xl mb-2 flex items-center">
                    <BsMastodon className="mr-1" />
                    {t('settings.instance')}
                </h2>
                <table className="table-auto">
                    <tbody>
                        {instancesList.map((instance, index) => (
                            <tr key={index}>
                                <td>
                                    <span className="mr-4">{instance}</span>
                                </td>
                                <td>
                                    <button
                                        className="mr-2 bg-red-500 text-white px-2 py-1 rounded"
                                        onClick={() =>
                                            handleRemoveInstance(instance)
                                        }
                                    >
                                        {t('settings.removeInstance')}
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="bg-green-500 text-white px-2 py-1 rounded"
                                        onClick={() =>
                                            handleSetPreferredInstance(instance)
                                        }
                                    >
                                        {t('settings.setPreferredInstance')}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h3 className="text-lg mt-4 flex items-center">
                    <BsPlusLg className="mr-1" />
                    {t('settings.addInstance')}
                </h3>
                {addInstanceError && (
                    <p className="text-red-500">{addInstanceError}</p>
                )}
                {successMessage && (
                    <p className="text-green-500">{successMessage}</p>
                )}
                <div className="flex items-center mt-2">
                    <input
                        type="text"
                        className="flex-grow mr-2 p-2 border rounded-md"
                        placeholder="Add new instance"
                        value={newMastodonInstance}
                        onChange={(e) => setNewMastodonInstance(e.target.value)}
                    />
                    <button
                        className="p-2 bg-blue-500 text-white rounded-md"
                        onClick={handleAddInstance}
                    >
                        {t('general.add')}
                    </button>
                </div>

                <h2 className="text-xl mt-4 mb-2 flex items-center">
                    <BsStarFill className="mr-1" />
                    {t('settings.preferredInstance')}
                </h2>
                <p>{preferredInstance}</p>
            </div>
        </div>
    );
}

export default SettingsComponent;
