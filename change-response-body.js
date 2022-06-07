/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

/**
 * Example someHost at URL is set up to respond with HTML
 * Replace URL with the host you wish to send requests to
 */
const someHost = 'https://www.allas.se/';
const url = someHost + '/news-sitemap.xml';

/**
 * gatherResponse awaits and returns a response body as a string.
 * Use await gatherResponse(..) in an async function to get the response body
 * @param {Response} response
 */
async function gatherResponse(response) {
  const { headers } = response;
  const contentType = headers.get('content-type') || '';
  if (contentType.includes('application/xml')) {
    console.log('gatherResponse');
    return response.text();
  }
}

async function handleRequest() {
  const init = {
    headers: {
      'content-type': 'application/xml;charset=UTF-8',
    },
  };
  const response = await fetch(url, init);
  const results = await gatherResponse(response);
  return new Response(results, init);
}

addEventListener('fetch', event => {
  return event.respondWith(handleRequest());
});