<template>
  <div class="form-container">
    <h2>Formulir Penerima Bantuan Sosial</h2>
    <form @submit.prevent="submitForm">
      <!-- Nama -->
      <div>
        <label>Nama:</label>
        <input type="text" v-model="formData.nama" required />
      </div>

      <!-- NIK -->
      <div>
        <label>NIK:</label>
        <input type="number" v-model="formData.nik" required />
      </div>

      <!-- Nomor Kartu Keluarga -->
      <div>
        <label>Nomor Kartu Keluarga:</label>
        <input type="number" v-model="formData.kk" required />
      </div>

      <!-- Foto KTP -->
      <div>
        <label>Foto KTP:</label>
        <input type="file" @change="handleFileUpload($event, 'ktp')" accept=".jpg, .jpeg, .png, .bmp" required />
      </div>

      <!-- Foto Kartu Keluarga -->
      <div>
        <label>Foto Kartu Keluarga:</label>
        <input type="file" @change="handleFileUpload($event, 'kk')" accept=".jpg, .jpeg, .png, .bmp" required />
      </div>

      <!-- Umur -->
      <div>
        <label>Umur:</label>
        <input type="number" v-model="formData.umur" min="25" required />
      </div>

      <!-- Jenis Kelamin -->
      <div>
        <label>Jenis Kelamin:</label>
        <select v-model="formData.jenisKelamin" required>
          <option value="Laki-laki">Laki-laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>
      </div>

      <!-- Pilihan Provinsi, Kab/Kota, Kecamatan, Kelurahan/Desa -->
      <div>
        <label>Provinsi:</label>
        <select v-model="formData.provinsi" @change="fetchKabupaten" required>
          <option v-for="provinsi in provinsiList" :key="provinsi.id" :value="provinsi.name">
            {{ provinsi.name }}
          </option>
        </select>
      </div>
      <div>
        <label>Kab/Kota:</label>
        <select v-model="formData.kabupaten" @change="fetchKecamatan" required>
          <option v-for="kabupaten in kabupatenList" :key="kabupaten.id" :value="kabupaten.name">
            {{ kabupaten.name }}
          </option>
        </select>
      </div>
      <div>
        <label>Kecamatan:</label>
        <select v-model="formData.kecamatan" @change="fetchKelurahan" required>
          <option v-for="kecamatan in kecamatanList" :key="kecamatan.id" :value="kecamatan.name">
            {{ kecamatan.name }}
          </option>
        </select>
      </div>
      <div>
        <label>Kelurahan/Desa:</label>
        <select v-model="formData.kelurahan" required>
          <option v-for="kelurahan in kelurahanList" :key="kelurahan.id" :value="kelurahan.name">
            {{ kelurahan.name }}
          </option>
        </select>
      </div>

      <!-- Alamat -->
      <div>
        <label>Alamat:</label>
        <input type="text" v-model="formData.alamat" maxlength="255" required />
      </div>

      <!-- RT & RW -->
      <div>
        <label>RT:</label>
        <input type="text" v-model="formData.rt" required />
      </div>
      <div>
        <label>RW:</label>
        <input type="text" v-model="formData.rw" required />
      </div>

      <!-- Penghasilan Sebelum dan Setelah Pandemi -->
      <div>
        <label>Penghasilan Sebelum Pandemi:</label>
        <input type="number" v-model="formData.penghasilanSebelumPandemi" required />
      </div>
      <div>
        <label>Penghasilan Setelah Pandemi:</label>
        <input type="number" v-model="formData.penghasilanSetelahPandemi" required />
      </div>

      <!-- Alasan Membutuhkan Bantuan -->
      <div>
        <label>Alasan Membutuhkan Bantuan:</label>
        <select v-model="formData.alasan" required>
          <option value="Kehilangan pekerjaan">Kehilangan pekerjaan</option>
          <option value="Kepala keluarga">Kepala keluarga</option>
          <option value="Tergolong fakir/miskin">Tergolong fakir/miskin</option>
          <option value="Lainnya">Lainnya: …</option>
        </select>
      </div>

      <!-- Checkbox Konfirmasi -->
      <div>
        <input type="checkbox" v-model="formData.konfirmasi" required />
        <label>Saya menyatakan bahwa data yang diisikan adalah benar...</label>
      </div>

      <!-- Submit Button -->
      <button type="submit">Submit</button>
    </form>

    <!-- Preview Data -->
    <div v-if="submissionSuccess !== null">
      <h3>{{ submissionSuccess ? 'Data berhasil dikirim' : 'Pengiriman data gagal' }}</h3>
      <pre>{{ formData }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        nama: '',
        nik: '',
        kk: '',
        ktp: null,
        kkFile: null,
        umur: '',
        jenisKelamin: '',
        provinsi: '',
        kabupaten: '',
        kecamatan: '',
        kelurahan: '',
        alamat: '',
        rt: '',
        rw: '',
        penghasilanSebelumPandemi: '',
        penghasilanSetelahPandemi: '',
        alasan: '',
        konfirmasi: false,
      },
      provinsiList: [],
      kabupatenList: [],
      kecamatanList: [],
      kelurahanList: [],
      submissionSuccess: null,
    };
  },
  methods: {
    fetchProvinsi() {
      fetch('/.netlify/functions/fetchProvinces')
  .then(response => response.json())
  .then(provinces => {
    this.provinsiList = provinces;
  })
  .catch(error => {
    console.error('Error fetching provinces:', error);
  });

    },
    fetchKabupaten() {
      fetch(`https://emsifa.github.io/api-wilayah-indonesia/api/regencies/${this.formData.provinsi}.json`)
        .then(response => response.json())
        .then(data => {
          this.kabupatenList = data;
        })
        .catch(error => {
          console.error('Error fetching regencies:', error);
        });
    },
    fetchKecamatan() {
      fetch(`https://emsifa.github.io/api-wilayah-indonesia/api/districts/${this.formData.kabupaten}.json`)
        .then(response => response.json())
        .then(data => {
          this.kecamatanList = data;
        })
        .catch(error => {
          console.error('Error fetching districts:', error);
        });
    },
    fetchKelurahan() {
      fetch(`https://emsifa.github.io/api-wilayah-indonesia/api/villages/${this.formData.kecamatan}.json`)
        .then(response => response.json())
        .then(data => {
          this.kelurahanList = data;
        })
        .catch(error => {
          console.error('Error fetching villages:', error);
        });
    },
    handleFileUpload(event, field) {
      const file = event.target.files[0];
      if (file && file.size <= 2 * 1024 * 1024) {
        this.formData[field] = file;
      } else {
        alert('File terlalu besar. Maksimal 2MB.');
      }
    },
    submitForm() {
      // Simulate backend response delay and success/failure
      setTimeout(() => {
        this.submissionSuccess = Math.random() > 0.5;
      }, 1500);
    },
  },
  mounted() {
    this.fetchProvinsi();
  },
};
</script>

<style scoped>
/* Styling untuk tampilan yang lebih menarik dan responsif */
.form-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

form > div {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
select,
button {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

pre {
  background: #eee;
  padding: 10px;
  border-radius: 4px;
}
</style>
