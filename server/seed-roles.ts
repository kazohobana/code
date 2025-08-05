import { db } from "./db";
import { systemRoles, roleModuleAssignments, systemModules } from "../shared/schema";
import { eq } from "drizzle-orm";

// Default roles that match the existing system structure
const defaultRoles = [
  {
    roleName: "super-admin",
    displayName: "Super Administrator", 
    description: "Full system access with all administrative privileges",
    isActive: true,
    isSystemRole: true,
    permissions: ["*"],
    createdBy: "system"
  },
  {
    roleName: "town-clerk",
    displayName: "Town Clerk",
    description: "Administrative oversight and document management",
    isActive: true,
    isSystemRole: true,
    permissions: ["admin", "documents", "reports"],
    createdBy: "system"
  },
  {
    roleName: "chamber-secretary", 
    displayName: "Chamber Secretary",
    description: "Council meeting management and administrative support",
    isActive: true,
    isSystemRole: true,
    permissions: ["meetings", "documents", "reports"],
    createdBy: "system"
  },
  {
    roleName: "finance-manager",
    displayName: "Finance Manager", 
    description: "Financial management, accounting, and budget oversight",
    isActive: true,
    isSystemRole: true,
    permissions: ["finance", "payroll", "reports", "billing"],
    createdBy: "system"
  },
  {
    roleName: "finance-clerk",
    displayName: "Finance Clerk",
    description: "Daily financial operations and transaction processing", 
    isActive: true,
    isSystemRole: true,
    permissions: ["finance-basic", "receipts", "vouchers"],
    createdBy: "system"
  },
  {
    roleName: "hr-manager",
    displayName: "HR Manager",
    description: "Human resources management and employee oversight",
    isActive: true,
    isSystemRole: true,
    permissions: ["payroll", "employees", "attendance", "performance"],
    createdBy: "system"
  },
  {
    roleName: "meter-reader",
    displayName: "Meter Reader", 
    description: "Water meter reading and consumption monitoring",
    isActive: true,
    isSystemRole: true,
    permissions: ["meter-reading", "water-connections"],
    createdBy: "system"
  },
  {
    roleName: "property-evaluator",
    displayName: "Property Evaluator",
    description: "Property assessments and valuations",
    isActive: true,
    isSystemRole: true,
    permissions: ["property", "valuations", "assessments"],
    createdBy: "system"
  },
  {
    roleName: "housing-officer",
    displayName: "Housing Officer",
    description: "Housing applications and allocation management", 
    isActive: true,
    isSystemRole: true,
    permissions: ["housing", "applications", "allocations"],
    createdBy: "system"
  },
  {
    roleName: "health-inspector",
    displayName: "Health Inspector",
    description: "Public health monitoring and facility inspections",
    isActive: true,
    isSystemRole: true,
    permissions: ["health", "inspections", "facilities"],
    createdBy: "system"
  },
  {
    roleName: "cemetery-administrator",
    displayName: "Cemetery Administrator",
    description: "Cemetery management and burial records",
    isActive: true,
    isSystemRole: true,
    permissions: ["cemetery", "burials", "records"],
    createdBy: "system"
  },
  {
    roleName: "transport-manager",
    displayName: "Transport Manager",
    description: "Fleet management and vehicle operations",
    isActive: true,
    isSystemRole: true,
    permissions: ["transport", "fleet", "maintenance"],
    createdBy: "system"
  },
  {
    roleName: "facilities-coordinator",
    displayName: "Facilities Coordinator",
    description: "Facility booking and venue management",
    isActive: true,
    isSystemRole: true,
    permissions: ["facilities", "bookings", "venues"],
    createdBy: "system"
  },
  {
    roleName: "customer-service",
    displayName: "Customer Service Representative",
    description: "Citizen services and complaint management",
    isActive: true,
    isSystemRole: true,
    permissions: ["crm", "complaints", "customer-portal"],
    createdBy: "system"
  },
  {
    roleName: "town-planner",
    displayName: "Town Planner",
    description: "Urban planning and development oversight",
    isActive: true,
    isSystemRole: true,
    permissions: ["planning", "development", "zoning"],
    createdBy: "system"
  }
];

