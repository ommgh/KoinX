# KoinX - Tax Loss Harvesting Assignment

This project is a frontend assignment for KoinX that simulates a **Tax Loss Harvesting Dashboard**, enabling users to view their crypto holdings, capital gains, and explore potential opportunities to harvest tax losses.

## Project Structure

```
app/
├── api/
│ ├── capital-gains/
│ │ └── route.ts # Capital Gains API
│ └── holdings/
│ └── route.ts # Holdings API
├── globals.css
├── layout.tsx
└── page.tsx
components/
├── ui/
├── capital-gains-section.tsx
├── header.tsx
├── holdings-table.tsx
├── query-provider.tsx
├── tax-harvesting-dashboard.tsx
└── theme-provider.tsx
hooks/
├── use-mobile.tsx
└── use-toast.ts
lib/
└── utils.ts
public/
store/
└── use-holdings-store.ts
```

## Tech Stack

- **Framework**: [Next.js 15+ App Router](https://nextjs.org/docs/app)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Library**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest)
- **Table**: [TanStack Table](https://tanstack.com/table/latest)

## Setup

1. **Clone the repo**
   ```bash
   git clone git@github.com:ommgh/KoinX.git
   cd KoinX
   ```
2. **Install Dependencies**
   ```bash
   pnpm install
   ```
3. **Run the development server**
   ```bash
   pnpm dev
   ```
4. Open http://localhost:3000 in your browser to view the app.

## Note

- All data used is mock data served via /api routes.

- No external backend or database is used.
