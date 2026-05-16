import fs from 'fs';

let content = fs.readFileSync('app/page.tsx', 'utf8');

const replacements: Record<string, string> = {
  'bg-zinc-950': 'bg-[#0d1117]',
  'bg-zinc-900/50': 'bg-[#161b22]/70',
  'bg-zinc-900': 'bg-[#161b22]',
  'bg-zinc-800/50': 'bg-[#21262d]/50',
  'bg-zinc-800': 'bg-[#21262d]',
  'text-zinc-100': 'text-[#c9d1d9]',
  'text-zinc-200': 'text-[#c9d1d9]',
  'text-zinc-300': 'text-[#c9d1d9]',
  'text-zinc-400': 'text-[#8b949e]',
  'text-zinc-500': 'text-[#8b949e]',
  'text-zinc-700': 'text-[#8b949e]',
  'border-zinc-900': 'border-[#0d1117]',
  'border-zinc-800/50': 'border-[#30363d]/50',
  'border-zinc-800': 'border-[#30363d]',
  'border-zinc-700': 'border-[#30363d]',
  'bg-indigo-900/30': 'bg-[#1f2d23]',
  'border-indigo-800/50': 'border-[#3fb950]/30',
  'text-indigo-400': 'text-[#58a6ff]',
  'text-indigo-500': 'text-[#58a6ff]',
  'text-indigo-600': 'text-[#58a6ff]',
  'border-indigo-500': 'border-[#58a6ff]',
  'border-indigo-600': 'border-[#58a6ff]',
  'bg-indigo-600': 'bg-[#238636]',
  'hover:bg-indigo-500': 'hover:bg-[#2ea043]',
  'hover:bg-zinc-800': 'hover:bg-[#30363d]',
  'ring-indigo-500': 'ring-[#58a6ff]',
  'hover:border-indigo-500': 'hover:border-[#58a6ff]',
  'hover:text-indigo-400': 'hover:text-[#58a6ff]',
  'hover:text-indigo-300': 'hover:text-[#79c0ff]',
  'selection:bg-indigo-500/30': 'selection:bg-[#58a6ff]/30',
  'ring-offset-zinc-900': 'ring-offset-[#161b22]',
};

for (const [key, value] of Object.entries(replacements)) {
  content = content.split(key).join(value);
}

fs.writeFileSync('app/page.tsx', content);
console.log('Replacements complete');
