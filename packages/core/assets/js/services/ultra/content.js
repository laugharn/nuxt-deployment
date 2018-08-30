import query from "./query";

export default async params => {
    let content = await query(params);

    return content.posts[0];
};
