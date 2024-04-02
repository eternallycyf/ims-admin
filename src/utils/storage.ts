import type { StorageEnum } from '#/enum'

export function getItem<T>(key: StorageEnum): T | null {
  let value = null
  try {
    const result = window.localStorage.getItem(key)
    if (result)
      value = JSON.parse(result)
  }
  catch (error) {
    console.error(error)
  }
  return value
}

export function getStringItem(key: StorageEnum): string | null {
  return localStorage.getItem(key)
}

export function setItem<T>(key: StorageEnum, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
}
export function removeItem(key: StorageEnum): void {
  localStorage.removeItem(key)
}
export function clearItems() {
  localStorage.clear()
}
