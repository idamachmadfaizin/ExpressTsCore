"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringHelper = void 0;
class StringHelper {
    /**
     * Get domain from full url
     * @param url string url start from http or https
     */
    static domain(url) {
        return url.replace('http://', '').replace('https://', '').split(/[/?#]/)[0];
    }
    static urlPrefix(url) {
        return `/api/${process.env.APP_VERSION}${url ?? null}`;
    }
    static limit(sentence, charLimit, ending = ' ...') {
        return sentence.substr(0, charLimit).replace(/\s$/, '') + ending;
    }
    static words(sentence, wordLimit, ending = ' ...') {
        return sentence.split(' ', wordLimit).join(' ') + ending;
    }
}
exports.StringHelper = StringHelper;
//# sourceMappingURL=string.helper.js.map