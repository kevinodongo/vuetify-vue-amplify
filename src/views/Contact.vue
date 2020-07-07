<template>
  <div class="contact">
    <Header />
    <v-container fluid>
      <h4>This is contact page</h4>
    </v-container>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/parts/Header"
import Footer from "../components/parts/Footer"
export default {
  name: "Contact",
  components: { Header, Footer },
  data() {
    return {
      //
    }
  },
}
</script>
