# Dynamic Data Table Manager

A powerful, feature-rich data table management application built with Next.js, Redux Toolkit, and Material-UI. This application provides a comprehensive solution for managing, editing, and manipulating tabular data with CSV import/export capabilities.

## Features

### 📊 Core Functionality

- **Dynamic Data Table**: Display and manage tabular data with full CRUD operations
- **CSV Import/Export**: Import data from CSV files and export your table to CSV format
- **Column Management**: Show/hide columns dynamically and add new columns on the fly
- **Global Search**: Search across all columns and rows in real-time
- **Sorting**: Multi-column sorting with ascending, descending, and none states
- **Pagination**: Configurable pagination with customizable page sizes (5, 10, 25, 50)
- **Inline Editing**: Edit multiple rows simultaneously with save/cancel functionality
- **Row Deletion**: Delete rows with confirmation dialog
- **Data Persistence**: State is persisted using Redux Persist (localStorage)
- **Reset to Mock Data**: Restore original sample data with a single click

### 🎨 User Interface

- Modern, responsive Material-UI design
- Mobile-friendly layout
- Intuitive controls and tooltips
- Confirmation dialogs for destructive actions

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **UI Library**: [Material-UI (MUI) v7](https://mui.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) with [Redux Persist](https://github.com/rt2zz/redux-persist)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **CSV Processing**: [PapaParse](https://www.papaparse.com/)
- **File Operations**: [File-saver](https://github.com/eligrey/FileSaver.js/)
- **Utilities**: [UUID](https://github.com/uuidjs/uuid) for unique ID generation

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd frontend-task
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main page component
│   └── providers.tsx      # Redux and MUI providers
├── components/            # React components
│   ├── DataTable.tsx      # Main data table component
│   ├── ImportExportButtons.tsx  # CSV import/export controls
│   └── ManageColumnsModal.tsx   # Column management dialog
├── store/                 # Redux store configuration
│   ├── index.ts          # Store setup with persistence
│   └── tableSlice.ts     # Table state and reducers
├── types/                 # TypeScript type definitions
│   ├── index.ts          # Core types (RowData, ColumnConfig, etc.)
│   └── externals.d.ts    # External library type declarations
└── utils/                 # Utility functions
    ├── csv.ts            # CSV conversion utilities
    └── validation.ts     # Data validation helpers
```

## Usage

### Importing CSV Data

1. Click the **"Import CSV"** button
2. Select a CSV file from your computer
3. The table will automatically update with the imported data
4. Each row will be assigned a unique ID

### Exporting Data

1. Click the **"Export CSV"** button
2. A CSV file will be downloaded with the current table data
3. Only visible columns are exported

### Managing Columns

1. Click **"Manage Columns"** button
2. Toggle column visibility using checkboxes
3. Add new columns by entering a field key and optional label
4. New columns are automatically added to all rows

### Editing Rows

1. Click the **Edit** icon on any row
2. Modify the values directly in the table cells
3. Click **"Save All"** to save all edited rows
4. Click **"Cancel All"** to discard all changes

### Searching and Sorting

- Use the **"Global search"** field to filter rows across all columns
- Click column headers to sort (ascending → descending → none)
- Search and sort work together seamlessly

### Resetting Data

- Click **"Reset to Mock Data"** to restore the original sample data
- This clears all imported data and restores default columns

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Data Persistence

The application uses Redux Persist to save your table state in the browser's localStorage. This means:

- Your data persists across page refreshes
- Column visibility settings are remembered
- Search, sort, and pagination states are preserved

To clear persisted data, use the "Reset to Mock Data" button or clear your browser's localStorage.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Material-UI Documentation](https://mui.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Deploy on Vercel

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
