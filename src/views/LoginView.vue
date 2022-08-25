<template>
  <div class="login">
    <div>
      <form @submit.prevent="submit">
        <div class="form-group row">
          <div class="col-sm-2 m-auto">
            <label for="email">Email:</label>
          </div>
          <div class="col-sm-10">
            <input type="text" name="email" v-model="form.email" />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-2 m-auto">
            <label for="password">Password:</label>
          </div>
          <div class="col-sm-10">
            <input type="password" name="password" v-model="form.password" />
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
      <p v-if="showError" id="error">Email or Password is incorrect</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "LoginView",
  components: {},
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      showError: false,
    };
  },
  methods: {
    ...mapActions(["LogIn"]),
    async submit() {
      const User = new FormData();
      User.append("email", this.form.email);
      User.append("password", this.form.password);
      try {
        await this.LogIn(User);
        this.$router.push("/networking");
        this.showError = false;
      } catch (error) {
        this.showError = true;
      }

    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
button[type="submit"] {
  background: #ff6700;
  border-radius: 10px;
  border-color: unset;
  font-weight: 900;
  width: 30%;
  padding: 12px 0px;
}
button[type="submit"]:hover {
  background-color: #45a049;
}
input {
  width: 60%;
  text-align: center;
  border-color: #ffffff00;
  box-shadow: -6px 6px 10px rgba(255, 103, 0, 0.3),
    6px -6px 10px rgba(231, 190, 163, 0.3);
  border-radius: 10px;
  padding: 12px 0px;
}
#error {
  color: red;
}
@media (max-width: 760px) {
  button[type="submit"],
  input {
    width: 100%;
  }
}
</style>
