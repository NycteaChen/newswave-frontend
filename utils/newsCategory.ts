const newsCategoryList = [
  {
    name: '國際',
    value: 'internationality',
    color: '#5db0c4'
  },
  {
    name: '社會',
    value: 'society',
    color: '#f8b82d'
  },
  {
    name: '科技',
    value: 'tech',
    color: '#003c70'
  },
  {
    name: '財經',
    value: 'finance',
    color: '#df4d47'
  },
  {
    name: '體育',
    value: 'sport',
    color: '#fd9843'
  },
  {
    name: '娛樂',
    value: 'entertainment',
    color: '#1ea896'
  }
];

export const newsCategory = newsCategoryList.map((e) => e.name);

export const categoryTopic = newsCategoryList;
