export default class circleUpdate {
  timer: undefined | number = undefined;

  flag = 0;

  async start(
    callback: () => void | Promise<void>,
    immediate = true,
    wait = 5000,
  ): Promise<void> {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (!this.flag) {
      immediate && callback && (await callback());
      this.flag = 1;
    }
    this.timer = setTimeout(async () => {
      callback && callback();
      this.start(callback, immediate, wait);
    }, wait) as unknown as number;
  }

  clear(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.flag = 0;
  }
}
