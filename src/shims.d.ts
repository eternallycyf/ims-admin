import type { AttributifyAttributes } from '@unocss/preset-attributify';

declare module 'react' {
  interface HTMLAttributes<T> extends AttributifyAttributes, DOMAttributes<T> {
    font?: AttributifyAttributes['font'] | 'code' | 'mone' | 'moneItalic';
  }
}
