export const initializeSubscriptions = (globals) => {
  Byond.subscribeTo('update_stat', ({ global_data, ping_str, other_str }) => {
    let status_tab = document.getElementById("status");
    globals.status_tab_parts = [ping_str];

    for (let part of global_data) {
      if (part !== null) {
        globals.status_tab_parts.push(part);
      }
    }

    for (let part of other_str) {
      if (part !== null) {
        globals.status_tab_parts.push(part);
      }
    }

    status_tab.textContent = "";

    for (let part of globals.status_tab_parts) {
      if (part.trim() === "") {
        status_tab.appendChild("br");
      } else {
        let box = document.createElement("div");
        box.textContent = part;
        status_tab.appendChild(box);
      }
    }
  });
};
