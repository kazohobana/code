import {
  users,
  housingApplications,
  customerComplaints,
  facilityBookings,
  facilities,
  properties,
  cemeteries,
  graves,
  burials,
  vehicles,
  fuelRecords,
  waterConnections,
  meterApplications,
  permits,
  bills,
  planningApplications,
  assets,
  vendors,
  purchaseOrders,
  councilMeetings,
  publicNotices,
  meters,
  meterReadings,
  propertyRegistrationRequests,
  systemModules,
  systemSettings,
  billingRates,
  customerAccounts,
  monthlyBills,
  zones,
  posTerminals,
  payments,
  auditLog,
  paymentGateways,
  // Financial Management Tables
  chartOfAccounts,
  generalLedger,
  cashbook,
  debtorsManagement,
  municipalInvoices,
  voucherPayments,
  receipts,
  fixedAssets,
  bankAccounts,
  currencies,
  // Payroll Management Tables
  employees,
  payrollRuns,
  payrollItems,
  leaveTypes,
  leaveApplications,
  performanceReviews,
  // Face Scan Attendance Tables
  attendanceRecords,
  faceTemplates,
  attendanceSettings,
  // Super Admin Tables
  systemRoles,
  roleModuleAssignments,
  auditLogs,
  systemNotifications,
  systemBackups,
  type User,
  type UpsertUser,
  type HousingApplication,
  type InsertHousingApplication,
  type CustomerComplaint,
  type InsertCustomerComplaint,
  type FacilityBooking,
  type InsertFacilityBooking,
  type Facility,
  type Property,
  type Cemetery,
  type InsertCemetery,
  type Grave,
  type InsertGrave,
  type Burial,
  type InsertBurial,
  type Vehicle,
  type WaterConnection,
  type MeterApplication,
  type InsertMeterApplication,
  type InsertPermit,
  type Permit,
  type InsertBill,
  type Bill,
  type InsertPlanningApplication,
  type PlanningApplication,
  type InsertAsset,
  type Asset,
  type InsertVendor,
  type Vendor,
  type InsertPurchaseOrder,
  type PurchaseOrder,
  type InsertCouncilMeeting,
  type CouncilMeeting,
  type InsertPublicNotice,
  type PublicNotice,
  type Meter,
  type InsertMeter,
  type MeterReading,
  type InsertMeterReading,
  type PropertyRegistrationRequest,
  type InsertPropertyRegistrationRequest,
  type SystemModule,
  type InsertSystemModule,
  type BillingRate,
  type InsertBillingRate,
  type CustomerAccount,
  type InsertCustomerAccount,
  type MonthlyBill,
  type InsertMonthlyBill,
  type Zone,
  type InsertZone,
  type PosTerminal,
  type InsertPosTerminal,
  type Payment,
  type InsertPayment,
  type PaymentGateway,
  type InsertPaymentGateway,
  // Financial Management Types
  type ChartOfAccounts,
  type InsertChartOfAccounts,
  type GeneralLedger,
  type InsertGeneralLedger,
  type Cashbook,
  type InsertCashbook,
  type DebtorsManagement,
  type InsertDebtorsManagement,
  type MunicipalInvoices,
  type InsertMunicipalInvoices,
  type VoucherPayments,
  type InsertVoucherPayments,
  type Receipts,
  type InsertReceipts,
  type FixedAssets,
  type InsertFixedAssets,
  type BankAccounts,
  type InsertBankAccounts,
  type Currencies,
  type InsertCurrencies,
  // Payroll Management Types
  type Employees,
  type InsertEmployees,
  type PayrollRuns,
  type InsertPayrollRuns,
  type PayrollItems,
  type InsertPayrollItems,
  type LeaveTypes,
  type InsertLeaveTypes,
  type LeaveApplications,
  type InsertLeaveApplications,
  type PerformanceReviews,
  type InsertPerformanceReviews,
  type AttendanceRecord,
  type InsertAttendanceRecord,
  type FaceTemplate,
  type InsertFaceTemplate,
  type AttendanceSettings,
  type InsertAttendanceSettings,
  type SystemRole,
  type InsertSystemRole,
  type RoleModuleAssignment,
  type InsertRoleModuleAssignment,
  type AuditLog,
  type InsertAuditLog,
  type SystemNotification,
  type InsertSystemNotification,
  type SystemBackup,
  type InsertSystemBackup,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc, count, and, ilike, gte, lte } from "drizzle-orm";

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  getUsersByDepartment(department: string): Promise<User[]>;
  updateUserStatus(id: string, isActive: boolean): Promise<void>;

  // Housing Management
  createHousingApplication(application: InsertHousingApplication): Promise<HousingApplication>;
  getHousingApplications(limit?: number, offset?: number): Promise<HousingApplication[]>;
  getHousingApplicationById(id: string): Promise<HousingApplication | undefined>;
  updateHousingApplicationStatus(id: string, status: string, reviewedBy?: string): Promise<void>;
  getHousingApplicationsByStatus(status: string): Promise<HousingApplication[]>;

  // Customer Service
  createCustomerComplaint(complaint: InsertCustomerComplaint): Promise<CustomerComplaint>;
  getCustomerComplaints(limit?: number, offset?: number): Promise<CustomerComplaint[]>;
  getCustomerComplaintById(id: string): Promise<CustomerComplaint | undefined>;
  updateComplaintStatus(id: string, status: string, assignedTo?: string): Promise<void>;
  getComplaintsByDepartment(department: string): Promise<CustomerComplaint[]>;

  // Facility Management
  getFacilities(): Promise<Facility[]>;
  createFacilityBooking(booking: InsertFacilityBooking): Promise<FacilityBooking>;
  getFacilityBookings(limit?: number, offset?: number): Promise<FacilityBooking[]>;
  getFacilityBookingById(id: string): Promise<FacilityBooking | undefined>;
  updateBookingStatus(id: string, status: string): Promise<void>;

  // Property Management
  getProperties(limit?: number, offset?: number): Promise<Property[]>;
  getPropertyById(id: string): Promise<Property | undefined>;
  searchProperties(query: string): Promise<Property[]>;

  // Cemetery Management
  getCemeteries(): Promise<Cemetery[]>;
  createCemetery(cemetery: InsertCemetery): Promise<Cemetery>;
  updateCemetery(id: string, cemetery: Partial<InsertCemetery>): Promise<Cemetery>;
  getCemeteryById(id: string): Promise<Cemetery | undefined>;
  getGraves(): Promise<Grave[]>;
  getGravesByCemetery(cemeteryId: string): Promise<Grave[]>;
  createGrave(grave: InsertGrave): Promise<Grave>;
  updateGrave(id: string, grave: Partial<InsertGrave>): Promise<Grave>;
  getGraveById(id: string): Promise<Grave | undefined>;
  createBurial(burial: InsertBurial): Promise<Burial>;
  getBurials(limit?: number, offset?: number): Promise<Burial[]>;
  updateBurial(id: string, burial: Partial<InsertBurial>): Promise<Burial>;

  // Fleet Management
  getVehicles(): Promise<Vehicle[]>;
  getVehicleById(id: string): Promise<Vehicle | undefined>;
  getFuelRecordsByVehicle(vehicleId: string, startDate?: Date, endDate?: Date): Promise<any[]>;

  // Water Management
  getWaterConnections(limit?: number, offset?: number): Promise<WaterConnection[]>;
  getWaterConnectionById(id: string): Promise<WaterConnection | undefined>;

  // Meter Applications
  createMeterApplication(application: InsertMeterApplication): Promise<MeterApplication>;
  getMeterApplications(limit?: number, offset?: number): Promise<MeterApplication[]>;
  getMeterApplicationById(id: string): Promise<MeterApplication | undefined>;
  updateMeterApplicationStatus(id: string, status: string, reviewedBy?: string, notes?: string): Promise<void>;
  getMeterApplicationsByStatus(status: string): Promise<MeterApplication[]>;

  // Permits & Licensing
  createPermit(permit: InsertPermit): Promise<Permit>;
  getPermits(limit?: number, offset?: number): Promise<Permit[]>;
  getPermitById(id: string): Promise<Permit | undefined>;
  updatePermitStatus(id: string, status: string, reviewedBy?: string): Promise<void>;
  getPermitsByType(permitType: string): Promise<Permit[]>;

  // Revenue Collection
  createBill(bill: InsertBill): Promise<Bill>;
  getBills(limit?: number, offset?: number): Promise<Bill[]>;
  getBillById(id: string): Promise<Bill | undefined>;
  updateBillPayment(id: string, paymentMethod: string, referenceNumber?: string): Promise<void>;
  getBillsByStatus(status: string): Promise<Bill[]>;
  getBillsByType(billType: string): Promise<Bill[]>;

  // Town Planning
  createPlanningApplication(application: InsertPlanningApplication): Promise<PlanningApplication>;
  getPlanningApplications(limit?: number, offset?: number): Promise<PlanningApplication[]>;
  getPlanningApplicationById(id: string): Promise<PlanningApplication | undefined>;
  updatePlanningApplicationStatus(id: string, status: string, reviewedBy?: string, comments?: string): Promise<void>;

  // Asset Management
  createAsset(asset: InsertAsset): Promise<Asset>;
  getAssets(limit?: number, offset?: number): Promise<Asset[]>;
  getAssetById(id: string): Promise<Asset | undefined>;
  updateAssetCondition(id: string, condition: string, lastInspectionDate?: Date): Promise<void>;
  getAssetsByDepartment(department: string): Promise<Asset[]>;
  getAssetsByCategory(category: string): Promise<Asset[]>;

  // Vendor Management
  createVendor(vendor: InsertVendor): Promise<Vendor>;
  getVendors(limit?: number, offset?: number): Promise<Vendor[]>;
  getVendorById(id: string): Promise<Vendor | undefined>;
  updateVendorStatus(id: string, status: string): Promise<void>;
  getVendorsByCategory(category: string): Promise<Vendor[]>;

  // Purchase Orders
  createPurchaseOrder(order: InsertPurchaseOrder): Promise<PurchaseOrder>;
  getPurchaseOrders(limit?: number, offset?: number): Promise<PurchaseOrder[]>;
  getPurchaseOrderById(id: string): Promise<PurchaseOrder | undefined>;
  updatePurchaseOrderStatus(id: string, status: string, approvedBy?: string): Promise<void>;
  getPurchaseOrdersByDepartment(department: string): Promise<PurchaseOrder[]>;

  // Council Meetings
  createCouncilMeeting(meeting: InsertCouncilMeeting): Promise<CouncilMeeting>;
  getCouncilMeetings(limit?: number, offset?: number): Promise<CouncilMeeting[]>;
  getCouncilMeetingById(id: string): Promise<CouncilMeeting | undefined>;
  updateMeetingMinutes(id: string, minutes: string, resolutions?: string[]): Promise<void>;

  // Public Notices
  createPublicNotice(notice: InsertPublicNotice): Promise<PublicNotice>;
  getPublicNotices(limit?: number, offset?: number): Promise<PublicNotice[]>;
  getPublicNoticeById(id: string): Promise<PublicNotice | undefined>;
  updateNoticeStatus(id: string, status: string): Promise<void>;
  getNoticesByCategory(category: string): Promise<PublicNotice[]>;

  // Meter Billing System
  createMeter(meter: InsertMeter): Promise<Meter>;
  getMeters(limit?: number, offset?: number): Promise<Meter[]>;
  getMeterById(id: string): Promise<Meter | undefined>;
  getMetersByProperty(propertyId: string): Promise<Meter[]>;
  searchMetersByNumber(meterNumber: string): Promise<Meter[]>;
  updateMeterStatus(id: string, status: string): Promise<void>;

  createMeterReading(reading: InsertMeterReading): Promise<MeterReading>;
  getMeterReadings(meterId?: string, billingPeriod?: string): Promise<MeterReading[]>;
  getMeterReadingById(id: string): Promise<MeterReading | undefined>;
  getLastMeterReading(meterId: string): Promise<MeterReading | undefined>;
  updateMeterReading(id: string, readingValue: string, notes?: string): Promise<void>;

  // Property Registration Requests (for meter readers)
  createPropertyRegistrationRequest(request: InsertPropertyRegistrationRequest): Promise<PropertyRegistrationRequest>;
  getPropertyRegistrationRequests(status?: string): Promise<PropertyRegistrationRequest[]>;
  getPropertyRegistrationRequestById(id: string): Promise<PropertyRegistrationRequest | undefined>;
  updatePropertyRegistrationRequestStatus(id: string, status: string, adminNotes?: string, approvedBy?: string): Promise<void>;

  // Super Admin and System Configuration
  getSystemModules(): Promise<SystemModule[]>;
  updateSystemModule(moduleName: string, isEnabled: boolean, canRegisterProperties?: boolean, lastModifiedBy?: string): Promise<void>;
  getSystemSettings(category?: string): Promise<any[]>;
  updateSystemSetting(settingKey: string, settingValue: string, lastModifiedBy: string): Promise<void>;

  // Billing and Rates Management
  createBillingRate(rate: InsertBillingRate): Promise<BillingRate>;
  getBillingRates(rateType?: string, category?: string): Promise<BillingRate[]>;
  getBillingRateById(id: string): Promise<BillingRate | undefined>;
  updateBillingRate(id: string, rate: string, effectiveDate: Date, createdBy: string): Promise<void>;
  getActiveBillingRates(rateType: string, category: string): Promise<BillingRate[]>;

  // Customer Account Management
  createCustomerAccount(account: InsertCustomerAccount): Promise<CustomerAccount>;
  getCustomerAccounts(limit?: number, offset?: number): Promise<CustomerAccount[]>;
  getCustomerAccountById(id: string): Promise<CustomerAccount | undefined>;
  getCustomerAccountByProperty(propertyId: string): Promise<CustomerAccount | undefined>;
  searchCustomerAccounts(query: string): Promise<CustomerAccount[]>;
  updateCustomerBalance(accountId: string, amount: number): Promise<void>;

  // Monthly Bills and Billing
  createMonthlyBill(bill: InsertMonthlyBill): Promise<MonthlyBill>;
  getMonthlyBills(accountId?: string, billingPeriod?: string): Promise<MonthlyBill[]>;
  getMonthlyBillById(id: string): Promise<MonthlyBill | undefined>;
  getUnpaidBills(accountId?: string): Promise<MonthlyBill[]>;
  updateMonthlyBillPayment(billId: string, amountPaid: number): Promise<void>;
  generateMonthlyBills(billingPeriod: string, generatedBy: string): Promise<void>;

  // Multi-zone POS and Payment System
  createZone(zone: InsertZone): Promise<Zone>;
  getZones(): Promise<Zone[]>;
  getZoneById(id: string): Promise<Zone | undefined>;
  updateZoneStatus(id: string, isActive: boolean): Promise<void>;

  createPosTerminal(terminal: InsertPosTerminal): Promise<PosTerminal>;
  getPosTerminals(zoneId?: string): Promise<PosTerminal[]>;
  getPosTerminalById(id: string): Promise<PosTerminal | undefined>;
  updateTerminalStatus(id: string, status: string): Promise<void>;
  updateTerminalDailyTotal(id: string, amount: number): Promise<void>;

  // Payment Processing
  createPayment(payment: InsertPayment): Promise<Payment>;
  getPayments(accountId?: string, zoneId?: string): Promise<Payment[]>;
  getPaymentById(id: string): Promise<Payment | undefined>;
  getPaymentsByDateRange(startDate: Date, endDate: Date, zoneId?: string): Promise<Payment[]>;
  updatePaymentStatus(id: string, status: string, gatewayResponse?: any): Promise<void>;
  getPaymentsByOperator(operatorId: string, date?: Date): Promise<Payment[]>;
  getDailyPaymentTotals(date: Date, zoneId?: string): Promise<any[]>;

  // Payment Gateway Management
  getPaymentGateways(): Promise<PaymentGateway[]>;
  getPaymentGatewayByName(gatewayName: string): Promise<PaymentGateway | undefined>;
  updatePaymentGateway(gatewayName: string, config: Partial<InsertPaymentGateway>, lastModifiedBy: string): Promise<void>;
  enablePaymentGateway(gatewayName: string, isEnabled: boolean, lastModifiedBy: string): Promise<void>;

  // Comprehensive Audit Trail
  createAuditLog(log: {
    tableName: string;
    recordId: string;
    action: 'INSERT' | 'UPDATE' | 'DELETE';
    oldValues?: any;
    newValues?: any;
    changedFields?: string[];
    userId: string;
    userName: string;
    userDepartment?: string;
    ipAddress?: string;
    userAgent?: string;
    sessionId?: string;
    module: string;
    description?: string;
  }): Promise<void>;
  getAuditLogs(tableName?: string, recordId?: string, userId?: string, limit?: number): Promise<AuditLog[]>;
  getAuditLogsByDateRange(startDate: Date, endDate: Date, module?: string): Promise<AuditLog[]>;
  getUserActivityLog(userId: string, limit?: number): Promise<AuditLog[]>;

  // Customer Portal Methods
  getCustomerBills(accountId: string, status?: string): Promise<MonthlyBill[]>;
  getCustomerPaymentHistory(accountId: string, limit?: number): Promise<Payment[]>;
  getCustomerAccountSummary(accountId: string): Promise<{
    account: CustomerAccount;
    currentBills: MonthlyBill[];
    recentPayments: Payment[];
    totalOwed: number;
  }>;

  // Advanced Analytics and Reporting
  getRevenueAnalytics(startDate: Date, endDate: Date, zoneId?: string): Promise<{
    totalRevenue: number;
    paymentMethodBreakdown: any[];
    dailyTotals: any[];
    zoneBreakdown?: any[];
  }>;
  getCollectionEfficiency(billingPeriod: string): Promise<{
    totalBilled: number;
    totalCollected: number;
    collectionRate: number;
    outstandingAmount: number;
  }>;
  getMeterReadingStats(billingPeriod: string): Promise<{
    totalMeters: number;
    readMeters: number;
    unreadMeters: number;
    consumptionTotal: number;
  }>;

  // Statistics (Enhanced)
  getDashboardStats(): Promise<{
    housingApplications: number;
    pendingComplaints: number;
    activeCitizens: number;
    monthlyRevenue: string;
    totalRevenue: number;
    pendingPermits: number;
    activeAssets: number;
    upcomingMeetings: number;
    totalMeters: number;
    unreadMeters: number;
    unpaidBills: number;
    totalOutstanding: number;
    dailyCollections: number;
    activeZones: number;
  }>;

  // Financial Management operations
  getChartOfAccounts(): Promise<ChartOfAccounts[]>;
  createChartOfAccount(account: InsertChartOfAccounts): Promise<ChartOfAccounts>;
  updateChartOfAccount(id: string, account: Partial<InsertChartOfAccounts>): Promise<ChartOfAccounts>;
  deleteChartOfAccount(id: string): Promise<void>;
  getGeneralLedgerEntries(limit?: number, offset?: number): Promise<GeneralLedger[]>;
  createGeneralLedgerEntry(entry: InsertGeneralLedger): Promise<GeneralLedger>;
  updateGeneralLedgerEntry(id: string, entry: Partial<InsertGeneralLedger>): Promise<GeneralLedger>;
  getAccountBalance(accountId: string): Promise<number>;
  getCashbookEntries(limit?: number, offset?: number): Promise<Cashbook[]>;
  createCashbookEntry(entry: InsertCashbook): Promise<Cashbook>;
  updateCashbookEntry(id: string, entry: Partial<InsertCashbook>): Promise<Cashbook>;
  getDebtors(limit?: number, offset?: number): Promise<DebtorsManagement[]>;
  createDebtor(debtor: InsertDebtorsManagement): Promise<DebtorsManagement>;
  updateDebtor(id: string, debtor: Partial<InsertDebtorsManagement>): Promise<DebtorsManagement>;
  deleteDebtor(id: string): Promise<void>;
  getMunicipalInvoices(limit?: number, offset?: number): Promise<MunicipalInvoices[]>;
  createMunicipalInvoice(invoice: InsertMunicipalInvoices): Promise<MunicipalInvoices>;
  updateMunicipalInvoice(id: string, invoice: Partial<InsertMunicipalInvoices>): Promise<MunicipalInvoices>;
  deleteMunicipalInvoice(id: string): Promise<void>;
  getVoucherPayments(limit?: number, offset?: number): Promise<VoucherPayments[]>;
  createVoucherPayment(voucher: InsertVoucherPayments): Promise<VoucherPayments>;
  updateVoucherPayment(id: string, voucher: Partial<InsertVoucherPayments>): Promise<VoucherPayments>;
  deleteVoucherPayment(id: string): Promise<void>;
  getReceipts(limit?: number, offset?: number): Promise<Receipts[]>;
  createReceipt(receipt: InsertReceipts): Promise<Receipts>;
  updateReceipt(id: string, receipt: Partial<InsertReceipts>): Promise<Receipts>;
  getFixedAssets(limit?: number, offset?: number): Promise<FixedAssets[]>;
  createFixedAsset(asset: InsertFixedAssets): Promise<FixedAssets>;
  updateFixedAsset(id: string, asset: Partial<InsertFixedAssets>): Promise<FixedAssets>;
  deleteFixedAsset(id: string): Promise<void>;
  getBankAccounts(): Promise<BankAccounts[]>;
  createBankAccount(account: InsertBankAccounts): Promise<BankAccounts>;
  updateBankAccount(id: string, account: Partial<InsertBankAccounts>): Promise<BankAccounts>;
  deleteBankAccount(id: string): Promise<void>;
  getCurrencies(): Promise<Currencies[]>;
  createCurrency(currency: InsertCurrencies): Promise<Currencies>;
  updateCurrency(id: string, currency: Partial<InsertCurrencies>): Promise<Currencies>;
  deleteCurrency(id: string): Promise<void>;

  // Payroll Management operations
  getEmployees(limit?: number, offset?: number): Promise<Employees[]>;
  createEmployee(employee: InsertEmployees): Promise<Employees>;
  updateEmployee(id: string, employee: Partial<InsertEmployees>): Promise<Employees>;
  deleteEmployee(id: string): Promise<void>;
  getPayrollRuns(limit?: number, offset?: number): Promise<PayrollRuns[]>;
  createPayrollRun(payrollRun: InsertPayrollRuns): Promise<PayrollRuns>;
  updatePayrollRun(id: string, payrollRun: Partial<InsertPayrollRuns>): Promise<PayrollRuns>;
  deletePayrollRun(id: string): Promise<void>;
  getPayrollItems(payrollRunId: string): Promise<PayrollItems[]>;
  createPayrollItem(item: InsertPayrollItems): Promise<PayrollItems>;
  updatePayrollItem(id: string, item: Partial<InsertPayrollItems>): Promise<PayrollItems>;
  getLeaveTypes(): Promise<LeaveTypes[]>;
  createLeaveType(leaveType: InsertLeaveTypes): Promise<LeaveTypes>;
  updateLeaveType(id: string, leaveType: Partial<InsertLeaveTypes>): Promise<LeaveTypes>;
  deleteLeaveType(id: string): Promise<void>;
  getLeaveApplications(limit?: number, offset?: number): Promise<LeaveApplications[]>;
  createLeaveApplication(application: InsertLeaveApplications): Promise<LeaveApplications>;
  updateLeaveApplication(id: string, application: Partial<InsertLeaveApplications>): Promise<LeaveApplications>;
  deleteLeaveApplication(id: string): Promise<void>;
  getPerformanceReviews(limit?: number, offset?: number): Promise<PerformanceReviews[]>;
  createPerformanceReview(review: InsertPerformanceReviews): Promise<PerformanceReviews>;
  updatePerformanceReview(id: string, review: Partial<InsertPerformanceReviews>): Promise<PerformanceReviews>;
  deletePerformanceReview(id: string): Promise<void>;
}

