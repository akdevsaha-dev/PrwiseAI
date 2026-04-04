import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
export const getDashboardMetric = async (req: Request, res: Response) => {
  try {
    const { workspaceId } = req.params as { workspaceId: string };
    console.log("Fetching metrics for workspaceId:", workspaceId);

    const [totalPRs, openPRs, highRiskPRs, avgRisk, lastAnalysis, prs] =
      await Promise.all([
        prisma.pullRequest.count({
          where: {
            workspaceId,
          },
        }),

        prisma.pullRequest.count({
          where: {
            workspaceId,
            state: "open",
          },
        }),

        prisma.analysis.count({
          where: {
            pullRequest: {
              workspaceId,
            },
            bugRiskScore: {
              gte: 7,
            },
          },
        }),

        prisma.analysis.aggregate({
          where: {
            pullRequest: {
              workspaceId,
            },
          },
          _avg: {
            bugRiskScore: true,
          },
        }),

        prisma.analysis.findFirst({
          where: {
            pullRequest: {
              workspaceId,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        }),

        prisma.pullRequest.findMany({
          where: {
            workspaceId,
          },
          orderBy: {
            createdAt: "desc",
          },
          include: {
            analysis: {
              take: 1,
              orderBy: {
                createdAt: "desc",
              },
            },
          },
        }),
      ]);

    return res.status(200).json({
      metrics: {
        totalPRs,
        openPRs,
        highRiskPRs,
        avgRiskScore: avgRisk._avg.bugRiskScore,
        lastAnalysis: lastAnalysis?.createdAt,
      },
      prs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
