const assetBase = new URL("./", document.currentScript?.src || new URL("assets/site.js", location.href));

function enhanceComparisons(root = document) {
  root.querySelectorAll("[data-before-after]").forEach((figure) => {
    if (figure.dataset.beforeAfterReady === "true") return;
    const frame = figure.querySelector(".before-after");
    const range = figure.querySelector("input[type=range]");
    const after = figure.querySelector(".before-after-after");
    if (!frame || !range || !after) return;
    figure.dataset.beforeAfterReady = "true";
    frame.querySelectorAll("img").forEach((image) => { image.draggable = false; });
    frame.classList.add("is-enhanced");
    range.classList.add("before-after-range");
    const reference = figure.dataset.referenceSrc || frame.querySelector("img:not(.before-after-after)")?.getAttribute("src");
    const prediction = figure.dataset.predictionSrc || after.getAttribute("src");
    const referenceAlt = figure.dataset.referenceAlt || frame.querySelector("img:not(.before-after-after)")?.alt;
    const predictionAlt = figure.dataset.predictionAlt || after.alt;
    const viewButtons = figure.querySelectorAll("[data-comparison-view]");
    const viewLabel = figure.querySelector("[data-comparison-label]");
    const inputLabel = figure.dataset.inputLabel || "Observed input";
    let activeView = "prediction";
    const setView = (view) => {
      const requestedReference = view === "reference";
      const isReference = requestedReference ? Boolean(reference) : !prediction && Boolean(reference);
      activeView = isReference ? "reference" : "prediction";
      const source = isReference ? reference : prediction;
      if (source && after.getAttribute("src") !== source) after.src = source;
      const alt = isReference ? referenceAlt : predictionAlt;
      if (alt) after.alt = alt;
      if (viewLabel) viewLabel.textContent = isReference ? "Reference" : "Prediction";
      viewButtons.forEach((button) => {
        const selected = button.dataset.comparisonView === (isReference ? "reference" : "prediction");
        const available = Boolean(isReference ? reference : prediction);
        button.disabled = !available;
        button.setAttribute("aria-pressed", String(selected));
      });
      const bounded = Math.round(Math.max(0, Math.min(100, Number(range.value))));
      range.setAttribute("aria-valuetext", `${bounded}% ${inputLabel}, ${100 - bounded}% ${activeView}`);
    };
    viewButtons.forEach((button) => button.addEventListener("click", () => setView(button.dataset.comparisonView)));
    setView(figure.dataset.comparisonView || "prediction");
    const setValue = (value) => {
      const bounded = Math.round(Math.max(0, Math.min(100, Number(value))));
      range.value = String(bounded);
      after.style.clipPath = `inset(0 0 0 ${bounded}%)`;
      frame.style.setProperty("--comparison-position", `${bounded}%`);
      range.setAttribute("aria-valuetext", `${bounded}% ${inputLabel}, ${100 - bounded}% ${activeView}`);
    };
    const update = () => setValue(range.value);
    range.addEventListener("input", update);
    frame.addEventListener("pointerdown", (event) => {
      if (event.target === range || event.button > 0) return;
      event.preventDefault();
      range.focus({ preventScroll: true });
      const bounds = frame.getBoundingClientRect();
      setValue(((event.clientX - bounds.left) / bounds.width) * 100);
      range.dispatchEvent(new Event("input", { bubbles: true }));
      frame.setPointerCapture?.(event.pointerId);
    });
    frame.addEventListener("pointermove", (event) => {
      if (!frame.hasPointerCapture?.(event.pointerId)) return;
      const bounds = frame.getBoundingClientRect();
      setValue(((event.clientX - bounds.left) / bounds.width) * 100);
    });
    const releasePointer = (event) => {
      if (frame.hasPointerCapture?.(event.pointerId)) frame.releasePointerCapture(event.pointerId);
    };
    frame.addEventListener("pointercancel", releasePointer);
    frame.addEventListener("pointerup", releasePointer);
    update();
  });
}

