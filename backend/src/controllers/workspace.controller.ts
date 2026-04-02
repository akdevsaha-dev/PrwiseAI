import type { Request, Response } from "express";

import { prisma } from "../lib/prisma.js";

export const workspaceSetup = async (req: Request, res: Response) => {
  const session = req.session;
  const { workSpace_name, workSpace_Url } = req.body;

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const ownerId = session.user.id;
    const workspaceCount = await prisma.workspace.count({
      where: {
        ownerId,
      },
    });
    console.log(workspaceCount);
    const existing = await prisma.workspace.findFirst({
      where: {
        ownerId,
        name: workSpace_name,
      },
    });

    if (existing) {
      return res.status(409).json({
        error: "Workspace with this name already exists",
      });
    }

    const workspace = await prisma.workspace.create({
      data: {
        name: workSpace_name,
        slug: workSpace_Url,
        ownerId,
      },
    });
    console.log(workspace);
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3001";

    if (workspaceCount === 0) {
      return res.status(201).json({
        redirectURL: `${frontendUrl}/onboarding/github-install/${workspace.name}/${workspace.id}`,
      });
    } else {
      return res.status(201).json({
        redirectURL: `${frontendUrl}/dashboard/${workspace.name}/${workspace.id}`,
      });
    }
  } catch (error) {
    console.error("Error creating workspace", error);
    return res.status(500).json({
      error: "Failed to create workspace",
    });
  }
};
