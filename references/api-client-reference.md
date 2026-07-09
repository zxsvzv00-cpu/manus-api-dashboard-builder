# Manus API Client Reference

## ManusCli Class

Complete reference for the API client wrapper (`lib/manus-api.ts`).

### Initialization

```typescript
import { ManusCli } from '@/lib/manus-api';

const client = new ManusCli('manus_sk_your_api_key_here');
```

### Task Methods

**listTasks(options?: { limit?: number, offset?: number })**
- Returns: `{ tasks: Task[] }`
- Lists all tasks, paginated
- Default limit: 50

**createTask(data: { description: string, model?: string, instruction?: string, enable_skills?: string[], force_skills?: string[], connectors?: string[] })**
- Returns: `{ task: Task }`
- Creates new task with optional model and instruction
- enable_skills: agent can choose to use these
- force_skills: agent must use these
- connectors: array of connector IDs to make available

**getTaskDetail(taskId: string)**
- Returns: `{ task: Task }`
- Get full task details including status and metadata

**listTaskMessages(taskId: string, options?: { limit?: number })**
- Returns: `{ messages: Message[] }`
- List all messages for a task
- Messages ordered by creation time

**sendTaskMessage(taskId: string, data: { message: string, connectors?: string[] })**
- Returns: `{ message: Message }`
- Send message to task (agent responds asynchronously)
- Optional connectors array for this message

**stopTask(taskId: string)**
- Returns: `{ task: Task }`
- Stop a running task
- Task status becomes `stopped`

**deleteTask(taskId: string)**
- Returns: `{ ok: boolean }`
- Delete task permanently
- Cannot delete running tasks

### Project Methods

**listProjects(options?: { limit?: number })**
- Returns: `{ projects: Project[] }`
- List all projects

**createProject(data: { name: string, description?: string, instruction?: string })**
- Returns: `{ project: Project }`
- Create new project with optional description and instruction

### File Methods

**getUploadUrl(filename: string, contentType: string)**
- Returns: `{ upload_url: string, file_id: string }`
- Get presigned S3 URL for upload
- Upload file to returned URL with PUT request
- Include Content-Type header in PUT

**listFiles(options?: { limit?: number })**
- Returns: `{ files: File[] }`
- List all uploaded files

**deleteFile(fileId: string)**
- Returns: `{ ok: boolean }`
- Delete file from storage

### Webhook Methods

**listWebhooks()**
- Returns: `{ webhooks: Webhook[] }`
- List all configured webhooks

**createWebhook(data: { url: string, events?: string[] })**
- Returns: `{ webhook: Webhook }`
- Create webhook
- events: array of event types (e.g., "task.created", "task.status_changed")
- Leave empty to subscribe to all events

**deleteWebhook(webhookId: string)**
- Returns: `{ ok: boolean }`
- Delete webhook

**getWebhookPublicKey()**
- Returns: `{ public_key: string }`
- Get RSA public key for verifying webhook signatures
- Use with RSA-SHA256 verification

### Skill Methods

**listSkills()**
- Returns: `{ skills: Skill[] }`
- List all available agent skills
- Skills can be used in task.create with enable_skills or force_skills

### Connector Methods

**listConnectors()**
- Returns: `{ connectors: Connector[] }`
- List all installed connectors
- Connectors can be passed to task.create or task.sendMessage

### Agent Methods

**listAgents()**
- Returns: `{ agents: Agent[] }`
- List all custom IM agents

**updateAgent(agentId: string, data: { name?: string, instruction?: string })**
- Returns: `{ agent: Agent }`
- Update agent name and/or instruction

### Usage Methods

**listUsage(options?: { limit?: number })**
- Returns: `{ records: UsageRecord[] }`
- List personal usage records (tokens + credits per task)

**getTeamStatistic(options?: { limit?: number })**
- Returns: `{ statistics: UsageStatistic[] }`
- Get team daily statistics (requires team membership)
- Returns array of daily aggregates with date, tokens, credits

**getTeamLog(options?: { limit?: number })**
- Returns: `{ logs: UsageRecord[] }`
- Get team-wide usage logs (Admin/Owner only)

## Type Definitions

```typescript
interface Task {
  id: string;
  description: string;
  status: 'running' | 'stopped' | 'waiting' | 'success' | 'error';
  model?: string;
  instruction?: string;
  created_at: string;
  updated_at?: string;
}

interface Message {
  id: string;
  task_id: string;
  sender: 'user' | 'assistant';
  content: string;
  created_at: string;
}

interface Project {
  id: string;
  name: string;
  description?: string;
  instruction?: string;
  created_at: string;
}

interface File {
  id: string;
  filename: string;
  size: number;
  content_type: string;
  created_at: string;
}

interface Webhook {
  id: string;
  url: string;
  events?: string[];
  created_at: string;
}

interface Skill {
  id: string;
  name: string;
  description?: string;
  enabled?: boolean;
}

interface Connector {
  id: string;
  name: string;
  type?: string;
  status?: string;
}

interface Agent {
  id: string;
  name: string;
  description?: string;
  instruction?: string;
  avatar?: string;
  task_id?: string;
  created_at: string;
}

interface UsageRecord {
  id?: string;
  task_id?: string;
  model?: string;
  tokens?: number;
  credits?: number;
  created_at: string;
}

interface UsageStatistic {
  date: string;
  tokens?: number;
  credits?: number;
}
```

## Error Handling

All methods throw errors on failure. Catch with try-catch:

```typescript
try {
  const res = await client.createTask({ description: "..." });
} catch (e) {
  const message = e instanceof Error ? e.message : "Unknown error";
  toast.error(message);
}
```

Common error messages:
- "Invalid API key" (401)
- "Rate limited" (429)
- "Not found" (404)
- "Connection failed" (network error)

## Context Usage

Wrap ManusCli in React Context for app-wide access:

```typescript
// ApiContext.tsx
const ApiContext = createContext<{ client?: ManusCli, apiKey: string, isConnected: boolean }>({
  apiKey: '',
  isConnected: false,
});

export function ApiProvider({ children }) {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('manus_api_key') || '');
  const client = apiKey ? new ManusCli(apiKey) : undefined;

  return (
    <ApiContext.Provider value={{ client, apiKey, isConnected: !!client }}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApi() {
  return useContext(ApiContext);
}
```

Then use in components:

```typescript
const { client, isConnected } = useApi();

if (!isConnected) {
  return <ApiKeyGate />;
}

const tasks = await client.listTasks();
```
