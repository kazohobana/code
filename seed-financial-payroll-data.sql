-- Comprehensive Financial and Payroll Management Sample Data
-- City of Gweru Municipal ERP System

-- ===== FINANCIAL MANAGEMENT DATA =====

-- Currencies
INSERT INTO currencies (id, code, name, symbol, exchange_rate, is_active) VALUES
('curr_001', 'USD', 'US Dollar', '$', 1.0000, true),
('curr_002', 'ZWL', 'Zimbabwe Dollar', 'ZWL', 8500.0000, true),
('curr_003', 'ZAR', 'South African Rand', 'R', 18.5000, true),
('curr_004', 'GBP', 'British Pound', '£', 0.7850, true);

-- Bank Accounts
INSERT INTO bank_accounts (id, bank_name, account_name, account_number, account_type, currency_id, current_balance, is_active) VALUES
('bank_001', 'CBZ Bank', 'Municipal Current Account', '12345678901', 'current', 'curr_001', 250000.00, true),
('bank_002', 'CABS', 'Municipal Savings Account', '98765432109', 'savings', 'curr_001', 150000.00, true),
('bank_003', 'Steward Bank', 'Payroll Account', '55566677788', 'current', 'curr_002', 850000000.00, true),
('bank_004', 'NMB Bank', 'Capital Projects Account', '11122233344', 'capital', 'curr_001', 500000.00, true);

-- Chart of Accounts
INSERT INTO chart_of_accounts (id, account_code, account_name, account_type, parent_account_id, is_active, description) VALUES
('coa_001', '1000', 'ASSETS', 'asset', null, true, 'Total Assets'),
('coa_002', '1100', 'Current Assets', 'asset', 'coa_001', true, 'Current Assets'),
('coa_003', '1110', 'Cash and Bank', 'asset', 'coa_002', true, 'Cash and Bank Balances'),
('coa_004', '1120', 'Accounts Receivable', 'asset', 'coa_002', true, 'Municipal Debtors'),
('coa_005', '1200', 'Fixed Assets', 'asset', 'coa_001', true, 'Property, Plant & Equipment'),
('coa_006', '2000', 'LIABILITIES', 'liability', null, true, 'Total Liabilities'),
('coa_007', '2100', 'Current Liabilities', 'liability', 'coa_006', true, 'Short-term Obligations'),
('coa_008', '2110', 'Accounts Payable', 'liability', 'coa_007', true, 'Municipal Creditors'),
('coa_009', '2120', 'Accrued Expenses', 'liability', 'coa_007', true, 'Outstanding Expenses'),
('coa_010', '3000', 'EQUITY', 'equity', null, true, 'Municipal Equity'),
('coa_011', '3100', 'Retained Earnings', 'equity', 'coa_010', true, 'Accumulated Surplus'),
('coa_012', '4000', 'REVENUE', 'revenue', null, true, 'Municipal Revenue'),
('coa_013', '4100', 'Rate Revenue', 'revenue', 'coa_012', true, 'Property Rates'),
('coa_014', '4200', 'Service Charges', 'revenue', 'coa_012', true, 'Water, Refuse, Sewer'),
('coa_015', '4300', 'Licenses and Permits', 'revenue', 'coa_012', true, 'Business Licenses'),
('coa_016', '5000', 'EXPENSES', 'expense', null, true, 'Municipal Expenses'),
('coa_017', '5100', 'Personnel Costs', 'expense', 'coa_016', true, 'Staff Salaries & Benefits'),
('coa_018', '5200', 'Operating Expenses', 'expense', 'coa_016', true, 'Day-to-day Operations'),
('coa_019', '5300', 'Maintenance & Repairs', 'expense', 'coa_016', true, 'Infrastructure Maintenance'),
('coa_020', '5400', 'Utilities', 'expense', 'coa_016', true, 'Electricity, Water, Communications');

