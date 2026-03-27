import { motion } from "framer-motion";
import { SORT_ITEM_COUNT } from "../config/sortConfig";
import { rainbowColor } from "../lib/rainbowColor";

interface SortVisualizerProps {
  values: number[];
  count?: number;
}

export function SortVisualizer({
  values,
  count = SORT_ITEM_COUNT,
}: SortVisualizerProps) {
  return (
    <div className="sort-visualizer" role="img" aria-label="État du tableau trié">
      <div className="sort-visualizer__inner">
        <div className="sort-visualizer__bars">
          {values.map((value) => (
            <motion.div
              key={value}
              className="sort-visualizer__bar"
              layout
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
              style={{
                flex: "1 1 0",
                minWidth: 0,
                height: `${(value / count) * 100}%`,
                backgroundColor: rainbowColor(value, count),
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
