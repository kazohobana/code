import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { seedDefaultAdmin } from "./seed";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Add health check endpoints that work in both dev and production
  app.get('/health', (req, res) => {
    res.status(200).json({ 
      status: 'healthy',
      service: 'gweru-municipal-erp',
      message: 'Gweru Municipal ERP System is running',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
  });
  
  // Additional health endpoint for deployment health checks
  app.head('/health', (req, res) => {
    res.status(200).end();
  });

  // Seed default admin user for deployment (with error handling)
  // Run seeding in background without blocking application startup
  if (process.env.NODE_ENV === "production" || process.env.SEED_ADMIN === "true") {
    // Use setImmediate to run seeding after server starts
    setImmediate(async () => {
      try {
        await seedDefaultAdmin();
        log("✅ Default admin user seeded successfully");
      } catch (error) {
        log("⚠️  Warning: Failed to seed default admin user, but application will continue");
        console.error(error);
        // Don't exit the process - let the application continue running
      }
    });
  }
  
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
