// 金流相關
class orderApi {
  static async ecPayOrder(params: OrderRequestType): Promise<ApiResponseType<string>> {
    const body = {
      itemName: params.itemName,
      total: params.total,
      planType: params.planType
    };
    const res = await useApi('/order', {
      method: 'post',
      body
    });

    return res;
  }
}

export default () => orderApi;
