<template>
  <div class="about">
    <Header />
    <v-container fluid>
      <h4>This is about page</h4>
    </v-container>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/parts/Header"
import Footer from "../components/parts/Footer"
export default {
  name: "About",
  components: { Header, Footer },
  data() {
    return {
      //
    }
  },
}
</script>
