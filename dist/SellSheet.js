"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellSheet = void 0;
var winston_1 = __importDefault(require("winston"));
var parentLogger = winston_1.default.loggers.get('default');
var logger = parentLogger.child({ module: 'SellSheet' });
var types_1 = require("./types");
var SellSheet = /** @class */ (function () {
    function SellSheet(gsheets) {
        this.gSheetsInterface = gsheets;
    }
    SellSheet.prototype.SheetToObjects = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rows, headers, output, i, row, assetRow, k;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.gSheetsInterface.fetchAllRows(types_1.SellAssetRow.NumFields)]; // can throw GApiError
                    case 1:
                        rows = _a.sent() // can throw GApiError
                        ;
                        if (rows.length === 0)
                            return [2 /*return*/, []];
                        headers = rows[0];
                        output = [];
                        for (i = 1; i < rows.length; i++) {
                            row = rows[i];
                            assetRow = new types_1.SellAssetRow();
                            for (k = 0; k < types_1.SellAssetRow.NumFields; k++) {
                                assetRow[headers[k]] = row[k];
                            }
                            if (assetRow.openseaUrl == null)
                                assetRow.fillUrl(); // checks if contract add and token id is filled first
                            output.push(assetRow);
                        }
                        return [2 /*return*/, output];
                }
            });
        });
    };
    SellSheet.prototype.PushObjects = function (assetRowList) {
        return __awaiter(this, void 0, void 0, function () {
            var numColumns, headers, rows, _i, assetRowList_1, asset, outputRow, i, success;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        numColumns = types_1.SellAssetRow.NumFields;
                        return [4 /*yield*/, this.gSheetsInterface.fetchHeaders(numColumns)];
                    case 1:
                        headers = _a.sent();
                        rows = [];
                        rows.push(headers);
                        for (_i = 0, assetRowList_1 = assetRowList; _i < assetRowList_1.length; _i++) {
                            asset = assetRowList_1[_i];
                            outputRow = [];
                            for (i = 0; i < headers.length; i++) {
                                outputRow[i] = asset[headers[i]];
                            }
                            rows.push(outputRow);
                        }
                        return [4 /*yield*/, this.gSheetsInterface.pushRows(numColumns, rows)];
                    case 2:
                        success = _a.sent();
                        return [2 /*return*/, success];
                }
            });
        });
    };
    return SellSheet;
}());
exports.SellSheet = SellSheet;
