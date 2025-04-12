function injectPageScript(fn) {
  const script = document.createElement("script");
  script.textContent = `(${fn.toString()})();`;
  document.documentElement.appendChild(script);
  script.remove();
}

injectPageScript(() => {
  function waitForHeaderAndDataTable() {
    const headerCell = document.querySelector("#trade_table thead tr th:first-child");
    const tableReady = $.fn.dataTable?.isDataTable('#trade_table');

    if (!headerCell || headerCell.querySelector("input[type='checkbox']") || !tableReady) {
      setTimeout(waitForHeaderAndDataTable, 300);
      return;
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.style.cursor = "pointer";
    checkbox.style.margin = "0";

    const dt = $('#trade_table').DataTable();
    let isPluginSelecting = false;

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        isPluginSelecting = true;
        dt.rows({ page: 'current' }).select();
      } else {
        isPluginSelecting = false;
        dt.rows().deselect();
      }
    });

    dt.on('deselect', () => {
      checkbox.checked = false;
    });

    dt.on('select', () => {
      const total = dt.rows({ page: 'current' }).count();
      const selected = dt.rows({ page: 'current', selected: true }).count();
      checkbox.checked = selected === total;
    });

    dt.on('draw', () => {
      // If we selected rows via plugin, and table changed — reset state
      if (isPluginSelecting) {
        isPluginSelecting = false;
        checkbox.checked = false;
        dt.rows().deselect();
      }
    });

    headerCell.appendChild(checkbox);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", waitForHeaderAndDataTable);
  } else {
    waitForHeaderAndDataTable();
  }
});

