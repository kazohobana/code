-- Sample data for advanced meter billing system (corrected)
INSERT INTO system_modules (module_name, display_name, description, is_enabled, can_register_properties, created_at) VALUES
('meter-reading', 'Meter Reading', 'Water and electricity meter reading system', true, true, NOW()),
('billing', 'Billing System', 'Monthly bill generation and management', true, false, NOW()),
('payments', 'Payment Processing', 'Payment gateway integration and processing', true, false, NOW()),
('customer-portal', 'Customer Portal', 'Customer self-service portal', true, false, NOW()),
('audit', 'Audit System', 'System audit trail and logging', true, false, NOW())
ON CONFLICT (module_name) DO UPDATE SET
is_enabled = EXCLUDED.is_enabled,
can_register_properties = EXCLUDED.can_register_properties,
last_modified_at = NOW();

-- Sample billing rates
INSERT INTO billing_rates (rate_type, category, tier_min, tier_max, rate, fixed_charge, effective_date, created_by, created_at) VALUES
('water', 'domestic', 0.00, 10.00, 2.50, 15.00, '2024-01-01', 'admin', NOW()),
('water', 'commercial', 0.00, 50.00, 3.75, 25.00, '2024-01-01', 'admin', NOW()),
('electricity', 'domestic', 0.00, 100.00, 0.18, 12.00, '2024-01-01', 'admin', NOW()),
('electricity', 'commercial', 0.00, 500.00, 0.25, 35.00, '2024-01-01', 'admin', NOW()),
('property-rates', 'domestic', NULL, NULL, 150.00, 0.00, '2024-01-01', 'admin', NOW()),
('property-rates', 'commercial', NULL, NULL, 450.00, 0.00, '2024-01-01', 'admin', NOW());

-- Sample zones for multi-zone POS system
INSERT INTO zones (zone_name, zone_code, description, manager, address, contact_number, is_active, created_at) VALUES
('Central Zone', 'CZ01', 'Main city center payment point', 'manager-1', 'City Center Office, Main Street', '+263771234567', true, NOW()),
('North Zone', 'NZ01', 'Northern suburbs payment center', 'manager-2', 'Northside Branch, Kopje Road', '+263772345678', true, NOW()),
('South Zone', 'SZ01', 'Southern area payment facility', 'manager-3', 'Southgate Office, Mukamuri Road', '+263773456789', true, NOW()),
('Industrial Zone', 'IZ01', 'Industrial area payment center', 'manager-4', 'Industrial Area Office, Factory Road', '+263774567890', true, NOW());

-- Sample POS terminals
INSERT INTO pos_terminals (terminal_id, terminal_name, zone_id, operator_id, status, daily_limit, current_day_total, created_at) VALUES
('POS-CZ-001', 'Central Counter 1', (SELECT id FROM zones WHERE zone_code = 'CZ01' LIMIT 1), 'operator-1', 'active', 10000.00, 0.00, NOW()),
('POS-CZ-002', 'Central Counter 2', (SELECT id FROM zones WHERE zone_code = 'CZ01' LIMIT 1), 'operator-2', 'active', 10000.00, 0.00, NOW()),
('POS-NZ-001', 'North Counter 1', (SELECT id FROM zones WHERE zone_code = 'NZ01' LIMIT 1), 'operator-3', 'active', 5000.00, 0.00, NOW()),
('POS-SZ-001', 'South Counter 1', (SELECT id FROM zones WHERE zone_code = 'SZ01' LIMIT 1), 'operator-4', 'active', 5000.00, 0.00, NOW()),
('POS-IZ-001', 'Industrial Counter 1', (SELECT id FROM zones WHERE zone_code = 'IZ01' LIMIT 1), 'operator-5', 'active', 15000.00, 0.00, NOW());

