const expertise = [
  { number: "01", title: "Operations management", detail: "Process improvement, SOPs, workflow design and the routines that keep teams moving." },
  { number: "02", title: "Project management", detail: "Planning, coordination, delivery tracking and clear communication across stakeholders." },
  { number: "03", title: "HR operations", detail: "Employee administration, onboarding and practical people operations workflows." },
  { number: "04", title: "Business systems", detail: "Digital tools, automation and systems that make everyday work more reliable." }
];

const projects = [
  { name: "AtelierOS", type: "Fashion business management · SaaS", description: "A management platform shaped around the daily work of fashion houses, from client orders and measurements to production and inventory.", mark: "atelier", tone: "bg-[#dce3df] text-[#334b43]" },
  { name: "Sowvera", type: "Fashion education · EdTech", description: "A planned operating system for fashion schools and instructors, connecting admissions, learning, practical work and administration.", mark: "sowvera", tone: "bg-[#e5dfd4] text-[#514535]" },
  { name: "OptiFlow Ops Solutions", type: "Operations consulting · Business systems", description: "An operations-focused business working across process improvement, project coordination and practical digital solutions.", mark: "optiflow", tone: "bg-[#dce4e9] text-[#304c60]" }
];

export default function Home() {
  return (
    <main>
      <header className="container flex h-[82px] items-center justify-between border-b border-[var(--line)]">
        <a href="#home" className="text-[15px] font-semibold tracking-[-.04em]">Shedrack Ebete<span className="text-[var(--blue)]">.</span></a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          <a className="nav-link" href="#about">About</a><a className="nav-link" href="#expertise">Expertise</a><a className="nav-link" href="#projects">Projects</a><a className="nav-link" href="#experience">Experience</a>
        </nav>
        <a href="#contact" className="button-dark">Let’s talk <span aria-hidden="true">↗</span></a>
      </header>

      <section id="home" className="container grid min-h-[680px] items-center gap-12 py-24 lg:grid-cols-[1.35fr_.65fr]">
        <div>
          <p className="eyebrow mb-8">Operations · Projects · Business systems</p>
          <h1 className="display max-w-[900px]">Turning business complexity into <span className="text-[var(--blue)]">organised execution.</span></h1>
          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-[440px] text-[15px] leading-7 text-[var(--muted)]">I help teams bring structure to the way work gets done through thoughtful operations, effective project management and practical technology.</p>
            <div className="flex gap-3"><a className="button-dark" href="#projects">Explore my work</a><a className="button-outline" href="#contact">Get in touch</a></div>
          </div>
        </div>
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[390px] overflow-hidden bg-[#d9ddd8]">
          <img src="/images/shedrack-ebete.jpg" alt="Shedrack Ebete in a blue checked suit" className="h-full w-full object-cover object-top" />
        </div>
      </section>

      <section id="about" className="bg-[#eae8e1] py-24">
        <div className="container grid gap-12 md:grid-cols-[.65fr_1.35fr]">
          <div><p className="eyebrow">01 / A little about me</p><p className="mt-5 text-sm text-[var(--muted)]">The person behind the processes</p></div>
          <div><h2 className="section-title max-w-[760px]">I work where people, processes and technology meet.</h2><div className="mt-8 grid gap-8 md:grid-cols-2"><p className="text-[15px] leading-7 text-[#5f625c]">My work centres on making business operations easier to understand, manage and improve. I approach challenges by breaking them into clear processes, practical plans and accountable actions.</p><p className="text-[15px] leading-7 text-[#5f625c]">Alongside operations and project work, I contribute to the planning of digital products and business systems. I value solutions that work in real operating environments, not just on paper.</p></div></div>
        </div>
      </section>

      <section id="expertise" className="container py-24">
        <div className="mb-14 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow mb-5">02 / What I do</p><h2 className="section-title">Areas of focus</h2></div><p className="max-w-[340px] text-sm leading-6 text-[var(--muted)]">A connected set of capabilities for improving how organisations plan, operate and grow.</p></div>
        <div className="rule">{expertise.map((item) => <article key={item.number} className="grid gap-3 border-b border-[var(--line)] py-7 md:grid-cols-[80px_1fr_1fr] md:items-center"><span className="text-xs text-[var(--blue)]">{item.number}</span><h3 className="text-xl tracking-[-.04em]">{item.title}</h3><p className="max-w-[420px] text-sm leading-6 text-[var(--muted)]">{item.detail}</p></article>)}</div>
      </section>

      <section id="projects" className="bg-[#eae8e1] py-24">
        <div className="container"><div className="mb-14 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow mb-5">03 / Selected work</p><h2 className="section-title">Projects & initiatives</h2></div><p className="max-w-[350px] text-sm leading-6 text-[var(--muted)]">A selection of business and product work across operations, technology and service delivery.</p></div>
          <div className="grid gap-5 md:grid-cols-2">{projects.map((project, index) => <article key={project.name} className={`project-card ${index === 0 ? "md:col-span-2 md:grid md:grid-cols-[1fr_1fr]" : ""}`}><div className={`project-art ${project.tone} `}><span>{project.mark}</span><small className="absolute right-6 top-6 text-[10px] tracking-widest">0{index + 1}</small></div><div className="flex flex-col justify-between p-7 md:p-9"><div><p className="eyebrow">{project.type}</p><h3 className="mt-4 text-3xl tracking-[-.06em]">{project.name}</h3><p className="mt-4 max-w-[470px] text-sm leading-7 text-[var(--muted)]">{project.description}</p></div><p className="mt-10 text-xs text-[var(--blue)]">Product and operations work <span aria-hidden="true">↗</span></p></div></article>)}</div>
        </div>
      </section>

      <section id="training" className="bg-[#eae8e1] py-24">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-[.65fr_1.35fr]">
            <div><p className="eyebrow">04 / Training & facilitation</p><h2 className="section-title mt-5">Helping people build practical skills.</h2></div>
            <div>
              <p className="max-w-[650px] text-lg leading-8 text-[#555a55]">I facilitate learning sessions for teams and individuals, translating workplace and project concepts into practical knowledge people can apply.</p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <article className="border-t border-[var(--line)] pt-5"><p className="eyebrow">Corporate training</p><h3 className="mt-3 text-xl tracking-[-.04em]">KBC Insurance</h3><p className="mt-2 text-sm leading-6 text-[var(--muted)]">Delivered customer service training for the organisation.</p></article>
                <article className="border-t border-[var(--line)] pt-5"><p className="eyebrow">Corporate training</p><h3 className="mt-3 text-xl tracking-[-.04em]">Citimobile</h3><p className="mt-2 text-sm leading-6 text-[var(--muted)]">Corporate training engagement. Training topic to be confirmed.</p></article>
                <article className="border-t border-[var(--line)] pt-5 sm:col-span-2"><p className="eyebrow">Project management education</p><h3 className="mt-3 text-xl tracking-[-.04em]">Codarq HQ</h3><p className="mt-2 text-sm leading-6 text-[var(--muted)]">Trained more than 20 students in project management.</p></article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="container py-24">
        <div className="grid gap-12 md:grid-cols-[.65fr_1.35fr]"><div><p className="eyebrow">05 / How I work</p><h2 className="section-title mt-5">From plan to practice.</h2></div><div className="space-y-8"><p className="max-w-[650px] text-lg leading-8 text-[#555a55]">Good operations are built through consistent execution. I bring structure to priorities, make responsibilities visible and help teams keep progress moving.</p><div className="grid gap-6 border-t border-[var(--line)] pt-7 sm:grid-cols-3"><div><p className="text-2xl tracking-[-.05em]">01</p><h3 className="mt-3 text-sm font-semibold">Understand</h3><p className="mt-2 text-sm leading-6 text-[var(--muted)]">Map the current situation, constraints and desired outcomes.</p></div><div><p className="text-2xl tracking-[-.05em]">02</p><h3 className="mt-3 text-sm font-semibold">Organise</h3><p className="mt-2 text-sm leading-6 text-[var(--muted)]">Translate priorities into workflows, ownership and clear plans.</p></div><div><p className="text-2xl tracking-[-.05em]">03</p><h3 className="mt-3 text-sm font-semibold">Execute</h3><p className="mt-2 text-sm leading-6 text-[var(--muted)]">Track delivery, solve blockers and improve the process as work progresses.</p></div></div></div></div>
      </section>

      <footer id="contact" className="bg-[#20221f] py-20 text-[#f5f3ee]">
        <div className="container"><p className="eyebrow !text-[#a9c0cc]">06 / Start a conversation</p><div className="mt-8 grid gap-10 md:grid-cols-[1fr_auto] md:items-end"><div><h2 className="max-w-[760px] text-5xl leading-[.98] tracking-[-.07em] md:text-7xl">Let’s make work work better.</h2><p className="mt-6 max-w-[430px] text-sm leading-7 text-[#b6b9b2]">Open to operations and project roles, consulting engagements and conversations about business systems.</p></div><div className="flex flex-col items-start gap-4"><a className="button-dark !bg-[#e4e8e3] !text-[#20221f]" href="https://www.linkedin.com/in/shedrackebete01/" target="_blank" rel="noreferrer">Connect on LinkedIn ↗</a><a className="text-sm text-[#c5cbc4] underline underline-offset-4" href="https://github.com/sheddzy">GitHub profile ↗</a></div></div><div className="mt-20 flex flex-col justify-between gap-3 border-t border-[#454842] pt-6 text-xs text-[#a4a89f] sm:flex-row"><span>© {new Date().getFullYear()} Shedrack Ebete</span><span>Operations · Projects · Business systems</span></div></div>
      </footer>
    </main>
  );
}