# Claude Prompt: B2B Jewellery Inventory & Order Management Platform

---

## Prompt to give to Claude:

---

Build a full-stack **B2B Jewellery Inventory & Order Management Platform** — a web application used by a jewellery manufacturer/wholesaler (the "Owner") to manage their product catalogue, real-time inventory, and dealer orders. The Owner sells to 100+ business dealers who log in to browse inventory, view product details, discover similar products, and punch orders.

---

## Core Modules

### 1. Data Ingestion Pipeline (Product Entry System)

Build a **dynamic, customisable product entry form** for the Owner's workforce to input jewellery data:

- **Image uploads** — multiple images per product (front, back, close-up, video optional). Support drag-and-drop, bulk upload, and image reordering.
- **Standard fields** (pre-built):
  - Product Name / Title
  - SKU / Item Code (auto-generated or manual)
  - Category (Ring, Necklace, Bracelet, Earring, Bangle, Pendant, Chain, etc.)
  - Sub-category
  - Metal Type (Gold, Silver, Platinum, Diamond, Kundan, etc.)
  - Metal Purity (e.g., 22K, 18K, 14K, 925 Silver)
  - Gross Weight (grams)
  - Net Weight (grams)
  - Stone Details (type, carat, count, setting)
  - Making Charges (per gram or flat)
  - MRP / List Price
  - Quantity in Stock
  - Status (Active / Inactive / Discontinued)
  - Tags / Labels (e.g., "Bestseller", "New Arrival", "Limited Edition")
  - Description / Notes
- **Dynamic / Custom Fields Engine**:
  - Owner can **add new fields** at any time (text, number, dropdown, multi-select, date, file, boolean).
  - Owner can **edit, reorder, hide, or archive** existing fields.
  - Fields are saved as a schema definition so the form auto-renders based on schema.
  - Support **field groups** (e.g., "Metal Details", "Stone Details", "Pricing") for organised entry.
- **Bulk Import** — CSV/Excel upload to add or update products in bulk.
- **Edit History / Audit Log** — track who changed what and when for every product.

### 2. Real-Time Inventory Dashboard

A central dashboard for both the Owner and Dealers to view inventory:

- **Summary Cards**: Total Products, Active Items, Inactive/Discontinued, Low Stock Alerts, New Arrivals (last 7/30 days).
- **Filters & Search**:
  - Full-text search across name, SKU, tags, description.
  - Filter by category, sub-category, metal type, purity, price range, weight range, stock status, custom fields.
  - Sort by newest, price (low-high / high-low), weight, popularity.
- **View Modes**: Grid view (image-heavy cards) and List/Table view.
- **Real-Time Updates**: When stock changes (due to order approval), all connected dealer dashboards reflect it instantly (use WebSockets or polling).
- **Stock Indicators**: Colour-coded badges — In Stock (green), Low Stock (amber), Out of Stock (red).
- **Pagination & Infinite Scroll** support for large catalogues.

### 3. Product Detail & Similar Products Page

When a user clicks on any product:

- **Full Specification View**: All standard + custom fields rendered cleanly.
- **Image Gallery**: Zoomable, swipeable image carousel.
- **Similar Products Section**:
  - Algorithm-driven recommendations based on: same category, similar metal type, similar weight range, similar price range, matching tags.
  - Display as a horizontal scrollable card row.
  - Clicking a similar product navigates to its own detail page.
- **Stock Availability**: Real-time quantity display.
- **"Add to Cart" button** (for Dealers).

### 4. Dealer Cart & Order Punching

Dealers can build an order:

- **Cart System**:
  - Add items to cart with desired quantity.
  - View cart summary: item list, quantities, MRP per item, total MRP.
  - Edit quantities or remove items from cart.
  - Cart persists across sessions (saved server-side).
- **"Punch Order" Button**:
  - Converts cart into an Order with status: `Pending Approval`.
  - Order includes: Order ID (auto-generated), Dealer info, list of items + quantities, total MRP quotation, timestamp.
  - Dealer sees confirmation: "Order submitted, awaiting approval."
- **Order History** (Dealer View):
  - View past orders with statuses: Pending, Approved, Rejected, Partially Approved.
  - Click into any order to see line-item details.

### 5. Owner Order Management

The Owner's admin panel for order handling:

- **Incoming Orders Dashboard**:
  - List of all orders from all dealers, sortable by date, dealer, status, amount.
  - Filter by dealer, status, date range.
