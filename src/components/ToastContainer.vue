<template>
  <div class="toast-container" :class="[`is-${position}`]" :style="{ zIndex: zIndex }">
    <transition-group name="toast-list" tag="div" class="toast-list">
      <Toast
        v-for="item in toasts"
        :key="item.id"
        :message="item.message"
        :type="item.options.type"
        :use-html="item.options.useHtml"
        :custom-class="item.options.className"
        :custom-style="item.options.style"
        @close="remove(item.id)"
        @mouseenter="item.options.pauseOnHover && onMouseenter(item)"
        @mouseleave="item.options.pauseOnHover && onMouseleave(item)"
      />
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { ref, PropType } from 'vue';
import Toast from './Toast.vue';

interface ToastItem {
  id: string;
  message: string;
  options: any;
  timer?: any;
}

const props = defineProps({
  zIndex: {
    type: Number,
    default: 9999
  },
  position: {
    type: String as PropType<'top' | 'bottom' | 'center'>,
    default: 'top'
  }
});

const toasts = ref<ToastItem[]>([]);
let idCounter = 0;

const add = (message: string, options: any) => {
  const id = `toast-${Date.now()}-${idCounter++}`;
  const newItem: ToastItem = {
    id,
    message,
    options
  };

  if (props.position.includes('bottom')) {
     toasts.value.unshift(newItem); // Add to start for bottom stack
  } else {
     toasts.value.push(newItem); // Add to end for top stack
  }

  // Start timer
  if (options.duration > 0) {
    startTimer(newItem);
  }

  return {
    close: () => remove(id),
    update: (msg: string) => {
        const t = toasts.value.find(t => t.id === id);
        if (t) t.message = msg;
    }
  };
};

const remove = (id: string) => {
  const index = toasts.value.findIndex(item => item.id === id);
  if (index !== -1) {
    const item = toasts.value[index];
    if (item.timer) clearTimeout(item.timer);
    toasts.value.splice(index, 1);
    if(item.options.onClose) item.options.onClose();
  }
};

const startTimer = (item: ToastItem) => {
    item.timer = setTimeout(() => {
        remove(item.id);
    }, item.options.duration);
};

const onMouseenter = (item: ToastItem) => {
    if(item.timer) {
        clearTimeout(item.timer);
        item.timer = null;
    }
};

const onMouseleave = (item: ToastItem) => {
    if (item.options.duration > 0) {
        startTimer(item);
    }
};

defineExpose({
  add,
  remove
});
</script>

<style lang="scss" scoped>
.toast-container {
  position: fixed;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  pointer-events: none;
  padding: 20px;

  &.is-top {
    top: 0;
    align-items: flex-start;
  }

  &.is-bottom {
    bottom: 0;
    align-items: flex-end;
  }

  &.is-center {
    top: 50%;
    transform: translateY(-50%);
    align-items: center;
  }
}

.toast-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

/* Transitions */
.toast-list-enter-active,
.toast-list-leave-active {
  transition: all 0.3s ease;
}

.toast-list-enter-from,
.toast-list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
