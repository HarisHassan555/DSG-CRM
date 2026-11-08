# AGENT.md

Operating notes for the DSG CRM codebase (this repository). Verified against the tree on this branch.

## What this application is

DSG is a white-labeled Horilla CRM. The Python package is still `horilla` so models, migrations, and management commands keep working. People see **DSG** through `horilla.utils.branding` and `horilla_crm/__branding__.py`.

Stack: Django 6.1, PostgreSQL, Redis, Celery, HTMX, Tailwind (runtime config in `static/assets/js/tailwind.config.js`). The dev server is `python manage.py runserver`. Health check: `GET /health/`.

Local dev login created by the environment start script: `devadmin` / `horilla_pass` (superuser).

## Shell

| Piece | File | Role |
| --- | --- | --- |
| Document | `templates/index.html` | Header, page block, modals, section dock |
| Header | `templates/components/header.html` | Brand, global search, theme, settings, user |
| Section dock | `templates/components/sidebar.html` | Home, Sales, People, Analytics, Schedule, My Jobs |
| Record menu | `templates/components/sub_sidebar.html` | Accounts, Leads, and the other items in the active section |
| Page frame | `templates/components/modelcontent_layout.html` | `#mainContent` |
| List toolbar | `horilla/contrib/generics/templates/navbar.html` | Title, view picker, New, filters, view icons |
| Modals | `horilla/contrib/generics/templates/components/horilla_modals.html` | Create, filter, delete |
| Layout CSS | `static/assets/css/dsg-layout.css` | Positions the dock, submenu, and drawers |
| Modal motion | `ModalManager` in `static/assets/js/global.js` | Adds `scale-95` / `scale-100`; drawers override that transform |

Do not rename `#sideMenu`, `#mainContent`, `#modalBox`, `.nav-link`, or `.sidebar-link`. HTMX and `initSidebar()` depend on them.

## Feature map

Section apps register with `main_section_menu`. Record apps register with `sub_section_menu` and expose `url_prefix` on their `AppConfig`.

| Section | Record areas | Prefix |
| --- | --- | --- |
| Home | Dashboard | `/dashboard/` |
| Sales | Leads, campaigns, opportunities, forecast | `/crm/leads/`, `/crm/campaigns/`, `/crm/opportunities/`, `/crm/forecast/` |
| People | Accounts, contacts | `/crm/accounts/`, `/crm/contacts/` |
| Analytics | Reports, dashboard list | `/reports/`, `/dashboard/` |
| Schedule | Calendar, activities | `/calendar/`, `/activity/` |
| My Jobs | Approvals, reviews, bookings | `/approvals/`, `/review-process/`, `/booking/` |
| Settings | Companies, roles, mail, theme, and the rest | `/settings-view/` |

Other mounted areas: `/mail/`, `/notifications/`, `/automations/`, `/workflow/`, `/cadences/`, `/duplicates/`, `/field-management/`, `/generics/`, `/m/` (mobile), `/api/`.

Create and edit forms are HTMX fragments swapped into `#modalBox` (or a named modal box) and opened with `openModal()` / `openFilterModal()`.

## Access control

`Role` (`horilla.contrib.core.models.organization`) holds a permission M2M. Saving a user with `role` copies those permissions onto `user.user_permissions` (`horilla.contrib.core.signals.sync_role_permissions_on_role_change`). Superusers skip checks. List views use `permission_required_or_denied`, often with a `view` and `view_own` pair (example: `leads.view_lead` and `leads.view_own_lead`).

A user with no matching permission is denied. A user with only account view must not open lead create or settings.

## Tests already in the tree

Django `TestCase` modules live beside the apps (`horilla/contrib/generics/tests.py`, `horilla/contrib/core/tests.py`, `horilla_crm/leads/tests/`, calendar, automations, and others). Run them with `python manage.py test`. There is no separate browser runner; end-to-end coverage is the live-server crawl plus role logins described in `TASK.md`.

## Design rules for this branch

- Visible copy says DSG, not Horilla.
- Default theme is light: white surfaces, ink (`#1c2430`) actions. Do not restore `#e54f38`.
- Move controls. Keep the same labels and the same HTMX targets so a person still recognizes New, Search, and the section names.
- Prefer `dsg-layout.css` and small template class changes over editing every feature template.
