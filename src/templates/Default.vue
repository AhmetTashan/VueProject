<template>
    <Header/>
    <div class="container">
        <router-view/>
    </div>
</template>

<script>
import Header from './Header.vue'

export default {
    name: 'Default',
    components: {
        Header
    }
}
</script>

<style lang="scss" scoped>
.container {
    &:before {
        content: '';
        display: block;
        height: 80px;
    }
}

</style>
