export const handleAddNewInstance = async (
    newMastodonInstance,
    instancesList,
    setInstancesList,
    setAddInstanceError,
) => {
    try {
        const response = await fetch(
            `https://${newMastodonInstance}/api/v1/instance`,
        );
        const data = await response.json();

        if (parseFloat(data.version) < 1.6) {
            setAddInstanceError('Mastodon instance version is below 1.6.0');
            return;
        } else {
            setAddInstanceError(null);
            const updatedInstancesList = [
                ...instancesList,
                newMastodonInstance,
            ];
            setInstancesList(updatedInstancesList);
            localStorage.setItem(
                'instancesList',
                JSON.stringify(updatedInstancesList),
            );
        }
    } catch {
        setAddInstanceError('Failed to fetch Mastodon instance information');
    }
};
