<template>
  <button @click="buttonClicked()">Click Button</button>
  <ul>
    <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
  </ul>
</template>

<script>
import UserItem from './UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users'],
  methods: {
    buttonClicked(){
      //do.....
      this.$router.push('/teams');
      // this.$router.forward()
    }
  },
  beforeRouteEnter(to, from, next){
    console.log('UsersList Cmp beforeRouteEnter');
    console.log(to, from);
    next();
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>