const isLocalEnvironment = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

window.API_BASE_URL = window.API_BASE_URL || (
    isLocalEnvironment
        ? "http://localhost:5000/api/contact"
        : "https://my-portfolio-backend-5u2n.onrender.com/api/contact"
);