-- General Ledger Entries
INSERT INTO general_ledger (id, account_id, transaction_date, description, reference_number, debit_amount, credit_amount, posted_by) VALUES
('gl_001', 'coa_003', '2025-01-01', 'Opening Balance - CBZ Current Account', 'OB-2025-001', '250000.00', null, 'admin'),
('gl_002', 'coa_011', '2025-01-01', 'Opening Balance - Retained Earnings', 'OB-2025-001', null, '250000.00', 'admin'),
('gl_003', 'coa_013', '2025-01-15', 'Property Rates - January 2025', 'RATES-2025-001', null, '185000.00', 'finance_clerk'),
('gl_004', 'coa_003', '2025-01-15', 'Property Rates Collection', 'RATES-2025-001', '185000.00', null, 'finance_clerk'),
('gl_005', 'coa_014', '2025-01-20', 'Water Service Charges - January', 'WSC-2025-001', null, '125000.00', 'finance_clerk'),
('gl_006', 'coa_003', '2025-01-20', 'Water Charges Collection', 'WSC-2025-001', '125000.00', null, 'finance_clerk'),
('gl_007', 'coa_017', '2025-01-31', 'January 2025 Salaries', 'SAL-2025-001', '95000.00', null, 'payroll_officer'),
('gl_008', 'coa_003', '2025-01-31', 'Salary Payments', 'SAL-2025-001', null, '95000.00', 'payroll_officer'),
('gl_009', 'coa_018', '2025-02-05', 'Office Supplies Purchase', 'PO-2025-001', '15000.00', null, 'procurement'),
('gl_010', 'coa_008', '2025-02-05', 'Supplier Invoice - Office Supplies', 'PO-2025-001', null, '15000.00', 'procurement');

-- Cashbook Entries
INSERT INTO cashbook (id, transaction_date, description, transaction_type, amount, balance, reference_number, bank_account_id, recorded_by) VALUES
('cb_001', '2025-01-01', 'Opening Balance', 'opening', 250000.00, 250000.00, 'OB-2025-001', 'bank_001', 'admin'),
('cb_002', '2025-01-15', 'Property Rates Collection', 'receipt', 185000.00, 435000.00, 'RATES-2025-001', 'bank_001', 'finance_clerk'),
('cb_003', '2025-01-20', 'Water Service Charges', 'receipt', 125000.00, 560000.00, 'WSC-2025-001', 'bank_001', 'finance_clerk'),
('cb_004', '2025-01-31', 'January Salary Payments', 'payment', -95000.00, 465000.00, 'SAL-2025-001', 'bank_001', 'payroll_officer'),
('cb_005', '2025-02-05', 'Office Supplies Payment', 'payment', -15000.00, 450000.00, 'PO-2025-001', 'bank_001', 'procurement'),
('cb_006', '2025-02-10', 'Vehicle Fuel Purchase', 'payment', -8500.00, 441500.00, 'FUEL-2025-001', 'bank_001', 'fleet_manager'),
('cb_007', '2025-02-15', 'Business License Fees', 'receipt', 35000.00, 476500.00, 'LIC-2025-001', 'bank_001', 'license_officer'),
('cb_008', '2025-02-20', 'Electricity Bill Payment', 'payment', -25000.00, 451500.00, 'ELEC-2025-001', 'bank_001', 'utilities_clerk');

-- Debtors Management
INSERT INTO debtors_management (id, debtor_name, debtor_type, contact_person, phone, email, address, total_debt, current_debt, overdue_debt, last_payment_date, status, credit_limit, payment_terms, created_by) VALUES
('debt_001', 'Gweru Industrial Holdings', 'corporate', 'John Mukamuri', '+263772123456', 'j.mukamuri@gih.co.zw', '123 Industrial Road, Gweru', 85000.00, 25000.00, 60000.00, '2024-11-15', 'overdue', 100000.00, '30 days', 'finance_manager'),
('debt_002', 'Midlands Shopping Centre', 'corporate', 'Sarah Chigodora', '+263773456789', 's.chigodora@midlandsmall.co.zw', '45 Main Street, Gweru', 45000.00, 45000.00, 0.00, '2025-01-20', 'current', 75000.00, '30 days', 'finance_manager'),
('debt_003', 'Gweru Teachers College', 'institutional', 'Dr. Michael Nyoni', '+263774789123', 'm.nyoni@gtc.ac.zw', '78 Education Drive, Gweru', 125000.00, 55000.00, 70000.00, '2024-12-10', 'overdue', 150000.00, '60 days', 'finance_manager'),
('debt_004', 'City Lodge Gweru', 'corporate', 'Patience Moyo', '+263775123654', 'p.moyo@citylodge.co.zw', '12 Robert Mugabe Way, Gweru', 28000.00, 28000.00, 0.00, '2025-02-01', 'current', 50000.00, '30 days', 'finance_manager'),
('debt_005', 'Gweru Residents Association', 'community', 'James Sibanda', '+263776456789', 'j.sibanda@gra.org.zw', '33 Community Centre, Gweru', 15000.00, 10000.00, 5000.00, '2024-12-25', 'follow_up', 25000.00, '14 days', 'finance_manager');

