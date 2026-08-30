"use client";

import { lazy } from "react";

export default lazy(() =>
  import("@/components/global/error.view").then((module) => ({
    default: module.ErrorView,
  })),
);