- **Order Detail View**:
  - See full order: dealer info, items, quantities, MRP.
  - **Approve / Reject / Partially Approve** each line item or the whole order.
  - On approval: the ordered quantity is **automatically deducted from inventory**.
  - On rejection: stock remains unchanged; optional reason field.
- **Quotation Generation**:
  - Auto-generate a quotation document (PDF) with MRP pricing.
  - This is NOT a GST invoice — just a price quotation for negotiation.
  - Both parties can discuss pricing separately (outside the platform or via a notes/chat field on the order).
- **Order Status Notifications**: Dealers get notified (in-app + optional email) when their order status changes.

### 6. User Roles & Authentication

- **Owner / Admin**: Full access — product management, custom fields, order approvals, dealer management, analytics.
- **Workforce / Staff**: Can add/edit products, manage inventory. Cannot approve orders (configurable permissions).
- **Dealer**: Can browse catalogue, view products, add to cart, punch orders, view own order history.
- **Authentication**: Email + password login. Optional: OTP-based login for dealers.
- **Dealer Management**: Owner can add/remove dealers, activate/deactivate accounts, view dealer activity.

---

## Enhanced Features (Add These)

### 7. Notifications & Activity Feed
- In-app notification bell for: new orders (Owner), order status updates (Dealer), low stock alerts, new product additions.
- Activity feed on dashboard: "Dealer X placed an order", "Product Y is now low stock", "5 new products added today".

### 8. Dealer-Specific Pricing (Optional)
- Owner can set dealer-specific pricing tiers or discount percentages.
- When a dealer views a product, they see their personalised MRP/quotation price.

### 9. Wishlist / Favourites
- Dealers can "favourite" products for quick access later.
- Separate "Wishlist" page.

### 10. Business Insights & Analytics Dashboard (Owner Only)

A dedicated analytics section with actionable business intelligence — not vanity metrics:

**Sales & Product Performance:**
- **Top-Selling Products** — ranked by order volume and revenue, filterable by time period (7d / 30d / 90d / custom).
- **Slow-Moving Inventory** — products in stock for 60+ days with zero or low orders. Helps Owner decide what to discount or discontinue.
- **Category Performance Breakdown** — which categories (Rings, Necklaces, etc.) drive the most orders and revenue. Pie chart + trend line.
- **Metal Type & Purity Trends** — e.g., "22K Gold products account for 65% of orders this month, up from 50% last quarter."
- **Price Range Analysis** — which price brackets sell most (e.g., ₹20K–50K is the sweet spot).
- **New Arrivals Performance** — how newly added products perform in their first 7/14/30 days (views, cart adds, orders).

**Dealer Insights:**
- **Dealer Leaderboard** — top dealers by order volume and total MRP value.
- **Dealer Activity Report** — last login, products viewed, cart activity, order frequency per dealer.
- **Inactive Dealer Alerts** — dealers who haven't logged in or ordered in 30+ days.
- **Dealer-wise Product Preferences** — what categories/types each dealer orders most (helps Owner recommend products).

**Inventory Health:**
- **Stock Turnover Rate** — how fast inventory moves. High turnover = healthy; low = dead stock.
- **Low Stock Forecast** — based on order velocity, predict when a product will go out of stock.
- **Out-of-Stock Impact** — how many times dealers viewed or tried to order out-of-stock items (lost demand).
- **Restock Suggestions** — products that need restocking based on order trends.

**Time-Based Trends:**
- **Seasonal Demand Patterns** — order volume by month/quarter to identify seasonal peaks (Diwali, Akshaya Tritiya, Wedding season).
- **Day-of-Week / Time-of-Day Patterns** — when dealers are most active (helps Owner time new product drops).
- **Growth Metrics** — month-over-month order growth, new dealers added, catalogue expansion rate.

**Dashboard Visualisations:**
- Interactive charts (bar, line, pie, heatmap) using a charting library (Recharts or Chart.js).
- Date range picker for all reports.
- Export reports as CSV/PDF.
- Key metrics as summary cards at the top with sparkline trends.

### 11. Product Collections / Catalogues
- Owner can group products into named collections (e.g., "Diwali Collection 2026", "Wedding Specials").
- Dealers can browse by collection.

### 12. Mobile-Responsive Design
- Fully responsive — dealers often browse on phones/tablets in their shops.
- Consider PWA (Progressive Web App) for installability.

---

## AI-Powered Features

Integrate AI where it **genuinely solves a real problem** — not for novelty. Use OpenAI API (GPT-4o + embeddings) or open-source alternatives.

