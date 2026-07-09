# Pages Implementation Guide

## Home (Dashboard)

**Purpose:** Overview of recent activity and quick actions

**Components:**
- Hero section with welcome message
- 4-column stats grid: Total Tasks, Running Tasks, Total Files, API Key Status
- Recent tasks list (last 5, truncated)
- Quick action buttons (Create Task, Upload File, etc.)
- Empty state if no API key connected

**Key Features:**
- Stats auto-update on page load
- Link to Settings if not connected
- Recent tasks link to detail page

---

## Tasks

**Purpose:** Full task lifecycle management

**Features:**

### List View
- Table/card list of tasks with columns: ID, Status, Created, Model
- Status badges: running (blue), stopped (gray), success (green), error (red)
- Search bar to filter by ID or description
- Refresh button
- "New Task" button

### Create Dialog
- Fields: description (required), model (optional), instruction (optional), enable_skills (optional array)
- Submit button (disabled while creating)
- Success toast + redirect to detail

### Detail View
- Task header: ID, status badge, created date
- Description + model + instruction (read-only)
- Messages section (list of messages with timestamps)
- Message input + Send button
- Stop Task button (if running)
- Delete Task button (with confirmation)
- Copy ID button

### Messages
- Each message shows: sender (user/assistant), content, timestamp
- Streaming messages show loading spinner
- Auto-scroll to latest message

---

## Projects

**Purpose:** Organize tasks by project

**Features:**
- List of projects with: name, description, task count, created date
- Create button → dialog with name + description fields
- Delete button (with confirmation)
- Click to view project details (list tasks in project)
- Empty state: "No projects yet"

---

## Files

**Purpose:** Manage uploaded files

**Features:**

### Upload
- Drag-drop zone or file picker
- Show upload progress
- After upload: show file ID + copy button
- Auto-refresh list

### List
- Table: filename, size, created date, actions
- Copy ID button
- Delete button (with confirmation)
- Empty state: "No files uploaded"

### Delete
- Confirmation dialog
- Remove from list on success

---

## Webhooks

**Purpose:** Configure HTTP callbacks

**Features:**

### List
- Cards showing: URL, events (badges), created date
- Delete button
- Public Key button (top-right)

### Create Dialog
- URL field (required)
- Event checkboxes (task.created, task.status_changed, task.message_created, task.stopped, task.error)
- Leave empty = subscribe to all events
- Create button

### Public Key Viewer
- Modal showing RSA public key
- Copy button
- Info: "Use to verify webhook signatures (RSA-SHA256)"

---

## Skills

**Purpose:** Browse available agent skills

**Features:**
- List of skills with: name, description, ID, enabled status
- Search bar to filter by name/description
- Copy ID button on each skill
- Grid layout (3 columns on desktop)
- Empty state: "No skills available"

---

## Connectors

**Purpose:** View installed third-party integrations

**Features:**
- List of connectors with: icon (emoji), name, type, status, ID
- Copy ID button
- "Manage in Manus" link (external)
- Grid layout (3 columns on desktop)
- Empty state: "No connectors installed" + link to Manus settings

---

## Agents

**Purpose:** Manage custom IM agents

**Features:**

### List
- Cards showing: avatar (or default icon), name, ID, description, instruction (truncated)
- Edit button → dialog
- Copy ID button
- Link to main task (if task_id exists)
- Created date

### Edit Dialog
- Name field (editable)
- Instruction field (editable textarea)
- Save button
- Cancel button

---

## Usage

**Purpose:** Track API consumption

**Features:**

### Tabs: Personal / Team Statistics / Team Logs

#### Personal
- List of usage records: task ID, model, tokens, credits, created date
- Summary stats: Total Records, Total Tokens, Total Credits
- Empty state: "No usage records"

#### Team Statistics
- Line chart: Daily token usage (recharts AreaChart)
- Bar chart: Daily credits (recharts BarChart)
- X-axis: dates, Y-axis: values
- Tooltip on hover
- Empty state: "No statistics" (team membership required)

#### Team Logs
- List of team-wide usage logs
- Same columns as Personal
- Empty state: "No team logs" (Admin/Owner only)

### Summary Cards (all tabs)
- Total Records count
- Total Tokens (formatted with commas)
- Total Credits (4 decimal places)
- Team Logs count

---

## Settings

**Purpose:** API key management and documentation

**Features:**

### API Key Section
- Status badge: Connected (green) or Not Connected (gray)
- Input field (password type) with eye toggle
- Test button (calls task.list with limit=1)
- Connect/Update button
- Disconnect button (if connected)
- Shows masked key if connected: `manus_sk_••••••••••••` + last 4 chars

### Rate Limits Table
- Endpoint name | Limit (e.g., "task.create | 10 / min")
- 11 rows for all major endpoints
- Static reference (no API call needed)

### Documentation Links
- Grid of 5 links: Introduction, Authentication, Task Lifecycle, Webhooks, Rate Limits
- Each link: icon + label + external link icon
- Hover effect: border + bg color change

### API Details Card
- Base URL: https://api.manus.ai
- Version: v2
- Auth Header: x-manus-api-key
- Max API Keys: 50 per account

---

## NotFound (404)

**Purpose:** Handle invalid routes

**Features:**
- Icon + "Page not found" message
- Link back to home
- Suggest checking the URL

---

## Component Specs

### PageHeader
Props: `title`, `description`, `actions` (optional ReactNode)
- Sticky top with border-bottom
- Title (h1), description (p), actions (right-aligned)

### StatusBadge
Props: `status` (string), `variant` (optional)
- Maps status to color: running→blue, stopped→gray, success→green, error→red

### EmptyState
Props: `icon` (React component), `title`, `description`, `action` (optional button)
- Centered layout with icon + text + CTA
- Used when list is empty

### ApiKeyGate
Props: `children`
- Renders children if API key connected
- Shows "API Key Required" message otherwise
- Button to navigate to Settings

### DashboardLayout
Props: `children`
- Fixed sidebar (260px) + main content
- Sidebar: logo + grouped nav + status at bottom
- Main: full-height scrollable content area
