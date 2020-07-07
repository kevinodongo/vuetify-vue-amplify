<template>
  <div class="loginhelp">
    <v-sheet height="700" color="white">
      <v-row align="center" justify="center" style="height: 650px">
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
                    formState === "resetPassword"
                      ? "Reset Password"
                      : "Reset your Password"
                  }}
                </p>
                <!--error messages-->
                <v-alert outlined type="error" color="error" v-if="error" error>
                  {{ error }}
                </v-alert>
                <!--/end-->
                <!--get code to reset password-->
                <v-form
                  v-model="valid"
                  ref="form"
                  lazy-validation
                  v-if="formState === 'resetPassword'"
                >
                  <p class="font-weight-bold mb-4">
                    Enter your user account's username and we will send you a
                    password reset link to your verified email.
                  </p>

                  <label class="form__label" for="name">Email</label>
                  <v-text-field
                    class="mt-1"
                    dense
                    name="email"
                    single-line
                    outlined
                    background-color="white"
                    placeholder="Email"
                    label="Email"
                    v-model="email"
                    :rules="emailRules"
                    required
                  ></v-text-field>
                  <v-btn
                    @click="resetPassword"
                    block
                    large
                    dark
                    class="info"
                    :disabled="!valid"
                    ><span style="text-transform: capitalize"
                      >Send Code</span
                    ></v-btn
                  >
                  <div class="sign__in">
                    <p>
                      <router-link class="routerLink__label" to="/Login"
                        >Back to Sign in</router-link
                      >
                    </p>
                  </div>
                </v-form>

                <!--reset your password-->
                <v-form
                  v-model="valid"
                  ref="form"
                  lazy-validation
                  v-if="formState === 'resetYourPassword'"
                >
                  <label class="form__label" for="name">Email</label>
                  <v-text-field
                    dense
                    single-line
                    outlined
                    background-color="white"
                    class="mt-1"
                    name="email"
                    placeholder="Email"
                    v-model="email"
                    :rules="emailRules"
                    required
                  ></v-text-field>
                  <label class="form__label" for="code">Code</label>
                  <v-text-field
                    class="mt-1"
                    dense
                    name="code"
                    single-line
                    outlined
                    background-color="white"
                    placeholder="Code"
                    v-model="code"
                    required
                    :rules="codeRules"
                  ></v-text-field>
                  <label class="form__label" for="password">Password</label>
                  <v-text-field
                    class="mt-1"
                    dense
                    name="password"
                    outlined
                    single-line
                    type="password"
                    placeholder="Password"
                    v-model="new_password"
                    :rules="passwordRules"
                    required
                  ></v-text-field>
                  <v-btn
                    @click="resetYourPassword"
                    block
                    large
                    dark
                    class="info"
                    :disabled="!valid"
                    ><span style="text-transform: capitalize"
                      >confirm</span
                    ></v-btn
                  >
                  <p class="mt-2">
                    Lost your code?
                    <v-btn color="info" small text @click="resendCode"
                      >Resend</v-btn
                    >
                  </p>
                </v-form>
                <!--/ end form section-->
              </v-card-text>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
export default {
  name: "loginhelp",
  data() {
    return {
      formState: "resetPassword",
      valid: true,
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      new_password: "",
      passwordRules: [v => !!v || "Password is required"],
      code: "",
      codeRules: [v => !!v || "Code is required"],
      error: null,
      loading: false
    };
  },
  methods: {
    /*get code to reset password*/
    async resetPassword() {
      this.loading = false;
      if (this.$refs.form.validate()) {
        const username = this.email;
        await Auth.forgotPassword(username)
          .then(() => {
            this.loading = false;
          })
          .catch(Error => {
            if (Error) {
              this.error = Error.message;
              this.loading = false;
            }
          });
      }
      this.formState = "resetYourPassword";
    },
    /*reset your password*/
    async resetYourPassword() {
      if (this.$refs.form.validate()) {
        const username = this.email;
        const { code, new_password } = this;
        /* eslint-disable */
        await Auth.forgotPasswordSubmit(username, code, new_password);
        this.$router.push("/Auth/Login");
      }
    },
    /*resend code*/
    async resendCode() {
      if (this.$refs.form.validate()) {
        const username  = this.email
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
.sign__in {
  margin-left: 7px;
  margin-top: 25px;
}
.btn__text {
  text-transform: capitalize;
  color: white;
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

