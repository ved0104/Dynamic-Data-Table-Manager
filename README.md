# 📊 Dynamic Data Table Manager (Next.js + Redux + MUI)

A powerful, fully dynamic data table built using **Next.js 14 (App Router)**, **Redux Toolkit**, and **Material UI (MUI)**.  
This project demonstrates managing complex table interactions like column customization, CSV import/export, sorting, pagination, and inline editing — all on the client side.

---

## 🚀 Features

### 🧩 Core Functionalities
- **Table View**
  - Displays data with default columns: `Name`, `Email`, `Age`, `Role`
  - Sorting on column headers (ASC/DESC toggle)
  - Global search (filters all visible columns)
  - Client-side pagination (10 rows per page)

- **Dynamic Columns**
  - “Manage Columns” modal to:
    - Add new columns (e.g., Department, Location)
    - Show/hide columns dynamically
  - Column visibility persists in Redux state

- **Import & Export CSV**
  - Import CSV files using [PapaParse](https://www.papaparse.com/)
  - Export current visible table data as CSV
  - Validates file format and shows errors

---

### 🎁 Bonus Features (Implemented)
- Inline editing on double-click  
- Dynamic field validation (e.g., Age must be a number)  
- Interactive buttons for import/export and column management  
- Responsive design with MUI components  
- Extensible architecture (easily add drag-and-drop or Redux Persist)

---

## 🛠️ Tech Stack

| Category | Technologies |
|-----------|---------------|
| **Frontend Framework** | Next.js 14 (App Router) |
| **UI Library** | Material UI (v5) |
| **State Management** | Redux Toolkit |
| **Forms & Validation** | React Hook Form |
| **CSV Handling** | PapaParse, FileSaver.js |
| **Language** | TypeScript |
| **Styling** | MUI + Custom CSS |

---

## 📂 Project Structure

src/
├─ app/
│ ├─ layout.tsx # Root layout (server component)
│ └─ page.tsx # Main page (client component)
├─ components/
│ ├─ DataTable.tsx # Table rendering, sorting, pagination
│ ├─ ManageColumnsModal.tsx # Add/Hide columns
│ ├─ ImportExport.tsx # CSV import/export
│ ├─ InlineEditor.tsx # Inline cell editing
│ └─ Providers.tsx # Redux + MUI client providers
├─ store/
│ ├─ index.ts # Redux store configuration
│ └─ tableSlice.ts # Table reducer logic
├─ types/
│ └─ index.ts # Shared types (Row, ColumnDef)
├─ utils/
│ └─ csv.ts # CSV parse/export utilities
├─ hooks/
│ └─ useLocalStorage.ts # Optional local persistence helper
├─ styles/
│ └─ globals.css # Global CSS
└─ README.md

yaml
Copy code

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/dynamic-data-table-manager.git
cd dynamic-data-table-manager
2️⃣ Install Dependencies
bash
Copy code
npm install
(Make sure you have Node.js ≥ 18 and npm ≥ 9)

3️⃣ Run the Development Server
bash
Copy code
npm run dev
Then open http://localhost:3000

💡 Usage Guide
▶️ Sorting
Click on any column header (Name, Email, Age, Role) to toggle ascending/descending order.

🔍 Search
Use the Global Search box to search across all visible fields.

🧱 Manage Columns
Click Manage Columns to:

Show/hide any existing column

Add a new custom column dynamically

📤 Import / Export
Import CSV: Upload a valid .csv file — parsed using PapaParse

Export CSV: Exports current view with only visible columns

✏️ Inline Editing
Double-click on any cell → Edit → Click outside to save automatically.

🧠 Key Learnings
Client vs Server Components in Next.js App Router

Redux Toolkit integration with Next.js

Material UI theming + responsive table components

File parsing and blob export in the browser

Managing dynamic UI state with TypeScript

🌗 Future Enhancements
 Redux Persist / localStorage persistence

 Light & Dark mode toggle

 Row deletion with confirmation

 Column drag-and-drop reordering

 Backend data sync with API routes

👨‍💻 Author
Vedang Dubey
Full Stack Developer & AI/ML Enthusiast