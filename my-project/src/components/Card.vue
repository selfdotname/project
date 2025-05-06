<template>
  <div class="card">
    <img src="../assets/logo.png" alt="" />
    <div class="details">
      <h2>{{title}}</h2>
      <p>
        {{body}}
      </p>
    </div>
  </div>
</template>

<script>
    export default {
        props: ["title", "body"]
    }
</script>

<style>
    .card {
        display: flex;
        align-items: center;
        box-shadow: 0 32px 45px -16px #ddd;
        gap: 1rem;
        padding: 1rem;
        max-width: 640px;
        margin: 2rem auto;
        position: relative;
        top: 0;
        transition: all .5s ease-in-out;
        cursor: pointer;
    }

    .card img {
        width: 120px;
        height: 120px;
    }

    .details * {
        text-align: left;
    }

    .details h2 {
        margin-bottom: 1rem;
    }

    .details p {
        color: #aaa;
    }


    .card:hover {
        top: 1rem;
    }
</style>