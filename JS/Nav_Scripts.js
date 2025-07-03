document.addEventListener("DOMContentLoaded", () => {
  const current = window.location.pathname.split("/").pop(); // e.g. "dashboard.html"

  document.querySelectorAll('.nav-item a').forEach(link => {
    const href = link.getAttribute("href");
    if (href === current || (href === "index.html" && current === "")) {
      link.parentElement.classList.add("active");
    }
  });

  // Trigger default tab (e.g., "map") on load
  activateTab("map");
});

// Toggle sidebar
document.getElementById("toggleSidebar").addEventListener("click", () => {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("collapsed");

  const activeTab = document.querySelector(".nav-item.active a")?.getAttribute("data-tab") || "map";
  activateTab(activeTab);
});

// Tab activation logic
function activateTab(tabName) {
  const sidebar = document.getElementById("sidebar");
  const isCollapsed = sidebar.classList.contains("collapsed");

  // Sidebar descriptions
  const statusContent = {
    map: {
      full: `
        <div class="sdg-info">
          <div class="accordion">
            <div class="accordion-header">Goal 11</div>
            <div class="accordion-body">
              Make cities and human settlements inclusive, safe, resilient and sustainable.
            </div>
          </div>

          <div class="accordion">
            <div class="accordion-header">Target 11.7</div>
            <div class="accordion-body">
              By 2030, provide universal access to safe, inclusive and accessible, green and public spaces, in particular for women and children, older persons and persons with disabilities.
            </div>
          </div>

          <div class="accordion">
            <div class="accordion-header">Indicator 11.7.1</div>
            <div class="accordion-body">
              Average share of the built-up area of cities that is open space for public use for all, by sex, age and persons with disabilities.
            </div>
          </div>

          <div class="accordion">
            <div class="accordion-header">See Documentation</div>
            <div class="accordion-body">
              <ol>
                <li><a href="#" style="color: #00b2e3; text-decoration: underline;">Metadata</a></li>
                <li><a href="#" style="color: #00b2e3; text-decoration: underline;">Practical Guide</a></li>
              </ol>
            </div>
          </div>

          <div class="accordion">
            <div class="accordion-header">Map Legend</div>
            <div class="accordion-body">
              <div id="sidebar-legend" class="legend"></div>
            </div>
          </div>
        </div>
      `,
      short: `Goal 11: Sustainable Cities`
    },
    chart: { full: "Chart 1", short: "Chart" },
    table: { full: "Table 3", short: "Table" }
  };

  // Tab content
  const mapContent = {
    map: `<iframe src="Maps/Map1171_L.html" style="width:100%; height:570px; border:none;"></iframe>`,
    chart: `<div class="chart-container">Chart 1</div>`,
    table: `<div class="chart-container">Table 1</div>`,
  };

  // Set sidebar description
  document.getElementById("sidebar-status").innerHTML =
    statusContent[tabName][isCollapsed ? "short" : "full"];

  // Reinitialize collapsibles
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      header.parentElement.classList.toggle('active');
    });
  });

  // Set main content
  document.querySelector(".map-container").innerHTML = mapContent[tabName] || "";

  // Update active tab
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove("active"));
  document.querySelector(`.nav-item a[data-tab="${tabName}"]`)?.parentElement.classList.add("active");

  // Draw static legend only once when map tab is opened
  if (tabName === "map") {
    drawStaticMapLegend();
  }
}

// Draw static legend from local JSON thresholds
function drawStaticMapLegend() {
  const container = document.getElementById("sidebar-legend");
  if (!container) return;

  const builtColor = "#228B22";
  const accessColor = "#2ecc71";
  const ranges = [">= 80%", "60–79%", "40–59%", "20–39%", "< 20%"];

  // Top: Metric indicators
  container.innerHTML = `
  <div style="height:1px; background:#ccc; margin:6px 0;"></div>

    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">

      <div style="
        width:14px;
        height:14px;
        background:${builtColor};
        border-radius:50%;
        border:2px solid white;
        box-shadow: 0 0 2px rgba(0,0,0,0.4);
        flex-shrink: 0;
        vertical-align: middle;

      "></div>
      <span style="font-size:12px; font-weight:500;">

        Average share of the built-up area of cities that is open space for public use for all (%) [a]
      </span>
    </div>

    <div style="height:1px; background:#ccc; margin:6px 0;"></div>

    <div style="display:flex; align-items:flex-start; gap:10px; margin-bottom:8px;">
      <div style="
        width:14px;
        height:14px;
        background:${accessColor};
        border-radius:50%;
        border:2px solid white;
        box-shadow: 0 0 2px rgba(0,0,0,0.4);
        flex-shrink: 0;
        vertical-align: middle;
      "></div>
      <span style="font-size:12px; font-weight:500;">

        Average share of urban population with convenient access to open public spaces (%) [b]
      </span>
    </div>

    <div style="height:1px; background:#ccc; margin:6px 0;"></div>

    <div style="margin-bottom:8px; font-weight:bold;">Open Space Share (%)</div>

    
  `;


  // Score range markers (built-style)
  for (let i = 0; i < 5; i++) {
    const radius = 12 - i * 2;

    const row = document.createElement("div");
    row.className = "legend-item";
    row.style = "display: flex; align-items: center; margin-bottom: 6px;";

    const marker = document.createElement("div");
    marker.style = `
      width:${radius}px;
      height:${radius}px;
      background:${builtColor};
      border-radius:50%;
      margin-right:10px;
      border:2px solid white;
      box-shadow: 0 0 2px rgba(0,0,0,0.4);
    `;

    const label = document.createElement("span");
    label.textContent = ranges[i];

    row.appendChild(marker);
    row.appendChild(label);
    container.appendChild(row);
  }
}

