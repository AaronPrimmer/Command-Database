-- Suppliers seed data
INSERT INTO suppliers (name, email, phone) VALUES
('Office Depot Supply Co.', 'sales@officedepot.com', '555-0101'),
('Premier Stationery Ltd.', 'contact@premierstationery.com', '555-0102'),
('Global Office Solutions', 'info@globaloffice.com', '555-0103'),
('Corporate Supply Group', 'orders@corpsupply.com', '555-0104'),
('Business Essentials Inc.', 'support@bizessentials.com', '555-0105'),
('Metro Office Distributors', 'sales@metrooffice.com', '555-0106'),
('Workspace Solutions LLC', 'info@workspacesolutions.com', '555-0107'),
('Professional Office Supplies', 'contact@prosupplies.com', '555-0108'),
('Elite Business Products', 'sales@elitebusiness.com', '555-0109'),
('Modern Office Outfitters', 'orders@modernoffice.com', '555-0110'),
('Quality Desk Supplies', 'info@qualitydesk.com', '555-0111'),
('Executive Office Group', 'contact@execoffice.com', '555-0112');

-- Products seed data
INSERT INTO products (name, category, price, quantity, supplier_id) VALUES
-- Writing Instruments
('Blue Ballpoint Pens (12-pack)', 'Writing Instruments', 8.99, 150, 1),
('Black Gel Pens (24-pack)', 'Writing Instruments', 15.49, 200, 1),
('Mechanical Pencils (10-pack)', 'Writing Instruments', 12.99, 175, 2),
('Highlighters Assorted Colors (8-pack)', 'Writing Instruments', 6.99, 250, 2),
('Permanent Markers Black (12-pack)', 'Writing Instruments', 14.99, 100, 3),
('Dry Erase Markers (6-pack)', 'Writing Instruments', 9.99, 180, 3),
('Fine Point Pens Red (12-pack)', 'Writing Instruments', 10.49, 120, 4),
('Correction Pens (3-pack)', 'Writing Instruments', 7.99, 90, 4),

-- Paper Products
('Copy Paper 8.5x11 (500 sheets)', 'Paper Products', 7.49, 500, 1),
('Premium Paper 8.5x11 (200 sheets)', 'Paper Products', 12.99, 300, 2),
('Sticky Notes 3x3 (12 pads)', 'Paper Products', 8.99, 400, 2),
('Legal Pads Yellow (6-pack)', 'Paper Products', 11.49, 250, 3),
('Index Cards 3x5 (500 count)', 'Paper Products', 5.99, 350, 3),
('Cardstock White (100 sheets)', 'Paper Products', 9.99, 200, 4),
('Notebooks College Ruled (5-pack)', 'Paper Products', 13.99, 180, 4),
('Printer Paper Legal Size (500 sheets)', 'Paper Products', 9.49, 275, 5),
('Construction Paper Assorted (50 sheets)', 'Paper Products', 6.99, 150, 5),
('Memo Pads (10-pack)', 'Paper Products', 7.99, 220, 6),

-- Filing & Organization
('File Folders Letter Size (100-pack)', 'Filing & Organization', 16.99, 200, 5),
('Hanging File Folders (25-pack)', 'Filing & Organization', 19.99, 150, 5),
('Binder Clips Assorted (60-pack)', 'Filing & Organization', 8.49, 300, 6),
('Paper Clips Large (100-pack)', 'Filing & Organization', 4.99, 400, 6),
('3-Ring Binders 1-inch (4-pack)', 'Filing & Organization', 14.99, 175, 7),
('Expanding File Folder 13-pocket', 'Filing & Organization', 12.99, 100, 7),
('File Cabinet Dividers (25-pack)', 'Filing & Organization', 9.99, 125, 8),
('Desktop Organizer Tray', 'Filing & Organization', 18.99, 80, 8),
('Magazine File Holder', 'Filing & Organization', 11.49, 110, 9),
('Document Storage Boxes (12-pack)', 'Filing & Organization', 24.99, 60, 9),

-- Desk Accessories
('Stapler Heavy Duty', 'Desk Accessories', 22.99, 95, 7),
('Staples Standard (5000-pack)', 'Desk Accessories', 6.99, 500, 8),
('Tape Dispenser Desktop', 'Desk Accessories', 9.99, 140, 8),
('Scissors 8-inch', 'Desk Accessories', 7.49, 200, 9),
('Ruler 12-inch Plastic', 'Desk Accessories', 2.99, 300, 9),
('Hole Punch 3-hole', 'Desk Accessories', 15.99, 120, 10),
('Pencil Sharpener Electric', 'Desk Accessories', 29.99, 75, 10),
('Pencil Cup Mesh', 'Desk Accessories', 8.99, 160, 11),
('Desk Pad Calendar 2026', 'Desk Accessories', 13.49, 110, 11),
('Letter Opener Metal', 'Desk Accessories', 5.99, 180, 12),

-- Technology & Electronics
('USB Flash Drive 32GB', 'Technology', 12.99, 250, 10),
('Wireless Mouse', 'Technology', 24.99, 150, 10),
('Keyboard Wireless', 'Technology', 39.99, 100, 11),
('USB-C Cable 6ft', 'Technology', 9.99, 300, 11),
('Power Strip 6-outlet', 'Technology', 19.99, 125, 12),
('HDMI Cable 6ft', 'Technology', 11.99, 200, 12),
('Webcam 1080p', 'Technology', 49.99, 80, 1),
('Headphones with Microphone', 'Technology', 34.99, 110, 2),
('Laptop Stand Adjustable', 'Technology', 29.99, 90, 3),
('Monitor Riser', 'Technology', 24.99, 100, 4),

