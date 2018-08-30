/**
 * Trims the path as necessary for content-based middleware
 */
export default (path, prefix = null) => {
    path = path.toLowerCase();

    if (path.startsWith(prefix)) path = path.substring(prefix.length);
    if (path.endsWith("/")) path = path.substring(0, path.length - 1);

    return path;
};
