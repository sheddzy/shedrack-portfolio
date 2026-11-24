"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import portfolioData from "@/data/portfolio.json";

type Project = {
  id:string; name:string; type:string; description:string; url?:string; status?:string;
  summary?:string; problem?:string; purpose?:string; goals?:string[]; solution?:string;
  role?:string; features?:string[]; outcome?:string; contribution?:string; lessons?:string; image?:string; logo?:string;
};
const projects = portfolioData.projects as Project[];

export default function ITProjectDetailPage() {
  const params = useParams<{id:string}>();
  const project = projects.find(item => item.id === params.id);
  if (!project) return <main className="container py-24"><p className="eyebrow">IT project file</p><h1 className="section-title mt-4">Project not found</h1><Link className="mt-8 inline-block underline" href="/it-projects">Return to IT projects</Link></main>;
  const sections = [
    ["Business problem", project.problem],
    ["Project purpose", project.purpose],
    ["Proposed solution", project.solution],
    ["My role", project.role],
    ["Contribution", project.contribution],
    ["Current outcome", project.outcome],
    ["Project insight", project.lessons]
  ] as const;
  return <main>
    <header className="container flex h-[82px] items-center justify-between border-b border-[var(--line)]"><Link href="/" className="text-[15px] font-semibold tracking-[-.04em]">Shedrack Ebete<span className="text-[var(--blue)]">.</span></Link><Link href="/it-projects" className="text-xs underline underline-offset-4">All IT projects</Link></header>
    <section className="container py-20 md:py-28"><p className="eyebrow">IT project / {project.type}</p><h1 className="display mt-7 max-w-5xl">{project.name}</h1><p className="mt-8 max-w-3xl text-lg leading-8 text-[var(--muted)]">{project.summary || project.description}</p>{project.image&&<div className="mt-12 overflow-hidden bg-[#eae8e1]"><img src={project.image} alt={`${project.name} project visual`} className="max-h-[620px] w-full object-cover"/></div>}<div className="mt-9 flex flex-wrap gap-6 border-y border-[var(--line)] py-5 text-xs"><span><span className="text-[var(--muted)]">Status</span><br/><strong className="mt-2 inline-block font-medium">{project.status}</strong></span><span><span className="text-[var(--muted)]">Project type</span><br/><strong className="mt-2 inline-block font-medium">{project.type}</strong></span>{project.url&&<span className="self-end"><a className="font-semibold text-[var(--blue)] underline underline-offset-4" href={project.url} target="_blank" rel="noreferrer">Open live project ↗</a></span>}</div></section>
    <section className="bg-[#eae8e1] py-16 md:py-24"><div className="container grid gap-12 md:grid-cols-[.55fr_1.45fr]"><div><p className="eyebrow">01 / Case study</p><h2 className="section-title mt-5">The project in context.</h2><p className="mt-5 text-sm leading-7 text-[#62665f]">This case study distinguishes the business need, planned solution and work undertaken. Project status and outcomes are stated as they currently stand.</p></div><div className="space-y-0">{sections.map(([title,body],i)=>body?<article key={title} className="grid gap-4 border-t border-[#d2d0c8] py-6 sm:grid-cols-[190px_1fr]"><p className="text-xs uppercase tracking-[.13em] text-[var(--blue)]">0{i+1} / {title}</p><p className="text-sm leading-7 text-[#555b56]">{body}</p></article>:null)}</div></div></section>
    <section className="container grid gap-12 py-20 md:grid-cols-2 md:py-28">{project.goals?.length?<div><p className="eyebrow">02 / Objectives</p><h2 className="section-title mt-5">What the project is intended to achieve.</h2><ul className="mt-8">{project.goals.map((item,i)=><li key={item} className="grid grid-cols-[38px_1fr] gap-3 border-t border-[var(--line)] py-4"><span className="text-xs text-[var(--blue)]">0{i+1}</span><span className="text-sm leading-6">{item}</span></li>)}</ul></div>:null}{project.features?.length?<div><p className="eyebrow">03 / Scope</p><h2 className="section-title mt-5">Areas covered by the solution.</h2><ul className="mt-8">{project.features.map((item,i)=><li key={item} className="grid grid-cols-[38px_1fr] gap-3 border-t border-[var(--line)] py-4"><span className="text-xs text-[var(--blue)]">0{i+1}</span><span className="text-sm leading-6">{item}</span></li>)}</ul></div>:null}</section>
    <footer className="bg-[#20221f] py-12 text-[#f5f3ee]"><div className="container flex flex-col justify-between gap-5 sm:flex-row sm:items-center"><p className="text-sm text-[#b6b9b2]">Explore other technology initiatives.</p><div className="flex gap-6"><Link href="/it-projects" className="text-sm underline underline-offset-4">All IT projects</Link><Link href="/#contact" className="text-sm underline underline-offset-4">Discuss a project ↗</Link></div></div></footer>
  </main>;
}