-- Mailing & Shipping
('Envelopes #10 (500-pack)', 'Mailing & Shipping', 14.99, 200, 1),
('Bubble Mailers 6x9 (25-pack)', 'Mailing & Shipping', 16.99, 150, 2),
('Packing Tape 2-inch (6-pack)', 'Mailing & Shipping', 12.99, 180, 3),
('Shipping Labels 2x4 (500-pack)', 'Mailing & Shipping', 11.99, 220, 4),
('Postage Scale Digital', 'Mailing & Shipping', 34.99, 65, 5),
('Manila Envelopes 9x12 (100-pack)', 'Mailing & Shipping', 18.99, 140, 6),
('Padded Envelopes (50-pack)', 'Mailing & Shipping', 22.99, 110, 7),
('Address Labels (1400-pack)', 'Mailing & Shipping', 9.99, 250, 8),

-- Furniture & Storage
('Ergonomic Office Chair', 'Furniture', 199.99, 45, 6),
('Adjustable Height Desk', 'Furniture', 349.99, 30, 7),
('Bookshelf 5-tier', 'Furniture', 89.99, 50, 8),
('Filing Cabinet 2-drawer', 'Furniture', 129.99, 40, 9),
('Storage Cabinet with Lock', 'Furniture', 159.99, 35, 10),
('Computer Desk L-shaped', 'Furniture', 249.99, 25, 11),
('Rolling Cart 3-tier', 'Furniture', 54.99, 60, 12),

-- Breakroom Supplies
('Coffee K-Cups (24-pack)', 'Breakroom', 16.99, 200, 1),
('Paper Towels (12 rolls)', 'Breakroom', 18.99, 150, 2),
('Disposable Cups 12oz (100-pack)', 'Breakroom', 8.99, 250, 3),
('Plastic Utensils (200-pack)', 'Breakroom', 9.99, 180, 4),
('Paper Plates 9-inch (100-pack)', 'Breakroom', 7.99, 220, 5),
('Napkins (500-pack)', 'Breakroom', 6.99, 300, 6),
('Coffee Filters (200-pack)', 'Breakroom', 5.99, 190, 7),
('Creamer Individual (50-pack)', 'Breakroom', 11.99, 160, 8),

-- Cleaning Supplies
('Disinfecting Wipes (3-pack)', 'Cleaning', 12.99, 200, 9),
('Multi-Surface Cleaner Spray', 'Cleaning', 6.99, 250, 10),
('Hand Sanitizer 16oz', 'Cleaning', 8.99, 300, 11),
('Trash Bags 13-gallon (50-pack)', 'Cleaning', 14.99, 150, 12),
('Microfiber Cleaning Cloths (24-pack)', 'Cleaning', 15.99, 120, 1),
('Air Freshener Spray', 'Cleaning', 4.99, 280, 2),
('Glass Cleaner Spray', 'Cleaning', 5.99, 240, 3),

-- Presentation Supplies
('Whiteboard 36x24', 'Presentation', 44.99, 70, 4),
('Flip Chart Pads (2-pack)', 'Presentation', 19.99, 90, 5),
('Easel Tripod Adjustable', 'Presentation', 64.99, 50, 6),
('Laser Pointer with Remote', 'Presentation', 29.99, 85, 7),
('Binder Dividers 8-tab (5 sets)', 'Presentation', 11.99, 140, 8),
('Sheet Protectors (100-pack)', 'Presentation', 13.99, 170, 9),
('Report Covers Clear (25-pack)', 'Presentation', 16.99, 130, 10),
('Business Card Holders', 'Presentation', 8.99, 200, 11),

-- Labels & Stamps
('Label Maker Portable', 'Labels & Stamps', 39.99, 75, 11),
('Label Tape Refills (3-pack)', 'Labels & Stamps', 18.99, 100, 12),
('Self-Inking Stamp Custom', 'Labels & Stamps', 24.99, 60, 1),
('Stamp Pad Replacement', 'Labels & Stamps', 6.99, 150, 2),
('File Folder Labels (500-pack)', 'Labels & Stamps', 9.99, 180, 3),
('Round Color-Coding Labels (1000-pack)', 'Labels & Stamps', 7.99, 220, 4),

-- Calendars & Planners
('Wall Calendar 2026', 'Planning', 12.99, 140, 5),
('Daily Planner 2026', 'Planning', 18.99, 110, 6),
('Weekly Planner Spiral', 'Planning', 15.99, 125, 7),
('Desk Calendar Stand', 'Planning', 9.99, 160, 8),
('Appointment Book', 'Planning', 14.99, 95, 9),

-- Miscellaneous
('Batteries AA (24-pack)', 'Miscellaneous', 16.99, 200, 10),
('Batteries AAA (24-pack)', 'Miscellaneous', 16.99, 200, 11),
('Extension Cord 15ft', 'Miscellaneous', 14.99, 130, 12),
('Surge Protector 8-outlet', 'Miscellaneous', 24.99, 100, 1),
('Cable Management Clips (50-pack)', 'Miscellaneous', 8.99, 180, 2);