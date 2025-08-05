import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  boolean,
  decimal,
  uuid,
  date,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  department: varchar("department").notNull(), // town-clerk, chamber-secretary, engineering, health, finance, housing
  role: varchar("role").notNull().default("user"), // admin, manager, user, super-admin
  isActive: boolean("is_active").default(true),
  lastLogin: timestamp("last_login"),
  failedLoginAttempts: integer("failed_login_attempts").default(0),
  isLocked: boolean("is_locked").default(false),
  lockedUntil: timestamp("locked_until"),
  permissions: text("permissions").array().default([]),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});



// Housing Management Tables
export const housingApplications = pgTable("housing_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  applicationNumber: varchar("application_number").unique().notNull(),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  nationalId: varchar("national_id").notNull(),
  phoneNumber: varchar("phone_number").notNull(),
  email: varchar("email"),
  currentAddress: text("current_address").notNull(),
  housingType: varchar("housing_type").notNull(), // low-cost, medium-density, high-density, commercial
  status: varchar("status").notNull().default("pending"), // pending, approved, rejected, allocated
  priority: varchar("priority").notNull().default("medium"), // high, medium, low
  applicationDate: timestamp("application_date").defaultNow(),
  reviewedBy: varchar("reviewed_by"),
  reviewDate: timestamp("review_date"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const housingWaitingList = pgTable("housing_waiting_list", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  applicationId: varchar("application_id").notNull(),
  waitingListNumber: varchar("waiting_list_number").unique().notNull(),
  position: integer("position").notNull(),
  housingType: varchar("housing_type").notNull(),
  renewalPaid: boolean("renewal_paid").default(false),
  renewalDate: timestamp("renewal_date"),
  addedDate: timestamp("added_date").defaultNow(),
});

export const properties = pgTable("properties", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  propertyNumber: varchar("property_number").unique().notNull(),
  standNumber: varchar("stand_number"),
  address: text("address").notNull(),
  propertyType: varchar("property_type").notNull(), // residential, commercial, industrial
  size: decimal("size"), // in square meters
  valuation: decimal("valuation", { precision: 12, scale: 2 }),
  ownerName: varchar("owner_name"),
  ownerContact: varchar("owner_contact"),
  status: varchar("status").notNull().default("active"), // active, vacant, allocated
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Customer Service Management
export const customerComplaints = pgTable("customer_complaints", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  complaintNumber: varchar("complaint_number").unique().notNull(),
  customerName: varchar("customer_name").notNull(),
  customerContact: varchar("customer_contact").notNull(),
  customerEmail: varchar("customer_email"),
  propertyId: varchar("property_id"),
  category: varchar("category").notNull(), // water, sewerage, roads, refuse, other
  description: text("description").notNull(),
  status: varchar("status").notNull().default("open"), // open, in-progress, resolved, closed
  priority: varchar("priority").notNull().default("medium"), // high, medium, low
  assignedTo: varchar("assigned_to"),
  assignedDepartment: varchar("assigned_department"),
  submissionDate: timestamp("submission_date").defaultNow(),
  responseDate: timestamp("response_date"),
  resolutionDate: timestamp("resolution_date"),
  turnaroundTime: integer("turnaround_time"), // in hours
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Facility Bookings
export const facilities = pgTable("facilities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  type: varchar("type").notNull(), // hall, sports-facility, venue
  capacity: integer("capacity"),
  hourlyRate: decimal("hourly_rate", { precision: 8, scale: 2 }),
  dailyRate: decimal("daily_rate", { precision: 8, scale: 2 }),
  description: text("description"),
  amenities: text("amenities").array(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const facilityBookings = pgTable("facility_bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  bookingNumber: varchar("booking_number").unique().notNull(),
  facilityId: varchar("facility_id").notNull(),
  customerName: varchar("customer_name").notNull(),
  customerContact: varchar("customer_contact").notNull(),
  customerEmail: varchar("customer_email"),
  eventType: varchar("event_type").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }),
  paymentStatus: varchar("payment_status").notNull().default("pending"), // pending, paid, partial
  status: varchar("status").notNull().default("pending"), // pending, confirmed, cancelled
  specialRequirements: text("special_requirements"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Cemetery Management
export const cemeteries = pgTable("cemeteries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  location: varchar("location").notNull(),
  totalGraves: integer("total_graves"),
  availableGraves: integer("available_graves"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const graves = pgTable("graves", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  graveNumber: varchar("grave_number").unique().notNull(),
  cemeteryId: varchar("cemetery_id").notNull(),
  section: varchar("section"),
  graveType: varchar("grave_type").notNull(), // normal, casket, double
  status: varchar("status").notNull().default("available"), // available, reserved, occupied
  price: decimal("price", { precision: 8, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const burials = pgTable("burials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  intermentOrderNumber: varchar("interment_order_number").unique().notNull(),
  graveId: varchar("grave_id").notNull(),
  deceasedName: varchar("deceased_name").notNull(),
  deceasedAge: integer("deceased_age"),
  deceasedGender: varchar("deceased_gender"), // male, female, infant
  dateOfDeath: date("date_of_death"),
  burialDate: date("burial_date"),
  nextOfKinName: varchar("next_of_kin_name").notNull(),
  nextOfKinContact: varchar("next_of_kin_contact").notNull(),
  paymentStatus: varchar("payment_status").notNull().default("pending"),
  totalAmount: decimal("total_amount", { precision: 8, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Fleet Management
export const vehicles = pgTable("vehicles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  vehicleNumber: varchar("vehicle_number").unique().notNull(),
  make: varchar("make").notNull(),
  model: varchar("model").notNull(),
  year: integer("year"),
  department: varchar("department").notNull(),
  status: varchar("status").notNull().default("active"), // active, maintenance, retired
  mileage: integer("mileage").default(0),
  lastServiceDate: date("last_service_date"),
  nextServiceDate: date("next_service_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const fuelRecords = pgTable("fuel_records", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  vehicleId: varchar("vehicle_id").notNull(),
  date: date("date").notNull(),
  litres: decimal("litres", { precision: 8, scale: 2 }).notNull(),
  cost: decimal("cost", { precision: 8, scale: 2 }).notNull(),
  mileage: integer("mileage").notNull(),
  driver: varchar("driver"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Water & Sewerage Management
export const waterConnections = pgTable("water_connections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  connectionNumber: varchar("connection_number").unique().notNull(),
  propertyId: varchar("property_id").notNull(),
  customerName: varchar("customer_name").notNull(),
  customerContact: varchar("customer_contact").notNull(),
  meterNumber: varchar("meter_number"),
  meterType: varchar("meter_type"), // prepaid, postpaid
  connectionType: varchar("connection_type").notNull(), // domestic, commercial, industrial
  status: varchar("status").notNull().default("active"), // active, disconnected, suspended
  connectionDate: date("connection_date"),
  lastReadingDate: date("last_reading_date"),
  lastReading: decimal("last_reading", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Meter Applications
export const meterApplications = pgTable("meter_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  applicationNumber: varchar("application_number").unique().notNull(),
  applicantName: varchar("applicant_name").notNull(),
  nationalId: varchar("national_id").notNull(),
  phoneNumber: varchar("phone_number").notNull(),
  email: varchar("email").notNull(),
  propertyAddress: text("property_address").notNull(),
  propertyType: varchar("property_type").notNull(), // residential, commercial, industrial, institutional
  connectionType: varchar("connection_type").notNull(), // new, replacement, upgrade
  meterSize: varchar("meter_size").notNull(), // 15mm, 20mm, 25mm, 40mm, 50mm
  estimatedUsage: varchar("estimated_usage").notNull(),
  plotNumber: varchar("plot_number").notNull(),
  standNumber: varchar("stand_number").notNull(),
  ward: varchar("ward").notNull(),
  specialRequirements: text("special_requirements"),
  status: varchar("status").notNull().default("pending"), // pending, approved, rejected, installed
  applicationDate: timestamp("application_date").defaultNow(),
  reviewedBy: varchar("reviewed_by"),
  reviewDate: timestamp("review_date"),
  installationDate: timestamp("installation_date"),
  meterNumber: varchar("meter_number"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Additional tables for enhanced municipal features

// Permits & Licensing
export const permits = pgTable("permits", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  permitNumber: varchar("permit_number").unique().notNull(),
  permitType: varchar("permit_type").notNull(), // business, building, event, street-trading
  applicantName: varchar("applicant_name").notNull(),
  applicantContact: varchar("applicant_contact").notNull(),
  businessName: varchar("business_name"),
  propertyAddress: text("property_address").notNull(),
  description: text("description").notNull(),
  status: varchar("status").notNull().default("pending"), // pending, approved, rejected, expired
  applicationDate: timestamp("application_date").defaultNow(),
  approvalDate: timestamp("approval_date"),
  expiryDate: date("expiry_date"),
  fee: decimal("fee", { precision: 8, scale: 2 }),
  paymentStatus: varchar("payment_status").notNull().default("pending"), // pending, paid, overdue
  reviewedBy: varchar("reviewed_by"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Revenue Collection
export const bills = pgTable("bills", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  billNumber: varchar("bill_number").unique().notNull(),
  customerName: varchar("customer_name").notNull(),
  customerContact: varchar("customer_contact").notNull(),
  propertyId: varchar("property_id"),
  billType: varchar("bill_type").notNull(), // rates, water, refuse, permits
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  billingPeriod: varchar("billing_period").notNull(), // 2024-01, 2024-02, etc.
  dueDate: date("due_date").notNull(),
  paidDate: date("paid_date"),
  status: varchar("status").notNull().default("outstanding"), // outstanding, paid, overdue
  paymentMethod: varchar("payment_method"), // cash, card, mobile-money, bank-transfer
  referenceNumber: varchar("reference_number"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Town Planning Applications
export const planningApplications = pgTable("planning_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  applicationNumber: varchar("application_number").unique().notNull(),
  applicantName: varchar("applicant_name").notNull(),
  applicantContact: varchar("applicant_contact").notNull(),
  propertyAddress: text("property_address").notNull(),
  applicationType: varchar("application_type").notNull(), // building-plan, subdivision, rezoning, change-of-use
  description: text("description").notNull(),
  status: varchar("status").notNull().default("pending"), // pending, under-review, approved, rejected
  submissionDate: timestamp("submission_date").defaultNow(),
  reviewDate: timestamp("review_date"),
  approvalDate: timestamp("approval_date"),
  planNumber: varchar("plan_number"),
  fee: decimal("fee", { precision: 8, scale: 2 }),
  paymentStatus: varchar("payment_status").notNull().default("pending"),
  reviewedBy: varchar("reviewed_by"),
  comments: text("comments"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Asset Management
export const assets = pgTable("assets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  assetNumber: varchar("asset_number").unique().notNull(),
  name: varchar("name").notNull(),
  category: varchar("category").notNull(), // infrastructure, equipment, property, vehicle
  subCategory: varchar("sub_category"), // bridge, computer, office-building, truck
  description: text("description"),
  location: varchar("location"),
  department: varchar("department").notNull(),
  purchaseDate: date("purchase_date"),
  purchaseValue: decimal("purchase_value", { precision: 12, scale: 2 }),
  currentValue: decimal("current_value", { precision: 12, scale: 2 }),
  condition: varchar("condition").notNull().default("good"), // excellent, good, fair, poor
  status: varchar("status").notNull().default("active"), // active, maintenance, disposed
  lastInspectionDate: date("last_inspection_date"),
  nextInspectionDate: date("next_inspection_date"),
  warrantyExpiry: date("warranty_expiry"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Vendor Management
export const vendors = pgTable("vendors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  vendorNumber: varchar("vendor_number").unique().notNull(),
  companyName: varchar("company_name").notNull(),
  contactPerson: varchar("contact_person").notNull(),
  email: varchar("email").notNull(),
  phoneNumber: varchar("phone_number").notNull(),
  address: text("address").notNull(),
  taxNumber: varchar("tax_number"),
  registrationNumber: varchar("registration_number"),
  category: varchar("category").notNull(), // construction, supplies, services, consulting
  status: varchar("status").notNull().default("active"), // active, suspended, blacklisted
  rating: integer("rating").default(3), // 1-5 star rating
  bankName: varchar("bank_name"),
  accountNumber: varchar("account_number"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Purchase Orders
export const purchaseOrders = pgTable("purchase_orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderNumber: varchar("order_number").unique().notNull(),
  vendorId: varchar("vendor_id").notNull(),
  department: varchar("department").notNull(),
  description: text("description").notNull(),
  totalAmount: decimal("total_amount", { precision: 12, scale: 2 }).notNull(),
  status: varchar("status").notNull().default("pending"), // pending, approved, delivered, cancelled
  requestedBy: varchar("requested_by").notNull(),
  approvedBy: varchar("approved_by"),
  deliveryDate: date("delivery_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Meter Billing System
export const meters = pgTable("meters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  meterNumber: varchar("meter_number").unique().notNull(),
  meterType: varchar("meter_type").notNull(), // water, electricity, gas
  propertyId: varchar("property_id").notNull(),
  serialNumber: varchar("serial_number").unique(),
  manufacturer: varchar("manufacturer"),
  installationDate: date("installation_date"),
  lastMaintenanceDate: date("last_maintenance_date"),
  status: varchar("status").notNull().default("active"), // active, faulty, disconnected, removed
  multiplier: decimal("multiplier", { precision: 5, scale: 2 }).default('1.00'),
  createdBy: varchar("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const meterReadings = pgTable("meter_readings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  meterId: varchar("meter_id").notNull(),
  readingValue: decimal("reading_value", { precision: 12, scale: 2 }).notNull(),
  previousReading: decimal("previous_reading", { precision: 12, scale: 2 }),
  consumption: decimal("consumption", { precision: 12, scale: 2 }),
  readingDate: timestamp("reading_date").notNull(),
  readBy: varchar("read_by").notNull(), // meter reader user ID
  billingPeriod: varchar("billing_period").notNull(), // YYYY-MM format
  notes: text("notes"),
  imageUrl: varchar("image_url"), // photo of meter reading
  coordinates: varchar("coordinates"), // GPS coordinates
  status: varchar("status").notNull().default("active"), // active, corrected, disputed
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Property Registration for Meter Readers
export const propertyRegistrationRequests = pgTable("property_registration_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  requestNumber: varchar("request_number").unique().notNull(),
  propertyAddress: text("property_address").notNull(),
  ownerName: varchar("owner_name"),
  ownerContact: varchar("owner_contact"),
  propertyType: varchar("property_type").notNull(), // residential, commercial, industrial
  meterNumber: varchar("meter_number"),
  meterType: varchar("meter_type"), // water, electricity
  coordinates: varchar("coordinates"),
  requestedBy: varchar("requested_by").notNull(), // meter reader user ID
  status: varchar("status").notNull().default("pending"), // pending, approved, rejected
  adminNotes: text("admin_notes"),
  approvedBy: varchar("approved_by"),
  approvedAt: timestamp("approved_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// System Roles Management
export const systemRoles = pgTable("system_roles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  roleName: varchar("role_name").unique().notNull(),
  displayName: varchar("display_name").notNull(),
  description: text("description"),
  isActive: boolean("is_active").default(true),
  isSystemRole: boolean("is_system_role").default(false), // built-in roles like super-admin
  permissions: jsonb("permissions").$type<string[]>().default([]),
  createdBy: varchar("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// System Configuration and Super Admin Controls
export const systemModules = pgTable("system_modules", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  moduleName: varchar("module_name").unique().notNull(),
  displayName: varchar("display_name").notNull(),
  description: text("description"),
  isEnabled: boolean("is_enabled").default(true),
  isInMaintenance: boolean("is_in_maintenance").default(false),
  maintenanceMessage: text("maintenance_message"),
  maintenanceStartDate: timestamp("maintenance_start_date"),
  maintenanceEndDate: timestamp("maintenance_end_date"),
  comingSoonMode: boolean("coming_soon_mode").default(false),
  comingSoonMessage: text("coming_soon_message"),
  canRegisterProperties: boolean("can_register_properties").default(false), // for meter readers
  allowedRoles: jsonb("allowed_roles").$type<string[]>().default([]),
  allowedDepartments: jsonb("allowed_departments").$type<string[]>().default([]),
  requireSuperAdmin: boolean("require_super_admin").default(false),
  moduleIcon: varchar("module_icon").default("Settings"),
  moduleColor: varchar("module_color").default("#3B82F6"),
  sortOrder: integer("sort_order").default(0),
  version: varchar("version").default("1.0.0"),
  lastModifiedBy: varchar("last_modified_by"),
  lastModifiedAt: timestamp("last_modified_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Role-Module assignments (many-to-many relationship)
export const roleModuleAssignments = pgTable("role_module_assignments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  roleId: varchar("role_id").notNull(),
  moduleId: varchar("module_id").notNull(),
  canRead: boolean("can_read").default(true),
  canWrite: boolean("can_write").default(false),
  canDelete: boolean("can_delete").default(false),
  canAdminister: boolean("can_administer").default(false),
  assignedBy: varchar("assigned_by").notNull(),
  assignedAt: timestamp("assigned_at").defaultNow(),
});

export const systemSettings = pgTable("system_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  settingKey: varchar("setting_key").unique().notNull(),
  settingValue: text("setting_value"),
  settingType: varchar("setting_type").notNull(), // string, number, boolean, json
  description: text("description"),
  category: varchar("category").notNull(), // billing, payments, general, security
  isPublic: boolean("is_public").default(false), // can non-admin users see this
  validationRules: jsonb("validation_rules"), // JSON schema for validation
  lastModifiedBy: varchar("last_modified_by"),
  lastModifiedAt: timestamp("last_modified_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Audit logs for tracking all system changes
export const auditLogs = pgTable("audit_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tableName: varchar("table_name").notNull(),
  recordId: varchar("record_id").notNull(),
  action: varchar("action").notNull(), // CREATE, UPDATE, DELETE
  oldValues: jsonb("old_values"),
  newValues: jsonb("new_values"),
  changedFields: text("changed_fields").array(),
  userId: varchar("user_id").notNull(),
  userName: varchar("user_name").notNull(),
  userDepartment: varchar("user_department"),
  ipAddress: varchar("ip_address"),
  userAgent: text("user_agent"),
  module: varchar("module").notNull(),
  description: text("description"),
  severity: varchar("severity").default("info"), // info, warning, error, critical
  timestamp: timestamp("timestamp").defaultNow(),
});

// System notifications
export const systemNotifications = pgTable("system_notifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title").notNull(),
  message: text("message").notNull(),
  type: varchar("type").notNull(), // info, warning, error, success
  category: varchar("category").notNull(), // system, security, maintenance
  targetRole: varchar("target_role"), // null means all users
  targetDepartment: varchar("target_department"),
  isRead: boolean("is_read").default(false),
  isActive: boolean("is_active").default(true),
  expiresAt: timestamp("expires_at"),
  createdBy: varchar("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// System backups tracking
export const systemBackups = pgTable("system_backups", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  backupName: varchar("backup_name").notNull(),
  backupType: varchar("backup_type").notNull(), // full, incremental, schema
  backupSize: varchar("backup_size"),
  status: varchar("status").notNull().default("pending"), // pending, running, completed, failed
  filePath: text("file_path"),
  errorMessage: text("error_message"),
  tablesIncluded: text("tables_included").array(),
  triggeredBy: varchar("triggered_by").notNull(),
  startedAt: timestamp("started_at").defaultNow(),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Billing and Rates Management
export const billingRates = pgTable("billing_rates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  rateType: varchar("rate_type").notNull(), // water, electricity, property-rates, refuse, sewerage
  category: varchar("category").notNull(), // domestic, commercial, industrial
  tierMin: decimal("tier_min", { precision: 8, scale: 2 }), // for tiered billing
  tierMax: decimal("tier_max", { precision: 8, scale: 2 }),
  rate: decimal("rate", { precision: 8, scale: 4 }).notNull(), // rate per unit
  fixedCharge: decimal("fixed_charge", { precision: 8, scale: 2 }), // monthly fixed charge
  effectiveDate: date("effective_date").notNull(),
  expiryDate: date("expiry_date"),
  isActive: boolean("is_active").default(true),
  createdBy: varchar("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const customerAccounts = pgTable("customer_accounts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  accountNumber: varchar("account_number").unique().notNull(),
  customerName: varchar("customer_name").notNull(),
  customerEmail: varchar("customer_email"),
  customerPhone: varchar("customer_phone").notNull(),
  nationalId: varchar("national_id"),
  propertyId: varchar("property_id").notNull(),
  accountType: varchar("account_type").notNull(), // individual, business, government
  billingAddress: text("billing_address"),
  currentBalance: decimal("current_balance", { precision: 12, scale: 2 }).default('0.00'),
  creditLimit: decimal("credit_limit", { precision: 12, scale: 2 }).default('0.00'),
  status: varchar("status").notNull().default("active"), // active, suspended, closed
  paymentTerms: integer("payment_terms").default(30), // days
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const monthlyBills = pgTable("monthly_bills", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  billNumber: varchar("bill_number").unique().notNull(),
  accountId: varchar("account_id").notNull(),
  billingPeriod: varchar("billing_period").notNull(), // YYYY-MM
  dueDate: date("due_date").notNull(),
  
  // Service charges
  waterCharges: decimal("water_charges", { precision: 10, scale: 2 }).default('0.00'),
  electricityCharges: decimal("electricity_charges", { precision: 10, scale: 2 }).default('0.00'),
  propertyRates: decimal("property_rates", { precision: 10, scale: 2 }).default('0.00'),
  refuseCharges: decimal("refuse_charges", { precision: 10, scale: 2 }).default('0.00'),
  sewerageCharges: decimal("sewerage_charges", { precision: 10, scale: 2 }).default('0.00'),
  
  totalAmount: decimal("total_amount", { precision: 12, scale: 2 }).notNull(),
  amountPaid: decimal("amount_paid", { precision: 12, scale: 2 }).default('0.00'),
  balance: decimal("balance", { precision: 12, scale: 2 }).notNull(),
  status: varchar("status").notNull().default("unpaid"), // unpaid, partial, paid, overdue
  
  generatedBy: varchar("generated_by").notNull(),
  generatedAt: timestamp("generated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Multi-zone POS and Payment System
export const zones = pgTable("zones", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  zoneName: varchar("zone_name").unique().notNull(),
  zoneCode: varchar("zone_code").unique().notNull(),
  description: text("description"),
  manager: varchar("manager"), // user ID
  address: text("address"),
  contactNumber: varchar("contact_number"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const posTerminals = pgTable("pos_terminals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  terminalId: varchar("terminal_id").unique().notNull(),
  terminalName: varchar("terminal_name").notNull(),
  zoneId: varchar("zone_id").notNull(),
  operatorId: varchar("operator_id").notNull(), // user ID
  status: varchar("status").notNull().default("active"), // active, inactive, maintenance
  lastTransactionDate: timestamp("last_transaction_date"),
  dailyLimit: decimal("daily_limit", { precision: 12, scale: 2 }),
  currentDayTotal: decimal("current_day_total", { precision: 12, scale: 2 }).default('0.00'),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const payments = pgTable("payments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  paymentNumber: varchar("payment_number").unique().notNull(),
  accountId: varchar("account_id").notNull(),
  billId: varchar("bill_id"), // reference to monthly_bills
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  paymentMethod: varchar("payment_method").notNull(), // cash, card, mobile-money, paynow, payfast
  paymentGateway: varchar("payment_gateway"), // paynow, payfast, bank
  transactionReference: varchar("transaction_reference"),
  receiptNumber: varchar("receipt_number").unique(),
  
  // Location and operator info
  zoneId: varchar("zone_id"),
  posTerminalId: varchar("pos_terminal_id"),
  operatorId: varchar("operator_id").notNull(), // user who processed payment
  
  paymentDate: timestamp("payment_date").defaultNow(),
  status: varchar("status").notNull().default("completed"), // pending, completed, failed, refunded
  
  // For online payments
  gatewayResponse: jsonb("gateway_response"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Comprehensive Audit Trail System
export const auditLog = pgTable("audit_log", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tableName: varchar("table_name").notNull(),
  recordId: varchar("record_id").notNull(),
  action: varchar("action").notNull(), // INSERT, UPDATE, DELETE
  oldValues: jsonb("old_values"), // previous data before change
  newValues: jsonb("new_values"), // new data after change
  changedFields: text("changed_fields").array(), // list of fields that changed
  userId: varchar("user_id").notNull(), // who made the change
  userName: varchar("user_name").notNull(),
  userDepartment: varchar("user_department"),
  ipAddress: varchar("ip_address"),
  userAgent: varchar("user_agent"),
  sessionId: varchar("session_id"),
  module: varchar("module").notNull(), // which module/page the change was made from
  description: text("description"), // human readable description of change
  timestamp: timestamp("timestamp").defaultNow(),
});

export const userSessions = pgTable("user_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  sessionToken: varchar("session_token").unique().notNull(),
  loginTime: timestamp("login_time").defaultNow(),
  logoutTime: timestamp("logout_time"),
  ipAddress: varchar("ip_address"),
  userAgent: varchar("user_agent"),
  isActive: boolean("is_active").default(true),
  lastActivity: timestamp("last_activity").defaultNow(),
});

// Payment Gateway Integration
export const paymentGateways = pgTable("payment_gateways", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  gatewayName: varchar("gateway_name").unique().notNull(), // paynow, payfast
  displayName: varchar("display_name").notNull(),
  isEnabled: boolean("is_enabled").default(false),
  apiEndpoint: varchar("api_endpoint"),
  merchantId: varchar("merchant_id"),
  integrationKey: varchar("integration_key"),
  passphrase: varchar("passphrase"),
  testMode: boolean("test_mode").default(true),
  supportedMethods: text("supported_methods").array(), // ["card", "mobile-money", "bank-transfer"]
  fees: jsonb("fees"), // fee structure
  lastModifiedBy: varchar("last_modified_by"),
  lastModifiedAt: timestamp("last_modified_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Reports and Analytics
export const reportTemplates = pgTable("report_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  templateName: varchar("template_name").unique().notNull(),
  displayName: varchar("display_name").notNull(),
  description: text("description"),
  category: varchar("category").notNull(), // financial, operational, compliance
  sqlQuery: text("sql_query"),
  parameters: jsonb("parameters"), // report parameters
  chartConfig: jsonb("chart_config"), // chart configuration
  accessRoles: text("access_roles").array(), // who can access this report
  isActive: boolean("is_active").default(true),
  createdBy: varchar("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  auditLogs: many(auditLog),
  payments: many(payments),
  meterReadings: many(meterReadings),
}));

export const propertiesRelations = relations(properties, ({ many, one }) => ({
  meters: many(meters),
  customerAccount: one(customerAccounts),
  complaints: many(customerComplaints),
}));

export const metersRelations = relations(meters, ({ one, many }) => ({
  property: one(properties, {
    fields: [meters.propertyId],
    references: [properties.id],
  }),
  readings: many(meterReadings),
}));

export const meterReadingsRelations = relations(meterReadings, ({ one }) => ({
  meter: one(meters, {
    fields: [meterReadings.meterId],
    references: [meters.id],
  }),
  reader: one(users, {
    fields: [meterReadings.readBy],
    references: [users.id],
  }),
}));

export const customerAccountsRelations = relations(customerAccounts, ({ one, many }) => ({
  property: one(properties, {
    fields: [customerAccounts.propertyId],
    references: [properties.id],
  }),
  bills: many(monthlyBills),
  payments: many(payments),
}));

export const monthlyBillsRelations = relations(monthlyBills, ({ one, many }) => ({
  account: one(customerAccounts, {
    fields: [monthlyBills.accountId],
    references: [customerAccounts.id],
  }),
  payments: many(payments),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  account: one(customerAccounts, {
    fields: [payments.accountId],
    references: [customerAccounts.id],
  }),
  bill: one(monthlyBills, {
    fields: [payments.billId],
    references: [monthlyBills.id],
  }),
  operator: one(users, {
    fields: [payments.operatorId],
    references: [users.id],
  }),
  zone: one(zones, {
    fields: [payments.zoneId],
    references: [zones.id],
  }),
  posTerminal: one(posTerminals, {
    fields: [payments.posTerminalId],
    references: [posTerminals.id],
  }),
}));

export const zonesRelations = relations(zones, ({ many }) => ({
  posTerminals: many(posTerminals),
  payments: many(payments),
}));

export const posTerminalsRelations = relations(posTerminals, ({ one, many }) => ({
  zone: one(zones, {
    fields: [posTerminals.zoneId],
    references: [zones.id],
  }),
  operator: one(users, {
    fields: [posTerminals.operatorId],
    references: [users.id],
  }),
  payments: many(payments),
}));

// Insert Schemas for form validation
export const insertMeterSchema = createInsertSchema(meters).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMeterReadingSchema = createInsertSchema(meterReadings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPropertyRegistrationRequestSchema = createInsertSchema(propertyRegistrationRequests).omit({
  id: true,
  requestNumber: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCustomerAccountSchema = createInsertSchema(customerAccounts).omit({
  id: true,
  accountNumber: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  paymentNumber: true,
  receiptNumber: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMonthlyBillSchema = createInsertSchema(monthlyBills).omit({
  id: true,
  billNumber: true,
  generatedAt: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSystemModuleSchema = createInsertSchema(systemModules).omit({
  id: true,
  lastModifiedAt: true,
  createdAt: true,
});

export const insertBillingRateSchema = createInsertSchema(billingRates).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertZoneSchema = createInsertSchema(zones).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPosTerminalSchema = createInsertSchema(posTerminals).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPaymentGatewaySchema = createInsertSchema(paymentGateways).omit({
  id: true,
  lastModifiedAt: true,
  createdAt: true,
});



// Types for TypeScript
export type Meter = typeof meters.$inferSelect;
export type InsertMeter = z.infer<typeof insertMeterSchema>;

export type MeterReading = typeof meterReadings.$inferSelect;
export type InsertMeterReading = z.infer<typeof insertMeterReadingSchema>;

export type PropertyRegistrationRequest = typeof propertyRegistrationRequests.$inferSelect;
export type InsertPropertyRegistrationRequest = z.infer<typeof insertPropertyRegistrationRequestSchema>;

export type CustomerAccount = typeof customerAccounts.$inferSelect;
export type InsertCustomerAccount = z.infer<typeof insertCustomerAccountSchema>;

export type Payment = typeof payments.$inferSelect;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;

export type MonthlyBill = typeof monthlyBills.$inferSelect;
export type InsertMonthlyBill = z.infer<typeof insertMonthlyBillSchema>;



export type BillingRate = typeof billingRates.$inferSelect;
export type InsertBillingRate = z.infer<typeof insertBillingRateSchema>;

export type Zone = typeof zones.$inferSelect;
export type InsertZone = z.infer<typeof insertZoneSchema>;

export type PosTerminal = typeof posTerminals.$inferSelect;
export type InsertPosTerminal = z.infer<typeof insertPosTerminalSchema>;

export type PaymentGateway = typeof paymentGateways.$inferSelect;
export type InsertPaymentGateway = z.infer<typeof insertPaymentGatewaySchema>;


export type UserSession = typeof userSessions.$inferSelect;

// Council Meetings
export const councilMeetings = pgTable("council_meetings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  meetingNumber: varchar("meeting_number").unique().notNull(),
  title: varchar("title").notNull(),
  meetingType: varchar("meeting_type").notNull(), // ordinary, special, committee
  date: timestamp("date").notNull(),
  venue: varchar("venue").notNull(),
  status: varchar("status").notNull().default("scheduled"), // scheduled, in-progress, completed, cancelled
  agenda: text("agenda").array(),
  attendees: text("attendees").array(),
  chairperson: varchar("chairperson"),
  secretary: varchar("secretary"),
  minutes: text("minutes"),
  resolutions: text("resolutions").array(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Public Notices
export const publicNotices = pgTable("public_notices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  noticeNumber: varchar("notice_number").unique().notNull(),
  title: varchar("title").notNull(),
  content: text("content").notNull(),
  category: varchar("category").notNull(), // tender, public-hearing, general, emergency
  status: varchar("status").notNull().default("active"), // active, expired, cancelled
  publishDate: timestamp("publish_date").defaultNow(),
  expiryDate: date("expiry_date"),
  publishedBy: varchar("published_by").notNull(),
  priority: varchar("priority").notNull().default("normal"), // high, normal, low
  attachments: text("attachments").array(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations
export const housingApplicationsRelations = relations(housingApplications, ({ one }) => ({
  waitingListEntry: one(housingWaitingList, {
    fields: [housingApplications.id],
    references: [housingWaitingList.applicationId],
  }),
}));

export const housingWaitingListRelations = relations(housingWaitingList, ({ one }) => ({
  application: one(housingApplications, {
    fields: [housingWaitingList.applicationId],
    references: [housingApplications.id],
  }),
}));

export const customerComplaintsRelations = relations(customerComplaints, ({ one }) => ({
  property: one(properties, {
    fields: [customerComplaints.propertyId],
    references: [properties.id],
  }),
}));

export const facilityBookingsRelations = relations(facilityBookings, ({ one }) => ({
  facility: one(facilities, {
    fields: [facilityBookings.facilityId],
    references: [facilities.id],
  }),
}));

export const gravesRelations = relations(graves, ({ one, many }) => ({
  cemetery: one(cemeteries, {
    fields: [graves.cemeteryId],
    references: [cemeteries.id],
  }),
  burials: many(burials),
}));

export const burialsRelations = relations(burials, ({ one }) => ({
  grave: one(graves, {
    fields: [burials.graveId],
    references: [graves.id],
  }),
}));

export const fuelRecordsRelations = relations(fuelRecords, ({ one }) => ({
  vehicle: one(vehicles, {
    fields: [fuelRecords.vehicleId],
    references: [vehicles.id],
  }),
}));

export const waterConnectionsRelations = relations(waterConnections, ({ one }) => ({
  property: one(properties, {
    fields: [waterConnections.propertyId],
    references: [properties.id],
  }),
}));

export const billsRelations = relations(bills, ({ one }) => ({
  property: one(properties, {
    fields: [bills.propertyId],
    references: [properties.id],
  }),
}));

export const vendorsRelations = relations(vendors, ({ many }) => ({
  purchaseOrders: many(purchaseOrders),
}));

export const purchaseOrdersRelations = relations(purchaseOrders, ({ one }) => ({
  vendor: one(vendors, {
    fields: [purchaseOrders.vendorId],
    references: [vendors.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertHousingApplicationSchema = createInsertSchema(housingApplications).omit({
  id: true,
  applicationNumber: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCustomerComplaintSchema = createInsertSchema(customerComplaints).omit({
  id: true,
  complaintNumber: true,
  createdAt: true,
  updatedAt: true,
});

export const insertFacilityBookingSchema = createInsertSchema(facilityBookings).omit({
  id: true,
  bookingNumber: true,
  createdAt: true,
  updatedAt: true,
});

export const insertFacilitySchema = createInsertSchema(facilities).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCemeterySchema = createInsertSchema(cemeteries).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertGraveSchema = createInsertSchema(graves).omit({
  id: true,
  graveNumber: true,
  section: true,
  price: true,
  status: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBurialSchema = createInsertSchema(burials).omit({
  id: true,
  intermentOrderNumber: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  totalAmount: z.number().min(0, "Amount must be 0 or more").optional().transform(val => val?.toString()),
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
  propertyNumber: true,
  createdAt: true,
  updatedAt: true,
});

export const insertVehicleSchema = createInsertSchema(vehicles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPermitSchema = createInsertSchema(permits).omit({
  id: true,
  permitNumber: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBillSchema = createInsertSchema(bills).omit({
  id: true,
  billNumber: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPlanningApplicationSchema = createInsertSchema(planningApplications).omit({
  id: true,
  applicationNumber: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAssetSchema = createInsertSchema(assets).omit({
  id: true,
  assetNumber: true,
  createdAt: true,
  updatedAt: true,
});

export const insertVendorSchema = createInsertSchema(vendors).omit({
  id: true,
  vendorNumber: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPurchaseOrderSchema = createInsertSchema(purchaseOrders).omit({
  id: true,
  orderNumber: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCouncilMeetingSchema = createInsertSchema(councilMeetings).omit({
  id: true,
  meetingNumber: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPublicNoticeSchema = createInsertSchema(publicNotices).omit({
  id: true,
  noticeNumber: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMeterApplicationSchema = createInsertSchema(meterApplications).omit({
  id: true,
  applicationNumber: true,
  createdAt: true,
  updatedAt: true,
});

export const insertWaterConnectionSchema = createInsertSchema(waterConnections).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Water Management Types
export type InsertWaterConnection = z.infer<typeof insertWaterConnectionSchema>;
export type InsertMeterApplication = z.infer<typeof insertMeterApplicationSchema>;
export type MeterApplication = typeof meterApplications.$inferSelect;

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertHousingApplication = z.infer<typeof insertHousingApplicationSchema>;
export type HousingApplication = typeof housingApplications.$inferSelect;
export type InsertCustomerComplaint = z.infer<typeof insertCustomerComplaintSchema>;
export type CustomerComplaint = typeof customerComplaints.$inferSelect;
export type InsertFacilityBooking = z.infer<typeof insertFacilityBookingSchema>;
export type FacilityBooking = typeof facilityBookings.$inferSelect;
export type Facility = typeof facilities.$inferSelect;
export type Property = typeof properties.$inferSelect;
export type Cemetery = typeof cemeteries.$inferSelect;
export type Grave = typeof graves.$inferSelect;
export type InsertBurial = z.infer<typeof insertBurialSchema>;
export type Burial = typeof burials.$inferSelect;
export type Vehicle = typeof vehicles.$inferSelect;
export type WaterConnection = typeof waterConnections.$inferSelect;

// New types for enhanced features
export type InsertPermit = z.infer<typeof insertPermitSchema>;
export type Permit = typeof permits.$inferSelect;
export type InsertBill = z.infer<typeof insertBillSchema>;
export type Bill = typeof bills.$inferSelect;
export type InsertPlanningApplication = z.infer<typeof insertPlanningApplicationSchema>;
export type PlanningApplication = typeof planningApplications.$inferSelect;
export type InsertAsset = z.infer<typeof insertAssetSchema>;
export type Asset = typeof assets.$inferSelect;
export type InsertVendor = z.infer<typeof insertVendorSchema>;
export type Vendor = typeof vendors.$inferSelect;
export type InsertPurchaseOrder = z.infer<typeof insertPurchaseOrderSchema>;
export type PurchaseOrder = typeof purchaseOrders.$inferSelect;
export type InsertCouncilMeeting = z.infer<typeof insertCouncilMeetingSchema>;
export type CouncilMeeting = typeof councilMeetings.$inferSelect;
export type InsertPublicNotice = z.infer<typeof insertPublicNoticeSchema>;
export type PublicNotice = typeof publicNotices.$inferSelect;

// Advanced Financial Management Tables
export const chartOfAccounts = pgTable("chart_of_accounts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  accountCode: varchar("account_code").unique().notNull(),
  accountName: varchar("account_name").notNull(),
  accountType: varchar("account_type").notNull(), // asset, liability, equity, revenue, expense
  parentAccountId: varchar("parent_account_id"),
  isActive: boolean("is_active").default(true),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const generalLedger = pgTable("general_ledger", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  accountId: varchar("account_id").notNull(),
  transactionDate: date("transaction_date").notNull(),
  description: text("description").notNull(),
  reference: varchar("reference"),
  debitAmount: decimal("debit_amount", { precision: 15, scale: 2 }).default("0"),
  creditAmount: decimal("credit_amount", { precision: 15, scale: 2 }).default("0"),
  balance: decimal("balance", { precision: 15, scale: 2 }).default("0"),
  currency: varchar("currency").notNull().default("USD"),
  exchangeRate: decimal("exchange_rate", { precision: 10, scale: 6 }).default("1"),
  createdBy: varchar("created_by").notNull(),
  approvedBy: varchar("approved_by"),
  status: varchar("status").notNull().default("pending"), // pending, approved, rejected
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const cashbook = pgTable("cashbook", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  transactionDate: date("transaction_date").notNull(),
  description: text("description").notNull(),
  reference: varchar("reference"),
  transactionType: varchar("transaction_type").notNull(), // receipt, payment
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  currency: varchar("currency").notNull().default("USD"),
  bankAccount: varchar("bank_account"),
  paymentMethod: varchar("payment_method"), // cash, cheque, eft, mobile
  payeePayor: varchar("payee_payor"),
  category: varchar("category"),
  status: varchar("status").notNull().default("cleared"), // cleared, pending, cancelled
  createdBy: varchar("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const debtorsManagement = pgTable("debtors_management", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  debtorCode: varchar("debtor_code").unique().notNull(),
  debtorName: varchar("debtor_name").notNull(),
  debtorType: varchar("debtor_type").notNull(), // individual, business, government
  contactPerson: varchar("contact_person"),
  phone: varchar("phone"),
  email: varchar("email"),
  address: text("address"),
  creditLimit: decimal("credit_limit", { precision: 15, scale: 2 }),
  currentBalance: decimal("current_balance", { precision: 15, scale: 2 }).default("0"),
  overdueDays: integer("overdue_days").default(0),
  status: varchar("status").notNull().default("active"), // active, inactive, blocked
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const municipalInvoices = pgTable("municipal_invoices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  invoiceNumber: varchar("invoice_number").unique().notNull(),
  debtorId: varchar("debtor_id").notNull(),
  invoiceDate: date("invoice_date").notNull(),
  dueDate: date("due_date").notNull(),
  description: text("description"),
  totalAmount: decimal("total_amount", { precision: 15, scale: 2 }).notNull(),
  paidAmount: decimal("paid_amount", { precision: 15, scale: 2 }).default("0"),
  balanceAmount: decimal("balance_amount", { precision: 15, scale: 2 }).notNull(),
  currency: varchar("currency").notNull().default("USD"),
  status: varchar("status").notNull().default("pending"), // pending, partial, paid, overdue, cancelled
  createdBy: varchar("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const voucherPayments = pgTable("voucher_payments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  voucherNumber: varchar("voucher_number").unique().notNull(),
  payeeId: varchar("payee_id"),
  payeeName: varchar("payee_name").notNull(),
  paymentDate: date("payment_date").notNull(),
  description: text("description").notNull(),
  totalAmount: decimal("total_amount", { precision: 15, scale: 2 }).notNull(),
  currency: varchar("currency").notNull().default("USD"),
  paymentMethod: varchar("payment_method").notNull(), // cheque, eft, cash, mobile
  bankAccount: varchar("bank_account"),
  status: varchar("status").notNull().default("pending"), // pending, approved, paid, cancelled
  approvedBy: varchar("approved_by"),
  createdBy: varchar("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const receipts = pgTable("receipts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  receiptNumber: varchar("receipt_number").unique().notNull(),
  payerName: varchar("payer_name").notNull(),
  payerContact: varchar("payer_contact"),
  receiptDate: date("receipt_date").notNull(),
  description: text("description").notNull(),
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  currency: varchar("currency").notNull().default("USD"),
  paymentMethod: varchar("payment_method").notNull(),
  invoiceId: varchar("invoice_id"), // if paying against an invoice
  category: varchar("category").notNull(), // rates, water, licenses, fines, other
  createdBy: varchar("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const fixedAssets = pgTable("fixed_assets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  assetCode: varchar("asset_code").unique().notNull(),
  assetName: varchar("asset_name").notNull(),
  category: varchar("category").notNull(), // building, vehicle, equipment, furniture, land
  location: varchar("location"),
  purchaseDate: date("purchase_date"),
  purchaseCost: decimal("purchase_cost", { precision: 15, scale: 2 }),
  currentValue: decimal("current_value", { precision: 15, scale: 2 }),
  depreciationMethod: varchar("depreciation_method"), // straight-line, reducing-balance
  depreciationRate: decimal("depreciation_rate", { precision: 5, scale: 2 }),
  usefulLife: integer("useful_life"), // in years
  condition: varchar("condition").default("good"), // excellent, good, fair, poor, damaged
  status: varchar("status").notNull().default("active"), // active, disposed, stolen, damaged
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const bankAccounts = pgTable("bank_accounts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  accountName: varchar("account_name").notNull(),
  accountNumber: varchar("account_number").notNull(),
  bankName: varchar("bank_name").notNull(),
  accountType: varchar("account_type").notNull(), // current, savings, fixed-deposit
  currency: varchar("currency").notNull().default("USD"),
  currentBalance: decimal("current_balance", { precision: 15, scale: 2 }).default("0"),
  isActive: boolean("is_active").default(true),
  signatories: text("signatories").array(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const currencies = pgTable("currencies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  currencyCode: varchar("currency_code").unique().notNull(), // USD, ZWL, ZAR, BWP
  currencyName: varchar("currency_name").notNull(),
  symbol: varchar("symbol").notNull(),
  exchangeRate: decimal("exchange_rate", { precision: 10, scale: 6 }).notNull(),
  isBaseCurrency: boolean("is_base_currency").default(false),
  isActive: boolean("is_active").default(true),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

// Payroll Management Tables
export const employees = pgTable("employees", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").unique().notNull(),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  nationalId: varchar("national_id").unique(),
  email: varchar("email").unique(),
  phone: varchar("phone"),
  address: text("address"),
  department: varchar("department").notNull(),
  position: varchar("position").notNull(),
  employmentType: varchar("employment_type").notNull(), // permanent, contract, temporary, casual
  startDate: date("start_date").notNull(),
  endDate: date("end_date"),
  basicSalary: decimal("basic_salary", { precision: 12, scale: 2 }).notNull(),
  currency: varchar("currency").notNull().default("USD"),
  bankAccount: varchar("bank_account"),
  taxNumber: varchar("tax_number"),
  status: varchar("status").notNull().default("active"), // active, inactive, suspended, terminated
  // Face scan attendance fields
  faceEmbedding: text("face_embedding"), // Stored face recognition data
  attendanceScore: decimal("attendance_score", { precision: 5, scale: 2 }).default('0.00'), // 0-100 score
  punctualityScore: decimal("punctuality_score", { precision: 5, scale: 2 }).default('0.00'), // 0-100 score
  expectedWorkHours: decimal("expected_work_hours", { precision: 5, scale: 2 }).default('8.00'), // Expected daily hours
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Face Scan Attendance Records
export const attendanceRecords = pgTable("attendance_records", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").notNull(),
  date: date("date").notNull(),
  checkInTime: timestamp("check_in_time"),
  checkOutTime: timestamp("check_out_time"),
  totalHours: decimal("total_hours", { precision: 4, scale: 2 }),
  status: varchar("status").notNull().default("present"), // present, absent, late, early-departure, partial
  faceMatchScore: decimal("face_match_score", { precision: 5, scale: 2 }), // Confidence score 0-100
  checkInLocation: varchar("check_in_location"), // GPS coordinates or office location
  checkOutLocation: varchar("check_out_location"),
  checkInImage: varchar("check_in_image"), // URL to captured face image
  checkOutImage: varchar("check_out_image"),
  notes: text("notes"),
  approvedBy: varchar("approved_by"), // For manual corrections
  isManualEntry: boolean("is_manual_entry").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Face Recognition Templates (For storing multiple face templates per employee)
export const faceTemplates = pgTable("face_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").notNull(),
  templateName: varchar("template_name").notNull(), // Primary, Secondary, etc.
  faceEmbedding: text("face_embedding").notNull(), // Base64 encoded face data
  confidence: decimal("confidence", { precision: 5, scale: 2 }).default('0.00'),
  imageUrl: varchar("image_url"), // Reference image URL
  status: varchar("status").notNull().default("active"), // active, inactive, expired
  enrolledBy: varchar("enrolled_by").notNull(),
  enrollmentDate: timestamp("enrollment_date").defaultNow(),
  lastUsed: timestamp("last_used"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Attendance Settings and Rules
export const attendanceSettings = pgTable("attendance_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  department: varchar("department"),
  workingDays: varchar("working_days").array().default(sql`ARRAY['monday','tuesday','wednesday','thursday','friday']`), // Days of work
  startTime: varchar("start_time").notNull().default("08:00"), // Work start time
  endTime: varchar("end_time").notNull().default("17:00"), // Work end time
  graceTimeMinutes: integer("grace_time_minutes").default(15), // Late arrival grace period
  minimumHours: decimal("minimum_hours", { precision: 4, scale: 2 }).default('8.00'), // Minimum daily hours
  overtimeThreshold: decimal("overtime_threshold", { precision: 4, scale: 2 }).default('8.00'), // Hours before overtime
  faceMatchThreshold: decimal("face_match_threshold", { precision: 5, scale: 2 }).default('75.00'), // Minimum match confidence
  requireCheckOut: boolean("require_check_out").default(true),
  allowManualCorrection: boolean("allow_manual_correction").default(true),
  autoClockOut: boolean("auto_clock_out").default(false), // Auto clock out at end time
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const payrollRuns = pgTable("payroll_runs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  payrollPeriod: varchar("payroll_period").notNull(), // 2024-12
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  totalEmployees: integer("total_employees").notNull(),
  totalGrossPay: decimal("total_gross_pay", { precision: 15, scale: 2 }).notNull(),
  totalDeductions: decimal("total_deductions", { precision: 15, scale: 2 }).notNull(),
  totalNetPay: decimal("total_net_pay", { precision: 15, scale: 2 }).notNull(),
  currency: varchar("currency").notNull().default("USD"),
  status: varchar("status").notNull().default("draft"), // draft, processed, approved, paid
  processedBy: varchar("processed_by"),
  approvedBy: varchar("approved_by"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const payrollItems = pgTable("payroll_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  payrollRunId: varchar("payroll_run_id").notNull(),
  employeeId: varchar("employee_id").notNull(),
  basicSalary: decimal("basic_salary", { precision: 12, scale: 2 }).notNull(),
  allowances: decimal("allowances", { precision: 12, scale: 2 }).default("0"),
  overtime: decimal("overtime", { precision: 12, scale: 2 }).default("0"),
  grossPay: decimal("gross_pay", { precision: 12, scale: 2 }).notNull(),
  taxDeduction: decimal("tax_deduction", { precision: 12, scale: 2 }).default("0"),
  pensionContribution: decimal("pension_contribution", { precision: 12, scale: 2 }).default("0"),
  medicalAid: decimal("medical_aid", { precision: 12, scale: 2 }).default("0"),
  otherDeductions: decimal("other_deductions", { precision: 12, scale: 2 }).default("0"),
  totalDeductions: decimal("total_deductions", { precision: 12, scale: 2 }).notNull(),
  netPay: decimal("net_pay", { precision: 12, scale: 2 }).notNull(),
  currency: varchar("currency").notNull().default("USD"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const leaveTypes = pgTable("leave_types", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(), // Annual Leave, Sick Leave, Maternity, Paternity
  code: varchar("code").unique().notNull(),
  maxDaysPerYear: integer("max_days_per_year"),
  carryOverAllowed: boolean("carry_over_allowed").default(false),
  isPaid: boolean("is_paid").default(true),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const leaveApplications = pgTable("leave_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").notNull(),
  leaveTypeId: varchar("leave_type_id").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  totalDays: integer("total_days").notNull(),
  reason: text("reason"),
  status: varchar("status").notNull().default("pending"), // pending, approved, rejected, cancelled
  appliedDate: timestamp("applied_date").defaultNow(),
  approvedBy: varchar("approved_by"),
  approvedDate: timestamp("approved_date"),
  remarks: text("remarks"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const performanceReviews = pgTable("performance_reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").notNull(),
  reviewPeriod: varchar("review_period").notNull(), // 2024-Q1, 2024-Annual
  reviewDate: date("review_date").notNull(),
  overallRating: varchar("overall_rating").notNull(), // excellent, good, average, needs-improvement
  goals: text("goals"),
  achievements: text("achievements"),
  areasForImprovement: text("areas_for_improvement"),
  nextReviewDate: date("next_review_date"),
  reviewedBy: varchar("reviewed_by").notNull(),
  status: varchar("status").notNull().default("draft"), // draft, completed, approved
  // Enhanced with attendance integration
  attendanceScore: decimal("attendance_score", { precision: 5, scale: 2 }).default('0.00'), // From face scan attendance
  punctualityScore: decimal("punctuality_score", { precision: 5, scale: 2 }).default('0.00'), // From attendance data
  attendanceWeight: decimal("attendance_weight", { precision: 3, scale: 2 }).default('0.30'), // 30% weight by default
  performanceWeight: decimal("performance_weight", { precision: 3, scale: 2 }).default('0.70'), // 70% weight by default
  finalScore: decimal("final_score", { precision: 5, scale: 2 }).default('0.00'), // Calculated final score
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Insert schemas for financial tables
export const insertChartOfAccountsSchema = createInsertSchema(chartOfAccounts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertGeneralLedgerSchema = createInsertSchema(generalLedger).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCashbookSchema = createInsertSchema(cashbook).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertDebtorsManagementSchema = createInsertSchema(debtorsManagement).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMunicipalInvoicesSchema = createInsertSchema(municipalInvoices).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertVoucherPaymentsSchema = createInsertSchema(voucherPayments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertReceiptsSchema = createInsertSchema(receipts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertFixedAssetsSchema = createInsertSchema(fixedAssets).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  purchasePrice: z.union([z.string(), z.number()]).transform(val => typeof val === 'string' ? parseFloat(val) : val),
  currentValue: z.union([z.string(), z.number()]).transform(val => typeof val === 'string' ? parseFloat(val) : val),
  usefulLife: z.union([z.string(), z.number()]).transform(val => typeof val === 'string' ? parseInt(val) : val),
});

export const insertBankAccountsSchema = createInsertSchema(bankAccounts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCurrenciesSchema = createInsertSchema(currencies).omit({
  id: true,
  lastUpdated: true,
});

// Insert schemas for payroll tables
export const insertEmployeesSchema = createInsertSchema(employees).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPayrollRunsSchema = createInsertSchema(payrollRuns).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPayrollItemsSchema = createInsertSchema(payrollItems).omit({
  id: true,
  createdAt: true,
});

export const insertLeaveTypesSchema = createInsertSchema(leaveTypes).omit({
  id: true,
  createdAt: true,
});

export const insertLeaveApplicationsSchema = createInsertSchema(leaveApplications).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPerformanceReviewsSchema = createInsertSchema(performanceReviews).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Financial types
export type ChartOfAccounts = typeof chartOfAccounts.$inferSelect;
export type InsertChartOfAccounts = z.infer<typeof insertChartOfAccountsSchema>;
export type GeneralLedger = typeof generalLedger.$inferSelect;
export type InsertGeneralLedger = z.infer<typeof insertGeneralLedgerSchema>;
export type Cashbook = typeof cashbook.$inferSelect;
export type InsertCashbook = z.infer<typeof insertCashbookSchema>;
export type DebtorsManagement = typeof debtorsManagement.$inferSelect;
export type InsertDebtorsManagement = z.infer<typeof insertDebtorsManagementSchema>;
export type MunicipalInvoices = typeof municipalInvoices.$inferSelect;
export type InsertMunicipalInvoices = z.infer<typeof insertMunicipalInvoicesSchema>;
export type VoucherPayments = typeof voucherPayments.$inferSelect;
export type InsertVoucherPayments = z.infer<typeof insertVoucherPaymentsSchema>;
export type Receipts = typeof receipts.$inferSelect;
export type InsertReceipts = z.infer<typeof insertReceiptsSchema>;
export type FixedAssets = typeof fixedAssets.$inferSelect;
export type InsertFixedAssets = z.infer<typeof insertFixedAssetsSchema>;
export type BankAccounts = typeof bankAccounts.$inferSelect;
export type InsertBankAccounts = z.infer<typeof insertBankAccountsSchema>;
export type Currencies = typeof currencies.$inferSelect;
export type InsertCurrencies = z.infer<typeof insertCurrenciesSchema>;

// Payroll types
export type Employees = typeof employees.$inferSelect;
export type InsertEmployees = z.infer<typeof insertEmployeesSchema>;
export type PayrollRuns = typeof payrollRuns.$inferSelect;
export type InsertPayrollRuns = z.infer<typeof insertPayrollRunsSchema>;
export type PayrollItems = typeof payrollItems.$inferSelect;
export type InsertPayrollItems = z.infer<typeof insertPayrollItemsSchema>;
export type LeaveTypes = typeof leaveTypes.$inferSelect;
export type InsertLeaveTypes = z.infer<typeof insertLeaveTypesSchema>;
export type LeaveApplications = typeof leaveApplications.$inferSelect;
export type InsertLeaveApplications = z.infer<typeof insertLeaveApplicationsSchema>;
export type PerformanceReviews = typeof performanceReviews.$inferSelect;
export type InsertPerformanceReviews = z.infer<typeof insertPerformanceReviewsSchema>;

// Face Scan Attendance Schemas
export const insertAttendanceRecordsSchema = createInsertSchema(attendanceRecords).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  date: z.union([z.string(), z.date()]).transform(val => val instanceof Date ? val.toISOString().split('T')[0] : val),
  checkInTime: z.union([z.string(), z.date()]).transform(val => val instanceof Date ? val.toISOString() : val).optional(),
  checkOutTime: z.union([z.string(), z.date()]).transform(val => val instanceof Date ? val.toISOString() : val).optional(),
});

export const insertFaceTemplatesSchema = createInsertSchema(faceTemplates).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  confidence: z.union([z.string(), z.number()]).transform(val => typeof val === 'number' ? val.toString() : val),
});

export const insertAttendanceSettingsSchema = createInsertSchema(attendanceSettings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Face Scan Attendance Types
export type AttendanceRecord = typeof attendanceRecords.$inferSelect;
export type InsertAttendanceRecord = z.infer<typeof insertAttendanceRecordsSchema>;
export type FaceTemplate = typeof faceTemplates.$inferSelect;
export type InsertFaceTemplate = z.infer<typeof insertFaceTemplatesSchema>;
export type AttendanceSettings = typeof attendanceSettings.$inferSelect;
export type InsertAttendanceSettings = z.infer<typeof insertAttendanceSettingsSchema>;

// System types
export type SystemRole = typeof systemRoles.$inferSelect;
export type InsertSystemRole = typeof systemRoles.$inferInsert;
export type RoleModuleAssignment = typeof roleModuleAssignments.$inferSelect;
export type InsertRoleModuleAssignment = typeof roleModuleAssignments.$inferInsert;
export type SystemModule = typeof systemModules.$inferSelect;
export type InsertSystemModule = typeof systemModules.$inferInsert;
export type SystemSetting = typeof systemSettings.$inferSelect;
export type InsertSystemSetting = typeof systemSettings.$inferInsert;
export type AuditLog = typeof auditLogs.$inferSelect;
export type InsertAuditLog = typeof auditLogs.$inferInsert;
export type SystemNotification = typeof systemNotifications.$inferSelect;
export type InsertSystemNotification = typeof systemNotifications.$inferInsert;
export type SystemBackup = typeof systemBackups.$inferSelect;
export type InsertSystemBackup = typeof systemBackups.$inferInsert;