-- Sample meters (water and electricity)
INSERT INTO meters (meter_number, meter_type, property_id, status, serial_number, manufacturer, installation_date, multiplier, created_by, created_at) VALUES
('WM-2024-001', 'water', (SELECT id FROM properties LIMIT 1 OFFSET 0), 'active', 'W123456789', 'Sensus', '2024-01-15', 1.00, 'meter-reader-1', NOW()),
('WM-2024-002', 'water', (SELECT id FROM properties LIMIT 1 OFFSET 1), 'active', 'W123456790', 'Sensus', '2024-01-16', 1.00, 'meter-reader-1', NOW()),
('WM-2024-003', 'water', (SELECT id FROM properties LIMIT 1 OFFSET 2), 'active', 'W123456791', 'Neptune', '2024-01-17', 1.00, 'meter-reader-2', NOW()),
('EM-2024-001', 'electricity', (SELECT id FROM properties LIMIT 1 OFFSET 0), 'active', 'E987654321', 'Landis+Gyr', '2024-01-15', 1.00, 'meter-reader-1', NOW()),
('EM-2024-002', 'electricity', (SELECT id FROM properties LIMIT 1 OFFSET 1), 'active', 'E987654322', 'Schneider', '2024-01-16', 1.00, 'meter-reader-1', NOW()),
('EM-2024-003', 'electricity', (SELECT id FROM properties LIMIT 1 OFFSET 2), 'active', 'E987654323', 'Landis+Gyr', '2024-01-17', 1.00, 'meter-reader-2', NOW());

-- Sample customer accounts
INSERT INTO customer_accounts (account_number, customer_name, customer_email, customer_phone, property_id, account_type, current_balance, payment_terms, status, created_at) VALUES
('ACC-2024-001', 'Robert Mukamuri', 'robert.mukamuri@email.com', '+263771111111', (SELECT id FROM properties LIMIT 1 OFFSET 0), 'individual', 275.50, 30, 'active', NOW()),
('ACC-2024-002', 'Susan Charamba', 'susan.charamba@email.com', '+263772222222', (SELECT id FROM properties LIMIT 1 OFFSET 1), 'individual', 1240.75, 30, 'active', NOW()),
('ACC-2024-003', 'Gweru Manufacturing Ltd', 'accounts@gwerumfg.co.zw', '+263773333333', (SELECT id FROM properties LIMIT 1 OFFSET 2), 'business', 3850.00, 30, 'active', NOW()),
('ACC-2024-004', 'Mary Ndamba', 'mary.ndamba@email.com', '+263774444444', (SELECT id FROM properties LIMIT 1 OFFSET 3), 'individual', 0.00, 30, 'active', NOW()),
('ACC-2024-005', 'City View Hotel', 'manager@cityviewhotel.co.zw', '+263775555555', (SELECT id FROM properties LIMIT 1 OFFSET 4), 'business', 2130.25, 30, 'active', NOW());

-- Sample meter readings for current month
INSERT INTO meter_readings (meter_id, reading_value, previous_reading, consumption, reading_date, read_by, billing_period, status, created_at) VALUES
((SELECT id FROM meters WHERE meter_number = 'WM-2024-001' LIMIT 1), 1250.75, 1180.25, 70.50, '2024-08-01', 'meter-reader-1', '2024-08', 'active', NOW()),
((SELECT id FROM meters WHERE meter_number = 'WM-2024-002' LIMIT 1), 2840.50, 2720.00, 120.50, '2024-08-01', 'meter-reader-1', '2024-08', 'active', NOW()),
((SELECT id FROM meters WHERE meter_number = 'WM-2024-003' LIMIT 1), 5670.25, 5250.75, 419.50, '2024-08-01', 'meter-reader-2', '2024-08', 'active', NOW()),
((SELECT id FROM meters WHERE meter_number = 'EM-2024-001' LIMIT 1), 8540.75, 8320.25, 220.50, '2024-08-01', 'meter-reader-1', '2024-08', 'active', NOW()),
((SELECT id FROM meters WHERE meter_number = 'EM-2024-002' LIMIT 1), 12750.00, 12450.00, 300.00, '2024-08-01', 'meter-reader-1', '2024-08', 'active', NOW()),
((SELECT id FROM meters WHERE meter_number = 'EM-2024-003' LIMIT 1), 18920.75, 18340.25, 580.50, '2024-08-01', 'meter-reader-2', '2024-08', 'active', NOW());

