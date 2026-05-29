export interface Env {
  users_db: D1Database;
  JWT_SECRET: string;
}

import jwt from "jsonwebtoken";

type RegisterBody = {
  usuario: string;
  email: string;
  pass: string;
};

type LoginBody = {
  email: string;
  pass: string;
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

    // 🧪 health
    if (url.pathname === "/") {
      return new Response("Auth API running 🚀");
    }

    // 🟢 REGISTER
    if (url.pathname === "/register" && method === "POST") {
      const body = await request.json() as RegisterBody;

      if (!body.usuario || !body.email || !body.pass) {
        return new Response("Missing fields", { status: 400 });
      }

      const exists = await env.users_db
        .prepare("SELECT id FROM users WHERE email = ?")
        .bind(body.email)
        .first();

      if (exists) {
        return new Response("User already exists", { status: 409 });
      }

      const hashed = await hashPassword(body.pass);

      await env.users_db
        .prepare(
          "INSERT INTO users (usuario, email, pass) VALUES (?, ?, ?)"
        )
        .bind(body.usuario, body.email, hashed)
        .run();

      return new Response("User created", { status: 201 });
    }

    // 🔓 LOGIN
if (url.pathname === "/login" && method === "POST") {
  const body = await request.json() as LoginBody;

  const hashed = await hashPassword(body.pass);

  const user = await env.users_db
    .prepare("SELECT * FROM users WHERE email = ? AND pass = ?")
    .bind(body.email, hashed)
    .first();

  if (!user) {
    return new Response("Invalid credentials", { status: 401 });
  }

  const token = jwt.sign(
    {
      id: user.id,
      usuario: user.usuario,
      email: user.email
    },
    env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return Response.json({
    message: "Login success",
    token,
    user
  });
}

    // 📋 USERS (debug)
    if (url.pathname === "/users" && method === "GET") {
      const auth = request.headers.get("Authorization");

      if (!auth) {
        return new Response("No token", { status: 401 });
      }

      const token = auth.replace("Bearer ", "");

      const user = await verifyToken(token, env.JWT_SECRET);

      if (!user) {
        return new Response("Invalid token", { status: 403 });
      }

      const result = await env.users_db
        .prepare("SELECT id, usuario, email FROM users")
        .all();

      return Response.json(result.results);
    }

    return new Response("Not found", { status: 404 });

    async function createToken(user: any, secret: string) {
    const payload = {
      id: user.id,
      email: user.email,
      usuario: user.usuario,
      exp: Date.now() + 1000 * 60 * 60 * 24 // 1 día
    };

    const encoded = btoa(JSON.stringify(payload));

    const signature = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(encoded + secret)
    );

    const sig = [...new Uint8Array(signature)]
      .map(b => b.toString(16))
      .join("");

    return `${encoded}.${sig}`;
  }

  async function verifyToken(token: string, secret: string) {
    const [payload, sig] = token.split(".");

    const check = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(payload + secret)
    );

    const expectedSig = [...new Uint8Array(check)]
      .map(b => b.toString(16))
      .join("");

    if (expectedSig !== sig) return null;

    const data = JSON.parse(atob(payload));

    if (data.exp < Date.now()) return null;

    return data;
  }


  }
};