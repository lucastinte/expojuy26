"use client";

import Image from "next/image";
import { Marquee } from "@/demos/ui/marquee";

export const teamMembers = [
  {
    image:
      "https://cdn.21st.dev/assets/mirror/f4/f43137dada970ee6a29a0497d1f699d54b92e5381350eaa66dc827e3ffb11645.jpg",
    name: "Patrick Stewart",
    role: "CEO - Founder",
  },
  {
    image:
      "https://cdn.21st.dev/assets/mirror/d5/d549c11c16ad2335895c39339d1a4307b648b24a6baae68662246cf9bd37ac13.jpg",
    name: "Alena Rosser",
    role: "Director of Content",
  },
  {
    image:
      "https://cdn.21st.dev/assets/mirror/e0/e058437411e954b747056a494f26349751828f12c2137a883e5aebbd1fcf5eef.jpg",
    name: "Fletch Skinner",
    role: "Tech Manager",
  },
  {
    image:
      "https://cdn.21st.dev/assets/mirror/45/45ba21cbafae178989cd3652799f42123a80e0ac44065ac00cbb265ea948bc41.jpg",
    name: "Marc Spector",
    role: "Director of Content",
  },
  {
    image:
      "https://cdn.21st.dev/assets/mirror/90/904d97602d25b1b5ef0f4058abad6d8185d8cebd0750771404a934a44dd537fb.jpg",
    name: "Natalia Skinner",
    role: "Cnippet Researcher",
  },
  {
    image:
      "https://cdn.21st.dev/assets/mirror/3b/3b6a929c98b85177bcc2eb4606a71b7487011128756dbf0adda24e803ca70ed7.jpg",
    name: "David Kim",
    role: "Engineering Lead",
  },
];

export default function Team() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-12 md:py-24 dark:bg-background">
      <div>
        <svg
          className="absolute right-0 bottom-0 text-neutral-200 dark:text-neutral-800"
          fill="none"
          height="154"
          viewBox="0 0 460 154"
          width="460"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_494_1104)">
            <path
              d="M-87.463 458.432C-102.118 348.092 -77.3418 238.841 -15.0744 188.274C57.4129 129.408 180.708 150.071 351.748 341.128C278.246 -374.233 633.954 380.602 548.123 42.7707"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="40"
            />
          </g>
          <defs>
            <clipPath id="clip0_494_1104">
              <rect fill="white" height="154" width="460" />
            </clipPath>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-16 flex max-w-5xl flex-col items-center px-6 text-center lg:px-0">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-user-star"
            >
              <path d="M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z" />
              <path d="M8 15H7a4 4 0 0 0-4 4v2" />
              <circle cx="10" cy="7" r="4" />
            </svg>
          </div>

          <h1 className="relative mb-4 font-medium text-4xl text-neutral-900 tracking-tight sm:text-5xl dark:text-neutral-100">
            Creative Cnippet Members
            <svg
              className="absolute -top-2 -right-8 -z-10 w-24 text-neutral-200 dark:text-neutral-700"
              fill="currentColor"
              height="86"
              viewBox="0 0 108 86"
              width="108"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M38.8484 16.236L15 43.5793L78.2688 15L18.1218 71L93 34.1172L70.2047 65.2739"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="28"
              />
            </svg>
          </h1>
          <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
            Cnippet connects you with the most advanced tech solutions,
            empowering seamless communication.
          </p>
        </div>

        <div className="relative w-full">
          <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-32 bg-gradient-to-r from-white to-transparent dark:from-background" />
          <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-32 bg-gradient-to-l from-white to-transparent dark:from-background" />

          <Marquee className="[--gap:1.5rem]" pauseOnHover>
            {teamMembers.map((member) => (
              <div
                className="group flex w-64 shrink-0 flex-col"
                key={member.name}
              >
                <div className="relative h-92 w-full overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800">
                  <Image
                    alt={member.name}
                    className="h-full w-full object-cover grayscale transition-all duration-300 hover:grayscale-0"
                    fill
                    src={member.image}
                  />
                  <div className="absolute bottom-0 w-full rounded-lg bg-neutral-100/85 p-2 dark:bg-neutral-800/80">
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {member.name}
                    </h3>
                    <p className="text-neutral-600 text-sm dark:text-neutral-400">
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>

        <div className="mx-auto mt-20 max-w-3xl px-6 text-center lg:px-0">
          <p className="mb-8 font-medium text-lg text-neutral-900 leading-relaxed md:text-xl dark:text-neutral-100">
            The exceptional support from Cnippet truly impressed us. We
            suggested an improvement, and their team implemented it with
            remarkable speed!
          </p>
          <div className="flex flex-col items-center gap-3">
            <div className="relative h-14 w-14 overflow-hidden rounded-full">
              <Image
                alt="Natalia Kara"
                className="h-full w-full object-cover"
                fill
                src="https://cdn.21st.dev/assets/mirror/21/2150915ffd93601725345aee4ec87bcdb0f992a8b016d0afba59be5a9b497b5b.jpg"
              />
            </div>
            <div className="text-center">
              <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                Natalia Kara
              </p>
              <p className="text-neutral-600 text-sm dark:text-neutral-400">
                CTO · Cnippet Collection
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
