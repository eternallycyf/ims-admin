import { useState } from 'react';
import './index.less';

interface LayoutProps {}

export default function (props: LayoutProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  return (
    <>
      <div ims-w="200" className="flex justify-between customTheme">
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
      <div className="h-full text-center flex select-none all:transition-400">
        <p ims-text-16 ims-px-10 ims-shadow="[0_0_10px_4px_#dedede]">
          iceCode
        </p>
      </div>
      <button className="border border-red">Button</button>
      <button ims-border="~ red">Button</button>
      <div className="i-ph-anchor-simple-thin" />
      <ims-bg-red>ims-bg-red</ims-bg-red>
      <div className="hover:(bg-gray-400 font-medium) font-(light mono)">11</div>
      <div className="hover:bg-gray-400 hover:font-medium font-light font-mono">22</div>
      <div ims-hover="bg-gray-400 font-medium" ims-font="light mono">
        33
      </div>

      <div className="btn-blue">23</div>

      <p className="24 center #222 hover:color-red-400" fw-800 mb--20>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo veniam aut esse iure
        mollitia. Earum omnis aliquid minus porro nulla commodi dignissimos, voluptatem accusamus
        cumque reprehenderit, ea nisi perferendis quis.
      </p>

      <p className="text-24 text-center text-#222 fw-800 hover:text-red-400 -mb-20">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo veniam aut esse iure
        mollitia. Earum omnis aliquid minus porro nulla commodi dignissimos, voluptatem accusamus
        cumque reprehenderit, ea nisi perferendis quis.
      </p>
    </>
  );
}
