"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
let CabinetMedicalService = class CabinetMedicalService {
    constructor(http) {
        this._http = http;
    }
    get http() { return this._http; }
    getData(url) {
        return __awaiter(this, void 0, void 0, function* () {
            //get HTTP response as text
            const response = yield this.http.get(url, { responseType: 'text' }).toPromise();
            //parse the response with DOMParser
            let parser = new DOMParser();
            let doc = parser.parseFromString(response, "application/xml");
            //if no doc, exit
            if (!doc)
                return null;
            //default cabinet
            const cabinet = {
                infirmiers: [],
                patientsNonAffectés: [],
                adresse: this.getAdressFrom(doc.querySelector("cabinet"))
            };
        });
    }
    getAdressFrom(root) {
        let node;
        //Exemple pour récupérer la ville: root.querySelector("adresse > ville")
        //to be continued
    }
};
CabinetMedicalService = __decorate([
    core_1.Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.HttpClient !== "undefined" && http_1.HttpClient) === "function" && _a || Object])
], CabinetMedicalService);
exports.CabinetMedicalService = CabinetMedicalService;
var _a;
//# sourceMappingURL=cabinet-medical.service.js.map