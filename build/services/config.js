"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDENTITY = exports.HOST = void 0;
// Get host details of micro service apps
exports.HOST = () => {
    const ENV = process.env.ENV;
    let IDENTITY;
    if (ENV === 'localhost') {
        IDENTITY = process.env.IDENTITY_SERVICE_DEV;
    }
    else {
        IDENTITY = process.env.IDENTITY_SERVICE_LIVE;
    }
    return {
        IDENTITY,
    };
};
// SETUP Identity Service Routes
exports.IDENTITY = {
    // Authentication Resources
    PROVIDER_LOGIN: 'identity/login/email',
    STUDENT_LOGIN: 'identity/login/mobile',
    AUTHORIZE_USER: 'private/authorize',
    GENERATE_CUSTOM_TOKEN: 'private/custom/token',
    GET_ALL_CLAIMS: `private/claim`,
    PRIVATE_LOGIN: (userId) => `private/user/${userId}/login`,
    LOGOUT: 'identity/logout',
    LOGOUT_ALL: (userId) => `/private/user/${userId}/logout/all`,
    // User Resources
    CREATE_USER: 'identity/user',
    CREATE_BULK_USER: '/identity/bulk/user',
    GET_PROVIDER: (appId, email) => `identity/user/app/${appId}/email/${email}`,
    GET_STUDENT: (appId, dialCodeId, mobile) => `identity/user/app/${appId}/mobile/${dialCodeId}/${mobile}`,
    DELETE_USER: (userId) => `identity/user/${userId}`,
    VERIFY_PROVIDER: (userId, verify) => `identity/user/${userId}/email/verify/${verify}`,
    VERIFY_STUDENT: (userId, verify) => `identity/user/${userId}/mobile/verify/${verify}`,
    ACTIVATE_USER: (userId, active) => `identity/toggle/user/${userId}/active/${active}`,
    UPDATE_CONTACT: (userId) => `identity/user/${userId}/mobile`,
    // Role Resources
    REPLACE_PROVIDER_ROLE: (userId, providerId, roleId) => `private/user/${userId}/provider/${providerId}/role/${roleId}/replace`,
    // Credential Resources
    RESET_PASSWORD: (userId) => `private/user/${userId}/reset/password`,
    CHANGE_PASSWORD: `identity/user/password`,
};
//# sourceMappingURL=config.js.map