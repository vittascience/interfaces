const gulp = require('gulp');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const fs = require('fs');

const buildFilesPath = 'openInterface/interfaces/assets/buildFiles';
const interfaces = ['arduino', 'bluebot', 'buddy', 'cyberpi', 'eliobot', 'esp32', 'galaxia', 'l476', 'lotibot', 'm5stack', 'mBot', 'microbit', 'nao', 'niryo', 'pico', 'photon', 'python', 'raspberrypi', 'sphero', 'spike', 'thymio', 'wb55', 'web', 'winky', 'codey', 'steami', 'alphai'];

const dynamicScript = `<script>const IS_CAPYTALE_CONTEXT = true;</script>`;

function createInterfaceIndex(interfaceName) {
    return function(done) {
        const currentInterfacePath = `openInterface/${interfaceName}`;

        const filesMap = {
            '@header.php': `public/header.php`,
            '@prodHead.html': `${currentInterfacePath}/prodHead.html`,
            '@closeHeaderOpenBody.html': `public/closeHeaderOpenBody.html`,
            '@ideAbsoluteContainerOpening.html': `${buildFilesPath}/ideAbsoluteContainerOpening.html`,
            '@prodBody.html': `${currentInterfacePath}/prodBody.html`,
            '@sharedClosingScripts.html': `${buildFilesPath}/sharedClosingScripts.html`,
            '@footer.html': `${buildFilesPath}/footer.html`
        };

        let stream = gulp.src(`${buildFilesPath}/index-template.html`);
    
        for (const [key, filePath] of Object.entries(filesMap)) {
            let fileContent = fs.readFileSync(filePath, 'utf8');
            if (key.split('.').pop() == 'php') {
                fileContent = fileContent.replace(/<\?php[\s\S]*?\?>/g, '');
            }
            fileContent = fileContent.replace('<!-- @_dynamic_script (DO NOT REMOVE THIS COMMENT) -->', dynamicScript);
            stream = stream.pipe(replace(key, fileContent));
        }
        return stream.pipe(rename('index.html'))
            .pipe(gulp.dest(`interfaceBuild/${interfaceName}`))
            .on('end', done);
    };
}

const tasks = interfaces.map((currentInterface) => {
    const taskName = `create-index-${currentInterface}`;
    gulp.task(taskName, createInterfaceIndex(currentInterface));
    return taskName;
});

const createInterfacesIndex = gulp.series(
    interfaces.map((currentInterface) => `create-index-${currentInterface}`)
);

createInterfacesIndex.displayName = "Generating interfaces index.html files";

module.exports = {
    createInterfacesIndex
};