import type { AttributifyNames } from '@unocss/preset-attributify'

type Prefix = ''

declare module 'react' {
  interface HTMLAttributes extends Partial<Record<AttributifyNames<Prefix>, string>> {
    font?:
      | AttributifyNames<Prefix>['font']
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
      // 'bg-red': {
      //   children?: React.ReactNode
      // }
      // 'my-custom-tag': {
      //   'my-custom-attribute'?: string;
      // };
      // 'ims-flex': React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    }
  }
}
