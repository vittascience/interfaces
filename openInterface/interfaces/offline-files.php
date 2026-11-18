<?php
/**
 * Files of an interface that are only loaded on demand (simulator, libraries and firmware sent to the board), cached in
 * advance by /interfaces-sw.js so that they also work offline. GET ?interface=microbit -> JSON array of URL paths.
 * Not included: the 3D models (experience/), the old firmwares and the images of the components of the simulator
 * (21 MB): they are cached once used online.
 */
header('Content-Type: application/json');
header('Cache-Control: public, max-age=3600');

$interface = $_GET['interface'] ?? '';
$root = dirname(__DIR__, 2);
if (!preg_match('/^[A-Za-z0-9_-]+$/', $interface) || !is_dir("$root/openInterface/$interface")) {
    http_response_code(404);
    echo '[]';
    exit;
}

$folders = [
    "openInterface/$interface/assets/js/simulator",
    "openInterface/$interface/assets/media/simulator/board",
    "openInterface/$interface/assets/lib",
    "openInterface/$interface/assets/js/hex",
    'openInterface/interfaces/assets/js/external/skulpt',
    'openInterface/interfaces/assets/js/simulator/python/lib',
    // fonts of the simulator (LCD...) and of the accessibility settings: the woff2 ones, used by the browsers
    'public/content/fonts',
];
$files = [];
foreach ($folders as $folder) {
    if (!is_dir("$root/$folder")) continue;
    $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator("$root/$folder", FilesystemIterator::SKIP_DOTS));
    foreach ($iterator as $file) {
        $path = substr($file->getPathname(), strlen($root));
        if (!$file->isFile() || preg_match('#/(experience|old_firmwares)/|\.test\.js$|\.(php|md)$|^/public/content/fonts/.*(?<!\.woff2)$#', $path)) continue;
        $files[] = implode('/', array_map('rawurlencode', explode('/', $path)));
    }
}
echo json_encode($files, JSON_UNESCAPED_SLASHES);
