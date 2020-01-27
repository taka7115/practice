/*import*/
import $ from 'jquery';
import Common from './modules/common';
// import Sample from './modules/Sample';

/*create instance*/
const common = new Common();
// const sample = new Sample({
//     name: 'world'
// });

/*load event*/
document.addEventListener('DOMContentLoaded', () => {
    common.init();
})



/*sample*/
// $('h1').on('click', () => {
//     console.log(`hello, ${sample.name}.`);
// });
