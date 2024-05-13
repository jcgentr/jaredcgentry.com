export default function FavoritesPage() {
  return (
    <div className="prose prose-xl mx-auto p-10">
      <h1 className="text-2xl dark:text-white">Favorites</h1>
      <ul className="mt-10">
        <li>
          <a
            href="https://todoist.com"
            target="_blank"
            className="no-underline hover:underline dark:text-white"
          >
            Todoist
          </a>
        </li>
        <li>
          <a
            className="no-underline hover:underline dark:text-white"
            href="https://chatgpt.com"
            target="_blank"
          >
            ChatGPT
          </a>
        </li>
        <li>
          <a
            className="no-underline hover:underline dark:text-white"
            href="https://www.nytimes.com/games/wordle/index.html"
            target="_blank"
          >
            NYT Wordle
          </a>
        </li>
        <li>
          <a
            className="no-underline hover:underline dark:text-white"
            href="https://www.nytimes.com/crosswords/game/mini"
            target="_blank"
          >
            NYT Mini Crossword
          </a>
        </li>
        <li>
          <a
            className="no-underline hover:underline dark:text-white"
            href="https://www.nytimes.com/games/connections"
            target="_blank"
          >
            NYT Connections
          </a>
        </li>
        <li>
          <a
            className="no-underline hover:underline dark:text-white"
            href="https://track.toggl.com/timer"
            target="_blank"
          >
            Toggl
          </a>
        </li>
        <li>
          <a
            className="no-underline hover:underline dark:text-white"
            href="https://news.ycombinator.com"
            target="_blank"
          >
            Hackernews
          </a>
        </li>
        <li>
          <a
            className="no-underline hover:underline dark:text-white"
            href="https://www.reddit.com"
            target="_blank"
          >
            Reddit
          </a>
        </li>
      </ul>
    </div>
  );
}
