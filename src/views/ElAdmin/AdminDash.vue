<template>
  <div id="admin-main">
    <header class="header">
      <div class="topnav-header-admin">
        <!-- Navegación -->
        <li>
          <a href="#" @click="selectPage('dashboard')">
            <i class='bx bxs-dashboard'></i> Dashboard
          </a>
        </li>
        <li>
          <a href="#" @click="selectPage('classes')" :class="{ active: selectedPage === 'classes' }">
            <i class="bx bi bi-journal-bookmark-fill"></i> Classes
          </a>
        </li>
        <li>
          <a href="#" @click="selectPage('recordings')" :class="{ active: selectedPage === 'recordings' }">
            <i class="bx bi bi-camera-reels-fill"></i>  Grabaciones
          </a>
        </li>
        <a href="#about" class="split" @click="signOut">Salir</a>
      </div>
    </header>

    <div class="dashboard-content">
      <Dashboard v-if="selectedPage === 'dashboard'" />
      <ClassesDashboard v-if="selectedPage === 'classes'" />
      <GrabacionesDashboard v-if="selectedPage === 'recordings'" />
    </div>
  </div>
</template>

<script>
import Dashboard from '@/components/Dashboards/dashboardAdmin.vue'
import ClassesDashboard from '@/components/Dashboards/ClassesDashboard/ClassesDashboard.vue'
import GrabacionesDashboard from '@/components/Dashboards/GrabacionesAdmin.vue'
import { getAuth, signOut as firebaseSignOut } from 'firebase/auth';
import { useRouter } from 'vue-router';


export default {
  components: {
    Dashboard,
    ClassesDashboard,
    GrabacionesDashboard
  },
  data() {
    return {
      selectedPage: 'dashboard'
    };
  },
  methods: {
    selectPage(page) {
      this.selectedPage = page;
    },
    async signOut() {
      try {
        const auth = getAuth();
        await firebaseSignOut(auth);

        this.$router.push({ name: 'AccessPage' });
      } catch (error) {
        console.error('Error durante el cierre de sesión:', error);
      }
    }
  }
}
</script>

<style src="./AdminDashboard.css"></style>