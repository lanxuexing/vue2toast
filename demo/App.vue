<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 flex flex-col items-center justify-center p-4 sm:p-8 font-sans text-slate-800 relative overflow-x-hidden">
    
    <!-- Background blurred orbs for extra depth (Minty & Fresh) -->
    <div class="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-300/40 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob"></div>
    <div class="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-300/40 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob animation-delay-2000"></div>
    <div class="fixed -bottom-32 left-20 w-[600px] h-[600px] bg-cyan-200/40 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob animation-delay-4000"></div>

    <div class="w-full max-w-6xl relative z-10 space-y-8 sm:space-y-12">
      <!-- Header -->
      <header class="flex justify-between items-center backdrop-blur-xl bg-white/70 border border-slate-200 shadow-xl rounded-2xl p-6 transition-all duration-300 hover:bg-white/90">
        <div class="flex items-center gap-3">
          <span class="text-3xl">🍞</span>
          <h1 class="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent drop-shadow-sm">Vue2Toast</h1>
          <span class="bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm backdrop-blur-sm">Vue 3</span>
        </div>
        <a href="https://github.com/lanxuexing/vue2toast" target="_blank" class="group flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium bg-white hover:bg-slate-50 p-2.5 pr-4 pl-3 rounded-full transition-all border border-slate-200">
          <svg class="w-5 h-5 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          <span class="text-sm">GitHub</span>
        </a>
      </header>

      <!-- Hero -->
      <section class="text-center py-8 sm:py-16 backdrop-blur-3xl bg-white/40 border border-white/50 rounded-3xl shadow-xl relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none"></div>
        <h2 class="text-5xl sm:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight drop-shadow-sm">
          Simple. Lightweight. <br class="hidden sm:block" />
          <span class="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Beautiful.</span>
        </h2>
        <p class="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          A high-performance toast notification plugin for Vue 3, crafted for modern web applications.
        </p>
        
        <div class="flex items-center justify-center gap-4">
           <div class="group relative inline-flex items-center gap-4 bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/60 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer" @click="copyCommand">
             <span class="font-mono text-emerald-600 text-sm sm:text-base font-semibold">npm install @lanxuexing/vue2toast</span>
             <button class="bg-emerald-100 hover:bg-emerald-200 p-2 rounded-lg transition-colors group-hover:scale-110">
               <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
             </button>
           </div>
        </div>
      </section>

      <!-- Demos Grid -->
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
        <div 
          v-for="(demo, index) in demos" 
          :key="index" 
          v-tilt
          class="group relative backdrop-blur-xl bg-white/60 border border-white/60 rounded-2xl p-6 shadow-md hover:shadow-xl hover:bg-white/80 transition-all duration-300 flex flex-col will-change-transform cursor-pointer"
        >
          <div class="flex-1">
            <div class="flex justify-between items-start mb-4">
              <div class="flex items-center gap-3">
                 <div class="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm" :class="getIconBgClass(demo.type)">
                   <span class="text-xl">{{ getIcon(demo.type) }}</span>
                 </div>
                 <div>
                   <h3 class="font-bold text-slate-800 text-lg">{{ demo.label }}</h3>
                   <p class="text-xs text-slate-500 font-medium">{{ demo.desc }}</p>
                 </div>
              </div>
            </div>
          </div>
          
          <div class="mt-4 flex gap-3">
            <button 
              class="flex-1 py-2.5 px-4 rounded-xl font-semibold text-white shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
              :class="getBtnClass(demo.type)"
              @click="demo.action"
            >
              <span>Run Demo</span>
              <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </button>
            
            <button 
              class="w-12 h-11 flex items-center justify-center rounded-xl border border-slate-200 hover:bg-white text-slate-500 hover:text-emerald-600 transition-colors shadow-sm"
              @click="toggleCode(index)"
              :class="{ 'bg-white text-emerald-600 border-emerald-200 ring-2 ring-emerald-100': demo.showCode }"
              title="View Source"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
            </button>
          </div>

          <!-- Code Block -->
          <transition 
            enter-active-class="transition duration-300 ease-out" 
            enter-from-class="transform scale-y-95 opacity-0 -translate-y-2" 
            enter-to-class="transform scale-y-100 opacity-100 translate-y-0"
            leave-active-class="transition duration-200 ease-in" 
            leave-from-class="transform scale-y-100 opacity-100 translate-y-0" 
            leave-to-class="transform scale-y-95 opacity-0 -translate-y-2"
          >
            <div v-if="demo.showCode" class="mt-4 bg-slate-900 rounded-xl overflow-hidden shadow-inner border border-slate-800 relative group/code z-20">
              <div class="flex justify-between items-center px-4 py-2 bg-black/40 border-b border-white/5">
                 <span class="text-xs font-mono text-slate-400">TypeScript</span>
                 <div class="flex gap-1.5">
                   <div class="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                   <div class="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                   <div class="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                 </div>
              </div>
              <pre class="p-4 text-sm overflow-x-auto max-h-64 custom-scrollbar"><code class="language-typescript" v-html="highlight(demo.code)"></code></pre>
            </div>
          </transition>
        </div>
      </section>

      <!-- Usage Section -->
      <section class="backdrop-blur-xl bg-white/70 border border-white/50 rounded-3xl p-8 shadow-xl">
        <div class="flex items-center gap-4 mb-6">
          <div class="p-3 bg-emerald-100 rounded-xl shadow-inner">
            <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <h2 class="text-2xl font-bold text-slate-800">Quick Start</h2>
        </div>
        <div class="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
           <pre class="p-6 text-sm sm:text-base overflow-x-auto"><code class="language-typescript text-slate-300" v-html="highlight(usageCode)"></code></pre>
        </div>
      </section>

      <!-- Footer -->
      <footer class="text-center py-8 text-slate-400 text-sm font-medium">
        <p>MIT Licensed | Copyright © 2026 Vue2Toast Team</p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive } from 'vue';
