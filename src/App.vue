<template>
  <div id="app">
    <BansosForm />
  </div>
</template>

<script>
import BansosForm from './components/BansosForm.vue'

export default {
  name: 'App',
  components: {
    BansosForm
  }
}
</script>

<style>
/* Reset CSS untuk tampilan yang lebih konsisten */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
  background-color: #f5f7fa;
  color: #333;
}

#app {
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Mengubah dari center ke flex-start */
  padding: 50px 20px; /* Menambahkan padding untuk ruang ekstra */
  min-height: 100vh; /* Memastikan ketinggian minimum 100vh */
  background: linear-gradient(135deg, #4b6cb7, #182848);
}

.form-container {
  max-width: 600px;
  width: 100%;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-top: 20px; /* Memberikan jarak dari atas layar */
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #182848;
  font-weight: bold;
}

form > div {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

input[type="text"],
input[type="number"],
select {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus,
input[type="number"]:focus,
select:focus {
  border-color: #4b6cb7;
  outline: none;
}

input[type="file"] {
  border: none;
}

button {
  width: 100%;
  padding: 15px;
  background: #4b6cb7;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

button:hover {
  background: #3a53a4;
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
}

pre {
  background: #f0f0f0;
  padding: 15px;
  border-radius: 5px;
  margin-top: 20px;
  font-size: 14px;
}
</style>
