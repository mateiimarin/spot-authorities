<template>
  <div id="spotApp">
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
