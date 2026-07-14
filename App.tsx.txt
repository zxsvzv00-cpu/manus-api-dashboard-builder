import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Search, Bell, Command, X, ChevronDown, ChevronRight, LayoutDashboard,
  Cpu, Bot, Workflow, Sparkles, Database, Globe, Cloud, Shield, GitBranch,
  Activity, Brain, FileText, MessageSquare, Briefcase, BarChart3, CreditCard,
  Scale, Box, Store, Zap, Layers, Terminal, Settings, Maximize2, Split,
  Plus, AlertTriangle, CheckCircle2, Clock, MapPin, TrendingUp, Server,
  Hexagon, Eye, Lock, Key, Folder, FileCode, Package, Grid3X3, Monitor,
  Sun, Moon, Palette, PanelLeftClose, PanelLeftOpen, Flame, Gauge, Leaf,
  DollarSign, Users, Radio, GitCommit, Container, Network, Fingerprint,
  FileSearch, Mail, LineChart, Wallet, Gavel, Smartphone, Plug
} from "lucide-react";

// TYPES
type ModuleStatus = "Active" | "Beta" | "New";
type ModuleDef = {
  id: string;
  name: string;
  thai: string;
  status: ModuleStatus;
  desc: string;
  metric: number[];
  icon: any;
};
type Category = {
  id: number;
  key: string;
  nameEn: string;
  nameTh: string;
  icon: any;
  color: string;
  modules: ModuleDef[];
};

const mkMetric = () => Array.from({ length: 10 }, () => 20 + Math.random() * 70);

