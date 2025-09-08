// getReportName.js
const now = new Date();
const timestamp = now.toISOString().replace(/[-:T]/g, '').split('.')[0]; // e.g., 20250908-132501
console.log(`report-${timestamp}`);