-- Sample monthly bills
INSERT INTO monthly_bills (bill_number, account_id, billing_period, due_date, water_charges, electricity_charges, property_rates, refuse_charges, sewerage_charges, total_amount, amount_paid, balance, status, generated_by, generated_at) VALUES
('BILL-2024-08-001', 'ACC-2024-001', '2024-08', '2024-08-31', 176.25, 39.69, 150.00, 25.00, 15.00, 405.94, 130.44, 275.50, 'unpaid', 'billing-system', NOW()),
('BILL-2024-08-002', 'ACC-2024-002', '2024-08', '2024-08-31', 301.25, 54.00, 150.00, 25.00, 15.00, 545.25, 0.00, 545.25, 'unpaid', 'billing-system', NOW()),
('BILL-2024-08-003', 'ACC-2024-003', '2024-08', '2024-08-31', 1048.75, 145.13, 450.00, 75.00, 45.00, 1763.88, 0.00, 1763.88, 'unpaid', 'billing-system', NOW()),
('BILL-2024-08-004', 'ACC-2024-004', '2024-08', '2024-08-31', 125.00, 32.50, 150.00, 25.00, 15.00, 347.50, 347.50, 0.00, 'paid', 'billing-system', NOW()),
('BILL-2024-08-005', 'ACC-2024-005', '2024-08', '2024-08-31', 890.25, 98.75, 450.00, 75.00, 45.00, 1559.00, 0.00, 1559.00, 'unpaid', 'billing-system', NOW());

-- Sample payments
INSERT INTO payments (payment_number, receipt_number, account_id, zone_id, amount, payment_method, payment_gateway, transaction_reference, operator_id, payment_date, status, created_at) VALUES
('PAY-2024-001', 'RCP-00001', 'ACC-2024-001', (SELECT id FROM zones WHERE zone_code = 'CZ01' LIMIT 1), 130.44, 'cash', 'pos', 'CASH-001', 'operator-1', NOW() - INTERVAL '2 days', 'completed', NOW() - INTERVAL '2 days'),
('PAY-2024-002', 'RCP-00002', 'ACC-2024-004', (SELECT id FROM zones WHERE zone_code = 'NZ01' LIMIT 1), 347.50, 'mobile-money', 'paynow', 'PN-ZW-789456', 'mobile-customer', NOW() - INTERVAL '1 day', 'completed', NOW() - INTERVAL '1 day'),
('PAY-2024-003', 'RCP-00003', 'ACC-2024-002', (SELECT id FROM zones WHERE zone_code = 'CZ01' LIMIT 1), 200.00, 'card', 'payfast', 'PF-SA-123789', 'online-customer', NOW() - INTERVAL '3 hours', 'pending', NOW() - INTERVAL '3 hours');

-- Sample payment gateways configuration
INSERT INTO payment_gateways (gateway_name, display_name, is_enabled, api_endpoint, merchant_id, integration_key, test_mode, supported_methods, created_at) VALUES
('paynow', 'PayNow Zimbabwe', true, 'https://www.paynow.co.zw/interface/', '12345', 'hashed_api_key_paynow', false, ARRAY['mobile-money'], NOW()),
('payfast', 'PayFast South Africa', true, 'https://www.payfast.co.za/eng/process', '10000100', 'hashed_api_key_payfast', false, ARRAY['card', 'bank-transfer'], NOW()),
('pos', 'POS Terminal', true, NULL, 'GWERU-POS', 'local_terminal', false, ARRAY['cash', 'card'], NOW());

