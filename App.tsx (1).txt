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
  { id: 1, key: "infrastructure", nameEn: "L1 Infrastructure Layer", nameTh: "โครงสร้างพื้นฐาน", icon: Server, color: "from-[#8B5A2B] to-[#5C3D1E]",
    modules: [
      { id: "kernel-manager", name: "Kernel Manager", thai: "Kernel Manager", status: "Active", desc: "Kernel Manager - enterprise grade module for L1 Infrastructure Layer", metric: mkMetric(), icon: Cpu },
      { id: "process-manager", name: "Process Manager", thai: "Process Manager", status: "Beta", desc: "Process Manager - enterprise grade module for L1 Infrastructure Layer", metric: mkMetric(), icon: Cpu },
      { id: "thread-scheduler", name: "Thread Scheduler", thai: "Thread Scheduler", status: "New", desc: "Thread Scheduler - enterprise grade module for L1 Infrastructure Layer", metric: mkMetric(), icon: Box },
      { id: "memory-manager", name: "Memory Manager", thai: "Memory Manager", status: "Active", desc: "Memory Manager - enterprise grade module for L1 Infrastructure Layer", metric: mkMetric(), icon: Cpu },
      { id: "resource-allocator", name: "Resource Allocator", thai: "Resource Allocator", status: "Beta", desc: "Resource Allocator - enterprise grade module for L1 Infrastructure Layer", metric: mkMetric(), icon: Box },
      { id: "gpu-manager", name: "GPU Manager", thai: "GPU Manager", status: "New", desc: "GPU Manager - enterprise grade module for L1 Infrastructure Layer", metric: mkMetric(), icon: Cpu },
      { id: "tpu-manager", name: "TPU Manager", thai: "TPU Manager", status: "Active", desc: "TPU Manager - enterprise grade module for L1 Infrastructure Layer", metric: mkMetric(), icon: Box },
      { id: "storage-manager", name: "Storage Manager", thai: "Storage Manager", status: "Beta", desc: "Storage Manager - enterprise grade module for L1 Infrastructure Layer", metric: mkMetric(), icon: Sparkles },
      { id: "network-manager", name: "Network Manager", thai: "Network Manager", status: "New", desc: "Network Manager - enterprise grade module for L1 Infrastructure Layer", metric: mkMetric(), icon: Box },
      { id: "power-manager", name: "Power Manager", thai: "Power Manager", status: "Active", desc: "Power Manager - enterprise grade module for L1 Infrastructure Layer", metric: mkMetric(), icon: Box },
      { id: "edge-runtime", name: "Edge Runtime", thai: "Edge Runtime", status: "Beta", desc: "Edge Runtime - enterprise grade module for L1 Infrastructure Layer", metric: mkMetric(), icon: Globe },
      { id: "container-runtime", name: "Container Runtime", thai: "Container Runtime", status: "New", desc: "Container Runtime - enterprise grade module for L1 Infrastructure Layer", metric: mkMetric(), icon: Box },
      { id: "virtual-machine-manager", name: "Virtual Machine Manager", thai: "Virtual Machine Manager", status: "Active", desc: "Virtual Machine Manager - enterprise grade module for L1 Infrastructure Layer", metric: mkMetric(), icon: Box },
      { id: "sandbox-runtime", name: "Sandbox Runtime", thai: "Sandbox Runtime", status: "Beta", desc: "Sandbox Runtime - enterprise grade module for L1 Infrastructure Layer", metric: mkMetric(), icon: Box },
      { id: "plugin-runtime", name: "Plugin Runtime", thai: "Plugin Runtime", status: "New", desc: "Plugin Runtime - enterprise grade module for L1 Infrastructure Layer", metric: mkMetric(), icon: Box },
    ]
  },
  { id: 2, key: "cloud-native", nameEn: "L2 Cloud Native", nameTh: "คลาวด์เนทีฟ", icon: Cloud, color: "from-[#A67C52] to-[#8B5A2B]",
    modules: [
      { id: "kubernetes-dashboard", name: "Kubernetes Dashboard", thai: "Kubernetes Dashboard", status: "Active", desc: "Kubernetes Dashboard - enterprise grade module for L2 Cloud Native", metric: mkMetric(), icon: LayoutDashboard },
      { id: "docker-dashboard", name: "Docker Dashboard", thai: "Docker Dashboard", status: "Beta", desc: "Docker Dashboard - enterprise grade module for L2 Cloud Native", metric: mkMetric(), icon: LayoutDashboard },
      { id: "helm-center", name: "Helm Center", thai: "Helm Center", status: "New", desc: "Helm Center - enterprise grade module for L2 Cloud Native", metric: mkMetric(), icon: Box },
      { id: "terraform-center", name: "Terraform Center", thai: "Terraform Center", status: "Active", desc: "Terraform Center - enterprise grade module for L2 Cloud Native", metric: mkMetric(), icon: Box },
      { id: "service-mesh", name: "Service Mesh", thai: "Service Mesh", status: "Beta", desc: "Service Mesh - enterprise grade module for L2 Cloud Native", metric: mkMetric(), icon: Box },
      { id: "api-gateway", name: "API Gateway", thai: "API Gateway", status: "New", desc: "API Gateway - enterprise grade module for L2 Cloud Native", metric: mkMetric(), icon: Plug },
      { id: "load-balancer", name: "Load Balancer", thai: "Load Balancer", status: "Active", desc: "Load Balancer - enterprise grade module for L2 Cloud Native", metric: mkMetric(), icon: Box },
      { id: "cdn-manager", name: "CDN Manager", thai: "CDN Manager", status: "Beta", desc: "CDN Manager - enterprise grade module for L2 Cloud Native", metric: mkMetric(), icon: Box },
      { id: "dns-manager", name: "DNS Manager", thai: "DNS Manager", status: "New", desc: "DNS Manager - enterprise grade module for L2 Cloud Native", metric: mkMetric(), icon: Box },
      { id: "ssl-manager", name: "SSL Manager", thai: "SSL Manager", status: "Active", desc: "SSL Manager - enterprise grade module for L2 Cloud Native", metric: mkMetric(), icon: Box },
      { id: "secret-manager", name: "Secret Manager", thai: "Secret Manager", status: "Beta", desc: "Secret Manager - enterprise grade module for L2 Cloud Native", metric: mkMetric(), icon: Key },
      { id: "config-manager", name: "Config Manager", thai: "Config Manager", status: "New", desc: "Config Manager - enterprise grade module for L2 Cloud Native", metric: mkMetric(), icon: Box },
      { id: "registry-manager", name: "Registry Manager", thai: "Registry Manager", status: "Active", desc: "Registry Manager - enterprise grade module for L2 Cloud Native", metric: mkMetric(), icon: Box },
    ]
  },
  { id: 3, key: "data-fabric", nameEn: "L3 Data Fabric", nameTh: "ผ้าข้อมูล", icon: Database, color: "from-[#9C6B4A] to-[#6B4423]",
    modules: [
      { id: "sql-studio", name: "SQL Studio", thai: "SQL Studio", status: "Active", desc: "SQL Studio - enterprise grade module for L3 Data Fabric", metric: mkMetric(), icon: Database },
      { id: "nosql-studio", name: "NoSQL Studio", thai: "NoSQL Studio", status: "Beta", desc: "NoSQL Studio - enterprise grade module for L3 Data Fabric", metric: mkMetric(), icon: Database },
      { id: "vector-database", name: "Vector Database", thai: "Vector Database", status: "New", desc: "Vector Database - enterprise grade module for L3 Data Fabric", metric: mkMetric(), icon: LayoutDashboard },
      { id: "graph-database", name: "Graph Database", thai: "Graph Database", status: "Active", desc: "Graph Database - enterprise grade module for L3 Data Fabric", metric: mkMetric(), icon: Database },
      { id: "time-series-database", name: "Time Series Database", thai: "Time Series Database", status: "Beta", desc: "Time Series Database - enterprise grade module for L3 Data Fabric", metric: mkMetric(), icon: Database },
      { id: "data-lake", name: "Data Lake", thai: "Data Lake", status: "New", desc: "Data Lake - enterprise grade module for L3 Data Fabric", metric: mkMetric(), icon: Database },
      { id: "data-warehouse", name: "Data Warehouse", thai: "Data Warehouse", status: "Active", desc: "Data Warehouse - enterprise grade module for L3 Data Fabric", metric: mkMetric(), icon: Database },
      { id: "data-pipeline", name: "Data Pipeline", thai: "Data Pipeline", status: "Beta", desc: "Data Pipeline - enterprise grade module for L3 Data Fabric", metric: mkMetric(), icon: Database },
      { id: "etl-builder", name: "ETL Builder", thai: "ETL Builder", status: "New", desc: "ETL Builder - enterprise grade module for L3 Data Fabric", metric: mkMetric(), icon: Box },
      { id: "streaming-center", name: "Streaming Center", thai: "Streaming Center", status: "Active", desc: "Streaming Center - enterprise grade module for L3 Data Fabric", metric: mkMetric(), icon: Box },
      { id: "cdc-engine", name: "CDC Engine", thai: "CDC Engine", status: "Beta", desc: "CDC Engine - enterprise grade module for L3 Data Fabric", metric: mkMetric(), icon: Box },
      { id: "metadata-catalog", name: "Metadata Catalog", thai: "Metadata Catalog", status: "New", desc: "Metadata Catalog - enterprise grade module for L3 Data Fabric", metric: mkMetric(), icon: Database },
      { id: "data-lineage", name: "Data Lineage", thai: "Data Lineage", status: "Active", desc: "Data Lineage - enterprise grade module for L3 Data Fabric", metric: mkMetric(), icon: Database },
      { id: "data-quality", name: "Data Quality", thai: "Data Quality", status: "Beta", desc: "Data Quality - enterprise grade module for L3 Data Fabric", metric: mkMetric(), icon: Database },
      { id: "data-governance", name: "Data Governance", thai: "Data Governance", status: "New", desc: "Data Governance - enterprise grade module for L3 Data Fabric", metric: mkMetric(), icon: Database },
    ]
  },
  { id: 4, key: "ai-core", nameEn: "L4 AI Core", nameTh: "แกน AI", icon: Brain, color: "from-[#B68B5A] to-[#8B5A2B]",
    modules: [
      { id: "llm-gateway", name: "LLM Gateway", thai: "LLM Gateway", status: "Active", desc: "LLM Gateway - enterprise grade module for L4 AI Core", metric: mkMetric(), icon: Sparkles },
      { id: "prompt-router", name: "Prompt Router", thai: "Prompt Router", status: "Beta", desc: "Prompt Router - enterprise grade module for L4 AI Core", metric: mkMetric(), icon: Sparkles },
      { id: "model-registry", name: "Model Registry", thai: "Model Registry", status: "New", desc: "Model Registry - enterprise grade module for L4 AI Core", metric: mkMetric(), icon: Sparkles },
      { id: "embedding-service", name: "Embedding Service", thai: "Embedding Service", status: "Active", desc: "Embedding Service - enterprise grade module for L4 AI Core", metric: mkMetric(), icon: Box },
      { id: "rag-engine", name: "RAG Engine", thai: "RAG Engine", status: "Beta", desc: "RAG Engine - enterprise grade module for L4 AI Core", metric: mkMetric(), icon: Sparkles },
      { id: "memory-engine", name: "Memory Engine", thai: "Memory Engine", status: "New", desc: "Memory Engine - enterprise grade module for L4 AI Core", metric: mkMetric(), icon: Cpu },
      { id: "context-engine", name: "Context Engine", thai: "Context Engine", status: "Active", desc: "Context Engine - enterprise grade module for L4 AI Core", metric: mkMetric(), icon: Box },
      { id: "reasoning-engine", name: "Reasoning Engine", thai: "Reasoning Engine", status: "Beta", desc: "Reasoning Engine - enterprise grade module for L4 AI Core", metric: mkMetric(), icon: Brain },
      { id: "planning-engine", name: "Planning Engine", thai: "Planning Engine", status: "New", desc: "Planning Engine - enterprise grade module for L4 AI Core", metric: mkMetric(), icon: Brain },
      { id: "reflection-engine", name: "Reflection Engine", thai: "Reflection Engine", status: "Active", desc: "Reflection Engine - enterprise grade module for L4 AI Core", metric: mkMetric(), icon: Box },
      { id: "self-learning", name: "Self Learning", thai: "Self Learning", status: "Beta", desc: "Self Learning - enterprise grade module for L4 AI Core", metric: mkMetric(), icon: Box },
      { id: "fine-tune", name: "Fine Tune", thai: "Fine Tune", status: "New", desc: "Fine Tune - enterprise grade module for L4 AI Core", metric: mkMetric(), icon: Box },
      { id: "ai-evaluation", name: "AI Evaluation", thai: "AI Evaluation", status: "Active", desc: "AI Evaluation - enterprise grade module for L4 AI Core", metric: mkMetric(), icon: Box },
      { id: "hallucination-detection", name: "Hallucination Detection", thai: "Hallucination Detection", status: "Beta", desc: "Hallucination Detection - enterprise grade module for L4 AI Core", metric: mkMetric(), icon: GitBranch },
      { id: "confidence-scoring", name: "Confidence Scoring", thai: "Confidence Scoring", status: "New", desc: "Confidence Scoring - enterprise grade module for L4 AI Core", metric: mkMetric(), icon: Box },
    ]
  },
  { id: 5, key: "autonomous-agent", nameEn: "L5 Autonomous Agent", nameTh: "เอเจนต์อัตโนมัติ", icon: Bot, color: "from-[#8D6E4A] to-[#5E4A32]",
    modules: [
      { id: "agent-builder", name: "Agent Builder", thai: "Agent Builder", status: "Active", desc: "Agent Builder - enterprise grade module for L5 Autonomous Agent", metric: mkMetric(), icon: Bot },
      { id: "agent-marketplace", name: "Agent Marketplace", thai: "Agent Marketplace", status: "Beta", desc: "Agent Marketplace - enterprise grade module for L5 Autonomous Agent", metric: mkMetric(), icon: Bot },
      { id: "agent-registry", name: "Agent Registry", thai: "Agent Registry", status: "New", desc: "Agent Registry - enterprise grade module for L5 Autonomous Agent", metric: mkMetric(), icon: Bot },
      { id: "agent-monitor", name: "Agent Monitor", thai: "Agent Monitor", status: "Active", desc: "Agent Monitor - enterprise grade module for L5 Autonomous Agent", metric: mkMetric(), icon: Bot },
      { id: "agent-debugger", name: "Agent Debugger", thai: "Agent Debugger", status: "Beta", desc: "Agent Debugger - enterprise grade module for L5 Autonomous Agent", metric: mkMetric(), icon: Bot },
      { id: "agent-logs", name: "Agent Logs", thai: "Agent Logs", status: "New", desc: "Agent Logs - enterprise grade module for L5 Autonomous Agent", metric: mkMetric(), icon: Bot },
      { id: "agent-analytics", name: "Agent Analytics", thai: "Agent Analytics", status: "Active", desc: "Agent Analytics - enterprise grade module for L5 Autonomous Agent", metric: mkMetric(), icon: Bot },
      { id: "agent-security", name: "Agent Security", thai: "Agent Security", status: "Beta", desc: "Agent Security - enterprise grade module for L5 Autonomous Agent", metric: mkMetric(), icon: Bot },
      { id: "agent-version", name: "Agent Version", thai: "Agent Version", status: "New", desc: "Agent Version - enterprise grade module for L5 Autonomous Agent", metric: mkMetric(), icon: Bot },
      { id: "agent-deployment", name: "Agent Deployment", thai: "Agent Deployment", status: "Active", desc: "Agent Deployment - enterprise grade module for L5 Autonomous Agent", metric: mkMetric(), icon: Bot },
      { id: "agent-swarm", name: "Agent Swarm", thai: "Agent Swarm", status: "Beta", desc: "Agent Swarm - enterprise grade module for L5 Autonomous Agent", metric: mkMetric(), icon: Bot },
      { id: "team-ai", name: "Team AI", thai: "Team AI", status: "New", desc: "Team AI - enterprise grade module for L5 Autonomous Agent", metric: mkMetric(), icon: Users },
      { id: "crew-manager", name: "Crew Manager", thai: "Crew Manager", status: "Active", desc: "Crew Manager - enterprise grade module for L5 Autonomous Agent", metric: mkMetric(), icon: Box },
      { id: "multi-agent-planner", name: "Multi Agent Planner", thai: "Multi Agent Planner", status: "Beta", desc: "Multi Agent Planner - enterprise grade module for L5 Autonomous Agent", metric: mkMetric(), icon: Bot },
      { id: "human-approval", name: "Human Approval", thai: "Human Approval", status: "New", desc: "Human Approval - enterprise grade module for L5 Autonomous Agent", metric: mkMetric(), icon: Box },
    ]
  },
  { id: 6, key: "workflow", nameEn: "L6 Workflow", nameTh: "เวิร์กโฟลว์", icon: Workflow, color: "from-[#7A5A3A] to-[#4E3622]",
    modules: [
      { id: "drag-drop-workflow", name: "Drag Drop Workflow", thai: "Drag Drop Workflow", status: "Active", desc: "Drag Drop Workflow - enterprise grade module for L6 Workflow", metric: mkMetric(), icon: Workflow },
      { id: "bpmn-editor", name: "BPMN Editor", thai: "BPMN Editor", status: "Beta", desc: "BPMN Editor - enterprise grade module for L6 Workflow", metric: mkMetric(), icon: Workflow },
      { id: "low-code", name: "Low Code", thai: "Low Code", status: "New", desc: "Low Code - enterprise grade module for L6 Workflow", metric: mkMetric(), icon: Box },
      { id: "no-code", name: "No Code", thai: "No Code", status: "Active", desc: "No Code - enterprise grade module for L6 Workflow", metric: mkMetric(), icon: Box },
      { id: "event-flow", name: "Event Flow", thai: "Event Flow", status: "Beta", desc: "Event Flow - enterprise grade module for L6 Workflow", metric: mkMetric(), icon: Workflow },
      { id: "cron-job", name: "Cron Job", thai: "Cron Job", status: "New", desc: "Cron Job - enterprise grade module for L6 Workflow", metric: mkMetric(), icon: Box },
      { id: "scheduler", name: "Scheduler", thai: "Scheduler", status: "Active", desc: "Scheduler - enterprise grade module for L6 Workflow", metric: mkMetric(), icon: Box },
      { id: "queue-manager", name: "Queue Manager", thai: "Queue Manager", status: "Beta", desc: "Queue Manager - enterprise grade module for L6 Workflow", metric: mkMetric(), icon: Box },
      { id: "retry-engine", name: "Retry Engine", thai: "Retry Engine", status: "New", desc: "Retry Engine - enterprise grade module for L6 Workflow", metric: mkMetric(), icon: Box },
      { id: "rollback-engine", name: "Rollback Engine", thai: "Rollback Engine", status: "Active", desc: "Rollback Engine - enterprise grade module for L6 Workflow", metric: mkMetric(), icon: Box },
      { id: "compensation-flow", name: "Compensation Flow", thai: "Compensation Flow", status: "Beta", desc: "Compensation Flow - enterprise grade module for L6 Workflow", metric: mkMetric(), icon: Workflow },
      { id: "parallel-execution", name: "Parallel Execution", thai: "Parallel Execution", status: "New", desc: "Parallel Execution - enterprise grade module for L6 Workflow", metric: mkMetric(), icon: Box },
      { id: "conditional-branch", name: "Conditional Branch", thai: "Conditional Branch", status: "Active", desc: "Conditional Branch - enterprise grade module for L6 Workflow", metric: mkMetric(), icon: Box },
      { id: "visual-debugger", name: "Visual Debugger", thai: "Visual Debugger", status: "Beta", desc: "Visual Debugger - enterprise grade module for L6 Workflow", metric: mkMetric(), icon: Box },
    ]
  },
  { id: 7, key: "development", nameEn: "L7 Development", nameTh: "พัฒนา", icon: Terminal, color: "from-[#AD8A6A] to-[#7A5A3A]",
    modules: [
      { id: "monaco-editor", name: "Monaco Editor", thai: "Monaco Editor", status: "Active", desc: "Monaco Editor - enterprise grade module for L7 Development", metric: mkMetric(), icon: Box },
      { id: "vs-code-style-ide", name: "VS Code Style IDE", thai: "VS Code Style IDE", status: "Beta", desc: "VS Code Style IDE - enterprise grade module for L7 Development", metric: mkMetric(), icon: Box },
      { id: "git", name: "Git", thai: "Git", status: "New", desc: "Git - enterprise grade module for L7 Development", metric: mkMetric(), icon: GitBranch },
      { id: "github", name: "GitHub", thai: "GitHub", status: "Active", desc: "GitHub - enterprise grade module for L7 Development", metric: mkMetric(), icon: GitBranch },
      { id: "gitlab", name: "GitLab", thai: "GitLab", status: "Beta", desc: "GitLab - enterprise grade module for L7 Development", metric: mkMetric(), icon: GitBranch },
      { id: "ci-cd", name: "CI/CD", thai: "CI/CD", status: "New", desc: "CI/CD - enterprise grade module for L7 Development", metric: mkMetric(), icon: GitBranch },
      { id: "package-manager", name: "Package Manager", thai: "Package Manager", status: "Active", desc: "Package Manager - enterprise grade module for L7 Development", metric: mkMetric(), icon: Box },
      { id: "extension-marketplace", name: "Extension Marketplace", thai: "Extension Marketplace", status: "Beta", desc: "Extension Marketplace - enterprise grade module for L7 Development", metric: mkMetric(), icon: Store },
      { id: "api-tester", name: "API Tester", thai: "API Tester", status: "New", desc: "API Tester - enterprise grade module for L7 Development", metric: mkMetric(), icon: Plug },
      { id: "swagger", name: "Swagger", thai: "Swagger", status: "Active", desc: "Swagger - enterprise grade module for L7 Development", metric: mkMetric(), icon: Box },
      { id: "graphql-explorer", name: "GraphQL Explorer", thai: "GraphQL Explorer", status: "Beta", desc: "GraphQL Explorer - enterprise grade module for L7 Development", metric: mkMetric(), icon: Box },
      { id: "terminal", name: "Terminal", thai: "Terminal", status: "New", desc: "Terminal - enterprise grade module for L7 Development", metric: mkMetric(), icon: Box },
      { id: "ssh-console", name: "SSH Console", thai: "SSH Console", status: "Active", desc: "SSH Console - enterprise grade module for L7 Development", metric: mkMetric(), icon: Box },
      { id: "remote-console", name: "Remote Console", thai: "Remote Console", status: "Beta", desc: "Remote Console - enterprise grade module for L7 Development", metric: mkMetric(), icon: Box },
    ]
  },
  { id: 8, key: "ai-studio", nameEn: "L8 AI Studio", nameTh: "สตูดิโอ AI", icon: Sparkles, color: "from-[#8B6B4A] to-[#5C4033]",
    modules: [
      { id: "prompt-studio", name: "Prompt Studio", thai: "Prompt Studio", status: "Active", desc: "Prompt Studio - enterprise grade module for L8 AI Studio", metric: mkMetric(), icon: Sparkles },
      { id: "dataset-studio", name: "Dataset Studio", thai: "Dataset Studio", status: "Beta", desc: "Dataset Studio - enterprise grade module for L8 AI Studio", metric: mkMetric(), icon: Database },
      { id: "evaluation-studio", name: "Evaluation Studio", thai: "Evaluation Studio", status: "New", desc: "Evaluation Studio - enterprise grade module for L8 AI Studio", metric: mkMetric(), icon: Box },
      { id: "playground", name: "Playground", thai: "Playground", status: "Active", desc: "Playground - enterprise grade module for L8 AI Studio", metric: mkMetric(), icon: Box },
      { id: "model-comparison", name: "Model Comparison", thai: "Model Comparison", status: "Beta", desc: "Model Comparison - enterprise grade module for L8 AI Studio", metric: mkMetric(), icon: Sparkles },
      { id: "cost-analysis", name: "Cost Analysis", thai: "Cost Analysis", status: "New", desc: "Cost Analysis - enterprise grade module for L8 AI Studio", metric: mkMetric(), icon: Box },
      { id: "latency-analysis", name: "Latency Analysis", thai: "Latency Analysis", status: "Active", desc: "Latency Analysis - enterprise grade module for L8 AI Studio", metric: mkMetric(), icon: Box },
      { id: "benchmark", name: "Benchmark", thai: "Benchmark", status: "Beta", desc: "Benchmark - enterprise grade module for L8 AI Studio", metric: mkMetric(), icon: Box },
      { id: "ai-experiment", name: "AI Experiment", thai: "AI Experiment", status: "New", desc: "AI Experiment - enterprise grade module for L8 AI Studio", metric: mkMetric(), icon: Box },
      { id: "prompt-version", name: "Prompt Version", thai: "Prompt Version", status: "Active", desc: "Prompt Version - enterprise grade module for L8 AI Studio", metric: mkMetric(), icon: Sparkles },
      { id: "dataset-version", name: "Dataset Version", thai: "Dataset Version", status: "Beta", desc: "Dataset Version - enterprise grade module for L8 AI Studio", metric: mkMetric(), icon: Database },
      { id: "model-version", name: "Model Version", thai: "Model Version", status: "New", desc: "Model Version - enterprise grade module for L8 AI Studio", metric: mkMetric(), icon: Sparkles },
    ]
  },
  { id: 9, key: "knowledge", nameEn: "L9 Knowledge", nameTh: "องค์ความรู้", icon: FileSearch, color: "from-[#A68060] to-[#7A5A3A]",
    modules: [
      { id: "knowledge-graph", name: "Knowledge Graph", thai: "Knowledge Graph", status: "Active", desc: "Knowledge Graph - enterprise grade module for L9 Knowledge", metric: mkMetric(), icon: Globe },
      { id: "semantic-search", name: "Semantic Search", thai: "Semantic Search", status: "Beta", desc: "Semantic Search - enterprise grade module for L9 Knowledge", metric: mkMetric(), icon: Search },
      { id: "enterprise-search", name: "Enterprise Search", thai: "Enterprise Search", status: "New", desc: "Enterprise Search - enterprise grade module for L9 Knowledge", metric: mkMetric(), icon: Briefcase },
      { id: "ocr", name: "OCR", thai: "OCR", status: "Active", desc: "OCR - enterprise grade module for L9 Knowledge", metric: mkMetric(), icon: Box },
      { id: "pdf-ai", name: "PDF AI", thai: "PDF AI", status: "Beta", desc: "PDF AI - enterprise grade module for L9 Knowledge", metric: mkMetric(), icon: FileText },
      { id: "document-ai", name: "Document AI", thai: "Document AI", status: "New", desc: "Document AI - enterprise grade module for L9 Knowledge", metric: mkMetric(), icon: FileText },
      { id: "image-ai", name: "Image AI", thai: "Image AI", status: "Active", desc: "Image AI - enterprise grade module for L9 Knowledge", metric: mkMetric(), icon: Box },
      { id: "video-ai", name: "Video AI", thai: "Video AI", status: "Beta", desc: "Video AI - enterprise grade module for L9 Knowledge", metric: mkMetric(), icon: Box },
      { id: "audio-ai", name: "Audio AI", thai: "Audio AI", status: "New", desc: "Audio AI - enterprise grade module for L9 Knowledge", metric: mkMetric(), icon: Box },
      { id: "meeting-ai", name: "Meeting AI", thai: "Meeting AI", status: "Active", desc: "Meeting AI - enterprise grade module for L9 Knowledge", metric: mkMetric(), icon: Box },
      { id: "email-ai", name: "Email AI", thai: "Email AI", status: "Beta", desc: "Email AI - enterprise grade module for L9 Knowledge", metric: mkMetric(), icon: Box },
      { id: "knowledge-timeline", name: "Knowledge Timeline", thai: "Knowledge Timeline", status: "New", desc: "Knowledge Timeline - enterprise grade module for L9 Knowledge", metric: mkMetric(), icon: Globe },
    ]
  },
  { id: 10, key: "communication", nameEn: "L10 Communication", nameTh: "สื่อสาร", icon: MessageSquare, color: "from-[#8B5A2B] to-[#4A2E18]",
    modules: [
      { id: "chat", name: "Chat", thai: "Chat", status: "Active", desc: "Chat - enterprise grade module for L10 Communication", metric: mkMetric(), icon: MessageSquare },
      { id: "voice", name: "Voice", thai: "Voice", status: "Beta", desc: "Voice - enterprise grade module for L10 Communication", metric: mkMetric(), icon: Box },
      { id: "video-call", name: "Video Call", thai: "Video Call", status: "New", desc: "Video Call - enterprise grade module for L10 Communication", metric: mkMetric(), icon: Box },
      { id: "email", name: "Email", thai: "Email", status: "Active", desc: "Email - enterprise grade module for L10 Communication", metric: mkMetric(), icon: Box },
      { id: "sms", name: "SMS", thai: "SMS", status: "Beta", desc: "SMS - enterprise grade module for L10 Communication", metric: mkMetric(), icon: Box },
      { id: "line", name: "LINE", thai: "LINE", status: "New", desc: "LINE - enterprise grade module for L10 Communication", metric: mkMetric(), icon: Box },
      { id: "slack", name: "Slack", thai: "Slack", status: "Active", desc: "Slack - enterprise grade module for L10 Communication", metric: mkMetric(), icon: MessageSquare },
      { id: "teams", name: "Teams", thai: "Teams", status: "Beta", desc: "Teams - enterprise grade module for L10 Communication", metric: mkMetric(), icon: Users },
      { id: "discord", name: "Discord", thai: "Discord", status: "New", desc: "Discord - enterprise grade module for L10 Communication", metric: mkMetric(), icon: Box },
      { id: "telegram", name: "Telegram", thai: "Telegram", status: "Active", desc: "Telegram - enterprise grade module for L10 Communication", metric: mkMetric(), icon: Box },
      { id: "whatsapp", name: "WhatsApp", thai: "WhatsApp", status: "Beta", desc: "WhatsApp - enterprise grade module for L10 Communication", metric: mkMetric(), icon: Box },
      { id: "push-notification", name: "Push Notification", thai: "Push Notification", status: "New", desc: "Push Notification - enterprise grade module for L10 Communication", metric: mkMetric(), icon: Box },
    ]
  },
  { id: 11, key: "business", nameEn: "L11 Business", nameTh: "ธุรกิจ", icon: Briefcase, color: "from-[#C19A6B] to-[#8B5A2B]",
    modules: [
      { id: "crm", name: "CRM", thai: "CRM", status: "Active", desc: "CRM - enterprise grade module for L11 Business", metric: mkMetric(), icon: Briefcase },
      { id: "erp", name: "ERP", thai: "ERP", status: "Beta", desc: "ERP - enterprise grade module for L11 Business", metric: mkMetric(), icon: Briefcase },
      { id: "hrm", name: "HRM", thai: "HRM", status: "New", desc: "HRM - enterprise grade module for L11 Business", metric: mkMetric(), icon: Box },
      { id: "finance", name: "Finance", thai: "Finance", status: "Active", desc: "Finance - enterprise grade module for L11 Business", metric: mkMetric(), icon: CreditCard },
      { id: "accounting", name: "Accounting", thai: "Accounting", status: "Beta", desc: "Accounting - enterprise grade module for L11 Business", metric: mkMetric(), icon: Box },
      { id: "procurement", name: "Procurement", thai: "Procurement", status: "New", desc: "Procurement - enterprise grade module for L11 Business", metric: mkMetric(), icon: Box },
      { id: "inventory", name: "Inventory", thai: "Inventory", status: "Active", desc: "Inventory - enterprise grade module for L11 Business", metric: mkMetric(), icon: Box },
      { id: "manufacturing", name: "Manufacturing", thai: "Manufacturing", status: "Beta", desc: "Manufacturing - enterprise grade module for L11 Business", metric: mkMetric(), icon: Box },
      { id: "pos", name: "POS", thai: "POS", status: "New", desc: "POS - enterprise grade module for L11 Business", metric: mkMetric(), icon: Box },
      { id: "e-commerce", name: "E-Commerce", thai: "E-Commerce", status: "Active", desc: "E-Commerce - enterprise grade module for L11 Business", metric: mkMetric(), icon: Box },
      { id: "marketing", name: "Marketing", thai: "Marketing", status: "Beta", desc: "Marketing - enterprise grade module for L11 Business", metric: mkMetric(), icon: Box },
      { id: "customer-service", name: "Customer Service", thai: "Customer Service", status: "New", desc: "Customer Service - enterprise grade module for L11 Business", metric: mkMetric(), icon: Box },
    ]
  },
  { id: 12, key: "analytics", nameEn: "L12 Analytics", nameTh: "วิเคราะห์", icon: BarChart3, color: "from-[#8B7355] to-[#5D4E37]",
    modules: [
      { id: "bi-dashboard", name: "BI Dashboard", thai: "BI Dashboard", status: "Active", desc: "BI Dashboard - enterprise grade module for L12 Analytics", metric: mkMetric(), icon: LayoutDashboard },
      { id: "executive-dashboard", name: "Executive Dashboard", thai: "Executive Dashboard", status: "Beta", desc: "Executive Dashboard - enterprise grade module for L12 Analytics", metric: mkMetric(), icon: LayoutDashboard },
      { id: "kpi-dashboard", name: "KPI Dashboard", thai: "KPI Dashboard", status: "New", desc: "KPI Dashboard - enterprise grade module for L12 Analytics", metric: mkMetric(), icon: LayoutDashboard },
      { id: "ai-dashboard", name: "AI Dashboard", thai: "AI Dashboard", status: "Active", desc: "AI Dashboard - enterprise grade module for L12 Analytics", metric: mkMetric(), icon: LayoutDashboard },
      { id: "sales-dashboard", name: "Sales Dashboard", thai: "Sales Dashboard", status: "Beta", desc: "Sales Dashboard - enterprise grade module for L12 Analytics", metric: mkMetric(), icon: LayoutDashboard },
      { id: "finance-dashboard", name: "Finance Dashboard", thai: "Finance Dashboard", status: "New", desc: "Finance Dashboard - enterprise grade module for L12 Analytics", metric: mkMetric(), icon: LayoutDashboard },
      { id: "hr-dashboard", name: "HR Dashboard", thai: "HR Dashboard", status: "Active", desc: "HR Dashboard - enterprise grade module for L12 Analytics", metric: mkMetric(), icon: LayoutDashboard },
      { id: "predictive-analytics", name: "Predictive Analytics", thai: "Predictive Analytics", status: "Beta", desc: "Predictive Analytics - enterprise grade module for L12 Analytics", metric: mkMetric(), icon: BarChart3 },
      { id: "forecast", name: "Forecast", thai: "Forecast", status: "New", desc: "Forecast - enterprise grade module for L12 Analytics", metric: mkMetric(), icon: BarChart3 },
      { id: "root-cause-analysis", name: "Root Cause Analysis", thai: "Root Cause Analysis", status: "Active", desc: "Root Cause Analysis - enterprise grade module for L12 Analytics", metric: mkMetric(), icon: Box },
      { id: "recommendation-engine", name: "Recommendation Engine", thai: "Recommendation Engine", status: "Beta", desc: "Recommendation Engine - enterprise grade module for L12 Analytics", metric: mkMetric(), icon: Box },
      { id: "usage-analytics", name: "Usage Analytics", thai: "Usage Analytics", status: "New", desc: "Usage Analytics - enterprise grade module for L12 Analytics", metric: mkMetric(), icon: BarChart3 },
    ]
  },
  { id: 13, key: "security", nameEn: "L13 Security", nameTh: "ความปลอดภัย", icon: Shield, color: "from-[#BC9A78] to-[#8B6A43]",
    modules: [
      { id: "iam", name: "IAM", thai: "IAM", status: "Active", desc: "IAM - enterprise grade module for L13 Security", metric: mkMetric(), icon: Shield },
      { id: "rbac", name: "RBAC", thai: "RBAC", status: "Beta", desc: "RBAC - enterprise grade module for L13 Security", metric: mkMetric(), icon: Box },
      { id: "abac", name: "ABAC", thai: "ABAC", status: "New", desc: "ABAC - enterprise grade module for L13 Security", metric: mkMetric(), icon: Box },
      { id: "sso", name: "SSO", thai: "SSO", status: "Active", desc: "SSO - enterprise grade module for L13 Security", metric: mkMetric(), icon: Box },
      { id: "oauth", name: "OAuth", thai: "OAuth", status: "Beta", desc: "OAuth - enterprise grade module for L13 Security", metric: mkMetric(), icon: Box },
      { id: "mfa", name: "MFA", thai: "MFA", status: "New", desc: "MFA - enterprise grade module for L13 Security", metric: mkMetric(), icon: Box },
      { id: "zero-trust", name: "Zero Trust", thai: "Zero Trust", status: "Active", desc: "Zero Trust - enterprise grade module for L13 Security", metric: mkMetric(), icon: Shield },
      { id: "siem", name: "SIEM", thai: "SIEM", status: "Beta", desc: "SIEM - enterprise grade module for L13 Security", metric: mkMetric(), icon: Box },
      { id: "soc", name: "SOC", thai: "SOC", status: "New", desc: "SOC - enterprise grade module for L13 Security", metric: mkMetric(), icon: Box },
      { id: "threat-detection", name: "Threat Detection", thai: "Threat Detection", status: "Active", desc: "Threat Detection - enterprise grade module for L13 Security", metric: mkMetric(), icon: Shield },
      { id: "vulnerability-scan", name: "Vulnerability Scan", thai: "Vulnerability Scan", status: "Beta", desc: "Vulnerability Scan - enterprise grade module for L13 Security", metric: mkMetric(), icon: BarChart3 },
      { id: "pen-test", name: "Pen Test", thai: "Pen Test", status: "New", desc: "Pen Test - enterprise grade module for L13 Security", metric: mkMetric(), icon: Box },
      { id: "waf", name: "WAF", thai: "WAF", status: "Active", desc: "WAF - enterprise grade module for L13 Security", metric: mkMetric(), icon: Box },
      { id: "dlp", name: "DLP", thai: "DLP", status: "Beta", desc: "DLP - enterprise grade module for L13 Security", metric: mkMetric(), icon: Box },
      { id: "secrets-vault", name: "Secrets Vault", thai: "Secrets Vault", status: "New", desc: "Secrets Vault - enterprise grade module for L13 Security", metric: mkMetric(), icon: Key },
      { id: "audit-trail", name: "Audit Trail", thai: "Audit Trail", status: "Active", desc: "Audit Trail - enterprise grade module for L13 Security", metric: mkMetric(), icon: Box },
    ]
  },
  { id: 14, key: "compliance", nameEn: "L14 Compliance", nameTh: "การปฏิบัติตามกฎ", icon: Scale, color: "from-[#9C7C5A] to-[#6B543A]",
    modules: [
      { id: "pdpa", name: "PDPA", thai: "PDPA", status: "Active", desc: "PDPA - enterprise grade module for L14 Compliance", metric: mkMetric(), icon: Scale },
      { id: "gdpr", name: "GDPR", thai: "GDPR", status: "Beta", desc: "GDPR - enterprise grade module for L14 Compliance", metric: mkMetric(), icon: Scale },
      { id: "iso27001", name: "ISO27001", thai: "ISO27001", status: "New", desc: "ISO27001 - enterprise grade module for L14 Compliance", metric: mkMetric(), icon: Box },
      { id: "soc2", name: "SOC2", thai: "SOC2", status: "Active", desc: "SOC2 - enterprise grade module for L14 Compliance", metric: mkMetric(), icon: Box },
      { id: "hipaa", name: "HIPAA", thai: "HIPAA", status: "Beta", desc: "HIPAA - enterprise grade module for L14 Compliance", metric: mkMetric(), icon: Box },
      { id: "pci-dss", name: "PCI DSS", thai: "PCI DSS", status: "New", desc: "PCI DSS - enterprise grade module for L14 Compliance", metric: mkMetric(), icon: GitBranch },
      { id: "ai-act", name: "AI Act", thai: "AI Act", status: "Active", desc: "AI Act - enterprise grade module for L14 Compliance", metric: mkMetric(), icon: Box },
      { id: "nist-ai-rmf", name: "NIST AI RMF", thai: "NIST AI RMF", status: "Beta", desc: "NIST AI RMF - enterprise grade module for L14 Compliance", metric: mkMetric(), icon: Box },
      { id: "data-retention", name: "Data Retention", thai: "Data Retention", status: "New", desc: "Data Retention - enterprise grade module for L14 Compliance", metric: mkMetric(), icon: Database },
      { id: "consent-manager", name: "Consent Manager", thai: "Consent Manager", status: "Active", desc: "Consent Manager - enterprise grade module for L14 Compliance", metric: mkMetric(), icon: Box },
    ]
  },
  { id: 15, key: "monitoring", nameEn: "L15 Monitoring", nameTh: "มอนิเตอร์ริง", icon: Activity, color: "from-[#A78A6B] to-[#7A6044]",
    modules: [
      { id: "prometheus", name: "Prometheus", thai: "Prometheus", status: "Active", desc: "Prometheus - enterprise grade module for L15 Monitoring", metric: mkMetric(), icon: Box },
      { id: "grafana", name: "Grafana", thai: "Grafana", status: "Beta", desc: "Grafana - enterprise grade module for L15 Monitoring", metric: mkMetric(), icon: Box },
      { id: "loki", name: "Loki", thai: "Loki", status: "New", desc: "Loki - enterprise grade module for L15 Monitoring", metric: mkMetric(), icon: Box },
      { id: "tempo", name: "Tempo", thai: "Tempo", status: "Active", desc: "Tempo - enterprise grade module for L15 Monitoring", metric: mkMetric(), icon: Box },
      { id: "jaeger", name: "Jaeger", thai: "Jaeger", status: "Beta", desc: "Jaeger - enterprise grade module for L15 Monitoring", metric: mkMetric(), icon: Box },
      { id: "opentelemetry", name: "OpenTelemetry", thai: "OpenTelemetry", status: "New", desc: "OpenTelemetry - enterprise grade module for L15 Monitoring", metric: mkMetric(), icon: Box },
      { id: "live-metrics", name: "Live Metrics", thai: "Live Metrics", status: "Active", desc: "Live Metrics - enterprise grade module for L15 Monitoring", metric: mkMetric(), icon: Activity },
      { id: "live-logs", name: "Live Logs", thai: "Live Logs", status: "Beta", desc: "Live Logs - enterprise grade module for L15 Monitoring", metric: mkMetric(), icon: Activity },
      { id: "live-trace", name: "Live Trace", thai: "Live Trace", status: "New", desc: "Live Trace - enterprise grade module for L15 Monitoring", metric: mkMetric(), icon: Activity },
      { id: "alert-center", name: "Alert Center", thai: "Alert Center", status: "Active", desc: "Alert Center - enterprise grade module for L15 Monitoring", metric: mkMetric(), icon: Box },
      { id: "incident-center", name: "Incident Center", thai: "Incident Center", status: "Beta", desc: "Incident Center - enterprise grade module for L15 Monitoring", metric: mkMetric(), icon: GitBranch },
      { id: "rca-center", name: "RCA Center", thai: "RCA Center", status: "New", desc: "RCA Center - enterprise grade module for L15 Monitoring", metric: mkMetric(), icon: Box },
      { id: "slo-manager", name: "SLO Manager", thai: "SLO Manager", status: "Active", desc: "SLO Manager - enterprise grade module for L15 Monitoring", metric: mkMetric(), icon: Box },
    ]
  },
  { id: 16, key: "automation", nameEn: "L16 Automation", nameTh: "อัตโนมัติ", icon: Zap, color: "from-[#8B5E3C] to-[#5C3A1E]",
    modules: [
      { id: "auto-healing", name: "Auto Healing", thai: "Auto Healing", status: "Active", desc: "Auto Healing - enterprise grade module for L16 Automation", metric: mkMetric(), icon: Zap },
      { id: "auto-scaling", name: "Auto Scaling", thai: "Auto Scaling", status: "Beta", desc: "Auto Scaling - enterprise grade module for L16 Automation", metric: mkMetric(), icon: Zap },
      { id: "auto-deployment", name: "Auto Deployment", thai: "Auto Deployment", status: "New", desc: "Auto Deployment - enterprise grade module for L16 Automation", metric: mkMetric(), icon: Zap },
      { id: "auto-backup", name: "Auto Backup", thai: "Auto Backup", status: "Active", desc: "Auto Backup - enterprise grade module for L16 Automation", metric: mkMetric(), icon: Zap },
      { id: "auto-recovery", name: "Auto Recovery", thai: "Auto Recovery", status: "Beta", desc: "Auto Recovery - enterprise grade module for L16 Automation", metric: mkMetric(), icon: Zap },
      { id: "auto-patch", name: "Auto Patch", thai: "Auto Patch", status: "New", desc: "Auto Patch - enterprise grade module for L16 Automation", metric: mkMetric(), icon: Zap },
      { id: "auto-upgrade", name: "Auto Upgrade", thai: "Auto Upgrade", status: "Active", desc: "Auto Upgrade - enterprise grade module for L16 Automation", metric: mkMetric(), icon: Zap },
      { id: "auto-optimization", name: "Auto Optimization", thai: "Auto Optimization", status: "Beta", desc: "Auto Optimization - enterprise grade module for L16 Automation", metric: mkMetric(), icon: Zap },
      { id: "auto-documentation", name: "Auto Documentation", thai: "Auto Documentation", status: "New", desc: "Auto Documentation - enterprise grade module for L16 Automation", metric: mkMetric(), icon: FileText },
    ]
  },
  { id: 17, key: "digital-twin", nameEn: "L17 Digital Twin", nameTh: "ฝาแฝดดิจิทัล", icon: Box, color: "from-[#D4A574] to-[#8B5A2B]",
    modules: [
      { id: "organization-twin", name: "Organization Twin", thai: "Organization Twin", status: "Active", desc: "Organization Twin - enterprise grade module for L17 Digital Twin", metric: mkMetric(), icon: Box },
      { id: "process-twin", name: "Process Twin", thai: "Process Twin", status: "Beta", desc: "Process Twin - enterprise grade module for L17 Digital Twin", metric: mkMetric(), icon: Cpu },
      { id: "factory-twin", name: "Factory Twin", thai: "Factory Twin", status: "New", desc: "Factory Twin - enterprise grade module for L17 Digital Twin", metric: mkMetric(), icon: LayoutDashboard },
      { id: "building-twin", name: "Building Twin", thai: "Building Twin", status: "Active", desc: "Building Twin - enterprise grade module for L17 Digital Twin", metric: mkMetric(), icon: Box },
      { id: "city-twin", name: "City Twin", thai: "City Twin", status: "Beta", desc: "City Twin - enterprise grade module for L17 Digital Twin", metric: mkMetric(), icon: GitBranch },
      { id: "device-twin", name: "Device Twin", thai: "Device Twin", status: "New", desc: "Device Twin - enterprise grade module for L17 Digital Twin", metric: mkMetric(), icon: Box },
      { id: "iot-dashboard", name: "IoT Dashboard", thai: "IoT Dashboard", status: "Active", desc: "IoT Dashboard - enterprise grade module for L17 Digital Twin", metric: mkMetric(), icon: LayoutDashboard },
    ]
  },
  { id: 18, key: "finance", nameEn: "L18 Finance", nameTh: "การเงิน", icon: CreditCard, color: "from-[#A67C52] to-[#6B4423]",
    modules: [
      { id: "subscription", name: "Subscription", thai: "Subscription", status: "Active", desc: "Subscription - enterprise grade module for L18 Finance", metric: mkMetric(), icon: Box },
      { id: "billing", name: "Billing", thai: "Billing", status: "Beta", desc: "Billing - enterprise grade module for L18 Finance", metric: mkMetric(), icon: BarChart3 },
      { id: "invoice", name: "Invoice", thai: "Invoice", status: "New", desc: "Invoice - enterprise grade module for L18 Finance", metric: mkMetric(), icon: CreditCard },
      { id: "tax", name: "Tax", thai: "Tax", status: "Active", desc: "Tax - enterprise grade module for L18 Finance", metric: mkMetric(), icon: Box },
      { id: "stripe", name: "Stripe", thai: "Stripe", status: "Beta", desc: "Stripe - enterprise grade module for L18 Finance", metric: mkMetric(), icon: Wallet },
      { id: "promptpay", name: "PromptPay", thai: "PromptPay", status: "New", desc: "PromptPay - enterprise grade module for L18 Finance", metric: mkMetric(), icon: Sparkles },
      { id: "qr-payment", name: "QR Payment", thai: "QR Payment", status: "Active", desc: "QR Payment - enterprise grade module for L18 Finance", metric: mkMetric(), icon: Wallet },
      { id: "revenue-dashboard", name: "Revenue Dashboard", thai: "Revenue Dashboard", status: "Beta", desc: "Revenue Dashboard - enterprise grade module for L18 Finance", metric: mkMetric(), icon: LayoutDashboard },
      { id: "cost-dashboard", name: "Cost Dashboard", thai: "Cost Dashboard", status: "New", desc: "Cost Dashboard - enterprise grade module for L18 Finance", metric: mkMetric(), icon: LayoutDashboard },
      { id: "roi-dashboard", name: "ROI Dashboard", thai: "ROI Dashboard", status: "Active", desc: "ROI Dashboard - enterprise grade module for L18 Finance", metric: mkMetric(), icon: LayoutDashboard },
    ]
  },
  { id: 19, key: "marketplace", nameEn: "L19 Marketplace", nameTh: "ตลาดกลาง", icon: Store, color: "from-[#C19A6B] to-[#7A5A3A]",
    modules: [
      { id: "plugin-store", name: "Plugin Store", thai: "Plugin Store", status: "Active", desc: "Plugin Store - enterprise grade module for L19 Marketplace", metric: mkMetric(), icon: Store },
      { id: "ai-marketplace", name: "AI Marketplace", thai: "AI Marketplace", status: "Beta", desc: "AI Marketplace - enterprise grade module for L19 Marketplace", metric: mkMetric(), icon: Store },
      { id: "workflow-store", name: "Workflow Store", thai: "Workflow Store", status: "New", desc: "Workflow Store - enterprise grade module for L19 Marketplace", metric: mkMetric(), icon: Workflow },
      { id: "prompt-store", name: "Prompt Store", thai: "Prompt Store", status: "Active", desc: "Prompt Store - enterprise grade module for L19 Marketplace", metric: mkMetric(), icon: Sparkles },
      { id: "model-store", name: "Model Store", thai: "Model Store", status: "Beta", desc: "Model Store - enterprise grade module for L19 Marketplace", metric: mkMetric(), icon: Sparkles },
      { id: "theme-store", name: "Theme Store", thai: "Theme Store", status: "New", desc: "Theme Store - enterprise grade module for L19 Marketplace", metric: mkMetric(), icon: Store },
      { id: "extension-store", name: "Extension Store", thai: "Extension Store", status: "Active", desc: "Extension Store - enterprise grade module for L19 Marketplace", metric: mkMetric(), icon: Store },
      { id: "integration-store", name: "Integration Store", thai: "Integration Store", status: "Beta", desc: "Integration Store - enterprise grade module for L19 Marketplace", metric: mkMetric(), icon: Store },
    ]
  },
  { id: 20, key: "collaboration", nameEn: "L20 Collaboration", nameTh: "ร่วมมือ", icon: Users, color: "from-[#8B6B4A] to-[#3E2723]",
    modules: [
      { id: "workspace", name: "Workspace", thai: "Workspace", status: "Active", desc: "Workspace - enterprise grade module for L20 Collaboration", metric: mkMetric(), icon: Users },
      { id: "team-space", name: "Team Space", thai: "Team Space", status: "Beta", desc: "Team Space - enterprise grade module for L20 Collaboration", metric: mkMetric(), icon: Users },
      { id: "whiteboard", name: "Whiteboard", thai: "Whiteboard", status: "New", desc: "Whiteboard - enterprise grade module for L20 Collaboration", metric: mkMetric(), icon: Box },
      { id: "notes", name: "Notes", thai: "Notes", status: "Active", desc: "Notes - enterprise grade module for L20 Collaboration", metric: mkMetric(), icon: Box },
      { id: "wiki", name: "Wiki", thai: "Wiki", status: "Beta", desc: "Wiki - enterprise grade module for L20 Collaboration", metric: mkMetric(), icon: Box },
      { id: "task", name: "Task", thai: "Task", status: "New", desc: "Task - enterprise grade module for L20 Collaboration", metric: mkMetric(), icon: Clock },
      { id: "calendar", name: "Calendar", thai: "Calendar", status: "Active", desc: "Calendar - enterprise grade module for L20 Collaboration", metric: mkMetric(), icon: Clock },
      { id: "kanban", name: "Kanban", thai: "Kanban", status: "Beta", desc: "Kanban - enterprise grade module for L20 Collaboration", metric: mkMetric(), icon: Box },
      { id: "gantt", name: "Gantt", thai: "Gantt", status: "New", desc: "Gantt - enterprise grade module for L20 Collaboration", metric: mkMetric(), icon: Box },
      { id: "meeting-room", name: "Meeting Room", thai: "Meeting Room", status: "Active", desc: "Meeting Room - enterprise grade module for L20 Collaboration", metric: mkMetric(), icon: Box },
    ]
  },
  { id: 21, key: "executive-center", nameEn: "L21 Executive Center", nameTh: "ศูนย์ผู้บริหาร", icon: LayoutDashboard, color: "from-[#9C8A6B] to-[#5C4033]",
    modules: [
      { id: "ceo-dashboard", name: "CEO Dashboard", thai: "CEO Dashboard", status: "Active", desc: "CEO Dashboard - enterprise grade module for L21 Executive Center", metric: mkMetric(), icon: LayoutDashboard },
      { id: "cto-dashboard", name: "CTO Dashboard", thai: "CTO Dashboard", status: "Beta", desc: "CTO Dashboard - enterprise grade module for L21 Executive Center", metric: mkMetric(), icon: LayoutDashboard },
      { id: "cfo-dashboard", name: "CFO Dashboard", thai: "CFO Dashboard", status: "New", desc: "CFO Dashboard - enterprise grade module for L21 Executive Center", metric: mkMetric(), icon: LayoutDashboard },
      { id: "coo-dashboard", name: "COO Dashboard", thai: "COO Dashboard", status: "Active", desc: "COO Dashboard - enterprise grade module for L21 Executive Center", metric: mkMetric(), icon: LayoutDashboard },
      { id: "ciso-dashboard", name: "CISO Dashboard", thai: "CISO Dashboard", status: "Beta", desc: "CISO Dashboard - enterprise grade module for L21 Executive Center", metric: mkMetric(), icon: LayoutDashboard },
      { id: "cio-dashboard", name: "CIO Dashboard", thai: "CIO Dashboard", status: "New", desc: "CIO Dashboard - enterprise grade module for L21 Executive Center", metric: mkMetric(), icon: LayoutDashboard },
      { id: "strategy-center", name: "Strategy Center", thai: "Strategy Center", status: "Active", desc: "Strategy Center - enterprise grade module for L21 Executive Center", metric: mkMetric(), icon: Box },
      { id: "decision-center", name: "Decision Center", thai: "Decision Center", status: "Beta", desc: "Decision Center - enterprise grade module for L21 Executive Center", metric: mkMetric(), icon: GitBranch },
      { id: "war-room", name: "War Room", thai: "War Room", status: "New", desc: "War Room - enterprise grade module for L21 Executive Center", metric: mkMetric(), icon: Box },
    ]
  },
  { id: 22, key: "command-center", nameEn: "L22 Command Center", nameTh: "ศูนย์บัญชาการ", icon: Globe, color: "from-[#B89A7A] to-[#8B6A43]",
    modules: [
      { id: "mission-control", name: "Mission Control", thai: "Mission Control", status: "Active", desc: "Mission Control - enterprise grade module for L22 Command Center", metric: mkMetric(), icon: Box },
      { id: "global-status", name: "Global Status", thai: "Global Status", status: "Beta", desc: "Global Status - enterprise grade module for L22 Command Center", metric: mkMetric(), icon: Globe },
      { id: "live-map", name: "Live Map", thai: "Live Map", status: "New", desc: "Live Map - enterprise grade module for L22 Command Center", metric: mkMetric(), icon: Globe },
      { id: "system-health", name: "System Health", thai: "System Health", status: "Active", desc: "System Health - enterprise grade module for L22 Command Center", metric: mkMetric(), icon: Box },
      { id: "incident-timeline", name: "Incident Timeline", thai: "Incident Timeline", status: "Beta", desc: "Incident Timeline - enterprise grade module for L22 Command Center", metric: mkMetric(), icon: GitBranch },
      { id: "ai-health", name: "AI Health", thai: "AI Health", status: "New", desc: "AI Health - enterprise grade module for L22 Command Center", metric: mkMetric(), icon: Box },
      { id: "cluster-health", name: "Cluster Health", thai: "Cluster Health", status: "Active", desc: "Cluster Health - enterprise grade module for L22 Command Center", metric: mkMetric(), icon: Box },
      { id: "global-nodes", name: "Global Nodes", thai: "Global Nodes", status: "Beta", desc: "Global Nodes - enterprise grade module for L22 Command Center", metric: mkMetric(), icon: Globe },
    ]
  },
  { id: 23, key: "research-lab", nameEn: "L23 Research Lab", nameTh: "ห้องแล็บวิจัย", icon: FlaskConicalIcon, color: "from-[#A68B6B] to-[#6B543A]",
    modules: [
      { id: "ai-research", name: "AI Research", thai: "AI Research", status: "Active", desc: "AI Research - enterprise grade module for L23 Research Lab", metric: mkMetric(), icon: Search },
      { id: "scientific-discovery", name: "Scientific Discovery", thai: "Scientific Discovery", status: "Beta", desc: "Scientific Discovery - enterprise grade module for L23 Research Lab", metric: mkMetric(), icon: GitBranch },
      { id: "simulation", name: "Simulation", thai: "Simulation", status: "New", desc: "Simulation - enterprise grade module for L23 Research Lab", metric: mkMetric(), icon: Box },
      { id: "experiment-tracking", name: "Experiment Tracking", thai: "Experiment Tracking", status: "Active", desc: "Experiment Tracking - enterprise grade module for L23 Research Lab", metric: mkMetric(), icon: Box },
      { id: "benchmark-center", name: "Benchmark Center", thai: "Benchmark Center", status: "Beta", desc: "Benchmark Center - enterprise grade module for L23 Research Lab", metric: mkMetric(), icon: Box },
      { id: "innovation-hub", name: "Innovation Hub", thai: "Innovation Hub", status: "New", desc: "Innovation Hub - enterprise grade module for L23 Research Lab", metric: mkMetric(), icon: Box },
    ]
  },
  { id: 24, key: "enterprise-integration", nameEn: "L24 Enterprise Integration", nameTh: "เชื่อมต่อองค์กร", icon: Plug, color: "from-[#8B5A2B] to-[#2C1E12]",
    modules: [
      { id: "sap", name: "SAP", thai: "SAP", status: "Active", desc: "SAP - enterprise grade module for L24 Enterprise Integration", metric: mkMetric(), icon: Box },
      { id: "oracle", name: "Oracle", thai: "Oracle", status: "Beta", desc: "Oracle - enterprise grade module for L24 Enterprise Integration", metric: mkMetric(), icon: Box },
      { id: "salesforce", name: "Salesforce", thai: "Salesforce", status: "New", desc: "Salesforce - enterprise grade module for L24 Enterprise Integration", metric: mkMetric(), icon: Box },
      { id: "microsoft-365", name: "Microsoft 365", thai: "Microsoft 365", status: "Active", desc: "Microsoft 365 - enterprise grade module for L24 Enterprise Integration", metric: mkMetric(), icon: Box },
      { id: "google-workspace", name: "Google Workspace", thai: "Google Workspace", status: "Beta", desc: "Google Workspace - enterprise grade module for L24 Enterprise Integration", metric: mkMetric(), icon: Users },
      { id: "jira", name: "Jira", thai: "Jira", status: "New", desc: "Jira - enterprise grade module for L24 Enterprise Integration", metric: mkMetric(), icon: Box },
      { id: "servicenow", name: "ServiceNow", thai: "ServiceNow", status: "Active", desc: "ServiceNow - enterprise grade module for L24 Enterprise Integration", metric: mkMetric(), icon: Box },
      { id: "zendesk", name: "Zendesk", thai: "Zendesk", status: "Beta", desc: "Zendesk - enterprise grade module for L24 Enterprise Integration", metric: mkMetric(), icon: Box },
      { id: "snowflake", name: "Snowflake", thai: "Snowflake", status: "New", desc: "Snowflake - enterprise grade module for L24 Enterprise Integration", metric: mkMetric(), icon: Box },
    ]
  },
  { id: 25, key: "future-tech", nameEn: "L25 Future Technologies", nameTh: "เทคโนโลยีอนาคต", icon: Flame, color: "from-[#D9B38C] to-[#8B5A2B]",
    modules: [
      { id: "edge-ai", name: "Edge AI", thai: "Edge AI", status: "Active", desc: "Edge AI - enterprise grade module for L25 Future Technologies", metric: mkMetric(), icon: Globe },
      { id: "federated-learning", name: "Federated Learning", thai: "Federated Learning", status: "Beta", desc: "Federated Learning - enterprise grade module for L25 Future Technologies", metric: mkMetric(), icon: Box },
      { id: "quantum-ready", name: "Quantum Ready", thai: "Quantum Ready", status: "New", desc: "Quantum Ready - enterprise grade module for L25 Future Technologies", metric: mkMetric(), icon: Box },
      { id: "robotics", name: "Robotics", thai: "Robotics", status: "Active", desc: "Robotics - enterprise grade module for L25 Future Technologies", metric: mkMetric(), icon: Box },
      { id: "drone-control", name: "Drone Control", thai: "Drone Control", status: "Beta", desc: "Drone Control - enterprise grade module for L25 Future Technologies", metric: mkMetric(), icon: Box },
      { id: "autonomous-vehicle", name: "Autonomous Vehicle", thai: "Autonomous Vehicle", status: "New", desc: "Autonomous Vehicle - enterprise grade module for L25 Future Technologies", metric: mkMetric(), icon: Zap },
      { id: "ar", name: "AR", thai: "AR", status: "Active", desc: "AR - enterprise grade module for L25 Future Technologies", metric: mkMetric(), icon: Box },
      { id: "vr", name: "VR", thai: "VR", status: "Beta", desc: "VR - enterprise grade module for L25 Future Technologies", metric: mkMetric(), icon: Box },
      { id: "xr", name: "XR", thai: "XR", status: "New", desc: "XR - enterprise grade module for L25 Future Technologies", metric: mkMetric(), icon: Box },
      { id: "digital-human", name: "Digital Human", thai: "Digital Human", status: "Active", desc: "Digital Human - enterprise grade module for L25 Future Technologies", metric: mkMetric(), icon: GitBranch },
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
  const [theme, setTheme] = useState<"dark" | "light" | "cyber" | "wood">("wood");
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

  const isDark = false; // Wood Premium forced light

  return (
    <div className={`min-h-screen w-full flex flex-col overflow-hidden relative font-[Kanit,Inter,sans-serif] bg-[#FDF6EC] text-[#3E2F1E] selection:bg-[#E8D5B8] transition-colors`}>
      {/* wood grain subtle */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]" style={{backgroundImage: `url("https://www.transparenttextures.com/patterns/wood-pattern-pexels.png")`}} />

      {/* TOP BAR */}
      <header className={`h-[60px] shrink-0 z-20 flex items-center justify-between px-4 md:px-6 border-b backdrop-blur-xl bg-[#FFFCF6]/90 border-[#E7D5B8] shadow-[0_1px_20px_rgba(139,90,43,0.06)]`}>
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className={`p-2 rounded-lg ${isDark ? "hover:bg-white/10" : "hover:bg-slate-100"} transition`}>
            {sidebarCollapsed ? <PanelLeftOpen size={18}/> : <PanelLeftClose size={18}/>}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#8B5A2B] to-[#5C3D1E] grid place-items-center font-black tracking-widest text-white shadow-lg shadow-amber-900/15">M</div>
            <div className="leading-tight">
              <div className="font-bold tracking-widest text-[13px]">MANUS <span className="text-[#8B5A2B]">v10</span></div>
              <div className={`text-[10px] uppercase tracking-[0.18em] ${isDark ? "text-[#9C8A7A]" : "text-slate-500"}`}>Wood Premium • Enterprise OS</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 ml-6">
            <div className={`h-6 px-2.5 rounded-full text-[11px] flex items-center gap-1.5 border ${isDark ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300" : "bg-emerald-50 border-emerald-200 text-emerald-700"}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> SLA 99.95%
            </div>
            <div className={`h-6 px-2.5 rounded-full text-[11px] ${isDark ? "bg-[#F5E9D6] border border-[#E8D5B8]" : "bg-slate-100 border border-slate-200"}`}>TH • Production</div>
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
              className={`w-full h-9 pl-9 pr-16 rounded-xl text-[13px] outline-none border transition ${isDark ? "bg-white/[0.06] border-[#E8D5B8] focus:border-[#8B5A2B]/50 placeholder:text-white/30" : "bg-slate-100 border-slate-200 focus:border-violet-400 placeholder:text-slate-400"}`}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <kbd className={`px-1.5 py-0.5 rounded text-[10px] border ${isDark ? "bg-white/10 border-[#E8D5B8]" : "bg-white border-slate-200"}`}>Ctrl</kbd>
              <kbd className={`px-1 py-0.5 rounded text-[10px] border ${isDark ? "bg-white/10 border-[#E8D5B8]" : "bg-white border-slate-200"}`}>K</kbd>
            </div>
          </div>

          <button onClick={() => setTheme(t => t === "dark" ? "light" : t === "light" ? "cyber" : "dark")}
            className={`w-9 h-9 grid place-items-center rounded-xl border transition ${isDark ? "bg-[#F5E9D6] border-[#E8D5B8] hover:bg-white/10" : "bg-white border-slate-200 hover:bg-slate-50"}`}>
            {theme === "dark" ? <Moon size={16}/> : theme === "light" ? <Sun size={16}/> : <Palette size={16}/>}
          </button>

          <div className={`hidden md:flex items-center gap-2 h-9 px-3 rounded-xl border text-xs font-mono ${isDark ? "bg-[#F5E9D6] border-[#E8D5B8]" : "bg-white border-slate-200"}`}>
            <Clock size={12} className="opacity-60" /> {time}
          </div>

          <button onClick={() => setShowNotif(!showNotif)} className={`relative w-9 h-9 grid place-items-center rounded-xl border transition ${isDark ? "bg-[#F5E9D6] border-[#E8D5B8] hover:bg-white/10" : "bg-white border-slate-200"}`}>
            <Bell size={16} />
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 text-[11px] grid place-items-center text-white font-bold shadow">3</span>
          </button>

          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 p-[1px] shadow">
            <div className={`w-full h-full rounded-[10px] grid place-items-center text-[11px] font-bold ${isDark ? "bg-[#FFF9EF]" : "bg-white"}`}>NP</div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative z-10">
        {/* SIDEBAR */}
        <aside className={`w-[300px] md:w-[320px] shrink-0 border-r backdrop-blur-xl flex flex-col overflow-hidden bg-[#FFF9EF]/95 border-[#E7D5B8] shadow-[4px_0_24px_rgba(62,39,35,0.04)] transition-all`}>
          <div className="p-3 flex items-center justify-between">
            {!sidebarCollapsed && <div className="text-[11px] tracking-widest uppercase opacity-50">20 Categories • 100+ Modules</div>}
            <button onClick={() => setShowArch(true)} className={`ml-auto text-[11px] px-2.5 py-1 rounded-full border transition ${isDark ? "bg-[#8B5A2B]/15 border-[#8B5A2B]/30 text-violet-300 hover:bg-[#8B5A2B]/25" : "bg-violet-50 border-violet-200 text-violet-700"}`}>View Architecture</button>
          </div>

          <div className="flex-1 overflow-y-auto px-2 pb-24 space-y-1 custom-scroll">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const isActive = cat.id === activeCategoryId;
              const isExpanded = expanded.has(cat.id);
              return (
                <div key={cat.id} className={`rounded-2xl border transition ${isActive ? (isDark ? "bg-white border-[#E8D5B8]" : "bg-violet-50 border-violet-200") : "border-transparent"}`}>
                  <button
                    onClick={() => { setActiveCategoryId(cat.id); if (sidebarCollapsed) setSidebarCollapsed(false); else toggleExpand(cat.id); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-left transition ${isActive ? "text-white" : isDark ? "hover:bg-white" : "hover:bg-slate-50"}`}>
                    <div className={`w-9 h-9 rounded-xl grid place-items-center shrink-0 bg-gradient-to-br ${cat.color} text-white shadow-md`}>
                      <Icon size={16} />
                    </div>
                    {!sidebarCollapsed && (
                      <>
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] font-medium leading-tight truncate">{cat.nameEn}</div>
                          <div className={`text-[11px] truncate ${isDark ? "text-white/45" : "text-slate-500"}`}>{cat.nameTh}</div>
                        </div>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full border shrink-0 ${isDark ? "bg-[#F5E9D6] border-[#E8D5B8] text-white/60" : "bg-white border-slate-200 text-slate-600"}`}>{cat.modules.length}</span>
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
                            className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-[12.5px] transition border ${activeMod ? (isDark ? "bg-[#8B5A2B]/15 border-[#8B5A2B]/30 text-violet-200" : "bg-white border-violet-200 text-violet-700 shadow-sm") : (isDark ? "border-transparent text-white/55 hover:text-white hover:bg-[#F5E9D6]" : "border-transparent text-slate-600 hover:bg-slate-100")}`}>
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
            <div className={`p-3 border-t ${isDark ? "border-[#E8D5B8] bg-[#F5E9D6]/60" : "border-slate-200 bg-slate-50"}`}>
              <div className="flex items-center gap-2 text-[11px]">
                <div className="w-2 h-2 rounded-full bg-[#8B5A2B] animate-pulse shadow-[0_0_8px_rgba(139,90,43,0.6)]" />
                <span className="opacity-70">AI Kernel • v10.0.4 •</span>
                <span className="text-emerald-400">Healthy</span>
              </div>
            </div>
          )}
        </aside>

        {/* MAIN */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {/* workspace tabs */}
          <div className={`h-[44px] shrink-0 flex items-center gap-1 px-2 border-b overflow-x-auto no-scrollbar ${isDark ? "bg-[#FFFCF6] border-[#E8D5B8]" : "bg-white border-slate-200"}`}>
            <button onClick={() => { setActiveTabId(null); setSelectedModule(null); }}
              className={`h-7 px-3 rounded-full text-[12px] flex items-center gap-1.5 border shrink-0 transition ${!activeTabId ? (isDark ? "bg-white text-black border-white" : "bg-[#3E2F1E] text-[#FFFCF6] border-slate-900") : (isDark ? "bg-[#F5E9D6] border-[#E8D5B8] hover:bg-white/10" : "bg-slate-100 border-slate-200")}`}>
              <LayoutDashboard size={12}/> Executive
            </button>
            {openTabs.map(t => {
              const active = t.id === activeTabId;
              return (
                <button key={t.id} onClick={() => { setActiveTabId(t.id); setSelectedModule(t); }}
                  className={`h-7 px-2.5 pr-1 rounded-full text-[12px] flex items-center gap-1.5 border shrink-0 transition ${active ? (isDark ? "bg-[#8B5A2B] text-white border-[#8B5A2B]" : "bg-[#8B5A2B] text-white border-violet-600") : (isDark ? "bg-[#F5E9D6] border-[#E8D5B8] hover:bg-white/10 text-[#6B5A4A]" : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600")}`}>
                  {t.name}
                  <span onClick={(e) => closeTab(t.id, e)} className="w-5 h-5 grid place-items-center rounded-full hover:bg-black/10"><X size={12}/></span>
                </button>
              );
            })}
            <div className="ml-auto flex items-center gap-1.5">
              <button onClick={() => setSplitView(!splitView)} className={`h-7 px-2.5 rounded-full text-[11px] flex items-center gap-1 border ${isDark ? "bg-[#F5E9D6] border-[#E8D5B8]" : "bg-white border-slate-200"} ${splitView ? "text-[#8B5A2B] border-[#D4A574]/50" : ""}`}>
                <Split size={12}/> {splitView ? "Split ON" : "Split"}
              </button>
              <button className={`w-7 h-7 grid place-items-center rounded-full border ${isDark ? "bg-[#F5E9D6] border-[#E8D5B8]" : "bg-white border-slate-200"}`}><Maximize2 size={12}/></button>
            </div>
          </div>

          <div className="flex-1 overflow-auto custom-scroll p-3 md:p-5 pb-28">
            {/* EXECUTIVE DASHBOARD default */}
            {!activeTabId && activeCategoryId === 1 ? (
              <div className="space-y-5 max-w-[1440px] mx-auto">
                {/* KPI */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { label: "AI Health", value: "98.2%", sub: "↑ 1.2% 7d", icon: Activity, grad: "from-[#8B5A2B] to-[#5C3D1E]" },
                    { label: "Active Agents", value: "247", sub: "12 swarms", icon: Bot, grad: "from-[#8B5A2B] to-[#5C3D1E]" },
                    { label: "Cost Today", value: "$842", sub: "↓ 8% vs yesterday", icon: DollarSign, grad: "from-[#8B5A2B] to-[#5C3D1E]" },
                    { label: "SLA", value: "99.95%", sub: "30d window", icon: CheckCircle2, grad: "from-[#8B5A2B] to-[#5C3D1E]" },
                  ].map(k => (
                    <div key={k.label} className={`rounded-[20px] p-4 border backdrop-blur-xl relative overflow-hidden ${isDark ? "bg-white border-[#E8D5B8]" : "bg-white border-slate-200 shadow-sm"}`}>
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
                  <div className={`col-span-12 lg:col-span-7 rounded-[20px] border p-4 md:p-5 backdrop-blur-xl overflow-hidden relative ${isDark ? "bg-white border-[#E8D5B8]" : "bg-white border-slate-200 shadow-sm"}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium flex items-center gap-2"><Globe size={16} className="text-[#8B5A2B]"/> Global Edge Map • Live Requests</h3>
                      <span className={`text-[11px] px-2 py-1 rounded-full border ${isDark ? "bg-[#F5E9D6] border-[#E8D5B8]" : "bg-slate-100 border-slate-200"}`}>14 regions • 2.4M req/min</span>
                    </div>
                    <div className={`relative h-[260px] rounded-2xl overflow-hidden border ${isDark ? "bg-[#F9EFE1] border-[#EEDDC3]" : "bg-slate-50 border-slate-200"}`}>
                      {/* fake world grid */}
                      <div className="absolute inset-0 opacity-[0.08]" style={{backgroundImage:`linear-gradient(${isDark?"white":"black"} 1px, transparent 1px), linear-gradient(90deg, ${isDark?"white":"black"} 1px, transparent 1px)`, backgroundSize:"32px 32px"}}/>
                      {/* pulsing dots */}
                      {[
                        {x:18,y:28,c:"Bangkok"}, {x:72,y:22,c:"Virginia"}, {x:48,y:38,c:"Frankfurt"}, {x:82,y:62,c:"Singapore"}, {x:35,y:68,c:"Mumbai"}, {x:58,y:72,c:"Sydney"}
                      ].map(d=>(
                        <div key={d.c} className="absolute" style={{left:`${d.x}%`, top:`${d.y}%`}}>
                          <div className="w-2.5 h-2.5 rounded-full bg-violet-400 shadow-[0_0_12px_4px_rgba(139,92,246,0.6)] animate-pulse" />
                          <div className="absolute -inset-3 rounded-full border border-violet-400/30 animate-ping" />
                          <div className={`absolute left-4 -top-1 text-[10px] px-1.5 py-0.5 rounded-full whitespace-nowrap border backdrop-blur ${isDark ? "bg-black/60 border-[#E8D5B8]" : "bg-white border-slate-200 shadow"}`}>{d.c}</div>
                        </div>
                      ))}
                      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full opacity-30">
                        <path d="M 18 28 Q 35 15 48 38 T 72 22" fill="none" stroke="#8b5cf6" strokeDasharray="4 6" strokeWidth="0.8"/>
                        <path d="M 48 38 Q 65 55 82 62 T 58 72" fill="none" stroke="#06b6d4" strokeDasharray="4 6" strokeWidth="0.8"/>
                      </svg>
                    </div>
                  </div>

                  {/* Live System Status */}
                  <div className={`col-span-12 lg:col-span-5 rounded-[20px] border p-4 backdrop-blur-xl ${isDark ? "bg-white border-[#E8D5B8]" : "bg-white border-slate-200 shadow-sm"}`}>
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
                        <div key={s.name} className={`rounded-xl p-3 border flex flex-col gap-2 ${isDark ? "bg-white border-[#EEDDC3]" : "bg-slate-50 border-slate-200"}`}>
                          <div className="flex items-center justify-between text-[12px]"><span className="flex items-center gap-1.5"><span className={`w-1.5 h-1.5 rounded-full ${s.ok?"bg-emerald-400":"bg-amber-400 animate-pulse"}`}/>{s.name}</span><span className={`text-[10px] px-1.5 py-0.5 rounded-full ${s.ok?"bg-emerald-500/15 text-emerald-400":"bg-amber-500/15 text-amber-400"}`}>{s.up}</span></div>
                          <div className={`text-[11px] flex justify-between ${isDark?"text-[#9C8A7A]":"text-slate-500"}`}><span>{s.ms}ms p95</span><span className="font-mono">{s.ok?"OPERATIONAL":"DEGRADED"}</span></div>
                          <div className="h-1 w-full rounded-full bg-[#F5E9D6]/60 overflow-hidden"><div className={`h-full ${s.ok?"bg-emerald-400":"bg-amber-400"}`} style={{width: s.up==="100%"?"100%":s.up}} /></div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 rounded-xl p-3 border border-amber-500/20 bg-amber-500/10 flex gap-2.5">
                      <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-0.5"/>
                      <div className="text-[12px] leading-snug"><b>Workflow Engine</b> latency spike detected in ap-southeast-1. Auto-scaling triggered (3 → 7 pods). <span className="underline decoration-dotted cursor-pointer">View logs</span></div>
                    </div>
                  </div>

                  {/* Revenue + Alerts */}
                  <div className={`col-span-12 lg:col-span-8 rounded-[20px] border p-4 backdrop-blur-xl ${isDark ? "bg-white border-[#E8D5B8]" : "bg-white border-slate-200 shadow-sm"}`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium flex items-center gap-2"><TrendingUp size={16} className="text-[#8B5A2B]"/> Revenue Analytics • MRR</h3>
                      <div className="flex gap-1.5 text-[11px]">
                        <span className={`px-2 py-1 rounded-full ${isDark?"bg-[#8B5A2B]/20 text-violet-300":"bg-violet-50 text-violet-700"}`}>7D</span>
                        <span className={`px-2 py-1 rounded-full ${isDark?"bg-[#F5E9D6] text-white/50":"bg-slate-100 text-slate-500"}`}>30D</span>
                        <span className={`px-2 py-1 rounded-full ${isDark?"bg-[#F5E9D6] text-white/50":"bg-slate-100 text-slate-500"}`}>90D</span>
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
                      <div className={`rounded-xl p-2.5 border ${isDark?"bg-[#F5E9D6] border-[#EEDDC3]":"bg-slate-50 border-slate-200"}`}><div className="text-[11px] opacity-60">MRR</div><div className="font-semibold">$128.4k</div><div className="text-[11px] text-emerald-400">↑ 12.3%</div></div>
                      <div className={`rounded-xl p-2.5 border ${isDark?"bg-[#F5E9D6] border-[#EEDDC3]":"bg-slate-50 border-slate-200"}`}><div className="text-[11px] opacity-60">ARPU</div><div className="font-semibold">$84.2</div><div className="text-[11px] text-emerald-400">↑ 3.1%</div></div>
                      <div className={`rounded-xl p-2.5 border ${isDark?"bg-[#F5E9D6] border-[#EEDDC3]":"bg-slate-50 border-slate-200"}`}><div className="text-[11px] opacity-60">Churn</div><div className="font-semibold">2.4%</div><div className="text-[11px] text-amber-400">→ stable</div></div>
                    </div>
                  </div>

                  <div className={`col-span-12 lg:col-span-4 rounded-[20px] border p-4 backdrop-blur-xl ${isDark ? "bg-white border-[#E8D5B8]" : "bg-white border-slate-200 shadow-sm"}`}>
                    <h3 className="font-medium mb-3 flex items-center gap-2"><AlertTriangle size={16} className="text-amber-400"/> Alerts • 3 critical</h3>
                    <div className="space-y-2.5">
                      {[
                        {lvl:"critical", msg:"GPU quota 92% in us-east-1", time:"2m"},
                        {lvl:"warn", msg:"Prompt injection attempt blocked", time:"14m"},
                        {lvl:"info", msg:"New agent version deployed: coder-v2.4", time:"1h"},
                      ].map((a,i)=>(
                        <div key={i} className={`flex gap-2.5 p-2.5 rounded-xl border ${a.lvl==="critical"? "bg-red-500/10 border-red-500/20": a.lvl==="warn"?"bg-amber-500/10 border-amber-500/20":"bg-[#F5E9D6] border-[#E8D5B8]"}`}>
                          <span className={`mt-0.5 w-1.5 h-1.5 rounded-full shrink-0 ${a.lvl==="critical"?"bg-red-400":a.lvl==="warn"?"bg-amber-400":"bg-blue-400"}`}/>
                          <div className="flex-1 min-w-0"><div className="text-[12.5px] leading-snug">{a.msg}</div><div className="text-[11px] opacity-50 mt-0.5">{a.time} ago • auto-action taken</div></div>
                        </div>
                      ))}
                      <button className={`w-full h-8 rounded-xl text-[12px] border ${isDark?"bg-[#F5E9D6] border-[#E8D5B8] hover:bg-white/10":"bg-slate-50 border-slate-200"}`}>View all in Incident Center →</button>
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
                      {activeCategory.nameEn} <span className={`text-[13px] font-normal px-2 py-0.5 rounded-full border ${isDark?"bg-[#F5E9D6] border-[#E8D5B8] text-white/50":"bg-slate-100 border-slate-200 text-slate-500"}`}>{activeCategory.nameTh}</span>
                    </h2>
                    <p className={`text-[13px] mt-1 ${isDark?"text-white/50":"text-slate-500"}`}>{activeCategory.modules.length} modules • Enterprise grade • {activeCategory.key} subsystem</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`h-8 px-3 rounded-full border text-[12px] flex items-center gap-1.5 ${isDark?"bg-[#F5E9D6] border-[#E8D5B8]":"bg-white border-slate-200"}`}><Server size={12}/> {filteredModules.length} modules visible</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                  {filteredModules.map(mod => {
                    const Icon = mod.icon;
                    return (
                      <button key={mod.id} onClick={() => openModule(mod)} className={`group text-left rounded-[18px] border p-4 backdrop-blur-xl transition-all hover:scale-[1.01] hover:shadow-xl text-left relative overflow-hidden ${isDark ? "bg-white border-[#E8D5B8] hover:bg-white/[0.06] hover:border-[#8B5A2B]/30" : "bg-white border-slate-200 hover:border-violet-300 hover:shadow-lg"}`}>
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
                          <span className={`text-[11px] px-2 py-1 rounded-full border ${isDark?"bg-[#F5E9D6] border-[#E8D5B8] group-hover:bg-white/10":"bg-slate-50 border-slate-200 group-hover:bg-violet-50"}`}>Open →</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {filteredModules.length===0 && (
                  <div className={`mt-16 text-center py-16 rounded-[20px] border border-dashed ${isDark?"border-[#E8D5B8] bg-white/[0.02]":"border-slate-300 bg-slate-50"}`}>
                    <Search size={28} className="mx-auto opacity-30 mb-3"/>
                    <div className="font-medium">ไม่พบโมดูลที่ค้นหา</div>
                    <div className={`text-[13px] mt-1 ${isDark?"text-[#9C8A7A]":"text-slate-500"}`}>ลองค้นหาด้วยคำอื่น เช่น "Agent", "Database", "API"</div>
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
              <button key={d.label} onClick={d.action} className="group relative w-11 h-11 rounded-[14px] bg-gradient-to-br from-white/10 to-white/5 border border-[#E8D5B8] grid place-items-center hover:scale-[1.25] hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-violet-500/20">
                <d.icon size={18} className={`${isDark?"text-white/80 group-hover:text-white":"text-slate-700"}`} />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-full text-[10px] whitespace-nowrap bg-black text-white opacity-0 group-hover:opacity-100 transition pointer-events-none">{d.label}</span>
              </button>
            ))}
            <div className={`w-px h-8 mx-1 self-center ${isDark?"bg-white/10":"bg-black/10"}`} />
            <button className="w-11 h-11 rounded-[14px] bg-gradient-to-br from-[#8B5A2B] to-[#5C3D1E] grid place-items-center text-white shadow-lg shadow-violet-600/30 hover:scale-110 transition"><Plus size={18}/></button>
          </div>
        </main>

        {/* DETAIL DRAWER */}
        {selectedModule && (
          <aside className={`w-[380px] shrink-0 border-l flex flex-col backdrop-blur-xl transition-all ${isDark?"bg-[#FFF9EF]/90 border-[#E8D5B8]":"bg-white border-slate-200"} ${splitView ? "hidden xl:flex" : "flex"} max-md:fixed max-md:inset-0 max-md:w-full max-md:z-30`}>
            <div className={`h-[44px] flex items-center justify-between px-4 border-b shrink-0 ${isDark?"border-[#E8D5B8]":"border-slate-200"}`}>
              <div className="text-[13px] font-medium flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/> Module Inspector</div>
              <div className="flex items-center gap-1">
                <button onClick={()=>setSplitView(!splitView)} className={`w-7 h-7 grid place-items-center rounded-lg border ${isDark?"bg-[#F5E9D6] border-[#E8D5B8]":"bg-slate-50 border-slate-200"}`}><Split size={12}/></button>
                <button onClick={()=>{setSelectedModule(null); setActiveTabId(null);}} className={`w-7 h-7 grid place-items-center rounded-lg border ${isDark?"bg-[#F5E9D6] border-[#E8D5B8]":"bg-slate-50 border-slate-200"}`}><X size={14}/></button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scroll">
              <div className={`rounded-2xl p-4 border ${isDark?"bg-white border-[#E8D5B8]":"bg-slate-50 border-slate-200"}`}>
                <div className="flex gap-3">
                  <div className={`w-11 h-11 rounded-xl grid place-items-center bg-gradient-to-br ${activeCategory.color} text-white`}><selectedModule.icon size={20}/></div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold leading-tight">{selectedModule.name}</div>
                    <div className={`text-[12px] ${isDark?"text-white/50":"text-slate-500"}`}>{selectedModule.thai}</div>
                    <div className="flex gap-1.5 mt-1.5">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20`}>{selectedModule.status}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${isDark?"bg-[#F5E9D6] border-[#E8D5B8]":"bg-white border-slate-200"}`}>v10.0.4</span>
                    </div>
                  </div>
                </div>
                <p className={`text-[13px] leading-relaxed mt-3 ${isDark?"text-white/65":"text-slate-600"}`}>{selectedModule.desc} — Enterprise module with auto-scaling, audit logs, and AI-powered remediation. SLA 99.9% guaranteed.</p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[{k:"Latency p95", v:"18ms"}, {k:"Throughput", v:"4.2k/s"}, {k:"Error", v:"0.02%"}].map(s=>(
                  <div key={s.k} className={`rounded-xl p-2.5 border text-center ${isDark?"bg-white border-[#EEDDC3]":"bg-white border-slate-200"}`}><div className="text-[10px] uppercase opacity-50">{s.k}</div><div className="font-semibold text-[13px] mt-0.5">{s.v}</div></div>
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
                    <div key={r.p} className={`flex items-center gap-2 px-2.5 py-2 rounded-xl border ${isDark?"bg-black/30 border-[#EEDDC3]":"bg-slate-50 border-slate-200"}`}>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${r.m==="GET"?"bg-emerald-500/20 text-emerald-400":"bg-[#8B5A2B]/20 text-violet-300"}`}>{r.m}</span>
                      <span className="truncate opacity-80">{r.p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[12px] font-semibold uppercase tracking-widest opacity-60 mb-2">Live Metrics</h4>
                <div className={`rounded-xl border p-3 ${isDark?"bg-[#F5E9D6]/60 border-[#EEDDC3]":"bg-slate-50 border-slate-200"}`}>
                  <svg viewBox="0 0 100 36" className="w-full h-[72px]">
                    <polyline fill="none" stroke="#8b5cf6" strokeWidth="1.8" points={selectedModule.metric.map((v,i)=>`${i*11},${36 - v*0.3}`).join(" ")}/>
                  </svg>
                  <div className="flex justify-between text-[11px] opacity-50 mt-1"><span>00:00</span><span>now</span></div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 h-10 rounded-xl bg-gradient-to-br from-[#8B5A2B] to-[#5C3D1E] text-white text-[13px] font-medium shadow-lg shadow-amber-900/15 hover:opacity-95 transition">Open Module →</button>
                <button className={`w-10 h-10 grid place-items-center rounded-xl border ${isDark?"bg-[#F5E9D6] border-[#E8D5B8] hover:bg-white/10":"bg-white border-slate-200"}`}><Eye size={16}/></button>
              </div>

              <div className={`rounded-xl p-3 border text-[12px] leading-relaxed ${isDark?"bg-amber-500/10 border-amber-500/20 text-amber-200/80":"bg-amber-50 border-amber-200 text-amber-800"}`}>
                <b className="flex items-center gap-1.5"><Shield size={12}/> Governance:</b> Requires approval for production deploy. Policy: <code className="px-1 py-0.5 rounded bg-[#F5E9D6]/60">ai.prod.deploy</code>
              </div>
            </div>
          </aside>
        )}

        {/* SPLIT SECOND PANE */}
        {splitView && selectedModule && (
          <aside className={`hidden xl:flex w-[380px] shrink-0 border-l flex-col ${isDark?"bg-[#080c18] border-[#E8D5B8]":"bg-slate-50 border-slate-200"}`}>
            <div className="h-[44px] px-4 flex items-center border-b border-[#E8D5B8] text-[12px] opacity-60">Split View • Secondary</div>
            <div className="flex-1 p-4">
              <div className={`h-full rounded-2xl border border-dashed grid place-items-center p-6 text-center ${isDark?"border-[#E8D5B8] bg-white/[0.02]":"border-slate-300 bg-white"}`}>
                <div>
                  <Layers size={28} className="mx-auto opacity-30 mb-2"/>
                  <div className="font-medium">Drag another module here</div>
                  <div className={`text-[12px] mt-1 ${isDark?"text-[#9C8A7A]":"text-slate-500"}`}>เปรียบเทียบ 2 โมดูลแบบ side-by-side เพื่อ debug workflow</div>
                  <button onClick={()=>setSplitView(false)} className="mt-4 h-8 px-3 rounded-full bg-[#8B5A2B] text-white text-[12px]">Exit Split</button>
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
          <div className={`relative w-full max-w-[640px] rounded-[20px] border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 ${isDark?"bg-[#10162a] border-[#E8D5B8]":"bg-white border-slate-200"}`}>
            <div className="flex items-center gap-3 px-4 h-[52px] border-b border-[#E8D5B8]">
              <Search size={18} className="opacity-50"/>
              <input autoFocus value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="ค้นหาโมดูล, คำสั่ง, เอกสาร... (พิมพ์ภาษาไทยได้)" className="flex-1 bg-transparent outline-none text-[14px] placeholder:opacity-40"/>
              <kbd className={`px-2 py-1 rounded-lg text-[11px] border ${isDark?"bg-white/10 border-[#E8D5B8]":"bg-slate-100 border-slate-200"}`}>ESC</kbd>
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
            <div className={`h-9 flex items-center justify-between px-4 border-t text-[11px] ${isDark?"bg-[#F5E9D6]/60 border-[#EEDDC3] text-[#9C8A7A]":"bg-slate-50 border-slate-200 text-slate-500"}`}>
              <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-emerald-400"/> 127 modules indexed</span>
              <span>↑↓ Navigate • ↵ Open • Esc Close</span>
            </div>
          </div>
        </div>
      )}

      {/* NOTIFICATION CENTER */}
      <div className={`fixed top-0 right-0 h-full w-[360px] z-40 border-l backdrop-blur-2xl shadow-2xl transition-transform duration-300 ${showNotif ? "translate-x-0" : "translate-x-full"} ${isDark ? "bg-[#0b1020]/90 border-[#E8D5B8]" : "bg-white/95 border-slate-200"}`}>
        <div className="h-[56px] flex items-center justify-between px-4 border-b border-[#E8D5B8]">
          <div className="font-medium flex items-center gap-2"><Bell size={16}/> Notification Center <span className="px-1.5 py-0.5 rounded-full bg-[#8B5A2B] text-white text-[10px]">3</span></div>
          <button onClick={()=>setShowNotif(false)} className={`w-8 h-8 grid place-items-center rounded-lg border ${isDark?"bg-[#F5E9D6] border-[#E8D5B8]":"bg-slate-100 border-slate-200"}`}><X size={14}/></button>
        </div>
        <div className="p-3 space-y-2.5 overflow-y-auto h-[calc(100%-56px)] custom-scroll">
          {[
            {t:"Agent swarm scale-up completed", d:"247 agents active across 6 regions", time:"now", color:"emerald"},
            {t:"Cost anomaly detected", d:"LLM cost +22% in workflow_9f3", time:"12m", color:"amber"},
            {t:"Compliance check passed", d:"SOC2 audit logs verified", time:"1h", color:"violet"},
          ].map((n,i)=>(
            <div key={i} className={`p-3 rounded-2xl border ${isDark?"bg-white border-[#E8D5B8]":"bg-slate-50 border-slate-200"}`}>
              <div className="flex gap-2.5"><span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 bg-${n.color}-400`} style={{background: n.color==="emerald"?"#34d399":n.color==="amber"?"#fbbf24":"#8b5cf6"}}/><div className="flex-1"><div className="text-[13px] font-medium leading-snug">{n.t}</div><div className={`text-[12px] mt-1 ${isDark?"text-white/55":"text-slate-600"}`}>{n.d}</div><div className="text-[11px] opacity-40 mt-1.5">{n.time} • AI generated</div></div></div>
            </div>
          ))}
          <button className={`w-full h-9 rounded-xl border text-[12px] ${isDark?"bg-[#F5E9D6] border-[#E8D5B8]":"bg-white border-slate-200"}`}>Mark all as read</button>
        </div>
      </div>

      {/* ARCHITECTURE MODAL */}
      {showArch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={()=>setShowArch(false)} />
          <div className={`relative w-full max-w-[980px] max-h-[88vh] rounded-[20px] border shadow-2xl overflow-hidden flex flex-col ${isDark?"bg-[#0e1428] border-[#E8D5B8]":"bg-white border-slate-200"}`}>
            <div className="h-[56px] flex items-center justify-between px-5 border-b border-[#E8D5B8] shrink-0">
              <div className="font-semibold flex items-center gap-2.5"><Folder size={18} className="text-[#8B5A2B]"/> MANUS-OS / Project Architecture <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#8B5A2B]/20 text-violet-300 border border-[#8B5A2B]/20">Enterprise Monorepo</span></div>
              <button onClick={()=>setShowArch(false)} className="w-8 h-8 grid place-items-center rounded-lg bg-white/10"><X size={14}/></button>
            </div>
            <div className="flex-1 overflow-auto p-4 md:p-6 grid md:grid-cols-[300px_1fr] gap-5 custom-scroll font-mono text-[12.5px]">
              <div className={`rounded-xl border p-3 ${isDark?"bg-black/30 border-[#EEDDC3]":"bg-slate-50 border-slate-200"}`}>
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
                <div className={`mt-4 p-2.5 rounded-xl border text-[11px] leading-relaxed ${isDark?"bg-[#8B5A2B]/10 border-[#8B5A2B]/20 text-violet-200/80":"bg-violet-50 border-violet-200 text-violet-800"}`}>
                  <b>Modular 100+ Architecture:</b> แยก frontend, backend, AI runtime และ infra ชัดเจน รองรับ multi-tenant, edge AI, และ plugin SDK เต็มรูปแบบ
                </div>
              </div>
              <div className="space-y-3">
                <div className={`rounded-xl border p-4 ${isDark?"bg-white border-[#E8D5B8]":"bg-white border-slate-200"}`}>
                  <h4 className="font-sans font-semibold text-[13px] mb-2">Enterprise Features Implemented</h4>
                  <div className="grid grid-cols-2 gap-2 text-[11.5px]">
                    {["Multi Tenant + SSO","RBAC / ABAC / Zero Trust","Kubernetes Native","High Availability","Disaster Recovery","Load Balancer","Edge AI","Offline Mode","Plugin SDK","Marketplace SDK","REST / GraphQL / gRPC","Webhooks & Event Streaming","Audit Trail","AI Agent SDK"].map(f=>(
                      <div key={f} className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-emerald-400 shrink-0"/>{f}</div>
                    ))}
                  </div>
                </div>
                <div className={`rounded-xl border p-4 ${isDark?"bg-[#F5E9D6]/60 border-[#EEDDC3]":"bg-slate-50 border-slate-200"}`}>
                  <div className="font-sans font-semibold text-[13px] mb-2">UI System • Glassmorphism + Cyberpunk</div>
                  <div className="flex flex-wrap gap-1.5">
                    {["Backdrop Blur","Rounded-2xl","Scanlines","Kanit + Inter + Fira Code","Dock macOS","Command Palette","Multi Window","Floating Panels","Workspace Tabs","Notification Center","AI Copilot","Voice Assistant","Search Everywhere","Keyboard Shortcuts","Custom Theme Engine"].map(t=>(
                      <span key={t} className={`px-2 py-1 rounded-full border text-[10.5px] ${isDark?"bg-[#F5E9D6] border-[#E8D5B8]":"bg-white border-slate-200"}`}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl p-3 bg-gradient-to-br from-[#8B5A2B] to-[#5C3D1E] text-white">
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
      {hasChildren && open && <div className="ml-3 border-l border-[#E8D5B8] pl-2">{children}</div>}
    </div>
  );
}
