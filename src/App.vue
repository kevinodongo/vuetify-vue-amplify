<template>
  <v-app>
    <!--Button Scroll Up-->
    <v-dialog v-model="dialog" width="400" transition="dialog-transition">
      <v-card>
        <v-toolbar dense flat>
          <v-btn icon @click="dark = !dark"
            ><v-icon color="black">mdi-checkbox-blank-circle</v-icon></v-btn
          >
          <div>Dark Mode</div>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
        </v-toolbar>
        <v-card-title class="font-weight-light">
          Translate websites
        </v-card-title>
        <v-card-text>
          <div>
            <span class="font-weight-bold">1.</span> On your computer, go to
            <a class="link" target="blank" href="https://translate.google.com/"
              >Google Translate
              <v-icon small color="primary">mdi-open-in-new</v-icon></a
            >.
          </div>
          <div class="mt-1">
            <span class="font-weight-bold">2.</span> In the text box, enter a
            URL.
          </div>
          <div class="mt-1">
            <span class="font-weight-bold">3.</span> To choose the language you
            want to translate to, at the top right, click the Down arrow
            <v-icon small="">mdi-chevron-down</v-icon>
          </div>
          <div class="mt-1">
            <span class="font-weight-bold">4.</span> On the right, click the URL
            that appears. The URL will open a new tab and the website will be
            translated.
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-btn
      id="myBtn"
      onclick="document.body.scrollTop=0;document.documentElement.scrollTop=0;event.preventDefault()"
      x-small
      height="40"
      color="orange"
    >
      <v-icon class="white--text">mdi-chevron-up</v-icon>
    </v-btn>
    <v-main>
      <v-sheet :dark="dark">
        <v-sheet id="btn">
          <span class="custom-btn">
            <v-btn @click="dialog = !dialog" icon
              ><v-icon light class="btn">mdi-cog-outline</v-icon></v-btn
            >
          </span>
        </v-sheet>
        <router-view></router-view>
      </v-sheet>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      dark: false,
      dialog: false
    };
  }
};
</script>

<style lang="css">
.link {
  text-decoration: none;
}
#btn {
  position: fixed;
  top: 50%;
  right: 5px;
  z-index: 99;
}
#myBtn {
  display: none;
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 99;
}
.custom-btn {
  animation: btn 1s infinite;
  display: flex;
}
@-moz-keyframes btn {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes btn {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes btn {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes btn {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
