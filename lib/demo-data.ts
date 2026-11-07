// Demonstration-only content: never label it as live detections.
export type CaseStatus = "Open" | "Investigating" | "Closed";
export type Priority = "Critical" | "High" | "Medium" | "Low";
export type DemoCase = {
  id: string;
  subject: string;
  from: string;
  priority: Priority;
  status: CaseStatus;
  created: string;
  owner: string;
  indicators: number;
};

export const demoCases: DemoCase[] = [
  { id: "CS-1042", subject: "Account verification request", from: "alerts@account-review.example", priority: "Critical", status: "Investigating", created: "10:42 AM", owner: "Analyst 01", indicators: 6 },
  { id: "CS-1041", subject: "Payroll document available", from: "hr@payroll-notice.example", priority: "High", status: "Open", created: "09:18 AM", owner: "Unassigned", indicators: 4 },
  { id: "CS-1040", subject: "Meeting agenda for Thursday", from: "calendar@internal.example", priority: "Low", status: "Closed", created: "Yesterday", owner: "Analyst 01", indicators: 0 },
  { id: "CS-1039", subject: "Shared invoice attachment", from: "billing@invoice-desk.example", priority: "Medium", status: "Investigating", created: "Yesterday", owner: "Analyst 02", indicators: 2 },
  { id: "CS-1038", subject: "Urgent password reset", from: "helpdesk@verify-access.example", priority: "High", status: "Open", created: "2 days ago", owner: "Unassigned", indicators: 5 },
];

export type Indicator = { label: string; type: "Domain" | "IP address" | "URL" | "SHA-256"; detail: string; signal: string; x: number; y: number; };
export const demoIndicators: Indicator[] = [
  { label: "account-review.example", type: "Domain", detail: "Appears in demo case CS-1042", signal: "Review sender identity and link context", x: 23, y: 22 },
  { label: "203.0.113.42", type: "IP address", detail: "Documentation-only TEST-NET-3 address", signal: "No live reputation assessment", x: 75, y: 23 },
  { label: "verify-access.example", type: "Domain", detail: "Appears in demo case CS-1038", signal: "Potential account-themed social engineering", x: 84, y: 73 },
  { label: "invoice-desk.example", type: "Domain", detail: "Appears in demo case CS-1039", signal: "File metadata review recommended", x: 24, y: 74 },
];
