<template>
  <div class="header">
    <v-app-bar color="info" dark>
      <div class="headline">Application</div>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text to="/" class="d-none d-md-flex">
          <span style="text-transform: capitalize">Home</span>
        </v-btn>
        <v-btn text to="/about" class="d-none d-md-flex">
          <span style="text-transform: capitalize">About</span>
        </v-btn>
        <v-btn text to="/login" class="d-none d-md-flex">
          <span style="text-transform: capitalize">Login</span>
        </v-btn>
        <v-btn text to="/signup" class="d-none d-md-flex">
          <span style="text-transform: capitalize">Sign Up</span>
        </v-btn>
        <v-btn text to="/contact" class="d-none d-md-flex">
          <span style="text-transform: capitalize">Contact</span>
        </v-btn>
      </v-toolbar-items>
      <v-btn icon class="d-flex d-md-none"
        ><v-icon>mdi-view-headline</v-icon></v-btn
      >
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      //
    };
  }
};
</script>
