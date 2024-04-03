export type ValueOf<T> = T[keyof T]

// // 获取枚举的 value
// type EnumValues = `${ENUM_TYPE}`

// // 获取枚举的 key
// type EnumKeys<T> = keyof typeof ENUM_TYPE

export type AddPrefix<Obj extends Record<string, any>, prefix extends string = ''> = {
  [Key in keyof Obj as `${prefix}${Key & string}`]: Obj[Key];
}
