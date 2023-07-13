import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function ShareComponent() {
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

        // テキストパラメータとリファラー（アクセス元URL）を取得して設定
        const urlText = getParameterByName('text', location.search) || '';
        const urlReferrer = getParameterByName('url', location.search) || '';
        setCombinedValue(`${urlText}\n${urlReferrer}`);
    }, [location]);

    const handleAddNewInstance = () => {
        fetch(`https://${newMastodonInstance}/api/v1/instance`)
            .then(response => response.json())
            .then(data => {
                if (parseFloat(data.version) < 1.6) {
                    setAddInstanceError('Mastodon instance version is below 1.6.0');
                } else {
                    setAddInstanceError(null);
                    const updatedInstancesList = [...instancesList, newMastodonInstance];
                    setInstancesList(updatedInstancesList);
                    localStorage.setItem('instancesList', JSON.stringify(updatedInstancesList));
                    setNewMastodonInstance('');
                }
            })
            .catch(() => {
                setAddInstanceError('Failed to fetch Mastodon instance information');
            });
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
                <h1 className="text-2xl font-bold">Share to Mastodon</h1>
                <textarea
                    className="w-full p-2 border rounded-md"
                    rows={4}
                    value={combinedValue}
                    onChange={(e) => setCombinedValue(e.target.value)}
                />
                <select
                    className="w-full mt-4 p-2 border rounded-md"
                    value={mastodonInstance}
                    onChange={(e) => setMastodonInstance(e.target.value)}
                >
                    {instancesList.map((instance, index) => (
                        <option key={index} value={instance}>
                            {instance}
                        </option>
                    ))}
                </select>
                <div className="flex justify-between mt-4">
                    <input
                        className="flex-grow mr-2 p-2 border rounded-md"
                        value={newMastodonInstance}
                        onChange={(e) => setNewMastodonInstance(e.target.value)}
                    />
                    <button
                        className="p-2 bg-blue-500 text-white rounded-md"
                        onClick={handleAddNewInstance}
                    >
                        Add
                    </button>
                </div>
                {addInstanceError && <p className="text-red-500">{addInstanceError}</p>}
                <button
                    className="w-full mt-4 p-2 bg-blue-500 text-white rounded-md"
                    onClick={handleShare}
                >
                    Share
                </button>
            </div>
        </div>

    );
}

export default ShareComponent;