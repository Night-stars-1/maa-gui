interface ActionTimeLineItem {
  color: string
  icon: string
  name: string
  next: {
    [key: string]: {
      /**
       * 0-未返回结果
       * 1-成功
       * 2-失败
       */
      status: number
      id: number
    }
  }
}
