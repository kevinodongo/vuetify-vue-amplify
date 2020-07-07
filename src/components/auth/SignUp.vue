<template>
  <div class="signup">
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
                  <p class="font-weight-regular title">
                    {{
                      formState === "signUp"
                        ? "Create an account"
                        : "Confirm Sign Up"
                    }}
                  </p>
                  <!--error messages-->
                  <v-alert
                    type="error"
                    outlined
                    color="error"
                    v-if="error"
                    dense
                    >{{ error }}</v-alert
                  >
                  <!--/end-->
                  <!--sign up form-->
                  <v-form
                    v-model="valid"
                    ref="form"
                    lazy-validation
                    v-if="formState === 'signUp'"
                  >
                    <label class="form__label" for="email">E-mail</label>
                    <v-text-field
                      class="mt-1"
                      dense
                      name="email"
                      single-line
                      outlined
                      background-color="white"
                      placeholder="E-mail"
                      label="E-mail *"
                      v-model="email"
                      :rules="emailRules"
                      required
                    ></v-text-field>
                    <label class="form__label" for="password">Password</label>
                    <v-text-field
                      class="mt-1"
                      dense
                      name="password"
                      single-line
                      outlined
                      background-color="white"
                      placeholder="Password"
                      label="Password *"
                      type="password"
                      v-model="password"
                      :rules="passwordRules"
                      required
                    ></v-text-field>
                    <v-btn
                      @click="signUp"
                      block
                      large
                      class="white--text"
                      color="info"
                      :disabled="!valid"
                    >
                      <span class="btn__text">Create an account</span>
                    </v-btn>
                    <div class="mt-5">
                      <span class="mr-1">Have an account</span>
                      <router-link class="routerLink__label" to="/Login"
                        >Log In</router-link
                      >
                    </div>
                  </v-form>
                  <!--confirm signup-->
                  <v-form
                    v-model="valid"
                    ref="form"
                    lazy-validation
                    v-if="formState === 'confirmSignUp'"
                  >
                    <v-text-field
                      class="mt-1"
                      dense
                      name="code"
                      single-line
                      outlined
                      background-color="white"
                      placeholder="Confirmation Code"
                      v-model="code"
                    ></v-text-field>
                    <v-btn
                      @click="confirmSignUp"
                      block
                      class="info"
                      dark
                      large
                      :disabled="!valid"
                      >confirm</v-btn
                    >
                    <p class="mt-3">
                      Lost your code?
                      <v-btn
                        color="info"
                        class="ml-1"
                        dark
                        small
                        text
                        @click="resendCode"
                      >
                        <span
                          class="font-weight-light"
                          style="text-transform: capitalize"
                          >Resend</span
                        >
                      </v-btn>
                    </p>
                  </v-form>
                  <!--/ end form section-->
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
  name: "signup",
  data() {
    return {
      formState: "signUp",
      valid: true,
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      password: "",
      passwordRules: [v => !!v || "Password is required"],
      code: "",
      error: null,
      loading: false
    };
  },
  methods: {
    /*sign up function*/
    async signUp() {
      if (this.$refs.form.validate()) {
        // timeout
        this.loading = true;
        const { email, password } = this;
        const username = email;
        await Auth.signUp({
          username,
          password
        })
          .then(() => {
            this.formState = "confirmSignUp";
            this.loading = false;
          })
          .catch(Error => {
            if (Error) {
              this.error = Error.message;
              this.loading = false;
            }
          });
      }
    },
    /*confirm sign up function*/
    async confirmSignUp() {
      if (this.$refs.form.validate()) {
        // timeout
        this.loading = true;
        const code = this.code;
        const username = this.email;
        await Auth.confirmSignUp(username, code)
          .then(() => {
            this.$router.push({ name: "Login" });
            this.loading = false;
          })
          .catch(Error => {
            if (Error) {
              this.error = Error.message;
              this.loading = false;
            }
          });
      }
    },
    /*resend code*/
    async resendCode() {
      if (this.$refs.form.validate()) {
        const username = this.email;
        await Auth.resendSignUp(username);
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>

<style>
.btn__text {
  text-transform: capitalize;
  color: white;
}

.form__label {
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 5px;
}
.routerLink__label {
  font-family: "Montserrat", sans-serif;
  font-size: 13px;
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
