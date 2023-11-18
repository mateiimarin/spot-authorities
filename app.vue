<template>
  <div id="spotApp" class="bg-white">
    <NuxtPage/>
  </div>
</template>

<script setup>
onMounted(() => {
  const spotApp = document.getElementById('spotApp');
  spotApp.addEventListener('click', (e) => {
    spotApp.requestFullscreen();
  })
})
</script>
