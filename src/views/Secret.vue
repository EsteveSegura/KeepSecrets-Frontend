<template>
  <div class="secret">
    <div class="cube">
      <img src="../assets/cube.png" alt="Sphere" class="cube-img" />
    </div>
    <div class="sphere">
      <img src="../assets/sphere.png" alt="Sphere" class="sphere-img" />
    </div>
    <div class="card">
      <h2>View Your Secret</h2>
      <div class="loadera">
        <textarea
          v-model="secretBody"
          class="input-secret"
          name="secret"
          cols="30"
          rows="10"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { gsap } from "gsap";
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
    beforeMount() {
    this.$nextTick(() => {
      const card = document.querySelector(".card");
      gsap.set(card, { y: 100, autoAlpha: 0 });
      gsap.to(card, {
        duration: 2.6,
        ease: "back.out(2.7)",
        y: 0,
        autoAlpha: 1,
      });

      const sphere = document.querySelector(".sphere");
      gsap.set(sphere, { y: 400 });
      gsap.to(sphere, { duration: 3.9, ease: "back.out(2.7)", y: 0 });

      const cube = document.querySelector(".cube");
      gsap.set(cube, { y: -400 });
      gsap.to(cube, { duration: 2.5, ease: "back.out(1.7)", y: 0 });
    });
  },
  setup() {
    const route = useRoute();
    const secretBody = ref('')

    onMounted(async () => {
      const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/v1/secret/${route.params.id}/${route.params.secretKey}`)
      secretBody.value = response.data._secret
    });
    
    return{
      secretBody,
      route
    }
  },
};
</script>

<style scoped>
@media only screen and (min-width: 815px){
  .sphere {
    user-select: none;
    z-index: -1;
    position: absolute;
    top: 19%;
    right: 59%;
  }

  .cube {
    user-select: none;
    z-index: -1;
    position: absolute;
    top: 55%;
    left: 59%;
  }

  .secret {
    position:relative;
    width: 100%;
    height: 90vh;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-content: center;
    align-items: center;
  }

  .warning {
    font-size: 14px;
    margin: 0 0 0.9rem 0;
  }

  .loadera {
    min-width: 480px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;
  }

  .card {
    max-width: 480px;
    background-color: rgba(22, 21, 26, 0.3);
    border-radius: 30px;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    box-shadow: 16px 18px 21px 5px rgba(0, 0, 0, 0.33);
    padding: 30px 20px;
  }

  .card h2 {
    margin: 0;
    color: white;
    font-family: "Roboto", sans-serif;
    font-weight: 900;
    font-size: 20px;
    margin-bottom: 1rem;
  }

  .card label {
    margin: 0 0 1rem 0;
    color: white;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 18px;
  }

  .card input {
    width: 98%;
    height: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background-color: rgba(22, 21, 26, 0.2);
    border-radius: 3px;
    font-size: 18px;
    color: white;
    transition-duration: 0.25s;
    font-weight: 300;
  }

  p {
    margin-top: 4rem;
    color: #403d46;
    font-family: "Roboto", sans-serif;
    font-size: 19px;
    font-weight: 500;
  }

  h1 {
    line-height: 1.2;
    color: white;
    font-family: "Roboto", sans-serif;
    font-weight: 900;
    font-size: 85px;
  }

  .input-secret {
    width: 98%;
    height: 20rem;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background-color: rgba(22, 21, 26, 0.2);
    border-radius: 3px;
    font-size: 18px;
    color: white;
    transition-duration: 0.25s;
    font-weight: 300;
  }
}

@media screen and (min-width: 1px) and (max-width: 815px){
  .sphere {
    user-select: none;
    z-index: -1;
    position: absolute;
    top: 17%;
    left: 9%;
  }

  .sphere img {
    width: 80%;
  }
  
  .cube img {
    width: 80%;
  }

  .cube {
    user-select: none;
    z-index: -1;
    position: absolute;
    bottom: 1%;
    right: 9%;
  }

.secret {
  position:relative;
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.warning {
  font-size: 14px;
  margin: 0 0 0.9rem 0;
}

.loadera {
  min-width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
}

.card {
  width: 90%;
  background-color: rgba(22, 21, 26, 0.3);
  border-radius: 30px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  box-shadow: 16px 18px 21px 5px rgba(0, 0, 0, 0.33);
  padding: 30px 20px;
}

.card h2 {
  margin: 0;
  color: white;
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  font-size: 20px;
  margin-bottom: 1rem;
}

.card label {
  margin: 0 0 1rem 0;
  color: white;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 18px;
}

.card input {
  width: 98%;
  height: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background-color: rgba(22, 21, 26, 0.2);
  border-radius: 3px;
  font-size: 18px;
  color: white;
  transition-duration: 0.25s;
  font-weight: 300;
}

p {
  margin-top: 4rem;
  color: #403d46;
  font-family: "Roboto", sans-serif;
  font-size: 19px;
  font-weight: 500;
}

h1 {
  line-height: 1.2;
  color: white;
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  font-size: 85px;
}

.input-secret {
  width: 100%;
  height: 20rem;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background-color: rgba(22, 21, 26, 0.2);
  border-radius: 3px;
  font-size: 18px;
  color: white;
  transition-duration: 0.25s;
  font-weight: 300;
}
}
</style>
