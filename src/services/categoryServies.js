import { get } from "../untils/request";

export const getCategory = async () => {
    const result = await get("category");
    return result;
}