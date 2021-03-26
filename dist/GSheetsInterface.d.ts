import { sheets_v4 } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
export declare class GSheetsInterface {
    oAuth2Client: OAuth2Client;
    spreadsheetId: string;
    sheets: sheets_v4.Sheets;
    constructor(credentials: any, token: any, spreadsheetId: string);
    private _A1Range;
    private _fetchTableFromColumns;
    fetchHeaders(numColumns: number): Promise<any>;
    fetchAllRows(numColumns: number): Promise<any>;
    pushRows(numColumns: number, rows: Array<Array<any>>): Promise<boolean>;
}
