<template>
  <div id="contenedorMapa" class="container flex justify-center content-center">
    <LMap ref="map" :zoom="zoom" :center="[40.416729, -3.703790]" :max-zoom="6" :min-zoom="6">
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        layer-type="base" name="OpenStreetMap" />


      <!-- <LMarker :lat-lng="localizacion"></LMarker> -->

      <!-- <LPolyline v-if="encodedPolyline" :lat-lngs="encodedPolyline" color="red" :weight="4" :opacity="0.9" line-cap="round" line-join="round">

      </LPolyline> -->

      <!-- <LCircleMarker v-if="coordSalida.length" :lat-lng="coordSalida" :radius="10" :color="'blue'" :fill-color="'blue'" :fill-opacity="0.2"
        :weight="1" :opacity="0.5" :line-cap="'round'" :line-join="'round'">
        <LTooltip :permanent="true" :direction="'center'" :offset="[0, 0]">
          <span>SALIDA</span>
        </LTooltip>
      </LCircleMarker> -->


      <!-- <LCircleMarker v-if="coordLlegada.length" :lat-lng="coordLlegada" :radius="10" :color="'blue'" :fill-color="'blue'" :fill-opacity="0.2"
        :weight="1" :opacity="0.5" :line-cap="'round'" :line-join="'round'">
        <LTooltip :permanent="true" :direction="'center'" :offset="[0, 0]">
          <span>LLEGADA</span>
        </LTooltip>
      </LCircleMarker> -->

      <!-- <l-image-overlay url="/iconAircraft.png" :bounds="[localizacion]" :opacity="1"></l-image-overlay> -->

    </LMap>
  </div>
</template>

<script setup>

// import { PolyUtil } from 'leaflet';
import { ref } from 'vue'
const zoom = ref(6)


// ⁡⁢⁢⁣⁡⁢⁢⁣𝗣𝗢𝗟𝗬𝗟𝗜𝗡𝗘𝗦⁡

// let encodedPolyline = ref('')
// let coordSalida = ref([])
// let coordLlegada = ref([])


// ⁡⁢⁢⁣𝗚𝗘𝗟𝗢𝗖𝗔𝗟𝗜𝗭𝗔𝗖𝗜Ó𝗡⁡

// let localizacion = ref([])
// onMounted(() => {
//   if (typeof window !== 'undefined' && 'geolocation' in navigator) {
//     navigator.geolocation.getCurrentPosition(function (position) {
//       // console.log("La latitud es :", position.coords.latitude);
//       // console.log("La longitud es :", position.coords.longitude);
//       // console.log("La precisión es :", position.coords.accuracy);
//       localizacion.value = [position.coords.latitude, position.coords.longitude];
//       // console.log(localizacion.value);
//     });
//   }
// });


// probando las polylines
// fpEncodedPolyline = [
//   [40.49530, -3.56020],
//   [40.85390, -3.24664],
//   [40.98030, -2.59917],
//   [41.35390, -0.54761],
//   [41.26840, 0.19939],
//   [41.22990, 0.52267],
//   [41.14970, 1.17112],
//   [41.20880, 1.82183],
//   [41.29510, 2.08803]
// ]

</script>

<style scoped>
#contenedorMapa {
  height: 70vh;
  width: 60vw
}

#map {
  height: 180px;

}
</style>