-- Sample property registration requests
INSERT INTO property_registration_requests (request_number, property_address, owner_name, owner_contact, property_type, meter_number, meter_type, requested_by, status, created_at) VALUES
('PR-2024-001', '15 Mukamuri Drive, Senga', 'Joseph Chinamatira', '+263776666666', 'residential', 'WM-NEW-001', 'water', 'meter-reader-1', 'pending', NOW()),
('PR-2024-002', '127 Industrial Road, Gweru', 'TechnoServe Industries', '+263777777777', 'industrial', 'EM-NEW-001', 'electricity', 'meter-reader-2', 'pending', NOW()),
('PR-2024-003', '8 Kopje Avenue, Woodlands', 'Grace Mafukidze', '+263778888888', 'residential', NULL, 'water', 'meter-reader-1', 'approved', NOW() - INTERVAL '2 days');

-- Sample audit logs for system activity
INSERT INTO audit_log (table_name, record_id, action, old_values, new_values, changed_fields, user_id, user_name, user_department, module, description, timestamp) VALUES
('meters', (SELECT id FROM meters WHERE meter_number = 'WM-2024-001' LIMIT 1), 'INSERT', NULL, '{"meter_number":"WM-2024-001","meter_type":"water"}', ARRAY['meter_number','meter_type','status'], 'meter-reader-1', 'John Mutindi', 'utilities', 'Meter Management', 'Created new water meter WM-2024-001', NOW() - INTERVAL '7 days'),
('meter_readings', (SELECT id FROM meter_readings WHERE meter_id = (SELECT id FROM meters WHERE meter_number = 'WM-2024-001' LIMIT 1) LIMIT 1), 'INSERT', NULL, '{"reading_value":"1250.75","consumption":"70.50"}', ARRAY['reading_value','consumption'], 'meter-reader-1', 'John Mutindi', 'utilities', 'Meter Reading', 'Recorded meter reading: 1250.75 units', NOW() - INTERVAL '1 day'),
('payments', (SELECT id FROM payments WHERE payment_number = 'PAY-2024-001' LIMIT 1), 'INSERT', NULL, '{"amount":"130.44","payment_method":"cash"}', ARRAY['amount','payment_method','status'], 'operator-1', 'Grace Mukamuri', 'finance', 'Payment Processing', 'Processed payment PAY-2024-001 of $130.44 via cash', NOW() - INTERVAL '2 days'),
('system_modules', 'meter-reading', 'UPDATE', '{"is_enabled":false}', '{"is_enabled":true}', ARRAY['is_enabled'], 'admin', 'System Administrator', 'admin', 'System Administration', 'Enabled meter-reading module', NOW() - INTERVAL '30 days'),
('customer_accounts', 'ACC-2024-001', 'UPDATE', '{"current_balance":"405.94"}', '{"current_balance":"275.50"}', ARRAY['current_balance'], 'operator-1', 'Grace Mukamuri', 'finance', 'Payment Processing', 'Updated customer balance after payment', NOW() - INTERVAL '2 days');

-- System settings for configuration
INSERT INTO system_settings (setting_key, setting_value, setting_type, description, category, created_at) VALUES
('billing.auto_generate', 'true', 'boolean', 'Automatically generate monthly bills', 'billing', NOW()),
('billing.due_days', '30', 'string', 'Number of days after bill generation before due', 'billing', NOW()),
('payments.paynow_enabled', 'true', 'boolean', 'Enable PayNow payment gateway', 'payments', NOW()),
('payments.payfast_enabled', 'true', 'boolean', 'Enable PayFast payment gateway', 'payments', NOW()),
('general.company_name', 'City of Gweru', 'string', 'Official company name for documents', 'general', NOW()),
('general.contact_email', 'info@gweru.gov.zw', 'string', 'Primary contact email address', 'general', NOW()),
('security.session_timeout', '3600', 'string', 'Session timeout in seconds', 'security', NOW()),
('security.password_expiry', '90', 'string', 'Password expiry in days', 'security', NOW());
