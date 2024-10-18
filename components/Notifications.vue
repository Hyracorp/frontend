<script setup lang="ts">
const drawer = ref(false);
</script>

<template>
  <div>
    <Button type="button" class="p-1 py-3" text @click="drawer = true">
      <Icon name="ph:bell" color="black" class="text-3xl" />
    </Button>
    <!--<Drawer v-model:visible="drawer" position="right" :style="{ width: '400px' }" header="Notifications">
</Drawer> -->
  </div>
</template>
