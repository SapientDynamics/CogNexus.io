"use client";

import React from "react";
import AuthShell from "./AuthShell";

export default function AuthPage() {
  // Thin wrapper around the canonical Forge auth experience.
  // The actual UI lives in AuthShell (client component) and honors
  // query params like ?mode=signin|signup for deep linking.
  return <AuthShell />;
}
