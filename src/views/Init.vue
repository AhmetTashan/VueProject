<template>
    <div></div>
</template>

<script>

export default {
    name: 'Home',
    created() {
        this.$router.push({name: 'dashboard.home'});
    }
}
</script>
