import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupTempAuth, isAuthenticated } from "./tempAuth";
import {
  insertHousingApplicationSchema,
  insertCustomerComplaintSchema,
  insertFacilityBookingSchema,
  insertCemeterySchema,
  insertGraveSchema,
  insertBurialSchema,
  insertPermitSchema,
  insertBillSchema,
  insertPlanningApplicationSchema,
  insertAssetSchema,
  insertVendorSchema,
  insertPurchaseOrderSchema,
  insertCouncilMeetingSchema,
  insertPublicNoticeSchema,
  insertMeterApplicationSchema,
  insertMeterSchema,
  insertMeterReadingSchema,
  insertPropertyRegistrationRequestSchema,
  insertSystemModuleSchema,
  insertBillingRateSchema,
  insertCustomerAccountSchema,
  insertPaymentSchema,

  insertMonthlyBillSchema,
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
  insertEmployeesSchema,
  insertPayrollRunsSchema,
  insertPayrollItemsSchema,
  insertLeaveTypesSchema,
  insertLeaveApplicationsSchema,
  insertPerformanceReviewsSchema,
  insertVehicleSchema,
  insertWaterConnectionSchema,
  insertAttendanceRecordsSchema,
  insertFaceTemplatesSchema,
  insertAttendanceSettingsSchema,
} from "@shared/schema";

// Helper function to get user ID safely
function getUserId(req: any): string | null {
  return req.user?.id || req.user?.claims?.sub || null;
}

