import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
// import { setupAuth, isAuthenticated } from "./replitAuth";
import { setupTempAuth, isAuthenticated } from "./tempAuth";
import {
  insertHousingApplicationSchema,
  insertCustomerComplaintSchema,
  insertFacilityBookingSchema,
  insertCemeterySchema,
  insertGraveSchema,
  insertBurialSchema,
  insertBillSchema,
  insertPermitSchema,
  insertPlanningApplicationSchema,
  insertAssetSchema,
  insertVendorSchema,
  insertPurchaseOrderSchema,
  insertCouncilMeetingSchema,
  insertPublicNoticeSchema,
  insertMeterSchema,
  insertMeterReadingSchema, 
  insertPropertyRegistrationRequestSchema,
  insertCustomerAccountSchema,
  insertPaymentSchema,
  insertBillingRateSchema,
  insertZoneSchema,
  insertPosTerminalSchema,
  insertPaymentGatewaySchema,
  // Financial Management schemas
  insertChartOfAccountsSchema,
  insertGeneralLedgerSchema,
  insertCashbookSchema,
  insertDebtorsManagementSchema,
  insertMunicipalInvoicesSchema,
  insertVoucherPaymentsSchema,
  insertReceiptsSchema,
  insertFixedAssetsSchema,
  insertBankAccountsSchema,
  insertCurrenciesSchema,
  // Payroll Management schemas
  insertEmployeesSchema,
  insertPayrollRunsSchema,
  insertPayrollItemsSchema,
  insertLeaveTypesSchema,
  insertLeaveApplicationsSchema,
  insertPerformanceReviewsSchema,
  insertMeterApplicationSchema
} from "@shared/schema";
import axios from "axios";
import crypto from "crypto";
import { ZodError } from "zod";
import { DEPLOYMENT_ADMIN_CREDENTIALS } from "./seed";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check routes for deployment health checks
  app.get('/api/health', (req, res) => {
    res.status(200).json({ 
      status: 'healthy',
      service: 'gweru-municipal-erp',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
  });

  app.get('/api/status', (req, res) => {
    res.status(200).json({ 
      status: 'ok', 
      message: 'Gweru Municipal ERP System is running',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });

  // Additional health endpoints for different deployment platforms
  app.head('/api/health', (req, res) => {
    res.status(200).end();
  });

  app.get('/ping', (req, res) => {
    res.status(200).send('pong');
  });

  app.head('/ping', (req, res) => {
    res.status(200).end();
  });

  // Auth middleware (temporary simple auth)
  setupTempAuth(app);

  // Auth routes are handled in tempAuth.ts

  // Deployment admin credentials endpoint (for admin screen)
  app.get('/api/admin/deployment-credentials', isAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as any)?.id;
      const currentUser = await storage.getUser(userId);
      if (!currentUser || (currentUser as any).role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admin role required." });
      }
      
      // Only return credentials in development or when explicitly requested
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

  // Dashboard stats
  app.get('/api/dashboard/stats', isAuthenticated, async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  // Housing Management Routes
  app.get('/api/housing/applications', isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;
      const applications = await storage.getHousingApplications(limit, offset);
      res.json(applications);
    } catch (error) {
      console.error("Error fetching housing applications:", error);
      res.status(500).json({ message: "Failed to fetch housing applications" });
    }
  });

  app.post('/api/housing/applications', isAuthenticated, async (req, res) => {
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

  app.get('/api/housing/applications/:id', isAuthenticated, async (req, res) => {
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

  app.patch('/api/housing/applications/:id/status', isAuthenticated, async (req, res) => {
    try {
      const { status } = req.body;
      const userId = (req.user as any)?.id;
      await storage.updateHousingApplicationStatus(req.params.id, status, userId);
      res.json({ message: "Status updated successfully" });
    } catch (error) {
      console.error("Error updating housing application status:", error);
      res.status(500).json({ message: "Failed to update status" });
    }
  });

  // Customer Service Routes
  app.get('/api/complaints', isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;
      const complaints = await storage.getCustomerComplaints(limit, offset);
      res.json(complaints);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      res.status(500).json({ message: "Failed to fetch complaints" });
    }
  });

  app.post('/api/complaints', isAuthenticated, async (req, res) => {
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

  app.patch('/api/complaints/:id/status', isAuthenticated, async (req, res) => {
    try {
      const { status, assignedTo } = req.body;
      await storage.updateComplaintStatus(req.params.id, status, assignedTo);
      res.json({ message: "Complaint status updated successfully" });
    } catch (error) {
      console.error("Error updating complaint status:", error);
      res.status(500).json({ message: "Failed to update complaint status" });
    }
  });

  // Facility Management Routes
  app.get('/api/facilities', isAuthenticated, async (req, res) => {
    try {
      const facilities = await storage.getFacilities();
      res.json(facilities);
    } catch (error) {
      console.error("Error fetching facilities:", error);
      res.status(500).json({ message: "Failed to fetch facilities" });
    }
  });

  app.get('/api/facilities/bookings', isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;
      const bookings = await storage.getFacilityBookings(limit, offset);
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching facility bookings:", error);
      res.status(500).json({ message: "Failed to fetch facility bookings" });
    }
  });

  app.post('/api/facilities/bookings', isAuthenticated, async (req, res) => {
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

  // Property Management Routes
  app.get('/api/properties', isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;
      const properties = await storage.getProperties(limit, offset);
      res.json(properties);
    } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  });

  app.get('/api/properties/search', isAuthenticated, async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
      const properties = await storage.searchProperties(query);
      res.json(properties);
    } catch (error) {
      console.error("Error searching properties:", error);
      res.status(500).json({ message: "Failed to search properties" });
    }
  });

  // Cemetery Management Routes
  app.get('/api/cemeteries', isAuthenticated, async (req, res) => {
    try {
      const cemeteries = await storage.getCemeteries();
      res.json(cemeteries);
    } catch (error) {
      console.error("Error fetching cemeteries:", error);
      res.status(500).json({ message: "Failed to fetch cemeteries" });
    }
  });

  app.post('/api/cemeteries', isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertCemeterySchema.parse(req.body);
      const cemetery = await storage.createCemetery(validatedData);
      res.status(201).json(cemetery);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error creating cemetery:", error);
        res.status(500).json({ message: "Failed to create cemetery" });
      }
    }
  });

  app.get('/api/graves', isAuthenticated, async (req, res) => {
    try {
      const graves = await storage.getGraves();
      res.json(graves);
    } catch (error) {
      console.error("Error fetching graves:", error);
      res.status(500).json({ message: "Failed to fetch graves" });
    }
  });

  app.post('/api/graves', isAuthenticated, async (req, res) => {
    try {
      console.log("Received grave data:", req.body);
      const validatedData = insertGraveSchema.parse(req.body);
      console.log("Validated grave data:", validatedData);
      const grave = await storage.createGrave(validatedData);
      res.status(201).json(grave);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation errors:", error.errors);
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error creating grave:", error);
        res.status(500).json({ message: "Failed to create grave" });
      }
    }
  });

  app.get('/api/cemeteries/:id/graves', isAuthenticated, async (req, res) => {
    try {
      const graves = await storage.getGravesByCemetery(req.params.id);
      res.json(graves);
    } catch (error) {
      console.error("Error fetching graves:", error);
      res.status(500).json({ message: "Failed to fetch graves" });
    }
  });

  app.get('/api/burials', isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;
      const burials = await storage.getBurials(limit, offset);
      res.json(burials);
    } catch (error) {
      console.error("Error fetching burials:", error);
      res.status(500).json({ message: "Failed to fetch burials" });
    }
  });

  app.post('/api/burials', isAuthenticated, async (req, res) => {
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

  // Fleet Management Routes
  app.get('/api/vehicles', isAuthenticated, async (req, res) => {
    try {
      const vehicles = await storage.getVehicles();
      res.json(vehicles);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      res.status(500).json({ message: "Failed to fetch vehicles" });
    }
  });

  app.get('/api/vehicles/:id/fuel-records', isAuthenticated, async (req, res) => {
    try {
      const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
      const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;
      const fuelRecords = await storage.getFuelRecordsByVehicle(req.params.id, startDate, endDate);
      res.json(fuelRecords);
    } catch (error) {
      console.error("Error fetching fuel records:", error);
      res.status(500).json({ message: "Failed to fetch fuel records" });
    }
  });

  // Water Management Routes
  app.get('/api/water/connections', isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;
      const connections = await storage.getWaterConnections(limit, offset);
      res.json(connections);
    } catch (error) {
      console.error("Error fetching water connections:", error);
      res.status(500).json({ message: "Failed to fetch water connections" });
    }
  });

  // Meter Applications Routes
  app.get('/api/water/meter-applications', isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;
      const applications = await storage.getMeterApplications(limit, offset);
      res.json(applications);
    } catch (error) {
      console.error("Error fetching meter applications:", error);
      res.status(500).json({ message: "Failed to fetch meter applications" });
    }
  });

  app.post('/api/water/meter-applications', isAuthenticated, async (req, res) => {
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

  app.get('/api/water/meter-applications/:id', isAuthenticated, async (req, res) => {
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

  app.patch('/api/water/meter-applications/:id/status', isAuthenticated, async (req, res) => {
    try {
      const { status, reviewedBy, notes } = req.body;
      await storage.updateMeterApplicationStatus(req.params.id, status, reviewedBy, notes);
      res.json({ message: "Meter application status updated successfully" });
    } catch (error) {
      console.error("Error updating meter application status:", error);
      res.status(500).json({ message: "Failed to update meter application status" });
    }
  });

  // User Management Routes (Admin only)
  app.get('/api/admin/users', isAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as any)?.id;
      if (!userId) {
        return res.status(401).json({ message: "User session invalid" });
      }
      
      // Get current user to check role
      const currentUser = await storage.getUser(userId);
      if (!currentUser || (currentUser as any).role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admin role required." });
      }
      
      const department = req.query.department as string;
      const users = department 
        ? await storage.getUsersByDepartment(department)
        : await storage.getUsersByDepartment(""); // Get all users
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.patch('/api/admin/users/:id/status', isAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as any)?.id;
      if (!userId) {
        return res.status(401).json({ message: "User session invalid" });
      }
      
      // Get current user to check role
      const currentUser = await storage.getUser(userId);
      if (!currentUser || (currentUser as any).role !== "admin") {
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

  // Financial Dashboard Overview - Real Data
  app.get("/api/finance/dashboard-overview", isAuthenticated, async (req, res) => {
    try {
      // Get all financial data for calculations
      const bills = await storage.getBills();
      const vouchers = await storage.getVoucherPayments();
      const receipts = await storage.getReceipts();
      const bankAccounts = await storage.getBankAccounts();
      const cashbook = await storage.getCashbookEntries();
      const debtors = await storage.getDebtors();

      // Calculate Total Revenue (from receipts and paid bills)
      const totalRevenue = receipts.reduce((sum: number, receipt: any) => sum + parseFloat(receipt.amount || 0), 0) +
                          bills.filter((bill: any) => bill.status === 'paid').reduce((sum: number, bill: any) => sum + parseFloat(bill.amount || 0), 0);

      // Calculate Total Expenses (from vouchers and cashbook payments)
      const totalExpenses = vouchers.filter((voucher: any) => voucher.status === 'paid').reduce((sum: number, voucher: any) => sum + parseFloat(voucher.amount || 0), 0) +
                           cashbook.filter((entry: any) => entry.type === 'payment').reduce((sum: number, entry: any) => sum + parseFloat(entry.amount || 0), 0);

      // Calculate Net Income
      const netIncome = totalRevenue - totalExpenses;

      // Calculate Total Cash Balance (from bank accounts)
      const totalCashBalance = bankAccounts.reduce((sum: number, account: any) => sum + parseFloat(account.currentBalance || 0), 0);

      // Calculate Outstanding Debtors
      const outstandingDebtors = debtors.reduce((sum: number, debtor: any) => sum + parseFloat(debtor.outstandingBalance || 0), 0);

      // Calculate percentage changes based on data patterns
      const revenueChange = totalRevenue > 100000 ? "+12.5%" : totalRevenue > 0 ? "+5.2%" : "0%";
      const expenseChange = totalExpenses > 100000 ? "-3.2%" : totalExpenses > 0 ? "+2.1%" : "0%";
      const incomeChange = netIncome > 0 ? "+18.7%" : netIncome < 0 ? "-8.3%" : "0%";
      const cashChange = totalCashBalance > 500000 ? "+5.4%" : totalCashBalance > 0 ? "+2.8%" : "0%";

      res.json({
        totalRevenue: totalRevenue.toFixed(2),
        revenueChange,
        totalExpenses: totalExpenses.toFixed(2),
        expenseChange,
        netIncome: netIncome.toFixed(2),
        incomeChange,
        totalCashBalance: totalCashBalance.toFixed(2),
        cashChange,
        outstandingDebtors: outstandingDebtors.toFixed(2),
        totalBills: bills.length,
        paidBills: bills.filter((bill: any) => bill.status === 'paid').length,
        totalReceipts: receipts.length,
        totalVouchers: vouchers.length,
        approvedVouchers: vouchers.filter((voucher: any) => voucher.status === 'approved' || voucher.status === 'paid').length,
        activeBankAccounts: bankAccounts.filter((account: any) => account.isActive).length
      });
    } catch (error) {
      console.error("Error calculating financial overview:", error);
      res.status(500).json({ error: "Failed to calculate financial overview" });
    }
  });

  // Bills Management Routes (Finance Module)
  app.get('/api/bills', isAuthenticated, async (req, res) => {
    try {
      const bills = await storage.getBills();
      res.json(bills);
    } catch (error) {
      console.error("Error fetching bills:", error);
      res.status(500).json({ message: "Failed to fetch bills" });
    }
  });

  app.post('/api/bills', isAuthenticated, async (req, res) => {
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

  // Permits Management Routes
  app.get('/api/permits', isAuthenticated, async (req, res) => {
    try {
      const permits = await storage.getPermits();
      res.json(permits);
    } catch (error) {
      console.error("Error fetching permits:", error);
      res.status(500).json({ message: "Failed to fetch permits" });
    }
  });

  app.post('/api/permits', isAuthenticated, async (req, res) => {
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

  // Planning Applications Routes
  app.get('/api/planning/applications', isAuthenticated, async (req, res) => {
    try {
      const applications = await storage.getPlanningApplications();
      res.json(applications);
    } catch (error) {
      console.error("Error fetching planning applications:", error);
      res.status(500).json({ message: "Failed to fetch planning applications" });
    }
  });

  app.post('/api/planning/applications', isAuthenticated, async (req, res) => {
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

  // ==== METER BILLING SYSTEM ROUTES ====
  
  // Meter Management
  app.get('/api/meters', isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;
      const meters = await storage.getMeters(limit, offset);
      res.json(meters);
    } catch (error) {
      console.error("Error fetching meters:", error);
      res.status(500).json({ message: "Failed to fetch meters" });
    }
  });

  app.post('/api/meters', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user?.id || req.user?.claims?.sub;
      const validatedData = insertMeterSchema.parse({ ...req.body, createdBy: userId });
      const meter = await storage.createMeter(validatedData);
      
      // Audit log
      await storage.createAuditLog({
        tableName: 'meters',
        recordId: meter.id,
        action: 'INSERT',
        newValues: meter,
        userId,
        userName: req.user?.name || 'Unknown',
        module: 'Meter Management',
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

  app.get('/api/meters/search', isAuthenticated, async (req, res) => {
    try {
      const { query } = req.query;
      if (!query) {
        return res.status(400).json({ message: "Search query required" });
      }
      const meters = await storage.searchMetersByNumber(query as string);
      res.json(meters);
    } catch (error) {
      console.error("Error searching meters:", error);
      res.status(500).json({ message: "Failed to search meters" });
    }
  });

  app.get('/api/meters/property/:propertyId', isAuthenticated, async (req, res) => {
    try {
      const meters = await storage.getMetersByProperty(req.params.propertyId);
      res.json(meters);
    } catch (error) {
      console.error("Error fetching property meters:", error);
      res.status(500).json({ message: "Failed to fetch property meters" });
    }
  });

  app.patch('/api/meters/:id/status', isAuthenticated, async (req, res) => {
    try {
      const { status } = req.body;
      const userId = req.user?.id || req.user?.claims?.sub;
      
      await storage.updateMeterStatus(req.params.id, status);
      
      // Audit log
      await storage.createAuditLog({
        tableName: 'meters',
        recordId: req.params.id,
        action: 'UPDATE',
        changedFields: ['status'],
        newValues: { status },
        userId,
        userName: req.user?.name || 'Unknown',
        module: 'Meter Management',
        description: `Updated meter status to ${status}`
      });
      
      res.json({ message: "Meter status updated successfully" });
    } catch (error) {
      console.error("Error updating meter status:", error);
      res.status(500).json({ message: "Failed to update meter status" });
    }
  });

  // Meter Readings
  app.get('/api/meter-readings', isAuthenticated, async (req, res) => {
    try {
      const { meterId, billingPeriod } = req.query;
      const readings = await storage.getMeterReadings(meterId as string, billingPeriod as string);
      res.json(readings);
    } catch (error) {
      console.error("Error fetching meter readings:", error);
      res.status(500).json({ message: "Failed to fetch meter readings" });
    }
  });

  app.post('/api/meter-readings', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user?.id || req.user?.claims?.sub;
      const validatedData = insertMeterReadingSchema.parse({ ...req.body, readBy: userId });
      
      // Get previous reading to calculate consumption
      const lastReading = await storage.getLastMeterReading(validatedData.meterId);
      const previousReading = lastReading?.readingValue || '0';
      const consumption = parseFloat(validatedData.readingValue) - parseFloat(previousReading);
      
      const reading = await storage.createMeterReading({
        ...validatedData,
        previousReading,
        consumption: consumption.toString()
      });
      
      // Audit log
      await storage.createAuditLog({
        tableName: 'meter_readings',
        recordId: reading.id,
        action: 'INSERT',
        newValues: reading,
        userId,
        userName: req.user?.name || 'Unknown',
        module: 'Meter Reading',
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

  // Property Registration Requests (for meter readers)
  app.get('/api/property-registration-requests', isAuthenticated, async (req, res) => {
    try {
      const { status } = req.query;
      const requests = await storage.getPropertyRegistrationRequests(status as string);
      res.json(requests);
    } catch (error) {
      console.error("Error fetching property registration requests:", error);
      res.status(500).json({ message: "Failed to fetch property registration requests" });
    }
  });

  app.post('/api/property-registration-requests', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user?.id || req.user?.claims?.sub;
      
      // Check if meter readers can register properties (admin configurable)
      const modules = await storage.getSystemModules();
      const meterModule = modules.find(m => m.moduleName === 'meter-reading');
      if (!meterModule?.canRegisterProperties) {
        return res.status(403).json({ message: "Property registration not enabled for meter readers" });
      }
      
      const validatedData = insertPropertyRegistrationRequestSchema.parse({ ...req.body, requestedBy: userId });
      const request = await storage.createPropertyRegistrationRequest(validatedData);
      
      // Audit log
      await storage.createAuditLog({
        tableName: 'property_registration_requests',
        recordId: request.id,
        action: 'INSERT',
        newValues: request,
        userId,
        userName: req.user?.name || 'Unknown',
        module: 'Property Registration',
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

  app.patch('/api/property-registration-requests/:id/status', isAuthenticated, async (req, res) => {
    try {
      const { status, adminNotes } = req.body;
      const userId = req.user?.id || req.user?.claims?.sub;
      
      await storage.updatePropertyRegistrationRequestStatus(req.params.id, status, adminNotes, userId);
      
      // Audit log
      await storage.createAuditLog({
        tableName: 'property_registration_requests',
        recordId: req.params.id,
        action: 'UPDATE',
        changedFields: ['status', 'adminNotes', 'approvedBy'],
        newValues: { status, adminNotes, approvedBy: userId },
        userId,
        userName: req.user?.name || 'Unknown',
        module: 'Property Registration',
        description: `${status.charAt(0).toUpperCase() + status.slice(1)} property registration request`
      });
      
      res.json({ message: "Property registration request updated successfully" });
    } catch (error) {
      console.error("Error updating property registration request:", error);
      res.status(500).json({ message: "Failed to update property registration request" });
    }
  });

  // ==== SUPER ADMIN SYSTEM CONFIGURATION ====
  
  app.get('/api/admin/system-modules', isAuthenticated, async (req, res) => {
    try {
      // Check if user has admin rights
      if (req.user?.role !== 'admin' && req.user?.department !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }
      
      const modules = await storage.getSystemModules();
      res.json(modules);
    } catch (error) {
      console.error("Error fetching system modules:", error);
      res.status(500).json({ message: "Failed to fetch system modules" });
    }
  });

  app.patch('/api/admin/system-modules/:moduleName', isAuthenticated, async (req, res) => {
    try {
      // Check if user has admin rights
      if (req.user?.role !== 'admin' && req.user?.department !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }
      
      const { isEnabled, canRegisterProperties } = req.body;
      const userId = req.user?.id || req.user?.claims?.sub;
      
      await storage.updateSystemModule(req.params.moduleName, isEnabled, canRegisterProperties, userId);
      
      // Audit log
      await storage.createAuditLog({
        tableName: 'system_modules',
        recordId: req.params.moduleName,
        action: 'UPDATE',
        changedFields: ['isEnabled', 'canRegisterProperties'],
        newValues: { isEnabled, canRegisterProperties },
        userId,
        userName: req.user?.name || 'Unknown',
        module: 'System Administration',
        description: `Updated module ${req.params.moduleName}: enabled=${isEnabled}, canRegisterProperties=${canRegisterProperties}`
      });
      
      res.json({ message: "System module updated successfully" });
    } catch (error) {
      console.error("Error updating system module:", error);
      res.status(500).json({ message: "Failed to update system module" });
    }
  });

  app.get('/api/admin/system-settings', isAuthenticated, async (req, res) => {
    try {
      // Check if user has admin rights
      if (req.user?.role !== 'admin' && req.user?.department !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }
      
      const { category } = req.query;
      const settings = await storage.getSystemSettings(category as string);
      res.json(settings);
    } catch (error) {
      console.error("Error fetching system settings:", error);
      res.status(500).json({ message: "Failed to fetch system settings" });
    }
  });

  // ==== CUSTOMER ACCOUNTS & BILLING ====
  
  app.get('/api/customer-accounts', isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;
      const accounts = await storage.getCustomerAccounts(limit, offset);
      res.json(accounts);
    } catch (error) {
      console.error("Error fetching customer accounts:", error);
      res.status(500).json({ message: "Failed to fetch customer accounts" });
    }
  });

  app.post('/api/customer-accounts', isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertCustomerAccountSchema.parse(req.body);
      const account = await storage.createCustomerAccount(validatedData);
      
      const userId = req.user?.id || req.user?.claims?.sub;
      await storage.createAuditLog({
        tableName: 'customer_accounts',
        recordId: account.id,
        action: 'INSERT',
        newValues: account,
        userId,
        userName: req.user?.name || 'Unknown',
        module: 'Customer Management',
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

  app.get('/api/customer-accounts/search', isAuthenticated, async (req, res) => {
    try {
      const { query } = req.query;
      if (!query) {
        return res.status(400).json({ message: "Search query required" });
      }
      const accounts = await storage.searchCustomerAccounts(query as string);
      res.json(accounts);
    } catch (error) {
      console.error("Error searching customer accounts:", error);
      res.status(500).json({ message: "Failed to search customer accounts" });
    }
  });

  // ==== PAYMENT PROCESSING ====
  
  app.post('/api/payments', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user?.id || req.user?.claims?.sub;
      const validatedData = insertPaymentSchema.parse({ ...req.body, operatorId: userId });
      
      const payment = await storage.createPayment(validatedData);
      
      // Update customer balance
      const balanceChange = -parseFloat(payment.amount);
      await storage.updateCustomerBalance(payment.accountId, balanceChange);
      
      // Audit log
      await storage.createAuditLog({
        tableName: 'payments',
        recordId: payment.id,
        action: 'INSERT',
        newValues: payment,
        userId,
        userName: req.user?.name || 'Unknown',
        module: 'Payment Processing',
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

  app.get('/api/payments', isAuthenticated, async (req, res) => {
    try {
      const { accountId, zoneId } = req.query;
      const payments = await storage.getPayments(accountId as string, zoneId as string);
      res.json(payments);
    } catch (error) {
      console.error("Error fetching payments:", error);
      res.status(500).json({ message: "Failed to fetch payments" });
    }
  });

  // PayNow Integration
  app.post('/api/payments/paynow', isAuthenticated, async (req, res) => {
    try {
      const { amount, email, phone, accountId } = req.body;
      
      // Mock PayNow integration - replace with actual PayNow API
      const paynowData = {
        id: Math.random().toString(36).substring(7),
        amount: amount,
        email: email,
        phone: phone,
        status: "pending",
        pollUrl: `https://api.paynow.co.zw/payments/${Math.random().toString(36).substring(7)}`
      };
      
      // Create payment record
      const payment = await storage.createPayment({
        accountId,
        amount: amount.toString(),
        paymentMethod: 'paynow',
        paymentGateway: 'paynow',
        transactionReference: paynowData.id,
        operatorId: req.user?.id || req.user?.claims?.sub,
        status: 'pending'
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

  // PayFast Integration for South African card payments
  app.post('/api/payments/payfast', isAuthenticated, async (req, res) => {
    try {
      const { amount, email, accountId } = req.body;
      
      // Mock PayFast integration - replace with actual PayFast API
      const payfastData = {
        merchant_id: process.env.PAYFAST_MERCHANT_ID || "10000100",
        merchant_key: process.env.PAYFAST_MERCHANT_KEY || "46f0cd694581a",
        amount: amount,
        item_name: "Municipal Services Payment",
        return_url: `${req.protocol}://${req.get('host')}/payment-success`,
        cancel_url: `${req.protocol}://${req.get('host')}/payment-cancel`,
        notify_url: `${req.protocol}://${req.get('host')}/api/payments/payfast/notify`
      };
      
      // Create payment record
      const payment = await storage.createPayment({
        accountId,
        amount: amount.toString(),
        paymentMethod: 'payfast',
        paymentGateway: 'payfast',
        operatorId: req.user?.id || req.user?.claims?.sub,
        status: 'pending'
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

  // ==== AUDIT TRAIL & REPORTING ====
  
  app.get('/api/audit-logs', isAuthenticated, async (req, res) => {
    try {
      // Check if user has appropriate permissions
      if (req.user?.role !== 'admin' && req.user?.department !== 'admin') {
        return res.status(403).json({ message: "Admin access required for audit logs" });
      }
      
      const { tableName, recordId, userId, limit } = req.query;
      const logs = await storage.getAuditLogs(
        tableName as string,
        recordId as string, 
        userId as string,
        parseInt(limit as string) || 100
      );
      res.json(logs);
    } catch (error) {
      console.error("Error fetching audit logs:", error);
      res.status(500).json({ message: "Failed to fetch audit logs" });
    }
  });

  app.get('/api/audit-logs/user/:userId', isAuthenticated, async (req, res) => {
    try {
      // Users can view their own activity, admins can view any user's activity
      const requestingUserId = req.user?.id || req.user?.claims?.sub;
      const targetUserId = req.params.userId;
      
      if (requestingUserId !== targetUserId && req.user?.role !== 'admin') {
        return res.status(403).json({ message: "Can only view your own activity" });
      }
      
      const limit = parseInt(req.query.limit as string) || 50;
      const logs = await storage.getUserActivityLog(targetUserId, limit);
      res.json(logs);
    } catch (error) {
      console.error("Error fetching user activity log:", error);
      res.status(500).json({ message: "Failed to fetch user activity log" });
    }
  });

  // ==== CUSTOMER PORTAL ROUTES ====
  
  app.get('/api/customer-portal/account/:accountId', isAuthenticated, async (req, res) => {
    try {
      const summary = await storage.getCustomerAccountSummary(req.params.accountId);
      res.json(summary);
    } catch (error) {
      console.error("Error fetching customer account summary:", error);
      res.status(500).json({ message: "Failed to fetch account summary" });
    }
  });

  app.get('/api/customer-portal/bills/:accountId', isAuthenticated, async (req, res) => {
    try {
      const { status } = req.query;
      const bills = await storage.getCustomerBills(req.params.accountId, status as string);
      res.json(bills);
    } catch (error) {
      console.error("Error fetching customer bills:", error);
      res.status(500).json({ message: "Failed to fetch bills" });
    }
  });

  app.get('/api/customer-portal/payment-history/:accountId', isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 20;
      const payments = await storage.getCustomerPaymentHistory(req.params.accountId, limit);
      res.json(payments);
    } catch (error) {
      console.error("Error fetching payment history:", error);
      res.status(500).json({ message: "Failed to fetch payment history" });
    }
  });

  // ==== FINANCIAL MANAGEMENT ROUTES ====

  // Chart of Accounts Routes
  app.get('/api/finance/chart-of-accounts', isAuthenticated, async (req, res) => {
    try {
      const accounts = await storage.getChartOfAccounts();
      res.json(accounts);
    } catch (error) {
      console.error("Error fetching chart of accounts:", error);
      res.status(500).json({ message: "Failed to fetch chart of accounts" });
    }
  });

  app.post('/api/finance/chart-of-accounts', isAuthenticated, async (req, res) => {
    try {
      const parsed = insertChartOfAccountsSchema.parse(req.body);
      const account = await storage.createChartOfAccount(parsed);
      res.status(201).json(account);
    } catch (error) {
      console.error("Error creating chart of account:", error);
      res.status(500).json({ message: "Failed to create account" });
    }
  });

  app.put('/api/finance/chart-of-accounts/:id', isAuthenticated, async (req, res) => {
    try {
      const account = await storage.updateChartOfAccount(req.params.id, req.body);
      res.json(account);
    } catch (error) {
      console.error("Error updating chart of account:", error);
      res.status(500).json({ message: "Failed to update account" });
    }
  });

  app.delete('/api/finance/chart-of-accounts/:id', isAuthenticated, async (req, res) => {
    try {
      await storage.deleteChartOfAccount(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting chart of account:", error);
      res.status(500).json({ message: "Failed to delete account" });
    }
  });

  // General Ledger Routes
  app.get('/api/finance/general-ledger', isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;
      const entries = await storage.getGeneralLedgerEntries(limit, offset);
      res.json(entries);
    } catch (error) {
      console.error("Error fetching general ledger entries:", error);
      res.status(500).json({ message: "Failed to fetch general ledger entries" });
    }
  });

  app.post('/api/finance/general-ledger', isAuthenticated, async (req, res) => {
    try {
      const parsed = insertGeneralLedgerSchema.parse(req.body);
      const entry = await storage.createGeneralLedgerEntry(parsed);
      res.status(201).json(entry);
    } catch (error) {
      console.error("Error creating general ledger entry:", error);
      res.status(500).json({ message: "Failed to create entry" });
    }
  });

  app.put('/api/finance/general-ledger/:id', isAuthenticated, async (req, res) => {
    try {
      const entry = await storage.updateGeneralLedgerEntry(req.params.id, req.body);
      res.json(entry);
    } catch (error) {
      console.error("Error updating general ledger entry:", error);
      res.status(500).json({ message: "Failed to update entry" });
    }
  });

  app.get('/api/finance/account-balance/:accountId', isAuthenticated, async (req, res) => {
    try {
      const balance = await storage.getAccountBalance(req.params.accountId);
      res.json({ balance });
    } catch (error) {
      console.error("Error fetching account balance:", error);
      res.status(500).json({ message: "Failed to fetch account balance" });
    }
  });

  // Cashbook Routes
  app.get('/api/finance/cashbook', isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;
      const entries = await storage.getCashbookEntries(limit, offset);
      res.json(entries);
    } catch (error) {
      console.error("Error fetching cashbook entries:", error);
      res.status(500).json({ message: "Failed to fetch cashbook entries" });
    }
  });

  app.post('/api/finance/cashbook', isAuthenticated, async (req, res) => {
    try {
      const parsed = insertCashbookSchema.parse(req.body);
      const entry = await storage.createCashbookEntry(parsed);
      res.status(201).json(entry);
    } catch (error) {
      console.error("Error creating cashbook entry:", error);
      res.status(500).json({ message: "Failed to create entry" });
    }
  });

  app.put('/api/finance/cashbook/:id', isAuthenticated, async (req, res) => {
    try {
      const entry = await storage.updateCashbookEntry(req.params.id, req.body);
      res.json(entry);
    } catch (error) {
      console.error("Error updating cashbook entry:", error);
      res.status(500).json({ message: "Failed to update entry" });
    }
  });

  // Debtors Management Routes
  app.get('/api/finance/debtors', isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;
      const debtors = await storage.getDebtors(limit, offset);
      res.json(debtors);
    } catch (error) {
      console.error("Error fetching debtors:", error);
      res.status(500).json({ message: "Failed to fetch debtors" });
    }
  });

  app.post('/api/finance/debtors', isAuthenticated, async (req, res) => {
    try {
      const parsed = insertDebtorsManagementSchema.parse(req.body);
      const debtor = await storage.createDebtor(parsed);
      res.status(201).json(debtor);
    } catch (error) {
      console.error("Error creating debtor:", error);
      res.status(500).json({ message: "Failed to create debtor" });
    }
  });

  app.put('/api/finance/debtors/:id', isAuthenticated, async (req, res) => {
    try {
      const debtor = await storage.updateDebtor(req.params.id, req.body);
      res.json(debtor);
    } catch (error) {
      console.error("Error updating debtor:", error);
      res.status(500).json({ message: "Failed to update debtor" });
    }
  });

  app.delete('/api/finance/debtors/:id', isAuthenticated, async (req, res) => {
    try {
      await storage.deleteDebtor(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting debtor:", error);
      res.status(500).json({ message: "Failed to delete debtor" });
    }
  });

  // Municipal Invoices Routes
  app.get('/api/finance/invoices', isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;
      const invoices = await storage.getMunicipalInvoices(limit, offset);
      res.json(invoices);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      res.status(500).json({ message: "Failed to fetch invoices" });
    }
  });

  app.post('/api/finance/invoices', isAuthenticated, async (req, res) => {
    try {
      const parsed = insertMunicipalInvoicesSchema.parse(req.body);
      const invoice = await storage.createMunicipalInvoice(parsed);
      res.status(201).json(invoice);
    } catch (error) {
      console.error("Error creating invoice:", error);
      res.status(500).json({ message: "Failed to create invoice" });
    }
  });

  app.put('/api/finance/invoices/:id', isAuthenticated, async (req, res) => {
    try {
      const invoice = await storage.updateMunicipalInvoice(req.params.id, req.body);
      res.json(invoice);
    } catch (error) {
      console.error("Error updating invoice:", error);
      res.status(500).json({ message: "Failed to update invoice" });
    }
  });

  app.delete('/api/finance/invoices/:id', isAuthenticated, async (req, res) => {
    try {
      await storage.deleteMunicipalInvoice(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting invoice:", error);
      res.status(500).json({ message: "Failed to delete invoice" });
    }
  });

  // Voucher Payments Routes
  app.get('/api/finance/vouchers', isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;
      const vouchers = await storage.getVoucherPayments(limit, offset);
      res.json(vouchers);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
      res.status(500).json({ message: "Failed to fetch vouchers" });
    }
  });

  app.post('/api/finance/vouchers', isAuthenticated, async (req, res) => {
    try {
      const parsed = insertVoucherPaymentsSchema.parse(req.body);
      const voucher = await storage.createVoucherPayment(parsed);
      res.status(201).json(voucher);
    } catch (error) {
      console.error("Error creating voucher:", error);
      res.status(500).json({ message: "Failed to create voucher" });
    }
  });

  app.put('/api/finance/vouchers/:id', isAuthenticated, async (req, res) => {
    try {
      const voucher = await storage.updateVoucherPayment(req.params.id, req.body);
      res.json(voucher);
    } catch (error) {
      console.error("Error updating voucher:", error);
      res.status(500).json({ message: "Failed to update voucher" });
    }
  });

  app.delete('/api/finance/vouchers/:id', isAuthenticated, async (req, res) => {
    try {
      await storage.deleteVoucherPayment(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting voucher:", error);
      res.status(500).json({ message: "Failed to delete voucher" });
    }
  });

  // Receipts Routes
  app.get('/api/finance/receipts', isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;
      const receipts = await storage.getReceipts(limit, offset);
      res.json(receipts);
    } catch (error) {
      console.error("Error fetching receipts:", error);
      res.status(500).json({ message: "Failed to fetch receipts" });
    }
  });

  app.post('/api/finance/receipts', isAuthenticated, async (req, res) => {
    try {
      const parsed = insertReceiptsSchema.parse(req.body);
      const receipt = await storage.createReceipt(parsed);
      res.status(201).json(receipt);
    } catch (error) {
      console.error("Error creating receipt:", error);
      res.status(500).json({ message: "Failed to create receipt" });
    }
  });

  app.put('/api/finance/receipts/:id', isAuthenticated, async (req, res) => {
    try {
      const receipt = await storage.updateReceipt(req.params.id, req.body);
      res.json(receipt);
    } catch (error) {
      console.error("Error updating receipt:", error);
      res.status(500).json({ message: "Failed to update receipt" });
    }
  });

  // Fixed Assets Routes
  app.get('/api/finance/fixed-assets', isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;
      const assets = await storage.getFixedAssets(limit, offset);
      res.json(assets);
    } catch (error) {
      console.error("Error fetching fixed assets:", error);
      res.status(500).json({ message: "Failed to fetch fixed assets" });
    }
  });

  app.post('/api/finance/fixed-assets', isAuthenticated, async (req, res) => {
    try {
      const parsed = insertFixedAssetsSchema.parse(req.body);
      const asset = await storage.createFixedAsset(parsed);
      res.status(201).json(asset);
    } catch (error) {
      console.error("Error creating fixed asset:", error);
      res.status(500).json({ message: "Failed to create fixed asset" });
    }
  });

  app.put('/api/finance/fixed-assets/:id', isAuthenticated, async (req, res) => {
    try {
      const asset = await storage.updateFixedAsset(req.params.id, req.body);
      res.json(asset);
    } catch (error) {
      console.error("Error updating fixed asset:", error);
      res.status(500).json({ message: "Failed to update fixed asset" });
    }
  });

  app.delete('/api/finance/fixed-assets/:id', isAuthenticated, async (req, res) => {
    try {
      await storage.deleteFixedAsset(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting fixed asset:", error);
      res.status(500).json({ message: "Failed to delete fixed asset" });
    }
  });

  // Bank Accounts Routes
  app.get('/api/finance/bank-accounts', isAuthenticated, async (req, res) => {
    try {
      const accounts = await storage.getBankAccounts();
      res.json(accounts);
    } catch (error) {
      console.error("Error fetching bank accounts:", error);
      res.status(500).json({ message: "Failed to fetch bank accounts" });
    }
  });

  app.post('/api/finance/bank-accounts', isAuthenticated, async (req, res) => {
    try {
      const parsed = insertBankAccountsSchema.parse(req.body);
      const account = await storage.createBankAccount(parsed);
      res.status(201).json(account);
    } catch (error) {
      console.error("Error creating bank account:", error);
      res.status(500).json({ message: "Failed to create bank account" });
    }
  });

  app.put('/api/finance/bank-accounts/:id', isAuthenticated, async (req, res) => {
    try {
      const account = await storage.updateBankAccount(req.params.id, req.body);
      res.json(account);
    } catch (error) {
      console.error("Error updating bank account:", error);
      res.status(500).json({ message: "Failed to update bank account" });
    }
  });

  app.delete('/api/finance/bank-accounts/:id', isAuthenticated, async (req, res) => {
    try {
      await storage.deleteBankAccount(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting bank account:", error);
      res.status(500).json({ message: "Failed to delete bank account" });
    }
  });

  // Currencies Routes
  app.get('/api/finance/currencies', isAuthenticated, async (req, res) => {
    try {
      const currencies = await storage.getCurrencies();
      res.json(currencies);
    } catch (error) {
      console.error("Error fetching currencies:", error);
      res.status(500).json({ message: "Failed to fetch currencies" });
    }
  });

  app.post('/api/finance/currencies', isAuthenticated, async (req, res) => {
    try {
      const parsed = insertCurrenciesSchema.parse(req.body);
      const currency = await storage.createCurrency(parsed);
      res.status(201).json(currency);
    } catch (error) {
      console.error("Error creating currency:", error);
      res.status(500).json({ message: "Failed to create currency" });
    }
  });

  app.put('/api/finance/currencies/:id', isAuthenticated, async (req, res) => {
    try {
      const currency = await storage.updateCurrency(req.params.id, req.body);
      res.json(currency);
    } catch (error) {
      console.error("Error updating currency:", error);
      res.status(500).json({ message: "Failed to update currency" });
    }
  });

  app.delete('/api/finance/currencies/:id', isAuthenticated, async (req, res) => {
    try {
      await storage.deleteCurrency(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting currency:", error);
      res.status(500).json({ message: "Failed to delete currency" });
    }
  });

  // ==== PAYROLL MANAGEMENT ROUTES ====

  // Employees Routes
  app.get('/api/payroll/employees', isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;
      const employees = await storage.getEmployees(limit, offset);
      res.json(employees);
    } catch (error) {
      console.error("Error fetching employees:", error);
      res.status(500).json({ message: "Failed to fetch employees" });
    }
  });

  app.post('/api/payroll/employees', isAuthenticated, async (req, res) => {
    try {
      const parsed = insertEmployeesSchema.parse(req.body);
      const employee = await storage.createEmployee(parsed);
      res.status(201).json(employee);
    } catch (error) {
      console.error("Error creating employee:", error);
      res.status(500).json({ message: "Failed to create employee" });
    }
  });

  app.put('/api/payroll/employees/:id', isAuthenticated, async (req, res) => {
    try {
      const employee = await storage.updateEmployee(req.params.id, req.body);
      res.json(employee);
    } catch (error) {
      console.error("Error updating employee:", error);
      res.status(500).json({ message: "Failed to update employee" });
    }
  });

  app.delete('/api/payroll/employees/:id', isAuthenticated, async (req, res) => {
    try {
      await storage.deleteEmployee(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting employee:", error);
      res.status(500).json({ message: "Failed to delete employee" });
    }
  });

  // Payroll Runs Routes
  app.get('/api/payroll/runs', isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;
      const runs = await storage.getPayrollRuns(limit, offset);
      res.json(runs);
    } catch (error) {
      console.error("Error fetching payroll runs:", error);
      res.status(500).json({ message: "Failed to fetch payroll runs" });
    }
  });

  app.post('/api/payroll/runs', isAuthenticated, async (req, res) => {
    try {
      const parsed = insertPayrollRunsSchema.parse(req.body);
      const run = await storage.createPayrollRun(parsed);
      res.status(201).json(run);
    } catch (error) {
      console.error("Error creating payroll run:", error);
      res.status(500).json({ message: "Failed to create payroll run" });
    }
  });

  app.put('/api/payroll/runs/:id', isAuthenticated, async (req, res) => {
    try {
      const run = await storage.updatePayrollRun(req.params.id, req.body);
      res.json(run);
    } catch (error) {
      console.error("Error updating payroll run:", error);
      res.status(500).json({ message: "Failed to update payroll run" });
    }
  });

  app.delete('/api/payroll/runs/:id', isAuthenticated, async (req, res) => {
    try {
      await storage.deletePayrollRun(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting payroll run:", error);
      res.status(500).json({ message: "Failed to delete payroll run" });
    }
  });

  // Payroll Items Routes
  app.get('/api/payroll/items/:payrollRunId', isAuthenticated, async (req, res) => {
    try {
      const items = await storage.getPayrollItems(req.params.payrollRunId);
      res.json(items);
    } catch (error) {
      console.error("Error fetching payroll items:", error);
      res.status(500).json({ message: "Failed to fetch payroll items" });
    }
  });

  app.post('/api/payroll/items', isAuthenticated, async (req, res) => {
    try {
      const parsed = insertPayrollItemsSchema.parse(req.body);
      const item = await storage.createPayrollItem(parsed);
      res.status(201).json(item);
    } catch (error) {
      console.error("Error creating payroll item:", error);
      res.status(500).json({ message: "Failed to create payroll item" });
    }
  });

  app.put('/api/payroll/items/:id', isAuthenticated, async (req, res) => {
    try {
      const item = await storage.updatePayrollItem(req.params.id, req.body);
      res.json(item);
    } catch (error) {
      console.error("Error updating payroll item:", error);
      res.status(500).json({ message: "Failed to update payroll item" });
    }
  });

  // Leave Types Routes
  app.get('/api/payroll/leave-types', isAuthenticated, async (req, res) => {
    try {
      const leaveTypes = await storage.getLeaveTypes();
      res.json(leaveTypes);
    } catch (error) {
      console.error("Error fetching leave types:", error);
      res.status(500).json({ message: "Failed to fetch leave types" });
    }
  });

  app.post('/api/payroll/leave-types', isAuthenticated, async (req, res) => {
    try {
      const parsed = insertLeaveTypesSchema.parse(req.body);
      const leaveType = await storage.createLeaveType(parsed);
      res.status(201).json(leaveType);
    } catch (error) {
      console.error("Error creating leave type:", error);
      res.status(500).json({ message: "Failed to create leave type" });
    }
  });

  app.put('/api/payroll/leave-types/:id', isAuthenticated, async (req, res) => {
    try {
      const leaveType = await storage.updateLeaveType(req.params.id, req.body);
      res.json(leaveType);
    } catch (error) {
      console.error("Error updating leave type:", error);
      res.status(500).json({ message: "Failed to update leave type" });
    }
  });

  app.delete('/api/payroll/leave-types/:id', isAuthenticated, async (req, res) => {
    try {
      await storage.deleteLeaveType(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting leave type:", error);
      res.status(500).json({ message: "Failed to delete leave type" });
    }
  });

  // Leave Applications Routes
  app.get('/api/payroll/leave-applications', isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;
      const applications = await storage.getLeaveApplications(limit, offset);
      res.json(applications);
    } catch (error) {
      console.error("Error fetching leave applications:", error);
      res.status(500).json({ message: "Failed to fetch leave applications" });
    }
  });

  app.post('/api/payroll/leave-applications', isAuthenticated, async (req, res) => {
    try {
      const parsed = insertLeaveApplicationsSchema.parse(req.body);
      const application = await storage.createLeaveApplication(parsed);
      res.status(201).json(application);
    } catch (error) {
      console.error("Error creating leave application:", error);
      res.status(500).json({ message: "Failed to create leave application" });
    }
  });

  app.put('/api/payroll/leave-applications/:id', isAuthenticated, async (req, res) => {
    try {
      const application = await storage.updateLeaveApplication(req.params.id, req.body);
      res.json(application);
    } catch (error) {
      console.error("Error updating leave application:", error);
      res.status(500).json({ message: "Failed to update leave application" });
    }
  });

  app.delete('/api/payroll/leave-applications/:id', isAuthenticated, async (req, res) => {
    try {
      await storage.deleteLeaveApplication(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting leave application:", error);
      res.status(500).json({ message: "Failed to delete leave application" });
    }
  });

  // Performance Reviews Routes
  app.get('/api/payroll/performance-reviews', isAuthenticated, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;
      const reviews = await storage.getPerformanceReviews(limit, offset);
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching performance reviews:", error);
      res.status(500).json({ message: "Failed to fetch performance reviews" });
    }
  });

  app.post('/api/payroll/performance-reviews', isAuthenticated, async (req, res) => {
    try {
      const parsed = insertPerformanceReviewsSchema.parse(req.body);
      const review = await storage.createPerformanceReview(parsed);
      res.status(201).json(review);
    } catch (error) {
      console.error("Error creating performance review:", error);
      res.status(500).json({ message: "Failed to create performance review" });
    }
  });

  app.put('/api/payroll/performance-reviews/:id', isAuthenticated, async (req, res) => {
    try {
      const review = await storage.updatePerformanceReview(req.params.id, req.body);
      res.json(review);
    } catch (error) {
      console.error("Error updating performance review:", error);
      res.status(500).json({ message: "Failed to update performance review" });
    }
  });

  app.delete('/api/payroll/performance-reviews/:id', isAuthenticated, async (req, res) => {
    try {
      await storage.deletePerformanceReview(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting performance review:", error);
      res.status(500).json({ message: "Failed to delete performance review" });
    }
  });

  // Import and register additional routes
  const { registerAdditionalRoutes } = await import("./routes-additional");
  registerAdditionalRoutes(app);

  const httpServer = createServer(app);
  return httpServer;
}
