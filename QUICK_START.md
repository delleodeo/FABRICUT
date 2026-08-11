# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Add Your Logo
Place your logo file at: `src/assets/logo.jpg`
- Recommended size: 200x200px (square)
- Formats supported: JPG, PNG, SVG

### Step 2: Install Dependencies
```bash
cd "c:\Users\Leo\OneDrive\Documents\FORTU - INVENTORY SYSTEM"
npm install
```

### Step 3: Run the Application
```bash
npm run dev
```

Open your browser at: **http://localhost:5173**

---

## 🎯 What You Can Do Now

### Add Clients
1. Go to **Client List** page
2. Click **"+ Add New Client"**
3. Enter client name
4. Click **"Add Client"**

### Create Orders
1. Go to **Records** page
2. Click **"+ Add Order"**
3. Select a client
4. Fill in item details
5. Click **"Add Order"**

### Schedule Appointments
1. Go to **Schedule** page
2. Click **"+ Add"** in Today's Appointments
3. Select client and enter details
4. Click **"Add Appointment"**

### Save Measurements
1. Go to **Home Page**
2. Scroll to Measurements section
3. Enter measurements in the fields
4. Add personal notes
5. Click **"Save"**

### Export Data
1. Go to **Records** page
2. Optional: Filter by status or date
3. Click **"Export"** button
4. CSV file downloads automatically

---

## 📊 Sample Workflow

### Complete Order Workflow
```
1. Add Client (Clients Page)
   └─> Client created with status "New"

2. Create Order (Records Page)
   └─> Order created
   └─> Client status → "Active"
   └─> Client total orders +1
   └─> Statistics updated

3. Schedule Appointment (Schedule Page)
   └─> Appointment added to today's list

4. Save Measurements (Home Page)
   └─> Measurements stored
   └─> Personal notes saved

5. Complete Order (Records Page)
   └─> Change status to "Completed"
   └─> Statistics updated
```

---

## 🎨 Tips & Tricks

### Search Clients
- Type in the search box on Client List page
- Results filter instantly as you type
- Case-insensitive search

### Filter Orders
- Use the date input to filter by date
- Use the status dropdown to filter by order status
- Filters work together

### Edit Anything
- Click **"Edit"** button on any item
- Form pre-fills with current data
- Update and save changes

### Delete Items
- Click **"Delete"** button (red color)
- Confirm in the dialog
- Item removed immediately

### View Details
- Click **"View Details"** or Order ID
- Modal shows complete information
- No editing in this view (use Edit button)

---

## 🎭 Demo Data Included

The application comes with sample data:

### Clients (8)
- Vargas (Active, 1 order)
- Kenneth (New, 0 orders)
- Jenelyn (New, 0 orders)
- Donna (New, 0 orders)
- Cristine (New, 0 orders)
- Cedric (New, 0 orders)
- Maria Santos (Active, 3 orders)
- John Reyes (Active, 2 orders)

### Orders (5)
- ORD-001: Vargas - Bespoke Suit (Completed)
- ORD-002: Jenelyn - Dress Alteration (In Progress)
- ORD-003: Maria Santos - Wedding Gown (In Progress)
- ORD-004: John Reyes - Barong Tagalog (Pending)
- ORD-005: Donna - Skirt Hemming (Completed)

### Appointments (2)
- 8:00 AM - Jenelyn - Dress Fitting
- 2:00 PM - Vargas - Suit Measurement

---

## ⚠️ Important Notes

### Data Persistence
- **Current**: Data stored in memory (lost on page refresh)
- **To Make Persistent**: Connect to a backend API or use localStorage

### Browser Support
- Works best on modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled

### Mobile Responsive
- Sidebar collapses on mobile
- Tables scroll horizontally if needed
- Touch-friendly buttons

---

## 🆘 Troubleshooting

### "npm: command not found"
Install Node.js from: https://nodejs.org/

### "Port 5173 is already in use"
Kill the process or change port in vite.config.js

### Logo not showing
1. Verify file is at: `src/assets/logo.jpg`
2. Check file name matches exactly (case-sensitive)
3. Try refreshing the page (Ctrl+F5)

### Changes not reflecting
1. Stop the dev server (Ctrl+C)
2. Run `npm run dev` again
3. Hard refresh browser (Ctrl+F5)

---

## 📚 Learn More

- See [README.md](README.md) for full documentation
- See [FEATURES.md](FEATURES.md) for complete feature list
- See [LOGO_INSTRUCTIONS.txt](LOGO_INSTRUCTIONS.txt) for logo setup

---

## 🎉 You're All Set!

Start by adding your first client, then create an order, and watch the system automatically update everything. All features are fully functional and ready to use!

**Questions?** Check the feature list or README for detailed information.
