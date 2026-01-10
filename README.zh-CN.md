<div align="center">

# vue2toast

一个轻量、高性能的 Vue 3 Toast 提示插件，基于 TypeScript 和 Vite 构建。

[![NPM package](https://img.shields.io/npm/v/@lanxuexing/vue2toast.svg?style=flat-square)](https://npmjs.org/package/@lanxuexing/vue2toast)
[![GitHub Release Date](https://img.shields.io/github/release-date/lanxuexing/vue2toast.svg?style=flat-square)](https://github.com/lanxuexing/vue2toast/releases)
[![GitHub repo size](https://img.shields.io/github/repo-size/lanxuexing/vue2toast.svg?style=flat-square)](https://github.com/lanxuexing/vue2toast)
[![GitHub Stars](https://img.shields.io/github/stars/lanxuexing/vue2toast.svg?style=flat-square)](https://github.com/lanxuexing/vue2toast/stargazers)
[![NPM downloads](http://img.shields.io/npm/dm/@lanxuexing/vue2toast.svg?style=flat-square)](https://npmjs.org/package/@lanxuexing/vue2toast)
[![CI/CD](https://github.com/lanxuexing/vue2toast/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/lanxuexing/vue2toast/actions)
[![GitHub license](https://img.shields.io/github/license/lanxuexing/vue2toast.svg?style=flat-square)](https://github.com/lanxuexing/vue2toast/blob/main/LICENSE)
[![Vue 3](https://img.shields.io/badge/vue-3.x-42b883.svg?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

[中文版](./README.zh-CN.md) | [English](./README.md)

## 🔗 在线演示
查看组件效果: **[https://lanxuexing.github.io/vue2toast/](https://lanxuexing.github.io/vue2toast/)**

</div>

---

## ✨ 特性

- 🚀 **Vue 3 优化**: 使用 `createVNode` 和 `render` 函数构建，性能极致。
- 📐 **TypeScript 支持**: 内置完整的类型定义 (d.ts)。
- 🎨 **现代设计**: 简洁美观的 UI，流畅的动画。
- 🔄 **支持更新**: 可编程更新 Toast 内容 (适用于进度条、倒计时等)。
- 📦 **轻量级**: 零依赖，体积极小。
- 🛠 **易定制**: 轻松控制时长和样式。

## 📦 安装

```bash
npm install @lanxuexing/vue2toast
```

## 🚀 使用方法

### 1. 注册插件

在你的主入口文件 (`main.ts` 或 `main.js`) 中注册插件。

```typescript
import { createApp } from 'vue';
import App from './App.vue';
import Toast from '@lanxuexing/vue2toast';
import '@lanxuexing/vue2toast/style.css'; // 记得引入样式文件

const app = createApp(App);
app.use(Toast); // 全局注册 $toast 并提供 useToast
app.mount('#app');
```

### 2. 在组件中使用

推荐使用 `useToast` 组合式函数，也可以继续使用全局 `$toast`。

**Composition API (推荐):**

```typescript
<script setup lang="ts">
import { useToast } from '@lanxuexing/vue2toast';

// 最佳实践：类型安全且简洁
const toast = useToast();

const showToast = () => {
  toast('Hello World');
};

const showLongToast = () => {
  toast('这条消息会显示 5 秒', { 
    duration: 5000,
    position: 'top',
    style: { fontWeight: 'bold' }
  });
};
</script>
```

**Options API:**

```javascript
export default {
  methods: {
    showToast() {
      // 这里的 this.$toast 现在有完善的类型提示
      this.$toast('Hello World');
    }
  }
}
```

### 3. 可更新的 Toast

你可以在 Toast 显示期间更新其内容，这非常适合加载状态或倒计时场景。

```typescript
const showDynamic = () => {
  // 设置 duration 为 0，使其一直显示，直到手动关闭
  const instance = toast('加载中... 0%', { duration: 0 });
  
  let progress = 0;
  const timer = setInterval(() => {
    progress += 10;
    instance.update(`加载中... ${progress}%`); // 更新内容
    
    if (progress >= 100) {
      clearInterval(timer);
      instance.close(); // 手动关闭
      toast('加载完成!');
    }
  }, 300);
};
```

### 4. 手动关闭 (持久化 Toast)

将 `duration` 设置为 `0`，Toast 将不会自动消失，直到你调用返回实例的 `close()` 方法。

```typescript
const showPersist = () => {
    const instance = toast('我不会自动消失...', { duration: 0 });
    
    // 模拟异步操作后关闭
    setTimeout(() => {
        instance.close();
    }, 5000);
};
```

### 5. SSR 与最佳实践

-   **SSR 安全**: 插件会自动检测环境，在服务端返回空实例，避免水合不匹配或 Node 报错。
-   **上下文继承**: Toast 会自动继承应用的 `appContext`，这意味着你可以在 Toast 组件内部正常访问全局插件 (如 `i18n`, `router`, `pinia`)。

## ⚙️ 配置选项

| 选项名 | 类型 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| `duration` | `number` | `3000` | 显示时长 (ms)。设置为 `0` 则永久显示。 |
| `pauseOnHover` | `boolean` | `true` | 鼠标悬停时是否暂停倒计时。 |
| `position` | `'top' \| 'bottom' \| 'center'` | `'center'` | Toast 的垂直显示位置。 |
| `zIndex` | `number` | `9999` | Toast 容器的层级 (z-index)。 |
| `className` | `string` | `''` | 自定义 CSS 类名。 |
| `style` | `CSSProperties` | `{}` | 自定义内联样式对象 (Vue CSS)。 |
| `useHtml` | `boolean` | `false` | **警告**: 是否解析 HTML (注意 XSS 风险)。 |

## 🛠 本地开发

本项目使用 Vite 构建。

- **启动开发服务器**: `npm run dev`
- **构建库**: `npm run build`
- **构建 Demo**: `npm run build:demo`

---

Built with ❤️ for the Vue Community.
