import {
  Server,
  ServerRequest,
  serve,
} from 'https://deno.land/std/http/server.ts';
import * as log from 'https://deno.land/std/log/mod.ts';

interface ApplicationConfiguration {
  port: number;
}

enum HTTPMethod {
  get = 'GET',
  post = 'POST',
}

type RequestHandler = (req: ServerRequest) => Promise<void>;
type RouteRecord = [HTTPMethod, RequestHandler];

export default class Application {
  private port: number;
  private server: Server;
  private routes: { [path: string]: RouteRecord };

  constructor(config: ApplicationConfiguration) {
    this.port = config.port;
    this.server = serve({ port: config.port });
    this.routes = {};
  }

  /** Start handling incoming requests */
  async start() {
    log.info(`Server listening on port ${this.port}`);

    for await (const request of this.server) {
      if (request.method === HTTPMethod.get) {
        // get all keys to find matching paths
        const keys = Object.keys(this.routes);
        const matches = keys.filter((path) => path === request.url);
        const handler = matches.filter((record) => record);
      }
      request.respond({ body: 'I am working' });
    }
  }

  /** Adds a route handler for a GET request to a path */
  get(path: string, handler: RequestHandler): void {
    this.routes[path] = [HTTPMethod.get, handler];
  }
}
