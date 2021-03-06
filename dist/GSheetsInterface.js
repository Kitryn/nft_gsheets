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
exports.GSheetsInterface = void 0;
var googleapis_1 = require("googleapis");
var winston_1 = __importDefault(require("winston"));
var parentLogger = winston_1.default.loggers.get('default');
var logger = parentLogger.child({ module: 'GSheetsInterface' });
var types_1 = require("./types");
var GSheetsInterface = /** @class */ (function () {
    function GSheetsInterface(credentials, token, spreadsheetId) {
        var _a = credentials.installed, client_secret = _a.client_secret, client_id = _a.client_id, redirect_uris = _a.redirect_uris;
        this.oAuth2Client = new googleapis_1.google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
        this.oAuth2Client.setCredentials(token);
        this.spreadsheetId = spreadsheetId;
        this.sheets = googleapis_1.google.sheets({ version: 'v4', auth: this.oAuth2Client });
    }
    GSheetsInterface.prototype._A1Range = function (first, numColumns) {
        return types_1.RANGE_LETTERS.slice(first - 1, first) + "1:" + types_1.RANGE_LETTERS.slice(first + numColumns - 1, first + numColumns);
    };
    GSheetsInterface.prototype._fetchTableFromColumns = function (first, numColumns) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var A1Range, res, values;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        A1Range = this._A1Range(first, numColumns);
                        return [4 /*yield*/, this.sheets.spreadsheets.values.get({
                                spreadsheetId: this.spreadsheetId,
                                range: A1Range,
                                valueRenderOption: 'UNFORMATTED_VALUE',
                                dateTimeRenderOption: 'FORMATTED_STRING',
                                majorDimension: 'ROWS'
                            })];
                    case 1:
                        res = _b.sent();
                        values = (_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.values;
                        if (res.statusText !== 'OK' || values == null) {
                            throw new types_1.GApiError("Error while fetching rows from GSheets", res);
                        }
                        return [2 /*return*/, values];
                }
            });
        });
    };
    GSheetsInterface.prototype.fetchHeaders = function (numColumns) {
        return __awaiter(this, void 0, void 0, function () {
            var values;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._fetchTableFromColumns(1, numColumns)];
                    case 1:
                        values = _a.sent();
                        if (values == null || values.length === 0)
                            return [2 /*return*/, []];
                        return [2 /*return*/, values[0]];
                }
            });
        });
    };
    GSheetsInterface.prototype.fetchAllRows = function (numColumns) {
        return __awaiter(this, void 0, void 0, function () {
            var values;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._fetchTableFromColumns(1, numColumns)];
                    case 1:
                        values = _a.sent();
                        if (values == null || values.length === 0)
                            return [2 /*return*/, []];
                        return [2 /*return*/, values];
                }
            });
        });
    };
    GSheetsInterface.prototype.pushRows = function (numColumns, rows) {
        return __awaiter(this, void 0, void 0, function () {
            var A1Range, clearRes, updateRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        A1Range = this._A1Range(1, numColumns);
                        return [4 /*yield*/, this.sheets.spreadsheets.values.clear({
                                spreadsheetId: this.spreadsheetId,
                                range: A1Range
                            })];
                    case 1:
                        clearRes = _a.sent();
                        if (clearRes.statusText !== 'OK') {
                            logger.error('Error while clearing rows from gsheets', { response: clearRes });
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.sheets.spreadsheets.values.update({
                                spreadsheetId: this.spreadsheetId,
                                range: A1Range,
                                valueInputOption: 'RAW',
                                requestBody: {
                                    range: A1Range,
                                    majorDimension: 'ROWS',
                                    values: rows
                                }
                            })];
                    case 2:
                        updateRes = _a.sent();
                        if (updateRes.statusText !== 'OK') {
                            logger.error('Error while updating rows from gsheets', { response: updateRes });
                            return [2 /*return*/, false];
                        }
                        logger.verbose("Write " + rows.length + " rows to gsheets successful");
                        return [2 /*return*/, true];
                }
            });
        });
    };
    return GSheetsInterface;
}());
exports.GSheetsInterface = GSheetsInterface;
