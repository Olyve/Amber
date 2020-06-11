import Application from './mod.ts';
import { ServerRequest } from 'https://deno.land/std/http/server.ts';

const app = new Application({ port: 8000 });

app.get('/test', (req: ServerRequest) => {
  return req.respond({ body: 'GET handler worked!' });
});

app.start();
