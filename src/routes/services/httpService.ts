import { URL } from "url"
import fs from "fs-extra"
import Http from 'http'
import path from 'path'
import { app, App } from "electron"
import http from 'http';

const CDN_URL:string = "http://localhost:8080" 

export enum HTTP_PATHS {
    SHADER_ZIP  = "/nintendo/shaders/{title_id}.zip",
}

export const getWithProgress = async (destinationPath:string, url:string): Promise<any> => {
    return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destinationPath)
    let receivedBytes = 0
    let totalBytes = 0

    var currentRequest = http.get(url, (response) => {
        totalBytes = parseInt(response.headers['content-length'], 10);
        
            response.on('data', (chunk) => {
                receivedBytes += chunk.length;
                file.write(chunk)
            })
            response.on('end', () => {
                file.end()
                currentRequest = null
            })
            response.on('error', () => {
                reject(false)
            })

            file.on("finish", () => {
                destinationPath
                resolve(true)
            })
        })
    }).catch(() => null)
}

export const downloadShaders = async(titleId:string, destinationPath:string): Promise<boolean> => {
    const url = CDN_URL + HTTP_PATHS.SHADER_ZIP.replace("{title_id}", titleId)
    return getWithProgress(destinationPath, url)
}

