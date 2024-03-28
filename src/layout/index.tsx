import { useState } from 'react';

import './index.less';

interface LayoutProps {}

export default function (props: LayoutProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  return (
    <>
      <div ims-w="200" className="customTheme flex justify-between">
        <button onClick={() => setTheme((theme) => (theme === 'dark' ? 'light' : 'dark'))}>
          toggle
        </button>
        <span ims-font="moneItalic">current theme is {theme}</span>
      </div>
      <div className={theme}>
        <div ims-color="red" ims-dark-color="blue">
          layout
        </div>
      </div>
      <div className="h-full flex select-none text-center all:transition-400">
        <p ims-text-16 ims-px-10 ims-shadow="[0_0_10px_4px_#dedede]">
          iceCode
        </p>
      </div>
      <button className="border border-red">Button</button>
      <button ims-border="~ red">Button</button>
      <div className="i-ph-anchor-simple-thin" />
      <ims-bg-red>ims-bg-red</ims-bg-red>
      <div className="font-(light mono) hover:(bg-gray-400 font-medium)">11</div>
      <div className="font-light font-mono hover:bg-gray-400 hover:font-medium">22</div>
      <div ims-hover="bg-gray-400 font-medium" ims-font="light mono">
        33
      </div>

      <div ims-text-red text-center text-5xl animate-bounce>
        unocss
      </div>
      <div ims-border-b-blue>232222222222222</div>

      <p className="24 #222 center hover:color-red-400" fw-800 mb--20>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo veniam aut esse iure
        mollitia. Earum omnis aliquid minus porro nulla commodi dignissimos, voluptatem accusamus
        cumque reprehenderit, ea nisi perferendis quis.
      </p>

      <p className="text-center text-24 text-#222 fw-800 -mb-20 hover:text-red-400">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo veniam aut esse iure
        mollitia. Earum omnis aliquid minus porro nulla commodi dignissimos, voluptatem accusamus
        cumque reprehenderit, ea nisi perferendis quis.
      </p>
    </>
  );
}
