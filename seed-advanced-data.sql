-- Sample data for advanced meter billing system
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
INSERT INTO billing_rates (rate_type, category, rate_amount, unit, effective_date, created_by, created_at) VALUES
('water', 'residential', '2.50', 'per_kl', '2024-01-01', 'admin', NOW()),
('water', 'commercial', '3.75', 'per_kl', '2024-01-01', 'admin', NOW()),
('electricity', 'residential', '0.18', 'per_kwh', '2024-01-01', 'admin', NOW()),
('electricity', 'commercial', '0.25', 'per_kwh', '2024-01-01', 'admin', NOW()),
('rates', 'residential', '150.00', 'monthly', '2024-01-01', 'admin', NOW()),
('rates', 'commercial', '450.00', 'monthly', '2024-01-01', 'admin', NOW());

-- Sample zones for multi-zone POS system
INSERT INTO zones (zone_name, zone_code, address, manager_name, contact_phone, is_active, created_at) VALUES
('Central Zone', 'CZ01', 'City Center Office, Main Street', 'Mary Chikwanha', '+263771234567', true, NOW()),
('North Zone', 'NZ01', 'Northside Branch, Kopje Road', 'James Mutindi', '+263772345678', true, NOW()),
('South Zone', 'SZ01', 'Southgate Office, Mukamuri Road', 'Sarah Moyo', '+263773456789', true, NOW()),
('Industrial Zone', 'IZ01', 'Industrial Area Office, Factory Road', 'Peter Ndamba', '+263774567890', true, NOW());

-- Sample POS terminals
INSERT INTO pos_terminals (zone_id, terminal_code, terminal_name, operator_name, status, daily_total, last_sync, created_at) VALUES
((SELECT id FROM zones WHERE zone_code = 'CZ01' LIMIT 1), 'POS-CZ-001', 'Central Counter 1', 'Grace Mukamuri', 'active', '0.00', NOW(), NOW()),
((SELECT id FROM zones WHERE zone_code = 'CZ01' LIMIT 1), 'POS-CZ-002', 'Central Counter 2', 'John Sibanda', 'active', '0.00', NOW(), NOW()),
((SELECT id FROM zones WHERE zone_code = 'NZ01' LIMIT 1), 'POS-NZ-001', 'North Counter 1', 'Faith Chingono', 'active', '0.00', NOW(), NOW()),
((SELECT id FROM zones WHERE zone_code = 'SZ01' LIMIT 1), 'POS-SZ-001', 'South Counter 1', 'David Magwaro', 'active', '0.00', NOW(), NOW()),
((SELECT id FROM zones WHERE zone_code = 'IZ01' LIMIT 1), 'POS-IZ-001', 'Industrial Counter 1', 'Rebecca Charamba', 'active', '0.00', NOW(), NOW());

-- Sample meters (water and electricity)
INSERT INTO meters (meter_number, meter_type, property_id, status, serial_number, manufacturer, installation_date, multiplier, created_by, created_at) VALUES
('WM-2024-001', 'water', (SELECT id FROM properties LIMIT 1 OFFSET 0), 'active', 'W123456789', 'Sensus', '2024-01-15', '1.00', 'meter-reader-1', NOW()),
('WM-2024-002', 'water', (SELECT id FROM properties LIMIT 1 OFFSET 1), 'active', 'W123456790', 'Sensus', '2024-01-16', '1.00', 'meter-reader-1', NOW()),
('WM-2024-003', 'water', (SELECT id FROM properties LIMIT 1 OFFSET 2), 'active', 'W123456791', 'Neptune', '2024-01-17', '1.00', 'meter-reader-2', NOW()),
('EM-2024-001', 'electricity', (SELECT id FROM properties LIMIT 1 OFFSET 0), 'active', 'E987654321', 'Landis+Gyr', '2024-01-15', '1.00', 'meter-reader-1', NOW()),
('EM-2024-002', 'electricity', (SELECT id FROM properties LIMIT 1 OFFSET 1), 'active', 'E987654322', 'Schneider', '2024-01-16', '1.00', 'meter-reader-1', NOW()),
('EM-2024-003', 'electricity', (SELECT id FROM properties LIMIT 1 OFFSET 2), 'active', 'E987654323', 'Landis+Gyr', '2024-01-17', '1.00', 'meter-reader-2', NOW());

