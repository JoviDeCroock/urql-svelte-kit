import { browser } from '$app/env';
import { createClient, dedupExchange, ssrExchange, cacheExchange, fetchExchange, debugExchange } from '@urql/core'

export let ssr;

export function createUrqlClient(opts) {
  if (browser) {
    const initialData = document.getElementById('__urql_data__').innerText
    console.log('got initial data from server', JSON.parse(initialData))
    ssr = ssrExchange({
      isClient: true,
      initialState: JSON.parse(initialData)
    })
    return createClient({
      ...opts,
      exchanges: [
        dedupExchange,
        cacheExchange,
        ssr,
        fetchExchange,
      ]
    })
  } else {
    ssr = ssrExchange({
      isClient: false
    })
    return createClient({
      ...opts,
      exchanges: [
        dedupExchange,
        cacheExchange,
        ssr,
        fetchExchange,
      ]
    })
  }

}
