<template>
  <div class="login">
    <v-sheet height="700" color="white">
      <v-container fluid class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="12">
            <div v-if="loading" class="text-center">
              <div class="spinner">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
              </div>
            </div>
            <div v-else>
              <v-card class="mx-auto ma-4 pa-4" max-width="350">
                <v-card-text>
                  <p class="title font-weight-regular">
                    Sign in
                  </p>
                  <!--error messages-->
                  <v-alert
                    outlined
                    type="error"
                    color="error"
                    v-if="error"
                    error
                  >
                    {{ error }}
                  </v-alert>
                  <!--/end-->
                  <!--form section-->
                  <v-form v-model="valid" ref="form" lazy-validation>
                    <label class="form__label" for="name">Email</label>
                    <v-text-field
                      class="mt-1"
                      outlined
                      single-line
                      dense
                      background-color="white"
                      placeholder="Email"
                      v-model="email"
                      :rules="emailRules"
                      required
                    ></v-text-field>
                    <label class="form__label mt-3" for="password"
                      >Password</label
                    >
                    <v-text-field
                      class="mt-1"
                      outlined
                      single-line
                      dense
                      background-color="white"
                      placeholder="Password"
                      type="password"
                      label="Password *"
                      v-model="password"
                      :rules="passwordRules"
                      required
                    ></v-text-field>
                    <v-btn
                      class="mb-3"
                      block
                      color="info"
                      @click="submit"
                      large
                      :disabled="!valid"
                    >
                      <span class="btn__text">sign in</span>
                    </v-btn>
                    <router-link class="routerLink__label" to="/loginhelp"
                      >Forgot Password</router-link
                    >
                  </v-form>
                  <!--/ end-->
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
export default {
  name: "login",
  data() {
    return {
      valid: true,
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      password: "",
      passwordRules: [v => !!v || "Password is required"],
      user: {},
      error: null,
      loading: false
    };
  },
  methods: {
    // login function
    async submit() {
      this.loading = true;
      if (this.$refs.form.validate()) {
        const { email, password } = this;
        const username = email;
        this.$refs.form.reset();
        await Auth.signIn(username, password)
          .then(() => {
            setTimeout(() => {
              this.loading = false;
              this.$router.push({ name: "Dashboard" });
            }, 3000);
          })
          .catch(Error => {
            if (Error) {
              this.error = Error.message;
              this.loading = false;
            }
          });
      }
    }
  }
};
</script>

<style>
.btn__text {
  text-transform: capitalize;
}

.form__label {
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: bold;
}
.routerLink__label {
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: bold;
  text-decoration: none;
}

.spinner {
  margin: 100px auto 0;
  width: 70px;
  text-align: center;
}

.spinner > div {
  width: 18px;
  height: 18px;
  background-color: #333;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
