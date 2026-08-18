"use client";
import React, { useState, useEffect, useCallback } from "react";
import { TextFlippingBoard } from "./ui/text-flipping-board";

const MESSAGES: string[] = [
  "NOT FOR EVERYONE. \nTHAT'S VARNERO.",
  "WEAR YOUR \nOWN RULES.",
  "NO APPROVAL \nNEEDED.",
  "MAKE YOUR \nOWN STATEMENT.",
  "🖕🏼🖕🏼🖕🏼 VARNERO — WEAR YOUR FUCKING SELF. 🖕🏼🖕🏼🖕🏼",
];

export function TextFlippingBoardDemo() {
  const [msgIdx, setMsgIdx] = useState(0);

  const next = useCallback(
    () => setMsgIdx((i) => (i + 1) % MESSAGES.length),
    [],
  );

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 py-20 bg-black">
      <TextFlippingBoard text={MESSAGES[msgIdx]} />
    </div>
  );
}
