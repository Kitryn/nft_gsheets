import { GSheetsInterface } from './GSheetsInterface';
import { SellAssetRow } from './types';
export declare class SellSheet {
    gSheetsInterface: GSheetsInterface;
    constructor(gsheets: GSheetsInterface);
    SheetToObjects(): Promise<Array<SellAssetRow>>;
    PushObjects(assetRowList: Array<SellAssetRow & any>): Promise<boolean>;
}
