import type { AttributifyAttributes } from '@unocss/preset-attributify';

type UppercaseKey<Obj extends object> = {
  [Key in keyof Obj as `ims-${Key & string}`]: Obj[Key];
};

declare module 'react' {
  interface HTMLAttributes<T> extends UppercaseKey<AttributifyAttributes> {
    'ims-font'?: AttributifyAttributes['font'] | 'code' | 'mone' | 'moneItalic';
  }
}
