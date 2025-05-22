---
layout: post
title: The Safe{Wallet}/Bybit incident report and mitigation strategies
date: 2025-04-02
---

The Safe{Wallet}/Bybit incident is an example of a nation-state actor executing a series of sophisticated, multi-layered attacks on high-value targets. In cases where the potential gain is significant, all attacks are on the table. It may be justified for attackers to invest in multiple 0-day vulnerabilities and chain them into elaborate exploit sequences. These campaigns often span multiple layers of tech stack, involve precision-targeted social engineering, insider compromise, or even physical infiltration.

As such, defending against this level of adversary requires a threat model that accounts for their full range of capabilities—and guides the design of equally rigorous mitigations. It demands defenders adopt a much more rigorous set of assumptions about attacker's capabilities and invest time in implementing controls that typical organizations may not need. When protecting high value assets, the game changes.

### Threat model assumptions

At Distrust, we operate under the assumption that nation-state actors are persistent, highly resourced, and capable of compromising nearly any layer of the system. Accordingly, our threat model assumes:

* All screens are visible to the adversary
* All keyboard input is being logged by the adversary
* Any firmware or bootloader not verified on every boot is considered compromised
* Any host OS with network access is compromised
* Any guest OS used for non-production purposes is compromised
* At least one member of the Production Team is compromised
* At least one maintainer of third party code used in the system is compromised
* At least one member of third party system used in production is compromised
* Physical attacks are viable and likely
* Side-channel attacks are viable and likely

These assumptions drive everything at Distrust, including the strategies and tooling outlined in this report. The strategies we've developed are built specifically to address this elevated threat model. Many of our open source tools are ready to use today, some are reference designs, while other tooling requires further development.

### Summary

This report identifies critical single points of failure—cases where trust is placed in a single individual or computer—creating opportunities for compromise. In contrast, blockchains offer stronger security properties through cryptography and decentralized trust models.

Traditional infrastructure has historically lacked mechanisms to distribute trust, but this limitation can be addressed. By applying targeted design strategies, it's possible to distribute trust (**dis**trust, get it?) across systems and reduce the risk of a single compromised actor undermining the integrity of the entire system.

---

## Root cause analysis and mitigation strategies

In our opinion, the primary causes of this incident stem from two key issues identified in the <a href="http://web.archive.org/web/20250328121908/https://www.sygnia.co/blog/sygnia-investigation-bybit-hack/" rel="noopener noreferrer" target="_blank">Sygnia report</a>.

* > ... a developer’s Mac OS workstation was compromised, likely through social engineering.

* > ... the modification of JavaScript resources directly on the S3 bucket serving the domain app.safe[.]global.

These findings highlight both endpoint compromise and weak controls around cloud infrastructure. The following sections focus on how such risks could be mitigated through architectural decisions and more rigorous threat modeling.

## Introduction

The compromise occurred due to several key factors, already documented in other reports. This report focuses on how the incident **could have been prevented** through a stronger, first-principles approach to infrastructure design.

While many security teams reach for quick wins—like access token rotation, stricter IAM policies, or improved monitoring—these are often reactive measures. They may help, but they're equivalent of "plugging holes on a sinking ship" rather than rebuilding the hull from stronger material.

For example, improving access control to the S3 bucket used to serve JavaScript resources, or adding better monitoring, are good steps. However, they  don't address the root cause.

> At the core of this breach lies a recurring theme: single points of failure.

To explore this from first principles, consider the deployment pipeline. In most companies, one individual—an admin or developer—often has the ability to modify critical infrastructure or code. That person becomes a single point of failure.

Even if the pipeline is hardened, the risk will shift, rather than disappear. There is almost always one super-admin who has the "keys to the kingdom". Most cloud platforms encourage this pattern, and the industry has come to accept it.

But this isn't about doubting your team and their intentions—it's about designing systems where **trust is distributed**. In the blockchain space, this is already accepted practice. So the question becomes:

> *Does it make sense for a single individual to hold the integrity of an entire system in their hands?*

Those who've worked with decentralized systems would say: absolutely not.

#### Mitigation principles

To adequately defend against the risks outlined in the Distrust threat model, it is critical to distinguish between **cold** and **hot** wallets. The following principles are drawn from practical experience building secure systems at BitGo, Unit410, and Turnkey, as well as from diligence work conduced across leading custodial and vaulting solutions.

* A **cold cryptographic key management system** is one where all components can be built, operated, and verified offline. If any part of the system requires trusting a networked component, it becomes a **hot** system by definition. For example, if a wallet relies on internet-connected components, it should be considered a hot wallet—regardless of how it's marketed. While some systems make trade-offs for user experience, these often come at the cost of security guarantees.

* Cold cryptographic key management systems that leverage truly random entropy sources are **not susceptible to remote attacks**, and are only exposed to localized threats such as physical access or side-channel attacks.

* A common misconception is that simply keeping a key offline makes a system cold and secure. But an attacker doesn't always need to steal the key—they just need to achieve the outcome where the key performs an operation on the desired data on their behalf.

