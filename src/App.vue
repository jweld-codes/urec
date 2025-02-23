<template>
  <!-- <div id="nav">
    <router-link to="/">Welcome</router-link> |
  </div> -->
  <router-view/>
</template>
<script>
import { auth } from '@/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { projectFirestore } from '@/firebase/config';

export default {
  created() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Realiza la consulta de Firestore para obtener la clase basada en un criterio (por ejemplo, accessCode)
          const classesRef = collection(projectFirestore, 'classes');
          const q = query(classesRef, where('userId', '==', user.uid));  // Ajusta este criterio según tu modelo de datos
          const snapshot = await getDocs(q);

          if (!snapshot.empty) {
            const classId = snapshot.docs[0].id;
            this.$router.push({ name: 'ClassRecordings', params: { classId } });
          } else {
            // Manejar el caso donde no se encuentra ninguna clase para el usuario
            console.error('No class found for the user.');
            this.$router.push('/');
          }
        } catch (error) {
          console.error('Error fetching class:', error);
          this.$router.push('/');
        }
      } else {
        this.$router.push('/');
      }
    });
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