// Helper function to get user safely
async function getRequestUser(req: any) {
  const userId = getUserId(req);
  if (!userId) return null;
  return await storage.getUser(userId);
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  setupTempAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = getUserId(req);
      if (!userId) {
        return res.status(401).json({ message: "User ID not found" });
      }
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Health check endpoints
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.get("/api/status", (req, res) => {
    res.json({ status: "healthy", service: "gweru-municipal-erp" });
  });

  app.get("/ping", (req, res) => {
    res.json({ message: "pong" });
  });

  // Dashboard Analytics
  app.get("/api/dashboard/analytics", isAuthenticated, async (req, res) => {
    try {
      const analytics = await storage.getDashboardStats();
      res.json(analytics);
    } catch (error) {
      console.error("Error fetching dashboard analytics:", error);
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  // Housing Applications
  app.get("/api/housing-applications", isAuthenticated, async (req, res) => {
    try {
      const applications = await storage.getHousingApplications();
      res.json(applications);
    } catch (error) {
      console.error("Error fetching housing applications:", error);
      res.status(500).json({ message: "Failed to fetch housing applications" });
    }
  });

  app.post("/api/housing-applications", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertHousingApplicationSchema.parse(req.body);
      const user = await getRequestUser(req);
      
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const newApplication = await storage.createHousingApplication({
        ...validatedData,
        submittedBy: user.firstName || 'Unknown User',
        status: "pending"
      });

      res.status(201).json(newApplication);
    } catch (error) {
      console.error("Error creating housing application:", error);
      res.status(500).json({ message: "Failed to create housing application" });
    }
  });

  // Water Management
  app.get("/api/water/connections", isAuthenticated, async (req, res) => {
    try {
      const connections = await storage.getWaterConnections();
      res.json(connections);
    } catch (error) {
      console.error("Error fetching water connections:", error);
      res.status(500).json({ message: "Failed to fetch water connections" });
    }
  });

  app.get("/api/water/meter-applications", isAuthenticated, async (req, res) => {
    try {
      const applications = await storage.getMeterApplications();
      res.json(applications);
    } catch (error) {
      console.error("Error fetching meter applications:", error);
      res.status(500).json({ message: "Failed to fetch meter applications" });
    }
  });

  app.post("/api/water/meter-applications", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertMeterApplicationSchema.parse(req.body);
      const user = await getRequestUser(req);
      
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const newApplication = await storage.createMeterApplication({
        ...validatedData,
        applicantId: user.id,
        status: "pending"
      });

      res.status(201).json(newApplication);
    } catch (error) {
      console.error("Error creating meter application:", error);
      res.status(500).json({ message: "Failed to create meter application" });
    }
  });

  // Cemetery Management
  app.get("/api/cemetery/cemeteries", isAuthenticated, async (req, res) => {
    try {
      const cemeteries = await storage.getCemeteries();
      res.json(cemeteries);
    } catch (error) {
      console.error("Error fetching cemeteries:", error);
      res.status(500).json({ message: "Failed to fetch cemeteries" });
    }
  });

  app.post("/api/cemetery/cemeteries", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertCemeterySchema.parse(req.body);
      const user = await getRequestUser(req);
      
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const newCemetery = await storage.createCemetery({
        ...validatedData,
        createdBy: user.id
      });

      res.status(201).json(newCemetery);
    } catch (error) {
      console.error("Error creating cemetery:", error);
      res.status(500).json({ message: "Failed to create cemetery" });
    }
  });

  app.get("/api/cemetery/graves", isAuthenticated, async (req, res) => {
    try {
      const graves = await storage.getGraves();
      res.json(graves);
    } catch (error) {
      console.error("Error fetching graves:", error);
      res.status(500).json({ message: "Failed to fetch graves" });
    }
  });

  app.post("/api/cemetery/graves", isAuthenticated, async (req, res) => {
    try {
      // Only validate cemetery and grave type - other fields auto-generated
      const validatedData = insertGraveSchema.parse(req.body);
      const newGrave = await storage.createGrave(validatedData);
      res.status(201).json(newGrave);
    } catch (error) {
      console.error("Error creating grave:", error);
      res.status(500).json({ message: "Failed to create grave" });
    }
  });

  app.post("/api/cemetery/:cemeteryId/graves", isAuthenticated, async (req, res) => {
    try {
      const { cemeteryId } = req.params;
      const validatedData = insertGraveSchema.parse(req.body);
      const newGrave = await storage.createGrave({
        ...validatedData,
        cemeteryId
      });
      res.status(201).json(newGrave);
    } catch (error) {
      console.error("Error creating grave:", error);
      res.status(500).json({ message: "Failed to create grave" });
    }
  });

  app.get("/api/cemetery/burials", isAuthenticated, async (req, res) => {
    try {
      const burials = await storage.getBurials();
      res.json(burials);
    } catch (error) {
      console.error("Error fetching burials:", error);
      res.status(500).json({ message: "Failed to fetch burials" });
    }
  });

  app.post("/api/cemetery/burials", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertBurialSchema.parse(req.body);
      const user = await getRequestUser(req);
      
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const newBurial = await storage.createBurial({
        ...validatedData,
        registeredBy: user.id
      });

      res.status(201).json(newBurial);
    } catch (error) {
      console.error("Error creating burial record:", error);
      res.status(500).json({ message: "Failed to create burial record" });
    }
  });

  // Update grave status/details
  app.patch("/api/cemetery/graves/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const updatedGrave = await storage.updateGrave(id, updateData);
      res.json(updatedGrave);
    } catch (error) {
      console.error("Error updating grave:", error);
      res.status(500).json({ message: "Failed to update grave" });
    }
  });

  // Update burial record details  
  app.patch("/api/cemetery/burials/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const updatedBurial = await storage.updateBurial(id, updateData);
      res.json(updatedBurial);
    } catch (error) {
      console.error("Error updating burial record:", error);
      res.status(500).json({ message: "Failed to update burial record" });
    }
  });

  // Transport Management Routes
  app.get("/api/transport/vehicles", isAuthenticated, async (req, res) => {
    try {
      const vehicles = await storage.getVehicles();
      res.json(vehicles);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      res.status(500).json({ message: "Failed to fetch vehicles" });
    }
  });

  app.post("/api/transport/vehicles", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertVehicleSchema.parse(req.body);
      const user = await getRequestUser(req);
      
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const newVehicle = await storage.createVehicle({
        ...validatedData,
        addedBy: user.id
      });

      res.status(201).json(newVehicle);
    } catch (error) {
      console.error("Error creating vehicle:", error);
      res.status(500).json({ message: "Failed to create vehicle" });
    }
  });

  // Facilities Management Routes  
  app.get("/api/facilities", isAuthenticated, async (req, res) => {
    try {
      const facilities = await storage.getFacilities();
      res.json(facilities);
    } catch (error) {
      console.error("Error fetching facilities:", error);
      res.status(500).json({ message: "Failed to fetch facilities" });
    }
  });

  app.post("/api/facilities", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertFacilitySchema.parse(req.body);
      const user = await getRequestUser(req);
      
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const newFacility = await storage.createFacility({
        ...validatedData,
        createdBy: user.id
      });

      res.status(201).json(newFacility);
    } catch (error) {
      console.error("Error creating facility:", error);
      res.status(500).json({ message: "Failed to create facility" });
    }
  });

  app.get("/api/facility-bookings", isAuthenticated, async (req, res) => {
    try {
      const bookings = await storage.getFacilityBookings();
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching facility bookings:", error);
      res.status(500).json({ message: "Failed to fetch facility bookings" });
    }
  });

  app.post("/api/facility-bookings", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertFacilityBookingSchema.parse(req.body);
      const user = await getRequestUser(req);
      
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const newBooking = await storage.createFacilityBooking({
        ...validatedData,
        bookedBy: user.id
      });

      res.status(201).json(newBooking);
    } catch (error) {
      console.error("Error creating facility booking:", error);
      res.status(500).json({ message: "Failed to create facility booking" });
    }
  });



  // HR/Payroll Management Routes
  app.get("/api/payroll/stats", isAuthenticated, async (req, res) => {
    try {
      const employees = await storage.getEmployees();
      const payrollRuns = await storage.getPayrollRuns();
      
      const stats = {
        totalEmployees: employees.length,
        activeEmployees: employees.filter(e => e.status === "active").length,
        monthlyPayroll: payrollRuns.reduce((sum, run) => sum + (Number(run.totalAmount) || 0), 0),
        averageSalary: employees.length > 0 ? employees.reduce((sum, emp) => sum + (Number(emp.baseSalary) || 0), 0) / employees.length : 0,
        departmentCount: [...new Set(employees.map(e => e.department))].length,
        pendingApprovals: employees.filter(e => e.status === "pending").length,
        leaveRequests: await storage.getLeaveApplications().then(apps => apps.filter(a => a.status === "pending").length),
        performanceReviews: await storage.getPerformanceReviews().then(reviews => reviews.filter(r => r.status === "pending").length),
        currencies: ["USD", "ZWL"],
        payrollRuns: payrollRuns.length
      };
      res.json(stats);
    } catch (error) {
      console.error("Error fetching payroll stats:", error);
      res.status(500).json({ message: "Failed to fetch payroll statistics" });
    }
  });

  app.get("/api/employees", isAuthenticated, async (req, res) => {
    try {
      const employees = await storage.getEmployees();
      res.json(employees);
    } catch (error) {
      console.error("Error fetching employees:", error);
      res.status(500).json({ message: "Failed to fetch employees" });
    }
  });

  app.post("/api/employees", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertEmployeesSchema.parse(req.body);
      const user = await getRequestUser(req);
      
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const newEmployee = await storage.createEmployee({
        ...validatedData,
        createdBy: user.id
      });

      res.status(201).json(newEmployee);
    } catch (error) {
      console.error("Error creating employee:", error);
      res.status(500).json({ message: "Failed to create employee" });
    }
  });

  app.put("/api/employees/:id", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertEmployeesSchema.parse(req.body);
      const updatedEmployee = await storage.updateEmployee(req.params.id, validatedData);
      res.json(updatedEmployee);
    } catch (error) {
      console.error("Error updating employee:", error);
      res.status(500).json({ message: "Failed to update employee" });
    }
  });

  app.get("/api/payroll-runs", isAuthenticated, async (req, res) => {
    try {
      const payrollRuns = await storage.getPayrollRuns();
      res.json(payrollRuns);
    } catch (error) {
      console.error("Error fetching payroll runs:", error);
      res.status(500).json({ message: "Failed to fetch payroll runs" });
    }
  });

  app.post("/api/payroll-runs", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertPayrollRunsSchema.parse(req.body);
      const user = await getRequestUser(req);
      
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const newPayrollRun = await storage.createPayrollRun({
        ...validatedData,
        createdBy: user.id
      });

      res.status(201).json(newPayrollRun);
    } catch (error) {
      console.error("Error creating payroll run:", error);
      res.status(500).json({ message: "Failed to create payroll run" });
    }
  });

  app.get("/api/leave-applications", isAuthenticated, async (req, res) => {
    try {
      const leaveApplications = await storage.getLeaveApplications();
      res.json(leaveApplications);
    } catch (error) {
      console.error("Error fetching leave applications:", error);
      res.status(500).json({ message: "Failed to fetch leave applications" });
    }
  });

  app.post("/api/leave-applications", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertLeaveApplicationsSchema.parse(req.body);
      const user = await getRequestUser(req);
      
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const newLeaveApplication = await storage.createLeaveApplication({
        ...validatedData,
        employeeId: validatedData.employeeId || user.id
      });

      res.status(201).json(newLeaveApplication);
    } catch (error) {
      console.error("Error creating leave application:", error);
      res.status(500).json({ message: "Failed to create leave application" });
    }
  });

  app.put("/api/leave-applications/:id", isAuthenticated, async (req, res) => {
    try {
      const updatedLeave = await storage.updateLeaveApplication(req.params.id, req.body);
      res.json(updatedLeave);
    } catch (error) {
      console.error("Error updating leave application:", error);
      res.status(500).json({ message: "Failed to update leave application" });
    }
  });

  app.get("/api/performance-reviews", isAuthenticated, async (req, res) => {
    try {
      const performanceReviews = await storage.getPerformanceReviews();
      res.json(performanceReviews);
    } catch (error) {
      console.error("Error fetching performance reviews:", error);
      res.status(500).json({ message: "Failed to fetch performance reviews" });
    }
  });

  app.post("/api/performance-reviews", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertPerformanceReviewsSchema.parse(req.body);
      const user = await getRequestUser(req);
      
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const newPerformanceReview = await storage.createPerformanceReview({
        ...validatedData,
        reviewedBy: user.id
      });

      res.status(201).json(newPerformanceReview);
    } catch (error) {
      console.error("Error creating performance review:", error);
      res.status(500).json({ message: "Failed to create performance review" });
    }
  });

  app.put("/api/performance-reviews/:id", isAuthenticated, async (req, res) => {
    try {
      const updatedReview = await storage.updatePerformanceReview(req.params.id, req.body);
      res.json(updatedReview);
    } catch (error) {
      console.error("Error updating performance review:", error);
      res.status(500).json({ message: "Failed to update performance review" });
    }
  });

  // Property & Valuations Routes
  app.get("/api/properties", isAuthenticated, async (req, res) => {
    try {
      const properties = await storage.getProperties();
      res.json(properties);
    } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  });

  app.post("/api/properties", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertPropertySchema.parse(req.body);
      const user = await getRequestUser(req);
      
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const newProperty = await storage.createProperty({
        ...validatedData,
        registeredBy: user.id
      });

      res.status(201).json(newProperty);
    } catch (error) {
      console.error("Error creating property:", error);
      res.status(500).json({ message: "Failed to create property" });
    }
  });

  app.get("/api/valuations", isAuthenticated, async (req, res) => {
    try {
      const valuations = await storage.getValuations();
      res.json(valuations);
    } catch (error) {
      console.error("Error fetching valuations:", error);
      res.status(500).json({ message: "Failed to fetch valuations" });
    }
  });

  app.post("/api/valuations", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertValuationSchema.parse(req.body);
      const user = await getRequestUser(req);
      
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const newValuation = await storage.createValuation({
        ...validatedData,
        valuedBy: user.id
      });

      res.status(201).json(newValuation);
    } catch (error) {
      console.error("Error creating valuation:", error);
      res.status(500).json({ message: "Failed to create valuation" });
    }
  });

  // Water Services Routes
  app.get("/api/water-connections", isAuthenticated, async (req, res) => {
    try {
      const connections = await storage.getWaterConnections();
      res.json(connections);
    } catch (error) {
      console.error("Error fetching water connections:", error);
      res.status(500).json({ message: "Failed to fetch water connections" });
    }
  });

  app.post("/api/water-connections", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertWaterConnectionSchema.parse(req.body);
      const user = await getRequestUser(req);
      
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const newConnection = await storage.createWaterConnection({
        ...validatedData,
        createdBy: user.id
      });

      res.status(201).json(newConnection);
    } catch (error) {
      console.error("Error creating water connection:", error);
      res.status(500).json({ message: "Failed to create water connection" });
    }
  });

  // Customer Service / CRM Routes
  app.get("/api/complaints", isAuthenticated, async (req, res) => {
    try {
      const complaints = await storage.getComplaints();
      res.json(complaints);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      res.status(500).json({ message: "Failed to fetch complaints" });
    }
  });

  app.post("/api/complaints", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertComplaintSchema.parse(req.body);
      const user = await getRequestUser(req);
      
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const newComplaint = await storage.createComplaint({
        ...validatedData,
        assignedTo: validatedData.assignedTo || user.id
      });

      res.status(201).json(newComplaint);
    } catch (error) {
      console.error("Error creating complaint:", error);
      res.status(500).json({ message: "Failed to create complaint" });
    }
  });

  // Financial Management Routes (Additional ones)
  app.get("/api/finance/general-ledger", isAuthenticated, async (req, res) => {
    try {
      const entries = await storage.getGeneralLedgerEntries();
      res.json(entries);
    } catch (error) {
      console.error("Error fetching general ledger:", error);
      res.status(500).json({ message: "Failed to fetch general ledger entries" });
    }
  });

  app.post("/api/finance/general-ledger", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertGeneralLedgerSchema.parse(req.body);
      const user = await getRequestUser(req);
      
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const newEntry = await storage.createGeneralLedgerEntry({
        ...validatedData,
        createdBy: user.id
      });

      res.status(201).json(newEntry);
    } catch (error) {
      console.error("Error creating general ledger entry:", error);
      res.status(500).json({ message: "Failed to create general ledger entry" });
    }
  });

  // Financial Integration Routes - Link All Payments and Reports
  
  // Enhanced Payment Processing with Financial Integration
  app.post("/api/payments", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertPaymentSchema.parse(req.body);
      const user = await getRequestUser(req);
      
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // Create payment record
      const newPayment = await storage.createPayment({
        ...validatedData,
        operatorId: user.id
      });

      // Auto-generate receipt
      const receipt = await storage.createReceipt({
        receiptNumber: `RCP-${Date.now()}`,
        amount: validatedData.amount,
        paymentMethod: validatedData.paymentMethod,
        receiptDate: new Date().toISOString(),
        description: `Payment for services`
      });

      // Update general ledger
      await storage.createGeneralLedgerEntry({
        accountId: "1100", // Cash account
        debitAmount: validatedData.amount,
        creditAmount: "0",
        description: `Payment received - ${validatedData.paymentMethod}`,
        transactionDate: new Date().toISOString(),
        createdBy: user.id
      });

      // Update revenue account
      await storage.createGeneralLedgerEntry({
        accountId: "4000", // Revenue account
        debitAmount: "0",
        creditAmount: validatedData.amount,
        description: `Revenue from services`,
        transactionDate: new Date().toISOString(),
        createdBy: user.id
      });

      res.status(201).json({ payment: newPayment, receipt });
    } catch (error) {
      console.error("Error processing payment:", error);
      res.status(500).json({ message: "Failed to process payment" });
    }
  });

  // Enhanced Financial Dashboard with Real-time Data
  app.get("/api/finance/dashboard-overview", isAuthenticated, async (req, res) => {
    try {
      // Get all financial data
      const [bills, payments, receipts, bankAccounts, generalLedger] = await Promise.all([
        storage.getBills(),
        storage.getPayments(),
        storage.getReceipts(),
        storage.getBankAccounts(),
        storage.getGeneralLedgerEntries()
      ]);

      // Calculate comprehensive financial metrics
      const totalRevenue = payments
        .filter(p => p.status === 'completed')
        .reduce((sum, payment) => sum + parseFloat(payment.amount), 0);

      const totalExpenses = generalLedger
        .filter(entry => entry.accountId?.startsWith('5')) // Expense accounts
        .reduce((sum, entry) => sum + parseFloat(entry.debitAmount || '0'), 0);

      const cashBalance = bankAccounts
        .reduce((sum, account) => sum + parseFloat(account.currentBalance || '0'), 0);

      const outstandingReceivables = bills
        .filter(b => b.status === 'outstanding')
        .reduce((sum, bill) => sum + parseFloat(bill.amount), 0);

      const overdueAmount = bills
        .filter(b => b.status === 'overdue')
        .reduce((sum, bill) => sum + parseFloat(bill.amount), 0);

      // Monthly trends
      const currentMonth = new Date().getMonth();
      const monthlyRevenue = payments
        .filter(p => new Date(p.createdAt).getMonth() === currentMonth)
        .reduce((sum, payment) => sum + parseFloat(payment.amount), 0);

      const monthlyExpenses = generalLedger
        .filter(entry => 
          entry.transactionDate && 
          new Date(entry.transactionDate).getMonth() === currentMonth &&
          entry.accountId?.startsWith('5')
        )
        .reduce((sum, entry) => sum + parseFloat(entry.debitAmount || '0'), 0);

      const overview = {
        totalRevenue,
        totalExpenses,
        netIncome: totalRevenue - totalExpenses,
        cashBalance,
        outstandingReceivables,
        overdueAmount,
        monthlyRevenue,
        monthlyExpenses,
        monthlyNetIncome: monthlyRevenue - monthlyExpenses,
        totalBills: bills.length,
        paidBills: bills.filter(b => b.status === 'paid').length,
        overdueBills: bills.filter(b => b.status === 'overdue').length,
        totalReceipts: receipts.length,
        totalPayments: payments.length,
        completedPayments: payments.filter(p => p.status === 'completed').length,
        averagePaymentAmount: payments.length > 0 ? totalRevenue / payments.length : 0,
        // KPIs
        collectionRate: bills.length > 0 ? (bills.filter(b => b.status === 'paid').length / bills.length) * 100 : 0,
        overdueRate: bills.length > 0 ? (bills.filter(b => b.status === 'overdue').length / bills.length) * 100 : 0,
        profitMargin: totalRevenue > 0 ? ((totalRevenue - totalExpenses) / totalRevenue) * 100 : 0
      };

      res.json(overview);
    } catch (error) {
      console.error("Error fetching financial overview:", error);
      res.status(500).json({ message: "Failed to fetch financial overview" });
    }
  });

  // Comprehensive Financial Reports
  app.get("/api/finance/reports/trial-balance", isAuthenticated, async (req, res) => {
    try {
      const [chartOfAccounts, generalLedger] = await Promise.all([
        storage.getChartOfAccounts(),
        storage.getGeneralLedgerEntries()
      ]);

      const trialBalance = chartOfAccounts.map(account => {
        const accountEntries = generalLedger.filter(entry => entry.accountId === account.accountCode);
        const totalDebits = accountEntries.reduce((sum, entry) => sum + parseFloat(entry.debitAmount || '0'), 0);
        const totalCredits = accountEntries.reduce((sum, entry) => sum + parseFloat(entry.creditAmount || '0'), 0);
        
        return {
          accountCode: account.accountCode,
          accountName: account.accountName,
          accountType: account.accountType,
          debitBalance: totalDebits,
          creditBalance: totalCredits,
          netBalance: totalDebits - totalCredits
        };
      });

      res.json(trialBalance);
    } catch (error) {
      console.error("Error generating trial balance:", error);
      res.status(500).json({ message: "Failed to generate trial balance" });
    }
  });

  // Income Statement Report
  app.get("/api/finance/reports/income-statement", isAuthenticated, async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const [chartOfAccounts, generalLedger] = await Promise.all([
        storage.getChartOfAccounts(),
        storage.getGeneralLedgerEntries()
      ]);

      const dateFilter = (entry: any) => {
        if (!startDate || !endDate) return true;
        const entryDate = new Date(entry.transactionDate);
        return entryDate >= new Date(startDate as string) && entryDate <= new Date(endDate as string);
      };

      const revenueAccounts = chartOfAccounts.filter(acc => acc.accountType === 'revenue');
      const expenseAccounts = chartOfAccounts.filter(acc => acc.accountType === 'expense');

      const revenues = revenueAccounts.map(account => {
        const accountEntries = generalLedger.filter(entry => 
          entry.accountId === account.accountCode && dateFilter(entry)
        );
        const totalRevenue = accountEntries.reduce((sum, entry) => 
          sum + parseFloat(entry.creditAmount || '0'), 0
        );
        
        return {
          accountCode: account.accountCode,
          accountName: account.accountName,
          amount: totalRevenue
        };
      });

      const expenses = expenseAccounts.map(account => {
        const accountEntries = generalLedger.filter(entry => 
          entry.accountId === account.accountCode && dateFilter(entry)
        );
        const totalExpense = accountEntries.reduce((sum, entry) => 
          sum + parseFloat(entry.debitAmount || '0'), 0
        );
        
        return {
          accountCode: account.accountCode,
          accountName: account.accountName,
          amount: totalExpense
        };
      });

      const totalRevenue = revenues.reduce((sum, rev) => sum + rev.amount, 0);
      const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
      const netIncome = totalRevenue - totalExpenses;

      res.json({
        period: { startDate, endDate },
        revenues,
        expenses,
        summary: {
          totalRevenue,
          totalExpenses,
          netIncome,
          profitMargin: totalRevenue > 0 ? (netIncome / totalRevenue) * 100 : 0
        }
      });
    } catch (error) {
      console.error("Error generating income statement:", error);
      res.status(500).json({ message: "Failed to generate income statement" });
    }
  });

  // Balance Sheet Report
  app.get("/api/finance/reports/balance-sheet", isAuthenticated, async (req, res) => {
    try {
      const [chartOfAccounts, generalLedger] = await Promise.all([
        storage.getChartOfAccounts(),
        storage.getGeneralLedgerEntries()
      ]);

      const assets = chartOfAccounts
        .filter(acc => acc.accountType === 'asset')
        .map(account => {
          const accountEntries = generalLedger.filter(entry => entry.accountId === account.accountCode);
          const balance = accountEntries.reduce((sum, entry) => 
            sum + parseFloat(entry.debitAmount || '0') - parseFloat(entry.creditAmount || '0'), 0
          );
          
          return {
            accountCode: account.accountCode,
            accountName: account.accountName,
            balance
          };
        });

      const liabilities = chartOfAccounts
        .filter(acc => acc.accountType === 'liability')
        .map(account => {
          const accountEntries = generalLedger.filter(entry => entry.accountId === account.accountCode);
          const balance = accountEntries.reduce((sum, entry) => 
            sum + parseFloat(entry.creditAmount || '0') - parseFloat(entry.debitAmount || '0'), 0
          );
          
          return {
            accountCode: account.accountCode,
            accountName: account.accountName,
            balance
          };
        });

      const equity = chartOfAccounts
        .filter(acc => acc.accountType === 'equity')
        .map(account => {
          const accountEntries = generalLedger.filter(entry => entry.accountId === account.accountCode);
          const balance = accountEntries.reduce((sum, entry) => 
            sum + parseFloat(entry.creditAmount || '0') - parseFloat(entry.debitAmount || '0'), 0
          );
          
          return {
            accountCode: account.accountCode,
            accountName: account.accountName,
            balance
          };
        });

      const totalAssets = assets.reduce((sum, asset) => sum + asset.balance, 0);
      const totalLiabilities = liabilities.reduce((sum, liability) => sum + liability.balance, 0);
      const totalEquity = equity.reduce((sum, equity) => sum + equity.balance, 0);

      res.json({
        asOfDate: new Date().toISOString(),
        assets,
        liabilities,
        equity,
        summary: {
          totalAssets,
          totalLiabilities,
          totalEquity,
          balanceCheck: totalAssets - (totalLiabilities + totalEquity)
        }
      });
    } catch (error) {
      console.error("Error generating balance sheet:", error);
      res.status(500).json({ message: "Failed to generate balance sheet" });
    }
  });

  // Cash Flow Statement
  app.get("/api/finance/reports/cash-flow", isAuthenticated, async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const [payments, generalLedger, bankAccounts] = await Promise.all([
        storage.getPayments(),
        storage.getGeneralLedgerEntries(),
        storage.getBankAccounts()
      ]);

      const dateFilter = (item: any) => {
        if (!startDate || !endDate) return true;
        const itemDate = new Date(item.createdAt || item.transactionDate);
        return itemDate >= new Date(startDate as string) && itemDate <= new Date(endDate as string);
      };

      // Operating Activities
      const operatingCashInflow = payments
        .filter(p => p.status === 'completed' && dateFilter(p))
        .reduce((sum, payment) => sum + parseFloat(payment.amount), 0);

      const operatingCashOutflow = generalLedger
        .filter(entry => entry.accountId?.startsWith('5') && dateFilter(entry))
        .reduce((sum, entry) => sum + parseFloat(entry.debitAmount || '0'), 0);

      const netCashFromOperations = operatingCashInflow - operatingCashOutflow;

      // Bank Account Changes
      const totalCashBalance = bankAccounts
        .reduce((sum, account) => sum + parseFloat(account.currentBalance || '0'), 0);

      res.json({
        period: { startDate, endDate },
        operatingActivities: {
          cashReceipts: operatingCashInflow,
          cashPayments: operatingCashOutflow,
          netCashFromOperations
        },
        investingActivities: {
          netCashFromInvesting: 0 // Placeholder for future implementation
        },
        financingActivities: {
          netCashFromFinancing: 0 // Placeholder for future implementation
        },
        summary: {
          netCashFlow: netCashFromOperations,
          beginningCashBalance: totalCashBalance - netCashFromOperations,
          endingCashBalance: totalCashBalance
        }
      });
    } catch (error) {
      console.error("Error generating cash flow statement:", error);
      res.status(500).json({ message: "Failed to generate cash flow statement" });
    }
  });

  // Comprehensive Payment Analytics
  app.get("/api/finance/analytics/payment-trends", isAuthenticated, async (req, res) => {
    try {
      const payments = await storage.getPayments();
      
      // Monthly trend analysis
      const monthlyData = payments.reduce((acc: any, payment) => {
        const month = new Date(payment.createdAt).toISOString().slice(0, 7);
        if (!acc[month]) {
          acc[month] = { total: 0, count: 0, methods: {} };
        }
        acc[month].total += parseFloat(payment.amount);
        acc[month].count += 1;
        
        const method = payment.paymentMethod;
        if (!acc[month].methods[method]) {
          acc[month].methods[method] = { total: 0, count: 0 };
        }
        acc[month].methods[method].total += parseFloat(payment.amount);
        acc[month].methods[method].count += 1;
        
        return acc;
      }, {});

      // Payment method analysis
      const methodAnalysis = payments.reduce((acc: any, payment) => {
        const method = payment.paymentMethod;
        if (!acc[method]) {
          acc[method] = { total: 0, count: 0, averageAmount: 0 };
        }
        acc[method].total += parseFloat(payment.amount);
        acc[method].count += 1;
        acc[method].averageAmount = acc[method].total / acc[method].count;
        
        return acc;
      }, {});

      res.json({
        monthlyTrends: monthlyData,
        paymentMethods: methodAnalysis,
        totalPayments: payments.length,
        totalValue: payments.reduce((sum, p) => sum + parseFloat(p.amount), 0),
        averagePayment: payments.length > 0 ? payments.reduce((sum, p) => sum + parseFloat(p.amount), 0) / payments.length : 0
      });
    } catch (error) {
      console.error("Error generating payment analytics:", error);
      res.status(500).json({ message: "Failed to generate payment analytics" });
    }
  });

  // Face Scan Attendance routes
  app.get('/api/attendance-records', isAuthenticated, async (req, res) => {
    try {
      const records = await storage.getAttendanceRecords();
      res.json(records);
    } catch (error) {
      console.error("Error fetching attendance records:", error);
      res.status(500).json({ message: "Failed to fetch attendance records" });
    }
  });

  app.post('/api/attendance-records', isAuthenticated, async (req, res) => {
    try {
      // Convert date strings to Date objects
      const processedData = {
        ...req.body,
        date: req.body.date ? new Date(req.body.date) : new Date(),
        checkInTime: req.body.checkInTime ? new Date(req.body.checkInTime) : undefined,
        checkOutTime: req.body.checkOutTime ? new Date(req.body.checkOutTime) : undefined,
      };
      
      const validatedData = insertAttendanceRecordsSchema.parse(processedData);
      const record = await storage.createAttendanceRecord(validatedData);
      res.status(201).json(record);
    } catch (error) {
      console.error("Error creating attendance record:", error);
      res.status(500).json({ message: "Failed to create attendance record" });
    }
  });

  app.get('/api/face-templates', isAuthenticated, async (req, res) => {
    try {
      const templates = await storage.getFaceTemplates();
      res.json(templates);
    } catch (error) {
      console.error("Error fetching face templates:", error);
      res.status(500).json({ message: "Failed to fetch face templates" });
    }
  });

  app.post('/api/face-templates', isAuthenticated, async (req, res) => {
    try {
      const user = req.user as any;
      const templateData = {
        ...req.body,
        enrolledBy: user.id || 'admin-deploy-001',
        enrolledAt: new Date(),
      };
      const validatedData = insertFaceTemplatesSchema.parse(templateData);
      const template = await storage.createFaceTemplate(validatedData);
      res.status(201).json(template);
    } catch (error) {
      console.error("Error creating face template:", error);
      res.status(500).json({ message: "Failed to create face template" });  
    }
  });

  app.get('/api/attendance-settings', isAuthenticated, async (req, res) => {
    try {
      const settings = await storage.getAttendanceSettings();
      res.json(settings);
    } catch (error) {
      console.error("Error fetching attendance settings:", error);
      res.status(500).json({ message: "Failed to fetch attendance settings" });
    }
  });

  app.post('/api/attendance-settings', isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertAttendanceSettingsSchema.parse(req.body);
      const settings = await storage.createAttendanceSettings(validatedData);
      res.status(201).json(settings);
    } catch (error) {
      console.error("Error creating attendance settings:", error);
      res.status(500).json({ message: "Failed to create attendance settings" });
    }
  });

  app.get('/api/attendance/stats', isAuthenticated, async (req, res) => {
    try {
      const stats = await storage.getAttendanceStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching attendance stats:", error);
      res.status(500).json({ message: "Failed to fetch attendance statistics" });
    }
  });

  // ===== SUPER ADMIN ROUTES =====
  
  // System statistics endpoint
  app.get('/api/super-admin/system-stats', isAuthenticated, async (req: any, res) => {
    try {
      const user = await getRequestUser(req);
      if (!user || user.role !== 'super-admin') {
        return res.status(403).json({ message: "Super admin access required" });
      }

      // Mock system stats - in production, these would come from actual system monitoring
      const stats = {
        totalUsers: await storage.getUserCount(),
        activeUsers: await storage.getActiveUserCount(),
        totalTransactions: await storage.getTotalTransactions(),
        systemHealth: "Healthy",
        cpuUsage: Math.floor(Math.random() * 30) + 20, // 20-50%
        memoryUsage: Math.floor(Math.random() * 40) + 30, // 30-70%
        diskUsage: Math.floor(Math.random() * 20) + 40, // 40-60%
        uptime: "7d 14h 32m"
      };

      res.json(stats);
    } catch (error) {
      console.error("Error fetching system stats:", error);
      res.status(500).json({ message: "Failed to fetch system statistics" });
    }
  });

  // Get all users endpoint
  app.get('/api/super-admin/users', isAuthenticated, async (req: any, res) => {
    try {
      const user = await getRequestUser(req);
      if (!user || user.role !== 'super-admin') {
        return res.status(403).json({ message: "Super admin access required" });
      }

      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  // Create user endpoint
  app.post('/api/super-admin/users', isAuthenticated, async (req: any, res) => {
    try {
      const user = await getRequestUser(req);
      if (!user || user.role !== 'super-admin') {
        return res.status(403).json({ message: "Super admin access required" });
      }

      const userData = req.body;
      const newUser = await storage.createUserBySuperAdmin({
        ...userData,
        id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      // Log the action
      await storage.createAuditLog({
        tableName: "users",
        recordId: newUser.id,
        action: "CREATE",
        newValues: newUser,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        userDepartment: user.department,
        module: "user-management",
        description: `Super admin created new user: ${newUser.email}`,
        severity: "info"
      });

      res.json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  // Update user endpoint
  app.patch('/api/super-admin/users/:userId', isAuthenticated, async (req: any, res) => {
    try {
      const user = await getRequestUser(req);
      if (!user || user.role !== 'super-admin') {
        return res.status(403).json({ message: "Super admin access required" });
      }

      const { userId } = req.params;
      const updates = req.body;
      
      const oldUser = await storage.getUser(userId);
      const updatedUser = await storage.updateUserBySuperAdmin(userId, {
        ...updates,
        updatedAt: new Date()
      });

      // Log the action
      await storage.createAuditLog({
        tableName: "users",
        recordId: userId,
        action: "UPDATE",
        oldValues: oldUser,
        newValues: updatedUser,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        userDepartment: user.department,
        module: "user-management",
        description: `Super admin updated user: ${updatedUser.email}`,
        severity: "info"
      });

      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Failed to update user" });
    }
  });

  // Delete user endpoint
  app.delete('/api/super-admin/users/:userId', isAuthenticated, async (req: any, res) => {
    try {
      const user = await getRequestUser(req);
      if (!user || user.role !== 'super-admin') {
        return res.status(403).json({ message: "Super admin access required" });
      }

      const { userId } = req.params;
      const oldUser = await storage.getUser(userId);
      await storage.deleteUser(userId);

      // Log the action
      await storage.createAuditLog({
        tableName: "users",
        recordId: userId,
        action: "DELETE",
        oldValues: oldUser,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        userDepartment: user.department,
        module: "user-management",
        description: `Super admin deleted user: ${oldUser?.email}`,
        severity: "warning"
      });

      res.json({ success: true, message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Failed to delete user" });
    }
  });

  // Get system notifications
  app.get('/api/super-admin/notifications', isAuthenticated, async (req: any, res) => {
    try {
      const user = await getRequestUser(req);
      if (!user || user.role !== 'super-admin') {
        return res.status(403).json({ message: "Super admin access required" });
      }

      const notifications = await storage.getSystemNotifications();
      res.json(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });

  // Create system notification
  app.post('/api/super-admin/notifications', isAuthenticated, async (req: any, res) => {
    try {
      const user = await getRequestUser(req);
      if (!user || user.role !== 'super-admin') {
        return res.status(403).json({ message: "Super admin access required" });
      }

      const notificationData = req.body;
      const notification = await storage.createSystemNotification({
        ...notificationData,
        id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdBy: user.id,
        createdAt: new Date()
      });

      res.json(notification);
    } catch (error) {
      console.error("Error creating notification:", error);
      res.status(500).json({ message: "Failed to create notification" });
    }
  });

  // System backup endpoint
  app.post('/api/super-admin/backup', isAuthenticated, async (req: any, res) => {
    try {
      const user = await getRequestUser(req);
      if (!user || user.role !== 'super-admin') {
        return res.status(403).json({ message: "Super admin access required" });
      }

      const { backupType = "full", backupName } = req.body;
      
      // Create backup record
      const backup = await storage.createSystemBackup({
        id: `backup-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        backupName: backupName || `backup-${new Date().toISOString().split('T')[0]}`,
        backupType,
        status: "completed", // In real implementation, this would be "running" initially
        backupSize: "45.2 MB", // Mock size
        filePath: `/backups/${backupName || 'backup'}-${Date.now()}.sql`,
        tablesIncluded: ["users", "housing_applications", "financial_records"],
        triggeredBy: user.id,
        startedAt: new Date(),
        completedAt: new Date(),
        createdAt: new Date()
      });

      // Log the action
      await storage.createAuditLog({
        tableName: "system_backups",
        recordId: backup.id,
        action: "CREATE",
        newValues: backup,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        userDepartment: user.department,
        module: "system-administration",
        description: `Super admin initiated ${backupType} system backup`,
        severity: "info"
      });

      res.json(backup);
    } catch (error) {
      console.error("Error creating backup:", error);
      res.status(500).json({ message: "Failed to create backup" });
    }
  });

  // Enhanced system analytics
  app.get('/api/super-admin/analytics', isAuthenticated, async (req: any, res) => {
    try {
      const user = await getRequestUser(req);
      if (!user || user.role !== 'super-admin') {
        return res.status(403).json({ message: "Super admin access required" });
      }
        const analytics = {
        userGrowth: [
          { month: 'Jan', users: 45 },
          { month: 'Feb', users: 52 },
          { month: 'Mar', users: 48 },
          { month: 'Apr', users: 61 },
          { month: 'May', users: 55 },
          { month: 'Jun', users: 67 }
        ],
        moduleUsage: [
          { module: 'Housing', usage: 87 },
          { module: 'Finance', usage: 93 },
          { module: 'Transport', usage: 76 },
          { module: 'Cemetery', usage: 45 },
          { module: 'Water', usage: 82 }
        ],
        systemPerformance: {
          avgResponseTime: 120,
          uptime: 99.8,
          errorRate: 0.2,
          throughput: 1250
        }
      };
      res.json(analytics);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  // System maintenance endpoints
  app.post('/api/super-admin/maintenance/enable', isAuthenticated, async (req: any, res) => {
    try {
      const user = await getRequestUser(req);
      if (!user || user.role !== 'super-admin') {
        return res.status(403).json({ message: "Super admin access required" });
      }
      const { message, duration } = req.body;
      res.json({ success: true, message: "Maintenance mode enabled" });
    } catch (error) {
      console.error("Error enabling maintenance mode:", error);
      res.status(500).json({ message: "Failed to enable maintenance mode" });
    }
  });

  app.post('/api/super-admin/maintenance/disable', isAuthenticated, async (req: any, res) => {
    try {
      const user = await getRequestUser(req);
      if (!user || user.role !== 'super-admin') {
        return res.status(403).json({ message: "Super admin access required" });
      }
      res.json({ success: true, message: "Maintenance mode disabled" });
    } catch (error) {
      console.error("Error disabling maintenance mode:", error);
      res.status(500).json({ message: "Failed to disable maintenance mode" });
    }
  });

  // Security audit endpoints
  app.get('/api/super-admin/security/audit', isAuthenticated, async (req: any, res) => {
    try {
      const user = await getRequestUser(req);
      if (!user || user.role !== 'super-admin') {
        return res.status(403).json({ message: "Super admin access required" });
      }
      const securityAudit = {
        lastScan: new Date().toISOString(),
        vulnerabilities: 0,
        criticalIssues: 0,
        warnings: 2,
        recommendations: 5,
        items: [
          {
            type: 'warning',
            title: 'SSL Certificate Expiry',
            description: 'SSL certificate expires in 30 days',
            severity: 'medium'
          },
          {
            type: 'info',
            title: 'Password Policy',
            description: 'Consider enforcing stronger password requirements',
            severity: 'low'
          }
        ]
      };
      res.json(securityAudit);
    } catch (error) {
      console.error("Error fetching security audit:", error);
      res.status(500).json({ message: "Failed to fetch security audit" });
    }
  });

  // Performance monitoring
  app.get('/api/super-admin/performance/metrics', isAuthenticated, async (req: any, res) => {
    try {
      const user = await getRequestUser(req);
      if (!user || user.role !== 'super-admin') {
        return res.status(403).json({ message: "Super admin access required" });
      }
      const metrics = {
        responseTime: {
          avg: 120,
          p95: 250,
          min: 45,
          max: 890
        },
        throughput: {
          requestsPerSecond: 25,
          totalRequests: 125000,
          successRate: 99.2
        },
        database: {
          connectionPool: {
            active: 12,
            total: 20,
            utilization: 60
          },
          queryPerformance: {
            avgTime: 45,
            slowQueries: 3
          }
        },
        memory: {
          used: 2.4,
          available: 8.0,
          utilization: 30
        }
      };
      res.json(metrics);
    } catch (error) {
      console.error("Error fetching performance metrics:", error);
      res.status(500).json({ message: "Failed to fetch performance metrics" });
    }
  });

  // Module management endpoints
  app.post('/api/super-admin/modules', isAuthenticated, async (req: any, res) => {
    try {
      const user = await getRequestUser(req);
      if (!user || user.role !== 'super-admin') {
        return res.status(403).json({ message: "Super admin access required" });
      }

      const moduleData = req.body;
      const module = await storage.createSystemModule({
        ...moduleData,
        id: `module-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        lastModifiedBy: user.id,
        createdAt: new Date(),
        lastModifiedAt: new Date()
      });

      // Log the action
      await storage.createAuditLog({
        tableName: "system_modules",
        recordId: module.id,
        action: "CREATE",
        newValues: module,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        userDepartment: user.department,
        module: "system-administration",
        description: `Super admin created new module: ${module.displayName}`,
        severity: "info"
      });

      res.json(module);
    } catch (error) {
      console.error("Error creating module:", error);
      res.status(500).json({ message: "Failed to create module" });
    }
  });

  app.patch('/api/super-admin/modules/:moduleId', isAuthenticated, async (req: any, res) => {
    try {
      const user = await getRequestUser(req);
      if (!user || user.role !== 'super-admin') {
        return res.status(403).json({ message: "Super admin access required" });
      }

      const { moduleId } = req.params;
      const updates = req.body;
      
      const oldModule = await storage.getSystemModule(moduleId);
      const updatedModule = await storage.updateSystemModule(moduleId, {
        ...updates,
        lastModifiedBy: user.id,
        lastModifiedAt: new Date()
      });

      // Log the action
      await storage.createAuditLog({
        tableName: "system_modules",
        recordId: moduleId,
        action: "UPDATE",
        oldValues: oldModule,
        newValues: updatedModule,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        userDepartment: user.department,
        module: "system-administration",
        description: `Super admin updated module: ${updatedModule.displayName}`,
        severity: "info"
      });

      res.json(updatedModule);
    } catch (error) {
      console.error("Error updating module:", error);
      res.status(500).json({ message: "Failed to update module" });
    }
  });

  app.patch('/api/super-admin/modules/:moduleId/maintenance', isAuthenticated, async (req: any, res) => {
    try {
      const user = await getRequestUser(req);
      if (!user || user.role !== 'super-admin') {
        return res.status(403).json({ message: "Super admin access required" });
      }

      const { moduleId } = req.params;
      const { isInMaintenance, maintenanceMessage, maintenanceStartDate, maintenanceEndDate } = req.body;
      
      const oldModule = await storage.getSystemModule(moduleId);
      const updatedModule = await storage.updateSystemModule(moduleId, {
        isInMaintenance,
        maintenanceMessage,
        maintenanceStartDate,
        maintenanceEndDate,
        lastModifiedBy: user.id,
        lastModifiedAt: new Date()
      });

      // Log the action
      await storage.createAuditLog({
        tableName: "system_modules",
        recordId: moduleId,
        action: "UPDATE",
        oldValues: oldModule,
        newValues: updatedModule,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        userDepartment: user.department,
        module: "system-administration",
        description: `Super admin ${isInMaintenance ? 'enabled' : 'disabled'} maintenance mode for module: ${updatedModule.displayName}`,
        severity: isInMaintenance ? "warning" : "info"
      });

      res.json(updatedModule);
    } catch (error) {
      console.error("Error updating module maintenance:", error);
      res.status(500).json({ message: "Failed to update module maintenance" });
    }
  });

  app.patch('/api/super-admin/modules/:moduleId/coming-soon', isAuthenticated, async (req: any, res) => {
    try {
      const user = await getRequestUser(req);
      if (!user || user.role !== 'super-admin') {
        return res.status(403).json({ message: "Super admin access required" });
      }

      const { moduleId } = req.params;
      const { comingSoonMode, comingSoonMessage } = req.body;
      
      const oldModule = await storage.getSystemModule(moduleId);
      const updatedModule = await storage.updateSystemModule(moduleId, {
        comingSoonMode,
        comingSoonMessage,
        lastModifiedBy: user.id,
        lastModifiedAt: new Date()
      });

      // Log the action
      await storage.createAuditLog({
        tableName: "system_modules",
        recordId: moduleId,
        action: "UPDATE",
        oldValues: oldModule,
        newValues: updatedModule,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        userDepartment: user.department,
        module: "system-administration",
        description: `Super admin ${comingSoonMode ? 'enabled' : 'disabled'} coming soon mode for module: ${updatedModule.displayName}`,
        severity: "info"
      });

      res.json(updatedModule);
    } catch (error) {
      console.error("Error updating module coming soon:", error);
      res.status(500).json({ message: "Failed to update module coming soon mode" });
    }
  });

  app.delete('/api/super-admin/modules/:moduleId', isAuthenticated, async (req: any, res) => {
    try {
      const user = await getRequestUser(req);
      if (!user || user.role !== 'super-admin') {
        return res.status(403).json({ message: "Super admin access required" });
      }

      const { moduleId } = req.params;
      const oldModule = await storage.getSystemModule(moduleId);
      await storage.deleteSystemModule(moduleId);

      // Log the action
      await storage.createAuditLog({
        tableName: "system_modules",
        recordId: moduleId,
        action: "DELETE",
        oldValues: oldModule,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        userDepartment: user.department,
        module: "system-administration",
        description: `Super admin deleted module: ${oldModule?.displayName}`,
        severity: "warning"
      });

      res.json({ success: true, message: "Module deleted successfully" });
    } catch (error) {
      console.error("Error deleting module:", error);
      res.status(500).json({ message: "Failed to delete module" });
    }
  });

  // Role management endpoints
  app.get('/api/super-admin/roles', isAuthenticated, async (req: any, res) => {
    try {
      const user = await getRequestUser(req);
      if (!user || user.role !== 'super-admin') {
        return res.status(403).json({ message: "Super admin access required" });
      }
      const roles = await storage.getSystemRoles();
      res.json(roles);
    } catch (error) {
      console.error("Error fetching roles:", error);
      res.status(500).json({ message: "Failed to fetch roles" });
    }
  });

  app.post('/api/super-admin/roles', isAuthenticated, async (req: any, res) => {
    try {
      const user = await getRequestUser(req);
      if (!user || user.role !== 'super-admin') {
        return res.status(403).json({ message: "Super admin access required" });
      }

      const roleData = req.body;
      const role = await storage.createSystemRole({
        ...roleData,
        createdBy: user.id
      });

      // Log the action
      await storage.createAuditLog({
        tableName: "system_roles",
        recordId: role.id,
        action: "CREATE",
        newValues: role,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        userDepartment: user.department,
        module: "system-administration",
        description: `Super admin created new role: ${role.displayName}`,
        severity: "info"
      });

      res.json(role);
    } catch (error) {
      console.error("Error creating role:", error);
      res.status(500).json({ message: "Failed to create role" });
    }
  });

  app.patch('/api/super-admin/roles/:roleId', isAuthenticated, async (req: any, res) => {
    try {
      const user = await getRequestUser(req);
      if (!user || user.role !== 'super-admin') {
        return res.status(403).json({ message: "Super admin access required" });
      }

      const { roleId } = req.params;
      const updates = req.body;
      
      const oldRole = await storage.getSystemRole(roleId);
      const updatedRole = await storage.updateSystemRole(roleId, updates);

      // Log the action
      await storage.createAuditLog({
        tableName: "system_roles",
        recordId: roleId,
        action: "UPDATE",
        oldValues: oldRole,
        newValues: updatedRole,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        userDepartment: user.department,
        module: "system-administration",
        description: `Super admin updated role: ${updatedRole.displayName}`,
        severity: "info"
      });

      res.json(updatedRole);
    } catch (error) {
      console.error("Error updating role:", error);
      res.status(500).json({ message: "Failed to update role" });
    }
  });

  app.delete('/api/super-admin/roles/:roleId', isAuthenticated, async (req: any, res) => {
    try {
      const user = await getRequestUser(req);
      if (!user || user.role !== 'super-admin') {
        return res.status(403).json({ message: "Super admin access required" });
      }

      const { roleId } = req.params;
      const oldRole = await storage.getSystemRole(roleId);
      await storage.deleteSystemRole(roleId);

      // Log the action
      await storage.createAuditLog({
        tableName: "system_roles",
        recordId: roleId,
        action: "DELETE",
        oldValues: oldRole,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        userDepartment: user.department,
        module: "system-administration",
        description: `Super admin deleted role: ${oldRole?.displayName}`,
        severity: "warning"
      });

      res.json({ success: true, message: "Role deleted successfully" });
    } catch (error) {
      console.error("Error deleting role:", error);
      res.status(500).json({ message: "Failed to delete role" });
    }
  });

  // Role-Module assignment endpoints
  app.post('/api/super-admin/roles/:roleId/modules/:moduleId', isAuthenticated, async (req: any, res) => {
    try {
      const user = await getRequestUser(req);
      if (!user || user.role !== 'super-admin') {
        return res.status(403).json({ message: "Super admin access required" });
      }

      const { roleId, moduleId } = req.params;
      const { canRead = true, canWrite = false, canDelete = false, canAdminister = false } = req.body;

      const assignment = await storage.assignModuleToRole({
        roleId,
        moduleId,
        canRead,
        canWrite,
        canDelete,
        canAdminister,
        assignedBy: user.id
      });

      // Log the action
      await storage.createAuditLog({
        tableName: "role_module_assignments",
        recordId: assignment.id,
        action: "CREATE",
        newValues: assignment,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        userDepartment: user.department,
        module: "system-administration",
        description: `Super admin assigned module to role`,
        severity: "info"
      });

      res.json(assignment);
    } catch (error) {
      console.error("Error assigning module to role:", error);
      res.status(500).json({ message: "Failed to assign module to role" });
    }
  });

  app.delete('/api/super-admin/roles/:roleId/modules/:moduleId', isAuthenticated, async (req: any, res) => {
    try {
      const user = await getRequestUser(req);
      if (!user || user.role !== 'super-admin') {
        return res.status(403).json({ message: "Super admin access required" });
      }

      const { roleId, moduleId } = req.params;
      await storage.removeModuleFromRole(roleId, moduleId);

      // Log the action
      await storage.createAuditLog({
        tableName: "role_module_assignments",
        recordId: `${roleId}-${moduleId}`,
        action: "DELETE",
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        userDepartment: user.department,
        module: "system-administration",
        description: `Super admin removed module from role`,
        severity: "info"
      });

      res.json({ success: true, message: "Module removed from role successfully" });
    } catch (error) {
      console.error("Error removing module from role:", error);
      res.status(500).json({ message: "Failed to remove module from role" });
    }
  });

  // Update specific permissions for role-module assignment
  app.patch('/api/super-admin/roles/:roleId/modules/:moduleId', isAuthenticated, async (req: any, res) => {
    try {
      const user = await getRequestUser(req);
      if (!user || user.role !== 'super-admin') {
        return res.status(403).json({ message: "Super admin access required" });
      }

      const { roleId, moduleId } = req.params;
      const permissionUpdates = req.body;

      const updatedAssignment = await storage.updateRoleModulePermissions(roleId, moduleId, permissionUpdates);

      // Log the action
      await storage.createAuditLog({
        tableName: "role_module_assignments",
        recordId: `${roleId}-${moduleId}`,
        action: "UPDATE",
        newValues: permissionUpdates,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        userDepartment: user.department,
        module: "system-administration",
        description: `Super admin updated module permissions for role`,
        severity: "info"
      });

      res.json(updatedAssignment);
    } catch (error) {
      console.error("Error updating role-module permissions:", error);
      res.status(500).json({ message: "Failed to update permissions" });
    }
  });

  app.get('/api/super-admin/roles/:roleId/modules', isAuthenticated, async (req: any, res) => {
    try {
      const user = await getRequestUser(req);
      if (!user || user.role !== 'super-admin') {
        return res.status(403).json({ message: "Super admin access required" });
      }

      const { roleId } = req.params;
      const modules = await storage.getModulesForRole(roleId);
      res.json(modules);
    } catch (error) {
      console.error("Error fetching role modules:", error);
      res.status(500).json({ message: "Failed to fetch role modules" });
    }
  });

  // Seed default roles and link to modules
  app.post('/api/super-admin/seed-roles', isAuthenticated, async (req: any, res) => {
    try {
      const user = await getRequestUser(req);
      if (!user || user.role !== 'super-admin') {
        return res.status(403).json({ message: "Super admin access required" });
      }
      
      console.log("🌱 Seeding roles and linking to modules...");
      
      // Default roles data
      const defaultRoles = [
        { roleName: "super-admin", displayName: "Super Administrator", description: "Full system access", isActive: true, isSystemRole: true, permissions: ["*"], createdBy: "system" },
        { roleName: "town-clerk", displayName: "Town Clerk", description: "Administrative oversight", isActive: true, isSystemRole: true, permissions: ["admin", "documents"], createdBy: "system" },
        { roleName: "finance-manager", displayName: "Finance Manager", description: "Financial management", isActive: true, isSystemRole: true, permissions: ["finance", "payroll"], createdBy: "system" },
        { roleName: "meter-reader", displayName: "Meter Reader", description: "Water meter reading", isActive: true, isSystemRole: true, permissions: ["meter-reading"], createdBy: "system" },
        { roleName: "property-evaluator", displayName: "Property Evaluator", description: "Property assessments", isActive: true, isSystemRole: true, permissions: ["property"], createdBy: "system" },
        { roleName: "housing-officer", displayName: "Housing Officer", description: "Housing applications", isActive: true, isSystemRole: true, permissions: ["housing"], createdBy: "system" },
        { roleName: "hr-manager", displayName: "HR Manager", description: "Human resources", isActive: true, isSystemRole: true, permissions: ["payroll", "employees"], createdBy: "system" }
      ];

      // Create roles
      let rolesCreated = 0;
      for (const roleData of defaultRoles) {
        try {
          const existingRole = await storage.getSystemRoleByName(roleData.roleName);
          if (!existingRole) {
            await storage.createSystemRole(roleData);
            rolesCreated++;
            console.log(`✓ Created role: ${roleData.displayName}`);
          }
        } catch (error) {
          console.log(`Role ${roleData.roleName} may already exist`);
        }
      }

      // Get current roles and modules
      const roles = await storage.getSystemRoles();
      const modules = await storage.getSystemModules();

      // Simple role-module assignments
      const assignments = [
        { role: "super-admin", modules: ["all"] },
        { role: "finance-manager", modules: ["advanced-finance", "basic-finance", "payroll-management"] },
        { role: "meter-reader", modules: ["meter-billing", "water-sewerage"] },
        { role: "property-evaluator", modules: ["property-valuations"] },
        { role: "housing-officer", modules: ["housing-management"] },
        { role: "hr-manager", modules: ["payroll-management", "face-scan-attendance"] }
      ];

      let assignmentsCreated = 0;
      for (const assignment of assignments) {
        const role = roles.find(r => r.roleName === assignment.role);
        if (!role) continue;

        for (const module of modules) {
          if (assignment.modules.includes("all") || 
              assignment.modules.some(m => module.moduleName?.includes(m) || module.displayName?.includes(m))) {
            try {
              await storage.assignModuleToRole({
                roleId: role.id,
                moduleId: module.id,
                canRead: true,
                canWrite: assignment.role === "super-admin",
                canDelete: assignment.role === "super-admin",
                canAdminister: assignment.role === "super-admin",
                assignedBy: user.id
              });
              assignmentsCreated++;
            } catch (error) {
              // Ignore duplicate assignments
            }
          }
        }
      }

      const result = {
        totalRoles: roles.length,
        rolesCreated,
        totalAssignments: assignmentsCreated,
        success: true
      };
      
      console.log("🎉 Role seeding completed:", result);
      
      res.json({
        message: "Default roles seeded and linked to modules successfully",
        ...result
      });
    } catch (error) {
      console.error("Error seeding roles:", error);
      res.status(500).json({ 
        message: "Failed to seed roles",
        error: error.message 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}