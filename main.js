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

  const elements = document.querySelectorAll('.box-fluid');
  elements.forEach((element) => {
    element.addEventListener('mouseenter', () => {
      if (shouldExpand(element)) {
        const newHeight = expandContent(element);
        console.log(`Nova altura para ccomputador ${newHeight}px`);
      }
    })
  })
})()