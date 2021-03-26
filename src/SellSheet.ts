import winston from 'winston'
const parentLogger = winston.loggers.get('default')
const logger = parentLogger.child({module: 'SellSheet'})
import { GSheetsInterface } from './GSheetsInterface'
import { SellAssetRow, GApiError } from './types'


export class SellSheet {
    gSheetsInterface: GSheetsInterface

    constructor(gsheets: GSheetsInterface) {
        this.gSheetsInterface = gsheets
    }

    async SheetToObjects(): Promise<Array<SellAssetRow>> {
        let rows: Array<any> = await this.gSheetsInterface.fetchAllRows(SellAssetRow.NumFields)  // can throw GApiError
        if (rows.length === 0) return []

        const headers: Array<any> = rows[0]
        let output: Array<SellAssetRow> = []
        for (let i = 1; i < rows.length; i++) {
            let row = rows[i]
            let assetRow: any = new SellAssetRow()

            for (let k = 0; k < SellAssetRow.NumFields; k++){
                assetRow[headers[k]] = row[k]
            }
            if (assetRow.openseaUrl == null) assetRow.fillUrl()  // checks if contract add and token id is filled first

            output.push(assetRow)
        }
        return output
    }

    async PushObjects(assetRowList: Array<SellAssetRow & any>): Promise<boolean> {
        const numColumns = SellAssetRow.NumFields
        const headers = await this.gSheetsInterface.fetchHeaders(numColumns)
        
        let rows: Array<any> = []
        rows.push(headers)
        for (let asset of assetRowList) {
            let outputRow: Array<any> = []
            for (let i = 0; i < headers.length; i++) {
                outputRow[i] = asset[headers[i]]
            }
            rows.push(outputRow)
        }

        let success = await this.gSheetsInterface.pushRows(numColumns, rows)
        return success
    }
}