"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DespesaModule = void 0;
var common_1 = require("@nestjs/common");
var despesa_service_1 = require("./despesa.service");
var despesa_controller_1 = require("./despesa.controller");
var despesa_entity_1 = require("./entities/despesa.entity");
var typeorm_1 = require("@nestjs/typeorm");
var disvalue_service_1 = require("./despesavalue/disvalue.service");
var disvalue_controller_1 = require("./despesavalue/disvalue.controller");
var DespesaModule = /** @class */ (function () {
    function DespesaModule() {
    }
    DespesaModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([despesa_entity_1.Despesa])],
            controllers: [despesa_controller_1.DespesaController, disvalue_controller_1.DisvalueController],
            providers: [despesa_service_1.DespesaService, disvalue_service_1.DisvalueService],
            exports: [despesa_service_1.DespesaService, disvalue_service_1.DisvalueService]
        })
    ], DespesaModule);
    return DespesaModule;
}());
exports.DespesaModule = DespesaModule;
