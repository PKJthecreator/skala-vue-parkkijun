<script setup>
import { ref } from 'vue'
import ChildComponent from './ChildComponent1.vue'

const receivedMessage = ref('(아직 메시지 없음)')
const handleChildEvent = (message) => {
  console.log('자식으로부터 받은 메시지:', message)
  receivedMessage.value = message
}
</script>
<template>
  <div>
    <h2>Props & Emits defineEmits() Example 1</h2>
    <p>
      자식으로부터 받은 메시지: <strong>{{ receivedMessage }}</strong>
    </p>
    <ChildComponent @childEvent="handleChildEvent" />
  </div>
</template>
