<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
    <div class="relative">
      <!-- Logo animé -->
      <div class="w-24 h-24 relative animate-bounce">
        <img src="/images/logo_white.svg" alt="Logo" class="w-full h-full object-contain" />
      </div>
     
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1.5s linear infinite;
}
</style> 