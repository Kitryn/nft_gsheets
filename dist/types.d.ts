export declare const SCOPES: string[];
export declare const RANGE_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
export declare class SellAssetRow {
    walletAddress?: string;
    nftContractAddress?: string;
    collection?: string;
    tokenId?: number;
    openseaUrl?: string;
    sellPrice?: number;
    confirmSellPrice?: number;
    static NumFields: number;
    constructor();
    fillUrl(): void;
}
export declare class GApiError extends Error {
    constructor(message: string, data: any, ...params: any);
}
