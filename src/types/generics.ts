// A GENERIC TO OMIT A FIELD FORM AN OBJECT
export type ObjectOmitter<ObjectType extends object, KeyType extends keyof ObjectType> = {
    [key in keyof ObjectType as key extends KeyType ? never : key]: ObjectType[key]
}