-- Municipal Invoices
INSERT INTO municipal_invoices (id, invoice_number, customer_name, customer_contact, invoice_date, due_date, total_amount, tax_amount, status, service_type, description, created_by) VALUES
('inv_001', 'INV-2025-001', 'Gweru Industrial Holdings', '+263772123456', '2025-01-15', '2025-02-14', 85000.00, 12750.00, 'overdue', 'rates', 'Industrial Property Rates - Q4 2024', 'rates_officer'),
('inv_002', 'INV-2025-002', 'Midlands Shopping Centre', '+263773456789', '2025-01-20', '2025-02-19', 45000.00, 6750.00, 'paid', 'water', 'Commercial Water Services - January 2025', 'water_billing'),
('inv_003', 'INV-2025-003', 'Gweru Teachers College', '+263774789123', '2025-02-01', '2025-04-01', 125000.00, 18750.00, 'pending', 'bulk_services', 'Institutional Bulk Services - February 2025', 'billing_clerk'),
('inv_004', 'INV-2025-004', 'City Lodge Gweru', '+263775123654', '2025-02-05', '2025-03-07', 28000.00, 4200.00, 'pending', 'refuse', 'Commercial Refuse Collection - February 2025', 'refuse_billing'),
('inv_005', 'INV-2025-005', 'Gweru Central Hospital', '+263777888999', '2025-02-10', '2025-04-10', 275000.00, 41250.00, 'sent', 'bulk_services', 'Hospital Bulk Services - February 2025', 'billing_manager'),
('inv_006', 'INV-2025-006', 'Pick n Pay Gweru', '+263778123456', '2025-02-12', '2025-03-14', 65000.00, 9750.00, 'pending', 'combined', 'Retail Complex Services - February 2025', 'commercial_billing');

-- Voucher Payments
INSERT INTO voucher_payments (id, voucher_number, supplier_name, payment_date, amount, description, payment_method, reference_number, status, approved_by, paid_by) VALUES
('vou_001', 'VOU-2025-001', 'Gweru Office Supplies', '2025-02-05', 15000.00, 'Office stationery and supplies for February', 'bank_transfer', 'BT-2025-001', 'paid', 'procurement_manager', 'finance_officer'),
('vou_002', 'VOU-2025-002', 'Total Zimbabwe', '2025-02-10', 8500.00, 'Vehicle fuel for municipal fleet', 'cash', 'CASH-2025-001', 'paid', 'fleet_manager', 'petty_cash'),
('vou_003', 'VOU-2025-003', 'ZESA Holdings', '2025-02-20', 25000.00, 'Electricity charges for municipal buildings', 'bank_transfer', 'BT-2025-002', 'paid', 'utilities_manager', 'finance_officer'),
('vou_004', 'VOU-2025-004', 'Econet Wireless', '2025-02-22', 5500.00, 'Mobile communication services', 'mobile_money', 'MM-2025-001', 'paid', 'it_manager', 'finance_assistant'),
('vou_005', 'VOU-2025-005', 'Gweru Construction Co.', '2025-02-25', 125000.00, 'Road maintenance - Shurugwi Road', 'bank_transfer', 'BT-2025-003', 'approved', 'city_engineer', 'finance_manager'),
('vou_006', 'VOU-2025-006', 'Medical Aid Society', '2025-02-28', 45000.00, 'Employee medical aid contributions', 'bank_transfer', 'BT-2025-004', 'pending', 'hr_manager', null);

