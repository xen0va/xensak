import path from "path"
import fs from "fs-extra"
import http from "http"
import https from "https"
import { app } from "electron"
import { eShopTitleMeta } from "src/types"
import { getRyujinxPath } from "../emulatorFilesystem"

const cacheDir = app.getPath("userData")
const eShopDataPath = path.join(cacheDir, 'US.en.json')
const dataPath = getRyujinxPath()

export const getTitleInfo = async () => {
    if(!fs.existsSync(eShopDataPath)) {
        updateEshopMeta()
    }
}

export const getEShopMeta = async (titleId: string): Promise<eShopTitleMeta> => {
    if(!fs.existsSync(eShopDataPath)) {
        await updateEshopMeta()
    }
    const eShopTitles = await fs.readJson(eShopDataPath)
    titleId = titleId.toUpperCase();

    let titleMeta = eShopTitles[titleId] || { id: titleId, name: titleId, iconUrl: "" };
    titleMeta.name ??= await gameTitleFallBack(titleId);
    titleMeta.iconUrl ??= "";

    return titleMeta;
}


const gameTitleFallBack = async (titleId: string): Promise<string> => {

    const metadataFileDir = path.join(dataPath, "games", titleId, "gui", "metadata.json")

        const rawData = fs.readFileSync(metadataFileDir, 'utf-8')
        const metadata = JSON.parse(rawData)
        
        return metadata.title
}

const updateEshopMeta = async () => {

    const eshopMetaFile = fs.createWriteStream(path.resolve(eShopDataPath))

    //Will need to replace this file as it doesn't work with this implementation
    https.get("https://raw.githubusercontent.com/blawar/titledb/master/US.en.json", (response) => {
        
        response.pipe(eshopMetaFile);

        eshopMetaFile.on('finish', () => {
            eshopMetaFile.close(() => {
                console.log("eShop Metadata Downloaded")
                return true
            });
        });
    }).on('error', (err) => {
        console.log("Download error")
        return false
    })
}