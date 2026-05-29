export interface Env {
  users_db: D1Database;
  JWT_SECRET: string;
}

type RegisterBody = {
  usuario: string;
  email: string;
  pass: string;
};

type LoginBody = {
  email: string;
  pass: string;
};

// 🌐 CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

// 🔐 HASH PASSWORD
async function hashPassword(password: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  return [...new Uint8Array(hashBuffer)]
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    const method = request.method;

    // ✅ PREFLIGHT CORS
    if (method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders
      });
    }

    // 🧪 HEALTH
    if (url.pathname === "/") {
      return new Response("Auth API running 🚀", {
        headers: corsHeaders
      });
    }

    // 🟢 REGISTER
    if (url.pathname === "/register" && method === "POST") {
      try {
        const body = await request.json() as RegisterBody;

        if (!body.usuario || !body.email || !body.pass) {
          return new Response("Missing fields", {
            status: 400,
            headers: corsHeaders
          });
        }

        const exists = await env.users_db
          .prepare("SELECT id FROM users WHERE email = ?")
          .bind(body.email)
          .first();

        if (exists) {
          return new Response("User already exists", {
            status: 409,
            headers: corsHeaders
          });
        }

        const hashed = await hashPassword(body.pass);

        await env.users_db
          .prepare(
            "INSERT INTO users (usuario, email, pass) VALUES (?, ?, ?)"
          )
          .bind(body.usuario, body.email, hashed)
          .run();

        return new Response("User created", {
          status: 201,
          headers: corsHeaders
        });

      } catch {
        return new Response("Server error", {
          status: 500,
          headers: corsHeaders
        });
      }
    }

    // 🔓 LOGIN
    if (url.pathname === "/login" && method === "POST") {
      try {
        const body = await request.json() as LoginBody;

        if (!body.email || !body.pass) {
          return new Response("Missing fields", {
            status: 400,
            headers: corsHeaders
          });
        }

        const hashed = await hashPassword(body.pass);

        const user = await env.users_db
          .prepare("SELECT * FROM users WHERE email = ? AND pass = ?")
          .bind(body.email, hashed)
          .first<any>();

        if (!user) {
          return new Response("Invalid credentials", {
            status: 401,
            headers: corsHeaders
          });
        }

        const token = crypto.randomUUID();

        return Response.json(
          {
            message: "Login success",
            token,
            user: {
              id: user.id,
              usuario: user.usuario,
              email: user.email
            }
          },
          {
            headers: corsHeaders
          }
        );

      } catch {
        return new Response("Server error", {
          status: 500,
          headers: corsHeaders
        });
      }
    }

    // 📋 USERS
    if (url.pathname === "/users" && method === "GET") {
      const result = await env.users_db
        .prepare("SELECT id, usuario, email FROM users")
        .all();

      return Response.json(result.results, {
        headers: corsHeaders
      });
    }

    return new Response("Not found", {
      status: 404,
      headers: corsHeaders
    });
  }
};