* **All software in the stack must be open source**, built deterministically (to support reproduction), and compiled using a fully bootstrapped toolchain. Otherwise, the system remains exposed to single points of failure, especially via supply chain compromise.

#### Mitigations and reference designs

We propose two high-level design strategies that can eliminate the types of vulnerabilities exploited in the Safe{Wallet}/Bybit attack. Both approaches offer similar levels of security assurance—but differ significantly in implementation complexity and effort.

In our view, **when billions of dollars are at stake**, it is worth investing in proven low-level mitigations, even if they are operationally harder to deploy. The accounting is simple: **invest in securing your system up front**, rather than gambling on assumptions you won't be targeted.

State funded actors are highly motivated—and when digital assets are involved, it's game theory at work. The cost of compromising a weak system is often far less than the potential gain.

We've seen this playbook used in previous incidents, a major example being Axie Infinity, and we will see it again. Attackers are increasingly exploiting supply chains and single points of failure—while defenders often under-invest in securing this surface area.

#### Strategy 1 - Run everything locally

This strategy can be implemented without major adjustments to the existing system. The goal is to move the component currently introducing risk—effectively making the wallet "hot"—into an offline component, upgrading the system to a fully cold solution.

The idea centers on extracting the **signing** component from the application (which currently operates in the UI) and converting it into an offline application.

However, simply making a component offline does not eliminate all single points of failure. To close off supply chain threats stemming from compiler, dependency or environment compromise requires that the application is reproduced on multiple diverse systems (using different chipsets and operating systems), using a fully bootstrapped compiler—a fully hermetic, deterministic and reproducible process.

We've developed open source tooling for this under <a href="https://codeberg.org/stagex/stagex" target="_blank" rel="noopener noreferrer">StageX</a>. To learn more about the importance of reproducible builds, check out <a href="https://antonlivaja.com/videos/2024-incyber-stagex-talk.mp4" target="_blank" rel="noopener noreferrer">this video</a>, where one of our co-founders explains how the SolarWinds incident unfolded—and how it could have been prevented.

##### Reference design

This reference design was developed for the Safe{Wallet} team, but it can be applied to any system seeking to distribute trust.

1. **System administrators use dedicated offline laptops**

	* All radio hardware (Bluetooth, Wi-Fi) is physically removed

	* Machines are air-gapped and have never been connected to the internet

2. **Engineers provision and manage their own personal signing keys (PGP)**

	* Smart cards like NitroKey or YubiKey are used

	* Signing operations are performed exclusively on the engineer's offline system

	* Distrust has developed open source tooling to drastically simplify PGP key provisioning: <a href="https://trove.distrust.co/generated-documents/all-levels/pgp-key-provisioning.html" target="_blank" rel="noopener noreferrer">Trove</a>

3. **Offline signing applications are deterministically compiled, verified, and signed by multiple engineers**

	* Includes a full set of tools needed for secure offline key operations

	* Distrust also created <a href="https://git.distrust.co/public/airgap" target="_blank" rel="noopener noreferrer">AirgapOS</a>, a custom Linux distribution designed specifically for offline secret management. It has been independently audited and is used in production by several major digitial asset organizations.

4. **All sensitive operations are fully verified offline before any cryptographic action is taken**

This design drastically reduces exposure to remote attacks and central points of trust, aligning closely with Distrust's first-principles security model.

#### Strategy 2 - Use remotely verified service

This strategy maintains a user experience nearly identical to the current system, while introducing verifiability at critical points in the architecture. It requires significantly more engineering effort and operational discipline, and the tooling needed to support this model is still under active development.

##### Reference design

This design relies on **secure enclaves** to host servers that are immutable, deterministic, and capable of cryptographically attesting to the software they are running. While this brings us closer to a cold setup, some residual attack surface—such as browser exploits, host OS compromise, or 0-day attacks—will always remain.

The core implementation steps are:

1. **Rewrite the application to run entirely within a secure enclave**

	* TLS termination occurs **inside** the enclave

	* The web interface is served **from within** the enclave

	* Nothing outside the enclave is trusted

2. **Create a deterministic OS image with remote attestation (e.g., TPM2, Nitro Enclave or similar)**

	* The entire stack is built using full source bootstrapped compiler in a bit-for-bit reproducible manner

3. **One engineer deploys a new enclave** with the updated application code

4. **A second engineer independently verifies** that the deployed code matches the version in the source repository

5. **Clients are issued a service worker** on first load that pins attestation keys for all future remote verification

	* Users can optionally verify and download the application locally for offline operations

	* Users are also encouraged to self-build and match the published signed hash


## Implementation considerations

Implementing these strategies can be technically demanding. They represent two ends of the trust minimization spectrum: one favoring offline, air-gapped assurance; the other introducing verifiability within connected systems. Both approaches significantly reduce risk but vary in complexity, tooling and requirements, and rollout timelines.

This high-level overview is meant to illustrate the kinds of problems we focus on at Distrust. Depending on the chosen strategy and organizational context, implementation can take anywhere from a few weeks to several years, especially as tooling continues to mature.

