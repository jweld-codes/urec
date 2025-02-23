<template>
  <div id="main-body">
    <img class="wave" src="@/assets/img/wave.png">
    <div class="home-container">
      <div class="img user-select-none">
        <img src="@/assets/img/ZUSI-LOGO.png">
      </div>
      <div class="login-content user-select-none">
        <form @submit.prevent="checkAccess">
          <h2 class="title new-amsterdam-regular">¡Bienvenido a UREC!</h2>
                <div class="input-div one">
                    <div class="i">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="div">
                  <input type="text" v-model="accessCode" class="input" placeholder="Código de Acceso" novalidate/>
                </div>
                </div>
                <!-- <span @click="signInWithGoogle" class="login-button-google">Entrar con <i class="bi bi-google">oogle</i></span> -->
                <button type="submit" class="login-button btn">Ingresar</button>
              </form>
          </div>
      </div>
</div>
</template>

<style src="./accesspage.css"></style>

<script>
import { collection, query, where, getDocs , doc, setDoc} from 'firebase/firestore';
import { auth, projectFirestore } from '@/firebase/config';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initAccessPage } from './accesspage.js';

export default {
  data() {
    return {
      accessCode: '',
      errorMessage: ''
    };
  },
  methods: {
    async checkAccess() {
    try {
      const dashUserRef = collection(projectFirestore, 'dashusers')
      const dashUserQuery = query(dashUserRef, where('accessCode', '==', this.accessCode))
      const dashUserSnapshot = await getDocs(dashUserQuery)

      

      if (!dashUserSnapshot.empty) {
        const userDoc = dashUserSnapshot.docs[0]
        const userData = userDoc.data()

        sessionStorage.setItem('userId', userDoc.id)

        if(userData.role === 'admin'){
          this.$router.push({name: 'AdminDash'})
        } else {
          this.errorMessage = 'Rol no reconocido'
        }
      } else {
        const classesRef = collection(projectFirestore, 'classes');
        const classQuery = query(classesRef, where('accessCode', '==', this.accessCode));
        const classSnapshot = await getDocs(classQuery);

        if(!classSnapshot.empty){
          const classDoc = classSnapshot.docs[0]
          const classId = classDoc.id

          sessionStorage.setItem('accessClassId', classId)

          this.$router.push({ name: 'ClassRecordings', params: { classId } });
        } else {
          this.errorMessage = 'Codigo Invalido'
        }
      }

    } catch (error) {
      console.error('Error checking access:', error);
      this.errorMessage = 'Error verificando el código de acceso';
    }
  },
    // async signInWithGoogle() {
    //     const provider = new GoogleAuthProvider();
        
    //     // Agrega los scopes para solicitar el email y el perfil del usuario
    //     provider.addScope('https://www.googleapis.com/auth/userinfo.email');
    //     provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    //     provider.addScope('openid');
        
    //     try {
    //       const result = await signInWithPopup(auth, provider);
    //       const user = result.user;

    //       // Aquí colocas el console.log para revisar toda la información del usuario
    //       console.log(JSON.stringify(user, null, 2));
    //       const email = user.email || (user.providerData.length > 0 ? user.providerData[0].email : null);
    //       const userRef = doc(projectFirestore, 'users', user.uid);
          
    //       await setDoc(userRef, {
    //         uid: user.uid,
    //         displayName: user.displayName,
    //         email: email,  // Ahora usando el email obtenido de providerData
    //         photoURL: user.photoURL,
    //         providerId: result.providerId,
    //         lastLogin: new Date()
    //       }, { merge: true });
          
    //       if (email) {
    //         // Supongamos que obtienes el classId desde algún lugar
    //         const classId = this.getClassId(); // Implementa esta función para obtener el classId
            
    //         // Redirige a la página con el classId
    //         if (classId) {
    //           this.$router.push({ name: 'ClassRecordings', params: { classId } });
    //         } else {
    //           this.errorMessage = 'No se pudo obtener el classId.';
    //         }
    //       } else {
    //         this.errorMessage = 'No se pudo obtener el email del usuario.';
    //       }
    //     } catch (error) {
    //       console.error('Error during Google sign-in:', error);
    //       this.errorMessage = `Error durante el inicio de sesión: ${error.message}`;
    //     }
    //   }
    
    },
    mounted(){
      initAccessPage()
    }
  }

</script>
