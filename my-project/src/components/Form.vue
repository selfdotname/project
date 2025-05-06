<template>
  <form>
    <label>Email</label>
    <input type="text" v-model="email" />
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: ""
    };
  },
  updated() {
    console.log("data has changed")
  }
};
</script>

<style>
  input {
    display: block;
    padding: .5rem;
    margin: 0 auto;
  }
</style>