export const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
export const RANGE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVXYZ'

export class SellAssetRow {
    walletAddress?: string
    nftContractAddress?: string
    collection?: string
    tokenId?: number
    openseaUrl?: string
    sellPrice?: number
    confirmSellPrice?: number
    static NumFields = 7

    constructor() {
    }

    fillUrl(): void {
        if (this.nftContractAddress != null && this.tokenId != null) {
            this.openseaUrl = `https://opensea.io/assets/${this.nftContractAddress}/${this.tokenId}`
        }        
    }
}

export class GApiError extends Error {
    constructor(message: string, data: any, ...params: any) {
        super(...params)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, GApiError)
        }
        this.name = 'GApi Error'
        this.message = message
    }
}