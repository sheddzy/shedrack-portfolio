import Link from "next/link";
import portfolioData from "@/data/portfolio.json";

type Project = {
  id: string; name: string; type: string; description: string; url?: string;
  status?: string; summary?: string; problem?: string; role?: string;
  features?: string[]; outcome?: string;
};
const projects = portfolioData.projects as Project[];

const disciplines = [
  ["01", "Software products", "Product scope, requirements and delivery coordination."],
  ["02", "Business platforms", "Digital systems shaped around real operating workflows."],
  ["03", "Web and infrastructure", "Web presence, domains, hosting and business setup."]
];

export default function ITProjectsPage() {
  return <main>
    <header className="container flex h-[82px] items-center justify-between border-b border-[var(--line)]">
      <Link href="/" className="text-[15px] font-semibold tracking-[-.04em]">Shedrack Ebete<span className="text-[var(--blue)]">.</span></Link>
      <nav className="flex items-center gap-6 text-xs"><Link href="/#projects">Selected work</Link><Link href="/#contact" className="underline underline-offset-4">Contact</Link></nav>
    </header>
    <section className="container grid gap-12 py-20 md:grid-cols-[1.15fr_.85fr] md:items-end md:py-28">
      <div><p className="eyebrow">Technology / Project portfolio</p><h1 className="display mt-7 max-w-4xl">IT projects, from business need to delivery.</h1></div>
      <div className="pb-2"><p className="max-w-xl text-base leading-8 text-[var(--muted)]">A selection of digital products, business platforms and technology initiatives. Each project starts with an operating need, then moves through requirements, coordination and implementation.</p><p className="mt-7 text-xs uppercase tracking-[.16em] text-[var(--blue)]">Business context / Product direction / Delivery</p></div>
    </section>
    <section className="bg-[#eae8e1] py-14 md:py-20"><div className="container grid gap-0 md:grid-cols-3">{disciplines.map(([n,title,desc])=><article key={n} className="border-t border-[#d2d0c8] py-6 md:mr-8"><p className="text-xs text-[var(--blue)]">{n}</p><h2 className="mt-5 text-2xl tracking-[-.05em]">{title}</h2><p className="mt-3 max-w-xs text-sm leading-7 text-[#62665f]">{desc}</p></article>)}</div></section>
    <section className="container py-20 md:py-28">
      <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="eyebrow">Selected initiatives</p><h2 className="section-title mt-5">The project files</h2></div><p className="max-w-sm text-sm leading-7 text-[var(--muted)]">Open a project for its summary, then explore the full case study, role, scope and current status.</p></div>
      <div className="space-y-6">{projects.map((project,index)=><article key={project.id} className="grid overflow-hidden border border-[var(--line)] bg-[#eeece5] md:grid-cols-[.78fr_1.22fr]">
        <div className={`relative flex min-h-[240px] flex-col justify-between overflow-hidden p-7 md:min-h-[330px] ${index===0?"bg-[#dce3df] text-[#334b43]":index===1?"bg-[#e5dfd4] text-[#514535]":"bg-[#dce4e9] text-[#304c60]"}`}>
          <div className="relative z-10 flex justify-between text-[10px] uppercase tracking-[.18em]"><span>Project file</span><span>0{index+1}</span></div>
          <div className="relative z-10"><p className="text-xs uppercase tracking-[.16em] opacity-70">{project.type}</p><p className="mt-3 max-w-md text-4xl tracking-[-.07em] md:text-5xl">{project.name}</p></div>
          <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full border border-current opacity-20"/><div className="pointer-events-none absolute -right-2 -top-6 h-52 w-52 rounded-full border border-current opacity-20"/>
        </div>
        <div className="flex flex-col justify-between p-7 md:p-10">
          <div><div className="flex flex-wrap items-center gap-3"><span className="eyebrow">{project.status}</span><span className="h-px w-8 bg-[var(--line)]"/></div><h3 className="mt-5 text-2xl tracking-[-.05em]">{project.summary || project.description}</h3><p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--muted)]">{project.problem}</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{(project.features||[]).slice(0,4).map(item=><p key={item} className="border-t border-[var(--line)] pt-3 text-xs leading-5 text-[var(--muted)]">{item}</p>)}</div></div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line)] pt-5"><p className="max-w-sm text-xs leading-5 text-[var(--muted)]">{project.role}</p><div className="flex flex-wrap gap-5"><Link href={`/it-projects/${project.id}`} className="text-xs font-semibold text-[var(--blue)] underline underline-offset-4">Open project file</Link>{project.url&&<a href={project.url} target="_blank" rel="noreferrer" className="text-xs underline underline-offset-4">Live project ↗</a>}</div></div>
        </div>
      </article>)}</div>
    </section>
    <footer className="bg-[#20221f] py-12 text-[#f5f3ee]"><div className="container flex flex-col justify-between gap-5 sm:flex-row sm:items-center"><p className="text-sm text-[#b6b9b2]">Technology projects within a wider operations and delivery practice.</p><Link href="/#contact" className="text-sm underline underline-offset-4">Discuss a project ↗</Link></div></footer>
  </main>;
}
