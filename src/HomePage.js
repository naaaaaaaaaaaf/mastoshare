import React from 'react';

function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full bg-white p-4 rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-4">
                    Welcome to Our Mastodon Sharing App!
                </h1>

                <p className="mb-4">
                    Share your favorite content to your Mastodon instances
                    seamlessly. You can manage your instances in the Settings
                    page and set your preferred one.
                </p>

                <h1 className="text-2xl font-bold mb-4">
                    How to embed on your site
                </h1>
                <pre className="text-sm p-4 mb-4 bg-gray-800 text-white rounded-md overflow-auto">
                {`<div class="share-button" data-text="Hello, world!" data-url="https://example.com"></div>
<link rel="stylesheet" href="https://mastoshare.net/css/button.css">
<script src="https://mastoshare.net/js/button.js"></script>`}
                </pre>
                <h1 className="text-2xl font-bold mb-4">
                    Parameter options
                </h1>
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Parameter</th>
                            <th className="border px-4 py-2">Description</th>
                            <th className="border px-4 py-2">Required</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2">data-text</td>
                            <td className="border px-4 py-2">Text to share</td>
                            <td className="border px-4 py-2">Yes</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">data-url</td>
                            <td className="border px-4 py-2">URL to share</td>
                            <td className="border px-4 py-2">No</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">data-button-text</td>
                            <td className="border px-4 py-2">Text on the button</td>
                            <td className="border px-4 py-2">No</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default HomePage;
