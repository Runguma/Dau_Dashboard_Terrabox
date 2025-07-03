// =====================
// Global Donut Charts (Chart 2a & 2b)
// =====================
d3.csv("../Tables/SDG_1171/SDG_1171_Global.csv").then(data => {
  const row = data[0];

  // Chart 2a
  const valueA = parseFloat(row[Object.keys(row)[0]]);
  const chartDataA = [
    {
      type: "pie",
      values: [valueA, 100 - valueA, 100],
      labels: ["", "", ""],
      marker: {
        colors: ["#00b2e3", "#e0e0e0", "transparent"]
      },
      hole: 0.6,
      direction: "anti-clockwise",
      rotation: 90,
      textinfo: "none",
      showlegend: false,
      hoverinfo: "skip"
    }
  ];
  const layoutA = {
    margin: { t: 10, b: 0, l: 0, r: 0 },
    height: 200,
    width: 300,
    showlegend: false,
    annotations: [
      {
        text: `${valueA.toFixed(1)}%`,
        x: 0.5,
        y: 0.5,
        showarrow: false,
        font: { size: 16, color: "#333" }
      }
    ]
  };
  Plotly.newPlot("chart2a", chartDataA, layoutA, {
    displayModeBar: true,
    modeBarButtonsToKeep: ["toImage"],
    displaylogo: false
  });

  // Chart 2b
  const valueB = parseFloat(row[Object.keys(row)[1]]);
  const chartDataB = [
    {
      type: "pie",
      values: [valueB, 100 - valueB, 100],
      labels: ["", "", ""],
      marker: {
        colors: ["#00b2e3", "#e0e0e0", "transparent"]
      },
      hole: 0.6,
      direction: "anti-clockwise",
      rotation: 90,
      textinfo: "none",
      showlegend: false,
      hoverinfo: "skip"
    }
  ];
  const layoutB = {
    margin: { t: 10, b: 0, l: 0, r: 0 },
    height: 200,
    width: 300,
    showlegend: false,
    annotations: [
      {
        text: `${valueB.toFixed(1)}%`,
        x: 0.5,
        y: 0.5,
        showarrow: false,
        font: { size: 16, color: "#333" }
      }
    ]
  };
  Plotly.newPlot("chart2b", chartDataB, layoutB, {
    displayModeBar: true,
    modeBarButtonsToKeep: ["toImage"],
    displaylogo: false
  });
});

// =====================
// Regional Horizontal Bar Charts (Chart 3a & 3b)
// =====================
let chart3DataA = null;
let chart3DataB = null;

function drawChart3a() {
  if (chart3DataA) {
    Plotly.newPlot("chart3a", chart3DataA.data, chart3DataA.layout, {
      displayModeBar: true,
      modeBarButtonsToKeep: ["toImage"],
      displaylogo: false
    });
  }
}

function drawChart3b() {
  if (chart3DataB) {
    Plotly.newPlot("chart3b", chart3DataB.data, chart3DataB.layout, {
      displayModeBar: true,
      modeBarButtonsToKeep: ["toImage"],
      displaylogo: false
    });
  }
}

d3.csv("../Tables/SDG_1171/SDG_1171_Regional.csv").then(data => {
  const regions = data.map(d => d["SDG Regions"]);
  const valuesA = data.map(d => parseFloat(d["Average share of the built-up area of cities that is open space for public use for all (%) [a]"]));
  const valuesB = data.map(d => parseFloat(d["Average share of urban population with convenient access to open public spaces (%) [b]"]));

  chart3DataA = {
    data: [
      {
        type: "bar",
        x: valuesA,
        y: regions.map(r => r.replace(/(.{20})/g, '$1<br>')),
        orientation: "h",
        marker: { color: " #00b2e3" },
        text: valuesA.map(v => v.toFixed(1) + "%"),
        textposition: "auto",
        hoverinfo: "x+y"
      }
    ],
    layout: {
      title: '',
      margin: { l: 180, r: 20, t: 30, b: 30 },
      height: 350
    }
  };

  chart3DataB = {
    data: [
      {
        type: "bar",
        x: valuesB,
        y: regions.map(r => r.replace(/(.{20})/g, '$1<br>')),
        orientation: "h",
        marker: { color: " #00b2e3" },
        text: valuesB.map(v => v.toFixed(1) + "%"),
        textposition: "auto",
        hoverinfo: "x+y"
      }
    ],
    layout: {
      title: '',
      margin: { l: 180, r: 20, t: 30, b: 30 },
      height: 350
    }
  };

  // Default chart
  drawChart3a();
});



// =====================
// Tab Switching Logic
// =====================
document.querySelectorAll(".tab-button").forEach(btn => {
  btn.addEventListener("click", () => {
    const tabId = btn.getAttribute("data-tab");

    // Activate current button
    document.querySelectorAll(".tab-button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // Show matching tab
    document.querySelectorAll(".tab-content").forEach(div => div.style.display = "none");
    const currentTab = document.getElementById(tabId);
    currentTab.style.display = "block";

    // Redraw chart
    if (tabId === "chart3a") drawChart3a();
    if (tabId === "chart3b") drawChart3b();
  });
});

// Initialize default tab
document.addEventListener("DOMContentLoaded", () => {
  const defaultBtn = document.querySelector(".tab-button.active");
  if (defaultBtn) {
    const tabId = defaultBtn.getAttribute("data-tab");
    document.getElementById(tabId).style.display = "block";
    if (tabId === "chart3a") drawChart3a();
    if (tabId === "chart3b") drawChart3b();
  }
});
