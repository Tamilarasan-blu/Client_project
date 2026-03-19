import React from 'react'

const badgeTypes = {
  'Active': 'badge-success', 'Paid': 'badge-success', 'Open': 'badge-info',
  'In Progress': 'badge-info', 'Sent': 'badge-info', 'Answered': 'badge-success',
  'Unpaid': 'badge-danger', 'Overdue': 'badge-danger', 'Expired': 'badge-danger',
  'Closed': 'badge-gray', 'Declined': 'badge-danger', 'Cancelled': 'badge-danger',
  'Draft': 'badge-gray', 'On Hold': 'badge-warning', 'Postponed': 'badge-warning',
  'Past Due': 'badge-danger', 'Not Subscribed': 'badge-gray',
  'Accepted': 'badge-success', 'Active': 'badge-success',
  'Partially Paid': 'badge-orange', 'Testing': 'badge-purple',
  'Awaiting Feedback': 'badge-warning', 'Complete': 'badge-success',
  'Not Started': 'badge-gray', 'Finished': 'badge-teal',
  'Recently Added': 'badge-teal', 'Converted': 'badge-success',
  'RNR': 'badge-warning', 'Wrong Number': 'badge-danger',
  'Not Interested': 'badge-gray', 'Duplicate': 'badge-gray',
  'New': 'badge-info', 'Contacted': 'badge-purple',
  'Published': 'badge-success', 'Yes': 'badge-success', 'No': 'badge-gray',
  'High': 'badge-danger', 'Medium': 'badge-warning', 'Low': 'badge-success',
  'Future': 'badge-purple', 'Incomplete': 'badge-gray',
  'Incomplete Expired': 'badge-danger', 'Canceled': 'badge-gray',
  'Unpaid': 'badge-danger', 'About to Expire': 'badge-warning',
}

export default function Badge({ status, children }) {
  const text = children || status
  const cls = badgeTypes[text] || 'badge-gray'
  return <span className={`badge ${cls}`}>{text}</span>
}