-- Receipts
INSERT INTO receipts (id, receipt_number, payer_name, receipt_date, amount, payment_method, description, service_type, issued_by) VALUES
('rec_001', 'REC-2025-001', 'Midlands Shopping Centre', '2025-01-20', 45000.00, 'bank_transfer', 'Water service charges payment', 'water', 'cashier_001'),
('rec_002', 'REC-2025-002', 'Gweru Motors', '2025-01-25', 15000.00, 'cash', 'Business license renewal payment', 'license', 'license_officer'),
('rec_003', 'REC-2025-003', 'Suburban Residents', '2025-02-01', 125000.00, 'bulk_payment', 'Property rates - Suburban ward', 'rates', 'rates_collector'),
('rec_004', 'REC-2025-004', 'Market Vendors Association', '2025-02-05', 35000.00, 'mobile_money', 'Monthly market stall fees', 'market_fees', 'market_supervisor'),
('rec_005', 'REC-2025-005', 'Industrial Area Businesses', '2025-02-10', 85000.00, 'bank_transfer', 'Industrial waste collection fees', 'refuse', 'commercial_officer'),
('rec_006', 'REC-2025-006', 'Central Business District', '2025-02-15', 195000.00, 'bulk_payment', 'CBD combined services payment', 'combined', 'central_cashier');

-- Fixed Assets
INSERT INTO fixed_assets (id, asset_code, asset_name, category, location, purchase_date, purchase_cost, current_value, depreciation_rate, useful_life_years, condition_status, assigned_to, supplier, warranty_expiry, status) VALUES
('fa_001', 'AST-VEH-001', 'Toyota Hilux - Mayor Office', 'vehicles', 'Municipal Offices', '2023-03-15', 45000.00, 40500.00, 10.00, 10, 'excellent', 'mayors_office', 'Croco Motors', '2026-03-15', 'active'),
('fa_002', 'AST-VEH-002', 'Isuzu Water Tanker', 'vehicles', 'Water Department', '2022-08-20', 85000.00, 68000.00, 15.00, 8, 'good', 'water_dept', 'Truck & Bus Zimbabwe', '2025-08-20', 'active'),
('fa_003', 'AST-EQP-001', 'Caterpillar Excavator', 'equipment', 'Works Department', '2021-11-10', 125000.00, 87500.00, 20.00, 8, 'good', 'engineering_dept', 'Barloworld Equipment', '2024-11-10', 'active'),
('fa_004', 'AST-IT-001', 'Dell Server - Data Centre', 'IT equipment', 'IT Department', '2024-01-15', 35000.00, 31500.00, 25.00, 5, 'excellent', 'it_dept', 'Axiz Technology', '2027-01-15', 'active'),
('fa_005', 'AST-FUR-001', 'Council Chamber Furniture', 'furniture', 'Council Chambers', '2023-06-30', 25000.00, 22500.00, 10.00, 10, 'excellent', 'chamber_secretary', 'Elite Furnishers', '2024-06-30', 'active'),
('fa_006', 'AST-EQP-002', 'Road Grader', 'equipment', 'Works Department', '2020-04-12', 95000.00, 57000.00, 20.00, 8, 'fair', 'engineering_dept', 'Bell Equipment', '2023-04-12', 'maintenance'),
('fa_007', 'AST-BLD-001', 'Municipal Offices Building', 'buildings', 'Central Gweru', '1985-12-01', 450000.00, 315000.00, 2.50, 50, 'good', 'facilities_mgmt', 'Original Builders', '1985-12-01', 'active'),
('fa_008', 'AST-VEH-003', 'Fire Engine - Mercedes', 'vehicles', 'Fire Department', '2019-09-25', 175000.00, 122500.00, 15.00, 12, 'good', 'fire_dept', 'Emergency Vehicles Ltd', '2022-09-25', 'active');

