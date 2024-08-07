import fs from "fs-extra"
import path from "path"
import { app } from "electron"
import { EmulatorGames } from "src/types"

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
    
    return directories
}