<?php

header('Content-Type: image/svg+xml');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: public, max-age=86400');

$provider = preg_replace('/[^a-zA-Z]/', '', $_GET['provider'] ?? '');

switch ($provider) {
    case 'google':
        echo '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlns:xlink="http://www.w3.org/1999/xlink">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>';
        break;
    case 'apple':
        echo '<svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 549.875 549.876" xml:space="preserve">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <g>
                    <g>
                        <path d="M340.535,104.42c13.881-13.874,24.125-29.07,30.735-45.594c6.389-16.524,9.584-31.5,9.584-44.945 c0-0.875-0.056-1.989-0.166-3.305c-0.116-1.316-0.165-2.411-0.165-3.305c-0.22-0.661-0.495-1.873-0.826-3.642 c-0.33-1.756-0.605-2.968-0.826-3.629c-38.776,9.033-66.311,25.337-82.613,48.911c-16.524,23.789-25.117,52.1-25.778,84.927 c14.755-1.328,26.211-3.188,34.37-5.612C316.747,124.249,328.638,116.323,340.535,104.42z"></path>
                        <path d="M452.892,359.868c-15.202-21.799-22.803-46.365-22.803-73.696c0-24.891,7.154-47.688,21.48-68.404 c7.712-11.23,20.27-24.229,37.675-38.997c-11.456-14.094-22.913-25.104-34.369-33.048c-20.711-14.303-44.175-21.481-70.387-21.481 c-15.643,0-34.7,3.758-57.173,11.243c-21.592,7.497-37.344,11.23-47.253,11.23c-7.49,0-22.692-3.305-45.606-9.914 c-23.133-6.61-42.625-9.915-58.489-9.915c-37.895,0-69.18,15.863-93.85,47.595c-24.896,32.167-37.344,73.36-37.344,123.587 c0,53.312,16.193,108.716,48.581,166.226c32.822,57.057,65.979,85.582,99.468,85.582c11.236,0,25.771-3.745,43.617-11.23 c17.846-7.271,33.482-10.905,46.922-10.905c14.321,0,30.949,3.525,49.902,10.569c20.043,7.05,35.466,10.569,46.262,10.569 c28.194,0,56.506-21.586,84.927-64.762c18.507-27.534,32.057-55.08,40.649-82.614C485.494,395.561,468.094,381.68,452.892,359.868 z"></path>
                    </g>
                </g>
            </g>
        </svg>';
        break;
    case 'microsoft':
        echo '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path fill="#F35325" d="M1 1h6.5v6.5H1V1z"></path>
                    <path fill="#81BC06" d="M8.5 1H15v6.5H8.5V1z"></path>
                    <path fill="#05A6F0" d="M1 8.5h6.5V15H1V8.5z"></path>
                    <path fill="#FFBA08" d="M8.5 8.5H15V15H8.5V8.5z"></path>
                </g>
            </svg>';
        break;
    default:
        http_response_code(404);
        echo '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20">
                <text x="0" y="15" font-size="12" fill="red">SSO inconnu</text>
            </svg>';
        break;
}