-- ===== PAYROLL MANAGEMENT DATA =====

-- Leave Types
INSERT INTO leave_types (id, leave_name, leave_code, max_days_per_year, carry_over_allowed, is_paid, is_active, description) VALUES
('lt_001', 'Annual Leave', 'AL', 22, true, true, true, 'Paid annual vacation leave'),
('lt_002', 'Sick Leave', 'SL', 30, false, true, true, 'Medical leave with full pay'),
('lt_003', 'Maternity Leave', 'ML', 98, false, true, true, 'Maternity leave for female employees'),
('lt_004', 'Paternity Leave', 'PL', 10, false, true, true, 'Paternity leave for male employees'),
('lt_005', 'Compassionate Leave', 'CL', 5, false, true, true, 'Leave for family emergencies'),
('lt_006', 'Study Leave', 'STL', 14, false, false, true, 'Unpaid educational leave'),
('lt_007', 'Special Leave', 'SPL', 3, false, true, true, 'Special circumstances leave');

-- Employees
INSERT INTO employees (id, employee_number, first_name, last_name, middle_name, national_id, phone, email, address, department, position, hire_date, salary_scale, basic_salary, currency_id, bank_account, tax_number, status, supervisor_id, created_by) VALUES
('emp_001', 'EMP001', 'John', 'Mukamuri', 'Tendai', '63-123456-A-47', '+263771234567', 'j.mukamuri@gweru.gov.zw', '123 High Street, Gweru', 'administration', 'Town Clerk', '2020-03-01', 'TC1', 2500.00, 'curr_001', 'CBZ-001-789123', 'TAX-001-456', 'active', null, 'hr_manager'),
('emp_002', 'EMP002', 'Sarah', 'Chigodora', 'Rumbidzai', '63-234567-B-48', '+263772345678', 's.chigodora@gweru.gov.zw', '456 Robert Mugabe Way, Gweru', 'finance', 'Finance Director', '2019-07-15', 'FD1', 2200.00, 'curr_001', 'CBZ-002-789124', 'TAX-002-457', 'active', 'emp_001', 'hr_manager'),
('emp_003', 'EMP003', 'Michael', 'Nyoni', 'Blessing', '63-345678-C-49', '+263773456789', 'm.nyoni@gweru.gov.zw', '789 Lobengula Street, Gweru', 'engineering', 'City Engineer', '2018-11-20', 'CE1', 2000.00, 'curr_001', 'CBZ-003-789125', 'TAX-003-458', 'active', 'emp_001', 'hr_manager'),
('emp_004', 'EMP004', 'Patience', 'Moyo', 'Grace', '63-456789-D-50', '+263774567890', 'p.moyo@gweru.gov.zw', '321 Leopold Takawira Ave, Gweru', 'housing', 'Housing Manager', '2021-02-10', 'HM1', 1800.00, 'curr_001', 'CBZ-004-789126', 'TAX-004-459', 'active', 'emp_001', 'hr_manager'),
('emp_005', 'EMP005', 'James', 'Sibanda', 'Trust', '63-567890-E-51', '+263775678901', 'j.sibanda@gweru.gov.zw', '654 Matopos Road, Gweru', 'health', 'Health Director', '2019-09-05', 'HD1', 1900.00, 'curr_001', 'CBZ-005-789127', 'TAX-005-460', 'active', 'emp_001', 'hr_manager'),
('emp_006', 'EMP006', 'Mary', 'Dube', 'Chipo', '63-678901-F-52', '+263776789012', 'm.dube@gweru.gov.zw', '987 Shurugwi Road, Gweru', 'finance', 'Senior Accountant', '2020-06-12', 'SA1', 1500.00, 'curr_001', 'CBZ-006-789128', 'TAX-006-461', 'active', 'emp_002', 'hr_manager'),
('emp_007', 'EMP007', 'David', 'Mutasa', 'Tinashe', '63-789012-G-53', '+263777890123', 'd.mutasa@gweru.gov.zw', '147 Gwenoro Drive, Gweru', 'engineering', 'Senior Engineer', '2019-04-18', 'SE1', 1600.00, 'curr_001', 'CBZ-007-789129', 'TAX-007-462', 'active', 'emp_003', 'hr_manager'),
('emp_008', 'EMP008', 'Grace', 'Chirwa', 'Melody', '63-890123-H-54', '+263778901234', 'g.chirwa@gweru.gov.zw', '258 Midlands Avenue, Gweru', 'administration', 'HR Manager', '2018-12-03', 'HRM1', 1700.00, 'curr_001', 'CBZ-008-789130', 'TAX-008-463', 'active', 'emp_001', 'hr_manager'),
('emp_009', 'EMP009', 'Peter', 'Banda', 'Knowledge', '63-901234-I-55', '+263779012345', 'p.banda@gweru.gov.zw', '369 Industrial Road, Gweru', 'water', 'Water Engineer', '2021-08-25', 'WE1', 1400.00, 'curr_001', 'CBZ-009-789131', 'TAX-009-464', 'active', 'emp_003', 'hr_manager'),
('emp_010', 'EMP010', 'Susan', 'Ncube', 'Faith', '63-012345-J-56', '+263770123456', 's.ncube@gweru.gov.zw', '741 Senga Road, Gweru', 'housing', 'Housing Officer', '2022-01-15', 'HO1', 1200.00, 'curr_001', 'CBZ-010-789132', 'TAX-010-465', 'active', 'emp_004', 'hr_manager');

