import { google, sheets_v4 } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'
import winston from 'winston'
const parentLogger = winston.loggers.get('default')
const logger = parentLogger.child({module: 'GSheetsInterface'})

import { RANGE_LETTERS } from './types'

export class GSheetsInterface {
    oAuth2Client: OAuth2Client
    spreadsheetId: string
    sheets: sheets_v4.Sheets
    
    constructor(credentials: any, token: any, spreadsheetId: string) {
        const { client_secret, client_id, redirect_uris } = credentials.installed
        this.oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])
        this.oAuth2Client.setCredentials(token)
        this.spreadsheetId = spreadsheetId
        this.sheets = google.sheets({version: 'v4', auth: this.oAuth2Client})
    }

    private async _fetchTableFromColumns(first: number, numColumns: number): Promise<Array<any> | null> {
        const A1Range = `${RANGE_LETTERS.slice(first - 1, first)}1:${RANGE_LETTERS.slice(first + numColumns - 1, first + numColumns)}`
        let res = await this.sheets.spreadsheets.values.get({
            spreadsheetId: this.spreadsheetId,
            range: A1Range,
            valueRenderOption: 'UNFORMATTED_VALUE',
            dateTimeRenderOption: 'FORMATTED_STRING',
            majorDimension: 'ROWS'
        })
        let values = res?.data?.values
        if (res.statusText !== 'OK' || values == null) {
            logger.error(`Error while fetching rows from GSheets`, {response: res})
            return null
        }
        
        return values
    }

    async fetchHeaders(numColumns: number): Promise<any> {
        let values = await this._fetchTableFromColumns(1, numColumns)
        if (values == null || values.length === 0) return []
        return values[0]
    }
}