-- Sample customer accounts
INSERT INTO customer_accounts (account_number, customer_name, customer_email, customer_phone, property_id, account_type, current_balance, payment_terms, status, created_at) VALUES
('ACC-2024-001', 'Robert Mukamuri', 'robert.mukamuri@email.com', '+263771111111', (SELECT id FROM properties LIMIT 1 OFFSET 0), 'residential', '275.50', 30, 'active', NOW()),
('ACC-2024-002', 'Susan Charamba', 'susan.charamba@email.com', '+263772222222', (SELECT id FROM properties LIMIT 1 OFFSET 1), 'residential', '1,240.75', 30, 'active', NOW()),
('ACC-2024-003', 'Gweru Manufacturing Ltd', 'accounts@gwerumfg.co.zw', '+263773333333', (SELECT id FROM properties LIMIT 1 OFFSET 2), 'commercial', '3,850.00', 30, 'active', NOW()),
('ACC-2024-004', 'Mary Ndamba', 'mary.ndamba@email.com', '+263774444444', (SELECT id FROM properties LIMIT 1 OFFSET 3), 'residential', '0.00', 30, 'active', NOW()),
('ACC-2024-005', 'City View Hotel', 'manager@cityviewhotel.co.zw', '+263775555555', (SELECT id FROM properties LIMIT 1 OFFSET 4), 'commercial', '2,130.25', 30, 'active', NOW());

-- Sample meter readings for current month
INSERT INTO meter_readings (meter_id, reading_value, previous_reading, consumption, reading_date, billing_period, read_by, status, created_at) VALUES
((SELECT id FROM meters WHERE meter_number = 'WM-2024-001' LIMIT 1), '1250.75', '1180.25', '70.50', '2024-08-01', '2024-08', 'meter-reader-1', 'active', NOW()),
((SELECT id FROM meters WHERE meter_number = 'WM-2024-002' LIMIT 1), '2840.50', '2720.00', '120.50', '2024-08-01', '2024-08', 'meter-reader-1', 'active', NOW()),
((SELECT id FROM meters WHERE meter_number = 'WM-2024-003' LIMIT 1), '5670.25', '5250.75', '419.50', '2024-08-01', '2024-08', 'meter-reader-2', 'active', NOW()),
((SELECT id FROM meters WHERE meter_number = 'EM-2024-001' LIMIT 1), '8540.75', '8320.25', '220.50', '2024-08-01', '2024-08', 'meter-reader-1', 'active', NOW()),
((SELECT id FROM meters WHERE meter_number = 'EM-2024-002' LIMIT 1), '12750.00', '12450.00', '300.00', '2024-08-01', '2024-08', 'meter-reader-1', 'active', NOW()),
((SELECT id FROM meters WHERE meter_number = 'EM-2024-003' LIMIT 1), '18920.75', '18340.25', '580.50', '2024-08-01', '2024-08', 'meter-reader-2', 'active', NOW());

-- Sample monthly bills
INSERT INTO monthly_bills (bill_number, account_id, billing_period, due_date, water_charges, electricity_charges, property_rates, refuse_charges, sewerage_charges, total_amount, amount_paid, balance, status, generated_by, generated_at) VALUES
('BILL-2024-08-001', 'ACC-2024-001', '2024-08', '2024-08-31', '176.25', '39.69', '150.00', '25.00', '15.00', '405.94', '130.44', '275.50', 'unpaid', 'billing-system', NOW()),
('BILL-2024-08-002', 'ACC-2024-002', '2024-08', '2024-08-31', '301.25', '54.00', '150.00', '25.00', '15.00', '545.25', '0.00', '545.25', 'unpaid', 'billing-system', NOW()),
('BILL-2024-08-003', 'ACC-2024-003', '2024-08', '2024-08-31', '1,048.75', '145.13', '450.00', '75.00', '45.00', '1,763.88', '0.00', '1,763.88', 'unpaid', 'billing-system', NOW()),
('BILL-2024-08-004', 'ACC-2024-004', '2024-08', '2024-08-31', '125.00', '32.50', '150.00', '25.00', '15.00', '347.50', '347.50', '0.00', 'paid', 'billing-system', NOW()),
('BILL-2024-08-005', 'ACC-2024-005', '2024-08', '2024-08-31', '890.25', '98.75', '450.00', '75.00', '45.00', '1,559.00', '0.00', '1,559.00', 'unpaid', 'billing-system', NOW());

-- Sample payments
INSERT INTO payments (payment_number, receipt_number, account_id, zone_id, amount, payment_method, payment_gateway, transaction_reference, operator_id, payment_date, status, created_at) VALUES
('PAY-2024-001', 'RCP-00001', 'ACC-2024-001', (SELECT id FROM zones WHERE zone_code = 'CZ01' LIMIT 1), '130.44', 'cash', 'pos', 'CASH-001', 'pos-operator-1', NOW() - INTERVAL '2 days', 'completed', NOW() - INTERVAL '2 days'),
('PAY-2024-002', 'RCP-00002', 'ACC-2024-004', (SELECT id FROM zones WHERE zone_code = 'NZ01' LIMIT 1), '347.50', 'paynow', 'paynow', 'PN-ZW-789456', 'mobile-customer', NOW() - INTERVAL '1 day', 'completed', NOW() - INTERVAL '1 day'),
('PAY-2024-003', 'RCP-00003', 'ACC-2024-002', (SELECT id FROM zones WHERE zone_code = 'CZ01' LIMIT 1), '200.00', 'card', 'payfast', 'PF-SA-123789', 'online-customer', NOW() - INTERVAL '3 hours', 'pending', NOW() - INTERVAL '3 hours');

