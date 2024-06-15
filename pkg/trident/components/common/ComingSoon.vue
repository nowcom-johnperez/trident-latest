<template>
  <div class="coming-soon">
    <div class="content">
      <img src="../../assets/img/under-development.png" alt="Under Construction" />
      <h1>Coming Soon!</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComingSoon'
};
</script>

<style scoped>
.coming-soon {
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
}

.content {
  text-align: center;
}

h1 {
  font-size: 3rem;
  color: #333;
  margin-bottom: 20px;
}

img {
  max-width: 100%;
  height: auto;
}
</style>