// Import additional storage operations
import { AdditionalStorageOperations } from "./storage-additional";

export class DatabaseStorage extends AdditionalStorageOperations implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async getUsersByDepartment(department: string): Promise<User[]> {
    return await db.select().from(users).where(eq(users.department, department));
  }

  async updateUserStatus(id: string, isActive: boolean): Promise<void> {
    await db.update(users).set({ isActive, updatedAt: new Date() }).where(eq(users.id, id));
  }

  // Housing Management
  async createHousingApplication(application: InsertHousingApplication): Promise<HousingApplication> {
    const applicationNumber = `HA-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    const [result] = await db
      .insert(housingApplications)
      .values({ ...application, applicationNumber })
      .returning();
    return result;
  }

  async getHousingApplications(limit = 50, offset = 0): Promise<HousingApplication[]> {
    return await db
      .select()
      .from(housingApplications)
      .orderBy(desc(housingApplications.applicationDate))
      .limit(limit)
      .offset(offset);
  }

  async getHousingApplicationById(id: string): Promise<HousingApplication | undefined> {
    const [application] = await db
      .select()
      .from(housingApplications)
      .where(eq(housingApplications.id, id));
    return application;
  }

  async updateHousingApplicationStatus(id: string, status: string, reviewedBy?: string): Promise<void> {
    await db
      .update(housingApplications)
      .set({
        status,
        reviewedBy,
        reviewDate: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(housingApplications.id, id));
  }

  async getHousingApplicationsByStatus(status: string): Promise<HousingApplication[]> {
    return await db
      .select()
      .from(housingApplications)
      .where(eq(housingApplications.status, status))
      .orderBy(desc(housingApplications.applicationDate));
  }

  // Customer Service
  async createCustomerComplaint(complaint: InsertCustomerComplaint): Promise<CustomerComplaint> {
    const complaintNumber = `CMP-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    const [result] = await db
      .insert(customerComplaints)
      .values({ ...complaint, complaintNumber })
      .returning();
    return result;
  }

  async getCustomerComplaints(limit = 50, offset = 0): Promise<CustomerComplaint[]> {
    return await db
      .select()
      .from(customerComplaints)
      .orderBy(desc(customerComplaints.submissionDate))
      .limit(limit)
      .offset(offset);
  }

  async getCustomerComplaintById(id: string): Promise<CustomerComplaint | undefined> {
    const [complaint] = await db
      .select()
      .from(customerComplaints)
      .where(eq(customerComplaints.id, id));
    return complaint;
  }

  async updateComplaintStatus(id: string, status: string, assignedTo?: string): Promise<void> {
    await db
      .update(customerComplaints)
      .set({
        status,
        assignedTo,
        responseDate: status !== "open" ? new Date() : undefined,
        resolutionDate: status === "resolved" ? new Date() : undefined,
        updatedAt: new Date(),
      })
      .where(eq(customerComplaints.id, id));
  }

  async getComplaintsByDepartment(department: string): Promise<CustomerComplaint[]> {
    return await db
      .select()
      .from(customerComplaints)
      .where(eq(customerComplaints.assignedDepartment, department))
      .orderBy(desc(customerComplaints.submissionDate));
  }

  // Create complaint alias for API compatibility
  async getComplaints(limit = 50, offset = 0): Promise<CustomerComplaint[]> {
    return this.getCustomerComplaints(limit, offset);
  }

  async createComplaint(complaint: InsertCustomerComplaint): Promise<CustomerComplaint> {
    return this.createCustomerComplaint(complaint);
  }

  // Facility Management
  async getFacilities(): Promise<Facility[]> {
    return await db
      .select()
      .from(facilities)
      .where(eq(facilities.isActive, true))
      .orderBy(asc(facilities.name));
  }

  async createFacilityBooking(booking: InsertFacilityBooking): Promise<FacilityBooking> {
    const bookingNumber = `FB-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    const [result] = await db
      .insert(facilityBookings)
      .values({ ...booking, bookingNumber })
      .returning();
    return result;
  }

  async createFacility(facility: any): Promise<Facility> {
    const [result] = await db
      .insert(facilities)
      .values(facility)
      .returning();
    return result;
  }

  async createVehicle(vehicle: any): Promise<Vehicle> {
    const [result] = await db
      .insert(vehicles)
      .values(vehicle)
      .returning();
    return result;
  }

  async createProperty(property: any): Promise<Property> {
    const [result] = await db
      .insert(properties)
      .values(property)
      .returning();
    return result;
  }

  async getProperties(limit = 50, offset = 0): Promise<Property[]> {
    return await db
      .select()
      .from(properties)
      .limit(limit)
      .offset(offset);
  }

  async createValuation(valuation: any): Promise<any> {
    // Valuations would be stored in properties table or separate table
    return valuation;
  }

  async getValuations(): Promise<any[]> {
    return [];
  }

  async createWaterConnection(connection: any): Promise<WaterConnection> {
    const [result] = await db
      .insert(waterConnections)
      .values(connection)
      .returning();
    return result;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    return user;
  }

  async getFacilityBookings(limit = 50, offset = 0): Promise<FacilityBooking[]> {
    return await db
      .select()
      .from(facilityBookings)
      .orderBy(desc(facilityBookings.startDate))
      .limit(limit)
      .offset(offset);
  }

  async getFacilityBookingById(id: string): Promise<FacilityBooking | undefined> {
    const [booking] = await db
      .select()
      .from(facilityBookings)
      .where(eq(facilityBookings.id, id));
    return booking;
  }

  async updateBookingStatus(id: string, status: string): Promise<void> {
    await db
      .update(facilityBookings)
      .set({ status, updatedAt: new Date() })
      .where(eq(facilityBookings.id, id));
  }

  // Property Management
  async getProperties(limit = 50, offset = 0): Promise<Property[]> {
    return await db
      .select()
      .from(properties)
      .orderBy(asc(properties.propertyNumber))
      .limit(limit)
      .offset(offset);
  }

  async getPropertyById(id: string): Promise<Property | undefined> {
    const [property] = await db
      .select()
      .from(properties)
      .where(eq(properties.id, id));
    return property;
  }

  async searchProperties(query: string): Promise<Property[]> {
    return await db
      .select()
      .from(properties)
      .where(
        ilike(properties.address, `%${query}%`)
      )
      .orderBy(asc(properties.propertyNumber))
      .limit(20);
  }

  // Cemetery Management
  async getCemeteries(): Promise<Cemetery[]> {
    return await db
      .select()
      .from(cemeteries)
      .orderBy(asc(cemeteries.name));
  }

  async createCemetery(cemetery: InsertCemetery): Promise<Cemetery> {
    const [result] = await db
      .insert(cemeteries)
      .values(cemetery)
      .returning();
    return result;
  }

  async updateCemetery(id: string, cemetery: Partial<InsertCemetery>): Promise<Cemetery> {
    const [result] = await db
      .update(cemeteries)
      .set({ ...cemetery, updatedAt: new Date() })
      .where(eq(cemeteries.id, id))
      .returning();
    return result;
  }

  async getCemeteryById(id: string): Promise<Cemetery | undefined> {
    const [cemetery] = await db
      .select()
      .from(cemeteries)
      .where(eq(cemeteries.id, id));
    return cemetery;
  }

  async getGraves(): Promise<Grave[]> {
    return await db
      .select()
      .from(graves)
      .orderBy(asc(graves.graveNumber));
  }

  async getGravesByCemetery(cemeteryId: string): Promise<Grave[]> {
    return await db
      .select()
      .from(graves)
      .where(eq(graves.cemeteryId, cemeteryId))
      .orderBy(asc(graves.graveNumber));
  }

  async createGrave(grave: InsertGrave): Promise<Grave> {
    // Generate automatic grave number and section based on type
    const graveTypeConfig = {
      'adult': { prefix: 'A', section: 'Section A - Adults' },
      'child': { prefix: 'C', section: 'Section C - Children' },
      'infant': { prefix: 'I', section: 'Section I - Infants' },
      'family': { prefix: 'F', section: 'Section F - Family Plots' }
    };
    
    const config = graveTypeConfig[grave.graveType as keyof typeof graveTypeConfig] || 
                   { prefix: 'G', section: 'Section G - General' };
    
    // Get next available number for this grave type
    const existingGraves = await db
      .select()
      .from(graves)
      .where(eq(graves.cemeteryId, grave.cemeteryId))
      .orderBy(asc(graves.graveNumber));
    
    const typeGraves = existingGraves.filter(g => g.graveNumber.startsWith(config.prefix));
    const nextNumber = typeGraves.length + 1;
    const graveNumber = `${config.prefix}${nextNumber.toString().padStart(3, '0')}`;
    
    // Set default price based on grave type
    const defaultPrices = {
      'adult': '250.00',
      'child': '150.00', 
      'infant': '100.00',
      'family': '500.00'
    };
    
    const graveData = {
      ...grave,
      graveNumber,
      section: config.section,
      price: grave.price || defaultPrices[grave.graveType as keyof typeof defaultPrices] || '250.00',
      status: 'available'
    };
    
    const [result] = await db
      .insert(graves)
      .values(graveData)
      .returning();
    return result;
  }

  async updateGrave(id: string, grave: Partial<InsertGrave>): Promise<Grave> {
    const [result] = await db
      .update(graves)
      .set({ ...grave, updatedAt: new Date() })
      .where(eq(graves.id, id))
      .returning();
    return result;
  }

  async getGraveById(id: string): Promise<Grave | undefined> {
    const [grave] = await db
      .select()
      .from(graves)
      .where(eq(graves.id, id));
    return grave;
  }

  async createBurial(burial: InsertBurial): Promise<Burial> {
    const intermentOrderNumber = `IO-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    const [result] = await db
      .insert(burials)
      .values({ ...burial, intermentOrderNumber })
      .returning();
    return result;
  }

  async getBurials(limit = 50, offset = 0): Promise<Burial[]> {
    return await db
      .select()
      .from(burials)
      .orderBy(desc(burials.burialDate))
      .limit(limit)
      .offset(offset);
  }

  async updateBurial(id: string, burial: Partial<InsertBurial>): Promise<Burial> {
    const [result] = await db
      .update(burials)
      .set({ ...burial, updatedAt: new Date() })
      .where(eq(burials.id, id))
      .returning();
    return result;
  }

  // Fleet Management
  async getVehicles(): Promise<Vehicle[]> {
    return await db
      .select()
      .from(vehicles)
      .orderBy(asc(vehicles.vehicleNumber));
  }

  async getVehicleById(id: string): Promise<Vehicle | undefined> {
    const [vehicle] = await db
      .select()
      .from(vehicles)
      .where(eq(vehicles.id, id));
    return vehicle;
  }

  async getFuelRecordsByVehicle(vehicleId: string, startDate?: Date, endDate?: Date): Promise<any[]> {
    if (startDate && endDate) {
      return await db
        .select()
        .from(fuelRecords)
        .where(
          and(
            eq(fuelRecords.vehicleId, vehicleId),
            gte(fuelRecords.date, startDate.toISOString().split('T')[0]),
            lte(fuelRecords.date, endDate.toISOString().split('T')[0])
          )
        )
        .orderBy(desc(fuelRecords.date));
    }
    
    return await db
      .select()
      .from(fuelRecords)
      .where(eq(fuelRecords.vehicleId, vehicleId))
      .orderBy(desc(fuelRecords.date));
  }

  // Water Management
  async getWaterConnections(limit = 50, offset = 0): Promise<WaterConnection[]> {
    return await db
      .select()
      .from(waterConnections)
      .orderBy(asc(waterConnections.connectionNumber))
      .limit(limit)
      .offset(offset);
  }

  async getWaterConnectionById(id: string): Promise<WaterConnection | undefined> {
    const [connection] = await db
      .select()
      .from(waterConnections)
      .where(eq(waterConnections.id, id));
    return connection;
  }

  // Meter Applications
  async createMeterApplication(application: InsertMeterApplication): Promise<MeterApplication> {
    const applicationNumber = `MA-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    const [result] = await db
      .insert(meterApplications)
      .values({ ...application, applicationNumber })
      .returning();
    return result;
  }

  async getMeterApplications(limit = 50, offset = 0): Promise<MeterApplication[]> {
    return await db
      .select()
      .from(meterApplications)
      .orderBy(desc(meterApplications.applicationDate))
      .limit(limit)
      .offset(offset);
  }

  async getMeterApplicationById(id: string): Promise<MeterApplication | undefined> {
    const [application] = await db
      .select()
      .from(meterApplications)
      .where(eq(meterApplications.id, id));
    return application;
  }

  async updateMeterApplicationStatus(id: string, status: string, reviewedBy?: string, notes?: string): Promise<void> {
    await db
      .update(meterApplications)
      .set({
        status,
        reviewedBy,
        reviewDate: new Date(),
        notes,
        updatedAt: new Date(),
      })
      .where(eq(meterApplications.id, id));
  }

  async getMeterApplicationsByStatus(status: string): Promise<MeterApplication[]> {
    return await db
      .select()
      .from(meterApplications)
      .where(eq(meterApplications.status, status))
      .orderBy(desc(meterApplications.applicationDate));
  }

  // Permits & Licensing
  async createPermit(permit: InsertPermit): Promise<Permit> {
    const permitNumber = `PER-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    const [result] = await db
      .insert(permits)
      .values({ ...permit, permitNumber })
      .returning();
    return result;
  }

  async getPermits(limit = 50, offset = 0): Promise<Permit[]> {
    return await db
      .select()
      .from(permits)
      .orderBy(desc(permits.applicationDate))
      .limit(limit)
      .offset(offset);
  }

  async getPermitById(id: string): Promise<Permit | undefined> {
    const [permit] = await db.select().from(permits).where(eq(permits.id, id));
    return permit;
  }

  async updatePermitStatus(id: string, status: string, reviewedBy?: string): Promise<void> {
    await db
      .update(permits)
      .set({ 
        status, 
        reviewedBy, 
        
        updatedAt: new Date() 
      })
      .where(eq(permits.id, id));
  }

  async getPermitsByType(permitType: string): Promise<Permit[]> {
    return await db
      .select()
      .from(permits)
      .where(eq(permits.permitType, permitType))
      .orderBy(desc(permits.applicationDate));
  }

  // Revenue Collection
  async createBill(bill: InsertBill): Promise<Bill> {
    const billNumber = `BILL-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    const [result] = await db
      .insert(bills)
      .values({ ...bill, billNumber })
      .returning();
    return result;
  }

  async getBills(limit = 50, offset = 0): Promise<Bill[]> {
    return await db
      .select()
      .from(bills)
      .orderBy(desc(bills.createdAt))
      .limit(limit)
      .offset(offset);
  }

  async getBillById(id: string): Promise<Bill | undefined> {
    const [bill] = await db.select().from(bills).where(eq(bills.id, id));
    return bill;
  }

  async updateBillPayment(id: string, paymentMethod: string, referenceNumber?: string): Promise<void> {
    await db
      .update(bills)
      .set({ 
        status: 'paid',
        paymentMethod,
        referenceNumber,
        paidDate: new Date().toISOString().split('T')[0],
        updatedAt: new Date() 
      })
      .where(eq(bills.id, id));
  }

  async getBillsByStatus(status: string): Promise<Bill[]> {
    return await db
      .select()
      .from(bills)
      .where(eq(bills.status, status))
      .orderBy(desc(bills.dueDate));
  }

  async getBillsByType(billType: string): Promise<Bill[]> {
    return await db
      .select()
      .from(bills)
      .where(eq(bills.billType, billType))
      .orderBy(desc(bills.createdAt));
  }

  // Town Planning
  async createPlanningApplication(application: InsertPlanningApplication): Promise<PlanningApplication> {
    const applicationNumber = `TP-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    const [result] = await db
      .insert(planningApplications)
      .values({ ...application, applicationNumber })
      .returning();
    return result;
  }

  async getPlanningApplications(limit = 50, offset = 0): Promise<PlanningApplication[]> {
    return await db
      .select()
      .from(planningApplications)
      .orderBy(desc(planningApplications.submissionDate))
      .limit(limit)
      .offset(offset);
  }

  async getPlanningApplicationById(id: string): Promise<PlanningApplication | undefined> {
    const [application] = await db.select().from(planningApplications).where(eq(planningApplications.id, id));
    return application;
  }

  async updatePlanningApplicationStatus(id: string, status: string, reviewedBy?: string, comments?: string): Promise<void> {
    await db
      .update(planningApplications)
      .set({ 
        status, 
        reviewedBy, 
        comments,
        reviewDate: new Date(),
        
        updatedAt: new Date() 
      })
      .where(eq(planningApplications.id, id));
  }

  // Asset Management
  async createAsset(asset: InsertAsset): Promise<Asset> {
    const assetNumber = `AST-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    const [result] = await db
      .insert(assets)
      .values({ ...asset, assetNumber })
      .returning();
    return result;
  }

  async getAssets(limit = 50, offset = 0): Promise<Asset[]> {
    return await db
      .select()
      .from(assets)
      .orderBy(asc(assets.name))
      .limit(limit)
      .offset(offset);
  }

  async getAssetById(id: string): Promise<Asset | undefined> {
    const [asset] = await db.select().from(assets).where(eq(assets.id, id));
    return asset;
  }

  async updateAssetCondition(id: string, condition: string, lastInspectionDate?: Date): Promise<void> {
    await db
      .update(assets)
      .set({ 
        condition, 
        lastInspectionDate: lastInspectionDate?.toISOString().split('T')[0],
        updatedAt: new Date() 
      })
      .where(eq(assets.id, id));
  }

  async getAssetsByDepartment(department: string): Promise<Asset[]> {
    return await db
      .select()
      .from(assets)
      .where(eq(assets.department, department))
      .orderBy(asc(assets.name));
  }

  async getAssetsByCategory(category: string): Promise<Asset[]> {
    return await db
      .select()
      .from(assets)
      .where(eq(assets.category, category))
      .orderBy(asc(assets.name));
  }

  // Vendor Management
  async createVendor(vendor: InsertVendor): Promise<Vendor> {
    const vendorNumber = `VEN-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    const [result] = await db
      .insert(vendors)
      .values({ ...vendor, vendorNumber })
      .returning();
    return result;
  }

  async getVendors(limit = 50, offset = 0): Promise<Vendor[]> {
    return await db
      .select()
      .from(vendors)
      .orderBy(asc(vendors.companyName))
      .limit(limit)
      .offset(offset);
  }

  async getVendorById(id: string): Promise<Vendor | undefined> {
    const [vendor] = await db.select().from(vendors).where(eq(vendors.id, id));
    return vendor;
  }

  async updateVendorStatus(id: string, status: string): Promise<void> {
    await db
      .update(vendors)
      .set({ status, updatedAt: new Date() })
      .where(eq(vendors.id, id));
  }

  async getVendorsByCategory(category: string): Promise<Vendor[]> {
    return await db
      .select()
      .from(vendors)
      .where(eq(vendors.category, category))
      .orderBy(asc(vendors.companyName));
  }

  // Purchase Orders
  async createPurchaseOrder(order: InsertPurchaseOrder): Promise<PurchaseOrder> {
    const orderNumber = `PO-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    const [result] = await db
      .insert(purchaseOrders)
      .values({ ...order, orderNumber })
      .returning();
    return result;
  }

  async getPurchaseOrders(limit = 50, offset = 0): Promise<PurchaseOrder[]> {
    return await db
      .select()
      .from(purchaseOrders)
      .orderBy(desc(purchaseOrders.createdAt))
      .limit(limit)
      .offset(offset);
  }

  async getPurchaseOrderById(id: string): Promise<PurchaseOrder | undefined> {
    const [order] = await db.select().from(purchaseOrders).where(eq(purchaseOrders.id, id));
    return order;
  }

  async updatePurchaseOrderStatus(id: string, status: string, approvedBy?: string): Promise<void> {
    await db
      .update(purchaseOrders)
      .set({ 
        status, 
        approvedBy,
        
        updatedAt: new Date() 
      })
      .where(eq(purchaseOrders.id, id));
  }

  async getPurchaseOrdersByDepartment(department: string): Promise<PurchaseOrder[]> {
    return await db
      .select()
      .from(purchaseOrders)
      .where(eq(purchaseOrders.department, department))
      .orderBy(desc(purchaseOrders.createdAt));
  }

  // Council Meetings
  async createCouncilMeeting(meeting: InsertCouncilMeeting): Promise<CouncilMeeting> {
    const meetingNumber = `CM-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    const [result] = await db
      .insert(councilMeetings)
      .values({ ...meeting, meetingNumber })
      .returning();
    return result;
  }

  async getCouncilMeetings(limit = 50, offset = 0): Promise<CouncilMeeting[]> {
    return await db
      .select()
      .from(councilMeetings)
      .orderBy(desc(councilMeetings.date))
      .limit(limit)
      .offset(offset);
  }

  async getCouncilMeetingById(id: string): Promise<CouncilMeeting | undefined> {
    const [meeting] = await db.select().from(councilMeetings).where(eq(councilMeetings.id, id));
    return meeting;
  }

  async updateMeetingMinutes(id: string, minutes: string, resolutions?: string[]): Promise<void> {
    await db
      .update(councilMeetings)
      .set({ minutes, resolutions, status: 'completed', updatedAt: new Date() })
      .where(eq(councilMeetings.id, id));
  }

  // Public Notices
  async createPublicNotice(notice: InsertPublicNotice): Promise<PublicNotice> {
    const noticeNumber = `PN-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    const [result] = await db
      .insert(publicNotices)
      .values({ ...notice, noticeNumber })
      .returning();
    return result;
  }

  async getPublicNotices(limit = 50, offset = 0): Promise<PublicNotice[]> {
    return await db
      .select()
      .from(publicNotices)
      .orderBy(desc(publicNotices.publishDate))
      .limit(limit)
      .offset(offset);
  }

  async getPublicNoticeById(id: string): Promise<PublicNotice | undefined> {
    const [notice] = await db.select().from(publicNotices).where(eq(publicNotices.id, id));
    return notice;
  }

  async updateNoticeStatus(id: string, status: string): Promise<void> {
    await db
      .update(publicNotices)
      .set({ status, updatedAt: new Date() })
      .where(eq(publicNotices.id, id));
  }

  async getNoticesByCategory(category: string): Promise<PublicNotice[]> {
    return await db
      .select()
      .from(publicNotices)
      .where(eq(publicNotices.category, category))
      .orderBy(desc(publicNotices.publishDate));
  }

  // Meter Billing System Implementation
  async createMeter(meter: InsertMeter): Promise<Meter> {
    const [result] = await db.insert(meters).values(meter).returning();
    return result;
  }

  async getMeters(limit = 50, offset = 0): Promise<Meter[]> {
    return await db.select().from(meters).limit(limit).offset(offset).orderBy(desc(meters.createdAt));
  }

  async getMeterById(id: string): Promise<Meter | undefined> {
    const [meter] = await db.select().from(meters).where(eq(meters.id, id));
    return meter;
  }

  async getMetersByProperty(propertyId: string): Promise<Meter[]> {
    return await db.select().from(meters).where(eq(meters.propertyId, propertyId));
  }

  async searchMetersByNumber(meterNumber: string): Promise<Meter[]> {
    return await db.select().from(meters).where(ilike(meters.meterNumber, `%${meterNumber}%`));
  }

  async updateMeterStatus(id: string, status: string): Promise<void> {
    await db.update(meters).set({ status, updatedAt: new Date() }).where(eq(meters.id, id));
  }

  async createMeterReading(reading: InsertMeterReading): Promise<MeterReading> {
    const [result] = await db.insert(meterReadings).values(reading).returning();
    return result;
  }

  async getMeterReadings(meterId?: string, billingPeriod?: string): Promise<MeterReading[]> {
    let query = db.select().from(meterReadings);
    if (meterId) query = query.where(eq(meterReadings.meterId, meterId));
    if (billingPeriod) query = query.where(eq(meterReadings.billingPeriod, billingPeriod));
    return await query.orderBy(desc(meterReadings.readingDate));
  }

  async getMeterReadingById(id: string): Promise<MeterReading | undefined> {
    const [reading] = await db.select().from(meterReadings).where(eq(meterReadings.id, id));
    return reading;
  }

  async getLastMeterReading(meterId: string): Promise<MeterReading | undefined> {
    const [reading] = await db.select().from(meterReadings)
      .where(eq(meterReadings.meterId, meterId))
      .orderBy(desc(meterReadings.readingDate))
      .limit(1);
    return reading;
  }

  async updateMeterReading(id: string, readingValue: string, notes?: string): Promise<void> {
    await db.update(meterReadings)
      .set({ readingValue, notes, updatedAt: new Date() })
      .where(eq(meterReadings.id, id));
  }

  // Property Registration Requests
  async createPropertyRegistrationRequest(request: InsertPropertyRegistrationRequest): Promise<PropertyRegistrationRequest> {
    const requestNumber = `PR-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    const [result] = await db.insert(propertyRegistrationRequests)
      .values({ ...request, requestNumber }).returning();
    return result;
  }

  async getPropertyRegistrationRequests(status?: string): Promise<PropertyRegistrationRequest[]> {
    let query = db.select().from(propertyRegistrationRequests);
    if (status) query = query.where(eq(propertyRegistrationRequests.status, status));
    return await query.orderBy(desc(propertyRegistrationRequests.createdAt));
  }

  async getPropertyRegistrationRequestById(id: string): Promise<PropertyRegistrationRequest | undefined> {
    const [request] = await db.select().from(propertyRegistrationRequests).where(eq(propertyRegistrationRequests.id, id));
    return request;
  }

  async updatePropertyRegistrationRequestStatus(id: string, status: string, adminNotes?: string, approvedBy?: string): Promise<void> {
    await db.update(propertyRegistrationRequests)
      .set({ 
        status, 
        adminNotes, 
        approvedBy, 
        approvedAt: status === 'approved' ? new Date() : undefined,
        updatedAt: new Date() 
      })
      .where(eq(propertyRegistrationRequests.id, id));
  }

  // Super Admin and System Configuration
  async getSystemModules(): Promise<SystemModule[]> {
    const modules = await db.select().from(systemModules).orderBy(asc(systemModules.displayName));
    // Parse JSON fields for frontend consumption
    return modules.map(module => {
      try {
        return {
          ...module,
          allowedDepartments: this.parseJsonField(module.allowedDepartments),
          allowedRoles: this.parseJsonField(module.allowedRoles)
        };
      } catch (error) {
        console.error('Error processing module:', module.moduleName, error);
        return {
          ...module,
          allowedDepartments: [],
          allowedRoles: []
        };
      }
    });
  }

  private parseJsonField(field: any): any[] {
    if (!field) return [];
    if (Array.isArray(field)) return field;
    
    try {
      if (typeof field === 'string') {
        // Handle empty strings
        if (field.trim() === '') return [];
        const parsed = JSON.parse(field);
        return Array.isArray(parsed) ? parsed : [];
      }
      return [];
    } catch (error) {
      console.warn('Error parsing JSON field:', field, 'Error:', error.message);
      return [];
    }
  }

  async updateSystemModule(moduleName: string, isEnabled: boolean, canRegisterProperties?: boolean, lastModifiedBy?: string): Promise<void> {
    await db.update(systemModules)
      .set({ 
        isEnabled, 
        canRegisterProperties: canRegisterProperties ?? false,
        lastModifiedBy,
        lastModifiedAt: new Date() 
      })
      .where(eq(systemModules.moduleName, moduleName));
  }

  // Enhanced module management methods
  async createSystemModule(moduleData: any): Promise<SystemModule> {
    const [result] = await db.insert(systemModules)
      .values({
        ...moduleData,
        version: '1.0.0',
        allowedDepartments: JSON.stringify(moduleData.allowedDepartments || []),
        allowedRoles: JSON.stringify(moduleData.allowedRoles || [])
      })
      .returning();
    return result;
  }

  async getSystemModule(moduleId: string): Promise<SystemModule | undefined> {
    const [module] = await db.select().from(systemModules).where(eq(systemModules.id, moduleId));
    if (!module) return undefined;
    
    return {
      ...module,
      allowedDepartments: this.parseJsonField(module.allowedDepartments),
      allowedRoles: this.parseJsonField(module.allowedRoles)
    };
  }

  async updateSystemModule(moduleId: string, updates: any): Promise<SystemModule> {
    const updateData = { ...updates };
    if (updates.allowedDepartments) {
      updateData.allowedDepartments = JSON.stringify(updates.allowedDepartments);
    }
    if (updates.allowedRoles) {
      updateData.allowedRoles = JSON.stringify(updates.allowedRoles);
    }
    
    const [result] = await db.update(systemModules)
      .set(updateData)
      .where(eq(systemModules.id, moduleId))
      .returning();
    return result;
  }

  async deleteSystemModule(moduleId: string): Promise<void> {
    await db.delete(systemModules).where(eq(systemModules.id, moduleId));
  }

  // Role Management Methods
  async createSystemRole(roleData: any): Promise<any> {
    const [result] = await db.insert(systemRoles)
      .values({
        ...roleData,
        id: `role-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        permissions: roleData.permissions || []  // Store as array directly in jsonb
      })
      .returning();
    return result;
  }

  async getSystemRoles(): Promise<any[]> {
    const roles = await db.select().from(systemRoles).orderBy(asc(systemRoles.displayName));
    return roles.map(role => ({
      ...role,
      permissions: this.parsePermissions(role.permissions)
    }));
  }

  private parsePermissions(permissions: any): string[] {
    if (!permissions) return [];
    if (Array.isArray(permissions)) return permissions;
    
    try {
      // If it's a string, try to parse it
      if (typeof permissions === 'string') {
        const parsed = JSON.parse(permissions);
        // If parsed result is still a string, parse again (double-encoded)
        if (typeof parsed === 'string') {
          return JSON.parse(parsed);
        }
        return Array.isArray(parsed) ? parsed : [];
      }
      return [];
    } catch (error) {
      console.warn('Error parsing permissions:', permissions, error);
      // Return empty array on parse errors
      return [];
    }
  }

  async getSystemRole(roleId: string): Promise<any | undefined> {
    const [role] = await db.select().from(systemRoles).where(eq(systemRoles.id, roleId));
    if (!role) return undefined;
    
    return {
      ...role,
      permissions: this.parsePermissions(role.permissions)
    };
  }

  async getSystemRoleByName(roleName: string): Promise<any | undefined> {
    const [role] = await db.select().from(systemRoles).where(eq(systemRoles.roleName, roleName));
    if (!role) return undefined;
    
    return {
      ...role,
      permissions: this.parsePermissions(role.permissions)
    };
  }

  async updateSystemRole(roleId: string, updates: any): Promise<any> {
    const updateData = { ...updates };
    if (updates.permissions) {
      updateData.permissions = updates.permissions;  // Store as array directly
    }
    
    const [result] = await db.update(systemRoles)
      .set(updateData)
      .where(eq(systemRoles.id, roleId))
      .returning();
    return result;
  }

  async deleteSystemRole(roleId: string): Promise<void> {
    await db.delete(systemRoles).where(eq(systemRoles.id, roleId));
  }

  // Role-Module Assignment Methods
  async assignModuleToRole(assignment: any): Promise<any> {
    const [result] = await db.insert(roleModuleAssignments)
      .values({
        ...assignment,
        id: `assignment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      })
      .returning();
    return result;
  }

  async getRoleModuleAssignments(roleId?: string): Promise<any[]> {
    let query = db.select().from(roleModuleAssignments);
    if (roleId) query = query.where(eq(roleModuleAssignments.roleId, roleId));
    return await query.orderBy(asc(roleModuleAssignments.assignedAt));
  }

  async removeModuleFromRole(roleId: string, moduleId: string): Promise<void> {
    await db.delete(roleModuleAssignments)
      .where(eq(roleModuleAssignments.roleId, roleId))
      .where(eq(roleModuleAssignments.moduleId, moduleId));
  }

  async updateRoleModulePermissions(roleId: string, moduleId: string, permissions: any): Promise<any> {
    const [result] = await db.update(roleModuleAssignments)
      .set({
        ...permissions,
        updatedAt: new Date()
      })
      .where(and(
        eq(roleModuleAssignments.roleId, roleId),
        eq(roleModuleAssignments.moduleId, moduleId)
      ))
      .returning();
    return result;
  }

  async getModulesForRole(roleId: string): Promise<any[]> {
    const assignments = await db.select()
      .from(roleModuleAssignments)
      .innerJoin(systemModules, eq(roleModuleAssignments.moduleId, systemModules.id))
      .where(eq(roleModuleAssignments.roleId, roleId));
    
    return assignments.map(assignment => ({
      ...assignment.system_modules,
      permissions: {
        canRead: assignment.role_module_assignments.canRead,
        canWrite: assignment.role_module_assignments.canWrite,
        canDelete: assignment.role_module_assignments.canDelete,
        canAdminister: assignment.role_module_assignments.canAdminister
      }
    }));
  }

  async getSystemSettings(category?: string): Promise<any[]> {
    let query = db.select().from(systemSettings);
    if (category) query = query.where(eq(systemSettings.category, category));
    return await query.orderBy(asc(systemSettings.settingKey));
  }

  async updateSystemSetting(settingKey: string, settingValue: string, lastModifiedBy: string): Promise<void> {
    await db.update(systemSettings)
      .set({ settingValue, lastModifiedBy, lastModifiedAt: new Date() })
      .where(eq(systemSettings.settingKey, settingKey));
  }

  // Customer Account Management
  async createCustomerAccount(account: InsertCustomerAccount): Promise<CustomerAccount> {
    const accountNumber = `ACC-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    const [result] = await db.insert(customerAccounts)
      .values({ ...account, accountNumber }).returning();
    return result;
  }

  async getCustomerAccounts(limit = 50, offset = 0): Promise<CustomerAccount[]> {
    return await db.select().from(customerAccounts).limit(limit).offset(offset).orderBy(desc(customerAccounts.createdAt));
  }

  async getCustomerAccountById(id: string): Promise<CustomerAccount | undefined> {
    const [account] = await db.select().from(customerAccounts).where(eq(customerAccounts.id, id));
    return account;
  }

  async getCustomerAccountByProperty(propertyId: string): Promise<CustomerAccount | undefined> {
    const [account] = await db.select().from(customerAccounts).where(eq(customerAccounts.propertyId, propertyId));
    return account;
  }

  async searchCustomerAccounts(query: string): Promise<CustomerAccount[]> {
    return await db.select().from(customerAccounts)
      .where(ilike(customerAccounts.customerName, `%${query}%`));
  }

  async updateCustomerBalance(accountId: string, amount: number): Promise<void> {
    await db.update(customerAccounts)
      .set({ currentBalance: amount.toString(), updatedAt: new Date() })
      .where(eq(customerAccounts.id, accountId));
  }

  // Payment Processing
  async createPayment(payment: InsertPayment): Promise<Payment> {
    const paymentNumber = `PAY-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    const receiptNumber = `RCP-${String(Date.now()).slice(-8)}`;
    const [result] = await db.insert(payments)
      .values({ ...payment, paymentNumber, receiptNumber }).returning();
    return result;
  }

  async getPayments(accountId?: string, zoneId?: string): Promise<Payment[]> {
    let query = db.select().from(payments);
    if (accountId) query = query.where(eq(payments.accountId, accountId));
    if (zoneId) query = query.where(eq(payments.zoneId, zoneId));
    return await query.orderBy(desc(payments.paymentDate));
  }

  async getPaymentById(id: string): Promise<Payment | undefined> {
    const [payment] = await db.select().from(payments).where(eq(payments.id, id));
    return payment;
  }

  async updatePaymentStatus(id: string, status: string, gatewayResponse?: any): Promise<void> {
    await db.update(payments)
      .set({ status, gatewayResponse, updatedAt: new Date() })
      .where(eq(payments.id, id));
  }

  // Comprehensive Audit Trail
  async createAuditLog(log: {
    tableName: string;
    recordId: string;
    action: 'INSERT' | 'UPDATE' | 'DELETE';
    oldValues?: any;
    newValues?: any;
    changedFields?: string[];
    userId: string;
    userName: string;
    userDepartment?: string;
    ipAddress?: string;
    userAgent?: string;
    sessionId?: string;
    module: string;
    description?: string;
  }): Promise<void> {
    await db.insert(auditLog).values(log);
  }

  async getAuditLogs(tableName?: string, recordId?: string, userId?: string, limit = 100): Promise<AuditLog[]> {
    let query = db.select().from(auditLog);
    if (tableName) query = query.where(eq(auditLog.tableName, tableName));
    if (recordId) query = query.where(eq(auditLog.recordId, recordId));
    if (userId) query = query.where(eq(auditLog.userId, userId));
    return await query.orderBy(desc(auditLog.timestamp)).limit(limit);
  }

  // Statistics (Enhanced)
  async getDashboardStats(): Promise<{
    housingApplications: number;
    pendingComplaints: number;
    activeCitizens: number;
    monthlyRevenue: string;
    totalRevenue: number;
    pendingPermits: number;
    activeAssets: number;
    upcomingMeetings: number;
    totalMeters: number;
    unreadMeters: number;
    unpaidBills: number;
    totalOutstanding: number;
    dailyCollections: number;
    activeZones: number;
  }> {
    const [housingCount] = await db.select({ count: count() }).from(housingApplications);
    const [complaintsCount] = await db.select({ count: count() }).from(customerComplaints).where(eq(customerComplaints.status, "open"));
    const [usersCount] = await db.select({ count: count() }).from(users).where(eq(users.isActive, true));
    const [permitsCount] = await db.select({ count: count() }).from(permits).where(eq(permits.status, "pending"));
    const [assetsCount] = await db.select({ count: count() }).from(assets).where(eq(assets.status, "active"));
    const [meetingsCount] = await db.select({ count: count() }).from(councilMeetings).where(eq(councilMeetings.status, "scheduled"));
    
    // New meter billing stats
    const [metersCount] = await db.select({ count: count() }).from(meters);
    const [unreadMetersCount] = await db.select({ count: count() }).from(meters)
      .leftJoin(meterReadings, eq(meters.id, meterReadings.meterId))
      .where(eq(meterReadings.billingPeriod, new Date().toISOString().slice(0, 7))); // Current month
    
    const [unpaidBillsCount] = await db.select({ count: count() }).from(monthlyBills).where(eq(monthlyBills.status, "unpaid"));
    const [zonesCount] = await db.select({ count: count() }).from(zones).where(eq(zones.isActive, true));

    return {
      housingApplications: housingCount.count,
      pendingComplaints: complaintsCount.count,
      activeCitizens: usersCount.count,
      monthlyRevenue: "$0.0M",
      totalRevenue: 0,
      pendingPermits: permitsCount.count,
      activeAssets: assetsCount.count,
      upcomingMeetings: meetingsCount.count,
      totalMeters: metersCount.count,
      unreadMeters: Math.max(0, metersCount.count - (unreadMetersCount?.count || 0)),
      unpaidBills: unpaidBillsCount.count,
      totalOutstanding: 0,
      dailyCollections: 0,
      activeZones: zonesCount.count,
    };
  }

  // ==== CUSTOMER ACCOUNTS & BILLING IMPLEMENTATION ====

  async updateCustomerAccount(id: string, data: Partial<InsertCustomerAccount>): Promise<void> {
    await db
      .update(customerAccounts)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(customerAccounts.id, id));
  }

  // Monthly Bills Implementation
  async getMonthlyBills(accountId?: string, billingPeriod?: string): Promise<MonthlyBill[]> {
    let query = db.select().from(monthlyBills);
    if (accountId) {
      query = query.where(eq(monthlyBills.accountId, accountId));
    }
    if (billingPeriod) {
      query = query.where(eq(monthlyBills.billingPeriod, billingPeriod));
    }
    return await query.orderBy(desc(monthlyBills.createdAt));
  }

  async getMonthlyBillById(id: string): Promise<MonthlyBill | undefined> {
    const [bill] = await db
      .select()
      .from(monthlyBills)
      .where(eq(monthlyBills.id, id));
    return bill;
  }

  async createMonthlyBill(data: InsertMonthlyBill): Promise<MonthlyBill> {
    const [bill] = await db
      .insert(monthlyBills)
      .values(data)
      .returning();
    return bill;
  }

  async updateMonthlyBillPayment(billId: string, amountPaid: number): Promise<void> {
    await db
      .update(monthlyBills)
      .set({ 
        amountPaid: amountPaid.toString(),
        status: 'paid',
        updatedAt: new Date() 
      })
      .where(eq(monthlyBills.id, billId));
  }

  async getUnpaidBills(accountId?: string): Promise<MonthlyBill[]> {
    let query = db
      .select()
      .from(monthlyBills)
      .where(eq(monthlyBills.status, 'unpaid'));
    
    if (accountId) {
      query = query.where(eq(monthlyBills.accountId, accountId));
    }
    
    return await query.orderBy(desc(monthlyBills.dueDate));
  }

  async generateMonthlyBills(billingPeriod: string, generatedBy: string): Promise<void> {
    // This would contain complex billing logic to generate bills for all customers
    // For now, just creating a placeholder implementation
    const accounts = await this.getCustomerAccounts();
    
    for (const account of accounts) {
      const billNumber = `MB-${billingPeriod}-${account.id.slice(-6)}`;
      await this.createMonthlyBill({
        accountId: account.id,
        billNumber,
        billingPeriod,
        totalAmount: "150.00",
        waterCharges: "80.00",
        sewerageCharges: "30.00",
        refuseCharges: "20.00",
        otherCharges: "20.00",
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        status: 'unpaid',
        generatedBy,
        amountPaid: "0.00",
        balance: "150.00"
      });
    }
  }

  // Payments Implementation (uses methods defined above)

  // Financial Management Methods
  async getChartOfAccounts(): Promise<ChartOfAccounts[]> {
    return await db.select().from(chartOfAccounts).where(eq(chartOfAccounts.isActive, true));
  }

  async createChartOfAccount(account: InsertChartOfAccounts): Promise<ChartOfAccounts> {
    const [newAccount] = await db.insert(chartOfAccounts).values(account).returning();
    return newAccount;
  }

  async updateChartOfAccount(id: string, account: Partial<InsertChartOfAccounts>): Promise<ChartOfAccounts> {
    const [updated] = await db
      .update(chartOfAccounts)
      .set({ ...account, updatedAt: new Date() })
      .where(eq(chartOfAccounts.id, id))
      .returning();
    return updated;
  }

  async deleteChartOfAccount(id: string): Promise<void> {
    await db.update(chartOfAccounts).set({ isActive: false }).where(eq(chartOfAccounts.id, id));
  }

  async getGeneralLedgerEntries(limit = 50, offset = 0): Promise<GeneralLedger[]> {
    return await db.select().from(generalLedger).limit(limit).offset(offset).orderBy(desc(generalLedger.transactionDate));
  }

  async createGeneralLedgerEntry(entry: InsertGeneralLedger): Promise<GeneralLedger> {
    const [newEntry] = await db.insert(generalLedger).values(entry).returning();
    return newEntry;
  }

  async updateGeneralLedgerEntry(id: string, entry: Partial<InsertGeneralLedger>): Promise<GeneralLedger> {
    const [updated] = await db
      .update(generalLedger)
      .set({ ...entry, updatedAt: new Date() })
      .where(eq(generalLedger.id, id))
      .returning();
    return updated;
  }

  async getAccountBalance(accountId: string): Promise<number> {
    const entries = await db.select().from(generalLedger).where(eq(generalLedger.accountId, accountId));
    return entries.reduce((balance, entry) => {
      const debit = parseFloat(entry.debitAmount || '0');
      const credit = parseFloat(entry.creditAmount || '0');
      return balance + debit - credit;
    }, 0);
  }

  async getCashbookEntries(limit = 50, offset = 0): Promise<Cashbook[]> {
    return await db.select().from(cashbook).limit(limit).offset(offset).orderBy(desc(cashbook.transactionDate));
  }

  async createCashbookEntry(entry: InsertCashbook): Promise<Cashbook> {
    const [newEntry] = await db.insert(cashbook).values(entry).returning();
    return newEntry;
  }

  async updateCashbookEntry(id: string, entry: Partial<InsertCashbook>): Promise<Cashbook> {
    const [updated] = await db
      .update(cashbook)
      .set(entry)
      .where(eq(cashbook.id, id))
      .returning();
    return updated;
  }

  async getDebtors(limit = 50, offset = 0): Promise<DebtorsManagement[]> {
    return await db.select().from(debtorsManagement).limit(limit).offset(offset).orderBy(desc(debtorsManagement.createdAt));
  }

  async createDebtor(debtor: InsertDebtorsManagement): Promise<DebtorsManagement> {
    const [newDebtor] = await db.insert(debtorsManagement).values(debtor).returning();
    return newDebtor;
  }

  async updateDebtor(id: string, debtor: Partial<InsertDebtorsManagement>): Promise<DebtorsManagement> {
    const [updated] = await db
      .update(debtorsManagement)
      .set({ ...debtor, updatedAt: new Date() })
      .where(eq(debtorsManagement.id, id))
      .returning();
    return updated;
  }

  async deleteDebtor(id: string): Promise<void> {
    await db.update(debtorsManagement).set({ status: 'inactive' }).where(eq(debtorsManagement.id, id));
  }

  async getMunicipalInvoices(limit = 50, offset = 0): Promise<MunicipalInvoices[]> {
    return await db.select().from(municipalInvoices).limit(limit).offset(offset).orderBy(desc(municipalInvoices.invoiceDate));
  }

  async createMunicipalInvoice(invoice: InsertMunicipalInvoices): Promise<MunicipalInvoices> {
    const invoiceNumber = `INV-${Date.now()}`;
    const [newInvoice] = await db
      .insert(municipalInvoices)
      .values({ ...invoice, invoiceNumber })
      .returning();
    return newInvoice;
  }

  async updateMunicipalInvoice(id: string, invoice: Partial<InsertMunicipalInvoices>): Promise<MunicipalInvoices> {
    const [updated] = await db
      .update(municipalInvoices)
      .set({ ...invoice, updatedAt: new Date() })
      .where(eq(municipalInvoices.id, id))
      .returning();
    return updated;
  }

  async deleteMunicipalInvoice(id: string): Promise<void> {
    await db.update(municipalInvoices).set({ status: 'cancelled' }).where(eq(municipalInvoices.id, id));
  }

  async getVoucherPayments(limit = 50, offset = 0): Promise<VoucherPayments[]> {
    return await db.select().from(voucherPayments).limit(limit).offset(offset).orderBy(desc(voucherPayments.paymentDate));
  }

  async createFixedAsset(asset: InsertFixedAssets): Promise<FixedAssets> {
    const assetCode = `AST-${Date.now()}`;
    const [newAsset] = await db.insert(fixedAssets).values({ ...asset, assetCode }).returning();
    return newAsset;
  }

  async getFixedAssets(): Promise<FixedAssets[]> {
    return await db.select().from(fixedAssets).orderBy(desc(fixedAssets.createdAt));
  }

  async updateFixedAsset(id: string, asset: Partial<InsertFixedAssets>): Promise<FixedAssets> {
    const [updated] = await db
      .update(fixedAssets)
      .set({ ...asset, updatedAt: new Date() })
      .where(eq(fixedAssets.id, id))
      .returning();
    return updated;
  }

  async deleteFixedAsset(id: string): Promise<void> {
    await db.update(fixedAssets).set({ status: 'disposed' }).where(eq(fixedAssets.id, id));
  }

  async addCurrency(currency: InsertCurrencies): Promise<Currencies> {
    const [newCurrency] = await db.insert(currencies).values(currency).returning();
    return newCurrency;
  }

  async getCurrencies(): Promise<Currencies[]> {
    return await db.select().from(currencies).orderBy(currencies.currencyCode);
  }

  async getBankAccounts(): Promise<BankAccounts[]> {
    return await db.select().from(bankAccounts).orderBy(desc(bankAccounts.createdAt));
  }

  async addBankAccount(account: InsertBankAccounts): Promise<BankAccounts> {
    const [newAccount] = await db.insert(bankAccounts).values(account).returning();
    return newAccount;
  }

  async createVoucherPayment(voucher: InsertVoucherPayments): Promise<VoucherPayments> {
    const voucherNumber = `VOU-${Date.now()}`;
    const [newVoucher] = await db
      .insert(voucherPayments)
      .values({ ...voucher, voucherNumber })
      .returning();
    return newVoucher;
  }

  async updateVoucherPayment(id: string, voucher: Partial<InsertVoucherPayments>): Promise<VoucherPayments> {
    const [updated] = await db
      .update(voucherPayments)
      .set({ ...voucher, updatedAt: new Date() })
      .where(eq(voucherPayments.id, id))
      .returning();
    return updated;
  }

  async deleteVoucherPayment(id: string): Promise<void> {
    await db.update(voucherPayments).set({ status: 'cancelled' }).where(eq(voucherPayments.id, id));
  }

  async getReceipts(limit = 50, offset = 0): Promise<Receipts[]> {
    return await db.select().from(receipts).limit(limit).offset(offset).orderBy(desc(receipts.receiptDate));
  }

  async createReceipt(receipt: InsertReceipts): Promise<Receipts> {
    const receiptNumber = `REC-${Date.now()}`;
    const [newReceipt] = await db
      .insert(receipts)
      .values({ ...receipt, receiptNumber })
      .returning();
    return newReceipt;
  }

  async updateReceipt(id: string, receipt: Partial<InsertReceipts>): Promise<Receipts> {
    const [updated] = await db
      .update(receipts)
      .set(receipt)
      .where(eq(receipts.id, id))
      .returning();
    return updated;
  }

  async getFixedAssets(limit = 50, offset = 0): Promise<FixedAssets[]> {
    return await db.select().from(fixedAssets).limit(limit).offset(offset).orderBy(desc(fixedAssets.createdAt));
  }

  async createFixedAsset(asset: InsertFixedAssets): Promise<FixedAssets> {
    const assetCode = `AST-${Date.now()}`;
    const [newAsset] = await db
      .insert(fixedAssets)
      .values({ ...asset, assetCode })
      .returning();
    return newAsset;
  }

  async updateFixedAsset(id: string, asset: Partial<InsertFixedAssets>): Promise<FixedAssets> {
    const [updated] = await db
      .update(fixedAssets)
      .set({ ...asset, updatedAt: new Date() })
      .where(eq(fixedAssets.id, id))
      .returning();
    return updated;
  }

  async deleteFixedAsset(id: string): Promise<void> {
    await db.update(fixedAssets).set({ status: 'disposed' }).where(eq(fixedAssets.id, id));
  }

  async getBankAccounts(): Promise<BankAccounts[]> {
    return await db.select().from(bankAccounts).where(eq(bankAccounts.isActive, true));
  }

  async createBankAccount(account: InsertBankAccounts): Promise<BankAccounts> {
    const [newAccount] = await db.insert(bankAccounts).values(account).returning();
    return newAccount;
  }

  async updateBankAccount(id: string, account: Partial<InsertBankAccounts>): Promise<BankAccounts> {
    const [updated] = await db
      .update(bankAccounts)
      .set({ ...account, updatedAt: new Date() })
      .where(eq(bankAccounts.id, id))
      .returning();
    return updated;
  }

  async deleteBankAccount(id: string): Promise<void> {
    await db.update(bankAccounts).set({ isActive: false }).where(eq(bankAccounts.id, id));
  }

  async getCurrencies(): Promise<Currencies[]> {
    return await db.select().from(currencies).where(eq(currencies.isActive, true));
  }

  async createCurrency(currency: InsertCurrencies): Promise<Currencies> {
    const [newCurrency] = await db.insert(currencies).values(currency).returning();
    return newCurrency;
  }

  async updateCurrency(id: string, currency: Partial<InsertCurrencies>): Promise<Currencies> {
    const [updated] = await db
      .update(currencies)
      .set({ ...currency, lastUpdated: new Date() })
      .where(eq(currencies.id, id))
      .returning();
    return updated;
  }

  async deleteCurrency(id: string): Promise<void> {
    await db.update(currencies).set({ isActive: false }).where(eq(currencies.id, id));
  }

  // Payroll Management Methods
  async getEmployees(limit = 50, offset = 0): Promise<Employees[]> {
    return await db.select().from(employees).limit(limit).offset(offset).orderBy(desc(employees.createdAt));
  }

  async createEmployee(employee: InsertEmployees): Promise<Employees> {
    const [newEmployee] = await db.insert(employees).values(employee).returning();
    return newEmployee;
  }

  async updateEmployee(id: string, employee: Partial<InsertEmployees>): Promise<Employees> {
    const [updated] = await db
      .update(employees)
      .set({ ...employee, updatedAt: new Date() })
      .where(eq(employees.id, id))
      .returning();
    return updated;
  }

  async deleteEmployee(id: string): Promise<void> {
    await db.update(employees).set({ status: 'inactive' }).where(eq(employees.id, id));
  }

  async getPayrollRuns(limit = 50, offset = 0): Promise<PayrollRuns[]> {
    return await db.select().from(payrollRuns).limit(limit).offset(offset).orderBy(desc(payrollRuns.createdAt));
  }

  async createPayrollRun(payrollRun: InsertPayrollRuns): Promise<PayrollRuns> {
    const [newPayrollRun] = await db.insert(payrollRuns).values(payrollRun).returning();
    return newPayrollRun;
  }

  async updatePayrollRun(id: string, payrollRun: Partial<InsertPayrollRuns>): Promise<PayrollRuns> {
    const [updated] = await db
      .update(payrollRuns)
      .set({ ...payrollRun, updatedAt: new Date() })
      .where(eq(payrollRuns.id, id))
      .returning();
    return updated;
  }

  async deletePayrollRun(id: string): Promise<void> {
    await db.update(payrollRuns).set({ status: 'cancelled' }).where(eq(payrollRuns.id, id));
  }

  async getPayrollItems(payrollRunId: string): Promise<PayrollItems[]> {
    return await db.select().from(payrollItems).where(eq(payrollItems.payrollRunId, payrollRunId));
  }

  async createPayrollItem(item: InsertPayrollItems): Promise<PayrollItems> {
    const [newItem] = await db.insert(payrollItems).values(item).returning();
    return newItem;
  }

  async updatePayrollItem(id: string, item: Partial<InsertPayrollItems>): Promise<PayrollItems> {
    const [updated] = await db
      .update(payrollItems)
      .set(item)
      .where(eq(payrollItems.id, id))
      .returning();
    return updated;
  }

  async getLeaveTypes(): Promise<LeaveTypes[]> {
    return await db.select().from(leaveTypes).where(eq(leaveTypes.isActive, true));
  }

  async createLeaveType(leaveType: InsertLeaveTypes): Promise<LeaveTypes> {
    const [newLeaveType] = await db.insert(leaveTypes).values(leaveType).returning();
    return newLeaveType;
  }

  async updateLeaveType(id: string, leaveType: Partial<InsertLeaveTypes>): Promise<LeaveTypes> {
    const [updated] = await db
      .update(leaveTypes)
      .set(leaveType)
      .where(eq(leaveTypes.id, id))
      .returning();
    return updated;
  }

  async deleteLeaveType(id: string): Promise<void> {
    await db.update(leaveTypes).set({ isActive: false }).where(eq(leaveTypes.id, id));
  }

  async getLeaveApplications(limit = 50, offset = 0): Promise<LeaveApplications[]> {
    return await db.select().from(leaveApplications).limit(limit).offset(offset).orderBy(desc(leaveApplications.appliedDate));
  }

  async createLeaveApplication(application: InsertLeaveApplications): Promise<LeaveApplications> {
    const [newApplication] = await db.insert(leaveApplications).values(application).returning();
    return newApplication;
  }

  async updateLeaveApplication(id: string, application: Partial<InsertLeaveApplications>): Promise<LeaveApplications> {
    const [updated] = await db
      .update(leaveApplications)
      .set({ ...application, updatedAt: new Date() })
      .where(eq(leaveApplications.id, id))
      .returning();
    return updated;
  }

  async deleteLeaveApplication(id: string): Promise<void> {
    await db.update(leaveApplications).set({ status: 'cancelled' }).where(eq(leaveApplications.id, id));
  }

  async getPerformanceReviews(limit = 50, offset = 0): Promise<PerformanceReviews[]> {
    return await db.select().from(performanceReviews).limit(limit).offset(offset).orderBy(desc(performanceReviews.reviewDate));
  }

  async createPerformanceReview(review: InsertPerformanceReviews): Promise<PerformanceReviews> {
    const [newReview] = await db.insert(performanceReviews).values(review).returning();
    return newReview;
  }

  async updatePerformanceReview(id: string, review: Partial<InsertPerformanceReviews>): Promise<PerformanceReviews> {
    const [updated] = await db
      .update(performanceReviews)
      .set({ ...review, updatedAt: new Date() })
      .where(eq(performanceReviews.id, id))
      .returning();
    return updated;
  }

  async deletePerformanceReview(id: string): Promise<void> {
    await db.delete(performanceReviews).where(eq(performanceReviews.id, id));
  }

  // Legacy implementations for existing methods
  async getBillingRates(): Promise<BillingRate[]> { return []; }
  async createBillingRate(rate: InsertBillingRate): Promise<BillingRate> { throw new Error("Not implemented"); }
  async getBillingRateById(id: string): Promise<BillingRate | undefined> { return undefined; }
  async updateBillingRate(): Promise<void> {}
  async getActiveBillingRates(): Promise<BillingRate[]> { return []; }
  async getUnpaidBills(): Promise<MonthlyBill[]> { return []; }

  async generateMonthlyBills(): Promise<void> {}
  async createZone(zone: InsertZone): Promise<Zone> { throw new Error("Not implemented"); }
  async getZones(): Promise<Zone[]> { return []; }
  async getZoneById(id: string): Promise<Zone | undefined> { return undefined; }
  async updateZoneStatus(): Promise<void> {}
  async createPosTerminal(terminal: InsertPosTerminal): Promise<PosTerminal> { throw new Error("Not implemented"); }
  async getPosTerminals(): Promise<PosTerminal[]> { return []; }
  async getPosTerminalById(id: string): Promise<PosTerminal | undefined> { return undefined; }
  async updateTerminalStatus(): Promise<void> {}
  async updateTerminalDailyTotal(): Promise<void> {}
  async getPaymentsByDateRange(): Promise<Payment[]> { return []; }
  async getPaymentsByOperator(): Promise<Payment[]> { return []; }
  async getDailyPaymentTotals(): Promise<any[]> { return []; }
  async getPaymentGateways(): Promise<PaymentGateway[]> { return []; }
  async getPaymentGatewayByName(): Promise<PaymentGateway | undefined> { return undefined; }
  async updatePaymentGateway(): Promise<void> {}
  async enablePaymentGateway(): Promise<void> {}
  async getAuditLogsByDateRange(): Promise<AuditLog[]> { return []; }
  async getUserActivityLog(): Promise<AuditLog[]> { return []; }
  async getCustomerBills(): Promise<MonthlyBill[]> { return []; }
  async getCustomerPaymentHistory(): Promise<Payment[]> { return []; }
  async getCustomerAccountSummary(): Promise<any> { return {}; }
  async getRevenueAnalytics(): Promise<any> { return {}; }
  async getCollectionEfficiency(): Promise<any> { return {}; }
  async getMeterReadingStats(): Promise<any> { return {}; }
  // Face Scan Attendance operations
  async getAttendanceRecords(): Promise<AttendanceRecord[]> {
    return await db.select().from(attendanceRecords).orderBy(desc(attendanceRecords.date));
  }

  async createAttendanceRecord(record: InsertAttendanceRecord): Promise<AttendanceRecord> {
    const [newRecord] = await db.insert(attendanceRecords).values(record).returning();
    return newRecord;
  }

  async getFaceTemplates(): Promise<FaceTemplate[]> {
    return await db.select().from(faceTemplates).where(eq(faceTemplates.status, 'active'));
  }

  async createFaceTemplate(template: InsertFaceTemplate): Promise<FaceTemplate> {
    const [newTemplate] = await db.insert(faceTemplates).values(template).returning();
    return newTemplate;
  }

  async getAttendanceSettings(): Promise<AttendanceSettings[]> {
    return await db.select().from(attendanceSettings);
  }

  async createAttendanceSettings(settings: InsertAttendanceSettings): Promise<AttendanceSettings> {
    const [newSettings] = await db.insert(attendanceSettings).values(settings).returning();
    return newSettings;
  }

  async getAttendanceStats(): Promise<any> {
    const totalEmployees = await db.select().from(employees);
    const today = new Date().toISOString().split('T')[0];
    const allRecords = await db.select().from(attendanceRecords);
    const todayRecords = allRecords.filter(r => r.date === today);
    const presentToday = todayRecords.filter(r => r.status === 'present').length;
    
    return {
      totalEmployees: totalEmployees.length,
      todayAttendance: todayRecords.length,
      presentCount: presentToday,
      attendanceRate: totalEmployees.length > 0 ? Math.round((presentToday / totalEmployees.length) * 100) : 0
    };
  }

  // ===== SUPER ADMIN METHODS =====

  // User count methods for system stats
  async getUserCount(): Promise<number> {
    try {
      const [result] = await db.select({ count: count() }).from(users);
      return result?.count || 0;
    } catch (error) {
      console.error("Error getting user count:", error);
      return 0;
    }
  }

  async getActiveUserCount(): Promise<number> {
    try {
      const [result] = await db.select({ count: count() }).from(users)
        .where(eq(users.isActive, true));
      return result?.count || 0;
    } catch (error) {
      console.error("Error getting active user count:", error);
      return 0;
    }
  }

  async getTotalTransactions(): Promise<number> {
    try {
      // Sum up transactions from various modules
      const [housingCount] = await db.select({ count: count() }).from(housingApplications);
      const [complaintsCount] = await db.select({ count: count() }).from(customerComplaints);
      const [bookingsCount] = await db.select({ count: count() }).from(facilityBookings);
      
      return (housingCount?.count || 0) + (complaintsCount?.count || 0) + (bookingsCount?.count || 0);
    } catch (error) {
      console.error("Error getting total transactions:", error);
      return 0;
    }
  }

  // Get all users for Super Admin
  async getAllUsers(): Promise<User[]> {
    try {
      return await db.select().from(users).orderBy(desc(users.createdAt));
    } catch (error) {
      console.error("Error fetching all users:", error);
      return [];
    }
  }

  // Create user by Super Admin
  async createUserBySuperAdmin(userData: any): Promise<User> {
    try {
      const [user] = await db.insert(users).values(userData).returning();
      return user;
    } catch (error) {
      console.error("Error creating user by super admin:", error);
      throw error;
    }
  }

  // Update user by Super Admin
  async updateUserBySuperAdmin(userId: string, updates: any): Promise<User> {
    try {
      const [user] = await db.update(users)
        .set(updates)
        .where(eq(users.id, userId))
        .returning();
      return user;
    } catch (error) {
      console.error("Error updating user by super admin:", error);
      throw error;
    }
  }

  // Delete user
  async deleteUser(userId: string): Promise<void> {
    try {
      await db.delete(users).where(eq(users.id, userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }

  // Audit log methods
  async createAuditLog(logData: InsertAuditLog): Promise<AuditLog> {
    try {
      const [log] = await db.insert(auditLogs).values({
        ...logData,
        id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date()
      }).returning();
      return log;
    } catch (error) {
      console.error("Error creating audit log:", error);
      throw error;
    }
  }

  async getAuditLogs(filters?: any): Promise<AuditLog[]> {
    try {
      let query = db.select().from(auditLogs);
      
      if (filters) {
        const conditions = [];
        if (filters.tableName && filters.tableName !== "all") {
          conditions.push(eq(auditLogs.tableName, filters.tableName));
        }
        if (filters.userId) {
          conditions.push(eq(auditLogs.userId, filters.userId));
        }
        if (filters.module && filters.module !== "all") {
          conditions.push(eq(auditLogs.module, filters.module));
        }
        if (filters.severity && filters.severity !== "all") {
          conditions.push(eq(auditLogs.severity, filters.severity));
        }
        
        if (conditions.length > 0) {
          query = query.where(and(...conditions));
        }
      }
      
      return await query.orderBy(desc(auditLogs.timestamp)).limit(100);
    } catch (error) {
      console.error("Error fetching audit logs:", error);
      return [];
    }
  }

  // System notifications methods
  async getSystemNotifications(): Promise<SystemNotification[]> {
    try {
      return await db.select().from(systemNotifications)
        .where(eq(systemNotifications.isActive, true))
        .orderBy(desc(systemNotifications.createdAt));
    } catch (error) {
      console.error("Error fetching system notifications:", error);
      return [];
    }
  }

  async createSystemNotification(notificationData: InsertSystemNotification): Promise<SystemNotification> {
    try {
      const [notification] = await db.insert(systemNotifications)
        .values(notificationData)
        .returning();
      return notification;
    } catch (error) {
      console.error("Error creating system notification:", error);
      throw error;
    }
  }

  // System backup methods
  async createSystemBackup(backupData: InsertSystemBackup): Promise<SystemBackup> {
    try {
      const [backup] = await db.insert(systemBackups)
        .values(backupData)
        .returning();
      return backup;
    } catch (error) {
      console.error("Error creating system backup:", error);
      throw error;
    }
  }

  async getSystemBackups(): Promise<SystemBackup[]> {
    try {
      return await db.select().from(systemBackups)
        .orderBy(desc(systemBackups.createdAt))
        .limit(50);
    } catch (error) {
      console.error("Error fetching system backups:", error);
      return [];
    }
  }
}

export const storage = new DatabaseStorage();
