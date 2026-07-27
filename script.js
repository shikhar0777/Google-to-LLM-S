const lineChart = document.getElementById('lineChart');
const donutChart = document.getElementById('donutChart');
const legend = document.getElementById('legend');
const barChart = document.getElementById('barChart');

const trendPoints = [18, 29, 41, 58, 72, 84];
const donutData = [
  { label: 'ChatGPT', value: 38, color: '#f5f5f5' },
  { label: 'Google', value: 27, color: '#bfbfbf' },
  { label: 'Claude', value: 20, color: '#7b7b7b' },
  { label: 'DeepSeek', value: 15, color: '#2f2f2f' }
];
const barData = [
  { label: 'Direct answers', value: 91 },
  { label: 'Personalization', value: 86 },
  { label: 'Efficiency', value: 81 },
  { label: 'AI familiarity', value: 78 }
];

function drawLineChart() {
  if (!lineChart) return;

  const width = 520;
  const height = 260;
  const padding = 36;
  const max = Math.max(...trendPoints);
  const points = trendPoints
    .map((point, index) => {
      const x = padding + (index * (width - padding * 2)) / (trendPoints.length - 1);
      const y = height - padding - (point / max) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(' ');

  const path = `M ${points.replace(/ /g, ' L ')}`;

  lineChart.innerHTML = `
    <rect x="0" y="0" width="${width}" height="${height}" rx="24" fill="rgba(255,255,255,0.02)"></rect>
    <g stroke="rgba(255,255,255,0.16)" stroke-width="1">
      <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}"></line>
      <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}"></line>
    </g>
    <path d="${path}" fill="none" stroke="#f5f5f5" stroke-width="3" stroke-linecap="round"></path>
    ${trendPoints
      .map((point, index) => {
        const x = padding + (index * (width - padding * 2)) / (trendPoints.length - 1);
        const y = height - padding - (point / max) * (height - padding * 2);
        return `<circle cx="${x}" cy="${y}" r="6" fill="#0b0b0b" stroke="#f5f5f5" stroke-width="2"></circle>`;
      })
      .join('')}
  `;
}

function drawDonutChart() {
  if (!donutChart || !legend) return;

  const total = donutData.reduce((sum, item) => sum + item.value, 0);
  let current = 0;
  const gradientParts = donutData.map((item) => {
    const start = current / total * 100;
    current += item.value;
    const end = current / total * 100;
    return `${item.color} ${start}% ${end}%`;
  });

  donutChart.style.background = `conic-gradient(${gradientParts.join(', ')})`;

  legend.innerHTML = donutData
    .map(
      (item) => `
        <div class="legend-item">
          <span><span class="legend-swatch" style="background:${item.color}"></span>${item.label}</span>
          <strong>${item.value}%</strong>
        </div>
      `
    )
    .join('');
}

function drawBarChart() {
  if (!barChart) return;

  barChart.innerHTML = barData
    .map(
      (item) => `
        <div class="bar-row">
          <span>${item.label}</span>
          <div class="bar-track"><div class="bar-fill" data-value="${item.value}"></div></div>
          <strong>${item.value}%</strong>
        </div>
      `
    )
    .join('');

  requestAnimationFrame(() => {
    barChart.querySelectorAll('.bar-fill').forEach((fill) => {
      fill.style.width = `${fill.getAttribute('data-value')}%`;
    });
  });
}

window.addEventListener('load', () => {
  drawLineChart();
  drawDonutChart();
  drawBarChart();
});
