// A highlighted word in running text: a soft vermilion chip with an ink underline, that lifts and tilts a little on hover.
export function Keyword({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-md border-b-[1.5px] border-[#e8a596] bg-[#fdece6] px-1.5 leading-[1.5] text-[#b53424] transition-transform duration-200 hover:-translate-y-0.5 hover:-rotate-2 dark:border-[#7a3a2e] dark:bg-[#3a201d] dark:text-[#f2a08c]">
      {children}
    </span>
  );
}
