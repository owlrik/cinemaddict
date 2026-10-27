const createFilmCardControlsTemplate = ({ watchlist, alreadyWatched, favorite }) => {
  const setControlState = (isActive) =>
    (isActive) ? 'film-card__controls-item film-card__controls-item--active' : 'film-card__controls-item';

  return `
    <div class="film-card__controls">
      <button class="${setControlState(watchlist)} film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="${setControlState(alreadyWatched)} film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="${setControlState(favorite)} film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  `;
};

export { createFilmCardControlsTemplate };
