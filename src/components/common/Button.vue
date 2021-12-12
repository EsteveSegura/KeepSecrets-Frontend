<template>
  <button>
    {{text}}
  </button>
</template>

<script>
export default {
  name: "Button",
  props:{
    text: String,
  }
}
</script>

<style scoped>

button{
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  background-color: #746FF0;
  padding: .8rem 1.5rem;
  color :white;
  border-radius:16px;
  border:0;
  cursor: pointer;
  user-select: none;
}
</style>