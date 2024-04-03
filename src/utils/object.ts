export function addPrefixToKeys<T, R>(obj: T, prefix: string): R {
  const newObj: any = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key))
      newObj[prefix + key] = obj[key]
  }

  return newObj
}
