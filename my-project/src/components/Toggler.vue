<template>
    <h1 v-if="show">This text will be toggled off and on</h1>
</template>

<script>
export default {
    data() {
        return {
            show: true
        }
    },
    methods: {
        toggle() {
            this.show = !this.show
        }
    },
    unmounted() {
        console.log("Toggler component is unmounted")
    },
    mounted() {
        console.log("Toggler component is mounted")
    }
}
</script>