-- Sample payment gateways configuration
INSERT INTO payment_gateways (gateway_name, display_name, gateway_type, is_enabled, merchant_id, api_key_hash, webhook_url, supported_currencies, transaction_fee, created_at) VALUES
('paynow', 'PayNow Zimbabwe', 'mobile_money', true, '12345', 'hashed_api_key_paynow', 'https://gweru-council.com/api/webhooks/paynow', '["ZWL","USD"]', '2.5', NOW()),
('payfast', 'PayFast South Africa', 'card_payment', true, '10000100', 'hashed_api_key_payfast', 'https://gweru-council.com/api/webhooks/payfast', '["ZAR","USD"]', '3.0', NOW()),
('pos', 'POS Terminal', 'cash_card', true, 'GWERU-POS', 'local_terminal', NULL, '["ZWL","USD"]', '0.0', NOW());

-- Sample property registration requests
INSERT INTO property_registration_requests (request_number, property_address, owner_name, owner_contact, property_type, meter_number, meter_type, estimated_occupancy, notes, status, requested_by, created_at) VALUES
('PR-2024-001', '15 Mukamuri Drive, Senga', 'Joseph Chinamatira', '+263776666666', 'residential', 'WM-NEW-001', 'water', 4, 'New residential property, needs water connection', 'pending', 'meter-reader-1', NOW()),
('PR-2024-002', '127 Industrial Road, Gweru', 'TechnoServe Industries', '+263777777777', 'industrial', 'EM-NEW-001', 'electricity', 50, 'New factory requiring 3-phase electricity', 'pending', 'meter-reader-2', NOW()),
('PR-2024-003', '8 Kopje Avenue, Woodlands', 'Grace Mafukidze', '+263778888888', 'residential', NULL, 'water', 6, 'Property exists but no meter installed yet', 'approved', 'meter-reader-1', NOW() - INTERVAL '2 days');

-- Sample audit logs for system activity
INSERT INTO audit_log (table_name, record_id, action, old_values, new_values, changed_fields, user_id, user_name, user_department, module, description, timestamp) VALUES
('meters', (SELECT id FROM meters WHERE meter_number = 'WM-2024-001' LIMIT 1), 'INSERT', NULL, '{"meter_number":"WM-2024-001","meter_type":"water"}', '["meter_number","meter_type","status"]', 'meter-reader-1', 'John Mutindi', 'utilities', 'Meter Management', 'Created new water meter WM-2024-001', NOW() - INTERVAL '7 days'),
('meter_readings', (SELECT id FROM meter_readings WHERE meter_id = (SELECT id FROM meters WHERE meter_number = 'WM-2024-001' LIMIT 1) LIMIT 1), 'INSERT', NULL, '{"reading_value":"1250.75","consumption":"70.50"}', '["reading_value","consumption"]', 'meter-reader-1', 'John Mutindi', 'utilities', 'Meter Reading', 'Recorded meter reading: 1250.75 units', NOW() - INTERVAL '1 day'),
('payments', (SELECT id FROM payments WHERE payment_number = 'PAY-2024-001' LIMIT 1), 'INSERT', NULL, '{"amount":"130.44","payment_method":"cash"}', '["amount","payment_method","status"]', 'pos-operator-1', 'Grace Mukamuri', 'finance', 'Payment Processing', 'Processed payment PAY-2024-001 of $130.44 via cash', NOW() - INTERVAL '2 days'),
('system_modules', 'meter-reading', 'UPDATE', '{"is_enabled":false}', '{"is_enabled":true}', '["is_enabled"]', 'admin', 'System Administrator', 'admin', 'System Administration', 'Enabled meter-reading module', NOW() - INTERVAL '30 days'),
('customer_accounts', 'ACC-2024-001', 'UPDATE', '{"current_balance":"405.94"}', '{"current_balance":"275.50"}', '["current_balance"]', 'pos-operator-1', 'Grace Mukamuri', 'finance', 'Payment Processing', 'Updated customer balance after payment', NOW() - INTERVAL '2 days');

-- System settings for configuration
INSERT INTO system_settings (setting_key, setting_value, setting_type, description, category, created_at) VALUES
('billing.auto_generate', 'true', 'boolean', 'Automatically generate monthly bills', 'billing', NOW()),
('billing.due_days', '30', 'integer', 'Number of days after bill generation before due', 'billing', NOW()),
('payments.paynow_enabled', 'true', 'boolean', 'Enable PayNow payment gateway', 'payments', NOW()),
('payments.payfast_enabled', 'true', 'boolean', 'Enable PayFast payment gateway', 'payments', NOW()),
('general.company_name', 'City of Gweru', 'string', 'Official company name for documents', 'general', NOW()),
('general.contact_email', 'info@gweru.gov.zw', 'string', 'Primary contact email address', 'general', NOW()),
('security.session_timeout', '3600', 'integer', 'Session timeout in seconds', 'security', NOW()),
('security.password_expiry', '90', 'integer', 'Password expiry in days', 'security', NOW());
