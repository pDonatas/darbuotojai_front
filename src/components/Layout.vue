<template>
  <div>
    <Loader v-if="loading" />
    <div v-else>
      <Navigation v-if="parameters.nav"></Navigation>
      <Header v-if="parameters.head"></Header>
      <IconsSection v-if="parameters.icons"></IconsSection>
      <MainSection v-if="parameters.main">
        <slot></slot>
        <slot name="subcontent"></slot>
      </MainSection>
      <TestimonialsSection v-if="parameters.testimonials"></TestimonialsSection>
      <Footer v-if="parameters.footer"></Footer>
    </div>
  </div>
</template>

<script>
import Navigation from "./Navigation";
import Header from "./Header";
import IconsSection from "./IconsSection";
import MainSection from "./MainSection";
import TestimonialsSection from "./TestimonialsSection";
import CallToActionSection from "./CallToActionSection";
import Footer from "./Footer";
import {mapState} from "vuex";
import Loader from "./Loader";


export default {
  name: 'Layout',
  components: {
    Loader,
    Navigation,
    Header,
    IconsSection,
    MainSection,
    TestimonialsSection,
    CallToActionSection,
    Footer
  },
  props: {
    parameters: {
      nav: true,
      head: true,
      icons: true,
      main: true,
      testimonials: true,
      callToAction: true,
      footer: true
    }
  },
  mounted() {
  },
  computed: {
    ...mapState('loader', ['loading'])
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
