<script context="module" lang="ts">
  export async function load(ctx) {
		const query = `
      query ($skip: Int!) {
        pokemons(limit: 10, skip: $skip) {
          id
          name
        }
      }
		`
		
		console.log(ctx)
    return {
      props: {
        todos: await ctx.client.query(
          query,
          { skip: 0 },
        ),
      },
    }
  }
</script>

<script>
  import { query } from '@urql/svelte'
  /**
   * @type {import('./types').OperationStore<gql.GetTodosDocument, gql.GetTodos['viewer']['todos']>}
   */
  export let todos
  // Setup subscription for the lifetime of the component
  query(todos)
  
  // Data is normalized
  assert($todos.data.viewer.todos === $todos.data.todos)
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<!-- <div>
  {#if $pokemons.fetching}
    Loading...
  {:else if $pokemons.error}
    Oh no... {$pokemons.error.message}
  {:else}
    <ul>
      {#each $pokemons.data.pokemons as pokemon}
        <li>{pokemon.name}</li>
      {/each}
    </ul>
  {/if}
  <button on:click={nextPage}>Next Page</button>
</div> -->
