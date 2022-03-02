"use strict";
exports.__esModule = true;
exports.UserAuth = void 0;
var common_1 = require("@nestjs/common");
exports.UserAuth = (0, common_1.createParamDecorator)(function (data, ctx) {
    var request = ctx.switchToHttp().getRequest();
    var user = request.user;
    return data ? user === null || user === void 0 ? void 0 : user[data] : user;
});
