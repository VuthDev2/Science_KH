// ==============================================================================
// ScienceKH — Enterprise Multi-Worker Cluster Load Balancer
// Powered by Node.js native cluster module. Distributes incoming traffic across
// CPU cores using OS-level kernel socket load balancing (Round-Robin), backed by
// Redis for synchronized rate-limiting, session-free JWTs, and shared caching.
// ==============================================================================

import cluster, { type Worker } from "node:cluster";
import os from "node:os";
import process from "node:process";
import { fileURLToPath } from "node:url";

const numCPUs = os.cpus().length;

// Worker concurrency: Defaults to CPU count (capped at 4 in development for optimal resource usage)
const DEFAULT_WORKER_COUNT =
  process.env.NODE_ENV === "production"
    ? Math.max(2, numCPUs)
    : Math.min(4, Math.max(2, numCPUs));

const targetWorkers =
  Number(process.env.WEB_CONCURRENCY || process.env.WORKERS) || DEFAULT_WORKER_COUNT;

if (cluster.isPrimary) {
  console.log("==================================================================");
  console.log("  🚀 ScienceKH High-Availability Cluster Load Balancer");
  console.log("==================================================================");
  console.log(`  👑 Primary Master PID   : ${process.pid}`);
  console.log(`  💻 System CPU Cores    : ${numCPUs}`);
  console.log(`  ⚙️  Configured Workers  : ${targetWorkers}`);
  console.log(`  🌐 Shared Port         : ${process.env.PORT || 5001}`);
  console.log(`  🔄 Load Balancing Mode : Round-Robin Kernel Socket Sharing`);
  console.log("==================================================================\n");

  const workers = new Map<number, Worker>();
  let isShuttingDown = false;

  // Fork initial workers
  for (let i = 0; i < targetWorkers; i++) {
    const worker = cluster.fork({ WORKER_INDEX: String(i + 1) });
    if (worker.process.pid) {
      workers.set(worker.process.pid, worker);
    }
  }

  // Handle worker lifecycle events
  cluster.on("online", (worker) => {
    console.log(`🟢 [Cluster] Worker #${worker.id} (PID ${worker.process.pid}) is online and accepting connections.`);
  });

  cluster.on("exit", (worker, code, signal) => {
    workers.delete(worker.process.pid!);

    if (isShuttingDown) {
      console.log(`⚪ [Cluster] Worker #${worker.id} (PID ${worker.process.pid}) stopped gracefully.`);
      if (workers.size === 0) {
        console.log("🏁 [Cluster] All workers exited. Primary master process shutting down.");
        process.exit(0);
      }
      return;
    }

    console.warn(
      `⚠️ [Cluster] Worker #${worker.id} (PID ${worker.process.pid}) crashed or exited (Code: ${code}, Signal: ${signal}).`,
    );

    // Auto-revive worker with backoff protection
    console.log("🔄 [Cluster] Spawning replacement worker to maintain pool capacity...");
    setTimeout(() => {
      if (!isShuttingDown) {
        const replacement = cluster.fork();
        if (replacement.process.pid) {
          workers.set(replacement.process.pid, replacement);
        }
      }
    }, 1000);
  });

  // Zero-downtime rolling restart on SIGHUP
  process.on("SIGHUP", () => {
    console.log("🔄 [Cluster] SIGHUP received: Initiating zero-downtime rolling restart of all workers...");
    const currentWorkers = Array.from(workers.values());

    const restartNext = (index: number) => {
      if (index >= currentWorkers.length) {
        console.log("✅ [Cluster] Rolling restart completed successfully.");
        return;
      }

      const oldWorker = currentWorkers[index];
      console.log(`🔄 [Cluster] Restarting Worker #${oldWorker.id} (PID ${oldWorker.process.pid})...`);

      const newWorker = cluster.fork();
      newWorker.on("listening", () => {
        oldWorker.kill("SIGTERM");
        setTimeout(() => restartNext(index + 1), 500);
      });
    };

    restartNext(0);
  });

  // Graceful shutdown forwarding
  const handleShutdown = (signal: string) => {
    if (isShuttingDown) return;
    isShuttingDown = true;
    console.log(`\n🛑 [Cluster] Primary received ${signal}. Forwarding shutdown signal to ${workers.size} workers...`);

    for (const worker of workers.values()) {
      worker.kill("SIGTERM");
    }

    // Force exit if workers don't stop within 10 seconds
    setTimeout(() => {
      console.error("⚠️ [Cluster] Workers took too long to shutdown. Forcing exit.");
      process.exit(1);
    }, 10000).unref();
  };

  process.on("SIGTERM", () => handleShutdown("SIGTERM"));
  process.on("SIGINT", () => handleShutdown("SIGINT"));
} else {
  // Worker Process: Loads the Express application and listens on the shared port
  import("./index.js").catch((err) => {
    console.error(`💥 [Cluster] Worker PID ${process.pid} failed to initialize application:`, err);
    process.exit(1);
  });
}
