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

addEventListener('fetch', event => {
  event.respondWith(fetchAndStream(event.request));
});



async function fetchAndStream(url) {
  // Fetch from origin server.
  let response = await fetch(url);

  // Create an identity TransformStream (a.k.a. a pipe).
  // The readable side will become our new response body.
  let { readable, writable } = new TransformStream();
  //let reader = readable.getReader({ mode: 'byob' });
  console.log('response.body');

  // Start pumping the body. NOTE: bNo await!
  response.body.pipeTo(writable);

  // ... and deliver our Response while that’s running.
  return new Response(readable, response);
}