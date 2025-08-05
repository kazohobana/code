import type { Express } from "express";
import { storage } from "./storage";
import { isAuthenticated } from "./tempAuth";
import { ZodError } from "zod";
import {
  insertFacilitySchema,
  insertCemeterySchema,
  insertGraveSchema,
  insertPropertySchema,
  insertVehicleSchema,
  insertEmployeesSchema,
  insertPayrollRunsSchema
} from "@shared/schema";

export function registerAdditionalRoutes(app: Express) {
  
  // ===== CEMETERY MANAGEMENT ROUTES =====
  
  // Get all cemeteries
  app.get('/api/cemetery/cemeteries', isAuthenticated, async (req, res) => {
    try {
      const cemeteries = await storage.getCemeteries();
      res.json(cemeteries);
    } catch (error) {
      console.error("Error fetching cemeteries:", error);
      res.status(500).json({ message: "Failed to fetch cemeteries" });
    }
  });

  // Add new cemetery with full information
  app.post('/api/cemetery/cemeteries', isAuthenticated, async (req, res) => {
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

  // Get graves by cemetery with different types and pricing
  app.get('/api/cemetery/:cemeteryId/graves', isAuthenticated, async (req, res) => {
    try {
      const graves = await storage.getGravesByCemetery(req.params.cemeteryId);
      res.json(graves);
    } catch (error) {
      console.error("Error fetching graves:", error);
      res.status(500).json({ message: "Failed to fetch graves" });
    }
  });

  // Add new grave with type and pricing information
  app.post('/api/cemetery/:cemeteryId/graves', isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertGraveSchema.parse({
        ...req.body,
        cemeteryId: req.params.cemeteryId
      });
      const grave = await storage.createGrave(validatedData);
      res.status(201).json(grave);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error creating grave:", error);
        res.status(500).json({ message: "Failed to create grave" });
      }
    }
  });

  // ===== FACILITY MANAGEMENT ROUTES =====
  
  // Add new facility with different booking types and rates
  app.post('/api/facilities', isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertFacilitySchema.parse(req.body);
      const facility = await storage.createFacility(validatedData);
      res.status(201).json(facility);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error creating facility:", error);
        res.status(500).json({ message: "Failed to create facility" });
      }
    }
  });

  // Get facility booking slots and availability
  app.get('/api/facilities/:facilityId/availability', isAuthenticated, async (req, res) => {
    try {
      const { date, timeSlot } = req.query;
      const availability = await storage.getFacilityAvailability(
        req.params.facilityId, 
        date as string, 
        timeSlot as string
      );
      res.json(availability);
    } catch (error) {
      console.error("Error checking availability:", error);
      res.status(500).json({ message: "Failed to check availability" });
    }
  });

  // ===== PROPERTY MANAGEMENT ROUTES =====
  
  // Add new property with valuations and submission trail
  app.post('/api/properties', isAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as any)?.id;
      const validatedData = insertPropertySchema.parse({
        ...req.body,
        createdBy: userId,
        submittedBy: userId
      });
      const property = await storage.createProperty(validatedData);
      res.status(201).json(property);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error creating property:", error);
        res.status(500).json({ message: "Failed to create property" });
      }
    }
  });

  // Get property with full valuation trail
  app.get('/api/properties/:id/valuations', isAuthenticated, async (req, res) => {
    try {
      const valuations = await storage.getPropertyValuations(req.params.id);
      res.json(valuations);
    } catch (error) {
      console.error("Error fetching property valuations:", error);
      res.status(500).json({ message: "Failed to fetch property valuations" });
    }
  });

  // ===== CUSTOMER COMPLAINTS ENHANCEMENT =====
  
  // Get complaint details with full information
  app.get('/api/crm/complaints/:id', isAuthenticated, async (req, res) => {
    try {
      const complaint = await storage.getCustomerComplaintById(req.params.id);
      if (!complaint) {
        return res.status(404).json({ message: "Complaint not found" });
      }
      res.json(complaint);
    } catch (error) {
      console.error("Error fetching complaint details:", error);
      res.status(500).json({ message: "Failed to fetch complaint details" });
    }
  });

  // Update complaint with assignment and notes
  app.patch('/api/crm/complaints/:id', isAuthenticated, async (req, res) => {
    try {
      const { status, assignedTo, notes, resolution } = req.body;
      const userId = (req.user as any)?.id;
      await storage.updateComplaintDetails(req.params.id, {
        status,
        assignedTo,
        notes,
        resolution,
        updatedBy: userId
      });
      res.json({ message: "Complaint updated successfully" });
    } catch (error) {
      console.error("Error updating complaint:", error);
      res.status(500).json({ message: "Failed to update complaint" });
    }
  });

  // ===== HOUSING APPLICATIONS ENHANCEMENT =====
  
  // Get housing applications with approval workflow
  app.get('/api/housing/applications/workflow', isAuthenticated, async (req, res) => {
    try {
      const { status, sortBy } = req.query;
      const applications = await storage.getHousingApplicationsWorkflow(
        status as string,
        sortBy as string || 'dateApplied'
      );
      res.json(applications);
    } catch (error) {
      console.error("Error fetching housing workflow:", error);
      res.status(500).json({ message: "Failed to fetch housing workflow" });
    }
  });

  // Update housing application with reason for rejection
  app.patch('/api/housing/applications/:id/decision', isAuthenticated, async (req, res) => {
    try {
      const { status, reason, reviewedBy } = req.body;
      const userId = (req.user as any)?.id;
      await storage.updateHousingApplicationDecision(req.params.id, {
        status,
        reason,
        reviewedBy: reviewedBy || userId,
        decidedAt: new Date()
      });
      res.json({ message: "Application decision recorded successfully" });
    } catch (error) {
      console.error("Error updating application decision:", error);
      res.status(500).json({ message: "Failed to update application decision" });
    }
  });

  // Get archived applications (approved/rejected)
  app.get('/api/housing/applications/archived', isAuthenticated, async (req, res) => {
    try {
      const { type } = req.query; // 'approved' or 'rejected'
      const applications = await storage.getArchivedHousingApplications(type as string);
      res.json(applications);
    } catch (error) {
      console.error("Error fetching archived applications:", error);
      res.status(500).json({ message: "Failed to fetch archived applications" });
    }
  });

  // ===== FLEET MANAGEMENT ROUTES =====
  
  // Get all vehicles
  app.get('/api/transport/vehicles', isAuthenticated, async (req, res) => {
    try {
      const vehicles = await storage.getVehicles();
      res.json(vehicles);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      res.status(500).json({ message: "Failed to fetch vehicles" });
    }
  });

  // Add new vehicle
  app.post('/api/transport/vehicles', isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertVehicleSchema.parse(req.body);
      const vehicle = await storage.createVehicle(validatedData);
      res.status(201).json(vehicle);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error creating vehicle:", error);
        res.status(500).json({ message: "Failed to create vehicle" });
      }
    }
  });

  // Get vehicle maintenance records
  app.get('/api/transport/vehicles/:id/maintenance', isAuthenticated, async (req, res) => {
    try {
      const maintenance = await storage.getVehicleMaintenance(req.params.id);
      res.json(maintenance);
    } catch (error) {
      console.error("Error fetching maintenance records:", error);
      res.status(500).json({ message: "Failed to fetch maintenance records" });
    }
  });

  // ===== PAYROLL MANAGEMENT ROUTES =====
  
  // Get all employees
  app.get('/api/payroll/employees', isAuthenticated, async (req, res) => {
    try {
      const employees = await storage.getEmployees();
      res.json(employees);
    } catch (error) {
      console.error("Error fetching employees:", error);
      res.status(500).json({ message: "Failed to fetch employees" });
    }
  });

  // Add new employee
  app.post('/api/payroll/employees', isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertEmployeesSchema.parse(req.body);
      const employee = await storage.createEmployee(validatedData);
      res.status(201).json(employee);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error creating employee:", error);
        res.status(500).json({ message: "Failed to create employee" });
      }
    }
  });

  // Get payroll runs
  app.get('/api/payroll/runs', isAuthenticated, async (req, res) => {
    try {
      const { period, year } = req.query;
      const runs = await storage.getPayrollRuns(period as string, year as string);
      res.json(runs);
    } catch (error) {
      console.error("Error fetching payroll runs:", error);
      res.status(500).json({ message: "Failed to fetch payroll runs" });
    }
  });

  // Create payroll run
  app.post('/api/payroll/runs', isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertPayrollRunsSchema.parse(req.body);
      const run = await storage.createPayrollRun(validatedData);
      res.status(201).json(run);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error creating payroll run:", error);
        res.status(500).json({ message: "Failed to create payroll run" });
      }
    }
  });

  // Process payroll for period
  app.post('/api/payroll/process', isAuthenticated, async (req, res) => {
    try {
      const { period, year } = req.body;
      const userId = (req.user as any)?.id;
      const result = await storage.processPayroll(period, year, userId);
      res.json(result);
    } catch (error) {
      console.error("Error processing payroll:", error);
      res.status(500).json({ message: "Failed to process payroll" });
    }
  });

  // Get employee payslips
  app.get('/api/payroll/employees/:id/payslips', isAuthenticated, async (req, res) => {
    try {
      const { year, period } = req.query;
      const payslips = await storage.getEmployeePayslips(req.params.id, year as string, period as string);
      res.json(payslips);
    } catch (error) {
      console.error("Error fetching payslips:", error);
      res.status(500).json({ message: "Failed to fetch payslips" });
    }
  });

  // ===== WATER & SEWERAGE MANAGEMENT ROUTES =====
  
  // Get water connections
  app.get('/api/water/connections', isAuthenticated, async (req, res) => {
    try {
      const connections = await storage.getWaterConnections();
      res.json(connections);
    } catch (error) {
      console.error("Error fetching water connections:", error);
      res.status(500).json({ message: "Failed to fetch water connections" });
    }
  });

  // Add new water connection
  app.post('/api/water/connections', isAuthenticated, async (req, res) => {
    try {
      const validatedData = req.body; // Will add proper validation
      const connection = await storage.createWaterConnection(validatedData);
      res.status(201).json(connection);
    } catch (error) {
      console.error("Error creating water connection:", error);
      res.status(500).json({ message: "Failed to create water connection" });
    }
  });

  // Get meter readings for billing
  app.get('/api/water/meter-readings', isAuthenticated, async (req, res) => {
    try {
      const { period, meterId } = req.query;
      const readings = await storage.getMeterReadings(meterId as string, period as string);
      res.json(readings);
    } catch (error) {
      console.error("Error fetching meter readings:", error);
      res.status(500).json({ message: "Failed to fetch meter readings" });
    }
  });

  // Record new meter reading
  app.post('/api/water/meter-readings', isAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as any)?.id;
      const validatedData = { ...req.body, readBy: userId };
      const reading = await storage.createMeterReading(validatedData);
      res.status(201).json(reading);
    } catch (error) {
      console.error("Error creating meter reading:", error);
      res.status(500).json({ message: "Failed to create meter reading" });
    }
  });
}