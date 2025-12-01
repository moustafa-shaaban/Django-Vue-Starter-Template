<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import Button from './ui/button/Button.vue';
import { Icon } from '@iconify/vue'

const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: '',
  storageKey: 'vueuse-color-scheme', // must match index.html script
})

const toggle = useToggle(isDark)
</script>

<template>

  <Button variant="outline" @click="toggle()">

    <Icon icon="radix-icons:moon"
      class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    <Icon icon="radix-icons:sun"
      class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    <span class="sr-only">Toggle theme</span>
  </Button>
  <!-- <button @click="toggle()"
    class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
    {{ isDark ? 'Light Mode' : 'Dark Mode' }}
  </button> -->
</template>