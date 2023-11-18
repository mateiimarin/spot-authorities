<template>
    <div class="font-main p-4 ">
        <ClientOnly>
            <div class="text-center text-lg font-bold mt-2" :class="isParked ? 'mb-6' : 'mb-20'">Parking Session</div>
            <div class="w-full flex justify-center mb-3">
                <div class="text-white text-3xl h-28 w-28 rounded-full flex justify-center items-center" :class="isParked ? 'bg-green-500' : 'bg-red-500'">
                    <i v-if="isParked" class="fi fi-br-check"></i>
                    <i v-else class="fi fi-br-cross"></i>
                </div>
            </div>
            <div class="text-4xl font-extrabold text-center mb-4">{{  useRoute().params.id }}</div>
            <div v-if="isParked" class="border-2 rounded-md p-3 mb-12">
                <div class="flex mb-3">
                    <div class="font-semibold">Parked at</div>
                    <div class="ml-auto">{{ car.start_park.getHours() }}:{{ car.start_park.getMinutes() }}</div>
                </div>
                <div class="flex">
                    <div class="font-semibold">Parking </div>
                    <div class="ml-auto">{{ car.parking }}</div>
                </div>
            </div>
            <div class="text-center"> The owner of this car didn't pay for parking</div>
        </ClientOnly>
    </div>
</template>

<script setup>
import { doc, getDoc } from 'firebase/firestore'

const car = ref();
const isParked = ref(false);
const { $db } = useNuxtApp();
if($db) {
    const carRef = doc($db, "cars", useRoute().params.id);
    const carSnap = await getDoc(carRef);

    car.value = {
        brand: carSnap.data().brand,
        start_park: null,
        parking: null,
    };

    if(carSnap.data().start_park) {
        isParked.value = true;
        car.value.start_park = carSnap.data().start_park.toDate();
        car.value.parking =  carSnap.data().parking;
    }
    
}

</script>

<style lang="scss" scoped>

</style>