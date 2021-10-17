<script context="module">
  import { createUrqlClient } from '../lib/urql'
  export const load = ({ fetch, stuff }) => {
    const client = createUrqlClient({
      fetch,
      url: "https://trygql.formidable.dev/graphql/basic-pokedex"
    });

    return {
      stuff: {
        ...stuff,
        client
      },
      props: { client }
    };
  };
</script>

<script>
  import { setClient } from '@urql/svelte';

  export let client

  setClient(client);
</script>

<slot />