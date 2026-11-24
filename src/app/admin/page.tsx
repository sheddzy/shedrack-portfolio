"use client";
import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";

type Entry = { id: string; name?: string; organisation?: string; type?: string; title?: string; description?: string; detail?: string; url?: string; status?: string; image?: string; logo?: string };
type Content = { projects: Entry[]; workItems: Entry[]; training: Entry[] };

const emptyContent: Content = { projects: [], workItems: [], training: [] };
const fieldClass = "w-full border border-[#d8d8d1] bg-white px-3 py-3 text-sm outline-none focus:border-[#315a70]";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [content, setContent] = useState<Content>(emptyContent);
  const [sha, setSha] = useState("");
  const [section, setSection] = useState<"projects" | "workItems" | "training">("projects");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const loadContent = useCallback(async () => {
    const response = await fetch("/api/admin/content", { cache: "no-store" });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Unable to load content.");
    setContent(data.content);
    setSha(data.sha);
    setAuthenticated(true);
  }, []);

  useEffect(() => { loadContent().catch(() => undefined); }, [loadContent]);

  async function login(event: FormEvent) {
    event.preventDefault(); setBusy(true); setMessage("");
    try {
      const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      await loadContent();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Login failed."); }
    finally { setBusy(false); }
  }

  async function save() {
    setBusy(true); setMessage("");
    try {
      const response = await fetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content, sha }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      await loadContent();
      setMessage("Saved to GitHub. Render will deploy the updated portfolio automatically when deployment is connected.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Save failed."); }
    finally { setBusy(false); }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false); setPassword(""); setContent(emptyContent);
  }

  function update(index: number, key: keyof Entry, value: string) {
    setContent(current => ({ ...current, [section]: current[section].map((item, i) => i === index ? { ...item, [key]: value } : item) }));
  }

  async function uploadAsset(index: number, key: "image" | "logo", file: File) {
    setBusy(true); setMessage("");
    try {
      const form = new FormData(); form.append("file", file);
      const response = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Upload failed.");
      update(index, key, data.url);
      setMessage("Image uploaded to the portfolio repository. Save changes to publish its project entry.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Upload failed."); }
    finally { setBusy(false); }
  }

  function addEntry() {
    const item: Entry = section === "projects"
      ? { id: crypto.randomUUID(), name: "New project", type: "Project category", description: "", url: "", status: "In progress", image: "", logo: "" }
      : section === "workItems"
        ? { id: crypto.randomUUID(), name: "New work item", type: "Work category", description: "", url: "", status: "Completed" }
        : { id: crypto.randomUUID(), organisation: "Organisation", title: "Training title", detail: "Training" };
    setContent(current => ({ ...current, [section]: [...current[section], item] }));
  }

  function removeEntry(index: number) {
    setContent(current => ({ ...current, [section]: current[section].filter((_, i) => i !== index) }));
  }

  if (!authenticated) return <main className="min-h-screen bg-[#f3f0e8] px-5 py-20 text-[#172b3a]"><form onSubmit={login} className="mx-auto max-w-md border border-[#d7d5cd] bg-white p-8"><a href="/" className="text-sm font-semibold">Shedrack Ebete / Portfolio</a><p className="eyebrow mt-10">Private workspace</p><h1 className="mt-3 text-4xl tracking-[-.06em]">Admin sign in</h1><p className="mt-3 text-sm leading-6 text-[#66727a]">Sign in to update projects, work entries and training records.</p><label className="mt-8 block text-xs font-semibold">Admin password</label><input className={fieldClass + " mt-2"} type="password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password"/><button className="mt-5 w-full bg-[#172b3a] px-4 py-3 text-sm text-white disabled:opacity-50" disabled={busy}>{busy ? "Signing in..." : "Sign in"}</button>{message && <p className="mt-4 text-sm text-red-700">{message}</p>}<a href="/" className="mt-6 inline-block text-xs text-[#66727a] underline">Return to website</a></form></main>;

  const entries = content[section];
  return <main className="min-h-screen bg-[#f3f0e8] text-[#172b3a]"><header className="border-b border-[#d7d5cd] bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5"><div><a href="/" className="text-sm font-semibold">Shedrack Ebete</a><p className="mt-1 text-xs text-[#66727a]">Portfolio administration</p></div><button onClick={logout} className="border border-[#d7d5cd] px-4 py-2 text-xs">Sign out</button></div></header><div className="mx-auto max-w-6xl px-5 py-10"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow">Content manager</p><h1 className="mt-3 text-4xl tracking-[-.06em]">Manage your portfolio</h1><p className="mt-2 text-sm text-[#66727a]">Updates are committed to your GitHub repository.</p></div><button onClick={save} disabled={busy} className="bg-[#172b3a] px-6 py-3 text-sm text-white disabled:opacity-50">{busy ? "Saving..." : "Save changes"}</button></div>
<div className="mt-8 flex flex-wrap gap-2">{(["projects","workItems","training"] as const).map(key=><button key={key} onClick={()=>setSection(key)} className={section===key?"bg-[#172b3a] px-4 py-3 text-xs text-white":"border border-[#d7d5cd] bg-white px-4 py-3 text-xs"}>{key==="workItems"?"Other work":key==="projects"?"Projects":"Training"}</button>)}</div>
<div className="mt-6 space-y-5">{entries.map((item,index)=><article key={item.id} className="border border-[#d7d5cd] bg-white p-5 md:p-7"><div className="mb-5 flex items-center justify-between"><p className="text-xs font-semibold uppercase tracking-widest text-[#315a70]">Entry {index+1}</p><button onClick={()=>removeEntry(index)} className="text-xs text-red-700 underline">Remove</button></div>{section==="training"?<div className="grid gap-4 md:grid-cols-2"><label className="text-xs">Organisation<input className={fieldClass+" mt-2"} value={item.organisation||""} onChange={e=>update(index,"organisation",e.target.value)}/></label><label className="text-xs">Training title<input className={fieldClass+" mt-2"} value={item.title||""} onChange={e=>update(index,"title",e.target.value)}/></label><label className="text-xs md:col-span-2">Details<input className={fieldClass+" mt-2"} value={item.detail||""} onChange={e=>update(index,"detail",e.target.value)}/></label></div>:<div className="grid gap-4 md:grid-cols-2"><label className="text-xs">Name<input className={fieldClass+" mt-2"} value={item.name||""} onChange={e=>update(index,"name",e.target.value)}/></label><label className="text-xs">Category<input className={fieldClass+" mt-2"} value={item.type||""} onChange={e=>update(index,"type",e.target.value)}/></label><label className="text-xs md:col-span-2">Description<textarea className={fieldClass+" mt-2 min-h-24"} value={item.description||""} onChange={e=>update(index,"description",e.target.value)}/></label><label className="text-xs">Website or reference URL<input className={fieldClass+" mt-2"} value={item.url||""} onChange={e=>update(index,"url",e.target.value)}/></label><label className="text-xs">Status<input className={fieldClass+" mt-2"} value={item.status||""} onChange={e=>update(index,"status",e.target.value)}/></label>{section==="projects"&&<><label className="text-xs">Project image<input className={fieldClass+" mt-2"} type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={e=>e.target.files?.[0]&&uploadAsset(index,"image",e.target.files[0])}/><input aria-label="Project image URL" className={fieldClass+" mt-2"} placeholder="Or paste an image URL" value={item.image||""} onChange={e=>update(index,"image",e.target.value)}/></label><label className="text-xs">Project logo<input className={fieldClass+" mt-2"} type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={e=>e.target.files?.[0]&&uploadAsset(index,"logo",e.target.files[0])}/><input aria-label="Project logo URL" className={fieldClass+" mt-2"} placeholder="Or paste a logo URL" value={item.logo||""} onChange={e=>update(index,"logo",e.target.value)}/></label></>}</div>}</article>)}</div><button onClick={addEntry} className="mt-5 border border-[#315a70] px-5 py-3 text-sm text-[#315a70]">+ Add {section==="workItems"?"work item":section==="projects"?"project":"training record"}</button>{message&&<p className="mt-6 border border-[#cbd7d0] bg-[#e8eee9] p-4 text-sm">{message}</p>}<div className="mt-10 border-t border-[#d7d5cd] pt-5 text-xs leading-6 text-[#66727a]">Image and logo fields accept publicly accessible image URLs. Use the approved project asset URLs only. Saving updates the portfolio content file in GitHub and triggers Render deployment when auto-deploy is enabled.</div></div></main>;
}
