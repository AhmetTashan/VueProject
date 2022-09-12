<script>
export default {
    name: 'Header',
}
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-dark navbar-bg-color shadow mb-4 fixed-top">
        <div class="container-fluid">
            <RouterLink :to="{name: 'dashboard.home'}" class="navbar-brand">Ana Sayfa</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink :to="{name: 'dashboard.home'}" exact-active-class="active" class="nav-link" aria-current="page">Home</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink :to="{name: 'post.list'}" active-class="active" class="nav-link" aria-current="page">Post</RouterLink>
                    </li>
                </ul>
                <div class="dropdown mx-lg-4 mx-0">
                    <a class="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {{ $store.state.auth.user.name }} {{ $store.state.auth.user.surname }}
                    </a>
                    <ul class="dropdown-menu dropdown-menu-lg-end dropdown-menu-center shadow-sm">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><RouterLink :to="{name: 'auth.logout'}" class="dropdown-item">Güvenli Çıkış</RouterLink></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
.navbar-bg-color {
    background-color: #16a085;
}
</style>
