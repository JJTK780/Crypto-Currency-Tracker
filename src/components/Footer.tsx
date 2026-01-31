export default function Footer() {
  return (
    <footer className="py-4 mt-auto text-sm text-center border-t text-gray-500 border-gray-200 dark:text-gray-400 dark:border-gray-800">
      <p className="mx-2">
        Trackibit © {new Date().getFullYear()}{" "}
        <a href="https://github.com/JJTK780" target="_blank" rel="author">
          Jefson
        </a>{" "}
        &{" "}
        <a href="https://github.com/drupathmm" target="_blank" rel="author">
          Drupath
        </a>
      </p>
    </footer>
  );
}
