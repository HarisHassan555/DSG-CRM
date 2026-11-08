# TASK.md

Checklist for the DSG redesign and verification. Status is updated as work finishes.

## Redesign

- [x] Brand the shell as DSG and remove the coral default theme.
- [x] Open create forms from the right and filters from the left.
- [x] Move the section menu onto a right dock (not the old left rail, not the top bar).
- [x] Keep the record menu as a floating left card inside the page, collapsible.
- [x] Move the New button from beside the title to the trailing side of the same toolbar. Same label, same action.
- [x] Inset the page content so it does not sit flush against the window edges.

## Pages to load while signed in as devadmin

- [x] `/dashboard/?section=home`
- [x] `/crm/accounts/accounts-view/?section=people`
- [x] `/crm/contacts/contacts-view/?section=people`
- [x] `/crm/leads/leads-view/?section=sales`
- [x] `/crm/campaigns/campaign-view/?section=sales`
- [x] `/crm/opportunities/opportunities-view/?section=sales`
- [x] `/crm/forecast/forecast-view/?section=sales`
- [x] `/calendar/calendar-view/?section=schedule`
- [x] `/activity/activity-view/?section=schedule`
- [x] `/reports/reports-list-view/?section=analytics`
- [x] `/dashboard/dashboard-list-view/?section=analytics`
- [x] `/review-process/review-jobs/?section=my_jobs`
- [x] `/approvals/approval-jobs/?section=my_jobs`
- [x] `/booking/my-bookings/?section=my_jobs`
- [x] `/settings-view/`
- [x] `/my-settings-view/`
- [x] `/health/`

## Actions to exercise

- [x] Open and close Create Account (right drawer). A saved account (Acme Cloud Agent) is already in the list.
- [x] Open and close Create Lead from the Sales Rep toolbar (New is present for that role).
- [x] Filter icon on the accounts toolbar opens the filter panel.
- [x] Switch People to Sales from the dock and confirm the record menu changes.
- [x] Record menu collapse control is present on the card.

## RBAC

Create two non-superusers and sign in as each.

| User | Role | Must open | Must be denied |
| --- | --- | --- | --- |
| `salesrep` | Sales Rep: lead view and add | Leads list, lead create form | Settings, account create if account view is absent |
| `reader` | Reader: account view only | Accounts list | Leads list, settings, lead create |

- [x] Users created and permissions copied from their roles. Password is `horilla_pass`.
- [x] HTTP checks match the table. Sales Rep gets the lead toolbar and New; Reader does not. Reader gets the account toolbar without New. Both are denied settings and lead stages.

## Automated tests

- [x] `python manage.py test` completed: 795 tests, 196 skipped, 1 error.
- [x] The error was `horilla_jalali.tests.JalaliTimelineCalendarTests`: the static finder returns nothing because `horilla_jalali` is not installed. The test now reads the script from the package path. Re-run of that test passed.
