<!-- Navbars.vue -->
<template>
    <div id="navbaradmin">
      
      <section id="sidebar" class="hide ">
        <a href="#" class="brand">
          <i class='bx bxl-firefox'></i>
          <span class="text">UREC</span>
        </a>
        
        <ul class="side-menu top ">
          <li class="active"><router-link to="/dashboardadmin" active-class="active" ><i class='bx bxs-dashboard'></i> Dashboard</router-link></li>
          <li><router-link to="#"><i class="bx bi bi-camera-reels-fill"></i> Grabaciones</router-link></li>
          <li><router-link to="#"><i class="bx bi bi-people-fill"></i> Usuarios</router-link></li>
          <li><router-link to="#"><i class="bx bi bi-gear-fill"></i> Ajustes</router-link></li>
          <li><router-link to="#"><i class="bx bi bi-journal-bookmark-fill"></i> Asignaturas</router-link></li>
          <li><router-link to="#" class="notification"><i class='bx bxs-bell' ></i>Notificaciones</router-link></li>
        </ul>
          <div class="dropmenu-profile">
            <div class="dropdown">
            <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="@/assets/img/ZUSI-LOGO.png" alt="" width="32" height="32" class="rounded-circle me-2">
              <strong>Zusi Admin</strong>
            </a>
            <ul class="dropdown-menu text-small shadow dropmenu-profile" aria-labelledby="dropdownUser2">
              <li><a class="dropdown-item" href="#">Settings</a></li>
              <li><a class="dropdown-item" href="#">Profile</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#" @click="handleLogout">Sign out</a></li>
            </ul>
          </div>
          </div>
          
      </section>

      <section id="devicecontent">
    <nav class="navbar fixed-bottom navbar-light bg-light">
      <div class="container-fluid">
        <ul class="nav nav-pills">
          <li class="nav-item">
            <router-link to="/dashboardadmin" active-class="active" class="nav-link">
              <i class='bx bxs-dashboard'></i>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="#" active-class="active" class="nav-link">
              <i class="bx bi bi-camera-reels-fill"></i>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="#" active-class="active" class="nav-link">
              <i class="bx bi bi-people-fill"></i>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="#" active-class="active" class="nav-link">
              <i class="bx bi bi-gear-fill"></i>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="#" active-class="active" class="nav-link">
              <i class="bx bi bi-journal-bookmark-fill"></i>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="#" active-class="active" class="nav-link notification">
              <i class='bx bxs-bell'></i>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </section>

      <section id="content">
        <nav class="fixed-top">
          <i class='bx bx-menu' style="cursor: pointer;"></i>
        </nav>
      

      </section>


    </div>
  </template>
  
  <script>
import firebase from 'firebase/app';
import 'firebase/auth';
import { useRouter } from 'vue-router';

import { initSidebar } from './navbar';
  export default {
      name: 'SideBar',
      
      methods: {
        handleLogout() {
            localStorage.removeItem('token'); 
            this.$router.push('/');
        }
      },

      mounted() {
        initSidebar()
      }
  }
  </script>
  
  <style src="./navbar.css"></style>
  