<template>
  <div class="container-loader">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>
</template>

<script>
import { gsap } from "gsap";
export default {
  name: "Loader",
  beforeMount() {
    this.$nextTick(() => {
      const dots = document.querySelectorAll(".dot");
      
      dots.forEach((dot,i) => {
        setTimeout(() => {
          gsap.to(dot, .9, {
            ease: "back.out(2.7)",
            y: -10,
            repeat: -1,
            yoyo: true,
          });
        }, i * 100);
      });

    });
  },
};
</script>

<style scoped>
.container-loader {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  gap: 0.3rem;
  width: 100%;
  height: 100%;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50px;
  border: 2px solid #fff;
}
</style>