import { ToastInstance } from '../src/index';
// @ts-ignore
import hljs from 'highlight.js/lib/core';
// @ts-ignore
import javascript from 'highlight.js/lib/languages/javascript';
// @ts-ignore
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/atom-one-dark.css';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', javascript); // TS is similar enough for simple highlighting or use typescript lib
hljs.registerLanguage('xml', xml);

const instance = getCurrentInstance();
const $toast = instance?.appContext.config.globalProperties.$toast as (message: string, options?: any) => ToastInstance;

const highlight = (code: string) => {
  return hljs.highlight(code, { language: 'javascript' }).value;
};

const copyCommand = () => {
  navigator.clipboard.writeText('npm install @lanxuexing/vue2toast');
  $toast('Copied to clipboard!', { duration: 2000 });
};

const getIcon = (type: string) => {
  switch (type) {
    case 'primary': return '✨';
    case 'secondary': return '⏱️';
    case 'warning': return '👋';
    case 'danger': return '🎨';
    case 'accent': return '🚀';
    default: return '🔹';
  }
};

const getIconBgClass = (type: string) => {
  switch (type) {
    case 'primary': return 'bg-emerald-100 text-emerald-600';
    case 'secondary': return 'bg-blue-100 text-blue-600';
    case 'warning': return 'bg-amber-100 text-amber-600';
    case 'danger': return 'bg-rose-100 text-rose-600';
    case 'accent': return 'bg-violet-100 text-violet-600';
    default: return 'bg-slate-100 text-slate-600';
  }
};

const getBtnClass = (type: string) => {
  switch (type) {
    case 'primary': return 'bg-emerald-500 hover:bg-emerald-400 border-emerald-600/20';
    case 'secondary': return 'bg-blue-500 hover:bg-blue-400 border-blue-600/20';
    case 'warning': return 'bg-amber-500 hover:bg-amber-400 border-amber-600/20';
    case 'danger': return 'bg-rose-500 hover:bg-rose-400 border-rose-600/20';
    case 'accent': return 'bg-violet-500 hover:bg-violet-400 border-violet-600/20';
    default: return 'bg-slate-500 hover:bg-slate-400';
  }
};

// Demos
interface DemoItem {
  label: string;
  desc: string;
  type: string;
  action: () => void;
  code: string;
  showCode: boolean;
}

