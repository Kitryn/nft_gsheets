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

    private _A1Range(first: number, numColumns: number): string {
        return `${RANGE_LETTERS.slice(first - 1, first)}1:${RANGE_LETTERS.slice(first + numColumns - 1, first + numColumns)}`
    }

    private async _fetchTableFromColumns(first: number, numColumns: number): Promise<Array<any> | null> {
        const A1Range = this._A1Range(first, numColumns)
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

    async fetchAllRows(numColumns: number): Promise<any> {
        let values = await this._fetchTableFromColumns(1, numColumns)
        if (values == null || values.length === 0) return []
        return values
    }

    async pushRows (numColumns: number, rows: Array<Array<any>>): Promise<boolean> {
        const A1Range = this._A1Range(1, numColumns)
        let clearRes = await this.sheets.spreadsheets.values.clear({
            spreadsheetId: this.spreadsheetId,
            range: A1Range
        })
        if (clearRes.statusText !== 'OK') {
            logger.error('Error while clearing rows from gsheets', {response: clearRes})
            return false
        }
        let updateRes = await this.sheets.spreadsheets.values.update({
            spreadsheetId: this.spreadsheetId,
            range: A1Range,
            valueInputOption: 'RAW',
            requestBody: {
                range: A1Range,
                majorDimension: 'ROWS',
                values: rows
            }
        })
        if (updateRes.statusText !== 'OK') {
            logger.error('Error while updating rows from gsheets', {response: updateRes})
            return false
        }
        logger.verbose(`Write ${rows.length} rows to gsheets successful`)
        return true
    }
}