<template>
  <transition name="fade">
    <section class="toast-container" :class="[`is-${position}`]" :style="{ zIndex: zIndex }" v-if="visible">
      <div class="toast" :class="customClass" :style="customStyle" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
        <div v-if="useHtml" v-html="message" class="message-html"></div>
        <span v-else class="message">{{ message }}</span>
      </div>
    </section>
  </transition>
</template>

<script setup lang="ts">
import { ref, PropType, CSSProperties } from 'vue';

defineProps({
  zIndex: {
    type: Number,
    default: 9999
  },
  position: {
    type: String,
    default: 'center' // 'top' | 'bottom' | 'center'
  },
  useHtml: {
    type: Boolean,
    default: false
  },
  customClass: {
    type: [String, Object, Array] as PropType<any>,
    default: ''
  },
  customStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({})
  }
});

const visible = ref(false);
const message = ref("");

const emit = defineEmits(['mouseenter', 'mouseleave']);

const onMouseenter = () => emit('mouseenter');
const onMouseleave = () => emit('mouseleave');

defineExpose({
  visible,
  message
});
</script>

<style lang='scss' scoped>
.toast-container {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  pointer-events: none; // Allow clicking through

  // Positions
  &.is-center {
    align-items: center;
  }
  
  &.is-top {
    align-items: flex-start;
    padding-top: 60px;
  }
  
  &.is-bottom {
    align-items: flex-end;
    padding-bottom: 60px;
  }

  .toast {
    width: 180px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.61);
    border-radius: 10px;
    color: white;
    pointer-events: auto; // Re-enable pointer events on the toast itself
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    cursor: default;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    }
  }

  .message {
    font-size: 14px;
    color: #fff;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.7);
}
</style>