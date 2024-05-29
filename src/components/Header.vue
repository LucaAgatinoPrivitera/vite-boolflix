<script>
import { ref } from 'vue'
</script>

<template>
  <div class="w-100 bg-dark">
    <div class="bg-dark">
      <nav class="navbar w-50 m-auto">
        <div class="container-fluid">
          <a class="navbar-brand text-danger">Boolflix</a>
          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success text-light border-light" type="submit">Search</button>
          </form>
        </div>
      </nav>
    </div>
  </div>
</template>

<style scoped>
</style>
