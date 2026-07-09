---
name: manus-api-dashboard-builder
description: Build a comprehensive Manus API management dashboard with task/project/file/webhook/agent management. Use when creating web apps to manage Manus API resources, monitor usage, or build admin panels for Manus automation workflows.
---

# Manus API Dashboard Builder

## Overview

This skill provides a complete workflow for building a full-featured Manus API management dashboard. It covers architecture decisions, component patterns, API client setup, and page implementations for all major Manus API v2 endpoints.

The resulting dashboard enables users to:
- Create, list, and manage tasks with real-time messaging
- Organize projects and files
- Configure webhooks and monitor events
- Browse available skills and connectors
- Manage custom IM agents
- Track API usage and team statistics
- Manage API keys and rate limits

**Design philosophy:** Dark Obsidian theme (dark slate + indigo accent) with glass-morphism cards, smooth animations, and premium developer-tool aesthetics.

## Core Architecture

### Tech Stack
- **Frontend:** React 19 + Tailwind 4 + shadcn/ui + Framer Motion
- **Routing:** Wouter (lightweight client-side router)
- **Data Fetching:** Axios with custom API client wrapper
- **State Management:** React Context (ApiContext for API key + auth)
- **Charts:** Recharts for usage analytics
- **UI Patterns:** Sidebar navigation, modal dialogs, empty states, status badges

### Project Structure
```
client/src/
├── pages/              # Route components (Home, Tasks, Projects, etc.)
├── components/         # Reusable UI (DashboardLayout, PageHeader, etc.)
├── contexts/          # React contexts (ApiContext, ThemeContext)
├── lib/               # Utilities (manus-api.ts client, utils.ts helpers)
└── index.css          # Global Tailwind + theme tokens
```

### Key Design Decisions

1. **API Key Storage:** Browser localStorage (user-controlled, not sent to backend)
2. **Error Handling:** Toast notifications with Sonner
3. **Empty States:** Consistent EmptyState component with icon + CTA
4. **Animations:** Stagger animations on list renders using Framer Motion
5. **Theme:** Dark mode by default (ThemeProvider with switchable option)

## Implementation Workflow

### Phase 1: Setup & Design
1. Initialize webdev project with React 19 template
2. Create `ideas.md` with design brainstorm (3 approaches, select 1)
3. Generate hero/brand images with `generate_image` tool
4. Update `index.css` with dark theme tokens and Geist fonts
5. Update `index.html` with Google Fonts link

### Phase 2: Core Infrastructure
1. **Create API client** (`lib/manus-api.ts`):
   - Define TypeScript interfaces for all resource types (Task, Project, File, Webhook, Skill, Connector, Agent, UsageRecord)
   - Implement ManusCli class with methods for each endpoint
   - Use axios with `x-manus-api-key` header
   - Base URL: `https://api.manus.ai/v2`

2. **Create contexts**:
   - `ApiContext.tsx` - Manage API key, client instance, connection state
   - `ThemeContext.tsx` - Manage light/dark theme

3. **Create layout components**:
   - `DashboardLayout.tsx` - Fixed sidebar (260px) + main content area
   - Sidebar: Grouped nav (Overview, Core, Automation, Analytics, Config)
   - Status indicator at bottom (Connected/Not Connected)

4. **Create shared components**:
   - `PageHeader.tsx` - Title + description + action buttons
   - `StatusBadge.tsx` - Status indicators (running/stopped/success/error)
   - `EmptyState.tsx` - Icon + title + description + CTA
   - `ApiKeyGate.tsx` - Wrapper requiring API key before rendering content

### Phase 3: Pages Implementation

See `references/pages-implementation.md` for detailed page specs.

**Core pages (11 total):**
- **Home** - Dashboard overview with stats + recent tasks + quick actions
- **Tasks** - List/create/detail/messages/stop/delete/reply
- **Projects** - List/create with instruction field
- **Files** - Upload (presigned S3)/list/delete
- **Webhooks** - List/create/delete + public key viewer
- **Skills** - List + copy ID + search
- **Connectors** - List + copy ID + status badges
- **Agents** - List + edit (name/instruction) + link to main task
- **Usage** - Personal records + team stats (charts) + team logs
- **Settings** - API key management + rate limits table + docs links
- **NotFound** - 404 page

### Phase 4: Polish & Deploy
1. Test all pages with mock API key
2. Verify error handling and empty states
3. Check responsive design on mobile
4. Create checkpoint before publishing
5. Publish via UI (auto-generates domain)

## Common Patterns

### List Page Pattern
```tsx
const [items, setItems] = useState<T[]>([]);
const [loading, setLoading] = useState(false);

const load = useCallback(async () => {
  if (!client) return;
  setLoading(true);
  try {
    const res = await client.listXxx();
    setItems(res.items || []);
  } catch (e) {
    toast.error(e instanceof Error ? e.message : "Failed to load");
  } finally {
    setLoading(false);
  }
}, [client]);

useEffect(() => { load(); }, [load]);
```

### Modal Dialog Pattern
```tsx
const [open, setOpen] = useState(false);
const [creating, setCreating] = useState(false);

const handleCreate = async () => {
  setCreating(true);
  try {
    const res = await client.createXxx(data);
    setItems(prev => [res.item, ...prev]);
    setOpen(false);
    toast.success("Created");
  } catch (e) {
    toast.error(e instanceof Error ? e.message : "Failed");
  } finally {
    setCreating(false);
  }
};
```

### Stagger Animation Pattern
```tsx
const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.05 } } },
  item: { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } },
};

<motion.div variants={stagger.container} initial="hidden" animate="show">
  {items.map(item => (
    <motion.div key={item.id} variants={stagger.item}>
      {/* content */}
    </motion.div>
  ))}
</motion.div>
```

## Manus API Integration

### Authentication
- Header: `x-manus-api-key: <api-key>`
- Base URL: `https://api.manus.ai/v2`
- All requests return `{ ok: boolean, data?: T, error?: { message: string } }`

### Key Endpoints Used
- `task.list` / `task.create` / `task.detail` / `task.sendMessage` / `task.stop` / `task.delete`
- `project.list` / `project.create`
- `file.upload` / `file.list` / `file.delete`
- `webhook.list` / `webhook.create` / `webhook.delete` / `webhook.getPublicKey`
- `skill.list`
- `connector.list`
- `agent.list` / `agent.update`
- `usage.list` / `usage.getTeamStatistic` / `usage.getTeamLog`

### Error Handling
- Network errors → "Connection failed"
- Invalid API key → "Invalid API key" (401)
- Rate limit → "Rate limited" (429)
- Show all errors as toast notifications

## Resources

For detailed specifications, see:
- **[pages-implementation.md](references/pages-implementation.md)** - Page-by-page implementation guide with component specs
- **[api-client-reference.md](references/api-client-reference.md)** - Complete ManusCli class reference with all methods
- **[design-tokens.md](references/design-tokens.md)** - Tailwind theme configuration and color palette

## Next Steps

1. **Auto-polling for running tasks** - Add 5s interval polling when task status is `running`
2. **Task search & filter** - Add search bar + status filters in Tasks page
3. **Webhook event log viewer** - New page showing webhook events received + signature verification
4. **Export/import configs** - Backup/restore API key and preferences
5. **Dark/light theme toggle** - Add theme switcher in Settings
