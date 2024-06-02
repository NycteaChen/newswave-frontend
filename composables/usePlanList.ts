const planList = computed<PlanItem[]>(() => [
  {
    title: '免費',
    type: 'free',
    price: 0,
    totalPrice: 0
  },
  {
    title: '1 個月',
    planName: 'NewsWave 月訂閱',
    type: 'month',
    price: 100,
    totalPrice: 100
  },
  {
    title: '12 個月',
    planName: 'NewsWave 年訂閱',
    type: 'year',
    price: 80,
    totalPrice: 960,
    recommend: true
  }
]);

export default () => ({
  planList
});
