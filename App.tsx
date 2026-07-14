import React, { useState, useMemo } from "react";
import {
  Settings,
  Moon,
  Sun,
  Layers,
  Server,
  ShieldCheck,
  Users,
  Database,
  Copy,
  Check,
  Terminal,
  Code2,
  Braces,
  Globe,
  Activity,
  KeyRound,
  Clock3,
  BarChart3,
  ExternalLink,
  Info,
  Zap,
  GitCompareArrows,
  Box,
  ChevronDown,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Types
type ProtocolMode = "REST" | "Connect RPC" | "Dual";
type Tab = "dashboard" | "explorer";
type CodeTab = "rest" | "buf" | "ts" | "go";
type Theme = "slate" | "violet" | "emerald";

interface OpRow {
  op: string;
  rest: string;
  connect: string;
  method: "GET" | "POST";
  query?: string;
}

interface ServiceDef {
  id: string;
  label: string;
  short: string;
  package: string;
  service: string;
  icon: any;
  desc: string;
  ops: OpRow[];
}

// Data from docs
const SERVICES: ServiceDef[] = [
  {
    id: "dataexport",
    label: "Enterprise Data Export",
    short: "EnterpriseDataExportV2",
    package: "dataexport.v2",
    service: "EnterpriseDataExportV2Service",
    icon: Database,
    desc: "Bulk export, task listing and download URL generation for enterprise workspaces.",
    ops: [
      { op: "CreateExport", rest: "POST /v2/enterprise.export.create", connect: "POST /dataexport.v2.EnterpriseDataExportV2Service/CreateExport", method: "POST" },
      { op: "GetExport", rest: "GET /v2/enterprise.export.detail?uid=...", connect: "POST /dataexport.v2.EnterpriseDataExportV2Service/GetExport", method: "GET", query: "uid" },
      { op: "ListExports", rest: "GET /v2/enterprise.export.list?user=...", connect: "POST /dataexport.v2.EnterpriseDataExportV2Service/ListExports", method: "GET", query: "user" },
      { op: "GetDownloadURL", rest: "GET /v2/enterprise.export.downloadUrl?uid=...", connect: "POST /dataexport.v2.EnterpriseDataExportV2Service/GetDownloadURL", method: "GET", query: "uid" },
      { op: "ListTasks", rest: "GET /v2/enterprise.task.list?user=...", connect: "POST /dataexport.v2.EnterpriseDataExportV2Service/ListTasks", method: "GET", query: "user" },
    ],
  },
  {
    id: "compliance",
    label: "SIEM Compliance Export",
    short: "EnterpriseComplianceV2",
    package: "observability.v2",
    service: "EnterpriseComplianceV2Service",
    icon: ShieldCheck,
    desc: "KEY_TYPE_SIEM only. Export creation for compliance pipelines. OTLP push configured in console.",
    ops: [
      { op: "CreateExport", rest: "POST /v2/enterprise.compliance.export.create", connect: "POST /observability.v2.EnterpriseComplianceV2Service/CreateExport", method: "POST" },
      { op: "GetExport", rest: "GET /v2/enterprise.compliance.export.detail?uid=...", connect: "POST /observability.v2.EnterpriseComplianceV2Service/GetExport", method: "GET", query: "uid" },
      { op: "GetDownloadURL", rest: "GET /v2/enterprise.compliance.export.downloadUrl?uid=...", connect: "POST /observability.v2.EnterpriseComplianceV2Service/GetDownloadURL", method: "GET", query: "uid" },
    ],
  },
  {
    id: "teamuser",
    label: "Team User Management",
    short: "TeamUserManagementApiV2",
    package: "team.v2",
    service: "TeamUserManagementApiV2Service",
    icon: Users,
    desc: "Provision, update, delegate and reclaim managed profiles across the team.",
    ops: [
      { op: "ListUsers", rest: "GET /v2/team.user.list", connect: "POST /team.v2.TeamUserManagementApiV2Service/ListUsers", method: "GET" },
      { op: "GetUser", rest: "GET /v2/team.user.detail?email=...", connect: "POST /team.v2.TeamUserManagementApiV2Service/GetUser", method: "GET", query: "email" },
      { op: "CreateUser", rest: "POST /v2/team.user.create", connect: "POST /team.v2.TeamUserManagementApiV2Service/CreateUser", method: "POST" },
      { op: "UpdateUser", rest: "POST /v2/team.user.update", connect: "POST /team.v2.TeamUserManagementApiV2Service/UpdateUser", method: "POST" },
      { op: "DelegateProfile", rest: "POST /v2/team.user.delegate", connect: "POST /team.v2.TeamUserManagementApiV2Service/DelegateProfile", method: "POST" },
      { op: "ReclaimProfile", rest: "POST /v2/team.user.reclaim", connect: "POST /team.v2.TeamUserManagementApiV2Service/ReclaimProfile", method: "POST" },
      { op: "RenameProfile", rest: "POST /v2/team.user.rename", connect: "POST /team.v2.TeamUserManagementApiV2Service/RenameProfile", method: "POST" },
      { op: "RemoveMember", rest: "POST /v2/team.user.remove", connect: "POST /team.v2.TeamUserManagementApiV2Service/RemoveMember", method: "POST" },
    ],
  },
  {
    id: "asset",
    label: "Asset Governance",
    short: "TeamAssetAudit / Manage",
    package: "team.v2",
    service: "TeamAssetAuditApiV2Service",
    icon: Layers,
    desc: "Audit vs management split: KEY_TYPE_TEAM_ASSET_AUDIT and KEY_TYPE_TEAM_ASSET_MGMT.",
    ops: [
      { op: "ListShareableAssets", rest: "GET /v2/team.asset.list", connect: "POST /team.v2.TeamAssetAuditApiV2Service/ListShareableAssets", method: "GET" },
      { op: "UpdateAssetShareScope", rest: "POST /v2/team.asset.update_scope", connect: "POST /team.v2.TeamAssetManageApiV2Service/UpdateAssetShareScope", method: "POST" },
    ],
  },
];

const chartData = [
  { name: "00:00", req: 420 },
  { name: "04:00", req: 380 },
  { name: "08:00", req: 620 },
  { name: "12:00", req: 890 },
  { name: "16:00", req: 740 },
  { name: "20:00", req: 960 },
  { name: "23:59", req: 810 },
];

const keysMock = [
  { id: "sk_live_51H…9Xq", type: "TEAM_ADMIN", lastUsed: "2m ago", req: 12493, status: "active" },
  { id: "sk_siem_9f2…kL3", type: "KEY_TYPE_SIEM", lastUsed: "18m ago", req: 8421, status: "active" },
  { id: "sk_audit_x1…pQ8", type: "ASSET_AUDIT", lastUsed: "1h ago", req: 302, status: "active" },
  { id: "sk_mgmt_44…zT0", type: "ASSET_MGMT", lastUsed: "3h ago", req: 129, status: "rotated" },
];

export default function App() {
  // Config panel state
  const [apiName, setApiName] = useState("Manus Team API");
  const [baseUrl, setBaseUrl] = useState("https://api.manus.im");
  const [authType] = useState("X-API-Key");
  const [theme, setTheme] = useState<Theme>("violet");
  const [darkMode, setDarkMode] = useState(true);
  const [protocolMode, setProtocolMode] = useState<ProtocolMode>("Dual");

  // Right side
  const [tab, setTab] = useState<Tab>("dashboard");
  const [selectedServiceId, setSelectedServiceId] = useState<string>("dataexport");
  const [selectedOp, setSelectedOp] = useState<string>("GetExport");
  const [codeTab, setCodeTab] = useState<CodeTab>("ts");
  const [copied, setCopied] = useState(false);

  const selectedService = useMemo(() => SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0], [selectedServiceId]);
  const selectedOpRow = useMemo(() => selectedService.ops.find(o => o.op === selectedOp) || selectedService.ops[0], [selectedService, selectedOp]);

  const accent = {
    slate: { bg: "bg-zinc-900", dot: "bg-zinc-900", ring: "ring-zinc-900", soft: "bg-zinc-50", chart: "#18181b" },
    violet: { bg: "bg-violet-600", dot: "bg-violet-600", ring: "ring-violet-600", soft: "bg-violet-50", chart: "#7c3aed" },
    emerald: { bg: "bg-emerald-600", dot: "bg-emerald-600", ring: "ring-emerald-600", soft: "bg-emerald-50", chart: "#059669" },
  }[theme];

  const copySnippet = async (text: string) => {
    try { await navigator.clipboard.writeText(text); } catch {}
    setCopied(true); setTimeout(()=>setCopied(false), 1500);
  };

  const genSnippets = (op: OpRow, svc: ServiceDef) => {
    const uid = "5YX76pz7Dga3yztNVw97Dh";
    const restPath = op.rest.replace("GET ","").replace("POST ","").split("?")[0];
    const isGet = op.method === "GET";
    const queryExample = op.query === "email" ? `email=alex%40example.com` : op.query ? `${op.query}=${uid}` : "";
    const restCurl = isGet
      ? `curl -X GET "${baseUrl}${restPath}${queryExample ? `?${queryExample}` : ""}" \\\n  -H "X-API-Key: $MANUS_API_KEY"`
      : `curl -X POST "${baseUrl}${restPath}" \\\n  -H "X-API-Key: $MANUS_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"uid":"${uid}"}'`;

    const bufCurl = `buf curl \\\n  --schema buf.build/manus/${svc.package.split('.')[0]} \\\n  --header 'X-API-Key: <your-api-key>' \\\n  --data '{"uid":"${uid}"}' \\\n  https://api.manus.im/${svc.package}.${svc.service}/${op.op}`;

    const tsSnippet = `import { createPromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { ${svc.service} } from "./gen/${svc.package.replace(/\./g,"/")}/${svc.id}_connect";

const transport = createConnectTransport({
  baseUrl: "${baseUrl}",
  interceptors: [
    (next) => async (req) => {
      req.header.set("${authType}", process.env.MANUS_API_KEY!);
      return next(req);
    },
  ],
});

const client = createPromiseClient(${svc.service}, transport);
const res = await client.${op.op.charAt(0).toLowerCase()+op.op.slice(1)}({ ${op.query||"uid"}: "${op.query==="email" ? "alex@example.com" : uid}" });
console.log(res${op.op.includes("Get") ? ".record" : ""});`;

    const goSnippet = `package main

import (
  "context"
  "log"
  "net/http"

  "connectrpc.com/connect"
  ${svc.id}v2 "example.com/gen/${svc.package.replace(/\./g,"/")}"
  "${svc.id}v2connect"
)

func main() {
  client := ${svc.id}v2connect.New${svc.service}Client(
    http.DefaultClient,
    "${baseUrl}",
  )
  req := connect.NewRequest(&${svc.id}v2.${op.op}Request{
    ${op.query ? (op.query.charAt(0).toUpperCase()+op.query.slice(1)) : "Uid"}: "${op.query==="email" ? "alex@example.com" : uid}",
  })
  req.Header().Set("${authType}", "<your-api-key>")
  res, err := client.${op.op}(context.Background(), req)
  if err != nil { log.Fatal(err) }
  log.Println(res.Msg.${op.op.includes("Get") ? "Record" : "Ok"})
}`;

    return { restCurl, bufCurl, tsSnippet, goSnippet };
  };

  const snippets = genSnippets(selectedOpRow, selectedService);

  const activeSnippet = codeTab === "rest" ? snippets.restCurl : codeTab === "buf" ? snippets.bufCurl : codeTab === "ts" ? snippets.tsSnippet : snippets.goSnippet;

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen font-[Inter,system-ui] antialiased`}>
      <div className={`${darkMode ? "bg-[#0a0a0b] text-zinc-100" : "bg-[#fcfcfd] text-zinc-900"} min-h-screen transition-colors`}>
        {/* Top Nav */}
        <div className={`sticky top-0 z-30 border-b ${darkMode ? "border-zinc-800 bg-[#0a0a0b]/80 backdrop-blur-xl" : "border-zinc-200 bg-white/80 backdrop-blur-xl"}`}>
          <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-3 md:px-8">
            <div className="flex items-center gap-3">
              <div className={`h-8 w-8 rounded-xl ${accent.bg} flex items-center justify-center text-white shadow-sm`}>
                <Box size={16} />
              </div>
              <div>
                <div className="text-[13px] font-semibold tracking-tight leading-none">manus.ai / docs</div>
                <div className={`text-[11px] ${darkMode ? "text-zinc-400" : "text-zinc-500"} leading-none mt-1`}>Team v2 • Dual Protocol</div>
              </div>
              <div className={`hidden md:flex ml-6 items-center gap-2 rounded-full border px-2 py-1 text-[11px] ${darkMode ? "border-zinc-800 bg-zinc-900 text-zinc-400" : "border-zinc-200 bg-zinc-50 text-zinc-500"}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${accent.dot} animate-pulse`} />
                api.manus.im • operational
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a href="#" className={`hidden md:inline-flex text-[12px] items-center gap-1.5 rounded-full border px-3 py-1.5 ${darkMode ? "border-zinc-800 hover:bg-zinc-900" : "border-zinc-200 hover:bg-zinc-50"}`}>
                <Globe size={12} /> llms.txt <ExternalLink size={12} />
              </a>
              <button onClick={()=>setDarkMode(!darkMode)} className={`h-8 w-8 grid place-items-center rounded-full border ${darkMode ? "border-zinc-800 bg-zinc-900" : "border-zinc-200 bg-white"} transition`}>
                {darkMode ? <Sun size={14} /> : <Moon size={14} />}
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[1440px] grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-0">
          {/* LEFT CONFIG */}
          <div className={`border-b lg:border-b-0 lg:border-r ${darkMode ? "border-zinc-800 bg-[#0e0e10]" : "border-zinc-200 bg-white"} lg:sticky lg:top-[57px] lg:h-[calc(100vh-57px)] lg:overflow-auto`}>
            <div className="p-5 md:p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-[12px] font-semibold uppercase tracking-widest opacity-60">Configuration</h2>
                <Settings size={14} className="opacity-40" />
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <label className={`text-[11px] font-medium ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>API Name</label>
                  <input value={apiName} onChange={e=>setApiName(e.target.value)} className={`mt-1.5 w-full rounded-xl border px-3 py-2.5 text-[13px] outline-none transition ${darkMode ? "border-zinc-800 bg-zinc-900/60 focus:border-zinc-700 focus:ring-2 focus:ring-zinc-800" : "border-zinc-200 bg-zinc-50 focus:border-zinc-300 focus:bg-white focus:ring-2 focus:ring-zinc-100"}`} />
                </div>

                <div>
                  <label className={`text-[11px] font-medium ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>Base URL</label>
                  <div className={`mt-1.5 flex items-center rounded-xl border px-2.5 py-2 text-[13px] ${darkMode ? "border-zinc-800 bg-zinc-900/60" : "border-zinc-200 bg-zinc-50"}`}>
                    <Globe size={14} className="mr-2 opacity-40 shrink-0" />
                    <input value={baseUrl} onChange={e=>setBaseUrl(e.target.value)} className="w-full bg-transparent outline-none" />
                  </div>
                  <p className={`mt-1.5 text-[11px] ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>Used for snippet generation. Official: https://api.manus.im</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={`text-[11px] font-medium ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>Auth Type</label>
                    <div className={`mt-1.5 rounded-xl border px-3 py-2.5 text-[13px] flex items-center justify-between ${darkMode ? "border-zinc-800 bg-zinc-900/60" : "border-zinc-200 bg-zinc-50"}`}>
                      <span className="flex items-center gap-1.5"><KeyRound size={12} /> {authType}</span>
                      <span className={`text-[10px] rounded-full px-1.5 py-0.5 ${darkMode ? "bg-zinc-800 text-zinc-400" : "bg-white border border-zinc-200 text-zinc-500"}`}>header</span>
                    </div>
                  </div>
                  <div>
                    <label className={`text-[11px] font-medium ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>Theme</label>
                    <div className="mt-1.5 grid grid-cols-3 gap-1.5">
                      {(["slate","violet","emerald"] as Theme[]).map(t=>(
                        <button key={t} onClick={()=>setTheme(t)} className={`h-[38px] rounded-xl border capitalize text-[11px] font-medium transition ${theme===t ? `border-transparent ${t==="slate" ? "bg-zinc-900 text-white" : t==="violet" ? "bg-violet-600 text-white" : "bg-emerald-600 text-white"} shadow` : darkMode ? "border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900" : "border-zinc-200 bg-zinc-50 hover:bg-white"}`}>{t}</button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className={`text-[11px] font-medium ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>Protocol Mode</label>
                  <div className={`mt-1.5 grid grid-cols-3 rounded-xl border p-1 text-[12px] ${darkMode ? "border-zinc-800 bg-zinc-900/60" : "border-zinc-200 bg-zinc-50"}`}>
                    {(["REST","Connect RPC","Dual"] as ProtocolMode[]).map(m=>(
                      <button key={m} onClick={()=>setProtocolMode(m)} className={`rounded-lg py-2 font-medium transition ${protocolMode===m ? `bg-white dark:bg-zinc-800 shadow-sm ${darkMode ? "text-white" : "text-zinc-900"} ring-1 ring-zinc-200 dark:ring-zinc-700` : `${darkMode ? "text-zinc-400 hover:text-zinc-200" : "text-zinc-500 hover:text-zinc-800"}`}`}>
                        {m}
                      </button>
                    ))}
                  </div>
                  <div className={`mt-2 rounded-xl px-3 py-2.5 text-[11px] leading-relaxed ${darkMode ? "bg-zinc-900 border border-zinc-800 text-zinc-400" : "bg-zinc-50 border border-zinc-200 text-zinc-600"}`}>
                    {protocolMode==="REST" && <span><b className={darkMode?"text-zinc-200":"text-zinc-800"}>REST</b> — curl / no-code. POST/GET /v2/&lt;resource&gt;.&lt;verb&gt; with JSON.</span>}
                    {protocolMode==="Connect RPC" && <span><b className={darkMode?"text-zinc-200":"text-zinc-800"}>Connect RPC</b> — typed clients. POST /&lt;package&gt;.&lt;Service&gt;/&lt;Method&gt;.</span>}
                    {protocolMode==="Dual" && <span><b className={darkMode?"text-zinc-200":"text-zinc-800"}>Dual</b> — same payload, same <code className="px-1 py-0.5 rounded bg-black/10 dark:bg-white/10">X-API-Key</code> header, both protocols. Wrapper <code className="px-1 py-0.5 rounded bg-black/10 dark:bg-white/10">{`{ok, request_id}`}</code>.</span>}
                  </div>
                </div>

                <div className={`rounded-2xl border p-3.5 ${darkMode ? "border-zinc-800 bg-zinc-900/40" : "border-zinc-200 bg-white"}`}>
                  <div className="flex items-center gap-2 text-[12px] font-semibold"><Zap size={14} className={theme==="violet"?"text-violet-500":theme==="emerald"?"text-emerald-500":"text-zinc-500"} /> When to choose which</div>
                  <div className="mt-3 space-y-2.5 text-[11.5px] leading-[1.5]">
                    <div className="flex gap-2"><span className={`mt-1 h-1 w-1 rounded-full ${accent.dot} shrink-0`} /><div><b>REST</b> for ad-hoc curl, third-party HTTP clients, no-code platforms, and the auto-rendered “Try it” panel.</div></div>
                    <div className="flex gap-2"><span className={`mt-1 h-1 w-1 rounded-full ${accent.dot} shrink-0`} /><div><b>Connect RPC</b> for typed clients (Go, TS, Python) with compile-time guarantees. Same wire JSON.</div></div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className={`text-[12px] ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>Dark Mode</span>
                  <button onClick={()=>setDarkMode(!darkMode)} className={`relative h-6 w-11 rounded-full transition ${darkMode ? "bg-zinc-800" : "bg-zinc-200"}`}>
                    <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${darkMode ? "left-5" : "left-0.5"}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="min-w-0">
            {/* Tabs */}
            <div className={`sticky top-[57px] z-20 backdrop-blur-xl border-b ${darkMode ? "bg-[#0a0a0b]/80 border-zinc-800" : "bg-[#fcfcfd]/80 border-zinc-200"}`}>
              <div className="flex items-center gap-1 p-2 px-3 md:px-6">
                <button onClick={()=>setTab("dashboard")} className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium transition ${tab==="dashboard" ? `${accent.bg} text-white shadow` : darkMode ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900" : "text-zinc-500 hover:text-zinc-900 hover:bg-white border border-transparent hover:border-zinc-200"}`}>
                  <BarChart3 size={14} /> Dashboard Preview
                </button>
                <button onClick={()=>setTab("explorer")} className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium transition ${tab==="explorer" ? `${accent.bg} text-white shadow` : darkMode ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900" : "text-zinc-500 hover:text-zinc-900 hover:bg-white border border-transparent hover:border-zinc-200"}`}>
                  <GitCompareArrows size={14} /> Protocol Explorer
                </button>
                <div className="ml-auto hidden md:flex items-center gap-2 text-[11px] opacity-60">
                  <span className={`rounded-full px-2.5 py-1 border ${darkMode?"border-zinc-800 bg-zinc-900":"border-zinc-200 bg-white"}`}>{apiName} • {protocolMode}</span>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-8">
              {tab === "dashboard" ? (
                <div className="space-y-6">
                  {/* Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { k: "Total Requests", v: "84.2k", d: "+12.4%", icon: Activity },
                      { k: "Success Rate", v: "99.92%", d: "• healthy", icon: ShieldCheck },
                      { k: "Active Keys", v: "4", d: "1 rotated", icon: KeyRound },
                      { k: "Avg Latency", v: "142ms", d: "p95 298ms", icon: Clock3 },
                    ].map(s=>(
                      <div key={s.k} className={`rounded-2xl border p-5 ${darkMode ? "border-zinc-800 bg-[#121214]" : "border-zinc-200 bg-white shadow-sm"}`}>
                        <div className="flex items-center justify-between">
                          <div className={`h-7 w-7 rounded-xl grid place-items-center ${darkMode ? "bg-zinc-900 border border-zinc-800" : "bg-zinc-50 border border-zinc-200"}`}><s.icon size={14} className="opacity-70" /></div>
                          <span className={`text-[11px] rounded-full px-2 py-0.5 ${darkMode ? "bg-zinc-900 text-zinc-400 border border-zinc-800" : "bg-zinc-50 text-zinc-500 border border-zinc-200"}`}>{s.d}</span>
                        </div>
                        <div className={`mt-3 text-[11px] uppercase tracking-widest ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>{s.k}</div>
                        <div className="mt-1 text-[22px] font-semibold tracking-tight">{s.v}</div>
                      </div>
                    ))}
                  </div>

                  {/* Chart + endpoint card */}
                  <div className="grid lg:grid-cols-[1.4fr_0.9fr] gap-4">
                    <div className={`rounded-2xl border p-5 md:p-6 ${darkMode ? "border-zinc-800 bg-[#121214]" : "border-zinc-200 bg-white shadow-sm"} min-w-0`}>
                      <div className="flex items-center justify-between">
                        <h3 className="text-[13px] font-semibold">Request Volume</h3>
                        <span className={`text-[11px] rounded-full px-2.5 py-1 border ${darkMode?"border-zinc-800 bg-zinc-900 text-zinc-400":"border-zinc-200 bg-zinc-50 text-zinc-600"}`}>Last 24h • {protocolMode}</span>
                      </div>
                      <div className="mt-6 h-[200px] w-full min-w-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={chartData}>
                            <defs>
                              <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={accent.chart} stopOpacity={0.35} />
                                <stop offset="100%" stopColor={accent.chart} stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize:11, fill: darkMode?"#71717a":"#a1a1aa"}} />
                            <YAxis hide />
                            <Tooltip contentStyle={{borderRadius:12, border: darkMode?"1px solid #27272a":"1px solid #e4e4e7", background: darkMode?"#18181b":"#fff", fontSize:12}} />
                            <Area dataKey="req" type="monotone" stroke={accent.chart} strokeWidth={2} fill="url(#g)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className={`rounded-2xl border p-5 md:p-6 flex flex-col min-w-0 ${darkMode ? "border-zinc-800 bg-[#121214]" : "border-zinc-200 bg-white shadow-sm"}`}>
                      <h3 className="text-[13px] font-semibold flex items-center gap-2"><Terminal size={14}/> Endpoint Resolution</h3>
                      <p className={`mt-1 text-[12px] leading-relaxed ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>Base URL is <b>{baseUrl}</b>. Path changes based on protocol mode. Both share <code className={`px-1.5 py-0.5 rounded text-[11px] ${darkMode?"bg-zinc-800":"bg-zinc-100"}`}>X-API-Key</code> and <code className={`px-1.5 py-0.5 rounded text-[11px] ${darkMode?"bg-zinc-800":"bg-zinc-100"}`}>{`{ok, request_id}`}</code> wrapper.</p>

                      <div className="mt-5 space-y-3">
                        {(protocolMode==="REST" || protocolMode==="Dual") && (
                          <div className={`rounded-xl border p-3.5 ${darkMode?"border-zinc-800 bg-zinc-900/60":"border-zinc-200 bg-zinc-50"}`}>
                            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest opacity-60"><Code2 size={12}/> REST</div>
                            <div className="mt-2 font-mono text-[12px] break-all leading-relaxed">
                              <span className="opacity-50">POST</span> {baseUrl}/v2/enterprise.export.create
                            </div>
                            <div className="mt-1 font-mono text-[12px] break-all leading-relaxed opacity-70">
                              <span className="opacity-50">GET</span> {baseUrl}/v2/enterprise.export.detail?uid=...
                            </div>
                          </div>
                        )}
                        {(protocolMode==="Connect RPC" || protocolMode==="Dual") && (
                          <div className={`rounded-xl border p-3.5 ${darkMode?"border-zinc-800 bg-zinc-900/60":"border-zinc-200 bg-zinc-50"}`}>
                            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest opacity-60"><Braces size={12}/> Connect RPC</div>
                            <div className="mt-2 font-mono text-[12px] break-all leading-relaxed">
                              <span className="opacity-50">POST</span> {baseUrl}/dataexport.v2.EnterpriseDataExportV2Service/CreateExport
                            </div>
                            <div className="mt-1 font-mono text-[12px] break-all leading-relaxed opacity-70">
                              <span className="opacity-50">POST</span> {baseUrl}/dataexport.v2.EnterpriseDataExportV2Service/GetExport
                            </div>
                          </div>
                        )}
                        {protocolMode==="Dual" && (
                          <div className={`rounded-xl px-3.5 py-3 text-[11px] flex gap-2 leading-relaxed ${darkMode?"bg-violet-950/30 border border-violet-900/40 text-violet-300":"bg-violet-50 border border-violet-200 text-violet-700"}`}>
                            <Info size={14} className="shrink-0 mt-0.5"/> Dual mode renders both paths from the same protobuf source. Body shape identical; GET REST query params move into JSON body for Connect.
                          </div>
                        )}
                      </div>

                      <div className="mt-auto pt-5 flex flex-wrap gap-2">
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] ${darkMode?"border-zinc-800 bg-zinc-900 text-zinc-400":"border-zinc-200 bg-white text-zinc-600"}`}><span className="h-1.5 w-1.5 rounded-full bg-emerald-500"/> REST ready</span>
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] ${darkMode?"border-zinc-800 bg-zinc-900 text-zinc-400":"border-zinc-200 bg-white text-zinc-600"}`}><span className="h-1.5 w-1.5 rounded-full bg-violet-500"/> Connect ready</span>
                      </div>
                    </div>
                  </div>

                  {/* Keys table */}
                  <div className={`rounded-2xl border overflow-hidden min-w-0 ${darkMode ? "border-zinc-800 bg-[#121214]" : "border-zinc-200 bg-white shadow-sm"}`}>
                    <div className="flex items-center justify-between p-4 md:p-5 border-b border-zinc-800/10 dark:border-zinc-800">
                      <h3 className="text-[13px] font-semibold">API Keys & Entitlements</h3>
                      <span className={`text-[11px] ${darkMode?"text-zinc-500":"text-zinc-500"}`}>{keysMock.length} keys • filtered by {protocolMode}</span>
                    </div>
                    <div className="overflow-x-auto max-w-full">
                      <table className="w-full min-w-[560px] text-[12.5px]">
                        <thead className={`${darkMode?"bg-zinc-900/50 text-zinc-500":"bg-zinc-50 text-zinc-500"} text-[11px] uppercase tracking-widest`}>
                          <tr><th className="text-left font-medium px-4 py-2.5">Key</th><th className="text-left font-medium px-4 py-2.5">Type</th><th className="text-left font-medium px-4 py-2.5">Last used</th><th className="text-right font-medium px-4 py-2.5">Requests</th><th className="text-right font-medium px-4 py-2.5">Status</th></tr>
                        </thead>
                        <tbody>
                          {keysMock.map(k=>(
                            <tr key={k.id} className={`border-t ${darkMode?"border-zinc-800/80 hover:bg-zinc-900/40":"border-zinc-100 hover:bg-zinc-50"} transition`}>
                              <td className="px-4 py-3 font-mono text-[12px]">{k.id}</td>
                              <td className="px-4 py-3"><span className={`rounded-full border px-2 py-0.5 text-[11px] ${darkMode?"border-zinc-800 bg-zinc-900 text-zinc-400":"border-zinc-200 bg-white text-zinc-600"}`}>{k.type}</span></td>
                              <td className="px-4 py-3 opacity-70">{k.lastUsed}</td>
                              <td className="px-4 py-3 text-right tabular-nums">{k.req.toLocaleString()}</td>
                              <td className="px-4 py-3 text-right"><span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] ${k.status==="active" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"}`}><span className={`h-1 w-1 rounded-full ${k.status==="active"?"bg-emerald-500":"bg-amber-500"}`} />{k.status}</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Header concept */}
                  <div className={`rounded-2xl border p-5 md:p-7 ${darkMode?"border-zinc-800 bg-[#121214]":"border-zinc-200 bg-white shadow-sm"}`}>
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h2 className="text-[18px] font-semibold tracking-tight">Every Team v2 operation is callable via REST or Connect RPC</h2>
                        <p className={`mt-3 max-w-[720px] text-[13px] leading-relaxed ${darkMode?"text-zinc-400":"text-zinc-600"}`}>Both share the same authentication header (<code className={`px-1.5 py-0.5 rounded ${darkMode?"bg-zinc-800":"bg-zinc-100"}`}>X-API-Key</code>), same request/response payload, and same <code className={`px-1.5 py-0.5 rounded ${darkMode?"bg-zinc-800":"bg-zinc-100"}`}>{`{ok, request_id, ...}`}</code> wrapper. REST uses <code className={`px-1.5 py-0.5 rounded ${darkMode?"bg-zinc-800":"bg-zinc-100"}`}>POST/GET /v2/&lt;resource&gt;.&lt;verb&gt;</code>; Connect uses <code className={`px-1.5 py-0.5 rounded ${darkMode?"bg-zinc-800":"bg-zinc-100"}`}>POST /&lt;package&gt;.&lt;Service&gt;/&lt;Method&gt;</code> with identical JSON body.</p>
                      </div>
                      <div className={`rounded-xl border px-3 py-2 text-[11px] flex items-center gap-2 ${darkMode?"border-zinc-800 bg-zinc-900 text-zinc-400":"border-zinc-200 bg-zinc-50 text-zinc-600"}`}>
                        <Server size={12}/> Generated from protobuf • https://api.manus.im
                      </div>
                    </div>

                    <div className="mt-6 grid md:grid-cols-2 gap-4">
                      <div className={`rounded-xl border p-4 ${darkMode?"border-zinc-800 bg-zinc-900/50":"border-zinc-200 bg-zinc-50"}`}>
                        <div className="text-[11px] font-semibold uppercase tracking-widest opacity-60 flex items-center gap-1.5"><Globe size={12}/> REST</div>
                        <div className="mt-2 text-[12.5px] leading-relaxed">Use for ad-hoc curl, third-party HTTP clients, no-code platforms, and the “Try it” panel.</div>
                      </div>
                      <div className={`rounded-xl border p-4 ${darkMode?"border-zinc-800 bg-zinc-900/50":"border-zinc-200 bg-zinc-50"}`}>
                        <div className="text-[11px] font-semibold uppercase tracking-widest opacity-60 flex items-center gap-1.5"><Code2 size={12}/> Connect RPC</div>
                        <div className="mt-2 text-[12.5px] leading-relaxed">Typed clients (Go, TS, Python) with compile-time guarantees. Same JSON shape over HTTP+JSON.</div>
                      </div>
                    </div>
                  </div>

                  {/* Service selector */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <div className={`relative rounded-xl border ${darkMode?"border-zinc-800 bg-[#121214]":"border-zinc-200 bg-white"}`}>
                      <select value={selectedServiceId} onChange={e=>{ setSelectedServiceId(e.target.value); const svc = SERVICES.find(s=>s.id===e.target.value)!; setSelectedOp(svc.ops[0].op); }} className="appearance-none bg-transparent pl-3 pr-8 py-2.5 text-[13px] font-medium outline-none">
                        {SERVICES.map(s=><option key={s.id} value={s.id}>{s.label}</option>)}
                      </select>
                      <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 opacity-50" />
                    </div>
                    <div className={`hidden md:flex items-center gap-2 text-[12px] rounded-full border px-3 py-2 ${darkMode?"border-zinc-800 bg-zinc-900 text-zinc-400":"border-zinc-200 bg-white text-zinc-600"}`}>
                      <selectedService.icon size={14}/> {selectedService.package}.{selectedService.service}
                    </div>
                    <div className={`text-[11px] px-3.5 py-2 rounded-full border max-w-full ${darkMode?"border-zinc-800 bg-zinc-900 text-zinc-500":"border-zinc-200 bg-zinc-50 text-zinc-500"}`}>{selectedService.desc}</div>
                  </div>

                  {/* Mapping table */}
                  <div className={`rounded-2xl border overflow-hidden min-w-0 ${darkMode?"border-zinc-800 bg-[#121214]":"border-zinc-200 bg-white shadow-sm"}`}>
                    <div className="overflow-x-auto max-w-full">
                      <table className="w-full min-w-[720px] text-[13px]">
                        <thead className={`${darkMode?"bg-zinc-900 text-zinc-400":"bg-zinc-50 text-zinc-500"} text-[11px] uppercase tracking-widest border-b ${darkMode?"border-zinc-800":"border-zinc-200"}`}>
                          <tr>
                            <th className="text-left font-medium px-4 py-3">Operation</th>
                            <th className="text-left font-medium px-4 py-3">REST</th>
                            <th className="text-left font-medium px-4 py-3">Connect RPC</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedService.ops.map(row=>{
                            const active = row.op===selectedOp;
                            return (
                              <tr key={row.op} onClick={()=>setSelectedOp(row.op)} className={`cursor-pointer border-t transition ${active ? (darkMode?"bg-violet-950/30 border-violet-900/30":"bg-violet-50 border-violet-100") : darkMode?"border-zinc-800/80 hover:bg-zinc-900/60":"border-zinc-100 hover:bg-zinc-50"}`}>
                                <td className="px-4 py-3 font-medium whitespace-nowrap"><span className={`inline-flex items-center gap-1.5 ${active?"text-violet-600 dark:text-violet-300":""}`}><span className={`h-1.5 w-1.5 rounded-full ${active? "bg-violet-500" : "bg-zinc-400"}`}/>{row.op}</span></td>
                                <td className="px-4 py-3 font-mono text-[12px] whitespace-nowrap">{row.rest}</td>
                                <td className="px-4 py-3 font-mono text-[12px] whitespace-nowrap opacity-80">{row.connect}</td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Code snippet panel */}
                  <div className={`rounded-2xl border overflow-hidden min-w-0 ${darkMode?"border-zinc-800 bg-[#0f0f10]":"border-zinc-200 bg-white shadow-sm"}`}>
                    <div className={`flex flex-wrap items-center justify-between gap-2 border-b px-2 md:px-3 py-2.5 ${darkMode?"border-zinc-800 bg-zinc-900/40":"border-zinc-200 bg-zinc-50"}`}>
                      <div className="flex items-center gap-1 p-1">
                        {[
                          {id:"rest", label:"curl REST", icon: Terminal},
                          {id:"buf", label:"buf curl", icon: Box},
                          {id:"ts", label:"TypeScript", icon: Braces},
                          {id:"go", label:"Go", icon: Code2},
                        ].map(t=>{
                          const active = codeTab===t.id;
                          return (
                            <button key={t.id} onClick={()=>setCodeTab(t.id as CodeTab)} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium transition ${active ? "bg-white dark:bg-zinc-800 shadow border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"}`}>
                              <t.icon size={12}/> {t.label}
                            </button>
                          )
                        })}
                      </div>
                      <div className="flex items-center gap-2 pr-1">
                        <span className={`hidden md:inline text-[11px] rounded-full border px-2.5 py-1 ${darkMode?"border-zinc-800 bg-zinc-900 text-zinc-400":"border-zinc-200 bg-white text-zinc-500"}`}>{selectedService.label} • {selectedOpRow.op}</span>
                        <button onClick={()=>copySnippet(activeSnippet)} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium border transition ${darkMode?"border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-200":"border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700"}`}>
                          {copied ? <Check size={12}/> : <Copy size={12}/>} {copied ? "Copied" : "Copy"}
                        </button>
                      </div>
                    </div>

                    <div className="relative">
                      <pre className={`overflow-auto max-w-full p-4 md:p-6 text-[12.5px] leading-[1.7] font-mono ${darkMode?"text-zinc-200":"text-zinc-800"}`} style={{maxHeight: 420}}>
                        <code>{activeSnippet}</code>
                      </pre>
                      <div className={`pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t ${darkMode?"from-[#0f0f10]":"from-white"} to-transparent`} />
                    </div>

                    <div className={`border-t px-4 md:px-5 py-3.5 flex items-start gap-2.5 text-[11.5px] leading-relaxed ${darkMode?"border-zinc-800 bg-amber-950/20 text-amber-200/80":"border-zinc-200 bg-amber-50 text-amber-800"}`}>
                      <Info size={14} className="mt-0.5 shrink-0" />
                      <div><b>Tip:</b> The auto-rendered “Try it” panel on each endpoint page only exercises the REST surface. For Connect-specific client generation, see the <a className="underline decoration-dotted underline-offset-4" href="#">Connect RPC docs</a>. Both protocols share the same <code className={`px-1 py-0.5 rounded ${darkMode?"bg-black/30":"bg-amber-100"}`}>X-API-Key</code> header and <code className={`px-1 py-0.5 rounded ${darkMode?"bg-black/30":"bg-amber-100"}`}>{`{ok, request_id}`}</code> wrapper.</div>
                    </div>
                  </div>

                  {/* Bottom note about URL mapping */}
                  <div className={`rounded-2xl border p-5 text-[12px] leading-relaxed ${darkMode?"border-zinc-800 bg-[#121214] text-zinc-400":"border-zinc-200 bg-white text-zinc-600"}`}>
                    <div className="flex items-center gap-2 font-semibold text-[12px] tracking-tight mb-2"><GitCompareArrows size={14}/> Body shape is identical either way</div>
                    GET REST endpoints use query parameters; the equivalent Connect call moves those same fields into a JSON body. Contact <a className="underline" href="mailto:api-support@manus.ai">api-support@manus.ai</a> for enterprise key rotation or SIEM integration help. Base URL <b className={darkMode?"text-zinc-200":"text-zinc-900"}>{baseUrl}</b> serves both protocols.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={`mx-auto max-w-[1440px] px-5 md:px-8 py-6 text-[11px] ${darkMode?"text-zinc-500":"text-zinc-500"} border-t mt-4 ${darkMode?"border-zinc-800":"border-zinc-200"}`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span>© {new Date().getFullYear()} Manus — Team v2 API • Dual Protocol Dashboard • Docs index at /llms.txt</span>
            <span className="flex items-center gap-3"><span className="inline-flex items-center gap-1"><span className="h-1 w-1 rounded-full bg-emerald-500"/> REST</span><span className="inline-flex items-center gap-1"><span className="h-1 w-1 rounded-full bg-violet-500"/> Connect RPC</span><span>proto-generated</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
