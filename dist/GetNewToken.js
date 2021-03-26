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
exports.GetNewToken = void 0;
var readline_1 = __importDefault(require("readline"));
var googleapis_1 = require("googleapis");
var types_1 = require("./types");
var rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
function askCode() {
    return new Promise(function (resolve) {
        rl.question('Enter the code from that page here: ', function (code) { resolve(code); });
    });
}
function GetNewToken(credentials) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, client_secret, client_id, redirect_uris, oAuth2Client, authUrl, code, token;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = credentials.installed, client_secret = _a.client_secret, client_id = _a.client_id, redirect_uris = _a.redirect_uris;
                    oAuth2Client = new googleapis_1.google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
                    authUrl = oAuth2Client.generateAuthUrl({
                        access_type: 'offline',
                        scope: types_1.SCOPES
                    });
                    console.log("Authorize this app by visiting this url: " + authUrl);
                    return [4 /*yield*/, askCode()];
                case 1:
                    code = _b.sent();
                    rl.close();
                    return [4 /*yield*/, oAuth2Client.getToken(code).catch(function (err) {
                            console.error('Error while trying to retrieve access token');
                            throw new Error(err);
                        })];
                case 2:
                    token = _b.sent();
                    return [2 /*return*/, token];
            }
        });
    });
}
exports.GetNewToken = GetNewToken;
