enum validEnvironments {
    development = 'development',
    production = 'production',
}

enum HttpStatus {
    OK = 200,
    CREATED = 201,
    DELETED = 204,
}

enum RoleStatus {
    DISABLED = 0,
    ACTIVE = 1,
}

enum UserStatus {
    NOT_VERIFIED = 0,
    VERIFIED = 1,
    RESET_PASSWORD_ON_LOGIN = 2,
    DELETED = 3,
}

export {
    validEnvironments,
    HttpStatus,
    RoleStatus,
    UserStatus
};