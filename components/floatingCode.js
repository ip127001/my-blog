import utilStyles from "../styles/utils.module.css";

const SNIPPETS = [
  { text: "</>", left: "4%", delay: "0s", duration: "14s" },
  { text: "{ }", left: "14%", delay: "3s", duration: "17s" },
  { text: "=>", left: "24%", delay: "6s", duration: "13s" },
  { text: "useState()", left: "34%", delay: "1.5s", duration: "18s" },
  { text: "<div />", left: "46%", delay: "8s", duration: "15s" },
  { text: "npm run dev", left: "56%", delay: "4.5s", duration: "19s" },
  { text: "const", left: "68%", delay: "2s", duration: "14s" },
  { text: "async/await", left: "76%", delay: "7s", duration: "16s" },
  { text: "git push", left: "86%", delay: "5s", duration: "18s" },
  { text: "console.log()", left: "92%", delay: "9s", duration: "15s" },
];

export default function FloatingCode() {
  return (
    <div className={utilStyles.floatingCode} aria-hidden="true">
      {SNIPPETS.map(({ text, left, delay, duration }) => (
        <span
          key={text}
          className={utilStyles.floatingSnippet}
          style={{
            left,
            animationDelay: delay,
            animationDuration: duration,
          }}
        >
          {text}
        </span>
      ))}
    </div>
  );
}