-- Payroll Runs
INSERT INTO payroll_runs (id, run_name, pay_period_start, pay_period_end, pay_date, currency_id, total_gross_pay, total_deductions, total_net_pay, status, processed_by) VALUES
('pr_001', 'January 2025 Payroll', '2025-01-01', '2025-01-31', '2025-01-31', 'curr_001', 17800.00, 4450.00, 13350.00, 'completed', 'payroll_officer'),
('pr_002', 'February 2025 Payroll', '2025-02-01', '2025-02-28', '2025-02-28', 'curr_001', 17800.00, 4450.00, 13350.00, 'processing', 'payroll_officer'),
('pr_003', 'December 2024 Bonus', '2024-12-01', '2024-12-31', '2024-12-20', 'curr_001', 8900.00, 1335.00, 7565.00, 'completed', 'payroll_manager');

-- Payroll Items
INSERT INTO payroll_items (id, payroll_run_id, employee_id, basic_salary, allowances, overtime_pay, gross_pay, tax_deduction, pension_deduction, medical_aid, other_deductions, net_pay) VALUES
('pi_001', 'pr_001', 'emp_001', 2500.00, 500.00, 0.00, 3000.00, 750.00, 250.00, 150.00, 100.00, 1750.00),
('pi_002', 'pr_001', 'emp_002', 2200.00, 400.00, 0.00, 2600.00, 650.00, 220.00, 130.00, 80.00, 1520.00),
('pi_003', 'pr_001', 'emp_003', 2000.00, 350.00, 100.00, 2450.00, 612.50, 200.00, 120.00, 75.00, 1442.50),
('pi_004', 'pr_001', 'emp_004', 1800.00, 300.00, 0.00, 2100.00, 525.00, 180.00, 105.00, 65.00, 1225.00),
('pi_005', 'pr_001', 'emp_005', 1900.00, 320.00, 50.00, 2270.00, 567.50, 190.00, 115.00, 70.00, 1327.50),
('pi_006', 'pr_001', 'emp_006', 1500.00, 250.00, 0.00, 1750.00, 437.50, 150.00, 87.50, 50.00, 1025.00),
('pi_007', 'pr_001', 'emp_007', 1600.00, 280.00, 80.00, 1960.00, 490.00, 160.00, 98.00, 60.00, 1152.00),
('pi_008', 'pr_001', 'emp_008', 1700.00, 300.00, 0.00, 2000.00, 500.00, 170.00, 100.00, 65.00, 1165.00),
('pi_009', 'pr_001', 'emp_009', 1400.00, 200.00, 120.00, 1720.00, 430.00, 140.00, 86.00, 55.00, 1009.00),
('pi_010', 'pr_001', 'emp_010', 1200.00, 150.00, 0.00, 1350.00, 337.50, 120.00, 67.50, 40.00, 785.00);

