import readline from 'readline'
import { google } from 'googleapis'

import { SCOPES } from './types'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function askCode(): Promise<string> {
    return new Promise((resolve) => {
        rl.question('Enter the code from that page here: ', (code: string) => { resolve(code) })
    })
}

export async function GetNewToken(credentials: any) {
    const { client_secret, client_id, redirect_uris } = credentials.installed
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    })
    console.log(`Authorize this app by visiting this url: ${authUrl}`)

    let code = await askCode()
    rl.close()

    let token = await oAuth2Client.getToken(code).catch((err: any) => {
        console.error('Error while trying to retrieve access token')
        throw new Error(err)
    })

    return token
}