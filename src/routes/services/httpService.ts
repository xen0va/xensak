import { URL } from "url"
import fs from "fs-extra"
import Http from 'http'
import path from 'path'
import { app, App } from "electron"
import http from 'http';

const CDN_URL:string = "https://localhost:8080/" 

export enum HTTP_PATHS {
    SHADER_ZIP  = "/nintendo/shaders/{title_id}.zip",
}

export const getWithProgress = async (titleId:string, destinationPath:string, url:string) => {
    const file = fs.createWriteStream(path.join(app.getAppPath(), `${titleId}.zip`))
    let receivedBytes = 0
    let totalBytes = 0

    var currentRequest = http.get(url, (response) => {
        totalBytes = parseInt(response.headers['content-length'], 10);

        response.on('data', (chunk) => {
            receivedBytes += chunk.length;
            file.write(chunk)
            console.log(receivedBytes)
        })

        response.on('end', () => {
            file.end()
            currentRequest = null
        })

        response.on('error', (err) => {
            console.log(`Download error: ${err}`)
        })



    })

}

