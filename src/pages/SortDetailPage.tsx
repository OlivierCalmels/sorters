import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { SORT_ITEM_COUNT } from "../config/sortConfig";
import { getSortMode } from "../data/sortModes";
import { rangeOneTo, shuffle } from "../lib/arrayUtils";
import { formatElapsed } from "../lib/formatTime";
import { SortVisualizer } from "../components/SortVisualizer";

const STEP_DELAY_MIN = 2;
const STEP_DELAY_MAX = 120;
const STEP_DELAY_DEFAULT = 12;

type SortStatus = "idle" | "running" | "done";

export function SortDetailPage() {
  const { modeId } = useParams<{ modeId: string }>();
  const mode = modeId ? getSortMode(modeId) : undefined;

  const [initialOrder, setInitialOrder] = useState(() =>
    shuffle(rangeOneTo(SORT_ITEM_COUNT))
  );
  const [stepIndex, setStepIndex] = useState(0);
  const [status, setStatus] = useState<SortStatus>("idle");
  const [displayMs, setDisplayMs] = useState(0);
  const [stepDelayMs, setStepDelayMs] = useState(STEP_DELAY_DEFAULT);

  const startTimeRef = useRef<number | null>(null);
  const skipModeResetOnce = useRef(true);

  const steps = useMemo(() => {
    if (!mode) {
      return [];
    }
    return mode.buildSteps(initialOrder);
  }, [mode, initialOrder]);

  const currentValues = steps[stepIndex] ?? initialOrder;

  useEffect(() => {
    if (skipModeResetOnce.current) {
      skipModeResetOnce.current = false;
      return;
    }
    setInitialOrder(shuffle(rangeOneTo(SORT_ITEM_COUNT)));
    setStepIndex(0);
    setStatus("idle");
    setDisplayMs(0);
    startTimeRef.current = null;
  }, [modeId]);

  useEffect(() => {
    if (status !== "running") {
      return;
    }
    let rafId = 0;
    let cancelled = false;
    const loop = () => {
      if (cancelled) {
        return;
      }
      if (startTimeRef.current != null) {
        setDisplayMs(performance.now() - startTimeRef.current);
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, [status]);

  useEffect(() => {
    if (status !== "running") {
      return;
    }
    if (stepIndex >= steps.length - 1) {
      setStatus("done");
      if (startTimeRef.current != null) {
        setDisplayMs(performance.now() - startTimeRef.current);
      }
      return;
    }
    const t = window.setTimeout(() => {
      setStepIndex((i) => i + 1);
    }, stepDelayMs);
    return () => window.clearTimeout(t);
  }, [status, stepIndex, steps.length, stepDelayMs]);

  const handleStart = useCallback(() => {
    if (status === "running" || status === "done") {
      return;
    }
    startTimeRef.current = performance.now();
    setDisplayMs(0);
    setStatus("running");
  }, [status]);

  const handleStop = useCallback(() => {
    if (status !== "running") {
      return;
    }
    setStatus("idle");
  }, [status]);

  const handleReset = useCallback(() => {
    setInitialOrder(shuffle(rangeOneTo(SORT_ITEM_COUNT)));
    setStepIndex(0);
    setStatus("idle");
    setDisplayMs(0);
    startTimeRef.current = null;
  }, []);

  if (!mode) {
    return <Navigate to="/" replace />;
  }

  const progressLabel =
    steps.length > 0
      ? `Étape ${stepIndex + 1} / ${steps.length}`
      : "Étape —";

  return (
    <div className="page">
      <header className="page-toolbar">
        <Link className="link-back" to="/">
          ← Accueil
        </Link>
      </header>

      <article className="detail">
        <h1 className="page-title">{mode.title}</h1>
        <p className="detail__body">{mode.detail}</p>
        <p className="detail__doc">
          Plus d’algorithmes décrits dans le dépôt :{" "}
          <code className="inline-code">docs/modes-de-tri.md</code>.
        </p>

        <div className="controls">
          <div className="controls__row controls__row--actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={handleStart}
              disabled={status === "running" || status === "done"}
            >
              Lancer le tri
            </button>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={handleStop}
              disabled={status !== "running"}
            >
              Arrêter
            </button>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={handleReset}
              disabled={status === "running"}
            >
              Nouveau mélange
            </button>
          </div>
          <div className="controls__row controls__row--meta">
            <span className="chrono" aria-live="polite">
              Temps : <strong>{formatElapsed(displayMs)}</strong>
            </span>
            <span className="progress">{progressLabel}</span>
          </div>
          <label className="speed">
            <span>Vitesse des étapes</span>
            <input
              type="range"
              min={STEP_DELAY_MIN}
              max={STEP_DELAY_MAX}
              value={stepDelayMs}
              onChange={(e) => setStepDelayMs(Number(e.target.value))}
              disabled={status === "running"}
            />
            <span className="speed__hint">
              {stepDelayMs} ms — plus bas = plus rapide
            </span>
          </label>
        </div>

        <SortVisualizer values={currentValues} count={SORT_ITEM_COUNT} />
      </article>
    </div>
  );
}
