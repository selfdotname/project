<template>
  <Toggler v-if="show" />
  <button @click="toggle">Toggle</button>
  <Form />
  <Iterate />
  <!-- <h1>{{title}} - {{num}}</h1>
  <button v-on:click="handleEvent" ref="button">Inc num</button> -->
  <!-- <Card title="Vue is the best" body="Yhep, I could write more than 20 reasons why"/>
  <Card title="Second card" body="Where have you been"/> -->
</template>

<script>
import Card from "./components/Card.vue";
import Toggler from "./components/Toggler.vue";
import Form from "./components/Form.vue";
import Iterate from './components/Iterate.vue';

export default {
  name: "App",
  components: {
    Card,
    Toggler,
    Form,
    Iterate
  },
  data() {
    return {
      title: "My First Vue App",
      num: 0,
      show: true,
    };
  },
  methods: {
    handleEvent() {
      console.log(this.$refs.button);
    },
    toggle() {
      this.show = !this.show;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
