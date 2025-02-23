<template>
  <div id="class-recordings">
    <header class="header">
      <div class="topnav-header">
        <a style="color: #f2f2f2;">{{ name }}</a>
        <a class="split" @click="signOut">Salir</a>
      </div>
    </header>

    <div class="main-content">
      <div class="video-container">
        <div v-if="!videoSrc" class="video-placeholder">
          <video controls class="video-player">
          Your browser does not support the video tag.
        </video>
        </div>
        <div class="video-wrapper">
          <iframe 
            :src="videoSrc" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
          ></iframe>
        </div>

        <div class="details-container">
        <div class="detail-nav" :class="navcurrentclass">
          <a :class="{ active: currentSection === 'overview'}" @click="selectSection('overview')" href="#overview">General</a>
          <a :class="{ active: currentSection === 'lesson' }" @click="selectSection('lesson')" href="#lesson">Lección</a>
          <a :class="{ active: currentSection === 'content'}" @click="selectSection('content')" href="#content" class="contenido">Contenido</a>
          <!-- <a :class="{ active: currentSection === 'resources' }" @click="selectSection('resources')" href="#resources">Recursos</a> -->
        </div>

        <div class="details">
          <div v-if="currentSection === 'overview'">
            <div class="className">
              <h3>{{ name }}</h3>
            </div>
            <div class="classInfo">
              <div class="studentsTotal">
                <p>{{ classInfo.students }}</p>
                <p>Estudiantes</p>
              </div>
              <div class="horasTotal">
                <p>{{ classInfo.hours }} horas</p>
                <p>Total</p>
              </div>
              <div class="cursosTotal">
                <p>{{ classInfo.courses }} Clases</p>
                <p>Total</p>
              </div>
            </div>
            <div class="docenteInfo">
              <i class="bi bi-person-fill"></i>
              <p>{{ instructorName }}</p>
            </div>
            <div class="classSchedule">
              <p>{{ classSchedule.days }} {{ classSchedule.hours }}</p>
            </div>
          </div>

          <div v-if="currentSection === 'lesson'">
            <div class="className">
              <h3>{{ selectedLesson ? selectedLesson.title : 'Seleccione una lección' }}</h3>
            </div>
            
            <div class="leccionInfo">

              <div class="fechaLecc">
                <div class="icono-fecha">
                  <i class="bi bi-calendar-week"></i>
                  <p>{{formatDate(selectedLesson.publicationDate)}}</p>
                </div>
                <p class="fechaP">Fecha</p>
              </div>

              <div class="fechaLecc">
                <div class="icono-fecha">
                  <i class="bi bi-clock"></i>
                  <p>{{ selectedLesson.duracion }}</p>
                </div>
                <p>Duración</p>
              </div>

            </div>
          </div>
          <!-- <div v-if="currentSection === 'resources'">
            <h3>Recursos</h3>
            <p>Contenido sobre los recursos disponibles para la clase.</p>
          </div> -->
          <div v-if="currentSection === 'content'">
        <h3>Contenido - Parcial {{ partial }}</h3>
        <button class="accordion-content" @click="toggleAccordion(1)">Semana 1</button>
        <div :class="{'panel-content': true, 'show': activeAccordion == 1}">
            <ul>
                <li v-for="lesson in lessonsModule1" :key="lesson.id" @click="selectLesson(lesson)">
                    <a href="#">{{ lesson.title }}</a>
                </li>
            </ul>
        </div>

        <button class="accordion-content" @click="toggleAccordion(2)">Semana 2</button>
        <div class="panel-content" v-show="activeAccordion == 2">
            <ul>
                <li v-for="lesson in lessonsModule2" :key="lesson.id" @click="selectLesson(lesson)">
                    <a href="#">{{ lesson.title }}</a>
                </li>
            </ul>
        </div>

        <button class="accordion-content" @click="toggleAccordion(3)">Semana 3</button>
        <div class="panel-content" v-show="activeAccordion == 3">
            <ul>
                <li v-for="lesson in lessonsModule3" :key="lesson.id" @click="selectLesson(lesson)">
                    <a href="#">{{ lesson.title }}</a>
                </li>
            </ul>
        </div>
    </div>

          
  </div>
</div>
</div>

      <aside class="sidebar">
  <h2>Contenido - Parcial {{ partial }}</h2>

  <button class="accordion active">Semana 1</button>
  <div class="panel">
    <ul>
      <li v-for="lesson in lessonsModule1" :key="lesson.id" @click="selectLesson(lesson)">
        <a href="#">{{ lesson.title }}</a>
      </li>
    </ul>
  </div>

  <button class="accordion">Semana 2</button>
  <div class="panel">
    <ul>
      <li v-for="lesson in lessonsModule2" :key="lesson.id" @click="selectLesson(lesson)">
        <a href="#">{{ lesson.title }}</a>
      </li>
    </ul>
  </div>

  <button class="accordion">Semana 3</button>
  <div class="panel">
    <ul>
      <li v-for="lesson in lessonsModule3" :key="lesson.id" @click="selectLesson(lesson)">
        <a href="#">{{ lesson.title }}</a>
      </li>
    </ul>
  </div>
