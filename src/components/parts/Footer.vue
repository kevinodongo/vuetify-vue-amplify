<template>
  <div class="footer">
    <v-footer padless absolute>
      <v-card class="flex" tile color="grey lighten-2">
        <v-container fluid>
          <div class="font-weight-regular">
            Copyright &copy; {{ new Date().getFullYear() }} —
            <strong>Application</strong>
          </div>
        </v-container>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: "footer",
  data() {
    return {
      //
    };
  }
};
</script>
