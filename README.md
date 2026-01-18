<div align="center">

# vue2toast

A lightweight, high-performance Toast notification plugin for Vue 3, built with TypeScript and Vite.

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

[中文版](./README.zh-CN.md) | English

## 🔗 Live Demo
Check out the component in action: **[https://lanxuexing.github.io/vue2toast/](https://lanxuexing.github.io/vue2toast/)**

</div>

---

## ✨ Features

- 🚀 **Vue 3 Optimized**: Built with `createVNode` and `render` for minimal overhead.
- 📐 **TypeScript Ready**: Full type definitions included.
- 📚 **Stackable**: Multiple toasts stack automatically without overlapping.
- 📱 **Responsive**: Auto-resizing width to fit content comfortably.
- 🎨 **Modern Design**: Clean and accessible UI with smooth animations.
- 🔄 **Updateable Toasts**: Update message content programmatically (e.g., for progress bars).
- 📦 **Lightweight**: Zero dependencies, tiny bundle size.
- 🛠 **Customizable**: Control duration and styling easily.

## 📦 Installation

```bash
npm install @lanxuexing/vue2toast
```

## 🚀 Usage

### 1. Register Plugin

Register the plugin in your main application file (`main.ts` or `main.js`).

```typescript
import { createApp } from 'vue';
import App from './App.vue';
import Toast from '@lanxuexing/vue2toast';
import '@lanxuexing/vue2toast/style.css'; // Import styles

const app = createApp(App);
app.use(Toast); // Installs $toast globally and provides useToast
app.mount('#app');
```

3.  **SSR Support**: Safe for Server-Side Rendering (Nuxt, Vite SSR).

### 2. Usage in Components

You can access the toast instance via the `useToast` composable (Recommended) or the global `$toast` property.

**Composition API (Recommended):**

```typescript
<script setup lang="ts">
import { useToast } from '@lanxuexing/vue2toast';

// Best practice: Typesafe & Clean
const toast = useToast();

const showToast = () => {
  toast('Hello World');
};

const showLongToast = () => {
  toast('This stays for 5 seconds', { 
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
      // Fully typed via module augmentation
      this.$toast('Hello World');
    }
  }
}
```

### 3. Updateable Toasts

You can update a toast message while it's still visible. This is perfect for loading states or countdowns.

```typescript
const showDynamic = () => {
  // Set duration to 0 to keep it open indefinitely (until closed manually)
  const instance = toast('Loading... 0%', { duration: 0 });
  
  let progress = 0;
  const timer = setInterval(() => {
    progress += 10;
    instance.update(`Loading... ${progress}%`); // Update text
    
    if (progress >= 100) {
      clearInterval(timer);
      instance.close(); // Close programmatically
      toast('Done!');
    }
  }, 300);
};
```

### 4. Manual Close (Persistent Toast)

Set `duration` to `0` to keep the toast open indefinitely until you call the `close()` method on the returned instance.

```typescript
const showPersist = () => {
    const instance = toast('I will not close automatically...', { duration: 0 });
    
    // Close manually after some action
    setTimeout(() => {
        instance.close();
    }, 5000);
};
```

### 5. SSR & Best Practices

-   **SSR Safe**: The plugin automatically detects the environment and returns a no-op instance on the server, preventing hydration mismatches or node errors.
-   **Context Inheritance**: Toasts inherit the `appContext` of your application, meaning they can access global plugins (like `i18n`, `router`, `pinia`) and provided values.

## ⚙️ Configuration

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `duration` | `number` | `3000` | Duration in ms. Set to `0` to persist indefinitely. |
| `pauseOnHover` | `boolean` | `true` | Pauses timer when hovering over the toast. |
| `position` | `'top' \| 'bottom' \| 'center'` | `'top'` | Vertical position of the toast. |
| `zIndex` | `number` | `9999` | Z-Index of the toast container. |
| `className` | `string` | `''` | Custom CSS class name for the toast content. |
| `style` | `CSSProperties` | `{}` | Custom inline styles (Vue CSS object). |
| `useHtml` | `boolean` | `false` | **Warning**: Enables HTML rendering (XSS Risk). |

## 🛠 Development

This repository is powered by Vite.

- **Node.js**: >= 18.0.0 (Required for Vite 6+ / Tailwind 4)
- **Dev Server**: `npm run dev`
- **Build Lib**: `npm run build`
- **Build Demo**: `npm run build:demo`

---

Built with ❤️ for the Vue Community.
