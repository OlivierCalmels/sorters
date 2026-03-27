import { Link } from "react-router-dom";
import { SORT_MODES } from "../data/sortModes";

export function HomePage() {
  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Visualisation · Tri · Arc-en-ciel</p>
        <h1 className="page-title">Sorters</h1>
        <p className="page-lead">
          Choisissez un algorithme pour voir une explication courte et une animation
          de barres colorées (chaque couleur correspond à une valeur). À la fin du tri,
          le spectre est ordonné de gauche à droite.
        </p>
      </header>

      <ul className="mode-grid">
        {SORT_MODES.map((mode) => (
          <li key={mode.id}>
            <Link className="mode-card" to={`/tri/${mode.id}`}>
              <span className="mode-card__title">{mode.title}</span>
              <span className="mode-card__desc">{mode.shortDescription}</span>
              <span className="mode-card__cta">Voir le mode →</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
