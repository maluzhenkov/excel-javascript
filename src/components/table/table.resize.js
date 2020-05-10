import { $ } from "@core/DOM";

export function resizeHandler($root, event) {
  const $resizer = $(event.target);
  const $parent = $resizer.parent('[data-type="resizable"]');
  const coords = $parent.getCoords();
  const type = $resizer.data.resize;

  if (type === "col") {
    const resizerHeight = -($(".table").height - $resizer.height);
    $resizer.css({ opacity: 1, bottom: resizerHeight + "px" });
  } else {
    const resizerWidth = -($(".table").width - $resizer.width);
    $resizer.css({ opacity: 1, right: resizerWidth + "px" });
  }

  let value;

  document.onmousemove = (event) => {
    if (type === "col") {
      const delta = event.pageX - coords.right + 4;
      value = coords.width + delta;
      $resizer.css({ right: -delta + "px" });
    } else {
      const delta = event.clientY - coords.bottom + 4;
      value = coords.height + delta;
      $resizer.css({ bottom: -delta + "px" });
    }
  };

  document.onmouseup = (event) => {
    document.onmousemove = null;
    document.onmouseup = null;

    if (type === "col") {
      $parent.css({ width: value + "px" });
      $root
        .findAll(`[data-col="${$parent.data.col}"]`)
        .forEach((el) => (el.style.width = value + "px"));
      $resizer.css({ opacity: 0, bottom: "0", right: "-3px" });
    } else {
      $parent.css({ height: value + "px" });
      $resizer.css({ opacity: 0, bottom: "-3px", right: "0" });
    }
  };
}
