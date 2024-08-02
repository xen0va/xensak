/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

//import './index.css';



async function loadGames() {

    const gameList = await window.electronAPI.fetchGameList()

    const container = document.getElementById('container');

    Object.values(gameList).forEach(item => {

        //Parameters should be replaced with IPC later, but this works for now

        const gridItem = document.createElement('div');
        gridItem.className = "grid-item";

        //gridItem.addEventListener('click', function() {
        //    window.location.href = `\\templates\\game_details.html?titleId=${item.id}&title=${item.title}`;
        // });

        const img = document.createElement('img');
        img.src = '.\\src\\static\\assets\\images\\parl.png';

        const paragraph = document.createElement('p');
        paragraph.textContent = item.title;

        gridItem.appendChild(img);
        gridItem.appendChild(paragraph);

        container.appendChild(gridItem);
        });
}

console.log('👋 This message is being logged by "renderer.ts", included via Vite');
