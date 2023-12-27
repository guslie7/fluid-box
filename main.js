(function Main() {

  /**
   * 
   * @param {HTMLElement} element 
   */
  function shouldExpand(element) {
    return !element.classList.contains('box-fluid--expanded');
  }

  /**
   * 
   * @param {HTMLElement} element 
   */
  function expandContent(element) {
    element.style.height = `${element.scrollHeight}px`;

    setTimeout(() => {
      element.classList.add('box-fluid--expanded');
    }, 400);

    return element.scrollHeight;
  }

  /**
   * 
   * @param {HTMLElement} element 
   */
  function marqueeContent(element) {
    const container = element.querySelector('.box-fluid__inner');
    const target = container.scrollWidth - container.offsetWidth;
    let counter = 0;

    const transformStr = `translateX(${-target}px)`
    container.classList.add('marquee-transition');
    container.style.transform = transformStr;

    // const interval = setInterval(() => {
    //   counter -= 50;
    //   const transformStr = `translateX(${counter}px)`
    //   container.style.transform = transformStr;

    //   console.log(container);

    //   if (Math.abs(counter) >= target) {
    //     clearInterval(interval);
    //   }
    //   console.log(transformStr);
    //   console.log(counter);
    // }, 200);
  }

  /**
   * 
   * @param {HTMLElement} element 
   */
  function removeMarquee(element) {
    const container = element.querySelector('.box-fluid__inner');
    const transformStr = `translateX(${0}px)`
    container.classList.remove('marquee-transition');
    container.style.transform = transformStr;
  }

  const elements = document.querySelectorAll('.box-fluid');
  elements.forEach((element) => {
    const mode = element.getAttribute('data-mode');
    if (mode === 'marquee') {

      element.addEventListener('mouseenter', () => {
        marqueeContent(element);
      });

      element.addEventListener('mouseleave', () => {
        removeMarquee(element);
      })
    } else {
      element.addEventListener('mouseenter', () => {
        if (shouldExpand(element)) {
          const newHeight = expandContent(element);
          console.log(`Nova altura para ccomputador ${newHeight}px`);
        }
      })
    }
  })
})()