## 暗黑 && 主题色切换

- 所有less变量在 public/style/* 通过插件即可获取提示
- html下的var变量 (也可以@xxx使用, 在最外层注入了)
```css 
html{
  --primary-color: #fff;
  --primary-hover-color:  #fff;
  --primary-active-color:  #fff;
  --processing-color:  #fff;
  --link-color:  #fff;
  --text-color:  #fff;
  --border-color:  #fff;
  --component-background-color:  #fff;
  --layout-body-background:  #fff;
  --white-hover:  #fff;
  --white-active:  #fff;
  --ims-bg:  #fff;
  --ims-scrollbar:  #fff;
  --ims-scrollbar-hover:  #fff;
}
```
- unocss也享有所有Html注入的颜色变量

```tsx 
<>
  <div className="html-var">html-variables</div>
  <div className="less-var">less-variables</div>
  <div color-primary-color>uno-theme-color</div>
</>
```

```less 
.html-var {
  color: var(--primary-color);
}

.less-var {
  color: @primary-color;
}
```

## 如何维护全局的css变量

### 新增html动态的变量
- ims-admin/src/theme/init/initLessVar.js
- ims-admin/src/layout/components/theme-mode-btn/full-screen.tsx
- ims-admin/public/style/global-var.less
- uno.config.ts => theme.color

### 其他
- 其他变量自行添加即可 但已全局注入antd所有的主题变量为less变量 使用antd的就行
- ims-admin/public/style/antd.less

## 编辑
components
layouts
pages
router
