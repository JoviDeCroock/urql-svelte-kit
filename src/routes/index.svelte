<script context="module" lang="ts">
  export async function load({ stuff: ctx }) {
		const query = `
      query ($skip: Int!) {
        pokemons(limit: 10, skip: $skip) {
          id
          name
        }
      }
		`

    const pokemonsResult = await ctx.client.query(
      query,
      { skip: 0 },
    ).toPromise()
    return {
      props: {
        pokemons: {
          ...pokemonsResult,
          subscribe: function() {
            return {
              unsubscribe: function() {}
            }
          }
        }
      },
    }
  }
</script>

<script>
  import { browser } from "$app/env";
  import { operationStore, query, gql } from "@urql/svelte";

  export let pokemons
  export let nextPage

  if (browser) {
    pokemons = operationStore(
      gql`
        query ($skip: Int!) {
          pokemons(limit: 10, skip: $skip) {
            id
            name
          }
        }
      `,
      { skip: 0 }
    );
    query(pokemons);
    nextPage = () => {
      $pokemons.variables = { skip: $pokemons.variables.skip + 10 };
    }
  } else {
  }
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div>
  {#if pokemons.fetching}
    Loading...
  {:else if pokemons.error}
    Oh no... {pokemons.error.message}
  {:else}
    <ul>
      {#each pokemons.data.pokemons as pokemon}
        <li>{pokemon.name}</li>
      {/each}
    </ul>
  {/if}
  <button on:click={nextPage}>Next Page</button>
</div>