const demos = reactive<DemoItem[]>([
  {
    label: 'Success Toast',
    desc: 'Simple Success Notification',
    type: 'primary',
    showCode: false,
    action: () => $toast('Operation Successful ✨'),
    code: `$toast('Operation Successful ✨');`
  },
  {
    label: 'Long Duration',
    desc: 'Stays for 5 seconds',
    type: 'secondary',
    showCode: false,
    action: () => $toast('This toast will stay for 5 seconds.', { duration: 5000 }),
    code: `$toast('This toast will stay for 5 seconds.', { duration: 5000 });`
  },
  {
    label: 'Styled Toast',
    desc: 'Custom colors and styles',
    type: 'danger',
    showCode: false,
    action: () => $toast('Custom Red Toast', {
      style: { backgroundColor: '#f43f5e', color: '#fff', fontWeight: 'bold', boxShadow: '0 10px 15px -3px rgba(244, 63, 94, 0.4)' }
    }),
    code: `$toast('Custom Red Toast', {
  style: { 
    backgroundColor: '#f43f5e', 
    color: '#fff', 
    fontWeight: 'bold',
    boxShadow: '0 10px 15px -3px rgba(244, 63, 94, 0.4)'
  }
});`
  },
  {
    label: 'Manual Close',
    desc: 'Persistent until closed',
    type: 'warning',
    showCode: false,
    action: () => {
      const toast = $toast('Click "Close" to dismiss me', { duration: 0 });
      setTimeout(() => {
        toast.update('You can close me now via code...');
        setTimeout(() => {
           toast.close();
           $toast('Closed automatically');
        }, 2000);
      }, 2000);
    },
    code: `const showManualClose = () => {
  const toast = $toast('Click "Close"...', { duration: 0 });
  
  setTimeout(() => {
    toast.update('Updating message...');
    setTimeout(() => {
       toast.close();
       $toast('Closed automatically');
    }, 2000);
  }, 2000);
};`
  },
  {
    label: 'Top Position',
    desc: 'Alert from the top',
    type: 'secondary',
    showCode: false,
    action: () => $toast('I am at the Top', { position: 'top' }),
    code: `$toast('I am at the Top', { position: 'top' });`
  },
  {
    label: 'Bottom Position',
    desc: 'Notification at bottom',
    type: 'secondary',
    showCode: false,
    action: () => $toast('I am at the Bottom', { position: 'bottom' }),
    code: `$toast('I am at the Bottom', { position: 'bottom' });`
  },
  {
    label: 'Custom HTML',
    desc: 'Rich content rendering',
    type: 'accent',
    showCode: false,
    action: () => {
      $toast(`
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">🔥</div>
          <div>
            <div class="font-bold text-lg">Rich HTML</div>
            <div class="text-xs opacity-80">Tailwind classes work here too!</div>
          </div>
        </div>
      `, { 
        useHtml: true,
        style: { background: 'linear-gradient(to right, #8b5cf6, #ec4899)', padding: '12px 20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.2)' }
      });
    },
    code: `$toast(\`
  <div class="flex items-center gap-3">
    <div class="w-10 h-10 bg-white/20 rounded-full ...">🔥</div>
    <div>
      <div class="font-bold">Rich HTML</div>
      <div class="text-xs">Tailwind classes work!</div>
    </div>
  </div>\`, 
  { 
    useHtml: true,
    style: { 
      background: 'linear-gradient(to right, #8b5cf6, #ec4899)', 
      borderRadius: '16px' 
    } 
  }
);`
  },
  {
    label: 'Dynamic Update',
    desc: 'Progress bar simulation',
    type: 'primary',
    showCode: false,
    action: () => {
      const toast = $toast('Uploading... 0%', { duration: 0 });
      let progress = 0;
      const timer = setInterval(() => {
        progress += 10;
        toast.update(`Uploading... ${progress}%`);
        if (progress >= 100) {
          clearInterval(timer);
          toast.close();
          setTimeout(() => $toast('Upload Complete!'), 300);
        }
      }, 300);
    },
    code: `const showDynamic = () => {
  const toast = $toast('Uploading... 0%', { duration: 0 });
  let progress = 0;
  
  const timer = setInterval(() => {
    progress += 10;
    toast.update(\`Uploading... \${progress}%\`);
    
    if (progress >= 100) {
      clearInterval(timer);
      toast.close();
      $toast('Upload Complete!');
    }
  }, 300);
};`
  }
]);

const toggleCode = (index: number) => {
  demos[index].showCode = !demos[index].showCode;
};

const usageCode = `import { createApp } from 'vue';
import Toast from '@lanxuexing/vue2toast';

// 1. Install Plugin
const app = createApp(App);
app.use(Toast);

// 2. Use in Component
const toast = this.$toast('Hello World');

// 3. Advanced Usage
toast.update('New Message');
toast.close();`;

// Custom Directive for 3D Tilt Effect
const vTilt = {
  mounted(el: HTMLElement) {
    el.style.transition = 'transform 0.1s ease-out';
    el.style.transformStyle = 'preserve-3d';
    // Optimization: Hint browser for GPU layering
    el.style.willChange = 'transform'; 

    let frameId: number | null = null;

    const handleMove = (e: MouseEvent) => {
      // Optimization: Debounce functionality via RAF
      if (frameId) return;

      frameId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const multiplier = 5; 
        const xRotate = (multiplier * ((y - rect.height / 2) / (rect.height / 2)) * -1);
        const yRotate = (multiplier * ((x - rect.width / 2) / (rect.width / 2)));

        el.style.transform = `perspective(1000px) rotateX(${xRotate}deg) rotateY(${yRotate}deg) scale3d(1.01, 1.01, 1.01)`;
        frameId = null;
      });
    };

    const handleLeave = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      el.style.transition = 'transform 0.5s ease-out'; 
    };

    const handleEnter = () => {
      el.style.transition = 'transform 0.1s ease-out'; 
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    el.addEventListener('mouseenter', handleEnter);

    (el as any)._cleanup = () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
      el.removeEventListener('mouseenter', handleEnter);
      if (frameId) cancelAnimationFrame(frameId);
    };
  },
  unmounted(el: HTMLElement) {
    if ((el as any)._cleanup) (el as any)._cleanup();
  }
};
</script>

<style>
/* Custom animations that Tailwind can't easily do yet via utilities alone */
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob {
  animation: blob 10s infinite; /* Slower, more relaxing */
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
