<template>
    <div id="nav">
        <router-link to="/post/list">Post</router-link> |
        <router-link :to="{name: 'auth.logout'}">Çıkış Yap</router-link>
    </div>
    <router-view/>
    <div>footer</div>
</template>