const CATEGORIES: Category[] = [
  {
    id: 1, key: "executive", nameEn: "Executive Command", nameTh: "ศูนย์บัญชาการ",
    icon: LayoutDashboard, color: "from-violet-600 to-indigo-600",
    modules: [
      { id: "kpi", name: "KPI Dashboard", thai: "แดชบอร์ด KPI", status: "Active", desc: "Real-time executive KPIs across org", metric: mkMetric(), icon: Gauge },
      { id: "ai-health", name: "AI Health Score", thai: "คะแนนสุขภาพ AI", status: "Active", desc: "Model drift, latency, error budget", metric: mkMetric(), icon: Activity },
      { id: "global-map", name: "Global Map", thai: "แผนที่สากล", status: "Active", desc: "Edge nodes & request heatmap", metric: mkMetric(), icon: Globe },
      { id: "live-status", name: "Live System Status", thai: "สถานะระบบสด", status: "Active", desc: "Core services heartbeat", metric: mkMetric(), icon: Radio },
      { id: "revenue", name: "Revenue Analytics", thai: "วิเคราะห์รายได้", status: "Beta", desc: "MRR, ARPU, churn forecast", metric: mkMetric(), icon: TrendingUp },
      { id: "cost", name: "Cost Analytics", thai: "วิเคราะห์ต้นทุน", status: "Active", desc: "GPU/LLM cost per workflow", metric: mkMetric(), icon: DollarSign },
      { id: "carbon", name: "Carbon Footprint", thai: "คาร์บอนฟุตพริ้นท์", status: "New", desc: "Sustainable AI compute tracker", metric: mkMetric(), icon: Leaf },
      { id: "sla", name: "SLA Monitor", thai: "มอนิเตอร์ SLA", status: "Active", desc: "99.9% uptime enforcement", metric: mkMetric(), icon: CheckCircle2 },
    ]
  },
  {
    id: 2, key: "ai-os", nameEn: "AI Operating System", nameTh: "ระบบปฏิบัติการ AI",
    icon: Cpu, color: "from-fuchsia-600 to-violet-600",
    modules: [
      { id: "kernel", name: "AI Kernel", thai: "เคอร์เนล AI", status: "Active", desc: "Core orchestration kernel", metric: mkMetric(), icon: Cpu },
      { id: "scheduler", name: "AI Scheduler", thai: "ตัวจัดตาราง AI", status: "Active", desc: "Priority & GPU scheduling", metric: mkMetric(), icon: Clock },
      { id: "agent-runtime", name: "Agent Runtime", thai: "รันไทม์เอเจนต์", status: "Active", desc: "Isolated agent execution", metric: mkMetric(), icon: Bot },
      { id: "prompt-compiler", name: "Prompt Compiler", thai: "คอมไพเลอร์พรอมต์", status: "Beta", desc: "Optimize prompts to tokens", metric: mkMetric(), icon: FileCode },
      { id: "workflow-engine", name: "Workflow Engine", thai: "เอ็นจิ้นเวิร์กโฟลว์", status: "Active", desc: "DAG execution engine", metric: mkMetric(), icon: Workflow },
      { id: "event-bus", name: "Event Bus", thai: "บัสเหตุการณ์", status: "Active", desc: "Pub/Sub for agents", metric: mkMetric(), icon: Network },
      { id: "memory-mgr", name: "Memory Manager", thai: "จัดการหน่วยความจำ", status: "Active", desc: "Context window manager", metric: mkMetric(), icon: Brain },
      { id: "reasoning", name: "Reasoning Engine", thai: "เอ็นจิ้นการให้เหตุผล", status: "Beta", desc: "Chain-of-thought orchestrator", metric: mkMetric(), icon: Sparkles },
      { id: "planning", name: "Planning Engine", thai: "เอ็นจิ้นวางแผน", status: "New", desc: "Goal decomposition planner", metric: mkMetric(), icon: Layers },
    ]
  },
  {
    id: 3, key: "multi-agent", nameEn: "Multi-Agent Center", nameTh: "ศูนย์มัลติเอเจนต์",
    icon: Bot, color: "from-indigo-600 to-cyan-600",
    modules: [
      { id: "agent-market", name: "Agent Marketplace", thai: "ตลาดเอเจนต์", status: "Active", desc: "Discover certified agents", metric: mkMetric(), icon: Store },
      { id: "agent-builder", name: "Agent Builder", thai: "สร้างเอเจนต์", status: "Active", desc: "No-code agent designer", metric: mkMetric(), icon: Package },
      { id: "agent-monitor", name: "Agent Monitor", thai: "มอนิเตอร์เอเจนต์", status: "Active", desc: "Live agent traces", metric: mkMetric(), icon: Eye },
      { id: "agent-chat", name: "Agent Chat", thai: "แชทเอเจนต์", status: "Active", desc: "Human-agent collaboration", metric: mkMetric(), icon: MessageSquare },
      { id: "agent-perm", name: "Agent Permission", thai: "สิทธิ์เอเจนต์", status: "Beta", desc: "Fine-grained RBAC", metric: mkMetric(), icon: Lock },
      { id: "agent-collab", name: "Agent Collaboration", thai: "เอเจนต์ร่วมมือ", status: "Beta", desc: "Multi-agent negotiation", metric: mkMetric(), icon: Users },
      { id: "human-approval", name: "Human Approval", thai: "อนุมัติโดยมนุษย์", status: "Active", desc: "HITL checkpoints", metric: mkMetric(), icon: Gavel },
      { id: "swarm", name: "Swarm AI", thai: "สวอร์ม AI", status: "New", desc: "1000+ agents orchestration", metric: mkMetric(), icon: Hexagon },
      { id: "autonomous", name: "Autonomous Teams", thai: "ทีมอัตโนมัติ", status: "New", desc: "Self-organizing crews", metric: mkMetric(), icon: Flame },
    ]
  },
  {
    id: 4, key: "workflow", nameEn: "Workflow Studio", nameTh: "สตูดิโอเวิร์กโฟลว์",
    icon: Workflow, color: "from-emerald-600 to-teal-600",
    modules: [
      { id: "dnd", name: "Drag & Drop", thai: "ลากและวาง", status: "Active", desc: "Visual canvas builder", metric: mkMetric(), icon: Grid3X3 },
      { id: "node-editor", name: "Node Editor", thai: "ตัวแก้โหนด", status: "Active", desc: "Typed node graph", metric: mkMetric(), icon: GitBranch },
      { id: "trigger", name: "Trigger", thai: "ทริกเกอร์", status: "Active", desc: "Webhook / Cron / Event", metric: mkMetric(), icon: Zap },
      { id: "condition", name: "Condition", thai: "เงื่อนไข", status: "Active", desc: "If / Switch logic", metric: mkMetric(), icon: GitCommit },
      { id: "ai-node", name: "AI Node", thai: "โหนด AI", status: "Active", desc: "LLM / Vision / Audio", metric: mkMetric(), icon: Sparkles },
      { id: "api-node", name: "API Node", thai: "โหนด API", status: "Active", desc: "REST / GraphQL call", metric: mkMetric(), icon: Plug },
      { id: "db-node", name: "Database Node", thai: "โหนดฐานข้อมูล", status: "Active", desc: "Query builder node", metric: mkMetric(), icon: Database },
      { id: "loop", name: "Loop", thai: "ลูป", status: "Beta", desc: "Iterate over arrays", metric: mkMetric(), icon: Container },
      { id: "parallel", name: "Parallel", thai: "ขนาน", status: "Beta", desc: "Fan-out / Fan-in", metric: mkMetric(), icon: Split },
      { id: "retry", name: "Retry & Version", thai: "ลองใหม่ & เวอร์ชัน", status: "Active", desc: "Retry policy + VCS", metric: mkMetric(), icon: Clock },
    ]
  },
  {
    id: 5, key: "ai-studio", nameEn: "AI Studio", nameTh: "สตูดิโอ AI",
    icon: Sparkles, color: "from-pink-600 to-rose-600",
    modules: [
      { id: "prompt-studio", name: "Prompt Studio", thai: "สตูดิโอพรอมต์", status: "Active", desc: "Prompt IDE with eval", metric: mkMetric(), icon: FileCode },
      { id: "rag-builder", name: "RAG Builder", thai: "สร้าง RAG", status: "Active", desc: "Ingest → Embed → Retrieve", metric: mkMetric(), icon: Database },
      { id: "fine-tune", name: "Fine Tune", thai: "ปรับจูน", status: "Beta", desc: "LoRA / QLoRA jobs", metric: mkMetric(), icon: Cpu },
      { id: "dataset", name: "Dataset Manager", thai: "จัดการดาต้าเซ็ต", status: "Active", desc: "Versioned datasets", metric: mkMetric(), icon: Folder },
      { id: "playground", name: "Model Playground", thai: "สนามทดสอบโมเดล", status: "Active", desc: "Compare 12 models", metric: mkMetric(), icon: FlaskConicalIcon },
      { id: "evaluation", name: "Evaluation", thai: "การประเมิน", status: "Beta", desc: "Golden set testing", metric: mkMetric(), icon: BarChart3 },
      { id: "prompt-lib", name: "Prompt Library", thai: "คลังพรอมต์", status: "Active", desc: "Team prompt registry", metric: mkMetric(), icon: FileText },
      { id: "chain", name: "Chain Builder", thai: "สร้างเชน", status: "New", desc: "LangChain visual", metric: mkMetric(), icon: GitBranch },
    ]
  },
  {
    id: 6, key: "database", nameEn: "Database Center", nameTh: "ศูนย์ฐานข้อมูล",
    icon: Database, color: "from-blue-600 to-indigo-600",
    modules: [
      { id: "pg", name: "PostgreSQL", thai: "โพสต์เกรส", status: "Active", desc: "Primary OLTP cluster", metric: mkMetric(), icon: Database },
      { id: "mysql", name: "MySQL", thai: "มายเอสคิวแอล", status: "Active", desc: "Legacy compat layer", metric: mkMetric(), icon: Database },
      { id: "mongo", name: "MongoDB", thai: "มอนโกดีบี", status: "Active", desc: "Document store", metric: mkMetric(), icon: Database },
      { id: "redis", name: "Redis", thai: "เรดิส", status: "Active", desc: "Cache & queue", metric: mkMetric(), icon: Zap },
      { id: "neo4j", name: "Neo4j", thai: "นีโอโฟร์เจ", status: "Beta", desc: "Knowledge graph DB", metric: mkMetric(), icon: GitBranch },
      { id: "clickhouse", name: "ClickHouse", thai: "คลิกเฮาส์", status: "Beta", desc: "OLAP analytics", metric: mkMetric(), icon: BarChart3 },
      { id: "vector", name: "Vector Database", thai: "เวกเตอร์ดีบี", status: "Active", desc: "Qdrant / Pinecone", metric: mkMetric(), icon: Brain },
      { id: "s3", name: "Object Storage", thai: "อ็อบเจกต์สตอเรจ", status: "Active", desc: "S3 compatible", metric: mkMetric(), icon: Box },
      { id: "backup", name: "Backup & Restore", thai: "สำรอง & กู้คืน", status: "Active", desc: "PITR & snapshots", metric: mkMetric(), icon: Shield },
    ]
  },
  {
    id: 7, key: "api", nameEn: "API Gateway", nameTh: "เกตเวย์ API",
    icon: Globe, color: "from-cyan-600 to-blue-600",
    modules: [
      { id: "rest", name: "REST", thai: "เรสต์", status: "Active", desc: "OpenAPI 3.1 gateway", metric: mkMetric(), icon: Globe },
      { id: "graphql", name: "GraphQL", thai: "กราฟคิวแอล", status: "Active", desc: "Federated gateway", metric: mkMetric(), icon: Hexagon },
      { id: "grpc", name: "gRPC", thai: "จีอาร์พีซี", status: "Beta", desc: "High perf RPC", metric: mkMetric(), icon: Zap },
      { id: "ws", name: "WebSocket", thai: "เว็บซ็อกเก็ต", status: "Active", desc: "Realtime channels", metric: mkMetric(), icon: Radio },
      { id: "ratelimit", name: "Rate Limit", thai: "จำกัดอัตรา", status: "Active", desc: "Token bucket / Sliding", metric: mkMetric(), icon: Gauge },
      { id: "keys", name: "API Keys", thai: "คีย์ API", status: "Active", desc: "Scoped keys & rotation", metric: mkMetric(), icon: Key },
      { id: "oauth", name: "OAuth2", thai: "โอออธ2", status: "Active", desc: "OIDC provider", metric: mkMetric(), icon: Fingerprint },
      { id: "openapi", name: "OpenAPI Docs", thai: "เอกสาร OpenAPI", status: "Active", desc: "Auto generated docs", metric: mkMetric(), icon: FileText },
      { id: "sdk", name: "SDK Generator", thai: "สร้าง SDK", status: "New", desc: "TS / Python / Go", metric: mkMetric(), icon: Package },
    ]
  },
  {
    id: 8, key: "cloud", nameEn: "Cloud Center", nameTh: "ศูนย์คลาวด์",
    icon: Cloud, color: "from-sky-600 to-indigo-600",
    modules: [
      { id: "aws", name: "AWS", thai: "เอดับเบิลยูเอส", status: "Active", desc: "EC2, EKS, Lambda", metric: mkMetric(), icon: Cloud },
      { id: "azure", name: "Azure", thai: "อาซัวร์", status: "Beta", desc: "AKS integration", metric: mkMetric(), icon: Cloud },
      { id: "gcp", name: "GCP", thai: "จีซีพี", status: "Beta", desc: "GKE & Vertex", metric: mkMetric(), icon: Cloud },
      { id: "k8s", name: "Kubernetes", thai: "คูเบอร์เนทีส", status: "Active", desc: "Multi-cluster", metric: mkMetric(), icon: Container },
      { id: "docker", name: "Docker", thai: "ด็อกเกอร์", status: "Active", desc: "Image registry", metric: mkMetric(), icon: Box },
      { id: "terraform", name: "Terraform", thai: "เทอร์ราฟอร์ม", status: "Active", desc: "IaC state", metric: mkMetric(), icon: FileCode },
      { id: "helm", name: "Helm", thai: "เฮล์ม", status: "Beta", desc: "Chart releases", metric: mkMetric(), icon: Package },
      { id: "gitops", name: "GitOps", thai: "กิตอปส์", status: "Beta", desc: "ArgoCD sync", metric: mkMetric(), icon: GitBranch },
      { id: "autoscale", name: "Auto Scaling", thai: "ปรับสเกลอัตโนมัติ", status: "Active", desc: "HPA + KEDA", metric: mkMetric(), icon: TrendingUp },
    ]
  },
  {
    id: 9, key: "security", nameEn: "Security Center", nameTh: "ศูนย์ความปลอดภัย",
    icon: Shield, color: "from-red-600 to-orange-600",
    modules: [
      { id: "rbac", name: "RBAC", thai: "อาร์แบค", status: "Active", desc: "Role based access", metric: mkMetric(), icon: Users },
      { id: "abac", name: "ABAC", thai: "เอแบค", status: "Beta", desc: "Attribute policies", metric: mkMetric(), icon: Scale },
      { id: "zero-trust", name: "Zero Trust", thai: "ซีโร่ทรัสต์", status: "Active", desc: "mTLS everywhere", metric: mkMetric(), icon: Shield },
      { id: "mfa", name: "MFA", thai: "เอ็มเอฟเอ", status: "Active", desc: "Passkey + TOTP", metric: mkMetric(), icon: Fingerprint },
      { id: "audit", name: "Audit Log", thai: "บันทึกตรวจสอบ", status: "Active", desc: "Immutable logs", metric: mkMetric(), icon: FileSearch },
      { id: "vault", name: "Secret Vault", thai: "ห้องนิรภัยซีเคร็ต", status: "Active", desc: "HashiCorp Vault", metric: mkMetric(), icon: Key },
      { id: "siem", name: "SIEM", thai: "ซีเอ็ม", status: "Beta", desc: "Log correlation", metric: mkMetric(), icon: Activity },
      { id: "soc", name: "SOC Dashboard", thai: "แดชบอร์ด SOC", status: "Beta", desc: "Threat ops", metric: mkMetric(), icon: Eye },
      { id: "threat", name: "Threat Detection", thai: "ตรวจจับภัยคุกคาม", status: "New", desc: "AI IDS", metric: mkMetric(), icon: AlertTriangle },
      { id: "compliance", name: "Compliance", thai: "การปฏิบัติตาม", status: "Active", desc: "SOC2 / ISO27001", metric: mkMetric(), icon: Gavel },
    ]
  },
  {
    id: 10, key: "devops", nameEn: "DevOps Center", nameTh: "ศูนย์ DevOps",
    icon: GitBranch, color: "from-orange-600 to-amber-600",
    modules: [
      { id: "cicd", name: "CI/CD", thai: "ซีไอ/ซีดี", status: "Active", desc: "Pipeline orchestrator", metric: mkMetric(), icon: GitBranch },
      { id: "github", name: "GitHub", thai: "กิตฮับ", status: "Active", desc: "Repo sync", metric: mkMetric(), icon: GitCommit },
      { id: "gitlab", name: "GitLab", thai: "กิตแล็บ", status: "Beta", desc: "Self-hosted", metric: mkMetric(), icon: GitCommit },
      { id: "jenkins", name: "Jenkins", thai: "เจนกินส์", status: "Beta", desc: "Legacy jobs", metric: mkMetric(), icon: Server },
      { id: "argocd", name: "ArgoCD", thai: "อาร์โกซีดี", status: "Active", desc: "GitOps deploy", metric: mkMetric(), icon: Cloud },
      { id: "rollback", name: "Rollback", thai: "ย้อนกลับ", status: "Active", desc: "One-click rollback", metric: mkMetric(), icon: Clock },
      { id: "canary", name: "Canary", thai: "คานารี", status: "Beta", desc: "Progressive delivery", metric: mkMetric(), icon: Activity },
      { id: "bluegreen", name: "Blue Green", thai: "บลูกรีน", status: "Beta", desc: "Zero-downtime", metric: mkMetric(), icon: Layers },
      { id: "release", name: "Release Manager", thai: "จัดการรีลีส", status: "Active", desc: "Semantic releases", metric: mkMetric(), icon: Package },
    ]
  },
  {
    id: 11, key: "monitoring", nameEn: "Monitoring", nameTh: "การมอนิเตอร์",
    icon: Activity, color: "from-lime-600 to-emerald-600",
    modules: [
      { id: "prom", name: "Prometheus", thai: "โพรมีธีอุส", status: "Active", desc: "Metrics TSDB", metric: mkMetric(), icon: BarChart3 },
      { id: "grafana", name: "Grafana", thai: "กราฟานา", status: "Active", desc: "Dashboards", metric: mkMetric(), icon: Monitor },
      { id: "loki", name: "Loki", thai: "โลกิ", status: "Active", desc: "Log aggregation", metric: mkMetric(), icon: FileText },
      { id: "jaeger", name: "Jaeger", thai: "เยเกอร์", status: "Beta", desc: "Distributed tracing", metric: mkMetric(), icon: Network },
      { id: "otel", name: "OpenTelemetry", thai: "โอเทล", status: "Active", desc: "Vendor-neutral telemetry", metric: mkMetric(), icon: Radio },
      { id: "logs", name: "Live Logs", thai: "ล็อกสด", status: "Active", desc: "Tail -f in browser", metric: mkMetric(), icon: Terminal },
      { id: "alerts", name: "Alerts & Incidents", thai: "แจ้งเตือน", status: "Active", desc: "On-call routing", metric: mkMetric(), icon: AlertTriangle },
    ]
  },
  {
    id: 12, key: "memory", nameEn: "AI Memory", nameTh: "หน่วยความจำ AI",
    icon: Brain, color: "from-violet-600 to-purple-600",
    modules: [
      { id: "short", name: "Short Memory", thai: "ความจำสั้น", status: "Active", desc: "Session buffer 128k", metric: mkMetric(), icon: Brain },
      { id: "long", name: "Long Memory", thai: "ความจำยาว", status: "Active", desc: "PGVector long-term", metric: mkMetric(), icon: Database },
      { id: "kg", name: "Knowledge Graph", thai: "กราฟความรู้", status: "Beta", desc: "Entity relationships", metric: mkMetric(), icon: GitBranch },
      { id: "vec-search", name: "Vector Search", thai: "ค้นหาเวกเตอร์", status: "Active", desc: "ANN search", metric: mkMetric(), icon: Search },
      { id: "semantic", name: "Semantic Search", thai: "ค้นหาเชิงความหมาย", status: "Active", desc: "Hybrid search", metric: mkMetric(), icon: Sparkles },
      { id: "timeline", name: "Memory Timeline", thai: "ไทม์ไลน์ความจำ", status: "Beta", desc: "Temporal recall", metric: mkMetric(), icon: Clock },
      { id: "replay", name: "Memory Replay", thai: "เล่นซ้ำความจำ", status: "New", desc: "Reconstruct context", metric: mkMetric(), icon: Eye },
    ]
  },
  {
    id: 13, key: "doc", nameEn: "Document Intelligence", nameTh: "เอกสารอัจฉริยะ",
    icon: FileText, color: "from-zinc-600 to-slate-600",
    modules: [
      { id: "ocr", name: "OCR", thai: "โอซีอาร์", status: "Active", desc: "Thai + English OCR", metric: mkMetric(), icon: Eye },
      { id: "pdf", name: "PDF AI", thai: "พีดีเอฟ AI", status: "Active", desc: "Layout-aware parse", metric: mkMetric(), icon: FileText },
      { id: "word", name: "Word / Excel", thai: "เวิร์ด/เอ็กเซล", status: "Active", desc: "Office parser", metric: mkMetric(), icon: FileCode },
      { id: "ppt", name: "PowerPoint AI", thai: "พาวเวอร์พอยต์", status: "Beta", desc: "Slide understanding", metric: mkMetric(), icon: Monitor },
      { id: "image-ai", name: "Image AI", thai: "รูปภาพ AI", status: "Active", desc: "Vision extraction", metric: mkMetric(), icon: Sparkles },
      { id: "table", name: "Table Extraction", thai: "แยกตาราง", status: "Beta", desc: "Structured tables", metric: mkMetric(), icon: Grid3X3 },
      { id: "summary", name: "Auto Summary", thai: "สรุปอัตโนมัติ", status: "Active", desc: "Map-reduce summary", metric: mkMetric(), icon: FileSearch },
    ]
  },
  {
    id: 14, key: "comm", nameEn: "Communication", nameTh: "การสื่อสาร",
    icon: MessageSquare, color: "from-blue-600 to-cyan-600",
    modules: [
      { id: "email", name: "Email", thai: "อีเมล", status: "Active", desc: "SES / Gmail sync", metric: mkMetric(), icon: Mail },
      { id: "line", name: "LINE OA", thai: "ไลน์ OA", status: "Active", desc: "Thai market integration", metric: mkMetric(), icon: MessageSquare },
      { id: "slack", name: "Slack", thai: "สแล็ก", status: "Active", desc: "Bot & slash commands", metric: mkMetric(), icon: MessageSquare },
      { id: "discord", name: "Discord", thai: "ดิสคอร์ด", status: "Beta", desc: "Community ops", metric: mkMetric(), icon: MessageSquare },
      { id: "teams", name: "Teams", thai: "ทีมส์", status: "Beta", desc: "M365 copilot", metric: mkMetric(), icon: Users },
      { id: "whatsapp", name: "WhatsApp", thai: "วอทส์แอป", status: "New", desc: "Business API", metric: mkMetric(), icon: Smartphone },
      { id: "sms", name: "SMS", thai: "เอสเอ็มเอส", status: "Active", desc: "Thai bulk SMS", metric: mkMetric(), icon: Smartphone },
      { id: "voice", name: "Voice Call", thai: "โทรด้วยเสียง", status: "New", desc: "Twilio voice agent", metric: mkMetric(), icon: Radio },
    ]
  },
  {
    id: 15, key: "business", nameEn: "Business Suite", nameTh: "ชุดธุรกิจ",
    icon: Briefcase, color: "from-amber-600 to-orange-600",
    modules: [
      { id: "crm", name: "CRM", thai: "ซีอาร์เอ็ม", status: "Active", desc: "AI lead scoring", metric: mkMetric(), icon: Users },
      { id: "erp", name: "ERP", thai: "อีอาร์พี", status: "Beta", desc: "Unified operations", metric: mkMetric(), icon: Briefcase },
      { id: "hrm", name: "HRM", thai: "เอชอาร์เอ็ม", status: "Active", desc: "Recruit → Payroll", metric: mkMetric(), icon: Users },
      { id: "finance-mod", name: "Finance Core", thai: "การเงินหลัก", status: "Active", desc: "GL / AP / AR", metric: mkMetric(), icon: Wallet },
      { id: "inventory", name: "Inventory", thai: "คลังสินค้า", status: "Active", desc: "WMS lite", metric: mkMetric(), icon: Box },
      { id: "procure", name: "Procurement", thai: "จัดซื้อ", status: "Beta", desc: "Vendor & PO", metric: mkMetric(), icon: FileText },
      { id: "mfg", name: "Manufacturing", thai: "การผลิต", status: "New", desc: "BOM & MES", metric: mkMetric(), icon: Container },
      { id: "pos", name: "POS", thai: "พีโอเอส", status: "Active", desc: "Retail checkout", metric: mkMetric(), icon: CreditCard },
      { id: "ecom", name: "E-Commerce", thai: "อีคอมเมิร์ซ", status: "Beta", desc: "Shopify / Shopee", metric: mkMetric(), icon: Store },
    ]
  },
  {
    id: 16, key: "analytics", nameEn: "AI Analytics", nameTh: "วิเคราะห์ AI",
    icon: BarChart3, color: "from-indigo-600 to-violet-600",
    modules: [
      { id: "predict", name: "Predictive", thai: "พยากรณ์", status: "Active", desc: "Time series forecast", metric: mkMetric(), icon: TrendingUp },
      { id: "forecast", name: "Forecast Studio", thai: "สตูดิโอพยากรณ์", status: "Beta", desc: "What-if simulation", metric: mkMetric(), icon: LineChart },
      { id: "recommend", name: "Recommendation", thai: "แนะนำ", status: "Active", desc: "Personalization engine", metric: mkMetric(), icon: Sparkles },
      { id: "bi", name: "BI Dashboard", thai: "แดชบอร์ด BI", status: "Active", desc: "Self-serve BI", metric: mkMetric(), icon: BarChart3 },
      { id: "warehouse", name: "Data Warehouse", thai: "คลังข้อมูล", status: "Active", desc: "BigQuery / Snowflake", metric: mkMetric(), icon: Database },
      { id: "lake", name: "Data Lake", thai: "ทะเลสาบข้อมูล", status: "Beta", desc: "Delta Lake", metric: mkMetric(), icon: Box },
    ]
  },
  {
    id: 17, key: "finance", nameEn: "Finance", nameTh: "การเงิน",
    icon: CreditCard, color: "from-emerald-600 to-green-600",
    modules: [
      { id: "billing", name: "Billing", thai: "บิลลิ่ง", status: "Active", desc: "Usage metering", metric: mkMetric(), icon: CreditCard },
      { id: "sub", name: "Subscription", thai: "สมัครสมาชิก", status: "Active", desc: "Plans & entitlements", metric: mkMetric(), icon: Package },
      { id: "stripe", name: "Stripe", thai: "สไตรป์", status: "Active", desc: "Global payments", metric: mkMetric(), icon: Wallet },
      { id: "promptpay", name: "PromptPay", thai: "พร้อมเพย์", status: "Active", desc: "Thai QR payments", metric: mkMetric(), icon: Smartphone },
      { id: "qr", name: "QR Payment", thai: "จ่ายคิวอาร์", status: "Active", desc: "Scan to pay", metric: mkMetric(), icon: Grid3X3 },
      { id: "tax", name: "Tax & Invoice", thai: "ภาษี & ใบแจ้งหนี้", status: "Beta", desc: "e-Tax Thailand", metric: mkMetric(), icon: FileText },
      { id: "accounting", name: "Accounting", thai: "บัญชี", status: "Beta", desc: "Double-entry ledger", metric: mkMetric(), icon: Scale },
    ]
  },
  {
    id: 18, key: "governance", nameEn: "AI Governance", nameTh: "ธรรมาภิบาล AI",
    icon: Scale, color: "from-slate-600 to-gray-600",
    modules: [
      { id: "xai", name: "Explainable AI", thai: "อธิบายได้", status: "Active", desc: "SHAP / LIME traces", metric: mkMetric(), icon: Eye },
      { id: "policy", name: "Policy Engine", thai: "เอ็นจิ้นนโยบาย", status: "Active", desc: "OPA / Cedar", metric: mkMetric(), icon: Gavel },
      { id: "risk", name: "Risk Score", thai: "คะแนนความเสี่ยง", status: "Beta", desc: "Model risk rating", metric: mkMetric(), icon: AlertTriangle },
      { id: "approval-matrix", name: "Approval Matrix", thai: "เมทริกซ์อนุมัติ", status: "Active", desc: "Multi-level approvals", metric: mkMetric(), icon: CheckCircle2 },
      { id: "decision-log", name: "Decision Log", thai: "บันทึกการตัดสินใจ", status: "Active", desc: "Immutable audit", metric: mkMetric(), icon: FileSearch },
      { id: "ethics", name: "AI Ethics", thai: "จริยธรรม AI", status: "New", desc: "Bias detection", metric: mkMetric(), icon: Scale },
      { id: "compliance-gov", name: "Compliance", thai: "การปฏิบัติตาม", status: "Beta", desc: "EU AI Act ready", metric: mkMetric(), icon: Shield },
    ]
  },
  {
    id: 19, key: "twin", nameEn: "Digital Twin", nameTh: "ฝาแฝดดิจิทัล",
    icon: Box, color: "from-teal-600 to-cyan-600",
    modules: [
      { id: "org-twin", name: "Organization Twin", thai: "ฝาแฝดองค์กร", status: "Beta", desc: "Org simulation", metric: mkMetric(), icon: Users },
      { id: "factory-twin", name: "Factory Twin", thai: "ฝาแฝดโรงงาน", status: "Beta", desc: "Digital factory", metric: mkMetric(), icon: Container },
      { id: "city-twin", name: "City Twin", thai: "ฝาแฝดเมือง", status: "New", desc: "Urban simulation", metric: mkMetric(), icon: MapPin },
      { id: "iot-dash", name: "IoT Dashboard", thai: "แดชบอร์ด IoT", status: "Active", desc: "MQTT / CoAP", metric: mkMetric(), icon: Radio },
      { id: "sensor", name: "Sensor Analytics", thai: "วิเคราะห์เซ็นเซอร์", status: "Active", desc: "Anomaly detection", metric: mkMetric(), icon: Activity },
    ]
  },
  {
    id: 20, key: "marketplace", nameEn: "Marketplace", nameTh: "ตลาดกลาง",
    icon: Store, color: "from-pink-600 to-violet-600",
    modules: [
      { id: "ai-apps", name: "AI Apps", thai: "แอป AI", status: "Active", desc: "1-click install apps", metric: mkMetric(), icon: Store },
      { id: "plugins", name: "Plugins", thai: "ปลั๊กอิน", status: "Active", desc: "Extend MANUS", metric: mkMetric(), icon: Plug },
      { id: "extensions", name: "Extensions", thai: "ส่วนขยาย", status: "Beta", desc: "VSCode-like DX", metric: mkMetric(), icon: Package },
      { id: "connectors", name: "Connectors", thai: "ตัวเชื่อมต่อ", status: "Active", desc: "300+ connectors", metric: mkMetric(), icon: Network },
      { id: "themes", name: "Themes", thai: "ธีม", status: "Active", desc: "Glass / Cyberpunk", metric: mkMetric(), icon: Palette },
      { id: "templates", name: "Templates", thai: "เทมเพลต", status: "Active", desc: "Workflow templates", metric: mkMetric(), icon: FileCode },
    ]
  },
];

