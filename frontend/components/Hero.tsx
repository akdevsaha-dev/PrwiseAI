"use client";
import { ArrowUpRight, Bug, FileText, Sparkles } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";
import { authClient } from "../lib/auth-client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
export function Hero() {
  async function handleClick() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/newsletter/inbox",
    });
  }
  useGSAP(() => {
    const magicSplit = new SplitText("#magic", { type: "chars" });
    gsap.from(magicSplit.chars, {
      stagger: 0.08,
      ease: "expo.out",
      duration: 1,
      yPercent: 100,
    });
    gsap.fromTo(
      "#magic-bg",
      { x: "-100%" },
      {
        x: "0%",
        duration: 2,
        ease: "power2.out",
      },
    );
  }, []);
  return (
    <div className="bg-neutral-950">
      <div className="min-h-[70vh] w-full relative flex flex-col">
        <div
          className="absolute inset-0 z-0 opacity-50"
          style={{
            backgroundColor: "#0a0a0a",
            backgroundImage: `
            radial-gradient(circle at 25% 25%, #222222 0.5px, transparent 3px),
            radial-gradient(circle at 75% 75%, #111111 0.5px, transparent 1px)
          `,
            backgroundSize: "10px 10px",
          }}
        />
        <div className="flex-1 flex text-white flex-col items-center justify-center opacity-90 md:mt-20">
          <div className="md:max-w-3xl  max-w-100 text-3xl text-center md:text-6xl font-semibold antialiased">
            Intelligent PR{" "}
            <span
              id="magic"
              className="relative inline-flex items-center overflow-hidden text-neutral-200 px-3 py-1 rounded-lg border border-neutral-500"
            >
              <span
                id="magic-bg"
                className="absolute inset-0 bg-neutral-600"
              ></span>

              <span className="relative z-10">Assistant</span>
            </span>
            , Built to Save You Time.
          </div>
          <div className="mt-5 opacity-65 w-xl md:w-4xl font-semibold text-sm text-center md:text-lg px-8 md:px-0">
            Every pull request gets an instant AI summary. Get bug risk scores,
            and suggestions for your pull requests. Ship better code, faster.
          </div>
          <div className="text-xs opacity-60 mt-5">
            No credit card required.
          </div>
          <div className="flex gap-6 mt-4">
            <button
              onClick={handleClick}
              className="w-40 h-12 flex gap-2 items-center justify-center hover:opacity-80 font-bold rounded-full bg-neutral-800 "
            >
              <div>Get Started</div>
              <ArrowUpRight size={20} />
            </button>
            <div className="w-45 pl-2 h-12 hidden md:flex gap-2 items-center justify-center hover:opacity-80 font-semibold rounded-full bg-white text-black ">
              <div>See it in Action</div>
              <div className="px-1 py-1 rounded-full bg-black text-white">
                <ArrowUpRight size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full border-y border-y-neutral-700 bg-[#0f0f0f] relative text-white">
        <div
          className="absolute inset-0 z-0 pointer-events-none hidden md:block"
          style={{
            backgroundImage: `
        repeating-linear-gradient(-45deg,
          rgba(255, 0, 100, 0.15) 0px,
          rgba(255, 0, 100, 0) 2px,
          transparent 2px,
          transparent 20px
        )
      `,
          }}
        />

        <div className="relative z-20 w-full flex items-center justify-center px-4">
          <div className="w-full max-w-7xl md:border-x md:border-x-neutral-700">
            <Image
              loading="eager"
              src="/dashboard.png"
              width={1920}
              height={1080}
              alt="Newsletter preview"
              className="w-full h-auto object-contain px-px"
            />
          </div>
        </div>
      </div>
      <div className="min-h-screen py-24 md:py-32 bg-neutral-950 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neutral-800/20 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.2, duration: 0.8, ease: "easeOut" },
          }}
          viewport={{ once: true }}
          className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50 text-neutral-400 text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-neutral-500 animate-pulse" />
            Designed for power users who value time
          </div>

          <h2 className="text-4xl md:text-7xl font-bold text-white text-center tracking-tight mb-4">
            Speed Is Everything
          </h2>
          <p className="text-3xl md:text-5xl font-medium text-neutral-500 text-center mb-16">
            Review in seconds, not hours.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-10">
            <div className="space-y-8">
              <div className="p-1 bg-neutral-900/50 border border-neutral-800 rounded-2xl">
                <div className="p-8 space-y-4">
                  <h3 className="text-2xl font-semibold text-white">The Smart Assistant Your PR Needs</h3>
                  <p className="text-neutral-400 leading-relaxed text-lg">
                    Prwise transforms how code reviews happen. Instead of waiting for human availability, get instant, intelligent feedback on every change.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Identify Bugs", desc: "Catch issues before they hit production." },
                  { title: "Maintain Standards", desc: "Consistent quality across your team." },
                  { title: "Learn Faster", desc: "Best practices suggested in-situ." },
                  { title: "Seamless Sync", desc: "Works with your existing workflow." }
                ].map((item, i) => (
                  <div key={i} className="p-4 border border-neutral-800/50 rounded-xl bg-neutral-900/30">
                    <div className="font-medium text-white mb-1">{item.title}</div>
                    <div className="text-sm text-neutral-500">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
               <div className="absolute -inset-4 bg-gradient-to-tr from-neutral-800/20 to-transparent rounded-3xl blur-2xl" />
               <div className="relative bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
                 <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-800 bg-neutral-950/50">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-neutral-800" />
                      <div className="w-3 h-3 rounded-full bg-neutral-800" />
                      <div className="w-3 h-3 rounded-full bg-neutral-800" />
                    </div>
                    <div className="text-xs text-neutral-500 font-mono">pr-analysis.json</div>
                 </div>
                 <div className="p-6 font-mono text-sm">
                    <div className="flex gap-4">
                      <span className="text-neutral-600">01</span>
                      <span className="text-blue-400">{"{"}</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-neutral-600">02</span>
                      <span className="ml-4 text-neutral-300">"risk_score": <span className="text-yellow-500">0.12</span>,</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-neutral-600">03</span>
                      <span className="ml-4 text-neutral-300">"summary": <span className="text-green-400">"Clean refactor of auth logic"</span>,</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-neutral-600">04</span>
                      <span className="ml-4 text-neutral-300">"suggestions": [</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-neutral-600">05</span>
                      <span className="ml-8 text-neutral-300">"Use optional chaining in line 42"</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-neutral-600">06</span>
                      <span className="ml-4 text-neutral-300">]</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-neutral-600">07</span>
                      <span className="text-blue-400">{"}"}</span>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="min-h-screen py-24 bg-black relative overflow-hidden">
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 100%, rgba(34, 34, 34, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 0% 0%, rgba(20, 20, 20, 0.3) 0%, transparent 40%)
            `,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-500 mb-8 leading-tight">
              Experience the Future of DevX
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Instant PR Summaries",
                desc: "Every pull request is automatically summarized so you instantly understand what changed without reading hundreds of lines of code.",
                icon: <FileText className="w-5 h-5" />
              },
              {
                title: "Bug Risk Detection",
                desc: "AI highlights potential risks, suspicious patterns, and fragile code so your team can catch issues before they reach production.",
                icon: <Bug className="w-5 h-5" />
              },
              {
                title: "Smarter Code Reviews",
                desc: "Get actionable suggestions that improve readability, structure, and maintainability across your entire codebase.",
                icon: <Sparkles className="w-5 h-5" />
              }
            ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-2xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-sm hover:border-neutral-700 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 mb-4 group-hover:text-white group-hover:bg-neutral-800 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:translate-x-1 transition-transform">{feature.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-40 text-center relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-full max-w-lg h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
            <h3 className="text-2xl md:text-3xl font-medium text-neutral-200 mb-6">
              Ready to ship better code?
            </h3>
            <p className="text-neutral-500 mb-10 max-w-md mx-auto">
              Join teams already using PRwise to accelerate their development cycle and maintain high quality.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={handleClick} className="w-full sm:w-auto px-8 h-12 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 group">
                Get Started
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-8 h-12 bg-neutral-900 text-white border border-neutral-800 font-semibold rounded-full hover:bg-neutral-800 transition-colors">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
      <footer className="w-full bg-neutral-950 border-t border-neutral-800 text-neutral-400">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <div className="text-white text-xl font-semibold">Prwise</div>
              <p className="mt-4 text-sm leading-relaxed">
                Intelligent pull‑request reviews powered by AI. Ship cleaner
                code faster, catch issues early, and help your team maintain
                consistent quality across every repository.
              </p>
            </div>

            <div>
              <div className="text-white font-semibold mb-4">Product</div>
              <ul className="space-y-3 text-sm">
                <li className="hover:text-white transition-colors cursor-pointer">
                  Features
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Pricing
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Integrations
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Changelog
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-semibold mb-4">Resources</div>
              <ul className="space-y-3 text-sm">
                <li className="hover:text-white transition-colors cursor-pointer">
                  Documentation
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Guides
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Blog
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Support
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-semibold mb-4">Company</div>
              <ul className="space-y-3 text-sm">
                <li className="hover:text-white transition-colors cursor-pointer">
                  About
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Careers
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Privacy
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Terms
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <div>© {new Date().getFullYear()} Prwise. All rights reserved.</div>
            <div className="flex gap-6">
              <span className="hover:text-white cursor-pointer transition-colors">
                Twitter
              </span>
              <span className="hover:text-white cursor-pointer transition-colors">
                GitHub
              </span>
              <span className="hover:text-white cursor-pointer transition-colors">
                LinkedIn
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
