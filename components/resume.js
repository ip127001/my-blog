import utilStyles from "../styles/utils.module.css";

// Edit this data to update the resume section.
const EXPERIENCE = [
  {
    hash: "f7a2e19",
    label: "HEAD -> main",
    role: "Lead Software Engineer — Swiggy",
    period: "Apr 2024 — Present",
    diff: [
      "Leading a team of 10 engineers owning Swiggy Assure (B2B supply chain) frontend end-to-end",
      "Migrated legacy React SSR stack to TanStack Start — 80% faster builds, 15% faster page loads",
      "Moved frontend infra from Singapore to Mumbai, cutting monthly service costs by 70%",
      "Led Instamart web: pharma launch with PharmEasy, Multi-Delivery & Maxxcart features",
    ],
  },
  {
    hash: "c4d81b3",
    role: "SDE 2 — Swiggy",
    period: "May 2022 — Mar 2024",
    diff: [
      "Launched Swiggy Mall as a standalone frontend service from scratch, shipped in one month",
      "Migrated Instamart frontend from EC2 to containers, cutting infra cost by ~60%",
      "Launched Swiggy Meats pre-order feature, improving AOV for 80% of active users",
    ],
  },
  {
    hash: "8b3d2c1",
    role: "SDE 1 — Paytm Payments Bank",
    period: "Feb 2021 — May 2022",
    diff: [
      "Built the checkbook flow end-to-end for Net Banking with React, Redux and Node.js",
      "Improved the internal design system — smaller bundles, faster first-page load",
    ],
  },
  {
    hash: "5f9a6e4",
    role: "Software Engineer — Primathon",
    period: "Dec 2019 — Feb 2021",
    diff: [
      "Built a design system with Storybook, theming and Cypress e2e testing",
      "Shipped a currency exchange tool with React hooks, TypeScript and Redux",
    ],
  },
  {
    hash: "9e0f5a7",
    role: "B.Tech CSE — NIT Mizoram",
    period: "2015 — 2019",
    diff: ["Bachelor of Technology in Computer Science Engineering, CGPA 8.3/10"],
  },
];

const SKILLS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "TanStack",
  "Zustand",
  "Redux",
  "Node.js",
  "Docker",
  "AWS",
  "Cypress",
  "GenAI",
];

export default function Resume() {
  return (
    <section id="resume" className={utilStyles.resumeSection}>
      <h1>My Resume:</h1>
      <div className={utilStyles.terminal}>
        <div className={utilStyles.terminalBar}>
          <span className={`${utilStyles.trafficDot} ${utilStyles.dotRed}`} />
          <span
            className={`${utilStyles.trafficDot} ${utilStyles.dotYellow}`}
          />
          <span className={`${utilStyles.trafficDot} ${utilStyles.dotGreen}`} />
          <span className={utilStyles.terminalTitle}>
            rohit@swiggy — ~/career
          </span>
        </div>
        <div className={utilStyles.terminalBody}>
          <p className={utilStyles.cmdLine}>
            <span className={utilStyles.prompt}>$ </span>
            <span className={utilStyles.typedCmd}>git log --career --graph</span>
          </p>

          <ol className={utilStyles.commitList}>
            {EXPERIENCE.map((item, i) => (
              <li
                key={item.hash}
                tabIndex={0}
                className={utilStyles.commit}
                style={{ animationDelay: `${1.6 + i * 0.3}s` }}
              >
                <span className={utilStyles.commitDot} />
                <div className={utilStyles.commitHeader}>
                  <span className={utilStyles.commitHash}>{item.hash}</span>
                  {item.label && (
                    <span className={utilStyles.commitLabel}>
                      ({item.label})
                    </span>
                  )}
                  <span className={utilStyles.commitRole}>{item.role}</span>
                  <span className={utilStyles.commitPeriod}>{item.period}</span>
                </div>
                <ul className={utilStyles.commitDiff}>
                  {item.diff.map((line) => (
                    <li key={line}>+ {line}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <p className={utilStyles.commitHint}>
            hover / tap a commit to expand it
          </p>

          <p className={`${utilStyles.cmdLine} ${utilStyles.cmdLineDelayed}`}>
            <span className={utilStyles.prompt}>$ </span>npm ls --skills
          </p>
          <div className={utilStyles.skillChips}>
            {SKILLS.map((skill, i) => (
              <span
                key={skill}
                className={utilStyles.skillChip}
                style={{ animationDelay: `${3 + i * 0.15}s` }}
              >
                {skill}
              </span>
            ))}
          </div>

          <p className={utilStyles.cmdLine}>
            <span className={utilStyles.prompt}>$ </span>
            <span className={utilStyles.blinkCursor}>▊</span>
          </p>
        </div>
      </div>
    </section>
  );
}
