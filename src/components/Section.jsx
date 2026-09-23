export default function Section({ children, id }) {
  return <section id={id} tabIndex={-1} className="max-w-[900px] mx-auto py-12 px-5">{children}</section>;
}
