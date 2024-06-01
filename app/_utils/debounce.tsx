let timer: NodeJS.Timeout;

function debounce(func: () => void, delay: number = 1500) {
  clearTimeout(timer);

  timer = setTimeout(() => {
    func();
  }, delay);
}

export default debounce;
