<template>
  <ApolloQuery :query="profileQuery" :variables="{ userId }">
    <template slot-scope="{ result: { loading, data, error } }">
      <template v-if="loading">Loading...</template>
      <template v-else-if="error">
        <Error><h2>{{ error.message }}</h2>
          <pre>{{ error }}</pre>
          <p>An error occured while trying to go to {{ userId }}: </p></Error>
        </template>
      <template v-else-if="data">
        <Profile v-bind="data.profiles[0]"></Profile>
      </template>
      <template v-else>No result :(</template>
    </template>
  </ApolloQuery>
</template>

<script>
import Profile from '@/components/Profile.vue';
import Error from '@/components/Error.vue';
import { PROFILE_QUERY } from '@/queries/profile';

export default {
  name: 'PageProfile',
  components: {
    Profile,
    Error,
  },
  data() {
    return {
      userId: this.$route.params.userId,
      profileQuery: PROFILE_QUERY,
    };
  },
};
</script>
