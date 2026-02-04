require("dotenv").config({ path: "../.env.local" });

const fs = require("fs");
const { createClient } = require("@libsql/client");

// DEBUG (temporal)
console.log("URL:", process.env.TURSO_DATABASE_URL);
console.log("TOKEN:", process.env.TURSO_AUTH_TOKEN);

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const data = JSON.parse(
  fs.readFileSync("./database/testimonials.json", "utf8")
);

function mapStatus(item) {
  if (item.is_reject === "rejected") return "rejected";
  if (item.is_approved) return "approved";
  return "pending";
}

async function migrate() {
  for (const t of data) {
    await db.execute({
      sql: `
        INSERT INTO testimonios (
          name,
          avatar,
          content,
          rating,
          role,
          service,
          status,
          rejection_reason,
          created_at,
          updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        t.name,
        t.avatar,
        t.content,
        t.rating,
        t.role,
        t.service,
        mapStatus(t),
        t.rejection_reason,
        t.created_at,
        t.updated_at,
      ],
    });
  }

  console.log("✅ Migración completada");
}

migrate().catch(console.error);
