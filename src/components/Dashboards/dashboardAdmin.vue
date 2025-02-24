<template>
	<div id="dashboardadmin">
	  <div class="head-title">
		<div class="left">
		  <h1>Bienvenido {{ username }}</h1>
		  <ul class="breadcrumb">
			<li><a href="#">Dashboard</a></li>
			<li><i class='bx bx-chevron-right'></i></li>
			<li><a class="active" href="#">Inicio</a></li>
		  </ul>
		</div>
	  </div>
  
	  <ul class="box-info">
		<li>
		  <i class='bx bxs-video'></i>
		  <span class="text">
			<h3>{{ totalRecordings }}</h3>
			<p>Grabaciones en total</p>
		  </span>
		</li>
		<li>
		  <i class='bx bxs-calendar-check'></i>
		  <span class="text">
			<h3>{{ newRecordingsThisWeek }}</h3>
			<p>Grabaciones nuevas de esta semana</p>
		  </span>
		</li>
		<li>
		  <i class='bx bxs-user'></i>
		  <span class="text">
			<h3>{{ classInfo.accessCount }}</h3>
			<p>Registros Uso</p>
		  </span>
		</li>
	  </ul>
  
	  <div class="table-data">
		<div class="order recent-recordings">
		  <div class="head">
			<h3>Grabaciones Recientes</h3>
			<i class='bx bx-search'></i>
			<i class='bx bx-filter'></i>
		  </div>
		  <table>
			<thead>
			  <tr>
				<th>Título</th>
				<th>Fecha</th>
				<th>Duración</th>
				<th>Asignatura</th>
			  </tr>
			</thead>
			<tbody>
			  <tr v-for="lesson in recentLessons" :key="lesson.id">
				<td>
				  <p>{{ lesson.title }}</p>
				</td>
				<td>{{ formatDate(lesson.publicationDate) }}</td>
				<td>{{ lesson.duracion }}</td>
				<td>{{ classInfo.name }}</td>
			  </tr>
			</tbody>
		  </table>
		</div>
	  </div>
	</div>
  </template>

<style src="./dashboardAdmin.css"></style>
<style src="@/components/Navbars/navbar.css"></style>

<script>
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { projectFirestore } from '@/firebase/config';

export default {
  data() {
    return {
      username: 'Admin',
      classInfo: {},
      recentLessons: [],
      totalRecordings: 0,
      newRecordingsThisWeek: 0,
      activeUsers: 5,
    };
  },
  methods: {
    async fetchClassData() {
      try {
        const classDocRef = doc(projectFirestore, 'classes', '**');
        const classDocSnap = await getDoc(classDocRef);

		if (classDocSnap.exists()) {
          this.classInfo = classDocSnap.data();
        }

        const lessonsRef = collection(projectFirestore, 'classes', '**', 'lessons');
        const lessonsSnapshot = await getDocs(lessonsRef);
        
        let totalDuration = 0;
        const lessons = [];

        lessonsSnapshot.forEach((doc) => {
          const lesson = doc.data();
          lesson.id = doc.id;
          lessons.push(lesson);

		  lesson.publicationDate = lesson.publicationDate.toDate();

          const durationParts = lesson.duracion.split(':');
          totalDuration += parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);
        });

        this.recentLessons = lessons;
        this.totalRecordings = lessons.length;

        const totalHours = Math.floor(totalDuration / 60);
        const remainingMinutes = totalDuration % 60;
        await updateDoc(classDocRef, {
          horasTot: `${totalHours}:${remainingMinutes}`,
        });

        await updateDoc(classDocRef, {
          courses: lessons.length,
        });

      } catch (error) {
        console.error('Error obteniendo datos:', error);
      }
    },

    calculateNewRecordings() {
      const currentDate = new Date();
      const oneWeekAgo = new Date(currentDate);
      oneWeekAgo.setDate(currentDate.getDate() - 7);

      this.newRecordingsThisWeek = this.recentLessons.filter((lesson) => {
        const publicationDate = new Date(lesson.publicationDate.seconds * 1000);
        return publicationDate >= oneWeekAgo && publicationDate <= currentDate;
      }).length;
    },
	formatDate(date){
		if(!date) return ''

		const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
		return date.toLocaleDateString('es-ES', options)
	}
  },
  async mounted() {
    await this.fetchClassData();
    this.calculateNewRecordings();
  },
};
</script>
