// 金流相關
class orderApi {
  static async ecPayOrder(params: OrderRequestType): Promise<ApiResponseType<string>> {
    const body = {
      itemName: params.itemName,
      total: params.total
    };
    const res = await useApi('/order', {
      method: 'post',
      body
    });

    return res;
  }

  // static async logout(): Promise<ApiResponseType<undefined>> {
  //   const res = await useApi('/order/payment-results', {
  //     method: 'post'
  //   });

  //   return res;
  // }
}

export default () => orderApi;
