function copyToClipboard(text) {
var inputc = document.body.appendChild(document.createElement("input"));
inputc.value = window.location.href;
inputc.focus();
inputc.select();
document.execCommand('copy');
inputc.parentNode.removeChild(inputc);
alert("Copied project URL to your clipboard.");
}
export default async function ({ addon, console, msg }) {
  //define copy link button elements
  function loadLinkCopyButton() {
    if (document.querySelector("#scratchAddonscopylinkBtn")) return;
    if (addon.tab.editorMode === "projectpage") {
      addon.tab
        .waitForElement(".flex-row.subactions", {
          reduxCondition: (state) => state.scratchGui.mode.isPlayerOnly,
        })
        .then(() => {
          if (!document.querySelector(".copy-link-button")) return;
          const copylink = document.createElement("button");

          const copylinkSpan = document.createElement("span");
          copylinkSpan.innerText = msg("copy-link");
          addon.tab.displayNoneWhileDisabled(copylink);
          copylink.className = "button action-button copylink-button";
          copylink.id = "scratchAddonscopylinkBtn";
          copylink.appendChild(copylinkSpan);
          copylink.addEventListener("click", () => {
            copyToClipboard();
          });
          addon.tab.appendToSharedSpace({ space: "afterRemixTreeButton", element: copylink, order: 0 });
        });
    }
  }
}
