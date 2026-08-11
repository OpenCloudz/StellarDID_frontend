import type { DIDDocument, VerificationMethod, ServiceEndpoint } from "@/lib/types";
import { CopyButton } from "@/components/CopyButton";

interface DIDCardProps {
  document: DIDDocument | null;
}

// ── Sub-components (all server-renderable) ──────────────────────────────────

function SectionHeader({ title, count }: { title: string; count: number }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="font-syne font-semibold text-sm text-gray-700 dark:text-gray-300 uppercase tracking-wider">
        {title}
      </h3>
      <span className="text-xs font-mono text-gray-400 dark:text-gray-500">
        {count} {count === 1 ? "entry" : "entries"}
      </span>
    </div>
  );
}

function KeyValueRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-2">
      <span className="text-xs font-mono text-gray-400 dark:text-gray-500 shrink-0 w-32">
        {label}
      </span>
      <span className="text-xs font-mono text-gray-700 dark:text-gray-300 break-all">
        {value}
      </span>
    </div>
  );
}

function VerificationMethodItem({ method }: { method: VerificationMethod }) {
  return (
    <li className="rounded-md bg-gray-50 dark:bg-gray-800/50 p-3 space-y-1.5 border border-gray-100 dark:border-gray-700">
      <KeyValueRow label="id" value={method.id} />
      <KeyValueRow label="type" value={method.type} />
      <KeyValueRow label="controller" value={method.controller} />
      {method.publicKeyMultibase && (
        <KeyValueRow label="publicKeyMultibase" value={method.publicKeyMultibase} />
      )}
    </li>
  );
}

function ServiceItem({ endpoint }: { endpoint: ServiceEndpoint }) {
  return (
    <li className="rounded-md bg-gray-50 dark:bg-gray-800/50 p-3 space-y-1.5 border border-gray-100 dark:border-gray-700">
      <KeyValueRow label="id" value={endpoint.id} />
      <KeyValueRow label="type" value={endpoint.type} />
      <KeyValueRow label="serviceEndpoint" value={endpoint.serviceEndpoint} />
    </li>
  );
}

// ── Empty state ─────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-3 rounded-full bg-gray-100 dark:bg-gray-800 p-4">
        {/* Document-with-question-mark icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="size-8 text-gray-400 dark:text-gray-500"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
      </div>
      <p className="font-syne text-sm font-semibold text-gray-500 dark:text-gray-400">
        No DID Document found
      </p>
      <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
        This identifier has not been registered on-chain yet.
      </p>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

/**
 * Renders a full W3C DID Document in a readable, styled card.
 * Server component — clipboard interaction is delegated to CopyButton.
 */
export function DIDCard({ document }: DIDCardProps) {
  if (!document) {
    return (
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
        <EmptyState />
      </div>
    );
  }

  const verificationMethods = document.verificationMethod ?? [];
  const authMethods = document.authentication ?? [];
  const services = document.service ?? [];

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm divide-y divide-gray-100 dark:divide-gray-800">

      {/* ── Header ────────────────────────────────────────────────────── */}
      <div className="px-5 py-4">
        <h2 className="font-syne text-xl font-bold mb-3">DID Document</h2>
        <div className="flex items-start gap-2 flex-wrap">
          <span className="text-xs font-mono text-gray-400 dark:text-gray-500 mt-0.5 shrink-0">
            id
          </span>
          <span className="text-sm font-mono text-gray-800 dark:text-gray-100 break-all">
            {document.id}
          </span>
          <CopyButton value={document.id} label="Copy DID identifier" />
        </div>
      </div>

      {/* ── Verification Methods ───────────────────────────────────────── */}
      <details className="group px-5 py-4" open>
        <summary className="cursor-pointer list-none">
          <SectionHeader title="Verification Methods" count={verificationMethods.length} />
        </summary>
        <div className="mt-3">
          {verificationMethods.length === 0 ? (
            <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">
              No verification methods declared.
            </p>
          ) : (
            <ul className="space-y-2">
              {verificationMethods.map((method) => (
                <VerificationMethodItem key={method.id} method={method} />
              ))}
            </ul>
          )}
        </div>
      </details>

      {/* ── Authentication ─────────────────────────────────────────────── */}
      <details className="group px-5 py-4" open>
        <summary className="cursor-pointer list-none">
          <SectionHeader title="Authentication" count={authMethods.length} />
        </summary>
        <div className="mt-3">
          {authMethods.length === 0 ? (
            <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">
              No authentication methods declared.
            </p>
          ) : (
            <ul className="space-y-2">
              {authMethods.map((entry, i) => {
                if (typeof entry === "string") {
                  return (
                    <li
                      key={entry}
                      className="rounded-md bg-gray-50 dark:bg-gray-800/50 p-3 border border-gray-100 dark:border-gray-700"
                    >
                      <KeyValueRow label="ref" value={entry} />
                    </li>
                  );
                }
                return <VerificationMethodItem key={entry.id ?? i} method={entry} />;
              })}
            </ul>
          )}
        </div>
      </details>

      {/* ── Service Endpoints ──────────────────────────────────────────── */}
      <details className="group px-5 py-4" open>
        <summary className="cursor-pointer list-none">
          <SectionHeader title="Service Endpoints" count={services.length} />
        </summary>
        <div className="mt-3">
          {services.length === 0 ? (
            <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">
              No service endpoints declared.
            </p>
          ) : (
            <ul className="space-y-2">
              {services.map((svc) => (
                <ServiceItem key={svc.id} endpoint={svc} />
              ))}
            </ul>
          )}
        </div>
      </details>

    </div>
  );
}
