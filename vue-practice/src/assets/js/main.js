/*import*/
import $ from 'jquery';
import Common from './modules/common';
// import Sample from './modules/Sample';

/*create instance*/
const common = new Common();
// const sample = new Sample({
//     name: 'world'
// });



/**
 * section1---------------------------------------------
 */
import Sec1 from './modules/sec1';
new Sec1();



/**
 * section2---------------------------------------------
 */
import Sec2 from './modules/sec2';
new Sec2();


/**
 * section3---------------------------------------------
 */
import Sec3 from './modules/sec3';
new Sec3();



/**
 * section4---------------------------------------------
 */
import Sec4 from './modules/sec4';
new Sec4();


/**
 * section5---------------------------------------------
 */
import Sec5 from './modules/sec5';
new Sec5();


/**
 * section6---------------------------------------------
 */
import Sec6 from './modules/sec6';
new Sec6();

/**
 * section7---------------------------------------------
 */
import Sec7 from './modules/sec7';
new Sec7();

/**
 * section8---------------------------------------------
 */
import Sec8 from './modules/sec8';
new Sec8();

/**
 * section9---------------------------------------------
 */
import Sec9 from './modules/sec9';
new Sec9();

/**
 * section10---------------------------------------------
 */
import Sec10 from './modules/sec10';
new Sec10();

/**
 * section11---------------------------------------------
 */
import Sec11 from './modules/sec11';
new Sec11();

/**
 * section12---------------------------------------------
 */
import Sec12 from './modules/sec12';
new Sec12();

/**
 * section13---------------------------------------------
 */
import Sec13 from './modules/sec13';
new Sec13();




/*load event*/
document.addEventListener('DOMContentLoaded', () => {
  common.init();
})