### AI-1. Visual Similarity Search (Image-Based Product Discovery)
**Problem**: A dealer's customer shows them a reference photo and asks "do you have something like this?" Currently the dealer scrolls through hundreds of products manually.
**Solution**:
- Upload or paste a reference image → AI returns visually similar products from inventory.
- Uses image embeddings (OpenAI CLIP or similar) to encode all product images into vectors.
- On query, encode the uploaded image and find nearest neighbours via cosine similarity.
- Store embeddings in a vector column (pgvector extension for PostgreSQL) or a dedicated vector DB.
- Also powers the "Similar Products" section on the product detail page — combining visual + metadata similarity for better results than rules alone.

### AI-2. Smart Auto-Tagging on Product Upload
**Problem**: Workforce uploads 50+ products daily. Manually filling category, metal type, stone type, style tags is tedious, slow, and inconsistent.
**Solution**:
- When product images are uploaded, AI analyses them and **auto-suggests**: category, sub-category, metal type, stone type, style tags, and a product description.
- Staff sees the suggestions pre-filled in the form and can **confirm, edit, or override** each one.
- Uses a vision model (GPT-4o vision) to analyse the image and return structured JSON.
- Saves hours of manual data entry and ensures consistent tagging across the catalogue.

### AI-3. Natural Language Inventory Search
**Problem**: The filter panel has 15+ dropdowns. Dealers know what they want but it's faster to just say it: *"gold necklace under 50 grams with kundan work around ₹80,000"*.
**Solution**:
- A smart search bar at the top of the catalogue page.
- Dealer types a natural language query → AI parses it into structured filters (category: necklace, metal: gold, max_weight: 50g, style: kundan, price_range: ~₹80,000) → returns matching products.
- Falls back to standard full-text search if the query is simple (e.g., just a product name or SKU).
- Uses an LLM to extract intent and map to filter parameters.

### AI-4. Demand Forecasting & Smart Restock Alerts
**Problem**: Restocking handmade jewellery takes weeks. Owner doesn't know what's trending until it's out of stock.
**Solution**:
- AI analyses historical order patterns per product, category, and season.
- Predicts upcoming demand spikes: *"Kundan necklaces typically spike 3 weeks before Diwali — you have 12 left, recommend restocking now."*
- Surfaces these as proactive alerts on the Owner dashboard, not buried in reports.
- Uses time-series analysis on order data (can be a simple statistical model or LLM-summarised insights).

### AI-5. Auto-Generated Product Descriptions
**Problem**: Workforce often leaves description fields blank or writes low-quality, inconsistent text.
**Solution**:
- One-click "Generate Description" button on the product form.
- Given the structured fields (metal, weight, stones, category, purity) + product images, AI generates a polished, professional product description.
- Useful when dealers forward product info to their own customers.
- Uses GPT-4o with a jewellery-specific prompt template.

### AI-6. Owner Business Digest (Weekly AI Summary)
**Problem**: Owner is busy and doesn't have time to dig through dashboards every day.
**Solution**:
- Weekly auto-generated business digest (displayed on dashboard + optional email):
  - *"This week: 47 orders from 23 dealers (↑12% vs last week). Top seller: 22K Gold Temple Necklace (8 orders). 3 products went out of stock. Dealer Rajesh Jewellers hasn't ordered in 45 days — consider reaching out."*
- AI summarises analytics data into plain-language, actionable insights.
- Owner can also ask questions: *"Which products did Dealer X order most this quarter?"* → AI answers from the data.

---

## Technical Requirements

### Stack
- **Frontend**: React (Next.js preferred) + TypeScript + TailwindCSS + shadcn/ui components.
- **Backend**: Node.js (Express or Next.js API routes) + TypeScript.
- **Database**: PostgreSQL (with Prisma ORM) — relational data for products, orders, users. JSONB columns for dynamic/custom fields.
- **File Storage**: Cloudinary or AWS S3 for images.
- **Real-Time**: WebSockets (Socket.io) or Server-Sent Events for live inventory updates.
- **Authentication**: NextAuth.js or custom JWT-based auth with role-based access control.
- **Search**: PostgreSQL full-text search (or Meilisearch/Algolia for advanced search if needed).
- **AI/ML**: OpenAI API (GPT-4o for vision/text, text-embedding-3-small for embeddings) or open-source alternatives (CLIP for images, Ollama for local LLM).
- **Vector Storage**: pgvector extension for PostgreSQL (image embeddings for visual similarity search).

