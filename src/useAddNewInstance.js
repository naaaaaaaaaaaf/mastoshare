import { useTranslation } from 'react-i18next';

export const useAddNewInstance = () => {
    const { t } = useTranslation();
    const handleAddNewInstance = async (
        newMastodonInstance,
        instancesList,
        setInstancesList,
        setAddInstanceError,
        setSuccessMessage
    ) => {
        try {
            const response = await fetch(
                `https://${newMastodonInstance}/api/v1/instance`,
            );
            const data = await response.json();

            if (parseFloat(data.version) < 1.6) {
                setAddInstanceError(t('general.addInstanceErrorVersion'));
                setSuccessMessage(null);
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
                setSuccessMessage(t('general.addInstanceSuccess'));
            }
        } catch {
            setAddInstanceError(
                t('general.addInstanceError'),
            );
            setSuccessMessage(null);
        }
    };
    return { handleAddNewInstance };
};
