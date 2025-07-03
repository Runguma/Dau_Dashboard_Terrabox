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
        colors: ["#6dbe4b", "#e0e0e0", "transparent"]
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
        colors: ["#6dbe4b", "#e0e0e0", "transparent"]
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
    }).then(() => {
      Plotly.animate("chart3a", {
        data: chart3DataA.data
      }, {
        transition: { duration: 600, easing: "cubic-in-out" },
        frame: { duration: 500, redraw: false }
      });
    });
  }
}

function drawChart3b() {
  if (chart3DataB) {
    Plotly.newPlot("chart3b", chart3DataB.data, chart3DataB.layout, {
      displayModeBar: true,
      modeBarButtonsToKeep: ["toImage"],
      displaylogo: false
    }).then(() => {
      Plotly.animate("chart3b", {
        data: chart3DataB.data
      }, {
        transition: { duration: 600, easing: "cubic-in-out" },
        frame: { duration: 500, redraw: false }
      });
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
        y: regions.map(r => {
          const words = r.split(" ");
          if (words.length > 3) {
            return words.slice(0, 3).join(" ") + "<br>" + words.slice(3).join(" ");
          }
          return r;
        }),
        orientation: "h",
        marker: {
          color: "#a5d892",
          line: { width: 1, color: "#ffffff" }
        },
        hovertemplate: "%{x:.1f}%<extra></extra>",
        textposition: "none",
        insidetextanchor: "start"
      }
    ],
    layout: {
      margin: { l: 10, r: 10, t: 30, b: 30 },
      height: 360,
      width: 650,
      font: {
        family: "Segoe UI, sans-serif",
        size: 13,
        color: "#333"
      },
      xaxis: {
        title: "",
        ticksuffix: "%",
        zeroline: false,
        showline: false,
        showgrid: true,
        gridcolor: "#eee"
      },
      yaxis: {
        automargin: true
      },
      showlegend: false,
      bargap: 0.25
    }
  };

  chart3DataB = {
    data: [
      {
        type: "bar",
        x: valuesB,
        y: regions.map(r => {
          const words = r.split(" ");
          if (words.length > 3) {
            return words.slice(0, 3).join(" ") + "<br>" + words.slice(3).join(" ");
          }
          return r;
        }),
        orientation: "h",
        marker: {
          color: "#c3e5b6",
          line: { width: 1, color: "#ffffff" }
        },
        hovertemplate: "%{x:.1f}%<extra></extra>",
        textposition: "none",
        insidetextanchor: "start"
      }
    ],
    layout: {
      margin: { l: 10, r: 10, t: 30, b: 30 },
      height: 360,
      width: 650,
      font: {
        family: "Segoe UI, sans-serif",
        size: 13,
        color: "#333"
      },
      xaxis: {
        title: "",
        ticksuffix: "%",
        zeroline: false,
        showline: false,
        showgrid: true,
        gridcolor: "#eee"
      },
      yaxis: {
        automargin: true
      },
      showlegend: false,
      bargap: 0.25
    }
  };

  drawChart3a(); // default chart
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



// Sub-Regional

// =====================
// Sub-Regional Horizontal Bar Charts (Chart 4a & 4b)
// =====================
let chart4DataA = null;
let chart4DataB = null;

function drawChart4a() {
  if (chart4DataA) {
    Plotly.newPlot("chart4a", chart4DataA.data, chart4DataA.layout, {
      displayModeBar: true,
      modeBarButtonsToKeep: ["toImage"],
      displaylogo: false
    }).then(() => {
      Plotly.animate("chart4a", {
        data: chart4DataA.data
      }, {
        transition: { duration: 600, easing: "cubic-in-out" },
        frame: { duration: 500, redraw: false }
      });
    });
  }
}

function drawChart4b() {
  if (chart4DataB) {
    Plotly.newPlot("chart4b", chart4DataB.data, chart4DataB.layout, {
      displayModeBar: true,
      modeBarButtonsToKeep: ["toImage"],
      displaylogo: false
    }).then(() => {
      Plotly.animate("chart4b", {
        data: chart4DataB.data
      }, {
        transition: { duration: 600, easing: "cubic-in-out" },
        frame: { duration: 500, redraw: false }
      });
    });
  }
}

d3.csv("../Tables/SDG_1171/SDG_1171_Sub_Regional.csv").then(data => {
  const regions = data.map(d => d["Sub-Region"]);
  const valuesA = data.map(d => parseFloat(d["Average share of the built-up area of cities that is open space for public use for all (%) [a]"]));
  const valuesB = data.map(d => parseFloat(d["Average share of urban population with convenient access to open public spaces (%) [b]"]));

  function formatLabel(label) {
    const words = label.split(" ");
    return words.length > 3 ? words.slice(0, 3).join(" ") + "<br>" + words.slice(3).join(" ") : label;
  }

  chart4DataA = {
    data: [{
      type: "bar",
      x: valuesA,
      y: regions.map(formatLabel),
      orientation: "h",
      marker: {
        color: "#a5d892",
        line: { width: 1, color: "#fff" }
      },
      hovertemplate: "%{x:.1f}%<extra></extra>",
      textposition: "none",
      insidetextanchor: "start"
    }],
    layout: {
      margin: { l: 10, r: 10, t: 30, b: 40 },
      height: 800,
      width: 650,
      font: { family: "Segoe UI, sans-serif", size: 13, color: "#333" },
      xaxis: {
        title: "", ticksuffix: "%", tickpadding: 10, tickfont: { size: 12 }, zeroline: false,
        showline: false, showgrid: true, gridcolor: "#eee"
      },
      yaxis: { automargin: true },
      showlegend: false,
      bargap: 0.25
    }
  };

  chart4DataB = {
    data: [{
      type: "bar",
      x: valuesB,
      y: regions.map(formatLabel),
      orientation: "h",
      marker: {
        color: "#c3e5b6",
        line: { width: 1, color: "#fff" }
      },
      hovertemplate: "%{x:.1f}%<extra></extra>",
      textposition: "none",
      insidetextanchor: "start"
    }],
    layout: {
      margin: { l: 10, r: 10, t: 30, b: 40 },
      height: 800,
      width: 650,
      font: { family: "Segoe UI, sans-serif", size: 13, color: "#333" },
      xaxis: {
        title: "", ticksuffix: "%", zeroline: false,
        showline: false, showgrid: true, gridcolor: "#eee"
      },
      yaxis: { automargin: true },
      showlegend: false,
      bargap: 0.25
    }
  };

  drawChart4a(); // default chart
});

// =====================
// Tab Switching Logic for Chart 4
// =====================
document.querySelectorAll(".sr_tab-button").forEach(btn => {
  btn.addEventListener("click", () => {
    const tabId = btn.getAttribute("data-tab");

    document.querySelectorAll(".sr_tab-button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    document.querySelectorAll(".sr_tab-content").forEach(div => div.style.display = "none");
    document.getElementById(tabId).style.display = "block";

    if (tabId === "chart4a") drawChart4a();
    if (tabId === "chart4b") drawChart4b();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const defaultBtn = document.querySelector(".sr_tab-button.active");
  if (defaultBtn) {
    const tabId = defaultBtn.getAttribute("data-tab");
    document.getElementById(tabId).style.display = "block";
    if (tabId === "chart4a") drawChart4a();
    if (tabId === "chart4b") drawChart4b();
  }
});


// =====================
// Country-Level Vertical Bar Charts (Chart 5a & 5b)
// =====================
d3.csv("../Tables/SDG_1171/SDG_1171_Country.csv").then(data => {
  const countries = data.map(d => d["Country or Territory Name"]);
  const sdgRegions = data.map(d => d["SDG Region"]);
  const valuesA = data.map(d => parseFloat(d["Average share of the built-up area of cities that is open space for public use for all (%) [a]"]));
  const valuesB = data.map(d => parseFloat(d["Average share of urban population with convenient access to open public spaces (%) [b]"]));

  // Build region color map
  const regionColors = {};
  const uniqueRegions = [...new Set(sdgRegions)];
  uniqueRegions.forEach((region, i) => {
    regionColors[region] = `hsl(${i * 30}, 60%, 60%)`;
  });

  const colorsA = sdgRegions.map(region => regionColors[region]);
  const colorsB = sdgRegions.map(region => regionColors[region]);

  const chart5aData = [{
    type: "bar",
    orientation: "h",
    x: valuesA,
    y: countries,
    marker: { color: colorsA },
    hovertemplate: "%{x:.1f}%<extra></extra>"
  }];

  const chart5bData = [{
    type: "bar",
    orientation: "h",
    x: valuesB,
    y: countries,
    marker: { color: colorsB },
    hovertemplate: "%{x:.1f}%<extra></extra>"
  }];

  const layout = {
    height: 2000,  // taller for long list of countries
    margin: { l: 10, r: 10, t: 40, b: 40 },
    font: {
      family: "Segoe UI, sans-serif",
      size: 12,
      color: "#333"
    },
    xaxis: {
      ticksuffix: "",
      showgrid: true,
      gridcolor: "#eee"
    },
    yaxis: {
      automargin: true
    },
    showlegend: false
  };

  Plotly.newPlot("chart5a", chart5aData, layout, { displayModeBar: false });
  Plotly.newPlot("chart5b", chart5bData, layout, { displayModeBar: false });
});

// =====================
// Country Tab Switching Logic
// =====================
document.querySelectorAll(".cnt_tab-button").forEach(btn => {
  btn.addEventListener("click", () => {
    const tabId = btn.getAttribute("data-tab");

    // Update button styles
    document.querySelectorAll(".cnt_tab-button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // Toggle tab visibility
    document.querySelectorAll(".cnt_tab-content").forEach(div => div.classList.remove("active"));
    document.getElementById(tabId).classList.add("active");
  });
});




