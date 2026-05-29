declare module "cloudflare:test" {
	interface ProvidedEnv extends Env {}
}
export interface Env {
  users_db: D1Database;
}
