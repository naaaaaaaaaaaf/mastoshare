import React from 'react';
import { Link } from 'react-router-dom';
import { BsGearFill, BsGithub } from 'react-icons/bs';
import packageJson from '../package.json';
import './App.css';
import { useTranslation } from 'react-i18next';

function HomePage() {
    const { version } = packageJson;
    const { t } = useTranslation();
    const openShareWindow = (event) => {
        event.preventDefault();
        window.open(
            'https://mastoshare.net/share?text=Hello Mastoshare!&url=https://mastoshare.net',
            '_blank',
            'width=500,height=600',
        );
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full bg-white p-4 rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-4">
                    {t('homepage.title')}
                </h1>

                <p className="mb-4">{t('homepage.description')}</p>
                <div className="flex justify-center mb-4">
                    <a
                        className="mastoshare-button text-center"
                        href="https://mastoshare.net/share?text=Hello Mastoshare!&url=https://mastoshare.net"
                        onClick={openShareWindow}
                    >
                        Toot!
                    </a>
                </div>

                <h1 className="text-2xl font-bold mb-4">
                    {t('homepage.embedTitle')}
                </h1>
                <pre className="text-sm p-4 mb-4 bg-gray-800 text-white rounded-md overflow-auto">
                    {`<div class="mastoshare-button" data-text="Hello, world!" data-url="https://example.com"></div>
<link rel="stylesheet" href="https://mastoshare.net/css/button.css">
<script src="https://mastoshare.net/js/button.js"></script>`}
                </pre>
                <h1 className="text-2xl font-bold mb-4">
                    {t('homepage.parameterTitle')}
                </h1>
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">
                                {t('homepage.parameterTableParameterText')}
                            </th>
                            <th className="border px-4 py-2">
                                {t('homepage.parameterTableDescription')}
                            </th>
                            <th className="border px-4 py-2">
                                {t('homepage.parameterTableRequired')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2">data-text</td>
                            <td className="border px-4 py-2">
                                {t('homepage.parameterTableDescriptionText')}
                            </td>
                            <td className="border px-4 py-2">
                                {t('general.yes')}
                            </td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">data-url</td>
                            <td className="border px-4 py-2">
                                {t('homepage.parameterTableDescriptionUrl')}
                            </td>
                            <td className="border px-4 py-2">
                                {t('general.no')}
                            </td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">
                                data-button-text
                            </td>
                            <td className="border px-4 py-2">
                                {t('homepage.parameterTableDescriptionButton')}
                            </td>
                            <td className="border px-4 py-2">
                                {t('general.no')}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Link to="/settings">
                    <button className="mt-4 w-full flex justify-center items-center py-2 bg-blue-500 text-white rounded">
                        <BsGearFill className="mr-2" />
                        {t('general.settings')}
                    </button>
                </Link>
                <h1 className="text-2xl font-bold mt-4 mb-4">
                    {t('homepage.browserExtensionTitle')}
                </h1>
                <div className="flex justify-center">
                    <a
                        href="https://chrome.google.com/webstore/detail/mastoshare/mfdneocoinldonfcdoicdjllngnakoga?hl=ja"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            className="mr-4"
                            src="images/chrome-extension.png"
                            alt="chrome web store"
                        ></img>
                    </a>
                    <a
                        href="https://addons.mozilla.org/ja/firefox/addon/mastoshare/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            src="images/firefox-addon.png"
                            alt="firefox addon page"
                        ></img>
                    </a>
                </div>
                <div className="flex justify-center">
                    <a
                        href="https://github.com/naaaaaaaaaaaf/mastoshare"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 text-gray-500 hover:underline flex items-center"
                    >
                        <BsGithub className="mr-1" />
                        Mastoshare v{version}
                    </a>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
