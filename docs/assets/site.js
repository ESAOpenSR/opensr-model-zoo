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
    const setValue = (value) => {
      const bounded = Math.round(Math.max(0, Math.min(100, Number(value))));
      range.value = String(bounded);
      after.style.clipPath = `inset(0 0 0 ${bounded}%)`;
      frame.style.setProperty("--comparison-position", `${bounded}%`);
      range.setAttribute("aria-valuetext", `${bounded}% observed, ${100 - bounded}% prediction`);
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
    fetch(new URL("benchmarks/index.json", assetBase))
      .then((response) => {
        if (!response.ok) throw new Error("benchmark data unavailable");
        return response.json();
      })
      .then((data) => {
        const rows = Array.isArray(data.records) ? data.records : [];
        render(rows);
        input?.addEventListener("input", () => render(rows));
      })
      .catch(() => {
        const message = document.createElement("p");
        message.textContent = "No measured benchmark export is published yet.";
        mount.replaceChildren(message);
      });
  }
}

document.addEventListener("DOMContentLoaded", initSite);
if (typeof document$ !== "undefined") document$.subscribe(initSite);
