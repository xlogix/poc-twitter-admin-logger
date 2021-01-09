var validEnvironments;
(function (validEnvironments) {
    validEnvironments["development"] = "development";
    validEnvironments["production"] = "production";
})(validEnvironments || (validEnvironments = {}));
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["OK"] = 200] = "OK";
    HttpStatus[HttpStatus["CREATED"] = 201] = "CREATED";
    HttpStatus[HttpStatus["DELETED"] = 204] = "DELETED";
})(HttpStatus || (HttpStatus = {}));
var RoleStatus;
(function (RoleStatus) {
    RoleStatus[RoleStatus["DISABLED"] = 0] = "DISABLED";
    RoleStatus[RoleStatus["ACTIVE"] = 1] = "ACTIVE";
})(RoleStatus || (RoleStatus = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus[UserStatus["NOT_VERIFIED"] = 0] = "NOT_VERIFIED";
    UserStatus[UserStatus["VERIFIED"] = 1] = "VERIFIED";
    UserStatus[UserStatus["RESET_PASSWORD_ON_LOGIN"] = 2] = "RESET_PASSWORD_ON_LOGIN";
    UserStatus[UserStatus["DELETED"] = 3] = "DELETED";
})(UserStatus || (UserStatus = {}));
export { validEnvironments, HttpStatus, RoleStatus, UserStatus };
//# sourceMappingURL=constants.js.map