"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GApiError = exports.SellAssetRow = exports.RANGE_LETTERS = exports.SCOPES = void 0;
exports.SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
exports.RANGE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVXYZ';
var SellAssetRow = /** @class */ (function () {
    function SellAssetRow() {
    }
    SellAssetRow.prototype.fillUrl = function () {
        if (this.nftContractAddress != null && this.tokenId != null) {
            this.openseaUrl = "https://opensea.io/assets/" + this.nftContractAddress + "/" + this.tokenId;
        }
    };
    SellAssetRow.NumFields = 7;
    return SellAssetRow;
}());
exports.SellAssetRow = SellAssetRow;
var GApiError = /** @class */ (function (_super) {
    __extends(GApiError, _super);
    function GApiError(message, data) {
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        var _this = _super.apply(this, params) || this;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, GApiError);
        }
        _this.name = 'GApi Error';
        _this.message = message;
        return _this;
    }
    return GApiError;
}(Error));
exports.GApiError = GApiError;
