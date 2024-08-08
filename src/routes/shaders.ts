import http from "http"
import fs from "fs-extra"
import path from "path"
import zip from "adm-zip"
import { getRyujinxPath } from "./emulatorFilesystem"
import { downloadShaders, getWithProgress } from "./services/httpService"


export const countShaders = async (titleId:string): Promise<number> => {

    const dataPath = path.resolve(getRyujinxPath(), 'games', titleId, 'cache', 'shader')
    const shaderCacheToc = path.resolve(dataPath, 'shared.toc')
    
    if(!await fs.pathExists(shaderCacheToc)) {
        return 0;
    }

    const stat = await fs.stat(shaderCacheToc);
    return Math.max((stat.size - 32) / 8, 0)

}

export const installShaders = async (titleId:string):Promise<boolean> => {
    const shaderCacheDir = path.resolve(getRyujinxPath(), 'games', titleId, 'cache', 'shader')
    const shaderCacheZipPath = path.resolve(shaderCacheDir, `${titleId}.zip`)

    await fs.ensureDir(shaderCacheDir)
    await fs.emptyDir(shaderCacheDir)

    const result = await downloadShaders(titleId, shaderCacheZipPath)

    if(!result) {
        return null
    }

    const shaderCacheZip = new zip(shaderCacheZipPath)
    shaderCacheZip.extractAllTo(shaderCacheDir, true)
    await fs.unlink(shaderCacheZipPath)

    return true

}