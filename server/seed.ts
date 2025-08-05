import { storage } from "./storage";

// Default admin user for deployment
const DEFAULT_ADMIN = {
  id: "admin-deploy-001",
  email: "admin@gweru.gov.zw",
  firstName: "System",
  lastName: "Administrator",
  department: "town-clerk",
  role: "admin",
  isActive: true,
};

// Default admin credentials (for display only)
export const DEPLOYMENT_ADMIN_CREDENTIALS = {
  email: "admin@gweru.gov.zw",
  password: "GweruAdmin2025!",
  loginUrl: "/temp-login",
  note: "Use the temp login endpoint to access the system as this admin user"
};

export async function seedDefaultAdmin() {
  try {
    console.log("🌱 Seeding default admin user for deployment...");
    
    // Check if admin user already exists
    const existingAdmin = await storage.getUser(DEFAULT_ADMIN.id);
    
    if (!existingAdmin) {
      // Create the default admin user
      await storage.upsertUser(DEFAULT_ADMIN);
      console.log("✅ Default admin user created successfully");
      console.log("📧 Email:", DEPLOYMENT_ADMIN_CREDENTIALS.email);
      console.log("🔗 Access via:", DEPLOYMENT_ADMIN_CREDENTIALS.loginUrl);
    } else {
      console.log("ℹ️  Default admin user already exists");
    }
    
    return DEPLOYMENT_ADMIN_CREDENTIALS;
  } catch (error) {
    console.error("❌ Error seeding default admin:", error);
    
    // Check if error is due to constraint violation (user already exists)
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('duplicate key') || errorMessage.includes('unique constraint') || errorMessage.includes('already exists')) {
      console.log("ℹ️  Admin user likely already exists (constraint violation), continuing...");
      return DEPLOYMENT_ADMIN_CREDENTIALS;
    }
    
    // For other errors, log but don't crash the application
    console.error("⚠️  Non-critical seeding error, application will continue without default admin");
    return DEPLOYMENT_ADMIN_CREDENTIALS;
  }
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDefaultAdmin()
    .then(() => {
      console.log("🎉 Seeding completed successfully");
      // Only exit if running as standalone script, not when imported
      if (process.argv[1]?.includes('seed.ts') || process.argv[1]?.includes('seed.js')) {
        process.exit(0);
      }
    })
    .catch((error) => {
      console.error("💥 Seeding failed:", error);
      // Only exit if running as standalone script, not when imported
      if (process.argv[1]?.includes('seed.ts') || process.argv[1]?.includes('seed.js')) {
        process.exit(1);
      }
    });
}