import type zh_CN from '@/locales/lang/zh_CN'

export type ValueOf<T> = T[keyof T]

// // 获取枚举的 value
// type EnumValues = `${ENUM_TYPE}`

// // 获取枚举的 key
// type EnumKeys<T> = keyof typeof ENUM_TYPE

export type AddPrefix<Obj extends Record<string, any>, prefix extends string = ''> = {
  [Key in keyof Obj as `${prefix}${Key & string}`]: Obj[Key];
}

type GetDictValue<T extends string, O> =
    T extends `${infer A}.${infer B}` ? A extends keyof O ? GetDictValue<B, O[A]> : never
      : T extends keyof O ? O[T] : never

 type DeepKeys<T, S extends string> =
    T extends object
      ? S extends `${infer I1}.${infer I2}`
        ? I1 extends keyof T
        // fix issue allowed last dot
          ? T[I1] extends object
            ? `${I1}.${DeepKeys<T[I1], I2>}`
            : keyof T & string
          : keyof T & string
        : S extends keyof T
          ? `${S}`
          : keyof T & string
      : ''

export interface TranslateFnType {
  <S extends string>(p: DeepKeys<typeof zh_CN, S>): GetDictValue<S, typeof zh_CN>
}
