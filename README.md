<div align="center"> 
<br> 
<br>
<img src="https://raw.githubusercontent.com/eternallycyf/ims-admin/main/public/logo.png" height="140" />
<h1> ims admin </h1>
<p style="font-size: 14px">
  ims admin is a modern admin dashboard template built with React 18, Vite5, Unocss, Ant Design, and TypeScript. It is designed to help developers quickly create powerful admin management systems.
</p>
</div>

**English** | [中文](./README.zh-CN.md)


## Preview
+ https://ims-admin.vercel.app

|![login.png](https://raw.githubusercontent.com/eternallycyf/ims-admin/main/public/login.jpeg)|![login_dark.png](https://raw.githubusercontent.com/eternallycyf/ims-admin/main/public/login_dark.jpeg)
| ----------------------------------------------------------------- | ------------------------------------------------------------------- |
|![analysis.png](https://raw.githubusercontent.com/eternallycyf/ims-admin/main/public/analysis.png)|![workbench.png](https://raw.githubusercontent.com/eternallycyf/ims-admin/main/public/workbench.png)

## Features

- Built using React 18 hooks.
- Powered by Vite5 for rapid development and hot module replacement.
- Integrates Ant Design, providing a rich set of UI components and design patterns.
- Written in TypeScript, offering type safety and an improved development experience.
- Implement dynamic theme colors using unocss + css variables.
- Responsive design, adapting to various screen sizes and devices.
- Flexible routing configuration, supporting nested routes.
- Integrated access control based on user roles.
- Supports internationalization for easy language switching.
- Includes common admin features like user management, role management, and permission management.
- Customizable themes and styles to meet your branding needs.
- Mocking solution based on MSW and Faker.js.
- State management using Zustand.
- Data fetching using React-Query.

## Quick Start

### Get the Project Code

```bash
git clone https://github.com/eternallycyf/ims-admin.git
```

### Install Dependencies

In the project's root directory, run the following command to install project dependencies:

```bash
pnpm install
```

### Start the Development Server

Run the following command to start the development server:

```bash
pnpm start
```

Visit [http://localhost:3000](http://localhost:3000) to view your application.

### Build for Production

Run the following command to build the production version:

```bash
pnpm build
```

## Docker deployment


### Build image and Run container
#### build image
Enter the project root directory in the terminal and execute the following command to build the Docker image:
```
docker build -t your-image-name .
```
Make sure to replace `your-image-name` with your own image name 

#### run container
Run your application in the Docker container using the following command:
```
docker run -p 3000:80 your-image-name
```
This will run your application on port `80`(exposed in `Dockerfile`) of the container and map it to port `3000` on your host.

Now you can access http://localhost:3001 to view the deployed applications.

### use docker-compose.yaml
Enter the project root directory in the terminal and execute the following command to start Docker Compose:
```
docker-compose up -d
```
Docker Compose will build an image based on the configuration defined by 'docker-compose. yaml' and run the container in the background.

After the container runs successfully, it can also be accessed through http://localhost:3000 To view the deployed applications.


## theme

### Dark && theme color switch

- All the global less variables used are defined under public/style/\* under static files that can be obtained by plugins
- var variable under html (can also be used by @xxx, injected in the outermost layer)

```css
html {
  --primary-color: #fff;
  --primary-hover-color: #fff;
  --primary-active-color: #fff;
  --processing-color: #fff;
  --link-color: #fff;
  --text-color: #fff;
  --border-color: #fff;
  --component-background-color: #fff;
  --layout-body-background: #fff;
  --white-hover: #fff;
  --white-active: #fff;
  --ims-bg: #fff;
}
```

- unocss also enjoys all html injected color variables

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

### How do I maintain global css variables

#### Added html dynamic variables

- ims-admin/src/theme/init/initLessVar.js
- ims-admin/src/layouts/core/GlobalHeader/ThemeModeBtn/index.tsx
- ims-admin/public/style/global-var.less
- uno.config.ts => theme.color

#### other

- Other variables can be added by themselves, but antd has been globally injected. All theme variables are less variables
- ims-admin/public/style/antd.less

## reference

- [Slash admin](https://github.com/d3george/slash-admin)