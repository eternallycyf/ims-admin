import type { GlobalToken, InputRef } from 'antd'
import { Empty, Input, Modal } from 'antd'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import Color from 'color'
import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useBoolean, useEventListener, useKeyPress } from 'ahooks'
import styled from 'styled-components'

import { IconButton, ScrollBar, SvgIcon } from '@/components'
import { useFlattenedRoutes, useRouter } from '@/hooks/router'
import { useThemeToken } from '@/hooks/theme'
import ProTag from '@/theme/antd/tag'

const StyledListItemButton = styled.div<{ $themetoken: GlobalToken }>`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: 100%;
  padding: 8px 16px;
  border-radius: 8px;
  border-bottom: ${props => `1px dashed ${props.$themetoken.colorBorder}`};
  color: ${props => `${props.$themetoken.colorTextSecondary}`};
`

export default function SearchBar() {
  const { t } = useTranslation()
  const { replace } = useRouter()
  const inputRef = useRef<InputRef>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const [search, { setTrue, setFalse }] = useBoolean(false)

  const themeToken = useThemeToken()

  const flattenedRoutes = useFlattenedRoutes()

  const activeStyle: CSSProperties = {
    border: `1px dashed ${themeToken.colorPrimary}`,
    backgroundColor: `${Color(themeToken.colorPrimary).alpha(0.2).toString()}`,
  }

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResult, setSearchResult] = useState(flattenedRoutes)
  const [selectedItemIndex, setSelectedItemIndex] = useState(0)

  useEffect(() => {
    const result = flattenedRoutes.filter(
      item =>
        t(item.label).toLowerCase().includes(searchQuery.toLowerCase())
        || item.key.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setSearchResult(result)
    setSelectedItemIndex(0)
  }, [searchQuery, t, flattenedRoutes])

  const scrollSelectedItemIntoView = (index: number) => {
    if (listRef.current) {
      const selectedItem = listRef.current.children[index]
      selectedItem.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }

  const handleOpen = () => {
    setTrue()
    setSearchQuery('')
    setSelectedItemIndex(0)
  }

  const handleCancel = () => setFalse()

  const handleSelect = (key: string) => {
    replace(key)
    handleCancel()
  }

  const handleMetaK = (event: KeyboardEvent) => {
    if (event.metaKey && event.key === 'k') {
      // https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/metaKey
      handleOpen()
    }
  }
  useEventListener('keydown', handleMetaK)

  useKeyPress('uparrow', (event) => {
    if (!search)
      return
    event.preventDefault()
    let nextIndex = selectedItemIndex - 1
    if (nextIndex < 0)
      nextIndex = searchResult.length - 1

    setSelectedItemIndex(nextIndex)
    scrollSelectedItemIntoView(nextIndex)
  })

  useKeyPress('downarrow', (event) => {
    if (!search)
      return
    event.preventDefault()
    let nextIndex = selectedItemIndex + 1
    if (nextIndex > searchResult.length - 1)
      nextIndex = 0

    setSelectedItemIndex(nextIndex)
    scrollSelectedItemIntoView(nextIndex)
  })

  useKeyPress('Enter', (event) => {
    if (!search || searchResult.length === 0)
      return
    event.preventDefault()
    const selectItem = searchResult[selectedItemIndex].key
    if (selectItem) {
      handleSelect(selectItem)
      setFalse()
    }
  })

  useKeyPress('Escape', () => {
    handleCancel()
  })

  const handleAfterOpenChange = (open: boolean) => {
    if (open) {
      // auto focus
      inputRef.current?.focus()
    }
  }

  const handleHover = (index: number) => {
    if (index === selectedItemIndex)
      return
    setSelectedItemIndex(index)
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <IconButton className="h-10 w-10" onClick={handleOpen}>
          <SvgIcon icon="ic-search" size="20" />
        </IconButton>
        <IconButton className="0 bg-hover h-6 rounded-md text-xs font-bold">⌘K</IconButton>
      </div>
      <Modal
        centered
        keyboard
        open={search}
        onCancel={handleCancel}
        closeIcon={false}
        afterOpenChange={handleAfterOpenChange}
        styles={{
          body: {
            height: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          },
        }}
        title={(
          <Input
            ref={inputRef}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search..."
            variant="borderless"
            autoFocus
            prefix={<SvgIcon icon="ic-search" size="20" />}
            suffix={(
              <IconButton className="bg-hover h-6 rounded-md text-xs" onClick={handleCancel}>
                Esc
              </IconButton>
            )}
          />
        )}
        footer={(
          <div className="flex flex-wrap">
            <div className="flex">
              <ProTag color="cyan">↑</ProTag>
              <ProTag color="cyan">↓</ProTag>
              <span>to navigate</span>
            </div>
            <div className="flex">
              <ProTag color="cyan">↵</ProTag>
              <span>to select</span>
            </div>
            <div className="flex">
              <ProTag color="cyan">ESC</ProTag>
              <span>to close</span>
            </div>
          </div>
        )}
      >
        {searchResult.length === 0
          ? (
            <Empty />
            )
          : (
            <ScrollBar>
              <div ref={listRef} className="py-2">
                {searchResult.map(({ key, label }, index) => {
                  const partsTitle = parse(t(label), match(t(label), searchQuery))
                  const partsKey = parse(key, match(key, searchQuery))
                  return (
                    <StyledListItemButton
                      key={key}
                      $themetoken={themeToken}
                      style={index === selectedItemIndex ? activeStyle : {}}
                      onClick={() => handleSelect(key)}
                      onMouseMove={() => handleHover(index)}
                    >
                      <div className="flex justify-between">
                        <div>
                          <div className="font-medium">
                            {partsTitle.map(item => (
                              <span
                                key={item.text}
                                style={{
                                  color: item.highlight
                                    ? themeToken.colorPrimary
                                    : themeToken.colorText,
                                }}
                              >
                                {item.text}
                              </span>
                            ))}
                          </div>
                          <div className="text-xs">
                            {partsKey.map(item => (
                              <span
                                key={item.text}
                                style={{
                                  color: item.highlight
                                    ? themeToken.colorPrimary
                                    : themeToken.colorTextDescription,
                                }}
                              >
                                {item.text}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </StyledListItemButton>
                  )
                })}
              </div>
            </ScrollBar>
            )}
      </Modal>
    </>
  )
}
