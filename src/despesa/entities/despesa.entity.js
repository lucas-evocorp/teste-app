"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Despesa = void 0;
var swagger_1 = require("@nestjs/swagger");
var user_entity_1 = require("../../users/entities/user.entity");
var typeorm_1 = require("typeorm");
var Despesa = /** @class */ (function () {
    function Despesa() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)(),
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Despesa.prototype, "id");
    __decorate([
        (0, swagger_1.ApiProperty)(),
        (0, typeorm_1.Column)()
    ], Despesa.prototype, "title");
    __decorate([
        (0, swagger_1.ApiProperty)(),
        (0, typeorm_1.JoinColumn)({ name: 'amount ' }),
        (0, typeorm_1.Column)('decimal', { precision: 17, scale: 9 })
    ], Despesa.prototype, "amount");
    __decorate([
        (0, swagger_1.ApiProperty)(),
        (0, typeorm_1.Column)()
    ], Despesa.prototype, "category");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (user) { return user.despesas; }),
        (0, typeorm_1.JoinColumn)({ name: 'usersId ' })
    ], Despesa.prototype, "user");
    __decorate([
        (0, swagger_1.ApiProperty)(),
        (0, typeorm_1.Column)()
    ], Despesa.prototype, "usersId");
    __decorate([
        (0, swagger_1.ApiProperty)(),
        (0, typeorm_1.CreateDateColumn)()
    ], Despesa.prototype, "createdat");
    Despesa = __decorate([
        (0, typeorm_1.Entity)({ name: 'despesas' })
    ], Despesa);
    return Despesa;
}());
exports.Despesa = Despesa;
