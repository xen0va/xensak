import fs from "fs-extra"
import path from "path"
import { app } from "electron"
import { EmulatorGames } from "src/types"


const gameList: { [key: string]: { title: string } } = {};

export const getRyujinxPath = () => {
    if (process.platform == "win32") {
        return path.resolve(app.getPath("appData"), "Ryujinx")
    }
    else {
        return path.resolve(app.getPath("home"), ".config", "Ryujinx")
    }
}

export const loadGameList = async ():Promise<EmulatorGames> => {
    const dataPath:string = getRyujinxPath();
    const directories = fs.readdirSync(path.join(dataPath, "games"), {withFileTypes: true}).filter(d => d.isDirectory()).map(d => d.name.toLowerCase());
    
    directories.forEach(directory => {
        const metadataFileDir = path.join(dataPath, "games", directory, "gui", "metadata.json")

        const rawData = fs.readFileSync(metadataFileDir, 'utf-8')
        const metadata = JSON.parse(rawData)
        
        gameList[directory] = {title: metadata.title}

    });
    console.log(gameList);
    //console.log(directories.filter(d => d.isDirectory()).map(d => d.name.toLowerCase()))
    return gameList //.filter(d => d.isDirectory()).map(d => d.name.toLowerCase());
}