<template>
  <div :class="{ 'sidebar': isMain, 'sidebar-visible': isMain && sidebarVisible, 'add-subnet-sidebar': !isMain, 'add-subnet-sidebar-visible': !isMain && sidebarVisible }">
    <div :class="{ 'sidebar-content': isMain, 'add-subnet-sidebar-content': !isMain }">
      <slot></slot>
      <cButton class="btn-x" @click="closeSidebar">
        <i class="x-icon fa fa-close fa-lg"></i>
      </cButton>
    </div>
  </div>
</template>

<script>
import cButton from './Button'
export default {
  name: "Sidebar",
  components: {
    cButton
  },
  props: {
      sidebarVisible: {
          type: Boolean,
          default: false
      },
      type: {
          type: String,
          default: 'main' // main or sub
      }
  },
  computed: {
      isMain() {
          return this.type === 'main'
      }
  },
  methods: {
    closeSidebar() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.theme-dark .sidebar, .theme-dark .add-subnet-sidebar {
background-color: #27292e !important;
/* Dark theme background color */
color: #fff !important;
}
.sidebar {
position: fixed;
top: 0;
right: 0;
width: 0;
height: 100%;
background-color: #fff;
/* Set a default background color */
overflow-x: hidden;
transition: 0.5s;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
z-index: 11;
/* Adjust the duration of the animation */
}

.sidebar-content {
padding: 20px;
margin-top: 60px;
}

.sidebar-visible {
width: 65%;
/* Adjust the width of the sidebar */
}

.dark-theme .sidebar {
background-color: #333;
/* Dark theme background color */
color: #fff;
/* Dark theme text color */
}

/* Styles for the second sidebar */
.add-subnet-sidebar {
position: fixed;
top: 0;
right: -40%;
/* Initially off-screen */
width: 40%;
height: 100%;
background-color: #fff;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
transition: right 0.3s ease-out;
z-index: 11;
}

/* Make the second sidebar visible */
.add-subnet-sidebar.add-subnet-sidebar-visible {
right: 0;
}

/* Your existing styles for the second sidebar content */
.add-subnet-sidebar-content {
/* ... */
margin-top: 60px;
display: grid;
grid-template-columns: repeat(1, 1fr);
padding: 20px 10px 10px 10px;
/* Add top and bottom padding */
}
</style>