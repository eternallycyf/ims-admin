import {
  CloseOutlined,
  LeftOutlined,
  QuestionCircleOutlined,
  RightOutlined,
} from '@ant-design/icons'
import { Card, Drawer, Radio, type RadioChangeEvent, Switch, Tooltip } from 'antd'
import { type CSSProperties, useState } from 'react'
import { m } from 'framer-motion'
import Color from 'color'
import { IconButton, SvgIcon } from '@/components/icon'
import { varHover } from '@/components/animate/variants/action'
import RedBlur from '@/assets/images/background/red-blur.png'
import CyanBlur from '@/assets/images/background/cyan-blur.png'
import { ComponentSize, type ThemeColorPresets, ThemeLayout } from '#/enum'
import { useSettingActions, useSettings } from '@/store/settingStore'
import { useThemeToken } from '@/hooks/theme/use-theme-token'
import { colorPrimarys } from '@/theme/antd-theme'
import LocalePicker from '@/layouts/components/locale-picker'
import ThemeModeBtn from '@/layouts/components/theme-mode-btn'
import FullScreen from '@/layouts/components/full-screen'
import { t } from '@/locales/i18n'
import useLocale from '@/locales/useLocale'

function SettingButton() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
  const { colorPrimary, colorBgBase, colorTextSecondary, colorTextTertiary, colorBgContainer }
    = useThemeToken()
  const { locale } = useLocale()

  const settings = useSettings()
  const { themeColorPresets, componentSize, themeLayout, themeStretch, breadCrumb, multiTab }
    = settings
  const { setSettings } = useSettingActions()

  const setComponentSize = (componentSize: `${ComponentSize}`) => {
    setSettings({
      ...settings,
      componentSize,
    })
  }

  const setThemeColorPresets = (themeColorPresets: ThemeColorPresets) => {
    setSettings({
      ...settings,
      themeColorPresets,
    })
  }

  const setThemeLayout = (themeLayout: ThemeLayout) => {
    setSettings({
      ...settings,
      themeLayout,
    })
  }

  const setThemeStretch = (themeStretch: boolean) => {
    setSettings({
      ...settings,
      themeStretch,
    })
  }

  const setBreadCrumn = (checked: boolean) => {
    setSettings({
      ...settings,
      breadCrumb: checked,
    })
  }

  const setMultiTab = (checked: boolean) => {
    setSettings({
      ...settings,
      multiTab: checked,
    })
  }

  const style: CSSProperties = {
    backdropFilter: 'blur(20px)',
    backgroundImage: `url("${CyanBlur}"), url("${RedBlur}")`,
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundColor: Color(colorBgContainer).alpha(0.9).toString(),
    backgroundPosition: 'right top, left bottom',
    backgroundSize: '50, 50%',
  }

  const bodyStyle: CSSProperties = {
    padding: 0,
  }

  const layoutBackground = (layout: ThemeLayout) =>
    themeLayout === layout
      ? `linear-gradient(135deg, ${colorBgBase} 0%, ${colorPrimary} 100%)`
      : '#919eab'

  return (
    <>
      <div className="flex items-center justify-center">
        <m.div
          animate={{
            rotate: [0, drawerOpen ? 0 : 360],
          }}
          transition={{
            duration: 12,
            ease: 'linear',
            repeat: Number.POSITIVE_INFINITY,
          }}
          whileTap="tap"
          whileHover="hover"
          variants={varHover(1.05)}
          onClick={() => setDrawerOpen(true)}
        >
          <IconButton className="h-10 w-10">
            <SvgIcon icon="ic-setting" size="24" />
          </IconButton>
        </m.div>
      </div>
      <Drawer
        forceRender
        placement="right"
        title={t('sys.setting.setting')}
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        closable={false}
        width={280}
        styles={{
          body: bodyStyle,
          mask: { backgroundColor: 'transparent' },
        }}
        style={style}
        extra={(
          <IconButton onClick={() => setDrawerOpen(false)} className="h-9 w-9 hover:scale-105">
            <CloseOutlined className="text-gray-400" />
          </IconButton>
        )}
        footer={<FullScreen />}
      >
        <div className="flex flex-col gap-6 p-6">
          {/* theme Theme */}
          <div flex-between>
            <div className="mb-3 text-base font-semibold" style={{ color: colorTextSecondary }}>
              {t('sys.setting.theme')}
            </div>
            <div className="flex flex-row gap-4">
              <ThemeModeBtn />
            </div>
          </div>

          {/* language */}
          <div flex-between>
            <div className="mb-3 text-base font-semibold" style={{ color: colorTextSecondary }}>
              {t('sys.setting.language')}
            </div>
            <div className="flex flex-row gap-4">
              <LocalePicker />
            </div>
          </div>

          <div flex-between>
            <div className="mb-3 text-base font-semibold" style={{ color: colorTextSecondary }}>
              {t('sys.setting.size')}
            </div>
            <div className="flex flex-row gap-4">
              <Radio.Group
                size={ComponentSize.Small}
                buttonStyle="solid"
                value={componentSize}
                onChange={(e: RadioChangeEvent) => setComponentSize(e.target.value)}
              >
                {Object.values(ComponentSize).map(key => (
                  <Radio.Button key={key} value={key}>
                    {key}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </div>
          </div>

          {/* theme layouts */}
          <div>
            <div className="mb-3 text-base font-semibold" style={{ color: colorTextSecondary }}>
              {t('sys.setting.layouts')}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Card
                onClick={() => setThemeLayout(ThemeLayout.Vertical)}
                className="h-14 cursor-pointer"
                style={{ flexGrow: 1, flexShrink: 0 }}
                styles={{
                  body: {
                    padding: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  },
                }}
              >
                <div className="h-full w-7 flex flex-shrink-0 flex-col gap-1 p-1">
                  <div
                    className="h-2 w-2 flex-shrink-0 rounded"
                    style={{ background: layoutBackground(ThemeLayout.Vertical) }}
                  />
                  <div
                    className="h-1 w-full flex-shrink-0 rounded opacity-50"
                    style={{ background: layoutBackground(ThemeLayout.Vertical) }}
                  />
                  <div
                    className="h-1 max-w-[12px] flex-shrink-0 rounded opacity-20"
                    style={{ background: layoutBackground(ThemeLayout.Vertical) }}
                  />
                </div>
                <div className="h-full w-full flex-1 flex-grow p-1">
                  <div
                    className="h-full w-full rounded opacity-20"
                    style={{ background: layoutBackground(ThemeLayout.Vertical) }}
                  />
                </div>
              </Card>
              <Card
                onClick={() => setThemeLayout(ThemeLayout.Horizontal)}
                className="h-14 cursor-pointer"
                style={{ flexGrow: 1, flexShrink: 0 }}
                styles={{
                  body: {
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  },
                }}
              >
                <div className="h-4 w-full flex items-center gap-1 p-1">
                  <div
                    className="h-2 w-2 flex-shrink-0 rounded"
                    style={{ background: layoutBackground(ThemeLayout.Horizontal) }}
                  />
                  <div
                    className="h-1 w-4 flex-shrink-0 rounded opacity-50"
                    style={{ background: layoutBackground(ThemeLayout.Horizontal) }}
                  />
                  <div
                    className="h-1 w-3 flex-shrink-0 rounded opacity-20"
                    style={{ background: layoutBackground(ThemeLayout.Horizontal) }}
                  />
                </div>
                <div className="h-full w-full flex-1 flex-grow p-1">
                  <div
                    className="h-full w-full rounded opacity-20"
                    style={{ background: layoutBackground(ThemeLayout.Horizontal) }}
                  />
                </div>
              </Card>
              <Card
                onClick={() => setThemeLayout(ThemeLayout.Mini)}
                className="h-14 cursor-pointer"
                style={{ flexGrow: 1, flexShrink: 0 }}
                styles={{
                  body: {
                    padding: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  },
                }}
              >
                <div className="h-full flex flex-shrink-0 flex-col gap-1 p-1">
                  <div
                    className="h-2 w-2 flex-shrink-0 rounded"
                    style={{ background: layoutBackground(ThemeLayout.Mini) }}
                  />
                  <div
                    className="h-1 w-full flex-shrink-0 rounded opacity-50"
                    style={{ background: layoutBackground(ThemeLayout.Mini) }}
                  />
                  <div
                    className="h-1 max-w-[12px] flex-shrink-0 rounded opacity-20"
                    style={{ background: layoutBackground(ThemeLayout.Mini) }}
                  />
                </div>
                <div className="h-full w-full flex-1 flex-grow p-1">
                  <div
                    className="h-full w-full rounded opacity-20"
                    style={{ background: layoutBackground(ThemeLayout.Mini) }}
                  />
                </div>
              </Card>
            </div>
          </div>

          {/* theme stretch */}
          <div key={locale}>
            <div className="mb-3 text-base font-semibold" style={{ color: colorTextSecondary }}>
              <span className="mr-2">
                {' '}
                {t('sys.setting.stretch')}
              </span>
              <Tooltip title={t('sys.setting.stretchTooltip')}>
                <QuestionCircleOutlined />
              </Tooltip>
            </div>

            <Card
              onClick={() => setThemeStretch(!themeStretch)}
              className="h-20 w-full flex cursor-pointer items-center justify-center"
              styles={{
                body: {
                  width: '50%',
                  padding: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              }}
            >
              {themeStretch
                ? (
                  <div
                    className="w-full flex items-center justify-between"
                    style={{
                      color: colorPrimary,
                      transition: 'width 300ms 0ms',
                    }}
                  >
                    <LeftOutlined />
                    <div className="flex flex-grow border-b border-dashed" />
                    <RightOutlined />
                  </div>
                  )
                : (
                  <div
                    className="w-1/2 flex items-center justify-between"
                    style={{
                      transition: 'width 300ms 0ms',
                    }}
                  >
                    <RightOutlined />
                    <div className="flex-grow border-b border-dashed" />
                    <LeftOutlined />
                  </div>
                  )}
            </Card>
          </div>

          {/* theme presets */}
          <div>
            <div className="mb-3 text-base font-semibold" style={{ color: colorTextSecondary }}>
              {t('sys.setting.presets')}
            </div>
            <div className="grid grid-cols-3 gap-x-4 gap-y-3">
              {Object.entries(colorPrimarys).map(([preset, color]) => (
                <Card
                  key={preset}
                  className="h-14 w-full flex cursor-pointer items-center justify-center"
                  style={{ backgroundColor: themeColorPresets === preset ? `${color}14` : '' }}
                  onClick={() => setThemeColorPresets(preset as ThemeColorPresets)}
                >
                  <div style={{ color }}>
                    <i className="i-material-symbols-light:circle" style={{ fontSize: themeColorPresets === preset ? 18 : 12 }} />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Page config */}
          <div>
            <div className="mb-5 text-base font-semibold" style={{ color: colorTextSecondary }}>
              {t('sys.setting.page')}
            </div>
            <div className="flex flex-col gap-5">
              <div
                className="flex items-center justify-between"
                style={{ color: colorTextTertiary }}
              >
                <div>
                  {' '}
                  {t('sys.setting.breadcrumb')}
                </div>
                <Switch
                  size="small"
                  checked={breadCrumb}
                  onChange={checked => setBreadCrumn(checked)}
                />
              </div>
              <div
                className="flex items-center justify-between"
                style={{ color: colorTextTertiary }}
              >
                <div>
                  {' '}
                  {t('sys.setting.multi-tab')}
                </div>
                <Switch
                  size="small"
                  checked={multiTab}
                  onChange={checked => setMultiTab(checked)}
                />
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default SettingButton
