#  DB-Race: Redis vs MongoDB Performance Benchmarking

An automated performance benchmarking tool designed to measure, compare, and analyze the read/write efficiency, throughput, and latency profiles of **Redis (In-Memory)** and **MongoDB (Disk-Based/Document)** under various stress levels and payload sizes.

---

##  Overview

In modern architecture, choosing the right database is all about balancing speed, structural complexity, and data persistence. **DB-Race** puts Redis and MongoDB side-by-side in a controlled environment to simulate real-world read/write operations. 

This project benchmarks operations across parameters like:
*   **Sequential vs Concurrent Requests**
*   **Varying Payload Sizes** (Small metadata vs Large JSON blocks)
*   **Read vs Write Heavy Workloads**
*   **Connection Pooling & Pipeline efficiency**

---

## Tech Stack & Prerequisites

*   **Runtime:** Node.js (v18+ recommended)
*   **Databases:** 
    *   Redis (v7.x or cloud instance)
    *   MongoDB (v6.x / v7.x or Atlas URI)
*   

---

### Performance Breakdown

| Database System | Write Speed (Relative) | Read Speed (Relative) | Core Storage Architecture |
| :--- | :--- | :--- | :--- |
| **Redis** |  **3x Faster** | **25x Faster** |  RAM Lookup |
| **MongoDB** | Baseline (1x) | Baseline (1x) | WiredTiger Cache + SSD Persistence |

---


1. **Why the write difference is only ~3x:** MongoDB uses write-ahead logging (journaling) and holds active writes in a memory buffer before syncing to disk blocks in background cycles, masking traditional disk latency during short, aggressive bursts.
2. **Why the read difference is a staggering ~25x:** Reads from SSDs, even on highly indexed collections, involve hardware bus overhead, block address translations, and document structure mapping. Redis eliminates this entirely by keeping native data structures directly addressable in high-speed system RAM.

