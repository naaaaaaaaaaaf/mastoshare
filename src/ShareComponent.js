import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { handleAddNewInstance } from './utils';


function ShareComponent() {
    const [showAddForm, setShowAddForm] = useState(false);
    const [combinedValue, setCombinedValue] = useState('');
    const [mastodonInstance, setMastodonInstance] = useState('');
    const [newMastodonInstance, setNewMastodonInstance] = useState('');
    const [instancesList, setInstancesList] = useState(() => {
        const savedInstancesList = localStorage.getItem('instancesList');
        return savedInstancesList ? JSON.parse(savedInstancesList) : [];
    });
    const [versionError] = useState(null);
    const [addInstanceError, setAddInstanceError] = useState(null);
    const location = useLocation();

    // URLからパラメータを抽出する関数
    function getParameterByName(name, url) {
        name = name.replace(/[[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    useEffect(() => {
        // ローカルストレージからMastodonインスタンスのURLを取得
        const savedInstances = JSON.parse(localStorage.getItem('instancesList'));
        if (savedInstances) setInstancesList(savedInstances);
        const savedPreferredInstance = localStorage.getItem('preferredInstance');
        if (savedPreferredInstance) {
            setMastodonInstance(savedPreferredInstance);
        }
        // テキストパラメータとリファラー（アクセス元URL）を取得して設定
        const urlText = getParameterByName('text', location.search) || '';
        const urlReferrer = getParameterByName('url', location.search) || '';
        setCombinedValue(`${urlText}\n${urlReferrer}`);

        if (savedInstances && savedInstances.length === 0) setShowAddForm(true);
    }, [location]);

    const handleAddInstance = () => {
        handleAddNewInstance(newMastodonInstance, instancesList, setInstancesList, setAddInstanceError);
    }


    useEffect(() => {
        localStorage.setItem('instancesList', JSON.stringify(instancesList));
    }, [instancesList]);

    const handleShare = () => {
        if (!versionError) {
            // MastodonインスタンスのURLをローカルストレージに保存
            localStorage.setItem('instancesList', JSON.stringify(instancesList));

            // 指定したURLにジャンプ
            const shareText = encodeURIComponent(combinedValue);
            window.location.href = `https://${mastodonInstance}/share?text=${shareText}`;
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full bg-white p-4 rounded-md shadow-md">
                <h2 className="text-2xl">Let's share...</h2>

                <textarea
                    className="w-full mt-2 p-2 border rounded-md"
                    rows={4}
                    value={combinedValue}
                    onChange={(e) => setCombinedValue(e.target.value)}
                />

                {instancesList.length > 0 ? (
                    <>
                        <h2 className="text-lg">Please select mastodon instance to share</h2>

                        <select
                            className="w-full mt-2 p-2 border rounded-md"
                            value={mastodonInstance}
                            onChange={(e) => setMastodonInstance(e.target.value)}
                        >
                            {instancesList.map((instance, index) => (
                                <option key={index} value={instance}>
                                    {instance}
                                </option>
                            ))}
                        </select>
                        {!showAddForm ? (
                            <p className="mt-2 mb-2 text-blue-500 cursor-pointer" onClick={() => setShowAddForm(true)}>
                                ▽Not in the list
                            </p>
                        ) : (
                            <p className="mt-2 mb-2 text-blue-500 cursor-pointer" onClick={() => setShowAddForm(false)}>
                                △Hide form
                            </p>
                        )}
                    </>
                ) : null}

                {showAddForm && (
                    <>
                        <h3 className="text-lg">Add new Mastodon instance</h3>
                        <div className="flex justify-between mt-2">
                            <input
                                className="flex-grow mr-2 p-2 border rounded-md"
                                placeholder='mastodon.social'
                                value={newMastodonInstance}
                                onChange={(e) => setNewMastodonInstance(e.target.value)}
                            />
                            <button
                                className="p-2 bg-blue-500 text-white rounded-md"
                                onClick={handleAddInstance}
                            >
                                Add
                            </button>
                        </div>
                    </>
                )}

                {addInstanceError && <p className="text-red-500">{addInstanceError}</p>}
                <button
                    className="w-full mt-4 p-2 bg-blue-500 text-white rounded-md"
                    onClick={handleShare}
                >
                    Share
                </button>
                <Link to="/settings" className="mt-4 p-2 bg-blue-500 text-white rounded-md block text-center">
                    Settings
                </Link>
            </div>
        </div>

    );
}

export default ShareComponent;
