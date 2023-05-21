<template>
    <div>
      <h1>My App</h1>
      <DailyBoxoffice />
      <WeeklyBoxoffice/>
    </div>
  </template>
  
  <script>
  import DailyBoxoffice from '@/components/DailyBoxoffice.vue';
  import WeeklyBoxoffice from '@/components/WeeklyBoxoffice.vue';
  
  export default {
    components: {
      DailyBoxoffice,
      WeeklyBoxoffice
    }
  };
  </script>
  
  <style>
  /* Add your custom styles here */
  </style>
  