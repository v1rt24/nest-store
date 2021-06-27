<template>
  <h4>Регистрация</h4>
  <div class="row">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input id="email" type="email">
          <label for="email">Почта</label>
        </div>
        <div class="input-field col s12">
          <input id="password" type="password">
          <label for="password">Пароль</label>
        </div>

        <button class="btn waves-effect waves-light" type="submit" name="action">Регистрация</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Register',
};
</script>

<style scoped>

</style>