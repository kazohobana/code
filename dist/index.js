var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  assets: () => assets,
  auditLog: () => auditLog,
  bankAccounts: () => bankAccounts,
  billingRates: () => billingRates,
  bills: () => bills,
  billsRelations: () => billsRelations,
  burials: () => burials,
  burialsRelations: () => burialsRelations,
  cashbook: () => cashbook,
  cemeteries: () => cemeteries,
  chartOfAccounts: () => chartOfAccounts,
  councilMeetings: () => councilMeetings,
  currencies: () => currencies,
  customerAccounts: () => customerAccounts,
  customerAccountsRelations: () => customerAccountsRelations,
  customerComplaints: () => customerComplaints,
  customerComplaintsRelations: () => customerComplaintsRelations,
  debtorsManagement: () => debtorsManagement,
  employees: () => employees,
  facilities: () => facilities,
  facilityBookings: () => facilityBookings,
  facilityBookingsRelations: () => facilityBookingsRelations,
  fixedAssets: () => fixedAssets,
  fuelRecords: () => fuelRecords,
  fuelRecordsRelations: () => fuelRecordsRelations,
  generalLedger: () => generalLedger,
  graves: () => graves,
  gravesRelations: () => gravesRelations,
  housingApplications: () => housingApplications,
  housingApplicationsRelations: () => housingApplicationsRelations,
  housingWaitingList: () => housingWaitingList,
  housingWaitingListRelations: () => housingWaitingListRelations,
  insertAssetSchema: () => insertAssetSchema,
  insertBankAccountsSchema: () => insertBankAccountsSchema,
  insertBillSchema: () => insertBillSchema,
  insertBillingRateSchema: () => insertBillingRateSchema,
  insertBurialSchema: () => insertBurialSchema,
  insertCashbookSchema: () => insertCashbookSchema,
  insertChartOfAccountsSchema: () => insertChartOfAccountsSchema,
  insertCouncilMeetingSchema: () => insertCouncilMeetingSchema,
  insertCurrenciesSchema: () => insertCurrenciesSchema,
  insertCustomerAccountSchema: () => insertCustomerAccountSchema,
  insertCustomerComplaintSchema: () => insertCustomerComplaintSchema,
  insertDebtorsManagementSchema: () => insertDebtorsManagementSchema,
  insertEmployeesSchema: () => insertEmployeesSchema,
  insertFacilityBookingSchema: () => insertFacilityBookingSchema,
  insertFixedAssetsSchema: () => insertFixedAssetsSchema,
  insertGeneralLedgerSchema: () => insertGeneralLedgerSchema,
  insertHousingApplicationSchema: () => insertHousingApplicationSchema,
  insertLeaveApplicationsSchema: () => insertLeaveApplicationsSchema,
  insertLeaveTypesSchema: () => insertLeaveTypesSchema,
  insertMeterApplicationSchema: () => insertMeterApplicationSchema,
  insertMeterReadingSchema: () => insertMeterReadingSchema,
  insertMeterSchema: () => insertMeterSchema,
  insertMonthlyBillSchema: () => insertMonthlyBillSchema,
  insertMunicipalInvoicesSchema: () => insertMunicipalInvoicesSchema,
  insertPaymentGatewaySchema: () => insertPaymentGatewaySchema,
  insertPaymentSchema: () => insertPaymentSchema,
  insertPayrollItemsSchema: () => insertPayrollItemsSchema,
  insertPayrollRunsSchema: () => insertPayrollRunsSchema,
  insertPerformanceReviewsSchema: () => insertPerformanceReviewsSchema,
  insertPermitSchema: () => insertPermitSchema,
  insertPlanningApplicationSchema: () => insertPlanningApplicationSchema,
  insertPosTerminalSchema: () => insertPosTerminalSchema,
  insertPropertyRegistrationRequestSchema: () => insertPropertyRegistrationRequestSchema,
  insertPublicNoticeSchema: () => insertPublicNoticeSchema,
  insertPurchaseOrderSchema: () => insertPurchaseOrderSchema,
  insertReceiptsSchema: () => insertReceiptsSchema,
  insertSystemModuleSchema: () => insertSystemModuleSchema,
  insertUserSchema: () => insertUserSchema,
  insertVendorSchema: () => insertVendorSchema,
  insertVoucherPaymentsSchema: () => insertVoucherPaymentsSchema,
  insertZoneSchema: () => insertZoneSchema,
  leaveApplications: () => leaveApplications,
  leaveTypes: () => leaveTypes,
  meterApplications: () => meterApplications,
  meterReadings: () => meterReadings,
  meterReadingsRelations: () => meterReadingsRelations,
  meters: () => meters,
  metersRelations: () => metersRelations,
  monthlyBills: () => monthlyBills,
  monthlyBillsRelations: () => monthlyBillsRelations,
  municipalInvoices: () => municipalInvoices,
  paymentGateways: () => paymentGateways,
  payments: () => payments,
  paymentsRelations: () => paymentsRelations,
  payrollItems: () => payrollItems,
  payrollRuns: () => payrollRuns,
  performanceReviews: () => performanceReviews,
  permits: () => permits,
  planningApplications: () => planningApplications,
  posTerminals: () => posTerminals,
  posTerminalsRelations: () => posTerminalsRelations,
  properties: () => properties,
  propertiesRelations: () => propertiesRelations,
  propertyRegistrationRequests: () => propertyRegistrationRequests,
  publicNotices: () => publicNotices,
  purchaseOrders: () => purchaseOrders,
  purchaseOrdersRelations: () => purchaseOrdersRelations,
  receipts: () => receipts,
  reportTemplates: () => reportTemplates,
  sessions: () => sessions,
  systemModules: () => systemModules,
  systemSettings: () => systemSettings,
  userSessions: () => userSessions,
  users: () => users,
  usersRelations: () => usersRelations,
  vehicles: () => vehicles,
  vendors: () => vendors,
  vendorsRelations: () => vendorsRelations,
  voucherPayments: () => voucherPayments,
  waterConnections: () => waterConnections,
  waterConnectionsRelations: () => waterConnectionsRelations,
  zones: () => zones,
  zonesRelations: () => zonesRelations
});
import { sql } from "drizzle-orm";
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
  date
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
var sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull()
  },
  (table) => [index("IDX_session_expire").on(table.expire)]
);
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  department: varchar("department").notNull(),
  // town-clerk, chamber-secretary, engineering, health, finance, housing
  role: varchar("role").notNull().default("user"),
  // admin, manager, user
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var housingApplications = pgTable("housing_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  applicationNumber: varchar("application_number").unique().notNull(),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  nationalId: varchar("national_id").notNull(),
  phoneNumber: varchar("phone_number").notNull(),
  email: varchar("email"),
  currentAddress: text("current_address").notNull(),
  housingType: varchar("housing_type").notNull(),
  // low-cost, medium-density, high-density, commercial
  status: varchar("status").notNull().default("pending"),
  // pending, approved, rejected, allocated
  priority: varchar("priority").notNull().default("medium"),
  // high, medium, low
  applicationDate: timestamp("application_date").defaultNow(),
  reviewedBy: varchar("reviewed_by"),
  reviewDate: timestamp("review_date"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var housingWaitingList = pgTable("housing_waiting_list", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  applicationId: varchar("application_id").notNull(),
  waitingListNumber: varchar("waiting_list_number").unique().notNull(),
  position: integer("position").notNull(),
  housingType: varchar("housing_type").notNull(),
  renewalPaid: boolean("renewal_paid").default(false),
  renewalDate: timestamp("renewal_date"),
  addedDate: timestamp("added_date").defaultNow()
});
var properties = pgTable("properties", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  propertyNumber: varchar("property_number").unique().notNull(),
  standNumber: varchar("stand_number"),
  address: text("address").notNull(),
  propertyType: varchar("property_type").notNull(),
  // residential, commercial, industrial
  size: decimal("size"),
  // in square meters
  valuation: decimal("valuation", { precision: 12, scale: 2 }),
  ownerName: varchar("owner_name"),
  ownerContact: varchar("owner_contact"),
  status: varchar("status").notNull().default("active"),
  // active, vacant, allocated
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var customerComplaints = pgTable("customer_complaints", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  complaintNumber: varchar("complaint_number").unique().notNull(),
  customerName: varchar("customer_name").notNull(),
  customerContact: varchar("customer_contact").notNull(),
  customerEmail: varchar("customer_email"),
  propertyId: varchar("property_id"),
  category: varchar("category").notNull(),
  // water, sewerage, roads, refuse, other
  description: text("description").notNull(),
  status: varchar("status").notNull().default("open"),
  // open, in-progress, resolved, closed
  priority: varchar("priority").notNull().default("medium"),
  // high, medium, low
  assignedTo: varchar("assigned_to"),
  assignedDepartment: varchar("assigned_department"),
  submissionDate: timestamp("submission_date").defaultNow(),
  responseDate: timestamp("response_date"),
  resolutionDate: timestamp("resolution_date"),
  turnaroundTime: integer("turnaround_time"),
  // in hours
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var facilities = pgTable("facilities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  type: varchar("type").notNull(),
  // hall, sports-facility, venue
  capacity: integer("capacity"),
  hourlyRate: decimal("hourly_rate", { precision: 8, scale: 2 }),
  dailyRate: decimal("daily_rate", { precision: 8, scale: 2 }),
  description: text("description"),
  amenities: text("amenities").array(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var facilityBookings = pgTable("facility_bookings", {
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
  paymentStatus: varchar("payment_status").notNull().default("pending"),
  // pending, paid, partial
  status: varchar("status").notNull().default("pending"),
  // pending, confirmed, cancelled
  specialRequirements: text("special_requirements"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var cemeteries = pgTable("cemeteries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  location: varchar("location").notNull(),
  totalGraves: integer("total_graves"),
  availableGraves: integer("available_graves"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var graves = pgTable("graves", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  graveNumber: varchar("grave_number").unique().notNull(),
  cemeteryId: varchar("cemetery_id").notNull(),
  section: varchar("section"),
  graveType: varchar("grave_type").notNull(),
  // normal, casket, double
  status: varchar("status").notNull().default("available"),
  // available, reserved, occupied
  price: decimal("price", { precision: 8, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var burials = pgTable("burials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  intermentOrderNumber: varchar("interment_order_number").unique().notNull(),
  graveId: varchar("grave_id").notNull(),
  deceasedName: varchar("deceased_name").notNull(),
  deceasedAge: integer("deceased_age"),
  deceasedGender: varchar("deceased_gender"),
  // male, female, infant
  dateOfDeath: date("date_of_death"),
  burialDate: date("burial_date"),
  nextOfKinName: varchar("next_of_kin_name").notNull(),
  nextOfKinContact: varchar("next_of_kin_contact").notNull(),
  paymentStatus: varchar("payment_status").notNull().default("pending"),
  totalAmount: decimal("total_amount", { precision: 8, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var vehicles = pgTable("vehicles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  vehicleNumber: varchar("vehicle_number").unique().notNull(),
  make: varchar("make").notNull(),
  model: varchar("model").notNull(),
  year: integer("year"),
  department: varchar("department").notNull(),
  status: varchar("status").notNull().default("active"),
  // active, maintenance, retired
  mileage: integer("mileage").default(0),
  lastServiceDate: date("last_service_date"),
  nextServiceDate: date("next_service_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var fuelRecords = pgTable("fuel_records", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  vehicleId: varchar("vehicle_id").notNull(),
  date: date("date").notNull(),
  litres: decimal("litres", { precision: 8, scale: 2 }).notNull(),
  cost: decimal("cost", { precision: 8, scale: 2 }).notNull(),
  mileage: integer("mileage").notNull(),
  driver: varchar("driver"),
  createdAt: timestamp("created_at").defaultNow()
});
var waterConnections = pgTable("water_connections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  connectionNumber: varchar("connection_number").unique().notNull(),
  propertyId: varchar("property_id").notNull(),
  customerName: varchar("customer_name").notNull(),
  customerContact: varchar("customer_contact").notNull(),
  meterNumber: varchar("meter_number"),
  meterType: varchar("meter_type"),
  // prepaid, postpaid
  connectionType: varchar("connection_type").notNull(),
  // domestic, commercial, industrial
  status: varchar("status").notNull().default("active"),
  // active, disconnected, suspended
  connectionDate: date("connection_date"),
  lastReadingDate: date("last_reading_date"),
  lastReading: decimal("last_reading", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var meterApplications = pgTable("meter_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  applicationNumber: varchar("application_number").unique().notNull(),
  applicantName: varchar("applicant_name").notNull(),
  nationalId: varchar("national_id").notNull(),
  phoneNumber: varchar("phone_number").notNull(),
  email: varchar("email").notNull(),
  propertyAddress: text("property_address").notNull(),
  propertyType: varchar("property_type").notNull(),
  // residential, commercial, industrial, institutional
  connectionType: varchar("connection_type").notNull(),
  // new, replacement, upgrade
  meterSize: varchar("meter_size").notNull(),
  // 15mm, 20mm, 25mm, 40mm, 50mm
  estimatedUsage: varchar("estimated_usage").notNull(),
  plotNumber: varchar("plot_number").notNull(),
  standNumber: varchar("stand_number").notNull(),
  ward: varchar("ward").notNull(),
  specialRequirements: text("special_requirements"),
  status: varchar("status").notNull().default("pending"),
  // pending, approved, rejected, installed
  applicationDate: timestamp("application_date").defaultNow(),
  reviewedBy: varchar("reviewed_by"),
  reviewDate: timestamp("review_date"),
  installationDate: timestamp("installation_date"),
  meterNumber: varchar("meter_number"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var permits = pgTable("permits", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  permitNumber: varchar("permit_number").unique().notNull(),
  permitType: varchar("permit_type").notNull(),
  // business, building, event, street-trading
  applicantName: varchar("applicant_name").notNull(),
  applicantContact: varchar("applicant_contact").notNull(),
  businessName: varchar("business_name"),
  propertyAddress: text("property_address").notNull(),
  description: text("description").notNull(),
  status: varchar("status").notNull().default("pending"),
  // pending, approved, rejected, expired
  applicationDate: timestamp("application_date").defaultNow(),
  approvalDate: timestamp("approval_date"),
  expiryDate: date("expiry_date"),
  fee: decimal("fee", { precision: 8, scale: 2 }),
  paymentStatus: varchar("payment_status").notNull().default("pending"),
  // pending, paid, overdue
  reviewedBy: varchar("reviewed_by"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var bills = pgTable("bills", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  billNumber: varchar("bill_number").unique().notNull(),
  customerName: varchar("customer_name").notNull(),
  customerContact: varchar("customer_contact").notNull(),
  propertyId: varchar("property_id"),
  billType: varchar("bill_type").notNull(),
  // rates, water, refuse, permits
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  billingPeriod: varchar("billing_period").notNull(),
  // 2024-01, 2024-02, etc.
  dueDate: date("due_date").notNull(),
  paidDate: date("paid_date"),
  status: varchar("status").notNull().default("outstanding"),
  // outstanding, paid, overdue
  paymentMethod: varchar("payment_method"),
  // cash, card, mobile-money, bank-transfer
  referenceNumber: varchar("reference_number"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var planningApplications = pgTable("planning_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  applicationNumber: varchar("application_number").unique().notNull(),
  applicantName: varchar("applicant_name").notNull(),
  applicantContact: varchar("applicant_contact").notNull(),
  propertyAddress: text("property_address").notNull(),
  applicationType: varchar("application_type").notNull(),
  // building-plan, subdivision, rezoning, change-of-use
  description: text("description").notNull(),
  status: varchar("status").notNull().default("pending"),
  // pending, under-review, approved, rejected
  submissionDate: timestamp("submission_date").defaultNow(),
  reviewDate: timestamp("review_date"),
  approvalDate: timestamp("approval_date"),
  planNumber: varchar("plan_number"),
  fee: decimal("fee", { precision: 8, scale: 2 }),
  paymentStatus: varchar("payment_status").notNull().default("pending"),
  reviewedBy: varchar("reviewed_by"),
  comments: text("comments"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var assets = pgTable("assets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  assetNumber: varchar("asset_number").unique().notNull(),
  name: varchar("name").notNull(),
  category: varchar("category").notNull(),
  // infrastructure, equipment, property, vehicle
  subCategory: varchar("sub_category"),
  // bridge, computer, office-building, truck
  description: text("description"),
  location: varchar("location"),
  department: varchar("department").notNull(),
  purchaseDate: date("purchase_date"),
  purchaseValue: decimal("purchase_value", { precision: 12, scale: 2 }),
  currentValue: decimal("current_value", { precision: 12, scale: 2 }),
  condition: varchar("condition").notNull().default("good"),
  // excellent, good, fair, poor
  status: varchar("status").notNull().default("active"),
  // active, maintenance, disposed
  lastInspectionDate: date("last_inspection_date"),
  nextInspectionDate: date("next_inspection_date"),
  warrantyExpiry: date("warranty_expiry"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var vendors = pgTable("vendors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  vendorNumber: varchar("vendor_number").unique().notNull(),
  companyName: varchar("company_name").notNull(),
  contactPerson: varchar("contact_person").notNull(),
  email: varchar("email").notNull(),
  phoneNumber: varchar("phone_number").notNull(),
  address: text("address").notNull(),
  taxNumber: varchar("tax_number"),
  registrationNumber: varchar("registration_number"),
  category: varchar("category").notNull(),
  // construction, supplies, services, consulting
  status: varchar("status").notNull().default("active"),
  // active, suspended, blacklisted
  rating: integer("rating").default(3),
  // 1-5 star rating
  bankName: varchar("bank_name"),
  accountNumber: varchar("account_number"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var purchaseOrders = pgTable("purchase_orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderNumber: varchar("order_number").unique().notNull(),
  vendorId: varchar("vendor_id").notNull(),
  department: varchar("department").notNull(),
  description: text("description").notNull(),
  totalAmount: decimal("total_amount", { precision: 12, scale: 2 }).notNull(),
  status: varchar("status").notNull().default("pending"),
  // pending, approved, delivered, cancelled
  requestedBy: varchar("requested_by").notNull(),
  approvedBy: varchar("approved_by"),
  deliveryDate: date("delivery_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var meters = pgTable("meters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  meterNumber: varchar("meter_number").unique().notNull(),
  meterType: varchar("meter_type").notNull(),
  // water, electricity, gas
  propertyId: varchar("property_id").notNull(),
  serialNumber: varchar("serial_number").unique(),
  manufacturer: varchar("manufacturer"),
  installationDate: date("installation_date"),
  lastMaintenanceDate: date("last_maintenance_date"),
  status: varchar("status").notNull().default("active"),
  // active, faulty, disconnected, removed
  multiplier: decimal("multiplier", { precision: 5, scale: 2 }).default("1.00"),
  createdBy: varchar("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var meterReadings = pgTable("meter_readings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  meterId: varchar("meter_id").notNull(),
  readingValue: decimal("reading_value", { precision: 12, scale: 2 }).notNull(),
  previousReading: decimal("previous_reading", { precision: 12, scale: 2 }),
  consumption: decimal("consumption", { precision: 12, scale: 2 }),
  readingDate: timestamp("reading_date").notNull(),
  readBy: varchar("read_by").notNull(),
  // meter reader user ID
  billingPeriod: varchar("billing_period").notNull(),
  // YYYY-MM format
  notes: text("notes"),
  imageUrl: varchar("image_url"),
  // photo of meter reading
  coordinates: varchar("coordinates"),
  // GPS coordinates
  status: varchar("status").notNull().default("active"),
  // active, corrected, disputed
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var propertyRegistrationRequests = pgTable("property_registration_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  requestNumber: varchar("request_number").unique().notNull(),
  propertyAddress: text("property_address").notNull(),
  ownerName: varchar("owner_name"),
  ownerContact: varchar("owner_contact"),
  propertyType: varchar("property_type").notNull(),
  // residential, commercial, industrial
  meterNumber: varchar("meter_number"),
  meterType: varchar("meter_type"),
  // water, electricity
  coordinates: varchar("coordinates"),
  requestedBy: varchar("requested_by").notNull(),
  // meter reader user ID
  status: varchar("status").notNull().default("pending"),
  // pending, approved, rejected
  adminNotes: text("admin_notes"),
  approvedBy: varchar("approved_by"),
  approvedAt: timestamp("approved_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var systemModules = pgTable("system_modules", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  moduleName: varchar("module_name").unique().notNull(),
  displayName: varchar("display_name").notNull(),
  description: text("description"),
  isEnabled: boolean("is_enabled").default(true),
  canRegisterProperties: boolean("can_register_properties").default(false),
  // for meter readers
  lastModifiedBy: varchar("last_modified_by"),
  lastModifiedAt: timestamp("last_modified_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow()
});
var systemSettings = pgTable("system_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  settingKey: varchar("setting_key").unique().notNull(),
  settingValue: text("setting_value"),
  settingType: varchar("setting_type").notNull(),
  // string, number, boolean, json
  description: text("description"),
  category: varchar("category").notNull(),
  // billing, payments, general, security
  lastModifiedBy: varchar("last_modified_by"),
  lastModifiedAt: timestamp("last_modified_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow()
});
var billingRates = pgTable("billing_rates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  rateType: varchar("rate_type").notNull(),
  // water, electricity, property-rates, refuse, sewerage
  category: varchar("category").notNull(),
  // domestic, commercial, industrial
  tierMin: decimal("tier_min", { precision: 8, scale: 2 }),
  // for tiered billing
  tierMax: decimal("tier_max", { precision: 8, scale: 2 }),
  rate: decimal("rate", { precision: 8, scale: 4 }).notNull(),
  // rate per unit
  fixedCharge: decimal("fixed_charge", { precision: 8, scale: 2 }),
  // monthly fixed charge
  effectiveDate: date("effective_date").notNull(),
  expiryDate: date("expiry_date"),
  isActive: boolean("is_active").default(true),
  createdBy: varchar("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var customerAccounts = pgTable("customer_accounts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  accountNumber: varchar("account_number").unique().notNull(),
  customerName: varchar("customer_name").notNull(),
  customerEmail: varchar("customer_email"),
  customerPhone: varchar("customer_phone").notNull(),
  nationalId: varchar("national_id"),
  propertyId: varchar("property_id").notNull(),
  accountType: varchar("account_type").notNull(),
  // individual, business, government
  billingAddress: text("billing_address"),
  currentBalance: decimal("current_balance", { precision: 12, scale: 2 }).default("0.00"),
  creditLimit: decimal("credit_limit", { precision: 12, scale: 2 }).default("0.00"),
  status: varchar("status").notNull().default("active"),
  // active, suspended, closed
  paymentTerms: integer("payment_terms").default(30),
  // days
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var monthlyBills = pgTable("monthly_bills", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  billNumber: varchar("bill_number").unique().notNull(),
  accountId: varchar("account_id").notNull(),
  billingPeriod: varchar("billing_period").notNull(),
  // YYYY-MM
  dueDate: date("due_date").notNull(),
  // Service charges
  waterCharges: decimal("water_charges", { precision: 10, scale: 2 }).default("0.00"),
  electricityCharges: decimal("electricity_charges", { precision: 10, scale: 2 }).default("0.00"),
  propertyRates: decimal("property_rates", { precision: 10, scale: 2 }).default("0.00"),
  refuseCharges: decimal("refuse_charges", { precision: 10, scale: 2 }).default("0.00"),
  sewerageCharges: decimal("sewerage_charges", { precision: 10, scale: 2 }).default("0.00"),
  totalAmount: decimal("total_amount", { precision: 12, scale: 2 }).notNull(),
  amountPaid: decimal("amount_paid", { precision: 12, scale: 2 }).default("0.00"),
  balance: decimal("balance", { precision: 12, scale: 2 }).notNull(),
  status: varchar("status").notNull().default("unpaid"),
  // unpaid, partial, paid, overdue
  generatedBy: varchar("generated_by").notNull(),
  generatedAt: timestamp("generated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var zones = pgTable("zones", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  zoneName: varchar("zone_name").unique().notNull(),
  zoneCode: varchar("zone_code").unique().notNull(),
  description: text("description"),
  manager: varchar("manager"),
  // user ID
  address: text("address"),
  contactNumber: varchar("contact_number"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var posTerminals = pgTable("pos_terminals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  terminalId: varchar("terminal_id").unique().notNull(),
  terminalName: varchar("terminal_name").notNull(),
  zoneId: varchar("zone_id").notNull(),
  operatorId: varchar("operator_id").notNull(),
  // user ID
  status: varchar("status").notNull().default("active"),
  // active, inactive, maintenance
  lastTransactionDate: timestamp("last_transaction_date"),
  dailyLimit: decimal("daily_limit", { precision: 12, scale: 2 }),
  currentDayTotal: decimal("current_day_total", { precision: 12, scale: 2 }).default("0.00"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var payments = pgTable("payments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  paymentNumber: varchar("payment_number").unique().notNull(),
  accountId: varchar("account_id").notNull(),
  billId: varchar("bill_id"),
  // reference to monthly_bills
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  paymentMethod: varchar("payment_method").notNull(),
  // cash, card, mobile-money, paynow, payfast
  paymentGateway: varchar("payment_gateway"),
  // paynow, payfast, bank
  transactionReference: varchar("transaction_reference"),
  receiptNumber: varchar("receipt_number").unique(),
  // Location and operator info
  zoneId: varchar("zone_id"),
  posTerminalId: varchar("pos_terminal_id"),
  operatorId: varchar("operator_id").notNull(),
  // user who processed payment
  paymentDate: timestamp("payment_date").defaultNow(),
  status: varchar("status").notNull().default("completed"),
  // pending, completed, failed, refunded
  // For online payments
  gatewayResponse: jsonb("gateway_response"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var auditLog = pgTable("audit_log", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tableName: varchar("table_name").notNull(),
  recordId: varchar("record_id").notNull(),
  action: varchar("action").notNull(),
  // INSERT, UPDATE, DELETE
  oldValues: jsonb("old_values"),
  // previous data before change
  newValues: jsonb("new_values"),
  // new data after change
  changedFields: text("changed_fields").array(),
  // list of fields that changed
  userId: varchar("user_id").notNull(),
  // who made the change
  userName: varchar("user_name").notNull(),
  userDepartment: varchar("user_department"),
  ipAddress: varchar("ip_address"),
  userAgent: varchar("user_agent"),
  sessionId: varchar("session_id"),
  module: varchar("module").notNull(),
  // which module/page the change was made from
  description: text("description"),
  // human readable description of change
  timestamp: timestamp("timestamp").defaultNow()
});
var userSessions = pgTable("user_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  sessionToken: varchar("session_token").unique().notNull(),
  loginTime: timestamp("login_time").defaultNow(),
  logoutTime: timestamp("logout_time"),
  ipAddress: varchar("ip_address"),
  userAgent: varchar("user_agent"),
  isActive: boolean("is_active").default(true),
  lastActivity: timestamp("last_activity").defaultNow()
});
var paymentGateways = pgTable("payment_gateways", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  gatewayName: varchar("gateway_name").unique().notNull(),
  // paynow, payfast
  displayName: varchar("display_name").notNull(),
  isEnabled: boolean("is_enabled").default(false),
  apiEndpoint: varchar("api_endpoint"),
  merchantId: varchar("merchant_id"),
  integrationKey: varchar("integration_key"),
  passphrase: varchar("passphrase"),
  testMode: boolean("test_mode").default(true),
  supportedMethods: text("supported_methods").array(),
  // ["card", "mobile-money", "bank-transfer"]
  fees: jsonb("fees"),
  // fee structure
  lastModifiedBy: varchar("last_modified_by"),
  lastModifiedAt: timestamp("last_modified_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow()
});
var reportTemplates = pgTable("report_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  templateName: varchar("template_name").unique().notNull(),
  displayName: varchar("display_name").notNull(),
  description: text("description"),
  category: varchar("category").notNull(),
  // financial, operational, compliance
  sqlQuery: text("sql_query"),
  parameters: jsonb("parameters"),
  // report parameters
  chartConfig: jsonb("chart_config"),
  // chart configuration
  accessRoles: text("access_roles").array(),
  // who can access this report
  isActive: boolean("is_active").default(true),
  createdBy: varchar("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var usersRelations = relations(users, ({ many }) => ({
  auditLogs: many(auditLog),
  payments: many(payments),
  meterReadings: many(meterReadings)
}));
var propertiesRelations = relations(properties, ({ many, one }) => ({
  meters: many(meters),
  customerAccount: one(customerAccounts),
  complaints: many(customerComplaints)
}));
var metersRelations = relations(meters, ({ one, many }) => ({
  property: one(properties, {
    fields: [meters.propertyId],
    references: [properties.id]
  }),
  readings: many(meterReadings)
}));
var meterReadingsRelations = relations(meterReadings, ({ one }) => ({
  meter: one(meters, {
    fields: [meterReadings.meterId],
    references: [meters.id]
  }),
  reader: one(users, {
    fields: [meterReadings.readBy],
    references: [users.id]
  })
}));
var customerAccountsRelations = relations(customerAccounts, ({ one, many }) => ({
  property: one(properties, {
    fields: [customerAccounts.propertyId],
    references: [properties.id]
  }),
  bills: many(monthlyBills),
  payments: many(payments)
}));
var monthlyBillsRelations = relations(monthlyBills, ({ one, many }) => ({
  account: one(customerAccounts, {
    fields: [monthlyBills.accountId],
    references: [customerAccounts.id]
  }),
  payments: many(payments)
}));
var paymentsRelations = relations(payments, ({ one }) => ({
  account: one(customerAccounts, {
    fields: [payments.accountId],
    references: [customerAccounts.id]
  }),
  bill: one(monthlyBills, {
    fields: [payments.billId],
    references: [monthlyBills.id]
  }),
  operator: one(users, {
    fields: [payments.operatorId],
    references: [users.id]
  }),
  zone: one(zones, {
    fields: [payments.zoneId],
    references: [zones.id]
  }),
  posTerminal: one(posTerminals, {
    fields: [payments.posTerminalId],
    references: [posTerminals.id]
  })
}));
var zonesRelations = relations(zones, ({ many }) => ({
  posTerminals: many(posTerminals),
  payments: many(payments)
}));
var posTerminalsRelations = relations(posTerminals, ({ one, many }) => ({
  zone: one(zones, {
    fields: [posTerminals.zoneId],
    references: [zones.id]
  }),
  operator: one(users, {
    fields: [posTerminals.operatorId],
    references: [users.id]
  }),
  payments: many(payments)
}));
var insertMeterSchema = createInsertSchema(meters).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertMeterReadingSchema = createInsertSchema(meterReadings).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertPropertyRegistrationRequestSchema = createInsertSchema(propertyRegistrationRequests).omit({
  id: true,
  requestNumber: true,
  createdAt: true,
  updatedAt: true
});
var insertCustomerAccountSchema = createInsertSchema(customerAccounts).omit({
  id: true,
  accountNumber: true,
  createdAt: true,
  updatedAt: true
});
var insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  paymentNumber: true,
  receiptNumber: true,
  createdAt: true,
  updatedAt: true
});
var insertMonthlyBillSchema = createInsertSchema(monthlyBills).omit({
  id: true,
  billNumber: true,
  generatedAt: true,
  createdAt: true,
  updatedAt: true
});
var insertSystemModuleSchema = createInsertSchema(systemModules).omit({
  id: true,
  lastModifiedAt: true,
  createdAt: true
});
var insertBillingRateSchema = createInsertSchema(billingRates).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertZoneSchema = createInsertSchema(zones).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertPosTerminalSchema = createInsertSchema(posTerminals).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertPaymentGatewaySchema = createInsertSchema(paymentGateways).omit({
  id: true,
  lastModifiedAt: true,
  createdAt: true
});
var councilMeetings = pgTable("council_meetings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  meetingNumber: varchar("meeting_number").unique().notNull(),
  title: varchar("title").notNull(),
  meetingType: varchar("meeting_type").notNull(),
  // ordinary, special, committee
  date: timestamp("date").notNull(),
  venue: varchar("venue").notNull(),
  status: varchar("status").notNull().default("scheduled"),
  // scheduled, in-progress, completed, cancelled
  agenda: text("agenda").array(),
  attendees: text("attendees").array(),
  chairperson: varchar("chairperson"),
  secretary: varchar("secretary"),
  minutes: text("minutes"),
  resolutions: text("resolutions").array(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var publicNotices = pgTable("public_notices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  noticeNumber: varchar("notice_number").unique().notNull(),
  title: varchar("title").notNull(),
  content: text("content").notNull(),
  category: varchar("category").notNull(),
  // tender, public-hearing, general, emergency
  status: varchar("status").notNull().default("active"),
  // active, expired, cancelled
  publishDate: timestamp("publish_date").defaultNow(),
  expiryDate: date("expiry_date"),
  publishedBy: varchar("published_by").notNull(),
  priority: varchar("priority").notNull().default("normal"),
  // high, normal, low
  attachments: text("attachments").array(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var housingApplicationsRelations = relations(housingApplications, ({ one }) => ({
  waitingListEntry: one(housingWaitingList, {
    fields: [housingApplications.id],
    references: [housingWaitingList.applicationId]
  })
}));
var housingWaitingListRelations = relations(housingWaitingList, ({ one }) => ({
  application: one(housingApplications, {
    fields: [housingWaitingList.applicationId],
    references: [housingApplications.id]
  })
}));
var customerComplaintsRelations = relations(customerComplaints, ({ one }) => ({
  property: one(properties, {
    fields: [customerComplaints.propertyId],
    references: [properties.id]
  })
}));
var facilityBookingsRelations = relations(facilityBookings, ({ one }) => ({
  facility: one(facilities, {
    fields: [facilityBookings.facilityId],
    references: [facilities.id]
  })
}));
var gravesRelations = relations(graves, ({ one, many }) => ({
  cemetery: one(cemeteries, {
    fields: [graves.cemeteryId],
    references: [cemeteries.id]
  }),
  burials: many(burials)
}));
var burialsRelations = relations(burials, ({ one }) => ({
  grave: one(graves, {
    fields: [burials.graveId],
    references: [graves.id]
  })
}));
var fuelRecordsRelations = relations(fuelRecords, ({ one }) => ({
  vehicle: one(vehicles, {
    fields: [fuelRecords.vehicleId],
    references: [vehicles.id]
  })
}));
var waterConnectionsRelations = relations(waterConnections, ({ one }) => ({
  property: one(properties, {
    fields: [waterConnections.propertyId],
    references: [properties.id]
  })
}));
var billsRelations = relations(bills, ({ one }) => ({
  property: one(properties, {
    fields: [bills.propertyId],
    references: [properties.id]
  })
}));
var vendorsRelations = relations(vendors, ({ many }) => ({
  purchaseOrders: many(purchaseOrders)
}));
var purchaseOrdersRelations = relations(purchaseOrders, ({ one }) => ({
  vendor: one(vendors, {
    fields: [purchaseOrders.vendorId],
    references: [vendors.id]
  })
}));
var insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertHousingApplicationSchema = createInsertSchema(housingApplications).omit({
  id: true,
  applicationNumber: true,
  createdAt: true,
  updatedAt: true
});
var insertCustomerComplaintSchema = createInsertSchema(customerComplaints).omit({
  id: true,
  complaintNumber: true,
  createdAt: true,
  updatedAt: true
});
var insertFacilityBookingSchema = createInsertSchema(facilityBookings).omit({
  id: true,
  bookingNumber: true,
  createdAt: true,
  updatedAt: true
});
var insertBurialSchema = createInsertSchema(burials).omit({
  id: true,
  intermentOrderNumber: true,
  createdAt: true,
  updatedAt: true
});
var insertPermitSchema = createInsertSchema(permits).omit({
  id: true,
  permitNumber: true,
  createdAt: true,
  updatedAt: true
});
var insertBillSchema = createInsertSchema(bills).omit({
  id: true,
  billNumber: true,
  createdAt: true,
  updatedAt: true
});
var insertPlanningApplicationSchema = createInsertSchema(planningApplications).omit({
  id: true,
  applicationNumber: true,
  createdAt: true,
  updatedAt: true
});
var insertAssetSchema = createInsertSchema(assets).omit({
  id: true,
  assetNumber: true,
  createdAt: true,
  updatedAt: true
});
var insertVendorSchema = createInsertSchema(vendors).omit({
  id: true,
  vendorNumber: true,
  createdAt: true,
  updatedAt: true
});
var insertPurchaseOrderSchema = createInsertSchema(purchaseOrders).omit({
  id: true,
  orderNumber: true,
  createdAt: true,
  updatedAt: true
});
var insertCouncilMeetingSchema = createInsertSchema(councilMeetings).omit({
  id: true,
  meetingNumber: true,
  createdAt: true,
  updatedAt: true
});
var insertPublicNoticeSchema = createInsertSchema(publicNotices).omit({
  id: true,
  noticeNumber: true,
  createdAt: true,
  updatedAt: true
});
var insertMeterApplicationSchema = createInsertSchema(meterApplications).omit({
  id: true,
  applicationNumber: true,
  createdAt: true,
  updatedAt: true
});
var chartOfAccounts = pgTable("chart_of_accounts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  accountCode: varchar("account_code").unique().notNull(),
  accountName: varchar("account_name").notNull(),
  accountType: varchar("account_type").notNull(),
  // asset, liability, equity, revenue, expense
  parentAccountId: varchar("parent_account_id"),
  isActive: boolean("is_active").default(true),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var generalLedger = pgTable("general_ledger", {
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
  status: varchar("status").notNull().default("pending"),
  // pending, approved, rejected
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var cashbook = pgTable("cashbook", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  transactionDate: date("transaction_date").notNull(),
  description: text("description").notNull(),
  reference: varchar("reference"),
  transactionType: varchar("transaction_type").notNull(),
  // receipt, payment
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  currency: varchar("currency").notNull().default("USD"),
  bankAccount: varchar("bank_account"),
  paymentMethod: varchar("payment_method"),
  // cash, cheque, eft, mobile
  payeePayor: varchar("payee_payor"),
  category: varchar("category"),
  status: varchar("status").notNull().default("cleared"),
  // cleared, pending, cancelled
  createdBy: varchar("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var debtorsManagement = pgTable("debtors_management", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  debtorCode: varchar("debtor_code").unique().notNull(),
  debtorName: varchar("debtor_name").notNull(),
  debtorType: varchar("debtor_type").notNull(),
  // individual, business, government
  contactPerson: varchar("contact_person"),
  phone: varchar("phone"),
  email: varchar("email"),
  address: text("address"),
  creditLimit: decimal("credit_limit", { precision: 15, scale: 2 }),
  currentBalance: decimal("current_balance", { precision: 15, scale: 2 }).default("0"),
  overdueDays: integer("overdue_days").default(0),
  status: varchar("status").notNull().default("active"),
  // active, inactive, blocked
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var municipalInvoices = pgTable("municipal_invoices", {
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
  status: varchar("status").notNull().default("pending"),
  // pending, partial, paid, overdue, cancelled
  createdBy: varchar("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var voucherPayments = pgTable("voucher_payments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  voucherNumber: varchar("voucher_number").unique().notNull(),
  payeeId: varchar("payee_id"),
  payeeName: varchar("payee_name").notNull(),
  paymentDate: date("payment_date").notNull(),
  description: text("description").notNull(),
  totalAmount: decimal("total_amount", { precision: 15, scale: 2 }).notNull(),
  currency: varchar("currency").notNull().default("USD"),
  paymentMethod: varchar("payment_method").notNull(),
  // cheque, eft, cash, mobile
  bankAccount: varchar("bank_account"),
  status: varchar("status").notNull().default("pending"),
  // pending, approved, paid, cancelled
  approvedBy: varchar("approved_by"),
  createdBy: varchar("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var receipts = pgTable("receipts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  receiptNumber: varchar("receipt_number").unique().notNull(),
  payerName: varchar("payer_name").notNull(),
  payerContact: varchar("payer_contact"),
  receiptDate: date("receipt_date").notNull(),
  description: text("description").notNull(),
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  currency: varchar("currency").notNull().default("USD"),
  paymentMethod: varchar("payment_method").notNull(),
  invoiceId: varchar("invoice_id"),
  // if paying against an invoice
  category: varchar("category").notNull(),
  // rates, water, licenses, fines, other
  createdBy: varchar("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var fixedAssets = pgTable("fixed_assets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  assetCode: varchar("asset_code").unique().notNull(),
  assetName: varchar("asset_name").notNull(),
  category: varchar("category").notNull(),
  // building, vehicle, equipment, furniture, land
  location: varchar("location"),
  purchaseDate: date("purchase_date"),
  purchaseCost: decimal("purchase_cost", { precision: 15, scale: 2 }),
  currentValue: decimal("current_value", { precision: 15, scale: 2 }),
  depreciationMethod: varchar("depreciation_method"),
  // straight-line, reducing-balance
  depreciationRate: decimal("depreciation_rate", { precision: 5, scale: 2 }),
  usefulLife: integer("useful_life"),
  // in years
  condition: varchar("condition").default("good"),
  // excellent, good, fair, poor, damaged
  status: varchar("status").notNull().default("active"),
  // active, disposed, stolen, damaged
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var bankAccounts = pgTable("bank_accounts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  accountName: varchar("account_name").notNull(),
  accountNumber: varchar("account_number").notNull(),
  bankName: varchar("bank_name").notNull(),
  accountType: varchar("account_type").notNull(),
  // current, savings, fixed-deposit
  currency: varchar("currency").notNull().default("USD"),
  currentBalance: decimal("current_balance", { precision: 15, scale: 2 }).default("0"),
  isActive: boolean("is_active").default(true),
  signatories: text("signatories").array(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var currencies = pgTable("currencies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  currencyCode: varchar("currency_code").unique().notNull(),
  // USD, ZWL, ZAR, BWP
  currencyName: varchar("currency_name").notNull(),
  symbol: varchar("symbol").notNull(),
  exchangeRate: decimal("exchange_rate", { precision: 10, scale: 6 }).notNull(),
  isBaseCurrency: boolean("is_base_currency").default(false),
  isActive: boolean("is_active").default(true),
  lastUpdated: timestamp("last_updated").defaultNow()
});
var employees = pgTable("employees", {
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
  employmentType: varchar("employment_type").notNull(),
  // permanent, contract, temporary, casual
  startDate: date("start_date").notNull(),
  endDate: date("end_date"),
  basicSalary: decimal("basic_salary", { precision: 12, scale: 2 }).notNull(),
  currency: varchar("currency").notNull().default("USD"),
  bankAccount: varchar("bank_account"),
  taxNumber: varchar("tax_number"),
  status: varchar("status").notNull().default("active"),
  // active, inactive, suspended, terminated
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var payrollRuns = pgTable("payroll_runs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  payrollPeriod: varchar("payroll_period").notNull(),
  // 2024-12
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  totalEmployees: integer("total_employees").notNull(),
  totalGrossPay: decimal("total_gross_pay", { precision: 15, scale: 2 }).notNull(),
  totalDeductions: decimal("total_deductions", { precision: 15, scale: 2 }).notNull(),
  totalNetPay: decimal("total_net_pay", { precision: 15, scale: 2 }).notNull(),
  currency: varchar("currency").notNull().default("USD"),
  status: varchar("status").notNull().default("draft"),
  // draft, processed, approved, paid
  processedBy: varchar("processed_by"),
  approvedBy: varchar("approved_by"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var payrollItems = pgTable("payroll_items", {
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
  createdAt: timestamp("created_at").defaultNow()
});
var leaveTypes = pgTable("leave_types", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  // Annual Leave, Sick Leave, Maternity, Paternity
  code: varchar("code").unique().notNull(),
  maxDaysPerYear: integer("max_days_per_year"),
  carryOverAllowed: boolean("carry_over_allowed").default(false),
  isPaid: boolean("is_paid").default(true),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow()
});
var leaveApplications = pgTable("leave_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").notNull(),
  leaveTypeId: varchar("leave_type_id").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  totalDays: integer("total_days").notNull(),
  reason: text("reason"),
  status: varchar("status").notNull().default("pending"),
  // pending, approved, rejected, cancelled
  appliedDate: timestamp("applied_date").defaultNow(),
  approvedBy: varchar("approved_by"),
  approvedDate: timestamp("approved_date"),
  remarks: text("remarks"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var performanceReviews = pgTable("performance_reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").notNull(),
  reviewPeriod: varchar("review_period").notNull(),
  // 2024-Q1, 2024-Annual
  reviewDate: date("review_date").notNull(),
  overallRating: varchar("overall_rating").notNull(),
  // excellent, good, average, needs-improvement
  goals: text("goals"),
  achievements: text("achievements"),
  areasForImprovement: text("areas_for_improvement"),
  nextReviewDate: date("next_review_date"),
  reviewedBy: varchar("reviewed_by").notNull(),
  status: varchar("status").notNull().default("draft"),
  // draft, completed, approved
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var insertChartOfAccountsSchema = createInsertSchema(chartOfAccounts).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertGeneralLedgerSchema = createInsertSchema(generalLedger).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertCashbookSchema = createInsertSchema(cashbook).omit({
  id: true,
  createdAt: true
});
var insertDebtorsManagementSchema = createInsertSchema(debtorsManagement).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertMunicipalInvoicesSchema = createInsertSchema(municipalInvoices).omit({
  id: true,
  invoiceNumber: true,
  createdAt: true,
  updatedAt: true
});
var insertVoucherPaymentsSchema = createInsertSchema(voucherPayments).omit({
  id: true,
  voucherNumber: true,
  createdAt: true,
  updatedAt: true
});
var insertReceiptsSchema = createInsertSchema(receipts).omit({
  id: true,
  receiptNumber: true,
  createdAt: true
});
var insertFixedAssetsSchema = createInsertSchema(fixedAssets).omit({
  id: true,
  assetCode: true,
  createdAt: true,
  updatedAt: true
});
var insertBankAccountsSchema = createInsertSchema(bankAccounts).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertCurrenciesSchema = createInsertSchema(currencies).omit({
  id: true,
  lastUpdated: true
});
var insertEmployeesSchema = createInsertSchema(employees).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertPayrollRunsSchema = createInsertSchema(payrollRuns).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertPayrollItemsSchema = createInsertSchema(payrollItems).omit({
  id: true,
  createdAt: true
});
var insertLeaveTypesSchema = createInsertSchema(leaveTypes).omit({
  id: true,
  createdAt: true
});
var insertLeaveApplicationsSchema = createInsertSchema(leaveApplications).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertPerformanceReviewsSchema = createInsertSchema(performanceReviews).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq, desc, asc, count, and, ilike, gte, lte } from "drizzle-orm";
var DatabaseStorage = class {
  // User operations
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  async upsertUser(userData) {
    const [user] = await db.insert(users).values(userData).onConflictDoUpdate({
      target: users.id,
      set: {
        ...userData,
        updatedAt: /* @__PURE__ */ new Date()
      }
    }).returning();
    return user;
  }
  async getUsersByDepartment(department) {
    return await db.select().from(users).where(eq(users.department, department));
  }
  async updateUserStatus(id, isActive) {
    await db.update(users).set({ isActive, updatedAt: /* @__PURE__ */ new Date() }).where(eq(users.id, id));
  }
  // Housing Management
  async createHousingApplication(application) {
    const applicationNumber = `HA-${(/* @__PURE__ */ new Date()).getFullYear()}-${String(Date.now()).slice(-6)}`;
    const [result] = await db.insert(housingApplications).values({ ...application, applicationNumber }).returning();
    return result;
  }
  async getHousingApplications(limit = 50, offset = 0) {
    return await db.select().from(housingApplications).orderBy(desc(housingApplications.applicationDate)).limit(limit).offset(offset);
  }
  async getHousingApplicationById(id) {
    const [application] = await db.select().from(housingApplications).where(eq(housingApplications.id, id));
    return application;
  }
  async updateHousingApplicationStatus(id, status, reviewedBy) {
    await db.update(housingApplications).set({
      status,
      reviewedBy,
      reviewDate: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(housingApplications.id, id));
  }
  async getHousingApplicationsByStatus(status) {
    return await db.select().from(housingApplications).where(eq(housingApplications.status, status)).orderBy(desc(housingApplications.applicationDate));
  }
  // Customer Service
  async createCustomerComplaint(complaint) {
    const complaintNumber = `CMP-${(/* @__PURE__ */ new Date()).getFullYear()}-${String(Date.now()).slice(-6)}`;
    const [result] = await db.insert(customerComplaints).values({ ...complaint, complaintNumber }).returning();
    return result;
  }
  async getCustomerComplaints(limit = 50, offset = 0) {
    return await db.select().from(customerComplaints).orderBy(desc(customerComplaints.submissionDate)).limit(limit).offset(offset);
  }
  async getCustomerComplaintById(id) {
    const [complaint] = await db.select().from(customerComplaints).where(eq(customerComplaints.id, id));
    return complaint;
  }
  async updateComplaintStatus(id, status, assignedTo) {
    await db.update(customerComplaints).set({
      status,
      assignedTo,
      responseDate: status !== "open" ? /* @__PURE__ */ new Date() : void 0,
      resolutionDate: status === "resolved" ? /* @__PURE__ */ new Date() : void 0,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(customerComplaints.id, id));
  }
  async getComplaintsByDepartment(department) {
    return await db.select().from(customerComplaints).where(eq(customerComplaints.assignedDepartment, department)).orderBy(desc(customerComplaints.submissionDate));
  }
  // Facility Management
  async getFacilities() {
    return await db.select().from(facilities).where(eq(facilities.isActive, true)).orderBy(asc(facilities.name));
  }
  async createFacilityBooking(booking) {
    const bookingNumber = `FB-${(/* @__PURE__ */ new Date()).getFullYear()}-${String(Date.now()).slice(-6)}`;
    const [result] = await db.insert(facilityBookings).values({ ...booking, bookingNumber }).returning();
    return result;
  }
  async getFacilityBookings(limit = 50, offset = 0) {
    return await db.select().from(facilityBookings).orderBy(desc(facilityBookings.startDate)).limit(limit).offset(offset);
  }
  async getFacilityBookingById(id) {
    const [booking] = await db.select().from(facilityBookings).where(eq(facilityBookings.id, id));
    return booking;
  }
  async updateBookingStatus(id, status) {
    await db.update(facilityBookings).set({ status, updatedAt: /* @__PURE__ */ new Date() }).where(eq(facilityBookings.id, id));
  }
  // Property Management
  async getProperties(limit = 50, offset = 0) {
    return await db.select().from(properties).orderBy(asc(properties.propertyNumber)).limit(limit).offset(offset);
  }
  async getPropertyById(id) {
    const [property] = await db.select().from(properties).where(eq(properties.id, id));
    return property;
  }
  async searchProperties(query) {
    return await db.select().from(properties).where(
      ilike(properties.address, `%${query}%`)
    ).orderBy(asc(properties.propertyNumber)).limit(20);
  }
  // Cemetery Management
  async getCemeteries() {
    return await db.select().from(cemeteries).where(eq(cemeteries.isActive, true)).orderBy(asc(cemeteries.name));
  }
  async getGravesByCemetery(cemeteryId) {
    return await db.select().from(graves).where(eq(graves.cemeteryId, cemeteryId)).orderBy(asc(graves.graveNumber));
  }
  async createBurial(burial) {
    const intermentOrderNumber = `IO-${(/* @__PURE__ */ new Date()).getFullYear()}-${String(Date.now()).slice(-6)}`;
    const [result] = await db.insert(burials).values({ ...burial, intermentOrderNumber }).returning();
    return result;
  }
  async getBurials(limit = 50, offset = 0) {
    return await db.select().from(burials).orderBy(desc(burials.burialDate)).limit(limit).offset(offset);
  }
  // Fleet Management
  async getVehicles() {
    return await db.select().from(vehicles).orderBy(asc(vehicles.vehicleNumber));
  }
  async getVehicleById(id) {
    const [vehicle] = await db.select().from(vehicles).where(eq(vehicles.id, id));
    return vehicle;
  }
  async getFuelRecordsByVehicle(vehicleId, startDate, endDate) {
    if (startDate && endDate) {
      return await db.select().from(fuelRecords).where(
        and(
          eq(fuelRecords.vehicleId, vehicleId),
          gte(fuelRecords.date, startDate.toISOString().split("T")[0]),
          lte(fuelRecords.date, endDate.toISOString().split("T")[0])
        )
      ).orderBy(desc(fuelRecords.date));
    }
    return await db.select().from(fuelRecords).where(eq(fuelRecords.vehicleId, vehicleId)).orderBy(desc(fuelRecords.date));
  }
  // Water Management
  async getWaterConnections(limit = 50, offset = 0) {
    return await db.select().from(waterConnections).orderBy(asc(waterConnections.connectionNumber)).limit(limit).offset(offset);
  }
  async getWaterConnectionById(id) {
    const [connection] = await db.select().from(waterConnections).where(eq(waterConnections.id, id));
    return connection;
  }
  // Meter Applications
  async createMeterApplication(application) {
    const applicationNumber = `MA-${(/* @__PURE__ */ new Date()).getFullYear()}-${String(Date.now()).slice(-6)}`;
    const [result] = await db.insert(meterApplications).values({ ...application, applicationNumber }).returning();
    return result;
  }
  async getMeterApplications(limit = 50, offset = 0) {
    return await db.select().from(meterApplications).orderBy(desc(meterApplications.applicationDate)).limit(limit).offset(offset);
  }
  async getMeterApplicationById(id) {
    const [application] = await db.select().from(meterApplications).where(eq(meterApplications.id, id));
    return application;
  }
  async updateMeterApplicationStatus(id, status, reviewedBy, notes) {
    await db.update(meterApplications).set({
      status,
      reviewedBy,
      reviewDate: /* @__PURE__ */ new Date(),
      notes,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(meterApplications.id, id));
  }
  async getMeterApplicationsByStatus(status) {
    return await db.select().from(meterApplications).where(eq(meterApplications.status, status)).orderBy(desc(meterApplications.applicationDate));
  }
  // Permits & Licensing
  async createPermit(permit) {
    const permitNumber = `PER-${(/* @__PURE__ */ new Date()).getFullYear()}-${String(Date.now()).slice(-6)}`;
    const [result] = await db.insert(permits).values({ ...permit, permitNumber }).returning();
    return result;
  }
  async getPermits(limit = 50, offset = 0) {
    return await db.select().from(permits).orderBy(desc(permits.applicationDate)).limit(limit).offset(offset);
  }
  async getPermitById(id) {
    const [permit] = await db.select().from(permits).where(eq(permits.id, id));
    return permit;
  }
  async updatePermitStatus(id, status, reviewedBy) {
    await db.update(permits).set({
      status,
      reviewedBy,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(permits.id, id));
  }
  async getPermitsByType(permitType) {
    return await db.select().from(permits).where(eq(permits.permitType, permitType)).orderBy(desc(permits.applicationDate));
  }
  // Revenue Collection
  async createBill(bill) {
    const billNumber = `BILL-${(/* @__PURE__ */ new Date()).getFullYear()}-${String(Date.now()).slice(-6)}`;
    const [result] = await db.insert(bills).values({ ...bill, billNumber }).returning();
    return result;
  }
  async getBills(limit = 50, offset = 0) {
    return await db.select().from(bills).orderBy(desc(bills.createdAt)).limit(limit).offset(offset);
  }
  async getBillById(id) {
    const [bill] = await db.select().from(bills).where(eq(bills.id, id));
    return bill;
  }
  async updateBillPayment(id, paymentMethod, referenceNumber) {
    await db.update(bills).set({
      status: "paid",
      paymentMethod,
      referenceNumber,
      paidDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(bills.id, id));
  }
  async getBillsByStatus(status) {
    return await db.select().from(bills).where(eq(bills.status, status)).orderBy(desc(bills.dueDate));
  }
  async getBillsByType(billType) {
    return await db.select().from(bills).where(eq(bills.billType, billType)).orderBy(desc(bills.createdAt));
  }
  // Town Planning
  async createPlanningApplication(application) {
    const applicationNumber = `TP-${(/* @__PURE__ */ new Date()).getFullYear()}-${String(Date.now()).slice(-6)}`;
    const [result] = await db.insert(planningApplications).values({ ...application, applicationNumber }).returning();
    return result;
  }
  async getPlanningApplications(limit = 50, offset = 0) {
    return await db.select().from(planningApplications).orderBy(desc(planningApplications.submissionDate)).limit(limit).offset(offset);
  }
  async getPlanningApplicationById(id) {
    const [application] = await db.select().from(planningApplications).where(eq(planningApplications.id, id));
    return application;
  }
  async updatePlanningApplicationStatus(id, status, reviewedBy, comments) {
    await db.update(planningApplications).set({
      status,
      reviewedBy,
      comments,
      reviewDate: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(planningApplications.id, id));
  }
  // Asset Management
  async createAsset(asset) {
    const assetNumber = `AST-${(/* @__PURE__ */ new Date()).getFullYear()}-${String(Date.now()).slice(-6)}`;
    const [result] = await db.insert(assets).values({ ...asset, assetNumber }).returning();
    return result;
  }
  async getAssets(limit = 50, offset = 0) {
    return await db.select().from(assets).orderBy(asc(assets.name)).limit(limit).offset(offset);
  }
  async getAssetById(id) {
    const [asset] = await db.select().from(assets).where(eq(assets.id, id));
    return asset;
  }
  async updateAssetCondition(id, condition, lastInspectionDate) {
    await db.update(assets).set({
      condition,
      lastInspectionDate: lastInspectionDate?.toISOString().split("T")[0],
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(assets.id, id));
  }
  async getAssetsByDepartment(department) {
    return await db.select().from(assets).where(eq(assets.department, department)).orderBy(asc(assets.name));
  }
  async getAssetsByCategory(category) {
    return await db.select().from(assets).where(eq(assets.category, category)).orderBy(asc(assets.name));
  }
  // Vendor Management
  async createVendor(vendor) {
    const vendorNumber = `VEN-${(/* @__PURE__ */ new Date()).getFullYear()}-${String(Date.now()).slice(-6)}`;
    const [result] = await db.insert(vendors).values({ ...vendor, vendorNumber }).returning();
    return result;
  }
  async getVendors(limit = 50, offset = 0) {
    return await db.select().from(vendors).orderBy(asc(vendors.companyName)).limit(limit).offset(offset);
  }
  async getVendorById(id) {
    const [vendor] = await db.select().from(vendors).where(eq(vendors.id, id));
    return vendor;
  }
  async updateVendorStatus(id, status) {
    await db.update(vendors).set({ status, updatedAt: /* @__PURE__ */ new Date() }).where(eq(vendors.id, id));
  }
  async getVendorsByCategory(category) {
    return await db.select().from(vendors).where(eq(vendors.category, category)).orderBy(asc(vendors.companyName));
  }
  // Purchase Orders
  async createPurchaseOrder(order) {
    const orderNumber = `PO-${(/* @__PURE__ */ new Date()).getFullYear()}-${String(Date.now()).slice(-6)}`;
    const [result] = await db.insert(purchaseOrders).values({ ...order, orderNumber }).returning();
    return result;
  }
  async getPurchaseOrders(limit = 50, offset = 0) {
    return await db.select().from(purchaseOrders).orderBy(desc(purchaseOrders.createdAt)).limit(limit).offset(offset);
  }
  async getPurchaseOrderById(id) {
    const [order] = await db.select().from(purchaseOrders).where(eq(purchaseOrders.id, id));
    return order;
  }
  async updatePurchaseOrderStatus(id, status, approvedBy) {
    await db.update(purchaseOrders).set({
      status,
      approvedBy,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(purchaseOrders.id, id));
  }
  async getPurchaseOrdersByDepartment(department) {
    return await db.select().from(purchaseOrders).where(eq(purchaseOrders.department, department)).orderBy(desc(purchaseOrders.createdAt));
  }
  // Council Meetings
  async createCouncilMeeting(meeting) {
    const meetingNumber = `CM-${(/* @__PURE__ */ new Date()).getFullYear()}-${String(Date.now()).slice(-6)}`;
    const [result] = await db.insert(councilMeetings).values({ ...meeting, meetingNumber }).returning();
    return result;
  }
  async getCouncilMeetings(limit = 50, offset = 0) {
    return await db.select().from(councilMeetings).orderBy(desc(councilMeetings.date)).limit(limit).offset(offset);
  }
  async getCouncilMeetingById(id) {
    const [meeting] = await db.select().from(councilMeetings).where(eq(councilMeetings.id, id));
    return meeting;
  }
  async updateMeetingMinutes(id, minutes, resolutions) {
    await db.update(councilMeetings).set({ minutes, resolutions, status: "completed", updatedAt: /* @__PURE__ */ new Date() }).where(eq(councilMeetings.id, id));
  }
  // Public Notices
  async createPublicNotice(notice) {
    const noticeNumber = `PN-${(/* @__PURE__ */ new Date()).getFullYear()}-${String(Date.now()).slice(-6)}`;
    const [result] = await db.insert(publicNotices).values({ ...notice, noticeNumber }).returning();
    return result;
  }
  async getPublicNotices(limit = 50, offset = 0) {
    return await db.select().from(publicNotices).orderBy(desc(publicNotices.publishDate)).limit(limit).offset(offset);
  }
  async getPublicNoticeById(id) {
    const [notice] = await db.select().from(publicNotices).where(eq(publicNotices.id, id));
    return notice;
  }
  async updateNoticeStatus(id, status) {
    await db.update(publicNotices).set({ status, updatedAt: /* @__PURE__ */ new Date() }).where(eq(publicNotices.id, id));
  }
  async getNoticesByCategory(category) {
    return await db.select().from(publicNotices).where(eq(publicNotices.category, category)).orderBy(desc(publicNotices.publishDate));
  }
  // Meter Billing System Implementation
  async createMeter(meter) {
    const [result] = await db.insert(meters).values(meter).returning();
    return result;
  }
  async getMeters(limit = 50, offset = 0) {
    return await db.select().from(meters).limit(limit).offset(offset).orderBy(desc(meters.createdAt));
  }
  async getMeterById(id) {
    const [meter] = await db.select().from(meters).where(eq(meters.id, id));
    return meter;
  }
  async getMetersByProperty(propertyId) {
    return await db.select().from(meters).where(eq(meters.propertyId, propertyId));
  }
  async searchMetersByNumber(meterNumber) {
    return await db.select().from(meters).where(ilike(meters.meterNumber, `%${meterNumber}%`));
  }
  async updateMeterStatus(id, status) {
    await db.update(meters).set({ status, updatedAt: /* @__PURE__ */ new Date() }).where(eq(meters.id, id));
  }
  async createMeterReading(reading) {
    const [result] = await db.insert(meterReadings).values(reading).returning();
    return result;
  }
  async getMeterReadings(meterId, billingPeriod) {
    let query = db.select().from(meterReadings);
    if (meterId) query = query.where(eq(meterReadings.meterId, meterId));
    if (billingPeriod) query = query.where(eq(meterReadings.billingPeriod, billingPeriod));
    return await query.orderBy(desc(meterReadings.readingDate));
  }
  async getMeterReadingById(id) {
    const [reading] = await db.select().from(meterReadings).where(eq(meterReadings.id, id));
    return reading;
  }
  async getLastMeterReading(meterId) {
    const [reading] = await db.select().from(meterReadings).where(eq(meterReadings.meterId, meterId)).orderBy(desc(meterReadings.readingDate)).limit(1);
    return reading;
  }
  async updateMeterReading(id, readingValue, notes) {
    await db.update(meterReadings).set({ readingValue, notes, updatedAt: /* @__PURE__ */ new Date() }).where(eq(meterReadings.id, id));
  }
  // Property Registration Requests
  async createPropertyRegistrationRequest(request) {
    const requestNumber = `PR-${(/* @__PURE__ */ new Date()).getFullYear()}-${String(Date.now()).slice(-6)}`;
    const [result] = await db.insert(propertyRegistrationRequests).values({ ...request, requestNumber }).returning();
    return result;
  }
  async getPropertyRegistrationRequests(status) {
    let query = db.select().from(propertyRegistrationRequests);
    if (status) query = query.where(eq(propertyRegistrationRequests.status, status));
    return await query.orderBy(desc(propertyRegistrationRequests.createdAt));
  }
  async getPropertyRegistrationRequestById(id) {
    const [request] = await db.select().from(propertyRegistrationRequests).where(eq(propertyRegistrationRequests.id, id));
    return request;
  }
  async updatePropertyRegistrationRequestStatus(id, status, adminNotes, approvedBy) {
    await db.update(propertyRegistrationRequests).set({
      status,
      adminNotes,
      approvedBy,
      approvedAt: status === "approved" ? /* @__PURE__ */ new Date() : void 0,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(propertyRegistrationRequests.id, id));
  }
  // Super Admin and System Configuration
  async getSystemModules() {
    return await db.select().from(systemModules).orderBy(asc(systemModules.displayName));
  }
  async updateSystemModule(moduleName, isEnabled, canRegisterProperties, lastModifiedBy) {
    await db.update(systemModules).set({
      isEnabled,
      canRegisterProperties: canRegisterProperties ?? false,
      lastModifiedBy,
      lastModifiedAt: /* @__PURE__ */ new Date()
    }).where(eq(systemModules.moduleName, moduleName));
  }
  async getSystemSettings(category) {
    let query = db.select().from(systemSettings);
    if (category) query = query.where(eq(systemSettings.category, category));
    return await query.orderBy(asc(systemSettings.settingKey));
  }
  async updateSystemSetting(settingKey, settingValue, lastModifiedBy) {
    await db.update(systemSettings).set({ settingValue, lastModifiedBy, lastModifiedAt: /* @__PURE__ */ new Date() }).where(eq(systemSettings.settingKey, settingKey));
  }
  // Customer Account Management
  async createCustomerAccount(account) {
    const accountNumber = `ACC-${(/* @__PURE__ */ new Date()).getFullYear()}-${String(Date.now()).slice(-6)}`;
    const [result] = await db.insert(customerAccounts).values({ ...account, accountNumber }).returning();
    return result;
  }
  async getCustomerAccounts(limit = 50, offset = 0) {
    return await db.select().from(customerAccounts).limit(limit).offset(offset).orderBy(desc(customerAccounts.createdAt));
  }
  async getCustomerAccountById(id) {
    const [account] = await db.select().from(customerAccounts).where(eq(customerAccounts.id, id));
    return account;
  }
  async getCustomerAccountByProperty(propertyId) {
    const [account] = await db.select().from(customerAccounts).where(eq(customerAccounts.propertyId, propertyId));
    return account;
  }
  async searchCustomerAccounts(query) {
    return await db.select().from(customerAccounts).where(ilike(customerAccounts.customerName, `%${query}%`));
  }
  async updateCustomerBalance(accountId, amount) {
    await db.update(customerAccounts).set({ currentBalance: amount.toString(), updatedAt: /* @__PURE__ */ new Date() }).where(eq(customerAccounts.id, accountId));
  }
  // Payment Processing
  async createPayment(payment) {
    const paymentNumber = `PAY-${(/* @__PURE__ */ new Date()).getFullYear()}-${String(Date.now()).slice(-6)}`;
    const receiptNumber = `RCP-${String(Date.now()).slice(-8)}`;
    const [result] = await db.insert(payments).values({ ...payment, paymentNumber, receiptNumber }).returning();
    return result;
  }
  async getPayments(accountId, zoneId) {
    let query = db.select().from(payments);
    if (accountId) query = query.where(eq(payments.accountId, accountId));
    if (zoneId) query = query.where(eq(payments.zoneId, zoneId));
    return await query.orderBy(desc(payments.paymentDate));
  }
  async getPaymentById(id) {
    const [payment] = await db.select().from(payments).where(eq(payments.id, id));
    return payment;
  }
  async updatePaymentStatus(id, status, gatewayResponse) {
    await db.update(payments).set({ status, gatewayResponse, updatedAt: /* @__PURE__ */ new Date() }).where(eq(payments.id, id));
  }
  // Comprehensive Audit Trail
  async createAuditLog(log2) {
    await db.insert(auditLog).values(log2);
  }
  async getAuditLogs(tableName, recordId, userId, limit = 100) {
    let query = db.select().from(auditLog);
    if (tableName) query = query.where(eq(auditLog.tableName, tableName));
    if (recordId) query = query.where(eq(auditLog.recordId, recordId));
    if (userId) query = query.where(eq(auditLog.userId, userId));
    return await query.orderBy(desc(auditLog.timestamp)).limit(limit);
  }
  // Statistics (Enhanced)
  async getDashboardStats() {
    const [housingCount] = await db.select({ count: count() }).from(housingApplications);
    const [complaintsCount] = await db.select({ count: count() }).from(customerComplaints).where(eq(customerComplaints.status, "open"));
    const [usersCount] = await db.select({ count: count() }).from(users).where(eq(users.isActive, true));
    const [permitsCount] = await db.select({ count: count() }).from(permits).where(eq(permits.status, "pending"));
    const [assetsCount] = await db.select({ count: count() }).from(assets).where(eq(assets.status, "active"));
    const [meetingsCount] = await db.select({ count: count() }).from(councilMeetings).where(eq(councilMeetings.status, "scheduled"));
    const [metersCount] = await db.select({ count: count() }).from(meters);
    const [unreadMetersCount] = await db.select({ count: count() }).from(meters).leftJoin(meterReadings, eq(meters.id, meterReadings.meterId)).where(eq(meterReadings.billingPeriod, (/* @__PURE__ */ new Date()).toISOString().slice(0, 7)));
    const [unpaidBillsCount] = await db.select({ count: count() }).from(monthlyBills).where(eq(monthlyBills.status, "unpaid"));
    const [zonesCount] = await db.select({ count: count() }).from(zones).where(eq(zones.isActive, true));
    return {
      housingApplications: housingCount.count,
      pendingComplaints: complaintsCount.count,
      activeCitizens: usersCount.count,
      monthlyRevenue: "$2.8M",
      totalRevenue: 85e5,
      pendingPermits: permitsCount.count,
      activeAssets: assetsCount.count,
      upcomingMeetings: meetingsCount.count,
      totalMeters: metersCount.count,
      unreadMeters: Math.max(0, metersCount.count - (unreadMetersCount?.count || 0)),
      unpaidBills: unpaidBillsCount.count,
      totalOutstanding: 125e4,
      dailyCollections: 85e3,
      activeZones: zonesCount.count
    };
  }
  // ==== CUSTOMER ACCOUNTS & BILLING IMPLEMENTATION ====
  async updateCustomerAccount(id, data) {
    await db.update(customerAccounts).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(customerAccounts.id, id));
  }
  // Monthly Bills Implementation
  async getMonthlyBills(accountId, billingPeriod) {
    let query = db.select().from(monthlyBills);
    if (accountId) {
      query = query.where(eq(monthlyBills.accountId, accountId));
    }
    if (billingPeriod) {
      query = query.where(eq(monthlyBills.billingPeriod, billingPeriod));
    }
    return await query.orderBy(desc(monthlyBills.createdAt));
  }
  async getMonthlyBillById(id) {
    const [bill] = await db.select().from(monthlyBills).where(eq(monthlyBills.id, id));
    return bill;
  }
  async createMonthlyBill(data) {
    const [bill] = await db.insert(monthlyBills).values(data).returning();
    return bill;
  }
  // Payments Implementation (uses methods defined above)
  // Financial Management Methods
  async getChartOfAccounts() {
    return await db.select().from(chartOfAccounts).where(eq(chartOfAccounts.isActive, true));
  }
  async createChartOfAccount(account) {
    const [newAccount] = await db.insert(chartOfAccounts).values(account).returning();
    return newAccount;
  }
  async updateChartOfAccount(id, account) {
    const [updated] = await db.update(chartOfAccounts).set({ ...account, updatedAt: /* @__PURE__ */ new Date() }).where(eq(chartOfAccounts.id, id)).returning();
    return updated;
  }
  async deleteChartOfAccount(id) {
    await db.update(chartOfAccounts).set({ isActive: false }).where(eq(chartOfAccounts.id, id));
  }
  async getGeneralLedgerEntries(limit = 50, offset = 0) {
    return await db.select().from(generalLedger).limit(limit).offset(offset).orderBy(desc(generalLedger.transactionDate));
  }
  async createGeneralLedgerEntry(entry) {
    const [newEntry] = await db.insert(generalLedger).values(entry).returning();
    return newEntry;
  }
  async updateGeneralLedgerEntry(id, entry) {
    const [updated] = await db.update(generalLedger).set({ ...entry, updatedAt: /* @__PURE__ */ new Date() }).where(eq(generalLedger.id, id)).returning();
    return updated;
  }
  async getAccountBalance(accountId) {
    const entries = await db.select().from(generalLedger).where(eq(generalLedger.accountId, accountId));
    return entries.reduce((balance, entry) => {
      const debit = parseFloat(entry.debitAmount || "0");
      const credit = parseFloat(entry.creditAmount || "0");
      return balance + debit - credit;
    }, 0);
  }
  async getCashbookEntries(limit = 50, offset = 0) {
    return await db.select().from(cashbook).limit(limit).offset(offset).orderBy(desc(cashbook.transactionDate));
  }
  async createCashbookEntry(entry) {
    const [newEntry] = await db.insert(cashbook).values(entry).returning();
    return newEntry;
  }
  async updateCashbookEntry(id, entry) {
    const [updated] = await db.update(cashbook).set(entry).where(eq(cashbook.id, id)).returning();
    return updated;
  }
  async getDebtors(limit = 50, offset = 0) {
    return await db.select().from(debtorsManagement).limit(limit).offset(offset).orderBy(desc(debtorsManagement.createdAt));
  }
  async createDebtor(debtor) {
    const [newDebtor] = await db.insert(debtorsManagement).values(debtor).returning();
    return newDebtor;
  }
  async updateDebtor(id, debtor) {
    const [updated] = await db.update(debtorsManagement).set({ ...debtor, updatedAt: /* @__PURE__ */ new Date() }).where(eq(debtorsManagement.id, id)).returning();
    return updated;
  }
  async deleteDebtor(id) {
    await db.update(debtorsManagement).set({ status: "inactive" }).where(eq(debtorsManagement.id, id));
  }
  async getMunicipalInvoices(limit = 50, offset = 0) {
    return await db.select().from(municipalInvoices).limit(limit).offset(offset).orderBy(desc(municipalInvoices.invoiceDate));
  }
  async createMunicipalInvoice(invoice) {
    const invoiceNumber = `INV-${Date.now()}`;
    const [newInvoice] = await db.insert(municipalInvoices).values({ ...invoice, invoiceNumber }).returning();
    return newInvoice;
  }
  async updateMunicipalInvoice(id, invoice) {
    const [updated] = await db.update(municipalInvoices).set({ ...invoice, updatedAt: /* @__PURE__ */ new Date() }).where(eq(municipalInvoices.id, id)).returning();
    return updated;
  }
  async deleteMunicipalInvoice(id) {
    await db.update(municipalInvoices).set({ status: "cancelled" }).where(eq(municipalInvoices.id, id));
  }
  async getVoucherPayments(limit = 50, offset = 0) {
    return await db.select().from(voucherPayments).limit(limit).offset(offset).orderBy(desc(voucherPayments.paymentDate));
  }
  async createVoucherPayment(voucher) {
    const voucherNumber = `VOU-${Date.now()}`;
    const [newVoucher] = await db.insert(voucherPayments).values({ ...voucher, voucherNumber }).returning();
    return newVoucher;
  }
  async updateVoucherPayment(id, voucher) {
    const [updated] = await db.update(voucherPayments).set({ ...voucher, updatedAt: /* @__PURE__ */ new Date() }).where(eq(voucherPayments.id, id)).returning();
    return updated;
  }
  async deleteVoucherPayment(id) {
    await db.update(voucherPayments).set({ status: "cancelled" }).where(eq(voucherPayments.id, id));
  }
  async getReceipts(limit = 50, offset = 0) {
    return await db.select().from(receipts).limit(limit).offset(offset).orderBy(desc(receipts.receiptDate));
  }
  async createReceipt(receipt) {
    const receiptNumber = `REC-${Date.now()}`;
    const [newReceipt] = await db.insert(receipts).values({ ...receipt, receiptNumber }).returning();
    return newReceipt;
  }
  async updateReceipt(id, receipt) {
    const [updated] = await db.update(receipts).set(receipt).where(eq(receipts.id, id)).returning();
    return updated;
  }
  async getFixedAssets(limit = 50, offset = 0) {
    return await db.select().from(fixedAssets).limit(limit).offset(offset).orderBy(desc(fixedAssets.createdAt));
  }
  async createFixedAsset(asset) {
    const assetCode = `AST-${Date.now()}`;
    const [newAsset] = await db.insert(fixedAssets).values({ ...asset, assetCode }).returning();
    return newAsset;
  }
  async updateFixedAsset(id, asset) {
    const [updated] = await db.update(fixedAssets).set({ ...asset, updatedAt: /* @__PURE__ */ new Date() }).where(eq(fixedAssets.id, id)).returning();
    return updated;
  }
  async deleteFixedAsset(id) {
    await db.update(fixedAssets).set({ status: "disposed" }).where(eq(fixedAssets.id, id));
  }
  async getBankAccounts() {
    return await db.select().from(bankAccounts).where(eq(bankAccounts.isActive, true));
  }
  async createBankAccount(account) {
    const [newAccount] = await db.insert(bankAccounts).values(account).returning();
    return newAccount;
  }
  async updateBankAccount(id, account) {
    const [updated] = await db.update(bankAccounts).set({ ...account, updatedAt: /* @__PURE__ */ new Date() }).where(eq(bankAccounts.id, id)).returning();
    return updated;
  }
  async deleteBankAccount(id) {
    await db.update(bankAccounts).set({ isActive: false }).where(eq(bankAccounts.id, id));
  }
  async getCurrencies() {
    return await db.select().from(currencies).where(eq(currencies.isActive, true));
  }
  async createCurrency(currency) {
    const [newCurrency] = await db.insert(currencies).values(currency).returning();
    return newCurrency;
  }
  async updateCurrency(id, currency) {
    const [updated] = await db.update(currencies).set({ ...currency, lastUpdated: /* @__PURE__ */ new Date() }).where(eq(currencies.id, id)).returning();
    return updated;
  }
  async deleteCurrency(id) {
    await db.update(currencies).set({ isActive: false }).where(eq(currencies.id, id));
  }
  // Payroll Management Methods
  async getEmployees(limit = 50, offset = 0) {
    return await db.select().from(employees).limit(limit).offset(offset).orderBy(desc(employees.createdAt));
  }
  async createEmployee(employee) {
    const [newEmployee] = await db.insert(employees).values(employee).returning();
    return newEmployee;
  }
  async updateEmployee(id, employee) {
    const [updated] = await db.update(employees).set({ ...employee, updatedAt: /* @__PURE__ */ new Date() }).where(eq(employees.id, id)).returning();
    return updated;
  }
  async deleteEmployee(id) {
    await db.update(employees).set({ status: "inactive" }).where(eq(employees.id, id));
  }
  async getPayrollRuns(limit = 50, offset = 0) {
    return await db.select().from(payrollRuns).limit(limit).offset(offset).orderBy(desc(payrollRuns.createdAt));
  }
  async createPayrollRun(payrollRun) {
    const [newPayrollRun] = await db.insert(payrollRuns).values(payrollRun).returning();
    return newPayrollRun;
  }
  async updatePayrollRun(id, payrollRun) {
    const [updated] = await db.update(payrollRuns).set({ ...payrollRun, updatedAt: /* @__PURE__ */ new Date() }).where(eq(payrollRuns.id, id)).returning();
    return updated;
  }
  async deletePayrollRun(id) {
    await db.update(payrollRuns).set({ status: "cancelled" }).where(eq(payrollRuns.id, id));
  }
  async getPayrollItems(payrollRunId) {
    return await db.select().from(payrollItems).where(eq(payrollItems.payrollRunId, payrollRunId));
  }
  async createPayrollItem(item) {
    const [newItem] = await db.insert(payrollItems).values(item).returning();
    return newItem;
  }
  async updatePayrollItem(id, item) {
    const [updated] = await db.update(payrollItems).set(item).where(eq(payrollItems.id, id)).returning();
    return updated;
  }
  async getLeaveTypes() {
    return await db.select().from(leaveTypes).where(eq(leaveTypes.isActive, true));
  }
  async createLeaveType(leaveType) {
    const [newLeaveType] = await db.insert(leaveTypes).values(leaveType).returning();
    return newLeaveType;
  }
  async updateLeaveType(id, leaveType) {
    const [updated] = await db.update(leaveTypes).set(leaveType).where(eq(leaveTypes.id, id)).returning();
    return updated;
  }
  async deleteLeaveType(id) {
    await db.update(leaveTypes).set({ isActive: false }).where(eq(leaveTypes.id, id));
  }
  async getLeaveApplications(limit = 50, offset = 0) {
    return await db.select().from(leaveApplications).limit(limit).offset(offset).orderBy(desc(leaveApplications.appliedDate));
  }
  async createLeaveApplication(application) {
    const [newApplication] = await db.insert(leaveApplications).values(application).returning();
    return newApplication;
  }
  async updateLeaveApplication(id, application) {
    const [updated] = await db.update(leaveApplications).set({ ...application, updatedAt: /* @__PURE__ */ new Date() }).where(eq(leaveApplications.id, id)).returning();
    return updated;
  }
  async deleteLeaveApplication(id) {
    await db.update(leaveApplications).set({ status: "cancelled" }).where(eq(leaveApplications.id, id));
  }
  async getPerformanceReviews(limit = 50, offset = 0) {
    return await db.select().from(performanceReviews).limit(limit).offset(offset).orderBy(desc(performanceReviews.reviewDate));
  }
  async createPerformanceReview(review) {
    const [newReview] = await db.insert(performanceReviews).values(review).returning();
    return newReview;
  }
  async updatePerformanceReview(id, review) {
    const [updated] = await db.update(performanceReviews).set({ ...review, updatedAt: /* @__PURE__ */ new Date() }).where(eq(performanceReviews.id, id)).returning();
    return updated;
  }
  async deletePerformanceReview(id) {
    await db.delete(performanceReviews).where(eq(performanceReviews.id, id));
  }
  // Legacy implementations for existing methods
  async getBillingRates() {
    return [];
  }
  async createBillingRate(rate) {
    throw new Error("Not implemented");
  }
  async getBillingRateById(id) {
    return void 0;
  }
  async updateBillingRate() {
  }
  async getActiveBillingRates() {
    return [];
  }
  async getUnpaidBills() {
    return [];
  }
  async generateMonthlyBills() {
  }
  async createZone(zone) {
    throw new Error("Not implemented");
  }
  async getZones() {
    return [];
  }
  async getZoneById(id) {
    return void 0;
  }
  async updateZoneStatus() {
  }
  async createPosTerminal(terminal) {
    throw new Error("Not implemented");
  }
  async getPosTerminals() {
    return [];
  }
  async getPosTerminalById(id) {
    return void 0;
  }
  async updateTerminalStatus() {
  }
  async updateTerminalDailyTotal() {
  }
  async getPaymentsByDateRange() {
    return [];
  }
  async getPaymentsByOperator() {
    return [];
  }
  async getDailyPaymentTotals() {
    return [];
  }
  async getPaymentGateways() {
    return [];
  }
  async getPaymentGatewayByName() {
    return void 0;
  }
  async updatePaymentGateway() {
  }
  async enablePaymentGateway() {
  }
  async getAuditLogsByDateRange() {
    return [];
  }
  async getUserActivityLog() {
    return [];
  }
  async getCustomerBills() {
    return [];
  }
  async getCustomerPaymentHistory() {
    return [];
  }
  async getCustomerAccountSummary() {
    return {};
  }
  async getRevenueAnalytics() {
    return {};
  }
  async getCollectionEfficiency() {
    return {};
  }
  async getMeterReadingStats() {
    return {};
  }
};
var storage = new DatabaseStorage();

// server/tempAuth.ts
import session from "express-session";
function setupTempAuth(app2) {
  app2.use(session({
    secret: process.env.SESSION_SECRET || "temp-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      // Set to true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1e3
      // 24 hours
    }
  }));
  app2.get("/api/temp-login", async (req, res) => {
    try {
      const testUserId = "test-user-123";
      let user = await storage.getUser(testUserId);
      if (!user) {
        await storage.upsertUser({
          id: testUserId,
          email: "admin@gweru.gov.zw",
          firstName: "System",
          lastName: "Administrator",
          department: "town-clerk",
          role: "admin",
          isActive: true
        });
        user = await storage.getUser(testUserId);
      }
      req.session.userId = testUserId;
      res.redirect("/");
    } catch (error) {
      console.error("Error in temp login:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });
  app2.get("/api/auth/user", async (req, res) => {
    try {
      const userId = req.session?.userId;
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
  app2.get("/api/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
  });
}
var isAuthenticated = async (req, res, next) => {
  const userId = req.session?.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const user = await storage.getUser(userId);
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  req.user = user;
  next();
};

// server/routes.ts
import { ZodError } from "zod";

// server/seed.ts
var DEFAULT_ADMIN = {
  id: "admin-deploy-001",
  email: "admin@gweru.gov.zw",
  firstName: "System",
  lastName: "Administrator",
  department: "town-clerk",
  role: "admin",
  isActive: true
};
var DEPLOYMENT_ADMIN_CREDENTIALS = {
  email: "admin@gweru.gov.zw",
  password: "GweruAdmin2025!",
  loginUrl: "/temp-login",
  note: "Use the temp login endpoint to access the system as this admin user"
};
async function seedDefaultAdmin() {
  try {
    console.log("\u{1F331} Seeding default admin user for deployment...");
    const existingAdmin = await storage.getUser(DEFAULT_ADMIN.id);
    if (!existingAdmin) {
      await storage.upsertUser(DEFAULT_ADMIN);
      console.log("\u2705 Default admin user created successfully");
      console.log("\u{1F4E7} Email:", DEPLOYMENT_ADMIN_CREDENTIALS.email);
      console.log("\u{1F517} Access via:", DEPLOYMENT_ADMIN_CREDENTIALS.loginUrl);
    } else {
      console.log("\u2139\uFE0F  Default admin user already exists");
    }
    return DEPLOYMENT_ADMIN_CREDENTIALS;
  } catch (error) {
    console.error("\u274C Error seeding default admin:", error);
    throw error;
  }
}
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDefaultAdmin().then(() => {
    console.log("\u{1F389} Seeding completed successfully");
    process.exit(0);
  }).catch((error) => {
    console.error("\u{1F4A5} Seeding failed:", error);
    process.exit(1);
  });
}

// server/routes.ts
async function registerRoutes(app2) {
  setupTempAuth(app2);
  app2.get("/api/admin/deployment-credentials", isAuthenticated, async (req, res) => {
    try {
      const currentUser = await storage.getUser(req.user?.id);
      if (!currentUser || currentUser.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admin role required." });
      }
      if (process.env.NODE_ENV === "development" || process.env.SHOW_DEPLOYMENT_CREDENTIALS === "true") {
        res.json(DEPLOYMENT_ADMIN_CREDENTIALS);
      } else {
        res.status(404).json({ message: "Deployment credentials not available" });
      }
    } catch (error) {
      console.error("Error fetching deployment credentials:", error);
      res.status(500).json({ message: "Failed to fetch deployment credentials" });
    }
  });
  app2.get("/api/dashboard/stats", isAuthenticated, async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });
  app2.get("/api/housing/applications", isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const offset = parseInt(req.query.offset) || 0;
      const applications = await storage.getHousingApplications(limit, offset);
      res.json(applications);
    } catch (error) {
      console.error("Error fetching housing applications:", error);
      res.status(500).json({ message: "Failed to fetch housing applications" });
    }
  });
  app2.post("/api/housing/applications", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertHousingApplicationSchema.parse(req.body);
      const application = await storage.createHousingApplication(validatedData);
      res.status(201).json(application);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error creating housing application:", error);
        res.status(500).json({ message: "Failed to create housing application" });
      }
    }
  });
  app2.get("/api/housing/applications/:id", isAuthenticated, async (req, res) => {
    try {
      const application = await storage.getHousingApplicationById(req.params.id);
      if (!application) {
        return res.status(404).json({ message: "Housing application not found" });
      }
      res.json(application);
    } catch (error) {
      console.error("Error fetching housing application:", error);
      res.status(500).json({ message: "Failed to fetch housing application" });
    }
  });
  app2.patch("/api/housing/applications/:id/status", isAuthenticated, async (req, res) => {
    try {
      const { status } = req.body;
      const userId = req.user?.id;
      await storage.updateHousingApplicationStatus(req.params.id, status, userId);
      res.json({ message: "Status updated successfully" });
    } catch (error) {
      console.error("Error updating housing application status:", error);
      res.status(500).json({ message: "Failed to update status" });
    }
  });
  app2.get("/api/complaints", isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const offset = parseInt(req.query.offset) || 0;
      const complaints = await storage.getCustomerComplaints(limit, offset);
      res.json(complaints);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      res.status(500).json({ message: "Failed to fetch complaints" });
    }
  });
  app2.post("/api/complaints", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertCustomerComplaintSchema.parse(req.body);
      const complaint = await storage.createCustomerComplaint(validatedData);
      res.status(201).json(complaint);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error creating complaint:", error);
        res.status(500).json({ message: "Failed to create complaint" });
      }
    }
  });
  app2.patch("/api/complaints/:id/status", isAuthenticated, async (req, res) => {
    try {
      const { status, assignedTo } = req.body;
      await storage.updateComplaintStatus(req.params.id, status, assignedTo);
      res.json({ message: "Complaint status updated successfully" });
    } catch (error) {
      console.error("Error updating complaint status:", error);
      res.status(500).json({ message: "Failed to update complaint status" });
    }
  });
  app2.get("/api/facilities", isAuthenticated, async (req, res) => {
    try {
      const facilities2 = await storage.getFacilities();
      res.json(facilities2);
    } catch (error) {
      console.error("Error fetching facilities:", error);
      res.status(500).json({ message: "Failed to fetch facilities" });
    }
  });
  app2.get("/api/facilities/bookings", isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const offset = parseInt(req.query.offset) || 0;
      const bookings = await storage.getFacilityBookings(limit, offset);
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching facility bookings:", error);
      res.status(500).json({ message: "Failed to fetch facility bookings" });
    }
  });
  app2.post("/api/facilities/bookings", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertFacilityBookingSchema.parse(req.body);
      const booking = await storage.createFacilityBooking(validatedData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error creating facility booking:", error);
        res.status(500).json({ message: "Failed to create facility booking" });
      }
    }
  });
  app2.get("/api/properties", isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const offset = parseInt(req.query.offset) || 0;
      const properties2 = await storage.getProperties(limit, offset);
      res.json(properties2);
    } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  });
  app2.get("/api/properties/search", isAuthenticated, async (req, res) => {
    try {
      const query = req.query.q;
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
      const properties2 = await storage.searchProperties(query);
      res.json(properties2);
    } catch (error) {
      console.error("Error searching properties:", error);
      res.status(500).json({ message: "Failed to search properties" });
    }
  });
  app2.get("/api/cemeteries", isAuthenticated, async (req, res) => {
    try {
      const cemeteries2 = await storage.getCemeteries();
      res.json(cemeteries2);
    } catch (error) {
      console.error("Error fetching cemeteries:", error);
      res.status(500).json({ message: "Failed to fetch cemeteries" });
    }
  });
  app2.get("/api/cemeteries/:id/graves", isAuthenticated, async (req, res) => {
    try {
      const graves2 = await storage.getGravesByCemetery(req.params.id);
      res.json(graves2);
    } catch (error) {
      console.error("Error fetching graves:", error);
      res.status(500).json({ message: "Failed to fetch graves" });
    }
  });
  app2.get("/api/burials", isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const offset = parseInt(req.query.offset) || 0;
      const burials2 = await storage.getBurials(limit, offset);
      res.json(burials2);
    } catch (error) {
      console.error("Error fetching burials:", error);
      res.status(500).json({ message: "Failed to fetch burials" });
    }
  });
  app2.post("/api/burials", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertBurialSchema.parse(req.body);
      const burial = await storage.createBurial(validatedData);
      res.status(201).json(burial);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error creating burial record:", error);
        res.status(500).json({ message: "Failed to create burial record" });
      }
    }
  });
  app2.get("/api/vehicles", isAuthenticated, async (req, res) => {
    try {
      const vehicles2 = await storage.getVehicles();
      res.json(vehicles2);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      res.status(500).json({ message: "Failed to fetch vehicles" });
    }
  });
  app2.get("/api/vehicles/:id/fuel-records", isAuthenticated, async (req, res) => {
    try {
      const startDate = req.query.startDate ? new Date(req.query.startDate) : void 0;
      const endDate = req.query.endDate ? new Date(req.query.endDate) : void 0;
      const fuelRecords2 = await storage.getFuelRecordsByVehicle(req.params.id, startDate, endDate);
      res.json(fuelRecords2);
    } catch (error) {
      console.error("Error fetching fuel records:", error);
      res.status(500).json({ message: "Failed to fetch fuel records" });
    }
  });
  app2.get("/api/water/connections", isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const offset = parseInt(req.query.offset) || 0;
      const connections = await storage.getWaterConnections(limit, offset);
      res.json(connections);
    } catch (error) {
      console.error("Error fetching water connections:", error);
      res.status(500).json({ message: "Failed to fetch water connections" });
    }
  });
  app2.get("/api/water/meter-applications", isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const offset = parseInt(req.query.offset) || 0;
      const applications = await storage.getMeterApplications(limit, offset);
      res.json(applications);
    } catch (error) {
      console.error("Error fetching meter applications:", error);
      res.status(500).json({ message: "Failed to fetch meter applications" });
    }
  });
  app2.post("/api/water/meter-applications", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertMeterApplicationSchema.parse(req.body);
      const application = await storage.createMeterApplication(validatedData);
      res.status(201).json(application);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error creating meter application:", error);
        res.status(500).json({ message: "Failed to create meter application" });
      }
    }
  });
  app2.get("/api/water/meter-applications/:id", isAuthenticated, async (req, res) => {
    try {
      const application = await storage.getMeterApplicationById(req.params.id);
      if (!application) {
        return res.status(404).json({ message: "Meter application not found" });
      }
      res.json(application);
    } catch (error) {
      console.error("Error fetching meter application:", error);
      res.status(500).json({ message: "Failed to fetch meter application" });
    }
  });
  app2.patch("/api/water/meter-applications/:id/status", isAuthenticated, async (req, res) => {
    try {
      const { status, reviewedBy, notes } = req.body;
      await storage.updateMeterApplicationStatus(req.params.id, status, reviewedBy, notes);
      res.json({ message: "Meter application status updated successfully" });
    } catch (error) {
      console.error("Error updating meter application status:", error);
      res.status(500).json({ message: "Failed to update meter application status" });
    }
  });
  app2.get("/api/admin/users", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user?.claims?.sub;
      if (!userId) {
        return res.status(401).json({ message: "User session invalid" });
      }
      const currentUser = await storage.getUser(userId);
      if (!currentUser || currentUser.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admin role required." });
      }
      const department = req.query.department;
      const users2 = department ? await storage.getUsersByDepartment(department) : await storage.getUsersByDepartment("");
      res.json(users2);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });
  app2.patch("/api/admin/users/:id/status", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user?.claims?.sub;
      if (!userId) {
        return res.status(401).json({ message: "User session invalid" });
      }
      const currentUser = await storage.getUser(userId);
      if (!currentUser || currentUser.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admin role required." });
      }
      const { isActive } = req.body;
      await storage.updateUserStatus(req.params.id, isActive);
      res.json({ message: "User status updated successfully" });
    } catch (error) {
      console.error("Error updating user status:", error);
      res.status(500).json({ message: "Failed to update user status" });
    }
  });
  app2.get("/api/bills", isAuthenticated, async (req, res) => {
    try {
      const bills2 = await storage.getBills();
      res.json(bills2);
    } catch (error) {
      console.error("Error fetching bills:", error);
      res.status(500).json({ message: "Failed to fetch bills" });
    }
  });
  app2.post("/api/bills", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertBillSchema.parse(req.body);
      const bill = await storage.createBill(validatedData);
      res.status(201).json(bill);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error creating bill:", error);
        res.status(500).json({ message: "Failed to create bill" });
      }
    }
  });
  app2.get("/api/permits", isAuthenticated, async (req, res) => {
    try {
      const permits2 = await storage.getPermits();
      res.json(permits2);
    } catch (error) {
      console.error("Error fetching permits:", error);
      res.status(500).json({ message: "Failed to fetch permits" });
    }
  });
  app2.post("/api/permits", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertPermitSchema.parse(req.body);
      const permit = await storage.createPermit(validatedData);
      res.status(201).json(permit);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error creating permit:", error);
        res.status(500).json({ message: "Failed to create permit" });
      }
    }
  });
  app2.get("/api/planning/applications", isAuthenticated, async (req, res) => {
    try {
      const applications = await storage.getPlanningApplications();
      res.json(applications);
    } catch (error) {
      console.error("Error fetching planning applications:", error);
      res.status(500).json({ message: "Failed to fetch planning applications" });
    }
  });
  app2.post("/api/planning/applications", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertPlanningApplicationSchema.parse(req.body);
      const application = await storage.createPlanningApplication(validatedData);
      res.status(201).json(application);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error creating planning application:", error);
        res.status(500).json({ message: "Failed to create planning application" });
      }
    }
  });
  app2.get("/api/meters", isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const offset = parseInt(req.query.offset) || 0;
      const meters2 = await storage.getMeters(limit, offset);
      res.json(meters2);
    } catch (error) {
      console.error("Error fetching meters:", error);
      res.status(500).json({ message: "Failed to fetch meters" });
    }
  });
  app2.post("/api/meters", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user?.id || req.user?.claims?.sub;
      const validatedData = insertMeterSchema.parse({ ...req.body, createdBy: userId });
      const meter = await storage.createMeter(validatedData);
      await storage.createAuditLog({
        tableName: "meters",
        recordId: meter.id,
        action: "INSERT",
        newValues: meter,
        userId,
        userName: req.user?.name || "Unknown",
        module: "Meter Management",
        description: `Created new meter ${meter.meterNumber}`
      });
      res.status(201).json(meter);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error creating meter:", error);
        res.status(500).json({ message: "Failed to create meter" });
      }
    }
  });
  app2.get("/api/meters/search", isAuthenticated, async (req, res) => {
    try {
      const { query } = req.query;
      if (!query) {
        return res.status(400).json({ message: "Search query required" });
      }
      const meters2 = await storage.searchMetersByNumber(query);
      res.json(meters2);
    } catch (error) {
      console.error("Error searching meters:", error);
      res.status(500).json({ message: "Failed to search meters" });
    }
  });
  app2.get("/api/meters/property/:propertyId", isAuthenticated, async (req, res) => {
    try {
      const meters2 = await storage.getMetersByProperty(req.params.propertyId);
      res.json(meters2);
    } catch (error) {
      console.error("Error fetching property meters:", error);
      res.status(500).json({ message: "Failed to fetch property meters" });
    }
  });
  app2.patch("/api/meters/:id/status", isAuthenticated, async (req, res) => {
    try {
      const { status } = req.body;
      const userId = req.user?.id || req.user?.claims?.sub;
      await storage.updateMeterStatus(req.params.id, status);
      await storage.createAuditLog({
        tableName: "meters",
        recordId: req.params.id,
        action: "UPDATE",
        changedFields: ["status"],
        newValues: { status },
        userId,
        userName: req.user?.name || "Unknown",
        module: "Meter Management",
        description: `Updated meter status to ${status}`
      });
      res.json({ message: "Meter status updated successfully" });
    } catch (error) {
      console.error("Error updating meter status:", error);
      res.status(500).json({ message: "Failed to update meter status" });
    }
  });
  app2.get("/api/meter-readings", isAuthenticated, async (req, res) => {
    try {
      const { meterId, billingPeriod } = req.query;
      const readings = await storage.getMeterReadings(meterId, billingPeriod);
      res.json(readings);
    } catch (error) {
      console.error("Error fetching meter readings:", error);
      res.status(500).json({ message: "Failed to fetch meter readings" });
    }
  });
  app2.post("/api/meter-readings", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user?.id || req.user?.claims?.sub;
      const validatedData = insertMeterReadingSchema.parse({ ...req.body, readBy: userId });
      const lastReading = await storage.getLastMeterReading(validatedData.meterId);
      const previousReading = lastReading?.readingValue || "0";
      const consumption = parseFloat(validatedData.readingValue) - parseFloat(previousReading);
      const reading = await storage.createMeterReading({
        ...validatedData,
        previousReading,
        consumption: consumption.toString()
      });
      await storage.createAuditLog({
        tableName: "meter_readings",
        recordId: reading.id,
        action: "INSERT",
        newValues: reading,
        userId,
        userName: req.user?.name || "Unknown",
        module: "Meter Reading",
        description: `Recorded meter reading: ${validatedData.readingValue} units`
      });
      res.status(201).json(reading);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error creating meter reading:", error);
        res.status(500).json({ message: "Failed to create meter reading" });
      }
    }
  });
  app2.get("/api/property-registration-requests", isAuthenticated, async (req, res) => {
    try {
      const { status } = req.query;
      const requests = await storage.getPropertyRegistrationRequests(status);
      res.json(requests);
    } catch (error) {
      console.error("Error fetching property registration requests:", error);
      res.status(500).json({ message: "Failed to fetch property registration requests" });
    }
  });
  app2.post("/api/property-registration-requests", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user?.id || req.user?.claims?.sub;
      const modules = await storage.getSystemModules();
      const meterModule = modules.find((m) => m.moduleName === "meter-reading");
      if (!meterModule?.canRegisterProperties) {
        return res.status(403).json({ message: "Property registration not enabled for meter readers" });
      }
      const validatedData = insertPropertyRegistrationRequestSchema.parse({ ...req.body, requestedBy: userId });
      const request = await storage.createPropertyRegistrationRequest(validatedData);
      await storage.createAuditLog({
        tableName: "property_registration_requests",
        recordId: request.id,
        action: "INSERT",
        newValues: request,
        userId,
        userName: req.user?.name || "Unknown",
        module: "Property Registration",
        description: `Requested property registration for ${validatedData.propertyAddress}`
      });
      res.status(201).json(request);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error creating property registration request:", error);
        res.status(500).json({ message: "Failed to create property registration request" });
      }
    }
  });
  app2.patch("/api/property-registration-requests/:id/status", isAuthenticated, async (req, res) => {
    try {
      const { status, adminNotes } = req.body;
      const userId = req.user?.id || req.user?.claims?.sub;
      await storage.updatePropertyRegistrationRequestStatus(req.params.id, status, adminNotes, userId);
      await storage.createAuditLog({
        tableName: "property_registration_requests",
        recordId: req.params.id,
        action: "UPDATE",
        changedFields: ["status", "adminNotes", "approvedBy"],
        newValues: { status, adminNotes, approvedBy: userId },
        userId,
        userName: req.user?.name || "Unknown",
        module: "Property Registration",
        description: `${status.charAt(0).toUpperCase() + status.slice(1)} property registration request`
      });
      res.json({ message: "Property registration request updated successfully" });
    } catch (error) {
      console.error("Error updating property registration request:", error);
      res.status(500).json({ message: "Failed to update property registration request" });
    }
  });
  app2.get("/api/admin/system-modules", isAuthenticated, async (req, res) => {
    try {
      if (req.user?.role !== "admin" && req.user?.department !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }
      const modules = await storage.getSystemModules();
      res.json(modules);
    } catch (error) {
      console.error("Error fetching system modules:", error);
      res.status(500).json({ message: "Failed to fetch system modules" });
    }
  });
  app2.patch("/api/admin/system-modules/:moduleName", isAuthenticated, async (req, res) => {
    try {
      if (req.user?.role !== "admin" && req.user?.department !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }
      const { isEnabled, canRegisterProperties } = req.body;
      const userId = req.user?.id || req.user?.claims?.sub;
      await storage.updateSystemModule(req.params.moduleName, isEnabled, canRegisterProperties, userId);
      await storage.createAuditLog({
        tableName: "system_modules",
        recordId: req.params.moduleName,
        action: "UPDATE",
        changedFields: ["isEnabled", "canRegisterProperties"],
        newValues: { isEnabled, canRegisterProperties },
        userId,
        userName: req.user?.name || "Unknown",
        module: "System Administration",
        description: `Updated module ${req.params.moduleName}: enabled=${isEnabled}, canRegisterProperties=${canRegisterProperties}`
      });
      res.json({ message: "System module updated successfully" });
    } catch (error) {
      console.error("Error updating system module:", error);
      res.status(500).json({ message: "Failed to update system module" });
    }
  });
  app2.get("/api/admin/system-settings", isAuthenticated, async (req, res) => {
    try {
      if (req.user?.role !== "admin" && req.user?.department !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }
      const { category } = req.query;
      const settings = await storage.getSystemSettings(category);
      res.json(settings);
    } catch (error) {
      console.error("Error fetching system settings:", error);
      res.status(500).json({ message: "Failed to fetch system settings" });
    }
  });
  app2.get("/api/customer-accounts", isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const offset = parseInt(req.query.offset) || 0;
      const accounts = await storage.getCustomerAccounts(limit, offset);
      res.json(accounts);
    } catch (error) {
      console.error("Error fetching customer accounts:", error);
      res.status(500).json({ message: "Failed to fetch customer accounts" });
    }
  });
  app2.post("/api/customer-accounts", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertCustomerAccountSchema.parse(req.body);
      const account = await storage.createCustomerAccount(validatedData);
      const userId = req.user?.id || req.user?.claims?.sub;
      await storage.createAuditLog({
        tableName: "customer_accounts",
        recordId: account.id,
        action: "INSERT",
        newValues: account,
        userId,
        userName: req.user?.name || "Unknown",
        module: "Customer Management",
        description: `Created customer account ${account.accountNumber} for ${account.customerName}`
      });
      res.status(201).json(account);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error creating customer account:", error);
        res.status(500).json({ message: "Failed to create customer account" });
      }
    }
  });
  app2.get("/api/customer-accounts/search", isAuthenticated, async (req, res) => {
    try {
      const { query } = req.query;
      if (!query) {
        return res.status(400).json({ message: "Search query required" });
      }
      const accounts = await storage.searchCustomerAccounts(query);
      res.json(accounts);
    } catch (error) {
      console.error("Error searching customer accounts:", error);
      res.status(500).json({ message: "Failed to search customer accounts" });
    }
  });
  app2.post("/api/payments", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user?.id || req.user?.claims?.sub;
      const validatedData = insertPaymentSchema.parse({ ...req.body, operatorId: userId });
      const payment = await storage.createPayment(validatedData);
      const balanceChange = -parseFloat(payment.amount);
      await storage.updateCustomerBalance(payment.accountId, balanceChange);
      await storage.createAuditLog({
        tableName: "payments",
        recordId: payment.id,
        action: "INSERT",
        newValues: payment,
        userId,
        userName: req.user?.name || "Unknown",
        module: "Payment Processing",
        description: `Processed payment ${payment.paymentNumber} of $${payment.amount} via ${payment.paymentMethod}`
      });
      res.status(201).json(payment);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error processing payment:", error);
        res.status(500).json({ message: "Failed to process payment" });
      }
    }
  });
  app2.get("/api/payments", isAuthenticated, async (req, res) => {
    try {
      const { accountId, zoneId } = req.query;
      const payments2 = await storage.getPayments(accountId, zoneId);
      res.json(payments2);
    } catch (error) {
      console.error("Error fetching payments:", error);
      res.status(500).json({ message: "Failed to fetch payments" });
    }
  });
  app2.post("/api/payments/paynow", isAuthenticated, async (req, res) => {
    try {
      const { amount, email, phone, accountId } = req.body;
      const paynowData = {
        id: Math.random().toString(36).substring(7),
        amount,
        email,
        phone,
        status: "pending",
        pollUrl: `https://api.paynow.co.zw/payments/${Math.random().toString(36).substring(7)}`
      };
      const payment = await storage.createPayment({
        accountId,
        amount: amount.toString(),
        paymentMethod: "paynow",
        paymentGateway: "paynow",
        transactionReference: paynowData.id,
        operatorId: req.user?.id || req.user?.claims?.sub,
        status: "pending"
      });
      res.json({
        payment,
        paynowData,
        redirectUrl: `https://www.paynow.co.zw/payment/${paynowData.id}`
      });
    } catch (error) {
      console.error("Error initiating PayNow payment:", error);
      res.status(500).json({ message: "Failed to initiate PayNow payment" });
    }
  });
  app2.post("/api/payments/payfast", isAuthenticated, async (req, res) => {
    try {
      const { amount, email, accountId } = req.body;
      const payfastData = {
        merchant_id: process.env.PAYFAST_MERCHANT_ID || "10000100",
        merchant_key: process.env.PAYFAST_MERCHANT_KEY || "46f0cd694581a",
        amount,
        item_name: "Municipal Services Payment",
        return_url: `${req.protocol}://${req.get("host")}/payment-success`,
        cancel_url: `${req.protocol}://${req.get("host")}/payment-cancel`,
        notify_url: `${req.protocol}://${req.get("host")}/api/payments/payfast/notify`
      };
      const payment = await storage.createPayment({
        accountId,
        amount: amount.toString(),
        paymentMethod: "payfast",
        paymentGateway: "payfast",
        operatorId: req.user?.id || req.user?.claims?.sub,
        status: "pending"
      });
      res.json({
        payment,
        payfastData,
        formUrl: process.env.PAYFAST_URL || "https://sandbox.payfast.co.za/eng/process"
      });
    } catch (error) {
      console.error("Error initiating PayFast payment:", error);
      res.status(500).json({ message: "Failed to initiate PayFast payment" });
    }
  });
  app2.get("/api/audit-logs", isAuthenticated, async (req, res) => {
    try {
      if (req.user?.role !== "admin" && req.user?.department !== "admin") {
        return res.status(403).json({ message: "Admin access required for audit logs" });
      }
      const { tableName, recordId, userId, limit } = req.query;
      const logs = await storage.getAuditLogs(
        tableName,
        recordId,
        userId,
        parseInt(limit) || 100
      );
      res.json(logs);
    } catch (error) {
      console.error("Error fetching audit logs:", error);
      res.status(500).json({ message: "Failed to fetch audit logs" });
    }
  });
  app2.get("/api/audit-logs/user/:userId", isAuthenticated, async (req, res) => {
    try {
      const requestingUserId = req.user?.id || req.user?.claims?.sub;
      const targetUserId = req.params.userId;
      if (requestingUserId !== targetUserId && req.user?.role !== "admin") {
        return res.status(403).json({ message: "Can only view your own activity" });
      }
      const limit = parseInt(req.query.limit) || 50;
      const logs = await storage.getUserActivityLog(targetUserId, limit);
      res.json(logs);
    } catch (error) {
      console.error("Error fetching user activity log:", error);
      res.status(500).json({ message: "Failed to fetch user activity log" });
    }
  });
  app2.get("/api/customer-portal/account/:accountId", isAuthenticated, async (req, res) => {
    try {
      const summary = await storage.getCustomerAccountSummary(req.params.accountId);
      res.json(summary);
    } catch (error) {
      console.error("Error fetching customer account summary:", error);
      res.status(500).json({ message: "Failed to fetch account summary" });
    }
  });
  app2.get("/api/customer-portal/bills/:accountId", isAuthenticated, async (req, res) => {
    try {
      const { status } = req.query;
      const bills2 = await storage.getCustomerBills(req.params.accountId, status);
      res.json(bills2);
    } catch (error) {
      console.error("Error fetching customer bills:", error);
      res.status(500).json({ message: "Failed to fetch bills" });
    }
  });
  app2.get("/api/customer-portal/payment-history/:accountId", isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 20;
      const payments2 = await storage.getCustomerPaymentHistory(req.params.accountId, limit);
      res.json(payments2);
    } catch (error) {
      console.error("Error fetching payment history:", error);
      res.status(500).json({ message: "Failed to fetch payment history" });
    }
  });
  app2.get("/api/finance/chart-of-accounts", isAuthenticated, async (req, res) => {
    try {
      const accounts = await storage.getChartOfAccounts();
      res.json(accounts);
    } catch (error) {
      console.error("Error fetching chart of accounts:", error);
      res.status(500).json({ message: "Failed to fetch chart of accounts" });
    }
  });
  app2.post("/api/finance/chart-of-accounts", isAuthenticated, async (req, res) => {
    try {
      const parsed = insertChartOfAccountsSchema.parse(req.body);
      const account = await storage.createChartOfAccount(parsed);
      res.status(201).json(account);
    } catch (error) {
      console.error("Error creating chart of account:", error);
      res.status(500).json({ message: "Failed to create account" });
    }
  });
  app2.put("/api/finance/chart-of-accounts/:id", isAuthenticated, async (req, res) => {
    try {
      const account = await storage.updateChartOfAccount(req.params.id, req.body);
      res.json(account);
    } catch (error) {
      console.error("Error updating chart of account:", error);
      res.status(500).json({ message: "Failed to update account" });
    }
  });
  app2.delete("/api/finance/chart-of-accounts/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deleteChartOfAccount(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting chart of account:", error);
      res.status(500).json({ message: "Failed to delete account" });
    }
  });
  app2.get("/api/finance/general-ledger", isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const offset = parseInt(req.query.offset) || 0;
      const entries = await storage.getGeneralLedgerEntries(limit, offset);
      res.json(entries);
    } catch (error) {
      console.error("Error fetching general ledger entries:", error);
      res.status(500).json({ message: "Failed to fetch general ledger entries" });
    }
  });
  app2.post("/api/finance/general-ledger", isAuthenticated, async (req, res) => {
    try {
      const parsed = insertGeneralLedgerSchema.parse(req.body);
      const entry = await storage.createGeneralLedgerEntry(parsed);
      res.status(201).json(entry);
    } catch (error) {
      console.error("Error creating general ledger entry:", error);
      res.status(500).json({ message: "Failed to create entry" });
    }
  });
  app2.put("/api/finance/general-ledger/:id", isAuthenticated, async (req, res) => {
    try {
      const entry = await storage.updateGeneralLedgerEntry(req.params.id, req.body);
      res.json(entry);
    } catch (error) {
      console.error("Error updating general ledger entry:", error);
      res.status(500).json({ message: "Failed to update entry" });
    }
  });
  app2.get("/api/finance/account-balance/:accountId", isAuthenticated, async (req, res) => {
    try {
      const balance = await storage.getAccountBalance(req.params.accountId);
      res.json({ balance });
    } catch (error) {
      console.error("Error fetching account balance:", error);
      res.status(500).json({ message: "Failed to fetch account balance" });
    }
  });
  app2.get("/api/finance/cashbook", isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const offset = parseInt(req.query.offset) || 0;
      const entries = await storage.getCashbookEntries(limit, offset);
      res.json(entries);
    } catch (error) {
      console.error("Error fetching cashbook entries:", error);
      res.status(500).json({ message: "Failed to fetch cashbook entries" });
    }
  });
  app2.post("/api/finance/cashbook", isAuthenticated, async (req, res) => {
    try {
      const parsed = insertCashbookSchema.parse(req.body);
      const entry = await storage.createCashbookEntry(parsed);
      res.status(201).json(entry);
    } catch (error) {
      console.error("Error creating cashbook entry:", error);
      res.status(500).json({ message: "Failed to create entry" });
    }
  });
  app2.put("/api/finance/cashbook/:id", isAuthenticated, async (req, res) => {
    try {
      const entry = await storage.updateCashbookEntry(req.params.id, req.body);
      res.json(entry);
    } catch (error) {
      console.error("Error updating cashbook entry:", error);
      res.status(500).json({ message: "Failed to update entry" });
    }
  });
  app2.get("/api/finance/debtors", isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const offset = parseInt(req.query.offset) || 0;
      const debtors = await storage.getDebtors(limit, offset);
      res.json(debtors);
    } catch (error) {
      console.error("Error fetching debtors:", error);
      res.status(500).json({ message: "Failed to fetch debtors" });
    }
  });
  app2.post("/api/finance/debtors", isAuthenticated, async (req, res) => {
    try {
      const parsed = insertDebtorsManagementSchema.parse(req.body);
      const debtor = await storage.createDebtor(parsed);
      res.status(201).json(debtor);
    } catch (error) {
      console.error("Error creating debtor:", error);
      res.status(500).json({ message: "Failed to create debtor" });
    }
  });
  app2.put("/api/finance/debtors/:id", isAuthenticated, async (req, res) => {
    try {
      const debtor = await storage.updateDebtor(req.params.id, req.body);
      res.json(debtor);
    } catch (error) {
      console.error("Error updating debtor:", error);
      res.status(500).json({ message: "Failed to update debtor" });
    }
  });
  app2.delete("/api/finance/debtors/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deleteDebtor(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting debtor:", error);
      res.status(500).json({ message: "Failed to delete debtor" });
    }
  });
  app2.get("/api/finance/invoices", isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const offset = parseInt(req.query.offset) || 0;
      const invoices = await storage.getMunicipalInvoices(limit, offset);
      res.json(invoices);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      res.status(500).json({ message: "Failed to fetch invoices" });
    }
  });
  app2.post("/api/finance/invoices", isAuthenticated, async (req, res) => {
    try {
      const parsed = insertMunicipalInvoicesSchema.parse(req.body);
      const invoice = await storage.createMunicipalInvoice(parsed);
      res.status(201).json(invoice);
    } catch (error) {
      console.error("Error creating invoice:", error);
      res.status(500).json({ message: "Failed to create invoice" });
    }
  });
  app2.put("/api/finance/invoices/:id", isAuthenticated, async (req, res) => {
    try {
      const invoice = await storage.updateMunicipalInvoice(req.params.id, req.body);
      res.json(invoice);
    } catch (error) {
      console.error("Error updating invoice:", error);
      res.status(500).json({ message: "Failed to update invoice" });
    }
  });
  app2.delete("/api/finance/invoices/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deleteMunicipalInvoice(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting invoice:", error);
      res.status(500).json({ message: "Failed to delete invoice" });
    }
  });
  app2.get("/api/finance/vouchers", isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const offset = parseInt(req.query.offset) || 0;
      const vouchers = await storage.getVoucherPayments(limit, offset);
      res.json(vouchers);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
      res.status(500).json({ message: "Failed to fetch vouchers" });
    }
  });
  app2.post("/api/finance/vouchers", isAuthenticated, async (req, res) => {
    try {
      const parsed = insertVoucherPaymentsSchema.parse(req.body);
      const voucher = await storage.createVoucherPayment(parsed);
      res.status(201).json(voucher);
    } catch (error) {
      console.error("Error creating voucher:", error);
      res.status(500).json({ message: "Failed to create voucher" });
    }
  });
  app2.put("/api/finance/vouchers/:id", isAuthenticated, async (req, res) => {
    try {
      const voucher = await storage.updateVoucherPayment(req.params.id, req.body);
      res.json(voucher);
    } catch (error) {
      console.error("Error updating voucher:", error);
      res.status(500).json({ message: "Failed to update voucher" });
    }
  });
  app2.delete("/api/finance/vouchers/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deleteVoucherPayment(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting voucher:", error);
      res.status(500).json({ message: "Failed to delete voucher" });
    }
  });
  app2.get("/api/finance/receipts", isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const offset = parseInt(req.query.offset) || 0;
      const receipts2 = await storage.getReceipts(limit, offset);
      res.json(receipts2);
    } catch (error) {
      console.error("Error fetching receipts:", error);
      res.status(500).json({ message: "Failed to fetch receipts" });
    }
  });
  app2.post("/api/finance/receipts", isAuthenticated, async (req, res) => {
    try {
      const parsed = insertReceiptsSchema.parse(req.body);
      const receipt = await storage.createReceipt(parsed);
      res.status(201).json(receipt);
    } catch (error) {
      console.error("Error creating receipt:", error);
      res.status(500).json({ message: "Failed to create receipt" });
    }
  });
  app2.put("/api/finance/receipts/:id", isAuthenticated, async (req, res) => {
    try {
      const receipt = await storage.updateReceipt(req.params.id, req.body);
      res.json(receipt);
    } catch (error) {
      console.error("Error updating receipt:", error);
      res.status(500).json({ message: "Failed to update receipt" });
    }
  });
  app2.get("/api/finance/fixed-assets", isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const offset = parseInt(req.query.offset) || 0;
      const assets2 = await storage.getFixedAssets(limit, offset);
      res.json(assets2);
    } catch (error) {
      console.error("Error fetching fixed assets:", error);
      res.status(500).json({ message: "Failed to fetch fixed assets" });
    }
  });
  app2.post("/api/finance/fixed-assets", isAuthenticated, async (req, res) => {
    try {
      const parsed = insertFixedAssetsSchema.parse(req.body);
      const asset = await storage.createFixedAsset(parsed);
      res.status(201).json(asset);
    } catch (error) {
      console.error("Error creating fixed asset:", error);
      res.status(500).json({ message: "Failed to create fixed asset" });
    }
  });
  app2.put("/api/finance/fixed-assets/:id", isAuthenticated, async (req, res) => {
    try {
      const asset = await storage.updateFixedAsset(req.params.id, req.body);
      res.json(asset);
    } catch (error) {
      console.error("Error updating fixed asset:", error);
      res.status(500).json({ message: "Failed to update fixed asset" });
    }
  });
  app2.delete("/api/finance/fixed-assets/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deleteFixedAsset(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting fixed asset:", error);
      res.status(500).json({ message: "Failed to delete fixed asset" });
    }
  });
  app2.get("/api/finance/bank-accounts", isAuthenticated, async (req, res) => {
    try {
      const accounts = await storage.getBankAccounts();
      res.json(accounts);
    } catch (error) {
      console.error("Error fetching bank accounts:", error);
      res.status(500).json({ message: "Failed to fetch bank accounts" });
    }
  });
  app2.post("/api/finance/bank-accounts", isAuthenticated, async (req, res) => {
    try {
      const parsed = insertBankAccountsSchema.parse(req.body);
      const account = await storage.createBankAccount(parsed);
      res.status(201).json(account);
    } catch (error) {
      console.error("Error creating bank account:", error);
      res.status(500).json({ message: "Failed to create bank account" });
    }
  });
  app2.put("/api/finance/bank-accounts/:id", isAuthenticated, async (req, res) => {
    try {
      const account = await storage.updateBankAccount(req.params.id, req.body);
      res.json(account);
    } catch (error) {
      console.error("Error updating bank account:", error);
      res.status(500).json({ message: "Failed to update bank account" });
    }
  });
  app2.delete("/api/finance/bank-accounts/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deleteBankAccount(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting bank account:", error);
      res.status(500).json({ message: "Failed to delete bank account" });
    }
  });
  app2.get("/api/finance/currencies", isAuthenticated, async (req, res) => {
    try {
      const currencies2 = await storage.getCurrencies();
      res.json(currencies2);
    } catch (error) {
      console.error("Error fetching currencies:", error);
      res.status(500).json({ message: "Failed to fetch currencies" });
    }
  });
  app2.post("/api/finance/currencies", isAuthenticated, async (req, res) => {
    try {
      const parsed = insertCurrenciesSchema.parse(req.body);
      const currency = await storage.createCurrency(parsed);
      res.status(201).json(currency);
    } catch (error) {
      console.error("Error creating currency:", error);
      res.status(500).json({ message: "Failed to create currency" });
    }
  });
  app2.put("/api/finance/currencies/:id", isAuthenticated, async (req, res) => {
    try {
      const currency = await storage.updateCurrency(req.params.id, req.body);
      res.json(currency);
    } catch (error) {
      console.error("Error updating currency:", error);
      res.status(500).json({ message: "Failed to update currency" });
    }
  });
  app2.delete("/api/finance/currencies/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deleteCurrency(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting currency:", error);
      res.status(500).json({ message: "Failed to delete currency" });
    }
  });
  app2.get("/api/payroll/employees", isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const offset = parseInt(req.query.offset) || 0;
      const employees2 = await storage.getEmployees(limit, offset);
      res.json(employees2);
    } catch (error) {
      console.error("Error fetching employees:", error);
      res.status(500).json({ message: "Failed to fetch employees" });
    }
  });
  app2.post("/api/payroll/employees", isAuthenticated, async (req, res) => {
    try {
      const parsed = insertEmployeesSchema.parse(req.body);
      const employee = await storage.createEmployee(parsed);
      res.status(201).json(employee);
    } catch (error) {
      console.error("Error creating employee:", error);
      res.status(500).json({ message: "Failed to create employee" });
    }
  });
  app2.put("/api/payroll/employees/:id", isAuthenticated, async (req, res) => {
    try {
      const employee = await storage.updateEmployee(req.params.id, req.body);
      res.json(employee);
    } catch (error) {
      console.error("Error updating employee:", error);
      res.status(500).json({ message: "Failed to update employee" });
    }
  });
  app2.delete("/api/payroll/employees/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deleteEmployee(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting employee:", error);
      res.status(500).json({ message: "Failed to delete employee" });
    }
  });
  app2.get("/api/payroll/runs", isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const offset = parseInt(req.query.offset) || 0;
      const runs = await storage.getPayrollRuns(limit, offset);
      res.json(runs);
    } catch (error) {
      console.error("Error fetching payroll runs:", error);
      res.status(500).json({ message: "Failed to fetch payroll runs" });
    }
  });
  app2.post("/api/payroll/runs", isAuthenticated, async (req, res) => {
    try {
      const parsed = insertPayrollRunsSchema.parse(req.body);
      const run = await storage.createPayrollRun(parsed);
      res.status(201).json(run);
    } catch (error) {
      console.error("Error creating payroll run:", error);
      res.status(500).json({ message: "Failed to create payroll run" });
    }
  });
  app2.put("/api/payroll/runs/:id", isAuthenticated, async (req, res) => {
    try {
      const run = await storage.updatePayrollRun(req.params.id, req.body);
      res.json(run);
    } catch (error) {
      console.error("Error updating payroll run:", error);
      res.status(500).json({ message: "Failed to update payroll run" });
    }
  });
  app2.delete("/api/payroll/runs/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deletePayrollRun(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting payroll run:", error);
      res.status(500).json({ message: "Failed to delete payroll run" });
    }
  });
  app2.get("/api/payroll/items/:payrollRunId", isAuthenticated, async (req, res) => {
    try {
      const items = await storage.getPayrollItems(req.params.payrollRunId);
      res.json(items);
    } catch (error) {
      console.error("Error fetching payroll items:", error);
      res.status(500).json({ message: "Failed to fetch payroll items" });
    }
  });
  app2.post("/api/payroll/items", isAuthenticated, async (req, res) => {
    try {
      const parsed = insertPayrollItemsSchema.parse(req.body);
      const item = await storage.createPayrollItem(parsed);
      res.status(201).json(item);
    } catch (error) {
      console.error("Error creating payroll item:", error);
      res.status(500).json({ message: "Failed to create payroll item" });
    }
  });
  app2.put("/api/payroll/items/:id", isAuthenticated, async (req, res) => {
    try {
      const item = await storage.updatePayrollItem(req.params.id, req.body);
      res.json(item);
    } catch (error) {
      console.error("Error updating payroll item:", error);
      res.status(500).json({ message: "Failed to update payroll item" });
    }
  });
  app2.get("/api/payroll/leave-types", isAuthenticated, async (req, res) => {
    try {
      const leaveTypes2 = await storage.getLeaveTypes();
      res.json(leaveTypes2);
    } catch (error) {
      console.error("Error fetching leave types:", error);
      res.status(500).json({ message: "Failed to fetch leave types" });
    }
  });
  app2.post("/api/payroll/leave-types", isAuthenticated, async (req, res) => {
    try {
      const parsed = insertLeaveTypesSchema.parse(req.body);
      const leaveType = await storage.createLeaveType(parsed);
      res.status(201).json(leaveType);
    } catch (error) {
      console.error("Error creating leave type:", error);
      res.status(500).json({ message: "Failed to create leave type" });
    }
  });
  app2.put("/api/payroll/leave-types/:id", isAuthenticated, async (req, res) => {
    try {
      const leaveType = await storage.updateLeaveType(req.params.id, req.body);
      res.json(leaveType);
    } catch (error) {
      console.error("Error updating leave type:", error);
      res.status(500).json({ message: "Failed to update leave type" });
    }
  });
  app2.delete("/api/payroll/leave-types/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deleteLeaveType(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting leave type:", error);
      res.status(500).json({ message: "Failed to delete leave type" });
    }
  });
  app2.get("/api/payroll/leave-applications", isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const offset = parseInt(req.query.offset) || 0;
      const applications = await storage.getLeaveApplications(limit, offset);
      res.json(applications);
    } catch (error) {
      console.error("Error fetching leave applications:", error);
      res.status(500).json({ message: "Failed to fetch leave applications" });
    }
  });
  app2.post("/api/payroll/leave-applications", isAuthenticated, async (req, res) => {
    try {
      const parsed = insertLeaveApplicationsSchema.parse(req.body);
      const application = await storage.createLeaveApplication(parsed);
      res.status(201).json(application);
    } catch (error) {
      console.error("Error creating leave application:", error);
      res.status(500).json({ message: "Failed to create leave application" });
    }
  });
  app2.put("/api/payroll/leave-applications/:id", isAuthenticated, async (req, res) => {
    try {
      const application = await storage.updateLeaveApplication(req.params.id, req.body);
      res.json(application);
    } catch (error) {
      console.error("Error updating leave application:", error);
      res.status(500).json({ message: "Failed to update leave application" });
    }
  });
  app2.delete("/api/payroll/leave-applications/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deleteLeaveApplication(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting leave application:", error);
      res.status(500).json({ message: "Failed to delete leave application" });
    }
  });
  app2.get("/api/payroll/performance-reviews", isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const offset = parseInt(req.query.offset) || 0;
      const reviews = await storage.getPerformanceReviews(limit, offset);
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching performance reviews:", error);
      res.status(500).json({ message: "Failed to fetch performance reviews" });
    }
  });
  app2.post("/api/payroll/performance-reviews", isAuthenticated, async (req, res) => {
    try {
      const parsed = insertPerformanceReviewsSchema.parse(req.body);
      const review = await storage.createPerformanceReview(parsed);
      res.status(201).json(review);
    } catch (error) {
      console.error("Error creating performance review:", error);
      res.status(500).json({ message: "Failed to create performance review" });
    }
  });
  app2.put("/api/payroll/performance-reviews/:id", isAuthenticated, async (req, res) => {
    try {
      const review = await storage.updatePerformanceReview(req.params.id, req.body);
      res.json(review);
    } catch (error) {
      console.error("Error updating performance review:", error);
      res.status(500).json({ message: "Failed to update performance review" });
    }
  });
  app2.delete("/api/payroll/performance-reviews/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deletePerformanceReview(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting performance review:", error);
      res.status(500).json({ message: "Failed to delete performance review" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  if (process.env.NODE_ENV === "production" || process.env.SEED_ADMIN === "true") {
    await seedDefaultAdmin();
  }
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