</aside>

    </div>
  </div>
</template>



<script>
import { auth } from '@/firebase/config';
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { projectFirestore } from '@/firebase/config';
import { initClassRecordings } from './classrecordings';

export default {
  data() {
    return {
      activeAccordion: null,
      currentSection: 'overview',
      name: '',
      classInfo: {
        students: 0,
        hours: '',
        courses: 0,
      },
      instructorName: '',
      classSchedule: {
        days: '',
        hours: '',
      },
      partial: '',
      videoSrc: '',
      activeAccordion: null,
      selectedLesson: null,
      lessonsModule1: [],
      lessonsModule2: [],
      lessonsModule3: [],
    };
  },
  
  methods: {
    async incrementAccessCount(classId) {
      try {
        const classDocRef = doc(projectFirestore, 'classes', classId);
        const classDocSnap = await getDoc(classDocRef);

        if (classDocSnap.exists()) {
          const classInfo = classDocSnap.data();
          const newAccessCount = classInfo.accessCount + 1;

          await updateDoc(classDocRef, {
            accessCount: newAccessCount,
          });

          console.log('Access count incrementado:', newAccessCount);
        } else {
          console.log('El documento no existe.');
        }
      } catch (error) {
        console.error('Error al incrementar accessCount:', error);
      }
    },
    

    toggleAccordion(k) {
      if(this.activeAccordion === k) {
        this.activeAccordion = null
        console.log('activeAccordion sigue null')
      } else {
        this.activeAccordion = k
        console.log('activeAccordion clicked')
      }
    },
    initAccordion() {
    const acc = document.getElementsByClassName("accordion");

    for (let i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        console.log('Accordion clicked');
        this.classList.toggle("active");

        const panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }
  },

    async loadLessons(classId) {
      try {
        const classRef = doc(projectFirestore, 'classes', classId);
        const lessonsRef = collection(classRef, 'lessons');
        const querySnapshot = await getDocs(lessonsRef);

        const lessons = querySnapshot.docs.map(doc => doc.data());
        this.lessonsModule1 = lessons.filter(lesson => lesson.module === '1');
        this.lessonsModule2 = lessons.filter(lesson => lesson.module === '2');
        this.lessonsModule3 = lessons.filter(lesson => lesson.module === '3');
      } catch (error) {
        console.error('Error al cargar las lecciones:', error);
      }
    },

    async fetchData(classId) {
      try {
        const docRef = doc(projectFirestore, 'classes',classId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          this.name = data.name || '',
          this.partial = data.partial || '',
          this.classInfo.students = data.students || 0,
          this.classInfo.hours = data.horasTot || '',
          this.classInfo.courses = data.courses || 0,
          this.instructorName = data.instructorName || '',
          this.classSchedule.days = data.days || '',
          this.classSchedule.hours = data.hours || '';

          
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error getting document:', error);
      }
    },

    async loadClassData(classId) {
    try {
      const classRef = doc(projectFirestore, 'classes', classId);
      const classSnapshot = await getDoc(classRef);
      
      if (classSnapshot.exists()) {
        const classData = classSnapshot.data();
        this.classTitle = classData.name;
        this.videoSrc = classData.recording;
      } else {
        console.error('No se encontró la clase');
      }
    } catch (error) {
      console.error('Error al cargar los datos de la clase:', error);
    }
  },
    selectSection(section) {
      this.currentSection = section;
    },
    
    selectLesson(lesson) {
      const videoId = new URL(lesson.videoURL).searchParams.get('v');
      this.videoSrc = `https://www.youtube.com/embed/${videoId}`;
      this.selectedLesson = lesson;
      this.selectSection('lesson');
    },

    formatDate(timestamp) {
    if (timestamp && typeof timestamp.toDate === 'function') {
      const date = timestamp.toDate();
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } 
    else if (typeof timestamp === 'number') {
      const date = new Date(timestamp);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } 
    else if (typeof timestamp === 'string') {
      const date = new Date(Date.parse(timestamp));
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } 
    else {
      return 'Fecha no válida';
    }
  },
    async signOut() {
      try {
        await auth.signOut();
        localStorage.removeItem('accessClassId');
        sessionStorage.removeItem('accessClassId');

        this.$router.push('/');
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    }
  },
  
  mounted() {
    const accessClassId = sessionStorage.getItem('accessClassId');

    if (!accessClassId) {
      this.$router.push('/');
    } else {
      this.loadClassData(accessClassId);
    }
    

    const classId = this.$route.params.classId;
    this.fetchData(classId);
    this.loadLessons(classId).then(() => {
      if (this.lessonsModule1.length > 0) {
        this.selectLesson(this.lessonsModule1[0]);
      } else if (this.lessonsModule2.length > 0) {
        this.selectLesson(this.lessonsModule2[0]);
      } else if (this.lessonsModule3.length > 0) {
        this.selectLesson(this.lessonsModule3[0]);
      }
    });

    this.initAccordion();

    this.incrementAccessCount(classId);
    },

};
</script>

<style src="./classrecordings.css"></style>