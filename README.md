# ims-admin

## 主题色
- vite.config.ts 注入基本的less变量 固定的
  - 直接预设所有的 antd 变量(除颜色外)
  - 自定义的 文本颜色 字号 高度等
  
- vite.config.ts 注入5个主题色 为less变量

- html根节点 注入5个动态的主题色

- antd 可以5个主题切换 切换后 5个主题色注入html根节点

- 黑暗主题

- unocss 注入5个动态的主题色和 所有基本less变量

- 综上所属
  - less 可以使用除了颜色外的所有变量 颜色使用根元素的 var 
  - antd 设置基础的默认值 直接传入5个主题色自动切换 
  - unocss 可以直接使用所有的less变量 颜色+其他
  - html根节点注入5个主题色 无需其他变量
  - 黑暗主题
    - 主题色无需变化
    - antd 使用自带的黑暗主题即可
    - html根节点需要注入黑暗主题一些变量 使用antd的文本颜色?
    - unocss 需要注入黑暗主题一些变量
    
    
## 重构
constant

## 更新
- 更新public less变量提示 
- unocss
- vite