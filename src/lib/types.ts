/*
 * Author: RawNuke
 * Copyright (c) 2026 RawNuke. All rights reserved.
 */

export type Network = 'testnet' | 'mainnet';

/** A single cryptographic key linked to a DID. */
export interface VerificationMethod {
  id: string;
  type: string;
  controller: string;
  publicKeyMultibase?: string;
  publicKeyJwk?: Record<string, string>;
}

/** A service endpoint advertised in a DID Document. */
export interface ServiceEndpoint {
  id: string;
  type: string;
  serviceEndpoint: string;
}

/** A W3C-compliant DID Document resolved from the registry. */
export interface DIDDocument {
  id: string;
  /** The JSON-LD context. A single URL or an array of URLs. */
  '@context': string | string[];
  verificationMethod: VerificationMethod[];
  /** Each entry is either a key id string or a full VerificationMethod object. */
  authentication: (string | VerificationMethod)[];
  service: ServiceEndpoint[];
}

/** The lifecycle status of a verifiable credential. */
export type CredentialStatus = 'active' | 'revoked' | 'expired' | 'pending';

/** A verifiable credential issued to a subject. */
export interface Credential {
  id: string;
  type: string[];
  issuer: string;
  subject: string;
  issuanceDate: string;
  expirationDate?: string;
  credentialSubject: Record<string, unknown>;
  status: CredentialStatus;
}

/** A function that signs a Stellar transaction envelope (XDR). */
export type SignFn = (xdr: string) => Promise<string>;