function initSite() {
  const closedMount = document.getElementById("closed-leaderboard");
  if (closedMount && !closedMount.dataset.ready) {
    closedMount.dataset.ready = "true";
    const filter = document.getElementById("closed-filter");
    fetch(new URL("closed-benchmark/index.json", assetBase))
      .then((response) => {
        if (!response.ok) throw new Error("Index preview unavailable");
        return response.json();
      })
      .then((payload) => {
        const render = () => {
          const query = (filter?.value || "").trim().toLowerCase();
          const rows = payload.records.filter((r) => `${r.recipe} ${r.adaptation}`.toLowerCase().includes(query));
          const table = document.createElement("table");
          table.setAttribute("data-site-table", "true");
          const header = table.createTHead().insertRow();
          ["Recipe", "Overall", "Fidelity", "Consistency", "Detail quality", "Native scale", "Evaluation adaptation", "Status"].forEach((label) => {
            const th = document.createElement("th");
            th.textContent = label;
            header.appendChild(th);
          });
          const body = table.createTBody();
          rows.forEach((r) => {
            const row = body.insertRow();
            const values = [r.recipe,
              ...["Overall", "Fidelity", "Consistency", "Detail quality"].map((k) => r.indices[k] == null ? "Pending" : Number(r.indices[k]).toFixed(2)),
              `${r.native_scale}×`, r.adaptation,
              r.status === "pending-calibration" ? "Preview" : r.status];
            values.forEach((value) => { row.insertCell().textContent = value; });
          });
          closedMount.replaceChildren(table);
          if (!rows.length) {
            const message = document.createElement("p");
            message.textContent = "No compatible recipes match this filter.";
            closedMount.appendChild(message);
          }
        };
        filter?.addEventListener("input", render);
        render();
      })
      .catch(() => { /* Keep the static, JavaScript-independent preview. */ });
  }
  document.querySelectorAll("table").forEach((table) => table.setAttribute("data-site-table", "true"));
  enhanceComparisons();
  const mount = document.getElementById("benchmark-table");
  const input = document.getElementById("benchmark-filter");
  if (mount && !mount.dataset.benchmarksReady) {
    mount.dataset.benchmarksReady = "true";
    const filterPreviews = () => {
      const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
      const query = normalize(input?.value || "");
      document.querySelectorAll("[data-model-result]").forEach((card) => {
        card.hidden = !normalize(`${card.dataset.modelResult} ${card.textContent}`).includes(query);
      });
    };
    input?.addEventListener("input", filterPreviews);
    filterPreviews();
    let modelPages = {};
    const render = (rows) => {
      const query = (input?.value || "").trim().toLowerCase();
      const matching = rows.filter((row) => JSON.stringify(row).toLowerCase().includes(query));
      const visible = mount.dataset.limit ? matching.slice(0, Number(mount.dataset.limit)) : matching;
      if (!visible.length) {
        const message = document.createElement("p");
        message.textContent = "No measured records match this filter.";
        mount.replaceChildren(message);
        return;
      }
      if (mount.dataset.columns === "summary") {
        const titleFor = (recipe) => {
          const key = recipe.replace(/@[^@]+$/, "");
          const known = modelPages[recipe];
          if (known) return [known.name, known.page];
          return [key.split("/").pop().replace(/-x\d+$/, "").replace(/-/g, " "), null];
        };
        const groups = new Map();
        visible.forEach((row) => {
          const key = row.protocol || "Published measurements";
          if (!groups.has(key)) groups.set(key, []);
          groups.get(key).push(row);
        });
        const fragment = document.createDocumentFragment();
        groups.forEach((groupRows, protocol) => {
          if (groups.size > 1) {
            const heading = document.createElement("h3");
            heading.textContent = `${groupRows[0].scale}× measurements`;
            heading.title = `Protocol ${protocol}`;
            fragment.appendChild(heading);
          }
          const table = document.createElement("table");
          table.setAttribute("data-site-table", "true");
          const head = table.createTHead().insertRow();
          ["Model", "Scale", "PSNR (dB)", "SSIM", "SAM (rad)", "Latency (ms)"].forEach((label) => {
            const th = document.createElement("th");
            th.textContent = label;
            head.appendChild(th);
          });
          const body = table.createTBody();
          groupRows.forEach((row) => {
            const tr = body.insertRow();
            const [name, page] = titleFor(row.recipe || "");
            const modelCell = tr.insertCell();
            if (page) {
              const link = document.createElement("a");
              link.href = new URL(`../${page.replace(/\.md$/, "/")}`, assetBase);
              link.title = row.recipe;
              link.textContent = name;
              modelCell.appendChild(link);
            } else modelCell.textContent = name;
            [row.scale == null ? "—" : `${row.scale}×`, row.psnr, row.ssim, row.sam, row.latency_ms].forEach((value, index) => {
              const cell = tr.insertCell();
              cell.textContent = value == null ? "—" : index === 0 ? String(value) : Number(value).toFixed(3);
            });
          });
          fragment.appendChild(table);
        });
        mount.replaceChildren(fragment);
        return;
      }
      const allFields = ["recipe", "device", "dataset", "protocol", "input_shape", "scale", "nsamples", "ndraws", "hardware", "latency_ms", "memory_mib", "psnr", "ssim", "sam"];
      const allLabels = ["Recipe", "Device", "Dataset", "Protocol", "Input shape", "Scale", "Samples", "Draws", "Hardware", "Latency (ms)", "Peak memory (MiB)", "PSNR", "SSIM", "SAM (rad)"];
      const fields = mount.dataset.limit ? ["recipe", "scale", "psnr", "ssim", "latency_ms"] : allFields;
      const table = document.createElement("table");
      const head = table.createTHead().insertRow();
      fields.forEach((field) => {
        const th = document.createElement("th");
        th.textContent = allLabels[allFields.indexOf(field)];
        head.appendChild(th);
      });
      const body = table.createTBody();
      visible.forEach((row) => {
        const tr = body.insertRow();
        fields.forEach((field) => {
          const td = tr.insertCell();
          const value = row[field];
          const original = value == null ? "—" : String(value);
          const numeric = ["latency_ms", "memory_mib", "psnr", "ssim", "sam"].includes(field);
          td.textContent = value == null ? "—" : field === "protocol"
            ? original.slice(0, 12)
            : numeric && Number.isFinite(Number(value))
              ? Number(value).toFixed(3)
              : original;
          if (field === "protocol") td.title = original;
        });
      });
      mount.replaceChildren(table);
    };
    Promise.all([
      fetch(new URL("benchmarks/index.json", assetBase)).then((response) => {
        if (!response.ok) throw new Error("benchmark data unavailable");
        return response.json();
      }),
      fetch(new URL("model-pages.json", assetBase))
        .then((response) => response.ok ? response.json() : {})
        .catch(() => ({}))
    ])
      .then(([data, pages]) => {
        modelPages = pages.recipes || {};
        const rows = Array.isArray(data.records) ? data.records : [];
        render(rows);
        input?.addEventListener("input", () => render(rows));
      })
      .catch(() => {
        // Keep the static CSV links and Markdown fallback visible when the export is unavailable.
      });
  }
}

document.addEventListener("DOMContentLoaded", initSite);
if (typeof document$ !== "undefined") document$.subscribe(initSite);
