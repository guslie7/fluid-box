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

  function addListeners() {
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
            console.log(`Nova altura para computar ${newHeight}px`);
          }
        })
      }
    })
  }

  function openAllElements(limit = 1) {
    const elements = document.querySelectorAll('.box-fluid');
    const targetlimit = Math.min(limit, elements.length);
    let counter = 0;
    function expandNextElement() {
      if (counter === targetlimit) {
        return;
      }

      const currentElement = elements[counter];
      expandContent(currentElement);
      counter++;
      window.requestAnimationFrame(expandNextElement);
    }
    window.requestAnimationFrame(expandNextElement);
  }

  function shouldOpenElements() {
    const container = document.querySelector('.box-container');
    const autoExpand = container.getAttribute('data-auto-expand');
    const quantity = parseInt(container.getAttribute('data-expand-quantity'));

    if (quantity < 0) {
      throw Error('quantidade deve ser maior que 0!')
    }

    if (isNaN(quantity)) {
      throw Error('quantidade deve ser um número')
    }

    if (autoExpand === 'true') {
      openAllElements(quantity);
    }
    
    if ( autoExpand !== 'true' && autoExpand !== 'false'  ) {
      console.warn('data-auto-expand foi fornecido, mas é diferente de true/false')
    }

  }

  addListeners();
  shouldOpenElements();
})()