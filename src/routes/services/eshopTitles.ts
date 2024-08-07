import path from "path"
import fs from "fs-extra"
import http from "http"
import https from "https"
import { app } from "electron"

export const getTitleInfo = async () => {
    updateEshopMeta()
}

const updateEshopMeta = async () => {

    const eshopMetaFile = fs.createWriteStream(path.resolve( app.getPath("exe"), 'US.en.json' ))

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