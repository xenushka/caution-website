---
layout: post
title: Introducing Generalized Verifiable Compute
date: 2025-09-29
---

What if the software running your systems isn't what you think? And if you had to prove what software is on a system, how would you do it?

Most of today’s technologies are black boxes. From firmware and operating systems to compilers and cloud platforms, opacity is the default. Users can send requests to an API or server, but they cannot verify what software, or whose software, they are really interacting with. The issue impacts organizations internally as well, where system managers can't verify whether the code they think they deployed is actually what's running on the server. This is not just a usability issue it is a systemic design failure and the result is software stacks riddled with blind spots, where compromise can occur at any stage and remain invisible.

After many years of working with high risk clients and analayzing different technologies, our team has concluded the pieces needed for verifiable systems already exist, but they are underutilized because they are misunderstood and difficult to use - a problem we needed to solve.

Reproducible builds, secure enclaves, and cryptographic remote attestation each solve part of the problem. Taken together, they form the building blocks for **verifiable compute**, which allows software to be verified. Our work is focused on creating the next generation of cloud hosting platform centered around verifiability and elimination of single points of failure present in current market solutions.

Like “zero trust” before it, the term verifiable compute is already being hijacked by marketing teams. Companies throw it around to describe partial solutions — usually just proving a binary hash hasn’t changed. We take a stricter view: verifiable compute means the entire supply chain can be checked. Anything less is **not** verifiable compute.

## The Real-World Risk of Unverifiability

The risks of unverifiable systems are not theoretical — they’ve already caused some of the most damaging security incidents of the past decade.

SolarWinds (2020) showed how a compromised software supply chain can cascade globally. Attackers injected malicious code into SolarWinds’ Orion updates, which were then shipped to thousands of companies and U.S. government agencies. Because customers had no way to verify what software they were actually running, the backdoor spread silently through trusted update channels.

This is one of the many breaches which demonstrate that without verifiability across the entire stack, organizations have no reliable way to prove the integrity of the systems they depend on.

## What True Verifiability Requires: The Building Blocks

Our team established that three key technologies are essential for making software verifiable end-to-end:

- Reproducible builds

Reproducible builds eliminate certain categories of supply chain attacks and would have prevented incidents like Solar Winds. It allows for integrity verification, without which software is opaque and difficult to verify.

- Secure enclaves

Hardware-isolated execution (e.g., IOMMU-backed enclaves) prevents external processes — even privileged ones — from tampering with sensitive workloads. Enclaves give us strong isolation, but isolation alone doesn’t prove what is running.

- Remote attestation

Remote hardware attestation (TPM2, Intel TDX, AMD SEV, AWS Nitro, and others) measure the state of a machine and provide cryptographic proof of what software is running. Attestation anchors trust at the hardware layer, but on its own it doesn’t guarantee the software’s provenance or build integrity.

Taken together, these three technologies form the foundation of true verifiable compute: the ability to verify the integrity of software from the toolchain it’s built with to the hardware it runs on.

## Why Existing Platforms Fall Short

Current offerings from the major cloud providers — AWS, Azure, and GCP — are demanding in terms of both expertise and time to set up. They also lock users into a single vendor’s ecosystem and force reliance and trust in one type of hardware or firmware. For example, AWS requires implicit trust in its proprietary Nitro Card, a black-box technology that customers cannot independently verify.

Other companies, such as Tinfoil, Turnkey, and Privy, offer wrappers around enclave and attestation technologies, but their solutions are limited to narrow use cases like digital asset wallets or running LLMs. Even then, what they provide is only surface verification: proving that a binary’s hash hasn’t changed. That does not give transparency into the entirety of what is running on the server.

In short: these are “partially verifiable, but still mostly black-box” solutions. They fall far short of end-to-end verifiability, and risk diluting the very meaning of the term “verifiable compute.”

## “Cautiously” Building the Next Generation of Verifiable Compute

Our team has chosen a no-compromise approach to solving this problem:

- Fully open source. Every component we build is transparent and verifiable.

- Deterministic from the ground up. All software in our stack is full-source bootstrapped and reproducible.

- Portable across environments. Deployable on any major cloud, bare metal, or self-hosted environment.

- Resilient by design. We use multiple hardware attestations per server to distribute risk and eliminate reliance on a single vendor.

This approach didn’t emerge overnight. We kept running into the same problems over and over again — whether working with high-risk clients or just pulling apart existing cloud platforms. Everything boiled down to the same pattern: black-box infrastructure, half-measures passed off as “verification,” and single points of failure you couldn’t design around.

At some point it clicked. The primitives — reproducible builds, enclaves, attestation — already existed. What didn’t exist was a way to actually use them without an army of engineers and months of duct-taping. That’s when we decided to build it ourselves. That’s how Caution was born.

We’ve already laid the foundation. StageX is the first LLVM-based, bootstrapped, and fully deterministic Linux distribution, and EnclaveOS is nearing completion as a portable OS for deploying verifiable compute across clouds and bare metal, levarging multi-hardware attestation. The next step is the hosting platform — designed to deliver unprecedented transparency and resilience. Unlike today’s hyperscalers, our architecture eliminates single points of failure, including the root-admin model that makes existing platforms inherently untrustworthy.

We believe this marks the beginning of a new era of infrastructure: verifiable, open, and resilient by default.

## Closing Thoughts

Vitalik is right: verifiability is critical for the future. To get there, we must be precise about definitions, uncompromising in execution, and provide easy to use tooling to leverage concrete technical controls. Verifiable compute is the new foundation for infrastructure.

At Caution, we’re building that foundation. If you’re interested in collaborating, contributing, or investing, we’d love to talk.
