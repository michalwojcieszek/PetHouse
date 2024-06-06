"use client";

import EmptyState from "@/components/EmptyState";
import { useEffect } from "react";

type ErrorStateProps = {
  error: Error;
};

const ErrorState = ({ error }: ErrorStateProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return <EmptyState title="uh oh" subtitle="Something went wrong!" />;
};
export default ErrorState;
