
function increase(initial) {
  Number.prototype[Symbol.iterator] = function* () {
    for (var i = initial; i < this + initial; i++) {
      yield i;
    }
  }
}
increase(1);

type IDate = number | string | Date;

export default class Calendar {
  monthList: {};
  constructor() {
    const date = this.getDate();
    // this.monthList = this.getMonthList(date.getFullYear())
  }

  getDate(date?: IDate) {
    return date === undefined ? new Date() : new Date(date);
  }

  generate() {

  }


  // /**
  //  * @desc 月的天数
  //  */
  // getMonthList(year:number) {
  //   let i = 0;
  //   let monthList: number[][] = [];
  //   while (i < 12) {
  //     const days = this.getMonthSize(year,i);

  //     i++;
  //   }
  //   return monthList;
  // }

  /**
   * @desc 获取一个月的天数
   */
  private getMonthSize(year: number, month: number) {
    const big = [1, 3, 5, 7, 8, 10, 12];
    const small = [4, 6, 9, 11];
    if (big.includes(month)) {
      return 31;
    } else if (small.includes(month)) {
      return 30;
    } else {
      return this.isLeapYear(year) ? 29 : 28;
    }
  }

  /**
   * @desc 判断是否为闰年
   */
  private isLeapYear(year: number) {
    return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
  }
}
