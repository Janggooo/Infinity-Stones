<script setup>
import Nav from './component/nav.vue'
import Header from './component/header.vue'
</script>

<template>
    <div id="page-main" class="page">
        <Nav />
        <Header :pending="4" :accepted="1" :rejected="1" />

        <div class="content-card">
            <h1>All Applications</h1>
            <p>All moderator view goes here.</p>
        </div>
    </div>
</template>

<style scoped>
.page {
    min-height: 100vh;
    background: linear-gradient(160deg, #0d0f2b 0%, #131640 100%);
    color: #ffffff;
}

.content-card {
    padding: 32px 24px;
}

h1 {
    margin-bottom: 12px;
}

p {
    color: #d6d9f5;
}
</style>
