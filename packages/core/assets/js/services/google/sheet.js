import { getSheet } from "sheetsy";

export default async (id, sheet = "od6") => {
    let response = await getSheet(id, sheet);

    return response;
};
