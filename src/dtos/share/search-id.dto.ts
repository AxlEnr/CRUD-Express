// search-id.dto.ts
import { Validators } from "../../config";
import { DynamicObject } from "./DynamicObject";

export class SearchIdDto {
    private constructor(
        public readonly id: number
    ) {}

    static create(data: DynamicObject): [string?, SearchIdDto?] {
        try {
            const validators = new Validators(data);
            validators.requiredKeys("id");
            validators.isInteger("id");

            const { id } = validators.data;
            return [undefined, new SearchIdDto(parseInt(id))];
        } catch (error) {
            return [error as string];
        }
    }
}