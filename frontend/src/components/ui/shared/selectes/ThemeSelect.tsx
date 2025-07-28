"use client";
import useTheme, { Theme } from "@/hooks/useTheme/useTheme";
import { ChevronDown } from "lucide-react";
import React from "react";

export default function ThemeSelect() {
  const [theme, setTheme] = useTheme("light");

  return (
    <div className='relative inline-block w-[140px]'>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as Theme)}
        className='appearance-none w-full px-4 py-2 pr-10 rounded-md border border-grey-e9 bg-white text-black shadow-normal font-semibold text-[16px] font-first focus:outline-none focus:ring-2 focus:ring-orange-main transition'
        aria-label='Select theme'>
        <option value='light'>light</option>
        <option value='dark'>dark</option>
        <option value='warm'>warm</option>
      </select>
      <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-black/60 h-4 w-4' />
    </div>
  );
}
