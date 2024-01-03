import { useRouteError } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";

export default function ErrorBoundaryContainer() {
  const error = useRouteError();
  return <ErrorBoundary error={error as Error} />;
}
