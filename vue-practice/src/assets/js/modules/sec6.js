export default class Sec6 {
  constructor() {
    /**
     * section6---------------------------------------------
     */

    new Vue({
      el: '#sec6',
      data: {
        rectObject: {
          width: '100px',
          height: '100px',
          background: 'skyblue',
          margin: '0 auto',
          display: 'flex',
          flexDirection: "column",
          justifyContent: 'center'
        },
        circleObject: {
          width: '20px',
          height: '20px',
          borderRadius: '100%',
          background: 'blue',
          margin: '0 auto'
        }
      }
    })

  }
};
