import http from "http"
import fs from "fs"
import path from "path"
import { getRyujinxPath } from "./emulatorFilesystem"


export const countShaders = async (titleId:string): Promise<number> => {

    const dataPath = path.resolve(getRyujinxPath(), 'games', titleId, 'cache', 'shader')

    const shaderCacheToc = path.resolve(dataPath, 'shared.toc')

}

export const installShaders = async (titleId:string): Promise<boolean> => {
    const zipUrl = 'http://localhost:8080/' + titleId + '.zip'
    const shaderDir = path.resolve(getRyujinxPath(), 'games', titleId, 'cache', 'shader')
    
    console.log(shaderDir)

    const shaderZip = fs.createWriteStream(path.resolve(shaderDir, `${titleId}.zip` ))

    http.get(zipUrl, (response) => {
        response.pipe(shaderZip);
        shaderZip.on('finish', () => {
            shaderZip.close(() => {
                console.log(`shader cache for ${titleId} downloaded`)
                return true
            });
        });
    }).on('error', (err) => fs.unlink(shaderDir, () => {
        console.log("Download error")
        return false
    }))
    return
}