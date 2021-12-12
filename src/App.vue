<template>
  <div class="container">
    <div id="nav">
      <div class="logo">
        <router-link class="logo-link" to="/">KeepSecrets</router-link>
      </div>
      <div style="display:none;" class="call-action">
        <Button text="See Plans" />
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import Button from "@/components/common/Button.vue";
export default {
  name: "Home",
  components: {
    Button,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&family=Saira:wght@200;300;400;500;600;700&display=swap");
@media screen and (min-width: 1200px){
  .container {
    margin: 2.1rem 10rem 0 8rem;
  }

  .logo-link {
    font-size: 24px;
  }
}

@media screen and (min-width: 1px) and (max-width: 1200px){
  .container {
    margin: 1rem 2rem 0 2rem;
  }

  .logo-link {
    font-size: 40px;
  }
}

#nav {
  font-family: "Saira", sans-serif;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-content: center;
  align-items: center;
}

/* .container {
  margin: 2.1rem 10rem 0 8rem;
}

.logo-link {
  font-size: 24px;
}
 */
body {
  background: url("./assets/BG.png") no-repeat center center fixed;
  background-position: center top;
  background-size: cover;
  background-repeat:no-repeat;
}

#nav a {
  text-decoration: none;
  color: white;
}

#nav a:visited {
  text-decoration: none;
  color: white;
}
</style>
