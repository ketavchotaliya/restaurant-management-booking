"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MICRO_SERVICE = exports.ROLES_NAME = exports.ROLES = exports.APP_TYPES = exports.REDIS_TTL = exports.APP_LINKS = exports.APP_HOSTS = exports.HOST = exports.APP = exports.RECORDS_PER_PAGE_FOR_PROVIDER_MATERIAL_LIST = exports.RECORDS_PER_PAGE = exports.REGEXP = void 0;
// Reg ex list
exports.REGEXP = {
    DATE_FORMAT: /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/,
    DATE_TIME_FORMAT: /^\d\d\d\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01]) (00|0[1-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9])$/,
    PASSWORD_REGEXP: /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z])(.{8,}))$/,
    ALPHA_NUMERIC_REGEXP: /^[A-Za-z0-9 ]*$/,
    ALPHABETS_REGEXP: /^[A-Za-z ]*$/,
    EMAIL_ADDRESS_REGEXP: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    URL: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
};
exports.RECORDS_PER_PAGE = 10;
exports.RECORDS_PER_PAGE_FOR_PROVIDER_MATERIAL_LIST = 15;
// APP id list
exports.APP = {
    IDENTITY: 1,
    OWNER: 2,
    CUSTOMER: 3
};
// APP Hosts
exports.HOST = () => {
    const ENV = process.env.ENV;
    if (ENV === 'development') {
        return {
            ADMIN: `http://dev.google.com`,
        };
    }
    else if (ENV === 'test') {
        return {
            ADMIN: `http://test.google.com`,
        };
    }
    else {
        return {
            ADMIN: `http://dev-admin.google.com`,
        };
    }
};
exports.APP_HOSTS = {
    ADMIN: exports.HOST().ADMIN,
};
// APP Links
exports.APP_LINKS = {
    SET_PASSWORD: '/reset-password',
};
// Redis TTL
exports.REDIS_TTL = '180';
// System App Types
exports.APP_TYPES = {
    OWNER: 1,
    BOOKING: 2,
    ADMIN: 3,
};
// System roles
exports.ROLES = {
    OWNER: 1,
    CUSTOMER: 2,
};
exports.ROLES_NAME = ['Owner', 'Customer'];
exports.MICRO_SERVICE = {
    IDENTITY: 1,
    OWNER: 2,
    BOOKING: 3,
};
//# sourceMappingURL=constants.js.map