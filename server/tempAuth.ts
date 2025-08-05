import type { Express, RequestHandler } from "express";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { storage } from "./storage";

// Temporary simple authentication for testing
export function setupTempAuth(app: Express) {  
  // Setup session store based on environment
  let sessionStore;
  const isProduction = process.env.NODE_ENV === "production";
  
  if (isProduction && process.env.DATABASE_URL) {
    // Use PostgreSQL session store for production
    const pgStore = connectPg(session);
    sessionStore = new pgStore({
      conString: process.env.DATABASE_URL,
      createTableIfMissing: true, // Allow creation for deployment
      ttl: 7 * 24 * 60 * 60, // 7 days in seconds
      tableName: "sessions",
    });
    console.log("🔒 Using PostgreSQL session store for production");
  } else {
    // Use default MemoryStore for development
    console.log("🔒 Using MemoryStore for development (not suitable for production)");
  }

  // Setup session with appropriate store
  app.use(session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET || 'temp-secret-key-dev-only',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Disable secure for now to ensure deployment works
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: 'lax', // Add sameSite for better compatibility
    },
  }));
  // Simple login route that creates a test user (for development)
  app.get("/api/temp-login", async (req, res) => {
    try {
      // Create or get a test user
      const testUserId = "test-user-123";
      let user = await storage.getUser(testUserId);
      
      if (!user) {
        // User might already exist with different ID, try to find by email first
        user = await storage.getUserByEmail("admin@gweru.gov.zw");
        
        if (!user) {
          // Only create if doesn't exist at all
          try {
            await storage.upsertUser({
              id: testUserId,
              email: "admin@gweru.gov.zw",
              firstName: "System",
              lastName: "Administrator", 
              department: "town-clerk",
              role: "admin",
              isActive: true,
            });
            user = await storage.getUser(testUserId);
          } catch (error) {
            console.error("Error creating user, trying to get existing:", error);
            user = await storage.getUserByEmail("admin@gweru.gov.zw");
          }
        }
      }
      
      // Set user in session and save
      (req as any).session.userId = user ? user.id : testUserId;
      (req as any).session.save((err: any) => {
        if (err) {
          console.error("Session save error in temp-login:", err);
          return res.status(500).json({ message: "Session save failed" });
        }
        res.redirect("/");
      });
    } catch (error) {
      console.error("Error in temp login:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Login with username and password
  app.post("/api/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Default admin credentials for deployment
      if (email === "admin@gweru.gov.zw" && password === "GweruAdmin2025!") {
        // First try the seeded admin user ID
        let user = await storage.getUser("admin-deploy-001");
        
        // If not found, try the temp login user ID as fallback
        if (!user) {
          user = await storage.getUser("test-user-123");
        }
        
        if (user && user.email === email) {
          // Set user in session and save
          (req as any).session.userId = user.id;
          (req as any).session.save((err: any) => {
            if (err) {
              console.error("Session save error:", err);
              return res.status(500).json({ success: false, message: "Session save failed" });
            }
            res.json({ success: true, message: "Login successful" });
          });
        } else {
          res.status(401).json({ success: false, message: "Admin user not found. Please ensure the system is properly seeded." });
        }
      } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Error in login:", error);
      res.status(500).json({ success: false, message: "Login failed" });
    }
  });

  // Logout route
  app.post("/api/logout", (req, res) => {
    (req as any).session.destroy((err: any) => {
      if (err) {
        console.error("Session destroy error:", err);
        return res.status(500).json({ success: false, message: "Logout failed" });
      }
      res.clearCookie('connect.sid'); // Clear session cookie
      res.json({ success: true, message: "Logout successful" });
    });
  });

  // Auth user endpoint
  app.get('/api/auth/user', async (req, res) => {
    try {
      const userId = (req as any).session?.userId;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Logout
  app.get("/api/logout", (req, res) => {
    (req as any).session.destroy();
    res.redirect("/");
  });
}

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  const userId = (req as any).session?.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  const user = await storage.getUser(userId);
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  
  // Set user for route handlers
  (req as any).user = user;
  next();
};