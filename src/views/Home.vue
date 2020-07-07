<template>
  <div class="home">
    <Header />
    <v-container fluid>
      <h4>This is home page</h4>
    </v-container>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/parts/Header"
import Footer from "../components/parts/Footer"
export default {
  name: "Home",
  components: { Header, Footer },
  data() {
    return {
      //
    }
  },
}
</script>