// Module-to-role mappings based on existing system navigation
const moduleRoleMapping = {
  // Core dashboard - all roles
  "dashboard": ["super-admin", "town-clerk", "chamber-secretary", "finance-manager", "hr-manager"],
  "animated-dashboard": ["super-admin", "town-clerk", "chamber-secretary", "finance-manager", "hr-manager"],
  
  // Financial modules
  "advanced-finance": ["super-admin", "finance-manager", "finance-clerk"],
  "basic-finance": ["super-admin", "finance-manager", "finance-clerk"],
  "financial-integration": ["super-admin", "finance-manager"],
  
  // HR and Payroll
  "payroll-management": ["super-admin", "hr-manager", "finance-manager"],
  "face-scan-attendance": ["super-admin", "hr-manager"],
  
  // Municipal services
  "housing-management": ["super-admin", "housing-officer", "town-clerk"],
  "property-valuations": ["super-admin", "property-evaluator", "town-clerk"],
  "citizen-services": ["super-admin", "customer-service", "town-clerk"],
  "facility-bookings": ["super-admin", "facilities-coordinator"],
  "cemetery-management": ["super-admin", "cemetery-administrator", "health-inspector"],
  "fleet-management": ["super-admin", "transport-manager"],
  "town-planning": ["super-admin", "town-planner"],
  "water-sewerage": ["super-admin", "meter-reader", "facilities-coordinator"],
  "meter-billing": ["super-admin", "meter-reader", "finance-clerk"],
  "customer-portal": ["super-admin", "customer-service"],
  
  // Administration
  "system-administration": ["super-admin", "town-clerk"],
  "super-admin-portal": ["super-admin"]
};

export async function seedRolesAndModules() {
  console.log("🌱 Seeding roles and linking to modules...");
  
  try {
    // Create default roles
    for (const roleData of defaultRoles) {
      try {
        const existingRole = await db.select()
          .from(systemRoles)
          .where(eq(systemRoles.roleName, roleData.roleName))
          .limit(1);
        
        if (existingRole.length === 0) {
          await db.insert(systemRoles).values(roleData);
          console.log(`✓ Created role: ${roleData.displayName}`);
        } else {
          console.log(`- Role already exists: ${roleData.displayName}`);
        }
      } catch (error) {
        console.error(`Error creating role ${roleData.roleName}:`, error);
      }
    }

    // Get all existing modules and roles
    const modules = await db.select().from(systemModules);
    const roles = await db.select().from(systemRoles);
    
    console.log(`Found ${modules.length} modules and ${roles.length} roles`);

    // Create role-module assignments based on mapping
    for (const [moduleKey, roleKeys] of Object.entries(moduleRoleMapping)) {
      const module = modules.find(m => 
        m.moduleName === moduleKey || 
        m.moduleName.includes(moduleKey) ||
        moduleKey.includes(m.moduleName)
      );
      
      if (!module) {
        console.log(`- Module not found for key: ${moduleKey}`);
        continue;
      }

      for (const roleKey of roleKeys) {
        const role = roles.find(r => r.roleName === roleKey);
        
        if (!role) {
          console.log(`- Role not found: ${roleKey}`);
          continue;
        }

        try {
          // For simplicity, just insert assignment - let database handle duplicates
          try {
            await db.insert(roleModuleAssignments).values({
              roleId: role.id,
              moduleId: module.id,
              canRead: true,
              canWrite: roleKey === "super-admin" || roleKey.includes("manager"),
              canDelete: roleKey === "super-admin",
              canAdminister: roleKey === "super-admin",
              assignedBy: "system"
            });
            console.log(`✓ Assigned ${module.displayName} to ${role.displayName}`);
          } catch (assignError) {
            // Ignore duplicate key errors
            if (!assignError?.message?.includes("duplicate key")) {
              console.error(`Error assigning module:`, assignError);
            }
          }
        } catch (error) {
          console.error(`Error assigning module ${module.moduleName} to role ${role.roleName}:`, error);
        }
      }
    }

    console.log("🎉 Role seeding completed successfully!");
    
    // Return summary
    const finalRoles = await db.select().from(systemRoles);
    const finalAssignments = await db.select().from(roleModuleAssignments);
    
    return {
      totalRoles: finalRoles.length,
      totalAssignments: finalAssignments.length,
      success: true
    };

  } catch (error) {
    console.error("❌ Error seeding roles:", error);
    throw error;
  }
}

// Export for use in API endpoints - no direct execution needed