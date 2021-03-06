import Vue from 'vue';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = true;

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
});

const apolloProvider = new VueApollo({
  defaultClient: client,
});

Vue.use(VueApollo);

new Vue({
  router,
  provide: apolloProvider.provide(),
  render: h => h(App),
}).$mount('#app');
