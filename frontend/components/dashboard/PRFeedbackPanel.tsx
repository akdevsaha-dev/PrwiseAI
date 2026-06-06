"use client";

import type { PR } from "@/store/dashboardStore";
import { motion, AnimatePresence } from "motion/react";
import { X, Bug, Sparkles, FileText, ExternalLink, GitBranch, User, Calendar } from "lucide-react";
import { getRiskColor, getStatusColor } from "./dashboardUtils";

type Props = {
  pr: PR | null;
  isOpen: boolean;
  onClose: () => void;
};

export function PRFeedbackPanel({ pr, isOpen, onClose }: Props) {
  if (!pr) return null;

  const analysis = pr.analysis?.[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-xl bg-white dark:bg-[#0e0e10] border-l dark:border-neutral-800 border-neutral-200 z-[60] shadow-2xl overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/80 dark:bg-[#0e0e10]/80 backdrop-blur-md z-10 px-6 py-4 border-b dark:border-neutral-800 border-neutral-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold tracking-tight dark:text-white flex items-center gap-2">
                  <span className="text-neutral-500 font-mono">#{pr.pullReqNumber}</span>
                  {pr.title}
                </h2>
                <div className="flex items-center gap-3 mt-1 text-xs text-neutral-500 uppercase font-medium">
                  <span className="flex items-center gap-1"><User className="w-3 h-3" /> {pr.author}</span>
                  <span className="flex items-center gap-1"><GitBranch className="w-3 h-3" /> {pr.branch}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5 dark:text-neutral-400 text-neutral-500" />
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Status Section */}
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Risk Score</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${analysis?.bugRiskScore > 70 ? 'bg-red-500 animate-pulse' : analysis?.bugRiskScore > 40 ? 'bg-yellow-500' : ' bg-green-500'}`} />
                    <span className={`text-2xl font-black ${getRiskColor(analysis?.bugRiskScore || 0)}`}>
                      {analysis?.bugRiskScore || 0}%
                    </span>
                  </div>
                </div>

                <div className="h-10 w-px dark:bg-neutral-800 bg-neutral-200 mx-2 hidden sm:block" />

                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">PR Status</span>
                  <span className={`px-2.5 py-1 text-xs rounded-md font-bold uppercase tracking-tight shadow-sm border ${getStatusColor(pr.state)}`}>
                    {pr.state}
                  </span>
                </div>

                <div className="h-10 w-px dark:bg-neutral-800 bg-neutral-200 mx-2 hidden sm:block" />

                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">AI Analysis</span>
                  {analysis?.status === "pending" ? (
                    <span className="text-yellow-500 font-bold text-xs flex items-center gap-1.5 uppercase">
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce" />
                      Analyzing
                    </span>
                  ) : (
                    <span className="text-emerald-500 font-bold text-xs flex items-center gap-1.5 uppercase">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                      Completed
                    </span>
                  )}
                </div>
              </div>

              {/* Analysis Content */}
              {!analysis ? (
                <div className="p-12 text-center space-y-3 dark:bg-neutral-900/50 bg-neutral-50 rounded-2xl border border-dashed dark:border-neutral-800 border-neutral-200">
                  <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto">
                    <Bug className="w-6 h-6 text-neutral-400" />
                  </div>
                  <h3 className="text-sm font-semibold dark:text-white">No Analysis Available</h3>
                  <p className="text-xs text-neutral-500 max-w-[200px] mx-auto">
                    This pull request hasn't been analyzed yet or the analysis failed.
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Summary */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-bold text-sm uppercase tracking-tight">
                      <FileText className="w-4 h-4 text-blue-500" />
                      Summary
                    </div>
                    <div className="p-4 rounded-xl dark:bg-neutral-900/50 bg-neutral-50 border dark:border-neutral-800 border-neutral-200 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                      {analysis.summary || "No summary provided."}
                    </div>
                  </div>

                  {/* Suggestions */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-bold text-sm uppercase tracking-tight">
                      <Sparkles className="w-4 h-4 text-yellow-500" />
                      AI Suggestions
                    </div>
                    <div className="space-y-3">
                      {analysis.suggestions ? (
                        analysis.suggestions.split('\n').filter(s => s.trim()).map((suggestion, idx) => (
                          <div key={idx} className="flex gap-3 p-4 rounded-xl dark:bg-neutral-900/30 bg-white border dark:border-neutral-800 border-neutral-200 group hover:border-neutral-600 transition-colors">
                            <div className="w-6 h-6 rounded-full dark:bg-neutral-800 bg-neutral-100 flex items-center justify-center text-[10px] font-black text-neutral-500 shrink-0">
                              {idx + 1}
                            </div>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 pt-0.5">
                              {suggestion.replace(/^[*-]\s*/, '').trim()}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-xs text-neutral-500">No suggestions available.</div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Repo Details */}
              <div className="pt-6 border-t dark:border-neutral-800 border-neutral-100 space-y-4">
                <div className="flex items-center justify-between">
                   <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Repository</span>
                      <span className="text-sm font-semibold dark:text-white">{pr.repoName}</span>
                   </div>
                   <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Created</span>
                      <span className="text-sm font-semibold dark:text-white flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                        {new Date(pr.createdAt).toLocaleDateString()}
                      </span>
                   </div>
                </div>
                
                <a
                  href="#"
                  className="w-full py-3 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-black font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  View on GitHub
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
