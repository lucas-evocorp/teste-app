"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TotalValueModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var auth_module_1 = require("../auth/auth.module");
var despesa_module_1 = require("../despesa/despesa.module");
var despesa_entity_1 = require("../despesa/entities/despesa.entity");
var receita_entity_1 = require("../receita/entities/receita.entity");
var receita_module_1 = require("../receita/receita.module");
var users_module_1 = require("../users/users.module");
var totalvalue_controller_1 = require("./totalvalue.controller");
var TotalValueModule = /** @class */ (function () {
    function TotalValueModule() {
    }
    TotalValueModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([receita_entity_1.Receita]),
                typeorm_1.TypeOrmModule.forFeature([despesa_entity_1.Despesa]),
                users_module_1.UsersModule,
                receita_module_1.ReceitaModule,
                despesa_module_1.DespesaModule,
                auth_module_1.AuthModule,
            ],
            controllers: [totalvalue_controller_1.TotalValueController],
            providers: [],
            exports: []
        })
    ], TotalValueModule);
    return TotalValueModule;
}());
exports.TotalValueModule = TotalValueModule;
