/**
 * build tree list from an array
 * @param list source list
 * @param idPath the key path of the current object's id
 * @param parentKeyPath the parent key path of the object
 * @returns
 */
export declare const buildTree: <T>(list: T[] | undefined, idPath: string, parentKeyPath: string) => (T & {
    children: T[];
})[];