// Fallback icon for AI Studio playground (was missing)
function FlaskConicalIcon(props: any) {
  return <Sparkles {...props} />;
}

export default function App() {
  const [time, setTime] = useState(new Date().toLocaleTimeString('th-TH'));
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(1);
  const [expanded, setExpanded] = useState<Set<number>>(new Set([1,2,3]));
  const [selectedModule, setSelectedModule] = useState<ModuleDef | null>(null);
  const [openTabs, setOpenTabs] = useState<ModuleDef[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [splitView, setSplitView] = useState(false);
  const [showCmd, setShowCmd] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showArch, setShowArch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState<"dark" | "light" | "cyber">("dark");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date().toLocaleTimeString('th-TH')), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); setShowCmd(true);
      }
      if (e.key === "Escape") { setShowCmd(false); setShowNotif(false); setShowArch(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const activeCategory = useMemo(() => CATEGORIES.find(c => c.id === activeCategoryId)!, [activeCategoryId]);

  const allModules = useMemo(() => CATEGORIES.flatMap(c => c.modules.map(m => ({...m, cat: c.nameEn, catTh: c.nameTh, catId: c.id}))), []);

  const filteredModules = useMemo(() => {
    if (!searchQuery) return activeCategory.modules;
    const q = searchQuery.toLowerCase();
    return activeCategory.modules.filter(m => m.name.toLowerCase().includes(q) || m.thai.includes(q) || m.desc.toLowerCase().includes(q));
  }, [searchQuery, activeCategory]);

  const cmdFiltered = useMemo(() => {
    if (!searchQuery && !showCmd) return [];
    const q = searchQuery.toLowerCase();
    if (!q) return allModules.slice(0, 8);
    return allModules.filter(m => m.name.toLowerCase().includes(q) || m.thai.includes(q) || (m as any).cat.toLowerCase().includes(q)).slice(0, 10);
  }, [searchQuery, allModules, showCmd]);

  const openModule = (mod: ModuleDef) => {
    setSelectedModule(mod);
    if (!openTabs.find(t => t.id === mod.id)) {
      setOpenTabs(prev => [...prev, mod].slice(-6));
    }
    setActiveTabId(mod.id);
  };

  const closeTab = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setOpenTabs(prev => prev.filter(t => t.id !== id));
    if (activeTabId === id) {
      const remaining = openTabs.filter(t => t.id !== id);
      setActiveTabId(remaining.length ? remaining[remaining.length-1].id : null);
      setSelectedModule(remaining.length ? remaining[remaining.length-1] : null);
    }
  };

  const toggleExpand = (id: number) => {
    setExpanded(prev => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    });
  };

  const isDark = theme !== "light";

  return (
    <div className={`min-h-screen w-full flex flex-col overflow-hidden relative font-[Kanit,Inter,sans-serif] ${isDark ? "bg-[#030712] text-slate-100" : "bg-[#f8fafc] text-slate-900"} transition-colors`}>
      {/* scanlines */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.04] mix-blend-screen" style={{
        backgroundImage: `linear-gradient(transparent 50%, rgba(0,0,0,0.5) 50%), linear-gradient(90deg, rgba(255,0,0,0.06), rgba(0,255,0,0.02), rgba(0,0,255,0.06))`,
        backgroundSize: "100% 4px, 3px 100%"
      }} />

      {/* TOP BAR */}
      <header className={`h-[56px] shrink-0 z-20 flex items-center justify-between px-3 md:px-4 border-b backdrop-blur-xl ${isDark ? "bg-[#0a0f1d]/80 border-white/10" : "bg-white/80 border-slate-200"}`}>
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className={`p-2 rounded-lg ${isDark ? "hover:bg-white/10" : "hover:bg-slate-100"} transition`}>
            {sidebarCollapsed ? <PanelLeftOpen size={18}/> : <PanelLeftClose size={18}/>}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 grid place-items-center font-black tracking-widest text-white shadow-lg shadow-violet-600/20">M</div>
            <div className="leading-tight">
              <div className="font-bold tracking-widest text-[13px]">MANUS <span className="text-violet-400">v10</span></div>
              <div className={`text-[10px] uppercase tracking-[0.18em] ${isDark ? "text-white/40" : "text-slate-500"}`}>Ultimate Enterprise OS</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 ml-6">
            <div className={`h-6 px-2.5 rounded-full text-[11px] flex items-center gap-1.5 border ${isDark ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300" : "bg-emerald-50 border-emerald-200 text-emerald-700"}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> SLA 99.95%
            </div>
            <div className={`h-6 px-2.5 rounded-full text-[11px] ${isDark ? "bg-white/5 border border-white/10" : "bg-slate-100 border border-slate-200"}`}>TH • Production</div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-1 justify-end max-w-[680px]">
          {/* global search */}
          <div className="relative hidden md:block w-full max-w-[320px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
            <input
              ref={searchRef}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setShowCmd(true)}
              placeholder="ค้นหาโมดูล, คำสั่ง, เอกสาร…"
              className={`w-full h-9 pl-9 pr-16 rounded-xl text-[13px] outline-none border transition ${isDark ? "bg-white/[0.06] border-white/10 focus:border-violet-500/50 placeholder:text-white/30" : "bg-slate-100 border-slate-200 focus:border-violet-400 placeholder:text-slate-400"}`}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <kbd className={`px-1.5 py-0.5 rounded text-[10px] border ${isDark ? "bg-white/10 border-white/10" : "bg-white border-slate-200"}`}>Ctrl</kbd>
              <kbd className={`px-1 py-0.5 rounded text-[10px] border ${isDark ? "bg-white/10 border-white/10" : "bg-white border-slate-200"}`}>K</kbd>
            </div>
          </div>

          <button onClick={() => setTheme(t => t === "dark" ? "light" : t === "light" ? "cyber" : "dark")}
            className={`w-9 h-9 grid place-items-center rounded-xl border transition ${isDark ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-white border-slate-200 hover:bg-slate-50"}`}>
            {theme === "dark" ? <Moon size={16}/> : theme === "light" ? <Sun size={16}/> : <Palette size={16}/>}
          </button>

          <div className={`hidden md:flex items-center gap-2 h-9 px-3 rounded-xl border text-xs font-mono ${isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-200"}`}>
            <Clock size={12} className="opacity-60" /> {time}
          </div>

          <button onClick={() => setShowNotif(!showNotif)} className={`relative w-9 h-9 grid place-items-center rounded-xl border transition ${isDark ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-white border-slate-200"}`}>
            <Bell size={16} />
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 text-[11px] grid place-items-center text-white font-bold shadow">3</span>
          </button>

          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 p-[1px] shadow">
            <div className={`w-full h-full rounded-[10px] grid place-items-center text-[11px] font-bold ${isDark ? "bg-[#0a0f1d]" : "bg-white"}`}>NP</div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative z-10">
        {/* SIDEBAR */}
        <aside className={`${sidebarCollapsed ? "w-0 md:w-[72px]" : "w-[300px]"} shrink-0 border-r flex flex-col transition-all duration-300 overflow-hidden ${isDark ? "bg-[#0a0f1d]/60 border-white/10 backdrop-blur-xl" : "bg-white/70 border-slate-200 backdrop-blur-xl"}`}>
          <div className="p-3 flex items-center justify-between">
            {!sidebarCollapsed && <div className="text-[11px] tracking-widest uppercase opacity-50">20 Categories • 100+ Modules</div>}
            <button onClick={() => setShowArch(true)} className={`ml-auto text-[11px] px-2.5 py-1 rounded-full border transition ${isDark ? "bg-violet-500/15 border-violet-500/30 text-violet-300 hover:bg-violet-500/25" : "bg-violet-50 border-violet-200 text-violet-700"}`}>View Architecture</button>
          </div>

          <div className="flex-1 overflow-y-auto px-2 pb-24 space-y-1 custom-scroll">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const isActive = cat.id === activeCategoryId;
              const isExpanded = expanded.has(cat.id);
              return (
                <div key={cat.id} className={`rounded-2xl border transition ${isActive ? (isDark ? "bg-white/[0.04] border-white/10" : "bg-violet-50 border-violet-200") : "border-transparent"}`}>
                  <button
                    onClick={() => { setActiveCategoryId(cat.id); if (sidebarCollapsed) setSidebarCollapsed(false); else toggleExpand(cat.id); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-left transition ${isActive ? "text-white" : isDark ? "hover:bg-white/[0.03]" : "hover:bg-slate-50"}`}>
                    <div className={`w-9 h-9 rounded-xl grid place-items-center shrink-0 bg-gradient-to-br ${cat.color} text-white shadow-md`}>
                      <Icon size={16} />
                    </div>
                    {!sidebarCollapsed && (
                      <>
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] font-medium leading-tight truncate">{cat.nameEn}</div>
                          <div className={`text-[11px] truncate ${isDark ? "text-white/45" : "text-slate-500"}`}>{cat.nameTh}</div>
                        </div>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full border shrink-0 ${isDark ? "bg-white/5 border-white/10 text-white/60" : "bg-white border-slate-200 text-slate-600"}`}>{cat.modules.length}</span>
                        <ChevronDown size={14} className={`opacity-40 transition ${isExpanded ? "" : "-rotate-90"}`} />
                      </>
                    )}
                  </button>
                  {!sidebarCollapsed && isExpanded && (
                    <div className="px-2 pb-2 space-y-0.5">
                      {cat.modules.map(m => {
                        const MIcon = m.icon;
                        const activeMod = selectedModule?.id === m.id;
                        return (
                          <button key={m.id} onClick={() => openModule(m)}
                            className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-[12.5px] transition border ${activeMod ? (isDark ? "bg-violet-500/15 border-violet-500/30 text-violet-200" : "bg-white border-violet-200 text-violet-700 shadow-sm") : (isDark ? "border-transparent text-white/55 hover:text-white hover:bg-white/5" : "border-transparent text-slate-600 hover:bg-slate-100")}`}>
                            <MIcon size={14} className="opacity-70 shrink-0" />
                            <span className="truncate text-left flex-1">{m.name}</span>
                            <span className={`text-[9px] px-1 py-0 rounded-full ${m.status==="Active" ? "bg-emerald-500/20 text-emerald-400" : m.status==="Beta" ? "bg-amber-500/20 text-amber-400" : "bg-fuchsia-500/20 text-fuchsia-300"}`}>{m.status}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* bottom status */}
          {!sidebarCollapsed && (
            <div className={`p-3 border-t ${isDark ? "border-white/10 bg-black/20" : "border-slate-200 bg-slate-50"}`}>
              <div className="flex items-center gap-2 text-[11px]">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="opacity-70">AI Kernel • v10.0.4 •</span>
                <span className="text-emerald-400">Healthy</span>
              </div>
            </div>
          )}
        </aside>

        {/* MAIN */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {/* workspace tabs */}
          <div className={`h-[44px] shrink-0 flex items-center gap-1 px-2 border-b overflow-x-auto no-scrollbar ${isDark ? "bg-[#080c18]/80 border-white/10" : "bg-white border-slate-200"}`}>
            <button onClick={() => { setActiveTabId(null); setSelectedModule(null); }}
              className={`h-7 px-3 rounded-full text-[12px] flex items-center gap-1.5 border shrink-0 transition ${!activeTabId ? (isDark ? "bg-white text-black border-white" : "bg-slate-900 text-white border-slate-900") : (isDark ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-slate-100 border-slate-200")}`}>
              <LayoutDashboard size={12}/> Executive
            </button>
            {openTabs.map(t => {
              const active = t.id === activeTabId;
              return (
                <button key={t.id} onClick={() => { setActiveTabId(t.id); setSelectedModule(t); }}
                  className={`h-7 px-2.5 pr-1 rounded-full text-[12px] flex items-center gap-1.5 border shrink-0 transition ${active ? (isDark ? "bg-violet-500 text-white border-violet-500" : "bg-violet-600 text-white border-violet-600") : (isDark ? "bg-white/5 border-white/10 hover:bg-white/10 text-white/70" : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600")}`}>
                  {t.name}
                  <span onClick={(e) => closeTab(t.id, e)} className="w-5 h-5 grid place-items-center rounded-full hover:bg-black/10"><X size={12}/></span>
                </button>
              );
            })}
            <div className="ml-auto flex items-center gap-1.5">
              <button onClick={() => setSplitView(!splitView)} className={`h-7 px-2.5 rounded-full text-[11px] flex items-center gap-1 border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-200"} ${splitView ? "text-violet-400 border-violet-400/40" : ""}`}>
                <Split size={12}/> {splitView ? "Split ON" : "Split"}
              </button>
              <button className={`w-7 h-7 grid place-items-center rounded-full border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-200"}`}><Maximize2 size={12}/></button>
            </div>
          </div>

          <div className="flex-1 overflow-auto custom-scroll p-3 md:p-5 pb-28">
            {/* EXECUTIVE DASHBOARD default */}
            {!activeTabId && activeCategoryId === 1 ? (
              <div className="space-y-5 max-w-[1440px] mx-auto">
                {/* KPI */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { label: "AI Health", value: "98.2%", sub: "↑ 1.2% 7d", icon: Activity, grad: "from-violet-600 to-indigo-600" },
                    { label: "Active Agents", value: "247", sub: "12 swarms", icon: Bot, grad: "from-fuchsia-600 to-violet-600" },
                    { label: "Cost Today", value: "$842", sub: "↓ 8% vs yesterday", icon: DollarSign, grad: "from-emerald-600 to-teal-600" },
                    { label: "SLA", value: "99.95%", sub: "30d window", icon: CheckCircle2, grad: "from-blue-600 to-cyan-600" },
                  ].map(k => (
                    <div key={k.label} className={`rounded-[20px] p-4 border backdrop-blur-xl relative overflow-hidden ${isDark ? "bg-white/[0.04] border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>
                      <div className={`absolute -right-8 -top-8 w-24 h-24 rounded-full bg-gradient-to-br ${k.grad} opacity-20 blur-2xl`} />
                      <div className="flex items-start justify-between">
                        <div className={`w-9 h-9 rounded-xl grid place-items-center bg-gradient-to-br ${k.grad} text-white shadow`}><k.icon size={16}/></div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${isDark ? "bg-white/10" : "bg-slate-100"}`}>{k.sub}</span>
                      </div>
                      <div className="mt-3 text-[11px] uppercase tracking-widest opacity-50">{k.label}</div>
                      <div className="text-[28px] font-semibold leading-none mt-1">{k.value}</div>
                      <div className="mt-3 h-[28px] w-full">
                        <svg viewBox="0 0 100 28" className="w-full h-full">
                          <polyline fill="none" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" points={mkMetric().map((v,i)=>`${i*11},${28 - v*0.22}`).join(" ")} />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-12 gap-3">
                  {/* Global Map */}
                  <div className={`col-span-12 lg:col-span-7 rounded-[20px] border p-4 md:p-5 backdrop-blur-xl overflow-hidden relative ${isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium flex items-center gap-2"><Globe size={16} className="text-violet-400"/> Global Edge Map • Live Requests</h3>
                      <span className={`text-[11px] px-2 py-1 rounded-full border ${isDark ? "bg-white/5 border-white/10" : "bg-slate-100 border-slate-200"}`}>14 regions • 2.4M req/min</span>
                    </div>
                    <div className={`relative h-[260px] rounded-2xl overflow-hidden border ${isDark ? "bg-[#050a18] border-white/5" : "bg-slate-50 border-slate-200"}`}>
                      {/* fake world grid */}
                      <div className="absolute inset-0 opacity-[0.08]" style={{backgroundImage:`linear-gradient(${isDark?"white":"black"} 1px, transparent 1px), linear-gradient(90deg, ${isDark?"white":"black"} 1px, transparent 1px)`, backgroundSize:"32px 32px"}}/>
                      {/* pulsing dots */}
                      {[
                        {x:18,y:28,c:"Bangkok"}, {x:72,y:22,c:"Virginia"}, {x:48,y:38,c:"Frankfurt"}, {x:82,y:62,c:"Singapore"}, {x:35,y:68,c:"Mumbai"}, {x:58,y:72,c:"Sydney"}
                      ].map(d=>(
                        <div key={d.c} className="absolute" style={{left:`${d.x}%`, top:`${d.y}%`}}>
                          <div className="w-2.5 h-2.5 rounded-full bg-violet-400 shadow-[0_0_12px_4px_rgba(139,92,246,0.6)] animate-pulse" />
                          <div className="absolute -inset-3 rounded-full border border-violet-400/30 animate-ping" />
                          <div className={`absolute left-4 -top-1 text-[10px] px-1.5 py-0.5 rounded-full whitespace-nowrap border backdrop-blur ${isDark ? "bg-black/60 border-white/10" : "bg-white border-slate-200 shadow"}`}>{d.c}</div>
                        </div>
                      ))}
                      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full opacity-30">
                        <path d="M 18 28 Q 35 15 48 38 T 72 22" fill="none" stroke="#8b5cf6" strokeDasharray="4 6" strokeWidth="0.8"/>
                        <path d="M 48 38 Q 65 55 82 62 T 58 72" fill="none" stroke="#06b6d4" strokeDasharray="4 6" strokeWidth="0.8"/>
                      </svg>
                    </div>
                  </div>

                  {/* Live System Status */}
                  <div className={`col-span-12 lg:col-span-5 rounded-[20px] border p-4 backdrop-blur-xl ${isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>
                    <h3 className="font-medium flex items-center gap-2 mb-3"><Radio size={16} className="text-emerald-400"/> Live System Status</h3>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        {name:"AI Kernel", up:"99.99%", ms:12, ok:true},
                        {name:"Agent Runtime", up:"99.92%", ms:23, ok:true},
                        {name:"Vector DB", up:"99.87%", ms:18, ok:true},
                        {name:"API Gateway", up:"100%", ms:9, ok:true},
                        {name:"Event Bus", up:"99.95%", ms:14, ok:true},
                        {name:"Workflow Engine", up:"98.4%", ms:42, ok:false},
                      ].map(s=>(
                        <div key={s.name} className={`rounded-xl p-3 border flex flex-col gap-2 ${isDark ? "bg-white/[0.03] border-white/5" : "bg-slate-50 border-slate-200"}`}>
                          <div className="flex items-center justify-between text-[12px]"><span className="flex items-center gap-1.5"><span className={`w-1.5 h-1.5 rounded-full ${s.ok?"bg-emerald-400":"bg-amber-400 animate-pulse"}`}/>{s.name}</span><span className={`text-[10px] px-1.5 py-0.5 rounded-full ${s.ok?"bg-emerald-500/15 text-emerald-400":"bg-amber-500/15 text-amber-400"}`}>{s.up}</span></div>
                          <div className={`text-[11px] flex justify-between ${isDark?"text-white/40":"text-slate-500"}`}><span>{s.ms}ms p95</span><span className="font-mono">{s.ok?"OPERATIONAL":"DEGRADED"}</span></div>
                          <div className="h-1 w-full rounded-full bg-black/20 overflow-hidden"><div className={`h-full ${s.ok?"bg-emerald-400":"bg-amber-400"}`} style={{width: s.up==="100%"?"100%":s.up}} /></div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 rounded-xl p-3 border border-amber-500/20 bg-amber-500/10 flex gap-2.5">
                      <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-0.5"/>
                      <div className="text-[12px] leading-snug"><b>Workflow Engine</b> latency spike detected in ap-southeast-1. Auto-scaling triggered (3 → 7 pods). <span className="underline decoration-dotted cursor-pointer">View logs</span></div>
                    </div>
                  </div>

                  {/* Revenue + Alerts */}
                  <div className={`col-span-12 lg:col-span-8 rounded-[20px] border p-4 backdrop-blur-xl ${isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium flex items-center gap-2"><TrendingUp size={16} className="text-violet-400"/> Revenue Analytics • MRR</h3>
                      <div className="flex gap-1.5 text-[11px]">
                        <span className={`px-2 py-1 rounded-full ${isDark?"bg-violet-500/20 text-violet-300":"bg-violet-50 text-violet-700"}`}>7D</span>
                        <span className={`px-2 py-1 rounded-full ${isDark?"bg-white/5 text-white/50":"bg-slate-100 text-slate-500"}`}>30D</span>
                        <span className={`px-2 py-1 rounded-full ${isDark?"bg-white/5 text-white/50":"bg-slate-100 text-slate-500"}`}>90D</span>
                      </div>
                    </div>
                    <div className="h-[140px] w-full relative">
                      <svg viewBox="0 0 400 120" className="w-full h-full">
                        <defs><linearGradient id="g" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35"/><stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"/></linearGradient></defs>
                        <path d="M0 80 Q40 70 80 65 T160 55 T240 50 T320 30 T400 20 L400 120 L0 120 Z" fill="url(#g)"/>
                        <path d="M0 80 Q40 70 80 65 T160 55 T240 50 T320 30 T400 20" fill="none" stroke="#8b5cf6" strokeWidth="2"/>
                        {[80,160,240,320].map(x=><circle key={x} cx={x} cy={x===80?65:x===160?55:x===240?50:30} r="3" fill="white" stroke="#8b5cf6" strokeWidth="2"/>)}
                      </svg>
                      <div className={`absolute bottom-0 left-0 right-0 flex justify-between text-[10px] px-1 ${isDark?"text-white/30":"text-slate-400"}`}><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      <div className={`rounded-xl p-2.5 border ${isDark?"bg-white/5 border-white/5":"bg-slate-50 border-slate-200"}`}><div className="text-[11px] opacity-60">MRR</div><div className="font-semibold">$128.4k</div><div className="text-[11px] text-emerald-400">↑ 12.3%</div></div>
                      <div className={`rounded-xl p-2.5 border ${isDark?"bg-white/5 border-white/5":"bg-slate-50 border-slate-200"}`}><div className="text-[11px] opacity-60">ARPU</div><div className="font-semibold">$84.2</div><div className="text-[11px] text-emerald-400">↑ 3.1%</div></div>
                      <div className={`rounded-xl p-2.5 border ${isDark?"bg-white/5 border-white/5":"bg-slate-50 border-slate-200"}`}><div className="text-[11px] opacity-60">Churn</div><div className="font-semibold">2.4%</div><div className="text-[11px] text-amber-400">→ stable</div></div>
                    </div>
                  </div>

                  <div className={`col-span-12 lg:col-span-4 rounded-[20px] border p-4 backdrop-blur-xl ${isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>
                    <h3 className="font-medium mb-3 flex items-center gap-2"><AlertTriangle size={16} className="text-amber-400"/> Alerts • 3 critical</h3>
                    <div className="space-y-2.5">
                      {[
                        {lvl:"critical", msg:"GPU quota 92% in us-east-1", time:"2m"},
                        {lvl:"warn", msg:"Prompt injection attempt blocked", time:"14m"},
                        {lvl:"info", msg:"New agent version deployed: coder-v2.4", time:"1h"},
                      ].map((a,i)=>(
                        <div key={i} className={`flex gap-2.5 p-2.5 rounded-xl border ${a.lvl==="critical"? "bg-red-500/10 border-red-500/20": a.lvl==="warn"?"bg-amber-500/10 border-amber-500/20":"bg-white/5 border-white/10"}`}>
                          <span className={`mt-0.5 w-1.5 h-1.5 rounded-full shrink-0 ${a.lvl==="critical"?"bg-red-400":a.lvl==="warn"?"bg-amber-400":"bg-blue-400"}`}/>
                          <div className="flex-1 min-w-0"><div className="text-[12.5px] leading-snug">{a.msg}</div><div className="text-[11px] opacity-50 mt-0.5">{a.time} ago • auto-action taken</div></div>
                        </div>
                      ))}
                      <button className={`w-full h-8 rounded-xl text-[12px] border ${isDark?"bg-white/5 border-white/10 hover:bg-white/10":"bg-slate-50 border-slate-200"}`}>View all in Incident Center →</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // MODULE GRID
              <div className="max-w-[1440px] mx-auto">
                <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
                  <div>
                    <h2 className="text-[22px] font-semibold leading-tight flex items-center gap-2.5">
                      <span className={`w-9 h-9 rounded-xl grid place-items-center bg-gradient-to-br ${activeCategory.color} text-white`}><activeCategory.icon size={18}/></span>
                      {activeCategory.nameEn} <span className={`text-[13px] font-normal px-2 py-0.5 rounded-full border ${isDark?"bg-white/5 border-white/10 text-white/50":"bg-slate-100 border-slate-200 text-slate-500"}`}>{activeCategory.nameTh}</span>
                    </h2>
                    <p className={`text-[13px] mt-1 ${isDark?"text-white/50":"text-slate-500"}`}>{activeCategory.modules.length} modules • Enterprise grade • {activeCategory.key} subsystem</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`h-8 px-3 rounded-full border text-[12px] flex items-center gap-1.5 ${isDark?"bg-white/5 border-white/10":"bg-white border-slate-200"}`}><Server size={12}/> {filteredModules.length} modules visible</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                  {filteredModules.map(mod => {
                    const Icon = mod.icon;
                    return (
                      <button key={mod.id} onClick={() => openModule(mod)} className={`group text-left rounded-[18px] border p-4 backdrop-blur-xl transition-all hover:scale-[1.01] hover:shadow-xl text-left relative overflow-hidden ${isDark ? "bg-white/[0.04] border-white/10 hover:bg-white/[0.06] hover:border-violet-500/30" : "bg-white border-slate-200 hover:border-violet-300 hover:shadow-lg"}`}>
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-violet-500/10 to-transparent blur-xl pointer-events-none group-hover:from-violet-500/20 transition" />
                        <div className="flex items-start justify-between">
                          <div className={`w-10 h-10 rounded-xl grid place-items-center bg-gradient-to-br ${activeCategory.color} text-white shadow`}><Icon size={18}/></div>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium tracking-wide ${mod.status==="Active" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" : mod.status==="Beta" ? "bg-amber-500/15 text-amber-400 border-amber-500/20" : "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/20"}`}>{mod.status}</span>
                        </div>
                        <div className="mt-3">
                          <div className="font-medium text-[14px] leading-tight">{mod.name}</div>
                          <div className={`text-[12px] ${isDark?"text-white/45":"text-slate-500"}`}>{mod.thai}</div>
                          <div className={`text-[12.5px] mt-2 leading-snug line-clamp-2 ${isDark?"text-white/60":"text-slate-600"}`}>{mod.desc}</div>
                        </div>
                        <div className="mt-3 flex items-end justify-between gap-3">
                          <div className="flex-1">
                            <svg viewBox="0 0 100 24" className="w-full h-[22px] opacity-70 group-hover:opacity-100 transition">
                              <polyline fill="none" stroke={mod.status==="Active"?"#8b5cf6":mod.status==="Beta"?"#f59e0b":"#e879f9"} strokeWidth="1.6" points={mod.metric.map((v,i)=>`${i*11},${24 - v*0.18}`).join(" ")} />
                            </svg>
                          </div>
                          <span className={`text-[11px] px-2 py-1 rounded-full border ${isDark?"bg-white/5 border-white/10 group-hover:bg-white/10":"bg-slate-50 border-slate-200 group-hover:bg-violet-50"}`}>Open →</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {filteredModules.length===0 && (
                  <div className={`mt-16 text-center py-16 rounded-[20px] border border-dashed ${isDark?"border-white/10 bg-white/[0.02]":"border-slate-300 bg-slate-50"}`}>
                    <Search size={28} className="mx-auto opacity-30 mb-3"/>
                    <div className="font-medium">ไม่พบโมดูลที่ค้นหา</div>
                    <div className={`text-[13px] mt-1 ${isDark?"text-white/40":"text-slate-500"}`}>ลองค้นหาด้วยคำอื่น เช่น "Agent", "Database", "API"</div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* DOCK */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 hidden md:flex items-end gap-1.5 px-3 py-2 rounded-[20px] border backdrop-blur-2xl shadow-2xl transition-all"
            style={{background: isDark ? "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))" : "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))", borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"}}>
            {[
              {icon: LayoutDashboard, label:"Dashboard", action:()=>{setActiveCategoryId(1); setActiveTabId(null); setSelectedModule(null);}},
              {icon: Bot, label:"Agents", action:()=>setActiveCategoryId(3)},
              {icon: Workflow, label:"Workflow", action:()=>setActiveCategoryId(4)},
              {icon: Database, label:"Database", action:()=>setActiveCategoryId(6)},
              {icon: Terminal, label:"Terminal", action:()=>{const m:CATEGORIES[0]['modules'][0] = {id:"terminal", name:"MANUS Terminal", thai:"เทอร์มินัล", status:"Active", desc:"AI-native shell", metric:mkMetric(), icon:Terminal}; openModule(m as any)}},
              {icon: Settings, label:"Settings", action:()=>setActiveCategoryId(9)},
            ].map(d=>(
              <button key={d.label} onClick={d.action} className="group relative w-11 h-11 rounded-[14px] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 grid place-items-center hover:scale-[1.25] hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-violet-500/20">
                <d.icon size={18} className={`${isDark?"text-white/80 group-hover:text-white":"text-slate-700"}`} />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-full text-[10px] whitespace-nowrap bg-black text-white opacity-0 group-hover:opacity-100 transition pointer-events-none">{d.label}</span>
              </button>
            ))}
            <div className={`w-px h-8 mx-1 self-center ${isDark?"bg-white/10":"bg-black/10"}`} />
            <button className="w-11 h-11 rounded-[14px] bg-gradient-to-br from-violet-600 to-indigo-600 grid place-items-center text-white shadow-lg shadow-violet-600/30 hover:scale-110 transition"><Plus size={18}/></button>
          </div>
        </main>

        {/* DETAIL DRAWER */}
        {selectedModule && (
          <aside className={`w-[380px] shrink-0 border-l flex flex-col backdrop-blur-xl transition-all ${isDark?"bg-[#0a0f1d]/90 border-white/10":"bg-white border-slate-200"} ${splitView ? "hidden xl:flex" : "flex"} max-md:fixed max-md:inset-0 max-md:w-full max-md:z-30`}>
            <div className={`h-[44px] flex items-center justify-between px-4 border-b shrink-0 ${isDark?"border-white/10":"border-slate-200"}`}>
              <div className="text-[13px] font-medium flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/> Module Inspector</div>
              <div className="flex items-center gap-1">
                <button onClick={()=>setSplitView(!splitView)} className={`w-7 h-7 grid place-items-center rounded-lg border ${isDark?"bg-white/5 border-white/10":"bg-slate-50 border-slate-200"}`}><Split size={12}/></button>
                <button onClick={()=>{setSelectedModule(null); setActiveTabId(null);}} className={`w-7 h-7 grid place-items-center rounded-lg border ${isDark?"bg-white/5 border-white/10":"bg-slate-50 border-slate-200"}`}><X size={14}/></button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scroll">
              <div className={`rounded-2xl p-4 border ${isDark?"bg-white/[0.04] border-white/10":"bg-slate-50 border-slate-200"}`}>
                <div className="flex gap-3">
                  <div className={`w-11 h-11 rounded-xl grid place-items-center bg-gradient-to-br ${activeCategory.color} text-white`}><selectedModule.icon size={20}/></div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold leading-tight">{selectedModule.name}</div>
                    <div className={`text-[12px] ${isDark?"text-white/50":"text-slate-500"}`}>{selectedModule.thai}</div>
                    <div className="flex gap-1.5 mt-1.5">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20`}>{selectedModule.status}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${isDark?"bg-white/5 border-white/10":"bg-white border-slate-200"}`}>v10.0.4</span>
                    </div>
                  </div>
                </div>
                <p className={`text-[13px] leading-relaxed mt-3 ${isDark?"text-white/65":"text-slate-600"}`}>{selectedModule.desc} — Enterprise module with auto-scaling, audit logs, and AI-powered remediation. SLA 99.9% guaranteed.</p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[{k:"Latency p95", v:"18ms"}, {k:"Throughput", v:"4.2k/s"}, {k:"Error", v:"0.02%"}].map(s=>(
                  <div key={s.k} className={`rounded-xl p-2.5 border text-center ${isDark?"bg-white/[0.03] border-white/5":"bg-white border-slate-200"}`}><div className="text-[10px] uppercase opacity-50">{s.k}</div><div className="font-semibold text-[13px] mt-0.5">{s.v}</div></div>
                ))}
              </div>

              <div>
                <h4 className="text-[12px] font-semibold uppercase tracking-widest opacity-60 mb-2">API Endpoints</h4>
                <div className="space-y-1.5 font-mono text-[11.5px]">
                  {[
                    {m:"GET", p:`/api/v1/${selectedModule.id}/status`},
                    {m:"POST", p:`/api/v1/${selectedModule.id}/run`},
                    {m:"GET", p:`/api/v1/${selectedModule.id}/metrics`},
                  ].map(r=>(
                    <div key={r.p} className={`flex items-center gap-2 px-2.5 py-2 rounded-xl border ${isDark?"bg-black/30 border-white/5":"bg-slate-50 border-slate-200"}`}>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${r.m==="GET"?"bg-emerald-500/20 text-emerald-400":"bg-violet-500/20 text-violet-300"}`}>{r.m}</span>
                      <span className="truncate opacity-80">{r.p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[12px] font-semibold uppercase tracking-widest opacity-60 mb-2">Live Metrics</h4>
                <div className={`rounded-xl border p-3 ${isDark?"bg-black/20 border-white/5":"bg-slate-50 border-slate-200"}`}>
                  <svg viewBox="0 0 100 36" className="w-full h-[72px]">
                    <polyline fill="none" stroke="#8b5cf6" strokeWidth="1.8" points={selectedModule.metric.map((v,i)=>`${i*11},${36 - v*0.3}`).join(" ")}/>
                  </svg>
                  <div className="flex justify-between text-[11px] opacity-50 mt-1"><span>00:00</span><span>now</span></div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white text-[13px] font-medium shadow-lg shadow-violet-600/20 hover:opacity-95 transition">Open Module →</button>
                <button className={`w-10 h-10 grid place-items-center rounded-xl border ${isDark?"bg-white/5 border-white/10 hover:bg-white/10":"bg-white border-slate-200"}`}><Eye size={16}/></button>
              </div>

              <div className={`rounded-xl p-3 border text-[12px] leading-relaxed ${isDark?"bg-amber-500/10 border-amber-500/20 text-amber-200/80":"bg-amber-50 border-amber-200 text-amber-800"}`}>
                <b className="flex items-center gap-1.5"><Shield size={12}/> Governance:</b> Requires approval for production deploy. Policy: <code className="px-1 py-0.5 rounded bg-black/20">ai.prod.deploy</code>
              </div>
            </div>
          </aside>
        )}

        {/* SPLIT SECOND PANE */}
        {splitView && selectedModule && (
          <aside className={`hidden xl:flex w-[380px] shrink-0 border-l flex-col ${isDark?"bg-[#080c18] border-white/10":"bg-slate-50 border-slate-200"}`}>
            <div className="h-[44px] px-4 flex items-center border-b border-white/10 text-[12px] opacity-60">Split View • Secondary</div>
            <div className="flex-1 p-4">
              <div className={`h-full rounded-2xl border border-dashed grid place-items-center p-6 text-center ${isDark?"border-white/10 bg-white/[0.02]":"border-slate-300 bg-white"}`}>
                <div>
                  <Layers size={28} className="mx-auto opacity-30 mb-2"/>
                  <div className="font-medium">Drag another module here</div>
                  <div className={`text-[12px] mt-1 ${isDark?"text-white/40":"text-slate-500"}`}>เปรียบเทียบ 2 โมดูลแบบ side-by-side เพื่อ debug workflow</div>
                  <button onClick={()=>setSplitView(false)} className="mt-4 h-8 px-3 rounded-full bg-violet-600 text-white text-[12px]">Exit Split</button>
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* COMMAND PALETTE */}
      {showCmd && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={()=>setShowCmd(false)} />
          <div className={`relative w-full max-w-[640px] rounded-[20px] border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 ${isDark?"bg-[#10162a] border-white/10":"bg-white border-slate-200"}`}>
            <div className="flex items-center gap-3 px-4 h-[52px] border-b border-white/10">
              <Search size={18} className="opacity-50"/>
              <input autoFocus value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="ค้นหาโมดูล, คำสั่ง, เอกสาร... (พิมพ์ภาษาไทยได้)" className="flex-1 bg-transparent outline-none text-[14px] placeholder:opacity-40"/>
              <kbd className={`px-2 py-1 rounded-lg text-[11px] border ${isDark?"bg-white/10 border-white/10":"bg-slate-100 border-slate-200"}`}>ESC</kbd>
            </div>
            <div className="p-2 max-h-[380px] overflow-y-auto custom-scroll">
              <div className="px-2 py-1.5 text-[11px] uppercase tracking-widest opacity-40">Commands</div>
              {[
                {icon: Palette, name:"Toggle Theme", desc:"สลับธีม Light / Dark / Cyberpunk"},
                {icon: FileCode, name:"Export Architecture", desc:"ส่งออกโครงสร้างเป็น JSON"},
                {icon: Bot, name:"Create New Agent", desc:"สร้างเอเจนต์ใหม่จากเทมเพลต"},
              ].map(c=>(
                <button key={c.name} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-white/10 transition ${isDark?"hover:bg-white/10":"hover:bg-slate-100"}`}>
                  <span className={`w-8 h-8 grid place-items-center rounded-lg ${isDark?"bg-white/10":"bg-slate-100"}`}><c.icon size={14}/></span>
                  <div className="flex-1"><div className="text-[13px] font-medium">{c.name}</div><div className="text-[11px] opacity-50">{c.desc}</div></div>
                  <Command size={12} className="opacity-30"/>
                </button>
              ))}
              <div className="px-2 py-2 text-[11px] uppercase tracking-widest opacity-40 mt-1">Modules • {cmdFiltered.length}</div>
              {cmdFiltered.map(m=>(
                <button key={m.id} onClick={()=>{openModule(m as any); setShowCmd(false); setSearchQuery("");}} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition ${isDark?"hover:bg-white/[0.06]":"hover:bg-slate-50"}`}>
                  <span className={`w-8 h-8 rounded-lg grid place-items-center bg-gradient-to-br ${CATEGORIES.find(c=>c.id=== (m as any).catId)?.color} text-white`}><m.icon size={14}/></span>
                  <div className="flex-1 min-w-0"><div className="text-[13px] font-medium truncate">{m.name} <span className="opacity-40 font-normal">• {m.thai}</span></div><div className="text-[11px] opacity-50 truncate">{(m as any).cat} • {m.desc}</div></div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${m.status==="Active"?"bg-emerald-500/20 text-emerald-400":"bg-white/10"}`}>{m.status}</span>
                </button>
              ))}
            </div>
            <div className={`h-9 flex items-center justify-between px-4 border-t text-[11px] ${isDark?"bg-black/20 border-white/5 text-white/40":"bg-slate-50 border-slate-200 text-slate-500"}`}>
              <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-emerald-400"/> 127 modules indexed</span>
              <span>↑↓ Navigate • ↵ Open • Esc Close</span>
            </div>
          </div>
        </div>
      )}

      {/* NOTIFICATION CENTER */}
      <div className={`fixed top-0 right-0 h-full w-[360px] z-40 border-l backdrop-blur-2xl shadow-2xl transition-transform duration-300 ${showNotif ? "translate-x-0" : "translate-x-full"} ${isDark ? "bg-[#0b1020]/90 border-white/10" : "bg-white/95 border-slate-200"}`}>
        <div className="h-[56px] flex items-center justify-between px-4 border-b border-white/10">
          <div className="font-medium flex items-center gap-2"><Bell size={16}/> Notification Center <span className="px-1.5 py-0.5 rounded-full bg-violet-600 text-white text-[10px]">3</span></div>
          <button onClick={()=>setShowNotif(false)} className={`w-8 h-8 grid place-items-center rounded-lg border ${isDark?"bg-white/5 border-white/10":"bg-slate-100 border-slate-200"}`}><X size={14}/></button>
        </div>
        <div className="p-3 space-y-2.5 overflow-y-auto h-[calc(100%-56px)] custom-scroll">
          {[
            {t:"Agent swarm scale-up completed", d:"247 agents active across 6 regions", time:"now", color:"emerald"},
            {t:"Cost anomaly detected", d:"LLM cost +22% in workflow_9f3", time:"12m", color:"amber"},
            {t:"Compliance check passed", d:"SOC2 audit logs verified", time:"1h", color:"violet"},
          ].map((n,i)=>(
            <div key={i} className={`p-3 rounded-2xl border ${isDark?"bg-white/[0.04] border-white/10":"bg-slate-50 border-slate-200"}`}>
              <div className="flex gap-2.5"><span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 bg-${n.color}-400`} style={{background: n.color==="emerald"?"#34d399":n.color==="amber"?"#fbbf24":"#8b5cf6"}}/><div className="flex-1"><div className="text-[13px] font-medium leading-snug">{n.t}</div><div className={`text-[12px] mt-1 ${isDark?"text-white/55":"text-slate-600"}`}>{n.d}</div><div className="text-[11px] opacity-40 mt-1.5">{n.time} • AI generated</div></div></div>
            </div>
          ))}
          <button className={`w-full h-9 rounded-xl border text-[12px] ${isDark?"bg-white/5 border-white/10":"bg-white border-slate-200"}`}>Mark all as read</button>
        </div>
      </div>

      {/* ARCHITECTURE MODAL */}
      {showArch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={()=>setShowArch(false)} />
          <div className={`relative w-full max-w-[980px] max-h-[88vh] rounded-[20px] border shadow-2xl overflow-hidden flex flex-col ${isDark?"bg-[#0e1428] border-white/10":"bg-white border-slate-200"}`}>
            <div className="h-[56px] flex items-center justify-between px-5 border-b border-white/10 shrink-0">
              <div className="font-semibold flex items-center gap-2.5"><Folder size={18} className="text-violet-400"/> MANUS-OS / Project Architecture <span className="text-[11px] px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/20">Enterprise Monorepo</span></div>
              <button onClick={()=>setShowArch(false)} className="w-8 h-8 grid place-items-center rounded-lg bg-white/10"><X size={14}/></button>
            </div>
            <div className="flex-1 overflow-auto p-4 md:p-6 grid md:grid-cols-[300px_1fr] gap-5 custom-scroll font-mono text-[12.5px]">
              <div className={`rounded-xl border p-3 ${isDark?"bg-black/30 border-white/5":"bg-slate-50 border-slate-200"}`}>
                <TreeNode label="MANUS-OS/" icon={<Folder size={12}/>} defaultOpen>
                  <TreeNode label="apps/" icon={<Package size={12}/>}>
                    {["command-center","executive-dashboard","workflow-studio","ai-studio","terminal","database-center","cloud-center","security-center","monitoring-center","marketplace","settings","admin"].map(a=>(
                      <TreeNode key={a} label={a} icon={<Box size={12} className="opacity-60"/>} />
                    ))}
                  </TreeNode>
                  <TreeNode label="packages/" icon={<Package size={12}/>}>
                    {["ui","charts","auth","sdk","api","shared"].map(p=>(
                      <TreeNode key={p} label={p} icon={<FileCode size={12} className="opacity-60"/>} />
                    ))}
                  </TreeNode>
                  <TreeNode label="services/" icon={<Server size={12}/>}>
                    {["gateway","ai-runtime","memory","workflow","auth","billing","notification","search","analytics"].map(s=>(
                      <TreeNode key={s} label={s} icon={<Cpu size={12} className="opacity-60"/>} />
                    ))}
                  </TreeNode>
                  <TreeNode label="infrastructure/" icon={<Cloud size={12}/>}>
                    {["docker","kubernetes","terraform","monitoring","github-actions"].map(i=>(
                      <TreeNode key={i} label={i} icon={<Container size={12} className="opacity-60"/>} />
                    ))}
                  </TreeNode>
                </TreeNode>
                <div className={`mt-4 p-2.5 rounded-xl border text-[11px] leading-relaxed ${isDark?"bg-violet-500/10 border-violet-500/20 text-violet-200/80":"bg-violet-50 border-violet-200 text-violet-800"}`}>
                  <b>Modular 100+ Architecture:</b> แยก frontend, backend, AI runtime และ infra ชัดเจน รองรับ multi-tenant, edge AI, และ plugin SDK เต็มรูปแบบ
                </div>
              </div>
              <div className="space-y-3">
                <div className={`rounded-xl border p-4 ${isDark?"bg-white/[0.03] border-white/10":"bg-white border-slate-200"}`}>
                  <h4 className="font-sans font-semibold text-[13px] mb-2">Enterprise Features Implemented</h4>
                  <div className="grid grid-cols-2 gap-2 text-[11.5px]">
                    {["Multi Tenant + SSO","RBAC / ABAC / Zero Trust","Kubernetes Native","High Availability","Disaster Recovery","Load Balancer","Edge AI","Offline Mode","Plugin SDK","Marketplace SDK","REST / GraphQL / gRPC","Webhooks & Event Streaming","Audit Trail","AI Agent SDK"].map(f=>(
                      <div key={f} className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-emerald-400 shrink-0"/>{f}</div>
                    ))}
                  </div>
                </div>
                <div className={`rounded-xl border p-4 ${isDark?"bg-black/20 border-white/5":"bg-slate-50 border-slate-200"}`}>
                  <div className="font-sans font-semibold text-[13px] mb-2">UI System • Glassmorphism + Cyberpunk</div>
                  <div className="flex flex-wrap gap-1.5">
                    {["Backdrop Blur","Rounded-2xl","Scanlines","Kanit + Inter + Fira Code","Dock macOS","Command Palette","Multi Window","Floating Panels","Workspace Tabs","Notification Center","AI Copilot","Voice Assistant","Search Everywhere","Keyboard Shortcuts","Custom Theme Engine"].map(t=>(
                      <span key={t} className={`px-2 py-1 rounded-full border text-[10.5px] ${isDark?"bg-white/5 border-white/10":"bg-white border-slate-200"}`}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl p-3 bg-gradient-to-br from-violet-600 to-indigo-600 text-white">
                  <div className="text-[13px] font-semibold">MANUS v10 Ultimate OS</div>
                  <div className="text-[11.5px] opacity-80 mt-1 leading-relaxed">นี่คือ production shell ที่สาธิตสถาปัตยกรรม 100+ โมดูล ไม่ใช่การยัดทุกอย่างไว้หน้าเดียว แต่เป็นระบบที่ scalable จริง พร้อมเชื่อมต่อ backend services ในอนาคต</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scroll::-webkit-scrollbar { width:5px; height:5px }
        .custom-scroll::-webkit-scrollbar-thumb { background: ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.15)"}; border-radius:999px }
        .no-scrollbar::-webkit-scrollbar { display:none }
        .no-scrollbar { -ms-overflow-style:none; scrollbar-width:none }
      `}</style>
    </div>
  );
}

function TreeNode({label, children, icon, defaultOpen=false}:{label:string; children?:React.ReactNode; icon?:React.ReactNode; defaultOpen?:boolean}) {
  const [open, setOpen] = useState(defaultOpen);
  const hasChildren = !!children;
  return (
    <div className="ml-1">
      <button onClick={()=> hasChildren && setOpen(!open)} className="flex items-center gap-1.5 py-1 px-1 rounded hover:bg-white/10 w-full text-left">
        {hasChildren ? <ChevronRight size={12} className={`transition ${open?"rotate-90":""} opacity-50`}/> : <span className="w-3"/>}
        <span className="opacity-70">{icon}</span>
        <span className="truncate">{label}</span>
      </button>
      {hasChildren && open && <div className="ml-3 border-l border-white/10 pl-2">{children}</div>}
    </div>
  );
}
