import startServer from "./config/server.js";
import startMongo from "./config/connect-db.js";

// Inizializar la app
const initializeApplication = async () => {
    try {
      await startMongo(); 
      await startServer(); 
    } catch (error) {
      console.error("Application initialization failed:", error); 
      process.exit(1);
    }
  };
  
  initializeApplication();