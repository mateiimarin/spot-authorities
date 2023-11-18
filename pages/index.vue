<template>
    <div class="min-w-full min-h-full">
        <div class="h-screen w-screen fixed z-[100] flex items-center justify-center"> 
            <div class="h-20 w-64 overlay-shadow z-[100] rounded-lg border-[4px] border-gray-200">
                <input v-model="plate" class="h-full outline-none text-center font-main text-3xl font-bold transition-all duration-500 bg-gray-200" :class="plate ? 'w-full px-4' : 'w-0'">
            </div>
        </div>

        <video class="fixed bottom-0 right-0 min-h-full min-w-full object-cover" autoplay ref="video"></video>
        <div class="fixed bottom-12 w-full flex justify-center z-[999]">   
            <button class=" bg-green-500 w-36 rounded-full py-3 font-bold  z-[999] text-white cv mr-4" v-if="!plate" @click="getText">Scan</button>
            <NuxtLink v-else :to="`/parking/${plate}`"><button class=" bg-green-500 w-36 rounded-full py-3 font-bold  z-[999] text-white cv mr-4" @click="getText">Check</button></NuxtLink>
            <button class=" bg-gray-200 text-black  w-12 rounded-full py-3 font-bold  z-[999] cv" @click="plate = null"><i class="fi fi-rr-refresh"></i></button></div>
        <canvas ref="canvas" width="640" height="480" class="z-[9999]  border-2" v-show="false"></canvas>
    </div>
</template>

<script setup>
const video = ref();
const plate = ref('');

const init = async () => {

    const h = window.innerHeight;
    const w = window.innerWidth;
    const constraints = {
    audio: false,
        video: {
            width: 400,
            height: 600,
        },
        facingMode: "environment",
    };
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.value.srcObject = stream;
        
    } catch (e) {
        alert(`navigator.getUserMedia error:${e.toString()}`);
    }
}

const canvas = ref();
const getText = async () => {
    var context = canvas.value.getContext('2d');
    context.drawImage(video.value, 0, 0, 640, 480);
    const img = canvas.value.toDataURL();
    console.log(img)
    plate.value = await textExtract(img);
}

onMounted(() => {
    init();
})
</script>

<style scoped>
.overlay-shadow {
    box-shadow: 0 0 0 2000px rgba(0, 0, 0, 0.5);
}
</style>