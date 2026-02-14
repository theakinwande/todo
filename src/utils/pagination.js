export function getPagesNumbers(totalPages, currentPage) {
  const pages = [];
  const maxVisible = 4;

  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, start + maxVisible - 1);

  if (end === totalPages) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
}
