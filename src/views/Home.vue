<template>
  <div class="hero">
    <div class="cube">
      <img src="../assets/cube.png" alt="Sphere" class="cube-img" />
    </div>
    <div class="sphere">
      <img src="../assets/sphere.png" alt="Sphere" class="sphere-img" />
    </div>
    <div class="hero-text">
      <h1>We keep<br />your Secrets<br />away from<br />unwanted Eyes.</h1>
      <p>
        Share secrets over the internet quickly and securely,<br />
        with the strongest encryption known to science.
      </p>
    </div>
    <div class="card">
      <h2>Create Secret</h2>
      <div class="card-content" v-if="currentStatus == status.DEFAULT">
        <div class="card-secret">
          <label for="secret">Secret: </label>
          <textarea v-model="secretBody" name="secret" cols="30" rows="10"></textarea>
        </div>
        <div class="card-expiration">
          <label for="expiration">Expiration in: </label>
          <select v-model="selectedTime" name="expiration" >
            <option value="5">5 min</option>
            <option value="10">10 min</option>
            <option value="30">30 min</option>
            <option value="60">1 hour </option>
            <option value="360">6 hour</option>
            <option value="729">12 hour</option>
            <option value="1440">1 day</option>
            <option value="4320">3 day</option>
            <option value="10080">1 week</option>
          </select>
        </div>
      </div>
      <div class="loader" v-else-if="currentStatus == status.LOADING">
        <Loader />
      </div>
      <div class="loadera" v-else-if="currentStatus == status.OK">
        <p class="warning">
          Share secrets over the internet quickly and securely,<br />
          with the strongest encryption known to science.
        </p>
        <label for="expiration">Secret URL: </label>
        <input type="text" v-model="secretUrl" class="input-secret">
      </div>
      <div class="card-submit" v-if="currentStatus == status.DEFAULT || currentStatus == status.LOADING">
        <Button @click="sendSecret" text="Save Secret" />
      </div>
      <div class="card-submit" v-if="currentStatus == status.OK" >
        <Button @click="returnToDefault" text="Create other secret" />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/common/Button";
import Loader from "@/components/common/Loader";
import { gsap } from "gsap";
import { ref } from "vue";
import axios from "axios";
export default {
  name: "Home",
  components: {
    Button,
    Loader,
  },
  beforeMount() {
    this.$nextTick(() => {
      const heroText = document.querySelector(".hero-text");
      gsap.set(heroText, { y: -200, autoAlpha: 0 });
      gsap.to(heroText, {
        duration: 2,
        ease: "back.out(2.7)",
        y: 0,
        autoAlpha: 1,
      });

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
    const secretBody = ref('')
    const selectedTime = ref('5')
    const secretUrl = ref('')
    const status = ref({
      DEFAULT: 'default',
      LOADING: 'loading',
      OK: 'ok'
    })
    const currentStatus = ref(status.value.DEFAULT);

    function sendSecretAnimation() {
      const secretTextArea = document.querySelector(".card-secret");
      gsap.to(secretTextArea, { duration: 1, ease: "expo.out", y: -40 });
      gsap.to(secretTextArea, 0.3, { autoAlpha: 0 });

      const secretExpiration = document.querySelector(".card-expiration");
      setTimeout(() => {
        gsap.to(secretExpiration, { duration: 1, ease: "expo.out", y: -40 });
        gsap.to(secretExpiration, 0.3, { autoAlpha: 0 });
      }, 250);
    }

    function loadingSecretAnimation(){
      currentStatus.value = status.value.LOADING
      const secretLoader = document.querySelector(".loader")
      gsap.to(secretLoader, 0.9, { autoAlpha: 0 });
    }

    function okSecretAnimation(){
      currentStatus.value = status.value.OK
      setTimeout(() => {
        const card = document.querySelector(".loadera");
        gsap.to(card, 1, { height: '8.5rem',  ease: "expo.out"})
      }, 100);
    }

    function returnToDefaultAnimation(){
      const card = document.querySelector(".loadera");
      gsap.to(card, 1, { height: '310px',  ease: "expo.out"})
      gsap.to(card, 0.5, { autoAlpha: 0 });
      setTimeout(() => {
        currentStatus.value = status.value.DEFAULT
      }, 700);
    }

    async function sendSecret(){
      sendSecretAnimation()
      try {
        setTimeout(() => loadingSecretAnimation(), 550);
        const response = await axios.post(`${process.env.VUE_APP_BASE_URL}/api/v1/secret/`,{
          secret: secretBody.value,
          expireAt: selectedTime.value
        });
        console.log(response.data._id)
        secretUrl.value= `${process.env.VUE_APP_BASE_URL}/secret/${response.data._id}/${response.data._secretKey}`
        setTimeout(() => okSecretAnimation(), 4000);
      } catch (error) {
        console.log(error)
      }
    }

    function returnToDefault(){
      returnToDefaultAnimation()
    }

    return { currentStatus, sendSecret, status, secretBody, selectedTime,secretUrl, returnToDefault };
  },
};
</script>

<style scoped>
option {
    z-index:1;
    margin:0 0;
    padding:0 0;
    list-style:none;
    border:1px solid #ccc;
    background-color: rgba(22, 21, 26, 1);
    -webkit-box-shadow:0 1px 2px rgba(0, 0, 0, 0.2);
    -moz-box-shadow:0 1px 2px rgba(0, 0, 0, 0.2);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
}
option li {
    padding:0 6px;
    margin:0 0;
    padding:0 10px;
}
option li:hover {
    background-color:white;
    color:white;
}
@media only screen and (min-width: 1200px){
.sphere {
    user-select: none;
    z-index: -1;
    position: absolute;
    top: 170px;
    right: 700px;
  }

  .cube {
    user-select: none;
    z-index: -1;
    position: absolute;
    top: 590px;
    right: 200px;
  }

  .card-submit {
    margin-top: 1rem;
  }

  .card-expiration {
    margin-top: 1rem;
  }

  .warning{
    font-size: 14px;
    margin:0 0 .9rem 0;
  }

  .loadera{
    height: 300px;
    min-width: 400px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;
  }

  .loader{
    min-height: 300px;
    min-width: 400px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-content: center;
    align-items: center;
  }

  .card-content{
    min-height: 300px;
    min-width: 400px;
  }

  .card {
    margin-right: 13rem;
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

  .card textarea {
    width: 97%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: 0;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background-color: rgba(22, 21, 26, 0.2);
    border-radius: 3px;
    font-size: 18px;
    color: white;
    transition-duration: 0.25s;
    font-weight: 300;
  }

  .card select {
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

  .hero {
    padding-top: 8.4rem;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-content: center;
    align-items: center;
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
}

@media screen and (min-width: 1px) and (max-width: 1200px){
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

  .hero-text{
    display:none;
  }

  .card-submit {
    margin-top: 1rem;
  }

  .card-expiration {
    margin-top: 1rem;
  }

  .warning{
    font-size: 14px;
    margin:0 0 .9rem 0;
  }

  .loadera{
    height: 300px;
    min-width: 200px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-content: center;
    align-items: center;
  }

  .loader{
    min-height: 300px;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-content: center;
    align-items: center;
  }

  .card-content{
    min-height: 300px;
    min-width: 200px;
    max-width: 100%;
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

  .card textarea {
    width: 97%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: 0;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background-color: rgba(22, 21, 26, 0.2);
    border-radius: 3px;
    font-size: 18px;
    color: white;
    transition-duration: 0.25s;
    font-weight: 300;
  }

  .card select {
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

  .hero {
    padding-top: 4.4rem;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-content: center;
    align-items: center;
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
}
</style>
