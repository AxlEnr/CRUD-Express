"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchIdDto = void 0;
// search-id.dto.ts
const config_1 = require("../../config");
class SearchIdDto {
    constructor(id) {
        this.id = id;
    }
    static create(data) {
        try {
            const validators = new config_1.Validators(data);
            validators.requiredKeys("id");
            validators.isInteger("id");
            const { id } = validators.data;
            return [undefined, new SearchIdDto(parseInt(id))];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.SearchIdDto = SearchIdDto;