-- Leave Applications
INSERT INTO leave_applications (id, employee_id, leave_type_id, start_date, end_date, days_requested, reason, applied_date, status, approved_by, approved_date, comments) VALUES
('la_001', 'emp_001', 'lt_001', '2025-03-10', '2025-03-17', 8, 'Annual family vacation', '2025-02-15', 'approved', 'hr_manager', '2025-02-16', 'Approved - enjoy your vacation'),
('la_002', 'emp_006', 'lt_002', '2025-02-20', '2025-02-22', 3, 'Medical consultation', '2025-02-18', 'approved', 'emp_002', '2025-02-19', 'Medical certificate required'),
('la_003', 'emp_004', 'lt_003', '2025-04-01', '2025-07-08', 98, 'Maternity leave', '2025-02-10', 'approved', 'hr_manager', '2025-02-11', 'Congratulations! Full pay approved'),
('la_004', 'emp_007', 'lt_001', '2025-03-15', '2025-03-22', 8, 'Rest and relaxation', '2025-02-20', 'pending', null, null, 'Awaiting supervisor approval'),
('la_005', 'emp_009', 'lt_005', '2025-02-25', '2025-02-26', 2, 'Family bereavement', '2025-02-23', 'approved', 'emp_003', '2025-02-24', 'Sorry for your loss - approved'),
('la_006', 'emp_010', 'lt_006', '2025-04-15', '2025-04-29', 14, 'University examination preparation', '2025-02-22', 'pending', null, null, 'Pending documentation review'),
('la_007', 'emp_005', 'lt_001', '2025-05-01', '2025-05-10', 10, 'Annual leave - May holidays', '2025-02-25', 'pending', null, null, 'To be reviewed');

-- Performance Reviews
INSERT INTO performance_reviews (id, employee_id, review_period_start, review_period_end, review_date, reviewer_id, overall_rating, goals_achievement, strengths, areas_for_improvement, development_plan, comments, status) VALUES
('pr_rev_001', 'emp_006', '2024-07-01', '2024-12-31', '2025-01-15', 'emp_002', 4.2, 'Exceeded targets in financial reporting and budget management', 'Strong analytical skills, attention to detail, reliable', 'Communication with other departments, delegation skills', 'Attend communication workshop, take on team lead role', 'Excellent performance, ready for promotion consideration', 'completed'),
('pr_rev_002', 'emp_009', '2024-07-01', '2024-12-31', '2025-01-20', 'emp_003', 3.8, 'Met most objectives, good technical performance', 'Technical expertise, problem-solving, punctual', 'Time management, report writing', 'Technical writing course, project management training', 'Good solid performance, showing improvement', 'completed'),
('pr_rev_003', 'emp_010', '2024-07-01', '2024-12-31', '2025-01-25', 'emp_004', 3.5, 'Satisfactory performance, learning quickly', 'Eager to learn, good with residents, organized', 'Needs more experience, confidence building', 'Mentorship program, skills development workshops', 'New employee showing good potential', 'completed'),
('pr_rev_004', 'emp_007', '2024-07-01', '2024-12-31', '2025-02-01', 'emp_003', 4.0, 'Strong technical delivery, good project management', 'Engineering expertise, leadership, innovative', 'Documentation, budget planning', 'Project management certification, finance training', 'Strong technical performer, leadership potential', 'completed'),
('pr_rev_005', 'emp_005', '2024-07-01', '2024-12-31', '2025-02-05', 'emp_001', 4.5, 'Outstanding performance, exceeded all health targets', 'Strategic thinking, community engagement, results-driven', 'Work-life balance, delegation', 'Executive coaching, stress management workshop', 'Exceptional leader, ready for additional responsibilities', 'completed');

-- Update replit.md with current status
UPDATE SET last_updated = NOW();

COMMIT;