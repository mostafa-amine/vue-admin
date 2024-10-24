<template>
  <div class="linear-progress-wrapper">
    <div class="linear-progress-container">
      <div class="linear-progress-bar"></div>
    </div>
  </div>
</template>

<style scoped>
.linear-progress-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 1rem;
}

.linear-progress-container {
  width: 200px; /* You can adjust this value */
  height: 5px; /* loading thickness */
  background-color: #f3f3f3;
  overflow: hidden;
  position: relative;
  border-radius: 4px; /* Added subtle rounding */
}

.linear-progress-bar {
  width: 30%;
  height: 100%;
  background-color: #000000;
  position: absolute;
  left: -30%;
  animation: running-line 1.5s infinite ease-in-out;
}

@keyframes running-line {
  0% {
    left: -30%;
  }
  100% {
    left: 100%;
  }
}
</style>
