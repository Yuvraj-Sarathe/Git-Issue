import fs from 'fs';

let content = fs.readFileSync('app/page.tsx', 'utf8');

const replacements: Record<string, string> = {
  'placeholder-zinc-500': 'placeholder-[#8b949e]',
  'placeholder-zinc-600': 'placeholder-[#8b949e]',
  'text-rose-400': 'text-[#ff7b72]',
  'text-rose-200': 'text-[#ff7b72]',
  'bg-rose-950/40': 'bg-[rgba(255,123,114,0.1)]',
  'border-rose-500': 'border-[#ff7b72]',
  'bg-emerald-600': 'bg-[#238636]',
  'border-emerald-600': 'border-[#3fb950]',
  'group-hover:border-emerald-500': 'group-hover:border-[#3fb950]',
  'text-emerald-500': 'text-[#3fb950]',
  'text-emerald-400': 'text-[#3fb950]',
  'bg-emerald-900/30': 'bg-[rgba(63,185,80,0.15)]',
  'border-emerald-800/50': 'border-[rgba(63,185,80,0.4)]',
  'hover:text-emerald-300': 'hover:text-[#56d364]',
  'divide-zinc-800': 'divide-[#30363d]',
};

for (const [key, value] of Object.entries(replacements)) {
  content = content.split(key).join(value);
}

fs.writeFileSync('app/page.tsx', content);
console.log('Second pass replacements complete');
