interface HeaderType {
  title: string;
  value: string;
  main: boolean;
  sortable: boolean;
  sort?: string;
};

interface SortableHeaderType {
  name: string;
  label: string;
  sort: string|string[];
  search: string|string[];
  width: number;
  formatter?: string;
}

const TRIDENT_TABLE_HEADERS: SortableHeaderType[] = [
  {
      name: 'title',
      label: 'Title',
      sort: ['title'],
      search: ['title'],
      width: 10,
  },
  {
      name: 'description',
      label: 'Description',
      sort: ['description'],
      search: ['description'],
      width: 10
  },
  {
      name: 'ip',
      label: 'IP',
      sort: ['ip'],
      search: ['ip'],
      width: 10
  },
  {
    name: 'healthCheck',
    label: 'Health Check',
    sort: ['healthCheck'],
    search: ['healthCheck'],
    width: 10
  },
  {
    name: 'repoBranch',
    label: 'Repo Branch',
    sort: ['repoBranch'],
    search: ['repoBranch'],
    width: 10
  },
  {
    name: 'rancher',
    label: 'Rancher',
    sort: ['rancher'],
    search: ['rancher'],
    width: 10
  },
];

const WIKI_TABLE_HEADERS: SortableHeaderType[] = [
  {
      name: 'title',
      label: 'Title',
      sort: ['title'],
      search: ['title'],
      width: 10,
  },
  {
      name: 'url',
      label: 'URL',
      sort: ['url'],
      search: ['url'],
      width: 10
  },
];

const DEV_TOOLS_TABLE_HEADERS: SortableHeaderType[] = [
  {
      name: 'title',
      label: 'Title',
      sort: ['title'],
      search: ['title'],
      width: 10,
  },
  {
      name: 'dev2url',
      label: 'Dev2 URL',
      sort: ['dev2url'],
      search: ['dev2url'],
      width: 10
  },
  {
      name: 'int0url',
      label: 'Int0 URL',
      sort: ['int0url'],
      search: ['int0url'],
      width: 10
  },
  {
      name: 'prodUrl',
      label: 'Prod URL',
      sort: ['prodUrl'],
      search: ['prodUrl'],
      width: 10
  },
];


export { TRIDENT_TABLE_HEADERS, WIKI_TABLE_HEADERS, DEV_TOOLS_TABLE_HEADERS }