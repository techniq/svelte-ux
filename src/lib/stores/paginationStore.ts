import { writable } from 'svelte/store';

export type PaginationProps = {
  page?: number;
  perPage?: number;
  total?: number;
};
export default function paginationStore(props?: PaginationProps) {
  const page = props?.page ?? 1;
  const perPage = props?.perPage ?? 25;
  const total = props?.total ?? 0;

  const state = writable(createState(page, perPage, total));

  return {
    subscribe: state.subscribe,
    nextPage() {
      state.update((state) => createState(state.page + 1, state.perPage, state.total));
    },
    prevPage() {
      state.update((state) => createState(state.page - 1, state.perPage, state.total));
    },
    firstPage() {
      state.update((state) => createState(1, state.perPage, state.total));
    },
    lastPage() {
      state.update((state) =>
        createState(Math.ceil(state.total / state.perPage), state.perPage, state.total)
      );
    },
    setPage(page: number) {
      state.update((state) => createState(page, state.perPage, state.total));
    },
    setPerPage(perPage: number) {
      state.update((state) => createState(state.page, perPage, state.total));
    },
    setTotal(total: number) {
      state.update((state) => createState(state.page, state.perPage, total));
    },
  };
}

function createState(page: number, perPage: number, total: number) {
  const totalPages = Math.ceil(total / perPage);

  return {
    page,
    perPage,
    total,
    from: (page - 1) * perPage + 1,
    to: Math.min(total, page * perPage),

    totalPages,
    isFirst: page === 1,
    isLast: page === totalPages || totalPages === 0,
    hasPrevious: totalPages > 1 && page > 1,
    hasNext: page < totalPages,

    slice(items: any[]) {
      return items.slice((page - 1) * perPage, page * perPage);
    },
  };
}