### Database Schema (Key Tables)
- `users` — id, name, email, password_hash, role (owner/staff/dealer), status, created_at
- `dealers` — id, user_id, business_name, contact, address, pricing_tier, status
- `field_definitions` — id, name, label, type, options (JSON), group, sort_order, required, active
- `products` — id, sku, name, category, sub_category, metal_type, purity, gross_weight, net_weight, making_charges, mrp, quantity, status, tags, description, custom_fields (JSONB), created_by, created_at, updated_at
- `product_images` — id, product_id, url, sort_order
- `product_stones` — id, product_id, stone_type, carat, count, setting
- `orders` — id, dealer_id, status (pending/approved/rejected/partial), total_mrp, notes, created_at, updated_at
- `order_items` — id, order_id, product_id, quantity, mrp_at_time, status (pending/approved/rejected)
- `audit_log` — id, entity_type, entity_id, action, changed_by, changes (JSONB), timestamp
- `cart_items` — id, dealer_id, product_id, quantity
- `wishlists` — id, dealer_id, product_id
- `collections` — id, name, description, image_url, active
- `collection_products` — collection_id, product_id
- `notifications` — id, user_id, type, message, read, created_at
- `product_embeddings` — id, product_id, image_url, embedding (vector), model, created_at
- `ai_suggestions_log` — id, product_id, suggestion_type (tags/description), suggested_data (JSONB), accepted, created_at
- `business_digests` — id, period_start, period_end, summary_text, generated_at

### Key Architectural Decisions
- **Custom fields** stored as JSONB in the `products` table; field definitions in a separate `field_definitions` table. The form dynamically renders based on active field definitions.
- **Similar products** use a hybrid approach: image embedding similarity (via pgvector) + metadata matching (category, metal_type, weight, price, tags). Weighted scoring with visual similarity having highest weight. Cache results if performance is a concern.
- **Inventory deduction** happens ONLY on order approval (not on cart add or order punch).
- **Quotation only** — no payment gateway, no GST calculation, no invoice generation. The MRP quotation is just a starting point for negotiation.
- **Multi-tenancy is NOT required** — this is a single-owner platform with multiple dealer users.
- **AI features** should be optional/toggleable — if the Owner doesn't configure an OpenAI API key, the platform works fully without AI (graceful degradation). AI features enhance but are never required.
- **Embeddings** are pre-computed on product creation/image upload and stored in pgvector. Re-computed only when images change.
- **AI auto-tag suggestions** are always human-confirmed — never auto-saved without staff review.

---

## UI/UX Guidelines

- **Clean, modern, professional** design suitable for a B2B jewellery business.
- **Image-forward** — jewellery is a visual product; large thumbnails, high-quality image display.
- **Fast navigation** — dealers should find products in under 3 clicks.
- **Dark/Light mode** toggle.
- **Sidebar navigation** with collapsible menu.
- **Consistent colour scheme** — jewellery business aesthetic (gold accents, dark backgrounds, or clean whites).

---

## Pages to Build

1. **Login Page**
2. **Dashboard** (role-aware — Owner sees analytics + orders; Dealer sees catalogue + cart)
3. **Product Catalogue / Inventory** (grid + list views, filters, search)
4. **Product Detail Page** (specs + images + similar products + add to cart)
5. **Add/Edit Product Form** (dynamic fields)
6. **Custom Field Manager** (Owner — add/edit/reorder fields)
7. **Cart Page** (Dealer)
8. **Order Confirmation / Punch Order**
9. **My Orders** (Dealer — order history)
10. **Order Management** (Owner — incoming orders, approve/reject)
11. **Order Detail** (Owner — line-item approval)
12. **Dealer Management** (Owner — add/edit/deactivate dealers)
13. **Collections Page** (browse by collection)
14. **Wishlist Page** (Dealer)
15. **Notifications Page**
16. **Settings / Profile**
17. **Business Insights & Analytics** (Owner — charts, reports, dealer insights, export)
18. **AI Visual Search** (upload image → find similar products)
19. **AI Business Digest** (Owner — weekly summary, ask questions about data)

---

## Deliverables

- Fully functional full-stack application with all modules above.
- Seed data: at least 30 sample jewellery products across categories with placeholder images.
- README with setup instructions.
- Database migrations / schema setup.
- Role-based demo accounts: one Owner, one Staff, two Dealers.

---

**Build this step-by-step, module by module. Start with the database schema and authentication, then the product ingestion pipeline, then the inventory dashboard, then product detail + similar products, then cart + order system, then owner order management. Then add notifications, business insights & analytics, and collections. Add AI features last (visual search, auto-tagging, NL search, demand forecasting, business digest) — ensure the platform is fully functional without AI first, then layer AI on top.**
