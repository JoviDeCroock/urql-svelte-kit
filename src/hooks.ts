import cookie from 'cookie';
import { v4 as uuid } from '@lukeed/uuid';
import type { Handle } from '@sveltejs/kit';
import { ssr } from '$lib/urql';

export const handle: Handle = async ({ request, resolve }) => {
	// TODO https://github.com/sveltejs/kit/issues/1046
	if (request.query.has('_method')) {
		request.method = request.query.get('_method').toUpperCase();
	}

	const response = await resolve(request);

	const ssrData = ssr.extractData()
	response.body = response.body.toString().replace('<script id="__urql_data__">%urql.data%</script>', `<script id="__urql_data__">${JSON.stringify(ssrData)}</script>`)

	return response;
};
