import type { AttributifyAttributes } from '@unocss/preset-attributify'

type UppercaseKey<Obj extends object> = {
  // [Key in keyof Obj as `ims-${Key & string}`]: Obj[Key];
  [Key in keyof Obj as `${Key & string}`]: Obj[Key];
}

declare module 'react' {
  interface HTMLAttributes<T> extends UppercaseKey<AttributifyAttributes> {
    font?:
      | AttributifyAttributes['font']
      | 'code'
      | 'mone'
      | 'moneItalic'
      | 'lato'
      | 'lobster'
      | 'sans'
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // 'ims-bg-red': {
      //   children?: React.ReactNode;
      // };
      'bg-red': {
        children?: React.ReactNode
      }
      // 'my-custom-tag': {
      //   'my-custom-attribute'?: string;
      // };
      // 'ims-flex': React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    }
  }
}
