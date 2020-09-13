export const ServerURI = window.location
  .toString()
  .includes("http://localhost:3000")
  ? "http://localhost:5000"
  : "http://192.168.1.7:5000";
