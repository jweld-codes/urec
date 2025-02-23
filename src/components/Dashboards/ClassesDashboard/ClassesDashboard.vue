<template>
    <div id="dashboardclasses">
        <div class="head-title">
            <div class="left">
                <h1>Gestión de Clases</h1>
                <ul class="breadcrumb">
                    <li><a href="#">Dashboard</a></li>
                    <li><i class='bx bx-chevron-right'></i></li>
                    <li><a class="active" href="#">Clases</a></li>
                </ul>
            </div>
        </div>

        <ul class="box-info">
            <li @click="showAddClassModal">
                <i class='bx bx-plus'></i>
                <span class="text">
                    <h3>Guardar Clase</h3>
                    <p>Agrega una nueva clase</p>
                </span>
            </li>
            <li @click="showDeleteClassModal">
                <i class='bx bx-trash'></i>
                <span class="text">
                    <h3>Eliminar Clase</h3>
                    <p>Elimina una clase existente</p>
                </span>
            </li>
            <li @click="showEditClassModal">
                <i class='bx bx-edit'></i>
                <span class="text">
                    <h3>Editar Clase</h3>
                    <p>Modifica detalles de una clase</p>
                </span>
            </li>
        </ul>

        <div class="table-data">
            <div class="active-usage">
                <h3>Registro de Uso</h3>
                <ul>
                    <li v-for="classItem in classes" :key="classItem.id">
                        <p>{{ classItem.name }}</p><p>{{ classItem.accessCount }}</p>
                    </li>
                </ul>
            </div>

            <div class="order recent-updates">
                <div class="head">
                    <h3>Clases Recientes</h3>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Asignatura</th>
                            <th>Docente</th>
                            <th>Modalidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="classItem in classes" :key="classItem.id">
                            <td>{{ classItem.accessCode }}</td>
                            <td>{{ classItem.name }}</td>
                            <td>{{ classItem.instructorName }}</td>
                            <td>{{ classItem.hours }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Modal para agregar clase -->
        <div v-if="showAddModal" class="modal fade show" tabindex="-1" aria-labelledby="addClassModalLabel" aria-hidden="true" style="display: block;">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addClassModalLabel">Agregar Nueva Clase</h5>
                        <button type="button" class="btn-close" @click="closeAddClassModal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="addClass">
                            <div class="mb-3">
                                <label for="inputCode" class="form-label">Código de Acceso</label>
                                <input type="text" class="form-control" id="inputCode" v-model="newClass.accessCode" />
                                <span style="font-size: 10px; color: blue; cursor: pointer;" @click="generateCode">Generar Código</span>
                            </div>
                            <div class="mb-3">
                                <label for="inputTeacher" class="form-label">Docente</label>
                                <input type="text" class="form-control" id="inputTeacher" v-model="newClass.instructorName" />
                            </div>
                            <div class="mb-3">
                                <label for="inputClassName" class="form-label">Nombre de la Clase</label>
                                <input type="text" class="form-control" id="inputClassName" v-model="newClass.name" placeholder="Nombre de la Clase" />
                            </div>
                            <div class="mb-3">
                                <label for="inputDay" class="form-label">Día de la Semana</label>
                                <select id="inputDay" class="form-select" v-model="newClass.days" >
                                    <option selected>Seleccione...</option>
                                    <option value="Lun - Jue">Lun - Jue</option>
                                    <option value="Lun - Vie">Lun - Vie</option>
                                    <option value="Mie">Mie</option>
                                    <option value="Vie">Vie</option>
                                    <option value="Sab">Sab</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="inputTime" class="form-label">Tiempo</label>
                                <input type="text" class="form-control" id="inputTime" v-model="newClass.hours">
                            </div>
                            <div class="mb-3">
                                <label for="inputTime" class="form-label">Estudiantes</label>
                                <input type="text" class="form-control" id="inputTime" v-model="newClass.students">
                            </div>
                            <button type="submit" class="btn btn-primary">Guardar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal para eliminar clase -->
        <div v-if="showDeleteModal" class="modal fade show" tabindex="-1" aria-labelledby="deleteClassModalLabel" aria-hidden="true" style="display: block;">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteClassModalLabel">Eliminar Clase</h5>
                        <button type="button" class="btn-close" @click="closeDeleteClassModal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="deleteClass">
                            <div class="mb-3">
                                <label for="deleteClassCode" class="form-label">Código de Acceso</label>
                                <select id="inputDay" class="form-select" v-model="classToDelete">
                                    <option selected  v-for="classItem in classes" :key="classItem.id">{{ classItem.accessCode }}</option>
                                </select>
                            </div>
                            <button type="submit" class="btn btn-danger">Eliminar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal para editar clase -->
        <div v-if="showEditModal" class="modal fade show" tabindex="-1" aria-labelledby="editClassModalLabel" aria-hidden="true" style="display: block;">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editClassModalLabel">Editar Clase</h5>
                        <button type="button" class="btn-close" @click="closeEditClassModal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="updateClass">
                            <div class="mb-3">
                                <label for="editClassCode" class="form-label">Código de Acceso</label>
                                <input type="text" class="form-control" id="editClassCode" v-model="editedClass.accessCode" />
                            </div>
                            <div class="mb-3">
                                <label for="editClassName" class="form-label">Nombre de la Clase</label>
                                <input type="text" class="form-control" id="editClassName" v-model="editedClass.name" />
                            </div>
                            <div class="mb-3">
                                <label for="editClassTeacher" class="form-label">Docente</label>
                                <input type="text" class="form-control" id="editClassTeacher" v-model="editedClass.instructorName" />
                            </div>
                            <div class="mb-3">
                                <label for="editClassTeacher" class="form-label">Dias de la semana</label>
                                <input type="text" class="form-control" id="editClassTeacher" v-model="editedClass.days" />
                            </div>
                            <div class="mb-3">
                                <label for="editClassTeacher" class="form-label">Tiempo</label>
                                <input type="text" class="form-control" id="editClassTeacher" v-model="editedClass.hours" />
                            </div>
                            <button type="submit" class="btn btn-primary">Actualizar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style src="@/components/Dashboards/dashboardAdmin.css"></style>
<style src="./classesdashboard.css"></style>

<script>
import { ref, onMounted } from 'vue';
import { projectFirestore } from '@/firebase/config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc , setDoc} from 'firebase/firestore';
import { initClassesDashboard } from './classesdashboard';

export default {
    name: 'ClassDashboard',
    setup() {
        const classes = ref([]);
        const showAddModal = ref(false);
        const showDeleteModal = ref(false);
        const showEditModal = ref(false);
        const newClass = ref({
            accessCode: '',
            name: '',
            instructorName: '',
            days: '',
            hours: '',
            students: ''
        });
        const classToDelete = ref('');
        const editedClass = ref({
            accessCode: '',
            name: '',
            instructorName: '',
            days: '',
            hours: '',
        });

        const closeAddClassModal = () => {
            showAddModal.value = false;
        };

        const closeDeleteClassModal = () => {
            showDeleteClassModal.value = false;
        };

        const closeEditClassModal = () => {
            showEditClassModal.value = false;
        };

        const addClass = async () => {
            try {
                const docRef = doc(collection(projectFirestore, 'classes'), newClass.value.accessCode);
                await setDoc(docRef, newClass.value);
                classes.value.push(newClass.value);
                newClass.value = {
                    accessCode: '',
                    name: '',
                    instructorName: '',
                    days: '',
                    hours: '',
                    students: ''
                };
                closeAddClassModal();
            } catch (error) {
                console.error("Error adding class: ", error);
            }
        };

        const deleteClass = async () => {
            try {
                const docRef = doc(collection(projectFirestore, 'classes'), classToDelete.value);
                await deleteDoc(docRef);
                classes.value = classes.value.filter(c => c.accessCode !== classToDelete.value);
                classToDelete.value = '';
                closeDeleteClassModal();
            } catch (error) {
                console.error("Error deleting class: ", error);
            }
        };

        const updateClass = async () => {
            try {
                const docRef = doc(collection(projectFirestore, 'classes'), editedClass.value.accessCode);
                await updateDoc(docRef, editedClass.value);
                const index = classes.value.findIndex(c => c.accessCode === editedClass.value.accessCode);
                if (index !== -1) {
                    classes.value[index] = editedClass.value;
                }
                editedClass.value = {
                    accessCode: '',
                    name: '',
                    instructorName: '',
                    days: '',
                    hours: '',
                };
                closeEditClassModal();
            } catch (error) {
                console.error("Error updating class: ", error);
            }
        };

        const generateCode = () => {
            newClass.value.accessCode = Math.floor(1000 + Math.random() * 9000).toString();
        };

        onMounted(async () => {
            try {
                const querySnapshot = await getDocs(collection(projectFirestore, 'classes'));
                classes.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            } catch (error) {
                console.error("Error fetching classes: ", error);
            }
        });

        return {
            classes,
            showAddModal,
            showDeleteModal,
            showEditModal,
            newClass,
            classToDelete,
            editedClass,
            closeAddClassModal,
            closeDeleteClassModal,
            closeEditClassModal,
            addClass,
            deleteClass,
            updateClass,
            generateCode,
        };
    },

    methods: {
        showAddClassModal() {
            this.showAddModal = true;
        },
        closeAddClassModal() {
            this.showAddModal = false;
        },
        showDeleteClassModal() {
            this.showDeleteModal = true;
        },
        closeDeleteClassModal() {
            this.showDeleteModal = false;
        },
        showEditClassModal() {
            this.showEditModal = true;
        },
        closeEditClassModal() {
            this.showEditModal = false;
        }
    },
    mounted() {
        initClassesDashboard()
    }
};
</script>