<template>
  <div 
    class="toast" 
    :class="customClass" 
    :style="customStyle"
    @mouseenter="$emit('mouseenter')" 
    @mouseleave="$emit('mouseleave')"
  >
    <div v-if="useHtml" v-html="message" class="message-html"></div>
    <span v-else class="message">{{ message }}</span>
    
    <!-- Optional close button if we want one later, but for now click to close is common or just timer -->
    <!-- <button class="close-btn" @click="$emit('close')">&times;</button> -->
  </div>
</template>

<script setup lang="ts">
import { PropType, CSSProperties } from 'vue';

defineProps({
  message: {
    type: String,
    required: true
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
  },
  type: {
    type: String,
    default: 'info'
  }
});

defineEmits(['mouseenter', 'mouseleave', 'close']);
</script>

<style lang='scss' scoped>
.toast {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  max-width: 400px;
  padding: 12px 24px;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  border-radius: 8px;
  color: white;
  pointer-events: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: default;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
  word-break: break-word;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  .message {
    color: #fff;
  }
}
</style>