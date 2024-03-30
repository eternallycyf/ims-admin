import { Button, ColorPicker, ConfigProvider, DatePicker, Dropdown, theme } from 'antd';
import { useLocalStorageState } from 'ahooks';
import { useEffect, useState } from 'react';
import type { ThemeConfig } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import type { Locale } from 'antd/es/locale';
import ToggleTheme from './ToggleTheme';
import type { ThemeMode } from '@/types/theme';
import { useDark } from '@/hooks/theme/useDark';
import { PRIMARY_COLOR_KEY, THEME_MODE_KEY } from '@/constant';
import { localeList } from '@/settings/localeSetting';
import { useDesign } from '@/hooks/web/useDesign';

const { useToken } = theme;

function App() {
  const [locale, setLocal] = useState<Locale>(zhCN);
  const [selectedKey, setSelectedKey] = useState<string>(localeList?.[0]?.key as any);
  const { token = {} } = useToken();
  const { prefixCls: _prefixCls } = useDesign('dark-switch');

  const [primaryColor, setPrimaryColor] = useLocalStorageState(PRIMARY_COLOR_KEY, {
    defaultValue: DEFAULT_PRIMARY_COLOR as string,
    serializer: (v) => v,
    deserializer: (v) => v,
  });

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', primaryColor!);
    Object.entries(token).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value as string);
    });
  }, [primaryColor]);

  const [mode, setMode] = useLocalStorageState<ThemeMode>(THEME_MODE_KEY, {
    defaultValue: 'auto',
    serializer: (v) => v,
    deserializer: (v) => v as ThemeMode,
  });

  // const getLocaleText = useMemo(() => {
  //   // @ts-expect-error: if key is not string, it will be error
  //   return localeList?.find((item) => item?.key === selectedKey)?.label;
  // }, [selectedKey]);

  const isDark = useDark(mode!);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.classList.toggle('light', !isDark);
  }, [isDark]);

  const antdTheme: ThemeConfig = {
    token: { colorPrimary: primaryColor },
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
  };

  return (
    <ConfigProvider theme={antdTheme} locale={locale}>
      <div className="mb-4 flex items-center gap-x-3 p-4">
        <ColorPicker value={primaryColor} onChange={(_, c) => setPrimaryColor(c)} />

        <span className="border border-primary text-primary p-2">{primaryColor}</span>

        <Button type="primary">123</Button>
        <Button>zzz</Button>
        <DatePicker />

        <Dropdown
          placement="bottom"
          trigger={['click']}
          menu={{
            items: localeList.map((item) => ({
              ...item,
              onClick: (e) => {
                // console.log(e.key);
                if (e.key === localeList[0].key) setLocal(zhCN);
                else setLocal(enUS);

                setSelectedKey(e.key);
              },
            })),
            selectable: true,
            selectedKeys: [selectedKey],
          }}
          overlayClassName="app-locale-picker-overlay"
        >
          <span className="flex cursor-pointer items-center">
            <i className="i-ooui:language" />
            {/* <span className="ml-1">{getLocaleText}</span> */}
          </span>
        </Dropdown>

        <ToggleTheme mode={mode!} onChange={(m) => setMode(m)} />
      </div>

      <h1 className="text-10 m-4 dark:text-yellow">Light or dark</h1>
    </ConfigProvider>
  );
}

export default App;
