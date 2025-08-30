// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ensureValidAccessToken } from "../lib/auth";

export default function ProtectedRoute({ children }) {
  const [allowed, setAllowed] = useState(null);
  const location = useLocation();

  useEffect(() => {
    let alive = true;
    (async () => {
      const ok = await ensureValidAccessToken();
      if (alive) setAllowed(ok);
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (allowed === null) return null; // μικρό skeleton/blank όσο ελέγχουμε

  if (!allowed) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ returnTo: location.pathname + location.search }}
      />
    );
  }

  return children;
}
