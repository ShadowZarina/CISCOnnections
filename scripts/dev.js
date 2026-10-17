import page from "../index.html";

const server = Bun.serve({
  hostname: "127.0.0.1",
  port: 3000,
  routes: { "/": page },
  development: { hmr: true, console: true },
});

console.log(`Canvas prototype: ${server.url}`);
console.log("Open this address in your browser. Keep this terminal running; Ctrl+C stops the server.");
