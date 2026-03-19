import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import { AppProvider } from './context/AppContext'

import Dashboard from './pages/Dashboard/Dashboard'
import Customers from './pages/Customers/Customers'
import CustomerDetail from './pages/Customers/CustomerDetail'
import Contacts from './pages/Customers/Contacts'

import Proposals from './pages/Sales/Proposals'
import Estimates from './pages/Sales/Estimates'
import Invoices from './pages/Sales/Invoices'
import RecurringInvoices from './pages/Sales/RecurringInvoices'
import Payments from './pages/Sales/Payments'
import CreditNotes from './pages/Sales/CreditNotes'
import Items from './pages/Sales/Items'

import Subscriptions from './pages/Subscriptions/Subscriptions'
import Expenses from './pages/Expenses/Expenses'
import Contracts from './pages/Contracts/Contracts'

import Projects from './pages/Projects/Projects'
import ProjectDetail from './pages/Projects/ProjectDetail'

import Tasks from './pages/Tasks/Tasks'

import Support from './pages/Support/Support'
import TicketDetail from './pages/Support/TicketDetail'

import Leads from './pages/Leads/Leads'
import LeadDetail from './pages/Leads/LeadDetail'

import EstimateRequest from './pages/EstimateRequest/EstimateRequest'
import KnowledgeBase from './pages/KnowledgeBase/KnowledgeBase'

import Calendar from './pages/Utilities/Calendar'
import Announcements from './pages/Utilities/Announcements'
import ActivityLog from './pages/Utilities/ActivityLog'
import BulkPdfExport from './pages/Utilities/BulkPdfExport'
import Media from './pages/Utilities/Media'
import TicketPipeLog from './pages/Utilities/TicketPipeLog'

import SalesReport from './pages/Reports/SalesReport'
import ExpensesReport from './pages/Reports/ExpensesReport'
import ExpensesVsIncome from './pages/Reports/ExpensesVsIncome'
import LeadsReport from './pages/Reports/LeadsReport'
import TimesheetsReport from './pages/Reports/TimesheetsReport'
import KBArticlesReport from './pages/Reports/KBArticlesReport'

import Setup from './pages/Setup/Setup'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            
            <Route path="customers" element={<Customers />} />
            <Route path="customers/:id" element={<CustomerDetail />} />
            <Route path="contacts" element={<Contacts />} />
            
            <Route path="sales/proposals" element={<Proposals />} />
            <Route path="sales/estimates" element={<Estimates />} />
            <Route path="sales/invoices" element={<Invoices />} />
            <Route path="sales/recurring-invoices" element={<RecurringInvoices />} />
            <Route path="sales/payments" element={<Payments />} />
            <Route path="sales/credit-notes" element={<CreditNotes />} />
            <Route path="sales/items" element={<Items />} />
            
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="contracts" element={<Contracts />} />
            
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<ProjectDetail />} />
            
            <Route path="tasks" element={<Tasks />} />
            
            <Route path="support" element={<Support />} />
            <Route path="support/:id" element={<TicketDetail />} />
            
            <Route path="leads" element={<Leads />} />
            <Route path="leads/:id" element={<LeadDetail />} />
            
            <Route path="estimate-request" element={<EstimateRequest />} />
            <Route path="knowledge-base" element={<KnowledgeBase />} />
            
            <Route path="utilities/calendar" element={<Calendar />} />
            <Route path="utilities/announcements" element={<Announcements />} />
            <Route path="utilities/activity-log" element={<ActivityLog />} />
            <Route path="utilities/bulk-pdf" element={<BulkPdfExport />} />
            <Route path="utilities/media" element={<Media />} />
            <Route path="utilities/ticket-pipe-log" element={<TicketPipeLog />} />
            
            <Route path="reports/sales" element={<SalesReport />} />
            <Route path="reports/expenses" element={<ExpensesReport />} />
            <Route path="reports/expenses-vs-income" element={<ExpensesVsIncome />} />
            <Route path="reports/leads" element={<LeadsReport />} />
            <Route path="reports/timesheets" element={<TimesheetsReport />} />
            <Route path="reports/kb-articles" element={<KBArticlesReport />} />
            
            <Route path="setup" element={<Setup />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}