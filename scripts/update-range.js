export function updateRangeCSS(event) {
  const target = event.target;

  const min = target.min;
  const max = target.max;
  const val = target.value;

  target.style.backgroundSize = `${(val - min) * 100 / (max - min)}% 100%`;
}
